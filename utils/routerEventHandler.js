const { MessageHandler } = require("../main/messageHandler");

class RouterEventHandler extends MessageHandler {
  constructor(req, res) {
    super();
    this.events = req.body.events;
  }

  async initRouter() {
    for (const event of this.events) {
      console.log(event, "event");
      switch (event?.type) {
        case "message":
          await this.handlerMessage(event);
          break;

        default:
          break;
      }
    }
  }
}

module.exports = { RouterEventHandler };
