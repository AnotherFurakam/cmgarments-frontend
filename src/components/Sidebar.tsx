import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { SidebarContext } from "./SidebarContext";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: "/dashboard.png",
  },
  {
    name: "Empleados",
    href: "/employee",
    icon: "/employee.png",
  },
  {
    name: "Productos",
    href: "/products",
    icon: "/products.png",
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: "/clients.png",
  },
  {
    name: "Categoria",
    href: "/category",
    icon: "/category.png",
  },
];

export default function Sidebar() {
  const withIco = 30;
  const heightIco = 30;

  const {isCollapsedSidebar, toogleSidebarCollapsedHandler} =
    useContext(SidebarContext);

  return (
    <div className="sidebar__wrapper">
      <button className="btn-sidebar" onClick={toogleSidebarCollapsedHandler}>
        <FiArrowLeft />
      </button>
      <aside className="sidebar" data-collapsed={isCollapsedSidebar}>
        <div className="sidebar__top">
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="sidebar__logo"
          />
          <p className="sidebar__logo-name">CM Garments</p>
        </div>
        <ul className="sidebar__list">
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
  );
}
