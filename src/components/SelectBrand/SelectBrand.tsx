import React, { useEffect, useState } from "react";
import { productService } from "@/services/product.service";
import { ProductsState, useProductStore } from "@/store/ProductStore";
import { shallow } from "zustand/shallow";
import { IBrand } from "@/models/brand.interface";
import { brand } from "@/services/brand.service";

const SelectBrand = () => {
  const [brands, setBrands] = useState<IBrand[] | null>(null);

  // manejador de estado global - Productos
  const productState: ProductsState = useProductStore(
    (state: ProductsState): ProductsState => state,
    shallow
  );

  const getBrands = async () => {
    const res = await brand.getAll();
    const data = res.data;
    setBrands(data);
  };

  const getAllProducts = async () => {
    productState.setProducts(await productService.getAll());
  };

  // manejar el cambio de select
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    if (value.trim() === "") {
      getAllProducts();
      return;
    }

    const res = await productService.getProductsByBrand(value);
    productState.setProducts(res);
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="brand">Marca: </label>
      <select
        id="brand"
        name="brand"
        className="form-select"
        style={{ minWidth: "180px" }}
        aria-label="Combobox Marca"
        onChange={handleChange}
      >
        <option value="">----</option>
        {brands !== null
          ? brands.map((c) => (
              <option key={c.id_brand} value={c.id_brand}>
                {c.name}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default SelectBrand;
