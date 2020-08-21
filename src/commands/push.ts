import { flags } from '@oclif/command';
import { DEFAULT_ARTICLE_INDEX_PATH } from '../lib/config/config';
import { validateFrontMatter } from '../lib/frontmatter-utils';
import { getIndexedArticles } from '../lib/index-utils';
import { BaseCommand } from '../utils/base-command';
import { gray, log } from '../utils/logging';
import { sleep } from '../utils/utils';

export default class Push extends BaseCommand {
  static args = [
    { name: 'index', required: false, default: DEFAULT_ARTICLE_INDEX_PATH },
  ];

  static description = 'Read articles from a local path and push to DEV.';

  static flags = {
    timeout: flags.integer({
      char: 't',
      description: 'Timeout in milliseconds between calls to DEV api',
      env: 'DEV_TO_SYNC_TIMEOUT',
      default: 500,
    }),
  };

  async run() {
    if (!this.client) {
      throw new Error(`Error initializing client`);
    }

    const { args, flags } = this.parse(Push);

    const timeout = flags.timeout;
    const indexPath = args.index;

    const articles = await this.client.getArticles();

    const indexed = await getIndexedArticles(indexPath);

    const changes = indexed
      .filter((entry) => {
        const remote = articles.find((article) => article.id === entry.id);

        return remote?.body_markdown !== entry.content;
      })
      .filter((entry) => {
        if (!entry.content) {
          return false;
        }
        const valid = validateFrontMatter(entry.content);

        return !!valid;
      });

    if (changes.length > 0) {
      let i = 0;
      for (const entry of changes) {
        i++;
        if (!entry.content) {
          continue;
        }
        const res = await this.client.updateArticle(entry.id, entry.content);
        if (!res) {
          throw new Error('Something went wrong');
        }
        log(`Updated post`, res.title + ' ' + gray(res.url));
        if (i > 1) {
          await sleep(timeout);
        }
      }
    } else {
      log(`All ${indexed.length} articles are in sync!`);
    }
  }
}
