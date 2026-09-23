const axios = require('axios');
const fs = require('fs');
const path = require('path');

const adminData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config.json'), 'utf-8'));

module.exports["config"] = {
  name: "pastebin-alert",
  version: "1.0",
  info: "Catch Pastebin links and send them to the host owner",
  credits: "liane"
};

module.exports["handleEvent"] = async ({ chat, event }) => {
  try {
    const threadID = event.threadID;
    const text = event.body;

    const pastebinLinkRegex = /https:\/\/pastebin\.com\/raw\/[\w+]/;

    if (pastebinLinkRegex.test(text)) {
      const threadInfo = await chat.threadInfo(threadID);
      const threadName = threadInfo.threadName || 'No-Name';
      
      const messageBody = `📜 | 𝗣𝗔𝗦𝗧𝗘𝗕𝗜𝗡 𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗 𝗢𝗡\n\n𝖳𝗁𝗋𝖾𝖺𝖽: ${threadName}\nUser: ${event.senderID}\n\n𝖫𝗂𝗇𝗄:\n\n${text}`;

      for (const adminID of adminData.admins) {
        await chat.reply({ body: messageBody }, adminID);
      }
    }

    const regex = /https:\/\/pastebin\.com\/raw\/\S+$/;

    if (regex.test(text)) {
      const imageUrl = 'https://files.catbox.moe/3oqp8y.jpeg';
      await chat.reply({ attachment: await chat.stream(imageUrl) });
    }
    
  } catch (error) {
    console.error(error.message);
  }
};

module.exports["run"] = async ({ args, chat }) => {
  await chat.reply("This is an event process that automatically detects pastebin links and sends them to the bot moderator or host.");
};
