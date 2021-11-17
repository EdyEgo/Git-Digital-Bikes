import React,{useEffect,useRef,useState} from "react";
import GetItemsByCategory from './GetProductByCategory' 

export interface CategoryItemsFetchProps {
   Fetch_Param:string
    
}
 
const CategoryItemsFetch = ({Fetch_Param}:any) => {
     const [categoryItems,setCategoryItems] = useState<object[] | null>([]);
    
    const isMounted = useRef(false);
    const itemsArray:()=> object = async ()=>{
        const result =await GetItemsByCategory('motocycles');
        
        return result;
       };
       
       const invokeDataBaseCategory = async ()=>{ 
         if(isMounted.current){
            const items =  await GetItemsByCategory(Fetch_Param); 
           
            return items;
         }
        
       };


       useEffect(():any=>{ 
      
   
        isMounted.current = true;
     
        if(Fetch_Param !== null){

        
        invokeDataBaseCategory()
        .then((arrayItemsCategory:any)=>{
          
              
         
             setCategoryItems(arrayItemsCategory) ;

          
        
        
         })
        .catch(err=>console.error('error from fetch is',err)); 
        } 
        if(Fetch_Param === null){
          setCategoryItems(null);
        }
        return ()=> (isMounted.current = false);
   
       },[Fetch_Param]);
   
       
        return categoryItems;
}
 
export default CategoryItemsFetch;