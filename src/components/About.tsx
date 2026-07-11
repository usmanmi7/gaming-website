import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const clipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to(".mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="about" className="min-h-screen w-screen" style={{ backgroundColor: '#DFDFF0' }}>
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to the Gaming Metaverse
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
          className="!text-[clamp(1.5rem,3vw,2.5rem)]"
        />

        <div className="about-subtext">
          <p className="text-gray-500">
            The Game of Games begins—your life, now an epic MMORPG
          </p>
          <p className="text-gray-500">
            Gaming unites every player from countless games and platforms into a unified Play Economy
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip" ref={clipRef}>
        <div className="mask-clip-path about-image" style={{
          width: "60vw",
          height: "60vh",
          margin: "0 auto",
          overflow: "hidden",
        }}>
          <img
            src="/img/about.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
