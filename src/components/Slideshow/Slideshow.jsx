import { useEffect, useState } from "react";
import style from './Slideshow.module.scss'

export const Slideshow = ({ title, images }) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) {
        return <p>Ingen billeder at vise</p>;
    }

    return (
        <section className={style.slideshow}>
            <img src={`../../public/${images[currentImage]}`} alt={`Slide ${currentImage + 1}`} />
            <div>
            <h1>{title}</h1>
            <span></span>
            </div>
        </section>
    );
};
