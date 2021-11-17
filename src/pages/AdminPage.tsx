import React ,{useState,useRef, useEffect} from 'react';
import PropertiesComp from '../components/adminApp/PropertiesComp';
import SizesComp from '../components/adminApp/SizesComp';
import SpecsComp from '../components/adminApp/SpecsComp';
import { firestore,decrement,timeStamp } from '../firebase';

interface AdminPageProps {
    
}
 
const AdminPage: React.FC<AdminPageProps> = () => {// can be acces only by editing the promp 

// you will have a limit of 10 new products to add a day
// or unlimited if you are the CEO
 // const [adminEditsPage,setAdminEditsPage]  = useState('Motorcycles');

 
  const [adminIsLogedIn,setAdminIsLogedIn] = useState(false);
  const [adminLevelsPermissions,setAdminLevelsPermissions] = useState<any | null>(null);
  const [admin_is_restricted_from_upload,setAdmin_is_restricted_from_upload] = useState<null | boolean>(null);
  const [shop_admin_selected,setShop_admin_selected] = useState('Equipment');

  

  const verify_if_admin_is_restricted = ()=>{
      if(adminLevelsPermissions === null) return;
        
        const upload_history = adminLevelsPermissions.upload_history;
        const remaining_uploads = upload_history.remaining_uploads;

        if(remaining_uploads <= 0) {
            setAdmin_is_restricted_from_upload(true);
          return true;
        };

        setAdmin_is_restricted_from_upload(false);

          

         return false;
       
  }
  //verify_if_admin_is_restricted();
  
 
 
const verify_database_account_admin = async(admin_credentials:{email_admin:string | null,password_admin:string | null})=>{
     const {email_admin,password_admin} = admin_credentials;
     if(email_admin === null || password_admin === null) return undefined;

     const document_validation_container = await firestore.collection("digital-bikes").doc('admins').collection('adminCollection').doc(email_admin).get();
   
     const email_exists = document_validation_container.exists

     if(email_exists === false) return null;


     

     const extract_user_data_permissions = document_validation_container.data();

     if(typeof extract_user_data_permissions !== 'object') return null;

     if(password_admin !== extract_user_data_permissions.password) return null;



     return extract_user_data_permissions;

    // const document_data 


}


 const log_in_admin_handler = async(event:any)=>{
     // email_admin   password_admin
     event.preventDefault();
     const {target} = event;
     const email_admin = target.email_admin.value;
     const password_admin = target.password_admin.value;

     const data_user_permissions = verify_database_account_admin({email_admin,password_admin}).then((res:any)=>{
         if(typeof res !== 'object' || res === null) {

            return;
         }

         setAdminIsLogedIn(true);
         setAdminLevelsPermissions(res);




     });
     




 }



  const is_Admin_on_equipment = shop_admin_selected === 'Equipment';
  

  //const [equipment_options_memorized,setEquipment_options_memorized] = useState<null | any>(null);// sizes:[{size_name:'asf',size_number:2,size_price:'200'}],price,etc
  

  

                                                









 
const sizes_submited = useRef<any| null>(null);
const specs_submited = useRef<any| null>(null);
const properties_submited = useRef<any| null>(null);
const features_submited = useRef<any| null>(null);

const setMemorizeSizes = (sizes_writen:any)=>{

    sizes_submited.current = sizes_writen;

}
const setMemorizeSpecs = (specs_writen:any)=>{
    specs_submited.current = specs_writen;
}
const setMemorizeFeatures = (features_writen:any)=>{
    features_submited.current = features_writen;
}

const setMemorizeProperties = (properties_writen:any)=>{
    properties_submited.current = properties_writen;
}

//// end of equipment functions
const brand_name_normalize = (brand:string)=>{

    const trim_brand_lowerCase = brand.trim().toLowerCase();
    const normal_name = trim_brand_lowerCase[0].toUpperCase() + trim_brand_lowerCase.slice(1,trim_brand_lowerCase.length);
    return normal_name;

  } 

const create_data_base_product_object = (type_product:string,
    productInfo:{brand:string,currency:string,subCategories_product:string,product_name:string,product_new:string,
        product_description:string,pictures_available:string | number,
        sizes?:any,specs?:any,propertys?:any,features?:any,year?:string,cylinder_capacity?:string,price?:string,item_stock?:string})=>{
    
          //  const {brand,currency,pictures_available,product_description,product_name,sizes,subCategories_product,propertys,specs} = productInfo;

     const create_prices_and_sizes_product_equipment_obj = (sizes_product:any,currency:string)=>{
         const prices_resulted:any = {};// remember the space between the number price and the currency
         const sizes_resulted:any = {}; 
       
         const format_price_for_DB = (price:string)=>{
             const trimed_price = price.trim();
             if(price.indexOf('from') !== -1){
                 const price_split_by_from = trimed_price.split('from');
                 const new_price_add_currency = price_split_by_from[0] + ' ' + currency;
                 const old_price_add_curency = price_split_by_from[1] + ' ' + currency;

                 const full_discounted_string_price = new_price_add_currency + 'from' + old_price_add_curency

                 return full_discounted_string_price
                 
             }

             const single_price_with_currency = trimed_price + ' ' + currency;
             return single_price_with_currency;

         }

         sizes_product
          .forEach((size_field:{size_name:string,size_number:number | string,size_price:string})=>{
              const {size_name,size_number,size_price} = size_field
              sizes_resulted[size_name] = Number.isNaN(size_number) === false ? Number(size_number) : 0;
              prices_resulted[size_name] = format_price_for_DB(size_price);

          });

          return {prices_resulted,sizes_resulted}
         

     }
      const create_specs_product_equipment_obj = (specs_product:any,features?:boolean | undefined,features_length?:number)=>{
          const specs_resulted:any = {};

          specs_product.forEach((specs_field:{spec_title:string,spec_text:string})=>{
               const {spec_text,spec_title} =specs_field
              specs_resulted[spec_title] = spec_text;
          });
          if(features && features_length)specs_resulted['length'] = features_length;
          return specs_resulted;

      }
      const create_properties_product_equipment_obj = (properties_product:any)=>{
          const properties_resulted:string[] = [];
           
          properties_product.forEach((properties_field:{property:string})=>{
              const {property} = properties_field
            properties_resulted.push(
                property
            )

          })

          return properties_resulted;

      }

      const replace_product_spaces_with_underscores = (product_name_to_mod:string)=>{
        const trim_product_name = product_name_to_mod.trim();
        if(trim_product_name.indexOf(' ') !== -1){
           const product_name_underscores = trim_product_name.split(' ').join('_');
           return product_name_underscores;
        }
        return trim_product_name;
}

    const product_object = {
        "Equipment":()=>{
            const {brand,currency,pictures_available,product_description,product_name,sizes,subCategories_product,product_new,propertys,specs} = productInfo;
     
            
            const {sizes_resulted,prices_resulted} = create_prices_and_sizes_product_equipment_obj(sizes,currency);
            const new_product = product_new === 'product_new' ? true : false;
            
            const product_name_uderscore = replace_product_spaces_with_underscores(product_name)
            let object_product:any ={ 
               [product_name_uderscore]:{
                 brand:brand_name_normalize(brand.toUpperCase()),
                 categories:subCategories_product.split(' '),
                 description:product_description,
                 pictures_available:Number(pictures_available),
                 sizes:sizes_resulted,
                 prices:prices_resulted,
                 new:new_product

                 
               }
           }
           

           if( propertys != null && propertys.length > 0){
             const properties_array = create_properties_product_equipment_obj(propertys);
             object_product[product_name_uderscore]['properties'] = properties_array;
           }
           if(specs != null && specs.length > 0){
            
           const specs_obj = create_specs_product_equipment_obj(specs);
           object_product[product_name_uderscore]['specs'] = specs_obj;
           }

           return object_product;
        },
        "Motorcycles":()=>{
         const {brand,currency,price,item_stock,product_name,subCategories_product,product_description,pictures_available,product_new,features,year,cylinder_capacity} = productInfo;
         const new_product = product_new === 'product_new' ? true : false;


         const cylinder_trim = cylinder_capacity !== undefined ? cylinder_capacity.trim() : '';
         const create_product_name_moto = ()=>{
           
            let product_name_normalize_upperCase = product_name.trim().toUpperCase();
            if(product_name_normalize_upperCase.indexOf('_') !== -1) product_name_normalize_upperCase = product_name_normalize_upperCase.split('_').join('');
            const trim_year = year?.trim();
            const year_Yxx_format_tail_product_name = 'Y' + trim_year?.slice(2,4) // Y21;

            const database_product_name_moto = product_name_normalize_upperCase + '_' + cylinder_trim + '_' + year_Yxx_format_tail_product_name;

            return database_product_name_moto;
         }

        // const product_name_uderscore = replace_product_spaces_with_underscores(product_name);
        const create_price_moto = ()=>{
             const trimed_price = price?.trim();
             const single_price_with_currency = trimed_price + ' ' + currency;
             const trimed_single_correct_price = single_price_with_currency.trim();
             return trimed_single_correct_price;
        }

         const product_name_moto = create_product_name_moto();
                let object_product:any ={ 
                    [product_name_moto]:{
                    brand:brand.toUpperCase(),
                    categories:subCategories_product.split(' '),
                    description:product_description,
                    pictures_available:Number(pictures_available),
                    year,item_stock:Number(item_stock?.trim()),
                    price:create_price_moto(),
                    
                    
                    new:new_product

                    
                    }
                }

                if(features != null &&  features.length > 0){ // remember the fetures have length in the object
                   
                    const features_obj = create_specs_product_equipment_obj(features,true,features.length - 1);
                    object_product[product_name_moto]['features'] = features_obj;
                }
                if(features == null || features.length === 0){
                    object_product[product_name_moto]['features'] = {length:0};
                }
          
                return {object_product,product_name_moto,cylinder_capacity_to_use:cylinder_trim};
        }

        
    }

   const data_base_product_obj = type_product === 'Equipment'?  product_object['Equipment']() : product_object['Motorcycles']();
   return data_base_product_obj;

}


const database_send_firestore = async(brand:string,
    database_category_selected:string,data_base_product_obj:any,new_category_created?:string | null,product_name_moto?:string,cylinder_capacity_to_use?:string)=>{
  // database_category_selected can be 'none';
  
 


 if(is_Admin_on_equipment){
     const category_doc_to_write_in = typeof new_category_created === 'string' && new_category_created.length > 0 ? 
           new_category_created : database_category_selected !== 'none' ? database_category_selected : null;

           if(category_doc_to_write_in === null) return null;
       
     const select_documents_to_write_DB = await firestore.collection("digital-bikes").doc('equipment')
           .collection('equipmentCollection').doc(category_doc_to_write_in).set(
         {
            //  "brands_available":{[brand_name_normalize(brand)]:productInfo}
            "brands_available":{[brand_name_normalize(brand)]:data_base_product_obj}
            // "brands_available":data_base_product_obj
         }
         ,{merge:true});

         return true;

 }
 if(is_Admin_on_equipment === false){
    const category_doc_to_write_in = typeof new_category_created === 'string' && new_category_created.length > 0 ? 
    new_category_created : database_category_selected !== 'none' ? database_category_selected : null;
    const upperCase_brand = brand.toUpperCase();
    const cylinder_capacity_trimed =cylinder_capacity_to_use !== undefined ?cylinder_capacity_to_use.trim() : 'no_cylinder_capacity_passed';

    if(category_doc_to_write_in === null) return null;


// use this on moto product_name_moto?:string,cylinder_capacity_to_use? , and write brands_available with the right brand with product name in 
    const select_documents_to_write_DB = await firestore.collection("digital-bikes").doc('motorcycles')
    .collection('motorcyclesCollection').doc(category_doc_to_write_in).set(
  {
     [upperCase_brand]:{
         [cylinder_capacity_trimed.trim()]:data_base_product_obj
     }
    
     
  }
  ,{merge:true});
 

  const create_new_quik_products_moto_array = (brand_array:string[])=>{
      if(Array.isArray(brand_array) === false) return [product_name_moto];
      const copy_array = [...brand_array];
      
    const product_name_included =  product_name_moto !== undefined ? copy_array.push(product_name_moto) : copy_array;
    
    return copy_array;
  }

 
 const get_brands_available_doc_array_moto = await firestore.collection("digital-bikes").doc('motorcycles')
 .collection('motorcyclesCollection').doc(category_doc_to_write_in).get();
 const documents = get_brands_available_doc_array_moto.data();
 const brands_available = documents? documents.hasOwnProperty('brands_available') ?
     documents['brands_available'] : {} : {};
 const brand_array = brands_available.hasOwnProperty(upperCase_brand) ? brands_available[upperCase_brand] : [];
 const new_product_array = create_new_quik_products_moto_array(brand_array);




  const moto_brands_available_DB_write =  await firestore.collection("digital-bikes").doc('motorcycles')
  .collection('motorcyclesCollection').doc(category_doc_to_write_in).set(
{
   
    "brands_available":{
        [upperCase_brand]:new_product_array
    }
   
}
,{merge:true});






  return true;

 }

 return false;
   

}

const decrement_uploads_left_admin = async()=>{// and update

    const email_admin = adminLevelsPermissions.email;
   const set_update_on_uploads_permissions = await firestore.collection("digital-bikes").doc('admins').collection('adminCollection').doc(email_admin).set({
         "upload_history":{
             "last_time_uploaded":timeStamp,
             "remaining_uploads" : decrement
         }
          
  },{merge:true});


  const refresh_loged_in_user_info = await firestore.collection("digital-bikes").doc('admins').collection('adminCollection').doc(email_admin).get();

   
 
     const extract_user_data_permissions = refresh_loged_in_user_info.data();

     setAdminLevelsPermissions(extract_user_data_permissions);


}


const handle_submit_form = (event:any)=>{
    event.preventDefault();
    const {target} = event;
    const is_admin_restricted_from_upload = verify_if_admin_is_restricted();

   if(is_admin_restricted_from_upload) return;
   
    
  if(is_Admin_on_equipment){
   
        const brand = target.equipment_brand.value;
        const new_category_created = target.category_input.value;
        const database_category_selected = target.equipment_category_dataBase.value;
        // these up there will be used to make sens in database;//category must be lower case


        const currency = target.currency.value;
        const product_name = target.equipment_product_name.value;
        const subCategories_product = target.equipment_sub_categories.value;
        const product_description  = target.product_description_equipment.value;
        const pictures_available = target.pictures_available.value;
        const product_new = target.product_new.value;
        const year_equipment = target.year_equipment.value;// correct this
      
     const sizes =  sizes_submited.current;// must have , rest below we don t really need
    const specs = specs_submited.current;
    const propertys = properties_submited.current;
    const productInfo = {brand,currency,product_name,subCategories_product,product_description,pictures_available,product_new,sizes,specs,propertys}
    
    const data_base_product_obj = create_data_base_product_object('Equipment',productInfo);
 

    
    const database_send = database_send_firestore(brand,database_category_selected,data_base_product_obj,new_category_created)
          .then((database_was_updated:any)=>{
               console.log('database equipment was updated with product data : ',database_was_updated);
               decrement_uploads_left_admin()
          });

    return;
  }

  if(is_Admin_on_equipment === false){
     
        const brand = target.motorcycles_brand.value;
        const new_category_created = target.category_input_motorcycles.value;
        const database_category_selected = target.motorcycles_category_dataBase.value;
        // these up there will be used to make sens in database;//category must be lower case


        const currency = target.currency_motorcycle.value;
        const product_name = target.motorcycles_product_name.value;
        const subCategories_product = target.motorcycles_sub_categories.value;
        const product_description  = target.product_description_motorcycles.value;
        const pictures_available = target.pictures_available_motorcycles.value;
        const product_new = target.product_new_motorcycle.value;

        const price = target.price_moto.value;
        const item_stock = target.item_stock_moto.value;
       
        const year = target.year_motorcycle.value;
        const cylinder_capacity = target.cylinder_capacity.value;


        const features = features_submited.current;

        const productInfo = {brand,price,item_stock,currency,product_name,subCategories_product,product_description,pictures_available,product_new,features,year,cylinder_capacity};

       // const data_base_product_obj = create_data_base_product_object('Motorcycles',productInfo);

        const {object_product,product_name_moto,cylinder_capacity_to_use} = create_data_base_product_object('Motorcycles',productInfo);
     
 
     

        const database_send = database_send_firestore(brand,database_category_selected,object_product,new_category_created,product_name_moto,cylinder_capacity_to_use)
          .then((database_was_updated:any)=>{
               console.log('database motorcycles was updated with product data : ',database_was_updated);
      
               decrement_uploads_left_admin()

          });

  }
    


}







const [equipment_categories,setEquipment_categories] = useState<any | null>(null);
const [motorcycles_categories,setMotorcycles_categories] = useState<any | null>(null);

const log_out_admin = ()=>{
// setAdminIsLogedIn setAdminLevelsPermissions
setAdminIsLogedIn(false);
setAdminLevelsPermissions(null);

    
}

useEffect(()=>{
      
    const categories_products_database_equipment = async()=>{
        const dataBaseCall =await firestore.collection("digital-bikes").doc('equipment').collection('equipmentCollection').get();
        const recivedDocuments = dataBaseCall.docs; 
        
        
          let cateories_equipment_available:any = [];
          recivedDocuments.forEach((category:any)=>{
              
            cateories_equipment_available.push(category.id);
          })


       
       
         return cateories_equipment_available;
        
    
    }
    const categories_products_database_motorcycles = async()=>{
        const dataBaseCall =await firestore.collection("digital-bikes").doc('motorcycles').collection('motorcyclesCollection').get();
        const recivedDocuments = dataBaseCall.docs; 
        
        
          let cateories_motorcycles_available:any = [];
          recivedDocuments.forEach((category:any)=>{
              
            cateories_motorcycles_available.push(category.id);
          })


       
       
         return cateories_motorcycles_available;
    }


    if(is_Admin_on_equipment && equipment_categories === null){
        const categories_database = categories_products_database_equipment();
        categories_database.then((categories_finded:any)=>{
            setEquipment_categories(categories_finded);
         
        })
      
        return;
    }
   
    if(is_Admin_on_equipment === false && motorcycles_categories === null){
        const categories_database = categories_products_database_motorcycles()
        categories_database.then((categories_finded:any)=>{
            setMotorcycles_categories(categories_finded);
         
        })
    }
    


},[shop_admin_selected]);

const format_date_to_a_simple_string = (date_obj:any)=>{
     
     const date = date_obj.toDate().toDateString()
    
   

    return date;
}

    return (  

         <> 

         {/* {adminIsLogedIn === false && */}
         
            <div className="log-in-admin">
                
                <div className="log-in-container-form">
                    
                    {adminIsLogedIn === false &&
                        <form className="log-in-admin-form" onSubmit={(event)=>{log_in_admin_handler(event)}}>

                         <div className="inputs-log-in-container">
                                <div className="log-in-info-header">
                                    <div className="log-in-info">Log in as administrator </div>
                                </div>
                            
                            <div className="email-container-log-in">
                                <label htmlFor="" className='email-admin'>Your Email </label>
                                <input type="text" name='email_admin' className='email-admin-input' />
                            </div>
                            <div className="password-container-log-in">
                                <label htmlFor="" className='password-admin'>Password </label>
                                <input type="password" name='password_admin'  className='password-admin-input' />

                            </div>
                            
                                
                                <div className="submit-admin-credentials">
                                    <input type="submit" className="submit-admin-input"  value='Log In'/>
                                </div>

                            </div>
                        </form>}
                    {adminIsLogedIn && 
                      <div className="log-out-container-btn">
                         {adminLevelsPermissions != null && 
                            <div className="permissions-info">
                                <div className="admin-remaining-uploads-number--container">
                                    <div className="you-have-uploads-remaining-text">
                                        You have <span className="permision-uploads-number" style={{color:'red'}}>{adminLevelsPermissions.upload_history.remaining_uploads} </span>
                                        uploads left
                                        </div>
                                </div>
                                <div className="admin-last-update-container-info">
                                    <div className="you-have-last-uploaded-date-container">
                                        You last uploaded in <span className="formated-date-admin-info">{format_date_to_a_simple_string(adminLevelsPermissions.upload_history.last_time_uploaded)}</span>
                                    </div>
                                </div>

                               {admin_is_restricted_from_upload === true && 
                                  <div className="admin-is-restricted-from-upload">
                                        <div className="you-are-restricted-message">
                                            You are restricted from uploading any more products
                                        </div>
                                   </div>
                               }

                            </div>
                          }
                            <button className="log-out-admin" onClick={()=>{log_out_admin()}}>Log out</button>
                      </div>
                    
                    }
                </div>
            </div>
          
        {/* } */}
               {adminIsLogedIn &&
         
                <div className="adminitration-website-page-container">
                    <div className="switch-to-administrate-shop-btns-container">
                        <select className="switch-shop-admin-select" onChange={(event)=>{setShop_admin_selected(event.target.value)}}>
                            <option value="Equipment" className="shop-option-admin">Equipment</option>
                            <option value="Motorcycles" className="shop-option-admin">Motorcycles</option>
                        </select>
                    </div>
                    
                   
                  
                  <div className="add-products-form-admin-container">
                     {is_Admin_on_equipment && <SizesComp setMemorizeSizes={setMemorizeSizes}/>}
                     {is_Admin_on_equipment && <SpecsComp setMemorizeSpecs={setMemorizeSpecs}/>}
                     {is_Admin_on_equipment === false && <SpecsComp setMemorizeSpecs={setMemorizeFeatures} features={true}/>}
                      
                     {is_Admin_on_equipment && <PropertiesComp setMemorizeProperties={setMemorizeProperties}/>}
                        {/* onSubmit={(event)=>{handle_adding_field_to_forms(event)}} */}
                        <form className="add-products-form-admin" onSubmit={(event)=>{handle_submit_form(event)}} >
                               <div className="choose-product-category-admin">
                               {is_Admin_on_equipment &&  <div className="select-database-used-categories-container">
                                        <select  className="database-created-categories" name='equipment_category_dataBase' onChange={()=>{}}>
                                            <option value="none">no category selected</option>
                                            {Array.isArray(equipment_categories) && equipment_categories
                                             .map((category:string)=><option value={category}>{category}</option>) }
                                           
                                        </select>
                                    </div>}

                                    {is_Admin_on_equipment &&<div className="create-a-new-product-category-admin">
                                        {/* this will be ignored if the select is used , will have a none as first option */}
                                         <label className='create-new-categori-label'>Create A New Category: </label>
                                         <input type='text' name='category_input' className="create-new-category-input-admin"></input>
                                    </div>}
                               </div>

                               <div className="insert-new-product-admin-container">
                                        {shop_admin_selected === 'Equipment' &&
                                        <div className="equipment-products-insert">
                                            <div className="brand-selection-admin">
                                                 <label  className='brand-selection-label'>Write Your Brand: </label>
                                                 <input type="text" name='equipment_brand' className="brand-input-motorcycles" />
                                            </div>
                                            <div className="product-name-equipment-inputs">
                                                 <label  className='product-name-selection-label'>Write Your Product Name: </label>
                                                 <input type="text" name='equipment_product_name' className="product-name-input-motorcycles" />
                                            </div>
                                             
                                             <div className="currency-used">
                                                 <select  className="select-a-currency" name='currency' onChange={()=>{}}>
                                                     <option value="€" className="currency-option">€</option>
                                                 </select>

                                             </div>
                                             <div className="product-is-new">
                                                 <select name="product_new" id="" className="product-is-new-select">
                                                     <option value="product_old" className="product-is-new-option">Product is not "market new"</option>
                                                     <option value="product_new" className="product-is-new-option">Product is "market new"</option>
                                                 </select>
                                             </div>

                                             <div className="equipment-product-details">
                                                  <div className="equipment-categories-creation">
                                                    <div className="categori-creation-inputs-container">
                                                        <label  className="sub-categories-creation-label">Write the products (sub) categories lowercase with space between them</label>
                                                        <input type="text" name='equipment_sub_categories' className="categories-sub-creation-input" />
                                                    </div>
                                                  </div>

                                                  <div className="description-product-equipment">
                                                     <div className="description-inputs-container">

                                                     

                                                        <label className='description-equipment-label'>Write the product description</label>
                                                        
                                                        <textarea name="product_description_equipment" id="" wrap='no-wrap' cols={40} rows={20} className="product-description-equipment"></textarea>
                                                      </div>
                                                  </div>

                                                  <div className="equipment-pictures-available">
                                                      <label className='pictures-available-label'>Select product available pictures</label>
                                                      <select  className="pictures-available-select" name='pictures_available' onChange={()=>{}}>
                                                         
                                                          <option value="1" className="picture-available-number">1</option>
                                                          <option value="2" className="picture-available-number">2</option>
                                                          <option value="3" className="picture-available-number">3</option>
                                                          <option value="4" className="picture-available-number">4</option>
                                                          <option value="5" className="picture-available-number">5</option>
                                                          <option value="6" className="picture-available-number">6</option>
                                                          <option value="7" className="picture-available-number">7</option>
                                                          <option value="8" className="picture-available-number">8</option>
                                                          <option value="9" className="picture-available-number">9</option>
                                                          <option value="10" className="picture-available-number">10</option>

                                                      </select>
                                                  </div>
                                                    
                                                  <div className="equipment-year">
                                                         <div className="year-inputs-container"> 
                                                            <label htmlFor="" className="equipment-year-label">Product Year</label>
                                                            <input type="text" className="product-equipment-year" name='year_equipment'/>
                                                         </div>
                                                        </div>

                                                  {/* <SizesComp setMemorizeSizes={setMemorizeSizes}/> */}

                                                  

                                                 

                                             </div>


                                        </div>
                                        }
                                        {shop_admin_selected === 'Motorcycles' &&
                                        <div className="motorcycles-products-insert">

                                           {/* edit names */}

                                           <div className="choose-product-category-admin">
                                                <div className="select-database-used-categories-container">
                                                    <select  className="database-created-categories" name='motorcycles_category_dataBase' onChange={()=>{}}>
                                                        <option value="none">no category selected</option>
                                                        {Array.isArray(motorcycles_categories) && motorcycles_categories
                                                        .map((category:string)=><option value={category}>{category}</option>) }
                                                    
                                                    </select>
                                                </div>

                                                <div className="create-a-new-product-category-admin">
                                                    {/* this will be ignored if the select is used , will have a none as first option */}
                                                    <label className='create-new-categori-label'>Create A New Category: </label>
                                                    <input type='text' name='category_input_motorcycles' className="create-new-category-input-admin"></input>
                                                </div>
                                           </div>





                                           <div className="motorcycles-products-insert">
                                                <div className="brand-selection-admin">
                                                    <label  className='brand-selection-label'>Write Your Brand: </label>
                                                    <input type="text" name='motorcycles_brand' className="brand-input-motorcycles" />
                                                </div>
                                                <div className="product-name-motorcycles-inputs">
                                                    <label  className='product-name-selection-label'>Write Your Product Name: </label>
                                                    <input type="text" name='motorcycles_product_name' className="product-name-input-motorcycles" />
                                                </div>
                                                
                                                <div className="currency-used">
                                                    <select  className="select-a-currency" name='currency_motorcycle' onChange={()=>{}}>
                                                        <option value="€" className="currency-option">€</option>
                                                    </select>

                                                </div>
                                                <div className="product-is-new">
                                                    <select name="product_new_motorcycle" id="" className="product-is-new-select">
                                                        <option value="product_old" className="product-is-new-option">Product is not "market new"</option>
                                                        <option value="product_new" className="product-is-new-option">Product is "market new"</option>
                                                    </select>
                                                </div>
                                                <div className="motorcycles-product-details">
                                                        <div className="equipment-categories-creation">
                                                            <div className="categori-creation-inputs-container">
                                                                    <label  className="sub-categories-creation-label">Write the products (sub) categories lowercase with space between them</label>
                                                                    <input type="text" name='motorcycles_sub_categories' className="categories-sub-creation-input" />
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="description-product-equipment">
                                                            <div className="description-inputs-container">
                                                                <label className='description-equipment-label'>Write the product description</label>
                                                                
                                                                <textarea name="product_description_motorcycles" id="" wrap='no-wrap' cols={40} rows={30} className="product-description-equipment"></textarea>
                                                            </div>
                                                        </div>

                                                        <div className="equipment-pictures-available">
                                                            <label className='pictures-available-label'>Select product available pictures</label>
                                                            <select  className="pictures-available-select" name='pictures_available_motorcycles' onChange={()=>{}}>
                                                                
                                                                <option value="1" className="picture-available-number">1</option>
                                                                <option value="2" className="picture-available-number">2</option>
                                                                <option value="3" className="picture-available-number">3</option>
                                                                <option value="4" className="picture-available-number">4</option>
                                                                <option value="5" className="picture-available-number">5</option>
                                                                <option value="6" className="picture-available-number">6</option>
                                                                <option value="7" className="picture-available-number">7</option>
                                                                <option value="8" className="picture-available-number">8</option>
                                                                <option value="9" className="picture-available-number">9</option>
                                                                <option value="10" className="picture-available-number">10</option>

                                                            </select>
                                                        </div>
                                                        <div className="motorcycles-year">
                                                         <div className="year-inputs-container"> 
                                                            <label htmlFor="" className="motorcycles-year-label">Product Year</label>
                                                            <input type="text" className="product-motorcycles-year" name='year_motorcycle'/>
                                                         </div>
                                                        </div>
                                                        <div className="cylinder-capacity-inputs">
                                                            <div className="cylinder-inputs-container">

                                                            <label  className="cylinder-capacity-label">Engine cylinder capacity</label>
                                                            <input type="text" name='cylinder_capacity' className="cylinder-capacity-input" />
                                                            </div>
                                                        </div>
                                                        <div className="price_moto_input_container">
                                                            <div className="price-inputs-container"> 
                                                                <label  className="price-moto-label">Product price: </label>
                                                                <input type="text" name='price_moto' className="price-moto-input" />
                                                            </div>
                                                        </div>
                                                        <div className="item_stock_moto">
                                                          <div className="item_stock-inputs-container"> 
                                                            <label  className="item-stock-label">Product stock number: </label>
                                                            <input type="text" name='item_stock_moto' className="item-stock-input" />
                                                          </div>
                                                        </div>
                                                        


                                                       

                                                        

                                                        

                                             </div>




                                            </div>
                                            {/* edit names */}
                                        </div>
                                        }
                               </div>
                                  <input type="submit" className="submit-admin-form" value="Send product Info to database"/>

                        </form>

                  </div>


                </div>
         
              }
        </>
    );
}
 
export default AdminPage;