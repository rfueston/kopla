import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import NavbarTest from "../src/app/components/navigation/navbar/Navbar";


describe("Dashboard Nav Test", () => {
    it("renders ui for nav", () => {
        render(<NavbarTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});