import React from 'react';

// This is a conceptual component to show how a Featured Institutions grid could work.
// It uses a static array for the data, but you would likely fetch this from an API.

const featuredInstitutions = [
    {
        id: 1,
        name: "Stanford University",
        logo: "https://i.ibb.co.com/ZRBpx945/243744-logo.jpg",
        campus_imag: 'https://cdn.crowdriff.com/in-use/4b8b7c9d-bcd7-73b7-7a21-c84718c45515/750.jpg',
        link: "/institutions/stanford-university",
        description: "A leading private research university with a focus on innovation and technology."
    },
    {
        id: 2,
        name: "University of Cambridge",
        logo: "https://i.ibb.co.com/4wD2cDpS/166027-logo.jpg",
        campus_imag: 'https://www.appily.com/sites/default/files/styles/college_card/public/images/hero/college/243744_hero.jpg',
        link: "/institutions/university-of-cambridge",
        description: "One of the world's oldest and most prestigious universities, located in England."
    },
    {
        id: 3,
        name: "LSU",
        logo: "https://i.ibb.co.com/nqccgXV1/159391-logo.jpg",
        campus_imag: 'https://www.appily.com/sites/default/files/styles/college_card/public/images/hero/college/130794_hero.jpg',
        link: "/institutions/mit",
        description: "A world-renowned institution dedicated to advancing knowledge in science and technology."
    },
    {
        id: 3,
        name: "University of Texas",
        logo: "https://i.ibb.co.com/PZGWVwKv/228723-logo.jpg",
        campus_imag: 'https://www.appily.com/sites/default/files/styles/college_card/public/images/hero/college/228723_hero.jpg',
        link: "/institutions/mit",
        description: "A world-renowned institution dedicated to advancing knowledge in science and technology."
    },
];

const FeaturedInstitutions = () => {
    return (
        <section className=" py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1536px] mx-auto">
                {/* Section Header */}
                <div className="text- mb-12">
                    <h2 className="text-4xl font-extrabold text-base-content sm:text-5xl">
                        Featured Institutions
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 max-w-2xl ">
                        Explore scholarships from some of the world's most prestigious universities.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                    {featuredInstitutions.map((institution) => (

                        <div key={institution.id} href={institution.link} className=" bg-base-100 shadow-xl transition-transform transform hover:scale-105">
                            <figure
                                style={{
                                    backgroundImage: ` url(${institution?.campus_imag}) `,
                                    aspectRatio: 1 / 1
                                }}
                                className="mb-4 bg-center bg-cover relative">
                                <img
                                    src={institution.logo}
                                    alt={`${institution.name} logo`}
                                    className="mx-auto translate-y-[50%] absolute z-20 right-2 bottom-0 w-14 border border-secondary" />
                            </figure>
                            <div className=" p-4">
                                <h3 className=" text-2xl font-bold text-base-content">{institution.name}</h3>
                                <p className=" text-sm text-gray-500 mt-2">{institution.description}</p>
                            </div>
                        </div>


                    ))}
                </div>
            </div>

        </section>
    );
};

export default FeaturedInstitutions;

// aspect-ratio: 1 / 1
