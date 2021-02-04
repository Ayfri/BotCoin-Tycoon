import {Collection, Snowflake} from 'discord.js';
import {DB} from './main.js';

export function ensureUser(id: Snowflake) {
	DB.ensure(id, {
		money:       0,
		id:          id,
		boost:       false,
		daily:       false,
		inventory:   new Collection(),
		lastBoost:   0,
		moneyInBank: 0,
		multiplier:  0,
		startedAt:   Date.now(),
		totalMoney:  0
	});
}
