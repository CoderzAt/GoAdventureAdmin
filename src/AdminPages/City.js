import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {  POST_CITY,  PUT_CITY,DELETE_CITY} from "../Shared/Services";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { getCities,  getStates,  getCitybyid,  getCitybystate,
  postData1,  putData1, updatePropData, resetData,removeErrormsg,deleteRecord} from "../Adminstore/actions/goAdvActions";
import * as action from "../Adminstore/actions/actionTypes";
import "./admin.scss";
import * as validation from "../Shared/Validations";
var valuefromurl;
class City extends Component {
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

  componentWillMount()
  {
    this.props.removeErrormsg()

  }
  componentDidMount() {
    if (this.props.match.params.cid !== undefined) {
      valuefromurl = parseInt(this.props.match.params.cid);
      this.props.getCitybystate(valuefromurl);
    } else {
      this.props.getCities();
    }
    this.props.getStates();
  }
  refresh(e)
  {
      e.preventDefault();
      this.props.getCities();
  }
  deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_CITY,DELETE_CITY+id)
    }
  editRecord(id) {
    this.props.getCitybyid(id);
    this.setState({ validated: false });
  }

  postCityData() {
    debugger
    const obj = {
      cityId: this.props.cityData.cityId,
      cityName: this.props.cityData.cityName,
      cityCode: this.props.cityData.cityCode,
      cityDesc: this.props.cityData.cityDesc,
      stateId: this.props.cityData.stateId*1,
      isDeleted:this.props.cityData.cityId?false:true
      
    };
    let url = PUT_CITY + this.props.cityData.cityId;
    if(this.props.cityData.cityId) {
      this.props.putData1(action.PUT_CITY, url, obj);
    } else {
      this.props.postData1(action.POST_CITY, POST_CITY, obj);
    }
    this.setState({ validated: false });
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }
  handlevalidations() {
    let stateid = this.props.cityData.stateId?this.props.cityData.stateId:"0";
    let errMsg = validation.selectvalidation(stateid);
    this.setState(prevState => ({
        errors: {
            ...prevState.errors,
            selectstate: errMsg
        }
    }))
  }
  handleSubmit(event) {
    event.preventDefault();
    this.handlevalidations();
    const form = event.currentTarget;
    console.log("checkform", form.checkValidity());
    this.setState({ validated: true });
    if (form.checkValidity() === false || this.validateForm(this.state.errors) === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      this.postCityData();
     
    }
    //this.setState({ validated:true});
    
  }
  handleReset() {
    this.props.resetData(action.RESET_DATA,"cityData");
    this.setState({ validated: false });
  }

  
  updateCity = (e, paramName) => {
    debugger
    this.props.updatePropData(paramName, e.target.value, "cityData");
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
                  City
                </h3>
                {this.props.message?
                  <div className={`message-wrapper ${this.props.messageData.isSuccess? "success":"error"}`}>{this.props.messageData.message}</div> :
                  null
                }
                <nav aria-label="breadcrumb">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">
                        <i className="mdi mdi-home"></i> index
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">City</li>
                  </ul>
                </nav>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">City</h4>
                      <Form className="forms-sample" noValidate validated={this.state.validated}
                        onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">State</label>
                              <div className="col-sm-9">
                                <select className="form-control travellerMode"  value={this.props.cityData.stateId? this.props.cityData.stateId : "0"}
                                  onChange={(e) => this.updateCity(e, "stateId")}>
                                  <option value={0}>Select</option>
                                  {this.props.states.map((obj) => (
                                    <option value={obj.stateId}>
                                      {obj.stateName}
                                    </option>
                                  ))}
                                </select>
                                <div style={{ color: "red" }}>
                                  {this.state.errors.selectstate}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Name</label>
                              <div className="col-sm-9">
                                <input type="text" required value={this.props.cityData.cityName? this.props.cityData.cityName : ""}
                                  className="form-control" onChange={(e) => this.updateCity(e, "cityName")} />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group row">
                              <label className="col-sm-3 col-form-label">Code</label>
                              <div className="col-sm-9">
                                <input type="text" value={this.props.cityData.cityCode?this.props.cityData.cityCode:""}
                                  className="form-control" onChange={(e) => this.updateCity(e, "cityCode")} />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group row">
                              <label for="placeTypeDescription" className="col-sm-3 col-form-label">Description</label>
                              <div className="col-sm-9">
                                <textarea className="form-control" value={this.props.cityData.cityDesc?this.props.cityData.cityDesc:""} id="placeTypeDescription"
                                  rows="4" onChange={(e) => this.updateCity(e, "cityDesc")}></textarea>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row" style={{margin: "auto",textAlign:"center",}}>
                          <button type="submit" className="btn btn-gradient-primary mr-2">Submit</button>
                          <button type="reset" className="btn btn-light">Cancel</button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Cities<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-3 col-form-label">State</label>
                          <div className="col-sm-9">
                            <select className="form-control travellerMode" onChange={(e) => this.props.getCitybystate(e.target.value)}>
                              {this.props.states.map((obj) => (
                                <option value={obj.stateId}>
                                  {obj.stateName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="table-responsive"></div>
                      <ReactTable
                        columns={[
                          /*{
                            Header: "Cityd",
                            accessor: "cityId",
                          },*/
                          {
                            Header: "Name",
                            accessor: "cityName",
                            headerStyle:{
                                textAlign:'left',
                                fontWeight: 'bold'
                            }
                          },
                          {
                            Header: "Code",
                            accessor: "cityCode",
                            headerStyle:{
                                textAlign:'left',
                                fontWeight: 'bold'
                            }
                          },
                          {
                            Header: "Description",
                            accessor: "cityDesc",
                            headerStyle:{
                                textAlign:'left',
                                fontWeight: 'bold'
                            }
                          },
                          {
                            id: "id", // Required because our accessor is not a string
                            Header: "",
                            accessor: (d) => d.cityId,
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
                                <button type="button" className="btn btn-gradient-primary btn-rounded btn-icon" value={row.value}
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
                                </button>
                              </div>
                            ),
                          },
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
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.goAdvStore);
  return {
    states: state.goAdvStore.states,
    cities: state.goAdvStore.cities,
    citybyid: state.goAdvStore.citybyid,
    postcity: state.goAdvStore.postcity,
    cityData: state.goAdvStore.cityData,
    message: state.goAdvStore.message,
    messageData: state.goAdvStore.messageData
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
  deleteRecord
})(City);

//export default City
