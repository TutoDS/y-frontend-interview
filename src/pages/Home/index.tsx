import OutlineButton from 'components/buttons/OutlineButton';
import styles from './styles.module.scss';

const Home = () => {
	return (
		<div className={`${styles['container']}`}>
			<div className={`${styles['image-container']}`}>
				<h1> Random Year Facts</h1>
				<h2>Generate random facts, from random years</h2>
			</div>
			<div className={`${styles['text-container']}`}>
				<OutlineButton to={'/facts'}>
					Generate Random Year Fact
				</OutlineButton>
			</div>
		</div>
	);
};

export default Home;
