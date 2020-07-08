import { Command, flags } from '@oclif/command';
import { join } from 'path';
import { client, upsertArticle } from '../lib/utils';

export default class Pull extends Command {
  static description =
    'Pull articles from the DEV api and save them in a local path.';

  static flags = {
    dir: flags.string({
      description: 'Name of the directory the articles will be stored in',
      default: 'posts',
    }),
  };

  static args = [{ name: 'index', required: false }];

  async run() {
    const { args, flags } = this.parse(Pull);

    const indexPath = args.index || join('./dev-to-articles.json');
    const dir = flags.dir;

    const articles = await client.getAccountArticles();

    for (const article of articles) {
      await upsertArticle(indexPath, dir, article);
    }
  }
}
