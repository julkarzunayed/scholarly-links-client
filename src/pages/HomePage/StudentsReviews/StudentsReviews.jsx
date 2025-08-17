import React from 'react';
import ReviewMarquee from '../../ScholarshipDetails/ReviewMarquee';
import HomeSectionTitle from '../../../components/HomeSectionTitle/HomeSectionTitle';




const reviewData = [
    {
        "comment": "The scholarship process was incredibly smooth and the support team was very responsive. The portal was easy to navigate and I found the application forms straightforward.",
        "institute_name": "Stanford University",
        "rating_date": "2025-08-15T10:20:00.000Z",
        "rating_points": 5,
        "scholarship_id": "9a31b4c5d6e7f8a9b0c1d2e3",
        "scholarship_name": "Palo Alto Future Leaders Scholarship",
        "user_email": "jane.doe@example.com",
        "user_name": "Jane Doe",
        "user_photo": "https://placehold.co/100x100/A2D2FF/000000?text=JD",
        "_id": "688b12c3d4e5f6a7b8c9d0e1"
    },
    {
        "comment": "An excellent platform with a wide variety of scholarships. The search filters made it easy to find scholarships that fit my specific criteria and major.",
        "institute_name": "University of Cambridge",
        "rating_date": "2025-08-10T09:15:30.000Z",
        "rating_points": 5,
        "scholarship_id": "7b5c8d2e1f4a9b0c3d6e7f8a",
        "scholarship_name": "Kings College Global Scholars Award",
        "user_email": "john.smith@example.com",
        "user_name": "John Smith",
        "user_photo": "https://placehold.co/100x100/F4A261/000000?text=JS",
        "_id": "688c23d4e5f6a7b8c9d0e2f3"
    },
    {
        "comment": "I appreciated the automated reminders for upcoming deadlines. It saved me a lot of time and helped me stay on track with my applications.",
        "institute_name": "National University of Singapore",
        "rating_date": "2025-08-08T16:45:10.000Z",
        "rating_points": 4,
        "scholarship_id": "8c4d6e9f0a1b2c3d4e5f6a7b",
        "scholarship_name": "NUS Innovation & Technology Scholarship",
        "user_email": "li.wei@example.com",
        "user_name": "Wei Li",
        "user_photo": "https://placehold.co/100x100/B8B8B8/000000?text=WL",
        "_id": "688d34e5f6a7b8c9d0e3f4a5"
    },
    {
        "comment": "The interface was a bit difficult to use on my mobile device, but the desktop version worked well. The scholarship opportunities were great.",
        "institute_name": "University of Toronto",
        "rating_date": "2025-08-01T11:00:22.000Z",
        "rating_points": 4,
        "scholarship_id": "9d0e1f2a3b4c5d6e7f8a9b0c",
        "scholarship_name": "Toronto Scholars Program",
        "user_email": "sara.kahn@example.com",
        "user_name": "Sara Kahn",
        "user_photo": "https://placehold.co/100x100/FFC94A/000000?text=SK",
        "_id": "688e45f6a7b8c9d0e4f5a6b7"
    },
    {
        "comment": "I was able to submit all my required documents easily, and the file upload feature was very reliable. A very helpful platform for scholarship applicants.",
        "institute_name": "University of Melbourne",
        "rating_date": "2025-07-28T09:35:55.000Z",
        "rating_points": 5,
        "scholarship_id": "1e2a3b4c5d6e7f8a9b0c1d2e",
        "scholarship_name": "Melbourne Research Excellence Award",
        "user_email": "david.chen@example.com",
        "user_name": "David Chen",
        "user_photo": "https://placehold.co/100x100/80B8B2/000000?text=DC",
        "_id": "688f56a7b8c9d0e5f6a7b8c9"
    },
    {
        "comment": "The information provided for each scholarship was very clear and comprehensive. It was easy to understand the eligibility requirements and deadlines.",
        "institute_name": "ETH Zurich",
        "rating_date": "2025-07-25T14:50:48.000Z",
        "rating_points": 5,
        "scholarship_id": "2f3a4b5c6d7e8f9a0b1c2d3e",
        "scholarship_name": "Zurich Global Talent Scholarship",
        "user_email": "maria.gomez@example.com",
        "user_name": "Maria Gomez",
        "user_photo": "https://placehold.co/100x100/9B5E6B/000000?text=MG",
        "_id": "689067b8c9d0e6f7a8b9cdef"
    }
]

const StudentsReviews = () => {
    return (
        <div className='max-w-[1536px] mx-auto'>
            <HomeSectionTitle
                text1={'Our Students'}
                text2={' Review'}
            />
            <ReviewMarquee
                reviews={reviewData}
            >
            </ReviewMarquee>
        </div>
    );
};

export default StudentsReviews;