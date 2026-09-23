module.exports = {
    config: {
        name: 'mention',
        info: "Mention host",
        type: "goibot",
    },
    handleEvent: async ({ chat, event }) => {
        // Check if event.body is defined before using it
        const message = event.body ? event.body.split(' ')[0].toLowerCase() : '';

        // Define keywords to detect in messages
        const detected = {
            bot: ["bot", "botbot", "jan"],
            master: ["@Aminul Sordar", "@100071880593545"],
            lyn: ["@lyn"],
            lyn_update: ["update?"]
        };

        // Define responses for each keyword category
        const responses = {
            bot:[ "𝖶𝖾 𝖺𝗋𝖾 𝖺 𝖠𝗆𝗂𝗇𝗎𝗅 𝖻𝗈𝗌𝖾𝗌 𝗂𝗇 𝗍𝗁𝖾 𝗏𝖾𝗋𝗌𝖾", "𝖶𝗁𝖺𝗍 𝖺𝗋𝖾 𝗒𝗈𝗎 𝖺𝗌𝗄𝗂𝗇𝗀 𝗆𝖾 𝗍𝗈 𝖽𝗈?", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎 𝖻𝖺𝖻𝗒 𝗆𝖾𝗒𝖾 𝖼𝗁𝗂𝗉𝖺𝗒 𝖺𝗌𝗈", "𝖫𝗈𝗏𝖾 𝗒𝗈𝗎 𝟥𝟢𝟢𝟢-😍💋💝" ,"𝖶𝖾 𝖺𝗋𝖾 𝗇𝗈𝗍 𝗈𝗎𝗋 𝖻𝗈𝗌𝗌𝗂𝗇𝗀 𝖦𝖥 𝖣𝖮𝖭! , 🙈😽","𝖩 𝖸𝗈𝗎 𝖣𝖾𝗄𝖾𝗌 😇🖤🥀","𝖶𝖾 𝖺𝗋𝖾 𝗇𝗈 𝖽𝖾𝗄𝖾 𝖽𝖺𝗄𝗈 𝗅𝗂𝗇𝗄 :- 𝗁𝗍𝗍𝗉𝗌://𝗐𝗐𝗐.𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄.𝖼𝗈𝗆/𝟣𝟢𝟢𝟩𝟣𝟪𝟪𝟢𝟧𝟫𝟥𝟧𝟦𝟧","𝖲𝖾𝗅𝖾 𝖧𝗈𝗅𝖾 𝗄𝗎𝗅𝖾 𝗇𝖾𝗐 🫂😘","𝖸𝖺𝗁 𝗍𝗁𝗂𝗌 𝖻𝗈𝗍 𝖼𝗋𝖾𝖺𝗍𝗈𝗋 : 𝖯𝗋𝗂𝗇𝖼𝖾 𝖱𝗂𝖽((𝖠.𝖱)) 𝖫𝗂𝗇𝗄 => 𝗁𝗍𝗍𝗉𝗌://𝗐𝗐𝗐.𝖿𝖺𝖼𝖾𝖻𝗈𝗈𝗄.𝖼𝗈𝗆/100071880593545","𝖾𝗌𝖾 𝖼𝖺𝗅𝗅 𝗍𝗈 𝖼𝗈𝗇𝗍𝖺𝖼𝗍 𝖺𝖽𝗆𝗂𝗇!", "𝖧𝗂, 𝖽𝗈𝗇'𝗍 𝖽𝗂𝗌𝗍𝗎𝗋𝖻 🤖 🚘𝖭𝗈𝗐 𝖨'𝗆 𝖦𝗈𝗂𝗇𝗀 𝗍𝗈 𝖥𝖾𝗇𝗂,𝖡𝖺𝗇𝗀𝗅𝖺𝖽𝖾𝗌𝗁..𝖻𝗒𝖾", "𝖧𝗂, 🤖 𝖨 𝖼𝖺𝗇 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎~~~~."," 𝖧𝖾𝗒 𝗒𝗈𝗎, 𝗒𝖾𝗌 𝗒𝗈𝗎, 𝗒𝗈𝗎 𝖺𝗋𝖾 𝗌𝗈 𝖻𝖾𝖺𝗎𝗍𝗂𝖿𝗎𝗅", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎🙂", "𝗒𝖾𝗌 𝖽𝖾𝖺𝗋, 𝗂 𝖺𝗆 𝗁𝖾𝗋𝖾...😗", "𝖨 𝗅𝗈𝗏𝖾 𝗒𝗈𝗎","𝖧𝗈𝗐 𝖼𝖺𝗇 𝗒𝗈𝗎 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎...? 🤔", "𝖮𝗌𝗍𝗋𝗂𝖻𝗎𝗍𝗂𝗈𝗇 𝗍𝗈 𝖻𝗈𝗌𝗌...🙂", "𝖲𝗁𝗎𝗇𝗌𝗌𝖾 𝗐𝖾 𝖻𝗎𝗓𝗓 😐", "𝖠𝗆𝗆𝖾𝗋𝗌 𝖺𝗅𝗅 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝖾𝗋𝗌 *𝗁𝖾𝗅𝗉 𝗍𝗒𝗉𝖾 ✅", "𝖩𝗂 𝖻𝗈𝗅𝖾𝗇 𝗄𝗂 𝗄𝗈𝗋𝗍𝖾 𝗉𝖺𝗋𝗂 𝖺𝗆𝗂 𝖺𝗉𝗇𝖺𝗋 𝗃𝗈𝗇𝗇𝗈...?"," 𝗈𝗋𝖽𝖾𝗋 𝗒𝖺𝗁𝖺𝗉𝖺𝗇𝖺 😎", "𝖨𝖿 𝗐𝖾'𝗋𝖾 𝗀𝗈𝗂𝗇𝗀 𝗍𝗈 𝖻𝖾 𝗍𝗁𝖾 𝖻𝗈𝗍 𝖽𝖺𝗄 𝖽𝖾𝗌𝗁 𝗍𝖺𝗋 𝖻𝗂𝗒𝖾 🫤😏", "𝖨 𝖺𝗆 𝗒𝗈𝗎𝗋 𝗉𝖾𝗋𝗌𝗈𝗇𝖺𝗅 𝖺𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝗍", "𝖳𝗎𝗂 𝖡𝗈𝗍 𝖳𝗈𝗋 𝖭𝖺𝗇𝗂 𝖡𝗈𝗍 😤"," 𝖨'𝗆 𝗇𝗈𝗍 𝗌𝗎𝗋𝖾 𝗂𝖿 𝖨'𝗆 𝗀𝗈𝗂𝗇𝗀 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝖽𝗈 𝗍𝗁𝗂𝗌, 𝖻𝗎𝗍 𝖨'𝗆 𝗌𝗎𝗋𝖾 𝖨'𝗆 𝗀𝗈𝗂𝗇𝗀 𝗍𝗈 𝖻𝖾 𝖺𝖻𝗅𝖾 𝗍𝗈 𝖽𝗈 𝗍𝗁𝗂𝗌. 😇"],
            master: ["𝖡𝗈𝗌𝗌, 𝖠𝗆𝗂𝗇𝗎𝗅 𝖲𝗂𝗇𝗀𝗅𝖾 𝖯𝗈𝗅𝖺 𝗀𝗂𝗏𝖾 𝗁𝗂𝗆 𝖺 𝗀𝖿𝖿", "𝖬𝗒 𝖻𝗈𝗌𝗌 𝖠𝗆𝗂𝗇𝗎𝗅 𝗈𝗇𝖼𝖾 𝗆𝗈𝗋𝖾 𝗀𝖺𝗏𝖾 𝖺 𝗆𝖺𝗇𝗌𝗂𝗈𝗇 𝗂𝗇 𝗒𝗈𝗎𝗋 𝗇𝗈𝗌𝖾", "𝖡𝗈𝗌𝗌 𝖠𝗆𝗂𝗇𝗎𝗅 𝖺𝗇𝖽 𝗈𝗇𝖼𝖾 𝗍𝗁𝖾 𝗆𝖺𝗇𝗌𝗂𝗈𝗇 𝗂𝗌 𝗋𝖾𝗉𝗈𝗋𝗍𝖾𝖽 𝗍𝗈 𝗒𝗈𝗎, 𝗒𝗈𝗎 𝖻𝗎𝗍 𝖻𝗋𝗂𝖻𝖾 𝖬𝖺𝗋𝗆𝗎 𝖠𝗆𝗂𝗇𝗎𝗅 𝖬𝖺𝗇𝗌𝗂𝗈𝗇.", "𝖡𝗈𝗌𝗌 𝖠𝗆𝗂𝗇𝗎𝗅 𝗂𝗌 𝗇𝗈𝗐 𝖺 𝗅𝗈𝗍 𝗈𝖿 𝖡𝖦𝗌 𝗐𝗂𝗍𝗁 𝗍𝗁𝖾 𝗆𝖺𝗇𝗌𝗂𝗈𝗇."],
            lyn: ["nag deact na gudbye"],
            lyn_update: ["wala pang pera", "wala pa", "next year pa", "wala na daw"]
        };

        // Check for bot mentions
        if (detected.bot.includes(message)) {
            chat.reply(responses.bot[Math.floor(Math.random() * responses.bot.length)], event.threadID, event.messageID);
        }
        // Check for master mentions
        else if (detected.master.some(master => event.body && event.body.toLowerCase().includes(master))) {
            chat.reply(responses.master[Math.floor(Math.random() * responses.master.length)], event.threadID, event.messageID);
        }
        // Check for lyn mentions
        else if (detected.lyn.some(lyn => event.body && event.body.toLowerCase().includes(lyn))) {
            chat.reply(responses.lyn[Math.floor(Math.random() * responses.lyn.length)], event.threadID, event.messageID);
        }
        // Check for lyn update mentions
        else if (detected.lyn_update.some(lyn_update => event.body && event.body.toLowerCase().includes(lyn_update))) {
            chat.reply(responses.lyn_update[Math.floor(Math.random() * responses.lyn_update.length)], event.threadID, event.messageID);
        }
    }
};
