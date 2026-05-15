import { ScrollTopButton } from "../../ScrollTopButton/ScrollTopButton";

import { agendaEvents } from "./agendaData";

export function Agenda({ scrollToHeader }) {

  return (
    <section
      id="agenda"
      className="py-20 px-6 max-w-6xl mx-auto"
    >

      {/* Título */}
      <div className="mb-14">

        <h2 className="text-5xl font-bold text-stone-800">
          Agenda Cultural
        </h2>

        <p className="text-stone-500 mt-4 text-lg">
          Experiências culturais e eventos em Lumiar
        </p>

      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {agendaEvents.map((event) => (

          <article
            key={event.id}
            className="
              group
              bg-white
              rounded-[2rem]
              p-8
              shadow-xl
              border
              border-stone-100
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-2xl
            "
          >

            {/* Data */}
            <div
              className="
                inline-flex
                items-center
                px-4
                py-2
                rounded-full
                bg-stone-100
                text-stone-700
                text-sm
                font-medium
                mb-6
              "
            >
              {event.date}
            </div>

            {/* Título */}
            <h3
              className="
                text-3xl
                font-bold
                text-stone-800
                leading-tight
                transition
                duration-300
                group-hover:text-stone-600
              "
            >
              {event.title}
            </h3>

            {/* Linha decorativa */}
            <div
              className="
                w-16
                h-[2px]
                bg-stone-300
                mt-8
                transition-all
                duration-500
                group-hover:w-28
              "
            />

          </article>

        ))}

      </div>

      <ScrollTopButton scrollToHeader={scrollToHeader} />

    </section>
  );
}