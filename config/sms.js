const Vonage = require("@vonage/server-sdk");

const sendSMS = (phone, req, res, next) => {
  const vonage = new Vonage({
    apiKey: "8f7ba9ae",
    apiSecret: "tFPUsY7UNumMjhsQ",
  });
  const from = "SaiGon";
  const to = "84778651959";
  const text = "234567";

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
};

module.exports = {
  sendSMS,
};
