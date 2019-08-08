import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:9092'],
});
const producer = kafka.producer();

export default async (message) => {
  await producer.connect();
  await producer.send({
    topic: 'github-azure-sync',
    messages: [{ value: JSON.stringify(message) }],
  });
};
