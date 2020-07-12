import { flags } from '@oclif/command';
import { upsertArticle } from '../lib/article-utils';
import { BaseCommand } from '../utils/base-command';

export default class Pull extends BaseCommand {
  static description =
    'Pull articles from the DEV api and save them in a local path.';

  static flags = {
    dir: flags.string({
      description: 'Name of the directory the articles will be stored in',
      default: 'posts',
    }),
  };

  static args = [
    { name: 'index', required: false, default: './dev-to-articles.json' },
  ];

  async run() {
    if (!this.client) {
      throw new Error(`Error initializing client`);
    }

    const { args, flags } = this.parse(Pull);

    const indexPath = args.index;
    const dir = flags.dir;

    const articles = await this.client.getArticles();

    for (const article of articles) {
      await upsertArticle(indexPath, dir, article);
    }
  }
}
