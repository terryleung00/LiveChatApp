import Header from './components/Header';
import { auth } from '../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Rooms from './page/Rooms';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Chat from './page/Chat';

function App() {
	const [showCreate, setShowCreate] = useState(false);
	const [user] = useAuthState(auth);
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Header user={user} setShowCreate={setShowCreate} />}
				>
					<Route
						index
						element={
							<Rooms showCreate={showCreate} setShowCreate={setShowCreate} />
						}
					/>
					<Route path='/room/:name' element={<Chat />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
