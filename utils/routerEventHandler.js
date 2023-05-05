const { MessageHandler } = require("../main/messageHandler");

class RouterEventHandler extends MessageHandler {
  constructor(req, res) {
    super();
    this.events = req.body.events;
  }

  initRouter() {
    for (const event of this.events) {
      console.log(event, "event");
      switch (event?.type) {
        case "message":
          this.handlerMessage(event);
          break;

        default:
          break;
      }
    }
  }
}

module.exports = { RouterEventHandler };
