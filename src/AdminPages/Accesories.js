import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { postData, GET_ALL_ACCESSORIES, POST_ACCESSORIES, PUT_ACCESSORIES, GET_ACCESSORIES_BYID } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getAccessories, getData, postData1, putData1, updatePropAccData, resetData } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'

var condition = false;
class Accessories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            saledisbale: "",
            rentdisable: "",
            refreshflag: false,
            errors: {
            }
        }
    }
    componentDidMount() {
        this.props.getData(action.GET_ALL_ACCESSORIES, GET_ALL_ACCESSORIES)
    }
    saleorrentOpearation(event) {
        debugger
        this.setState({
            saleOrRent: event.target.value
        })
        if (event.target.value == "sale") {
            this.setState({
                saledisbale: "",
                rentdisable: "true"
            })
        }
        else if (event.target.value == "rent") {
            this.setState({
                rentdisable: "",
                saledisbale: "true"
            })
        }
        else if (event.target.value == "both") {
            this.setState({
                rentdisable: "",
                saledisbale: ""
            })
        }
    }
    handlevalidation() {
        this.setState({
            errors: {
                //saleOrrent:validation.selectvalidation(this.state.saleOrRent),
                //accessoryName:validation.namevalidation(this.state.accessoryName)
            }
        })
    }
    postAccessoryData() {
        debugger
        const obj = {
            accessoriesId: this.props.getaccessorybyid.accessoriesId ? this.props.getaccessorybyid.accessoriesId : 0,
            accessoryName: this.props.getaccessorybyid.accessoryName,
            saleOrRent: this.props.getaccessorybyid.saleOrRent,
            salePrice: this.props.getaccessorybyid.salePrice * 1,
            rentPrice: this.props.getaccessorybyid.rentPrice * 1
        };
        let url = PUT_ACCESSORIES + this.props.getaccessorybyid.accessoriesId;
        if (this.props.getaccessorybyid.accessoriesId) {
            this.props.putData1(action.PUT_ACCESSORIES, url, obj);
        } else {
            this.props.postData1(action.POST_ACCESSORIES, POST_ACCESSORIES, obj);
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
            this.postAccessoryData();
        }

    }
    handleReset() {
        this.props.resetData(action.RESET_DATA, "getaccessorybyid");
        this.setState({ validated: false });
    }
    updateAccessory = (e, paramName) => {
        debugger
        this.props.updatePropAccData(paramName, e.target.value, "getaccessorybyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    editReacord(id)
    {
        this.props.getData(action.GET_ACCESSORIES_BYID,GET_ACCESSORIES_BYID+id)
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
                                    </span>Accessories
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
                                            Accessories
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Accessories</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    {/* <TextInput value={this.state.countryname} defaultValue={this.state.viewData.countryName} type="text" name="countryName" onChange={(e)=>this.countrynamenameOperation(e)}/>
                                        <TextInput value={this.state.country} defaultValue={this.state.viewData.countryCode} type="text" name="countryCode" onChange={(value)=>this.countrycodeOpearation(value)}/>
                                            */}
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Name</label>
                                                            <div class="col-sm-9">
                                                                <input type="text" value={this.props.getaccessorybyid.accessoryName ? this.props.getaccessorybyid.accessoryName : ""}
                                                                    className="form-control" onChange={(e) => this.updateAccessory(e, "accessoryName")} />
                                                                <div style={{ color: "red" }}>{this.state.errors.accessoryName}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">saleOrRent</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control" value={this.props.getaccessorybyid.saleOrRent ? this.props.getaccessorybyid.saleOrRent : "0"} onChange={(e) => this.updateAccessory(e, "saleOrRent")}>
                                                                    <option value={0}>Select</option>
                                                                    <option value="sale">Sale</option>
                                                                    <option value="rent">Rent</option>
                                                                    <option value="both">Both</option>
                                                                </select>
                                                                <div style={{ color: "red" }}>{this.state.errors.saleOrrent}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row" >
                                                            <label class="col-sm-3 col-form-label">SalePrice</label>
                                                            <div class="col-sm-9" >
                                                                <input type="number" value={this.props.getaccessorybyid.salePrice ? this.props.getaccessorybyid.salePrice : ""}
                                                                    class="form-control" onChange={(e) => this.updateAccessory(e, "salePrice")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">RentPrice</label>
                                                            <div class="col-sm-9">
                                                                <input type="number" value={this.props.getaccessorybyid.rentPrice ? this.props.getaccessorybyid.rentPrice : ""}
                                                                    class="form-control" onChange={(e) => this.updateAccessory(e, "rentPrice")} />
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
                                            <h4 class="card-title">Accessories</h4>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[
                                                {
                                                    Header: "Name",
                                                    accessor: "accessoryName",
                                                    headerStyle: {
                                                        textAlign: 'left'
                                                    }
                                                },
                                                {
                                                    Header: "Borrowtype",
                                                    accessor: "saleOrRent",
                                                    headerStyle: {
                                                        textAlign: 'left'
                                                    },
                                                },
                                                {
                                                    Header: "SalePrice",
                                                    accessor: "salePrice",
                                                    headerStyle: {
                                                        textAlign: 'left'
                                                    }

                                                },
                                                {
                                                    Header: "RentPrice",
                                                    accessor: "rentPrice",
                                                    headerStyle: {
                                                        textAlign: 'left'
                                                    }

                                                },
                                                {
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: 'Actions',
                                                    headerStyle: {
                                                        textAlign: 'left'
                                                    },
                                                    accessor: d => d.accessoriesId,
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
                                                data={this.props.accessories}
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
        accessories: state.goAdvStore.accessories,
        getaccessorybyid: state.goAdvStore.getaccessorybyid,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData })(Accessories);


    //export default Accessories

