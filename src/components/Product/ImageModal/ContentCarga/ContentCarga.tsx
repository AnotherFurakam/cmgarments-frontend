import React from "react";
import CargaImage from "./CargaImage";
import { ISaveImage } from "@/models/image.interface";

interface ContentCInterface {
  archivosImg: File[] | null;
  idProduct: string;
  uploadFile: (
    data: ISaveImage,
    setLoading: any,
    setErr: any,
    index: number
  ) => Promise<void>;
}

const ContentCarga: React.FC<ContentCInterface> = ({
  archivosImg,
  idProduct,
  uploadFile,
}) => {
  if (archivosImg === null) return null;

  return (
    <>
      {archivosImg.map((file, i) => (
        <CargaImage
          key={file.name}
          file={file}
          idProduct={idProduct}
          uploadFile={uploadFile}
          index={i}
        />
      ))}
    </>
  );
};

export default ContentCarga;
