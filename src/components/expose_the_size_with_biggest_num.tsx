export const expose_the_size_with_biggest_num = (sizes:any)=>{
    let biggest_number = 0;
    let keySizeOfBiggestNumber = '';
   Object.entries(sizes).forEach(([keySizeName,availableInStore]:any)=>{
         if(availableInStore > biggest_number) {
           biggest_number = availableInStore;
           keySizeOfBiggestNumber = keySizeName;
         }
   })

   return {keySizeOfBiggestNumber,biggest_number};
}