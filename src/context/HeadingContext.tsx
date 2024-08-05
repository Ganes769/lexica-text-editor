import { createContext, useContext, useState, ReactNode } from "react";
interface HeadingContextType {
  heading: string;
  isImageUpload: boolean;
  setIsImageUpload: (isImageUpload: boolean) => void;
  headingIcon: string;
  alignIcon: string;
  setAlignIcon: (align: string) => void;
  setHeadingIcon: (headingIcon: string) => void;
  setHeading: (heading: string) => void;
  isFileUpload: boolean;
  setIsFileUpload: (isFileUpload: boolean) => void;
  isFileOpen: boolean;
  setIsFileOpen: (isFileOpen: boolean) => void;
  onImageUpload?: (data: File[]) => Promise<{ url: string }>;
}
const HeadingContext = createContext<HeadingContextType | undefined>(undefined);
export const useHeadingContext = () => {
  const context = useContext(HeadingContext);
  if (!context) {
    throw new Error("useHeadingContext must be used within a HeadingProvider");
  }
  return context;
};

interface HeadingProviderProps {
  children: ReactNode;
  onImageUpload?: (data: File[]) => Promise<{ url: string }>;
}

export const HeadingProvider = ({ children, onImageUpload }: HeadingProviderProps) => {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [heading, setHeading] = useState<string>("normal");
  const [headingIcon, setHeadingIcon] = useState<string>("heading1");
  const [alignIcon, setAlignIcon] = useState("left");
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isFileOpen, setIsFileOpen] = useState(false);
  return (
    <HeadingContext.Provider
      value={{
        isFileOpen,
        setIsFileOpen,
        isFileUpload,
        setIsFileUpload,
        heading,
        setHeading,
        onImageUpload,
        isImageUpload,
        setIsImageUpload,
        headingIcon,
        setHeadingIcon,
        alignIcon,
        setAlignIcon,
      }}
    >
      {children}
    </HeadingContext.Provider>
  );
};
