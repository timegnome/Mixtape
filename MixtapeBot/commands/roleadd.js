const { prefix } = require('../config.json');
module.exports = {
	name: 'roleadd',
	description: 'Adds the role to the user requesting',
	aliases: ['join','play']
	args: true,
	usage:'<role>',
	execute(message, args){
		const role = message.guild.roles.find(args);
		if(!role)
			return message.member.add(role).catch(console.error);
		message.channel.send('Role has not been created. Use the ${prefix}createrole')
	},
};