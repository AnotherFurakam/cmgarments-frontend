import BaseLayout from "@/components/BaseLayout";
import { Modal } from "@/components/Modal";
import { Form } from "@/components/purchase/Form";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { Table } from "@/components/Table";
import TablePurchase from "@/components/Table-Purchase/Table";
import { IPurchase } from "@/models/purchase.interface";
import { purchaseService } from "@/services/purchase.service";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const columns = {
  description: "Description",
  total_price: "Precio total",
  date_purchase: "Fecha de compra",
  id_supplier: "Proveedor",
};

const initialValues: IPurchase = {
  description: "",
  total_price: 0,
  date_purchase: "",
};

interface ICleanPurchase {
  id_purchase?: string;
  description: string;
  total_price: number;
  date_purchase: string;
  id_supplier?: string;
}

// ----------------

function Purchase() {
  const [purchaseForTable, setPurchaseForTable] = useState<
    ICleanPurchase[] | null
  >(null);
  const [purchases, setPurchases] = useState<IPurchase[] | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectPurchase, setSelectPurchase] =
    useState<IPurchase>(initialValues);

  //Limpiar data
  const cleanPurchase = (purchase: IPurchase[]) => {
    const newPurchase = purchase.map((e) => {
      const id_purchase = e.id_purchase;
      const total_price = e.total_price;
      const description = e.description;
      const date_purchase = e.date_purchase;
      const id_supplier = e.id_supplier?.name;
      console.log(id_supplier);

      return {
        id_purchase,
        total_price,
        description,
        date_purchase,
        id_supplier,
      };
    });

    setPurchaseForTable(newPurchase);
    console.log(newPurchase);
  };

  // Obtener todos los Productos:
  const getPurchase = async (): Promise<void> => {
    const purchase = await purchaseService.getAll();
    console.log(purchase.data);

    cleanPurchase(purchase.data);
    setPurchases(purchase.data);
  };

  //Funcion para cerrar modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectPurchase.id_purchase) setSelectPurchase(initialValues);
  };

  const handleOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const handleEditPurchase = (id: string): void => {
    const purchase = purchases?.find((p) => p.id_purchase === id);
    console.log("editProductoLocal", purchase);
    setSelectPurchase(purchase || initialValues);
    handleOpenModal();
  };

  const getPurchaseDetailByIdPurchase = (id: string) => {
    const purchase = purchases?.find((p) => p.id_purchase === id);
    const id_purchase = purchase?.id_purchase;
    return id_purchase
  };

  const handleDeletePurchase = async (id: string): Promise<void> => {
    await purchaseService
      .delete(id)
      .then((res) => {
        Swal.fire(
          "Eliminado!",
          "El registro fue eliminado con éxito",
          "success"
        );
        getPurchase();
      })
      .catch((err) => {
        Swal.fire({
          text: err.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getPurchase();
  }, []);

  return (
    <BaseLayout>
      <div className="bg-main px-4 py-5">
        <div className="bg-white rounded-4">
          <div className="py-4 px-5">
            <div className="d-flex justify-content-between mt-2 mb-4">
              <div className="d-flex align-items-center">
                <Image
                  src="/images/png/product-select.png"
                  alt="Producto"
                  width={60}
                  height={60}
                  className="me-3 img-fluid"
                />
                <h1 className="fw-bold fs-3">Compras</h1>
              </div>
              <div className="d-flex align-items-center">
                <ButtonAddStyle type="button" onClick={handleOpenModal}>
                  <span className="d-d-inline-block me-3">Agregar</span>
                  <FaPlus />
                </ButtonAddStyle>
              </div>
            </div>
            <TablePurchase
              data={purchaseForTable}
              colums={columns}
              crudButtons
              customButton={false}
              customButtonTitle={""}
              customFunction={() => {}}
              editFunction={handleEditPurchase}
              deleteFunction={handleDeletePurchase} //Eliminar
              goPurchaseDetail={getPurchaseDetailByIdPurchase} //Ir a detalle de la compra
            />
            <Modal
              title="Compra"
              type={selectPurchase.id_purchase ? "UPDATE" : "CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={handleCloseModal}
            >
              <Form
                type={selectPurchase.id_purchase ? "UPDATE" : "CREATE"}
                title="Compra"
                data={selectPurchase}
                handleCloseModal={handleCloseModal}
                getPurchase={getPurchase}
              />
            </Modal>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Purchase;
