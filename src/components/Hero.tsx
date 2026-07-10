import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!frameRef.current) return;

    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  // Force play video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // Browser blocked autoplay — try on first interaction
        const onInteract = () => {
          video.play().catch(() => {});
          document.removeEventListener("click", onInteract);
          document.removeEventListener("touchstart", onInteract);
        };
        document.addEventListener("click", onInteract, { once: true });
        document.addEventListener("touchstart", onInteract, { once: true });
      });
    };

    video.addEventListener("canplay", tryPlay);
    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden" style={{ backgroundColor: '#DFDFF0' }}>
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        ref={frameRef}
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black"
      >
        {/* Hero background video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/img/hero-bg.jpg"
          className="absolute left-0 top-0 size-full object-cover object-center"
          onCanPlay={() => setLoading(false)}
          onError={() => setVideoFailed(true)}
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Fallback image if video fails */}
        {videoFailed && (
          <img
            src="/img/hero-bg.jpg"
            alt="hero"
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        )}

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;