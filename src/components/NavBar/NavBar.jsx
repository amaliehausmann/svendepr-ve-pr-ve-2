import { NavLink } from "react-router-dom";
import style from "./NavBar.module.scss";
import { useNavLinks } from "../../hooks/useNavLinks";


//Navbar component, med link til style module som trækker data fra et array og mapper det ud
export const NavBar = () => {

  const navLinks = useNavLinks();

  return (
    <nav className={style.navStyling}>
      <ul>
        {navLinks.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive ? `${style.activeNavlink}` : style.navLink
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
