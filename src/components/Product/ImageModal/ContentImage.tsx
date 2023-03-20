import { ISaveImage } from "@/models/image.interface";
import React from "react";
import Carousel from "../../Carousel";
import ItemCarousel from "./ItemCarousel";

interface ContentImageInterface {
  archivosImg: ISaveImage[];
  handleSave: () => void;
  handleClean: () => void;
}

const ContentImage: React.FC<ContentImageInterface> = ({
  archivosImg,
  handleSave,
  handleClean,
}) => {
  return (
    <div className=" border-radius box-shadow pt-4 pb-3">
      <Carousel>
        {archivosImg.map((file, i) => (
          <ItemCarousel
            key={file.title}
            isActive={i === 0 ? true : false}
            file={file.image}
          />
        ))}
      </Carousel>
      {/* <div className="d-flex justify-content-around align-items-center px-4 pt-1">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Título de la imagen"
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            defaultChecked={false}
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Principal
          </label>
        </div>
      </div> */}
      <div className="row px-4 pt-3">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-danger d-block w-100"
            onClick={handleClean}
          >
            LIMPIAR TODO
          </button>
        </div>
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-primary d-block w-100"
            onClick={handleSave}
          >
            GUARDAR TODO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentImage;
