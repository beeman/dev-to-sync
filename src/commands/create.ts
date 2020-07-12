import { defaultArticle } from '../lib/article-utils';
import { BaseCommand } from '../utils/base-command';

export default class Create extends BaseCommand {
  static args = [{ name: 'title', required: true }];

  static description = 'Create an article on DEV';

  async run() {
    if (!this.client) {
      throw new Error(`Error initializing client`);
    }

    const { args } = this.parse(Create);

    const title = args.title;

    console.log('Creating post with title ' + title);

    const res = await this.client.createArticle(title, defaultArticle(title));

    if (res) {
      console.log(`Created article ${res.title}`);
    }
  }
}
