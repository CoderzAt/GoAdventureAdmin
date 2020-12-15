import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { Link} from "react-router-dom";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import {postData,statepostapi,loadData,getcounties,getstates,getstatebyid,stateupdateapi,getallstatebycountry} from '../Shared/Services'
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
import TableWithSelection from '../Components/TablewithdataSelection'



class State extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           countrynames:[],
           statename:null,
           statedescription:null,
           statecode:null,
           countryid:1,
           states:[],
           editData:[],
           countryname:null
       }
    }
   async componentWillMount()
    {
      debugger
      let data=await loadData(getcounties);
       this.setState({countrynames:data})

       

      
      if(this.props.match.params.sid != undefined)
      {
        
     let valuefromurl=parseInt(this.props.match.params.sid);
 this.state.countrynames.map((obj, i) => {
        if (obj.countryId == valuefromurl) 
        {
          this.setState({
            countryname:obj.countryName
          })
        }
      })
    }


    
    }

    async componentDidMount()
    {
    
      var url

      if(this.props.match.params.sid != undefined)
      {
     let valuefromurl=parseInt(this.props.match.params.sid);
     url=getallstatebycountry+valuefromurl;
      }
      else
      {
        url=getstates
      }

      //let url=getstatebyid+valuefromurl;
      
       let data=await loadData(getcounties);
       this.setState({countrynames:data})
       let statedata=await loadData(url)
       this.setState({
         states:statedata
       })

    }

    statenamenameOperation(event)
    {
      this.setState({
            statename:event.target.value
        })
    }
    statedescriptionOperation(event)
    {
   this.setState({
            statedescription:event.target.value
        })

    }
    statecodeOpearation(event)
    {
  this.setState({
            statecode:event.target.value
        })
    }
    countryIdOperation(event)
    {
        
        this.setState({
            countryid:event.target.value
        })
    }
  async  statebycountryoperation(event)
    {
//alert(event.target.value)
      let url=getallstatebycountry+(event.target.value);
      let state=await loadData(url)
      this.setState({
          states:state
      })

    }
    async editReacord(id)
    {
        
        let url=getstatebyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

        this.setState({
          statename:editdata.stateName,
           statedescription:editdata.stateDesc,
           statecode:editdata.stateCode
          
         })
    }

    async postEditedData()
    {
        debugger
      
        const obj={
          stateId:this.state.editData.stateId,
          stateName:this.state.statename,
          stateCode:this.state.statecode,
          stateDesc:this.state.statedescription,
          countryId:parseInt(this.state.countryid)
          }
        let editurl=stateupdateapi+this.state.editData.stateId;
        let editeddata=await postData(obj,editurl,'Put')
        alert(editeddata)
        window.location.reload();//page refresh
    }

   async postDatatoApi()
    {
      const obj={
        stateId: 0,
        stateName:this.state.statename,
        stateCode:this.state.statecode,
        stateDesc:this.state.statedescription,
        countryId:parseInt(this.state.countryid)
    }
             let message=await  postData(obj,statepostapi,'Post');
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
            if(this.state.editData.stateId == undefined)
            {
          this.postDatatoApi()
            }
            else{
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
                            </span> State
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    State
                                </li>
                            </ul>
                        </nav>
                    </div>
               <div class="row">
                   <div class="col-12 grid-margin stretch-card">
                       <div class="card">
                           <div class="card-body">
                               <h4 class="card-title">State</h4>
                               <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                               <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Country</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" onChange={(e)=>this.countryIdOperation(e)}>
                                                       {this.state.countrynames.map(obj=>
                                                      <option value={obj.countryId}>{obj.countryName}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input type="text"  defaultValue={this.state.editData.stateName}  class="form-control" onChange={(e)=>this.statenamenameOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                           <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Code</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" defaultValue={this.state.editData.stateCode} class="form-control" onChange={(e)=>this.statecodeOpearation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" defaultValue={this.state.editData.stateDesc} id="placeTypeDescription" rows="4" onChange={(e)=>this.statedescriptionOperation(e)}></textarea>
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
                   {/* <TableWithSelection 
                   selectTitle={"Country"}
                   selectdata={this.state.countrynames} 
                   selectValue={"countryId"} 
                   selectName={"countryName"}
                   selectonChange={(e)=>this.statebycountryoperation(e)}

                   header1={"StateId"}
                   accessor1={"stateId"}
                   header2={"StateName"}
                   accessor2={"stateName"}
                   actionId={"stateId"}
                   editonClick={(row)=>this.editReacord(row.value)}
                   deleteonClick={(row)=>this.deleteRecord(row.value)}
                   child={"city"}
                   tabledata={this.state.states}
                   
                   /> */}
                    <div class="row">
                   <div class="col-12 grid-margin stretch-card">
                       <div class="card">
                           <div class="card-body">
                               <h4 class="card-title">List</h4>
                               <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Country</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" defaultValue={this.state.countryname} onChange={(e)=>this.statebycountryoperation(e)}>
                                                       {this.state.countrynames.map(obj=>
                                                      <option value={obj.countryId}>{obj.countryName}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                               
                   <div className="table-responsive">
                     <TableWithSelection/>
        <ReactTable columns={[
                                    {
                                        Header: "StateId",
                                        accessor: "stateId"
                                        
                                    },
                                  {
                                    Header: "StateName",
                                    accessor: "stateName"
                                    
                                  },
                                  {
                                    Header: "StateCode",
                                    accessor: "stateCode"
                                    
                                  },
                                  {
                                    Header: "CountryDescription",
                                    accessor: "stateDesc"
                                    
                                  },
                                  {
                                      id:'id', // Required because our accessor is not a string
                                      Header: 'Actions',
                                      accessor: d => d.stateId,
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
                                          <Link style={{ color:'#A9A9A9'}}  to={`/admin/city/${row.value}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                          </button>
                                        </div>)
  
                                    }
                                  
                                ]}
                                data={this.state.states}
                                showPagination={true}
                                defaultPageSize={5}
                                
                         />
                         </div>
        </div>
        </div>
        </div>
        </div> 
        </div>
        

            {/* <div>
		<div style={{paddingLeft:400,paddingTop:110,backgroundColor:"black"}} >
            <div class="card" style={{width:600 }}>
  <div class="card-body">
    <h3 class="card-title">Add New State</h3>
    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)}>
                  <Form.Group >
                    <label htmlFor="statecountryname">StateName</label>
                    <Form.Control   type="text" id="countryname"  onChange={(e)=>this.statenamenameOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="statedescription">StateDescription</label>
                    <textarea required class="form-control" id="countrydescription" rows="3" onChange={(e)=>this.statedescriptionOperation(e)}></textarea>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="statecode">StateCode</label>
                    <Form.Control required type="text" id="countrycode" onChange={(e)=>this.statecodeOpearation(e)}  />
                  </Form.Group>
                  <Form.Group>
                  <label for="travellerMode">Country</label>
                  <select class="form-control travellerMode" onChange={(e)=>this.countryIdOperation(e)}>
                  {this.state.countrynames.map(obj=>
                  <option value={obj.countryId}>{obj.countryName}</option>
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
                                        Header: "StateId",
                                        accessor: "stateId"
                                        
                                    },
                                  {
                                    Header: "StateName",
                                    accessor: "stateName"
                                    
                                  },
                                  {
                                    Header: "StateCode",
                                    accessor: "stateCode"
                                    
                                  },
                                  {
                                    Header: "CountryDescription",
                                    accessor: "stateDesc"
                                    
                                  }
                                ]}
                                data={this.state.states}
                                showPagination={true}
                                defaultPageSize={10}
                                
                         />
                         </div>
        </div> */}
        </div>
        </div>
        </div>
        
     )
        }
    }
    export default State

