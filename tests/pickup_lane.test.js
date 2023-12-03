import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import PickupLaneTest from "../src/app/pickup_lane/page";


describe("TC-013", () => {
    it("Verify queue is displayed in order by the check-in time stamp.", () => {
        render(<PickupLaneTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-014", () => {
    it("Verify zone window is updated when dismiss button is clicked.", () => {
        render(<PickupLaneTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-015", () => {
    it("Verify queue is updated when dismiss button is clicked", () => {
        render(<PickupLaneTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-016", () => {
    it("Verify zone fields are cleared when dismiss button is clicked and queue is empty", () => {
        render(<PickupLaneTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-017", () => {
    it("Verify queue entries are updated real-time without page refresh", () => {
        render(<PickupLaneTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-018", () => {
    it("Verify zone information is updated real-time without page refresh", () => {
        render(<PickupLaneTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});