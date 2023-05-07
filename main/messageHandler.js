const { MessageAPI } = require("../utils/messageAPI");
const Budget = require("./budget");

class MessageHandler extends MessageAPI {
  messageType;
  message;
  emojis;
  mention;
  replyToken;
  budget;

  constructor() {
    super();
  }

  async handlerMessage(messageEvent) {
    this.messageType = messageEvent?.type;
    this.message = messageEvent?.message;
    this.emojis = messageEvent?.emojis;
    this.mention = messageEvent?.mention;
    this.replyToken = messageEvent?.replyToken;
    this.budget = new Budget(messageEvent?.replyToken);

    await this.checkPatternMessage();
  }

  async checkPatternMessage() {
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

      if (textClean.includes("bgs")) {
        const [_, name, alias, budgetAmount] = textClean.split(" ");

        await this.budget.createBudget({
          name,
          alias,
          budgetAmount: parseInt(budgetAmount),
        });
      }

      if (textClean.includes("bga")) {
        const [prefix, title, price] = textClean.split(" ");
        console.log(prefix, title, price, this.budget.createBudget());
        //todo call create transaction
      }
    }

    if (this.messageType == "sticker") {
    }
  }
}

module.exports = { MessageHandler };
