import Square from "./Square";

type BordProps = {
  onClickSquare: (idx: number) => void;
  status: (string | null)[];
  winner: "O" | "X" | "draw" | null;
  transitionToHistory: (status: (string | null)[]) => void;
};
const Bord = ({
  onClickSquare,
  status,
  winner,
  transitionToHistory,
}: BordProps) => {
  return (
    <div className="w-80 mx-auto mr-8">
      {winner && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-gray-600 bg-opacity-50">
          <h1 className="text-9xl text-pink-600 mt-32">
            {winner === "draw" ? (
              <p>引き分け！</p>
            ) : (
              <p>{`${winner}の勝ち！`}</p>
            )}
          </h1>
          <button
            className="border-2 px-8 py-4 bg-white text-black mt-16 rounded-xl text-3xl font-bold"
            onClick={() => transitionToHistory([null])}
          >
            戻る
          </button>
        </div>
      )}
      <div className="flex justify-center">
        <Square value={status[0]} onClickSquare={() => onClickSquare(0)} />
        <Square value={status[1]} onClickSquare={() => onClickSquare(1)} />
        <Square value={status[2]} onClickSquare={() => onClickSquare(2)} />
      </div>
      <div className="flex justify-center">
        <Square value={status[3]} onClickSquare={() => onClickSquare(3)} />
        <Square value={status[4]} onClickSquare={() => onClickSquare(4)} />
        <Square value={status[5]} onClickSquare={() => onClickSquare(5)} />
      </div>
      <div className="flex justify-center">
        <Square value={status[6]} onClickSquare={() => onClickSquare(6)} />
        <Square value={status[7]} onClickSquare={() => onClickSquare(7)} />
        <Square value={status[8]} onClickSquare={() => onClickSquare(8)} />
      </div>
    </div>
  );
};

export default Bord;
