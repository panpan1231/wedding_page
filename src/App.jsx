"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Header from "./component/header";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimalSVG from "./assets/animals.svg?react";
import Pannel1 from "../public/images/frame/7.png";
import Blank from "../public/images/frame/blank.png";
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const animalRef = useRef(null);
  useEffect(() => {
    const target = animalRef.current.querySelector("#heart");
    gsap.to(target, {
      x: -5,
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 1,
      fill: "pink",
    });
  }, []);

  useEffect(() => {
    const target = animalRef.current.querySelector("#hand");
    gsap.to(target, {
      rotation: "10deg",
      repeat: -1,
      yoyo: true,
      duration: 1,
    });
  }, []);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".panel");
    const colors = [
      "#6F5E4B",
      "#6F5E4B",
      "#6F5E4B",
      "#6F5E4B",
      "#6F5E4B",
      "#F3EBD3",
      "#F3EBD3",
    ];

    // 水平滾動
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizon-container",
        pin: true,
        scrub: 1,
        end: () =>
          "+=" + document.querySelector(".horizon-container").offsetWidth,
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
        pin: false, // 不要再 pin
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
      markers: true,
      onEnter: () => {
        const video = document.getElementById("panel-v-1");
        const video2 = document.getElementById("panel-v-2");
        const video3 = document.getElementById("panel-v-3");
        console.log(1111);
        if (video) {
          video.play();
          video2.play();
          video3.play();
        }
      },

      onEnterBack: () => {
        const video = document.getElementById("panel-v-1");
        if (video) {
          video.play();
        }
      },
    });
  });

  return (
    <div className="w-[100vw] h-auto overflow-x-hidden relative">
      <Header />
      <div className="fill-form">
        <div className="fill-context">
          <p>從 12 歲青澀的國中同學，</p>
          <p className="mb-5">到 27 歲彼此生命中的唯一。</p>
          <p>我們一起經歷了人生中好多角色，</p>
          <p>一路走來8年， 從青春到現在</p>
          <p>慢慢把彼此的名字寫進未來的每一頁。</p>
          <p>這段故事，不短也不長，剛剛好，</p>
          <p className="mb-10">剛好成為現在的「我們」。</p>
          <p>Evol with You, Love with Me</p>
          <p>在彼此的陪伴裡成長、相愛，</p>
          <p>這就是我們最浪漫的旋律。</p>

          <div className="fill-btn">填寫表單</div>
        </div>
      </div>
      <div className="groom flex flex-col justify-between">
        <div className="area-title">
          <div className="font-basheq">Groom</div>
          <div className="sub-title">Pan Tuntai</div>
        </div>
        <div className="family-info text-[#F3EBD3]">
          <div className="text-[33px] tracking-[4px] mb-2 font-bold">
            潘敦泰
          </div>
          <div className="text-[18px]">男方主婚人｜潘榮光 施素華</div>
        </div>
      </div>
      <div className="bride flex flex-col justify-between">
        <div className="area-title">
          <div className="font-basheq">Bride</div>
          <div className="sub-title">Yu Yishan</div>
        </div>
        <div className="family-info text-[#6F5E4B]">
          <div className="text-[33px] tracking-[4px] mb-2 font-bold">
            游宜珊
          </div>
          <div className="text-[18px]">女方主婚人｜游東堯 楊翠娟</div>
        </div>
      </div>
      <div className="horizon-container border-none overscroll-behavior-none flex flex-nowrap w-[600%] h-[100vh]">
        <section className="panel flex items-center relative">
          <div className="flex items-end grow-0 overflow-visible absolute left-[50%]">
            <div className="w-1/2 mr-10">
              <AnimalSVG ref={animalRef} />
            </div>
            <div className="text-[#F3EBD3] flex flex-col justify-center">
              <div className="text-[32px] leading-none italic">
                Sunday Wedding Lunch
              </div>
              <div className="text-[83px] leading-none italic">2025.11.02</div>
            </div>
          </div>
        </section>
        <section className="panel panel1-2">121212</section>
        <section className="panel panel1-2">1313</section>
        <section className="panel" id="p1">
          <div className="pannel-bg1 relative rotate-12 left-[80px] top-[5%]">
            <video
              className=" absolute top-[16px] left-[23px]"
              id="panel-v-1"
              width="275px"
              src="../public/video/MVI_0636_6.mp4"
              preload="true"
              playsinline
              muted
              loop
            ></video>
            <div className="absolute left-[110%] top-[40%] rotate-348">
              <div className="text-[#F3EBD3] text-[20px] italic font-bold">
                Address
              </div>
              <div className="text-[#6F5E4B] text-[42px]  font-bold mb-3">
                <span className="bg-[#F3EBD3] px-3">地點</span>
              </div>
              <div className="text-[#6F5E4B] text-[42px] bg-[#F3EBD3] font-bold w-[460px]">
                <span className="bg-[#F3EBD3] px-3">圓觀 Palazzo Colonna</span>
              </div>
            </div>
          </div>
        </section>
        <section className="panel panel1-2">2-2-2</section>
        <section className="panel panel1-2">2-2-3</section>

        <section className="panel relative">
          <div className="pannel-bg1 absolute rotate-12 left-[90%] top-[40px]">
            <video
              className=" absolute top-[16px] left-[23px]"
              id="panel-v-2"
              width="275px"
              src="../public/video/MVI_0636_5.mp4"
              preload="true"
              playsinline
              muted
              loop
            ></video>
          </div>
          <div className="pannel-bg1 absolute rotate-12 left-0 top-[50%]">
            <video
              className=" absolute top-[16px] left-[23px]"
              id="panel-v-3"
              width="275px"
              src="../public/video/MVI_0636_1.mp4"
              preload="true"
              playsinline
              muted
              loop
            ></video>
          </div>
        </section>
        <section className="panel">FOUR</section>
      </div>
      <div className="invite"></div>
      <div className="dress-code"></div>
      <div className="photo-area"></div>

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
