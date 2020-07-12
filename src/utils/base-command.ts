import { Command } from '@oclif/command';
import { mkdirp, pathExists, readJSON } from 'fs-extra';
import { join } from 'path';
import { updateConfigFile } from '../lib/config/utils/config-utils';
import { DevtoClient } from '../lib/devto-client';
import { error } from './logging';
import { defaultUserConfig, UserConfig } from './user-config';

export abstract class BaseCommand extends Command {
  public readonly configFile = join(this.config.configDir, 'config.json');

  public userConfig: UserConfig = defaultUserConfig;

  public client?: DevtoClient;

  async init() {
    if (!(await pathExists(this.configFile))) {
      if (!(await pathExists(this.config.configDir))) {
        await mkdirp(this.config.configDir);
      }
      await updateConfigFile(this.config, defaultUserConfig);
    }
    try {
      this.userConfig = await readJSON(this.configFile);

      const token = process.env.DEV_TO_TOKEN || this.userConfig.devto?.token;
      if (token) {
        this.client = new DevtoClient(token);
      } else {
        error('Environment variable DEV_TO_TOKEN not found');
      }
    } catch (e) {
      error(`Unable to read JSON file: ` + e.message);
    }
  }
}
