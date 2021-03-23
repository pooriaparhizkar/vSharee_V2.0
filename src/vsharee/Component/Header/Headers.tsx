import { profile } from 'console';
import React from 'react'
import { HeaderLang } from './Headers.lang';
import 'bootstrap/dist/css/bootstrap.min.css';
import VshareeLogo from '../../../assets/images/profile/vshareeLogo.png'
import './Header.scss'
import TextField from '@material-ui/core/TextField';
import { Dropdown , Button } from 'react-bootstrap';
import { Profilelang } from 'vsharee/Profile/Profile.lang';
class Headers extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div className='row main-div-header'>
                <div className='col-md-3 col-4 logo-div'>
                    <img src={VshareeLogo} alt='' ></img>
                    <h1>{HeaderLang.body.sharee}</h1>
                </div>
                <div className='col-md-3 col-3 input-main-div'>
                <i className="material-icons">
search
</i>
<TextField InputProps={{
    className: 'input-search d-none d-md-block'
  }} ></TextField>
                </div>
               <div className='col-md-2 col-1 icon-main-div'>
                  
               <Button variant="danger">{HeaderLang.body.stream}</Button>


                </div>
                
                <div className='col-4 user-main-div'>
                <Dropdown className='dropdownClasss'>
     <Dropdown.Toggle variant='none' className='dropdownToggleClasss'>
     <i className="material-icons">
   account_circle
   </i>
   <h6 className='d-none d-md-block'>{HeaderLang.body.defaultname}</h6>
     </Dropdown.Toggle>
   
     <Dropdown.Menu>
       <Dropdown.Item href="#/action-1">
   
       </Dropdown.Item>
       <Dropdown.Item href="#/action-2">
   
       </Dropdown.Item>
       <Dropdown.Item href="#/action-3">
           
       </Dropdown.Item>
     </Dropdown.Menu>
   </Dropdown>
   <i className="material-icons ">
                                mail
                            </i>
                

                <i className="material-icons paddingi">
                                notifications
                            </i>
                  
                     
                        
                  
                 
                   </div>
                 
            </div>
        )
    }

}
export default Headers