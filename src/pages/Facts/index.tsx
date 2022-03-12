import OutlineButton from 'components/buttons/OutlineButton';
import CloseIcon from 'components/icons/CloseIcon';
import DeleteIcon from 'components/icons/DeleteIcon';
import { FactsContext } from 'contexts/FactsContexts';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const Facts = () => {
	// Navigation from React Router Dom (to navigate to home page when click on close icon)
	const navigate = useNavigate();

	// Context with list of facts
	const {
		listOfFacts,
		currentIndex,
		bgColor,
		changeCurrentIndex,
		getRandomFact,
		removeFact
	} = useContext(FactsContext);

	// Handle close the fact
	const handleCloseFact = () => {
		navigate('/');
	};

	// Handle the year input change
	const handleYearChange = (year: number) => {
		const index = listOfFacts.findIndex((item) => item.number === year);

		changeCurrentIndex(index);
	};

	// Build an array with years from facts
	const years = Array.from(listOfFacts, (item) => item.number);

	return (
		<div className={`${styles['container']}`}>
			<div className={`${styles['fact-container']}`}>
				{listOfFacts[currentIndex] && (
					<>
						<h1>{listOfFacts[currentIndex].number}</h1>
						<p>{listOfFacts[currentIndex].text}</p>
					</>
				)}

				{listOfFacts.length === 0 && (
					<>
						<h2>No Facts to show!</h2>
						<p>
							If you want a new fact, please click on right side
							button.
						</p>
					</>
				)}

				<CloseIcon
					onClick={handleCloseFact}
					className={`${styles['icon']} ${styles['on-top']}`}
				/>

				{listOfFacts.length > 0 && (
					<DeleteIcon
						onClick={() => removeFact(listOfFacts[currentIndex])}
						className={`${styles['icon']} ${styles['on-bottom']}`}
					/>
				)}
			</div>

			<div
				className={`${styles['timeline-container']}`}
				style={{ backgroundColor: bgColor }}
			>
				<OutlineButton onClick={getRandomFact} color={'light'}>
					Generate Random Year Fact
				</OutlineButton>

				{listOfFacts.length > 0 && (
					<div className={styles['years-container']}>
						{years
							.sort((a, b) => (a > b ? 1 : -1))
							.map((year) => (
								<button
									key={year}
									className={`${styles['year-btn']} ${
										listOfFacts[currentIndex].number ===
											year && styles['current']
									}`}
									onClick={() => handleYearChange(year)}
								>
									<span className='block truncate'>
										{year}
									</span>
								</button>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Facts;
