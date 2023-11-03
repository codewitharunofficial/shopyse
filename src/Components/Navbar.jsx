import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #016289;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    width: 90%;
  }
`;

const Logo = styled.a`
  color: #fff;
  font-size: 24px;
  text-decoration: none;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavItem = styled.li`
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <Logo href="/">Your Logo</Logo>
      <NavList>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/profile">My Account</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/cart">Cart(0)</NavLink>
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
}

export default Navbar;
