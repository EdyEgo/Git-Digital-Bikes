import React,{useContext,useRef,useState} from 'react'; 
import { useParams } from "react-router-dom";
import { LocalMemoryCategoryItemsContext } from '../LocalMemoryCategoryItemsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone,faMailBulk,faCheck } from '@fortawesome/free-solid-svg-icons'
import { firestore,timeStamp } from '../firebase';



interface ContactUsPageProps {
   
}
 
const ContactUsPage: React.FC<ContactUsPageProps> = () => {

    //const {id}:any = useParams();

    window.scrollTo(0, 0);

    const storedDocumentationPageContext = useContext(LocalMemoryCategoryItemsContext);
    const {logedInUser} =storedDocumentationPageContext;
    const usefull_info = storedDocumentationPageContext.useful_info_obj.current;
    const contact_info= usefull_info.contact;

    
 
    
    
    const {phone,email} = contact_info;

    
 
  

    const required_advice_object = {nameField:'',emailField:'',messageField:''}
    const advice_message_object ={nameFieldMsg:'',emailFieldMsg:'',messageFieldMsg:''}

  const [adviceFieldRequired,setAdviceFieldRequired] = useState(required_advice_object);
  const [adviceFieldMessage,setFieldMessage] = useState(advice_message_object);

  const {nameField,emailField,messageField} = adviceFieldRequired;
  const {nameFieldMsg,emailFieldMsg,messageFieldMsg} = adviceFieldMessage;
 
 

  const [messageSent,setMessageSent] = useState(false);
  const [warningMessage,setWarningMessage] = useState(false);
 
    
 
   const icon_style_background_Obj = {backgroundColor:'#ee2d43',color:'white'};
   //const submit_button_styles = {cursor:'pointer',backgroundColor:'#ee2d43',color:'white',border:'none',fontWeight:600,padding:'0.6em 0.6em',letterSpacing:'2px'}
  

   const verify_valid_email = (checked_email:string)=>{
   


     const regEx= /\S+@\S+\.\S+/;
    return regEx.test(checked_email);

    
   }
  
   const add_required_class = (name:string,email:string,message:string)=>{
    
    const new_required_advice_object:any = {};
    const new_advice_message_object:any = {};

 
    const nameField = name !== '' && name.length > 1 ? '' : 'requiredField';
    const emailField = email !== '' ?  email.length >= 7 ? 
          '' : 'requiredField' : 'emailLengthTooSmall';
    const messageField =  message !== '' ? '' : 'requiredField';//'This field is required(boring message) :)'   

          new_required_advice_object['nameField'] = nameField;
          new_advice_message_object['nameFieldMsg'] =  name.length < 2 ? 'Is your name really that "long" ? :) Please chose another one!' : '';

   const is_email_in_a_valid_form = emailField === '' && email !== undefined ?  undefined : verify_valid_email(email) ;
  

    

  
     //  new_advice_message_object['emailFieldMsg'] = is_email_in_a_valid_form && is_email_in_a_valid_form !== undefined ? 'Email is not in a valid form' : ''//'Maybe add some of that sweet email of yours ? :)';
       new_required_advice_object['emailField'] = is_email_in_a_valid_form === false || is_email_in_a_valid_form !== undefined ? 'requiredField' : '';

       new_advice_message_object['emailFieldMsg'] = is_email_in_a_valid_form ? '' : 'Email is not in a valid form';
 

   
  new_required_advice_object['messageField'] = messageField;
  new_advice_message_object['messageFieldMsg'] = messageField === 'requiredField' ? 'This field is required(boring message) :)' : '';


 

 

  setAdviceFieldRequired(new_required_advice_object);
     
  setFieldMessage(new_advice_message_object);

  if(new_required_advice_object.nameField !== '' || new_required_advice_object.messageField !== '' || new_required_advice_object.emailField !== '')return false

  return true;
   }

  const warning_this_email_has_a_message_in_Database = ()=>{
    

     setWarningMessage(true); 

     setTimeout(()=>{
      setWarningMessage(false);

     },3000)

  }

   const send_message_to_db = async(event:any)=>{
        
      event.preventDefault();
      
       const name = event.target.nameInput.value;
       const email = typeof logedInUser === 'object' ? logedInUser.email : event.target.emailInput.value;
       const phone = event.target.phoneInput.value;
       const message = event.target.messageContact.value;
  
      

     
      const send_this_data_to_database = add_required_class(name,email,message);
         
      
  

     if(send_this_data_to_database === false) return;
      const dataBase_allready_has_a_message_with_this_email = await firestore.collection('digital-bikes-messages').doc(email).get();
     
      const does_email_exists = dataBase_allready_has_a_message_with_this_email.exists;// && dataBase_allready_has_a_message_with_this_email;
      const are_you_allowed_to_sent_another_message = dataBase_allready_has_a_message_with_this_email.data()?.checked;
  

      if(does_email_exists){
        

            if(are_you_allowed_to_sent_another_message === undefined || are_you_allowed_to_sent_another_message === false){
               warning_this_email_has_a_message_in_Database();
               return;
            }

      }

       const write_database = await firestore.collection('digital-bikes-messages').doc(email).set({
                "created_at": timeStamp,
                "checked":false,
                "name":name,
                "email":email,
                "phone":phone,
                "message":message
        },{merge:true});

   
        setMessageSent(true);

        setTimeout(()=>{
          setMessageSent(false);

        },6000);


   }

   

    return ( 
       
    <div className="contact-container">
        <div className="send-a-message-container">
            <div className="send-a-msg-title">Send us a message!</div>
            <form className="send-a-message-form" onSubmit={(event)=>{send_message_to_db(event)}}>
               <div className="email-phone-inputs-container">

                   <div className="name-input-wrapper">

                    <label htmlFor="name"><span className="mandatory-form-mark" style={{color:'#eb340a'}}>*</span> Name</label>
                    <input type="text" className={`contact-name-input ${nameField}`} name='nameInput' id="name" />
                    {nameFieldMsg !== '' && <div className="required-name-msg-container">{nameFieldMsg}</div>}
                   </div>
                   
                    <div className="email-input-wrapper">
                        <label htmlFor="emailInput"><span className="mandatory-form-mark" style={{color:'#eb340a'}}>*</span> Email</label>
                      {logedInUser === undefined && <input type="text" className={`contact-email-input ${emailField}`} name='emailInput' id="email" />}
                      {logedInUser && <p>Your message will be posted with : {logedInUser.email} email</p>}

                      {emailFieldMsg !== '' && <div className="required-email-msg-container">{emailFieldMsg}</div>}
                    </div>
                   
                     <div className="phone-input-wrapper">
                        <label htmlFor="phoneInput"> <span className="mandatory-form-mark" style={{color:'#eb340a',visibility:'hidden'}}>*</span> Phone</label>
                        <input type="text" className="contact-phone-input" name='phoneInput' id="phone" />
                         
                        {/* {<div className="required-phone-msg-container"></div>} */}
                     </div>
                   
                    
               </div>

               <div className="textarea-message-container">

                 <div className="message-input-wrapper">
                      <label htmlFor="messageContact"><span className="mandatory-form-mark" style={{color:'#eb340a'}}>*</span> Your Message</label>
                      <textarea name="messageContact"  
                            cols={300} rows={100} 
                            style={{wordWrap: 'break-word',border:'1px solid #575757',resize:'vertical',height:'14em'}} 
                            className={`message-us-textarea ${messageField}`} >

                      </textarea>

                      {messageFieldMsg !== '' && <div className="required-message-input-msg-container">{messageFieldMsg}</div>}
                 </div>
                    

               
               <input type="submit"  className="submit-contact-form" value="Send"/>

               </div>

            </form>

        </div>
         <div className="contact-details-container">
            <div className="phone-contact-container">
                 <div className="phone-icon-container" style={icon_style_background_Obj}>
                    <FontAwesomeIcon icon={faPhone}/>
                 </div>
                 <div className={`phone-number-container`}>
                     <p className="phone-number">{phone}</p>
                 </div>
            </div>
  
            <div className={`email-contact-container`}>
                 <div className="email-icon-container" style={icon_style_background_Obj}>
                    <FontAwesomeIcon icon={faMailBulk}/>
                 </div>
                 <div className={`email-adress-container` }>
                   
                     <p className="email-adress">{typeof email === 'string' && email}{typeof email === 'object' && Array.isArray(email) && email.map(oneAdress=>oneAdress)}</p>
                 </div>
            </div>


         </div>

           {warningMessage && <div className="email-has-allready-sent-a-message-warning">You allready sent us a message</div>} 
           {messageSent && <div className="message-sent-warning">Message sent <FontAwesomeIcon style={{color:'green'}} icon={faCheck}/></div>}
         
    </div>
        
     );
}
 
export default ContactUsPage;




{/* <ul class="form-list col-md-6">
<li>
<label for="name" class="required"><em>*</em>Nume</label>
<div class="input-box">
<input name="name" id="name" title="Nume" value="" class="input-text required-entry validation-failed" type="text"><div class="validation-advice" id="advice-required-entry-name" style="">Acesta este un câmp obligatoriu.</div>
</div>
</li>
<li>
<label for="email" class="required"><em>*</em>E-mail</label>
<div class="input-box">
<input name="email" id="email" title="E-mail" value="" class="input-text required-entry validate-email validation-failed" type="text"><div class="validation-advice" id="advice-required-entry-email" style="">Acesta este un câmp obligatoriu.</div>
</div>
</li>
<li>
<label for="telephone">Telefon</label>
<div class="input-box">
<input name="telephone" id="telephone" title="Telefon" value="" class="input-text validation-passed" type="text">
</div>
</li>
</ul> */}