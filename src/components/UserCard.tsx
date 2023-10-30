import { DocumentData } from "firebase/firestore";

interface UserCardProps {
    user: DocumentData;
}

const UserCard = ({user} : UserCardProps) => {
	return (
		<div className='rounded-lg shadow-lg p-4'>
			<p className='text-lg'>{user.name}</p>
			<p>{user.email}</p>
			<p className='text-gray-500'>{(user.createdAt.toDate()).toUTCString()}</p>
		</div>
	);
};

export default UserCard;
