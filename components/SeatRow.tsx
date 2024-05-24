import React from "react";
import Seat from "./Seat";

interface SeatRowProps {
  row: number[];
  rowIndex: number;
  onSeatClick: (x: number, y: number) => void;
  selectedSeat: string | null;
}

const SeatRow: React.FC<SeatRowProps> = ({
  row,
  rowIndex,
  onSeatClick,
  selectedSeat,
}) =>
  row.map((seat, colIndex) => {
    const isReserved = seat === 1;

    return (
      <Seat
        key={colIndex}
        rowIndex={rowIndex}
        colIndex={colIndex}
        selectedSeat={selectedSeat}
        isReserved={isReserved}
        onSeatClick={() => onSeatClick(rowIndex, colIndex)}
      />
    );
  });

export default SeatRow;
