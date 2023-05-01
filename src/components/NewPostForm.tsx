import React, { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import newStory from '../assets/images/new_story.png';
import iconTapio from '../assets/images/iconTapio.png';

// import { gpt_posts } from '../gpt-posts.js';

import { Post } from '../types/types';

interface NewPostFormProps {
	posts: Post[];
	setPosts: Dispatch<SetStateAction<Post[] | []>>;
	closeModal: any;
}

export function NewPostForm({ posts, setPosts, closeModal }: NewPostFormProps): JSX.Element {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const createPost = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await axios.post<Post>(`${process.env.REACT_APP_API}/posts`, {
				userId: 1,
				title,
				body,
			});

			setPosts([response.data, ...posts]);

			closeModal();

			toast.success('Post created successfully!');

			setTitle('');
			setBody('');
		} catch (error) {
			toast.error('An error occurred while creating the post.');
		}
	};

	// // Batch upload of Chat GPT articles to populate DB
	// const batchPost = async () => {
	// 	gpt_posts.forEach(async (post) => {
	// 		try {
	// 			await axios.post<Post>(`${process.env.REACT_APP_API}/posts`, {
	// 				userId: 1,
	// 				title: post.title,
	// 				body: post.content,
	// 			});
	// 		} catch (error) {
	// 			toast.error('An error occurred while creating the post.');
	// 		}
	// 	});
	// };

	return (
		<>
			<button onClick={() => closeModal()}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 absolute phone-xl:top-10 phone-xl:right-10 top-4 right-4 text-gray-200 hover:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
			<div className="flex justify-center w-full">
				<img className="h-8 md:h-12" src={newStory} alt="logo-tapio-stories" />
			</div>
			<form onSubmit={createPost} className="space-y-4 pt-16 phone-xl:px-8 sm:px-12 xl:px-24 2xl:px-36">
				<div>
					<label htmlFor="title" className="block hidden">
						Title
					</label>
					<input
						id="title"
						type="text"
						value={title}
						placeholder="Type the story title"
						onChange={(event) => setTitle(event.target.value)}
						className="border border-gray-50 py-2 px-4 text-gray-600 rounded-lg w-full focus:outline-none shadow"
						maxLength={200}
					/>
				</div>
				<div>
					<label htmlFor="body" className="block hidden">
						body
					</label>
					<textarea
						id="body"
						value={body}
						onChange={(event) => setBody(event.target.value)}
						placeholder="Share your story"
						className="min-h-[14rem] border border-gray-50 py-2 px-4 text-gray-600 rounded-lg w-full focus:outline-none shadow resize-none overflow-scroll-y"
						maxLength={2500}
					/>
				</div>
				<div className="flex justify-end mt-4">
					<button onClick={() => closeModal()} type="button" className="bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-300 text-gray-300 hover:text-gray-400 p-2 rounded-full mr-2 duration-200">
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
				<div className="w-full flex h-44 justify-center items-end">
					<img className="h-12 opacity-20" src={iconTapio} alt="icon-tapio-stories" />
				</div>
				{/* <button onClick={() => batchPost()}>batch upload</button> */}
			</form>
		</>
	);
}
