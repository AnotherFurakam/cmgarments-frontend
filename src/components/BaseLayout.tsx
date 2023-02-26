import { ReactNode } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode | ReactNode[];
}

function BaseLayout({ children }: Props) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <NavBar
          name="Wilmer"
          role="Admin"
          surnames="Reluz"
          photoUrl="/photoprofile.png"
        />
        {children}
      </div>
    </div>
  );
}

export default BaseLayout;
