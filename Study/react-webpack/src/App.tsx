import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import initDB from './rxdbConfig';

const App = () => {
	const [db, setDb] = useState<any>(null);
	const [posts, setPosts] = useState([]);

	const { isPending, error, data } = useQuery({
		queryKey: ['post'],
		queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()),
	});

	useEffect(() => {
		const setupDB = async () => {
			const database = await initDB();
			setDb(database);
		};
		setupDB();
	}, []);

	useEffect(() => {
		const loadPosts = async () => {
			if (db && data) {
				await db.posts.bulkInsert(data);
				const storedPosts = await db.posts.find().exec();
				setPosts(storedPosts);
			}
		};
		loadPosts();
	}, [db, data]);

	if (isPending) return <h1>Loading...</h1>;

	if (error) return <h1>An error has occurred : {error.message}</h1>;

	// const handleDownload = () => {
	// 	const data = document.documentElement.outerHTML;
	// 	const blob = new Blob([data], { type: 'text/html' });
	// 	const url = URL.createObjectURL(blob);
	// 	const a = document.createElement('a');
	// 	a.href = url;
	// 	a.download = 'file.html';
	// 	document.body.appendChild(a);
	// 	a.click();
	// 	URL.revokeObjectURL(url);
	// };
	return (
		<>
			<div>
				{/* <button onClick={handleDownload}>Download File</button> */}
				<h1>Hello, React!</h1>
			</div>
			<div className='container'>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Title</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post: any) => (
							<tr key={post.id}>
								<td>{post.id}</td>
								<td>{post.title}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default App;
