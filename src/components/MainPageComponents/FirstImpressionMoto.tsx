import React,{useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare,faSquare,faArrowUp,faArrowDown,faArrowLeft,faArrowRight,faDotCircle,faAngleRight,faAngleLeft } from '@fortawesome/free-solid-svg-icons';

interface FirstImpressionMotoProps {
    
}
 


const FirstImpressionMoto: React.FC<FirstImpressionMotoProps> = () => {
 
 const general_width = '50em';//works
 const general_heigth = '40em';//works
 const general_width_num = 800//works

//  const general_width = '90em';//works too but bigger
//  const general_heigth = '48em';//works too but bigger
//  const general_width_num = 1200;//works too but bigger



 
//{display:'flex',position:'relative'}
 const [current_showned_image,setCurrent_showned_image] = useState<any>({display:'flex',position:'relative',width:general_width,heigth:general_heigth});
 
 const [imageNumber,setImageNumber] = useState(1);
// const [selectedImageClass,setSelectedImageClass] = useState<null | number>();

 const move_to_image_by_dot_click = (event:any)=>{
  const {target } = event;
  


  const dot_number_selected = target.getAttribute("data-dot_number");
    if(dot_number_selected === imageNumber) return;

  let slider_container_styles:any = {display:'flex',width:'100%',position:'relative',transition:'all 1s ease'}
 
         
    let image_number_set; 

    image_number_set = Number(dot_number_selected);

   //if(dot_number_selected <= 0)image_number_set = images_list.length -1;
  

   //if(dot_number_selected >= images_list.length - 1) image_number_set = 0;




    let next_translate_pixel_number = general_width_num * image_number_set;
   // const client_width_check = event.clientX >=next_translate_pixel_number ? event.clientX : next_translate_pixel_number;
   
  // slider_container_styles['transform'] = `translateX(-${next_translate_pixel_number}px)`;
  slider_container_styles['transition'] = 'right 1s,left 1s ease';// test
  if(next_translate_pixel_number === 0) next_translate_pixel_number = 10;
  
  if(next_translate_pixel_number > imageNumber)slider_container_styles['right'] = `${next_translate_pixel_number}px`;
  if(next_translate_pixel_number < imageNumber)slider_container_styles['left'] = `${next_translate_pixel_number}px`;
  
   setCurrent_showned_image(slider_container_styles);
   
   setImageNumber(image_number_set)


 }

 const add_slide_show_images_elements = ()=>{
  //,pointerEvents:'none'
  // current_showned_image
  const images_list = [];
  const slide_dots_select_img:any = []

   for(let i = 0;i<10;i++){
     const image_selected_class_line = imageNumber === i? 'image_line_selected' : 'select-image-line'
     images_list.push(
        
            // <img src={`/slideshow/${i}.jpg`} style={{pointerEvents:'none',width:general_width,height:general_heigth}} /> // working one

            <img src={`/slideshow/${i}.jpg`} style={{pointerEvents:'none',width:general_width,height:general_heigth}} />
        
           
       )
       slide_dots_select_img.push(
            <span className={`${image_selected_class_line}`} 
            style={{fontSize:'1.2rem',cursor:'pointer',margin:'0 1rem'}} 
            data-dot_number={i} onClick={(event)=>{move_to_image_by_dot_click(event)}}><FontAwesomeIcon icon={faDotCircle} style={{pointerEvents:'none'}}/></span>
       )
   }
   return {images_list,slide_dots_select_img};
}
const {images_list,slide_dots_select_img} = add_slide_show_images_elements();

  const slide_to_image = (event:any)=>{
   // allways take the width of the container 
   // and clientX
   // offsetWidth or clientWidth matches the carosel width(on .target)
   // match that with clientX (on event) and cut the clientWidth in half and see where the user is on the div



  }
 

  const move_to_image = (move_to:string)=>{
        // ,transform:'translateX(100px)'
   // {display:'flex',width:'100%',overflow:'hidden'}
   let slider_container_styles:any = {display:'flex',width:'100%',position:'relative'}
     if(move_to === 'left'){
         
         const image_number_set = imageNumber <= 0 ? images_list.length -1 : imageNumber - 1;
         let next_translate_pixel_number = general_width_num * image_number_set;
        // const client_width_check = event.clientX >=next_translate_pixel_number ? event.clientX : next_translate_pixel_number;
       
       // slider_container_styles['transform'] = `translateX(-${next_translate_pixel_number}px)`;


     //  slider_container_styles['transition'] = 'right 1s ease';// test
     
       slider_container_styles['right'] = `${next_translate_pixel_number}px`;
        setCurrent_showned_image(slider_container_styles);
        
        setImageNumber(image_number_set)
     }
     if(move_to === 'right'){
        
        const image_number_set = imageNumber >= images_list.length - 1 ? 0 : imageNumber + 1;
        let next_translate_pixel_number = general_width_num * image_number_set;
      //   const client_width_check = event.clientX >=next_translate_pixel_number ? event.clientX : next_translate_pixel_number;
        
        
        //slider_container_styles['transform'] = `translateX(${client_width_check}px)`;


       // slider_container_styles['transition'] = 'left 1s ease';// test
       
        slider_container_styles['left'] = `-${next_translate_pixel_number}px`;
       
        setCurrent_showned_image(slider_container_styles);

       
        setImageNumber(image_number_set)

     }
      
  }

 


const alternative_move_to_right  =()=>{

}

  


const side_img_creator = ()=>{
     
   const side_images:any = [];

  for(let i = 0;i< 3; i++){
    side_images.push(
      <img src={`/sidewayPictures/Motorcycles/${i}.jpg`} style={{width:'20vw',padding:'0.3em 1.2em',height:'100%'}}/>
    )
  }
  return side_images;

}

  //// test


    return (  
        <div className="first-impression-moto" style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}}>
                          
            <div className="carousel-images-list desktop-only"  style={{margin:'1em 0',width:general_width,height:general_heigth,justifySelf:'center',overflow:'hidden',position:'relative'}} onMouseDown={(event)=>{}}>
              {/* left   style={{position:'absolute',cursor:'pointer',top:'15.8em',left:'1em',backgroundColor:'rgb(10,10,10,0.4)',padding:'0.5em 0.7em',zIndex:1000}}*/}
              <div className="left-arrow-img-container carousel-arrow"  onClick={(event)=>{move_to_image('left')}}> 
                <FontAwesomeIcon style={{color:'white',pointerEvents:'none',fontSize:'1.6rem'}} icon={faAngleLeft} />
              </div>
              <div className="images-container" style={current_showned_image}>{images_list}</div>
              {/* style={current_showned_image} */}
               

               {/* right  style={{position:'absolute',cursor:'pointer',top:'15.8em',right:'1em',backgroundColor:'rgb(10,10,10,0.4)',padding:'0.5em 0.7em',zIndex:1000}} */}
                <div className="right-arrow-img-container carousel-arrow"  onClick={(event)=>{move_to_image('right')}} >
                    <FontAwesomeIcon style={{color:'white',pointerEvents:'none',fontSize:'1.6rem'}} icon={faAngleRight} />
                </div> 

                <div className="select_image_by_dot_click-container" style={{zIndex:10000000,position:'absolute',top:'37em',right:'2em',display:'inline-block'}}>
                  {/* modifies current_showned_image , select second dot you will get 2 * general_width_num */}
                  {slide_dots_select_img}
                </div>
            </div>
            <div className="static-first-impression-mobile mobile-only">
               
               <div className="left-arrow-img-container carousel-arrow"  onClick={(event)=>{move_to_image('left')}}> 
                <FontAwesomeIcon style={{color:'white',pointerEvents:'none',fontSize:'1.6rem'}} icon={faAngleLeft} />
              </div>
              <div className="images-container-mobile" style={current_showned_image}>{images_list}</div>
              
               

               
                <div className="right-arrow-img-container carousel-arrow"  onClick={(event)=>{move_to_image('right')}} >
                    <FontAwesomeIcon style={{color:'white',pointerEvents:'none',fontSize:'1.6rem'}} icon={faAngleRight} />
                </div> 

                <div className="select_image_by_dot_click-container" style={{zIndex:10000000,position:'absolute',top:'37em',right:'2em',display:'inline-block'}}>
                 
                  {slide_dots_select_img}
                </div>
            </div>

           
            
            <div className="side-row-image-container">
          
              <div className="side-images-up-container" style={{overflow:'hidden'}}>
                {/* {side_img_creator()} */}
              </div>
             

            </div>

        </div>
  

         




    );
}
 
export default FirstImpressionMoto;