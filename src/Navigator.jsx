import { Routes, Route } from 'react-router-dom';
import Search from './Search';
import Main from './Main';
import Detail from './Detail';

const Navigator = () => (
	<Routes>
		<Route path="/" element={<Main />} />
		<Route path="/resultats/:marecherche" element={<Search />} />
		<Route path="/series/:id" element={<Detail />} />
	</Routes>
);
export default Navigator;
