import React from 'react';

import Marquee from "react-fast-marquee";
import ReviewCard from './ReviewCard';

const ReviewMarquee = ({ reviews }) => {
    console.log(reviews)
    return (
        <div
            className=" ">
            <Marquee
                play={true}
                speed={60}
                gradient={false}
                pauseOnHover={true}
                className="overflow-hidden rounded-xl">
                {
                    reviews?.map((review) => (
                        <ReviewCard key={review?._id} review={review} />
                    ))
                }
            </Marquee>
        </div>
    );
};

export default ReviewMarquee;