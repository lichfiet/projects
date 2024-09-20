/**
 ** App Packages
 */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); // for use of environment variables
const http = require("http");

const config = dotenv.config(); // Prints Local Variables

/**
 * * Observability
 */

/**
 * *Import Middlewares
*/
const logger = require("./middlewares/log.js"); // logging
console.debug("Imported Middlewares");

/**
 ** App Setup
 */
const app = express();
app.use(logger());
app.use(cors());
app.use(express.json());


console.debug("Env Vars: " + JSON.stringify(config));

const dbController = require("./utils/db.js");

await dbController.connect();
await dbController.refreshModels();

/**
 * *Import Utilities
 */
const { utilityWrapper } = require("./utils/utilityWrapper.js"); // For s3 / sftp connections
console.debug("Imported Utilities");


/**
 * * HTTPS Setup
 */
const httpServer = http.createServer(app); // server var


/**
 *
 * Routes:
 * - /health
 */


console.info("Starting server....");

/**
 * * /health for healthchecks in the future
 */
app.get("/health", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send("Server Running");
});

// START SERVER
const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
