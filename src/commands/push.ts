import { Command, flags } from '@oclif/command';
import { readFileSync } from 'fs';
import { join } from 'path';
import { validateFrontMatter } from '../lib/frontmatter-utils';
import { getIndex } from '../lib/index-utils';
import { client, sleep } from '../lib/utils';

export default class Push extends Command {
  static args = [{ name: 'index', required: false }];

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
    const { args, flags } = this.parse(Push);

    const timeout = flags.timeout;
    const indexPath = args.index || join('./dev-to-articles.json');
    const index = await getIndex(indexPath);

    const articles = await client.getArticles();

    const indexed = index.map((entry) => {
      const path = entry.path || entry.relativePathToArticle || '';
      return {
        id: entry.id,
        path,
        content: readFileSync(path, 'utf-8'),
      };
    });

    const changes = indexed
      .filter((entry) => {
        const remote = articles.find((article) => article.id === entry.id);

        return remote?.body_markdown !== entry.content;
      })
      .filter((entry) => {
        const valid = validateFrontMatter(entry.content);

        return !!valid;
      });

    if (changes.length > 0) {
      let i = 0;
      for (const entry of changes) {
        i++;
        const res = await client.updateArticle(entry.id, entry.content);
        if (!res) {
          throw new Error('Something went wrong');
        }
        console.log(`Updated post ${res.title}`);
        if (i > 1) {
          await sleep(timeout);
        }
      }
    } else {
      console.log(`All ${indexed.length} articles are in sync!`);
    }
  }
}
