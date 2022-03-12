import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ColorsResponseType } from 'shared/@types/Colors';
import { FactType } from 'shared/@types/Fact';
import api from 'shared/services/api';

export type FactsContextProps = {
	listOfFacts: FactType[];
	currentIndex: number;
	bgColor: string;
	changeCurrentIndex: (index: number) => void;
	getRandomFact: () => Promise<void>;
	removeFact: (fact: FactType) => void;
};

type FactsContextProviderProps = {
	children: ReactNode;
};

export const FactsContext = createContext({} as FactsContextProps);

export const FactsContextProvider = ({
	children
}: FactsContextProviderProps) => {
	const [listOfFacts, setListOfFacts] = useState<FactType[]>([]);

	// Current Index (to use in the list of facts)
	const [currentIndex, setCurrentIndex] = useState(
		Math.floor(Math.random() * listOfFacts.length)
	);

	// Background Color State
	const [bgColor, setBgColor] = useState('#306970');

	// Get random color to use on background
	const getRandomColor = async () => {
		try {
			const { data } = await axios.get<ColorsResponseType>(
				'https://www.colr.org/json/colors/random/7'
			);

			setBgColor(
				`#${
					data.colors[Math.floor(Math.random() * data.colors.length)]
						.hex
				}`
			);
		} catch (error) {
			console.log(error);
		}
	};

	// Use Effects (to load first random fact)
	const getRandomFact = async () => {
		try {
			const { data } = await api.get<FactType>('random/year', {
				params: { json: true }
			});

			setCurrentIndex(
				listOfFacts.length > 0 ? listOfFacts.length - 1 : 0
			);

			await getRandomColor();

			setListOfFacts((prevState) => {
				return prevState ? [...prevState, data] : [data];
			});

			toast.success('Fact added successfully!');
		} catch (error) {
			toast.error('Something went wrong! Please try again.');
			console.log(error);
		}
	};

	useEffect(() => {
		getRandomFact();
	}, []);

	const changeCurrentIndex = (index: number) => setCurrentIndex(index);

	// Handle with remove fact
	const removeFact = (fact: FactType) => {
		if (listOfFacts.length === 0) {
			toast.error("You don't have any facts to remove!");

			getRandomFact();

			setCurrentIndex(0);
		} else {
			setListOfFacts(
				listOfFacts.filter((item) => item.number !== fact.number)
			);
			setCurrentIndex((prevState) => (prevState > 0 ? prevState - 1 : 0));

			toast.success('Fact removed successfully!');
		}
	};

	return (
		<FactsContext.Provider
			value={{
				listOfFacts,
				currentIndex,
				bgColor,
				changeCurrentIndex,
				getRandomFact,
				removeFact
			}}
		>
			{children}
		</FactsContext.Provider>
	);
};
