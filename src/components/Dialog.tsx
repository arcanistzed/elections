type DialogProps = {
	children: React.ReactNode;
	onClose: () => void;
};

const Dialog = ({ children, onClose }: DialogProps) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center">
			<div className="absolute inset-0 bg-black opacity-50" />
			<div className="relative rounded-lg bg-gray-800 p-8">
				<button className="absolute top-0 right-0 p-4" onClick={() => onClose()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-gray-200"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<div className="flex flex-col gap-4">{children}</div>
			</div>
		</div>
	);
};

export default Dialog;
