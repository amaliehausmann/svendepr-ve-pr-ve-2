import { useEffect, useState } from "react";

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
        <section>
            <img src={`../src/assets/images/${images[currentImage]}`} alt={`Slide ${currentImage + 1}`} />
            <h2>{title}</h2>
        </section>
    );
};
