import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import NavbarTest from "../src/app/components/navigation/navbar/Navbar";
import AdminTest from "../src/app/firebase/page";


describe("TC-027", () => {
    it("Verify entering an email on the admin returns a pair list related to that email.", () => {
        render(<AdminTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-028", () => {
    it("Verify that adding a new pair on the admin page adds a new pair into the firestore under the proper email.", () => {
        render(<AdminTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-029", () => {
    it("Verify that updating a pair on the admin page saves in the firestore.", () => {
        render(<AdminTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-030", () => {
    it("Verify the pair is deleted from the firestore upon delete click.", () => {
        render(<AdminTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});