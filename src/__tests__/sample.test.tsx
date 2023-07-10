import {  render, fireEvent, screen } from "@testing-library/react"
import Increment from "../sidebar/sampleFunction"
import React from "react";
import '@testing-library/jest-dom/extend-expect';

test("increments counter", () => {

    render(<Increment />);

    const counter = screen.getByTestId("counter");
    const incrementBtn = screen.getByTestId("increment");

    fireEvent.click(incrementBtn);

    expect(counter).toHaveTextContent("1")

})
