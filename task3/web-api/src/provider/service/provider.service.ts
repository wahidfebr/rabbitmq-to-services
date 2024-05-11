import { Injectable } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { IProviderMessageDTO } from '../dto/provider.dto';

@Injectable()
export class ProviderService {
  async sendCommand(message: IProviderMessageDTO): Promise<void> {
    try {
      const queue = process.env.AMQP_QUEUE || 'qtest1';
      const uri = process.env.AMQP_URI || 'amqp://localhost:5672';
      const connection = await amqplib.connect(uri);
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, {
        durable: true,
      });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log('Sent %s to rabbitmq', JSON.stringify(message));
    } catch (error) {
      console.error('Provider Service Error:', error);
    }
  }
}
