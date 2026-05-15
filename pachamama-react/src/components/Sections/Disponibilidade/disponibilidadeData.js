import ICAL from "ical.js";

export const calendars = {
  suite: {
    booking: "https://ical.booking.com/v1/export?t=866780e3-440f-4f39-b796-8e3eabb6f622",
    airbnb: "LINK_AIRBNB_SUITE",
    price: 320,
  },

  chale: {
    booking: "https://ical.booking.com/v1/export?t=cdcd0dea-8e18-4012-9cb2-d2c9bdf38596",
    airbnb: "LINK_AIRBNB_CHALE",
    price: 520,
  },
};

export async function loadCalendars() {

  const allEvents = [];

  for (const [accommodation, platforms] of Object.entries(calendars)) {

    for (const [platform, url] of Object.entries(platforms)) {

      if (platform === "price") continue;

      try {

        const response = await fetch(url);

        const text = await response.text();

        const jcalData = ICAL.parse(text);

        const comp = new ICAL.Component(jcalData);

        const vevents = comp.getAllSubcomponents("vevent");

        vevents.forEach((vevent) => {

          const event = new ICAL.Event(vevent);

          allEvents.push({
            accommodation,
            platform,
            start: event.startDate.toJSDate(),
            end: event.endDate.toJSDate(),
          });

        });

      } catch (error) {

        console.error(
          `Erro ao carregar ${platform} - ${accommodation}`,
          error
        );

      }
    }
  }

  return allEvents;
}

export function checkReservation(
  date,
  accommodation,
  events
) {

  return events.some((event) => {

    if (event.accommodation !== accommodation) {
      return false;
    }

    return (
      date >= event.start &&
      date <= event.end
    );
  });
}