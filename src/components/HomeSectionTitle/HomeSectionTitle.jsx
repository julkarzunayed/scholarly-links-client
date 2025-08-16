import React from 'react';

const HomeSectionTitle = ({
    text1,
    text2,
    color,
    mb,
    mt
}) => {
    return (
        <div>
            <h2 className={`text-5xl font-bold  ${mb? mb: 'mb-10'} ${mt? mt: 'mt-12'}  ${color? color: 'text-accent'}`}>
                <span className="">{text1}</span>
                <span className="text-secondary">{text2}</span>
            </h2>
        </div>
    );
};

export default HomeSectionTitle;