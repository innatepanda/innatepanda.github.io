import React, {Component} from 'react'
import {FormGroup, Label} from 'reactstrap'
import firebase from '../../component/Config/firebase'

//import  { Redirect } from 'react-router-dom'

//var email, password;
var pr;
class Login extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            
            res:{
                email:'',
            password:'',
            response:'',
            
            },
            showmodal:props.showmodal
        }
    }
    
    
     
    onChangeEm=(value)=>{
        this.setState({
            res:{
                ...this.state.res,
                email:value,
            }
        })
      }
      onChangePw=(value)=>{
          
        this.setState({
            res:{
                ...this.state.res,
                password:value,
            }
        })
      }
     
      submitEm=async()=>{
          
          
          
            await firebase.auth()
          .signInWithEmailAndPassword(this.state.res.email, this.state.res.password).then((user)=>{console.log(user)
            this.props.history.push('/')}).catch((error)=>{
                console.log(error.code)
                console.log(error.message)
                //this.props.history.push('/')
                pr={
                    color:'red',
                    open:true,
                    msg:error.message
                  }
                  this.state.showmodal(pr)
          });
          
         
        
    }
    resetPw(){
        firebase.auth().sendPasswordResetEmail(
            this.state.res.email, null)
            .then(function() {
                this.props.history.push('/link-sent')}).catch((error)=>{
                    this.props.history.push('/link-sent')
            })
            .catch(function(error) {
              console.log(error)
            });
    }
        

    

  
    render(){
        
        return(
            <div>
                <div className="settings-main">
                <div className="article-title"><b>Members area</b></div><br />
                <div>
                            <FormGroup className="edit-field">
                                <Label>Email</Label>
                                <input type='text' name='newem' id='newem'
                                onChange={(el)=>this.onChangeEm(el.target.value)}
                                value={this.state.res.email}/>
                                
                            </FormGroup>
                            <FormGroup className="edit-field">
                                <Label>Pw</Label>
                                <input type='password' name='newpw' id='newpw'
                                onChange={(el)=>this.onChangePw(el.target.value)}
                                value={this.state.res.password}/>
                                
                            </FormGroup>
                            <div className="edit-btn">
                            <button  onClick={(e)=>this.submitEm()}>Login</button>
                            <button  onClick={(e)=>this.resetPw()}>Reset pw</button>

                            </div>
                            

                </div>
                
                </div>
               
            
            </div>
        )
    }
}

export default Login