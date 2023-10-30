import { DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface RoomCardProps {
	room: DocumentData;
}

const RoomCard = ({ room }: RoomCardProps) => {
	return (
		<Link className='rounded-lg shadow-lg p-4 text-left' to={`/room/${room.name}`}>
			<p className='text-lg'>{room.name}</p>
			<p className='text-gray-500'>{room.createdAt.toDate().toUTCString()}</p>
		</Link>
	);
};

export default RoomCard;
