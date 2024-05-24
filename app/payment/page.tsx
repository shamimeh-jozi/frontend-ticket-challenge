"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { buyTicket } from "../../services/api";
import { useState, useEffect } from "react";
import PaymentForm from "./PaymentForm";

type FormData = {
  firstName: string;
  lastName: string;
};

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const mapId = searchParams.get("mapId");
  const x = searchParams.get("x");
  const y = searchParams.get("y");
  const router = useRouter();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mapId || !x || !y) {
      router.push("/");
    }
  }, [mapId, x, y, router]);

  const onSubmit = async (data: FormData) => {
    if (!mapId || !x || !y) {
      setError("Invalid seat selection. Please try again.");
      return;
    }
    setProcessing(true);
    try {
      const { ticketId } = await buyTicket(mapId, Number(x), Number(y));
    } catch (error) {
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Payment</h1>
      {error && <p className='error'>{error}</p>}
      <PaymentForm processing={processing} onSubmit={onSubmit} />
    </div>
  );
};

export default PaymentPage;
