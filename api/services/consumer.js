const amqp = require("amqplib/callback_api");
const { sendEmail } = require("./emailSender");

const consumeQueue = (queue, callback) => {
  amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(queue, {
        durable: false,
      });

      console.log(`Waiting for messages in ${queue}`);

      channel.consume(queue, (msg) => {
        if (msg !== null) {
          const messageContent = JSON.parse(msg.content.toString());
          console.log(`Received ${queue}:`, messageContent);
          callback(messageContent);
          channel.ack(msg);
        }
      });
    });
  });
};

const processWelcomeEmail = (msg) => {
  sendEmail(msg.email, "Welcome!", `Welcome, ${msg.username}!`);
};

const processPointsUpdateEmail = (msg) => {
  sendEmail(
    msg.email,
    "Miles&Smiles Points Update",
    `Dear ${msg.firstName}, your account has been updated with ${msg.points} points.`
  );
};

consumeQueue("welcome_email", processWelcomeEmail);
consumeQueue("points_update_email", processPointsUpdateEmail);
