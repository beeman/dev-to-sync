import { flags } from '@oclif/command';
import { getConfigParam } from '../../lib/config/config';
import { BaseCommand } from '../../utils/base-command';

export default class ConfigGet extends BaseCommand {
  static description = 'Retrieve value from app config';

  static flags = {
    help: flags.help({ char: 'h' }),
    global: flags.boolean({
      char: 'g',
      description: 'Global config',
      required: true,
    }),
  };

  static args = [
    {
      name: 'key',
      required: true,
    },
  ];

  async run() {
    const { args, flags } = this.parse(ConfigGet);

    await getConfigParam({
      global: flags.global,
      key: args.key,
      userConfig: this.userConfig,
      config: this.config,
    });
  }
}
