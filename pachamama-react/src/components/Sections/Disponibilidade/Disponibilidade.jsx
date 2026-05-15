import { useEffect, useState } from "react";
import { ScrollTopButton } from "../../ScrollTopButton/ScrollTopButton";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

import {
  calendars,
  loadCalendars,
  checkReservation,
} from "./disponibilidadeData.js";

export function Disponibilidade({ scrollToHeader }) {

  const [showScrollTop, setShowScrollTop] = useState(false);

  const [events, setEvents] = useState([]);

useEffect(() => {

  function handleScroll() {

    if (window.scrollY > 500) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }

  async function fetchData() {

    const data = await loadCalendars();

    setEvents(data);
  }

  fetchData();

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };

}, []);

  return (
    <section
      id="disponibilidade"
      className="py-20 px-6 max-w-7xl mx-auto"
    >

      <h2 className="text-6xl font-bold mb-14 text-stone-800">
        Disponibilidade
      </h2>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* SUÍTE */}
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-stone-100">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h3 className="text-3xl font-bold text-stone-800">
                Suíte
              </h3>

              <p className="text-stone-500 mt-1">
                R$ {calendars.suite.price}/noite
              </p>

            </div>

            <span className="bg-stone-800 text-white text-sm px-4 py-2 rounded-full">
              Booking + Airbnb
            </span>

          </div>

          <Calendar
            className="w-full border-none"
            tileContent={({ date, view }) => {

              if (view !== "month") return null;

              const reserved = checkReservation(
                date,
                "suite",
                events
              );

              return (
                <div className="flex flex-col items-center mt-1">

                  <span className="text-[10px] font-bold text-stone-700">
                    R$ {calendars.suite.price}
                  </span>

                  {reserved && (
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1" />
                  )}

                </div>
              );
            }}
          />

        </div>

        {/* CHALÉ */}
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-stone-100">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h3 className="text-3xl font-bold text-stone-800">
                Chalé
              </h3>

              <p className="text-stone-500 mt-1">
                R$ {calendars.chale.price}/noite
              </p>

            </div>

            <span className="bg-stone-800 text-white text-sm px-4 py-2 rounded-full">
              Booking + Airbnb
            </span>

          </div>

          <Calendar
            className="w-full border-none"
            tileContent={({ date, view }) => {

              if (view !== "month") return null;

              const reserved = checkReservation(
                date,
                "chale",
                events
              );

              return (
                <div className="flex flex-col items-center mt-1">

                  <span className="text-[10px] font-bold text-stone-700">
                    R$ {calendars.chale.price}
                  </span>

                  {reserved && (
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1" />
                  )}

                </div>
              );
            }}
          />

        </div>

      </div>
            <ScrollTopButton scrollToHeader={scrollToHeader} />
    </section>
  );
}