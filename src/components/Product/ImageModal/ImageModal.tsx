import { IProduct } from "@/models/product.interface";
import { productService } from "@/services/product.service";
import { ProductsState, useProductStore } from "@/store/ProductStore";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import Form from "./Form";
import { ItemImage } from "./ItemImage";

interface ImageInterface {
  data: IProduct;
  handleCloseModal: () => void;
}

const ImageModal: React.FC<ImageInterface> = ({ data, handleCloseModal }) => {
  const productState: ProductsState = useProductStore(
    (state): ProductsState => state,
    shallow
  );

  const getImages = async () => {
    const images = await productService.getImages(data.id_product as string);
    productState.setImages(images);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div style={{ maxWidth: "850px" }} className="py-4 px-4">
      <div className="row gx-5">
        <div className="col-md-5 border-radius box-shadow">
          <div
            style={{ maxHeight: "515px" }}
            className="overflow-auto custom-scroll"
          >
            <div className="px-4">
              {productState.images !== null
                ? productState.images.map((image) => (
                    <ItemImage
                      key={image.id_image}
                      url={image.url}
                      title={image.title}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <Form idProduct={data.id_product as string} loadImages={getImages} />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
