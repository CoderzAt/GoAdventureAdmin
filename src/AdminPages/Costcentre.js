import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { GET_COSTCENTRE_BYID, GET_COSTCENTRE, POST_COSTCENTRE, PUT_COSTCENTRE ,DELETE_COSTCENTRE} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getData, putData1, postData1, updatePropAccData, resetData,removeErrormsg ,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'

class Costcentre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated:false,
            refreshflag:false
        }
    }
    componentWillMount()
    {
      this.props.removeErrormsg()
  
    }
    componentDidMount() {
        this.props.getData(action.GET_COSTCENTRE, GET_COSTCENTRE)
    }
    refresh(e)
  {
      e.preventDefault();
      this.props.getData(action.GET_COSTCENTRE, GET_COSTCENTRE)
  }
    /* deleteRecord(id)
    {
        alert("in delete id no is"+id)
        fetch(deletecountry+id, {
            method: 'DELETE'
          });

    } */
    postCostcentreData() {
        debugger
        const obj = {
            costCenterId: this.props.getcostcentrebyid.costCenterId ? this.props.getcostcentrebyid.costCenterId : 0,
            costCenterName: this.props.getcostcentrebyid.costCenterName,
            costCenterType: this.props.getcostcentrebyid.costCenterType,
            costCenterTypeDescription: this.props.getcostcentrebyid.costCenterTypeDescription,
            costCenterSubType: this.props.getcostcentrebyid.costCenterSubType,
            maxPersonsAllowed: this.props.getcostcentrebyid.maxPersonsAllowed * 1,
            isDeleted:this.props.getcostcentrebyid.costCenterId?false:true
        };
        let url = PUT_COSTCENTRE + this.props.getcostcentrebyid.costCenterId;
        if (this.props.getcostcentrebyid.costCenterId) {
            this.props.putData1(action.PUT_COSTCENTRE, url, obj);
        } else {
            this.props.postData1(action.POST_COSTCENTRE, POST_COSTCENTRE, obj);
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
        } else {
            event.preventDefault();
            this.postCostcentreData();
        }
    }
    handleReset() {
        this.props.resetData(action.RESET_DATA, "getcostcentrebyid");
        this.setState({ validated: false });
    }
    updateCostcentre = (e, paramName) => {
        debugger
        this.props.updatePropAccData(paramName, e.target.value, "getcostcentrebyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    editReacord(id) {
        this.props.getData(action.GET_COSTCENTRE_BYID, GET_COSTCENTRE_BYID + id)
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_COSTCENTRE,DELETE_COSTCENTRE+id)
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
                                        <i class="mdi mdi-wan"></i>
                                    </span>Costcentre
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
                                            Costcentre
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Costcentre</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    {/* <TextInput value={this.state.countryname} defaultValue={this.state.viewData.countryName} type="text" name="countryName" onChange={(e)=>this.countrynamenameOperation(e)}/>
                                        <TextInput value={this.state.country} defaultValue={this.state.viewData.countryCode} type="text" name="countryCode" onChange={(value)=>this.countrycodeOpearation(value)}/>
                                            */}

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Name</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getcostcentrebyid.costCenterName ? this.props.getcostcentrebyid.costCenterName : ""}
                                                                    class="form-control" onChange={(e) => this.updateCostcentre(e, "costCenterName")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Type</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getcostcentrebyid.costCenterType ? this.props.getcostcentrebyid.costCenterType : ""}
                                                                    class="form-control" onChange={(e) => this.updateCostcentre(e, "costCenterType")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">SubType</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getcostcentrebyid.costCenterSubType ? this.props.getcostcentrebyid.costCenterSubType : ""}
                                                                    class="form-control" onChange={(e) => this.updateCostcentre(e, "costCenterSubType")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">MaxPersonsAllowed</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.getcostcentrebyid.maxPersonsAllowed ? this.props.getcostcentrebyid.maxPersonsAllowed : ""}
                                                                    class="form-control" onChange={(e) => this.updateCostcentre(e, "maxPersonsAllowed")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Description</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getcostcentrebyid.costCenterTypeDescription ? this.props.getcostcentrebyid.costCenterTypeDescription : ""}
                                                                    class="form-control" onChange={(e) => this.updateCostcentre(e, "costCenterTypeDescription")} />
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
                                            <h4 class="card-title">Cost Center<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[
                                                {
                                                    Header: "Name",
                                                    accessor: "costCenterName",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }
                                                },
                                                {
                                                    Header: "Type",
                                                    accessor: "costCenterType",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    },
                                                },
                                                {
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: '',
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    },
                                                    accessor: d => d.costCenterId,
                                                    maxWidth: 300,
                                                    Cell: row => (
                                                        <div className="template-demo">
                                                            <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                <i class="mdi mdi-pencil-outline"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}}  value={row.value} >
                                                                <i class="mdi mdi-delete-outline"></i>
                                                            </button>
                                                        </div>)
                                                }

                                            ]}
                                                data={this.props.getallcostcentres}
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
        getallcostcentres: state.goAdvStore.getallcostcentres,
        getcostcentrebyid: state.goAdvStore.getcostcentrebyid,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData,removeErrormsg,deleteRecord })(Costcentre);
    //export default Costcentre

