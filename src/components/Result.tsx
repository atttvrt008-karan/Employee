import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
// import { Palette } from '@devexpress/dx-react-chart';
import _ from 'lodash';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux'
import {
   Chart,SeriesTemplate, CommonSeriesSettings, Title,
  } from 'devextreme-react/chart';
// import { count } from 'console';
interface Myprops {
    history : any;
    username :any;
}
export interface IState {
   
    datarecords: any[];
    datacolumns: any[];
    datarecords1: any[];
    datacolumns1: any[];
    // chartData :any[];
    
}
var dataSource : any[];

interface IDataItem {
    result: string,
    count: number,
  }
  
  var chartData: IDataItem[] = [
 
  ];

class Markdetail extends React.Component< Myprops, IState> {
    constructor(Myprops: Myprops ) {
        super(Myprops)
        this.state = { 
             datarecords: [], 
             datacolumns: [],
             datarecords1: [], 
             datacolumns1: [],
            //  chartData:[],
          
            
        }
    }
    onPointClick(e :any) {
        e.target.select();
      }
    
    public componentWillMount(): void {
       
        axios.get("https://localhost:5001/api/attendances/count")
        .then((response) => {
       
            chartData =response.data;
            console.log( chartData)
         this.setState({datarecords: response.data });
       
         this.extractColumnNames();
        })
        
      
        
         
       
    }
    public handleKeyClick = (key :unknown) => {
         console.log(key)
      
        axios.get("https://localhost:5001/api/attendances/find/"+key)
        .then((response) => {
         console.log(response)
        
         this.setState({datarecords1: response.data,
           

        });
         this.extractColumnNames1();
  
        })
        
      }

    private extractColumnNames() 
    { 
        
        
        const firstrecord = _.keys(this.state.datarecords[0]);
        this.setState({datacolumns: firstrecord,});
    }
    private extractColumnNames1() 
    { 
        const firstrecord1 = _.keys(this.state.datarecords1[0]);
        this.setState({datacolumns1: firstrecord1,});
    }

    private displayRecords(key: number) {
    	const datacolumns= this.state.datacolumns;
   
    	return datacolumns.map((each_col) => 
    		this.displayRecordName(each_col,key)
    	) 
    }
    private displayRecords1(key: number) {
    	const datacolumns1= this.state.datacolumns1;
   
    	return datacolumns1.map((each_col) => 
    		this.displayRecordName1(each_col,key)
    	) 
    }

    private displayRecordName(colname:string, key:number){
    	const record = this.state.datarecords[key];
      
        if (colname== "result") {
            return<td> <a  onClick={() => this.handleKeyClick(key)}> {record[colname]}</a></td>;
          }
          return <td> {record[colname]}</td>;
        }
    	// return  <td> <a> {record[colname]}</a></td>
    // }
    private displayRecordName1(colname1:string, key:number){
    	const record1 = this.state.datarecords1[key];
       
    	return<td>{record1[colname1]} </td>
    }

    private Capitalize(str: string){
        const str_t = str.toUpperCase();
        const str_tt = str_t.replace("_", " ");
        return str_tt;
    }
    private Capitalize1(str: string){
        const str_t1 = str.toUpperCase();
        const str_tt1 = str_t1.replace("_", " ");
        return str_tt1;
    }
    public render() {
       
        const datarecords = this.state.datarecords;

        const each_datarecord_keys = this.state.datacolumns;
      
        const datarecords1 = this.state.datarecords1;
       
        const each_datarecord_keys1 = this.state.datacolumns1;
        return (
            <> <div className='right'>  <Link to="/Attendance"> 
            Attendance
             </Link></div><h2>username:{this.props.username}</h2>
            <h1>Attendance Details</h1>
              
            <div>
                {datarecords.length === 0 && (
                    <div >
                        <h3>No datarecords found at the moment</h3>
                    </div>
                )}
                <div >
                    <div >
                        <table >
                            <thead>
                             <tr>
                             {each_datarecord_keys && each_datarecord_keys.map(each_datarecord_key => 
                            <th>{this.Capitalize(each_datarecord_key)}</th>
                                )}
                               
                                </tr>
                            </thead>                            
                            <tbody> 
                            {datarecords && datarecords.map((each_datarecord, recordindex) =>
                              <tr key={each_datarecord.id}>
                                {this.displayRecords(recordindex)} 
                                
                                </tr>
                                )}
                                
                            </tbody>
                        </table>
                       
                          
                    </div>
                </div>
            </div><br />
            <h3>Bar Chart</h3>
            <Paper>
            <Chart
      
        dataSource={chartData}
        >
  

        <CommonSeriesSettings
          barWidth={80}
          argumentField="result"
          valueField="count"
          type="bar"
          ignoreEmptyPoints={true}
        />
        <SeriesTemplate nameField="count" />
       
      </Chart>
      </Paper>    
      <br />
             <div>
                {datarecords1.length === 0 && (
                    <div >

                        <h3>Click the above table result to view </h3>
                    </div>
                )}
                <div >
                    
                    <div >
                    <h1> Attendance List</h1>
                        <table >
                        
                            <thead>
                             <tr>
                             {each_datarecord_keys1 && each_datarecord_keys1.map(each_datarecord_key1 => 
                            <th>{this.Capitalize1(each_datarecord_key1)}</th>
                                )}
                               
                                </tr>
                            </thead>                            
                            <tbody> 
                            {datarecords1 && datarecords1.map((each_datarecord1, recordindex1) =>
                              <tr key={each_datarecord1.id}>
                                {this.displayRecords1(recordindex1)} 
                               
                                </tr>
                                )}
                            </tbody>
                        </table>
                       
                          
                    </div>
                </div>
            </div>
            </>
        )
    }
}
const mapStateToProps = (state :any) =>{

    return {
      username : state.user.username,
    }
  
  }

export default connect(mapStateToProps)(Markdetail);




