// nextdirect/src/components/header.tsx
"use client"; 
import Image from "next/image"
import Link from "next/link"
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react";
import ButtonUser from "@/components/auth/buttonUser";

export default function Header() {
    const pathname = usePathname();

    return (
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
          <Container fluid>
            <Navbar.Brand as={Link} href="/">
            <Image src="/theme/logo.png" alt={`${process.env.NEXT_PUBLIC_SITE_NAME} Logo`} width={50} height={50} />
                {process.env.NEXT_PUBLIC_SITE_NAME}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="me-auto">
                <Nav.Link as={Link} href="/" active={pathname === "/"}>Home</Nav.Link>
                <Nav.Link as={Link} href="/login" active={pathname === "/login"}>Login</Nav.Link>
                <Nav.Link as={Link} href="/register" active={pathname === "/register"}>Register</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="secondary">Search</Button>
              </Form>
              <div className="d-flex">
                <ButtonUser />
              </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )};
