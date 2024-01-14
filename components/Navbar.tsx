"use client"

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

import Login from './Login';
import { ToastFailed, ToastSuccess, ToastEmoji } from '@/utils/toats';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { FaShare } from "react-icons/fa";

export const NavbarComponent = () => {
  const [user, setUser] = React.useState<any>({
    email: ""
  });

  React.useEffect(() => {

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      }
    });

  }, []);

  const logoutUser = async () => {

    const auth = getAuth();
    const currentUser = auth.currentUser;

    signOut(auth).then(() => {
      if (currentUser) {
        ToastSuccess("Logged out Succesfully");
      } else {
        ToastEmoji("Login first", '🥹');
      }
    }).catch((e) => {
      ToastFailed("Something went wrong");
    });

  }

  return (
    <>
      <Navbar className='bg-primary-50'>
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <FaShare className='text-2xl text-primary-700 mr-4' />
            <p className="font-bold text-inherit text-primary-700">File Sharing</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-10" justify="center" >
          <NavbarBrand>
            <FaShare className='text-2xl text-primary-700 mr-4' />
            <p className="font-bold text-inherit text-primary-700">File Sharing</p>
          </NavbarBrand>
          {
            user.email === "" ?
              <>
                <NavbarItem className='Upload'>
                  <Link color="foreground" href="/upload" className='text-primary-700'>
                    Upload
                  </Link>
                </NavbarItem>
                <NavbarItem className='Files'>
                  <Link color="foreground" href="/files" className='text-primary-700'>
                    Files
                  </Link>
                </NavbarItem>
                <NavbarItem className='Files'>
                  <Link color="foreground" href="/files" className='text-primary-700'>
                    Profile
                  </Link>
                </NavbarItem>
              </> :
              <></>
          }

        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            {
              user.email === "" ?
                <Login /> :
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="primary"
                      size="sm"
                      src="user.png"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="Profile" color='primary'>Profile</DropdownItem>
                    <DropdownItem key="Upload" href='/upload' color='primary'>Upload</DropdownItem>
                    <DropdownItem key="Files" href='/files' color='primary'>Files</DropdownItem>
                    <DropdownItem key="Logout" color="danger" onClick={logoutUser}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            }
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}
