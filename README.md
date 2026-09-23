# **FB-Autobot (Aminul-AI)**  

An advanced, feature-rich, and highly customizable **Facebook Messenger Autobot** designed to automate interactions, manage group chats, and run custom plugins seamlessly. Built with high performance, ease of use, and scalability in mind.

---

## **🚀 Features**  

* **🤖 Smart Automation** - Intelligent responses powered by various robust APIs.
* **🛡️ Security & Access Control** - Multi-role permissions, including admin/blacklist configuration.
* **⚡ Plugin-Driven Architecture** - Easily extend functionality by dropping new command scripts in the `script` folder.
* **📊 Robust Event Management** - Support for group join, leave, nickname enforcement, and anti-spam events.
* **💬 Web Interface** - Simple, intuitive web dashboard to monitor the bot, manage appstate credentials, and configure settings.

---

## **🛠 Setup & Installation**  

### **1️⃣ Prerequisites**
Ensure you have [Node.js](https://nodejs.org/) (version 18+ recommended) installed.

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **3️⃣ Configure Settings**  
Create a config file at `./data/config.json` or customize the settings via the web interface:
```json
{
  "admins": ["YOUR_FACEBOOK_ADMIN_ID"],
  "blacklist": [],
  "prefix": "/"
}
```

### **4️⃣ Start the Server**  
```bash
npm start
```
The application will launch on port `3000` (or your environment's configured port).

---

## **🔑 Session Login (AppState Guide)**  

1. Get your Facebook cookie in JSON format (e.g., using a secure browser extension like *C3C Cookie* or *EditThisCookie*).
2. Open the web interface at `http://localhost:3000` (or your deployment URL).
3. Paste the **AppState JSON** inside the input field and submit.
4. Your bot will automatically sign in, load command/event plugins, and connect to Facebook Messenger!

---

## **📖 Command & Usage**  
Once the bot is online, users can interact with it directly in chat:
* Type `/help` to see the full list of available commands.
* Type `/autobot` to manage self-hosted bots.

---

## **🤝 Contributing**  
We welcome community contributions! Please fork the repository, make your improvements in a separate branch, and submit a Pull Request.

---

## **📜 License**  
Distributed under the **ISC License**. See `package.json` for details.
