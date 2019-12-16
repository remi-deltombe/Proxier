

function get(name, defaultValue)
{
	const result = [];
	for(const arg of process.argv)
	{
		if(arg.indexOf('--') ==0)
		{
			let parts = arg.substring(2).split('=');
			if(parts[0] === name)
			{
				result.push(parts.length > 1 ? parts[1] : true);
			}
		}
	}

	if(result.length === 0) return defaultValue;
	if(result.length === 1) return result[0];
	return result;
}


exports.get = get; 
