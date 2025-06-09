"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const canvasRef = useRef(null);
  const images = useRef([]);
  const frameCount = 147; // 假设有两帧动画
  const pathRef1 = useRef(null);
  const pathRef2 = useRef(null);
  const pathRef3 = useRef(null);

  //svg draw path
  useGSAP(() => {
    const path1 = pathRef1.current;
    const pathLength1 = path1.getTotalLength();
    const path2 = pathRef2.current;
    const pathLength2 = path2.getTotalLength();
    const path3 = pathRef3.current;
    const pathLength3 = path3.getTotalLength();

    // 设置初始样式
    gsap.set(path1, {
      strokeDasharray: pathLength1,
      strokeDashoffset: pathLength1,
      stroke: "#D1B48C",
      fill: "none",
    });

    // 创建动画
    gsap.to(path1, {
      strokeDashoffset: 0,
      duration: 2, // 动画持续时间
      stroke: "#D1B48C",
      fill: "#D1B48C",
      delay: 0.3,
      ease: "none", // 线性动画
    });

    // 设置初始样式
    gsap.set(path2, {
      strokeDasharray: pathLength2,
      strokeDashoffset: pathLength2,
      stroke: "#D1B48C",
      fill: "none",
    });

    // 创建动画
    gsap.to(path2, {
      strokeDashoffset: 0,
      duration: 1, // 动画持续时间
      ease: "power2.inOut", // 线性动画
    });

    // 设置初始样式
    gsap.set(path3, {
      strokeDasharray: pathLength3,
      strokeDashoffset: pathLength3,
      stroke: "#D1B48C",
      fill: "none",
    });

    // 创建动画
    gsap.to(path3, {
      strokeDashoffset: 0,
      duration: 1, // 动画持续时间
      ease: "none", // 线性动画
    });
  });

  //imgae scroll
  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // 加载图片
    for (let i = 10; i < frameCount; i++) {
      const img = new Image();
      console.log(`/images/Snapshot20250409${i + 1}.png`);
      img.src = `/images/Snapshot20250409${i + 1}.png`;
      img.onload = () => {
        images.current[i] = img;
        if (i === 10) {
          canvas.width = img.width;
          canvas.height = img.height;
          render();
        }
      };
    }

    const catAnimation = { frame: 0 };

    gsap.to(catAnimation, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: ".fuck",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        markers: true,
      },
      onUpdate: render,
    });
    gsap.to(".inner-element", {
      y: -1000,
      scrollTrigger: {
        trigger: ".text-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    function render() {
      console.log("images", images);
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (
        images.current[Math.round(catAnimation.frame)] instanceof
        HTMLImageElement
      ) {
        context.drawImage(images.current[Math.round(catAnimation.frame)], 0, 0);
      } else {
        console.error("The provided value is not a valid image element.");
      }
    }
  });

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
    <div className="w-[100vw] h-auto">
      <div className="horizon-container overscroll-behavior-none flex flex-nowrap w-[600%] h-[100vh]">
        <section className="panel bg-amber-400">ONE</section>
        <section className="panel bg-lime-400">TWO</section>
        <section className="panel bg-orange-400">THREE</section>
        <section className="panel bg-teal-400">FOUR</section>
        <section className="panel bg-amber-400">FIVE</section>
      </div>

      <svg
        width="65"
        height="45"
        viewBox="0 0 65 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_143)">
          <path
            ref={pathRef1}
            d="M27.4397 32.171C26.3041 34.7816 24.6431 37.0217 21.4398 36.4659C20.4059 36.2975 18.1686 34.7479 18.5245 33.6026C18.7279 32.9626 19.8466 34.2932 20.2025 34.4784C22.7109 35.8596 24.9482 33.131 25.677 31.0088C22.372 28.7518 18.8974 26.6128 16.711 23.16C14.033 18.8987 14.3042 13.1048 18.9144 10.3257C22.7957 7.98453 29.0668 8.92773 31.9651 12.4479C32.0499 12.7174 31.7956 12.97 31.5075 12.9027C31.2533 12.8353 30.1177 11.8921 29.66 11.6563C25.4736 9.46671 19.6262 10.5447 17.9991 15.3617C15.9483 21.442 21.4906 26.6128 25.9991 29.7287C26.2702 29.7961 26.694 28.3813 26.7957 28.0613C28.1177 24.4737 28.7956 20.583 30.3889 17.0797C29.5414 16.8607 28.4058 17.366 27.8465 18.0061C27.4567 18.444 27.4567 19.1682 26.7618 18.9998C26.6262 18.9661 26.5753 18.6629 26.5584 18.545C26.4567 17.366 27.8804 16.4734 28.9143 16.2207C29.4397 16.086 30.66 16.086 30.9482 15.9007C31.1177 15.7828 32.1346 14.1827 32.4397 13.8122C36.5244 9.07932 44.3379 6.68763 48.9311 12.0942C52.3209 16.0691 51.1853 20.8694 48.1175 24.6085C44.643 28.8529 39.4057 30.9751 35.4058 34.529C35.0159 34.8827 33.1854 36.9375 33.0329 36.988C32.4566 37.1396 31.7109 35.809 31.3211 35.4048C30.1855 34.1921 28.8126 33.0973 27.4228 32.2046L27.4397 32.171ZM44.3718 26.0907C46.9989 23.3958 49.2701 19.4209 48.0159 15.5807C45.7108 8.5235 36.8973 9.56776 33.5075 15.0249C38.0329 13.7111 41.4735 15.7996 40.0668 20.7515C39.1346 24.0358 35.4227 26.5117 32.0838 26.7475C31.2194 26.7981 30.2702 26.8318 29.4228 26.7475L27.9482 30.8572C29.7109 32.2383 31.5583 33.5689 32.9482 35.3543C36.0837 31.5309 40.9481 29.5771 44.3718 26.0738V26.0907ZM29.66 25.7706C30.0329 25.7706 30.9143 25.8212 32.1346 25.6864C33.9312 25.4843 35.5753 24.2211 36.66 22.8063C38.0837 20.9199 39.66 15.5302 35.7956 15.5302C31.4397 15.5302 30.4736 22.6379 29.66 25.7706Z"
            fill="#D1B48C"
          />
          <path
            ref={pathRef2}
            d="M32.4553 44.5732C50.0561 44.5732 64.3244 34.6759 64.3244 22.467C64.3244 10.258 50.0561 0.360718 32.4553 0.360718C14.8545 0.360718 0.58625 10.258 0.58625 22.467C0.58625 34.6759 14.8545 44.5732 32.4553 44.5732Z"
            stroke="#D1B48C"
            stroke-width="0.859294"
            stroke-miterlimit="10"
          />
          <path
            ref={pathRef3}
            d="M32.4553 42.9825C15.7212 42.9825 2.10302 33.6841 2.10302 22.2702C2.10302 10.8563 15.7212 1.55792 32.4553 1.55792C49.1894 1.55792 62.7911 10.8563 62.7911 22.2702C62.7911 33.6841 49.173 42.9825 32.4553 42.9825Z"
            stroke="#D1B48C"
            stroke-width="0.429647"
            stroke-miterlimit="10"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_143">
            <rect
              width="64.4471"
              height="44.9176"
              fill="white"
              transform="translate(0.223526)"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="w-[100vw] h-[50vh] bg-fuchsia-900"> 123</div>
      <div className="fuck w-[100vw] h-[200vh]">
        <canvas ref={canvasRef}></canvas>;
      </div>
      <div className="text-container h-[100vh] flex justify-center items-center overflow-hidden bg-amber-400 relative">
        <div className="inner-element text-amber-50 bg-blue-400 w-[20vw] top-[300px]">
          透過這些設定，當用戶滾動頁面時，.container 內的 .inner-element
          將會產生向上移動的效果。​ 如需更進一步的效果，您可以參考 GSAP
          官方文件或相關教學資源，了解更多進階設定和應用。
        </div>
      </div>
      <div className="w-[100vw] h-[50vh] bg-fuchsia-900"> 123</div>
    </div>
  );
};

export default App;
