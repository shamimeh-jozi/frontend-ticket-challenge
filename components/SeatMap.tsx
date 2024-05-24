import React from "react";
import SeatRow from "./SeatRow";

type SeatMapProps = {
  map: number[][];
  onSeatClick: (x: number, y: number) => void;
  selectedSeat: string | null;
};

const SeatMap: React.FC<SeatMapProps> = ({
  map,
  onSeatClick,
  selectedSeat,
}) => {
  return (
    <div className='grid'>
      {map.map((row, rowIndex) => (
        <SeatRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          onSeatClick={onSeatClick}
          selectedSeat={selectedSeat}
        />
      ))}
    </div>
  );
};

export default SeatMap;
