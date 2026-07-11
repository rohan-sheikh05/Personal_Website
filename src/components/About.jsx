// src/components/About.jsx
//
// BUG FIX from the original: the About text was a <p> containing five more
// <p> tags. HTML doesn't allow nested <p>s - the browser silently
// auto-closes the outer tag, which can break the intended spacing/layout.
// Now it's a <div> wrapper with proper sibling <p> paragraphs.

import React from "react";
import Slider from "react-slick";
import useCollection from "../hooks/useCollection";
import { fallbackAbout, fallbackHeroImages } from "../data/fallbackData";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
};

export default function About() {
  const { data: images } = useCollection("heroImages", fallbackHeroImages);

  return (
    <section id="about" className="flex flex-col items-center gap-8 px-5 py-16 text-white">
      <div className="max-w-4xl text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-[5px] h-8 bg-indigo-600" />
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          {fallbackAbout.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[700px]">
        <Slider {...sliderSettings}>
          {images.map((img) => (
            <div key={img.id}>
              <img
                src={img.url}
                alt={img.alt || "Rohan Sheikh"}
                loading="lazy"
                className="w-full h-[400px] object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
