// src/components/Certificates.jsx
import React from "react";
import Slider from "react-slick";
import useCollection from "../hooks/useCollection";
import { fallbackCertificates } from "../data/fallbackData";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
};

export default function Certificates() {
  const { data: certificates } = useCollection("certificates", fallbackCertificates);

  return (
    <section id="certificates" className="px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 border-l-4 border-green-500 pl-4">Certificates</h2>
      <div className="slider-container w-[90%] md:w-4/5 mx-auto">
        <Slider {...sliderSettings}>
          {certificates.map((cert) => (
            <div key={cert.id} className="relative p-2.5 text-center">
              <div className="relative inline-block w-full">
                <img
                  src={cert.url}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full max-h-[500px] object-contain rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-black/75 text-white px-3.5 py-1.5 rounded-md text-sm font-semibold max-w-[80%] text-left shadow-md pointer-events-none">
                  {cert.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
