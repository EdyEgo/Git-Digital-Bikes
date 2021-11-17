
 
export const Find_Product_Details_In_Product_Object = (productObject:any) => {
    // returns productDetails,productName ,brandName and maybe a new directions_string_by_local_obj

    let brandName;
    let  productName;
    let productDetails;


     Object
    .entries(productObject)
    .forEach(([productNameObj,productValue]:any)=>{
         
        brandName = productValue.brand;
        productName= productNameObj;
        productDetails = productValue;

        

    })

    return {brandName,productName,productDetails}
    
}
 
 