const crypto = require("crypto");

class ValidateSignature {
  channelSecret = process.env.CHANNEL_SECRET;
  comparedHeader = "";
  body = "";

  constructor(req) {
    this.comparedHeader = req?.headers["x-line-signature"];
    this.body = JSON.stringify(req.body);
  }

  isSecureRequest() {
    const signature = crypto
      .createHmac("SHA256", this.channelSecret)
      .update(this.body)
      .digest("base64");

    if (this.comparedHeader == signature) return true;
    return false;
  }
}

module.exports = { ValidateSignature };
