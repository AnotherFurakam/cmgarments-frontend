import BaseLayout from "@/components/BaseLayout";
import Pagination from "@/components/Pagination/Pagination";
import { Table } from "@/components/Table";
import { AdminMain } from "@/components/styled-component/AdminMain";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { ICustomer } from "@/models/customer.interface";
import { IGetAll } from "@/models/global.interface";
import { customerService } from "@/services/customer.service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const colums = {
  names: "Nombre",
  last_name: "Apellidos",
  dni: "DNI",
  phone_number: "Celular",
  email: "Email",
  create_at: "F. creación",
};

function Clients() {
  // estado de categorias y modal
  const [customer, setCustomer] = useState<IGetAll<Object> | null>(null);

  // obtener categorias
  const getCustomers = async (page: number = 1): Promise<void> => {
    try {
      const data = await customerService.getAll(page);
      const newData = data.data.map((c) => {
        return {
          id_customer: c.id_customer,
          names: c.names,
          last_name: `${c.first_lastname} ${c.second_lastname}`,
          dni: c.dni,
          phone_number: c.phone_number,
          email: c.email,
          create_at: c.create_at,
        };
      });

      setCustomer({ ...data, data: newData });
    } catch (error) {}
  };

  useEffect(() => {
    getCustomers();
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
                  <h1 className="fw-bold fs-3">Clientes</h1>
                </div>
                {/* <div className="d-flex align-items-center">
                  <ButtonAddStyle type="button" onClick={() => {}}>
                    <span className="d-d-inline-block me-3">Agregar</span>
                    <FaPlus />
                  </ButtonAddStyle>
                </div> */}
              </div>
              <Table
                data={customer?.data}
                colums={colums}
                crudButtons={false}
                customButton={false}
                customButtonTitle={""}
                customFunction={() => {}}
                editFunction={() => {}}
                deleteFunction={() => {}}
              />
              <Pagination
                actualPage={customer?.actualPage}
                nextPage={customer?.nextPage}
                totalPage={customer?.totalPages}
                prevPage={customer?.prevPage}
                getContentFn={getCustomers}
              />
            </div>
          </div>
        </div>
      </AdminMain>
    </BaseLayout>
  );
}

export default Clients;
