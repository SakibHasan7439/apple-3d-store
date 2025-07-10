import React from 'react';
import { hightlightsSlides } from '../../utils/constant';

const VideoCarousel = () => {
    return (
        <>
            <div className="flex items-center">
                {
                    hightlightsSlides.map((list, index) =>(
                        <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                            <div className='video-carousel_container'>
                                <div className='w-full bg-black h-full overflow-hidden flex-center'>
                                    <video id='video' muted preload='auto' playsInline={true}>
                                        <source src={list.video} type='video/mp4' />
                                    </video>
                                </div>
                                <div className='absolute top-12 left-[5%] z-10'>
                                    {
                                        list.textLists.map((text, i) =>(
                                            <p className='text-xl font-medium md:text-2xl' key={text}>{text}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default VideoCarousel;