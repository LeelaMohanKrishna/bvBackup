import { addRxPlugin, createRxDatabase } from 'rxdb/plugins/core';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBLeaderElectionPlugin);

const postsSchema = {
	title: 'posts schema',
	version: 0,
	primaryKey: 'id',
	primaryPath: 'id',
	description: 'describes a simple post',
	type: 'object',
	properties: {
		id: {
			type: 'number',
			primary: true,
		},
		title: {
			type: 'string',
		},
		body: {
			type: 'string',
		},
		userId: {
			type: 'number',
		},
	},
	required: ['id', 'title', 'body', 'userId'],
};

let dbPromise: any = null;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createDatabase = async () => {
	const myDatabase = await createRxDatabase({
		name: 'postsDB',
		storage: getRxStorageDexie(),
	});

	(window as any).db = myDatabase;

	await myDatabase.addCollections({
		posts: {
			schema: postsSchema,
		},
	} as any);
	return myDatabase;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getDatabase = () => {
	if (!dbPromise) dbPromise = createDatabase();
	return dbPromise;
};

export default getDatabase;
