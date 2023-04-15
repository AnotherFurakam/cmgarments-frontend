import BaseLayout from "@/components/BaseLayout";
import { Modal } from "@/components/Modal";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { Table } from "@/components/Table";
import { ISupplier } from "@/models/supplier.interface";
import { supplierService } from "@/services/supplier.service";
import { Form } from "@/components/Supplier/Form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const columns = {
  name: "Nombre",
  description: "Descripción",
  address: "Dirección",
  phone: "Telefono",
  ruc: "Ruc",
  state: "Estado",
};

const initialValues: ISupplier = {
  name: "",
  description: "",
  address: "",
  phone: "",
  ruc: "",
  state: true,
};

function Supplier() {
  const [suppliers, setSuppliers] = useState<ISupplier[] | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectSupplier, setSelectSupplier] =
    useState<ISupplier>(initialValues);

  //Limpiar data
  const cleanSupplier = (employee: ISupplier[]) => {
    const newSupplier = employee.map((e) => {
      const id_supplier = e.id_supplier;
      const name = e.name;
      const description = e.description;
      const address = e.address;
      const phone = e.phone;
      const ruc = e.ruc;
      const state = e.state ? "Habilitado" : "Deshabilitado";

      return {
        id_supplier,
        name,
        description,
        address,
        phone,
        ruc,
        state,
      };
    });

    setSuppliers(newSupplier);
  };

  // Obtener todos los proveedores
  const getSuppliers = async (): Promise<void> => {
    const suppliers = await supplierService.getAll();
    //console.log(suppliers.data);

    cleanSupplier(suppliers.data);
  };

  //Funcion para cerrar modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectSupplier.id_supplier) setSelectSupplier(initialValues);
  };

  const handleOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const handleEditLocal = (id: string): void => {
    const supplier = suppliers?.find((c) => c.id_supplier === id);
    setSelectSupplier(supplier || initialValues);
    console.log(supplier);

    handleOpenModal();
  };

  const handleDeleteEmployee = async (id: string): Promise<void> => {
    await supplierService
      .delete(id)
      .then((res) => {
        Swal.fire(
          "Eliminado!",
          "El registro fue eliminado con éxito",
          "success"
        );
        getSuppliers();
      })
      .catch((err) => {
        Swal.fire({
          text: err.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <BaseLayout>
      <div className="bg-main px-4 py-5">
        <div className="bg-white rounded-4">
          <div className="py-4 px-5">
            <div className="d-flex justify-content-between mt-2 mb-4">
              <div className="d-flex align-items-center">
                <Image
                  src="/images/png/employee-select.png"
                  alt="Categoría"
                  width={60}
                  height={60}
                  className="me-3 img-fluid"
                />
                <h1 className="fw-bold fs-3">Proveedores</h1>
              </div>
              <div className="d-flex align-items-center">
                <ButtonAddStyle type="button" onClick={handleOpenModal}>
                  <span className="d-d-inline-block me-3">Agregar</span>
                  <FaPlus />
                </ButtonAddStyle>
              </div>
            </div>
            <Table
              data={suppliers}
              colums={columns}
              crudButtons
              customButton={false}
              customButtonSale={false}
              customButtonTitle={""}
              customFunction={() => {}}
              editFunction={handleEditLocal}
              deleteFunction={handleDeleteEmployee}
            />
            <Modal
              title="Proveedor"
              type={selectSupplier.id_supplier ? "UPDATE" : "CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={handleCloseModal}
            >
              <Form
                type={selectSupplier.id_supplier ? "UPDATE" : "CREATE"}
                title="Proveedor"
                data={selectSupplier}
                handleCloseModal={handleCloseModal}
                getSuppliers={getSuppliers}
              />
            </Modal>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Supplier;
