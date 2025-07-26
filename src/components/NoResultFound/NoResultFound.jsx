import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { easeInOut, motion } from "motion/react"

const NoResultFound = () => {
    motion
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <motion.div
                    animate={{ rotate: '360deg', }}
                    transition={{
                        duration: 3.5,
                        ease: easeInOut,
                        repeat: Infinity
                    }}
                    className=" h-20 w-20 rounded-full">
                    <motion.div
                        className='text-green-600 w-fit'
                        animate={{ rotate: '-360deg', }}
                        transition={{
                            duration: 3.5,
                            ease: easeInOut,
                            repeat: Infinity,
                        }}
                    >
                        <BsSearch size={50} />
                    </motion.div>

                </motion.div>

                <span className='text-xl'>
                    No Result found
                </span>
            </div>
        </div>
    );
};

export default NoResultFound;