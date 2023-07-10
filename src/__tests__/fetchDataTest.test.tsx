import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { Sidebar } from "../sidebar/sidebar";
import '@testing-library/jest-dom/extend-expect';
import axios from "axios";

jest.mock("axios")

const dummyButtons = [
    {
        title: 'Søk',
        htmlString: '<button class="header-button header-button--search…/span>\n  <span class="title">Søk</span>\n</button>',
        selector: 'BODY:nth-child(2)>DIV:nth-child(2)>DIV:nth-child(1…nth-child(1)>DIV:nth-child(2)>BUTTON:nth-child(1)',
        attributes: Array(2),
        result: ''
    }
]

test('fetchData function', () => {

    render(<Sidebar/>);


})