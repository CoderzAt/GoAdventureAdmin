import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { GET_COUNTRIES,GET_STATES,loadData,getplacetovisit, getplacetovisitbyid, placetovisitupdateapi, getplacetovisitbycity, getplacetovisitbydestination, GET_CITIES, GET_PLACETYPE, POST_PLACETOVISIT, GET_PLACETOVISIT_BYID, GET_DESTINATION, PUT_PLACETOVISIT, DELETE_PLACETOVISIT, GET_PLACETOVISIT } from '../Shared/Services'
import Sidebar from './Sidebar'

import { connect } from 'react-redux';
import { getDestination, getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg, deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
var valuefromurl
class PlacestoVisit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            //citynames:[],
            destinationnames: [],
            // placetypes: [],
            placename: null,
            placegenre: null,
            placedescription: null,
            price: null,
            destinationId: 1,
            placeTypeId: 1,
            cityId: 1,
            placetovisitTable: [],
            editData: [],
            hidecity: "",
            hidedestination: "",
            stateId:"0",
            countryId:"0",
            selectstateerror:"",
            selectcountryerror:""
        }
    }
    componentWillMount() {
        this.props.removeErrormsg()

    }
    async componentDidMount() {
        debugger

        var url
        if (this.props.match.params.parent == "city") {
            if (this.props.match.params.pid != undefined) {
                valuefromurl = parseInt(this.props.match.params.pid);
                url = getplacetovisitbycity + valuefromurl;
            }
            this.setState({
                hidecity: "",
                hidedestination: "true"
            })
        }
        else if (this.props.match.params.parent == "destination") {
            if (this.props.match.params.pid != undefined) {
                valuefromurl = parseInt(this.props.match.params.pid);
                url = getplacetovisitbydestination + valuefromurl;
            }

            this.setState({
                hidecity: "true",
                hidedestination: ""
            })

        }
        else {
            url = getplacetovisit
            this.setState({
                hidecity: "true",
                hidedestination: "true"
            })
        }

        let palcetovisitdata = await loadData(url)
        this.setState({
            placetovisitTable: palcetovisitdata
        })



        this.props.getData(action.GET_CITIES, GET_CITIES)
        this.props.getData(action.GET_DESTINATION, GET_DESTINATION);
        this.props.getData(action.GET_PLACETYPE, GET_PLACETYPE)
        this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)
        this.props.getData(action.GET_STATES,GET_STATES)

    }


    postPlacetovisitData() {
        debugger
        const obj = {
            placeId: this.props.getplacetovisitbyid.placeId ? this.props.getplacetovisitbyid.placeId : 0,
            placeName: this.props.getplacetovisitbyid.placeName,
            placeGenre: this.props.getplacetovisitbyid.placeGenre,
            destinationId: parseInt(this.props.getplacetovisitbyid.destinationId),
            description: this.props.getplacetovisitbyid.description,
            placeTypeId: parseInt(this.props.getplacetovisitbyid.placeTypeId),
            cityId: parseInt(this.props.getplacetovisitbyid.cityId),
            isDeleted: this.props.getplacetovisitbyid.placeId ? false : true
        };
        let url = PUT_PLACETOVISIT + this.props.getplacetovisitbyid.placeId;
        if (this.props.getplacetovisitbyid.placeId) {
            this.props.putData1(action.PUT_PLACETOVISIT, url, obj);
        }
        else {
            this.props.postData1(action.POST_PLACETOVISIT, POST_PLACETOVISIT, obj);
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
            this.postPlacetovisitData();
        }
    }

    handleReset() {
        this.props.resetData(action.RESET_DATA, "getplacetovisitbyid");
        this.setState({ validated: false });
    }
    async refresh(e) {
        debugger
        e.preventDefault()
        valuefromurl = "0"
        let palcetovisitdata = await loadData(getplacetovisit)
        this.setState({
            placetovisitTable: palcetovisitdata
        })
        
    }
    editReacord(id) {
        this.props.getData(action.GET_PLACETOVISIT_BYID, GET_PLACETOVISIT_BYID + id)
    }
    getstates()
    {
        

    }
    getcities()
    {

    }

    updatePlacetovisit = (e, paramName) => {
        this.props.updatePropAccData(paramName, e.target.value, "getplacetovisitbyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    async placetovisitbycityOperation(e) {
        valuefromurl = e.target.value
        let palcetovisitdata = await loadData(getplacetovisitbycity + e.target.value)
        this.setState({
            placetovisitTable: palcetovisitdata
        })
    }
    async placetovisitbydestinationOperation(e) {
        valuefromurl = e.target.value
        let palcetovisitdata = await loadData(getplacetovisitbydestination + e.target.value)
        this.setState({
            placetovisitTable: palcetovisitdata
        })
    }
    deleteRecord(id) {
        debugger
        this.props.deleteRecord(action.DELETE_PLACETOVISIT, DELETE_PLACETOVISIT + id)
    }
    render() {
        return (

            <div>

                <div class="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
                    <Sidebar />

                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">
                                    <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                        <i class="mdi mdi-home-map-marker"></i>
                                    </span>Place To Visit
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
                                            Place To Visit
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Place To Visit</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeName"
                                                                class="col-sm-3 col-form-label">Name</label>
                                                            <div class="col-sm-9">
                                                                <input type="text" value={this.props.getplacetovisitbyid.placeName ? this.props.getplacetovisitbyid.placeName : ""} class="form-control" id="placeTypeName"
                                                                    onChange={(e) => this.updatePlacetovisit(e, "placeName")} placeholder="Name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="genre" class="col-sm-3 col-form-label">Genre</label>
                                                            <div class="col-sm-9">
                                                                <input type="text" value={this.props.getplacetovisitbyid.placeGenre ? this.props.getplacetovisitbyid.placeGenre : ""} class="form-control" id="genre"
                                                                    onChange={(e) => this.updatePlacetovisit(e, "placeGenre")} placeholder="Genre" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Destination</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.getplacetovisitbyid.destinationId ? this.props.getplacetovisitbyid.destinationId : "0"}
                                                                    onChange={(e) => this.updatePlacetovisit(e, "destinationId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.getdestination.map(obj =>
                                                                        <option value={obj.destinationId}>{obj.destinationName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Place Type</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.getplacetovisitbyid.placeTypeId ? this.props.getplacetovisitbyid.placeTypeId : "0"}
                                                                    onChange={(e) => this.updatePlacetovisit(e, "placeTypeId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.placetype.map(obj =>
                                                                        <option value={obj.placeTypeId}>{obj.placeTypeName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Country</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.getplacetovisitbyid.cityId ? this.props.getplacetovisitbyid.cityId : "0"}
                                                                    onChange={(e) => this.getstates(e)}>
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
                                                            <label class="col-sm-3 col-form-label">State</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.getplacetovisitbyid.cityId ? this.props.getplacetovisitbyid.cityId : "0"}
                                                                    onChange={(e) => this.getcities(e)}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.states.map(obj =>
                                                                        <option value={obj.stateId}>{obj.stateName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                               
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">City</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.getplacetovisitbyid.cityId ? this.props.getplacetovisitbyid.cityId : "0"}
                                                                    onChange={(e) => this.updatePlacetovisit(e, "cityId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.cities.map(obj =>
                                                                        <option value={obj.cityId}>{obj.cityName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="Price" class="col-sm-3 col-form-label">Price</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" defaultValue={this.state.editData.price} class="form-control" id="genre"
                                                          onChange={(e)=>this.priceOperation(e)}  placeholder="Price"/>
                                                    </div>
                                                </div>
                                            </div> */}

                                                
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription"
                                                                class="col-sm-3 col-form-label">Description</label>
                                                            <div class="col-sm-9">
                                                                <textarea class="form-control" value={this.props.getplacetovisitbyid.description ? this.props.getplacetovisitbyid.description : ""} id="placeTypeDescription"
                                                                    onChange={(e) => this.updatePlacetovisit(e, "description")} rows="4"></textarea>
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
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">List<button onClick={(e) => this.refresh(e)} style={{ backgroundColor: "transparent", border: "none" }}><i class={"mdi mdi-refresh"}></i></button></h4>
                                            <div class="col-md-6" hidden={this.state.hidecity}>
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">City</label>
                                                    <div class="col-sm-9">
                                                        <select class="form-control travellerMode" value={valuefromurl ? valuefromurl : "0"} onChange={(e) => this.placetovisitbycityOperation(e)}>
                                                            <option value={0}>Select</option>
                                                            {this.props.cities.map(obj =>
                                                                <option value={obj.cityId}>{obj.cityName}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6" hidden={this.state.hidedestination}>
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Destination</label>
                                                    <div class="col-sm-9">
                                                        <select class="form-control travellerMode" value={valuefromurl ? valuefromurl : "0"} onChange={(e) => this.placetovisitbydestinationOperation(e)}>
                                                            <option value={0}>Select</option>
                                                            {this.props.getdestination.map(obj =>
                                                                <option value={obj.destinationId}>{obj.destinationName}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive">
                                                <ReactTable columns={[
                                                    /* {
                                                         Header: "PlaceId",
                                                         accessor: "placeId"
 
                                                     },*/
                                                    {
                                                        Header: "Name",
                                                        accessor: "placeName",
                                                        headerStyle: {
                                                            textAlign: 'left',
                                                            fontWeight: 'bold'
                                                        }

                                                    },
                                                    {
                                                        Header: "Genre",
                                                        accessor: "placeGenre",
                                                        headerStyle: {
                                                            textAlign: 'left',
                                                            fontWeight: 'bold'
                                                        }

                                                    },
                                                    {
                                                        Header: "Description",
                                                        accessor: "description",
                                                        headerStyle: {
                                                            textAlign: 'left',
                                                            fontWeight: 'bold'
                                                        }

                                                    },
                                                    {
                                                        id: 'id', // Required because our accessor is not a string
                                                        Header: '',
                                                        accessor: d => d.placeId,
                                                        maxWidth: 300,
                                                        Cell: row => (
                                                            <div className="template-demo">
                                                                <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                    <i class="mdi mdi-pencil-outline"></i>
                                                                </button>
                                                                <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => { if (window.confirm('Are you sure to delete this record?')) { this.deleteRecord(row.value) }; }} value={row.value} >
                                                                    <i class="mdi mdi-delete-outline"></i>
                                                                </button>
                                                            </div>)

                                                    }
                                                ]}
                                                    data={this.state.placetovisitTable}
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
        cities: state.goAdvStore.cities,
        countries:state.goAdvStore.countries,
        states:state.goAdvStore.states,
        placetype: state.goAdvStore.placetype,
        getdestination: state.goAdvStore.getdestination,
        getplcetovisit: state.goAdvStore.getplcetovisit,
        getplacetovisitbyid: state.goAdvStore.getplacetovisitbyid,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, getDestination, updatePropAccData, resetData, removeErrormsg, deleteRecord })(PlacestoVisit);
    //export default PlacestoVisit

