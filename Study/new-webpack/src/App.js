import React, { useEffect, useState } from "react";
import initDB from './rxdbConfig';
import { useQuery } from "@tanstack/react-query";

const App = () => {
    const [db, setDb] = useState(null);
    const [posts, setPosts] = useState([]);

    const { isLoading, error, data } = useQuery({
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
            if (db && data && Array.isArray(data)) {
                try {
                    await db.posts.bulkInsert(data);
                    const storedPosts = await db.posts.find().exec();
                    setPosts(storedPosts);
                } catch (e) {
                    console.error("Error inserting posts: ", e);
                }
            } else {
                console.error("Data is not an array or is undefined: ", data);
            }
        };
        loadPosts();
    }, [db, data]);

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1>An error has occurred : {error.message}</h1>;

    return (
        <div>
            <h1>Posts</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App