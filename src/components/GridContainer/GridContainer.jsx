import style from "./GridContainer.module.scss";

export const GridContainer = ({ children, columns }) => {
  return (
    <section className={`${style.gridStyling} ${style[`column-${columns}`]}`}>
      {children}
    </section>
  );
};
