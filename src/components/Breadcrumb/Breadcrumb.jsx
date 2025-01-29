import { Link, useLocation } from "react-router-dom";
import style from "./Breadcrumb.module.scss";

export const Breadcrumb = ({ separator = ">" }) => {
  // Anvender useLocation til at få den nuværende route
  const location = useLocation();

  // Her deler jeg URL'en op ved hver skråstreg og fjerner tomme elementer
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Objekt der definerer nye pathnames, så de er mere læselige
  const newPathNames = {
    hotels: "Hoteller & Destinationer",
    kobenhavn: "København",
    goteborg: "Göteborg",
    jonkobing: "Jönköbing",
    tromso: "Tromsø",
    "overlook-aalborg-ost": "Overlook Aalborg Øst",
  };

  return (
    <nav className={style.breadcrumb}>
      <ul>
        {/* Første li linker altid til startsiden */}
        <li>
          <Link to="/">Hotel Overlook</Link>
          {/* Hvis der er mere end en path tilføjes > i mellem dem */}
          {pathnames.length > 0 && <span>{separator}</span>}
        </li>

        {/* Mapper hver path ud som link */}
        {pathnames.map((item, index) => {
          // Laver nye URL ved at slice arrayet
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          // Const der definerer den sidste path
          const isLast = index === pathnames.length - 1;

          // Hvis item findes i newPathNames objektet, bliver det den nye værdi ellers bliver bindestreger erstattet med mellemrum
          const displayName = newPathNames[item] || item.replace(/-/g, " ");

          return (
            <li key={to}>
              {/* Hvis det ikke er sidste item, laves et link */}
              {!isLast ? (
                <>
                  <Link to={to}>{displayName}</Link>
                  {/* Hvis ikke sidste, tilføj separator */}
                  <span>{separator}</span>
                </>
              ) : (
                // Hvis det er sidste item, vises kun navnet uden link
                <span>{displayName}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
