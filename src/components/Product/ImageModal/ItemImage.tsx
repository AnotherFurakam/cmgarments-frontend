/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ItemImageInterface {
  url: string;
  title: string;
}

export const ItemImage: React.FC<ItemImageInterface> = ({ url, title }) => {
  return (
    <div className="px-3 py-5 mb-4 bg-secondary bg-opacity-25 rounded-4">
      <img src={url} alt={title} className="img-fluid rounded-4" />
      <h2 className="text-center fs-5 pt-2">{title}</h2>
    </div>
  );
};
