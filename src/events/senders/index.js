import { KafkaClient, HighLevelProducer, KeyedMessage } from 'kafka-node';
import logger from '../../common/logger';


export default function (message) {
  const client = new KafkaClient({ kafkaHost: '127.0.0.1:9092' });

  const messagePrepare = new KeyedMessage(message.data.id, JSON.stringify(message));

  const payloads = [{
    topic: 'github-azure-sync',
    messages: [messagePrepare],
  }];
  logger.info(payloads);
  const producer = new HighLevelProducer(client);
  logger.info('[Kafka Event] Sending data to kafka')
  producer.on('ready', () => {
    producer.send(payloads, (err, data) => {
      if (!err) {
        logger.info('[Kafka Event] Data was succesfuly stored');
      } else {
        logger.info(err);
      }
    });
  });
}
