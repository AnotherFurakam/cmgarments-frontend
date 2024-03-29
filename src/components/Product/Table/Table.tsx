import React from "react";
import TableContainer from "../../Table/styled-component/TableContainer";
import TableHead from "../../Table/styled-component/TableHead";
import Tabule from "../../Table/styled-component/Table";
import TableBody from "../../Table/styled-component/TableBody";
import TableActionButton from "../../Table/styled-component/TableActionButton";
import Truncate from "../../styled-component/forms/truncate";
import { MdEdit } from "react-icons/md";
import { BsImages, BsXLg } from "react-icons/bs";
// import { FaCog } from "react-icons/fa";
import Swal from "sweetalert2";
import { IProduct } from "@/models/product.interface";
export interface TableInterface {
  colums: any;
  data: IProduct[] | null | undefined;
  crudButtons: boolean;
  customButton: boolean;
  customButtonTitle: string;
  editFunction: (id: any) => void;
  deleteFunction: (id: any) => void;
  customFunction: (id: any) => void;
}

const Table: React.FC<TableInterface> = ({
  colums,
  data,
  crudButtons = true,
  customButton = false,
  customButtonTitle = "Título del botón",
  editFunction,
  deleteFunction,
  customFunction,
}) => {
  const handleEdit = (id: any) => {
    editFunction(id);
  };

  const handleDelete = (id: any) => {
    Swal.fire({
      title: "¿Esta seguro de eliminar el registro?",
      text: "Este tipo de cambios no son reversibles",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007BFF",
      cancelButtonColor: "#FF5151",
      confirmButtonText: "Si, elimínalo",
      cancelButtonText: "Cancelar",
      iconColor: "#ffc15d",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFunction(id);
      }
    });
  };

  const handleCustomAction = (id: any) => {
    customFunction(id);
  };

  return (
    <TableContainer>
      <Tabule>
        <TableHead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Talla</th>
            <th>Marca</th>
            <th>Genero</th>
            <th>Descripciónn</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Color</th>
            <th>Estado</th>
            <th>OPCIONES</th>
          </tr>
        </TableHead>
        <TableBody>
          {data &&
            data.map((d) => {
              return (
                <tr className="" key={Object.values<any>(d)[0]}>
                  <Truncate>{d.name}</Truncate>
                  <Truncate>{d.category?.name}</Truncate>
                  <Truncate>{d.size}</Truncate>
									<Truncate>{d.brand?.name}</Truncate>
                  <Truncate>{d.gender}</Truncate>
                  <Truncate>{d.description}</Truncate>
                  <Truncate>{d.stock}</Truncate>
                  <Truncate>{d.price}</Truncate>
                  <Truncate>{d.color}</Truncate>
                  <Truncate>{d.state ? 'Habilitado' : 'Desabilitado'}</Truncate>
                  <Truncate className="d-flex justify-content-center gap-2">
                    {crudButtons && (
                      <>
                        <TableActionButton
                          type="button"
                          color="#111D13"
                          onClick={() => handleEdit(Object.values<any>(d)[0])}
                        >
                          <MdEdit color="#fff" size={35} />
                        </TableActionButton>
                        <TableActionButton
                          type="button"
                          color="#BD4949"
                          onClick={() => handleDelete(Object.values<any>(d)[0])}
                        >
                          <BsXLg color="#fff" size={35} />
                        </TableActionButton>
                      </>
                    )}
                    {customButton && (
                      <TableActionButton
                        type="button"
                        color="#246fff"
                        onClick={() =>
                          handleCustomAction(Object.values<any>(d)[0])
                        }
                      >
                        {/* <span>{customButtonTitle}</span> */}
                        <BsImages color="#fff" size={35} />
                      </TableActionButton>
                    )}
                  </Truncate>
                </tr>
              );
            })}
        </TableBody>
      </Tabule>
    </TableContainer>
  );
};

export default Table;

