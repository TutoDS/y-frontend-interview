type Props = {
	className?: string;
	onClick?: () => void;
};

const CloseIcon = ({ className, onClick, ...props }: Props) => {
	return (
		<svg
			onClick={onClick}
			className={`${className || ''} ionicon`}
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 512 512'
		>
			<title>Close</title>
			<path
				fill='none'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth='32'
				d='M368 368L144 144M368 144L144 368'
			/>
		</svg>
	);
};

export default CloseIcon;
