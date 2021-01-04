import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PUT_PAYMENT, POST_PAYMENT, GET_PAYMENT_BYID, GET_PAYMENTS,DELETE_PAYMENT,GET_USER, GET_USER_BYID, PUT_USER, POST_USER } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg, deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes';

class Payements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            refreshflag: false,
            errors:{}
        }
    }
    componentWillMount() {
        this.props.removeErrormsg()
    }

    componentDidMount() {
        this.props.getData(action.GET_PAYMENTS, GET_PAYMENTS)
        
    }
    refresh(e) {
        e.preventDefault();
        this.props.getData(action.GET_PAYMENTS, GET_PAYMENTS)
    }
    deleteRecord(id) {
        debugger
        this.props.deleteRecord(action.DELETE_PAYMENT, DELETE_PAYMENT + id)
    }

    postPayementData() {
        debugger
        const obj = {
            paymentId:this.props.getpayementbyid.paymentId?this.props.getpayementbyid.paymentId:0,
            paymentGatewayId:this.props.getpayementbyid.paymentGatewayId*1,
            amount:this.props.getpayementbyid.amount*1,
            paymentDate:dateFormat(this.props.getpayementbyid.paymentDate,'yyyy-mm-dd'),
            transactionNumber:this.props.getpayementbyid.transactionNumber,
            transactionStatus:this.props.getpayementbyid.transactionStatus,
            referenceNumber:this.props.getpayementbyid.referenceNumber,
            bookingId:this.props.getpayementbyid.bookingId*1,
            paymentConfirmedDate:dateFormat(this.props.getpayementbyid.paymentConfirmedDate,'yyyy-mm-dd'),
            isDeleted: this.props.getpayementbyid.paymentId ? false : true
        };
        let url = PUT_PAYMENT+this.props.getpayementbyid.paymentId ;
        if (this.props.getpayementbyid.paymentId) {
            this.props.putData1(action.PUT_PAYMENT, url, obj);
        }
        else {
            this.props.postData1(action.POST_PAYMENT, POST_PAYMENT, obj);
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
            this.postPayementData();
        }
    }
    handleReset() {
        this.props.resetData(action.RESET_DATA, "getpayementbyid");
        this.setState({ validated: false });
    }
    editReacord(id) {
        this.props.getData(action.GET_PAYMENT_BYID, GET_PAYMENT_BYID + id)
    }
    updatePayement = (e, paramName) => {

        this.props.updatePropAccData(paramName, e.target.value, "getpayementbyid");
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
                                        <i class="mdi mdi-wan"></i>
                                    </span>Payment
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
                                            Payment
                                         </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Payment</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Amount</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.getpayementbyid.amount ? this.props.getpayementbyid.amount : ""}
                                                                    class="form-control" onChange={(e) => this.updatePayement(e, "amount")} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">payment Date</label>
                                                            <div class="col-sm-9">
                                                                <input required type="date" value={this.props.getpayementbyid.paymentDate ? this.props.getpayementbyid.paymentDate : ""}
                                                                    class="form-control" onChange={(e) => this.updatePayement(e, "paymentDate")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Transaction Number</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getpayementbyid.transactionNumber ? this.props.getpayementbyid.transactionNumber : ""}
                                                                    class="form-control" onChange={(e) => this.updatePayement(e, "transactionNumber")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Transaction Status</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getpayementbyid.transactionStatus ? this.props.getpayementbyid.transactionStatus : ""}
                                                                    class="form-control" onChange={(e) => this.updatePayement(e, "transactionStatus")} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Reference Number</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.getpayementbyid.referenceNumber ? this.props.getpayementbyid.referenceNumber : ""}
                                                                    class="form-control" onChange={(e) => this.updatePayement(e, "referenceNumber")} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">BookingId</label>
                                                            <div class="col-sm-9">
                                                                <input required type="number" value={this.props.getpayementbyid.bookingId ? this.props.getpayementbyid.bookingId : ""}
                                                                    class="form-control" onChange={(e) => this.updatePayement(e, "bookingId")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Payment Mode</label>

                                                            <div class="col-sm-9">
                                                                <select class="form-control" value={this.props.getpayementbyid.paymentMode ? this.props.getpayementbyid.paymentMode : "0"} onChange={(e) => this.updatePayement(e, "paymentMode")}>
                                                                    <option value={0}>Select</option>
                                                                    <option value="UPI">UPI</option>
                                                                    <option value="Credit Card">Credit Card</option>
                                                                    <option value="Debit Card">Debit Card</option>
                                                                    <option value="Cash">Cash</option>
                                                                </select>
                                                                <div style={{ color: "red" }}>{this.state.errors.paymentMode}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Payment Confirmed Date</label>
                                                            <div class="col-sm-9">
                                                                <input required type="date" value={this.props.getpayementbyid.paymentConfirmedDate ? this.props.getpayementbyid.paymentConfirmedDate : ""}
                                                                    class="form-control" onChange={(e) => this.updatePayement(e, "paymentConfirmedDate")} />
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
                                            <h4 class="card-title">Payments<button onClick={(e) => this.refresh(e)} style={{ backgroundColor: "transparent", border: "none" }}><i class={"mdi mdi-refresh"}></i></button></h4>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[

                                                {
                                                    Header: "TransactionNumber",
                                                    accessor: "transactionNumber",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "transactionStatus",
                                                    accessor: "transactionStatus",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "ReferenceNumber",
                                                    accessor: "referenceNumber",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "PaymentConfirmedDate",
                                                    accessor: "paymentConfirmedDate",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: '',
                                                    accessor: d => d.paymentId,
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
                                                data={this.props.getpayement}
                                                showPagination={true}
                                                defaultPageSize={5}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div >

            </div >


        )
    }
}

const mapStateToProps = (state) => {
    return {
        getpayement: state.goAdvStore.getpayement,
        getpayementbyid: state.goAdvStore.getpayementbyid,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData

    }
}

export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData, removeErrormsg, deleteRecord })(Payements);


    //export default Eventlevel

