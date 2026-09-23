let joinNotificationEnabled = true;

module.exports.config = {
  name: "joinnoti",
  info: "Enable or disable join/leave notifications.",
  version: "1.0.0",
  credits: "Kenneth Panio | Modified by Aminul Sordar",
  usage: "[on/off]"
};

module.exports.handleEvent = async ({ event, api, chat, font, admin, prefix }) => {
  try {
    const mono = txt => font.monospace(txt);
    if (!joinNotificationEnabled) return;

    const { logMessageType, logMessageData, threadID } = event;
    const groupInfo = await chat.threadInfo(threadID);

    const getOrdinalSuffix = number => {
      const lastDigit = number % 10;
      const lastTwoDigits = number % 100;
      if (lastDigit === 1 && lastTwoDigits !== 11) return "st";
      if (lastDigit === 2 && lastTwoDigits !== 12) return "nd";
      if (lastDigit === 3 && lastTwoDigits !== 13) return "rd";
      return "th";
    };

    if (logMessageType === "log:subscribe") {
      const joinedUserId = logMessageData?.addedParticipants?.[0]?.userFbId;
      if (!joinedUserId) return;

      if (joinedUserId === chat.botID()) {
        await chat.reply({
          body: "চলে এসেছি আমি পিচ্চি আমিনুল তোমাদের মাঝে🤭!",
          attachment: await chat.stream("https://files.catbox.moe/5swmuv.gif")
        });

        await chat.contact(
          mono(`Bot connected to ${groupInfo?.name || "your group"} successfully!\nType "${prefix || "/"}help" to get started.`),
          chat.botID()
        );

        await chat.nickname(`${font.bold("AI SYSTEM")} ${mono(`[${prefix || "/"}]`)}`, chat.botID());

      } else {
        const name = await chat.userName(joinedUserId);
        const memberCount = groupInfo?.participantIDs?.length || 1;
        const adminsCount = groupInfo?.adminIDs?.length || 0;
        const dateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

        const boxName = groupInfo?.name || "this group";
        const welcomeText = `
╔════•|      💛      |•════╗
 ❤️আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ❤️
╚════•|      💛      |•════╝

━❯🅆🄴🄻🄲🄾🄼🄴➤

━❯🅽🅴🆆➤

━❯🇲‌🇪‌🇲‌🇧‌🇪‌🇷‌➤

━❯${name}➤

༄✺আ্ঁপ্ঁনা্ঁকে্ঁ আ্ঁমা্ঁদে্ঁর্ঁ✺࿐

${boxName}

 🌺🌿🌸—এ্ঁর্ঁ প্ঁক্ষ্ঁ🍀থে্ঁকে্ঁ🍀—🌸🌿

 🌿_ভা্ঁলো্ঁবা্ঁসা্ঁ_অ্ঁভি্ঁরা্ঁম্ঁ_🌿

༄✺আপনি এই গ্রুপের ${memberCount}${getOrdinalSuffix(memberCount)} নং মেম্বার࿐

Total members: ${memberCount}.
Total admins: ${adminsCount}

আমাদের সাথে সময় দেওয়া ও পাশে থাকার অনুরোধ রইলো !!-🍂🌺🥀

🦋༎❤❤༎

ⵗⵗ̥̥̊̊ⵗ̥̥̥̥̊̊̊ⵗ̥̥̥̥̥̊̊̊̊ⵗ̥̥̥̥̥̥̊̊̊̊̊ⵗ̥̥̥̥̥̥̥̊̊̊̊̊ⵗ̥̥̥̥̥̥̥̥̊̊̊̊ⵗ̥̥̥̥̥̥̥̥̥̊̊̊ⵗ̥̥̥̥̥̥̥̥̥̥̊̊ⵗ̥̥̥̥̥̥̥̥̥̥̥ⵗ̥̥̥̥̥̥̥̥̥̥̊̊ⵗ̥̥̥̥̥̥̥̥̥̊̊̊ⵗ̥̥̥̥̥̥̥̥̊̊̊̊ⵗ̥̥̥̥̥̥̥̊̊̊̊̊ⵗ̥̥̥̥̥̥̊̊̊̊̊ⵗ̥̥̥̥̥̊̊̊̊ⵗ̥̥̥̥̊̊̊ⵗ̥̥̊̊ 

🦋║ლ💞 💞 ლ║🦋

💐☘️-ধন্যবাদ প্রিয়-☘️💐
𝄞❤️⋆⃝⑅⑅⃝❤️»̶̶͓͓̽̽̽»̶̶͓͓̽̽̽.𝐁𝐎𝐓-𝐎𝐖𝐍𝐄𝐑: 𝗔𝗺𝗶𝗻𝘂𝗹 𝗦𝗼𝗿𝗱𝗮𝗿❤️⃪⃝⃘᭄⃕❤️

Current date and time: ${dateTime}
`;

        const welcomeImage = await chat.stream("https://i.imgur.com/9UIo0dq.gif");

        await chat.reply({
          body: `✨ New member joined: ${name || "user"}!`,
          attachment: welcomeImage
        });

        await chat.contact(welcomeText, joinedUserId);
      }

    } else if (logMessageType === "log:unsubscribe") {
      const leftUserId = logMessageData?.leftParticipantFbId;
      if (!leftUserId) return;

      const name = await chat.userName(leftUserId);
      const leftBySelf = event.author === leftUserId;
      const leaveText = leftBySelf
        ? `👋 ${name || "A user"} left the group.`
        : `⚠️ ${name || "A user"} was removed from the group.`;

      await chat.contact(mono(leaveText), leftUserId);
    }

  } catch (err) {
    console.error("[joinnoti.js]", err);
  }
};

module.exports.run = async ({ args, chat, font }) => {
  const mono = txt => font.monospace(txt);
  const input = args.join(" ").toLowerCase().trim();

  if (input === "on") {
    joinNotificationEnabled = true;
    return chat.reply(mono("✅ Join notifications have been enabled."));
  } else if (input === "off") {
    joinNotificationEnabled = false;
    return chat.reply(mono("❌ Join notifications have been disabled."));
  } else {
    return chat.reply(mono("Usage: joinnoti [on/off]"));
  }
};
