import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp,faThumbsDown,faStar } from '@fortawesome/free-solid-svg-icons';
import { firestore } from '../../../firebase';
//import {firestore} from "./firebase";
 


interface ReviewCardProps {
    dateString:string,// exmp: 9/16/2021
    valueInfoObject:{
        comment:string,
        comment_title:string,
        likes:{size:number},
        dislikes:{size:number},
        post:boolean,
        stars:number,
        user_name:string,
        verified_buyer:boolean,
        user_email?:string
    },
    logedInUser?:{email:string} | undefined,
    selectedThumbFunc:any
}
 
const ReviewCard: React.FC<ReviewCardProps> = ({dateString,valueInfoObject,logedInUser,selectedThumbFunc}) => {

    
  

   const {comment,comment_title,likes,dislikes,post,stars,user_name,verified_buyer} = valueInfoObject;

   const user_selected_thumb =()=>{
  
  
    if(logedInUser === undefined) return {likeThumb:'',dislikeThumb:''};
    
     const logedUserEmail = logedInUser.email 
 
     if(likes.size > 0){
           Object.entries(likes).forEach(([user_emailKey,user_emailValue]:any)=>{
               if(user_emailKey.trim() === logedUserEmail){
                 return {likeThumb:'selectedThumb',dislikeThumb:''};
               }
           })
     }
  
     if(dislikes.size > 0){
         Object.entries(likes).forEach(([user_emailKey,user_emailValue]:any)=>{
             if(user_emailKey.trim() === logedUserEmail){
                 return {likeThumb:'',dislikeThumb:'selectedThumb'};
             }
         })
          
     }
    
     return {likeThumb:'',dislikeThumb:''};
  };


   const [thumbsColorClasses,setThumbsColorClasses] = useState(user_selected_thumb()) // pass the set funtion to productReviewsApp

   const [log_In_To_Give_A_Thumb,set_Log_In_To_Give_A_Thumb] = useState({displayMsg:false,intendedThumb:''});// set to true then afte call a setTimeout to next line


  
  if(post === false) return<></>;

 



  
 
  
 
  
 

  

  const handle_add_stars = ()=>{

  
    let copy_number_stars:number = stars

    const five_stars:any = [];


    const add_color_five_stars = ()=>{
        for(let i = 0;i<5;i++){ 
              const add_yellow_star_class = copy_number_stars > 0 ? 'yellow-star' : '';

            five_stars.push(<span><FontAwesomeIcon className={`star ${add_yellow_star_class}`} icon={faStar} /></span>)

            copy_number_stars = copy_number_stars -1;

        }
    
     
    }
   
    add_color_five_stars()



     return (
       <div className="stars-reviewer-container">
              {five_stars}
       </div>
    )
  }
 
 
const manage_thumbs_logic_selection = (didUser_selected_same_thumb:boolean,selected_diffrent_thumb:boolean,selected_first_time_thumb:boolean,pressedThumb:string)=>{
 
   if(typeof selectedThumbFunc !== 'object') return;

   if(didUser_selected_same_thumb){
    selectedThumbFunc({deleteThumb:pressedThumb,keyReviewDate:dateString,writeThumb:''},setThumbsColorClasses);
    return;
   }
   if(selected_diffrent_thumb){
    const thumbToDelete = thumbsColorClasses.likeThumb !== ''? thumbsColorClasses.likeThumb :thumbsColorClasses.dislikeThumb !== '' ?
     thumbsColorClasses.dislikeThumb : '';
     selectedThumbFunc({writeThumb:pressedThumb,deleteThumb:thumbToDelete,keyReviewDate:dateString},setThumbsColorClasses);
     return;
   }
 
   if(selected_first_time_thumb){
     selectedThumbFunc({writeThumb:pressedThumb,deleteThumb:'',keyReviewDate:dateString},setThumbsColorClasses)
   }

   
}


  const give_like_to_one_review = ({target}:any)=>{
    

    if(log_In_To_Give_A_Thumb.displayMsg === true) return; // so the set timeout does not get called 1 mil times for no reason
    const selectedThumb = target.getAttribute("data-thumbType");
    
        if(logedInUser === undefined){// maybe disable the button when display msg is set to true
            
            set_Log_In_To_Give_A_Thumb({displayMsg:true,intendedThumb:`${selectedThumb}`});
            setTimeout(()=>{
                set_Log_In_To_Give_A_Thumb({displayMsg:false,intendedThumb:''});

            },3000);

        }

   
   
   // this funtion sends {deleteThumb:'like' / 'dislike'/'',keyReviewDate:dateString,writeThumb:'like'/'dislike'/''}
 
   if(selectedThumb === 'like' && thumbsColorClasses.likeThumb === 'selectedThumb' || selectedThumb === 'dislike' && thumbsColorClasses.dislikeThumb === 'selectedThumb'){// same thumb select
       
    manage_thumbs_logic_selection(true,false,false,selectedThumb);
    return;
   }

   if(thumbsColorClasses.likeThumb === 'selectedThumb' || thumbsColorClasses.dislikeThumb === 'selectedThumb'){ // diffrent thumbs selection
    manage_thumbs_logic_selection(false,true,false,selectedThumb);
    return;

   }
   if(thumbsColorClasses.likeThumb === '' && thumbsColorClasses.dislikeThumb === ''){ // first time selection
    manage_thumbs_logic_selection(false,false,true,selectedThumb);
    return;
   }
  
    
    


   
   
     

  }

 


    return (  
       <div className="reviewCard-container">
             <div className="reviewCard-header">


            <div className="reviewer-card-info-container">

           
                  <span className="reviewer-icon">
                      <span className="reviewer-letter">{user_name[0].toUpperCase()}</span>
                  
                  </span>

                  <div className="reviewer-info-container">
                        <div className="reviewer-name-and-buyer-verified">
                            <span className="user-name">{user_name}</span>
                            <span className="buyer-verified">{verified_buyer && <p className='verified-buyer-p'>Verified buyer</p>}</span>
                        </div>
                        <div className="reviewer-stars-left-container">
                            {handle_add_stars()}
                        </div>
                  </div>
            </div>

                  <div className="reviewer-review-left-date">

                       {dateString}
                  </div>

             </div>

             <div className="reviewCard-main">
                  <div className="main-content-title-container">
                       <span className="content-review-title" style={{fontWeight:'bold'}}>
                          {comment_title}
                       </span>
                  </div>
                  <div className="main-content-text-container">
                     <span className="content-review-text">
                         {comment}
                     </span>

                  </div>
             </div>

             <div className="reviewCard-footer">
                <div className="helpful-leave-a-like-dislike-to-this-comment">
                    <div className="was-this-review-helpful-question">Was This Review Helpful to You?</div>
                    <div className="like-dislike-container" style={{display:'flex',justifyContent:'space-around'}}>
                        <div className="like-container"
                        data-thumbType = 'like'
                        onClick={(event)=>{give_like_to_one_review(event)}} style={{cursor:'pointer'}} 
                        >
                            <FontAwesomeIcon icon={faThumbsUp} 
                             style={{pointerEvents:'none'}}
                            className={`${thumbsColorClasses.likeThumb}`}/>
                            <span className="likes-number">{likes.size}</span>
                        </div>
                        <div className="dislike-container"
                        data-thumbType = 'dislike'
                        onClick={(event)=>{give_like_to_one_review(event)}} style={{cursor:'pointer'}}
                        >
                         <FontAwesomeIcon icon={faThumbsDown} 
                         style={{pointerEvents:'none'}}
                         className={`${thumbsColorClasses.dislikeThumb}`}/>
                         <span className="dislikes-number">{dislikes.size}</span>
                        </div>
                    </div>
                    {log_In_To_Give_A_Thumb.displayMsg && <div className="user-must-be-loged-in-to-leave-a-thumb-container">
                        <h3 className="you-must-be-logedIn-text-for-thumbs" onClick={()=>{console.log('i am not gonna log you in')}}>You must be Loged In to give a {log_In_To_Give_A_Thumb.intendedThumb}</h3>
                    </div>}
                </div>
             </div>
       </div>
 );
}


export default ReviewCard;