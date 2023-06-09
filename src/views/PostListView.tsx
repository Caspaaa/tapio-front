import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import pexels from '../api/pexels';

import { PostTile } from '../components/PostTile';
import { EditPostForm } from '../components/EditPostForm';
import { NewPostForm } from '../components/NewPostForm';
import { Post, Image } from '../types/types';
import { Modal } from '../components/Modal';
import { Loader } from '../components/Loader';
import { Button } from '../components/Button';

import logoTapio from '../assets/images/logoTapio.png';
import iconTapio from '../assets/images/iconTapio.png';

export function PostListView(): JSX.Element {
	const [posts, setPosts] = useState<Post[]>([]);
	const [editingPost, setEditingPost] = useState<Post | null>(null); // currently edited post
	const [chunks, setChunks] = useState<Post[][]>([]); // 3 posts
	const [images, setImages] = useState<Image[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const blockPerPage = 4; // 4 sets of 3 posts per page
	const indexOfLastBlock = currentPage * blockPerPage;
	const indexOfFirstBlock = indexOfLastBlock - blockPerPage;
	const currentPosts = chunks.slice(indexOfFirstBlock, indexOfLastBlock);

	const navigate = useNavigate();

	const closeModal = () => setIsModalOpen(false);

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
			<div className={`lg:w-10/12 2xl:w-3/4 mx-auto flex flex-wrap items-center h-screen relative ${isModalOpen ? ' z-0' : 'z-10'}`}>
				<div className="flex justify-center w-full">
					<img className="h-32 md:h-44" src={logoTapio} alt="logo-tapio-stories" />
				</div>
				<div className="fixed phone-xl:relative left-0 bottom-0 phone-xl:bg-transparent bg-white w-full flex justify-center phone-xl:justify-end py-4 phone-xl:py-0 phone-xl:pr-4 z-10">
					<Button action={() => setIsModalOpen(true)} isDisabled={false} classes="bg-white text-tapio mr-4 shadow" size="h-6 w-6" icon="add" />
					<Button action={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage === 1 || isLoading} classes="bg-tapio text-white mr-2 disabled:opacity-50" size="h-6 w-6" icon="previous" />
					<Button action={() => setCurrentPage(currentPage + 1)} isDisabled={currentPage >= currentPosts.length || isLoading} classes="bg-tapio text-white mr-2 disabled:opacity-50" size="h-6 w-6" icon="next" />
				</div>
				{!isLoading ? (
					currentPosts.map((chunk: Post[], index: number) => (
						<div key={index} className="flex flex-wrap w-full xl:w-1/2 xl:my-2">
							{chunk.map((post, post_index) => (
								<div key={post.id} className={(index % 2 === 0 && post_index === 0) || (index % 2 !== 0 && post_index === 2) ? 'w-full h-[14rem] my-4 ' : 'w-full md:w-1/2 h-[28rem] my-4 '}>
									<div
										onClick={(event) => {
											event.stopPropagation();
											navigate(`/posts/${post.id}`);
										}}
										className="py-6 px-8 mx-4 my-4 h-full rounded-xl custom-shadow duration-500 bg-tapio bg-cover bg-center bg-no-repeat cursor-pointer"
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
					<div className="w-full py-2 h-[32rem]">
						<Loader />
					</div>
				)}
				<div className="w-full flex h-44 justify-center items-center pb-40 pt-20 phone-xl:pb-20 phone-xl:pt-20">
					<img className="h-12 opacity-40" src={iconTapio} alt="icon-tapio-stories" />
				</div>
			</div>
			<Modal isVisible={isModalOpen} closeModal={closeModal}>
				<NewPostForm closeModal={closeModal} posts={posts} setPosts={setPosts} />
			</Modal>
		</>
	);
}
