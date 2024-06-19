import { useState } from "react";
import "./App.css";
import Bord from "./components/Bord";
import History from "./components/History";

function App() {
  const [turn, setTurn] = useState(true);
  const [history, setHistory] = useState<(string | null)[][]>([]);
  const [status, setStatus] = useState<(string | null)[]>(Array(9).fill(null)); //今の盤面
  const [maruList, setMaruList] = useState<number[]>([]);
  const [batuList, setBatuList] = useState<number[]>([]);
  const [winner, setWinner] = useState<"O" | "X" | "draw" | null>(null);

  // historyに追加
  const historyHandler = (status: (string | null)[]) =>
    setHistory((prev) => [...prev, status]);
  // historyに遷移
  const transitionToHistory = (status: (string | null)[]) => {
    if (status.length !== 1) {
      const idx = history.indexOf(status);
      if (idx !== -1) {
        const newHistory = history;
        newHistory.splice(idx, history.length - idx);
        setHistory(newHistory);
        setStatus(status);
        countMaruBatu(status);
      }
    } else {
      // 結果表示後のボタンクリック（リセット）
      setHistory([]);
      setStatus(Array(9).fill(null));
      setWinner(null);
      setBatuList([]);
      setMaruList([]);
      setTurn(true);
    }
  };
  // historyで戻った際のターンの管理
  const countMaruBatu = (status: (string | null)[]) => {
    const mList = [];
    const bList = [];
    for (let i = 0; i < status.length; i++) {
      if (status[i] === "O") mList.push(i);
      else if (status[i] === "X") bList.push(i);
    }
    setMaruList(mList);
    setBatuList(bList);
    if (mList.length === bList.length) setTurn(true);
    else setTurn(false);
  };
  // スクエアのクリックを取得
  const onClickSquare = (idx: number) => {
    let endFlag = false;
    if (status[idx] !== null || winner) return;
    let value = turn ? "O" : "X";
    if (turn) {
      value = "O";
      const newMaruList = [...maruList, idx];
      if (endDecision(newMaruList)) {
        gameEnd(true);
        endFlag = true;
      }
      setMaruList(newMaruList);
    } else {
      value = "X";
      const newBatuList = [...batuList, idx];
      if (endDecision(newBatuList)) {
        gameEnd(false);
        endFlag = true;
      }
      setBatuList(newBatuList);
    }
    const newStatus = [...status];
    newStatus[idx] = value;
    if (!endFlag && newStatus.every((e) => e !== null)) setWinner("draw");

    setStatus(newStatus);
    historyHandler(status);
    setTurn((turn) => !turn);
  };
  // 終了しているか判断
  const endDecision = (nums: number[]): boolean => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].every((e) => nums.includes(e))) return true;
    }
    return false;
  };
  // 終了処理
  const gameEnd = (flag: boolean) => setWinner(flag ? "O" : "X");

  return (
    <div className="select-none text-center flex w-72 mx-auto mt-28">
      <Bord
        status={status}
        onClickSquare={onClickSquare}
        winner={winner}
        transitionToHistory={transitionToHistory}
      />
      <History history={history} transitionToHistory={transitionToHistory} />
    </div>
  );
}

export default App;
