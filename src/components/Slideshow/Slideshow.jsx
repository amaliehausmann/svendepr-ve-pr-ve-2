import { useEffect, useState } from "react";

export const Slideshow = ({ title }) => {
    const images = [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section>
            <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`} />
            <h1>{title}</h1>
        </section>
    );
};
