import { useState } from "react";
import { render, act } from "@testing-library/react";
import { useInactivityTimer } from "./useInactivityTimer";

const TestComponent = ({ timeout }: { timeout: number }) => {
  const [inactive, setInactive] = useState(false);

  useInactivityTimer(timeout, () => setInactive(true));

  return <div>{inactive ? "Inactive" : "Active"}</div>;
};

describe("useInactivityTimer", () => {
  jest.useFakeTimers();

  it("calls onTimeout after timeout period", () => {
    const { getByText } = render(<TestComponent timeout={1000}  />);
    expect(getByText("Active")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText("Inactive")).toBeInTheDocument();
  });

  it("resets timer on user activity", () => {
    const { getByText } = render(<TestComponent timeout={1000}  />);
    expect(getByText("Active")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(500);
      window.dispatchEvent(new Event("mousemove"));
    });

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(getByText("Active")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(getByText("Inactive")).toBeInTheDocument();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
