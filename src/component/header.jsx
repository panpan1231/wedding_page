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
  const frameCount = 288; // 0~287 共288張
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
  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      let imgAspect = 1;
      let canvasH = window.innerHeight;
      let canvasW = window.innerWidth;

      // cover 並可縮小
      function drawImageCoverZoom(ctx, img, x, y, w, h, scale = 0.8) {
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;
        let drawWidth, drawHeight, offsetX, offsetY;
        if (imgRatio > canvasRatio) {
          drawHeight = h * scale;
          drawWidth = img.width * (drawHeight / img.height);
          offsetX = (w - drawWidth) / 2;
          offsetY = (h - drawHeight) / 2;
        } else {
          drawWidth = w * scale;
          drawHeight = img.height * (drawWidth / img.width);
          offsetX = (w - drawWidth) / 2;
          offsetY = (h - drawHeight) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      // 加载图片
      for (let i = 0; i <= 287; i++) {
        const img = new Image();
        const num = String(i).padStart(3, "0"); // 補零
        img.src = `/images/scroll/MVI_0636${num}.jpg`;
        img.onload = () => {
          images.current[i] = img;
          imgAspect = img.width / img.height; // 寬/高
          canvasH = window.innerHeight;
          canvasW = window.innerWidth;
          canvas.width = canvasW;
          canvas.height = canvasH;
          render();
        };
      }

      const catAnimation = { frame: 0 };

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
          drawImageCoverZoom(
            context,
            img,
            0,
            0,
            canvas.width,
            canvas.height,
            0.8
          );
          context.filter = "none";
        } else {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    },
    { scope: "header-canvas" }
  );

  useGSAP(() => {
    const section = document.querySelector(".bg-scroll");
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=2000`,
      pin: true,
      scrub: true,
      id: "header-pin",
    });

    return () => {
      pinTrigger.kill();
    };
  });

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
