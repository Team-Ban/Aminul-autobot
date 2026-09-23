const axios = require('axios');
const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, '../config.json');

module.exports["config"] = {
  name: "autobot",
  aliases: ["fbbot"],
  info: "This command makes your account a bot",
  type: "tools",
  usage: "online [paging] or create [owner_uid] [prefix] [appstate]",
  version: "1.0.0",
  credits: "mark hitsuraan",
  role: 0,
};

module.exports["run"] = async ({ api, chat, event, args, font, global }) => {
  if (!fs.existsSync(configPath)) {
    return api.sendMessage('Configuration file not found!', event.threadID, event.messageID);
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  
  const server = 
  (config.weblink && config.port ? `${config.weblink}:${config.port}` : null) ||
  config.weblink ||
  `http://localhost:${process.env.PORT || 3000}`;

  const tin = txt => font.monospace(txt);
  const input = args[0];
  let inputState = args.slice(3).join(" ");
  const inputPrefix = args[2] || "";
  const inputAdmin = args[1] || "";
  const page = parseInt(args[1]) || 0;
  const pageSize = 10;

  if (!input) {
    chat.reply(tin(`Autobot usage:\n\nTo create bot use "Autobot create [owner or admin-uid] [prefix] [appstate]"\n\nTo see active list "Autobot online [page_number]"`) + `\n\nServer: ${server}`, event.threadID, event.messageID);
    return;
  }

  if (input === "online") {
    try {
      const checking = await chat.reply(tin("⏳ Checking active session, please wait..."));
      const url = `${server}/info`;
      const response = await axios.get(url);
      const aiList = response.data;

      if (Array.isArray(aiList)) {
        if (aiList.length === 0) {
          checking.edit(tin("No active bots currently running."));
          return;
        }
        const totalPages = Math.ceil(aiList.length / pageSize);
        const currentPage = Math.min(Math.max(page, 1), totalPages); // Ensure page number is within valid range
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedList = aiList.slice(startIndex, endIndex);

        let message = paginatedList.map((result, index) => {
          const { name, profileUrl, time } = result;
          const days = Math.floor(time / (3600 * 24));
          const hours = Math.floor((time % (3600 * 24)) / 3600);
          const minutes = Math.floor((time % 3600) / 60);
          const seconds = Math.floor(time % 60);
          return `[ ${startIndex + index + 1} ]\n𝗡𝗔𝗠𝗘: ${name || "Unknown Bot"}\n𝗨𝗣𝗧𝗜𝗠𝗘: ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds\n\n`;
        }).join('');

        message += `Page ${currentPage} of ${totalPages}\nUse "Autobot online [page_number]" to view other pages.`;
        checking.edit(tin(`List of Active Bots.\n\n${message}`));
      } else {
        checking.edit(tin("Handle error: aiList is not an array"));
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message;
      chat.reply(tin(`Failed to get active bots: ${errMsg}`), event.threadID, event.messageID);
    }
  } else if (input === "create") {
    if (event.type === "message_reply" && event.messageReply.body) {
      inputState = event.messageReply.body;
    }
    try {
      if (!inputState) {
        return chat.reply(tin("Please provide a valid appstate JSON or reply to a message containing it."), event.threadID, event.messageID);
      }
      const states = JSON.parse(inputState);
      if (states && typeof states === 'object') {
        const making = await chat.reply(tin("⏳ Making your account as a bot, please wait..."));
        try {
          const response = await axios.post(`${server}/login`, {
            state: states,
            prefix: inputPrefix,
            admin: inputAdmin,
          });
          const data = response.data;
          making.edit(tin(data.message || "Authentication successful; user logged in."));
        } catch (postErr) {
          const errMsg = postErr.response?.data?.message || postErr.message;
          making.edit(tin(`Error: ${errMsg}`));
        }
      } else {
        chat.reply(tin('Under development, not fully stable. I hope you understand. :>'), event.threadID, event.messageID);
      }
    } catch (parseErr) {
      chat.reply(tin(`JSON Parse Error: ${parseErr.message}\nMake sure your appstate is valid JSON format.`), event.threadID, event.messageID);
    }
  }
};