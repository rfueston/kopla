"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthUserContext";
import styles from "./styles.css"; // Import the CSS
import { auth } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import loginController from "./pageController";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";


//instead of method being here, pull directly from controller

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    setError(null); // Clear any previous error

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      
      // Assuming setAdminStatus is asynchronous, you can await it here
      await loginController.setAdminStatus(userCredential.user.uid);

      router.push("/main"); // Redirect to the main page after successful login
    } catch (error) {
      setError(error.message); // Handle login errors
    }
  };

  return (
    <Container className="text-center" style={{ padding: "40px 0px" }}>
      <Row>
        <Col>
          <header>Login</header>
        </Col>
      </Row>
      <br></br>
      <br></br>
      <main>
        <Row style={{ maxWidth: "400px", margin: "auto" }}>
          <Col>
            <Form onSubmit={onSubmit}>
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup row>
                <Label for="loginEmail" sm={4}>
                  Email
                </Label>
                {/* <Col sm={8}> */}
                <Input
                  className="input-field"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email"
                />
                {/* </Col> */}
              </FormGroup>
              <FormGroup row>
                <Label for="loginPassword" sm={4}>
                  Password
                </Label>
                {/* <Col sm={8}> */}
                <Input
                  className="input-field"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password"
                />
                {/* </Col> */}
              </FormGroup>
              <br></br>
              <FormGroup row>
                <Col>
                  <Button>Login</Button>
                </Col>
              </FormGroup>
              <br></br>
              <br></br>
              <FormGroup row>
                <Col className="link">
                  No account? <Link href="/account_creation">Create one!</Link>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </main>
    </Container>
  );
}

// Credit: https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/
