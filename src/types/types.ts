export type Post = {
	id: number;
	userId: number;
	title: string;
	body: string;
};

export type PostComment = {
	id: number;
	name: string;
	email: string;
	body: string;
};

export type Image = {
	id: number;
	width: number;
	height: number;
	url: string;
	photographer: string;
	photographer_url: string;
	photographer_id: number;
	avg_color: string;
	src: {
		original: string;
		large2x: string;
		large: string;
		medium: string;
		small: string;
		portrait: string;
		landscape: string;
		tiny: string;
	};
	liked: boolean;
	alt: string;
};
