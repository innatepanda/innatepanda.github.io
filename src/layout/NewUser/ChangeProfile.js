
import React, {Component} from 'react'

import {FormGroup, Label, input, button} from 'reactstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import firebase from 'firebase'
import './settings.css'
//import Compressor from 'compressorjs'
/*import Quill from 'quill';

import { ImageResize } from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);*/








var newPassword; var pr;
const db=firebase.firestore();
class ChangeProfile extends Component{
    constructor(props){
        super(props);
        
        this.state={
            
            user:{
                name:"",
                email:"",
                desc:"",
                github:"",
            },
            actualuser:firebase.auth().currentUser,
            showmodal:props.showmodal,
        }
        
    }
    toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'code'],        // toggled buttons
        
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                             // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] , 'header': [1, 2, 3, 4, 5, 6] }],  // custom dropdown
        
      
                  // dropdown with defaults from theme
        [{ 'font': [] , 'align': []}],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],    
        ['link', 'image'],  
        ['clean'],
                                          // remove formatting button
      ];
    modules = {
        
        toolbar: {
            container:this.toolbarOptions,
            /*handlers:{
                image:()=>this.quillImageCallBack()
                
            }*/
        },
        /*ImageResize: {
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        }*/
        
        
      }

      quillImageCallBack=()=>{
        
    }
    
      formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'color', 'clean', 'code-block', 'code', 'align'
      ]

      

      

      onChangedesc=(value)=>{
        this.setState({
            user:{
                ...this.state.user,
                desc:value,
            }
        })
      }
      onChangegithub=(value)=>{
        this.setState({
            user:{
                ...this.state.user,
                github:value,
            }
        })
    }

    onChangeat=(value)=>{
      this.setState({
          user:{
              ...this.state.user,
              email:value,
          }
      })
    }
    
      
      onChangename=(value)=>{
        this.setState({
            user:{
                ...this.state.user,
                name:value,
            }
            
        })
      }


    submitArticle=()=>{
        console.log(this.state.article)
        db.collection("users").doc(this.state.actualuser.uid).update({
            name:this.state.user.name,
            email: this.state.user.email,
            desc: this.state.user.desc,
            github: this.state.user.github,


            
        }

        ).then((res)=>{
            this.state.actualuser.updateProfile({
                displayName: this.state.user.name,
                
              }).then(() => {
                // Update successful
                this.props.history.push('/user-profile/'+this.state.actualuser.uid+'/'+this.state.user.name)
                // ...
              }).catch((error) => {
                // An error occurred
                // ...

                pr={
                    open:true,
                    msg:error.message,
                    color:'red'
                }
                this.state.showmodal(pr);
              });  
            
        }
        ).catch(error=>{
            pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
        })
        


    }
    submitpw(){
        
        this.state.actualuser.updateEmail(this.state.user.email).then(() => {
            // Update successful
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
            pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
          })
          this.state.actualuser.updatePassword(newPassword).then(() => {
            // Update successful.
            
            newPassword=''
          }).catch((error) => {
            // An error ocurred
            // ...
            pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
          })
        

            

        
    }
componentDidMount(){
    db.collection("users").doc(this.state.actualuser.uid).get().then(
        doc=>{console.log(doc.data())
        this.setState({
            user:{
                name:doc.data().name,
                email:doc.data().email,
                desc:doc.data().desc,
                github:doc.data().github,
            }
        })
        }).catch(error=>{
            pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
        })
        
    
    
}
    render(){
        return(
            <div >
                
                    
                        <div className="settings-main">
                            <div className="settings-section">
                                <div><h2>Edit<br/> Profile</h2></div>

                                <div>
                                
                            <FormGroup>
                                <Label>Display Name</Label>
                                <input type='text' name='newName' id='newName' maxlength="20"
                                onChange={(el)=>this.onChangename(el.target.value) }
                                value={this.state.user.name}/>
                                {this.state.t}
                            </FormGroup><br />
                            
                            
                            
                            <FormGroup>
                                <Label>Github Link</Label>
                                <input type='text' name='newyt' id='newyt'
                                onChange={(el)=>this.onChangegithub(el.target.value)}
                                value={this.state.user.github}/>
                                
                            </FormGroup><br />
                            <FormGroup>
                            <Label>Description</Label>
                            <div className="reactquill-bg">
                            <ReactQuill 
                                ref={(el)=>this.quill=el}
                                value={this.state.user.desc}
                                onChange={(el)=>this.onChangedesc(el)}
                                theme='snow'
                                formats={this.formats}
                                modules={this.modules}
                                />
                            </div>
                              
                                Note: select text then click on link, select text then click on clean format (tx sorta symbol)<br />
                                Note: first code is codeblock next is inline code
                                
                                
                            </FormGroup><br />
                            <button onClick={(e)=>this.submitArticle()}>Save profile</button>
                                </div>
                            </div>

                            
                            <div className="settings-section">
                                <div><h2>Account Settings</h2></div>
                                <div>
                                <FormGroup>
                                <Label>Email</Label>
                                <input type='text' name='newEmail' id='newEmail'
                                onChange={(el)=>this.onChangeat(el.target.value)}
                                value={this.state.user.email}/>
                                
                            </FormGroup><br />
                            <FormGroup>
                            
                                <Label>Change Password:</Label>
                             <input id="input-field" type="password"  onChange={(e)=>{newPassword=e.target.value}} />A user can request for reset password a maximum of 3 times within 1 hour.<br />
                             ps: password changes for now if msg=user credential is invalid
                            </FormGroup><br />
                            
                        
                       
                            
                            <button onClick={(e)=>this.submitpw()}>Confirm Changes</button>
                                </div>
                            </div>
                            
                        </div>
                    
               
            </div>
        )
    }

}

export default ChangeProfile