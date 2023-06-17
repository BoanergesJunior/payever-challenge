import { Channel, connect } from 'amqplib';

export default async function producer(): Promise<Channel> {
  const connection = await connect(process.env.AMQP_SERVER_URL);
  const channel = await connection.createChannel();

  await channel.assertQueue(process.env.QUEUE_NAME);

  return channel;
}
