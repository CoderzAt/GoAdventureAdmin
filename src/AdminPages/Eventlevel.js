import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { GET_EVENTLEVEL_BYID, GET_EVENTLEVEL, POST_EVENTLEVEL, PUT_EVENTLEVEL, GET_STATUS,DELETE_EVENTLEVEL } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg ,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes';
import Displayerrormsg from '../Shared/DisplayErrorMsg'



class Eventlevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            refreshflag: false
        }
    }
    componentWillMount() {
        this.props.removeErrormsg()
    }

    componentDidMount() {
        this.props.getData(action.GET_EVENTLEVEL, GET_EVENTLEVEL)
        this.props.getData(action.GET_STATUS, GET_STATUS)
    }
    refresh(e)
    {
        e.preventDefault();
        this.props.getData(action.GET_EVENTLEVEL, GET_EVENTLEVEL)
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_EVENTLEVEL,DELETE_EVENTLEVEL+id)
    }

    postEventlevelData() {
        debugger
        const obj = {
            eventLevelId: this.props.geteventlevelbyid.eventLevelId ? this.props.geteventlevelbyid.eventLevelId : 0,
            eventLevelCode: this.props.geteventlevelbyid.eventLevelCode,
            eventLevelDesc: this.props.geteventlevelbyid.eventLevelDesc,
           // statusId: this.props.geteventlevelbyid.statusId * 1,
            isDeleted: this.props.geteventlevelbyid.eventLevelId ? false : true
        };
        let url = PUT_EVENTLEVEL + this.props.geteventlevelbyid.eventLevelId;
        if (this.props.geteventlevelbyid.eventLevelId) {
            this.props.putData1(action.PUT_EVENTLEVEL, url, obj);
        }
        else {
            this.props.postData1(action.POST_EVENTLEVEL, POST_EVENTLEVEL, obj);
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
            this.postEventlevelData();
        }
    }
    handleReset() {
        this.props.resetData(action.RESET_DATA, "geteventlevelbyid");
        this.setState({ validated: false });
    }
    editReacord(id) {
        this.props.getData(action.GET_EVENTLEVEL_BYID, GET_EVENTLEVEL_BYID + id)
    }
    updateEventlevel = (e, paramName) => {

        this.props.updatePropAccData(paramName, e.target.value, "geteventlevelbyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    render() {
        //this.props.getData(action.GET_EVENTLEVEL, GET_EVENTLEVEL)
        return (
            <div>
                <div class="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
                    <Sidebar />

                    <div class="main-panel">
                        <div class="content-wrapper">

                            <div class="page-header">
                                <h3 class="page-title">
                                    <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                        <i class="mdi mdi-wan"></i>
                                    </span>Eventlevel
                                </h3>
                                <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>
                                <nav aria-label="breadcrumb">
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">
                                            Eventlevel
                                         </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Eventlevel</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Code</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.geteventlevelbyid.eventLevelCode ? this.props.geteventlevelbyid.eventLevelCode : ""}
                                                                    class="form-control" onChange={(e) => this.updateEventlevel(e, "eventLevelCode")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Description</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.geteventlevelbyid.eventLevelDesc ? this.props.geteventlevelbyid.eventLevelDesc : ""}
                                                                    class="form-control" onChange={(e) => this.updateEventlevel(e, "eventLevelDesc")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                   {/*  <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Status</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" value={this.props.geteventlevelbyid.statusId ? this.props.geteventlevelbyid.statusId : "0"}
                                                                    onChange={(e) => this.updateEventlevel(e, "statusId")}>
                                                                    <option value={0}>Select</option>
                                                                    {this.props.getstatus.map(obj =>
                                                                        <option value={obj.statusId}>{obj.statusCode}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div> */}
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
                                            <h4 class="card-title">Event Levels<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[

                                                {
                                                    Header: "Code",
                                                    accessor: "eventLevelCode",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Description",
                                                    accessor: "eventLevelDesc",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: '',
                                                    accessor: d => d.eventLevelId,
                                                    maxWidth: 300,
                                                    Cell: row => (
                                                        <div className="template-demo">
                                                            <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                <i class="mdi mdi-pencil-outline"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                                <i class="mdi mdi-delete-outline"></i>
                                                            </button>

                                                        </div>)

                                                }

                                            ]}
                                                data={this.props.geteventlevel}
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


        )
    }
}

const mapStateToProps = (state) => {
    return {
        geteventlevel: state.goAdvStore.geteventlevel,
        geteventlevelbyid: state.goAdvStore.geteventlevelbyid,
        getstatus: state.goAdvStore.getstatus,
        posteventlevel: state.goAdvStore.posteventlevel,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData

    }
}

export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg,deleteRecord })(Eventlevel);


    //export default Eventlevel

