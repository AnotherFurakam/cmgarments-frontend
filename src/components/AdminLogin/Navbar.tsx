import Image from "next/image"
import { LogoContainer, NavbarContainer, NavbarLogoText } from "./styled-components/NavbarStyles"


const Navbar = () => {
  return (
    <NavbarContainer>
      <LogoContainer>
        <Image src={'/images/login/Logo.svg'} alt="logo" width={50} height={50}/>
        <NavbarLogoText>
          <h1>CM</h1>
          <span>GARMENTS</span>
        </NavbarLogoText>
      </LogoContainer>
    </NavbarContainer>
  )
}

export default Navbar