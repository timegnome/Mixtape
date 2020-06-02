const fs = require('fs')

module.exports = {
	name: 'addcard',
	description: 'Creates a new scenario card.',
	cooldown: 30,
	aliases: ['add','ac']
	args: true,
	execute(message, args){
		for ( const arg of args){
			fs.writeFile('ScenarioCards.txt', arg+';\n', (err) =>{
				if (err) throw err;
			}
			
		}
	},
};