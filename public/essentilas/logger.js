import winston from 'winston';

const customLevels = {
    levels: {
      fatal: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
      trace: 5
    },
    colors: {
      fatal: 'red',
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'blue',
      trace: 'magenta'
    }
  };
  
  const logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console()
    ]
  });
  
  
  
export default logger

