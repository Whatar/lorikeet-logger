import * as dotenv from 'dotenv';

// Utils
import { convertToString } from './utils/string.utils';
import { updateEnv } from './utils/env.utils';

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

// Load the evirnoment variables
dotenv.config();

/** Override the default options */
const configure = (options: Options): void => {
  updateEnv(options);
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
  if (process.env.LORIKEET_HIDE_LOG === 'true') {
    return;
  }

  console.log(
    (process.env.LORIKEET_EMOJI === 'true' && emoji != '' ? emoji + ' ' : '') +
      messageArray.join(process.env.LORIKEET_SEPARATOR) +
      Color.RESET
  );
};

// Configure the logger with the default options
updateEnv();

export { info, warn, err, ok, log, configure };
