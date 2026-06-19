import SongsList from "../pages/SongsList";
import Favorites from "../pages/Favorites";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

const routes = [
  { path: "/songs", component: SongsList },
  { path: "/about-us", component: AboutUs },
  { path: "/contact-us", component: ContactUs },
  { path: "/favorites", component: Favorites },
];
export default routes;
