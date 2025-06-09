"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Header from "./component/header";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useGSAP(() => {
    const sections = gsap.utils.toArray(".panel");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizon-container",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // base vertical scrolling on how wide the container is so it feels more natural.
        end: "+=3500",
      },
    });
  });

  return (
    <div className="w-[100vw] h-auto overflow-x-hidden relative">
      <Header />
      <div className="horizon-container overscroll-behavior-none flex flex-nowrap w-[600%] h-[100vh]">
        <section className="panel bg-amber-400">ONE</section>
        <section className="panel bg-lime-400">TWO</section>
        <section className="panel bg-orange-400">THREE</section>
        <section className="panel bg-teal-400">FOUR</section>
        <section className="panel bg-amber-400">FIVE</section>
      </div>

      <div className="w-[100vw] h-[5000vh]">
        123
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScS278TjxP8tcbXq4met27BAMllzlSG479-niFmZc9Ka_eklQ/viewform?embedded=true"
          width="640"
          height="2587"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          載入中…
        </iframe>
      </div>
    </div>
  );
};

export default App;
