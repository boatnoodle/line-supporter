require("dotenv").config();
const functions = require("@google-cloud/functions-framework");
const { ValidateSignature } = require("./utils/validateSignature");

// Register an HTTP function with the Functions Framework
functions.http("lineWebhookFunction", (req, res) => {
  const validateSignature = new ValidateSignature(req);
  if (!validateSignature.isSecureRequest()) {
    res.send(403, "Invalid signature");
  }

  res.send("OK");
});
