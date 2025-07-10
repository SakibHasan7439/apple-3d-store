import { useGSAP } from '@gsap/react';
import React from 'react';
import gsap from 'gsap';
import { rightImg, watchImg } from '../../utils';
import VideoCarousel from '../Video-Carousel/VideoCarousel';

const Highlight = () => {
    useGSAP(()=>{
        gsap.to('#title', {opacity:1, y:0});
        gsap.to('.link', {opacity:1, y:0, duration:1, stagger:0.25});
    }, []);
    return (
        <section id='highlight'
        className='w-screen overflow-hidden bg-[#101010] h-full common-padding'>
            <div className='screen-max-width '>
                <div className="w-full mb-12 md:flex items-center justify-between">
                    <h1 id="title" className='section-heading'>
                        Get the Highlight
                    </h1>
                    <div className='flex flex-wrap items-center gap-5'>
                        <p className='link'>watch the film
                            <img src={watchImg} alt="watch image" className='ml-2' />
                        </p>
                        <p className='link'>watch the event
                            <img src={rightImg} alt="right image" className='ml-2' />
                        </p>
                    </div>
                </div>

                {/* video carousel */}
                <VideoCarousel></VideoCarousel>
            </div>
        </section>
    );
};

export default Highlight;