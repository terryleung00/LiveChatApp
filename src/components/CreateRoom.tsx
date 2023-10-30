import { useState } from 'react';
import { createRoom } from '../../firebase.config';

interface CreateRoomProps {
	showCreate: boolean;
	setShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRoom = ({ showCreate, setShowCreate }: CreateRoomProps) => {
	const [roomName, setRoomName] = useState('');

	if (!showCreate) return;

	const createRoomClicked = (e: React.FormEvent) => {
		e.preventDefault();
		createRoom(roomName);
		setShowCreate(false);
		setRoomName('');
	};

	return (
		<>
			<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
				<div className='bg-gray-800 p-4 rounded-lg relative'>
					<button
						className='text-white text-2xl absolute top-0 right-0 m-4'
						onClick={() => setShowCreate(false)}
					>
						x
					</button>
					<form onSubmit={(e) => createRoomClicked(e)}>
						<div className='mt-10'>
							<input
								className='p-2 rounded w-full text-black'
								placeholder='Room name'
								onChange={(e) => setRoomName(e.target.value)}
							></input>
						</div>
						<div className='mt-4 flex justify-center'>
							<button
								className='px-4 py-2 rounded text-white bg-purple-300'
								type='submit'
							>
								Create
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default CreateRoom;
