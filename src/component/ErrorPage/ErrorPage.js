const { Component } = require("react");



class ErrorPage extends Component{
    render(){
        return (
            <div className="error-div">
                <div className="small-text-purple">error 404</div>
                something went wrong
            </div>
        )
    }
}
export default ErrorPage;