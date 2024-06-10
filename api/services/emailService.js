const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendWelcomeEmail = async (email, username) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Miles&Smiles",
    text: `Dear ${username}, welcome to Miles&Smiles! Enjoy the benefits of our program.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendPointsUpdateEmail = async (email, username, points) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Miles&Smiles Points Update",
    text: `Dear ${username}, your account has been updated with ${points} points.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendWelcomeEmail, sendPointsUpdateEmail };
