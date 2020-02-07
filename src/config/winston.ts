import { resolve } from 'path';

const options = {
  file: {
    level: 'info',
    filename: `${ resolve(__dirname, '..') }/logs/exceptions.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export default options;
