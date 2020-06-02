module.exports = {
	name: 'roledelete',
	description: 'Deletes the role to the user requesting',
	aliases: ['leave','remove']
	args: true,
	usage:'<role> <user>',
	execute(message, args){
		const role = message.guild.roles.find(args);
		if (!args.length) {
			return message.member.removeRole(role).catch(console.error);
		}
		member = message.mentions.members.first()
		member.removeRole(role).catch(console.error);
	},
};