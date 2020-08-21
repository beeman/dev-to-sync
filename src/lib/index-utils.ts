import { existsSync, readFileSync } from 'fs';
import { pathExists, readJSON, writeJSON } from 'fs-extra';

interface IndexEntry {
  id: number;
  path?: string;
  relativePathToArticle?: string;
  content?: string | null;
}

function createEmptyIndex(path: string) {
  return writeJSON(path, []);
}

function readIndex(path: string): Promise<IndexEntry[]> {
  return readJSON(path);
}

export async function getIndex(path: string) {
  if (!(await pathExists(path))) {
    await createEmptyIndex(path);
  }

  return readIndex(path);
}

export async function addToIndex(path: string, entry: IndexEntry) {
  const index = await readIndex(path);
  await writeJSON(path, [...index, entry], { spaces: 2 });
}

export async function getIndexedArticles(path: string): Promise<IndexEntry[]> {
  const index = await getIndex(path);

  return index.map((entry) => {
    const path = entry.path || entry.relativePathToArticle || '';
    return {
      id: entry.id,
      path,
      content: existsSync(path) ? readFileSync(path, 'utf-8') : null,
    };
  });
}

export async function getIndexedArticleMap(
  path: string
): Promise<Record<string, IndexEntry>> {
  const indexed = await getIndexedArticles(path);

  return indexed.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
}
