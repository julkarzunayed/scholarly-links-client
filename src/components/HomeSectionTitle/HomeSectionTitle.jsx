import React from 'react';

const HomeSectionTitle = ({
    text1,
    text2,
    paragraph,
    paragraphColor,
    color,
    textSize,
    mb,
    mt
}) => {
    return (
        <div className={`${mb ? mb : 'mb-6'} ${mt ? mt : 'mt-9'}`}>
            <h2 className={`${textSize ? textSize : 'text-3xl'} font-bold  ${paragraph ? "mb-2" : ''}  ${color ? color : 'text-base-content'}`}>
                <span className="">{text1}</span>
                <span className="">{text2}</span>
            </h2>
            <p className={`${paragraphColor ? paragraphColor : 'text-gray-500'} italic font-semibold text-lg`}>
                {paragraph}
            </p>
        </div>
    );
};

export default HomeSectionTitle;