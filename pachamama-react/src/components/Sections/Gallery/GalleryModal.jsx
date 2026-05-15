import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function GalleryModal({
  images,
  selectedIndex,
  setSelectedIndex,
  closeModal,
}) {
  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div
      onClick={closeModal}
      className="
        fixed
        inset-0
        bg-black/90
        z-50
        flex
        items-center
        justify-center
        p-4
      "
    >

      {/* Fechar */}
      <button
        onClick={closeModal}
        className="
          absolute
          top-6
          right-6
          text-white
          z-50
          cursor-pointer
        "
      >
        <X size={40} />
      </button>

      {/* Left */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
        className="
          absolute
          left-6
          text-white
          z-50
          cursor-pointer
        "
      >
        <ChevronLeft size={50} />
      </button>

      {/* Image */}
      <img
        src={images[selectedIndex]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="
          max-w-full
          max-h-full
          object-contain
          rounded-2xl
        "
      />

      {/* Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        className="
          absolute
          right-6
          text-white
          z-50
          cursor-pointer
        "
      >
        <ChevronRight size={50} />
      </button>

    </div>
  );
}