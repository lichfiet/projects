const express = require("express");
const router = express.Router();

const dbController = require("../../utils/db.js");

router.get("/", async (req, res, next) => {
    try {
        const failCheck = () => {
            next(new Error("Database Connection Failed After 5 Seconds"));
        };

        setTimeout(failCheck, 5000);
        await dbController.connect();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send("Server Ready");
    } catch (error) {
        next(error);  // Pass errors to the Express error handler
    }
});

module.exports = router;