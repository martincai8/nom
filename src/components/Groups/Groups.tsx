'use client';

import Slider from '../Slider/Slider';
import { useState } from 'react';
import ArrowLeft from '@/drawings/ArrowLeft';
import styles from './Groups.module.css';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { handleGroupSubmit } from '@/utility/firebase';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';

// Drawing imports
import GroupName from '@/drawings/GroupName';
import FiSend from '@/drawings/FiSend';
import CopyLink from '@/drawings/CopyLink';
import Walking from '@/drawings/Walking';
import GroupCreatedDrawing from '@/drawings/GroupCreatedDrawing';
import { API_URL } from '@/utility/config';
import ShortNerdyBommer from '@/drawings/ShortNerdyBommer';
import ShortPommer from '@/drawings/ShortPommer';
import CuriousYommer from '@/drawings/CuriousYommer';
import NerdyGommer from '@/drawings/NerdyGommer';
import { useAuth } from '@/utility/Auth';

export default function Groups({ onFinish }: { onFinish: () => void }) {

	const { user } = useAuth();

	const totalSteps = 5;
	const [step, setStep] = useState<number>(0);
	const [members, setMembers] = useState<any[]>([{ key: 123, email: user?.email, role: 'Admin' }]);
	const [memberName, setMemberName] = useState<string>('');
	const [groupName, setGroupName] = useState('nwPlus n friends');
	const [address, setAddress] = useState('');
	const [hour, setHour] = useState<string>('00');
	const [min, setMin] = useState<string>('00');

	const [markerLocation, setMarkerLocation] = useState({
		lat: 49.2791,
		lng: -122.9202,
	});
	const [walkingDistance, setWalkingDistance] = useState(100);

	const onEnter = async () => {
		try {
			const response = await fetch(`${API_URL}/api/geocode/coordinates`, {
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

	function handleAddMember () {
		if(!memberName) return;
		const updatedMembers = JSON.parse(JSON.stringify(members));
		updatedMembers.push({key: -1, email: memberName, role: 'Member'});
		setMemberName('');
		setMembers(updatedMembers);
	}

	async function goBack() {
		if (step == 0) return onFinish();
		setStep(step - 1);
	}

	async function goNext() {
		if (step == 4) {
			await handleGroupSubmit({
				name: groupName,
				notificationTime: `${hour}:${min}`,
				users: members
			});
			onFinish();
			return;
		}
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
		4: '60',
	};

	const Nommers = [
		<ShortNerdyBommer key={"Short nerdy gommer"}  />,
		<ShortPommer key={"Short pommer"} />,
		<CuriousYommer key="Curious yommer" />,
		<NerdyGommer key={"Nerdy gommer"} />
	]

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

					<div className={`${styles.stepInner} ${styles.step0}`}>
						<div className={styles.container}>
							<div className={styles.nommer}>
								<GroupName />
							</div>

							<div className={styles.label}>Name your Group</div>
							<div>
								<TextField placeholder={"Group name"} value={groupName} onChange={(e: any) => {setGroupName(e.target.value)}} />
							</div>
							
						</div>
					</div>

					{/* Add Members */}
					<div className={`${styles.stepInner} ${styles.step2}`}>
							<div style={{
								display: 'flex',
								gap: '0.5rem'
							}}>
								{Nommers?.slice(0, (members?.length - 2) + 1 <= 4 ? members?.length : 4)}
							</div>
							<h1>Add Members</h1>
							<p>Invite members below or share the invite link</p>
							<div className={`${styles.horWrapper}`} style={{paddingTop: '1rem'}}>
								<TextField placeholder={'example@example.com'} value={memberName} onChange={e=>setMemberName(e.target.value)} />
								<button className={`${styles.sendButton}`} onClick={handleAddMember}>
									<FiSend />
								</button>
							</div>

							<h2>Members</h2>
							<div className={styles.members}>
								{members.map((member) => (
									<div className={`${styles.memberInfo} ${styles.horWrapper}`} key={member.key}>
										<p style={{textAlign:'left', flexGrow: 1}}>{member.email}</p>
										<p style={{textAlign: 'center'}}>{member.role}</p>
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

					{/* SetMeetup */}
					<div className={`${styles.stepInner} ${styles.step0}`}>
						<h1>Set a meetup area</h1>
						<p>We’ll suggest restaurants that are in your group’s area</p>

						<h2>Enter Address</h2>
						<div className={`${styles.horWrapper}`}>
							<TextField
								placeholder={'ex. your office area'}
								value={address}
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
								<Map defaultCenter={markerLocation} center={markerLocation} defaultZoom={13} gestureHandling={'greedy'} disableDefaultUI />
								<Marker position={markerLocation} />
							</div>
						</APIProvider>

						<p className={`${styles.mapText}`}>Pinch and drag to adjust the location and radius</p>

						<div className={`${styles.capsuleWrapper}`}>
							<Walking />
							<p className={`${styles.distanceText}`}>{walkingDistance}m</p>
						</div>
					</div>

					{/* SetReminders */}
					<div className={`${styles.stepInner} ${styles.step0}`}>
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
								<input className={`${styles.timeInput}`} value={hour} onChange={e=>setHour(e.target.value)} />
								<p className={`${styles.timeSubtext}`}>HOUR</p>
							</div>
							<p className={`${styles.timeBigText}`}>:</p>
							<div className={`${styles.verWrapper}`}>
								<input className={`${styles.timeInput}`} value={min} onChange={e=>setMin(e.target.value)} />
								<p className={`${styles.timeSubtext}`}>MIN</p>
							</div>
						</div>
					</div>

					{/* GroupCreated */}
					<div className={`${styles.stepInner} ${styles.stepFinal}`}>
						<div className={`${styles.container}`}>
							<div className={styles.nommer}>
								<GroupCreatedDrawing />
							</div>
							<h1 className={styles.label}>{groupName}</h1>
							<p>Created!</p>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.control}>
				<Button onClick={goNext} disabled={
					(step == 0 && groupName == "") || 
					(step == 1 && members.length < 2) ||
					(step == 2 && address == "")}
				>
					{step == totalSteps - 1 ? 'Submit' : step == 2 ? 'Confirm' : 'Next'}
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
