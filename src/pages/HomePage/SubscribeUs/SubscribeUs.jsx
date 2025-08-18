import React from 'react';
import HomeSectionTitle from '../../../components/HomeSectionTitle/HomeSectionTitle';
import Swal from 'sweetalert2';

const SubscribeUs = () => {
    const handleSubscribe = e => {
        e.preventDefault();
        Swal.fire({
            title: "Thanks!",
            icon: "success",
            text: 'We will send you Latest updates',
            draggable: true
        });
        e.target.email.value = '';

    }
    return (
        <div className='max-w-[1536px] mx-auto flex flex-col lg:flex-row *:flex-1 gap-5 sm:gap-6 md:gap-10 lg:gap-5 items-center translate-y-[50%] rounded-4xl px-4 sm:px-6 md:px-8 lg:px-10 py-7 sm:py-9 md:py-12 lg:py-16 bg-accent bg-gradient-to- from-emerald-500/35   to-primary/35 '>
            <div className="">
                <h2 className="text-transparent text-center lg:text-left font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-sky-500 from-25%  to-teal-500 to-45%  inline-block bg-clip-text "
                    style={{
                        // textShadow: 'inset 4px 4px 6px #00000050,inset -4px -4px 5px #ffffff85'
                    }}
                >
                    Get Lates Updates about ScholarlyLink
                </h2>
                {/* <HomeSectionTitle
                    text1={'Get Lates Updates about'}
                    text2={' ScholarlyLink'}
                    color={'text-gray-200'}
                    mb={'mb-0'}
                    mt={'mt-0'}
                /> */}
            </div>
            <div className=" bg-gradient-to-r from-primary from-50%  to-teal-500 to-90% p-[3px] flex rounded-full w-full">
                <form
                    onSubmit={handleSubscribe}
                    className=' flex w-full rounded-full '>
                    <input
                        required
                        name='email'
                        type="text"
                        className='text-white focus:outline-0 flex-1 p-2 sm:p-3 bg-accent pl-3 sm:pl-6 md:pl-8 rounded-l-full'
                        placeholder='Your Email' />
                    <button
                        role='submit'
                        className=' md:text-lg py-2 px-2 sm:px-5 md:px-8 font-bold text-gray-50 active:text-secondary rounded-r-full hover:bg-white/20'>
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubscribeUs;