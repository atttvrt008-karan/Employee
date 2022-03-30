
import { Link } from "react-router-dom";
import * as React from "react";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';

interface Myprops {
    history : any;
    setLastname : any;
}

class Login extends React.Component<Myprops, any>{
       constructor(Myprops: Myprops ) {
        super(Myprops)
        this.state = {
            Email: "",
            password: "",
            username: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlerEmail = (event: any) => {
        this.setState({
            Email: event.target.value
        })
    }
    handlerPassword = (event: any) => {
        this.setState({
            password: event.target.value
        })
    }
    handleSubmit(event: any) {
        event.preventDefault();

        console.log("The form was submitted with the following data:");
        console.log(this.state);
        const login = {
            Email: this.state.Email,
            password: this.state.password
        }
        console.log(login)
        axios.put("https://localhost:5001/api/Logins/detail/", login)
            .then(response => {
                console.log(response);
                if(response.data.length>0){
                    this.props.setLastname(response)
                    // alert("1")
                    this.props.history.push('/Details'); 
                }
                else {
                    alert("please enter the correct Email and password")
                }

                  this.setState({ 
                      Email :"",
                      password :""
                   });

            })

    }
  

    render() {
        return (
            <>
            <h1> LOGIN FORM </h1>
                <div>
                    <form onSubmit={this.handleSubmit}>

                    <TextField
                 
                 label="Email"
                 id="Email"
                 value={this.state.Email}
                 onChange={this.handlerEmail}
               />
               <br />
               <br />



               <TextField
                 type="password"
                 label="password"
                 id="password"
                 value={this.state.password}
                 onChange={this.handlerPassword}
               />
               <br />
               <br />
    <button id="formFieldButton">Login</button>
          </form><br /> <br />
          <Link to="/Create"> 
         create an account
            </Link>
          
          </div>
            </>
        );
    }
}

const mapStateToProps = (state :any) =>{

    return {
  
     username:state.user.username,
    
    }
  
  }
  const mapDispatchToProps = (dispatch :any)=>{
        
    return {
  
      setLastname(response :any){
       const username ={
      username:response.data[0].username,
     
       }
  
       console.log(username)
        
        dispatch({type:"username",state:username})
       
     
      }
     
     
    }
    
  }
  
    
    export default connect(mapStateToProps,mapDispatchToProps)(Login)