import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useNavLinks = () => {
  const { userData } = useContext(UserContext);

  const navLinks = [
    {
      link: "/",
      title: "forside",
    },
    {
      link: "/hotels",
      title: "hoteller & destinationer",
    },
    {
      link: "/rooms",
      title: "værelser",
    },
    {
      link: "/reservation",
      title: "reservation",
    },
    {
      link: userData ? "/login" : "/login",
      title: userData ? "Min side" : "login",
    },
  ];

  return navLinks;
};
