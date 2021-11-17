import React,{useRef,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faPen } from '@fortawesome/free-solid-svg-icons'
import ReviewCard from './ReviewCard';

import ReviewForm from './ReviewForm';
import { firestore,increment,decrement,timeStamp,deleteFirestore } from '../../../firebase';

//  ,  <FontAwesomeIcon icon={faStar} /> // #fec600
interface ProductReviewsAppProps {
    reviews?:any,
    logedInUser?:any,// .user_email,
    pageState:string,
    category:string, // ex helmets , gloves
    keyProductName:string,
    brandName:string
}
 
const ProductReviewsApp: React.FC<ProductReviewsAppProps> = ({reviews,logedInUser,category,pageState,keyProductName,brandName}) => { 
   
  
  const loged_user_email = typeof logedInUser === 'object' ? logedInUser.email : ''
    
  const [showReviewForm,setShowReviewForm] = useState(false);

  const form_submit_info = useRef({});

  const write_submit_info = (form_info_object:{input_email:string,input_name:string,input_title:string,input_textarea:string,date:string})=>{
      
    form_submit_info.current = form_info_object;

  }

   let user_allready_left_a_review = false;

  const formInfo = useRef<any>(undefined);

 
  

  const show_or_hide_form = ()=>{


    if(formInfo.current === undefined){
        setShowReviewForm(!showReviewForm)
    } 


  }

 

 const calculate_Average_number_reviews = (reviews_object:any)=>{
     
    // 30 divided by 6 so sum of numbers divided by total number of numbers
   
   if(reviews_object === undefined) return {averageNumberStars:0,totalReviews:0};

     let sum_of_all_numbers; 
     let total_number_of_numbers; 
  
     const extracted_numbers:number[] = [];
  
     Object.entries(reviews_object).forEach(([commentDateString,commentDataObject]:any)=>{
         // if post:true then take the .stars number into consideration

        if(commentDataObject.post) extracted_numbers.push(commentDataObject.stars);
        
         
  
     })
  
     total_number_of_numbers = extracted_numbers.length; 
  
     sum_of_all_numbers =  extracted_numbers.reduce((accumulator,currentValue)=>{
        
        return accumulator + currentValue;
  
  
     },0);
  
    
     return {averageNumberStars:sum_of_all_numbers / total_number_of_numbers,totalReviews:extracted_numbers.length}
  
  
   } // maybe round this number you know
// and we need another component that is a card type  comment review
 
 
 const {averageNumberStars,totalReviews} = calculate_Average_number_reviews(reviews);

const handle_stars_and_sum_reviews_container = ()=>{
    
   let copy_average_number = averageNumberStars

    const five_stars:any = [];


    const add_color_five_stars = ()=>{
        for(let i = 0;i<5;i++){ 
              const add_yellow_star_class = copy_average_number > 0 ? 'yellow-star' : '';

            five_stars.push(<span><FontAwesomeIcon className={`star ${add_yellow_star_class}`} icon={faStar} /></span>)

            copy_average_number = copy_average_number -1;

        }
    
     
    }
   
    add_color_five_stars()


    return (
    <div className="stars-and-sum-review-container"> 


       <div className="stars-container">
            {five_stars}
       </div>


       <div className="sum-review-container">
           {totalReviews} Review{ totalReviews > 1 && <span>s</span>}
           
       </div>    
    
    </div>


 )

} 


const modifi_data_base_reviews_thumbs = async(directions_thumbs_object:{deleteThumb:string,keyReviewDate:string,writeThumb:string},callbackSetReviewCartThumbs:any)=>{//async
 // callbackSetReviewCartThumbs is a way to reRender the comp after the database has return some info
    

 // callback must recive this object ex: {likeThumb:'',dislikeThumb:'selectedThumb'} 
 const pageState_LowerCase = pageState.toLowerCase();

 const {deleteThumb,keyReviewDate,writeThumb} = directions_thumbs_object

  const make_thumb_name_plural = (word:string)=>{
    // const write_thumb_plural = writeThumb !== '' ? writeThumb + 's' : '';
    // const delete_thumb_plural = deleteThumb !== '' ? writeThumb + 's' : '';

    // return {write_thumb_plural,delete_thumb_plural}
      return word + 's';
  }
 

 
 

const manage_new_thumbs_object_database = ()=>{

   // const make_thumb_name_plural = (word:string)=> word + 's';
  
    // left here
     const base_object = { 
         [brandName]:{
             [keyProductName]:{
                 "reviews":{
                     [keyReviewDate]:{
                         // [write_thumb_plural]:{
                         //     "size":increment, 
                         //     [loged_user_email]:timeStamp
                         // }
                     }
                 }
             } // left here
         }
  
     }
    
  
   
   
    const write_new_thumb =  writeThumb !== '' ? //{[make_thumb_name_plural(writeThumb)]:{ // just keep this object and use make_thumb_name_plural(writeThumb)
      {"size":increment, 
      [loged_user_email]:timeStamp
  } : undefined;
  
  const delete_a_thumb = deleteThumb !== '' ?  
  //[make_thumb_name_plural(deleteThumb)]:{
     {[loged_user_email]:deleteFirestore,
     "size":decrement,
  }
     : undefined
  
  
  
  
   let new_base_object_with_thumbs;
  
   
  
     if(typeof write_new_thumb === 'object'){
       
       new_base_object_with_thumbs = write_new_thumb
      
      
     } 
  
     // better 
  
     if(typeof delete_a_thumb === 'object'){
         new_base_object_with_thumbs = {[make_thumb_name_plural(writeThumb)]:new_base_object_with_thumbs,[make_thumb_name_plural(deleteThumb)]:delete_a_thumb} // yea but you will have an object named delete_a_thumb with the right value ,nee
         
       
     }
  
   
     
    if(new_base_object_with_thumbs) base_object[brandName][keyProductName].reviews[keyReviewDate] = new_base_object_with_thumbs;
   
  
    
  
   
    return {base_object,useBrandName:brandName};
  }
 

  const {base_object,useBrandName}:any = manage_new_thumbs_object_database();

  const setDataBaseTest_write = await firestore.collection(`digital-bikes`).doc(`${pageState_LowerCase}`).collection(`${pageState_LowerCase}Collection`).doc(`${category}`).set({
            "brands_available": {
                [useBrandName]:base_object[brandName]
           }
  },{merge:true})


  const callback_thums_object = writeThumb !== '' && writeThumb === 'like' ? {likeThumb:'selectedThumb',dislikeThumb:''} :
  writeThumb !== '' && writeThumb === 'dislike' ? {likeThumb:'',dislikeThumb:'selectedThumb'} : {likeThumb:'',dislikeThumb:''}

  callbackSetReviewCartThumbs(callback_thums_object)
 
 

}




    return (  
         <> 


    <div className="reviews-title-header">
        <div className="reviews-title">
            <span className="review-title-span">Reviews</span>
        </div>
        
    </div>
     
     <div className="leave-a-review-section" style={{display:'flex',justifyContent:'space-between'}}>
         <div className="average-stars-reviews">
             

             {handle_stars_and_sum_reviews_container()}
         </div>

          <div className="leave-complete-review-btn">
              <button className="btn-leave-review" onClick={()=>{show_or_hide_form()}}>
                  <span><FontAwesomeIcon style={{pointerEvents:'none'}} icon={faPen} /> </span>
                  Leave A Review
              </button>
          </div>
     </div>
     
     <div className="write-a-review-form-container">
      
 

      <ReviewForm visible={showReviewForm} sendFormInfoCallback={write_submit_info} reviews={reviews} logedInUser={logedInUser}/>
     </div>
    
    
    <div className="reviews-left-container">

        { reviews !== undefined &&
            Object.entries(reviews).map(([ReviewDateString,ReviewDataInfo]:any)=>{
                if(ReviewDataInfo.post){
                    return (
                        <ReviewCard dateString={ReviewDateString} 
                            valueInfoObject={ReviewDataInfo}
                            logedInUser={undefined}
                            selectedThumbFunc={modifi_data_base_reviews_thumbs}

                        />
                    )
                }
                

            })
        }
         

    </div>
    </>
 );
}
 
export default ProductReviewsApp;





//




// {
        
//     [brandName]:{
//         [keyProductName]:{
//             "reviews":{
//                 [keyReviewDate]:{
//                     ["dislikes"]:{
//                         "size":decrement, 
//                         "some.randomMail":'9/19/2021'
//                     }
//                 }
//             }
//         } // left here
//     }
// }