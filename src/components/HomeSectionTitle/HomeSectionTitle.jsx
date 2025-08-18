import React from 'react';

const HomeSectionTitle = ({
    text1,
    text2,
    color,
    textSize,
    mb,
    mt
}) => {
    return (
        <div>
            <h2 className={`${textSize ? textSize : 'text-3xl'} font-bold  ${mb ? mb : 'mb-6'} ${mt ? mt : 'mt-9'}  ${color ? color : 'text-accent'}`}>
                <span className="">{text1}</span>
                <span className="text-secondary">{text2}</span>
            </h2>
        </div>
    );
};

export default HomeSectionTitle;