import React from "react";
import TableContainer from "./styled-component/TableContainer";
import TableHead from "./styled-component/TableHead";
import Tabule from "./styled-component/Table";
import TableBody from "./styled-component/TableBody";
import TableActionButton from "./styled-component/TableActionButton";
import { MdEdit } from "react-icons/md";
import { BsXLg } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import Link from "next/link";
export interface TableInterface {
  colums: any;
  data: any[] | null;
  crudButtons: boolean;
  customButton: boolean;
  customButtonTitle: string;
  editFunction: (id: any) => void;
  deleteFunction: (id: any) => void;
  goPurchaseDetail: (id: any) => void;
  customFunction: (id: any) => void;
}

const TablePurchase: React.FC<TableInterface> = ({
  colums,
  data,
  crudButtons = true,
  customButton = false,
  customButtonTitle = "Título del botón",
  editFunction,
  deleteFunction,
  goPurchaseDetail,
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

  const handleGetPurchaseDetail = (id: any) => {
    const id_purchase = goPurchaseDetail(id);
    return id_purchase;
  };

  const handleCustomAction = (id: any) => {
    customFunction(id);
  };

  return (
    <TableContainer>
      <Tabule>
        <TableHead>
          <tr>
            {colums &&
              Object.values(colums).map((column: any, index) => (
                <th className="px-2" key={index}>
                  {column}
                </th>
              ))}
            <th>OPCIONES</th>
          </tr>
        </TableHead>
        <TableBody>
          {data &&
            data.map((d) => {
              return (
                <tr key={Object.values<any>(d)[0]}>
                  {Object.keys(d).map((k, i) => {
                    return (
                      Object.keys(colums).find((nc) => nc === k) && (
                        <td key={i}>
                          <p className="m-0 text-truncate fw-semibold px-2">
                            {typeof Object.values<any>(d)[i] === "boolean"
                              ? Object.values<any>(d)[i] === true
                                ? "SI"
                                : "No"
                              : Object.values<any>(d)[i]}
                          </p>
                        </td>
                      )
                    );
                  })}
                  <td className="d-flex justify-content-center gap-2">
                    {crudButtons && (
                      <>
                        <TableActionButton
                          type="button"
                          color="#111D13"
                          onClick={() => handleEdit(Object.values<any>(d)[0])}
                        >
                          <MdEdit color="#fff" size={30} />
                        </TableActionButton>

                        <TableActionButton
                          type="button"
                          color="#BD4949"
                          onClick={() => handleDelete(Object.values<any>(d)[0])}
                        >
                          <BsXLg color="#fff" size={30} />
                        </TableActionButton>

                        <Link
                          href={`purchase/${handleGetPurchaseDetail(
                            Object.values<any>(d)[0]
                          )}`}
                        >
                          <TableActionButton
                            type="button"
                            color="#3d9d53"
                            onClick={() => {
                              handleGetPurchaseDetail(Object.values<any>(d)[0]);
                              console.log(
                                handleGetPurchaseDetail(
                                  Object.values<any>(d)[0]
                                )
                              );
                            }}
                          >
                            <IoEyeSharp color="#fff" size={30} />
                          </TableActionButton>
                        </Link>
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
                        <span>{customButtonTitle}</span>
                        <FaCog color="#fff" size={30} />
                      </TableActionButton>
                    )}
                  </td>
                </tr>
              );
            })}
        </TableBody>
      </Tabule>
    </TableContainer>
  );
};

export default TablePurchase;
