import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Article from "./pages/Article.jsx";
import Formations from "./pages/Formations.jsx";
import Succes from "./pages/Succes.jsx";
import Communaute from "./pages/Communaute.jsx";
import Mentions from "./pages/Mentions.jsx";
import Confidentialite from "./pages/Confidentialite.jsx";
import Contact from "./pages/Contact.jsx";
import { useHashRoute } from "./useHashRoute.js";

const PAGES = {
  home: Home,
  blog: Blog,
  formations: Formations,
  succes: Succes,
  communaute: Communaute,
  mentions: Mentions,
  confidentialite: Confidentialite,
  contact: Contact,
};

export default function App() {
  const { route, navigate } = useHashRoute();

  // Scroll en haut de page (nouvelle route) ou vers l'ancre demandée (page d'accueil).
  useEffect(() => {
    if (route.page === "home" && route.anchor) {
      const id = requestAnimationFrame(() => {
        const el = document.querySelector(route.anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo(0, 0);
  }, [route.page, route.id, route.anchor]);

  let PageContent;
  if (route.page === "article") {
    PageContent = <Article id={route.id} navigate={navigate} />;
  } else {
    const Page = PAGES[route.page] || Home;
    PageContent = <Page navigate={navigate} />;
  }

  return (
    <>
      <Header navigate={navigate} />
      <main>{PageContent}</main>
      <Footer navigate={navigate} />
    </>
  );
}
