import bunyan from 'bunyan';
import config from '../../config';

const logger = bunyan.createLogger({
  name: 'app',
  serializers: bunyan.stdSerializers,
  level: config.VERBOSE_LOGGING ? 'debug' : 'info',
});

export default logger;
