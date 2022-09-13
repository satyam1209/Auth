import { useCallback, useEffect, useState } from "react"


export const useAuth=()=>{
    const [token, setToken] = useState(false); 

    const login=useCallback((token)=>{
        setToken(token)
        const tokenexpirationTime=new Date(new Date().getTime() + 1000 *60*60);
        localStorage.setItem('userData',
        JSON.stringify({
            token:token,
            expiration:tokenexpirationTime.toISOString()
        })
        )
        

    }
    ,[])

    const logout=useCallback(()=>{
        setToken(null);
        localStorage.removeItem("userData");
    });

    useEffect(()=>{
        const storedData=JSON.parse(localStorage.getItem("userData"));
        if (storedData && storedData.token && new Date(storedData.expiration)>new Date()){
            login(storedData.token)
        }
    },[login])

    return {token,login,logout}
};