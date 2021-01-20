import {CommandHandler} from 'advanced-command-handler';
import {config} from 'dotenv';

config();

CommandHandler.create({
	eventsDir: 'events',
	owners: ['386893236498857985'],
	prefixes: ['$'],
	commandsDir: 'commands',
})
	.setDefaultEvents()
	.launch({
		token: process.env.TOKEN,
	});
