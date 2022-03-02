import { FactsContextProvider } from 'contexts/FactsContexts';
import Facts from 'pages/Facts';
import Home from 'pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = () => {
	return (
		<FactsContextProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />

					<Route path={'/facts'} element={<Facts />} />

					{/* <Route path="*" element={<NotFound />} /> */}
				</Routes>
			</BrowserRouter>
		</FactsContextProvider>
	);
};

export default Main;
