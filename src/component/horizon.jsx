import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimalSVG from "../assets/animals.svg?react";

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const animalRef = useRef(null);
  useGSAP(() => {
    const target = animalRef.current.querySelector("#heart");
    gsap.to(target, {
      scale: 1.4,
      repeat: -1,
      yoyo: true,
      duration: 1,
      transformOrigin: "50% 50%",
    });
  });
  const colors = [
    "#783536",
    "#783536",
    "#783536",
    "#783536",
    "#783536",
    "#4B372A",
    "#4B372A",
    "#4B372A",
    "#783536",
    "#783536",
    "#4B372A",
    "#4B372A",
    "#4B372A",
    "#4B372A",
  ];

  useGSAP(() => {
    const panels = gsap.utils.toArray(".panel");

    const horizonContainer = document.querySelector(".horizon-container");
    // 水平滾動
    const horizAnim = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 2,
        start: "top top",
        end: () => {
          console.log(
            "horizonContainer.scrollWidth",
            horizonContainer.scrollWidth,
            horizonContainer.offsetWidth
          );
          return "+=" + (horizonContainer.scrollWidth - window.innerWidth);
        },
        id: "horizon-scroll",
      },
    });

    // 背景色漸變
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".horizon-container",
        start: "left left",
        end: () =>
          "+=" + document.querySelector(".horizon-container").offsetWidth,
        scrub: true,
        id: "horizon-bg", // 新增唯一 id
      },
    });
    panels.forEach((panel, i) => {
      tl.to(
        ".horizon-container",
        {
          backgroundColor: colors[i],
          duration: 1,
          immediateRender: false,
        },
        i
      );
    });

    // 影片自動播放控制
    ScrollTrigger.create({
      trigger: "#panel-v-1", // 第二個 panel
      start: "left center",
      end: "right center",
      id: "video-autoplay", // 新增唯一 id
      onEnter: () => {
        const video = document.getElementById("panel-v-1");
        const video2 = document.getElementById("panel-v-2");
        const video3 = document.getElementById("panel-v-3");
        const video4 = document.getElementById("panel-v-4");
        const video5 = document.getElementById("panel-v-5");
        const video6 = document.getElementById("panel-v-6");
        const video7 = document.getElementById("panel-v-7");
        if (video) {
          video.muted = true;
          video.playsInline = true;
          video.play();
        }
        if (video2) {
          video2.muted = true;
          video2.playsInline = true;
          video2.play();
        }
        if (video3) {
          video3.muted = true;
          video3.playsInline = true;
          video3.play();
        }
        if (video4) {
          video4.muted = true;
          video4.playsInline = true;
          video4.play();
        }
        if (video5) {
          video5.muted = true;
          video5.playsInline = true;
          video5.play();
        }
        if (video6) {
          video6.muted = true;
          video6.playsInline = true;
          video6.play();
        }
        if (video7) {
          video7.muted = true;
          video7.playsInline = true;
          video7.play();
        }
      },

      onEnterBack: () => {
        const video = document.getElementById("panel-v-1");
        if (video) {
          video.play();
        }
      },
    });

    // 為所有 .v-pannel 加入橫向滾動時的旋轉動畫（正確 containerAnimation）
    gsap.utils.toArray(".v-pannel").forEach((el, i) => {
      gsap.fromTo(
        el,
        { rotate: -2 },
        {
          rotate: 2,
          scrollTrigger: {
            trigger: el,
            containerAnimation: horizAnim, // 傳 timeline
            start: "left center",
            end: "right center",
            scrub: 2,
            ease: "slow(0.7, 0.7, false)",
            id: `v-pannel-rotate-${i}`,
          },
        }
      );
    });
  });

  return (
    <section
      ref={containerRef}
      className="relative w-screen block-base-size overflow-hidden"
    >
      <div
        className="horizon-container h-full border-none overscroll-behavior-none flex flex-nowrap"
        style={{ width: `${colors.length * 100}vw` }}
      >
        <section className="panel flex items-center relative w-screen">
          <div className="flex items-end grow-0 overflow-visible absolute left-[20%]">
            <div className="w-1/2 mr-10">
              <AnimalSVG ref={animalRef} />
            </div>
            <div className="text-[#F3EBD3] flex flex-col justify-center">
              <div className="text-[32px] font-bold leading-none italic mb-2">
                Sunday Wedding Lunch
              </div>
              <div className="text-[83px] font-bold leading-none italic">
                2025.11.02
              </div>
            </div>
          </div>
        </section>

        <section className="w-screen panel">
          <div className="w-screen"></div>
        </section>
        <section className="panel w-screen" id="p1">
          <div className="pannel-bg1 v-pannel relative rotate-12 left-[40%] top-[5%] w-screen">
            <video
              className=" absolute top-[16px] left-[23px]"
              id="panel-v-1"
              width="275px"
              src="/video/MVI_0636_6.mp4"
              preload="true"
              playsInline
              muted
              loop
            ></video>
          </div>
        </section>
        <section className="w-screen panel">
          <div className="absolute left-[40%] top-[40%]">
            <div className="text-[#F3EBD3] text-[20px] italic font-bold">
              Address
            </div>
            <div className="text-[#4B372A] text-[42px] mb-4 font-bold">
              <span className="bg-[#F3EBD3] px-3 py-1 ">地點</span>
            </div>
            <div className="text-[#4B372A] text-[30px] bg-[#F3EBD3] font-bold whitespace-nowrap px-2">
              <span className="bg-[#F3EBD3]">圓觀 Palazzo Colonna</span>
            </div>
          </div>
        </section>
        <section className="w-screen panel"></section>
        <section className="panel w-screen panel1-2">
          <div className="pannel-bg-blank v-pannel absolute rotate-12 left-0 top-[50%]">
            <video
              className="absolute top-[16px] left-[23px]"
              id="panel-v-3"
              width="275px"
              src="/video/MVI_0636_1.mp4"
              preload="true"
              playsInline
              muted
              loop
            ></video>
          </div>
        </section>

        <section className="panel relative w-screen">
          <div className="pannel-bg-blank v-pannel absolute rotate-12 left-0 top-[20px] w-screen">
            <video
              className=" absolute top-[16px] left-[23px]"
              id="panel-v-2"
              width="275px"
              src="/video/MVI_0636_5.mp4"
              preload="true"
              playsInline
              muted
              loop
            ></video>
          </div>
        </section>
        <section className="panel w-screen">
          <div className="pannel-bg4 v-pannel absolute -rotate-12 left-[-30%] top-[30%] w-screen">
            <video
              className="absolute top-[16px] left-[23px]"
              id="panel-v-4"
              width="275px"
              src="/video/MVI_0636_4.mp4"
              preload="true"
              playsInline
              muted
              loop
            ></video>
          </div>
        </section>

        <section className="panel w-screen">
          <div className="absolute left-[-30%] top-[40%]">
            <div className="text-[#F3EBD3] text-[20px] italic font-bold">
              Ceremony
            </div>
            <div className="text-[#4B372A] text-[42px] mb-4 font-bold">
              <span className="bg-[#F3EBD3] px-3 py-1 ">證婚儀式</span>
            </div>
            <div className="text-[#4B372A] text-[30px] font-bold whitespace-nowrap">
              <span className="bg-[#F3EBD3] italic p-2">10:45 AM</span>
            </div>
          </div>
        </section>
        <section className="panel w-screen">
          <div className="pannel-bg3 v-pannel absolute rotate-6 left-0 top-[10%] w-screen">
            <video
              className="absolute top-[16px] left-[23px]"
              id="panel-v-5"
              width="275px"
              src="/video/MVI_0636_3.mp4"
              preload="true"
              playsInline
              muted
              loop
            ></video>
          </div>
        </section>

        <section className="panel w-screen">
          <div className="absolute left-0 top-[40%] w-screen">
            <div className="text-[#F3EBD3] text-[20px] italic font-bold">
              Open Seating
            </div>
            <div className="text-[#4B372A] text-[42px] mb-4 font-bold">
              <span className="bg-[#F3EBD3] px-3 py-1 ">開放入席</span>
            </div>
            <div className="text-[#4B372A] text-[30px] font-bold whitespace-nowrap">
              <span className="bg-[#F3EBD3] italic p-2">11:30 AM</span>
            </div>
          </div>
        </section>
        <section className="panel w-screen">
          <img
            src="/images/evol.png"
            alt=""
            className="w-[120vw] h-auto relative left-[40%] rotate-350"
            draggable={false}
          />
        </section>
        <section className="panel w-screen">
          <div className="pannel-bg2 v-pannel absolute rotate-30 left-0 top-[10%]">
            <video
              className="absolute top-[16px] left-[23px]"
              id="panel-v-6"
              width="275px"
              src="/video/MVI_0636_2.mp4"
              preload="true"
              playsInline
              muted
              loop
            ></video>
          </div>
          <div className="pannel-bg2  absolute w-screen rotate-6 left-0 top-[10%]">
            <video
              className="absolute top-[16px] left-[23px]"
              id="panel-v-7"
              width="275px"
              src="/video/MVI_0636_2.mp4"
              preload="true"
              playsInline
              muted
              loop
            ></video>
          </div>
        </section>
        <section className="panel w-screen">
          <div className="absolute left-[0%] top-[40%]">
            <div className="text-[#F3EBD3] text-[20px] italic font-bold">
              Party!
            </div>
            <div className="text-[#4B372A] text-[42px] mb-4 font-bold whitespace-nowrap">
              <span className="bg-[#F3EBD3] px-3 py-1 ">午宴開始</span>
            </div>
            <div className="text-[#4B372A] text-[30px] font-bold whitespace-nowrap">
              <span className="bg-[#F3EBD3] italic p-2">12:00 PM</span>
            </div>
          </div>
        </section>
        <section className="w-screen panel">
          <div className="w-screen"></div>
        </section>
      </div>
    </section>
  );
}
