

export const cancel_comma_and_dot = (word:string | number)=>{ 

  if(typeof word === 'string'){
         
      
       const cancel_currency_symbol = word.trim().indexOf(' ') ? word.trim().split(' ')[0] : word.trim();
      
       const cancel_comma = cancel_currency_symbol.indexOf(',')? cancel_currency_symbol.split(',').join('') : cancel_currency_symbol;
       const cancel_dot = cancel_comma.indexOf('.') ? cancel_comma.split('.').join('') : cancel_comma;
       
       return cancel_dot;
  }

      return word;

}


export const calculate_percentage = (old_price:string | number,desired_price:any)=>{// carefull the numbers might have comma
    // calculate by percentage (you want to take off a specific 10 percent off)
    // or calculate by new price (you have just a new  price )
    
    if(old_price === '' || old_price === undefined) return {old_price:'',new_price:desired_price,discount_percentage:''}
   
     
      
    let result;
    
      if(typeof desired_price === 'string' && desired_price.indexOf('%') !== -1){
        
         // calculate by a specific percentage
         const original_price = Number(cancel_comma_and_dot(old_price));
         const extract_desired_price_percentage = desired_price.slice(0,desired_price.indexOf('%'));
         
         const add_zero_decimal_before_extracted_num = Number('0.' + extract_desired_price_percentage);

        

         
         
       

       


        const resulted_new_price = original_price - (add_zero_decimal_before_extracted_num * original_price)
        const round_result = Math.round(resulted_new_price);
       
        const extract_currency_symbol = desired_price.trim().split(' ')[0];
       
         return {old_price,new_price:round_result,discount_percentage:extract_currency_symbol}//discount_percentage:desired_price}
      } 

     // if(typeof desired_price === 'number' || isNaN(desired_price) === false){
      
         if( Number.isNaN(Number(cancel_comma_and_dot(desired_price)))=== false){
         //calculate with the new number
           const original_price = Number(cancel_comma_and_dot(old_price));
           const new_price = Number(cancel_comma_and_dot(desired_price));

           
         
          const percentage =  ((new_price - original_price) / original_price) * 100;
             const round_percentage_number = Math.round(percentage)
             const percentage_toString = round_percentage_number.toString();
         const add_percentage_to_number = percentage_toString.indexOf('-') !== -1 ? percentage_toString.split('-')[1] + '%' : percentage_toString + '%';
        
          return {old_price:original_price,new_price,discount_percentage:add_percentage_to_number}// working one carefull;
         
      }
  
      return {old_price:'',new_price:desired_price,discount_percentage:''}// incorrect but for now!!!!!! resolve 
  
  } 

 export const format_number_with_dot = (number:number,currency_symbol:string)=>{
      // numbers bigger or equal with 1000 gets a dot after the first figure 
      // 10.000 , 500.000 ,til 999.999
        const number_to_change = Number(number);
        const make_the_number_string =number_to_change.toString()
        
        let add_dot_to_the_number;
       // let formated_number; 
       if(number_to_change <= 999) return `${number_to_change} ${currency_symbol.trim()}`;

       if(number_to_change >= 1000 && number_to_change <= 9999){
        add_dot_to_the_number = `${make_the_number_string.slice(0,1)}.${make_the_number_string.slice(1,make_the_number_string.length)} ${currency_symbol.trim()}`
        return add_dot_to_the_number
       }
       if(number_to_change >= 10000 && number_to_change <= 99999){
        add_dot_to_the_number = `${make_the_number_string.slice(0,2)}.${make_the_number_string.slice(2,make_the_number_string.length)} ${currency_symbol.trim()}`
       // add_dot_to_the_number = make_the_number_string.slice(0,2) +'.'+ make_the_number_string.slice(2,make_the_number_string.length)
        return add_dot_to_the_number
       }
       if(number_to_change >= 100000 && number_to_change <= 999999){
        add_dot_to_the_number = `${make_the_number_string.slice(0,3)}.${make_the_number_string.slice(3,make_the_number_string.length)} ${currency_symbol.trim()}`
       
        return add_dot_to_the_number
       } 
   
       return `do you sell a home man? Jesus.., look at this number ${number_to_change}   O_O`;

  }


  