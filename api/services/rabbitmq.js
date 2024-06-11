const amqp = require("amqplib/callback_api");

let channel = null;

const connectRabbitMQ = (callback) => {
  amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, ch) => {
      if (error1) {
        throw error1;
      }
      channel = ch;
      console.log("RabbitMQ connected");
      callback();
    });
  });
};

const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }
  return channel;
};

module.exports = { connectRabbitMQ, getChannel };
