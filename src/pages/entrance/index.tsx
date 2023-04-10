import BaseLayout from "@/components/BaseLayout";
import React, { useEffect, useState } from "react";
import { Table } from "@/components/Table";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { Modal } from "@/components/Modal";
import Form from "@/components/Entrance/Form/Form";
import Swal from "sweetalert2";
import { entranceService } from "@/services/entrance.service";
import { IEntrance } from "@/models/entrance.interface";
import { IGetAll } from "@/models/global.interface";
import Pagination from "@/components/Pagination/Pagination";
import SearchPurchase from "@/components/Entrance/SearchPurchase";
import { purchaseService } from "@/services/purchase.service";
import { IGetPurchase } from "@/models/purchase.interface";

// //* interface para la información de la tabla
// interface ICleanEntrance {
//   id_entrance?: string;
//   description: string;
//   product: string;
//   supplier: string;
//   units: number;
//   unit_cost: number;
//   total_price: number;
//   deliver_date?: string;
// }

//? nombres de las columnas
//* la key es la key de las categories
//*segun estas propiedades es la información q mostrara
const colums = {
  description: "Descripción",
  units: "Unidades",
  unit_cost: "Costo Unitario",
  total_price: "Precio Total",
  // create_at: "Fecha Entrega",
};

const initialValues: IEntrance = {
  id_entrance: "",
  description: "",
  units: 0,
  unit_cost: "",
};

function Entrance() {
  // estado de categorias y modal
  const [entrances, setEntrances] = useState<IGetAll<IEntrance> | null>(null);
  // const [entrancesTable, setEntrancesTable] = useState<ICleanEntrance[] | null>(
  //   null
  // );
  const [purchase, setPurchase] = useState<IGetPurchase | null>(null);
  const [detailEntrance, setDetailEntrance] = useState<IEntrance[] | null>(
    null
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [selectedEntrances, setSelectedEntrances] =
  //   useState<IEntrance>(initialValues);

  // const cleanEntrances = (product: IEntrance[]) => {
  //   const newProduct: ICleanEntrance[] = product.map((e) => {
  //     const id_entrance = e.id_entrance;
  //     const description = e.description;
  //     const product = e.product.name;
  //     const supplier = e.supplier.name;
  //     const units = e.units;
  //     const unit_cost = e.unit_cost;
  //     const total_price = units * unit_cost;
  //     const deliver_date = e.create_at;

  //     return {
  //       id_entrance,
  //       description,
  //       product,
  //       supplier,
  //       units,
  //       unit_cost,
  //       total_price,
  //       deliver_date,
  //     };
  //   });

  //   setEntrancesTable(newProduct);
  // };

  // obtener categorias
  const getEntrances = async (page: number = 1): Promise<void> => {
    const entrance = await entranceService.getAll(page);
    setEntrances(entrance);
  };

  // funcion para cerra el modal
  const handleCloseModal = (): void => {
    setIsOpenModal(false);
    if (purchase?.id_purchase) setPurchase(null);
    if (detailEntrance !== null && detailEntrance?.length > 0)
      setPurchase(null);
  };

  const handleOpenModal = (): void => setIsOpenModal(true);

  const searchPurchase = async (nro: number) => {
    const data = await purchaseService.getByNumber(nro);
    setPurchase(data);
    handleOpenModal();
  };

  const checkEntrance = (data: IEntrance) => {
    console.log("entro");

    data.description = data.description + purchase?.id_supplier.name;

    if (detailEntrance !== null) {
      const exists = detailEntrance.some(
        (detail) => detail.id_purchase_detail === data.id_purchase_detail
      );

      if (exists) {
        const newDetail = detailEntrance.filter(
          (detail) => detail.id_purchase_detail !== data.id_purchase_detail
        );
        setDetailEntrance([...newDetail]);
        return;
      } else setDetailEntrance([...detailEntrance, data]);
    } else {
      setDetailEntrance([data]);
    }
  };

  const saveEntrance = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await detailEntrance?.forEach(async (d) => {
      const data = await entranceService.create(d);
    });
    handleCloseModal();
  };

  // const handleEditEntrance = (id: string): void => {
  //   const entrance = entrances?.data.find((c) => c.id_entrance === id);
  //   setSelectedEntrances(entrance || initialValues);
  //   // console.log(entrance);P

  //   handleOpenModal();
  // };

  //! implementar a futuro
  // const handleDeleteEntrance = async (id: string): Promise<void> => {
  //   await entranceService
  //     .delete(id)
  //     .then((res) => {
  //       Swal.fire(
  //         "Eliminado!",
  //         "El registro fue eliminado con éxito",
  //         "success"
  //       );
  //       getEntrances();
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         text: err.message,
  //         icon: "error",
  //       });
  //     });
  // };

  useEffect(() => {
    getEntrances();
  }, []);

  useEffect(() => {
    getEntrances();
  }, [purchase]);

  useEffect(() => {
    console.log(detailEntrance);
  }, [detailEntrance]);

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
                <SearchPurchase search={searchPurchase} />
              </div>
            </div>
            {entrances !== null ? (
              <Table
                data={entrances.data}
                colums={colums}
                crudButtons
                customButton={false}
                customButtonTitle={""}
                customFunction={() => {}}
                editFunction={() => {}}
                deleteFunction={() => {}}
              />
            ) : (
              <h2>No hay Entrada de Productos</h2>
            )}
            <Pagination
              actualPage={entrances?.actualPage}
              nextPage={entrances?.nextPage}
              totalPage={entrances?.totalPages}
              prevPage={entrances?.prevPage}
              getContentFn={getEntrances}
            />
            <Modal
              title="Entrada"
              type={"CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={handleCloseModal}
            >
              {purchase !== null ? (
                <Form
                  data={purchase}
                  checkEntrance={checkEntrance}
                  handleClick={saveEntrance}
                />
              ) : null}
            </Modal>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Entrance;
