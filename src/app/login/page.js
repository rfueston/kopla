"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthUserContext";
import styles from "./styles.css"; // Import the CSS

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

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log("Success. The user is created in firebase");
        router.push("/main");
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
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
                  No account? <Link href="/sign_up">Create one</Link>
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
