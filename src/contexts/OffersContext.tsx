"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Offer } from "@/types/offers"; // We'll create this type file

type OffersContextType = {
  offers: Offer[];
  addOffer: (offer: Offer) => void;
  deleteOffer: (timestamp: string) => void;
};

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export function OffersProvider({
  children,
  initialOffers,
}: {
  children: ReactNode;
  initialOffers: Offer[];
}) {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);

  const addOffer = (newOffer: Offer) => {
    setOffers((prev) => [newOffer, ...prev]);
  };

  const deleteOffer = (timestamp: string) => {
    setOffers((prev) => prev.filter((offer) => offer.timestamp !== timestamp));
  };

  return (
    <OffersContext.Provider value={{ offers, addOffer, deleteOffer }}>
      {children}
    </OffersContext.Provider>
  );
}

export const useOffers = () => {
  const context = useContext(OffersContext);
  if (!context)
    throw new Error("useOffers must be used within an OffersProvider");
  return context;
};
