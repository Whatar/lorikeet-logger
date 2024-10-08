// Utils
import { convertToString } from './utils/string.utils';
import { getOptionsFromEnv, uploadOptionsToEnv } from './utils/env.utils';

// Models
import { Options } from './model/options.model';

enum Color {
  WHITE = '\x1b[37m', // White for general information
  BLACK = '\x1b[30m', // Black for general information
  GREEN = '\x1b[32m', // Green for success or positive messages
  YELLOW = '\x1b[33m', // Yellow for warnings or cautionary messages
  RED = '\x1b[31m', // Red for errors or critical messages
  RESET = '\x1b[0m' // Reset to default color
}

let loadedOptions = {
  hideLog: false,
  emoji: true,
  separator: ' '
} as Options;

/** Configure the logger with the given options */
const configure = (options: Options): Options => {
  loadedOptions.emoji = options.emoji === undefined ? loadedOptions.emoji : options.emoji;
  loadedOptions.hideLog = options.hideLog === undefined ? loadedOptions.hideLog : options.hideLog;
  loadedOptions.separator = options.separator === undefined ? loadedOptions.separator : options.separator;

  uploadOptionsToEnv(loadedOptions);

  return loadedOptions;
};

/** Initialize the logger with the default options or the options from the environment variables */
const initialize = () => {
  loadedOptions = configure(getOptionsFromEnv());
};

/** Log an information message */
const info = (...message: unknown[]): void => {
  print(
    '❔',
    message.map((msg) => Color.BLACK + convertToString(msg))
  );
};

/** Log a warning message */
const warn = (...message: unknown[]): void => {
  print(
    '⚠️',
    message.map((msg) => Color.YELLOW + convertToString(msg))
  );
};

/** Log an error message */
const err = (...message: unknown[]): void => {
  print(
    '❌',
    message.map((msg) => Color.RED + convertToString(msg))
  );
};

/** Log a success message */
const ok = (...message: unknown[]): void => {
  print(
    '✅',
    message.map((msg) => Color.GREEN + convertToString(msg))
  );
};

/** Log the message to the console, without any emoji */
const log = (...message: unknown[]): void => {
  print(
    '',
    message.map((msg) => Color.WHITE + convertToString(msg, false))
  );
};

/** Print the message to the console */
const print = (emoji: string, messageArray: string[]): void => {
  if (loadedOptions.hideLog) {
    return;
  }

  console.log((loadedOptions.emoji ? emoji + ' ' : '') + messageArray.join(loadedOptions.separator) + Color.RESET);
};

// Initialize the logger
initialize();

export { info, warn, err, ok, log, configure };
