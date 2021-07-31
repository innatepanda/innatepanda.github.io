
import React, {Component} from 'react'
import {FormGroup, Label} from 'reactstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import firebase from 'firebase'
import './modifyarticle.css'
//import Compressor from 'compressorjs'
/*import Quill from 'quill';

import { ImageResize } from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);*/








const db=firebase.firestore();
class NewArticle extends Component{
    constructor(props){
        super(props);
        
        this.state={
            article:{
                Title:'',
                Content:'',
                Created:new Date(),
                Summary:'',
                Category:'General',
                Author:this.props.auth.uid,
                AuthorName:firebase.auth().currentUser.displayName
                
                

            },
            sum:150,
            t:50,
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

      

      onChangeTitle=(value)=>{
        
        this.setState({
            //t:this.state.t-(value.length-this.state.Title.length)
            t:50-value.length
            
        })
          this.setState({
              article:{
                  ...this.state.article,
                  Title:value,
                  
              }
          })
          
      }

      onChangeContent=(value)=>{
        this.setState({
            article:{
                ...this.state.article,
                Content:value,
            }
        })
      }
      onChangeDate=(value)=>{
        this.setState({
            article:{
                ...this.state.article,
                Created:value,
            }
        })
    }

    onChangeCat=(value)=>{
      this.setState({
          article:{
              ...this.state.article,
              Category:value,
          }
      })
    }
    onChangeSum=(value)=>{
        this.setState({
            article:{
                ...this.state.article,
                Summary:value,
            }
            
        })
        this.setState({
            sum:150-value.length
            
        })


      }
      onChangeYt=(value)=>{
        this.setState({
            article:{
                ...this.state.article,
                Youtube:value,
            }
            
        })
      }


    submitArticle=()=>{
        console.log(this.state.article)
        db.collection("posts").add(this.state.article).then(
            res=>{
                this.props.history.push('/article/'+res.id+'/'+this.state.article.Title)
                console.log(res.id)

            }
        ).catch(error=>{
            var pr={
                open:true,
                msg:error.message,
                color:'red'
            }
            this.state.showmodal(pr);
        })
        


    }

    render(){
        return(
            <div>
                <div className="edit-main">
                <div className="ribbon-long"></div>
                
                <div>
                <div className="article-title"><b>Create New</b></div><br /><br />
                <FormGroup className="edit-field">
                                <Label className="edit-label">Title</Label>
                                <input type='text' name='newtitle' id='newtitle' maxlength="50"
                                onChange={(el)=>this.onChangeTitle(el.target.value) }
                                value={this.state.article.Title}/>
                                <div className="small-text-purple">{this.state.t}/50</div>
                            </FormGroup>
                            <FormGroup className="edit-field">
                                <Label className="edit-label">Category</Label>
                                <input type='text' name='newcat' id='newcat'
                                onChange={(el)=>this.onChangeCat(el.target.value)}
                                value={this.state.article.Category}/>
                                
                            </FormGroup>
                            <FormGroup className="edit-field">
                                <Label className="edit-label">Date</Label>
                                <input type='date' name='newdate' id='newdate' 
                                onChange={(el)=>this.onChangeDate(el.target.value)}
                                value={this.state.article.Created}/>
                                
                            </FormGroup>
                            <FormGroup className="edit-field">
                                <Label className="edit-label">Summary</Label>
                                <input type='text' name='newsum' id='newsum' maxlength="150"
                                onChange={(el)=>this.onChangeSum(el.target.value)}
                                value={this.state.article.Summary}/>
                                <div className="small-text-purple">{this.state.sum}/150</div>
                                
                            </FormGroup>
                            <FormGroup className="edit-field">
                                <Label className="edit-label">Youtube Link</Label>
                                <input type='text' name='newyt' id='newyt'
                                onChange={(el)=>this.onChangeYt(el.target.value)}
                                value={this.state.article.Youtube}/>
                                
                            </FormGroup>
                            <FormGroup className="edit-field">
                                <Label className="edit-label">Content</Label>
                                <div className="reactquill-bg">
                                <ReactQuill 
                                ref={(el)=>this.quill=el}
                                value={this.state.article.Content}
                                onChange={(el)=>this.onChangeContent(el)}
                                theme='snow'
                                formats={this.formats}
                                modules={this.modules}
                                />
                                 
                                </div>
                               
                               
                            </FormGroup>
                            Note: select text then click on link, select text then click on clean format (tx sorta symbol)
                             <br />   Note: first code is codeblock next is inline code

                       
                            <div><button className="edit-btn" onClick={(e)=>this.submitArticle()}>Create article</button></div>
                    </div>
                
                
                            
                            
                        
                </div>
            </div>
        )
    }
}


export default NewArticle