export function Loader(): JSX.Element {
	return (
		<div className="flex justify-center items-center w-full h-full">
			<div className="loader">
				<span className="dot"></span>
				<div className="dots">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	);
}
