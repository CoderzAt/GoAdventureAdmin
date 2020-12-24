import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'

import { GET_PLACETYPE_BYID, GET_PLACETYPE, POST_PLACETYPE, PUT_PLACETYPE } from '../Shared/Services'
import { namevalidation } from '../Shared/Validations'
import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'


class PlaceType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            refreshflag: false,
            errors: {
                name: "",
                description: ""
            }
        }
    }
    componentWillMount() {
        this.props.removeErrormsg()
    }
    async componentDidMount() {
        this.props.getData(action.GET_PLACETYPE, GET_PLACETYPE);
    }

    validateForm(errors) {
        debugger
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    }
    handlevalidations() {
        debugger
        this.state.errors.name = namevalidation(this.state.placetypename)
    }
    postPlacetypeData() {
        debugger
        const obj = {
            placeTypeId: this.props.getplacetypebyid.placeTypeId ? this.props.getplacetypebyid.placeTypeId : 0,
            placeTypeName: this.props.getplacetypebyid.placeTypeName,
            placeTypeDescription: this.props.getplacetypebyid.placeTypeDescription,
            isDeleted: this.props.getplacetypebyid.placeTypeId ? false : true
        };
        let url = PUT_PLACETYPE + this.props.getplacetypebyid.placeTypeId;
        if (this.props.getplacetypebyid.placeTypeId) {
            this.props.putData1(action.PUT_PLACETYPE, url, obj);
        }
        else {
            this.props.postData1(action.POST_PLACETYPE, POST_PLACETYPE, obj);
        }
        this.setState({ validated: false });
    }

    async handleSubmit(event) {
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
            this.postPlacetypeData();
        }

    }
    handleReset() {
        this.props.resetData(action.RESET_DATA, "getplacetypebyid");
        this.setState({ validated: false });
    }
    editReacord(id) {
        this.props.getData(action.GET_PLACETYPE_BYID, GET_PLACETYPE_BYID + id)
    }
    updatePlacetype = (e, paramName) => {
        this.props.updatePropAccData(paramName, e.target.value, "getplacetypebyid");
        this.setState({ refreshflag: !this.state.refreshflag });
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
                                    </span>Place Type
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
                                            Place Type
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Place Type</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeName" class="col-sm-3 col-form-label">Name</label>
                                                            <div class="col-sm-9">
                                                                <input type="text" required value={this.props.getplacetypebyid.placeTypeName ? this.props.getplacetypebyid.placeTypeName : ""}
                                                                    class="form-control" id="placeTypeName" onChange={(e) => this.updatePlacetype(e, "placeTypeName")} placeholder="Name" />
                                                                <div style={{ color: "red" }}>{this.state.errors.name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Description</label>
                                                            <div class="col-sm-9">
                                                                <textarea class="form-control" required value={this.props.getplacetypebyid.placeTypeDescription ? this.props.getplacetypebyid.placeTypeDescription : ""} id="placeTypeDescription" rows="4"
                                                                    onChange={(e) => this.updatePlacetype(e, "placeTypeDescription")}></textarea>
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
                                            <h4 class="card-title">List</h4>
                                            <div className="table-responsive">
                                                <ReactTable columns={[
                                                    {
                                                        Header: "PlaceTypeId",
                                                        accessor: "placeTypeId"

                                                    },
                                                    {
                                                        Header: "PlaceTypeName",
                                                        accessor: "placeTypeName"

                                                    },
                                                    {
                                                        Header: "PlaceTypeDescription",
                                                        accessor: "placeTypeDescription"

                                                    },
                                                    {
                                                        id: 'id', // Required because our accessor is not a string
                                                        Header: 'Actions',
                                                        accessor: d => d.placeTypeId,
                                                        maxWidth: 300,
                                                        Cell: row => (
                                                            <div className="template-demo">
                                                                <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                    <i class="mdi mdi-pencil-outline"></i>
                                                                </button>
                                                                <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => { this.deleteRecord(row.value) }} value={row.value} >
                                                                    <i class="mdi mdi-delete-outline"></i>
                                                                </button>
                                                            </div>)

                                                    }
                                                ]}
                                                    data={this.props.placetype}
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
        placetype: state.goAdvStore.placetype,
        getplacetypebyid: state.goAdvStore.getplacetypebyid,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData

    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg })(PlaceType);
   // export default PlaceType

