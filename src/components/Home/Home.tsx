"use client"

import { useAuth } from '@/utility/Auth'
import Profile from '../Profile'
import styles from './Home.module.css'
import DabbingYommer from '@/drawings/DabbingYommer';
import TextField from '../TextField/TextField';
import Image from 'next/image';

const ArrowRight = () => (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.97224 3.56732C8.65592 3.88365 8.65592 4.39651 8.97224 4.71283L12.4495 8.19008H3.875C3.42765 8.19008 3.065 8.55273 3.065 9.00008C3.065 9.44743 3.42765 9.81008 3.875 9.81008H12.4495L8.97224 13.2873C8.65592 13.6036 8.65592 14.1165 8.97224 14.4328C9.28856 14.7492 9.80143 14.7492 10.1178 14.4328L14.9778 9.57283C15.2941 9.25651 15.2941 8.74365 14.9778 8.42732L10.1178 3.56732C9.80143 3.251 9.28856 3.251 8.97224 3.56732Z" fill="#F23F3A"/>
</svg>)
const MiniStar = () =>(<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.38465 1.13375C4.46977 0.950465 4.73034 0.950465 4.81546 1.13375L5.62099 2.86829C5.6556 2.94281 5.72626 2.99415 5.80782 3.00403L7.70639 3.23413C7.90701 3.25845 7.98753 3.50627 7.83952 3.64386L6.4388 4.94596C6.37862 5.0019 6.35163 5.08497 6.36743 5.1656L6.73528 7.04235C6.77415 7.24066 6.56335 7.39382 6.38675 7.29557L4.71553 6.36578C4.64373 6.32583 4.55639 6.32583 4.48459 6.36578L2.81337 7.29557C2.63677 7.39382 2.42596 7.24066 2.46484 7.04235L2.83268 5.1656C2.84849 5.08497 2.8215 5.0019 2.76132 4.94596L1.3606 3.64386C1.21259 3.50627 1.29311 3.25845 1.49373 3.23413L3.39229 3.00403C3.47386 2.99415 3.54452 2.94281 3.57912 2.86829L4.38465 1.13375Z" fill="#ECC94B"/>
</svg>)

const placeholder = [
    {
        imageUrl: 'https://cdn.activifinder.com/media/blocks/images/Steves-Pok%C3%A9-1.large.webp',
        rating: 4.8,
        price: '$$',
        name: `Steve's Poke Bar`
    },
    {
        imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipMSrK8b9hsLxJTrnDG2c_3Za8vfWLIr6nq1q9Wn=s1360-w1360-h1020',
        rating: 4.4,
        price: '$$',
        name: `OEB Breakfast Co.`
    },
    {
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/57058af18a65e2f19709cb0d/1562088259423-M8OZJKXK9X54KW08W7HK/Cafe+Medina+X+Pendulum+Magazine',
        rating: 4.5,
        price: '$$',
        name: `Cafe Medina`
    }
]

const placeholder_meals = [
    {
        date: 'Friday, May 3',
        restaurant: 'Big Way Hotpot Vancouver',
    },
    {
        date: 'Wednesday, May 1',
        restaurant: 'Big Way Hotpot Vancouver',
    },
    {
        date: 'Tuesday, April 30',
        restaurant: 'Big Way Hotpot Vancouver',
    },
    {
        date: 'Monday, April 29',
        restaurant: 'Minami',
    }
]

export default function Home() {
    const { user } = useAuth();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2>Welcome back,</h2>
                <div className={styles.dab}>
                    <h1>{user?.displayName}</h1>
                    <DabbingYommer />
                </div>
                <TextField placeholder={`Search for restaurants, cuisines, etc.`} value="" onChange={()=>{}} />
            </div>
            <div className={styles.discover}>
                <div className={`${styles.container} ${styles.discoverInner}`}>
                    <div className={styles.left}>
                        <h3>Discover new restaurants</h3>
                        <p>Tailored personally for you</p>
                    </div>
                    <div className={styles.seeAll}>
                        See all <ArrowRight />
                    </div>
                </div>
                <div className={styles.horizontal}>
                    {placeholder?.map((p) => (
                        <div key={p.name} className={styles.restoCard}>
                            <div className={styles.img}>
                                <Image objectFit="cover" objectPosition="50% 80%" layout="fill" src={p.imageUrl} alt={p.name} />
                            </div>
                            <div className={styles.rating}>
                                {p.rating} <MiniStar /> {p.price}
                            </div>
                            <div className={styles.restoName}>
                                {p.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h3>Your Meals</h3>
                    <div className={styles.meals}>
                        {placeholder_meals?.map((m) => (
                            <div className={styles.resto} key={m.restaurant}>
                                <div className={styles.date}>
                                    {m.date}
                                </div>
                                <div className={styles.name}>
                                    {m.restaurant}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.mealsMore}>
                        <div className={styles.seeAll}>
                            See all <ArrowRight />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}