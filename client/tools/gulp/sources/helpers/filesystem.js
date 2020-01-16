const fs = require("fs");
const crypto = require("crypto");

function isDir(path) {
	try {
		fs.readdirSync(path);
		return true;
	} catch (e) {
		return false;
	}
}

function copy(from, to) {
	try {
		if (isDir(from)) {
			if (!fs.existsSync(to)) {
				fs.mkdirSync(to);
			}

			fs.readdirSync(from).forEach(path => {
				copy(from + "/" + path, to + "/" + path);
			});
		} else {
			if (fs.existsSync(to)) {
				fs.unlinkSync(to);
			}

			fs.copyFileSync(from, to);
		}
	} catch (e) {}
}

function checksum(file) {
	try {
		const content = fs.readFileSync(file);
		return crypto
			.createHash("md5")
			.update(content, "utf8")
			.digest("hex");
	} catch (e) {}
	return "";
}

function mkdir(dir) {
	try {
		const parts = dir.split("/");
		let path = parts.shift();

		while (parts.length) {
			path += "/" + parts.shift();
			if (!isDir(path)) {
				fs.mkdirSync(path);
			}
		}
		if (!isDir(path)) {
			fs.mkdirSync(path);
		}
	} catch (e) {}
}

function write(file, content) {
	try {
		fs.writeFileSync(file, content);
	} catch (e) {}
}

function fileExist(file) {
	try {
		fs.readFileSync(file);
		return true;
	} catch (e) {
		return false;
	}
}

const root = (function() {
	const parts = __dirname.split("/");
	return parts.slice(0, parts.indexOf("tools")).join("/");
})();

exports.isDir = isDir;
exports.copy = copy;
exports.root = root;
exports.sources = root + "/sources";
exports.builds = root + "/builds";
exports.checksum = checksum;
exports.mkdir = mkdir;
exports.copy = copy;
exports.write = write;
exports.fileExist = fileExist;
