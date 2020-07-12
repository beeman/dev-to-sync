import { BaseCommand } from '../utils/base-command';
import { greenBright, yellowBright, log } from '../utils/logging';

export default class List extends BaseCommand {
  static description = 'List articles in a DEV account';

  async run() {
    if (!this.client) {
      throw new Error(`Error initializing client`);
    }

    const articles = await this.client.getArticles();

    for (const article of articles) {
      log(
        `${
          article.published
            ? greenBright('[PUBLISHED]')
            : yellowBright('[  DRAFT  ]')
        }`,
        article.title
      );
    }
  }
}
