import React, { useState } from "react";
import ButtonAddStyle from "../styled-component/ButtonAddStyle";
import { FiSearch } from "react-icons/fi";

export interface FormInterface {
  search: (nro: number) => Promise<void>;
}

const SearchPurchase: React.FC<FormInterface> = ({ search }) => {
  const [nro, setNro] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!nro) return;
    search(Number(nro));
    setNro("");
  };

  return (
    <div className="d-flex gap-1">
      <input
        type="number"
        min={0}
        className="form-control"
        placeholder="Número Compra"
        value={nro}
        onChange={(e) => setNro(e.currentTarget.value)}
      />
      <ButtonAddStyle onClick={handleClick}>
        <FiSearch />
      </ButtonAddStyle>
    </div>
  );
};

export default SearchPurchase;
