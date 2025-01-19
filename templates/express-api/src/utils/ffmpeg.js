const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

module.exports = ffmpegController = {
	generateThumbnail: async (filePath, thumbnailPath) => {
		const thumbnail = await ffmpeg(filePath)
			.outputOptions(["-vf", "scale=200:-1"])
			.videoFilters([
				{
					filter: "scale",
					options: {
						width: 200,
						height: 200,
					},
				},
			])
			.save(thumbnailPath);

		return thumbnail;
	},
	generateThumbnailFromUrl: async (url, thumbnailPath) => {
		const thumbnail = await ffmpeg(url)
			.outputOptions(["-vf", "scale=200:-1"])
			.videoFilters([
				{
					filter: "scale",
					options: {
						width: 200,
						height: 200,
					},
				},
			])
			.save(thumbnailPath);

		return thumbnail;
	},
	generateThumbnailFromBuffer: async (buffer, thumbnailPath) => {
		const thumbnail = await ffmpeg(buffer)
			.outputOptions(["-vf", "scale=200:-1"])
			.videoFilters([
				{
					filter: "scale",
					options: {
						width: 200,
						height: 200,
					},
				},
			])
			.save(thumbnailPath);

		return thumbnail;
	},
	getThumbnailFromBuffer: async (buffer) => {
		const thumbnail = await ffmpeg(buffer)
			.outputOptions(["-vf", "scale=200:-1"])
			.videoFilters([
				{
					filter: "scale",
					options: {
						width: 200,
						height: 200,
					},
				},
			])
			.save(thumbnailPath);

		return thumbnail;
	},
};