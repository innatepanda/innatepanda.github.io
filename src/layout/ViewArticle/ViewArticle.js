import React, {Component} from 'react'

import parse from 'html-react-parser';
import {withRouter} from 'react-router-dom'

import firebase from '../../../src/component/Config/firebase'
import YouTubePlayer from 'react-player/youtube';
import {Link} from 'react-router-dom'

import './viewarticle.css'
const opts = {
    width: '90px',
    
    
    
  };
const db=firebase.firestore();
class ViewArticle extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            article:{},
            loaded:false,
            auth:'',
            artauth:'',
            
        }
        
    }

        componentDidMount(){
            console.log(this.props)
            console.log(this.props.match.params.id)
            this.getById(this.props.match.params.id);
        }

        

        getauth(){
    
    
            db.collection("users").doc(this.state.article.Author).get().then(
                doc=>{
                    
                    this.setState({
                        
                            artauth:doc.data(),
                            
                    })
                    
                }
               
        
            )
            
                
        
            }
    getById=(aid)=>{
        
        db.collection("posts").doc(aid).get().then(doc=>{
            if(doc.exists)
            {
                this.setState({
                    article: doc.data()
                }, ()=>{
                    this.setState(
                        {
                            loaded:true
                        }
                    )
    
                })
                this.getauth()
            }
            else
            {
                
                this.props.history.push({pathname:'/'})
            }
        } )
    }
    render(){
        if(this.state.loaded)
       { 
        
       var art={
            artauth:this.state.artauth,
            auth:this.state.auth
        }
        
        var a={
            ...this.state.article,
            id: this.props.match.params.id
        }
        console.log(a)
            return(
            <div className="article">
                
                <div >
                <div className="ribbon-long"></div>
                </div>

                
                <div>
                <div className="article-title"><b>{parse(a.Title)}</b></div>
                <div className="article-author">
                <span className="small-text">{a.Created.split("-")[2]}-{a.Created.split("-")[1]}-{a.Created.split("-")[0]}, by </span>
                {
                    
                    <Link className="article-author" to={{pathname:'/user-profile/'+this.state.article.Author+'/'+art.artauth.name +'/', state:{author: art}}}> {art.artauth.name} </Link>
                
               

                } 
                </div>
                
                
                <div class="video-player">
                <YouTubePlayer  url={a.Youtube} opts={opts} />            
                </div>

                <div className="article-content">{parse(a.Content)}</div>
                </div>


                <div>
                <div className="ribbon-long"></div><br />
                {
                   firebase.auth().currentUser!==null?firebase.auth().currentUser.uid===this.state.article.Author?
                    <div>
                            <Link to={{pathname:'/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article' , state:{article:a}}}> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                            </svg>
                            
                            
                            
                            </Link>
                            <button className="btn-none" onClick={()=>{
                                
                                db.collection("posts").doc(this.props.match.params.id).delete().then(() => {
                                    
                                    console.log("Document successfully deleted!");
                                    this.props.history.push( "/xorblog/")
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                });
                            }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                          </svg></button>
                    </div>
            
                    
                    :''
                    :''

                }
      
                </div>
                
                
                
                
            </div>
            
        )
       }
       else{
           return(
               <div className="error-div small-text-purple">
                   loading..
               </div>
           )
       }
    }
}

export default withRouter(ViewArticle)