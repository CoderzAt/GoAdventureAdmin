import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import {postData,loadData,getcities,staypostapi,getstays,getstaybyid,stayupdateapi,getstaytypes,GET_STAY_BYID,GET_STAY,POST_STAY,PUT_STAY,GET_CITIES,GET_STAYTYPE} from '../Shared/Services'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Multiselect } from 'multiselect-react-dropdown';
import Sidebar from './Sidebar'

import { connect } from 'react-redux';
import {getData,postData1,putData1,updatePropAccData,resetData,removeErrormsg} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'




import {gettingMultiselectValues} from '../Shared/ReauasbleFunctions'
import { act } from 'react-dom/test-utils';
/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */
/*import './assets/images/favicon.ico'
import './assets/vendors/js/vendor.bundle.base.js'
import './assets/vendors/chart.js/Chart.min.js'
import './assets/js/off-canvas.js'
import '././assets/js/hoverable-collapse.js'
import './assets/js/misc.js'
import './assets/js/dashboard.js'
import './assets/js/todolist.js'*/

var condition=false;
class Stay extends Component {
    constructor(props) {
        super(props);
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
           staytypenames:[]
           
       }
    }
    componentWillMount()
    {
      this.props.removeErrormsg()
   }
   componentDidMount()
     {
      this.props.getData(action.GET_STAY,GET_STAY)
      this.props.getData(action.GET_CITIES,GET_CITIES)
      this.props.getData(action.GET_STAYTYPE,GET_STAYTYPE)
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
   
    
    async editReacord(id)
    { 
        debugger
        
        let url=getstaybyid+id;
        let editdata=await loadData(url)
        this.setState({
            editData:editdata
        })

       
        this.setState({
            stayName:editdata.stayName,
            rateType:editdata.rateType,
            stayTypeIds:editdata.stayTypeIds,
            contactInfo:editdata.contactInfo,
            locationDetails:editdata.locationDetails
           })
    } 
    /* deleteRecord(id)
    {
        alert("in delete id no is"+id)
        fetch(deletecountry+id, {
            method: 'DELETE'
          });

    }*/
 
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
            contactInfo:this.props.getstaybyid.locationDetails,
            locationDetails:this.props.getstaybyid.locationDetails,
            cityId:this.props.getstaybyid.cityId*1,
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
        this.postStaydata();
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
            this.setState({ validated: false });
      }
    editReacord(id) {
        this.props.getData(action.GET_STAY,GET_STAY);
        this.props.getData(action.GET_STAY_BYID, GET_STAY_BYID+id)

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
        var value
        if(paramName === "stayTypeIds")
        {
            let data= Array.prototype.map.call(e, function(item) { return item.stayTypeId; }).join(",");
            value=data;
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
                            </span> StayInfo
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
                                    StayInfo
                                </li>
                            </ul>
                        </nav>
                    </div> 
                    <div class="row">
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">StayInfo</h4>
                                    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                                    <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">StayName</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getstaybyid.stayName?this.props.getstaybyid.stayName:""}  
                                                        class="form-control"  onChange={(e)=>this.updateStay(e,"stayName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">RateType</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getstaybyid.rateType?this.props.getstaybyid.rateType:""} 
                                                        class="form-control" onChange={(e)=>this.updateStay(e,"rateType")}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                           
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">StayTypeIds</label>
                                                    <div class="col-sm-9">
                                                    <Multiselect selectedValues={this.props.staytypeids}  options={this.props.getstaytype} displayValue={"stayTypeName"} 
                                                    class="form-control" onSelect={(e)=>this.updateStay(e,"stayTypeIds")} onRemove={(e)=>this.updateStay(e,"stayTypeIds")} /> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">ContactInfo</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getstaybyid.contactInfo?this.props.getstaybyid.contactInfo:""} 
                                                        class="form-control"  onChange={(e)=>this.updateStay(e,"contactInfo")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label">Location Details</label>
                                                    <div class="col-sm-9">
                                                        <input required type="text" value={this.props.getstaybyid.locationDetails?this.props.getstaybyid.locationDetails:""}  
                                                         class="form-control"  onChange={(e)=>this.updateStay(e,"locationDetails")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">City</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode"  value={this.props.getstaybyid.cityId?this.props.getstaybyid.cityId:"0"} 
                                                    onChange={(e)=>this.updateStay(e,"cityId")}>
                                                        <option value={0}>Select</option>
                                                       {this.props.cities.map(obj=>
                                                      <option value={obj.cityId}>{obj.cityName}</option>
                                                        )}
                                                    </select>
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
                                    <h4 class="card-title">List</h4>
                                    <div class="table-responsive"></div>
                                      <ReactTable columns={[
                                   
                                  {
                                    Header: "Name",
                                    accessor: "stayName"
                                    
                                  },
                                  {
                                    Header: "RateType",
                                    accessor: "rateType"
                                    
                                  },
                                  {
                                    Header: "StayType",
                                    accessor: "stayType"
                                    
                                  },
                                  {
                                    id:'id', // Required because our accessor is not a string
                                    Header: 'Actions',
                                    accessor: d => d.stayId,
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
                                data={this.props.getstay}
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
        getstay:state.goAdvStore.getstay,
        getstaybyid:state.goAdvStore.getstaybyid,
        cities:state.goAdvStore.cities,
        getstaytype:state.goAdvStore.getstaytype,
        message: state.goAdvStore.message,
          messageData: state.goAdvStore.messageData,
          staytypeids:state.goAdvStore.staytypeids
           //states:state.goAdvStore.getstatebycountry
            //cities:state.goAdvStore.citybyid
            //cities:state.goAdvStore.citybyid
        }
    }
    export default connect(mapStateToProps, {getData,postData1,putData1,updatePropAccData,resetData,removeErrormsg})(Stay);
    
    //export default Stay

