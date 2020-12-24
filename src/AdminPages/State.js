import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { postData, statepostapi, loadData, getcounties, getstates, getstatebyid, stateupdateapi, getallstatebycountry, POST_STATE, GET_STATE_BYID, GET_STATES, PUT_STATE, GET_STATE_BYCOUNTRYID,GET_COUNTRIES } from '../Shared/Services'
import Sidebar from './Sidebar'

import TableWithSelection from '../Components/TablewithdataSelection'
import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'




class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      countrynames: [],
      statename: null,
      statedescription: null,
      statecode: null,
      countryid: 1,
      states: [],
      editData: [],
      countryname: null
    }
  }
  componentWillMount()
    {
      this.props.removeErrormsg()
  
    }
    componentDidMount() 
    {
    var url
   if (this.props.match.params.sid != undefined) {
      let valuefromurl = parseInt(this.props.match.params.sid);
      url = GET_STATE_BYCOUNTRYID + valuefromurl;
      this.props.getData(action.GET_STATE_BYCOUNTRYID, url)
    }
    else 
    {
      this.props.getData(action.GET_STATES, GET_STATES)
      //url=getstates
    }
    this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)
     }
    statebycountryoperation(event) {
    let url = GET_STATE_BYCOUNTRYID + (event.target.value);
    this.props.getData(action.GET_STATE_BYCOUNTRYID, url)
    }
  postStateData()
  {
    debugger
    const obj = {
      stateId:this.props.getstatebyid.stateId?this.props.getstatebyid.stateId:0,
      stateName: this.props.getstatebyid.stateName,
      stateCode: this.props.getstatebyid.stateCode,
      stateDesc: this.props.getstatebyid.stateDesc,
      countryId: this.props.getstatebyid.countryId*1,
      isDeleted: this.props.getstatebyid.stateId?false:true
      };
    let url = PUT_STATE+ this.props.getstatebyid.stateId;
    if (this.props.getstatebyid.stateId) {
        this.props.putData1(action.PUT_STATE,url,obj);
    }
    else {
        this.props.postData1(action.POST_STATE,POST_STATE,obj);
    }
    this.setState({ validated: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    //this.handlevalidations();
    const form = event.currentTarget;
    console.log("checkform", form.checkValidity());
    this.setState({ validated: true });
    if (form.checkValidity() === false /* || this.validateForm(this.state.errors) === false */) {
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        event.preventDefault();
        this.postStateData();
    }   
}
  handleReset() {
    this.props.resetData(action.RESET_DATA,"getstatebyid");
        this.setState({ validated: false });
  }
  editReacord(id) {
    this.props.getData(action.GET_STATE_BYID, GET_STATE_BYID+id)
}
  updateState = (e, paramName) => {
    this.props.updatePropAccData(paramName,e.target.value,"getstatebyid");
    this.setState({ refreshflag: !this.state.refreshflag });
}
  render() {
    return (
      <div>
        {/* <AdminHeader/> */}
        <div class="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
          <Sidebar />

          <div class="main-panel">
            <div class="content-wrapper">
              <div class="page-header">
                <h3 class="page-title">
                  <span class="page-title-icon bg-gradient-primary text-white mr-2">
                    <i class="mdi mdi-home-map-marker"></i>
                  </span> State
                        </h3>
                        {this.props.message ?
                                    <div className={`message-wrapper ${this.props.messageData.isSuccess ? "success" : "error"}`}>{this.props.messageData.message}</div> :
                                    null
                        }
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
                      <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-3 col-form-label">Country</label>
                              <div class="col-sm-9">
                                <select class="form-control travellerMode" value={this.props.getstatebyid.countryId?this.props.getstatebyid.countryId:"0"} 
                                onChange={(e) => this.updateState(e,"countryId")}>
                                  <option value={0}>Select</option>
                                  {this.props.countries.map(obj =>
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
                                <input type="text" value={this.props.getstatebyid.stateName?this.props.getstatebyid.stateName:""} 
                                class="form-control" onChange={(e) => this.updateState(e,"stateName")} />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-3 col-form-label">Code</label>
                              <div class="col-sm-9">
                                <input type="text" value={this.props.getstatebyid.stateCode?this.props.getstatebyid.stateCode:""} 
                                class="form-control" onChange={(e) => this.updateState(e,"stateCode")} />
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                              <div class="col-sm-9">
                                <textarea class="form-control" value={this.props.getstatebyid.stateDesc?this.props.getstatebyid.stateDesc:""} id="placeTypeDescription" 
                                rows="4" onChange={(e) => this.updateState(e,"stateDesc")}></textarea>
                              </div>
                            </div>
                          </div>

                        </div>
                        <div class="row" style={{ margin: "auto", textAlign: "center"/* marg:auto;text-align: center} */ }}>
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
                            <select class="form-control travellerMode"  onChange={(e) => this.statebycountryoperation(e)}>
                              <option value={0}>Select</option>
                              {this.props.countries.map(obj =>
                                <option value={obj.countryId}>{obj.countryName}</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="table-responsive">
                        <TableWithSelection />
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
                            id: 'id', // Required because our accessor is not a string
                            Header: 'Actions',
                            accessor: d => d.stateId,
                            maxWidth: 300,
                            Cell: row => (
                              <div className="template-demo">
                                <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                  <i class="mdi mdi-pencil-outline"></i>
                                </button>
                                <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => { this.deleteRecord(row.value) }} value={row.value} >
                                  <i class="mdi mdi-delete-outline"></i>
                                </button>
                                <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" value={row.value} >
                                  <Link style={{ color: '#A9A9A9' }} to={`/admin/city/${row.value}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                </button>
                              </div>)

                          }

                        ]}
                          data={this.props.states}
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
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    states: state.goAdvStore.states,
    countries:state.goAdvStore.countries,
    getstatebyid:state.goAdvStore.getstatebyid,
    message: state.goAdvStore.message,
    messageData: state.goAdvStore.messageData
    
  }
}
export default connect(mapStateToProps, { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg})(State);
   // export default State

