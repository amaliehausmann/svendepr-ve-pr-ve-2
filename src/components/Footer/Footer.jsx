import style from "./Footer.module.scss";
import { navLinks } from "../NavBar/NavArray";
import { Link } from "react-router-dom";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";

export const Footer = () => {
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
            <Link
              to={item.link}
            >
              {item.title}
            </Link>
          </li>
        ))}
        </ul>
      </article>
    </footer>
  );
};
