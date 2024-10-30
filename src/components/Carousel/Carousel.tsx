import { useState, useEffect } from 'react';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "/images/carousel/carousel-01.jpg",
        "/images/carousel/carousel-02.jpg",
        "/images/carousel/carousel-03.jpg",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const goToSlide = (index: any) => {
        setCurrentIndex(index);
    };

    return (
        <div id="carousel" className="relative w-full" data-carousel="slide">
            {/* Carousel Wrapper */}
            <div className="relative h-100 overflow-hidden rounded-lg">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}
                        data-carousel-item
                    >
                        <img
                            src={image}
                            className="w-full h-full object-cover absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>


            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                        aria-current={index === currentIndex}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
