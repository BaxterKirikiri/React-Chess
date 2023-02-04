import React, { useContext, useRef } from "react";
import { Button, Col, Container, Form, Navbar } from "react-bootstrap";
import { AuthContext } from "../services/AuthContext";
import { auth } from "../services/firebaseSetup";
import { addUserGameList } from "../services/Firestore";
import Menu from "./Menu";

const Login: React.FC = () => {
  const user = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const createAccount = async () => {
    try {
      await auth.createUserWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
      const userID = auth.currentUser?.uid;
      if(userID) {
        addUserGameList(userID);
      }
    } catch (error) {
      alert(
        "Please ensure email is correctly formatted and password is at least 6 characters long"
      ); //TODO: Make this alert more informative
    }
  };

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      alert("Username or password is incorrect"); //TODO: Make this alert more informative
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand>Baxter React Chess</Navbar.Brand>
        {user && <Button onClick={signOut}>Sign Out</Button>}
      </Navbar>
      {!user ? (
        <Container style={{ maxWidth: "500px" }} fluid>
          <Form className="mt-4">
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="email" />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="password"
              />
            </Form.Group>
            <Form.Row>
              <Col xs={6}>
                <Button onClick={createAccount} type="button" block>
                  Sign Up
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  type="button"
                  onClick={signIn}
                  variant="secondary"
                  block
                >
                  Sign In
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      ) : (
        <>
          <h2 className="mt-4 text-center">Welcome {user.email}</h2>
          <Container style={{ maxWidth: "500px" }} fluid>
            <Menu uid={user.uid} />
          </Container>
        </>
      )}
    </>
  );
};

export default Login;
