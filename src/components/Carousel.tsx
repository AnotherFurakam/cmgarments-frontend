/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from "react";

interface CarouselInterface {
  children?: ReactNode | null;
}

const Carousel: React.FC<CarouselInterface> = ({ children }) => {
  return (
    <div
      id="carouselExampleControlsNoTouching"
      className="carousel slide carousel-dark"
      data-bs-touch="false"
    >
      <div className="carousel-inner">
        {children ? (
          children
        ) : (
          <>
            <div className="carousel-item active">
              <img
                src="https://res.cloudinary.com/dwqpq6u6p/image/upload/v1679240664/bjnnwfor1ft1yk6zpqgn.jpg"
                className="d-block m-auto"
                alt="..."
                style={{ height: "200px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://res.cloudinary.com/dwqpq6u6p/image/upload/v1679240664/xhnrkijzacoik0o0xqad.jpg"
                className="d-block m-auto"
                alt="..."
                style={{ height: "200px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://res.cloudinary.com/dwqpq6u6p/image/upload/v1679240664/c1rzouhieognn5momjku.jpg"
                className="d-block m-auto"
                alt="..."
                style={{ height: "200px" }}
              />
            </div>
          </>
        )}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControlsNoTouching"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
