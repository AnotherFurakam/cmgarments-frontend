import { category } from "@/services/category.service";
import React, { useEffect, useState } from "react";
import { ICategory } from "@/models/category.interface";
import { productService } from "@/services/product.service";
import { ProductsState, useProductStore } from "@/store/ProductStore";
import { shallow } from "zustand/shallow";

const SelectCategory = () => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  // manejador de estado global - Productos
  const productState: ProductsState = useProductStore(
    (state: ProductsState): ProductsState => state,
    shallow
  );

  const getCategories = async () => {
    const res = await category.getAll();
    const data = res.data;
    setCategories(data);
  };

  const getAllProducts = async () =>
    productState.setProducts(await productService.getAll());

  // manejar el cambio de select
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    if (value.trim() === "") {
      getAllProducts();
      return;
    }

    const res = await productService.getProductsByCategory(value);
    productState.setProducts(res);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="d-flex align-items-center gap-2">
      <label htmlFor="catagory">Categoría: </label>
      <select
        id="category"
        name="category"
        className="form-select"
        style={{ minWidth: "180px" }}
        aria-label="Conbobox Categoría"
        onChange={handleChange}
      >
        <option value="">----</option>
        {categories !== null
          ? categories.map((c) => (
              <option key={c.id_category} value={c.id_category}>
                {c.name}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default SelectCategory;
