import {Command, CommandHandler} from 'advanced-command-handler';
import {Message} from 'discord.js';
import {DB} from '../../main.js';
import {ensureUser} from '../../utils.js';

export default new Command({
	name: 'money',
	aliases: ['m', 'bal', 'balance'],
}, async (handler: typeof CommandHandler, message: Message, args: string[]) => {
	ensureUser(message.author.id);
	await message.channel.send(JSON.stringify(DB.get(message.author.id)));
})
