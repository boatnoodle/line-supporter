require("dotenv").config();
const functions = require("@google-cloud/functions-framework");
const { ValidateSignature } = require("./utils/validateSignature");
const { RouterEventHandler } = require("./utils/routerEventHandler");

// Register an HTTP function with the Functions Framework
functions.http("lineWebhookFunction", async (req, res) => {
  const validateSignature = new ValidateSignature(req);
  if (!validateSignature.isSecureRequest()) {
    res.send(403, "Invalid signature");
  }

  const routerEventHandler = new RouterEventHandler(req, res);
  await routerEventHandler.initRouter();

  res.send("OK");
});
