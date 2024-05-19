import { Carousel } from 'react-responsive-carousel';
import styles from './RestaurantCard.module.css';
import Image from 'next/image';

const Moon = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M7.54652 0.976481C7.72571 0.590615 8.27429 0.590615 8.45348 0.976481L10.1493 4.62813C10.2222 4.78501 10.3709 4.89309 10.5427 4.9139L14.5396 5.39832C14.962 5.44951 15.1315 5.97123 14.8199 6.2609L11.871 9.00217C11.7443 9.11994 11.6875 9.29481 11.7208 9.46455L12.4952 13.4156C12.577 13.8331 12.1332 14.1555 11.7614 13.9487L8.24309 11.9912C8.09194 11.9072 7.90806 11.9072 7.75691 11.9912L4.23856 13.9487C3.86677 14.1555 3.42297 13.8331 3.5048 13.4156L4.27922 9.46455C4.31249 9.29481 4.25567 9.11994 4.12898 9.00217L1.1801 6.2609C0.868498 5.97124 1.03802 5.44951 1.46037 5.39832L5.45734 4.9139C5.62905 4.89309 5.77781 4.78501 5.85067 4.62813L7.54652 0.976481Z'
			fill='#ECC94B'
		/>
	</svg>
);

export interface Option {
	images: string[];
	name: string;
	phoneNumber: string;
	priceLevel: number;
	rating: number;
	voteCount: number;
	description?: string;
}

export interface Visit {
	date: string;
	groupId: string;
	options: Option[];
	users: string[];
	status?: 'openVote' | 'confirmedChoice' | 'confirmedBooking' | 'postMeal';
}

export default function RestaurantCard({ data }: { data: Option }) {
	const renderPriceLevel = () => {
		const dollarSigns = Array(4).fill('$');
		return dollarSigns.map((sign, index) => (
			<span
				key={index}
				style={{
					fontWeight: index < data.priceLevel ? 'bold' : 'normal',
					color: index < data.priceLevel ? 'black' : 'grey',
				}}
			>
				{sign}
			</span>
		));
	};

	return (
		<div className={styles.card}>
			<div className={styles.images}>
				<Carousel showArrows={false} autoPlay={false} showThumbs={false} swipeable={true} showStatus={false} showIndicators={false}>
					{data?.images?.map((img, index) => (
						<div className={styles.image} key={index}>
							<Image objectFit='cover' layout='fill' alt={img} src={img} />
						</div>
					))}
				</Carousel>
			</div>
			<div className={styles.info}>
				<div className={styles.rating}>
					{data.rating}
					<Moon />
					<div className={styles.priceLevel}>{renderPriceLevel()}</div>
				</div>
				<div className={styles.name}>{data.name}</div>
				<div className={styles.description}>{data?.description}</div>
			</div>
		</div>
	);
}
