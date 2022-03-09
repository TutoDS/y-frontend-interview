import axios from 'axios';
import OutlineButton from 'components/buttons/OutlineButton';
import CloseIcon from 'components/icons/CloseIcon';
import DeleteIcon from 'components/icons/DeleteIcon';
import { FactsContext } from 'contexts/FactsContexts';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorsResponseType } from 'shared/@types/Colors';
import styles from './styles.module.scss';

const Facts = () => {
	// Navigation from React Router Dom (to navigate to home page when click on close icon)
	const navigate = useNavigate();

	// Context with list of facts
	const { listOfFacts, getRandomFact, removeFact } = useContext(FactsContext);

	// Current Index (to use in the list of facts)
	const [currentIndex, setCurrentIndex] = useState(
		Math.floor(Math.random() * listOfFacts.length)
	);

	// Handle with remove fact
	const handleRemoveFact = () => {
		if (listOfFacts.length === 0) {
			alert('No more facts to remove. Generating a new one to you...');

			getRandomFact();

			setCurrentIndex(0);
		} else {
			removeFact(listOfFacts[currentIndex]);
			setCurrentIndex((prevState) => (prevState > 0 ? prevState - 1 : 0));
		}
	};

	// Handle the get of random fact
	const handleGetRandomFact = () => {
		getRandomFact();

		setCurrentIndex(listOfFacts.length > 0 ? listOfFacts.length - 1 : 0);
	};

	// Handle close the fact
	const handleCloseFact = () => {
		navigate('/');
	};

	// Handle the year input change
	const handleYearChange = (year: number) => {
		const index = listOfFacts.findIndex((item) => item.number === year);

		setCurrentIndex(index);
	};

	// Build an array with years from facts
	const years = Array.from(listOfFacts, (item) => item.number);

	// Background Color State
	const [bgColor, setBgColor] = useState('306970');

	// Get random color to use on background
	const getRandomColor = useCallback(async () => {
		try {
			const { data } = await axios.get<ColorsResponseType>(
				'https://www.colr.org/json/colors/random/1'
			);

			setBgColor(`#${data.colors[0].hex}`);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		getRandomColor();

		return () => setBgColor('');
	}, []);

	return (
		<div className={`${styles['container']}`}>
			<div className={`${styles['fact-container']}`}>
				{listOfFacts[currentIndex] && (
					<>
						<h1>{listOfFacts[currentIndex].number}</h1>
						<p>{listOfFacts[currentIndex].text}</p>
					</>
				)}

				{!listOfFacts && <h1>No Facts to show!</h1>}

				<CloseIcon
					onClick={handleCloseFact}
					className={`${styles['icon']} ${styles['on-top']}`}
				/>
				<DeleteIcon
					onClick={handleRemoveFact}
					className={`${styles['icon']} ${styles['on-bottom']}`}
				/>
			</div>

			<div
				className={`${styles['timeline-container']}`}
				style={{ backgroundColor: bgColor }}
			>
				<OutlineButton onClick={handleGetRandomFact} color={'light'}>
					Generate Random Year Fact
				</OutlineButton>

				<div className={styles['years-container']}>
					{years
						.sort((a, b) => (a > b ? 1 : -1))
						.map((year) => (
							<button
								key={year}
								className={`${styles['year-btn']} ${
									listOfFacts[currentIndex].number === year &&
									styles['current']
								}`}
								onClick={() => handleYearChange(year)}
							>
								<span className='block truncate'>{year}</span>
							</button>
						))}
				</div>
			</div>
		</div>
	);
};

export default Facts;
