import { User } from 'firebase/auth';
import { signIn, signOut } from '../../firebase.config';
import { Link, Outlet } from 'react-router-dom';

interface UserProps {
	user: User | null | undefined;
	setShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ user, setShowCreate }: UserProps) => {
	return (
		<>
			<div className='border-b border-sky-500 p-4 flex justify-between'>
				<Link to={'/'} className='text-sky-500 hover:text-sky-700'>
					Chat Rooms
				</Link>
				{user ? (
					<>
						<button
							className='text-sky-500 hover:text-sky-700'
							onClick={() => setShowCreate(true)}
						>
							Create Room
						</button>
						<button
							className='text-sky-500 hover:text-sky-700'
							onClick={signOut}
						>
							Sign Out
						</button>
					</>
				) : (
					<button className='text-sky-500 hover:text-sky-700' onClick={signIn}>
						Sign in
					</button>
				)}
			</div>
			<Outlet />
		</>
	);
};

export default Header;
