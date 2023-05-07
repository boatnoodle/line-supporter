const { MessageAPI } = require("../utils/messageAPI");
const prisma = require("../libs/prisma");
const Budget = require("./budget");

class Transaction extends MessageAPI {
  replyToken;
  budget = new Budget();
  constructor(replyToken = "") {
    super();
    this.replyToken = replyToken;
  }

  async createTransaction(input) {
    try {
      const { alias, amount } = input;

      //*Find the alias first
      const budgetPlan = await prisma.budgetPlan.findUnique({
        where: { alias },
      });

      if (!budgetPlan) {
        await this.sendReplyMessage({
          type: "text",
          text: "❌ Your alias does not exist",
        });
        return false;
      }

      //*Save the transaction
      const response = await prisma.transaction.create({
        data: { budgetPlanId: budgetPlan?.id, amount },
      });

      if (response) {
        //*Update current budget amount
        const currentAmount = budgetPlan?.currentAmount + amount;
        const response = await this.budget.updateBudgetById(budgetPlan?.id, {
          currentAmount,
        });

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
    } catch (error) {
      await this.sendReplyMessage({
        type: "text",
        text: `❌ ${error?.message}`,
      });
    }
  }
}

module.exports = Transaction;
