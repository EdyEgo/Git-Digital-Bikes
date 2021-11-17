import React from 'react';
import { calculate_percentage,format_number_with_dot } from '../Discount_Functions';

interface ShowDiscountProps{
    
    price_string:string 
}




const ShowDiscount: React.FC<any> = ({price_string})=>{
    
 
     if(price_string.indexOf('from') !== -1){
         const split_price_by_from =  price_string.split('from'); 
         const current_new_price = split_price_by_from[0].trim().split(' ');// ex:['200','€'] or ['10%','€'] NEW
         const original_price = split_price_by_from[1].trim().split(' ');// ex:['200','€'] OLD
 
         const current_price_is_percentage = typeof current_new_price ==='string' && current_new_price.indexOf("%") ? false : true;
         
       


         const {old_price,new_price,discount_percentage}:any = calculate_percentage(original_price[0],current_new_price[0]);
      
        
         return (
             <div className="price_with_discount-container" style={{display:'flex',justifyContent:'space-between'}}>
                 {current_price_is_percentage === false && 
                 <div className="current-new-price">{format_number_with_dot(current_new_price[0],current_new_price[1])}</div> 
                 
                 }
                 
                
                 {current_price_is_percentage && <div className="current-new-price">{format_number_with_dot(new_price,current_new_price[1])}</div>}
                 
                 
                 <div className="old-price-line-through">{format_number_with_dot(Math.round(Number(old_price)),current_new_price[1])}</div>
                 <div className="discount-box-percentage">{discount_percentage} Off</div>
 
             </div>
 
         )
     
 
     }
      return (
        <div className="price_with_discount-container">
            <div className="current-price">{price_string.trim()}</div>      
        
        </div>

      )
 } 


 export default ShowDiscount;