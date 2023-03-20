import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import { IPurchaseDetail } from "@/models/purchase-detail.interface";
import { purchaseDetailService } from "@/services/purchase-detail.service";
import Swal from "sweetalert2";
import Image from "next/image";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { FaPlus } from "react-icons/fa";
import { Table } from "@/components/Table";
import { Modal } from "@/components/Modal";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { Form } from "@/components/purchase_detail/Form";

const columns = {
  units: "Unidades",
  total_price: "Precio total",
  id_product: "Producto",
};

const initialValues: IPurchaseDetail = {
  units: 0,
  total_price: 0,
  product: "",
  purchase: "",
};

interface ICleanPurchaseDetail {
  id_purchase_detail?: string;
  units: number;
  total_price: number;
  id_product?: string;
}

function PurchaseDetail() {
  //Obtener el id de la ruta:
  const router: NextRouter = useRouter();
  const { id } = router.query;

  const [purchaseForTable, setPurchaseForTable] = useState<
    ICleanPurchaseDetail[] | null
  >(null);
  const [purchaseDetails, setPurchaseDetails] = useState<
    IPurchaseDetail[] | null
  >(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectPurchaseDetails, setSelectPurchaseDetails] =
    useState<IPurchaseDetail>(initialValues);

  //Limpiar data
  const cleanPurchaseDetails = (purchase: IPurchaseDetail[]) => {
    const newPurchaseDetail = purchase.map((e) => {
      const id_purchase_detail = e.id_purchase_detail;
      const total_price = e.total_price;
      const units = e.units;
      const id_product = e.id_product?.name;
      const id_purchase = e.id_purchase?.description;
      console.log(id_purchase);

      return {
        id_purchase_detail,
        total_price,
        units,
        id_product,
        id_purchase,
      };
    });

    setPurchaseForTable(newPurchaseDetail);
    console.log(newPurchaseDetail);
  };

  // Obtener todos los Productos:
  const getPurchase = async (): Promise<void> => {
    const purchase = await purchaseDetailService.getAllByIdPurchase(id);
    console.log(purchase.data);
    cleanPurchaseDetails(purchase.data);
    setPurchaseDetails(purchase.data);
  };

  //Funcion para cerrar modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectPurchaseDetails.id_purchase)
      setSelectPurchaseDetails(initialValues);
  };

  const handleOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const handleEditPurchase = (id: string): void => {
    const purchase = purchaseDetails?.find((p) => p.id_purchase_detail === id);
    console.log("editProductoLocal", purchase);
    setSelectPurchaseDetails(purchase || initialValues);
    handleOpenModal();
  };

  const handleDeletePurchase = async (id: string): Promise<void> => {
    await purchaseDetailService
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
              <h1 className="fw-bold fs-3">Detalle de compras</h1>
            </div>
            <div className="d-flex align-items-center">
              <ButtonAddStyle type="button" onClick={handleOpenModal}>
                <span className="d-d-inline-block me-3">Agregar</span>
                <FaPlus />
              </ButtonAddStyle>
            </div>
          </div>

          <Table
            data={purchaseForTable}
            colums={columns}
            crudButtons
            customButton={false}
            customButtonTitle={""}
            customFunction={() => {}}
            editFunction={handleEditPurchase}
            deleteFunction={handleDeletePurchase} //Eliminar
          />
          <Link
            href={"/purchase"}
            className="text-decoration-none d-flex gap-2"
          >
            <BiArrowBack size={40} color="black" />
            <h3 className="text-dark">Regresar</h3>
          </Link>
          <Modal
            title="Detalle de Compra"
            type={
              selectPurchaseDetails.id_purchase_detail ? "UPDATE" : "CREATE"
            }
            isOpen={isOpenModal}
            handleCloseModal={handleCloseModal}
          >
            <Form
              id_compra={id}
              type={
                selectPurchaseDetails.id_purchase_detail ? "UPDATE" : "CREATE"
              }
              title="Compra"
              data={selectPurchaseDetails}
              handleCloseModal={handleCloseModal}
              getPurchaseDetail={getPurchase}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetail;
