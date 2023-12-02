import { Kafka } from "kafkajs";
import dotenv from "dotenv";

//Configs
import { logger } from "configs/logger";

//Init dotenv
dotenv.config({ path: "./.env" });

//Init Kafka
const kafka = new Kafka({
  clientId: "open-commerce-mailer",
  brokers: process.env.KAFKA_BROKERS,
});

//Start kafka consumer
const consumer = kafka.consumer({ groupId: "open-commerce-mailer-group" });
await consumer.connect();
await consumer.subscribe({ topic: "open-commerce-mailer" });

//Catch messages
await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    //Test handling
    logger.info(
      {
        value: message.value.toString(),
      },
      "Message data"
    );
    logger.info("[OPEN-COMMERCE-MAILER]: Message handled");
  },
});

//Log success
logger.info("[OPEN-COMMERCE-MAILER]: Mailer started listening for messages...");
