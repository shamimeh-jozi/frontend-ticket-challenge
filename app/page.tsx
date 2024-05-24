"use client";

import { fetchMaps, fetchMapDetails } from "../services/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SeatMap from "../components/SeatMap";

const HomePage = () => {
  const router = useRouter();
  const [maps, setMaps] = useState<string[]>([]);
  const [selectedMap, setSelectedMap] = useState<string>("");
  const [mapDetails, setMapDetails] = useState<number[][]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  useEffect(() => {
    async function getMaps() {
      try {
        const maps = await fetchMaps();
        setMaps(maps);
        const randomMap = maps[Math.floor(Math.random() * maps.length)];
        setSelectedMap(randomMap);
      } catch (error) {
        console.error("Error fetching maps:", error);
      }
    }
    getMaps();
  }, []);

  useEffect(() => {
    async function getMapDetails() {
      if (selectedMap) {
        try {
          const details = await fetchMapDetails(selectedMap);
          setMapDetails(details);
        } catch (error) {
          console.error("Error fetching map details:", error);
        }
      }
    }
    getMapDetails();
  }, [selectedMap]);

  const handleSeatClick = (x: number, y: number) => {
    const seatKey = `${x}-${y}`;
    setSelectedSeat((prevSeat) => (prevSeat === seatKey ? null : seatKey));
  };

  const handleBuyTicket = () => {
    if (selectedSeat) {
      const [x, y] = selectedSeat.split("-").map(Number);
      router.push(`/payment?mapId=${selectedMap}&x=${x}&y=${y}`);
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Select Your Seat</h1>
      {mapDetails.length > 0 ? (
        <>
          <SeatMap
            map={mapDetails}
            onSeatClick={handleSeatClick}
            selectedSeat={selectedSeat}
          />
          <button
            onClick={handleBuyTicket}
            className='button'
            disabled={!selectedSeat}
          >
            Buy Ticket
          </button>
        </>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default HomePage;
