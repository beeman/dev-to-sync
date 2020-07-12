import { Command } from '@oclif/command';
import { mkdirp, pathExists, readJSON } from 'fs-extra';
import { join } from 'path';
import { updateConfigFile } from '../lib/config/utils/config-utils';
import { error } from './logging';
import { defaultUserConfig, UserConfig } from './user-config';

export abstract class BaseCommand extends Command {
  public readonly configFile = join(this.config.configDir, 'config.json');

  public userConfig: UserConfig = defaultUserConfig;

  async init() {
    if (!(await pathExists(this.configFile))) {
      if (!(await pathExists(this.config.configDir))) {
        await mkdirp(this.config.configDir);
      }
      await updateConfigFile(this.config, defaultUserConfig);
    }
    try {
      this.userConfig = await readJSON(this.configFile);
    } catch (e) {
      error(`Unable to read JSON file: ` + e.message);
    }
  }
}
