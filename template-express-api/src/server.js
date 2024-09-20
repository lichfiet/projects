const log = require("./middlewares/log.js");
log.info("Starting Server");

/**
 ** App Packages
 */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); // for use of environment variables
const http = require("http");
const config = dotenv.config(); // Prints Local Variables
console.debug("Env Vars: " + JSON.stringify(config));

/**
 * *Import Middlewares
*/
const errorHandler = require("./middlewares/error.js"); // error handling
console.debug("Imported Middlewares");

/**
 ** App Setup
 */
const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

const dbController = require("./utils/db.js");

// dbController.connect();
// dbController.refreshModels();


/**
 * * HTTPS Setup
 */
const httpServer = http.createServer(app); // server var


/**
 *
 * Routes:
 * - /health
 */
const healthCheck = require("./routes/get/healthCheck.js");
const readyCheck = require("./routes/get/readyCheck.js");

app.use("/health", healthCheck);
app.use("/ready", readyCheck);





app.get("/error", async (req, res, next) => {
  try {
    throw new Error("This is a test error"); // intercepted by "errorHandler" middleware
  } catch (error) {
    next(error);
  }
});

// START SERVER
const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});

app.use(errorHandler);

