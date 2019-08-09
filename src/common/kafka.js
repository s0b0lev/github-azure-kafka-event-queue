import { Kafka } from 'kafkajs';
import config from '../../config';

const kafka = new Kafka({
  clientId: config.KAFKA_CLIENTID,
  brokers: config.KAFKA_BROKERS,
});
const producer = kafka.producer();

export default async (message) => {
  await producer.connect();
  await producer.send({
    topic: 'github-azure-sync',
    messages: [{ key: message.data.id.toString(), value: JSON.stringify(message) }],
  });
};
