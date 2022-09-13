import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css';
import Backdrop from './Backdrop';
import SideDrawer from './SideDrawer'


const MainNavigation = props => {
  const [drawerIsOpen ,setdrawerIsOpen]=useState(false)
  const opendrawerHandler=()=>{
    if (drawerIsOpen){
    setdrawerIsOpen(false);}
    else{
      setdrawerIsOpen(true)
    }
  }
  const closedrawerHandler=()=>{
    if (drawerIsOpen){
    setdrawerIsOpen(false);}
    else{
      setdrawerIsOpen(true)
    }
  }

  return (
    <React.Fragment>
      {drawerIsOpen&&<Backdrop onClick={closedrawerHandler}/>}
    <SideDrawer show={drawerIsOpen} onClick={closedrawerHandler}>
      <nav className='main-navigation__drawer-nav'>
        <NavLinks></NavLinks>
      </nav>
    </SideDrawer>
    <MainHeader>
      <button className="main-navigation__menu-btn" onClick={opendrawerHandler}>
        <span></span>
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title" >
        <Link to="/">YourPlaces</Link>
      </h1>
      <nav className="main-navigation__header-nav">
        <NavLinks/>
      </nav>
    </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
