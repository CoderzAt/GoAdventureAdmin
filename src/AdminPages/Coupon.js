import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,getallcoupons, getcouponbyid, couponpostapi, couponupdateapi,GET_ALL_COUPON,GET_COUPON_BYID} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Sidebar from './Sidebar'
import AdminHeader from'./AdminHeader'
import { connect } from 'react-redux';
import {getData} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'

/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */
/* import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js' */



var condition=false;
class Coupon extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           couponcode:null,
           couponvalue:null,
           couponpercentage:null,
           //coupons:[],
           editData:[]
           
       }
    }

  /*   async loadtabledata()
    {

        let countries1=await loadData(getcounties);
        this.setState({
                countries:countries1
            }
        )
    } */
 /* componentDidUpdate() //this is for rendering the code for every update
    {
        debugger
        //we need to keep a condition here ...if new data is submitted then only we have to call this function
       
        this.loadtabledata()  //is there any problem with hitting the api's too many times
        condition=false;
        
     } */
    componentDidMount()
    {

        this.props.getData(action.GET_ALL_COUPON,GET_ALL_COUPON)
        /* this.setState({
            coupons:await loadData(getallcoupons)
        }) */
        
     }
    couponCodeOperation(event)
    {
      this.setState({
            couponcode:event.target.value
        })
    }
    couponvalueOperation(event)
    {
   this.setState({
            couponvalue:event.target.value
        })

    }
    couponpercentageOperation(event)
    {
  this.setState({
            couponpercentage:event.target.value
        })
    }
    /* deleteRecord(id)
    {
        alert("in delete id no is"+id)
        fetch(deletecountry+id, {
            method: 'DELETE'
          });

    }*/
  async editReacord(id)
    {
        //alert("in Edit "+id)
        let url=GET_COUPON_BYID+id;
       // let editdata=await loadData(url)
        this.props.getData(action.GET_COUPON_BYID,url)

        let editdata=this.props.couponbyid;
        this.setState({
            editData:editdata
        })
        this.setState({
        couponvalue: editdata.couponValue,
        couponcode:editdata.couponCode,
        couponpercentage:editdata.couponPercentage
    })
    }
    async postEditedData()
    {
        debugger
        //alert("in post edit")
        const obj={
            couponId:this.state.editData.couponId,
            couponValue:parseInt(this.state.couponvalue),
            couponCode:this.state.couponcode,
            couponPercentage:parseInt(this.state.couponpercentage)
                  }

        let editurl=couponupdateapi+this.state.editData.couponId;
        let editeddata=await postData(obj,editurl,'Put')

        //alert(editeddata)

        window.location.reload();//page refresh

    }
 async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            couponId:0,
            couponValue:parseInt(this.state.couponvalue),
            couponCode:this.state.couponcode,
            couponPercentage:parseInt(this.state.couponpercentage)
              }
             let message=await  postData(obj,couponpostapi,'Post');
             
             //alert (message);
             window.location.reload();//page refresh
    }

    async handleSubmit(event)
    {
        debugger
        const form = event.currentTarget;
        console.log("checkform",form.checkValidity())
        if(form.checkValidity() === false)
        {
          event.preventDefault();
          event.stopPropagation();
        }
        else
        {
            event.preventDefault();
            if(this.state.editData.couponId == undefined)
            {
              this.postDatatoApi()
            }
            else
            {
                this.postEditedData()
            }
        }
      this.setState({
            validated:true
        })

    } 

    handleReset()
    {
        this.setState({
            viewData:[]
        })
    }

    render() {
	    return (
         <div>
             <div class="container-scroller">
        </div>
       <AdminHeader/>
        <div class="container-fluid page-body-wrapper" style={{paddingTop:80}}>
            <Sidebar/>
            
            <div class="main-panel">
                <div class="content-wrapper">
                    
                     <div class="page-header">
                        <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                <i class="mdi mdi-wan"></i>
                            </span> Coupon
                        </h3>
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
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Code</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.couponCode} class="form-control" onChange={(e)=>this.couponCodeOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Percentage</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.couponPercentage}  class="form-control" onChange={(e)=>this.couponpercentageOperation(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Value</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" defaultValue={this.state.editData.couponValue} class="form-control"  onChange={(e)=>this.couponvalueOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                       
                
                                        <div class="row" style={{margin:"auto",textAlign:"center"/* marg:auto;text-align: center} */}}>
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
                                    <h4 class="card-title">Coupons</h4>
                                    <div class="table-responsive"></div>
                                     <ReactTable columns={[
                                    {
                                        Header: "couponValue",
                                        accessor:"couponValue"
                                        
                                    },
                                  {
                                    Header: "couponCode",
                                    accessor: "couponCode"
                                    
                                  },
                                  {
                                    Header: "couponPercentage",
                                    accessor: "couponPercentage"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.couponId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => {  this.deleteRecord(row.value)}} value={row.value} >
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
            couponbyid:state.goAdvStore.couponbyid
        }
    }
    export default connect(mapStateToProps, {getData})(Coupon);
    
   // export default Coupon

