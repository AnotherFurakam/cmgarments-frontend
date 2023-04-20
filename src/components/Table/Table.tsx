import React from "react";
import TableContainer from "./styled-component/TableContainer";
import TableHead from "./styled-component/TableHead";
import Tabule from "./styled-component/Table";
import TableBody from "./styled-component/TableBody";
import TableActionButton from "./styled-component/TableActionButton";
import { MdEdit } from "react-icons/md";
import {
    BsBank,
    BsEye,
    BsImages,
    BsInfoCircle,
    BsXLg,
    BsZoomIn,
} from "react-icons/bs";
// import { FaCog } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoEyeSharp } from "react-icons/io5";
import { FaBan, FaSmokingBan } from "react-icons/fa";
export interface TableInterface {
    colums: any;
    data: any[] | null | undefined;
    crudButtons: boolean;
    customButton: boolean;
    customButtonSale?: boolean;
    customButtonTitle: string;
    isDelete?: Boolean;
    isOptions?: Boolean;
    isEdit: Boolean;
    noOption?: Boolean;
    editFunction: (id: any) => void;
    deleteFunction: (id: any) => void;
    customFunction: (id: any) => void;
}

const Table: React.FC<TableInterface> = ({
    colums,
    data,
    crudButtons = true,
    customButton = false,
    customButtonSale = false,
    isDelete = false,
    isEdit = true,
    customButtonTitle = "Título del botón",
    isOptions = true,
    noOption = true,
    editFunction,
    deleteFunction,
    customFunction,
}) => {
    const handleEdit = (id: any) => {
        editFunction(id);
    };

    const handleDelete = (id: any, bol: Boolean) => {
        if (bol) {
            Swal.fire({
                title: "El registro ya está eliminado",
                icon: "error",
                confirmButtonColor: "#007BFF",
                confirmButtonText: "Entendido",
                iconColor: "#ffc15d",
            });
        } else {
            Swal.fire({
                title: "¿Esta seguro de eliminar el registro?",
                text: "Este tipo de cambios no son reversibles",
                icon: "question",
                cancelButtonColor: "#FF5151",
                showCancelButton: true,
                confirmButtonColor: "#007BFF",
                confirmButtonText: "Si, elimínalo",
                cancelButtonText: "Cancelar",
                iconColor: "#ffc15d",
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteFunction(id);
                }
            });
        }
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
                        {(crudButtons || customButtonSale) && <th>OPCIONES</th>}
                    </tr>
                </TableHead>
                <TableBody>
                    {data &&
                        data.map((d) => {
                            return (
                                <tr key={Object.values<any>(d)[0]}>
                                    {Object.keys(d).map((k, i) => {
                                        return (
                                            Object.keys(colums).find(
                                                (nc) => nc === k
                                            ) && (
                                                <td key={i}>
                                                    <p className="m-0 text-truncate fw-semibold px-2">
                                                        {typeof Object.values<any>(
                                                            d
                                                        )[i] === "boolean"
                                                            ? Object.values<any>(
                                                                  d
                                                              )[i] === true
                                                                ? "SI"
                                                                : "No"
                                                            : Object.values<any>(
                                                                  d
                                                              )[i]}
                                                    </p>
                                                </td>
                                            )
                                        );
                                    })}
                                    <td className="d-flex justify-content-center gap-2">
                                        {noOption && (
                                            <>
                                                {customButtonSale && (
                                                <>
                                                    <TableActionButton
                                                        type="button"
                                                        color="#246fff"
                                                        onClick={() =>
                                                            handleCustomAction(
                                                                Object.values<any>(
                                                                    d
                                                                )[0]
                                                            )
                                                        }
                                                    >
                                                        {/* <span>{customButtonTitle}</span> */}
                                                        <BsEye
                                                            color="#fff"
                                                            size={35}
                                                        />
                                                    </TableActionButton>
                                                </>
                                            )}
                                            {crudButtons ? (
                                                <>
                                                    {customButtonSale ? (
                                                        <TableActionButton
                                                            type="button"
                                                            color="#3d9d53"
                                                            onClick={() =>
                                                                handleCustomAction(
                                                                    Object.values<any>(
                                                                        d
                                                                    )[0]
                                                                )
                                                            }
                                                        >
                                                            <IoEyeSharp
                                                                color="#fff"
                                                                size={35}
                                                            />
                                                        </TableActionButton>
                                                    ) : (
                                                        <>
                                                            {isEdit && (
                                                                <TableActionButton
                                                                    type="button"
                                                                    color="#000000"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            Object.values<any>(
                                                                                d
                                                                            )[0]
                                                                        )
                                                                    }
                                                                >
                                                                    <MdEdit
                                                                        color="#fff"
                                                                        size={
                                                                            35
                                                                        }
                                                                    />
                                                                </TableActionButton>
                                                            )}
                                                        </>
                                                    )}
                                                    <TableActionButton
                                                        type="button"
                                                        color={
                                                            d.is_delete
                                                                ? "#690d0d"
                                                                : "#BD4949"
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                Object.values<any>(
                                                                    d
                                                                )[0],
                                                                d.is_delete
                                                            )
                                                        }
                                                    >
                                                        {d.is_delete ? (
                                                            <FaBan
                                                                color="#fff"
                                                                size={35}
                                                            />
                                                        ) : (
                                                            <BsXLg
                                                                color="#fff"
                                                                size={35}
                                                            />
                                                        )}
                                                    </TableActionButton>

                                                    <p></p>
                                                </>
                                            ) : (
                                                <div>
                                                    <TableActionButton
                                                        type="button"
                                                        color={
                                                            d.is_delete
                                                                ? "#690d0d"
                                                                : "#BD4949"
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                Object.values<any>(
                                                                    d
                                                                )[0],
                                                                d.is_delete
                                                            )
                                                        }
                                                    >
                                                        {d.is_delete ? (
                                                            <FaBan
                                                                color="#fff"
                                                                size={35}
                                                            />
                                                        ) : (
                                                            <BsXLg
                                                                color="#fff"
                                                                size={35}
                                                            />
                                                        )}
                                                    </TableActionButton>
                                                </div>
                                            )}
                                            </>
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

export default Table;
