import React from 'react';
//   FeaturedAlumniSpotlights
//   alumniSpotlights
import graduate01 from "../../assets/graduates/graduate_student_male.jpg";
import graduate02 from "../../assets/graduates/graduate_student_male_01.jpg";
import graduate03 from "../../assets/graduates/graduate_student_male_02.jpg";
import graduateGirl from "../../assets/graduates/happy-student-with-graduation-hat-diploma-grey.jpg";
import background from "../../assets/graduates/graduate_students_many.jpg"



const alumniSpotlights = [
    {
        "id": "1",
        "name": "Sarah Chen",
        "university": "MIT",
        "field_of_study": "Computer Science",
        "scholarship_name": "Tech Innovators Scholarship",
        "quote": "This platform made finding the perfect scholarship so easy. It changed my life!",
        "photo": graduate01
    },
    {
        "id": "2",
        "name": "Alex Rodriguez",
        "university": "Stanford University",
        "field_of_study": "Mechanical Engineering",
        "scholarship_name": "Stanford Merit Award",
        "quote": "I found a scholarship I didn't even know existed. It's an invaluable resource for students.",
        "photo": graduate02
    },
    {
        "id": "3",
        "name": "Chloe Davis",
        "university": "University of Cambridge",
        "field_of_study": "Literature",
        "scholarship_name": "Cambridge Global Excellence Scholarship",
        "quote": "The guidance and resources provided here were key to my successful application. Thank you!",
        "photo": graduate03
    },
    {
        "id": "4",
        "name": "Omar Khan",
        "university": "University of Toronto",
        "field_of_study": "Public Policy",
        "scholarship_name": "Toronto Scholars Program",
        "quote": "Without this website, my dream of studying abroad would not have been possible. Absolutely fantastic!",
        "photo": graduateGirl
    },
    {
        "id": "5",
        "name": "Isabella Rossi",
        "university": "ETH Zurich",
        "field_of_study": "Robotics",
        "scholarship_name": "ETH Zurich Excellence Scholarship",
        "quote": "The platform is incredibly user-friendly and helped me filter down to scholarships that truly matched my profile.",
        "photo": "https://i.ibb.co.com/qMzbKzQB/single-parson-pic-02.jpg"
    },
    {
        "id": "6",
        "name": "Michael Brown",
        "university": "University of Sydney",
        "field_of_study": "Medicine",
        "scholarship_name": "Sydney Global Scholarship",
        "quote": "A single place for all my scholarship needs. It saved me countless hours of searching.",
        "photo": "https://i.ibb.co.com/93bnq2tn/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-cro.jpg"
    },
    {
        "id": "7",
        "name": "Layla Ahmed",
        "university": "King's College London",
        "field_of_study": "Law",
        "scholarship_name": "King's College Leadership Award",
        "quote": "The application tips were so helpful. I felt prepared and confident throughout the process.",
        "photo": "https://i.ibb.co.com/5X7RbZSg/ai-generated-a-woman-in-a-doctor-s-coat-and-glasses-photo.jpg"
    },
    {
        "id": "8",
        "name": "Jason Lee",
        "university": "UC Berkeley",
        "field_of_study": "Data Science",
        "scholarship_name": "Berkeley Chancellor's Scholarship",
        "quote": "Finding this platform was the turning point in my academic career. Highly recommended!",
        "photo": "https://placehold.co/100x100/3CB371/FFFFFF?text=JL"
    },
    {
        "id": "9",
        "name": "Maria Garcia",
        "university": "New York University",
        "field_of_study": "Film Studies",
        "scholarship_name": "NYU Global Scholars Program",
        "quote": "I am so grateful for the opportunity this platform provided. It's a game-changer for students.",
        "photo": "https://i.ibb.co.com/HDkB810W/banner-image-2-1.jpg"
    },
    {
        "id": "10",
        "name": "Leo Suzuki",
        "university": "Kyoto University",
        "field_of_study": "Environmental Science",
        "scholarship_name": "Kyoto University International Scholarship",
        "quote": "The application process was streamlined and the support team was always ready to help. Fantastic service!",
        "photo": "https://placehold.co/100x100/87CEEB/FFFFFF?text=LS"
    },
    {
        "id": "11",
        "name": "Olivia White",
        "university": "University of Melbourne",
        "field_of_study": "Art History",
        "scholarship_name": "Melbourne Future Leaders Award",
        "quote": "A very intuitive platform with a great selection of scholarships. It made a huge difference.",
        "photo": "https://i.ibb.co.com/R4bhtdx3/ai-generated-a-woman-in-a-doctor-s-coat-and-glasses-photo.jpg"
    },
    {
        "id": "12",
        "name": "Samir Hassan",
        "university": "Carnegie Mellon University",
        "field_of_study": "Business Management",
        "scholarship_name": "CMU Innovators Scholarship",
        "quote": "I was overwhelmed by the scholarship search until I found this website. It simplified everything!",
        "photo": "https://i.ibb.co.com/Qvg4xttN/ai-student-1.png"
    },
    {
        "id": "13",
        "name": "Elena Petrova",
        "university": "Heidelberg University",
        "field_of_study": "Chemistry",
        "scholarship_name": "Heidelberg Science Excellence Scholarship",
        "quote": "The detailed scholarship information was so helpful. It saved me a lot of time.",
        "photo": "https://placehold.co/100x100/C0C0C0/000000?text=EP"
    },
    {
        "id": "14",
        "name": "Chris Jones",
        "university": "University of British Columbia",
        "field_of_study": "Architecture",
        "scholarship_name": "UBC Global Talent Scholarship",
        "quote": "The platform connected me with opportunities I wouldn't have found otherwise. Truly a lifesaver.",
        "photo": "https://i.ibb.co.com/XfRzjTXz/ai-student-3.png"
    },
    {
        "id": "15",
        "name": "Priya Sharma",
        "university": "Columbia University",
        "field_of_study": "Journalism",
        "scholarship_name": "Columbia School of Journalism Award",
        "quote": "Navigating the world of scholarships felt impossible until I found this site. I am now at my dream school!",
        "photo": "https://placehold.co/100x100/A0522D/FFFFFF?text=PS"
    }
];

const AlumniSpotlights = () => {
    return (
        <div className='min-h-screen bg-base-200 py-14 px-2 md:px-3 bg-cover bg-center bg-fixed'
            style={{
                backgroundImage: `linear-gradient(to bottom, #00336650, #00336630), url(${background}) `
            }}
        >
            <div className="max-w-[1536px] mx-auto">
                <div className="bg-gradient-to-r from-primary from-60%  to-teal-500 to-90% p-6 mb-5 rounded">
                    <h2 className="font-bold text-4xl">
                        <span className='text-white'>
                            Our Featured Alumni
                        </span>
                        {' '}
                        <span className="text-accent">
                            Spotlights
                        </span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        alumniSpotlights?.map(story =>

                            <div key={story.id} className="card bg-base-100/90 shadow-lg overflow-hidden group rounded-3xl ">
                                <div className="avatar w-full transition-transform transform group-hover:scale-110">
                                    <div className="w-full ">
                                        <img
                                            src={story.photo}
                                            alt={`${story.name}'s photo`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex p-6 flex-col items-center text-center">
                                    {/* Photo with a colored border from your color scheme */}

                                    {/* <div className="h- overflow-hidden border-4 border-[#FF4500]">
                                                <img
                                                    src={story.photo}
                                                    alt={`${story.name}'s photo`}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div> */}

                                    {/* Quote */}
                                    <p className="text-base italic text-base-content/80 font-medium leading-relaxed">
                                        "{story.quote}"
                                    </p>

                                    {/* Alumni Details */}
                                    <div className="mt-4">
                                        <h3 className="text-lg font-bold text-base-content">
                                            {story.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {story.university} · {story.field_of_study}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Recipient of the: <span className="font-semibold">{story.scholarship_name}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>


                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AlumniSpotlights;