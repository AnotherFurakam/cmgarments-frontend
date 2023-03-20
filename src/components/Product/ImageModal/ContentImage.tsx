import React from "react";
import Carousel from "../../Carousel";
import ItemCarousel from "./ItemCarousel";

interface ContentImageInterface {
  archivosImg: File[];
  handleSave: () => void;
  handleClean: () => void;
}

const ContentImage: React.FC<ContentImageInterface> = ({
  archivosImg,
  handleSave,
  handleClean,
}) => {
  console.log(archivosImg);
  return (
    <div className=" border-radius box-shadow pt-4 pb-3">
      <Carousel>
        {archivosImg.map((file, i) => (
          <ItemCarousel
            key={file.name}
            isActive={i === 0 ? true : false}
            file={file}
          />
        ))}
      </Carousel>
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
