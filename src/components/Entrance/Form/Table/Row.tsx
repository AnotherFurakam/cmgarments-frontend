import { IEntrance } from "@/models/entrance.interface";
import { IPurchaseDetail } from "@/models/purchase.interface";
import React from "react";

export interface FormInterface {
  data: IPurchaseDetail;
  saveEntrance: (data: IPurchaseDetail) => void;
}

const Row: React.FC<FormInterface> = ({ data, saveEntrance }) => {
  return (
    <tr className={data.received ? "table-secondary" : ""}>
      <th scope="row">
        {data.received ? (
          <input
            className="form-check-input"
            type="checkbox"
            checked={data.received}
            disabled={data.received}
            value={data.id_purchase_detail}
            onClick={(e) => saveEntrance(data)}
          />
        ) : (
          <input
            className="form-check-input"
            type="checkbox"
            value={data.id_purchase_detail}
            onClick={(e) => saveEntrance(data)}
          />
        )}
      </th>
      <td>{data.id_product.name}</td>
      <td>{data.id_product.color}</td>
      <td>{data.id_product.brand.name}</td>
      <td>S/.{data.price}</td>
      <td>{data.units}</td>
      <td>S/.{Number(data.price) * data.units}</td>
    </tr>
  );
};

export default Row;
