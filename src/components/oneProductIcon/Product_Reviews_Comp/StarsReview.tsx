import React,{useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'

interface StarsReviewProps {
    sendScoreCallback:any
}
 
const StarsReview: React.FC<StarsReviewProps> = ({sendScoreCallback}) => {


 
   const [initial_stars_color,setInitial_Stars_Color] = useState(['black-star','black-star','black-star','black-star','black-star'])
  
   const [selected_score,setSelectedScore] = useState(0);
 

   const [stars_color,setStarsColor] = useState([...initial_stars_color]);

   

const add_yellow_class_strings = ({target}:any,set_initial_stars_color?:boolean)=>{
  
  const selected_hoverOver_score = target.getAttribute("data-scoreReview");
  const score_number = Number(selected_hoverOver_score) - 1;
 
  let new_stars_classes_arrangement:string[] = []

  for(let i = 0;i<=4;i++){
      if(i<=score_number){
        new_stars_classes_arrangement.push('yellow-star');
      }
      if(i>score_number){
        new_stars_classes_arrangement.push('black-star');
      }
   
  }
 
 
 if(set_initial_stars_color === undefined || set_initial_stars_color === false) setStarsColor(new_stars_classes_arrangement);
 
 if(set_initial_stars_color === true) {
     setInitial_Stars_Color(new_stars_classes_arrangement)
     setSelectedScore(Number(selected_hoverOver_score))
    
    };
}

const reduce_all_stars_to_initial_color = ()=>{
    

    setStarsColor([...initial_stars_color]);
}




  sendScoreCallback(selected_score)

    return (  
    <div className="stars-wrapper" onMouseLeave={()=>{reduce_all_stars_to_initial_color()}}>
        <span className={`review-star ${stars_color[0]}`} 
              data-scoreReview='1' 
              onClick={(event)=>{add_yellow_class_strings(event,true)}}
              onMouseOver={(event)=>{add_yellow_class_strings(event)}}>
                  <FontAwesomeIcon icon={faStar} style={{pointerEvents:'none'}}/>
            
        </span>
        <span className={`review-star ${stars_color[1]}`} 
              data-scoreReview='2'
              onClick={(event)=>{add_yellow_class_strings(event,true)}} 
              onMouseOver={(event)=>{add_yellow_class_strings(event)}}>

                <FontAwesomeIcon icon={faStar} style={{pointerEvents:'none'}}/>
        </span>
        <span className={`review-star ${stars_color[2]}`} 
              data-scoreReview='3' 
              onClick={(event)=>{add_yellow_class_strings(event,true)}}
              onMouseOver={(event)=>{add_yellow_class_strings(event)}}>
                  <FontAwesomeIcon icon={faStar} style={{pointerEvents:'none'}}/>
        </span>
        <span className={`review-star ${stars_color[3]}`} 
              data-scoreReview='4'
              onClick={(event)=>{add_yellow_class_strings(event,true)}} 
              onMouseOver={(event)=>{add_yellow_class_strings(event)}}>
                   <FontAwesomeIcon icon={faStar} style={{pointerEvents:'none'}}/>
        </span>
        <span className={`review-star ${stars_color[4]}`} 
              data-scoreReview='5'
              onClick={(event)=>{add_yellow_class_strings(event,true)}} 
              onMouseOver={(event)=>{add_yellow_class_strings(event)}}>
                   <FontAwesomeIcon icon={faStar} style={{pointerEvents:'none'}}/>
        </span>
    </div>
 );
}
 
export default StarsReview;