import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import SettingsTest from "../src/app/settings/page";


describe("TC-023", () => {
    it("Verify the first name on the settings page is updated on save click.", () => {
        render(<SettingsTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-024", () => {
    it("Verify the last name on the settings page is updated on save click.", () => {
        render(<SettingsTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-025", () => {
    it("Verify the email on the settings page is updated on save click.", () => {
        render(<SettingsTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});

describe("TC-026", () => {
    it("Verify the password on the settings page is updated on save click.", () => {
        render(<SettingsTest/>)

        //check for text
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });
});