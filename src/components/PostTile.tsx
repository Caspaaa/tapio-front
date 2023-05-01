import { useState, SetStateAction, Dispatch, MouseEvent } from 'react';

import { Post } from '../types/types';
import { Button } from './Button';

interface PostTileProps {
	post: Post;
	onEdit: Dispatch<SetStateAction<Post | null>>;
	onDelete: (id: number) => Promise<void>;
}

export function PostTile({ post, onEdit, onDelete }: PostTileProps): JSX.Element {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const editPost = (event: MouseEvent, post: any) => {
		event.stopPropagation();
		onEdit(post);
	};

	const deletePost = (event: MouseEvent, postId: number) => {
		event.stopPropagation();
		onDelete(postId);
	};

	return (
		<div className="flex justify-between flex-col h-full" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} onTouchStart={() => setIsVisible(true)} onTouchEnd={() => setTimeout(() => setIsVisible(false), 1000)}>
			<div className="w-full">
				<h2 className="text-2xl md:text-3xl font-bold text-white break-words drop-shadow-md">{post.title}</h2>
				<p className="hidden  sm:visible text-white w-3/4 mt-2">{post.body.substring(0, 60)}</p>
			</div>
			<div className={'w-full flex justify-end ' + (isVisible ? 'visible' : 'hidden')}>
				<Button action={(event: MouseEvent) => editPost(event, post)} isDisabled={false} classes="bg-white border-gray-100 hover:bg-gray-100 hover:border-gray-300 text-gray-300 hover:text-gray-400 mr-2" size="h-5 w-5" icon="edit" />
				<Button action={(event: MouseEvent) => deletePost(event, post.id)} isDisabled={false} classes="bg-red-100 border-red-200 hover:bg-red-200 hover:border-red-300 text-red-300 hover:text-red-400" size="h-5 w-5" icon="bin" />
			</div>
		</div>
	);
}
