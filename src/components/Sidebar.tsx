import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { SidebarContext } from "./SidebarContext";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: "/dashboard.png",
  },
  {
    name: "Categoria",
    href: "/category",
    icon: "/category.png",
  },
  {
    name: "Marcas",
    href: "/brand",
    icon: "/category.png",
  },
  {
    name: "Productos",
    href: "/products",
    icon: "/products.png",
  },
  {
    name: "Proveedores",
    href: "/supplier",
    icon: "/employee.png",
  },
  {
    name: "Entradas",
    href: "/entrance",
    icon: "/products.png",
  },
  {
    name: "Empleados",
    href: "/employee",
    icon: "/employee.png",
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: "/clients.png",
  },
];

export default function Sidebar() {
  const withIco = 30;
  const heightIco = 30;

  const { isCollapsedSidebar, toogleSidebarCollapsedHandler } =
    useContext(SidebarContext);

  useEffect(() => {
    const htmlBody = document.querySelector(".content");
    if (isCollapsedSidebar) {
      htmlBody?.classList.add("content-padding");
    } else {
      htmlBody?.classList.remove("content-padding");
    }
  }, [isCollapsedSidebar]);

  return (
    <div className="container-sidebar">
      <div className="sidebar__wrapper">
        <button className="btn-sidebar" onClick={toogleSidebarCollapsedHandler}>
          <FiArrowLeft />
        </button>
        <aside className="sidebar" data-collapsed={isCollapsedSidebar}>
          <div className="sidebar__top justify-content-center">
            <div className="sidebar__logo-name align-items-center py-2">
              <Image
                src="/logo.png"
                alt="logo"
                width={90}
                height={90}
                className="sidebar__logo"
              />
              <h2 className="text-white sidebar__name">
                <span className="d-block text-center">CM</span>
                <span className="d-block text-center fs-6 fw-light">
                  Garments
                </span>
              </h2>
            </div>
          </div>
          <div className="container-sidebar d-flex align-items-center h-80">
            <ul className="sidebar__list w-100">
              {sidebarItems.map((item) => (
                <li className="sidebar__item" key={item.name}>
                  <Link href={item.href} className="sidebar__link">
                    <span className="sidebar__icon">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={withIco}
                        height={heightIco}
                      />
                    </span>
                    <span className="sidebar__name">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar__logout">
            <Link href="/" className="sidebar__link">
              <span className="sidebar__icon">
                <Image
                  src="/logout.png"
                  alt="logout"
                  width={withIco}
                  height={heightIco}
                />
              </span>
              <span className="sidebar__name">Cerrar Sesión</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
