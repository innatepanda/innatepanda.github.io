import React, {Component} from 'react'

import firebase from "../../../component/Config/firebase"
/*import {button} from 'reactstrap'
import {Link} from 'react-router-dom'
*/
const db=firebase.firestore();
var thispageArticles;
class AllArticles extends Component{
 
    constructor(props)
    {
        
        super(props)
        
            this.state={
                isLoaded:false,
                articles:[],
                article:{},
                perpage:6,
                maxpgs:0,
                pg:0,

            }
        console.log(props);
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.today.getFullYear();

        this.today = yyyy + '-' + mm + '-' + dd;
        
    }

    componentDidMount(){
        this.getArt();
    }


        getArt=()=>{
            var p=this.props.auth
            db.collection("posts").where("Created", "<=",this.today )
            .orderBy("Created", "desc").get().then(docs=>{
                
                let art=[];
                docs.forEach(function(doc){
                    const article={
                        id:doc.id,
                        auth:p,
                        ...doc.data()
                    }
                    art.push(article);
                })
                this.setState({
                    articles:art,
                    maxpgs:Math.ceil(art.length/this.state.perpage)
                }, ()=>{
                    this.setState({
                        isLoaded: true
                    })
                })
            }).catch(err=>console.log(err))
        }
    render(){
        thispageArticles=[];
        var firstIndex=this.state.pg*this.state.perpage;
        var lastIndex=firstIndex+this.state.perpage;
        thispageArticles=this.state.articles.slice(firstIndex, lastIndex);
        console.log(thispageArticles)
        return(
            <div>
                <div className="edit-main">
                <div className="ribbon-long"></div>
                <div>
                <div className="article-title"><b>All Articles</b></div><br /><br />
                {  
                    this.state.isLoaded?                     
                    thispageArticles.map((article, index)=>{
                       
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
                    by <b>{article.AuthorName}</b>
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
                    }) :" "
                }  
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
}

export default AllArticles;