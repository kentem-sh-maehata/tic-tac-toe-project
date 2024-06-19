type HistoryProps = {
  history: (string | null)[][];
  transitionToHistory: (status: (string | null)[]) => void;
};
const History = ({ history, transitionToHistory }: HistoryProps) => {
  return (
    <div className="flex-col w-40">
      {history.map((hist, i) => {
        return (
          <div
            key={i}
            className="rounded-xl border-b-4 border-2 border-black mt-1 w-16"
          >
            <button onClick={() => transitionToHistory(hist)}>#{i + 1}</button>
          </div>
        );
      })}
    </div>
  );
};

export default History;
