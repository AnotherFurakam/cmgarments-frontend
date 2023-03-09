import BaseLayout from "@/components/BaseLayout";
import React, { useEffect, useState } from "react";
import { Table } from "@/components/Table";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { Modal } from "@/components/Modal";
import { Form } from "@/components/Entrance/Form";
import Swal from "sweetalert2";
import { entranceService } from "@/services/entrance.service";
import { IGetEntrance } from "@/models/entrance.interface";
import { IGetAll } from "@/models/global.interface";
import Pagination from "@/components/Pagination/Pagination";

//* interface para la información de la tabla
interface ICleanEntrance {
  id_entrance?: string;
  description: string;
  product: string;
  supplier: string;
  units: number;
  unit_cost: number;
  total_price: number;
  deliver_date?: string;
}

//? nombres de las columnas
//* la key es la key de las categories
//*segun estas propiedades es la información q mostrara
const colums = {
  description: "Descripción",
  product: "Producto",
  supplier: "Proveedor",
  units: "Unidades",
  unit_cost: "Costo Unitario",
  total_price: "Precio Total",
  deliver_date: "Fecha Entrega",
};

const initialValues: IGetEntrance = {
  id_entrance: "",
  description: "",
  units: 0,
  unit_cost: 0,
  product: {
    id_product: "",
    name: "",
  },
  supplier: {
    id_supplier: "",
    name: "",
  },
};

function Entrance() {
  // estado de categorias y modal
  const [entrances, setEntrances] = useState<IGetAll<IGetEntrance> | null>(
    null
  );
  const [entrancesTable, setEntrancesTable] = useState<ICleanEntrance[] | null>(
    null
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedEntrances, setSelectedEntrances] =
    useState<IGetEntrance>(initialValues);

  const cleanEntrances = (product: IGetEntrance[]) => {
    const newProduct: ICleanEntrance[] = product.map((e) => {
      const id_entrance = e.id_entrance;
      const description = e.description;
      const product = e.product.name;
      const supplier = e.supplier.name;
      const units = e.units;
      const unit_cost = e.unit_cost;
      const total_price = units * unit_cost;
      const deliver_date = e.create_at;

      return {
        id_entrance,
        description,
        product,
        supplier,
        units,
        unit_cost,
        total_price,
        deliver_date,
      };
    });

    setEntrancesTable(newProduct);
  };

  // obtener categorias
  const getEntrances = async (page: number = 1): Promise<void> => {
    // const categories = await category.getAll();
    const entrance = await entranceService.getAll(page);
    // console.log(product.data);

    cleanEntrances(entrance.data);
    setEntrances(entrance);
  };

  // funcion para cerra el modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectedEntrances.id_entrance) setSelectedEntrances(initialValues);
  };

  const handleOpenModal = (): void => {
    setIsOpenModal(true);
  };

  const handleEditEntrance = (id: string): void => {
    const entrance = entrances?.data.find((c) => c.id_entrance === id);
    setSelectedEntrances(entrance || initialValues);
    // console.log(entrance);

    handleOpenModal();
  };

  const handleDeleteEntrance = async (id: string): Promise<void> => {
    await entranceService
      .delete(id)
      .then((res) => {
        Swal.fire(
          "Eliminado!",
          "El registro fue eliminado con éxito",
          "success"
        );
        getEntrances();
      })
      .catch((err) => {
        Swal.fire({
          text: err.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getEntrances();
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
                <h1 className="fw-bold fs-3">Entradas</h1>
              </div>
              <div className="d-flex align-items-center">
                <ButtonAddStyle type="button" onClick={handleOpenModal}>
                  <span className="d-d-inline-block me-3">Agregar</span>
                  <FaPlus />
                </ButtonAddStyle>
              </div>
            </div>
            <Table
              data={entrancesTable}
              colums={colums}
              crudButtons
              customButton={false}
              customButtonTitle={""}
              customFunction={() => {}}
              editFunction={handleEditEntrance}
              deleteFunction={handleDeleteEntrance}
            />
            <Pagination
              actualPage={entrances?.actualPage}
              nextPage={entrances?.nextPage}
              totalPage={entrances?.totalPages}
              prevPage={entrances?.prevPage}
              getContentFn={getEntrances}
            />
            <Modal
              title="Entrada"
              type={selectedEntrances.id_entrance ? "UPDATE" : "CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={handleCloseModal}
            >
              <Form
                type={selectedEntrances.id_entrance ? "UPDATE" : "CREATE"}
                title="Categoría"
                data={selectedEntrances}
                handleCloseModal={handleCloseModal}
                getEntrances={getEntrances}
              />
            </Modal>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Entrance;
