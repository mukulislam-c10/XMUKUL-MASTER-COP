const http = require("http");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running 24/7");
}).listen(PORT, () => {
  console.log(`Keep Alive Server Running On Port ${PORT}`);
});

// প্রতি ৫ মিনিটে লগ দেখাবে
setInterval(() => {
  console.log("Bot is alive:", new Date().toLocaleString());
}, 5 * 60 * 1000);
