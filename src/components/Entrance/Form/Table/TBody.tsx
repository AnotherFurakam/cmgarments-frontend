import React from "react";
import Row from "./Row";
import { IPurchaseDetail } from "@/models/purchase.interface";
import { IEntrance } from "@/models/entrance.interface";

export interface FormInterface {
  data: IPurchaseDetail[];
  checkEntrance: (data: IEntrance) => void;
}

const TBody: React.FC<FormInterface> = ({ data, checkEntrance }) => {
  const saveEntrance = (detail: IPurchaseDetail) => {
    const entrance: IEntrance = {
      description: `${detail.id_product.name} - ${detail.id_product.color} - ${detail.id_product.brand.name}`,
      units: detail.units,
      unit_cost: detail.price,
      id_purchase_detail: detail.id_purchase_detail,
    };

    checkEntrance(entrance);
  };

  return (
    <tbody>
      {data.map((detail) => (
        <Row
          key={detail.id_purchase_detail}
          data={detail}
          saveEntrance={saveEntrance}
        />
      ))}
    </tbody>
  );
};

export default TBody;
