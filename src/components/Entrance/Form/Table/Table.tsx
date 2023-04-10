import React from "react";
import THead from "./THead";
import TBody from "./TBody";
import { IPurchaseDetail } from "@/models/purchase.interface";
import { IEntrance } from "@/models/entrance.interface";

export interface FormInterface {
  data: IPurchaseDetail[];
  checkEntrance: (data: IEntrance) => void;
}

const Table: React.FC<FormInterface> = ({ data, checkEntrance }) => {
  return (
    <div>
      <table className="table table-hover">
        <THead />
        <TBody data={data} checkEntrance={checkEntrance} />
      </table>
    </div>
  );
};

export default Table;
