import { useState, SetStateAction, Dispatch } from 'react';
import { Link } from 'react-router-dom';

import { Post } from '../types/types';

interface PostTileProps {
	post: Post;
	onEdit: Dispatch<SetStateAction<Post | null>>;
	onDelete: (id: number) => Promise<void>;
}

export function PostTile({ post, onEdit, onDelete }: PostTileProps): JSX.Element {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	return (
		<Link to={`/posts/${post.id}`}>
			<div className="flex justify-between flex-col h-full" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} onTouchStart={() => setIsVisible(true)} onTouchEnd={() => setTimeout(() => setIsVisible(false), 1000)}>
				<div className="w-full">
					<h2 className="text-2xl md:text-3xl font-bold text-white break-words drop-shadow-md">{post.title}</h2>
					<p className="hidden  sm:visible text-white w-3/4 mt-2">{post.body.substring(0, 60)}</p>
				</div>
				<div className={'w-full flex justify-end ' + (isVisible ? 'visible' : 'hidden')}>
					<button
						onClick={(event) => {
							event.preventDefault();
							onEdit(post);
						}}
						className="bg-white border-gray-100 hover:bg-gray-100 hover:border-gray-300 text-gray-300 hover:text-gray-400 p-2 rounded-full mr-2 duration-200"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
						</svg>
					</button>
					<button
						onClick={(event) => {
							event.preventDefault();
							onDelete(post.id);
						}}
						className="bg-red-100 border-red-200 hover:bg-red-200 hover:border-red-300 text-red-300 hover:text-red-400 p-2 rounded-full duration-200"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</Link>
	);
}
