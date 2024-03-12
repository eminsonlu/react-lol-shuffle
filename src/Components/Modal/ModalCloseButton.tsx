/* eslint-disable react/prop-types */
import { useModal } from "../../Store/";

type Props = {
  children: React.ReactNode;
  className?: string;
}

const ModalCloseButton = ({ children, className }: Props) => {
  const { closeModal } = useModal() as any;
  return (
    <button onClick={closeModal} className={className}>
      {children}
    </button>
  );
};

export default ModalCloseButton;
