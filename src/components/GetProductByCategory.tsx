import { useState, useEffect } from 'react'; 
import {firestore} from "../firebase";
import React from 'react';


export interface documentObject {
   curr:{
      data:()=>object,
      id:string

   }

}    


 
const GetItemsByCategory= async(category:string) => {
     const getTheOtherCategory = category.toLowerCase() === 'equipment' ? 'motorcycles' : 'equipment';
     
    const dataBaseCall =await firestore.collection("digital-bikes").doc(getTheOtherCategory.toLowerCase()).collection(`${getTheOtherCategory.toLowerCase()}Collection`).get(); 
   
   const recivedDocuments = dataBaseCall.docs; 
 
 
   const itemsArray =recivedDocuments.reduce((acc:object[],curr)=>{
           acc.push({data:curr.data(),id:curr.id});
           return acc;
   },[])
    
 

 return itemsArray;
}
 

  


export default GetItemsByCategory; 



