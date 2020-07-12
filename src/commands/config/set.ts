import { flags } from '@oclif/command';
import { setConfigParam } from '../../lib/config/config';
import { BaseCommand } from '../../utils/base-command';

export default class ConfigSet extends BaseCommand {
  static description = 'Store value in app config';

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
    { name: 'value', required: true },
  ];

  async run() {
    const { args, flags } = this.parse(ConfigSet);

    await setConfigParam({
      global: flags.global,
      key: args.key,
      value: args.value,
      userConfig: this.userConfig,
      config: this.config,
    });
  }
}
