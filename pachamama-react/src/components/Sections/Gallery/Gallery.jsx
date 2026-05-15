import { useState } from "react";
import { ScrollTopButton } from "../../ScrollTopButton/ScrollTopButton";

import { galleryImages } from "./galleryData.js";
import { GalleryModal } from "./GalleryModal.jsx";

export function Gallery({ scrollToHeader }) {
  const [currentGallery, setCurrentGallery] =
    useState("suite");

  const [selectedIndex, setSelectedIndex] =
    useState(null);

  const images = galleryImages[currentGallery];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">

      <h2 className="text-6xl font-bold mb-10">
        Galeria
      </h2>

      {/* Buttons */}
      <div className="flex gap-4 mb-10">

        <button
          onClick={() => setCurrentGallery("suite")}
          className="
            bg-stone-800
            text-white
            text-xl
            px-8
            py-4
            rounded-full
            cursor-pointer
            transition
            duration-300
            hover:scale-105
          "
        >
          Suíte
        </button>

        <button
          onClick={() => setCurrentGallery("chale")}
          className="
            bg-stone-800
            text-white
            text-xl
            px-8
            py-4
            rounded-full
            cursor-pointer
            transition
            duration-300
            hover:scale-105
          "
        >
          Chalé
        </button>

      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {images.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            onClick={() => setSelectedIndex(index)}
            className="
              h-80
              w-full
              object-cover
              rounded-2xl
              cursor-pointer
              hover:scale-105
              duration-300
            "
          />
        ))}

      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <GalleryModal
          images={images}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          closeModal={() => setSelectedIndex(null)}
        />
      )}
      <ScrollTopButton scrollToHeader={scrollToHeader} />
    </section>
  );
}