/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

interface ItemCInterface {
  isActive: boolean;
  file: File;
}

const ItemCarousel: React.FC<ItemCInterface> = ({ isActive, file }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const getUrlImage = () => {
    const filerReader = new FileReader();
    filerReader.addEventListener("load", (e) => {
      const fileUrl = filerReader.result as string;
      console.log(fileUrl);

      setFileUrl(fileUrl);
    });

    filerReader.readAsDataURL(file);
  };

  useEffect(() => {
    getUrlImage();
  }, []);

  return (
    <div className={`carousel-item${isActive ? " active" : ""}`}>
      <img
        src={fileUrl || ""}
        className="d-block m-auto"
        alt={file.name}
        style={{ height: "200px" }}
      />
    </div>
  );
};

export default ItemCarousel;
