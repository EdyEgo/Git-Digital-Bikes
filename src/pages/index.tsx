import {useContext} from 'react'; 
import {UserContext} from '../UserContext'


export interface HomePageProps {
    userMail:string,
    userName:string
}
 
const HomePage: React.FC = () => {
   const obj = useContext<HomePageProps>(UserContext);
 
//    const userMail = obj.userMail;
//    const userName = obj.userName; 
  const {userMail,userName} =  obj;
 
    
    return ( 
        <div className="you-are-loged-in">
            <h2 className="loged-in__user-name">{`You are logged in with the ${userName} name`}</h2>
            <h2 className="loged-in__user-email">{`You are logged in with the ${userMail} email`}</h2>
        </div>
     );
}
 
export default HomePage;



