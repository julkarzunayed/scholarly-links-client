import React from 'react';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaRegStar, FaStar } from 'react-icons/fa6';

const StarRatings = ({ rating, maxStars = 5, starColor = "text-yellow-500", size = "text-xl" }) => {
    // <FaStar />
    // <FaStarHalfAlt />
    // <FaRegStar />

    const normalizedRating = Math.max(0, Math.min(maxStars, parseFloat(rating) || 0));

    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
        // console.log(i, normalizedRating)
        if (i <= normalizedRating) {

            stars.push(<FaStar key={i} className={`${starColor} ${size}`} />);
        } else if (i - 0.5 === normalizedRating) {

            stars.push(<FaStarHalfAlt key={i} className={`${starColor} ${size}`} />);
        }
        else {

            stars.push(<FaRegStar key={i} className={`${starColor} ${size}`} />);
        }
    }

    return (
        <div className="flex items-center">
            {stars}
            <span className={`ml-2 ${size} font-semibold text-gray-700`}>
                {normalizedRating.toFixed(1)}
            </span>
        </div>
    );

};

export default StarRatings;