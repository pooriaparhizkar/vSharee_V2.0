import { profile } from 'console';
import React  from 'react'
import { Profilelang } from './Profile.lang';
class Profiles extends React.Component<any, any>{
    
    constructor(props:any){
        super(props);
        this.state = {
           
        }
   
}
render(){
    return(
        <div>
            {Profilelang.body.test}
            ss
        </div>
    )
}
        
}
export default Profiles