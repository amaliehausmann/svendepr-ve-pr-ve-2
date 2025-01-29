import { GridContainer } from "../GridContainer/GridContainer";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { Button } from "../Button/Button";
import { Slideshow } from "../Slideshow/Slideshow";
import style from "./RoomAccordion.module.scss";

export const RoomAccordion = ({
  imgSrc,
  alttext,
  title,
  area,
  description,
  price,
  normalprice,
  flexprice,
  children,
  onClick,
  images,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  function toggleAccordion() {
    setAccordionOpen((prev) => !prev);
    if (!accordionOpen) {
      onClick();
    }
  }

  return (
    <div className={style.roomAccordion}>
      <div className={style.overview}>
        {accordionOpen ? (
          <Slideshow
            images={images.map((image) => `/images/${image.filename}`)}
            custom="roomSlide"
          />
        ) : (
          <img src={imgSrc} alt={alttext} />
        )}
        <div className={style.text}>
        <h3>{title}</h3>
        <p>{area}</p>
        <p>{description}</p>
        <h3 className={style.pricing}>{price}</h3>
        </div>
      </div>

      {accordionOpen && (
        <div className={style.openAccordion}>
          <h4>Værelset er udstyret med:</h4>
          {children}

          <GridContainer columns={2} gap='four'>
            <div>
              <h5>NORMAL Pris inkl. morgenmad</h5>
              <p>Kan ikke ændres eller afbestilles</p>
              <span>
                <h5>
                  <b>{normalprice}</b> DKK/nat
                </h5>
                <Button color="red" title="Book" />
              </span>
            </div>
            <div>
              <h5>FLEX Pris inkl. morgenmad</h5>
              <p>Kan ændres eller afbestilles</p>
              <span>
                <h5>
                  <b>{flexprice}</b> DKK/nat
                </h5>
                <Button color="red" title="Book" />
              </span>
            </div>
          </GridContainer>
        </div>
      )}
      <div className={style.toggle} onClick={toggleAccordion}>
        {accordionOpen ? <IoChevronUp /> : <IoChevronDown />}
      </div>
    </div>
  );
};
