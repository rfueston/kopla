import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import AccountLoginTest from "../src/app/login/page";


describe("TC-001", () => {
    it("Verify successful login with valid credentials", () => {
        render(<AccountLoginTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-002", () => {
    it("Verify login with incorrect username", () => {
        render(<AccountLoginTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-003", () => {
    it("Verify login with incorrect password ", () => {
        render(<AccountLoginTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-004", () => {
    it("Verify login with empty username", () => {
        render(<AccountLoginTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-005", () => {
    it("Verify login with empty password", () => {
        render(<AccountLoginTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});