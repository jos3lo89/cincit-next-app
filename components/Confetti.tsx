"use client";

import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

const Confetti = () => {
  const { height, width } = useWindowSize();

  return (
    <ReactConfetti
      width={width - 20}
      height={height}
      numberOfPieces={2000}
      recycle={false}
      gravity={0.2}
    />
  );
};

export default Confetti;
