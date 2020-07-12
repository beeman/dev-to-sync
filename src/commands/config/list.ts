import { flags } from '@oclif/command';
import { listConfig } from '../../lib/config/config';
import { BaseCommand } from '../../utils/base-command';

export default class ConfigList extends BaseCommand {
  static description = 'List app config';

  static flags = {
    help: flags.help({ char: 'h' }),
    global: flags.boolean({
      char: 'g',
      description: 'Global config',
      required: true,
    }),
  };

  async run() {
    const { flags } = this.parse(ConfigList);

    await listConfig({
      global: flags.global,
      userConfig: this.userConfig,
      config: this.config,
    });
  }
}
