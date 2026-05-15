import {
  MessageCircle,
  Globe,
  MapPin,
  Phone,
  Mail,
  Instagram,
} from "lucide-react";

import { socialLinks } from "./footerData";

export function Footer() {

  return (
    <footer
      className="
        relative
        bg-stone-950
        text-white
        mt-32
        overflow-hidden
      "
    >

      {/* Glow */}
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[500px]
          h-[500px]
          bg-stone-700/20
          blur-[120px]
          rounded-full
        "
      />

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          py-24
          px-6
          grid
          lg:grid-cols-2
          gap-16
        "
      >

        {/* LEFT */}
        <div>

          <div className="mb-10">

            <h2
              className="
                text-5xl
                font-bold
                tracking-tight
              "
            >
              Pachamama Hospedagem
            </h2>

            <p
              className="
                text-stone-400
                text-lg
                mt-6
                leading-relaxed
                max-w-xl
              "
            >
              Uma experiência única de hospedagem em
              meio às montanhas de Lumiar,
              conectando conforto, natureza e
              tranquilidade.
            </p>

          </div>

          {/* INFO */}
          <div className="grid gap-5">

            <div className="flex items-center gap-4">

              <Mail size={20} />

              <p className="text-stone-300">
                contato@pachamama.com
              </p>

            </div>

            <div className="flex items-center gap-4">

              <Phone size={20} />

              <p className="text-stone-300">
                (22) 99999-9999
              </p>

            </div>

            <div className="flex items-center gap-4">

              <MapPin size={20} />

              <p className="text-stone-300">
                Lumiar - Nova Friburgo/RJ
              </p>

            </div>

          </div>

          {/* SOCIAL */}
          <div className="flex flex-wrap gap-5 mt-10">

            {socialLinks.map((item) => (

              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-3

                  px-5
                  py-3

                  rounded-2xl

                  bg-white/5
                  border
                  border-white/10

                  backdrop-blur-md

                  hover:bg-white/10
                  hover:scale-105

                  transition-all
                  duration-300
                "
              >

                {item.name === "Instagram" && (
                  <Instagram size={18} />
                )}

                {item.name === "WhatsApp" && (
                  <MessageCircle size={18} />
                )}

                {(item.name === "Booking" ||
                  item.name === "Airbnb") && (
                  <Globe size={18} />
                )}

                <span className="text-sm font-medium">
                  {item.name}
                </span>

              </a>

            ))}

          </div>

        </div>

        {/* MAP */}
        <div>

          <div
            className="
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              shadow-2xl
            "
          >

            <iframe
                className="w-full h-[450px]"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1845.0208212205775!2d-42.32025101339083!3d-22.35205643419721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1778880809643!5m2!1spt-BR!2sbr"  
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"/>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div
        className="
          border-t
          border-white/10
          py-8
          px-6
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto

            flex
            flex-col
            md:flex-row

            items-center
            justify-between

            gap-4
          "
        >

          <p className="text-stone-500 text-sm">
            © 2026 Pachamama Hospedagem.
            Todos os direitos reservados.
          </p>

          <p className="text-stone-600 text-sm">
            Desenvolvido com foco em experiência,
            conforto e sofisticação.
          </p>

        </div>

      </div>

    </footer>
  );
}