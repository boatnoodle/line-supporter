const { MessageAPI } = require("../utils/messageAPI");
const prisma = require("../libs/prisma");

class Budget extends MessageAPI {
  replyToken;
  constructor(replyToken = "") {
    super();
    this.replyToken = replyToken;
  }

  async getBudget(filter) {
    try {
      const response = await prisma.budgetPlan.findUnique({ where: filter });
      return response;
    } catch (error) {
      await this.sendReplyMessage({
        type: "text",
        text: `❌ ${error?.message}`,
      });
    }
  }

  async createBudget(input) {
    try {
      const response = await prisma.budgetPlan.create({ data: input });
      return response;
    } catch (error) {
      await this.sendReplyMessage({
        type: "text",
        text: `❌ ${error?.message}`,
      });
    }
  }

  async updateBudgetById(id, data) {
    try {
      const response = await prisma.budgetPlan.update({ where: { id }, data });
      return response;
    } catch (error) {
      await this.sendReplyMessage({
        type: "text",
        text: `❌ ${error?.message}`,
      });
    }
  }

  async getBudgetReport(budgetId) {}
}

module.exports = Budget;
