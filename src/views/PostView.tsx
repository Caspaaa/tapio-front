import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';

import pexels from '../api/pexels';

import { PostComments } from '../components/PostComments';

import iconTapio from '../assets/images/iconTapio.png';
import tapioStory from '../assets/images/tapio_story.png';
import { Image, Post } from '../types/types';

export function PostView(): JSX.Element {
	const { id } = useParams<string>();
	const [post, setPost] = useState<Post | null>(null);
	const [images, setImages] = useState<Image[]>([]);

	const [postId, setPostId] = useState(0);
	const [postIds, setPostIds] = useState<number[]>([]);
	const postIndex = postIds.indexOf(parseInt(id!));

	const [isReturnVisible, setIsReturnVisible] = useState<boolean>(false);

	const navigate = useNavigate();

	useEffect(() => {
		const pid = parseInt(id!);
		setPostId(pid);
	}, [id]);

	// Fetch current post from DB
	useEffect(() => {
		const fetchPost = async () => {
			if (!postId) return;
			try {
				const response = await axios.get<Post>(`${process.env.REACT_APP_API}/posts/${postId}`);
				setPost(response.data);
			} catch (error) {
				console.error('Error fetching post:', error);
			}
		};

		fetchPost();
	}, [postId]);

	// Get range of posts
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get<Post[]>(`${process.env.REACT_APP_API}/posts`);
				// const firstPost = Math.min(...response.data.map((item) => item.id));
				// const lastPost = Math.max(...response.data.map((item) => item.id));
				const postIds = [...response.data].map((post) => post.id);
				setPostIds(postIds);
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchPost();
	}, [postId]);

	// Fetch random images from Pexels
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await pexels.get(`/v1/search`, {
					params: {
						query: 'landscape', // pastel
						per_page: 70,
						page: 2,
					},
				});

				setImages(response.data.photos);
			} catch (error) {
				toast.error('An error occurred while retrieving post images.');
			}
		};
		fetchImages();
	}, [post]);

	const prevPost = () => {
		if (postId <= postIds[0]) {
			navigate(`/posts/${postIds[postIndex - 1]}`);
		}
	};

	const nextPost = () => {
		if (postId >= postIds[postIds.length - 1]) {
			navigate(`/posts/${postIds[postIndex + 1]}`);
		}
	};

	return (
		<div>
			{post ? (
				<div className="relative mb-12">
					<div
						className="h-[36rem] bg-cover bg-center bg-no-repeat w-full bg-tapio"
						style={{ backgroundImage: `url(${images[post.id]?.src?.['original'] || 'https://images.pexels.com/photos/2662792/pexels-photo-2662792.jpeg'})` }}
						onMouseEnter={() => setIsReturnVisible(true)}
						onMouseLeave={() => setIsReturnVisible(false)}
					>
						<div className={'p-8 duration-200 ' + (isReturnVisible ? 'opacity-100' : 'opacity-0')}>
							<button onClick={() => navigate('/')} className="bg-tapio text-white p-2 rounded-full mr-2 duration-200 disabled:opacity-50">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
								</svg>
							</button>
						</div>
					</div>
					<div className="absolute m-auto left-0 right-0 top-[24rem] bg-white w-full phone-xl:w-2/3 sm:w-2/3 px-6 py-4 sm:px-10 md:py-6 xl:px-20 phone-xl:rounded-3xl">
						<div className="py-4 md:py-8 xl:py-12">
							<div className="fixed phone-xl:relative left-0 bottom-0 phone-xl:bg-transparent bg-white w-full flex justify-center phone-xl:justify-end py-4 phone-xl:py-0 phone-xl:pr-4">
								<button onClick={() => prevPost()} disabled={postId >= postIds[0]} className="bg-tapio text-white p-2 rounded-full mr-2 duration-200 disabled:opacity-50">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
										<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
									</svg>
								</button>
								<button onClick={() => nextPost()} disabled={postId <= postIds[postIds.length - 1]} className="bg-tapio text-white p-2 rounded-full mr-2 duration-200 disabled:opacity-50">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
										<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
									</svg>
								</button>
							</div>
							<img className="h-8" src={tapioStory} alt="icon-tapio-stories" />
							<h1 className="text-3xl sm:text-[2rem] md:text-[3rem] xl:text-[3.5rem] font-bold leading-tight">{post.title}</h1>
						</div>
						<p className="leading-relaxed">{post.body.repeat(5)}</p>
						<PostComments postId={post.id} />
					</div>
				</div>
			) : (
				<div className="w-full flex h-screen justify-center items-center">
					<img className="h-12 opacity-40" src={iconTapio} alt="icon-tapio-stories" />
				</div>
			)}
		</div>
	);
}
