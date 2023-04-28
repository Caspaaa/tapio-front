import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import { Post } from '../types/types';

interface EditPostFormProps {
	post: Post;
	posts: Post[];
	setPosts: (posts: Post[]) => void;
	onUpdated: (post: Post | null) => void;
	onEdit: Dispatch<SetStateAction<Post | null>>;
}

export function EditPostForm({ post, posts, setPosts, onUpdated, onEdit }: EditPostFormProps): JSX.Element {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	useEffect(() => {
		setTitle(post.title);
		setBody(post.body);
	}, [post.title, post.body]);

	const updatePost = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!post) return;

		try {
			const response = await axios.put<Post>(`${process.env.REACT_APP_API}/posts/${post.id}`, {
				userId: post.userId,
				title: title,
				body: body,
			});
			console.log('response', response.data);
			setPosts(posts.map((item: Post) => (item.id === post.id ? { title: title, body: body, id: post.id, userId: post.userId } : item)));
			toast.success('Post updated successfully!', { theme: 'colored' });
			onUpdated(null);

			setTitle('');
			setBody('');
		} catch (error) {
			toast.error('An error occurred while updating the post.');
		}
	};

	return (
		<form onSubmit={updatePost} className="flex flex-col h-full">
			<div className="flex flex-col flex-grow">
				<div className="w-full mt-2">
					<input id="title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} className="py-2 px-4 text-gray-600 rounded-lg w-full focus:outline-none" />
				</div>
				<div className="w-full flex-grow mt-4">
					<textarea id="body" value={body} onChange={(event) => setBody(event.target.value)} className="py-2 px-4 text-gray-600 rounded-lg h-full w-full focus:outline-none resize-none overflow-scroll-y" />
				</div>
			</div>
			<div className="w-full flex justify-end items-end mt-4">
				<div>
					<button onClick={() => onEdit(null)} className="bg-white border-gray-100 hover:bg-gray-100 hover:border-gray-300 text-gray-300 hover:text-gray-400 p-2 rounded-full mr-2 duration-200">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
						</svg>
					</button>
					<button type="submit" className="bg-tapio text-white p-2 rounded-full duration-200">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
						</svg>
					</button>
				</div>
			</div>
		</form>
	);
}
