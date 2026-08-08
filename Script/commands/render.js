Install render.js const os = require("os");

module.exports = {
  config: {
    name: "render",
    version: "1.0.0",
    author: "Mukul",
    role: 0,
    shortDescription: "Render Status",
    category: "system"
  },

  onStart: async function ({ message }) {
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(0);
    const freeRam = (os.freemem() / 1024 / 1024).toFixed(0);
    const usedRam = totalRam - freeRam;

    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);

    const cpu = os.cpus()[0].model;

    return message.reply(
`🖥️ RENDER STATUS

💾 Total RAM : ${totalRam} MB
📦 Used RAM  : ${usedRam} MB
🟢 Free RAM  : ${freeRam} MB

⚙️ CPU : ${cpu}

⏰ Uptime : ${h}h ${m}m ${s}s

🤖 MUKUL BOT TIM™✓`
    );
  }
};
