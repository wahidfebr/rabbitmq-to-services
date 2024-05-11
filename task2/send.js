const amqplib = require('amqplib');

(async () => {
  const queue = 'qtest1';
  const conn = await amqplib.connect('amqp://localhost:5672');

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue, {
    durable: true,
  });

  let count = 0;
  setInterval(() => {
    const createData = {
      nama: `wahid-${count}-CREATE`,
      status: count,
    };
    const updateDate = {
      id: count,
      nama: `wahid-${count}-UPDATE`,
      status: count,
    };
    const deleteData = {
      id: count,
    };

    const msg = {
      command: 'create', // create | update | delete
      data: createData, // createData | updateData | deleteData
    };

    ch1.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log('[x] Sent %s', msg);
    count++;
  }, 5_000);
})();
