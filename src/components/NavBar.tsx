import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  role: string;
  surnames?: string;
  photoUrl?: any;
}

function NavBar({ name, surnames, role, photoUrl }: Props) {
  return (
    <nav className="navbar bg-maim">
      <div className="welcome-user-text d-flex align-items-center">
        <p className="navbar-brand fs-4 text-white m-0 mx-4">
          Buenos días, {name}
        </p>
        <Image
          src="/emoji.png"
          alt="logo"
          width={45}
          height={35}
          className="mx-2"
        />
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2 px-2 py-1">
        <Image
          src={photoUrl}
          alt="logo"
          width={45}
          height={45}
          className="mx-2"
        />
        <div className="d-block mx-3">
          <p className="m-0">
            {name} {surnames}
          </p>
          <p className="m-0 fw-bold">{role}</p>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
