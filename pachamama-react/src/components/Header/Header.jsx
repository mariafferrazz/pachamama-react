import exterior from "../../assets/img/exterior/exterior.jpeg";
import logo from "../../assets/img/logo.svg";

import { MenuButton } from "./MenuButton.jsx";
import { menuItems } from "./headerData.js";

export function Header({ handleSectionChange }) {
  return (
    <header className="relative h-screen overflow-hidden">

      {/* Background */}
      <img
        src={exterior}
        alt="Pachamama Hospedagem"
        className="absolute w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          justify-center
          items-center
          h-full
          text-center
          px-4
        "
      >

        {/* Logo */}
        <img
          src={logo}
          alt="Logo Pachamama"
          className="w-[1020px] md:w-[1050px]"
        />

        {/* Subtitle */}
        <p className="text-white text-2xl mt-4">
          Hospedagem em Lumiar - Nova Friburgo
        </p>

        {/* Menu */}
        <div className="flex flex-wrap text-xl gap-4 mt-10">

          {menuItems.map((item) => (
            <MenuButton
  key={item.id}
  title={item.title}
  onClick={() => handleSectionChange(item.id)}
/>
          ))}

        </div>
      </div>
    </header>
  );
}