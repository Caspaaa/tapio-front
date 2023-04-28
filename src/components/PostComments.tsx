import { useState, useEffect } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

import { PostComment } from '../types/types';

type Props = {
	postId: number;
};

export function PostComments({ postId }: Props): JSX.Element {
	const [comments, setComments] = useState<PostComment[]>([]);

	// Fetch current post comments from JSONPlaceholder as there's no comment on current DB yet
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get<PostComment[]>(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
				setComments(response.data);
			} catch (error) {
				toast.error('An error occurred while retrieving the comments.');
			}
		};

		fetchPost();
	}, [postId]);

	return (
		<div className="my-12">
			<h2 className="text-lg font-bold mb-8">Comments</h2>
			{comments.length ? (
				comments.map((comment) => (
					<div key={comment.id} className="p-2">
						<div className="my-2">
							<h3 className="font-semibold">{comment.email}</h3>
							<div className="mt-2 pl-4 border-l-4 border-gray-100">
								<p>{comment.name}</p>
								<p>{comment.body}</p>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="text-gray-500">There is no comment yet</div>
			)}
		</div>
	);
}
