import { ReactNode, useState, createContext } from "react";

const initialValue = {
  isCollapsedSidebar: false,
  toogleSidebarCollapsedHandler: () => {},
};

export const SidebarContext = createContext(initialValue);

interface Props {
  children: ReactNode | ReactNode[];
}

const SidebarProvider = ({ children }: Props) => {
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(false);

  const toogleSidebarCollapsedHandler = () => {
    setIsCollapsedSidebar((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{ isCollapsedSidebar, toogleSidebarCollapsedHandler }}
    >{children}</SidebarContext.Provider>
  );
};

export default SidebarProvider;
