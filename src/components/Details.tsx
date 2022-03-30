import * as React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import Pagination from "@material-ui/lab/Pagination";
interface Mystate {
    firstname: string;
    lastname: string;
    department: string;
    phoneno: number | string;
    image: string;
    item: any;
    file: string | Blob;
    base64URL?: unknown;
    salary: number | string;
    address: string;
    filter: string;
    employee_id: number | string;
    array :any;
    base :any;

}
interface Myprops {
    firstname: string;
    lastname: string;
    gender: string;
    phoneno: number;
    image: string;
    item: any;
    file: string | Blob;
    base64URL?: unknown;
   
    history : any;
    username :any;
}

type Employee = {
    firstname: string;
    lastname: string;
    phoneno: number | string;
    image: string;
    employee_id: number | string;
    salary: number | string;
    department: string;
    address: string;
}

var base: string;

var array: Array<Employee> = [];


var arrayindex = -1;

var rollnoindex;


class Details extends React.Component<Myprops, Mystate>{
    [x: string]: any;
    // [x: string]: any;
    constructor(Myprops: Myprops) {
        super(Myprops)

        this.state = {
            firstname: "",
            lastname: "",
            address: "",
            department: "",
            phoneno: "",
            image: "",
            file: "",
            base64URL: "",
            item: "",
            salary: "",
            filter: "",
            employee_id: "",
            array:"",
            base :"",
        }

        this.searchTxt = this.searchTxt.bind(this)

    }
    firsthandler = (event: any) => {
        this.setState({
            firstname: event.target.value
        })
    }
    lasthandler = (event: any) => {
        this.setState({
            lastname: event.target.value
        })
    }
    departmenthandler = (event: any) => {
        this.setState({
            department: event.target.value
        })
    }
    phonenumberhandler = (event: any) => {
        this.setState({
            phoneno: event.target.value
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
    searchTxt(event: any) {
        this.setState({ filter: event.target.value });
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
        console.log(event.target.files[0]);
        let { file } = this.state;

        file = event.target.files[0];

        this.getBase64(file)
            .then(result => {
                base = "" + result + "";
                //
                console.log("'" + result + "'");
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

    };
    handleApiClick = () => {

        axios.get("https://localhost:5001/api/employees")
            .then((response) => {
                console.log(response);
                array = response.data;
                console.log(array);
                this.setState({
                    array:array
                })

            })
    }
    componentWillMount() {
        this.handleApiClick()
    }
    render() {

    

        let filter = this.state.filter;
        var dataSearch = array.filter(item => {
            return Object.keys(item).some(key =>
                item["firstname"].toLowerCase().includes(filter.toLowerCase())) ||
                item["employee_id"]
                    .toString()
                    .toLowerCase()
                    .includes(filter.toLowerCase())
        });


        const handleDeleteClick = (index: any) => {

            const employee_id = array[index].employee_id

            axios.delete("https://localhost:5001/api/employees/Delete/" + employee_id)
                .then(res => {

                    if (res.data == 1) {
                        array.splice(index, 1);

                        this.setState({
                        });
                    }
                })

        }




        const handleEditClick = (index: any, item: any) => {
            rollnoindex = array[index].employee_id
            console.log(rollnoindex)
            arrayindex = index;
            this.setState({
                employee_id: item.employee_id,
                firstname: item.firstname,
                lastname: item.lastname,
                address: item.address,
                department: item.department,
                phoneno: item.phoneno,
                image: item.image,
                salary: item.salary
            })
        }
        const handleSaveClick = () => {
            alert("save");
            const employee = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                address: this.state.address,
                department: this.state.department,
                phoneno: this.state.phoneno,
                salary: this.state.salary,
                image:base,

            };
            console.log(employee);
            var employee_id = this.state.employee_id;
            var firstname = this.state.firstname;
            var lastname = this.state.lastname;
            var department = this.state.department;
            var address = this.state.address;
            var phoneno = this.state.phoneno;
            var salary = this.state.salary;
            var image = this.state.image;

            console.log(employee_id);
            axios.put("https://localhost:5001/api/employees/Edit/" + employee_id, employee)

                .then(res => {
                    this.setState({
                        item: res.data
                    });

                })

            array.splice(arrayindex, 1, { "employee_id": employee_id, "firstname": firstname, "lastname": lastname, "department": department, "address": address, "phoneno": phoneno, "image": image, "salary": salary })
            arrayindex = -1;
            this.setState({
                firstname: "",
                lastname: "",
                department: "",
                salary: "",
                address: "",
                phoneno: "",
                image: "",
                base : "",
                employee_id :"",
            })


        }
        const Addhandle = () => {
            this.props.history.push('/Employee');
           
            
            }


        return (

            <div>
              



               <h3> <label>search :</label><input type="text" value={filter} onChange={this.searchTxt} /> </h3> <div className='left'>  <Link to="/Attendance"> 
            Attendance 
             </Link></div> <h2>username:{this.props.username}</h2>
               <h3> {
                    (dataSearch.length > 0)
                        ? <div> search for {filter} </div>
                        : <div> Not found {filter} </div>
                }</h3>
<button type="button" className='buttonAdd'
                                    onClick={() => Addhandle()}
                                >
                                    Add Employee
                                </button>
                 
                <div >

                    <table >
                        <thead>
                            <tr>
                                <th>Employee_id</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Phoneno</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Address</th>
                                <th>photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="number" value={this.state.employee_id} /> </td>
                                <td><input type="text" value={this.state.firstname} onChange={this.firsthandler} /> </td>
                                <td><input type="text" value={this.state.lastname} onChange={this.lasthandler} /> </td>
                                <td><input type="number" value={this.state.phoneno} onChange={this.phonenumberhandler} /> </td>
                                <td><Select
                id ="Department"
                  style={{ width: "200px" }}
                  value={this.state.department}
                  onChange={this.Departmenthandler}
                >
               
                  <MenuItem value={"HR"}>HR</MenuItem>
                  <MenuItem value={"IT"}>IT</MenuItem>
                  <MenuItem value={"Accounts and Finance"}>Accounts and Finance</MenuItem>
                  <MenuItem value={"Marketing"}>Marketing</MenuItem>
                </Select> </td>
                                <td><input type="number" value={this.state.salary} onChange={this.salaryhandler} /> </td>
                                <td><input type="text" value={this.state.address} onChange={this.addresshandler} /> </td>
                                <td><input type="file" onChange={this.handleFileInputChange} />  <img width="100" src={this.state.image} /> </td>
                                <td>  <button type="button" className='buttonSubmit'
                                    onClick={() => handleSaveClick()}
                                >
                                    Save
                                </button></td>

                            </tr>
                            {dataSearch.length > 0 ? (
                                dataSearch.map((item, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{item.employee_id} </td>
                                            <td>{item.firstname} </td>
                                            <td>{item.lastname}  </td>
                                            <td>{item.phoneno}</td>
                                            <td>{item.department}</td>
                                            <td>{item.salary}</td>
                                            <td>{item.address}</td>
                                            <td><img width="100" src={item.image} /> </td>
                                            <td>

                                                <button
                                                    type="button" className='buttonEdit'
                                                    onClick={() => handleEditClick(index, item)}>
                                                    Edit
                                                </button>

                                                <button type="button" className='buttonDelete' onClick={() => handleDeleteClick(index)}>
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>

                                    )
                                })
                            ) : (

                                array.map((item, index) => {

                                    return (



                                        <tr key={index}>
                                            <td>{item.employee_id} </td>
                                            <td>{item.firstname} </td>
                                            <td>{item.lastname}  </td>
                                            <td>{item.phoneno}</td>
                                            <td>{item.department}</td>
                                            <td>{item.salary}</td>
                                            <td>{item.address}</td>
                                            <td><img width="100" src={item.image} /></td>
                                            <td> <button
                                                type="button" className='buttonEdit'
                                                onClick={() => handleEditClick(index, item)}>
                                                Edit
                                            </button>


                                                <button type="button" className='buttonDelete' onClick={() => handleDeleteClick(index)}>
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>

                                    )
                                })
                             )}
                       </tbody>
                    </table>
             </div>
            </div>
        );

    }
}






const mapStateToProps = (state :any) =>{

    return {
      username : state.user.username,
    }
  
  }
  
  export default connect(mapStateToProps)(Details);
  
