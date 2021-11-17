import {createContext} from 'react';

interface userInfo {
    userMail:string,
    userName:string

}

export const UserContext = createContext<userInfo>({ userMail:"",
    userName:""});