import { JsonObject } from 'type-fest';
import { execSync, ExecSyncOptions } from 'child_process';
import { mkdirpSync, writeJSONSync } from 'fs-extra';
import fetch from 'node-fetch';
import { dirname } from 'path';

import { log } from './logging';

export const exec = (command: string, options?: ExecSyncOptions): Buffer =>
  execSync(command, { stdio: [0, 1, 2], ...options });

export const run = (command: string) => {
  log('RUNNING', command);
  exec(command);
};

export async function fetchJson(url: string): Promise<JsonObject> {
  return fetch(url).then((data: any) => data.json());
}

export async function cacheUrls(urls: string[], cachePath: string) {
  mkdirpSync(dirname(cachePath));
  const results = await Promise.all(urls.map(fetchJson));
  const cache = urls.reduce(
    (acc, curr, i) => ({ ...acc, [curr]: results[i] }),
    {}
  );
  writeJSONSync(cachePath, cache, { spaces: 2 });
}
