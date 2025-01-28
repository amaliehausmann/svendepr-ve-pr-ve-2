import { NavLink } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import style from "./DestinationNav.module.scss";

export const DestinationNav = () => {
  const { data } = useGet("http://localhost:4000/destinations");

  return (
    <div className={style.destinationNav}>
      <nav>
        <ul>
          {data?.map((item) => (
            <li key={item.slug}>
              <NavLink
                to={`/hotels/${item.slug}`}
                style={({ isActive }) => ({
                  color: isActive ? "red" : "",
                  textDecoration: "none",
                })}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
