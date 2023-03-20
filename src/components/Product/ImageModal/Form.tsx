import React, { useEffect, useState } from "react";
import InputFile from "./InputFile";
import ContentImage from "./ContentImage";
import { productService } from "@/services/product.service";
import { ISaveImage } from "@/models/image.interface";
import { ContentCarga } from "./ContentCarga";
import { SDivContainerCarga, SDivContentForm } from "./style";

interface FormInterface {
  idProduct: string;
  loadImages: () => Promise<void>;
}

const Form: React.FC<FormInterface> = ({ idProduct, loadImages }) => {
  const [archivosImg, setArchivosImg] = useState<File[] | null>(null);
  const [saveImages, setSaveImages] = useState(false);
  const [lengthImages, setLengthImages] = useState(0);

  function showFiles(files: FileList) {
    const validExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];

    const arr = Array.from(files);
    const data = arr.filter((file) => validExtensions.includes(file.type));
    setArchivosImg(data);
  }

  const getImageLength = (): number => (archivosImg ? archivosImg.length : 0);

  const handleClickSave = () => {
    setSaveImages(true);
  };

  const handleClickClean = () => {
    setArchivosImg(null);
    setLengthImages(0);
    setSaveImages(false);
  };

  const uploadFile = async (
    data: ISaveImage,
    setLoading: any,
    setErr: any,
    index: number
  ) => {
    setLoading("10%");
    setLoading("50%");

    try {
      setLoading("60%");
      const response = await productService.saveImage(idProduct, data);
      console.log(response);
      setLoading("100%");
      if (getImageLength() === index + 1) setLengthImages(index + 1);
      loadImages();
    } catch (err) {
      // console.log(err);
      // const error = verifyResponse(err.response);
      // if (error !== null) {
      // console.log(error);
      setErr(err);
      setLoading("0%");
      // alertError("Cancelado!", "Problemas al guardar las imagenes");
      // }
    }
  };

  useEffect(() => {
    if (lengthImages >= getImageLength()) {
      setTimeout(() => {
        setArchivosImg(null);
        setSaveImages(false);
        setLengthImages(0);
        loadImages();
      }, 2000);
    }
  }, [lengthImages]);

  return (
    <SDivContentForm>
      {archivosImg !== null ? (
        <ContentImage
          archivosImg={archivosImg}
          handleSave={handleClickSave}
          handleClean={handleClickClean}
        />
      ) : (
        <div className="py-3">
          <InputFile showFiles={showFiles} />
        </div>
      )}
      <SDivContainerCarga className="overflow-auto bg-gray-3 border-radius mb-3 custom-scroll">
        {saveImages ? (
          <ContentCarga
            archivosImg={archivosImg}
            idProduct={idProduct}
            uploadFile={uploadFile}
          />
        ) : (
          <h6 className="text-center mt-4">No hay imagenes en proceso</h6>
        )}
      </SDivContainerCarga>
    </SDivContentForm>
  );
};

export default Form;
