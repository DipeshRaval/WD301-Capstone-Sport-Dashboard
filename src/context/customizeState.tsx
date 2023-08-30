import React, { createContext, useState } from "react";
interface CustomizeContextProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}
const CustomizeContext = createContext<CustomizeContextProps>({
  isOpen: true,
  setIsOpen: () => {},
});
const CustomizeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const valueToShare = {
    isOpen,
    setIsOpen,
  };
  return (
    <CustomizeContext.Provider value={valueToShare}>
      {children}
    </CustomizeContext.Provider>
  );
};
export { CustomizeContext, CustomizeProvider };
