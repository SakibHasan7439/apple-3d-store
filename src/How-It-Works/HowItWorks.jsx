import { useGSAP } from "@gsap/react";
import { chipImg, frameImg, frameVideo } from "../utils";
import gsap from "gsap";
import { useRef } from "react";
import { animateWithGsap } from "../utils/Animations/Animation";

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithGsap('.g_fadeIn', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
    })
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro chip
            <br /> A monster win for gaming.
          </h2>
          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>

        {/* mobile video */}
        <div className="mt-10md:mt-20 mb-14">
          <div className="flex-center h-full relative">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-20"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                autoPlay
                preload="none"
                muted
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray-300 text-center mt-3 font-semibold">
            Honkai: Star Rail
          </p>
          <div className="hiw-text-container mt-10 md:mt-20">
            <div className="flex flex-col gap-4">
                <div className="flex-1 flex justify-center flex-col">
                <p className="hiw-text g_fadeIn">
                    A17 pro is{" "}
                    <span className="text-white">
                    Best graphic performance by far
                    </span>
                    Lightest pro model ever.
                </p>
                </div>

                <div className="flex-1 flex-col">
                <p className="feature-text g_text g_fadeIn">
                    Games will looks so cool{" "}
                    <span className="text-white">
                    as its contains the best GPU with 6cors
                    </span>
                    using the same alloy that spacecrafts use for mission Mars.
                </p>
                </div>
            </div>
            <h2 className="text-2xl md:text-3xl text-white font-semibold g_fadeIn">Pro Class GPU</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
