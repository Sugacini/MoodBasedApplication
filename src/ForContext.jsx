import { createContext, useContext, useRef, useState } from "react";


var Context = createContext();



export function ContextProvider({children}) {
    var userUniqueIdContxt= useRef();
    var detectedEmotion= useRef();
    const [userIdContext, setIdForContxt] = useState(null);
    const [currentEmotion, setCurrentEmotion] = useState(null);
   return (
    <Context.Provider 
        value={{userIdContext,setIdForContxt,
            currentEmotion, setCurrentEmotion}}
    >
        {children}
    </Context.Provider>
   )
}

export const useAppContext = () => useContext(Context);
