import BaseLayout from "@/components/BaseLayout"
import { Form } from "@/components/Brand/Form";
import { Modal } from "@/components/Modal";
import Pagination from "@/components/Pagination/Pagination";
import { Table } from "@/components/Table";
import { AdminMain } from "@/components/styled-component/AdminMain";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { IBrand, IGetAllBrand } from "@/models/brand.interface";
import { brand as brandService } from "@/services/brand.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

//? nombres de las columnas
//* la key es la key de las brand
//*segun estas propiedades es la información q mostrara
const colums = {
  name: "Nombre",
  createAt: "Fecha de creación"
};

const initialValues: IBrand = {
  name: "",
  createAt: "",
};

const BrandPage = () => {
  // estado de categorias y modal
  const [brand, setBrand] = useState<IGetAllBrand | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedBrand, setSelectedBrand] =
    useState<IBrand>(initialValues);

  // obtener categorias
  const getBrands = async (page: number = 1): Promise<void> => {
    const brand = await brandService.getAll(page);
    // console.log(brand.data);

    setBrand(brand);
  };

  // funcion para cerra el modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectedBrand.id_brand) setSelectedBrand(initialValues);
  };

  const handleOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const handleEditCategory = (id: string): void => {
    const category = brand?.data?.find((c) => c.id_brand === id);
    setSelectedBrand(category || initialValues);
    console.log(category);

    handleOpenModal();
  };

  const handleDeleteCategory = async (id: string): Promise<void> => {
    await brandService
      .delete(id)
      .then((res) => {
        Swal.fire(
          "Eliminado!",
          "El registro fue eliminado con éxito",
          "success"
        );
        getBrands();
      })
      .catch((err) => {
        Swal.fire({
          text: err.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <BaseLayout>
      <AdminMain>
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
                <h1 className="fw-bold fs-3">Marcas</h1>
              </div>
              <div className="d-flex align-items-center">
                <ButtonAddStyle type="button" onClick={handleOpenModal}>
                  <span className="d-d-inline-block me-3">Agregar</span>
                  <FaPlus />
                </ButtonAddStyle>
              </div>
            </div>
            <Table
              data={brand?.data as IBrand[]}
              colums={colums}
              crudButtons
              customButton={false}
              customButtonSale={false}
              customButtonTitle={""}
              customFunction={() => { }}
              editFunction={handleEditCategory}
              deleteFunction={handleDeleteCategory}
            />
            <Pagination actualPage={brand?.actualPage} nextPage={brand?.nextPage} totalPage={brand?.totalPages} prevPage={brand?.prevPage} getContentFn={getBrands} />
            <Modal
              title="Categoría"
              type={selectedBrand.id_brand ? "UPDATE" : "CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={handleCloseModal}
            >
              <Form
                type={selectedBrand.id_brand ? "UPDATE" : "CREATE"}
                title="Categoría"
                data={selectedBrand}
                handleCloseModal={handleCloseModal}
                getBrands={getBrands}
              />
            </Modal>
          </div>
        </div>
      </AdminMain>
    </BaseLayout>
  )
}

export default BrandPage