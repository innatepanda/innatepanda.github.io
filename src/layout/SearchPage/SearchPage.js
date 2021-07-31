import React, {Component} from 'react'


import firebase from "../../component/Config/firebase"
import './searchpage.css'

const db=firebase.firestore();


var isLoaded=false
var articles=[]
var st=''                
                
                
class SearchPage extends Component{
 
    constructor(props)
    {
        
        super(props)
        
            this.state={
                pg:0
            }
            

            
        console.log(props)
        this.today = new Date();
        var dd = String(this.today.getDate()).padStart(2, '0');
        var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = this.today.getFullYear();

        this.today = yyyy + '-' + mm + '-' + dd;
        st=props.word
        
            
            this.getArt(st)
        
    }

    shouldComponentUpdate(nextprops){
        isLoaded=false
        
        st=this.props.word
        
        
        this.getArt(st)
        
    }
    


        getArt=async ()=>{
            var p=firebase.auth().currentUser
            
            await db.collection("posts").where("Created", "<=",this.today )
            .orderBy("Created", "desc").get().then(docs=>{
                
                let art=[];
                docs.forEach(function(doc){
                    
                    if(doc.data().Title.toLowerCase().indexOf(st.toLowerCase())>=0 || 
                    doc.data().Content.toLowerCase().indexOf(st.toLowerCase())>=0 ||
                    doc.data().Summary.toLowerCase().indexOf(st.toLowerCase())>=0 ||
                    doc.data().AuthorName.toLowerCase().indexOf(st.toLowerCase())>=0 ||
                    doc.data().Category.toLowerCase().indexOf(st.toLowerCase())>=0)
                    {
                        const article={
                            id:doc.id,
                            auth:p,
                            ...doc.data()
                        }
                        art.push(article);
                    }
                    
                })
                
                    articles=art
                    
                
                        isLoaded= true
                        
                        this.forceUpdate()
                   
            }).catch((err)=>{console.log(err)})
        }
    render(){
        
        
        if(articles.length===0&&isLoaded)
        {
            return(
                <div className="error-div">
                    <div className="small-text-purple">no matching searches</div>
                    please try again
                </div>
            )
        }
        if(isLoaded===false)
        {
            return(
                <div className="error-div small-text-purple">
                   loading..
               </div>
            )
        }
        
        return(
            <div>
                <div className="edit-main">
                <div className="ribbon-long"></div>
                <div>
                                <div className="article-title"><b>Search results for <span className="small-text-purple">{st}</span></b></div><br /><br />

                                {  
                                    isLoaded?                     
                                articles.map((article, index)=>{
                                    
                                    return (
                                        <div className="each-article">
                                            <div className="side-number">{index+1}</div>
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
                                


                </div>
                    
                </div>

                
            </div>
        )
    }
}

export default SearchPage;