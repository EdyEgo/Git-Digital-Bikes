  import React,{useState} from 'react';
  import { useParams, BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faSearch,faPhoneAlt,faShoppingBag,faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'


//  ,  <FontAwesomeIcon icon={faArrowRight} /> 

interface ImagePresentationListProps{
  pageState:string,
  productDetails:any,
  productName:string,cylinder_capacity?:string | number,
  brandName:string,
  productDescription?:any,
  replacement?:any,
  fromBrand?:string
}





  const ImagePresentationList: React.FC<ImagePresentationListProps> = ({pageState,productDetails,productName,cylinder_capacity,brandName,productDescription,replacement,fromBrand}) => {
    
      
   
   

    const image_path_modifier = (modifi_image_number?:number | undefined)=>{
     

        if(modifi_image_number)return `../${pageState}/${brandName}/${cylinder_capacity}/${productName}(${modifi_image_number}).${'jpg'}`
           
        return `../${pageState}/${brandName}/${cylinder_capacity}/${productName}(0).${'jpg'}`;
    } 

    const [mainImage,setMainImage] = useState<any>(undefined);
    
     


   

    let current_loaded_picture_number = 0;// 
    let store_pictures_links:any = []; 
     
    let storeImages:any = [];


      


     const navigate_pictures_with_arrow_click = ({target}:any)=>{
      
      
        const arrow_value = target.getAttribute("data-image_swipe");
    
        
        const is_next_number_not_in_pictures_array = (next_number:number)=>{
              // if(next_number > store_pictures_links.length -1 || next_number < store_pictures_links.length -1) return true;
              if(mainImage === undefined) return false;
              
              if( next_number > storeImages.length -1 || next_number < 0) return true;
               return false;
        }
     
        let next_number;

        if(arrow_value === '+'){
              
               next_number = typeof mainImage === 'object' ? mainImage.index + 1 : 1
               

              if(is_next_number_not_in_pictures_array(next_number)){
                
               
                setMainImage({shownedImage:storeImages[0],index:0})
                
                 return;
                };
            
               
                setMainImage({shownedImage:storeImages[next_number],index:next_number})
               
           
           return;
        }
        
         if(arrow_value === '-'){
               // next_number =  current_loaded_picture_number - 1;
                next_number  = typeof mainImage === 'object' ? mainImage.index - 1 : storeImages.length - 1;

                if(is_next_number_not_in_pictures_array(next_number)){
               // current_loaded_picture_number = store_pictures_links.length - 1; 
                    
                setMainImage({shownedImage:storeImages[storeImages.length - 1],index: storeImages.length - 1})
                  
                return;
                };
            
               
                setMainImage({shownedImage:storeImages[next_number],index:next_number});
             

            
         }
     
     
     
        }


      


      const images_reqested = async(image_number?:number | undefined)=>{// so you can t  dynamically require so this funtion is the right answer
   
           
       const stored_images_object = {

       } 


       if(image_number === undefined){
        const req1 = await import(`../${pageState}/${brandName}/${cylinder_capacity}/${productName}(0).${'jpg'}`);
        current_loaded_picture_number += 1; 
        
        store_pictures_links.push(req1);
        images_reqested(current_loaded_picture_number);
        return;
       } 

       if(image_number && image_number + 1 === productDetails.pictures_available){
       
        
        return;
       }

       if(image_number && image_number !== productDetails.pictures_available){
         const req1 = await import(`../${pageState}/${brandName}/${cylinder_capacity}/${productName}(${image_number}).${'jpg'}`);
         current_loaded_picture_number += 1;


         store_pictures_links.push(req1);
         images_reqested(current_loaded_picture_number)
       }
     
    
       

            

      }
       
      
   




 const load_product_images_list = ()=>{// see if you have any images and a property
   
  const replace_underscore_with_space = (product_name:string)=>product_name.split('_').join(' ');

   let available_picture_number// = productDetails.pictures_available;
  
  if(productDetails === undefined || productDetails.hasOwnProperty('pictures_available') === false)  return;
   
  available_picture_number = productDetails.pictures_available;
  
  if(available_picture_number <= 0)return;

  if(pageState.toLowerCase() === 'equipment'){ // equipment
 
    for(let i = 0;i<=available_picture_number;i++){
        const current_num = i;
        
        
    
        
        storeImages
        .push(<img data-imageIndex={i}  className={`image-presentation`}
          src={`/productImages/${pageState}/${brandName}/${replace_underscore_with_space(productName)}(${current_num}).${'jpg'}`} 
          alt={`Two Wheels Life Logo`} />
        )

    }
    return;
  }

  
  if(pageState.toLowerCase() === 'motorcycles'){
   
    for(let i = 0;i<=available_picture_number;i++){ 
      const current_num = i;
    
     
      
      
      storeImages
      .push(<img data-imageIndex={`${i}`} className={`image-presentation `} src={`/productImages/${pageState}/${brandName}/${cylinder_capacity}/${replace_underscore_with_space(productName)}(${current_num}).${'jpg'}`} alt={`Two Wheels Life Logo`} style={{width:'100%',height:'100%'}}/>)
      
    } 
    return;
  }
    
 

 
 }

 const change_Main_Image_On_List_Click = ({target}:any)=>{
 
   
   
      setMainImage({shownedImage:storeImages[target.getAttribute("data-imageIndex")],index:Number(target.getAttribute("data-imageIndex"))})
  
 }


 load_product_images_list();

 
 

    return (
        <div className="product-image-list-plus-main-image">

            <div className="main-image-container" style={{display:'flex',flexDirection:'row',marginBottom:'1em',justifyContent:'center',alignItems:'center'}}>{/**make a mouse trap for the main image if you want */}
                 <div className="left-arrow-change-picture-container" data-image_swipe={'-'} onClick={(event)=>navigate_pictures_with_arrow_click(event)} style={{cursor: "pointer"}}><i style={{pointerEvents:'none'}}><FontAwesomeIcon icon={faArrowLeft} /></i></div>
                
                <div className="main-image" >
                    {mainImage === undefined && storeImages[0]}
                    {typeof mainImage === 'object' && mainImage.shownedImage}
                    

                </div>
                
                <div className="right-arrow-change-picture-container" data-image_swipe={'+'} onClick={(event)=>navigate_pictures_with_arrow_click(event)} style={{cursor: "pointer"}}><i style={{pointerEvents:'none'}}><FontAwesomeIcon icon={faArrowRight} /></i></div>
            </div>

            <div className="side-image-list-container" >
             
            
                    
                    
                    {storeImages.length > 0 && storeImages.map((individual_image:any,index:any)=>{
                             
                            
                            return(
                                 <div className="single-image-list" style={{cursor:'pointer'}} onClick={(event)=>{change_Main_Image_On_List_Click(event)}}>
                                     {individual_image}
                                 </div>
                            )
                      })
                    } 
                    
            </div>
                            
        </div> 
    )
  }
  
  export default ImagePresentationList