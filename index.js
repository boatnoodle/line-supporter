const functions = require('@google-cloud/functions-framework');

// Register an HTTP function with the Functions Framework
functions.http('lineWebhookFunction', (req, res) => {
  // Your code here

  // Send an HTTP response
  res.send('OK');
});
