import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { IRootState } from 'src/shared/reducers';
import { getMe, updateUser } from 'src/shared/reducers/authentication';
import { saveItemToLocalStorage } from 'src/shared/util/general-utils';

import './header.scss';

export interface IHeaderProps extends StateProps, DispatchProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  useEffect(() => {
    props.getMe();
  }, []);

  useEffect(() => {
    if (props.isAuthenticated) {
      let private_key = localStorage.getItem('PRIVATE_API_KEY');
      let public_key = localStorage.getItem('PUBLIC_API_KEY');
      let shouldUpdateCredentialToDB = 0;
      const regex = /^[a-z0-9]+$/;
      if (!public_key) {
        public_key = props.user.marvelAPICredentials?.public || null;
        if (!public_key) shouldUpdateCredentialToDB++;
        while (!public_key) {
          public_key = prompt('Need API public key');
        }
        saveItemToLocalStorage('PUBLIC_API_KEY', public_key);
      }
      if (!private_key) {
        private_key = props.user.marvelAPICredentials?.private || null;
        if (!private_key) shouldUpdateCredentialToDB++;
        while (!private_key) {
          private_key = prompt('Need API private key');
          if (!private_key || private_key.length < 40 || !regex.test(private_key)) private_key = null;
        }
        saveItemToLocalStorage('PRIVATE_API_KEY', private_key);
      }
      if (shouldUpdateCredentialToDB) updateMarvelCredentials(public_key, private_key);
    }
  }, [props.isAuthenticated]);

  const updateMarvelCredentials = (publicKey: string, privateKey: string) => {
    updateUser({ ...props.user, marvelAPICredentials: { public: publicKey, private: privateKey } });
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  const refresh = () => {
    if (props.authLoading) return;
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div id='header'>
      <Navbar bg='light' expand>
        <NavbarBrand href='/'>ComicsREAD</NavbarBrand>
        <Nav className='mr-auto' navbar>
          <NavItem>
            <Link className='nav-link' to='/characters'>
              Characters
            </Link>
          </NavItem>
          <NavItem>
            <Link className='nav-link' to='/series'>
              Series
            </Link>
          </NavItem>
          <NavItem>
            <Link
              className='nav-link'
              to={{ pathname: 'https://github.com/leverglowh/read-comics-tracker' }}
              target='_blank'
            >
              GitHub
            </Link>
          </NavItem>
          {/*
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          */}
        </Nav>
        <div className='header-float-right'>
          {props.isAuthenticated ? (
            <Dropdown navbar show={isAccountMenuOpen} onToggle={toggleAccountMenu}>
              <DropdownToggle id={props.user.username}>{props.user.username}</DropdownToggle>
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

const mapStateToProps = ({ authentication }: IRootState) => ({
  user: authentication.user,
  isAuthenticated: authentication.isAuthenticated,
  authLoading: authentication.loading,
});

const mapDispatchToProps = {
  getMe,
  updateUser
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
