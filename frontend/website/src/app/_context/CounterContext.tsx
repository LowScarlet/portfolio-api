'use client'

import React, { createContext, useContext, useState } from "react";

interface CounterContextType {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);

  return (
    <CounterContext.Provider value={{ counter, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("Where The Provider???? ~LowScarlet");
  }
  return context;
};