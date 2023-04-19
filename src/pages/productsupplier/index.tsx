import BaseLayout from "@/components/BaseLayout";
import { Modal } from "@/components/Modal";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { Table } from "@/components/Table";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { IProductSupplier } from "@/models/productsupplier.interface";
import { productSupplierService } from "@/services/productsupplier.service";
import { Form } from "@/components/ProductSupplier/Form";
import { AdminMain } from "@/components/styled-component/AdminMain";

//? nombres de las columnas
//* la key es la key de las categories
//*segun estas propiedades es la información q mostrara
const colums = {
    id_supplier: "Proveedor",
    id_product: "Producto",
    unit_cost: "Costo Unitario",
};


const initialValues: IProductSupplier = {
    id_supplier: "",
    id_product: "",
    unit_cost: 0,
};

interface ICleanProductSupplier {
    id_productsupplier?: string;
    id_product?: string;
    id_supplier?: string;
    unit_cost: number;
  }

function ProductSupplier() {
  const [productsSupplierForTable, setProductSupplierForTable] = useState<ICleanProductSupplier[] | null>(null);
  const [productsSupplier, setProductSuplier] = useState<IProductSupplier[] | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectProductSupplier, setSelectProductSupplier] =
    useState<IProductSupplier>(initialValues);

  const cleanProductSupplier = (productSupplier: IProductSupplier[]) => {
    const newProductSupplier = productSupplier.map((e) => {
      const id_productsupplier = e.id_productsupplier;
      const id_product = e.product?.name;
      const id_supplier = e.supplier?.name;
      const unit_cost = e.unit_cost;

      return {
        id_productsupplier,
        id_product,
        id_supplier,
        unit_cost,
      };
    });

    setProductSupplierForTable(newProductSupplier);
  };

  // Obtener todos los Productos:
  const getProductSupplier = async (): Promise<void> => {
    const productSupplier = await productSupplierService.getAll();
    console.log(productSupplier.data);

    cleanProductSupplier(productSupplier.data);
    setProductSuplier(productSupplier.data);
  };

  //Funcion para cerrar modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectProductSupplier.id_productsupplier) setSelectProductSupplier(initialValues);
  };

  const handleOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const handleEditLocal = (id: string): void => {
    const productSupplier = productsSupplier?.find((p) => p.id_productsupplier === id);
    console.log("editProductoProveedorLocal",productSupplier);
    setSelectProductSupplier( productSupplier|| initialValues);
    handleOpenModal();
  };

  const handleDeleteProductSupplier = async (id: string): Promise<void> => {
    await productSupplierService
      .delete(id)
      .then((res) => {
        Swal.fire(
          "Eliminado!",
          "El registro fue eliminado con éxito",
          "success"
        );
        getProductSupplier();
      })
      .catch((err) => {
        Swal.fire({
          text: err.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getProductSupplier();
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
                  src="/images/png/product-select.png"
                  alt="ProductoProveedores"
                  width={60}
                  height={60}
                  className="me-3 img-fluid"
                />
                <h1 className="fw-bold fs-3">Productos de los Proveedores</h1>
              </div>
              <div className="d-flex align-items-center">
                <ButtonAddStyle type="button" onClick={handleOpenModal}>
                  <span className="d-d-inline-block me-3">Agregar</span>
                  <FaPlus />
                </ButtonAddStyle>
              </div>
            </div>
            <Table
              data={productsSupplierForTable}
              colums={colums}
              crudButtons
              customButton={false}
              customButtonTitle={""}
              customFunction={() => {}}
              editFunction={handleEditLocal}
              deleteFunction={handleDeleteProductSupplier}
            />
            <Modal
              title="ProductoProveedor"
              type={selectProductSupplier.id_productsupplier ? "UPDATE" : "CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={handleCloseModal}
            >
              <Form
                type={selectProductSupplier.id_productsupplier ? "UPDATE" : "CREATE"}
                title="ProductoProveedor"
                data={selectProductSupplier}
                handleCloseModal={handleCloseModal}
                getProductSupplier={getProductSupplier}
              />
            </Modal>
          </div>
        </div>
      </div>
      </AdminMain>
    </BaseLayout>
  );
}

export default ProductSupplier;
    