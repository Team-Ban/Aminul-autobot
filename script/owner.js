const moment = require("moment");
moment.locale("bn");

module.exports.config = {
  name: "owner",
  info: "Check information about the owner of the bot",
  cd: 20,
  isPrefix: false,
};

module.exports.run = async ({ chat, font, global }) => {
  try {
    const now = moment().format("LLLL");
    const uptime = process.uptime();
    const formatUptime = (seconds) => {
      const pad = (s) => (s < 10 ? "0" + s : s);
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      return `${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`;
    };

    const botStats = {
      commands: global.commands?.size || "N/A",
      users: global.data?.allUserID?.length || "N/A",
      ram: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
    };

    const ownerInfo = font.monospace(`
╔═══════✿𝐁𝐎𝐓 𝐈𝐍𝐅𝐎✿══════╗
💐আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ💐
╚══════════════════════╝

➤ 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 : 『😽👉𝐀𝐌𝐈𝐍𝐔𝐋 𝐒𝐎𝐑𝐃𝐀𝐑👈😽』
➤ 𝗔𝗗𝗗𝗥𝗘𝗦𝗦 : 𝐑𝐀𝐉𝐒𝐇𝐀𝐇𝐈, 𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇
➤ 𝗥𝗘𝗟𝗜𝗚𝗜𝗢𝗡 : 𝐈𝐒𝐋𝐀𝐌
➤ 𝗚𝗘𝗡𝗗𝗘𝗥 : 𝐌𝐀𝐋𝐄
➤ 𝗥𝗘𝗟𝗔𝗧𝗜𝗢𝗡𝗦𝗛𝗜𝗣 : 𝐒𝐈𝐍𝐆𝐋𝐄
➤ 𝗪𝗢𝗥𝗞 : 𝐒𝐓𝐔𝐃𝐘
➤ 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 : +8801704407109
➤ 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 :
https://www.facebook.com/profile.php?id=100071880593545

╔═══════✿𝐒𝐘𝐒𝐓𝐄𝐌✿════════╗
➤ 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘 : ꯭𓆩𝐀𝐌𝐈𝐍𝐔𝐋 𝐁𝐎𝐓𓆪
➤ 𝗣𝗥𝗘𝗙𝗜𝗫 : #
➤ 𝗗𝗔𝗧𝗘 : ${moment().format("DD/MM/YYYY")}
➤ 𝗧𝗜𝗠𝗘 : ${moment().format("hh:mm:ss A")}
➤ 𝗨𝗣𝗧𝗜𝗠𝗘 : ${formatUptime(uptime)}
➤ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 : ${botStats.commands}
➤ 𝗨𝗦𝗘𝗥𝗦 : ${botStats.users}
➤ 𝗥𝗔𝗠 𝗨𝗦𝗘 : ${botStats.ram}
➤ 𝗧𝗘𝗔𝗠 : 🚀 Github Team 🚀
╚═══════════════════════╝

🫶 𝗠𝗢𝗢𝗗 : Coding all day, dreaming in JavaScript!
🧠 𝗤𝗨𝗢𝗧𝗘 : "Work smart, not just hard."

🌐 Facebook: https://www.facebook.com/profile.php?id=100071880593545
📞 WhatsApp: wp.me/8801704407109

🫶 𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚 ꯭𓆩𝐀𝐌𝐈𝐍𝐔𝐋 𝐁𝐎𝐓𓆪
    `.trim());

    return chat.reply(ownerInfo);
  } catch (e) {
    chat.reply(font.monospace(`Error: ${e.message}`));
  }
};
