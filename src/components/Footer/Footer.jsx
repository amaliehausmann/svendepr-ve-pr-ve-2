import style from "./Footer.module.scss";
import { useNavLinks } from "../../hooks/useNavLinks";
import { Link } from "react-router-dom";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { ToastContainer, Bounce } from "react-toastify";

export const Footer = () => {
  const navLinks = useNavLinks();
  return (
    <footer className={style.footerStyling}>
      <article>
        <p> © 2021 Hotel Overlook. Alle rettigheder forbeholdt.</p>
      </article>
      <article>
        <FaSquareTwitter />
        <FaFacebook />
      </article>
      <article>
        <ul>
          {navLinks.map((item) => (
            <li key={item.title}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </article>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </footer>
  );
};
