import { Command } from '@oclif/command';
import { client } from '../lib/utils';

export default class List extends Command {
  static description = 'List articles in a DEV account';

  async run() {
    const articles = await client.getAccountArticles();

    for (const article of articles) {
      console.log(article.title);
    }
  }
}
