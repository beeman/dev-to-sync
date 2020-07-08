import { Command } from '@oclif/command';
import { defaultArticle } from '../lib/article-utils';
import { client } from '../lib/utils';

export default class Create extends Command {
  static args = [{ name: 'title', required: true }];

  static description = 'Create an article on DEV';

  async run() {
    const { args } = this.parse(Create);

    const title = args.title;

    console.log('Creating post with title ' + title);

    const res = await client.createArticle(title, defaultArticle(title));

    if (res) {
      console.log(`Created article ${res.title}`);
    }
  }
}
