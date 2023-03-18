import { IProduct } from "@/models/product.interface";
import { productService } from "@/services/product.service";
import React, { useEffect } from "react";

interface ImageInterface {
  data: IProduct;
  handleCloseModal: () => void;
}

const ImageModal: React.FC<ImageInterface> = ({ data, handleCloseModal }) => {
  const getImages = async () => {
    const res = await productService.getImages(data.id_product as string);
    console.log(res);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div>
      <h3>Image</h3>
    </div>
  );
};

export default ImageModal;
