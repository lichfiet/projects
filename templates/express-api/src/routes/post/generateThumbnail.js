const express = require("express");
const router = express.Router();
const { generateThumbnail } = require("../../utils/ffmpeg");


/**
 * POST /generatethumbnail
 * Generates a thumbnail from a file path
 * 
 *? Request:
 *? {
 *?   "s3Key": str,
 *?   "s3Bucket": str,
 *?   "inputFileFormat": str,
 *?   "inputTimeStamp": number,
 *?   "outputFormat": str,
 *? }
 * 
 ** Response:
 ** 
 ** {
 **   "s3Key": str,
 ** }
 * 
 **/

router.post("/", async (req, res) => {
	const { filePath, thumbnailPath } = req.body;
	try {
        console.log(req.body);

		const thumbnail = await generateThumbnail(filePath, thumbnailPath);
		res.status(200).json({ thumbnail });
	} catch (error) {
		res.status(500).send("Error: " + error.message); 
	}
});

module.exports = router;