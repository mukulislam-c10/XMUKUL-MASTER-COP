const axios = require("axios");

module.exports = {
  config: {
    name: "restart6h",
    version: "1.0.0",
    author: "Mukul",
    countDown: 5,
    role: 2,
    category: "system",
    shortDescription: "Restart bot every 6 hours",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    const API_KEY = process.env.RENDER_API_KEY;
    const SERVICE_ID = process.env.RENDER_SERVICE_ID;

    if (!API_KEY || !SERVICE_ID) {
      return message.reply(
        "❌ Render API configuration পাওয়া যায়নি!"
      );
    }

    message.reply(
      "🔄 Auto Restart চালু হয়েছে!\n" +
      "⏰ প্রতি ৬ ঘণ্টা পর Render service restart হবে।"
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

        console.log("✅ Render restart/deploy request sent!");
      } catch (error) {
        console.error(
          "❌ Render restart error:",
          error.response?.data || error.message
        );
      }
    }, 6 * 60 * 60 * 1000);
  }
};
