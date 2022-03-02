import {
	createContext,
	ReactNode,
	useCallback,
	useEffect,
	useState
} from 'react';
import { FactType } from 'shared/@types/Fact';
import api from 'shared/services/api';

export type FactsContextProps = {
	listOfFacts: FactType[];
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

	// Use Effects (to load first random fact)
	const getRandomFact = useCallback(async () => {
		try {
			const { data } = await api.get<FactType>('random/year', {
				params: { json: true }
			});
			setListOfFacts((prevState) => {
				return prevState ? [...prevState, data] : [data];
			});
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		getRandomFact();
	}, []);

	const removeFact = (fact: FactType) => {
		setListOfFacts(
			listOfFacts.filter((item) => item.number !== fact.number)
		);
	};

	return (
		<FactsContext.Provider
			value={{ listOfFacts, getRandomFact, removeFact }}
		>
			{children}
		</FactsContext.Provider>
	);
};
