// src/components/About.jsx
//
// BUG FIX from the original: the About text was a <p> containing five more
// <p> tags. HTML doesn't allow nested <p>s - the browser silently
// auto-closes the outer tag, which can break the intended spacing/layout.
//
// Phase 5: intro paragraph now reads as a pull-quote, remaining paragraphs
// each get their own short heading instead of running together as one
// undifferentiated block - easier to scan. Photo gallery now uses the
// custom StorySlider instead of a plain carousel.

import React from "react";
import useCollection from "../hooks/useCollection";
import { fallbackAbout, fallbackHeroImages } from "../data/fallbackData";
import SectionHeader from "./ui/SectionHeader";
import StorySlider from "./StorySlider";

export default function About() {
  const { data: images } = useCollection("heroImages", fallbackHeroImages);
  const [intro, ...sections] = fallbackAbout;

  return (
    <section id="about" className="flex flex-col items-center gap-12 px-6 py-24 text-white max-w-5xl mx-auto">
      <div className="w-full">
        <SectionHeader eyebrow="Get to Know Me" title="About Me" subtitle="The person behind the projects." />

        <blockquote className="border-l-4 border-teal-400 pl-5 text-lg sm:text-xl text-gray-200 leading-relaxed italic max-w-3xl">
          {intro.text}
        </blockquote>

        <hr className="border-slate-800 my-8 max-w-3xl" />

        <div className="space-y-6 max-w-3xl">
          {sections.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h3 className="text-teal-300 font-semibold text-lg mb-2">{block.heading}</h3>
              )}
              <p className="text-gray-300 leading-relaxed">{block.text}</p>
            </div>
          ))}
        </div>
      </div>

      <StorySlider images={images} />
    </section>
  );
}
