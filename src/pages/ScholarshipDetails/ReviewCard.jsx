import React from 'react';
import StarRatings from '../../components/StarRAtings/StarRatings';

const ReviewCard = ({ review }) => {
    // console.log(review)
    return (
        <div className=' p-4 m-7 rounded-2xl max-w-xs bg-base-100 box-shadow-hover box-shadow hover:shadow-accent'>
            <div className="flex  gap-4">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${review?.user_photo})`,
                        }}>

                    </div>
                </div>
                <div className="">
                    <h4 className="font-bold text-lg">
                        {review?.user_name}
                    </h4>
                    <p className="">
                        {review?.user_email}
                    </p>
                </div>
            </div>
            <div className="my-4 text-gray-500">
                <p className="italic font-montserrat ">
                    "{review?.comment}"
                </p>
            </div>
            <div className="flex justify-end">
                        <StarRatings rating={review?.rating_points}></StarRatings>
            </div>
        </div>
    );
};

export default ReviewCard; 