"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
const Header = () => {
  const canvasRef = useRef(null);
  const images = useRef([]);
  const frameCount = 90; // 假设有两帧动画
  const pathRef1 = useRef(null);
  const pathRef2 = useRef(null);
  const pathRef3 = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);
  const lines = [
    "從 12 歲青澀的國中同學，",
    "到 27 歲彼此生命中的唯一。",
    "我們一起經歷了人生中好多角色，",
    "一路走來8年， 從青春到現在",
    "慢慢把彼此的名字寫進未來的每一頁。",
    "這段故事，不短也不長，剛剛好，",
    "剛好成為現在的「我們」。",
    "Evol with You, Love with Me",
    "在彼此的陪伴裡成長、相愛，",
    "這就是我們最浪漫的旋律。",
  ];

  //imgae scroll
  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let imgAspect = 1;
    let canvasH = window.innerHeight;
    let canvasW = 400;

    // 加载图片
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = `/images/scroll/Snapshot20250409${i + 1}.png`;
      img.onload = () => {
        images.current[i] = img;
        if (i === 11) {
          imgAspect = img.width / img.height; // 寬/高
          canvasH = window.innerHeight;
          canvasW = Math.round(canvasH * imgAspect);
          canvas.width = canvasW;
          canvas.height = canvasH;
          render();
        }
      };
    }

    const catAnimation = { frame: 11 };

    gsap.to(catAnimation, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: ".bg-scroll",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      onUpdate: render,
    });
    function render() {
      let frame = Math.min(Math.round(catAnimation.frame), frameCount - 1);
      const img = images.current[frame];
      if (img instanceof HTMLImageElement) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.filter = "grayscale(1)";
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        context.filter = "none";
      } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    // GSAP 文字滾動一行一行出現
    const lines = gsap.utils.toArray(".story-line");
    lines.forEach((line, i, arr) => {
      gsap.fromTo(
        line,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".test",
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: true,

            onEnter: () => {
              arr.forEach((el, idx) => {
                if (idx !== i)
                  gsap.to(el, { opacity: 0, y: 30, duration: 0.3 });
              });
            },
            onEnterBack: () => {
              arr.forEach((el, idx) => {
                if (idx !== i)
                  gsap.to(el, { opacity: 0, y: 30, duration: 0.3 });
              });
            },
          },
        }
      );
    });
  });

  useEffect(() => {
    const section = document.querySelector(".bg-scroll");
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        // 根據滾動進度計算顯示第幾行
        const progress = self.progress;
        const idx = Math.floor(progress * (lines.length - 1));
        setCurrentLine(idx);
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="bg-scroll w-[100vw] h-[100vh]">
      <div className="fade-bg h-full relative">
        <canvas className="" ref={canvasRef}></canvas>
        <div className="relative top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-8">
          <div className="fill-context z-30">
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

            <div
              className="fill-btn"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLScS278TjxP8tcbXq4met27BAMllzlSG479-niFmZc9Ka_eklQ/viewform?usp=dialog",
                  "_blank"
                )
              }
            >
              填寫表單
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
