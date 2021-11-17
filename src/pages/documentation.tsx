import React,{useContext,useRef} from 'react'; 
import { useParams } from "react-router-dom";
import { LocalMemoryCategoryItemsContext } from '../LocalMemoryCategoryItemsContext';





interface DocumentationPageProps {
    
}
 
const DocumentationPage: React.FC<DocumentationPageProps> = () => {
  
    const {id}:any = useParams();
 

   

    window.scrollTo(0, 0);
    const storedDocumentationPageContext = useContext(LocalMemoryCategoryItemsContext);
    const usefull_info = storedDocumentationPageContext.useful_info_obj.current;
   
   

   const functions_object:any = {
        about_us:(about_us_obj:{title:string,secondary_title:string,text:string})=>{
          const {title,secondary_title,text} = about_us_obj;


             return(
                 <div className="about-us-container">
                       <div className="about-us-first-title">
                             {title}
                       </div>

                       <div className="about-us-sec-title">
                              {secondary_title}
                       </div>

                       <div className="about-us-text-container">
                              {typeof text === 'string' && text}
                              {Array.isArray(text) && text.map(text_portion=><p className='about-use-text-portion'>text_portion</p>)}
                       </div>

                 </div>
             )

        },

        delivery_and_payment:(delivery_payment_obj:{delivery:string[],payment:string[]})=>{
      
            const {delivery,payment} = delivery_payment_obj

            return (
              <div className="delivery-and-payment-info-container">
                   <div className="delivery-container">
                       <ul className="delivery-list">
                           {delivery.map(option=><li className='delivery-option'>{option}</li>)}
                       </ul>
                   </div>
                   <div className="payment-container">
                       <ul className="payment-list">
                          {payment.map(option=><li className='payment-option'>{option}</li>)}
                       </ul>
                   </div>

              </div>
            )  
        },
        
        refund:(refund_obj_info:any)=>{
                
                 let refund_list:any = [];
                 const normalize_words = (words:string)=>words.split('_').join(' ');

           
            
                    (()=>{
                        Object.entries(refund_obj_info).forEach(([refundTitle,refundtext]:any)=>{
                            
                            refund_list.push(
                                <li className='refund-option'> 
                                <div className="refund-option-title">{normalize_words(refundTitle)}</div>

                                <div className="refund-option-text">{refundtext}</div>

                                </li>

                            )


                        })


                    })()

                    return(
                        <div className="refund-container">
                            <ul className="refund-list">
                                {refund_list}
                            </ul>
                            
                        </div>

                    )
         }

   }
  
   const trimed_id = id.trim()

    

    return (  
       
      <div className="documentation-container">  
      
         {functions_object[trimed_id](usefull_info[trimed_id])}
      </div>
       
     
    );
}
 
export default DocumentationPage;