"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import "../../styles/globals.css";

const ConfirmationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId");

  useEffect(() => {
    sessionStorage.removeItem("reservedSeats");
  }, []);

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <div className='container'>
      <h1 className='title'>Ticket Confirmation</h1>
      {ticketId ? (
        <p>
          Your ticket ID is: <strong>{ticketId}</strong>
        </p>
      ) : (
        <p>No ticket information found.</p>
      )}
      <button onClick={handleBackHome} className='button'>
        Back Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
