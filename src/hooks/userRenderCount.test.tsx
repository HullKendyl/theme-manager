import { useRenderCount } from "./useRenderCount";
import { render } from '@testing-library/react';


const TestComponent = () => {
  const count = useRenderCount();
  return (
    <div>
      Render count: {count}
    </div>
  );
};


test('it tracks render count', () => {
  const { getByText, rerender } = render(<TestComponent />);
  expect(getByText(/Render count: 2/i)).toBeInTheDocument(); // first render: useRef +1
  rerender(<TestComponent />);
  expect(getByText(/Render count: 3/i)).toBeInTheDocument();
});

export default TestComponent;
