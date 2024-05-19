// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { API_URL } from './config';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD8zILnvpC6YaXhKoHNLzZATBUs2Nc-6_A',
	authDomain: 'nomnomnomnomnomnom.firebaseapp.com',
	projectId: 'nomnomnomnomnomnom',
	storageBucket: 'nomnomnomnomnomnom.appspot.com',
	messagingSenderId: '319368335728',
	appId: '1:319368335728:web:60f48f7943a4f458573fb5',
	measurementId: 'G-4LXV92DV53',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth helpers
export function onAuthChange(cb: any) {
	return onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	try {
		await signInWithPopup(auth, provider);
	} catch (error) {
		console.error('Error signing in with Google', error);
	}
}

export async function signOut() {
	try {
		return auth.signOut();
	} catch (error) {
		console.error('Error signing out with Google', error);
	}
}

// Database helpers

const userRef = collection(db, 'users');

interface User {
	subscription: string;
	isOnboarded: boolean;
}

export async function updateSubData(uid: string, data: any) {
	await setDoc(
		doc(db, 'users', uid),
		{
			subscription: JSON.stringify(data),
		},
		{ merge: true }
	);
}

export async function getUserOnboarded(uid: string) {
	const docRef = doc(db, 'users', uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		if (docSnap.data().isOnboarded) {
			return true;
		}
	}

	return false;
}
export async function getUser(uid: string) {
	const docRef = doc(db, 'users', uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	}

	return false;
}

export async function handleGroupSubmit(data: any) {
	const docRef = await addDoc(collection(db, 'groups'), data);
}

export async function handleSaveUser(uid: string, data: any) {
	await setDoc(
		doc(db, 'users', uid),
		{
			...data,
		},
		{ merge: true }
	);
}

export async function handleOnboardSubmit(uid: string, data: any) {
	await setDoc(
		doc(db, 'users', uid),
		{
			...data,
			isOnboarded: true,
		},
		{ merge: true }
	);
}
export async function getAllGroups() {
	const q = query(collection(db, 'groups'));
	const querySnapshot = await getDocs(q);
	const docs: any = [];
	querySnapshot.forEach((doc) => {
		docs.push(doc.data());
	});
	return docs;
}

export async function getGroup(id: string) {
	const docRef = doc(db, 'groups', id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	}

	return false;
}

export async function getAllVisits() {
	const q = query(collection(db, 'visits'));
	const querySnapshot = await getDocs(q);
	const docs: any = [];
	querySnapshot.forEach((doc) => {
		docs.push({ ...doc.data(), _id: doc.id });
	});
	return docs;
}

export async function getVisit(id: string) {
	const docRef = doc(db, 'visits', id);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	}
}

export async function updateVisit(id: string, data: any) {
	await setDoc(
		doc(db, 'visits', id),
		{
			bookedRestaurant: data,
		},
		{ merge: true }
	);
}
// can you tell i am deprived
export async function changeMealStatus(id: string, data: number) {
	await setDoc(
		doc(db, 'visits', id),
		{
			statusCode: data,
		},
		{ merge: true }
	);
}

async function book(by: string, restaurantName: string, time: string, reso: number, visitId: string) {
	const options = {
		method: 'POST',
		headers: {
			authorization: 'sk-hilyr75eqfk8r7to4xlamtcde8g6x626jqkr1wx5yfsep0p4arhl9abcs8ygtsb969',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			phone_number: `+17782453794`,
			task: `You are ${by}, you want to book a reservation at ${restaurantName} for 1 PM today (may 19th) for ${reso} people. Keep the call short.`,
			wait_for_greeting: true,
			interruption_threshold: 90,
			model: 'enhanced',
			request_data: {
				restaurantName,
				amountOfSeatsToReserve: reso,
			},
			voice: '2c01ebe7-45d4-4b58-9686-617fa283dd8e', // "Derek"
			from: '+12363269079',
            webhook: 'https://nom-server-production.up.railway.app/api/subscription/callend',
			tools: [
				{
					name: 'NotifyFriends',
					description: 'Only if a reservation is successful, notifies friends of the booking',
					url: 'https://nom-server-production.up.railway.app/api/updateStatusCode',
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer YOUR_API_KEY',
					},
					body: {
						visitId: visitId,
						statusCode: 2,
					},
					input_schema: {
						example: {
							speech: `Thank you! Hope you win the hackathon!`,
							time: '{{input.time}}',
						},
						type: 'object',
						properties: {
							speech: 'string',
							time: 'HH:MM AM/PM',
						},
					},
					response: {
						succesfully_reserved_time: '$.success',
					},
				},
			],
		}),
	};

	const response = await fetch('https://api.bland.ai/v1/calls', options);
	const data = await response.json();
	console.log(data);
}

/**
 *
 * @param uid the user casting the vote
 * @param visitId the `visit` collection item being voted to
 * @param option the option being voted on
 * @param vote being casted
 * @param displayName the name of the person voting
 */
export async function voteChoice(
	uid: string,
	visitId: string,
	option: 0 | 1 | 2 | number,
	vote: boolean,
	displayName: string
) {
	const visit = await getVisit(visitId);

	// check if user already voted
	const alreadyVoted = visit?.users.includes(uid);
	if (alreadyVoted) return;

	// the new option that visit will be updated with
	const newOptions = visit?.options;
	if (vote) {
		newOptions[option].voteCount += 1;
	}

	// the new users array that visit will be updated with
	const newUsers = visit?.users;
	newUsers.push(uid);

	// update visits doc
	await setDoc(
		doc(db, 'visits', visitId),
		{
			options: newOptions,
			users: newUsers,
		},
		{ merge: true }
	);

	const group = await getGroup(visit?.groupId);
	if (!group) return;

	if (newUsers.length == group.users.length) {
		// user is the last voter, make call  trigger booking by top restaurant

		// rank order options by voteCount
		const restaurants = newOptions.sort((a: any, b: any) => (a.voteCount > b.voteCount ? 1 : 0));
		console.log(restaurants);

		const restaurantChoice = restaurants[0];
		await updateVisit(visitId, restaurantChoice);

		await changeMealStatus(visitId, 2);

		const date = new Date(visit?.voteBy);
		const fifteenAfter = new Date(date.getTime() + 15 * 60000).toString();

		book(displayName, restaurantChoice.name, fifteenAfter.substring(0, 15), newUsers.length, visitId);
	}
}
