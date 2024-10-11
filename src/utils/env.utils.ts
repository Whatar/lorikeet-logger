// Models
import { Options } from '../model/options.model';

export function updateEnv(options: Options = {}) {
  setEnv('LORIKEET_HIDE_LOG', options.hideLog, false);
  setEnv('LORIKEET_EMOJI', options.emoji, true);
  setEnv('LORIKEET_SEPARATOR', options.separator, ' ');
}

function setEnv(key: string, value: boolean | number | string | undefined, defaultValue: boolean | number | string) {
  process.env[key] = value === undefined ? defaultValue.toString() : value.toString();
}