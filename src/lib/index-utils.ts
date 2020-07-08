import { pathExists, readJSON, writeJSON } from 'fs-extra';

interface IndexEntry {
  id: number;
  path: string;
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
