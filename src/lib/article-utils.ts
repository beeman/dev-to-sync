import { ensureDir, pathExists, readFile, writeFile } from 'fs-extra';
import { basename, dirname, join } from 'path';
import { addToIndex, getIndex } from './index-utils';

export async function findArticle(
  indexPath: string,
  articleId: number
): Promise<boolean | string> {
  const index = await getIndex(indexPath);
  const found = index.find((item) => item.id === articleId);
  const path = found ? found.path || found.relativePathToArticle : null;

  if (!path || !(await pathExists(path))) {
    return false;
  }
  return readFile(path, 'utf-8');
}

function defaultArticle(title: string): string {
  return ['---', `title: ${title}`, 'published: false', '---'].join('\n');
}

export async function createArticle(path: string, content: string) {
  await ensureDir(dirname(path));
  return writeFile(
    path,
    content?.trim().length > 0 ? content : defaultArticle(basename(path))
  );
}

export async function updateArticle(path: string, content: string) {
  const existing = await readFile(path, 'utf-8');
  if (existing !== content) {
    console.log(`Update article ${path}`);
    return writeFile(path, content);
  }
}

export async function upsertArticle(
  indexPath: string,
  articleDir: string,
  article: { id: number; body_markdown: string; slug: string }
) {
  const articleId = article.id;
  const articleContent = article.body_markdown;
  const articleFilename = `${article.slug}.md`;
  const articlePath = join(articleDir, articleId.toString(), articleFilename);

  const found = await findArticle(indexPath, articleId);

  if (found) {
    if (found === articleContent) {
      console.log(`[SKIP] ${articlePath}`);
    } else {
      console.log(`[UPDATE] ${articlePath}`);
      await updateArticle(articlePath, articleContent);
    }
  } else {
    console.log(`[CREATE] ${articlePath}`);
    await createArticle(articlePath, articleContent);
    await addToIndex(indexPath, { id: articleId, path: articlePath });
  }
}
