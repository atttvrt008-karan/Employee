import * as React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from 'react-redux';

interface Mystate {
    firstname: string;
    item: any;
    employee_id: number | string;
    attendance: any;
}
interface Myprops {
    firstname: string;
    item: any;
    username: any;
}
type Employee = {
    firstname: string;
    employee_id: number | string;
    attendance: string;
}
var array: Array<Employee> = [];


class Attendance extends React.Component<Myprops, Mystate>{


    constructor(Myprops: Myprops) {
        super(Myprops)

        this.state = {
            firstname: "",
            item: "",
            employee_id: "",
            attendance: "",

        }



    }
    attendancehandler = (event: any) => {
        this.setState({
            attendance: event.target.value
        })
    }

    handleApiClick = () => {

        axios.get("https://localhost:5001/api/employees")
            .then((response) => {
                console.log(response);
                array = response.data;
                console.log(array);
                this.setState({

                })

            })
    }
    componentWillMount() {
        this.handleApiClick()
    }

    render() {

        const handleSaveClickml = (index: any, item: any, event: any) => {
            alert("save")

            console.log(item);

            const attendance = {

                employee_id: item.employee_id,
                firstname: item.firstname,
                attendance: this.state.attendance,

            }
            console.log(attendance)

            axios.post("https://localhost:5001/api/attendances/Create", attendance)

                .then(response => {
                    var result = response.data;
                    console.log(result)
                })


        }
        const _click = (index: any, item: any, event: any) => {
            console.log(item)
            const attendance = {
                attendance: this.state.attendance,

            }
            const employee_id = item.employee_id
            console.log(attendance)
            console.log(employee_id)

            axios.put("https://localhost:5001/api/attendances/Edit/" + employee_id, attendance)
                .then(res => {
                    this.setState({ item: res.data });

                })
        }
        return (
            <> 
            <h1>Attendance </h1><h2>username:{this.props.username}</h2>
            <div className='right'>  <Link to="/Details"> 
            Employee
             </Link></div><div className='left'>  <Link to="/Result"> 
            Attendance Details
             </Link></div>
                <div >
                    
                    <table >
                        <thead>
                            <tr>
                                <th>Employee_id</th>
                                <th>FirstName</th>
                                <th>Attendance</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                array.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{item.employee_id} </td>
                                            <td>{item.firstname} </td>
                                            <td>  <Select
                                                style={{ width: "300px" }}
                                                // value={this.state.attendance}
                                                onChange={this.attendancehandler}
                                            >

                                                <MenuItem value={"Present"}>Present</MenuItem>
                                                <MenuItem value={"Casual Leave"}>Casual Leave</MenuItem>
                                                <MenuItem value={"Sick Leave"}>Sick Leave</MenuItem>
                                                <MenuItem value={"Loss of Pay Leave"}>Loss of Pay Leave</MenuItem>
                                            </Select>  </td>
                                            <td>    <button className='buttonEdit' onClick={(event) => _click(index, item, event)}>
                                                Edit</button> <button className='buttonDelete' onClick={(event) => handleSaveClickml(index, item, event)}>
                                                    Create</button></td>
                                        </tr>


                                    )
                                }


                                )}


                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}



const mapStateToProps = (state: any) => {

    return {
        username: state.user.username,
    }

}

export default connect(mapStateToProps)(Attendance);
