'use client';

import Slider from '../Slider/Slider';
import { useAuth } from '@/utility/Auth';
import { use, useState } from 'react';
import ArrowLeft from '@/drawings/ArrowLeft';
import styles from './Groups.module.css';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { handleGroupSubmit, handleSaveGroup } from '@/utility/firebase';
import Button from '../Button/Button';

// Drawing imports
import GroupName from '@/drawings/GroupName';
import FiSend from '@/drawings/FiSend';
import CopyLink from '@/drawings/CopyLink';
import Walking from '@/drawings/Walking';
import GroupCreatedDrawing from '@/drawings/GroupCreatedDrawing';

export default function Groups() {
	// 5 total steps
	const totalSteps = 5;
	const [step, setStep] = useState<number>(0);
	// const memebers = [
	// 	{ key: 123, email: 'joanne.jiwoo@gmail.com', role: 'Admin' },
	// 	{ key: 456, email: 'maureen.luo@gmail.com', role: 'Invited' },
	// ];
	const [members, setMembers] = useState<any[]>([{ key: 123, email: 'joanne.jiwoo@gmail.com', role: 'Admin' }]);
	const [groupName, setGroupName] = useState('nwPlus n friends');
	const [address, setAddress] = useState('');
	const [notificationTime, setNotificationTime] = useState('');

	const [form, setForm] = useState<any>({
        groupName: '',
        members: [],
        address: '',
        notificationTime: ''
    });

	const [markerLocation, setMarkerLocation] = useState({
		lat: 49.2791,
		lng: -122.9202,
	});
	const [walkingDistance, setWalkingDistance] = useState(100);

	const onEnter = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/geocode/coordinates`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ address }),
			});

			if (!response.ok) {
				throw new Error('Failed to fetch coordinates');
			}

			const data = await response.json();
			const { lat, lng } = data;
			setMarkerLocation({ lat, lng });
		} catch (error) {
			console.error(error);
		}
	};

	//   function handleInput(key: string, value: any) {
	//     const updatedForm = JSON.parse(JSON.stringify(form));
	//     updatedForm[key] = value;
	//     setForm(updatedForm);
	//   }
	//   const handle = (e: any) => handleInput("username", e.target.value);

	//   triggered on every step
	//   async function onSave() {
	//     await handleSaveGroup(group.uid as string, {
	//         groupName: form.groupName,
	//         members: members,
	//         address: address,
	//         notificationTime: notificationTime
	//     });
	// }

	//   async function onSubmit() {
	//     await handleOnboardSubmit(user.uid as string, {
	//         groupName: form.groupName,
	//         members: members,
	//         address: address,
	//         notificationTime: notificationTime
	//     });
	//     setO(true);
	//   }

	async function goBack() {
		if (step == 0) return;
		setStep(step - 1);
	}

	async function goNext() {
		if (step == 4) {
			// at end -- go to "Create your first group"
			console.log('you are at the end');
			// await onSubmit();
			return;
		}
		// onSave();
		setStep(step + 1);
	}

	async function goNextAlt() {
		switch (step) {
			case 3:
				// at reminders -- just go next
				goNext();
			// await onSave();
			default:
				console.error('what is going on');
		}
	}

	const stepToHeight: any = {
		0: '55',
		1: '70',
		2: '70',
		3: '70',
		4: '55',
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<div className={styles.back} onClick={goBack}>
					<ArrowLeft />
				</div>
				<Slider value={step} max={4} />
			</div>

			<div
				style={{
					width: `${totalSteps * 100}vw`,
					height: `${stepToHeight[step]}vh`,
					overflow: 'hidden',
					transition: `all 0.13s ease`,
				}}
			>
				<div
					style={{
						display: `grid`,
						gridTemplateColumns: `repeat(${totalSteps}, 1fr)`,
						width: `${totalSteps * 100}vw`,
						transition: `all 0.13s ease`,
						transform: `translateX(-${step * 100}vw)`,
					}}
				>
					{/* GroupName */}
					<div className={`${styles.stepInner} ${styles.step2}`}>
						<div className={`${styles.innerCenterWrapper}`}>
							<GroupName />
							<h1>Name your Group</h1>
							<input type='text' placeholder='Group Name' className={`${styles.input}`} onChange={(e) => {setGroupName(e.target.value)}}/>
						</div>
					</div>

					{/* Add Members */}
					<div className={`${styles.stepInner} ${styles.step2}`}>
						<div className={`${styles.innerLeftWrapper}`}>
							<h1>Add Members</h1>
							<p className={`${styles.p}`}>Invite members below or share the invite link</p>
							<div className={`${styles.horWrapper}`}>
								<input type='text' placeholder='Group Name' className={`${styles.input}`} />
								<button className={`${styles.sendButton}`}>
									<FiSend />
								</button>
							</div>

							<h2>Members</h2>
							<div>
								{members.map((member) => (
									<div className={`${styles.memberInfo}`} key={member.key}>
										<p className={`${styles.p}`}>{member.email}</p>
										<p className={`${styles.secondaryText} ${styles.p}`}>{member.role}</p>
									</div>
								))}
							</div>

							<div className={`${styles.divider}`}></div>

							<div className={`${styles.horWrapper}`}>
								<p className={`${styles.secondaryText} ${styles.p}`}>Anyone with the link can join</p>
								<button className={`${styles.memberSecondaryButton}`}>
									<div className={`${styles.horWrapper}`}>
										Copy Link
										<CopyLink />
									</div>
								</button>
							</div>
						</div>
					</div>

					{/* SetMeetup */}
					<div className={`${styles.stepInner} ${styles.step0}`}>
						<div className={`${styles.innerLeftWrapper}`}>
							<h1>Set a meetup area</h1>
							<p className={`${styles.p}`}>We’ll suggest restaurants that are in your group’s area</p>

							<h2>Enter Address</h2>
							<div className={`${styles.horWrapper}`}>
								<input
									type='text'
									placeholder='ex. your office area'
									className={`${styles.input} ${styles.smallInput}`}
									onChange={(e) => {
										setAddress(e.target.value);
									}}
								/>
								<button className={`${styles.meetupButton}`} onClick={onEnter}>
									Enter
								</button>
							</div>

							<APIProvider
								apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
								onLoad={() => console.log('Maps API has loaded.')}
							>
								<div className={`${styles.mapContainer}`}>
									<Map defaultCenter={markerLocation} defaultZoom={13} gestureHandling={'greedy'} disableDefaultUI />
									<Marker position={markerLocation} />
								</div>
							</APIProvider>

							<p className={`${styles.mapText}`}>Pinch and drag to adjust the location and radius</p>

							<div className={`${styles.capsuleWrapper}`}>
								<Walking />
								<p className={`${styles.distanceText}`}>{walkingDistance}m</p>
							</div>
						</div>
					</div>

					{/* SetReminders */}
					<div className={`${styles.stepInner} ${styles.step0}`}>
						<div className={`${styles.innerLeftWrapper}`}>
							<h1>
								Set <span className={`${styles.hl}`}>reminders</span> for{' '}
								<span className={`${styles.hl}`}>recurring</span> meals
							</h1>
							<p className={`${styles.p}`}>
								We’ll send your group a notification when it’s time to vote on a restaurant!
							</p>

							<h2>Select a time:</h2>
							<div className={`${styles.box} ${styles.RemHorWrapper}`}>
								<div className={`${styles.verWrapper}`}>
									<input className={`${styles.timeInput}`} />
									<p className={`${styles.timeSubtext}`}>HOUR</p>
								</div>
								<p className={`${styles.timeBigText}`}>:</p>
								<div className={`${styles.verWrapper}`}>
									<input className={`${styles.timeInput}`} />
									<p className={`${styles.timeSubtext}`}>MIN</p>
								</div>
							</div>
						</div>
					</div>

					{/* GroupCreated */}
					<div className={`${styles.stepInner} ${styles.stepFinal}`}>
						<div className={`${styles.innerCenterWrapper}`}>
							<GroupCreatedDrawing />
							<h1>{groupName}</h1>
							<h2>Created!</h2>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.control}>
				<Button onClick={goNext} disabled={
					(step == 0 && form?.groupName == "") || 
					(step == 1 && form?.members.length < 2) ||
					(step == 2 && form?.address == "")}
				>
					{step == totalSteps - 1 ? 'Finish' : step == 2 ? 'Confirm' : 'Next'}
				</Button>
				{step == 3 && (
					<div className={styles.fadedAction} onClick={goNextAlt}>
						{'Skip for now'}
					</div>
				)}
			</div>
		</div>
	);
}
