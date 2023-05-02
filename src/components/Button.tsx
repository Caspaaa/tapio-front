import { MouseEvent } from 'react';
import parse from 'html-react-parser';

type ButtonProps = {
	action: (event: MouseEvent) => void;
	isDisabled: boolean;
	icon: string;
	classes: string;
	size: string;
};

export function Button({ action, isDisabled, icon, classes, size }: ButtonProps): JSX.Element {
	const icons: { name: string; icon: string }[] = [
		{
			name: 'previous',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" className="${size}" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>`,
		},
		{
			name: 'next',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" className="${size} rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>`,
		},
		{
			name: 'add',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" className="${size}" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>`,
		},
		{
			name: 'edit',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" className="${size}" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>`,
		},
		{
			name: 'bin',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" className="${size}" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>`,
		},
		{
			name: 'check',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" className="${size}" viewBox="0 0 20 20" fill="currentColor"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>`,
		},
		{
			name: 'cross',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" className="${size} rotate-45" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>`,
		},
	];

	const currentSVG = () => {
		const svg = icons.find((item) => item.name === icon);
		if (svg) return parse(svg.icon);
		return parse(
			'<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" /></svg>'
		);
	};

	return (
		<button type="button" onClick={(event) => action(event)} disabled={isDisabled} className={`p-2 rounded-full mr-2 duration-200 ${classes}`}>
			{currentSVG()}
		</button>
	);
}
