import { Link } from "react-router-dom";
import * as React from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";

interface Myprops {
    history : any;
}

class Create extends React.Component<Myprops, any>{

    constructor(Myprops: Myprops ) {
        super(Myprops)
        this.state = {
            Email: "",
            password: ""
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
    handlerusername = (event: any) => {
        this.setState({
            username: event.target.value
        })
    }
    handleSubmit(event: any) {
        event.preventDefault();
        const login = {
            Email: this.state.Email,
            password: this.state.password,
            username :this.state.username
        }
        console.log(login)
        axios.post("https://localhost:5001/api/Logins/Create/", login)
            .then(response => {
                console.log(response);
                if(response.data>0){
                    alert("Email is already exist")
                  
                }
                else {
                    alert("successfully register")
                    this.props.history.push('/'); 
                   
                }
                  this.setState({ 
                      Email :"",
                      password :"",
                      username : "",
                   });

            })

    }

    render() {
        return (
            <>
            <h1> Create an account </h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                <TextField
                 id="Email"
                 label="Email"
                 value={this.state.Email}
                 onChange={this.handlerEmail}
               />
               <br />
               <br />

               <TextField
                 id="username"
                 label="Username"
                 value={this.state.username}
                 onChange={this.handlerusername}
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
    <button  id ="create" className="formFieldButton">signup</button>
          </form>
          <br />
          <br /> <Link to="/">
              I'm already member
            </Link>
          </div>
            </>
        );
    }
}

export default Create;
