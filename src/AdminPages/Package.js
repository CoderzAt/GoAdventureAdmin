import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import { Link} from "react-router-dom";
import 'react-table-v6/react-table.css';
import {postData,packagepostapi,getdestinations,loadData,getpackages,packageupdateapi,GET_ALL_PACKAGES,GET_PACKAGE_BYID,POST_PACKAGE,PUT_PACKAGE,GET_DESTINATION} from '../Shared/Services'
import Sidebar from './Sidebar'

import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'


class Package extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
           destinationnames:[],
           packagename:null,
           packagetype:null,
           packageduration:null,
           couponcode:null,
           couponexpirydate:null,
           couponuserusagecount:null,
           inclusions:null,
           exclusions:null,
           packagedescription:null,
           promoimage:null,
           destination:1,
           packagesT:[],
           editData:[]
       }
    }
    async componentDidMount()
    {
        this.props.getData(action.GET_DESTINATION,GET_DESTINATION)
        this.props.getData(action.GET_ALL_PACKAGES,GET_ALL_PACKAGES)
    }

    
    packagedescriptionOperation(event)
    {
        this.setState({
            packagedescription:event.target.value
        })
    }
   
    postPackagedata()
    {
        debugger
        const obj = {
            packageId:this.props.packagebyid.packageId?this.props.packagebyid.packageId:0,
            packageName:this.props.packagebyid.packagename,
            packageType:this.props.packagebyid.packagetype,
            duration:this.props.packagebyid.packageduration,
            destinationId:parseInt(this.props.packagebyid.destination),
            couponCode:this.props.packagebyid.couponcode,
            couponExpiryDate:this.props.packagebyid.couponexpirydate,
            couponUserUsageCount:parseInt(this.props.packagebyid.couponuserusagecount),
            inclusions:this.props.packagebyid.inclusions,
            exclusions:this.props.packagebyid.exclusions,
            packageDescription:this.props.packagebyid.packagedescription,
            promoImage:this.props.packagebyid.promoimage
            };
        let url = PUT_PACKAGE+ this.props.packagebyid.packageId;
        if (this.props.packagebyid.packageId) {
            this.props.putData1(action.PUT_PACKAGE,url,obj);
        }
        else {
            this.props.postData1(action.POST_PACKAGE,POST_PACKAGE,obj);
        }
        this.setState({ validated: false });
    }

     handleSubmit(event)
    {
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
        this.postPackagedata();
    }   

    }
    handleReset() {
        this.props.resetData(action.RESET_DATA,"packagebyid");
            this.setState({ validated: false });
      }
    editReacord(id) {
        this.props.getData(action.GET_PACKAGE_BYID, GET_PACKAGE_BYID+id)
    }
    updatePackage = (e, paramName) => {
        this.props.updatePropAccData(paramName,e.target.value,"packagebyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }

    render() {
	    return (

        <div>
        
   <div class="container-fluid page-body-wrapper" style={{paddingTop:80}}>
       <Sidebar/>
       
       <div class="main-panel">
           <div class="content-wrapper">
           <div class="page-header">
                        <h3 class="page-title">
                            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                <i class="mdi mdi-home-map-marker"></i>
                            </span>Package
                        </h3>
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Package
                                </li>
                            </ul>
                        </nav>
                    </div>
               <div class="row">
                   <div class="col-12 grid-margin stretch-card">
                       <div class="card">
                           <div class="card-body">
                               <h4 class="card-title">Package</h4>
                               <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                               <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Name</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.packageName?this.props.packagebyid.packageName:""} class="form-control" id="placeTypeName" required
                                                            placeholder="Name" onChange={(e)=>this.updatePackage(e,"packageName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="type"
                                                        class="col-sm-3 col-form-label">Type</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.packageType?this.props.packagebyid.packageType:""} class="form-control" id="type" required
                                                            placeholder="Type" onChange={(e)=>this.updatePackage(e,"packageType")}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="duration"
                                                        class="col-sm-3 col-form-label">Duration</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.duration?this.props.packagebyid.duration:""} class="form-control" id="duration" required
                                                          onChange={(e)=>this.updatePackage(e,"duration")}  placeholder="Duration"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Destination</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.packagebyid.destinationId?this.props.packagebyid.destinationId:"0"} 
                                                    onChange={(e)=>this.updatePackage(e,"destinationId")}>
                                                      <option value={0}>Select</option>
                                                      {this.props.getdestination.map(obj=>
                                                      <option value={obj.destinationId}>{obj.destinationName}</option>
                                                      )}
                                                     </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription"
                                                        class="col-sm-3 col-form-label">Promo Image</label>
                                                    <div class="col-sm-9">
                                                        <input type="file" name="img[]" class="file-upload-default"/>
                                                        <div class="input-group col-xs-12">
                                                            <input type="text" value={this.state.editData.promoImage} class="form-control file-upload-info"
                                                               required disabled="" placeholder="Upload Image" onChange={(e)=>this.promoimageOperation(e)}/>
                                                            <span class="input-group-append">
                                                                <button
                                                                    class="file-upload-browse btn btn-gradient-primary"
                                                                    type="button">Upload</button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                     <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Inclusions</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" value={this.props.packagebyid.inclusions?this.props.packagebyid.inclusions:""} id="placeTypeDescription"
                                                          required  rows="4" onChange={(e)=>this.updatePackage(e,"inclusions")}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Exclusions</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" value={this.props.packagebyid.exclusions?this.props.packagebyid.exclusions:""} id="placeTypeDescription"
                                                          required  rows="4" onChange={(e)=>this.updatePackage(e,"exclusions")}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription"
                                                        class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" value={this.props.packagebyid.packageDescription?this.props.packagebyid.packageDescription:""} id="placeTypeDescription"
                                                          required  rows="4" onChange={(e)=>this.updatePackage(e,"packageDescription")}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="couponCode" class="col-sm-3 col-form-label">Coupon
                                                        Code</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" defaultValue={this.state.editData.couponCode} class="form-control" id="couponCode"
                                                          required  placeholder="Coupon Code" onChange={(e)=>this.couponecodeoperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">

                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Coupon Expiry Date</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" defaultValue={this.state.editData.couponExpiryDate} class="form-control" id="couponExpiryDate"
                                                          required  placeholder="10/10/2020" onChange={(e)=>this.couponexpirydateOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="couponCount" class="col-sm-3 col-form-label">Coupon
                                                        User Usage Count</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" defaultValue={this.state.editData.couponUserUsageCount} class="form-control" id="couponCount"
                                                          required  placeholder="0" onChange={(e)=>this.couponuserusagecountOperation(e)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
 */}                                            
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
                               <h4 class="card-title">List</h4>
                   <div className="table-responsive">
                   <ReactTable columns={[
                                    {
                                        Header: "PackageId",
                                        accessor: "packageId"
                                        
                                    },
                                  {
                                    Header: "PackageName",
                                    accessor: "packageName"
                                    
                                  },
                                  {
                                    Header: "PackageType",
                                    accessor: "packageType"
                                    
                                  },
                                  {
                                    Header: "Duration",
                                    accessor: "duration"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.packageId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => {  this.deleteRecord(row.value)}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" value={row.value} >
                                          <Link  to={`/admin/trip/${row.value}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                          </button>
                                      </div>)

                                  }
                                ]}
                                data={this.props.packages}
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
		{/* <div style={{paddingLeft:400,paddingTop:110,backgroundColor:"black"}} >
            <div class="card" style={{width:600 }}>
  <div class="card-body">
    <h3 class="card-title">New Package</h3>
    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)}>
                  <Form.Group >
                    <label htmlFor="packagename">Package Name</label>
                    <Form.Control   type="text" id="packagename"  onChange={(e)=>this.packagenameOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="packagetype">Package Type</label>
                    <Form.Control   type="text" id="packagetype"  onChange={(e)=>this.packagetypeOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="packageduration">Package Duration</label>
                    <Form.Control   type="text" id="packageduration"  onChange={(e)=>this.packagedurationOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group>
                  <label for="travellerMode">Destination</label>
                  <select class="form-control travellerMode" onChange={(e)=>this.destinationOpeartion(e)}>
                  {this.state.destinationnames.map(obj=>
                  <option value={obj.destinationId}>{obj.destinationName}</option>
                    )}
                    </select>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="couponcode">CouponCode</label>
                    <Form.Control   type="text" id="couponcode"  onChange={(e)=>this.couponecodeoperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="couponexpirydate">CouponExpiryDate</label>
                    <Form.Control   type="text" id="couponexpirydate"  onChange={(e)=>this.couponexpirydateOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="couponuserusagecount">CouponUserUsageCount</label>
                    <Form.Control   type="number" id="couponuserusagecount"  onChange={(e)=>this.couponuserusagecountOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="inclusions">Inclusions</label>
                    <Form.Control   type="text" id="inclusions"  onChange={(e)=>this.inclusionsOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="exclusions">exclusions</label>
                    <Form.Control   type="text" id="exclusions"  onChange={(e)=>this.exclusionsOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="packagedescription">Package Description</label>
                    <Form.Control   type="text" id="packagedescription"  onChange={(e)=>this.packagedescriptionOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="promoimage">Promo Image</label>
                    <Form.Control   type="text" id="promoimage"  onChange={(e)=>this.promoimageOperation(e)}  required/>
                  </Form.Group>
                  <button type="submit" class="btn btn-primary" >submit</button>
    </Form>
  </div>
  
</div>
        </div> */}
        </div>
     )
        }
    }

    const mapStateToProps = (state) => {
        return {
          getdestination:state.goAdvStore.getdestination,
          packages:state.goAdvStore.packages,
          packagebyid:state.goAdvStore.packagebyid,
          message: state.goAdvStore.message,
          messageData: state.goAdvStore.messageData
        }
      }
      export default connect(mapStateToProps, { getData, postData1, putData1,updatePropAccData,resetData })(Package);
    //export default Package

