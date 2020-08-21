import { DEFAULT_ARTICLE_INDEX_PATH } from '../lib/config/config';
import { getIndexedArticleMap } from '../lib/index-utils';
import { BaseCommand } from '../utils/base-command';
import {
  greenBright,
  gray,
  yellowBright,
  log,
  redBright,
} from '../utils/logging';

export default class List extends BaseCommand {
  static args = [
    { name: 'index', required: false, default: DEFAULT_ARTICLE_INDEX_PATH },
  ];
  static description = 'List articles in a DEV account';

  async run() {
    if (!this.client) {
      throw new Error(`Error initializing client`);
    }
    const { args } = this.parse(List);
    const indexPath = args.index;
    const indexed = await getIndexedArticleMap(indexPath);

    const articles = await this.client.getArticles();

    for (const article of articles) {
      const exists = indexed[article.id];

      const synced =
        exists.content === article.body_markdown
          ? greenBright(' SYNCED! ')
          : yellowBright(' UPDATES ');

      const status = exists.content ? synced : redBright(' NO FILE ');

      log(
        `(${gray(article.id)})`,
        `${
          article.published
            ? greenBright('[PUBLISHED]')
            : yellowBright('[  DRAFT  ]')
        }`,
        `(${gray(status)})`,
        article.title
      );
    }
  }
}
