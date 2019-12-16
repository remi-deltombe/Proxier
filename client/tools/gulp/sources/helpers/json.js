
const fs = require('fs');

function read(path)
{
	return JSON.parse(fs.readFileSync(path));;
}

function write(path, content)
{
	return fs.writeFileSync(path,  JSON.stringify(content), {
		encoding:'utf-8',
		flag: 'w'
	});;
}


exports.read = read; 
exports.write = write; 