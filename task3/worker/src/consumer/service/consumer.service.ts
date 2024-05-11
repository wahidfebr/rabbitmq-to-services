import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { IConsumerMessageDTO } from '../dto/consumer.dto';
import { Test01Service } from 'src/test01/service/test01.service';
import { ITest01StoreDTO } from 'src/test01/dto/test01.dto';

@Injectable()
export class ConsumerService implements OnModuleInit {
  constructor(private service: Test01Service) {}

  async onModuleInit() {
    await this.startConsuming();
  }

  private async startConsuming() {
    try {
      const queue = process.env.AMQP_QUEUE || 'qtest1';
      const uri = process.env.AMQP_URI || 'amqp://localhost:5672';
      const connection = await amqplib.connect(uri);
      const channel = await connection.createChannel();

      await channel.assertQueue(queue, {
        durable: true,
      });

      // Configure RabbitMQ to deliver only one message at a time
      channel.prefetch(1);

      channel.consume(queue, async (msg: amqplib.ConsumeMessage | null) => {
        if (msg !== null) {
          try {
            const { command, data } = this.toDTO(msg);
            switch (command) {
              case 'create':
                await this.service.store(<ITest01StoreDTO>data);
                console.log(`Success create data ${data.nama}`);
                break;
              case 'update':
                await this.service.update(<ITest01StoreDTO>data, data.id);
                console.log(`Success update data ${data.nama}`);
                break;
              case 'delete':
                await this.service.destroy(data.id);
                console.log(`Success delete data with id ${data.id}`);
                break;
            }
          } catch (error) {
            console.error('Failed to run command:', <Error>error.message);
          } finally {
            channel.ack(msg);
          }
        }
      });
    } catch (error) {
      console.error('Consumer Service Error:', error);
    }
  }

  private toDTO(msg: amqplib.ConsumeMessage): IConsumerMessageDTO {
    const parsedMessage = JSON.parse(
      msg.content.toString(),
    ) as IConsumerMessageDTO;

    switch (parsedMessage.command) {
      case 'create':
        if (typeof parsedMessage.data.nama !== 'string') {
          throw new Error('invalid data nama type');
        }
        if (typeof parsedMessage.data.status !== 'number') {
          throw new Error('invalid data status type');
        }
        break;
      case 'update':
        if (typeof parsedMessage.data.id !== 'number') {
          throw new Error('invalid data id type');
        }
        if (typeof parsedMessage.data.nama !== 'string') {
          throw new Error('invalid data nama type');
        }
        if (typeof parsedMessage.data.status !== 'number') {
          throw new Error('invalid data status type');
        }
        break;
      case 'delete':
        if (typeof parsedMessage.data.id !== 'number') {
          throw new Error('invalid data id type');
        }
        break;
      default:
        throw new Error('invalid consumer command');
    }

    return {
      command: parsedMessage.command,
      data: {
        id: parsedMessage.data.id,
        nama: parsedMessage.data.nama,
        status: parsedMessage.data.status,
      },
    };
  }
}
