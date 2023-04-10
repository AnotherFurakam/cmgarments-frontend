import { IGetPurchase } from "@/models/purchase.interface";
import React from "react";
import { Table } from "./Table";
import { IEntrance } from "@/models/entrance.interface";

export interface FormInterface {
  data: IGetPurchase;
  checkEntrance: (data: IEntrance) => void;
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
}

const Form: React.FC<FormInterface> = ({
  data,
  checkEntrance,
  handleClick,
}) => {
  return (
    <div className="px-3 py-2">
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h4>Nro: {data.nro}</h4>
          <h6>{data.date_purchase.toLocaleString()}</h6>
        </div>
        <h6>Proveedor: {data.id_supplier.name}</h6>
        <h6>Celular: {data.id_supplier.phone}</h6>
        <div className="pb-3">
          <Table data={data.purchase_detail} checkEntrance={checkEntrance} />
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            GUARDAR
          </button>
          <h4 className="m-0">Total: S/.{data.total_price}</h4>
        </div>
      </div>
    </div>
  );
};

export default Form;
