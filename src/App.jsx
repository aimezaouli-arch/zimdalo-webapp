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
import Inscription from "./pages/Inscription.jsx";
import Connexion from "./pages/Connexion.jsx";
import ListingDetail from "./pages/ListingDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useHashRoute } from "./useHashRoute.js";

const SIMPLE_PAGES = {
  home: Home,
  blog: Blog,
  formations: Formations,
  succes: Succes,
  communaute: Communaute,
  mentions: Mentions,
  confidentialite: Confidentialite,
  connexion: Connexion,
  notfound: NotFound,
};

export default function App() {
  const { route, navigate } = useHashRoute();

  useEffect(() => {
    if (route.page === "home" && route.anchor) {
      const id = requestAnimationFrame(() => {
        const el = document.querySelector(route.anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo(0, 0);
  }, [route.page, route.id, route.plan, route.anchor]);

  let content;
  if (route.page === "article") {
    content = <Article id={route.id} navigate={navigate} />;
  } else if (route.page === "listing") {
    content = <ListingDetail id={route.id} navigate={navigate} />;
  } else if (route.page === "inscription") {
    content = <Inscription plan={route.plan} navigate={navigate} />;
  } else if (route.page === "contact") {
    content = <Contact listingId={route.id} navigate={navigate} />;
  } else {
    const Page = SIMPLE_PAGES[route.page] || Home;
    content = <Page navigate={navigate} />;
  }

  return (
    <>
      <Header navigate={navigate} />
      <main>{content}</main>
      <Footer navigate={navigate} />
    </>
  );
}
