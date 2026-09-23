const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const tinyurl = require("tinyurl");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json");
  return base.data.api;
};

module.exports = {
  config: {
    name: "alldl",
    version: "2.0",
    credits: "Dipto x Aminul",
    hasPermission: 0,
    description: "Auto-download any media link in group",
    category: "media",
    usages: "Just send a media link",
    cooldowns: 3,
    usePrefix: false,
    dependencies: {
      axios: "",
      "fs-extra": "",
      path: "",
      tinyurl: "",
    },
  },

  handleEvent: async function ({ event, api }) {
    const { body, threadID, messageID } = event;
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const match = body?.match(urlRegex);

    if (!match || !match[0]) return;
    const input = match[0];

    api.setMessageReaction("⏳", messageID, () => {}, true);

    try {
      // Handle Imgur image separately
      if (input.startsWith("https://i.imgur.com")) {
        const ext = path.extname(input);
        const imgPath = path.join(__dirname, "cache", `img${ext}`);
        const imgData = await axios.get(input, { responseType: "arraybuffer" });
        fs.writeFileSync(imgPath, Buffer.from(imgData.data, "binary"));

        api.setMessageReaction("✅", messageID, () => {}, true);
        return api.sendMessage(
          {
            body: `✨ 𝗜𝗺𝗮𝗴𝗲 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗱\n🔗 ${input}`,
            attachment: fs.createReadStream(imgPath),
          },
          threadID,
          () => fs.unlinkSync(imgPath),
          messageID
        );
      }

      // Fetch video info
      const { data } = await axios.get(`${await baseApiUrl()}/alldl?url=${encodeURIComponent(input)}`);
      const videoBuffer = (await axios.get(data.result, { responseType: "arraybuffer" })).data;
      const videoPath = path.join(__dirname, "cache", "auto_video.mp4");
      fs.writeFileSync(videoPath, Buffer.from(videoBuffer));
      const shortUrl = await tinyurl.shorten(data.result);

      api.setMessageReaction("✅", messageID, () => {}, true);
      return api.sendMessage(
        {
          body:
`「 🎞 𝗩𝗶𝗱𝗲𝗼 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗱 」
────────────────────
📥 𝗧𝗶𝘁𝗹𝗲: ${data.cp || "No caption"}
🔗 𝗦𝗵𝗼𝗿𝘁 𝗨𝗥𝗟: ${shortUrl}
📁 𝗙𝗿𝗼𝗺: ${input}
────────────────────`,
          attachment: fs.createReadStream(videoPath),
        },
        threadID,
        () => fs.unlinkSync(videoPath),
        messageID
      );
    } catch (err) {
      console.error("alldl error:", err.message || err);
      api.setMessageReaction("❌", messageID, () => {}, true);
      return api.sendMessage("❌ | Couldn't download the link. Try again later.", threadID, messageID);
    }
  },

  run: () => {} // Required but unused since we rely on handleEvent
};
