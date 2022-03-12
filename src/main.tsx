import 'assets/styles/global.scss';
import Main from 'pages/Main';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
	<>
		<Toaster />
		<Main />
	</>,
	document.getElementById('root')
);
