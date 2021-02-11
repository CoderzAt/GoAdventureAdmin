import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {  POST_CITY, GET_COUNTRIES,GET_STATE_BYCOUNTRYID,PUT_CITY,DELETE_CITY, GET_CITY_STATEID,GET_PICKUPANDDROP, PUT_PICKUPANDDROP, POST_PICKUPANDDROP, GET_PICKUPANDDROPBYID, DELETE_PICKUPANDDROP} from "../Shared/Services";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { getCities,  getStates,  getCitybyid,  getCitybystate,
  postData1,  putData1, updatePropData, resetData,removeErrormsg,deleteRecord,getData} from "../Adminstore/actions/goAdvActions";
import * as action from "../Adminstore/actions/actionTypes";
import "./admin.scss";
import * as validation from "../Shared/Validations";
import Displayerrormsg from '../Shared/DisplayErrorMsg';
var valuefromurl;
class Pickupanddrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      refreshflag: false,
      // cities:[],
      errors: {
        selectstate: "",
      }
    };
  }

  /* componentWillMount()
  {
    this.props.removeErrormsg()

  } */
  componentDidMount() {
  
      this.props.getCities();
      this.props.getData(action.GET_PICKUPANDDROP,GET_PICKUPANDDROP)
     }
  getCitybystate(e)
  {
    valuefromurl=e.target.value;
    this.props.getData(action.GET_CITY_STATEID,GET_CITY_STATEID+e.target.value)
  }
  refresh(e)
  {
      e.preventDefault();
    
      this.props.getData(action.GET_PICKUPANDDROP,GET_PICKUPANDDROP);
  }
  deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_PICKUPANDDROP,DELETE_PICKUPANDDROP+id)
    }
  editRecord(id) {
    this.props.getData(action.GET_PICKUPANDDROPBYID,GET_PICKUPANDDROPBYID+id);
    this.setState({ validated: false });
  }
  

  postPadData() {
    debugger
    const obj = {
        pdlid:this.props.padbyid.pdlid?this.props.padbyid.pdlid:0,
        name:this.props.padbyid.name,
        address:this.props.padbyid.address,
        landMark:this.props.padbyid.landMark,
        isDeleted: true,
        cityId:this.props.padbyid.cityId*1
      
    };
    let url = PUT_PICKUPANDDROP + this.props.padbyid.pdlid;
    if(this.props.padbyid.pdlid) {
      this.props.putData1(action.PUT_PICKUPANDDROP, url, obj);
    } else {
      this.props.postData1(action.POST_PICKUPANDDROP, POST_PICKUPANDDROP, obj);
    }
    this.setState({ validated: false });
    
  }

  validateForm(errors) {
    debugger
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }
  handlevalidations() {
    let stateid = this.props.cityData.stateId?this.props.cityData.stateId:"0";
    let errMsg = validation.selectvalidation(stateid);
    this.setState(prevState=>({
        errors: {
            ...prevState.errors,
            selectstate: errMsg
        }
    }))
  }
  handleSubmit(event) {
    debugger
    event.preventDefault();
    this.handlevalidations();
    const form = event.currentTarget;
    console.log("checkform", form.checkValidity());
    this.setState({ validated: true });
    
    if (form.checkValidity() === false/*  || this.validateForm(this.state.errors) === false */) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      this.postPadData();
     
    }
    //this.setState({ validated:true});
    
  }
  handleReset() {
    this.props.resetData(action.RESET_DATA,"padbyid");
    this.setState({ validated: false });
  }

  
  updatePad = (e, paramName) => {
    debugger
   
    this.props.updatePropData(paramName, e.target.value,"padbyid");
    this.setState({refreshflag: !this.state.refreshflag});
  }
  render() {
    
    return (
      <div>
        <div className="container-fluid page-body-wrapper"style={{ paddingTop: 80 }}>
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="page-header">
                <h3 className="page-title">
                  <span className="page-title-icon bg-gradient-primary text-white mr-2">
                    <i className="mdi mdi-home-map-marker"></i>
                  </span>{" "}
                  PickupandDropLocation
                </h3>
               
                <nav aria-label="breadcrumb">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="mdi mdi-home"></i> index
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">PickupandDropLocation</li>
                  </ul>
                </nav>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">PickupandDropLocation</h4>
                      <Form className="forms-sample" noValidate validated={this.state.validated}
                        onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                        <div className="row">
                          <div class="col-md-6">
                            <div class="form-group row">
                              <label class="col-sm-3 col-form-label">City</label>
                              <div class="col-sm-9">
                                <select class="form-control travellerMode" value={this.props.padbyid.cityId?this.props.padbyid.cityId:"0"}
                                  onChange={(e) => this.updatePad(e, "cityId")}>
                                  <option value={0}>Select</option>
                                  {this.props.cities.map(obj =>
                                    <option value={obj.cityId}>{obj.cityName}</option>
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                         
                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Name</label>
                              <div className="col-sm-9">
                                <input type="text" required value={this.props.padbyid.name? this.props.padbyid.name : ""}
                                  className="form-control" onChange={(e) => this.updatePad(e, "name")} />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Address</label>
                              <div className="col-sm-9">
                                <input type="text" value={this.props.padbyid.address?this.props.padbyid.address:""}
                                  className="form-control" onChange={(e) => this.updatePad(e, "address")} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group row">
                              <label for="placeTypeDescription" className="col-sm-3 col-form-label">LandMark</label>
                              <div className="col-sm-9">
                                <input className="form-control" value={this.props.padbyid.landMark?this.props.padbyid.landMark:""} id="placeTypeDescription"
                                  rows="4" onChange={(e) => this.updatePad(e, "landMark")}/>
                              </div>
                            </div>
                          </div>
                          
                        </div>

                        <div className="row" style={{margin: "auto",textAlign:"center",}}>
                          <button type="submit" className="btn btn-gradient-primary mr-2">Submit</button>
                          <button type="reset" className="btn btn-light">Cancel</button>
                        </div>
                        <br/>
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">PickupanddropLocations<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                     
                      <div className="table-responsive"></div>
                      <ReactTable
                        columns={[
                          /*{
                            Header: "Cityd",
                            accessor: "cityId",
                          },*/
                          {
                            Header: "Name",
                            accessor: "name",
                            headerStyle:{
                                textAlign:'left',
                                fontWeight: 'bold'
                            }
                          },
                          {
                            Header: "Adress",
                            accessor: "address",
                            headerStyle:{
                                textAlign:'left',
                                fontWeight: 'bold'
                            }
                          },
                          {
                            Header: "LandMark",
                            accessor: "landMark",
                            headerStyle:{
                                textAlign:'left',
                                fontWeight: 'bold'
                            }
                          },
                          {
                            id: "id", // Required because our accessor is not a string
                            Header: "",
                            accessor: (d) => d.pdlid,
                            maxWidth: 300,
                            Cell: (row) => (
                              <div className="template-demo">
                                <button type="button" className="btn btn-gradient-primary btn-rounded btn-icon"
                                  onClick={(e) => {
                                    this.editRecord(row.value);
                                  }}>
                                  <i className="mdi mdi-pencil-outline"></i>
                                </button>
                                <button type="button" className="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}}  value={row.value} >
                                  <i className="mdi mdi-delete-outline"></i>
                                </button>
                                {/*<button type="button" className="btn btn-gradient-primary btn-rounded btn-icon" value={row.value}
                                >
                                  <Link
                                    style={{ color: "#A9A9A9" }}
                                    to={`/admin/placetovisit/${
                                      row.value
                                    }/${"city"}`}
                                  >
                                    {" "}
                                    <i className="mdi mdi-eye-outline"></i>
                                  </Link>
                                  </button>*/}
                              </div>
                            ),
                          },
                        ]}
                        data={this.props.getPickupanddrop}
                        showPagination={true}
                        defaultPageSize={25}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.goAdvStore);
  return {
    states: state.goAdvStore.states,
    countries:state.goAdvStore.countries,
    cities: state.goAdvStore.cities,
    citybyid: state.goAdvStore.citybyid,
    postcity: state.goAdvStore.postcity,
    cityData: state.goAdvStore.cityData,
    message: state.goAdvStore.message,
    messageData: state.goAdvStore.messageData,
    padbyid:state.goAdvStore.padbyid,
    getPickupanddrop:state.goAdvStore.getPickupanddrop
  };
};
export default connect(mapStateToProps, {
  getStates,
  getCities,
  getCitybystate,
  getCitybyid,
  postData1,
  putData1,
  updatePropData,
  resetData,
  removeErrormsg,
  deleteRecord,
  getData
})(Pickupanddrop);

//export default City
