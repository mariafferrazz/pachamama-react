import { useEffect, useState } from "react";

import { ChevronUp } from "lucide-react";

export function ScrollTopButton({ scrollToHeader }) {

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {

    function handleScroll() {

      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return (
    <button
      onClick={scrollToHeader}
      className={`
        fixed
        bottom-8
        right-8
        z-50

        flex
        items-center
        justify-center

        w-16
        h-16

        rounded-full

        border
        border-white/20

        bg-stone-900/80
        backdrop-blur-xl

        shadow-[0_8px_32px_rgba(0,0,0,0.25)]

        transition-all
        duration-500

        hover:scale-110
        hover:bg-stone-800

        ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
    >

      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-white/10
          animate-pulse
        "
      />

      <ChevronUp
        size={30}
        className="
          relative
          text-white
          transition-transform
          duration-300
          hover:-translate-y-1
        "
      />

    </button>
  );
}