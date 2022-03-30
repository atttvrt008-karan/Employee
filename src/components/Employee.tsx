import { Link } from 'react-router-dom';
import * as React from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from 'react-redux'
interface Mystate {
  firstname: string;
  lastname: string;
  department : string;
  phoneno: number |string;
  image: string;
  item :any;
  file: string | Blob;
  base64URL?: unknown;
  salary : number | string;
  address : string;
  
}
interface Myprops {
  username : any;
  history : any;
}

var base: unknown;
type Employee1 = {
  firstname: string;
  lastname: string;
  phoneno: number | string;
  image: string;
  employee_id: number | string;
  salary: number | string;
  department: string;
  address: string;
}



var array: Array<Employee1> = [];

class Employee extends React.Component<Myprops, Mystate> {
  constructor(Myprops: Myprops | Readonly<Myprops>) {

    super(Myprops);
    this.state = {
      firstname: "",
      lastname: "",
      address :"",
      department : "",
      phoneno: "",
      image: "",
      file: "",
      base64URL: "",
      item:"",
      salary: "",

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  firstnamehandler = (event: any) => {
    this.setState({
      firstname: event.target.value
    })
  }
  Departmenthandler = (event: any) => {
    this.setState({
        department : event.target.value
    })
  }
  phonenumberhandler = (event: any) => {
    this.setState({
      phoneno: event.target.value
    })
  }
  lasthandler = (event: any) => {
    this.setState({
      lastname: event.target.value
    })
  }
  salaryhandler = (event: any) => {
    this.setState({
      salary: event.target.value
    })
  }
  addresshandler = (event: any) => {
    this.setState({
      address: event.target.value
    })
  }
  onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(event.target.files[0])
      });
      this.handleFileInputChange(event)


    }
  }
  getBase64 = (file: any) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        let baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
  handleFileInputChange = (event: any) => {
    // console.log(e.target.files[0]);
    let { file } = this.state;

    file = event.target.files[0];
    console.log(file)
    this.getBase64(file)
      .then(result => {
        base = result;
        console.log(result);
        // file["base64"] = result;
        // console.log("File Is", file);
        this.setState({
          base64URL: result,
          file
        });
      })
      .catch(err => {
        console.log(err);
      });


    this.setState({
      file: event.target.files[0],
      image: URL.createObjectURL(event.target.files[0])
    });

  }
  handleSubmit = (event: any) => {
      const employee = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department : this.state. department,
      phoneno: this.state.phoneno,
      address: this.state.address,
      salary: this.state.salary,
      image: base,
    };
   
    console.log(employee)

    axios.post("https://localhost:5001/api/employees/Create", employee)
      .then(response => {
          array.push(response.data[0]);
          this.setState({ 
            firstname: "",
            lastname: "",
            department : "",
            phoneno: "",
            image:"",
            address:"",
            salary:"",
          });

        

      });
      alert("registered Successfully");
      this.props.history.push('/Details'); 

    event.preventDefault()

  }
  

  render() {
    return (
      <> 
      <div className='left'>  <Link to="/Details"> 
            Back
             </Link></div> 
      <div ><h2>username:{this.props.username}</h2>
     
          <h1>EMPLOYEE FORM</h1>
        <form id="submit" onSubmit={this.handleSubmit}  >
        <TextField
                 id="firstname"
                  label="FirstName"
                  value={this.state.firstname}
                  onChange={this.firstnamehandler}
                />
                <br />
                <br />
                <TextField
                  id="lastname"
                  label="LastName"
                  value={this.state.lastname}
                  onChange={this.lasthandler}
                />
                <br />
                <br />
                <TextField
                  label="PhoneNo"
                  value={this.state.phoneno}
                  onChange={this.phonenumberhandler}
                />
                <br />
                <br />
                <InputLabel >Department</InputLabel>
                <Select
                id ="Department"
                  style={{ width: "200px" }}
                  value={this.state.department}
                  onChange={this.Departmenthandler}
                >
               
                  <MenuItem value={"HR"}>HR</MenuItem>
                  <MenuItem value={"IT"}>IT</MenuItem>
                  <MenuItem value={"Accounts and Finance"}>Accounts and Finance</MenuItem>
                  <MenuItem value={"Marketing"}>Marketing</MenuItem>
                </Select>
                <br />
                <br />
                <div><label>Employee Image :</label></div> <br/>
          <input type="file"style={{ width: "200px" }} onChange={this.onImageChange} /><br /><br />
 
          <TextField
          id="Address"
                  label="Address"
                  value={this.state.address}
                  onChange={this.addresshandler}
                />
                <br />
                <br />
                <TextField
                  id="salary"
                  label="Salary"
                  value={this.state.salary}
                  onChange={this.salaryhandler}
                />
                <br />
                <br />
                
          <input  id ="submit" type="submit" className='buttonSubmit'value="Submit" /> < br /><br />
        </form>
        <img width="100" src={this.state.image}/><br/> </div>
   
      


     
      </>
    );
  }
}


const mapStateToProps = (state :any) =>{

    return {
      username : state.user.username,
    }
  
  }
  
  export default connect(mapStateToProps)(Employee);
  