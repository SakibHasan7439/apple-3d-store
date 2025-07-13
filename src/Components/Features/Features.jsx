import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { animateWithGsap } from '../../utils/Animations/Animation';
import {explore1Img, explore2Img, exploreVideo} from '../../utils'

const Features = () => {
    const videoRef = useRef();
    useGSAP(()=>{
        animateWithGsap('#features-title', { y: 0, opacity: 1 }),
        animateWithGsap('.g_grow', {
            scale: 1,
            ease: 'power1',
            opacity: 1},
            {scrub: 5.5}
        ),
        animateWithGsap('.g_text', {
            y: 0, 
            opacity: 1,
            ease: 'power2.inOut',
            duration: 1
        })
    }, []);
    return (
        <section className='h-full common-padding bg-[#333333] relative overflow-hidden'>
            <div className='screen-max-width'>
                <div className='w-full mb-12'>
                    <h1 id='features-title' className='section-heading'>Explore the full story.</h1>
                </div>
                <div className="flex flex-col items-center justify-center overflow-hidden">
                    <div className='mt-32 mb-24 pl-24'>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>
                            iPhone
                        </h2>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>
                            Forged in Titanium
                        </h2>
                    </div>

                    {/* animate video here */}
                    <div className="flex-center flex-col sm:mx-10">
                        <div className='relative h-[50vh] w-full flex items-center'>
                            <video playsInline autoPlay muted preload='none' className='w-full h-full object-cover object-center' id='explore-video' ref={videoRef}>
                                <source src={exploreVideo} type='video/mp4' />
                            </video>
                        </div>

                        <div className='flex flex-col w-full relative'>
                            <div className="feature-video-container">
                                <div className="overflow-hidden flex-1 h-[50vh]">
                                    <img src={explore1Img} alt="titanium"       className='feature-video g_grow'
                                    />
                                </div>
                                <div className="overflow-hidden flex-1 h-[50vh]">
                                    <img src={explore2Img} alt="titanium 2"       className='feature-video g_grow'
                                    />
                                </div>
                            </div>

                            {/* bottom text animation */}
                            <div className="feature-text-container">
                                <div className="flex-1 flex-center">
                                    <p className='feature-text g_text'>
                                        iPhone 15 pro is {" "}
                                        <span className='text-white'>
                                            the first iPhone to feature an aerospace-grade titanium design
                                        </span>
                                        using the same alloy that spacecrafts use for mission Mars.
                                    </p>
                                </div>
                                <div className="flex-1 flex-center">
                                    <p className='feature-text g_text'>
                                        iPhone 15 pro is {" "}
                                        <span className='text-white'>
                                            the first iPhone to feature an aerospace-grade titanium design
                                        </span>
                                        using the same alloy that spacecrafts use for mission Mars.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;