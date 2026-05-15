import { useRef, useState } from "react";

import { Header } from "./components/Header/Header";

import { Gallery } from "./components/Sections/Gallery/Gallery";
import { Agenda } from "./components/Sections/Agenda/Agenda";
import { Disponibilidade } from "./components/Sections/Disponibilidade/Disponibilidade";
import { Reservas } from "./components/Sections/Reservas/Reservas";
import { Footer } from "./components/Footer/Footer";

function App() {

  const headerRef = useRef(null);

  const sectionRef = useRef(null);

  const [activeSection, setActiveSection] = useState("galeria");

  function handleSectionChange(section) {

    setActiveSection(section);

    setTimeout(() => {

      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
      });

    }, 50);
  }

  function scrollToHeader() {

    headerRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function renderSection() {

    switch (activeSection) {

      case "galeria":
        return <Gallery scrollToHeader={scrollToHeader} />;

      case "disponibilidade":
        return (
          <Disponibilidade scrollToHeader={scrollToHeader} />
        );

      case "agenda":
        return <Agenda scrollToHeader={scrollToHeader} />;

      case "reservas":
        return <Reservas scrollToHeader={scrollToHeader} />;

      default:
        return <Gallery scrollToHeader={scrollToHeader} />;
    }
  }

  return (
  <>
    <div ref={headerRef}>
      <Header handleSectionChange={handleSectionChange} />
    </div>

    <section
      ref={sectionRef}
      className="min-h-screen"
    >
      {renderSection()}
    </section>

    <Footer />
    
  </>
);
}

export default App;