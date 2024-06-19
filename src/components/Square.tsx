type SquareProps = {
  value: string | null;
  onClickSquare: () => void;
};
const Square = ({ value, onClickSquare }: SquareProps) => {
  return (
    <div
      className="border-2 border-black w-20 h-20 flex justify-center items-center text-7xl -m-px"
      onClick={onClickSquare}
    >
      {value}
    </div>
  );
};

export default Square;
