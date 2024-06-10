const cron = require("node-cron");
const User = require("../models/User");
const Flight = require("../models/Flight");
const { sendPointsUpdateEmail, sendWelcomeEmail } = require("./emailService");

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Nightly process started...");

    const flights = await Flight.find({
      status: "completed",
      processed: false,
    });
    for (const flight of flights) {
      const user = await User.findById(flight.userId);
      if (user && user.isMilesMember) {
        const pointsEarned = calculatePoints(flight);
        user.milesPoints += pointsEarned;
        await user.save();

        sendPointsUpdateEmail(user.email, user.firstName, pointsEarned);
        flight.processed = true;
        await flight.save();
      }
    }

    console.log("Nightly process completed.");
  } catch (error) {
    console.error("Error during nightly process:", error);
  }
});

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Welcome email process started...");

    const newMembers = await User.find({
      welcomeEmailSent: false,
      isMilesMember: true,
    });
    for (const member of newMembers) {
      await sendWelcomeEmail(member.email, member.username);
      member.welcomeEmailSent = true;
      await member.save();
    }

    console.log("Welcome email process completed.");
  } catch (error) {
    console.error("Error during welcome email process:", error);
  }
});

function calculatePoints(flight) {
  if (flight.paymentMethod === "creditCard") {
    return flight.amount * 0.1;
  }
  return 0;
}

module.exports = { cron };
