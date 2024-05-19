import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './WelcomeCarousel.css'; 

const WelcomeCarousel = ({ onNext }: {onNext: () => void}) => {
    return (
        <div className="welcome-carousel">
            <Carousel showArrows={false} autoPlay={false} showThumbs={false} swipeable={true} showStatus={false}>
                <div>
                    <img src="/images/eatTogether.png" alt="Eat together" />
                    <h1>Eat together</h1>
                    <p>Get notified when your group wants to nom together.</p>
                </div>
                <div>
                    <img src="/images/getRecommendations.png" alt="Get recommendations" />
                    <h1>Get recommendations</h1>
                    <p>Based on your location, dietary restrictions, and group favourites. </p>
                </div>
                <div>
                    <img src="/images/secureSpot.png" alt="Secure a spot" />
                    <h1>Secure a spot</h1>
                    <p>No need to worry about booking a reservation - we do all that for you.</p>
                    <div className='button-row'>
                        <button onClick={onNext}>Get Started</button>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}

export default WelcomeCarousel;
