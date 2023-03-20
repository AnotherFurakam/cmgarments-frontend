import { IProduct } from "@/models/product.interface";
import { productService } from "@/services/product.service";
import { ProductsState, useProductStore } from "@/store/ProductStore";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import Form from "./Form";

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
          <div style={{ maxHeight: "515px" }} className="overflow-auto">
            <div className="px-4">
              {productState.images !== null
                ? productState.images.map((image) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={image.id_image}
                      src={image.url}
                      alt={image.title}
                      className="img-fluid pb-4 pt-3"
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
