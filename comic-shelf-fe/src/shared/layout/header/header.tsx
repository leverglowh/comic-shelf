import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'src/shared/reducers/hooks';
import { getMe, updateUser } from 'src/shared/reducers/authentication';
import { saveItemToLocalStorage } from 'src/shared/util/general-utils';

import './header.scss';

const Header: React.FC = (props) => {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.authentication.user);
  const isAuthLoading = useAppSelector((state) => state.authentication.loading);
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMe());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      let private_key = localStorage.getItem('PRIVATE_API_KEY');
      let public_key = localStorage.getItem('PUBLIC_API_KEY');
      let shouldUpdateCredentialToDB = 0;
      const regex = /^[a-z0-9]+$/;
      if (!public_key) {
        public_key = user.marvelAPICredentials?.public || null;
        if (!public_key) shouldUpdateCredentialToDB++;
        while (!public_key) {
          public_key = prompt('Need API public key');
        }
        saveItemToLocalStorage('PUBLIC_API_KEY', public_key);
      }
      if (!private_key) {
        private_key = user.marvelAPICredentials?.private || null;
        if (!private_key) shouldUpdateCredentialToDB++;
        while (!private_key) {
          private_key = prompt('Need API private key');
          if (!private_key || private_key.length < 40 || !regex.test(private_key)) private_key = null;
        }
        saveItemToLocalStorage('PRIVATE_API_KEY', private_key);
      }
      if (shouldUpdateCredentialToDB) updateMarvelCredentials(public_key, private_key);
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const updateMarvelCredentials = (publicKey: string, privateKey: string) => {
    updateUser({ ...user, marvelAPICredentials: { public: publicKey, private: privateKey } });
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  const refresh = () => {
    if (isAuthLoading) return;
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div id='header'>
      <Navbar bg='light' expand>
        <NavbarBrand href='/'>ComicShelf</NavbarBrand>
        <Nav className='mr-auto' navbar>
          <NavItem>
            <Link className='nav-link' to='/series'>
              Series
            </Link>
          </NavItem>
          <NavItem>
            <a
              target="_blank"
              rel="noreferrer"
              className="nav-link"
              href="https://github.com/leverglowh/comic-shelf"
            >GitHub</a>
          </NavItem>
        </Nav>
        <div className='header-float-right'>
          {isAuthenticated ? (
            <Dropdown navbar show={isAccountMenuOpen} onToggle={toggleAccountMenu}>
              <DropdownToggle id={user.username}>{user.username}</DropdownToggle>
              <DropdownMenu align='right'>
                <DropdownItem href='/logout'>logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div>
              <Link className='nav-link' to='/login'>
                login
              </Link>
            </div>
          )}
          <img
            title='Clear cache'
            onClick={refresh}
            id='refresh-but'
            src={process.env.PUBLIC_URL + '/svg/refresh.svg'}
            alt='refresh'
            width='20px'
          />
        </div>
        {/* <NavbarText>Simple Text</NavbarText> */}
      </Navbar>
    </div>
  );
};

export default Header;
