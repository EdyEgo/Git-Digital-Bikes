import React,{useState} from 'react';
import {firestore} from './../firebase';
import { Link ,useHistory} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone,faLocationArrow,faMailBulk,faClock,faDirections,faAngleRight,faAngleDoubleRight,faCheck } from '@fortawesome/free-solid-svg-icons'

interface General_FooterProps {
    logedAdmin?:any | undefined,
    sendInfoToDocumentationPageContext?:any,
    addUsefulInfo_to_parent_component:any,
    customPath?:string

}
 
const General_Footer: React.FC<General_FooterProps> = ({logedAdmin,sendInfoToDocumentationPageContext,addUsefulInfo_to_parent_component,customPath}) => {
  

   let history= useHistory();
   const title_style = {color:'#ffffff'};
   const text_style = {color:'#a8a8a8'}
   
   const [footerMiddleObj,setFooterMiddleObj] = useState<any>('');

   const extract_general_footer_from_DataBase = async()=>{
      
       const footer_shop_collection = await firestore.collection('digital-bikes_store_general_info').get();
  
       const footer_Links_strings:any = []; 


        footer_shop_collection.docs.forEach(string_link=>footer_Links_strings.push(string_link.data()))
       
      
     
      setFooterMiddleObj(footer_Links_strings);
   }
  
   if(footerMiddleObj === '') extract_general_footer_from_DataBase();

   let general_footer_obj:any;

  const construct_useful_informations_footer = ()=>{
 
    if(footerMiddleObj === '') return;
    
  

    const extract_general_footer = ()=>{
        

        for(let i = 0;i<footerMiddleObj.length;i++){
              const footer_index_object = footerMiddleObj[i];
              
              if(footer_index_object.hasOwnProperty('general_footer')){
                general_footer_obj = footer_index_object.general_footer
                break;
              }
        }
    }
    extract_general_footer();

    const replace_underscore_with_space = (words:string)=>{
        if(words.indexOf('_')){
            return  words.split('_').join(' ');
     }
        return words;
     
     }

const handle_contact_info = ()=>{
   
     const contact_info_obj = general_footer_obj.contact;

     const summon_fontAwesome_by_contact = (contactKeyName:string)=>{
      
             if(contactKeyName === 'adress'){
                 return <FontAwesomeIcon icon={faLocationArrow}/>
             }
             if(contactKeyName === 'email'){
                 return <FontAwesomeIcon icon={faMailBulk}/>
             }
             if(contactKeyName === 'phone'){
                 return <FontAwesomeIcon icon={faPhone}/>
             }
             if(contactKeyName === 'working_hours'){
                return  <FontAwesomeIcon icon={faClock}/>
             }
     }
   
      const contact_list_holder:any = [];

      const create_lists_from_contacts = ()=>{
        Object.entries(contact_info_obj).forEach(([contactKeyName,contactValueInfo]:any)=>{
              
            contact_list_holder.push(
                <li className="one-contact-info-li" style={{display:'flex',color:'#a8a8a8'}}>
                    <div className="icon-one-list-container">
                       {summon_fontAwesome_by_contact(contactKeyName)}
                    </div>
                     <div className="one-list-contact-info-container" style={{textAlign:'start',marginLeft:'0.79em'}}>
                       <div className="one-contact-li-ref" style={{fontWeight:'bold'}}>{replace_underscore_with_space(contactKeyName)}: </div>
                       <div className="one-contact-li-info"> {contactValueInfo}</div>
                     </div>  
                 </li>
            )

        })
      }

      create_lists_from_contacts()

   return (
      <div className="contact-footer-container" style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
           <h2 className="footer-contact-title" style={title_style}>Contact</h2>
            <ul className="contact-info-list" >
              {
              contact_list_holder
              }
            </ul>
      </div>

   )

}

const handle_useful_information = ()=>{
    const useful_information_obj:any = general_footer_obj.useful_information;

    addUsefulInfo_to_parent_component(useful_information_obj)
 
   

    const useful_information_Links_array:any = [];
 
  
   
   const change_link_on_contact = (usefulInfoKeyName:string,usefulInfoValue:string | undefined | object)=>{
            const add_custom_path = (path:string)=>{
              const custom_path = customPath ? customPath + path : path;
                return custom_path;
            }
     

    if(usefulInfoKeyName.toLowerCase() === 'contact'){
        return {LinkTo:add_custom_path(`/contact`),InfoValue:usefulInfoValue};
      
       } 

       return {LinkTo:`${add_custom_path('/documentation/')}${usefulInfoKeyName}`,InfoValue:usefulInfoValue};

  }

    const create_lists_useful_info = ()=>{
      Object.entries(useful_information_obj).forEach(([usefulInfoKeyName,usefulInfoValue]:any)=>{
        
       
        const stringify_documentationInfo = JSON.stringify(change_link_on_contact(usefulInfoKeyName,usefulInfoValue));
       const {LinkTo,InfoValue} = change_link_on_contact(usefulInfoKeyName,usefulInfoValue);
      
        useful_information_Links_array.push( 
               <Link to={LinkTo} className="footer-link"  style={{cursor:'pointer',color:'#a8a8a8'}} >
                        <i className='direction-arrow-link-documentstion' style={{color:'#ee2d43',pointerEvents:'none'}}><FontAwesomeIcon icon={faAngleRight}/></i>
                       <span className="useful-info-name" style={{pointerEvents:'none'}}>{replace_underscore_with_space(usefulInfoKeyName)}</span>
                     
               </Link>

        )
      })

    }
    create_lists_useful_info();

    return(
     
        <div className="useful-information-footer-container" >
               <h2 className="useful-information-footer-title" style={title_style}>Useful information</h2>
               <div className="useful-information-list">
                    {useful_information_Links_array}
               </div>
        </div>
      

    )

}

    return (
        <div className="middle-section-footer" >
               {handle_contact_info()}

               {handle_useful_information()}

        </div>
    )
  }


    return (  
    
    <div className="footer-one-product-page-details" style={{backgroundColor:'#161a21',}}>
        <div className="middle-footer-container">
            {typeof footerMiddleObj === 'object' && construct_useful_informations_footer()}
        </div>
       

        <div className="developed-by-container">
            <span className="developed-by" style={{color:'#a8a8a8'}}>© Digital-bikes. 2021. Developed by Prodan Septimiu</span>
        </div>

    </div>

  );
}
 
export default General_Footer;