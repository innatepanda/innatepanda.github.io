import React, {Component} from 'react'

import firebase from "../../../component/Config/firebase"




const db=firebase.firestore();

class Main extends Component{
    constructor(props)
    {
        
        super(props)
        
            this.state={
                isLoaded:false,
                articles:[],
                article:{},
                prop:props
                


            }
        
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
            
            var p=this.state.prop.auth
            db.collection("posts").where("Created", "<=",this.today )
            .orderBy("Created", "desc").limit(2).get().then(docs=>{
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
                    articles:art
                }, ()=>{
                    console.log(this.state.articles)
                    this.setState({
                        isLoaded: true
                    })
                })
            })
        }
    render(){
        return(
            <div div className="user-main">
                       <div>
                    <div className="article-title"><b>XoRphilic</b></div><div className="description">By default, a background-image is placed at the top-left corner of an element, and repeated both vertically and horizontally.</div><br /><br />
                    <button onClick={()=>this.props.history.push('/allArticles')} className="btn-none small-text-purple"> View All <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
</svg></button>
                   

                    
                    </div>
                <div className="user-content">
                 {  
                    this.state.isLoaded?                     
                    this.state.articles.map((article, index)=>{
                       
                        return (
                            <div>
                                          <div className="each-article">
                                    <div className="side-number">{index+1}</div>
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
                                
                            </div>
                            
                           
                        )
                    }) :" "
                }  
                </div>
                

                
            </div>
        )
    }
}

export default Main;