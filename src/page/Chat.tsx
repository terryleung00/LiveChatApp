import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMessage, getMessages } from '../../firebase.config';
import { DocumentData } from 'firebase/firestore';

const Chat = () => {
	const { name } = useParams();
	const [messages, setMessages] = useState<DocumentData[]>([]);
	const [message, setMessage] = useState('');
    const nav = useNavigate();

	useEffect(() => {
		if (!name) return;
		const mesList: DocumentData[] = [];
		getMessages(name).then((messages) => {
			messages?.forEach((message) => mesList.push(message.data()));
			setMessages(mesList);
		});
	}, []);

    if(!name) return;
	return (
		<div className='m-4'>
			<h1 className='text-3xl'>Chat</h1>
			<div className='m-2'>
				{messages.map((message, idx) => (
					<div key={idx} className='bg-slate-200 flex-auto rounded-lg w-7/12 p-2 m-2'>
						<div>
							{message.message} - {message.createdAt.toDate().toUTCString()}
						</div>
						<div className='text-gray-400'>{message.user}</div>
					</div>
				))}
			</div>
			<div className='flex'>
				<input
					className='flex-grow p-2 rounded-lg border border-gray-300  text-black mr-2'
					placeholder='message'
					onChange={(e) => setMessage(e.target.value)}
				></input>
				<button
					type='button'
					className='bg-purple-500 text-white px-4 py-2 rounded-lg'
					disabled={!message}
                    onClick={() => {createMessage(name, message); nav(0)}}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
