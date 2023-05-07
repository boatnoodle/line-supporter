const { MessageAPI } = require("../utils/messageAPI");
const Budget = require("./budget");
const Transaction = require("./transaction");

class MessageHandler extends MessageAPI {
  messageType;
  message;
  emojis;
  mention;
  replyToken;
  budget;
  transaction;

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
    this.transaction = new Transaction(messageEvent?.replyToken);

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

      if (textClean.substring(0, 3) === "bgg") {
        const [_, alias] = textClean.split(" ");
        const response = await this.budget.getBudget({
          alias,
        });
        if (response)
          await this.sendReplyMessage([
            {
              type: "text",
              text: `📋 Your currently ${response?.name} budget is`,
            },
            {
              type: "text",
              text: `${response?.currentAmount}/${response?.budgetAmount}Bath`,
            },
          ]);
        else
          await this.sendReplyMessage({
            type: "text",
            text: "❌ Not found your budget alias",
          });
      }

      if (textClean.substring(0, 3) === "bgs") {
        const [_, name, alias, budgetAmount] = textClean.split(" ");
        console.log(_, name, alias, budgetAmount, "before create");
        const response = await this.budget.createBudget({
          name,
          alias,
          budgetAmount: parseInt(budgetAmount),
        });
        if (response)
          await this.sendReplyMessage({
            type: "text",
            text: "✅ Budget has been set!",
          });
      }

      if (textClean.substring(0, 3) === "bga") {
        const [_, alias, amount] = textClean.split(" ");

        const response = await this.transaction.createTransaction({
          alias,
          amount: parseInt(amount),
        });
        if (response)
          await this.sendReplyMessage([
            {
              type: "text",
              text: `✅ Transaction has been created!`,
            },
            {
              type: "text",
              text: `📋 Now you're spending ${response?.currentAmount}/${response?.budgetAmount}Bath`,
            },
          ]);
      }
    }

    if (this.messageType == "sticker") {
    }
  }
}

module.exports = { MessageHandler };
