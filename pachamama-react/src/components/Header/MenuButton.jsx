export function MenuButton({
  title,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        bg-white/20
        backdrop-blur-md
        px-6
        py-3
        rounded-full
        text-white
        transition
        duration-300
        hover:bg-white/30
      "
    >
      {title}
    </button>
  );
}