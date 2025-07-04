import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const images = [
  "/images/cursor/FZ1.jpg",
  "/images/cursor/FZ2.jpg",
  "/images/cursor/FZ3.jpg",
  "/images/cursor/FZ4.jpg",
  "/images/cursor/FZ5.jpg",
  "/images/cursor/FZ6.jpg",
  "/images/cursor/FZ7.jpg",
  "/images/cursor/FZ8.jpg",
  "/images/cursor/FZ9.jpg",
  "/images/cursor/FZ10.jpg",
  "/images/cursor/FZ11.jpg",
  "/images/cursor/FZ12.jpg",
];

export default function PhotoMarquee() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row1Tween = useRef(null);
  const row2Tween = useRef(null);

  useGSAP(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const firstImg = row1.querySelector("img");
    const imgHeight = firstImg ? firstImg.offsetHeight : 0;
    const row1Height = imgHeight * images.length;
    const row2Height = imgHeight * images.length;

    row1Tween.current = gsap.to(row1, {
      y: -row1Height,
      duration: 24,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y) => parseFloat(y) % -row1Height),
      },
    });

    row2Tween.current = gsap.to(row2, {
      y: -row2Height,
      duration: 26,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y) => parseFloat(y) % -row2Height),
      },
    });
  }, []);

  return (
    <div className="photo-area overflow-hidden bg-black h-[470px]">
      <div className="marquee-row flex justify-center items-center gap-10">
        <div
          className="flex flex-col items-center w-[50%]"
          onMouseEnter={() => row1Tween.current && row1Tween.current.pause()}
          onMouseLeave={() => row1Tween.current && row1Tween.current.play()}
        >
          <div className="marquee-inner flex flex-col" ref={row1Ref}>
            {images.concat(images).map((src, i) => (
              <img
                key={"row1-" + i}
                src={src}
                className="h-auto w-full my-2 shadow"
              />
            ))}
          </div>
        </div>
        <div
          className="flex flex-col items-center w-[50%]"
          onMouseEnter={() => row2Tween.current && row2Tween.current.pause()}
          onMouseLeave={() => row2Tween.current && row2Tween.current.play()}
        >
          <div className="marquee-inner flex flex-col" ref={row2Ref}>
            {images
              .slice()
              .reverse()
              .concat(images.slice().reverse())
              .map((src, i) => (
                <img
                  key={"row2-" + i}
                  src={src}
                  className="h-auto w-full my-2 shadow"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
