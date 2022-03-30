import Employee from '../components/Employee'
import Details from '../components/Details'
import Attendance from '../components/Attendance'
import Login from '../components/Login'
import Create from '../components/Create'
import Result from '../components/Result'
export default [
    {

        path: '/',

        component: Login,
        exact :true
    },
    {

        path: '/Create',

        component: Create,
       
    },
    
 
    {

        path: '/Employee',

        component: Employee,
       

    },
    {

        path: '/Details',

        component: Details,


    },
    {

        path: '/Attendance',

        component: Attendance,
    },
    {

        path: '/Result',

        component: Result,
       
    },
   


]