import BaseLayout from "@/components/BaseLayout";
import React, { useEffect, useState } from "react";
import { ICategory } from "@/models/category.interface";
import { category } from "@/services/category.service";
import { Table } from "@/components/Table";

//? nombres de las columnas
//* la key es la key de las categories
//*segun estas propiedades es la información q mostrara
const colums = {
  name: "Nombre",
  sizes: "Tallas",
};

function Category() {
  const [categories, setCategories] = useState<ICategory[] | null>(null);

  useEffect(() => {
    const getCategories = async (): Promise<void> => {
      const categories = await category.getAll();
      // console.log(categories.data);

      setCategories(categories.data);
    };

    getCategories();
  }, []);

  return (
    <BaseLayout>
      <div className="bg-main px-4 py-5">
        <div className="bg-white rounded-4">
          <h1 className="fw-bold fs-3">Categoria</h1>
          <div className="py-4 px-5">
            <Table
              data={categories}
              colums={colums}
              crudButtons
              customButton={false}
              customButtonTitle={""}
              customFunction={() => {}}
              editFunction={() => {}}
              deleteFunction={() => {}}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Category;
