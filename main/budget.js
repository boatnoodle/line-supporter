const { MessageAPI } = require("../utils/messageAPI");
const prisma = require("../libs/prisma");

class Budget extends MessageAPI {
  replyToken;
  constructor(replyToken = "") {
    super();
    this.replyToken = replyToken;
  }

  async createBudget(input) {
    try {
      const response = await prisma.budgetPlan.create({ data: input });
      if (response)
        await this.sendReplyMessage({
          type: "text",
          text: "Budget has been set!",
        });
    } catch (error) {
      await this.sendReplyMessage({
        type: "text",
        text: error?.message,
      });
    }
  }

  addTransaction() {}
}

module.exports = Budget;
