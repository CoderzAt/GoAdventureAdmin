import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,getcities,staypostapi,getstays,getstaybyid,GET_STATES,GET_USER_BYID,GET_CITY_STATEID,GET_COUNTRIES,GET_STATE_BYCOUNTRYID,stayupdateapi,getstaytypes,GET_STAY_BYID,GET_STAY,POST_STAY,PUT_STAY,GET_CITIES,GET_STAYTYPE,DELETE_STAY} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Multiselect } from 'multiselect-react-dropdown';
import Sidebar from './Sidebar'

import { connect } from 'react-redux';
import {getData,postData1,putData1,updatePropAccData,resetData,removedata,removeErrormsg,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'
import {gettingMultiselectValues} from '../Shared/ReauasbleFunctions'
import { act } from 'react-dom/test-utils';
import * as validation from "../Shared/Validations";
import Spinner1 from '../Components/Spinner1';


var condition=false;
var errors={}
class Stay extends Component {
    constructor(props) {
        super(props);
        this.multiselectRef = React.createRef();
       this.state = {
           validated:false,
           stayId: 0,
           stayName:null,
           rateType:null,
           StayTypeIds:null,
           contactInfo:null,
           locationDetails:null,
           cityId:1,
           stay:[],
           editData:[],
           cities:[],
           staytypes:[],
           staytypenames:[],
           errors:{
            selectcity: "",
            selectcountry:"",
            selectstate:"",
            selectrate:""
           }
           
       }
    }
    componentWillMount()
    {
      this.props.removeErrormsg()
      this.props.removedata("getstaybyid")
   }
   componentDidMount()
     {
      this.props.getData(action.GET_STAY,GET_STAY)
      //this.props.getData(action.GET_CITIES,GET_CITIES)
      this.props.getData(action.GET_STAYTYPE,GET_STAYTYPE)
      this.props.getData(action.GET_COUNTRIES,GET_COUNTRIES)
        /* let staydata= await loadData(getstays)
        this.setState({
           stay:staydata
        })
 */
       /*  let data= await loadData(getcities)
        this.setState({
           cities:data
        })

        let staytype= await loadData(getstaytypes)
        this.setState({
           staytypes:staytype
        }) */
        this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))

     }  
     refresh(e)
    {
        e.preventDefault();
        this.props.getData(action.GET_STAY,GET_STAY)
    }
     staynameOperation(event)
    {
      this.setState({
            stayName:event.target.value
        })
    }
    ratetypeOperation(event)
    {
   this.setState({
            rateType:event.target.value
        })

    }
    staytypeOperation(event)
    {
  this.setState({
            stayType:event.target.value
        })
    }
    contactinfoOperation(event)
    {
  this.setState({
            contactInfo:event.target.value
        })
    }
    locationdetailsOperation(event)
    {
  this.setState({
            locationDetails:event.target.value
        })
    }
    cityIdOperation(event)
    {
  this.setState({
            cityId:event.target.value
        })
    }
   
    
   
    deleteRecord(id)
    {
        debugger
    this.props.deleteRecord(action.DELETE_STAY,DELETE_STAY+id)
    }
 
     async postEditedData()
    {
        debugger
        const obj={
            stayId:parseInt(this.state.editData.stayId),
            stayName:this.state.stayName,
            rateType:this.state.rateType,
            stayTypeIds:this.state.StayTypeIds,
            contactInfo:this.state.contactInfo,
            locationDetails:this.state.locationDetails,
            cityId:parseInt(this.state.cityId)
           }

        let editurl=stayupdateapi+this.state.editData.stayId;
        let editeddata=await postData(obj,editurl,'Put')
        alert(editeddata)
        window.location.reload();//page refresh

    }
    async postDatatoApi()
    {
        debugger
        condition=true;
        const obj={
            stayId: 0,
            stayName:this.state.stayName,
            rateType:this.state.rateType,
            stayTypeIds:this.state.StayTypeIds,
            contactInfo:this.state.locationDetails,
            locationDetails:this.state.locationDetails,
            cityId:parseInt(this.state.cityId)
              }
             let message = await  postData(obj,staypostapi,'Post');
             alert (message);
             window.location.reload();//page refresh
    }
    postStaydata()
    {
        debugger
        const obj = {
            stayId:this.props.getstaybyid.stayId?this.props.getstaybyid.stayId:0,
            stayName:this.props.getstaybyid.stayName,
            rateType:this.props.getstaybyid.rateType,
            stayTypeIds:this.props.getstaybyid.stayTypeIds?this.props.getstaybyid.stayTypeIds:"",
            contactInfo:this.props.getstaybyid.contactInfo,
            locationDetails:this.props.getstaybyid.locationDetails,
            cityId:this.props.getstaybyid.cityId*1,
            createdBy:this.props.getstaybyid.stayId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName,
            modifiedBy:this.props.getstaybyid.stayId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null,
            isDeleted:this.props.getstaybyid.stayId?false:true
            };
        let url = PUT_STAY+ this.props.getstaybyid.stayId;
        if (this.props.getstaybyid.stayId) {
            this.props.putData1(action.PUT_STAY,url,obj);
        }
        else {
            this.props.postData1(action.POST_STAY,POST_STAY,obj);
        }
        this.setState({ validated: false });
    }
    validateForm(errors) {
        debugger
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
      }
      handlevalidations() {
        let countryid = this.props.getstaybyid.countryId?this.props.getstaybyid.countryId:"0";
        let stateid= this.props.getstaybyid.stateId?this.props.getstaybyid.stateId:"0";
        let cityid= this.props.getstaybyid.cityId?this.props.getstaybyid.cityId:"0";
        let rate=this.props.getstaybyid.rateType?this.props.getstaybyid.rateType:"0";

        let countryiderror = validation.selectvalidation(countryid);
        let stateiderror=validation.selectvalidation(stateid);
        let cityiderror=validation.selectvalidation(cityid);
        let rateerror=validation.selectvalidation(rate)
       
        this.setState({
            errors: {
                selectcountry:countryiderror,
                selectstate:stateiderror,
                selectcity:cityiderror,
                selectrate:rateerror
               
            }
        })
        errors.selectcountry=countryiderror;
        errors.selectstate=stateiderror;
        errors.selectcity=cityiderror;
        errors.selectrate=rateerror;
       
      }
    handleSubmit(event)
    {
    event.preventDefault();
    this.handlevalidations();
    const form = event.currentTarget;
    console.log("checkform", form.checkValidity());
    this.setState({ validated: true });
    if (form.checkValidity() === false  || this.validateForm(errors) === false ) {
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        event.preventDefault();
        this.postStaydata();
        this.multiselectRef.current.resetSelectedValues();
    }   
  } 
    /* handlemultiselect(e)
    {
        debugger
        let data= Array.prototype.map.call(e, function(item) { return item.stayTypeId; }).join(",");
       this.setState({
           StayTypeIds:data
       })
       
    } */
    handleReset() {
        this.props.resetData(action.RESET_DATA,"getstaybyid");
        this.multiselectRef.current.resetSelectedValues();
            this.setState({ validated: false });

      }
   async editReacord(id) {
       
        await this.props.getData(action.GET_CITIES,GET_CITIES)
        await  this.props.getData(action.GET_STATES,GET_STATES)
        this.props.getData(action.GET_STAY,GET_STAY);
        this.props.getData(action.GET_STAY_BYID, GET_STAY_BYID+id)
        window.scrollTo({
            top:100,
            behavior: 'smooth',
        })
       /*  let staytypeids=(this.props.getstaybyid.stayTypeIds).split(",");
        var staytypenames1=[]
    
        staytypeids.map(obj=>
            this.state.staytypes.map((item)=>{
                if(parseInt(obj) == item.stayTypeId)
                {
                  staytypenames1.push({stayTypeName:item.stayTypeName,stayTypeId:item.stayTypeId}); //reusability
                }
            }))
    console.log("stays",staytypenames1)
            this.setState({
                staytypenames:staytypenames1
            }) */


    }

    updateStay = (e, paramName) => {

        debugger
        var value
        if(paramName === "stayTypeIds")
        {
            let data= Array.prototype.map.call(e, function(item) { return item.stayTypeId; }).join(",");
            value=data;
        }
        else if(paramName === "countryId")
        {
            this.props.getData(action.GET_STATE_BYCOUNTRYID,GET_STATE_BYCOUNTRYID+e.target.value)
            this.props.updatePropAccData("cityId",undefined,"getstaybyid");
            value=e.target.value;
        }
        else if(paramName === "stateId")
        {
            this.props.getData(action.GET_CITY_STATEID,GET_CITY_STATEID+e.target.value)
            value=e.target.value;
        }
        else
        {
            value=e.target.value;
        }
        this.props.updatePropAccData(paramName,value,"getstaybyid");
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
                                <i class="mdi mdi-wan"></i>
                            </span> Stay Info
                        </h3>
                        
                        <nav aria-label="breadcrumb">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    Stay Info
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                            <div class="col-12 text-right"><span class="text-danger">*</span> <small class="very-small"> Fields Are Mandatory</small></div>
                                <div class="card-body">
                                    <h4 class="card-title">Stay Info</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Name<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getstaybyid.stayName?this.props.getstaybyid.stayName:""}  
                                                        class="form-control"  onChange={(e)=>this.updateStay(e,"stayName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-md-6">
                                            <div class="form-group row">
                                                <label class="col-sm-3 col-form-label">Rate<span class="text-danger">*</span></label>

                                                <div class="col-sm-9">
                                                    <select class="form-control" value={this.props.getstaybyid.rateType ? this.props.getstaybyid.rateType : "0"} onChange={(e) => this.updateStay(e, "rateType")}>
                                                        <option value={0}>Select</option>
                                                        <option value="5 Star">5 Star</option>
                                                        <option value="4 Star">4 Star</option>
                                                        <option value="3 Star">3 Star</option>
                                                        <option value="2 Star">2 Star</option>
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectrate}
                                                                </small>
                                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="row">
                                           
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Stay Type<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                    <Multiselect selectedValues={this.props.staytypeids}  options={this.props.getstaytype} displayValue={"stayTypeName"} 
                                                    class="form-control" onSelect={(e)=>this.updateStay(e,"stayTypeIds")} 
                                                    onRemove={(e)=>this.updateStay(e,"stayTypeIds")}  ref={this.multiselectRef} /> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Contact Number<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <input required type="number" value={this.props.getstaybyid.contactInfo?this.props.getstaybyid.contactInfo:""} 
                                                        class="form-control"  onChange={(e)=>this.updateStay(e,"contactInfo")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Location Details<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getstaybyid.locationDetails?this.props.getstaybyid.locationDetails:""}  
                                                         class="form-control"  onChange={(e)=>this.updateStay(e,"locationDetails")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Country<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.getstaybyid.countryId?this.props.getstaybyid.countryId:"0"} 
                                                    onChange={(e)=>this.updateStay(e,"countryId")}>
                                                        <option value={0}>Select</option>
                                                       {this.props.countries.map(obj=>
                                                      <option value={obj.countryId}>{obj.countryName}</option>
                                                        )}
                                                    </select>
                                                    <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectcountry}
                                                                </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">State<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.getstaybyid.stateId?this.props.getstaybyid.stateId:"0"} 
                                                    onChange={(e)=>this.updateStay(e,"stateId")}>
                                                        <option value={0}>Select</option>
                                                       {(this.props.getstaybyid.countryId?this.props.states:[]).map(obj=>
                                                      <option value={obj.stateId}>{obj.stateName}</option>
                                                        )}
                                                    </select>
                                                    <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectstate}
                                                                </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">City<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode"  value={this.props.getstaybyid.cityId?this.props.getstaybyid.cityId:"0"} 
                                                    onChange={(e)=>this.updateStay(e,"cityId")}>
                                                        <option value={0}>Select</option>
                                                       {(this.props.getstaybyid.stateId?this.props.cities:[]).map(obj=>
                                                      <option value={obj.cityId}>{obj.cityName}</option>
                                                        )}
                                                    </select>
                                                    <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectcity}
                                                                </small>
                                                    </div>
                                                </div>
                                            </div>
                                                          </div>
                                       
                
                                       <div class="row" style={{margin:"auto",textAlign:"center"/* marg:auto;text-align: center} */}}>
                                            <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                                            <button type="reset" class="btn btn-light">Cancel</button>
                                        </div>
                                        <br/>
                                        {this.props.ispostStayLoading || this.props.isputStayLoading?
                                            <Spinner1/>:
                                        <Displayerrormsg message={this.props.message} messageData={this.props.messageData}/>}
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
                                    <div class="table-responsive"></div>
                                      <ReactTable columns={[
                                   
                                  {
                                    Header: "Name",
                                    accessor: "stayName",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                  {
                                    Header: "Rate",
                                    accessor: "rateType",
                                    headerStyle: {
                                        textAlign: 'left',
                                        fontWeight: 'bold'
                                    }
                                    
                                  },
                                 
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: '',
                                    accessor: d => d.stayId,
                                    maxWidth:300,
                                    Cell: row => (
                                      <div className="template-demo">
                                          <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                            <i class="mdi mdi-pencil-outline"></i>
                                          </button>
                                          <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) =>{if(window.confirm('Are you sure to delete this record?')){ this.deleteRecord(row.value)};}} value={row.value} >
                                                            <i class="mdi mdi-delete-outline"></i>
                                          </button>
                                      </div>)

                                  }

                                ]}
                                data={this.props.getstay}
                                showPagination={true}
                                defaultPageSize={25}
                               
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
        getstay:state.goAdvStore.getstay,
        getstaybyid:state.goAdvStore.getstaybyid,
        countries:state.goAdvStore.countries,
        states:state.goAdvStore.states,
        cities:state.goAdvStore.cities,
        getstaytype:state.goAdvStore.getstaytype,
        message: state.goAdvStore.message,
        messageData: state.goAdvStore.messageData,
        getuserbyidprofile:state.goAdvStore.getuserbyidprofile,
        staytypeids:state.goAdvStore.staytypeids,
        ispostStayLoading:state.goAdvStore.ispostStayLoading,
        isputStayLoading:state.goAdvStore.isputStayLoading
           //states:state.goAdvStore.getstatebycountry
            //cities:state.goAdvStore.citybyid
            //cities:state.goAdvStore.citybyid
        }
    }
    export default connect(mapStateToProps, {getData,removedata,postData1,putData1,updatePropAccData,resetData,removeErrormsg,deleteRecord})(Stay);
    
    //export default Stay

