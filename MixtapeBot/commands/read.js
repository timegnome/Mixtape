const fs = require('fs')

module.exports = {
	name: 'Read',
	description: 'Resets the set of cards in the deck from the list in the file',
	cooldown: 30,
	aliases: ['add','ac']
	args: true,
	execute(message, args){
		fs.readFile('input.txt', function (err, data) {
			if (err) {
			return console.error(err);
		}
		console.log("Asynchronous read: " + data.toString());
		}
	},
};