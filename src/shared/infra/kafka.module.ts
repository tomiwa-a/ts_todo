import { Kafka } from "kafkajs";

class KafkaModule {
  private kafka: Kafka;
  constructor() {
    this.kafka = new Kafka({
      clientId: "todo",
      brokers: ["localhost:9092"],
    });
    console.log(this.kafka);
  }

  sendMessage = async (key: string, value: string) => {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic: "topic-name",
      messages: [{ key, value }],
    });
  };

  getMessage = async (key: string) => {
    const consumer = this.kafka.consumer({ groupId: "todo" });
    await consumer.connect();
    await consumer.subscribe({ topic: "topic-name", fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ message }) => {
        if (message.key!.toString() === key) {
          console.log(message.value!.toString());
        }
      },
    });
  };
}

export default KafkaModule;
