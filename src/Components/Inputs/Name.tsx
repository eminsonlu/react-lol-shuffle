import { HiOutlinePlus, HiMinus } from "react-icons/hi";
import { useState } from "react";

type Props = {
  text: {
    placeholder: string;
    maxCharacters: number;
    value: string;
    onChange: (value: string) => void;
  };
  number: {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
  };
};

const Name = (props: Props) => {
  const [val, setVal] = useState<number>(props.number.value);

  const { text, number } = props;

  const handleIncrement = () => {
    if (val + number.step! <= number.max!) {
      setVal(val + number.step!);
      number.onChange(val + number.step!);
    }
  };

  const handleDecrement = () => {
    if (val - number.step! >= number.min!) {
      setVal(val - number.step!);
      number.onChange(val - number.step!);
    }
  };

  return (
    <div className="flex justify-between bg-[#333] border border-[#333] text-[#cecece] text-sm rounded-lg p-2">
      <input
        type="text"
        value={text.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          text.onChange(e.target.value)
        }
        placeholder={text.placeholder}
        maxLength={text.maxCharacters}
        className="text-sm focus:ring-0 border-none focus:border-none ring-0 bg-transparent text-gray-50 w-28 h-6 outline-none focus:outline-none"
      />
      <div className="flex gap-2 text-sm bg-transparent text-gray-200 items-center">
        <button onClick={handleDecrement}>
          <HiMinus />
        </button>
        <p>{val}</p>
        <button onClick={handleIncrement}>
          <HiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Name;
