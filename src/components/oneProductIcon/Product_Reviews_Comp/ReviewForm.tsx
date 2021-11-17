import React,{useState,useRef} from 'react';
import StarsReview from './StarsReview';

interface ReviewFormProps {
    visible:boolean,
    sendFormInfoCallback?:any,
    reviews:any,
    logedInUser?:undefined | any
}
 
const ReviewForm: React.FC<ReviewFormProps> = ({visible,sendFormInfoCallback,reviews,logedInUser}) => {

    const stars_score_count = useRef<number>(); 

    const [noStarSelected,setNoStarSelected] = useState(false)
  

 
   const [showWarningEmailMessage,setShowWarningEmailMessage] = useState(false)
 
   const [neverShowFormAgain,setNeverShowFormAgain] = useState(false);

    const setTimeout_cancel_warning_message = (boolean_value:boolean,setFunction:any)=>{
  
        if(showWarningEmailMessage){
            setTimeout(()=>{
                
                setFunction(!boolean_value)
              //  setShowWarningEmailMessage(!boolean_value);
              
    
            },3000);
            return;
        }
       
     

    }

    const setSelectedScore = (selectedScore:number)=>{
        stars_score_count.current = selectedScore
       
    }


    const handle_submit = (event:any)=>{
        event.preventDefault();
        
     
    
    const input_email = event.target.inputEmail.value.trim();// apply trim() to email and title and name
    const input_name = event.target.inputName.value.trim();
    const stars_score = stars_score_count
    const input_title = event.target.inputTitleForm.value.trim();
    const input_textarea = event.target.inputTexareaForm.value.trim();
    
  

    let do_not_send_data = false;

      Object.entries(reviews).forEach(([stringDateReview, ReviewValues]:any)=>{
           
        if(stringDateReview.toLowerCase() !== 'size' && ReviewValues.user_email === input_email){
           
            setShowWarningEmailMessage(true);
            
            setNeverShowFormAgain(true);
           
           setTimeout(()=>{setShowWarningEmailMessage(false)},3000)

            do_not_send_data = true;
        }

      })
      // if stars_score_count is undefined or is equal with 0 don t send the data
      
      if(do_not_send_data) return;
     
      if(stars_score.current === undefined || stars_score.current === 0){

        setNoStarSelected(true);
       
       setTimeout(()=>{setNoStarSelected(false)},3000)
        return;
      }

      sendFormInfoCallback({input_email,input_name,input_title,input_textarea,stars_score,date:new Date().toLocaleDateString()})

    }
  
    
    
    const class_visible = visible ? '' : 'hide'
 
 

    return (  
        <>
        {neverShowFormAgain === false && 
        <form onSubmit={(e)=>{handle_submit(e)}} className={`write-a-review-form ${class_visible}`}>
        <div className="form-review-title-container">
            <h2 className="write-review-form-title">Write A Review</h2>
        </div>
   
        <div className="mandatory-form-explain"> 
          <span className="mandatory-form-mark" style={{color:'red'}}>* </span> Indicates a required field
        </div>
        <div className="review-score-title-container">
          <span className="mandatory-form-mark" style={{color:'red'}}>* </span> 
           Leave A Rating
        </div>

        
        <StarsReview sendScoreCallback={setSelectedScore}/>
        {noStarSelected && <h3 className="please-select-score-msg">Please select your score!</h3>}
        <div className="chose-title-form--container">
            <span className="title-word-form">
                <span className="mandatory-form-mark" style={{color:'red'}}>* </span> 
                 Title
            </span>
            <input type="text" required className="chose-title-input" name='inputTitleForm' placeholder="Choose your Title"/>
        </div>
        <div className="text-area-form">
            <div className="review-word--container-form">
                <span className="review-word-form"><span className="mandatory-form-mark" style={{color:'red'}}>* </span> Review</span>
            </div>
            <textarea name="inputTexareaForm" required id="text-form" cols={47} rows={20} ></textarea>
        </div>
        <div className="footer-name-email-container">
            <div className="credentials-inputs-container" >
                 <div className="form-input-name-container">
                     <div className="title-mandatory-name-input">
                        <span className="mandatory-form-mark" style={{color:'red'}}>* </span>
                        Use your name
                     </div>
                     <div className="input-name-form-div">
                       <input type="text" required className="input-name" name='inputName' placeholder='Your name goes here'/>
                     </div>
                 </div>

                 <div className="form-input-email-container">
                     <div className="title-mandatory-email-input">
                        <span className="mandatory-form-mark" style={{color:'red'}}>* </span>
                        Email
                     </div>
                     <div className="input-eamil-form-div">
                       {logedInUser === undefined && <input type="text" required className="input-email" name='inputEmail' placeholder='Your email goes here'/>}
                       {typeof logedInUser === 'object' && logedInUser.hasOwnProperty('email') && <p>Your review will be published with this email: <span> {logedInUser.email}</span></p>}
                     </div>
                 </div>
            </div>


            <div className="submit-review-form-container" style={{display:'flex',justifyContent:'center'}}>
                <input type="submit" className="submit-review-btn" name="inputSubmitReview" value="Submit Review"/>
            </div>
        </div>
    </form>
    
    }

    {showWarningEmailMessage && <h2>This email allready has a review on his name! </h2>}

    </>
 );
}
 
export default ReviewForm;