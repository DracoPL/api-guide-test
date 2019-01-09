// Call as `node blueprint-docify/index.js branchName`

var fs    = require('fs');
var aglio = require('aglio');
var blueprintFile = __dirname + '/../index.md';
var options =
	{
	template: 'default',
	locals  : {
		_    : require('lodash'),
		async: require('async')
	}
};


var callbacks =
{
	onReadBlueprint     : function (err, data)
	{
		if (err)
		{
			console.error(err);
			process.exit(1);
		}
		else
		{
			aglio.render(data, options, callbacks.onAglioRender);
		}
	},
	onAglioRender       : function (err, html, warnings)
	{
		if (err)
		{
			console.error(err);
			process.exit(1);
		}
		else
		{
			var destination = __dirname + '/../docs/' + process.argv[2] + '/index.html';
			fs.writeFile(destination, html, callbacks.onWriteDocumentation);
		}
	},
	onWriteDocumentation: function (err)
	{
		if (err)
		{
			console.error(err);
			process.exit(1);
		}
		else
		{
			console.log("The file was saved!");
		}
	}
};


(function (apiFile)
{
	fs.readFile(apiFile, 'utf8', callbacks.onReadBlueprint);
})
(blueprintFile);

