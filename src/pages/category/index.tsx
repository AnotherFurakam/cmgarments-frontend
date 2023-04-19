import BaseLayout from "@/components/BaseLayout";
import React, { useEffect, useState } from "react";
import { ICategory } from "@/models/category.interface";
import { category } from "@/services/category.service";
import { Table } from "@/components/Table";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { Modal } from "@/components/Modal";
import { Form } from "@/components/Category/Form";
import Swal from "sweetalert2";
import { AdminMain } from "@/components/styled-component/AdminMain";
import Pagination from "@/components/Pagination/Pagination";
import { IGetAll } from "@/models/global.interface";

//? nombres de las columnas
//* la key es la key de las categories
//*segun estas propiedades es la información q mostrara
const colums = {
  name: "Nombre",
  sizes: "Tallas",
};

const initialValues: ICategory = {
  name: "",
  sizes: "",
  products: [],
};

function Category() {
  // estado de categorias y modal
  const [categories, setCategories] = useState<IGetAll<ICategory> | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategory>(initialValues);

  // obtener categorias
  const getCategories = async (page: number = 1): Promise<void> => {
    const categories = await category.getAll(page);
    setCategories(categories);
  };

  // funcion para cerra el modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectedCategory.id_category) setSelectedCategory(initialValues);
  };

  const handleOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const handleEditCategory = (id: string): void => {
    const category = categories?.data.find((c) => c.id_category === id);
    setSelectedCategory(category || initialValues);
    console.log(category);

    handleOpenModal();
  };

  const handleDeleteCategory = async (id: string): Promise<void> => {
    await category
      .delete(id)
      .then((res) => {
        Swal.fire(
          "Eliminado!",
          "El registro fue eliminado con éxito",
          "success"
        );
        getCategories();
      })
      .catch((err) => {
        Swal.fire({
          text: err.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <BaseLayout>
    <AdminMain>
      <div className="bg-main px-4 py-5">
        <div className="bg-white rounded-4">
          <div className="py-4 px-5">
            <div className="d-flex justify-content-between mt-2 mb-4">
              <div className="d-flex align-items-center">
                <Image
                  src="/images/png/category-select.png"
                  alt="Categoría"
                  width={60}
                  height={60}
                  className="me-3 img-fluid"
                />
                <h1 className="fw-bold fs-3">Categoria</h1>
              </div>
              <div className="d-flex align-items-center">
                <ButtonAddStyle type="button" onClick={handleOpenModal}>
                  <span className="d-d-inline-block me-3">Agregar</span>
                  <FaPlus />
                </ButtonAddStyle>
              </div>
            </div>
            <Table
              data={categories?.data}
              colums={colums}
              crudButtons
              customButton={false}
              customButtonSale={false}
              customButtonTitle={""}
              customFunction={() => {}}
              editFunction={handleEditCategory}
              deleteFunction={handleDeleteCategory}
            />
            <Pagination
              actualPage={categories?.actualPage}
              nextPage={categories?.nextPage}
              totalPage={categories?.totalPages}
              prevPage={categories?.prevPage}
              getContentFn={getCategories}
            />
            <Modal
              title="Categoría"
              type={selectedCategory.id_category ? "UPDATE" : "CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={handleCloseModal}
            >
              <Form
                type={selectedCategory.id_category ? "UPDATE" : "CREATE"}
                title="Categoría"
                data={selectedCategory}
                handleCloseModal={handleCloseModal}
                getCategories={getCategories}
              />
            </Modal>
          </div>
        </div>
      </div>
      </AdminMain>
    </BaseLayout>
  );
}

export default Category;
