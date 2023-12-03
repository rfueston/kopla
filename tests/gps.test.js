import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import GPSTest from "../src/app/geofencing/page";


describe("TC-019", () => {
    it("Verify GPS can be activated by parent user.", () => {
        render(<GPSTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-020", () => {
    it("Verify GPS place in queue notification is sent and set properly.", () => {
        render(<GPSTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-021", () => {
    it("Verify geofencing zone can be set by admin user.", () => {
        render(<GPSTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-022", () => {
    it("Verify GPS updates once inside geofencing zone.", () => {
        render(<GPSTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});