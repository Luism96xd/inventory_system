'use client';
/*
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

const GlobalContext = createContext({
    currentTab: 0,
    data: [],
})

export const GlobalContextProvider = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const [data, setData] = useState([])
    
    return (
        <GlobalContext.Provider value={{ currentTab, setCurrentTab, data, setData }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);
*/
import { create } from 'zustand'

export const useStore = create((set) => ({
  currentTab: 0,
  currentCaption: "",
  setCurrentTab: (currentTab) => set({ currentTab }),
  hydrateStore: (data) => {
    const [set] = args;
    set({ ...data });
  },
}))
