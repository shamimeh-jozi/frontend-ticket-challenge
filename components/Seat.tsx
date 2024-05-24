import React from "react";

interface SeatProps {
  rowIndex: number;
  colIndex: number;
  selectedSeat: string | null;
  isReserved: boolean;
  onSeatClick: (x: number, y: number) => void;
}

const Seat: React.FC<SeatProps> = ({
  rowIndex,
  colIndex,
  selectedSeat,
  isReserved,
  onSeatClick,
}) => {
  const seatKey = `${rowIndex}-${colIndex}`;
  const isSelected = selectedSeat === seatKey;
  return (
    <button
      key={seatKey}
      onClick={() => !isReserved && onSeatClick(rowIndex, colIndex)}
      className={`seat ${
        isReserved ? "reserved" : isSelected ? "selected" : "available"
      }`}
      disabled={isReserved}
    >
      {isReserved ? "R" : "A"}
    </button>
  );
};

export default Seat;
