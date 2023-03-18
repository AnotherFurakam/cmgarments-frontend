import { IProduct } from "@/models/product.interface";
import React from "react";

interface ImageInterface {
  data: IProduct;
  handleCloseModal: () => void;
}

const ImageModal: React.FC<ImageInterface> = ({ data, handleCloseModal }) => {
  // console.log(data);

  return (
    <div>
      <h3>Image</h3>
    </div>
  );
};

export default ImageModal;
