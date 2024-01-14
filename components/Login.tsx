"use client"

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input, Link, Tabs, Tab } from "@nextui-org/react";

import signUp from "../src/firebase/auth/signUp";
import signIn from "@/src/firebase/auth/signIn";

import validator from 'validator';
import { ToastFailed, ToastSuccess } from "@/utils/toats";

export default function Login() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState<string | number>("login");

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const SignUp = async () => {

    const { error } = await signUp(email, password);

    if (error) {

      if (!validator.isEmail(email)) {
        ToastFailed("Enter correct email.");
      } else if (error == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
        ToastFailed("This email is already in use.");
      } else if (!validator.isStrongPassword(password)) {
        ToastFailed("Enter strong password.");
      } else {
        ToastFailed("Internal server error.");
      }

      return;

    } else {

      ToastSuccess("Successfully signed up.");
      setSelected("login");

    }

    setEmail("");
    setPassword("");

  }

  const Login = async () => {

    const { error } = await signIn(email, password);

    if (error) {

      ToastFailed("Invalid credentials.");
      return;

    } else {

      ToastSuccess("Logged in Successfully.");
      onClose();

    }

    setEmail("");
    setPassword("");

  }

  return (
    <>
      <Button onClick={onOpen} color="primary">Login</Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full">
                  <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                  >
                    <Tab key="login" title="Login">
                      <form className="flex flex-col gap-4">
                        <Input
                          value={email}
                          isRequired
                          label="Email"
                          placeholder="Enter your email"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)} />
                        <Input
                          value={password}
                          isRequired
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)} />
                        <p className="text-center text-small">
                          Need to create an account?{" "}
                          <Link
                            size="sm"
                            className="sign-up hover:cursor-pointer"
                            onPress={() => {
                              setSelected("sign-up");
                              setEmail("");
                              setPassword("");
                            }}>
                            Sign up
                          </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                          <Button fullWidth color="primary" onClick={Login}>
                            Login
                          </Button>
                        </div>
                      </form>
                    </Tab>
                    <Tab key="sign-up" title="Sign up">
                      <form className="flex flex-col gap-4">
                        <Input
                          value={email}
                          isRequired
                          label="Email"
                          placeholder="Enter your email"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)} />
                        <Input
                          value={password}
                          isRequired
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)} />
                        <p className="text-center text-small">
                          Already have an account?{" "}
                          <Link
                            size="sm"
                            className="hover:cursor-pointer"
                            onPress={() => {
                              setSelected("login");
                              setEmail("");
                              setPassword("");
                            }}>
                            Login
                          </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                          <Button fullWidth color="primary" onClick={SignUp}>
                            Sign up
                          </Button>
                        </div>
                      </form>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
