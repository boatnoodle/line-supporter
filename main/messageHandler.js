const { MessageAPI } = require("../utils/messageAPI");

class MessageHandler extends MessageAPI {
  messageType;
  message;
  emojis;
  mention;
  replyToken;

  constructor() {
    super();
  }

  handlerMessage(messageEvent) {
    this.messageType = messageEvent?.type;
    this.message = messageEvent?.message;
    this.emojis = messageEvent?.emojis;
    this.mention = messageEvent?.mention;
    this.replyToken = messageEvent?.replyToken;

    this.checkPatternMessage();
  }

  checkPatternMessage() {
    if (this.messageType == "message") {
      const { type, id, text } = this.message;
      const textClean = text.toLowerCase();
      const firstChar = textClean.charAt(0);
      if (["h", "g"].includes(firstChar)) {
        //* Static data
        /**
         * h = help - show all shortcuts
         * g = get
         *  - inf = get all of above information.
         *  - add = get all address.
         *  - ph1 = get my dtac number.
         *  - ph2 = get my true number.
         *  - php = get Preas' number.
         */
        let message;
        if (firstChar === "g") {
          if (textClean === "ginf") {
          } else if (textClean === "gadd") {
            message = {
              type: "text",
              text: "222/147 Metro Park Sathorn ตึก 3N, ถนนกัลปพฤกษ์, แขวง บางหว้า เขต ภาษีเจริญ, กรุงเทพมหานคร 10160",
            };
          } else if (textClean === "gp1") {
            message = {
              type: "text",
              text: "094 450 9604",
            };
          } else if (textClean === "gp2") {
            message = {
              type: "text",
              text: "096 781 3241",
            };
          } else if (textClean === "gpp") {
            message = {
              type: "text",
              text: "084 645 7970",
            };
          }

          this.sendReplyMessage(message);
        }
        if (firstChar === "h") {
        }
      }

      console.log(
        this.messageType,
        this.message,
        this.emojis,
        this.mention,
        this.replyToken
      );
    }

    if (this.messageType == "sticker") {
    }

    // this.sendReplyMessage({ type: "text", text: "หิวยังครับ?" });
  }
}

module.exports = { MessageHandler };
