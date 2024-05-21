// src/rxdbConfig.js
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBLeaderElectionPlugin);

const dbName = 'postsDB';
const storage = getRxStorageDexie();

const postsSchema = {
	title: 'posts schema',
	description: 'describes a simple post',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: {
			type: 'string',
			maxLength: 100,
		},
		title: {
			type: 'string',
		},
		body: {
			type: 'string',
		},
	},
	required: ['id', 'title', 'body'],
};

async function initDB() {
	const db = await createRxDatabase({
		name: dbName,
		storage,
	});
	await db.addCollections({
		posts: {
			schema: postsSchema,
		},
	});
	return db;
}

export default initDB;
