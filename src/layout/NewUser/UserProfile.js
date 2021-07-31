import React, {Component} from 'react'

import parse from 'html-react-parser';
import {withRouter} from 'react-router-dom'

import firebase from '../../../src/component/Config/firebase'

var thispageArticles;
const db=firebase.firestore();
class ViewArticle extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            author:'',
            loaded:false,
            articles:[],
            auth:'',
            perpage:3,
            maxpgs:0,
            pg:0,
        }
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.today.getFullYear();

        this.today = yyyy + '-' + mm + '-' + dd;
        this.getById(this.props.match.params.id);
        
    }

        


    getById=(aid)=>{
        console.log(aid)
        db.collection("users").doc(aid).get().then(doc=>{
            if(doc.exists)
            {
                
                this.setState({
                   author: doc.data()
                }, ()=>{
                    this.setState(
                        {
                            loaded:true
                        }
                    )
    
                })
               
                this.getp()
                
            }
            else
            {
                
                this.props.history.push({pathname:'/'})
            }
        } )
        
    }


    getposts= async ()=>{
        let art=[]
        console.log(this.props.match.params.id)
        var id=this.props.match.params.id
              await  db.collection("posts")
              .where("Created", "<=",this.today )
              .orderBy("Created", "desc").get().then(
                    docs=>{
                       
                        var n=this.state.author.name
                        docs.forEach(function(doc){
                            
                            if(doc.data().Author===id)
                            {
                                const article={
                                    id:doc.id,
                                   name: n,
                                  
                                    ...doc.data()
                                }
                                console.log(article)
                                art.push(article)
                            }
                            
                        })

                        }
                        
                    
                ).finally(()=>{
                    this.setState({
                        articles:art,
                        maxpgs:Math.ceil(art.length/this.state.perpage),
                        loaded: true
                    }, ()=>{
                        
                        console.log("art loaded")
                       
    
                    }) 
                })

                
    }

    getp=async()=>{
        await this.getposts()
    }
    render(){
        
        if(this.state.loaded)
       { var a=this.state.author
        thispageArticles=[];
        var firstIndex=this.state.pg*this.state.perpage;
        var lastIndex=firstIndex+this.state.perpage;
        thispageArticles=this.state.articles.slice(firstIndex, lastIndex);
        
        
           return(
            <div className="user-bg">
                <div className="user-main">
                    <div>
                    <div className="article-title"><b>{a.name}</b></div><div className="description">{parse(a.desc)}</div><br /><br />
                    <a href={a.github} target="_blank" rel="noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg></a>

                    
                    </div>
                    <div>
                    <div className="user-content">
                    
                    {  
                                          
                        thispageArticles.map(( article, index)=>{
                            
                            
                            return (
                                <div className="each-article">
                                    <div className="side-number">{index+1+this.state.perpage*this.state.pg}</div>
                                        <div >
                        
                        
                        <h5 >
                            {article.Title}
                        </h5>
                        
                        <hr />
                        <div className="small-text-purple">{article.Category}</div>
                        <h6>
                        
                            <p className="small-text">
                            {article.Summary}
                            </p>

                        </h6>
                        
                                    <button onClick={()=>{
                                        this.props.history.push('/article/'  +article.id+'/'+article.Title)
                                    }}>Read More</button>



                        </div>
                                
                                </div>
                                
                                
                            )
                        }) 
                    }  
                    </div>
                    <div className="btns">
                        {
                            this.state.pg===0?
                            <button color="info" className="btn-none disabled" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                          </svg></button>:
                            <button color="info" className="btn-none" onClick={()=>{
                                this.setState({
                                pg:this.state.pg-1
                                }, ()=>{
                                    
                                //window.history.replaceState(thispageArticles, "Articles", "/Articles/"+(this.state.pg+1))
    
                                })
                            }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                          </svg></button>
                            }
                            pg-{this.state.pg+1}
                            {
                            this.state.pg===this.state.maxpgs-1 ?
                            <button color="info"  className="btn-none disabled"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg></button>:
                            <button color="info" className="btn-none" onClick={()=>{
                                this.setState({
                                pg:this.state.pg+1
                                }, ()=>{
                                //window.history.replaceState(thispageArticles, "Articles", "/Articles/"+(this.state.pg+1))
                                })
                            }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg></button>
                            }
    
                    </div>
                </div>
                
               
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