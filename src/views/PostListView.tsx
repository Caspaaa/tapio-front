import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import pexels from '../api/pexels';

import { toast } from 'react-toastify';

import { PostTile } from '../components/PostTile';
import { EditPostForm } from '../components/EditPostForm';
import { NewPostForm } from '../components/NewPostForm';

import logoTapio from '../assets/images/logoTapio.png';
import iconTapio from '../assets/images/iconTapio.png';

import { ModalContext } from '../context/modalContext';

import { Post, Image } from '../types/types';

export function PostList(): JSX.Element {
	const [posts, setPosts] = useState<Post[]>([]);
	const [editingPost, setEditingPost] = useState<Post | null>(null); // currently edited post
	const [chunks, setChunks] = useState<Post[][]>([]); // 3 posts
	const [images, setImages] = useState<Image[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [currentPage, setCurrentPage] = useState(1);
	const blockPerPage = 4; // 4 sets of 3 posts per page

	const indexOfLastBlock = currentPage * blockPerPage;
	const indexOfFirstBlock = indexOfLastBlock - blockPerPage;

	const currentPosts = chunks.slice(indexOfFirstBlock, indexOfLastBlock);

	const { showModal, setShowModalTrue } = useContext(ModalContext);

	// Fetch posts from DB or JSONPlaceholder
	useEffect(() => {
		const fetchPosts = async () => {
			setIsLoading(true);
			const response = await axios.get<Post[]>(`${process.env.REACT_APP_API}/posts`);
			setIsLoading(false);

			setPosts(response.data);
		};
		fetchPosts();
	}, []);

	// Split posts in chunks of 3 for the UI layout
	useEffect(() => {
		const chunkPosts = () => {
			const chunks = [];
			for (let i = 0; i < posts.length; i += 3) {
				let chunk: Post[];
				chunk = posts.slice(i, i + 3);
				chunks.push(chunk);
			}
			setChunks(chunks);
		};
		chunkPosts();
	}, [posts]);

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
	}, [posts]);

	const onDelete = async (id: number) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API}/posts/${id}`);
			toast.success('Post deleted successfully.');
			setPosts(posts.filter((post) => post.id !== id));
		} catch (error) {
			toast.error('An error occurred while deleting the post.');
		}
	};

	return (
		<>
			<div className={`lg:w-10/12 2xl:w-3/4 mx-auto flex flex-wrap items-center h-screen relative ${showModal ? ' z-0' : 'z-10'}`}>
				<div className="flex justify-center w-full">
					<img className="h-32 md:h-44" src={logoTapio} alt="logo-tapio-stories" />
				</div>
				<div className="fixed phone-xl:relative left-0 bottom-0 phone-xl:bg-transparent bg-white w-full flex justify-center phone-xl:justify-end py-4 phone-xl:py-0 phone-xl:pr-4">
					<button onClick={() => setShowModalTrue()} className="bg-white text-tapio p-2 rounded-full mr-2 duration-200 mr-4 shadow">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
						</svg>
					</button>
					<button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="bg-tapio text-white p-2 rounded-full mr-2 duration-200 disabled:opacity-50">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= currentPosts.length} className="bg-tapio text-white p-2 rounded-full mr-2 duration-200 disabled:opacity-50">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
				</div>
				{!isLoading ? (
					currentPosts.map((chunk: Post[], index: number) => (
						<div key={index} className="flex flex-wrap w-full xl:w-1/2 xl:my-2">
							{chunk.map((post, post_index) => (
								<div key={post.id} className={(index % 2 === 0 && post_index === 0) || (index % 2 !== 0 && post_index === 2) ? 'w-full h-[14rem] my-4 ' : 'w-full md:w-1/2 h-[28rem] my-4 '}>
									<div
										className="py-6 px-8 mx-4 my-4 h-full rounded-xl custom-shadow duration-500 bg-tapio bg-cover bg-center bg-no-repeat"
										style={{
											backgroundImage: `url(${images[post.id]?.src?.[(index % 2 === 0 && post_index === 0) || (index % 2 !== 0 && post_index === 2) ? 'large2x' : 'large'] || 'https://images.pexels.com/photos/2662792/pexels-photo-2662792.jpeg'})`,
										}}
									>
										{editingPost && editingPost.id === post.id ? (
											// Update post form
											<EditPostForm post={editingPost} posts={posts} setPosts={setPosts} onUpdated={setEditingPost} onEdit={setEditingPost} />
										) : (
											// Post
											<PostTile post={post} onEdit={setEditingPost} onDelete={onDelete} />
										)}
									</div>
								</div>
							))}
						</div>
					))
				) : (
					<div className="flex justify-center items-center w-full py-2 h-[32rem]">
						<div className="loader bg-white">
							<span className="dot"></span>
							<div className="dots">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</div>
					</div>
				)}
				<div className="w-full flex h-44 justify-center items-center mobile-xl:pb-0 py-20">
					<img className="h-12 opacity-40" src={iconTapio} alt="icon-tapio-stories" />
				</div>
			</div>
			<NewPostForm posts={posts} setPosts={setPosts} />
		</>
	);
}
