import { ElementType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

type Props = {
	className?: string;
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset' | undefined;
	color?: 'dark' | 'light';
	to?: string; // if pass link type
	onClick?: () => void;
};

const OutlineButton = ({
	className,
	children,
	type = 'button',
	color = 'dark',
	to,
	onClick,
	...props
}: Props) => {
	const Tag: ElementType = to ? Link : 'button';
	const tagAttributes = to ? { to } : { type, onClick };

	return (
		<Tag
			{...tagAttributes}
			{...props}
			className={`${className || ''} ${styles['button']} ${
				styles[`${color}-button`]
			}`}
		>
			{children}
		</Tag>
	);
};

export default OutlineButton;
