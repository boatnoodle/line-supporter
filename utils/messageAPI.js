const line = require("@line/bot-sdk");

class MessageAPI {
  client = new line.Client({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  });

  constructor(replyToken = "") {
    this.replyToken = replyToken;
  }

  async sendReplyMessage(message) {
    if (!this.replyToken) return false;

    try {
      await this.client.replyMessage(this.replyToken, message);
    } catch (error) {
      await this.client.replyMessage(this.replyToken, {
        type: "text",
        text: `❌ ${error?.message}`,
      });
    }
  }
}

module.exports = { MessageAPI };
