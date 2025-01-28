import { NavLink } from "react-router-dom";
import { useGet } from "../../hooks/useGet";

export const DestinationNav = () => {
    const { data } = useGet('http://localhost:4000/destinations');

    return (
        <nav>
            <ul>
                {data?.map((item) => (
                    <li key={item.slug}>
                        <NavLink 
                            to={`/hotels/${item.slug}`} 
                            style={({ isActive }) => ({
                                color: isActive ? 'red' : 'inherit',
                                textDecoration: 'none'
                            })}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
