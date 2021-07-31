import React, { Component } from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Main from "../homepage/main/Main"
import ViewArticle from "../ViewArticle/ViewArticle"
import NewArticle from "../NewArticle/NewArticle"
import EditArticle from "../EditArticle/EditArticle"
import AllArticles from "../homepage/main/allArticles"
import Login from '../login/login'
import ErrorModal from '../../component/ErrorModal/ErrorModal'
import {connect} from 'react-redux'
import Heading from "../homepage/heading/Heading"
import UserProfile from '../NewUser/UserProfile'
import ChangeProfile from '../NewUser/ChangeProfile'
import LinkSent from './LinkSent'
import SearchPage from '../SearchPage/SearchPage'
import ErrorPage from '../../component/ErrorPage/ErrorPage'

import firebase from 'firebase'
const enhance=connect(
  ({firebase:{auth, profile}})=>({
      auth, profile
  })
)
class RouterManager extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            word:''
        }
        
        this.modalref=React.createRef()
        this.searchref=React.createRef()
    }
    searchword(word){
        this.setState({
            word:word
        }, ()=>{
            return 1
        })
    }
    render(){
        if(this.props.auth.isLoaded )
        {
            var pr={
                color:'red',
                open:false,
                msg:'dummy'
            }
            return(    
                <div>
                    <ErrorModal ref={this.modalref} content={pr}/>
                
                            <div>
                                <Heading {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}} searchword={word=>this.searchword(word)}/>     
                                <Switch>
                                    <Route path= "/xorblog/" >
                                        <Main {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/article/:id" >
                                        <ViewArticle showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/iJ6hjvpfuivhi0pvikbshvYVyfgv/new-article" exact>
                                    {
                                            firebase.auth().currentUser!=null?
                                            <NewArticle {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>:<Redirect to="/error404" />
                                        }
                                    
                                    </Route>
                                    
                                    <Route path="/iJ6hjvpfuivhi0pioubxjovbbdYVyfgv/edit-article" exact>
                                        {
                                            firebase.auth().currentUser!=null?
                                            <EditArticle {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>:<Redirect to="/error404" />
                                        }
                                    
                                    </Route>
                                    <Route path="/login" >
                                        <Login {...this.props}showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/allArticles" >
                                        <AllArticles {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    <Route path="/user-profile/:id/:name" >
                                        <UserProfile showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>
                                    </Route>
                                    
                                    <Route path="/change-settings" >
                                        {
                                            firebase.auth().currentUser!=null?
                                            <ChangeProfile {...this.props} showmodal={(p)=>{this.modalref.current.showmodal(p)}}/>:<Redirect to="/error404" />

                                        }
                                        
                                    </Route>
                                    <Route path="/link-sent" >
                                        <LinkSent/>
                                    </Route>
                                    <Route path="/searchpage/:id" >
                                        <SearchPage  word={this.state.word} {...this.props}/>
                                    </Route>
                                    <Route path="/error404">
                                        <ErrorPage/>
                                    </Route>
                                    <Route path="*" >
                                       <Redirect to="/error404" />
                                    </Route>
                            </Switch>
                        </div>      
            
    
                </div>
            )
              

        }
        else
            return null 
        
        
    }
}


export default enhance(withRouter(RouterManager))