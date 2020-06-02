module.exports = {
	name: 'createrole',
	description: 'Creates the role for the mixtape bot',
	cooldown: 60,
	aliases: ['create','cr']
	args: true,
	execute(message, args){
		if (!args.length) 
			return message.guild.roles.create({data: {name:'Mixtape'}});
		return message.guild.roles.create({data: {name:'${args[0]}', permissions: []}})
	},
};