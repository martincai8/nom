"use client"

import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css'
import ZoomingNommers from '@/drawings/ZoomingNommers';
import Button from '@/components/Button/Button';
import Countdown from '@/components/Countdown/Countdown';
import { useEffect, useState } from 'react';
import RestaurantCard, { Visit } from '@/components/RestaurantCard/RestaurantCard';
import NerdyBommer from '@/drawings/NerdyBommer';
import HappyNommers from '@/drawings/HappyNommers';
import DancingPommer from '@/drawings/DancingPommer';
import Image from 'next/image';
import { useAuth } from '@/utility/Auth';
import { getVisit, voteChoice } from '@/utility/firebase';

const BigNo = () => (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.15152 6.95157C7.62015 6.48294 8.37995 6.48294 8.84858 6.95157L15.2 13.303L21.5515 6.95157C22.0202 6.48294 22.7799 6.48294 23.2486 6.95157C23.7172 7.4202 23.7172 8.18 23.2486 8.64863L16.8971 15.0001L23.2486 21.3516C23.7172 21.8202 23.7172 22.58 23.2486 23.0486C22.7799 23.5173 22.0202 23.5173 21.5515 23.0486L15.2 16.6972L8.84858 23.0486C8.37995 23.5173 7.62015 23.5173 7.15152 23.0486C6.68289 22.58 6.68289 21.8202 7.15152 21.3516L13.503 15.0001L7.15152 8.64863C6.68289 8.18 6.68289 7.4202 7.15152 6.95157Z" fill="#F23F3A"/>
</svg>)
const MicroscopicYes = () => (<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.1973 6.90322C25.6926 7.34352 25.7372 8.10201 25.2969 8.59735L12.4969 22.9973C12.2692 23.2535 11.9428 23.4001 11.6 23.4001C11.2572 23.4001 10.9308 23.2535 10.7031 22.9973L4.30312 15.7973C3.86282 15.302 3.90744 14.5435 4.40278 14.1032C4.89812 13.6629 5.6566 13.7075 6.0969 14.2029L11.6 20.3939L23.5031 7.00287C23.9434 6.50753 24.7019 6.46292 25.1973 6.90322Z" fill="white"/>
</svg>)
const YellowCheck = () => (<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 4.3C7.52355 4.3 4.3 7.52355 4.3 11.5C4.3 15.4764 7.52355 18.7 11.5 18.7C15.4764 18.7 18.7 15.4764 18.7 11.5C18.7 7.52355 15.4764 4.3 11.5 4.3ZM2.5 11.5C2.5 6.52944 6.52944 2.5 11.5 2.5C16.4706 2.5 20.5 6.52944 20.5 11.5C20.5 16.4706 16.4706 20.5 11.5 20.5C6.52944 20.5 2.5 16.4706 2.5 11.5ZM15.6979 8.57733C16.0694 8.90756 16.1029 9.47642 15.7727 9.84793L10.9727 15.2479C10.8019 15.4401 10.5571 15.55 10.3 15.55C10.0429 15.55 9.79812 15.4401 9.62733 15.2479L7.22733 12.5479C6.89711 12.1764 6.93057 11.6076 7.30207 11.2773C7.67358 10.9471 8.24244 10.9806 8.57267 11.3521L10.3 13.2953L14.4273 8.65207C14.7576 8.28057 15.3264 8.24711 15.6979 8.57733Z" fill="#38A169"/>
</svg>)
const Clock = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 6C12.5523 6 13 6.44772 13 7V11.5858L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V7C11 6.44772 11.4477 6 12 6Z" fill="black"/>
</svg>)
const Person = () =>(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4ZM4 8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8C16 11.3137 13.3137 14 10 14C6.68629 14 4 11.3137 4 8ZM16.8284 3.75736C17.219 3.36683 17.8521 3.36683 18.2426 3.75736C20.5858 6.1005 20.5858 9.8995 18.2426 12.2426C17.8521 12.6332 17.219 12.6332 16.8284 12.2426C16.4379 11.8521 16.4379 11.219 16.8284 10.8284C18.3905 9.26633 18.3905 6.73367 16.8284 5.17157C16.4379 4.78105 16.4379 4.14788 16.8284 3.75736ZM17.5299 16.7575C17.6638 16.2217 18.2067 15.8959 18.7425 16.0299C20.0705 16.3618 20.911 17.2109 21.3944 18.1778C21.8622 19.1133 22 20.1571 22 21C22 21.5523 21.5523 22 21 22C20.4477 22 20 21.5523 20 21C20 20.3429 19.8878 19.6367 19.6056 19.0722C19.339 18.5391 18.9295 18.1382 18.2575 17.9701C17.7217 17.8362 17.3959 17.2933 17.5299 16.7575ZM6.5 18C5.24054 18 4 19.2135 4 21C4 21.5523 3.55228 22 3 22C2.44772 22 2 21.5523 2 21C2 18.3682 3.89347 16 6.5 16H13.5C16.1065 16 18 18.3682 18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 19.2135 14.7595 18 13.5 18H6.5Z" fill="black"/>
</svg>)
const Pencil = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 11.5C9.55228 11.5 10 11.0523 10 10.5C10 9.94772 9.55228 9.5 9 9.5C8.44772 9.5 8 9.94772 8 10.5C8 11.0523 8.44772 11.5 9 11.5Z" fill="black"/>
<path d="M11 10.5C11 9.94772 11.4477 9.5 12 9.5H15C15.5523 9.5 16 9.94772 16 10.5C16 11.0523 15.5523 11.5 15 11.5H12C11.4477 11.5 11 11.0523 11 10.5Z" fill="black"/>
<path d="M12 12.5C11.4477 12.5 11 12.9477 11 13.5C11 14.0523 11.4477 14.5 12 14.5H15C15.5523 14.5 16 14.0523 16 13.5C16 12.9477 15.5523 12.5 15 12.5H12Z" fill="black"/>
<path d="M12 15.5C11.4477 15.5 11 15.9477 11 16.5C11 17.0523 11.4477 17.5 12 17.5H15C15.5523 17.5 16 17.0523 16 16.5C16 15.9477 15.5523 15.5 15 15.5H12Z" fill="black"/>
<path d="M10 13.5C10 14.0523 9.55228 14.5 9 14.5C8.44772 14.5 8 14.0523 8 13.5C8 12.9477 8.44772 12.5 9 12.5C9.55228 12.5 10 12.9477 10 13.5Z" fill="black"/>
<path d="M9 17.5C9.55228 17.5 10 17.0523 10 16.5C10 15.9477 9.55228 15.5 9 15.5C8.44772 15.5 8 15.9477 8 16.5C8 17.0523 8.44772 17.5 9 17.5Z" fill="black"/>
<path d="M9 2C8.44772 2 8 2.44772 8 3H6C4.89543 3 4 3.89543 4 5V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V5C20 3.89543 19.1046 3 18 3H16C16 2.44772 15.5523 2 15 2H9ZM16 5H18V20H6V5H8V6C8 6.55228 8.44772 7 9 7H15C15.5523 7 16 6.55228 16 6V5ZM10 5V4H14V5H10Z" fill="black"/>
</svg>)
const ThumbsDown = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5641 3.31549C20.3205 3.10641 20.0087 2.99404 19.6877 2.99972L19.67 2.99987H18V11.9999H19.67L19.6877 12C20.0087 12.0057 20.3205 11.8933 20.5641 11.6843C20.793 11.4878 20.9466 11.2187 21 10.923V4.07674C20.9466 3.78102 20.793 3.51197 20.5641 3.31549ZM16 12.7877L12.3922 20.9053C12.0908 20.8091 11.8137 20.6419 11.5858 20.4141C11.2107 20.039 11 19.5303 11 18.9999V14.9999C11 14.4476 10.5523 13.9999 10 13.9999H4.34003L4.32871 13.9999C4.18375 14.0016 4.04017 13.9717 3.90792 13.9123C3.77567 13.853 3.6579 13.7656 3.56278 13.6562C3.46766 13.5468 3.39745 13.418 3.35704 13.2788C3.31667 13.1398 3.30698 12.9936 3.32862 12.8505C3.32859 12.8507 3.32865 12.8503 3.32862 12.8505L4.70873 3.84981C4.74489 3.61136 4.86601 3.39401 5.04977 3.23781C5.23354 3.08161 5.46756 2.99708 5.70873 2.99981L16 2.99987V12.7877ZM19.662 0.999873C20.4696 0.98794 21.2538 1.2717 21.8668 1.7979C22.4822 2.32618 22.8823 3.06206 22.991 3.86583C22.997 3.91026 23 3.95504 23 3.99987V10.9999C23 11.0447 22.997 11.0895 22.991 11.1339C22.8823 11.9377 22.4822 12.6736 21.8668 13.2019C21.2538 13.728 20.4696 14.0118 19.662 13.9999H17.6499L13.9138 22.406C13.7533 22.7671 13.3952 22.9999 13 22.9999C11.9392 22.9999 10.9217 22.5784 10.1716 21.8283C9.42146 21.0782 9.00003 20.0607 9.00003 18.9999V15.9999H4.34514C3.91239 16.0039 3.48387 15.9142 3.089 15.737C2.69224 15.5589 2.33893 15.2967 2.05357 14.9685C1.7682 14.6404 1.5576 14.2541 1.43634 13.8364C1.31509 13.4188 1.28609 12.9798 1.35135 12.5498L2.73133 3.54994C2.73129 3.55024 2.73138 3.54964 2.73133 3.54994C2.83999 2.83493 3.20342 2.18233 3.75448 1.71393C4.30419 1.24667 5.00382 0.993214 5.72511 0.999873H19.662Z" fill="#F23F3A"/>
</svg>)
const ThumbsUp = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0862 1.59386C10.2467 1.23273 10.6048 1 11 1C12.0609 1 13.0783 1.42143 13.8284 2.17157C14.5786 2.92172 15 3.93913 15 5V8H19.6549C20.0876 7.996 20.5162 8.08567 20.911 8.26289C21.3078 8.44096 21.6611 8.70317 21.9465 9.03134C22.2318 9.35951 22.4424 9.7458 22.5637 10.1634C22.6849 10.5811 22.7139 11.0201 22.6487 11.4501L21.2687 20.4499C21.2687 20.4502 21.2687 20.4497 21.2687 20.4499C21.1601 21.165 20.7966 21.8175 20.2456 22.2859C19.6958 22.7532 18.9961 23.0067 18.2748 23H4C3.20435 23 2.44129 22.6839 1.87868 22.1213C1.31607 21.5587 1 20.7957 1 20V13C1 12.2044 1.31607 11.4413 1.87868 10.8787C2.44129 10.3161 3.20435 10 4 10H6.35013L10.0862 1.59386ZM8 11.2122L11.6078 3.0946C11.9092 3.19075 12.1864 3.35794 12.4142 3.58579C12.7893 3.96086 13 4.46957 13 5V9C13 9.55228 13.4477 10 14 10H19.66L19.6713 9.99994C19.8163 9.99829 19.9599 10.0282 20.0921 10.0875C20.2244 10.1469 20.3421 10.2343 20.4373 10.3437C20.5324 10.4531 20.6026 10.5818 20.643 10.7211C20.6834 10.8601 20.6931 11.0063 20.6714 11.1495C20.6714 11.1497 20.6714 11.1494 20.6714 11.1495L19.2913 20.1501C19.2551 20.3885 19.134 20.6059 18.9503 20.7621C18.7665 20.9183 18.5325 21.0028 18.2913 21.0001L8 21V11.2122ZM6 21V12H4C3.73478 12 3.48043 12.1054 3.29289 12.2929C3.10536 12.4804 3 12.7348 3 13V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H6Z" fill="#F23F3A"/>
</svg>)
const DoubleThumbsUp = () => (<svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0862 4.59386C10.2467 4.23273 10.6048 4 11 4C12.0609 4 13.0783 4.42143 13.8284 5.17157C14.5786 5.92172 15 6.93913 15 8V11H19.6549C20.0876 10.996 20.5162 11.0857 20.911 11.2629C21.3078 11.441 21.6611 11.7032 21.9465 12.0313C22.2318 12.3595 22.4424 12.7458 22.5637 13.1634C22.6849 13.5811 22.7139 14.0201 22.6487 14.4501L21.2687 23.4499C21.2687 23.4502 21.2687 23.4497 21.2687 23.4499C21.1601 24.165 20.7966 24.8175 20.2456 25.2859C19.6958 25.7532 18.9961 26.0067 18.2748 26H4C3.20435 26 2.44129 25.6839 1.87868 25.1213C1.31607 24.5587 1 23.7957 1 23V16C1 15.2044 1.31607 14.4413 1.87868 13.8787C2.44129 13.3161 3.20435 13 4 13H6.35013L10.0862 4.59386ZM8 14.2122L11.6078 6.0946C11.9092 6.19075 12.1864 6.35794 12.4142 6.58579C12.7893 6.96086 13 7.46957 13 8V12C13 12.5523 13.4477 13 14 13H19.66L19.6713 12.9999C19.8163 12.9983 19.9599 13.0282 20.0921 13.0875C20.2244 13.1469 20.3421 13.2343 20.4373 13.3437C20.5324 13.4531 20.6026 13.5818 20.643 13.7211C20.6834 13.8601 20.6931 14.0063 20.6714 14.1495C20.6714 14.1494 20.6714 14.1497 20.6714 14.1495L19.2913 23.1501C19.2551 23.3885 19.134 23.6059 18.9503 23.7621C18.7665 23.9183 18.5325 24.0028 18.2913 24.0001L8 24V14.2122ZM6 24V15H4C3.73478 15 3.48043 15.1054 3.29289 15.2929C3.10536 15.4804 3 15.7348 3 16V23C3 23.2652 3.10536 23.5196 3.29289 23.7071C3.48043 23.8946 3.73478 24 4 24H6Z" fill="#F23F3A"/>
<path d="M18.0862 1.59386C18.2467 1.23273 18.6048 1 19 1C20.0608 1 21.0783 1.42143 21.8284 2.17157C22.5785 2.92172 23 3.93913 23 5V8H27.6549C28.0876 7.996 28.5161 8.08567 28.911 8.26289C29.3078 8.44096 29.6611 8.70317 29.9464 9.03134C30.2318 9.35951 30.4424 9.7458 30.5637 10.1634C30.6849 10.5811 30.7139 11.0201 30.6486 11.4501L29.2687 20.4499C29.16 21.165 28.7966 21.8175 28.2455 22.2859C27.6958 22.7532 22.7213 23.0067 22 23L22.5165 21.0001C22.7577 21.0028 26.7665 20.9183 26.9502 20.7621C27.134 20.6059 27.2551 20.3885 27.2913 20.1501L28.6714 11.1495C28.693 11.0063 28.6833 10.8601 28.643 10.7211C28.6025 10.5818 28.5323 10.4531 28.4372 10.3437C28.3421 10.2343 28.2243 10.1469 28.0921 10.0875C27.9598 10.0282 27.8162 9.99829 27.6713 9.99994L27.66 10H22C21.4477 10 21 9.55228 21 9V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.1863 3.35794 19.9092 3.19075 19.6078 3.0946L15.7594 10.1634L15.5 7C16.959 3.7172 16.6271 4.87666 18.0862 1.59386Z" fill="#F23F3A"/>
</svg>)
const Heart = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 3C15.045 3 13.965 3.63 13.2 4.5C12.435 5.37 12.03 5.88 12 6C11.97 5.88 11.58 5.37 10.8 4.5C10.02 3.63 9.045 3 7.5 3C5.052 3.129 3.069 4.9995 3 7.5C3 8.28 3.135 9.78 4.005 11.505C4.875 13.23 7.515 15.915 12 19.5C16.47 15.915 19.155 13.245 20.01 11.505C20.865 9.765 21 8.25 21 7.5C20.9295 4.965 18.987 3.1305 16.5 3Z" fill="#F23F3A"/>
</svg>);

const placeholder: Visit = {
    date: '',
    groupId: '',
    options: [
        {
            images: [
                'https://cdn.activifinder.com/media/blocks/images/Steves-Pok%C3%A9-1.large.webp',
                'https://lh3.googleusercontent.com/p/AF1QipMSrK8b9hsLxJTrnDG2c_3Za8vfWLIr6nq1q9Wn=s1360-w1360-h1020',
                'https://images.squarespace-cdn.com/content/v1/57058af18a65e2f19709cb0d/1562088259423-M8OZJKXK9X54KW08W7HK/Cafe+Medina+X+Pendulum+Magazine'
            ],
            name: 'Big way',
            phoneNumber: '8888888',
            priceLevel: 2,
            rating: 4.5,
            voteCount: 0
        },
        {
            images: [
                'https://cdn.activifinder.com/media/blocks/images/Steves-Pok%C3%A9-1.large.webp',
                'https://lh3.googleusercontent.com/p/AF1QipMSrK8b9hsLxJTrnDG2c_3Za8vfWLIr6nq1q9Wn=s1360-w1360-h1020',
                'https://images.squarespace-cdn.com/content/v1/57058af18a65e2f19709cb0d/1562088259423-M8OZJKXK9X54KW08W7HK/Cafe+Medina+X+Pendulum+Magazine'
            ],
            name: 'Jinya',
            phoneNumber: '8888888',
            priceLevel: 2,
            rating: 4.5,
            voteCount: 0
        },
        {
            images: [
                'https://cdn.activifinder.com/media/blocks/images/Steves-Pok%C3%A9-1.large.webp',
                'https://lh3.googleusercontent.com/p/AF1QipMSrK8b9hsLxJTrnDG2c_3Za8vfWLIr6nq1q9Wn=s1360-w1360-h1020',
                'https://images.squarespace-cdn.com/content/v1/57058af18a65e2f19709cb0d/1562088259423-M8OZJKXK9X54KW08W7HK/Cafe+Medina+X+Pendulum+Magazine'
            ],
            name: 'per se',
            phoneNumber: '8888888',
            priceLevel: 2,
            rating: 4.5,
            voteCount: 0
        }
    ],
    users: [
        '',
        ''
    ],
    status: 'openVote'
}

export default function MealPage() {

    const { user } = useAuth();

    const router = useRouter();
    const params = useParams();

    const [data, setData] = useState<any>();

    async function getVisitInfo() {
        const visitObj = await getVisit(params.visited_id as string);
        setData(visitObj);
    }

    useEffect(() => {
        getVisitInfo()
    }, [params])

    /**
     * 0: "Time to nom"
     * 1: option 1 voting
     * 2: option 2 voting
     * 3: option 3 voting
     * 4: final screen: openVote | confirmedChoice | confirmedBooking | "Post"
     *  */
    // set initial value to 4 based on status
    const [step, setStep] = useState<number>(0)

    function goNext() {
        if (step == 4) return;
        setStep(step + 1);
    }

    function onSkip() {
        // just goes back to the main alert page
        router.push('/alerts');
    }

    function onJoin() {
        goNext();
    }

    if (!params.visited_id) {
        return (
            <div>
                No meal specified!
            </div>
        )
    }

    async function onVote(vote: boolean) {
        await voteChoice(user.uid as string, params.visited_id as string, step - 1, vote, user.displayName as string);
        goNext();
    }

    const countdownUntil = data && `${(new Date(data.voteBy).toString()).substring(16,24)} Today`;

    return (
        <div className={styles.wrapper}>
            {step == 0 && (
                <div className={styles.center}>
                    <Countdown until={countdownUntil} />
                    <ZoomingNommers />
                    <div className={styles.text}>
                        <h1>
                            Time to <span style={{color: `var(--color-primary)`}}>nom!</span>
                        </h1>
                        <p>
                            Vote for your preferred restaurant!
                        </p>
                        <div className={styles.buttons}>
                            <Button variant="outlined" onClick={onSkip}>
                                Skip today
                            </Button>
                            <Button onClick={onJoin}>
                                Join meal
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {(step >= 1 && step <= 3) && (
                <div className={styles.tinder}>
                    <div className={styles.top}>
                        <Countdown until={countdownUntil} />
                        <div className={styles.options}>
                            Option {step}/3
                        </div>
                    </div>
                    <RestaurantCard data={data.options[step - 1]} />
                    <div className={styles.tray}>
                        <div className={styles.no} onClick={()=>onVote(false)}>
                            <BigNo />
                        </div>
                        <div className={styles.hellyeah} onClick={()=>onVote(true)}>
                            <MicroscopicYes />
                        </div>
                    </div>
                </div>
            )}
            {step == 4 && (
                <>
                    {/* openVote */}
                    {!data.status && (
                        <div className={styles.fixed}>
                            <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}><svg width="430" height="359" viewBox="0 0 430 359" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_118_218)">
                                <path d="M-63.9706 296.564C-87.734 239.011 -128.132 302.815 -161.471 296.564C-219.884 296.564 -208.066 218.078 -191.314 180.036C-173.119 138.72 -132.014 193.958 -85.734 183.352C-44.2363 173.842 -40.2154 193.631 12.8923 222.815C66 252 104.332 268.616 150.5 268.616C195.451 268.616 227.5 178.5 303.5 151C379.5 123.5 442.331 147.665 502.167 151C604.453 156.7 657.642 242.137 756.5 268.616C827.74 287.698 911.999 241.259 985.5 230.58C1059 219.9 1075.22 220 1193.5 180.036C1311.78 140.073 1318.28 204.638 1355.28 210C1409.7 217.887 1431.27 168.454 1446 220C1457.8 261.299 1379.11 328.148 1355.28 367.144C1341.28 390.056 1319.72 391.727 1295.35 393.616L1294.65 393.67C1267.22 395.798 1220.23 387.219 1193.5 393.67C1098.2 416.674 1021.41 458.086 928.529 427.411C880.925 411.688 827.823 360.498 782.591 338.959C749.226 323.071 689.96 347.171 653.5 338.959C557 333.038 563.938 276.099 502.167 281.5C469.103 284.391 410.762 272.338 379 281.5C338.32 293.234 325.542 319.46 285.454 333.038C229.7 351.922 169.637 365.411 111.373 346.775C53.1096 328.139 -40.2073 354.117 -63.9706 296.564Z" fill="#FDF4F2"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_118_218">
                                <rect width="430" height="359" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                            </div>
                            <Countdown until={countdownUntil} />
                            <NerdyBommer />
                            <h1>Your vote is in!</h1>
                            <p>Check back here once the time runs out to see where you{`'`}ll be eating today.</p>
                        </div>
                    )}
                    {/* confirmedChoice */}
                    {data.status == 1 && (
                        <div className={styles.fixed}>
                            <div style={{position: 'fixed', top: 0, left: 0,zIndex: -1}}>
                                <svg width="430" height="361" viewBox="0 0 430 361" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_118_380)">
                                <path d="M-63.9706 296.564C-87.734 239.011 -128.132 302.815 -161.471 296.564C-219.884 296.564 -208.066 218.078 -191.314 180.036C-173.119 138.72 -132.014 193.958 -85.734 183.352C-44.2363 173.842 -40.2154 193.631 12.8923 222.815C66 252 104.332 268.616 150.5 268.616C195.451 268.616 227.5 178.5 303.5 151C379.5 123.5 442.331 147.665 502.167 151C604.453 156.7 657.642 242.137 756.5 268.616C827.74 287.698 911.999 241.259 985.5 230.58C1059 219.9 1075.22 220 1193.5 180.036C1311.78 140.073 1318.28 204.638 1355.28 210C1409.7 217.887 1431.27 168.454 1446 220C1457.8 261.299 1379.11 328.148 1355.28 367.144C1341.28 390.056 1319.72 391.727 1295.35 393.616L1294.65 393.67C1267.22 395.798 1220.23 387.219 1193.5 393.67C1098.2 416.674 1021.41 458.086 928.529 427.411C880.925 411.688 827.823 360.498 782.591 338.959C749.226 323.071 689.96 347.171 653.5 338.959C557 333.038 563.938 276.099 502.167 281.5C469.103 284.391 410.762 272.338 379 281.5C338.32 293.234 325.542 319.46 285.454 333.038C229.7 351.922 169.637 365.411 111.373 346.775C53.1096 328.139 -40.2073 354.117 -63.9706 296.564Z" fill="#FDF4F2"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_118_380">
                                <rect width="430" height="361" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                            </div>
                            <Countdown>{`Time's up!`}</Countdown>
                            <HappyNommers />
                            <p>Woohoo! Your group will be nomming at:</p>
                            <h1>Tendon Kohaku</h1>
                        </div>
                    )}
                    {/* confirmedBooking */}
                    {data.status == 3 && (
                        <div className={styles.fixed}>
                            <div className={styles.note}>
                                <span><YellowCheck /></span>
                                Your reservation has been confirmed for: 
                            </div>
                            <div className={styles.info}>
                                <div style={{display:'flex',flexDirection:'column',gap: '0.3rem'}}>
                                    <h1>Tendon Kohaku</h1>
                                    <span style={{opacity: 0.7}}>(604) 416 3936</span>
                                </div>
                                <div className={styles.squareImg}>
                                    <Image layout="fill" objectFit="cover" alt="ya" src="https://cdn.activifinder.com/media/blocks/images/Steves-Pok%C3%A9-1.large.webp" />
                                </div>
                            </div>
                            <div className={styles.booking}>
                                <h2>Booking Information</h2>
                                <div>
                                    <div>
                                        <Clock /> {data}
                                    </div>
                                    <div>
                                        <Person /> {data?.users?.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* postMeal */}
                    {data.status == 3 && (
                        <div className={styles.fixed}>
                            <div style={{position: 'fixed', top: 0, left: 0,zIndex: -1}}>
                                <svg width="430" height="435" viewBox="0 0 430 435" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_118_332)">
                                <path d="M-579.971 296.562C-603.734 239.008 -644.132 302.813 -677.471 296.562C-735.884 296.562 -724.066 218.076 -707.314 180.034C-689.119 138.717 -648.014 193.956 -601.734 183.35C-560.236 173.84 -556.215 193.629 -503.108 222.813C-450 251.998 -411.668 268.614 -365.5 268.614C-320.549 268.614 -288.5 178.498 -212.5 150.998C-136.5 123.498 -73.6693 147.663 -13.8333 150.998C88.4534 156.698 141.642 242.134 240.5 268.614C311.74 287.696 395.999 241.257 469.5 230.577C543.001 219.898 559.221 219.998 677.5 180.034C795.779 140.071 802.283 204.636 839.28 209.998C893.698 217.884 915.273 168.452 930 219.998C941.8 261.296 863.111 328.146 839.28 367.141C825.278 390.054 803.725 391.724 779.351 393.613L778.648 393.668C751.223 395.796 704.227 387.216 677.5 393.668C582.197 416.672 505.406 458.084 412.529 427.409C364.925 411.686 311.823 360.496 266.591 338.957C233.226 323.069 173.96 347.168 137.5 338.957C41 333.036 47.9385 276.097 -13.8333 281.498C-46.8974 284.388 -105.238 272.335 -137 281.498C-177.68 293.232 -190.458 319.458 -230.546 333.036C-286.3 351.92 -346.363 365.409 -404.627 346.773C-462.89 328.136 -556.207 354.115 -579.971 296.562Z" fill="#FDF4F2"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_118_332">
                                <rect width="430" height="435" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                            </div>
                            <div style={{width: '100%', display: 'flex', flexDirection: 'column',alignItems: 'center',gap:'0.5rem'}}>
                                <p>How was your meal at</p>
                                <h1>Tendon Kohaku</h1>
                            </div>
                            <DancingPommer />
                            <div className={styles.bot}>
                                <div className={styles.bigButtons}>
                                    <div className={styles.thumbsDown}>
                                        <ThumbsDown />
                                    </div>
                                    <div className={styles.thumbsUp}>
                                        <ThumbsUp />
                                    </div>
                                    <div className={styles.thumbsToTheSky}>
                                        <DoubleThumbsUp />
                                    </div>
                                </div>
                                <div className={styles.button}>
                                    <Heart /> Add to favourites
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}