import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { postData, couponupdateapi, GET_ALL_COUPON, GET_COUPON_BYID, POST_COUPON, PUT_COUPON,DELETE_COUPON } from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import { connect } from 'react-redux';
import { getData, postData1, putData1, updatePropAccData, resetData,removeErrormsg,deleteRecord } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'

var condition = false;
class Coupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            refreshflag: false
        }
    }
    componentWillMount()
    {
      this.props.removeErrormsg()
  
    }
    componentDidMount() {
        this.props.getData(action.GET_ALL_COUPON, GET_ALL_COUPON)
    }
    refresh(e)
    {
        e.preventDefault();
        this.props.getData(action.GET_ALL_COUPON, GET_ALL_COUPON)
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_COUPON,DELETE_COUPON+id)
    }
    postCouponData() {
        debugger
        const obj = {
            couponId: this.props.couponbyid.couponId?this.props.couponbyid.couponId : 0,
            couponValue:this.props.couponbyid.couponValue!==null?this.props.couponbyid.couponValue * 1:null,
            couponCode: this.props.couponbyid.couponCode,
            couponPercentage:this.props.couponbyid.couponPercentage!==null?this.props.couponbyid.couponPercentage * 1:null,
            isDeleted:this.props.couponbyid.couponId?false:true
        };
        let url = PUT_COUPON + this.props.couponbyid.couponId;
        if (this.props.couponbyid.couponId) {
            this.props.putData1(action.PUT_COUPON, url, obj);
        } else {
            this.props.postData1(action.POST_COUPON, POST_COUPON, obj);
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
            this.postCouponData();
        }
    }
    editReacord(id) {
        this.props.getData(action.GET_COUPON_BYID, GET_COUPON_BYID + id)
    }

    handleReset() {
        this.props.resetData(action.RESET_DATA, "couponbyid");
        this.setState({ validated: false });
    }
    updateCoupon = (e, paramName) => {
        debugger
        if(e.target.value=== "percentage")
        {
            this.props.updatePropAccData("hidepercentage","", "couponbyid");
            this.props.updatePropAccData("hidevalue","true","couponbyid")
            this.props.updatePropAccData("couponValue",null, "couponbyid");

        }
        else if(e.target.value === "value")
        {
            this.props.updatePropAccData("hidepercentage","true", "couponbyid");
            this.props.updatePropAccData("hidevalue","","couponbyid")
            this.props.updatePropAccData("couponPercentage",null, "couponbyid");

        }

        this.props.updatePropAccData(paramName, e.target.value, "couponbyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }

    render() {
        //this.props.getData(action.GET_ALL_COUPON, GET_ALL_COUPON)
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
                            </span>Coupon
                        </h3>
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>
                                <nav aria-label="breadcrumb">
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">
                                            Coupon
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Coupon</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Code</label>
                                                            <div class="col-sm-9">
                                                                <input required type="text" value={this.props.couponbyid.couponCode ? this.props.couponbyid.couponCode : ""}
                                                                    class="form-control" onChange={(e) => this.updateCoupon(e, "couponCode")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">ParcentageOrValue</label>
                                                            <div class="col-sm-9">
                                                                <select value={this.props.couponbyid.parcentageorvalue ? this.props.couponbyid.parcentageorvalue : "0"}
                                                                    class="form-control" onChange={(e) => this.updateCoupon(e, "parcentageorvalue")} >
                                                                    <option value={0}>Slect</option>
                                                                    <option value="percentage">Percentage</option>
                                                                    <option value="value">Value</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6" hidden={this.props.couponbyid.hidepercentage ===""?this.props.couponbyid.hidepercentage:'true'}>
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Percentage</label>
                                                            <div class="col-sm-9">
                                                                <input type="number" value={this.props.couponbyid.couponPercentage ? this.props.couponbyid.couponPercentage : ""}
                                                                    class="form-control" onChange={(e) => this.updateCoupon(e, "couponPercentage")} />
                                                            </div>
                                                        </div>
                                                    </div>
                                               
                                                    <div class="col-md-6" hidden={this.props.couponbyid.hidevalue===""?this.props.couponbyid.hidevalue:"true"}>
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription" class="col-sm-3 col-form-label">Value</label>
                                                            <div class="col-sm-9">
                                                                <input type="number" value={this.props.couponbyid.couponValue ? this.props.couponbyid.couponValue : ""}
                                                                    class="form-control" onChange={(e) => this.updateCoupon(e, "couponValue")} />
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
                                            <h4 class="card-title">Coupons<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                                            <div class="table-responsive"></div>
                                            <ReactTable columns={[
                                                
                                                {
                                                    Header: "Code",
                                                    accessor: "couponCode",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Value",
                                                    accessor: "couponValue",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    Header: "Percentage",
                                                    accessor: "couponPercentage",
                                                    headerStyle: {
                                                        textAlign: 'left',
                                                        fontWeight: 'bold'
                                                    }

                                                },
                                                {
                                                    id: 'id', // Required because our accessor is not a string
                                                    Header: '',
                                                    accessor: d => d.couponId,
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
                                                data={this.props.coupons}
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
        coupons: state.goAdvStore.coupons,
        couponbyid: state.goAdvStore.couponbyid,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData,removeErrormsg,deleteRecord })(Coupon);

   // export default Coupon

