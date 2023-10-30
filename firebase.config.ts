import { initializeApp } from 'firebase/app';
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signIn = async () => {
	await signInWithPopup(auth, provider);
};

export const signOut = () => {
	auth.signOut();
};

export const getUsers = async () => {
	const querySnapShot = await getDocs(collection(db, 'users'));

	if (querySnapShot) {
		return querySnapShot;
	} else {
		return null;
	}
};

export const createRoom = async (roomName: string) => {
	const docRef = await doc(db, 'rooms', roomName);
	updateDoc(docRef, {})
		.then(() => window.alert('Chat room exists'))
		.catch(() => {
			setDoc(docRef, {
				name: roomName,
				createdAt: Timestamp.now(),
			});
			window.alert('Created');
		});
};

export const getRooms = async () => {
	const querySnapShot = await getDocs(collection(db, 'rooms'));

	if (querySnapShot) {
		return querySnapShot;
	} else {
		return null;
	}
};

export const getMessages = async (roomName: string) => {
	const querySnapShot = await getDocs(
		collection(db, 'rooms', roomName, 'messages')
	);

	if (querySnapShot) {
		return querySnapShot;
	} else {
		return null;
	}
};

export const createMessage = async (roomName: string, message: string) => {
	await addDoc(collection(db, 'rooms', roomName, 'messages'), {
		message: message,
		user: auth.currentUser?.displayName,
		createdAt: Timestamp.now(),
	});
};

onAuthStateChanged(auth, async (result) => {
	//CreateUserProfile
	if (result) {
		const docRef = doc(db, 'users', result.displayName || '');
		updateDoc(docRef, {}).catch(() => {
			setDoc(docRef, {
				name: result.displayName,
				email: result.email,
				createdAt: Timestamp.now(),
			});
		});
	}
});

export { db, auth };
