import React, { useEffect, useRef, useState, useCallback } from "react";
// import { highlightsSlides } from "../../utils/constant"; // Fixed typo
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../../utils";
import { useGSAP } from "@gsap/react";
import { hightlightsSlides } from "../../utils/constant";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const progressAnimationRef = useRef(null);
  const tickerFunctionRef = useRef(null);

  // video and indicator state
  const [video, setVideo] = useState({
    startPlay: false,
    isEnd: false,
    isLastVideo: false,
    videoId: 0,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { startPlay, isEnd, isLastVideo, videoId, isPlaying } = video;

  // Slider and scroll trigger animation
  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // Play/pause video based on state
  useEffect(() => {
    if (loadedData.length > 3) {
      const currentVideo = videoRef.current[videoId];
      if (currentVideo) {
        if (!isPlaying) {
          currentVideo.pause();
        } else {
          if (startPlay) {
            currentVideo.play().catch(console.error);
          }
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Handle video metadata loading
  const handleLoadedMetaData = useCallback((i, e) => {
    setLoadedData((prev) => [...prev, e]);
  }, []);

  // Progress bar animation effect with proper cleanup
  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    const currentVideo = videoRef.current[videoId];
    const currentSlide = hightlightsSlides[videoId];

    if (span[videoId] && currentVideo && currentSlide) {
      // Clean up previous animation
      if (progressAnimationRef.current) {
        progressAnimationRef.current.kill();
      }
      if (tickerFunctionRef.current) {
        gsap.ticker.remove(tickerFunctionRef.current);
      }

      // Create new progress animation
      progressAnimationRef.current = gsap.to(span[videoId], {
        duration: currentSlide.videoDuration,
        ease: "none",
        onUpdate: function() {
          const progress = Math.ceil(this.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;

            // Update indicator width
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10vw"
                  : "4vw",
            });

            // Update progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      // Restart animation for first video
      if (videoId === 0) {
        progressAnimationRef.current.restart();
      }

      // Sync animation with video progress
      const syncProgress = () => {
        if (currentVideo && currentSlide && progressAnimationRef.current) {
          const progress = currentVideo.currentTime / currentSlide.videoDuration;
          progressAnimationRef.current.progress(progress);
        }
      };

      tickerFunctionRef.current = syncProgress;

      if (isPlaying) {
        gsap.ticker.add(syncProgress);
      }
    }

    // Cleanup function
    return () => {
      if (progressAnimationRef.current) {
        progressAnimationRef.current.kill();
        progressAnimationRef.current = null;
      }
      if (tickerFunctionRef.current) {
        gsap.ticker.remove(tickerFunctionRef.current);
        tickerFunctionRef.current = null;
      }
    };
  }, [videoId, startPlay, isPlaying]);

  // Handle various video control actions
  const handleProcess = useCallback((type, i) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ 
          ...prev, 
          isEnd: true, 
          videoId: i + 1 < hightlightsSlides.length ? i + 1 : i
        }));
        break;

      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((prev) => ({ 
          ...prev, 
          isLastVideo: false, 
          videoId: 0,
          isEnd: false 
        }));
        break;

      case "play":
      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      default:
        console.warn(`Unknown video control type: ${type}`);
        break;
    }
  }, []);

  // Handle video end event
  const handleVideoEnd = useCallback((index) => {
    if (index !== hightlightsSlides.length - 1) {
      handleProcess("video-end", index);
    } else {
      handleProcess("video-last");
    }
  }, [handleProcess]);

  // Handle video play event
  const handleVideoPlay = useCallback(() => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      isPlaying: true,
    }));
  }, []);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full bg-black h-full overflow-hidden flex-center">
                <video
                  id="video"
                  muted
                  preload="auto"
                  playsInline={true}
                  ref={(el) => (videoRef.current[index] = el)}
                  onEnded={() => handleVideoEnd(index)}
                  onPlay={handleVideoPlay}
                  onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, textIndex) => (
                  <p className="text-xl font-medium md:text-2xl" key={`${text}-${textIndex}`}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 backdrop-blur bg-[#343434] rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 h-3 w-3 rounded-full bg-gray-200 relative cursor-pointer"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              ></span>
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt="control image"
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;