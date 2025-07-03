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
  const frameCount = 80; // 假设有两帧动画
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

  //svg draw path
  // useGSAP(() => {
  //   const path1 = pathRef1.current;
  //   const pathLength1 = path1.getTotalLength();
  //   const path2 = pathRef2.current;
  //   const pathLength2 = path2.getTotalLength();
  //   const path3 = pathRef3.current;
  //   const pathLength3 = path3.getTotalLength();

  //   // 设置初始样式
  //   gsap.set(path1, {
  //     strokeDasharray: pathLength1,
  //     strokeDashoffset: pathLength1,
  //     stroke: "#D1B48C",
  //     fill: "none",
  //   });

  //   // 创建动画
  //   gsap.to(path1, {
  //     strokeDashoffset: 0,
  //     duration: 2, // 动画持续时间
  //     stroke: "#D1B48C",
  //     fill: "#D1B48C",
  //     delay: 0.3,
  //     ease: "none", // 线性动画
  //   });

  //   // 设置初始样式
  //   gsap.set(path2, {
  //     strokeDasharray: pathLength2,
  //     strokeDashoffset: pathLength2,
  //     stroke: "#D1B48C",
  //     fill: "none",
  //   });

  //   // 创建动画
  //   gsap.to(path2, {
  //     strokeDashoffset: 0,
  //     duration: 1, // 动画持续时间
  //     ease: "power2.inOut", // 线性动画
  //   });

  //   // 设置初始样式
  //   gsap.set(path3, {
  //     strokeDasharray: pathLength3,
  //     strokeDashoffset: pathLength3,
  //     stroke: "#D1B48C",
  //     fill: "none",
  //   });

  //   // 创建动画
  //   gsap.to(path3, {
  //     strokeDashoffset: 0,
  //     duration: 1, // 动画持续时间
  //     ease: "none", // 线性动画
  //   });
  //   //文字 merry me
  //   gsap.to(".marry", {
  //     duration: 2,
  //     text: "We're getting married!",
  //     ease: "none",
  //   });
  // });

  //imgae scroll
  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // 加载图片
    for (let i = 10; i < frameCount; i++) {
      const img = new Image();
      console.log(`/images/scroll/Snapshot20250409${i + 1}.png`);
      img.src = `/images/scroll/Snapshot20250409${i + 1}.png`;
      img.onload = () => {
        images.current[i] = img;
        if (i === 11) {
          canvas.width = img.width;
          canvas.height = img.height;
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
        pin: true,
      },
      onUpdate: render,
    });
    function render() {
      const img = images.current[Math.round(catAnimation.frame)];
      if (img instanceof HTMLImageElement) {
        // 計算 cover 縮放比例
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
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
        <div className="test relative top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-8 pointer-events-none select-none">
          <div className="bg-[#F3EBD3] text-sm text-[#6F5E4B] text-[20px] m-auto px-4 py-2">
            {lines[currentLine]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
