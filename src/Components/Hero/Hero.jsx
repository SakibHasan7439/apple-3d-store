import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {heroVideo, smallHeroVideo} from '../../utils'
import { useEffect, useState } from 'react';
const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth > 700 ? heroVideo : smallHeroVideo);

    const handleVideoSrcSet = () =>{
        if(window.innerWidth > 700) {
            setVideoSrc(heroVideo)
        }else {
            setVideoSrc(smallHeroVideo);
        }
    };

    useEffect(() =>{
        window.addEventListener('resize', handleVideoSrcSet);

        return () =>{
            window.removeEventListener('resize', handleVideoSrcSet);
        }
    }, []);

    useGSAP(()=>{
        gsap.to("#hero", {
            opacity: 1, 
            delay: 2
        })

        gsap.to("#cta", {
            opacity: 1,
            y: -50,
            delay: 2
        })
    }, []);

    return (
        <section className='bg-black nav-height relative'>
            <div className='h-5/6 flex-center flex-col w-full'>
                <p id='hero' className='hero-title'>iPhone 16 Pro</p>
                <div className='md:w-10/12 w-9/12'>
                    <video className='pointer-events-none' muted playsInline={true} autoPlay key={videoSrc}>
                        <source src={videoSrc} type='video/mp4'/>
                    </video>
                </div>
            </div>
            <div id="cta"
            className='flex flex-col opacity-0 translate-y-20 items-center'>
                <a href="highlight" className='btn transition-all'>BUY</a>
                <p className='font-normal text-xl'>From $199/month or $999</p>
            </div>
        </section>
    );
};

export default Hero;