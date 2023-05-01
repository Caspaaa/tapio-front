import React, { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Button } from './Button';

import newStory from '../assets/images/new_story.png';
import iconTapio from '../assets/images/iconTapio.png';

import { Post } from '../types/types';

interface NewPostFormProps {
	posts: Post[];
	setPosts: Dispatch<SetStateAction<Post[] | []>>;
	closeModal: any;
}

export function NewPostForm({ posts, setPosts, closeModal }: NewPostFormProps): JSX.Element {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const createPost = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			setIsLoading(true);
			const response = await axios.post<Post>(`${process.env.REACT_APP_API}/posts`, {
				userId: 1,
				title,
				body,
			});
			setIsLoading(false);

			setPosts([response.data, ...posts]);

			closeModal();

			toast.success('Post created successfully!');

			setTitle('');
			setBody('');
		} catch (error) {
			toast.error('An error occurred while creating the post.');
		}
	};

	return (
		<>
			<Button action={() => closeModal()} isDisabled={false} classes="absolute phone-xl:top-10 phone-xl:right-10 top-4 right-4 text-gray-200 hover:text-gray-300" size="h-10 w-10" icon="cross" />
			<div className="flex justify-center w-full">
				<img className="h-8 md:h-12" src={newStory} alt="logo-tapio-stories" />
			</div>
			<form onSubmit={createPost} className="space-y-4 pt-16 phone-xl:px-8 sm:px-12 xl:px-24 2xl:px-36">
				<div>
					<label htmlFor="title" className="block hidden">
						Title
					</label>
					<input type="text" value={title} placeholder="Type the story title" onChange={(event) => setTitle(event.target.value)} className="border border-gray-50 py-2 px-4 text-gray-600 rounded-lg w-full focus:outline-none shadow" maxLength={200} />
				</div>
				<div>
					<label htmlFor="body" className="block hidden">
						body
					</label>
					<textarea
						value={body}
						onChange={(event) => setBody(event.target.value)}
						placeholder="Share your story"
						className="min-h-[14rem] border border-gray-50 py-2 px-4 text-gray-600 rounded-lg w-full focus:outline-none shadow resize-none overflow-scroll-y"
						maxLength={2500}
					/>
				</div>
				<div className="flex justify-end mt-4">
					<Button action={() => closeModal()} isDisabled={false} classes="bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-300 text-gray-300 hover:text-gray-400 mr-2" size="h-5 w-5" icon="cross" />
					<Button action={() => null} isDisabled={isLoading} classes="bg-tapio text-white" size="h-5 w-5" icon="check" />
				</div>
				<div className="w-full flex h-44 justify-center items-end">
					<img className="h-12 opacity-20" src={iconTapio} alt="icon-tapio-stories" />
				</div>
			</form>
		</>
	);
}
