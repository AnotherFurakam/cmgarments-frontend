/* eslint-disable @next/next/no-img-element */
import { ISaveImage } from "@/models/image.interface";
import React, { useEffect, useState } from "react";

interface CargaImageInterface {
  file: ISaveImage;
  idProduct: string;
  uploadFile: (
    data: ISaveImage,
    setLoading: any,
    setErr: any,
    index: number
  ) => Promise<void>;
  index: number;
}

const CargaImage: React.FC<CargaImageInterface> = ({
  file,
  idProduct,
  uploadFile,
  index,
}) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [render, setRender] = useState(true);
  const [loading, setLoading] = useState("15%");
  const [err, setErr] = useState<any>(null);

  const getUrlImage = () => {
    const filerReader = new FileReader();
    filerReader.addEventListener("load", (e) => {
      const fileUrl = filerReader.result as string;

      setFileUrl(fileUrl);
    });

    filerReader.readAsDataURL(file.image);
  };

  const uploadImageFile = () => {
    uploadFile(file, setLoading, setErr, index);
  };

  useEffect(() => {
    getUrlImage();
    uploadImageFile();
  }, []);

  useEffect(() => {
    if (loading === "100%" || loading === "100%") {
      setTimeout(() => {
        setRender(false);
      }, 4000);
    }
  }, [loading]);

  if (!render) return null;

  return (
    <>
      <div
        className="row bg-white px-2 mt-3 align-items-center"
        style={{
          borderRadius: "10px",
          paddingTop: "12px",
          paddingBottom: "12px",
        }}
      >
        <div className="col-3">
          <img
            width="50px"
            className="rounded-1"
            src={fileUrl || ""}
            alt={file.title}
          />
        </div>
        <div className="col-9">
          <h5 style={{ fontSize: "14px" }} className="fw-bold">
            {file.title}
          </h5>
          <div className="progress">
            <div
              className="progress-bar bg-info"
              role="progressbar"
              aria-label="Info example"
              style={{ width: loading }}
              aria-valuenow={50}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CargaImage;
