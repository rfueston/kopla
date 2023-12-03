import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import AccountCreationTest from "../src/app/account_creation/page";


describe("TC-006", () => {
    it("Verify successful account creation with valid inputs", () => {
        render(<AccountCreationTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-007", () => {
    it("Verify account creation with invalid email format", () => {
        render(<AccountCreationTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-008", () => {
    it("Verify account creation with an existing email", () => {
        render(<AccountCreationTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-009", () => {
    it("Verify account creation with a weak password", () => {
        render(<AccountCreationTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-010", () => {
    it("Verify account creation with missing required fields", () => {
        render(<AccountCreationTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-011", () => {
    it("Verify account creation with different confirm passwords", () => {
        render(<AccountCreationTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});

describe("TC-012", () => {
    it("Verify account creation with the same confirm password", () => {
        render(<AccountCreationTest/>)

        //check for text
        expect(screen.getByText("")).toBeInTheDocument();
    });
});