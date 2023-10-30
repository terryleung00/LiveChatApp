import { DocumentData } from 'firebase/firestore';
import { getRooms, getUsers } from '../../firebase.config';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import RoomCard from '../components/RoomCard';
import CreateRoom from '../components/CreateRoom';

interface RoomsProps {
	showCreate: boolean;
	setShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Rooms = ({ showCreate, setShowCreate }: RoomsProps) => {
	const [userList, setUserList] = useState<DocumentData[]>([]);
	const [roomList, setRoomList] = useState<DocumentData[]>([]);

	useEffect(() => {
		const userTemp: DocumentData[] = [];
		const roomTemp: DocumentData[] = [];

		getUsers().then((users) => {
			users?.forEach((user) => {
				userTemp.push(user.data());
			});
			setUserList(userTemp);
		});
		getRooms().then((rooms) => {
			rooms?.forEach((room) => {
				roomTemp.push(room.data());
			});
			setRoomList(roomTemp);
		});
	}, [showCreate]);

	return (
		<>
			<div className='grid grid-cols-3 gap-4'>
				<div className='col-span-2 m-4'>
					<h1 className='text-3xl'>Rooms</h1>
					<div className='grid grid-flow-row-dense grid-cols-3'>
						{roomList.length > 0 ? (
							roomList.map((room, idx) => <RoomCard key={idx} room={room} />)
						) : (
							<h2>No chat room</h2>
						)}
					</div>
				</div>
				<div className='grid grid-flow-row m-4'>
					<h1 className='text-3xl'>Users</h1>
					{userList.map((user, idx) => (
						<UserCard key={idx} user={user} />
					))}
				</div>
			</div>
			<CreateRoom showCreate={showCreate} setShowCreate={setShowCreate} />
		</>
	);
};

export default Rooms;
