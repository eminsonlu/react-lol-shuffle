import { useState } from "react";
import { HiOutlinePlus, HiMinus } from "react-icons/hi";

type NumberProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const Number = (props: NumberProps) => {
  const [val, setVal] = useState<number>(props.value);
  const { label, value, onChange, min, max, step } = props;

  const handleIncrement = () => {
    if (val + step! <= max!) {
      setVal(val + step!);
      onChange(val + step!);
    }
  };

  const handleDecrement = () => {
    if (val - step! >= min!) {
      setVal(val - step!);
      onChange(val - step!);
    }
  };

  return (
    <div>
      <label htmlFor="number-input-1">{label}</label>
      <div className="mt-2 flex gap-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2">
        <button onClick={handleDecrement}>
          <HiMinus />
        </button>
        <p>{value}</p>
        <button onClick={handleIncrement}>
          <HiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Number;
