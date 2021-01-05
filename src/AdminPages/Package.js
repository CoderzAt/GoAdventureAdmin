import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import { Link} from "react-router-dom";
import 'react-table-v6/react-table.css';
import {GET_ALL_PACKAGES,GET_PACKAGE_BYID,POST_PACKAGE,PUT_PACKAGE,GET_DESTINATION,DELETE_PACKAGE,PLACETOVISIT_BYDESTINATION,GET_EVENTTYPE,PACKAGEPLACES,GET_EVENTLEVEL} from '../Shared/Services'
import Sidebar from './Sidebar'
import { Multiselect } from 'multiselect-react-dropdown';
import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg, putDataWithFile,postDataWithFile ,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'


class Package extends Component {
    constructor(props) {
        super(props);
       this.state = {
           validated:false,
          refreshflag:false,
          errors:{}
       }
    }

    componentWillMount()
    {
      this.props.removeErrormsg()
    }
    componentDidMount()
    {
        this.props.getData(action.GET_DESTINATION,GET_DESTINATION)
        this.props.getData(action.GET_ALL_PACKAGES,GET_ALL_PACKAGES)
        this.props.getData(action.GET_EVENTTYPE,GET_EVENTTYPE)
        this.props.getData(action.GET_EVENTLEVEL,GET_EVENTLEVEL)

    }

    refresh(e)
    {
        e.preventDefault();
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
            PackageId:this.props.packagebyid.packageId?this.props.packagebyid.packageId:0,
            PackageName:this.props.packagebyid.packagename,
            PackageType:this.props.packagebyid.packagetype,
            duration:this.props.packagebyid.packageduration,
            DestinationId:parseInt(this.props.packagebyid.destination),
            //CouponCode:this.props.packagebyid.couponcode,
            //CouponExpiryDate:this.props.packagebyid.couponexpirydate,
            //CouponUserUsageCount:parseInt(this.props.packagebyid.couponuserusagecount),
            Inclusions:this.props.packagebyid.inclusions,
            Exclusions:this.props.packagebyid.exclusions,
            PackageDescription:this.props.packagebyid.packagedescription,
            //PromoImage:this.props.packagebyid.promoimage,
            IsDeleted:  false ,
            };
        var bodyFormData = new FormData();
        bodyFormData.set('PackageId', this.props.packagebyid.packageId?this.props.packagebyid.packageId:0);
        bodyFormData.set('PackageName', this.props.packagebyid.packageName);
        bodyFormData.set('PackageType', this.props.packagebyid.packageType);
        bodyFormData.set('duration', this.props.packagebyid.duration);
        bodyFormData.set('DestinationId', parseInt(this.props.packagebyid.destinationId));
        //bodyFormData.set('CouponCode', this.props.packagebyid.couponcode);
        //bodyFormData.set('CouponExpiryDate', this.props.packagebyid.couponexpirydate);
        //bodyFormData.set('CouponUserUsageCount', parseInt(this.props.packagebyid.couponuserusagecount));
        bodyFormData.set('Inclusions', this.props.packagebyid.inclusions);
        //bodyFormData.set('placetovisitIds', this.props.packagebyid.placetovisitIds);
        bodyFormData.set('Exclusions', this.props.packagebyid.exclusions);
        bodyFormData.set('thingsTobring', this.props.packagebyid.thingsTobring);
        bodyFormData.set('PackageDescription', this.props.packagebyid.packageDescription);
        bodyFormData.set('IsDeleted',  false );
        bodyFormData.append('formFile', this.state.formFile?this.state.formFile:null);
        let url = PUT_PACKAGE+ this.props.packagebyid.packageId;
        if (this.props.packagebyid.packageId) {
            this.props.putDataWithFile(action.PUT_PACKAGE,url,bodyFormData);
        }
        else {
            this.props.postDataWithFile(action.POST_PACKAGE,POST_PACKAGE,bodyFormData);
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
        this.props.resetData(action.RESET_DATA, "packagebyid");
        this.setState({ validated: false });
    }
    saveFile = (e) => {
        debugger
        console.log(e.target.files[0])
        console.log("contentdisposition", e.target.files[0]);
        this.setState({
            formFile: e.target.files[0]
        })
    }
    editReacord(id) {
        this.props.getData(action.GET_PACKAGE_BYID, GET_PACKAGE_BYID+id)
    }
    updatePackage = (e, paramName) => {
       var value
        if(paramName === "destinationId")
        {
            this.props.getData(action.PLACETOVISIT_BYDESTINATION,PLACETOVISIT_BYDESTINATION+e.target.value)
            value=e.target.value;
        }
        else if(paramName === "placetovisitIds")
        {
            let data= Array.prototype.map.call(e, function(item) { return item.placeId; }).join(",");
            value=data;
        }
        else
        {
            value=e.target.value
        }
        this.props.updatePropAccData(paramName,value,"packagebyid");
        this.setState({ refreshflag: !this.state.refreshflag });
    }
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_PACKAGE,DELETE_PACKAGE+id)
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
                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>

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
                                                             onChange={(e)=>this.updatePackage(e,"packageName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="type"
                                                        class="col-sm-3 col-form-label">EventLevel</label>
                                                    <div class="col-sm-9">
                                                        <select type="text" value={this.props.packagebyid.eventLevel?this.props.packagebyid.eventLevel:""} class="form-control" id="type" required
                                                         onChange={(e)=>this.updatePackage(e,"eventLevel")}>
                                                            <option value={0}>Select</option>
                                                        {this.props.geteventlevel.map(obj=>(
                                                            <option value={obj.eventLevelId}>{obj.eventLevelCode}</option>
                                                        ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="type"
                                                        class="col-sm-3 col-form-label">Type</label>
                                                    <div class="col-sm-9">
                                                        <select type="text" value={this.props.packagebyid.packageType?this.props.packagebyid.packageType:""} class="form-control" id="type" required
                                                         onChange={(e)=>this.updatePackage(e,"packageType")}>
                                                            <option value={0}>Select</option>
                                                        {this.props.geteventtype.map(obj=>(
                                                            <option value={obj.eventTypeCode}>{obj.eventTypeCode}</option>
                                                        ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                           
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Duration</label>
                                                    <div class="col-sm-9">
                                                        {/* <input type="text" value={this.props.packagebyid.duration?this.props.packagebyid.duration:""} class="form-control" id="duration" required
                                                          onChange={(e)=>this.updatePackage(e,"duration")} /> */}
                                                        <select class="form-control" value={this.props.packagebyid.duration ? this.props.packagebyid.duration : "0"} onChange={(e) => this.updatePackage(e, "duration")}>
                                                            <option value={0}>Select</option>
                                                            <option value="1D">1D</option>
                                                            <option value="2D 1N">2D 1N</option>
                                                            <option value="3D 2N">3D 2N</option>
                                                            <option value="4D 3N">4D 3N</option>
                                                            <option value="5D 4N">5D 4N</option>
                                                            <option value="6D 5N">6D 5N</option>
                                                            <option value="7D 6N">7D 6N</option>
                                                            <option value="8D 7N">8D 7N</option>
                                                            <option value="9D 8N">9D 8N</option>
                                                            <option value="10D 9N">10D 9N</option>
                                                            <option value="11D 10N">11D 10N</option>
                                                            <option value="12D 11N">12D 11N</option>
                                                            <option value="13D 12N">13D 12N</option>
                                                            <option value="14D 13N">14D 13N</option>
                                                            <option value="15D 14N">15D 14N</option>
                                                            <option value="16D 15N">16D 15N</option>
                                                            <option value="17D 16N">17D 16N</option>
                                                            <option value="18D 17N">18D 17N</option>
                                                        </select>
                                                        <div style={{ color: "red" }}>{this.state.errors.duration}</div>
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
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="duration"
                                                        class="col-sm-3 col-form-label">Places</label>
                                                    <div class="col-sm-9">
                                                    <Multiselect   options={this.props.packagebyid.destinationId?this.props. placetovisitbydestination:[]} displayValue={"placeName"} 
                                                    class="form-control" onSelect={(e)=>this.updatePackage(e,"placetovisitIds")} onRemove={(e)=>this.updatePackage(e,"placetovisitIds")} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription"
                                                        class="col-sm-3 col-form-label">Promo Image</label>
                                                        <div class="col-sm-9">
                                                         <span class="input-group-append">
                                                         <input

                                                                  class="file-upload-browse btn btn-gradient-primary"
                                                                    type="file"
                                                                    onChange={this.saveFile}/>

                                                        </span>
                                                        </div>
                                                   
                                                </div>
                                            </div>
                                        
                                        <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Thingsto Bring</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.thingsTobring?this.props.packagebyid.thingsTobring:""} class="form-control" id="placeTypeName" required
                                                             onChange={(e)=>this.updatePackage(e,"thingsTobring")}/>
                                                    </div>
                                                </div>
                                            </div>
                                     
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
                                        
                                        
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription"
                                                        class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" value={this.props.packagebyid.packageDescription?this.props.packagebyid.packageDescription:""} id="placeTypeDescription"
                                                          required  rows="4" onChange={(e)=>this.updatePackage(e,"packageDescription")}></textarea>
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
                               <h4 class="card-title">List<button onClick={(e)=>this.refresh(e)} style={{backgroundColor:"transparent",border:"none"}}><i  class={"mdi mdi-refresh"}></i></button></h4>
                   <div className="table-responsive">
                   <ReactTable columns={[
                                   /* {
                                        Header: "PackageId",
                                        accessor: "packageId"
                                        
                                    },*/
                                  {
                                    Header: "Name",
                                    accessor: "packageName",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Type",
                                    accessor: "packageType",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Duration",
                                    accessor: "duration",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
                                    accessor: d => d.packageId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" value={row.value} >
                                          <Link  to={`/admin/trip/${row.value}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                          </button>
                                          <button type="button"  value={row.value} class="btn btn-icon">
                                          <Link  to={`/admin/itenary/${row.value}`}>Itenary</Link>
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
		
        </div>
     )
        }
    }

    const mapStateToProps = (state) => {
        return {
          getdestination:state.goAdvStore.getdestination,
          geteventlevel:state.goAdvStore.geteventlevel,
          placetovisitbydestination:state.goAdvStore.placetovisitbydestination,
          packages:state.goAdvStore.packages,
          geteventtype:state.goAdvStore.geteventtype,
          packagebyid:state.goAdvStore.packagebyid,
          message: state.goAdvStore.message,
          messageData: state.goAdvStore.messageData
        }
      }
      export default connect(mapStateToProps, { getData, postData1, putData1,updatePropAccData,resetData,removeErrormsg,putDataWithFile,postDataWithFile,deleteRecord })(Package);
    //export default Package

