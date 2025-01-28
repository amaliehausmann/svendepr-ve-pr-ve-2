import { Link, useLocation } from "react-router-dom";
import style from './Breadcrumb.module.scss';

export const Breadcrumb = ({ separator = ">" }) => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  const pathNameMapping = {
    hotels: "Hoteller & Destinationer",
  };

  return (
    <nav className={style.breadcrumb}>
      <ul>
        <li>
          <Link to="/">Hotel Overlook</Link>
          {pathnames.length > 0 && <span>{separator}</span>}
        </li>

        {pathnames.map((item, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          const displayName = pathNameMapping[item.toLowerCase()] || item;

          return (
            <li key={to}>
              {!isLast ? (
                <>
                  <Link to={to}>{displayName}</Link>
                  <span>{separator}</span>
                </>
              ) : (
                <span>{displayName}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
