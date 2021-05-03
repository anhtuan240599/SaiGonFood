const sendSMS = (req, res, next) => {
  const accountSid = "AC5b0bab77ceeb5e4fd8520af567f2f50f"; // Your Account SID from www.twilio.com/console
  const authToken = "e479ab3d3b359b0bcdd1c55fa44fe1b2"; // Your Auth Token from www.twilio.com/console
  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body: "234567",
      to: "+84778651959", // Text this number
      from: "+19287568185", // From a valid Twilio number
    })
    .then((message) => console.log(message))
    .catch((error) => console.log(error));
};

module.exports = {
  sendSMS,
};
