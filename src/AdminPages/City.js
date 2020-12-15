import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import {postData,citypostapi,loadData,getstates,getcities,getcitybyid, cityupdateapi,getcitybystate, getstatebyid} from '../Shared/Services'
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
import { connect } from 'react-redux';
import {getCities,getStates,getCitybyid,getCitybystate} from '../Adminstore/actions/goAdvActions';

 var valuefromurl
class City extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           //statenames:[],
           cityname:null,
           citydescription:null,
           citycode:null,
           stateid:1,
           cities:[],
           editData:[]
       }
    }
    

   async componentDidMount()
    {

      
      if(this.props.match.params.cid != undefined)
      {
        debugger
        valuefromurl=parseInt(this.props.match.params.cid);
     this.props.getCitybystate(valuefromurl)
     //this.setState({cities:await loadData(getcitybystate+valuefromurl)})
     //url=getcitybystate+valuefromurl;
      }
      else
      {
        debugger
        this.props.getCities()
        
        //url=getcities
      }
        
         /* let citiesdata=await loadData(url)
        this.setState({cities:citiesdata}) */
       /*  let data=await loadData(getstates)
        this.setState({statenames:data})
 */
this.props.getStates()
    }

    citynamenameOperation(event)
    {
      this.setState({
            cityname:event.target.value
        })
    }
    citydescriptionOperation(event)
    {
   this.setState({
            citydescription:event.target.value
        })

    }
    citycodeOpearation(event)
    {
  this.setState({
            citycode:event.target.value
        })
    }
    stateidOperation(event)
    {
      
        this.setState({
            stateid:event.target.value
        })

    }
    deleteRecord(id)
    {
      alert("in delete"+id)
    }
    async editReacord(id)
    {
      debugger
      
        let url=getcitybyid+id;
       await this.props.getCitybyid(id)

      let editdata=  this.props.citybyid;


       this.setState({
            editData:this.props.citybyid
        })

        this.setState({
           cityname:editdata.cityName,
           citycode:editdata.cityCode,
           citydescription:editdata.cityDesc,

        })
    }
    
    async postEditedData()
    {
        debugger
        
        const obj={
         cityId:this.state.editData.cityId,
          cityName:this.state.cityname,
          cityCode:this.state.citycode,
          cityDesc:this.state.citydescription,
          stateId:2
            }

        let editurl=cityupdateapi+this.state.editData.cityId;
        let editeddata=await postData(obj,editurl,'Put')

        alert(editeddata)
        window.location.reload();//page refresh
    }


   async postDatatoApi()
    {
      const obj={
        cityId: 0,
        cityName:this.state.cityname,
        cityCode:this.state.citycode,
        cityDesc:this.state.citydescription,
        stateId:parseInt(this.state.stateid)
           }
             let message=await  postData(obj,citypostapi,'Post');
             alert (message);
             window.location.reload();//page refresh
    }

    async handleSubmit(event)
    {
        debugger
        const form = event.currentTarget;
        console.log("checkform",form.checkValidity())
        if(form.checkValidity() === false)
        {
          event.preventDefault();
          event.stopPropagation();
        }
        else
        {
            event.preventDefault();
            if(this.state.editData.cityId == undefined)
            {
          this.postDatatoApi()
            }
            else
            {
              this.postEditedData()
            }
        }
      this.setState({
            validated:true
        })

    }
    handleReset()
    {
      this.setState({
        editData:[]
      })
    }
    
    async citybystateOperation(event)
    {
      this.props.getCitybystate(event.target.value)
     /*  //alert(event.target.value)
      let url=getcitybystate+(event.target.value);
      let city=await loadData(url)
      this.setState({
          cities:city
      }) */

    }
    render() {
	    return (

        <div>
        <div class="container-scroller">
   </div>
  <AdminHeader/>
   <div class="container-fluid page-body-wrapper" style={{paddingTop:80}}>
       <Sidebar/>
       
       <div class="main-panel">
           <div class="content-wrapper">
           <div class="page-header">
                        <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                <i class="mdi mdi-home-map-marker"></i>
                            </span> City
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    City
                                </li>
                            </ul>
                        </nav>
                    </div>
               <div class="row">
                   <div class="col-12 grid-margin stretch-card">
                       <div class="card">
                           <div class="card-body">
                               <h4 class="card-title">City</h4>
                               <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                               <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">State</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.stateidOperation(e)}>
                                                        {this.props.states.map(obj=>
                                                         <option value={obj.stateId}>{obj.stateName}</option>
                                                          )}
                                                   </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" defaultValue={this.state.editData.cityName} class="form-control" onChange={(e)=>this.citynamenameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                       
                                        
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Code</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" defaultValue={this.state.editData.cityCode} class="form-control" onChange={(e)=>this.citycodeOpearation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" defaultValue={this.state.editData.cityDesc} id="placeTypeDescription" rows="4" onChange={(e)=>this.citydescriptionOperation(e)}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>
           
                                        <div class="row" style={{margin:"auto",textAlign:"center"/* marg:auto;text-align: center} */}}>
                                            <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                                            <button type="reset" class="btn btn-light">Cancel</button>
                                        </div>
</Form>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="row">
                   <div class="col-12 grid-margin stretch-card">
                       <div class="card">
                           <div class="card-body">
                               <h4 class="card-title">Cities</h4>
                               <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">State</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.props.getCitybystate(e.target.value)}>
                                                        {this.props.states.map(obj=>
                                                         <option value={obj.stateId}>{obj.stateName}</option>
                                                          )}
                                                   </select>
                                                    </div>
                                                </div>
                                            </div>
                               <div class="table-responsive"></div>
                               <ReactTable columns={[
                                    {
                                        Header: "Cityd",
                                        accessor: "cityId"
                                        
                                    },
                                  {
                                    Header: "CityName",
                                    accessor: "cityName"
                                    
                                  },
                                  {
                                    Header: "CityCode",
                                    accessor: "cityCode"
                                    
                                  },
                                  {
                                    Header: "CityDescription",
                                    accessor: "cityDesc"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.cityId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => {  this.deleteRecord(row.value)}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" value={row.value} >
                                          <Link style={{ color:'#A9A9A9'}}  to={`/admin/placetovisit/${row.value}/${"city"}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                          </button>
                                     </div>)
                                 }
                                ]}
                                data={this.props.cities}
                                showPagination={true}
                                defaultPageSize={5}
                                
                         />
                         </div>
        </div>

                    </div>
                               </div>
                               </div>
                               </div>
                               </div>
               </div>
           




           /*  <div>
		<div style={{paddingLeft:400,paddingTop:110,backgroundColor:"black"}} >
            <div class="card" style={{width:600 }}>
  <div class="card-body">
    <h3 class="card-title">Add New City</h3>
    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)}>
                  <Form.Group >
                    <label htmlFor="cityname">City Name</label>
                    <Form.Control   type="text" id="cityname"  onChange={(e)=>this.citynamenameOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="cityscription">City Description</label>
                    <textarea required class="form-control" id="citydescription" rows="3" onChange={(e)=>this.citydescriptionOperation(e)}></textarea>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="statecode">CityCode</label>
                    <Form.Control required type="text" id="citycode" onChange={(e)=>this.citycodeOpearation(e)}  />
                  </Form.Group>
                  <Form.Group>
                  <label for="travellerMode">State</label>
                  <select class="form-control travellerMode" onChange={(e)=>this.stateidOperation(e)}>
                  {this.state.statenames.map(obj=>
                  <option value={obj.cityId}>{obj.stateName}</option>
                    )}
                    </select>
                  </Form.Group>
                 
                  <button type="submit" class="btn btn-primary" >submit</button>
    </Form>
  </div>
  
</div>
        </div>
        <h2>States Table</h2>
        <div className="table-responsive" style={{ paddingTop: '20px' }}>
        <ReactTable columns={[
                                    {
                                        Header: "Cityd",
                                        accessor: "cityId"
                                        
                                    },
                                  {
                                    Header: "CityName",
                                    accessor: "cityName"
                                    
                                  },
                                  {
                                    Header: "CityCode",
                                    accessor: "cityCode"
                                    
                                  },
                                  {
                                    Header: "CityDescription",
                                    accessor: "cityDesc"
                                    
                                  }
                                ]}
                                data={this.state.cities}
                                showPagination={true}
                                defaultPageSize={10}
                                
                         />
                         </div>
        </div>
 */     )
        }
    }
    const mapStateToProps = (state) => {
      return {
          states: state.goAdvStore.states,
          cities:state.goAdvStore.cities,
          citybyid:state.goAdvStore.citybyid
          
          
          
          //cities:state.goAdvStore.citybyid
          //cities:state.goAdvStore.citybyid
      }
  }
  export default connect(mapStateToProps, {getStates,getCities,getCitybystate,getCitybyid })(City);
  

    //export default City

