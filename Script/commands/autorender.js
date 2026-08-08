const axios = require("axios");

module.exports = {
  config: {
    name: "autorender",
    version: "1.0.0",
    author: "Mukul",
    countDown: 5,
    role: 2,
    category: "system",
    shortDescription: "Render auto run every 6 hours",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    const API_KEY = process.env.RENDER_API_KEY;
    const SERVICE_ID = process.env.RENDER_SERVICE_ID;

    if (!API_KEY || !SERVICE_ID) {
      return message.reply(
        "❌ RENDER_API_KEY অথবা RENDER_SERVICE_ID সেট করা নেই!"
      );
    }

    message.reply(
      "✅ Render Auto Run চালু হয়েছে!\n" +
      "⏰ প্রতি ৬ ঘণ্টা পরপর Render deploy হবে।"
    );

    setInterval(async () => {
      try {
        await axios.post(
          `https://api.render.com/v1/services/${SERVICE_ID}/deploys`,
          {},
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json"
            }
          }
        );

        console.log("✅ Render Auto Run সফল!");
      } catch (error) {
        console.error(
          "❌ Render Auto Run Error:",
          error.response?.data || error.message
        );
      }
    }, 6 * 60 * 60 * 1000);
  }
};
