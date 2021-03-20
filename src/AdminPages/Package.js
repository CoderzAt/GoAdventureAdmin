import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import { Link} from "react-router-dom";
import 'react-table-v6/react-table.css';
import {GET_ALL_PACKAGES,GET_PACKAGE_BYID,POST_PACKAGE,PUT_PACKAGE,GET_DESTINATION,GET_USER_BYID,DELETE_PACKAGE,PLACETOVISIT_BYDESTINATION,GET_EVENTTYPE,PACKAGEPLACES,GET_EVENTLEVEL} from '../Shared/Services'
import Sidebar from './Sidebar'
import { Multiselect } from 'multiselect-react-dropdown';
import { connect } from 'react-redux';
import { getData, postData1, putData1,updatePropAccData,resetData,removedata,removeErrormsg, putDataWithFile,postDataWithFile ,deleteRecord} from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'
import Displayerrormsg from '../Shared/DisplayErrorMsg'
//import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import parse from 'html-react-parser'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw ,ContentState, convertFromHTML} from 'draft-js';
import * as validation from "../Shared/Validations";
import Spinner1 from '../Components/Spinner1';



var editorstate='<div>hi<div>';
var errors={}
class Package extends Component {
    constructor(props) {
       super(props);
       this.multiselectRef = React.createRef();
       this.state = {
           validated:false,
          refreshflag:false,
          errors:{
              selecteventlevel:"",
              selectpackagetype:"",
              selectduration:"",
              selectdestination:"",
              urltype:"",
              urlvalidation1:""
          }
       }
    }

    componentWillMount()
    {
      this.props.removeErrormsg()
      this.props.removedata("packagebyid")
    }
    componentDidMount()
    {
        this.props.getData(action.GET_DESTINATION,GET_DESTINATION)
        this.props.getData(action.GET_ALL_PACKAGES,GET_ALL_PACKAGES)
        this.props.getData(action.GET_EVENTTYPE,GET_EVENTTYPE)
        this.props.getData(action.GET_EVENTLEVEL,GET_EVENTLEVEL)
        this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))
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
    componentDidUpdate(prevProps, prevState, snapshotValue) {
        if(this.props.packagebyid.thingsTobring !== prevProps.packagebyid.thingsTobring) {
          if( this.props.packagebyid.thingsTobring) {
            const blocksFromHtml = htmlToDraft(this.props.packagebyid.thingsTobring);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  
            this.setState({
              editorState: EditorState.createWithContent(contentState)
            });
          } else {
            this.setState({
              editorState: EditorState.createEmpty()
            });
          }
        }

        if(this.props.packagebyid.inclusions !== prevProps.packagebyid.inclusions) {
            if( this.props.packagebyid.inclusions) {
              const blocksFromHtml = htmlToDraft(this.props.packagebyid.inclusions);
              const { contentBlocks, entityMap } = blocksFromHtml;
              const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    
              this.setState({
                InclusionseditorState: EditorState.createWithContent(contentState)
              });
            } else {
              this.setState({
                InclusionseditorState: EditorState.createEmpty()
              });
            }
          }

          if(this.props.packagebyid.exclusions !== prevProps.packagebyid.exclusions) {
            if( this.props.packagebyid.exclusions) {
              const blocksFromHtml = htmlToDraft(this.props.packagebyid.exclusions);
              const { contentBlocks, entityMap } = blocksFromHtml;
              const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    
              this.setState({
                ExclusionseditorState: EditorState.createWithContent(contentState)
              });
            } else {
              this.setState({
                ExclusionseditorState: EditorState.createEmpty()
              });
            }
          }
          if(this.props.packagebyid.packageDescription !== prevProps.packagebyid.packageDescription) {
            if( this.props.packagebyid.packageDescription) {
              const blocksFromHtml = htmlToDraft(this.props.packagebyid.packageDescription);
              const { contentBlocks, entityMap } = blocksFromHtml;
              const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    
              this.setState({
                DescriptioneditorState: EditorState.createWithContent(contentState)
              });
            } else {
              this.setState({
                DescriptioneditorState: EditorState.createEmpty()
              });
            }
          }
      }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
      }

      onInclusionsEditorStateChange =(InclusionseditorState)=>
      {
          this.setState({
            InclusionseditorState
          })
      }
      onExclusionsEditorStateChange =(ExclusionseditorState)=>
      {
        this.setState({
            ExclusionseditorState
          })
      }
      DescriptionEditorStateChange=(DescriptioneditorState)=>
      {
        this.setState({
            DescriptioneditorState
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
        bodyFormData.set('PackageName',`${this.props.packagebyid.urltype}/${this.props.packagebyid.url}`);
        bodyFormData.set('displayName', this.props.packagebyid.displayName);
        bodyFormData.set('PackageType', this.props.packagebyid.packageType);
        bodyFormData.set('duration', this.props.packagebyid.duration);
        bodyFormData.set('DestinationId', parseInt(this.props.packagebyid.destinationId));
        //bodyFormData.set('CouponCode', this.props.packagebyid.couponcode);
        //bodyFormData.set('CouponExpiryDate', this.props.packagebyid.couponexpirydate);
        //bodyFormData.set('CouponUserUsageCount', parseInt(this.props.packagebyid.couponuserusagecount));
        //bodyFormData.set('Inclusions', this.props.packagebyid.inclusions);
        bodyFormData.set('Inclusions',draftToHtml(convertToRaw(this.state.InclusionseditorState.getCurrentContent())));
        //bodyFormData.set('places', this.props.packagebyid.placetovisitIds);
        bodyFormData.set('eventLevel',parseInt(this.props.packagebyid.eventLevel));
        //bodyFormData.set('Exclusions', this.props.packagebyid.exclusions);
        bodyFormData.set('Exclusions',draftToHtml(convertToRaw(this.state.ExclusionseditorState.getCurrentContent())));
        bodyFormData.set('thingsTobring',draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
        //bodyFormData.set('PackageDescription', this.props.packagebyid.packageDescription);
        bodyFormData.set('PackageDescription',draftToHtml(convertToRaw(this.state.DescriptioneditorState.getCurrentContent())));
        bodyFormData.set('rating',this.props.packagebyid.rating?this.props.packagebyid.rating:0);
        bodyFormData.set('roots',this.props.packagebyid.roots && this.props.packagebyid.roots !== ""?this.props.packagebyid.roots:null);
        bodyFormData.set('stayTitle',this.props.packagebyid.stayTitle && this.props.packagebyid.stayTitle !==""?this.props.packagebyid.stayTitle:null);
        bodyFormData.set('height',this.props.packagebyid.height && this.props.packagebyid.height !== ""?this.props.packagebyid.height:null);
        bodyFormData.set('bestTime', this.props.packagebyid.bestTime && this.props.packagebyid.bestTime !==""?this.props.packagebyid.bestTime:null);
        bodyFormData.set('ratedUsers',this.props.packagebyid.ratedUsers?this.props.packagebyid.ratedUsers:0);
        bodyFormData.set('createdBy',this.props.packagebyid.packageId?null:this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName);
        bodyFormData.set('modifiedBy',this.props.packagebyid.packageId?this.props.getuserbyidprofile.firstName+" "+this.props.getuserbyidprofile.lastName:null);
        bodyFormData.set('IsDeleted',  false );
        bodyFormData.append('formFile', this.state.formFile?this.state.formFile:null);
       bodyFormData.append('coverPhotoFormFile', this.state.coverPhotoFormFile?this.state.coverPhotoFormFile:null);
        let url = PUT_PACKAGE+ this.props.packagebyid.packageId;
        if (this.props.packagebyid.packageId) {
            this.props.putDataWithFile(action.PUT_PACKAGE,url,bodyFormData);
        }
        else {
            this.props.postDataWithFile(action.POST_PACKAGE,POST_PACKAGE,bodyFormData);
        }
        /* this.setState({
            editorState: EditorState.createEmpty(),
            InclusionseditorState:EditorState.createEmpty(),
            ExclusionseditorState:EditorState.createEmpty(),
            DescriptioneditorState:EditorState.createEmpty()
          }); */
        this.setState({ validated: false });
    }
    validateForm(errors) {
        debugger
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
      }
      handlevalidations() {
        let eventlevelid = this.props.packagebyid.eventLevel?this.props.packagebyid.eventLevel:"0";
        let packagetypeid= this.props.packagebyid.packageType?this.props.packagebyid.packageType:"0";
        let destinationid= this.props.packagebyid.destinationId?this.props.packagebyid.destinationId:"0";
        let duration= this.props.packagebyid.duration?this.props.packagebyid.duration:"0";
        let urltype1=this.props.packagebyid.urltype?this.props.packagebyid.urltype:"0";
        let url1=this.props.packagebyid.url?this.props.packagebyid.url:"";
        
        let eventlevelerror = validation.selectvalidation(eventlevelid);
        let packagetypeiderror=validation.selectvalidation(packagetypeid);
        let destinationerror=validation.selectvalidation(destinationid);
        let durationerror=validation.selectvalidation(duration);
        let urltypeerror=validation.selectvalidation(urltype1)
        let urlerror=validation.urlvalidation(url1)
        this.setState({
            errors: {
              selecteventlevel:eventlevelerror,
              selectpackagetype:packagetypeiderror,
              selectdestination:destinationerror,
              selectduration:durationerror,
              urltype:urltypeerror,
              urlvalidation1:urlerror
            }
        })
        errors.selecteventlevel=eventlevelerror;
        errors.selectpackagetype=packagetypeiderror;
        errors.selectdestination=destinationerror;
        errors.selectduration=durationerror;
        errors.urltype=urltypeerror;
        errors.urlvalidation1=urlerror;
      }

     handleSubmit(event)
    {
        event.preventDefault();
    this.handlevalidations();
    const form = event.currentTarget;
    console.log("checkform", form.checkValidity());
    this.setState({ validated: true });
    if (form.checkValidity() === false  || this.validateForm(errors) === false) {
        event.preventDefault();
        event.stopPropagation();
        window.scrollTo({
            top:100,
            behavior: 'smooth',
        })
    }
    else {
        event.preventDefault();
        this.postPackagedata();
       
        //this.multiselectRef.current.resetSelectedValues();
    }   

    }
    handleReset() {
        this.props.resetData(action.RESET_DATA, "packagebyid");
      /*   this.multiselectRef.current.resetSelectedValues(); */
        this.setState({ validated: false });
        this.setState({
            editorState: EditorState.createEmpty(),
            InclusionseditorState:EditorState.createEmpty(),
            ExclusionseditorState:EditorState.createEmpty(),
            DescriptioneditorState:EditorState.createEmpty()
          });
    }
    saveFile = (e) => {
        debugger
        console.log(e.target.files[0])
        console.log("contentdisposition", e.target.files[0]);
        this.setState({
            formFile: e.target.files[0]
        })
    }
    coverphotosaveFile=(e)=>
    {
        debugger
        console.log(e.target.files[0])
        console.log("contentdisposition", e.target.files[0]);
        this.setState({
            coverPhotoFormFile: e.target.files[0]
        })

        console.log("coeverphoto",e.target.files[0])
    }
    editReacord(id) {
        this.props.getData(action.PLACETOVISIT_BYDESTINATION,PLACETOVISIT_BYDESTINATION+id)
        this.props.getData(action.GET_PACKAGE_BYID, GET_PACKAGE_BYID+id)
        window.scrollTo({
            top:100,
            behavior: 'smooth',
        })
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
  /*   updateThingstobring = (e, paramName) => {

        var value
        if(paramName === "thingsTobring")
        {
            value=draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        }
        else
        {
            value=e.target.value
        }
        this.props.updatePropAccData(paramName,value,"packagebyid");
        this.setState({ refreshflag:!this.state.refreshflag });
    } */
    render() {
        /* editorstate=EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(this.props.packagebyid.thingsTobring?this.props.packagebyid.thingsTobring:'<div><div>')
            )
          ) */
          /* if(this.props.packagebyid.destinationId)
          { 
              debugger
              this.props.getData(action.PLACETOVISIT_BYDESTINATION,PLACETOVISIT_BYDESTINATION+this.props.packagebyid.destinationId)
          }  */
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
                       <div class="col-12 text-right"><span class="text-danger">*</span> <small class="very-small"> Fields Are Mandatory</small></div>
                           <div class="card-body">
                               <h4 class="card-title">Package</h4>
                              
                               <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)} onReset={(e)=>this.handleReset(e)}>
                               <div class="row">
                                   <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Name<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.displayName?this.props.packagebyid.displayName:""} class="form-control" id="placeTypeName" required
                                                             onChange={(e)=>this.updatePackage(e,"displayName")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="type"
                                                        class="col-sm-3 col-form-label">URL Type<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <select type="text" value={this.props.packagebyid.urltype?this.props.packagebyid.urltype:"0"} class="form-control" id="type" required
                                                         onChange={(e)=>this.updatePackage(e,"urltype")}>
                                                            <option value={0}>Select</option>
                                                            <option value="event-details">event-details</option>
                                                            <option value="trips">trips</option>
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.urltype}
                                                                </small>
                                                            </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">URL<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <input type="text"  value={this.props.packagebyid.url?this.props.packagebyid.url:""} class="form-control" id="placeTypeName" required
                                                             onChange={(e)=>this.updatePackage(e,"url")}/>
                                                             <small style={{ color: "red" }}>
                                                                    {this.state.errors.urlvalidation1}
                                                                </small>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="type"
                                                        class="col-sm-3 col-form-label">EventLevel<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <select type="text" value={this.props.packagebyid.eventLevel?this.props.packagebyid.eventLevel:"0"} class="form-control" id="type" required
                                                         onChange={(e)=>this.updatePackage(e,"eventLevel")}>
                                                            <option value={0}>Select</option>
                                                        {this.props.geteventlevel.map(obj=>(
                                                            <option value={obj.eventLevelId}>{obj.eventLevelCode}</option>
                                                        ))}
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selecteventlevel}
                                                                </small>
                                                            </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="type"
                                                        class="col-sm-3 col-form-label">Type<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                        <select type="text" value={this.props.packagebyid.packageType?this.props.packagebyid.packageType:"0"} class="form-control" id="type" required
                                                         onChange={(e)=>this.updatePackage(e,"packageType")}>
                                                            <option value={0}>Select</option>
                                                        {this.props.geteventtype.map(obj=>(
                                                            <option value={obj.eventTypeCode}>{obj.eventTypeCode}</option>
                                                        ))}
                                                                </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectpackagetype}
                                                                </small>
                                                            </div>
                                                </div>
                                            </div>
                                        
                                           
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Duration<span class="text-danger">*</span></label>
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

                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectduration}
                                                                </small>
                                                            </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Destination<span class="text-danger">*</span></label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode" value={this.props.packagebyid.destinationId?this.props.packagebyid.destinationId:"0"} 
                                                    onChange={(e)=>this.updatePackage(e,"destinationId")}>
                                                      <option value={0}>Select</option>
                                                      {this.props.getdestination.map(obj=>
                                                      <option value={obj.destinationId}>{obj.destinationName}</option>
                                                      )}
                                                     </select>
                                                                <small style={{ color: "red" }}>
                                                                    {this.state.errors.selectdestination}
                                                                </small>
                                                            </div>
                                                </div>
                                            </div>
                                           {/*  <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="duration"
                                                        class="col-sm-3 col-form-label">Places</label>
                                                    <div class="col-sm-9">
                                                    <Multiselect selectedValues={this.props.placetovisitbydestinationids}  options={this.props.packagebyid.destinationId?this.props. placetovisitbydestination:[]} displayValue={"placeName"} 
                                                    class="form-control" onSelect={(e)=>this.updatePackage(e,"placetovisitIds")}
                                                     onRemove={(e)=>this.updatePackage(e,"placetovisitIds")} 
                                                     ref={this.multiselectRef}/>
                                                    </div>
                                                </div>
                                            </div> */}
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
                                                    <label for="placeTypeDescription"
                                                        class="col-sm-3 col-form-label">CoverPhoto</label>
                                                        <div class="col-sm-9">
                                                         <span class="input-group-append">
                                                         <input

                                                                  class="file-upload-browse btn btn-gradient-primary"
                                                                    type="file"
                                                                    onChange={this.coverphotosaveFile}/>

                                                        </span>
                                                        </div>
                                                   
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Rating</label>
                                                    <div class="col-sm-9">
                                                        <input type="number" value={this.props.packagebyid.rating?this.props.packagebyid.rating:""} class="form-control" id="placeTypeName"
                                                             onChange={(e)=>this.updatePackage(e,"rating")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">RatedUsers</label>
                                                    <div class="col-sm-9">
                                                        <input type="number" value={this.props.packagebyid.ratedUsers?this.props.packagebyid.ratedUsers:""} class="form-control" id="placeTypeName" 
                                                             onChange={(e)=>this.updatePackage(e,"ratedUsers")}/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Start-End Point</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.roots?this.props.packagebyid.roots:""} class="form-control" id="placeTypeName" 
                                                             onChange={(e)=>this.updatePackage(e,"roots")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Stay Title</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.stayTitle?this.props.packagebyid.stayTitle:""} class="form-control" id="placeTypeName"
                                                             onChange={(e)=>this.updatePackage(e,"stayTitle")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Height</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.height?this.props.packagebyid.height:""} class="form-control" id="placeTypeName" 
                                                             onChange={(e)=>this.updatePackage(e,"height")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Best Time</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" value={this.props.packagebyid.bestTime?this.props.packagebyid.bestTime:""} class="form-control" id="placeTypeName" 
                                                             onChange={(e)=>this.updatePackage(e,"bestTime")}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label"><b>Things ToBring</b></label>
                                                    <div class="col-sm-12">
                                                    <div>

                                                       {/*  <textarea required defaultValue={this.state.viewData.countryDesc} class="form-control" id="placeTypeDescription" rows="4" onChange={(e)=>this.countrydescriptionOperation(e)}></textarea> */}
                                                       <Editor
                                                 editorState={this.state.editorState}
                                                 wrapperClassName="demo-wrapper"
                                                 editorClassName="demo-editor"
                                                 onEditorStateChange={this.onEditorStateChange}
                                                 //onChange={(e)=>this.updateCountry(e,"countryDesc")}
                                                      />

                                                      </div>
                                                  </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label"><b>Inclusions</b></label>
                                                    <div class="col-sm-12">
                                                    <div>

                                                       {/*  <textarea required defaultValue={this.state.viewData.countryDesc} class="form-control" id="placeTypeDescription" rows="4" onChange={(e)=>this.countrydescriptionOperation(e)}></textarea> */}
                                                       <Editor
                                                 editorState={this.state.InclusionseditorState}
                                                 wrapperClassName="demo-wrapper"
                                                 editorClassName="demo-editor"
                                                 onEditorStateChange={this.onInclusionsEditorStateChange}
                                                 //onChange={(e)=>this.updateCountry(e,"countryDesc")}
                                                      />

                                                      </div>
                                                  </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label"><b>Exclusions</b></label>
                                                    <div class="col-sm-12">
                                                    <div>

                                                       {/*  <textarea required defaultValue={this.state.viewData.countryDesc} class="form-control" id="placeTypeDescription" rows="4" onChange={(e)=>this.countrydescriptionOperation(e)}></textarea> */}
                                                       <Editor
                                                 editorState={this.state.ExclusionseditorState}
                                                 wrapperClassName="demo-wrapper"
                                                 editorClassName="demo-editor"
                                                 onEditorStateChange={this.onExclusionsEditorStateChange}
                                                 //onChange={(e)=>this.updateCountry(e,"countryDesc")}
                                                      />

                                                      </div>
                                                  </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group row">
                                                    <label for="placeTypeDescription" class="col-sm-3 col-form-label"><b>Description</b></label>
                                                    <div class="col-sm-12">
                                                    <div>

                                                       {/*  <textarea required defaultValue={this.state.viewData.countryDesc} class="form-control" id="placeTypeDescription" rows="4" onChange={(e)=>this.countrydescriptionOperation(e)}></textarea> */}
                                                       <Editor
                                                 editorState={this.state.DescriptioneditorState}
                                                 wrapperClassName="demo-wrapper"
                                                 editorClassName="demo-editor"
                                                 onEditorStateChange={this.DescriptionEditorStateChange}
                                                 //onChange={(e)=>this.updateCountry(e,"countryDesc")}
                                                      />

                                                      </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                       {/*  
                                        <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Things To Bring</label>
                                                    <div class="col-sm-12">
                                                    <Editor
                                                 editorState={this.state.editorState}
                                                 wrapperClassName="demo-wrapper"
                                                 editorClassName="demo-editor"
                                                 onEditorStateChange={this.onEditorStateChange}
                                                 //onChange={(e)=>this.updateCountry(e,"countryDesc")}
                                                      />
                                                   {/*  <textarea class="form-control" value={this.props.packagebyid.thingsTobring?this.props.packagebyid.thingsTobring:""} id="placeTypeName"
                                                        
                                                             onChange={(e)=>this.updatePackage(e,"thingsTobring")}/>
                                                   </div>
                                                </div>
                                            </div> */}
                                     
                                           {/*  <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="placeTypeName"
                                                        class="col-sm-3 col-form-label">Inclusions</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" value={this.props.packagebyid.inclusions?this.props.packagebyid.inclusions:""} id="placeTypeDescription"
                                                          required  rows="4" onChange={(e)=>this.updatePackage(e,"inclusions")}></textarea>
                                                    </div>
                                                </div>
                                            </div> */}
                                           {/*  <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Exclusions</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" value={this.props.packagebyid.exclusions?this.props.packagebyid.exclusions:""} id="placeTypeDescription"
                                                          required  rows="4" onChange={(e)=>this.updatePackage(e,"exclusions")}></textarea>
                                                    </div>
                                                </div>
                                            </div> */}
                                        
                                        
                                           
                                               {/*  <div class="form-group row">
                                                    <label for="placeTypeDescription"
                                                        class="col-sm-3 col-form-label">Description</label>
                                                    <div class="col-sm-9">
                                                        <textarea class="form-control" value={this.props.packagebyid.packageDescription?this.props.packagebyid.packageDescription:""} id="placeTypeDescription"
                                                          required  rows="4" onChange={(e)=>this.updatePackage(e,"packageDescription")}></textarea>
                                                    </div>
                                                </div> */}
                                           
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
                                        <br/>
                                        {this.props.ispostPackageLoading || this.props.isputPackageLoading?
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
                   <div className="table-responsive">
                   <ReactTable columns={[
                                   /* {
                                        Header: "PackageId",
                                        accessor: "packageId"
                                        
                                    },*/
                                    {
                                        Header: "Display Name",
                                        accessor: "displayName",
                                        headerStyle: {
                                            textAlign: 'left',
                                            fontWeight: 'bold'
                                        }
                                        
                                    },
                                  {
                                    Header: "URL",
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
                                          <button type="button" class="btn btn-icon" value={row.value} >
                                          <Link  to={`/admin/trip/${row.value}`}>Trips</Link>
                                          </button>
                                          <button type="button"  value={row.value} class="btn btn-icon">
                                          <Link  to={`/admin/itenary/${row.value}`}>Itenary</Link>
                                          </button>
                                      </div>)

                                  }
                                ]}
                                data={this.props.packages}
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
          messageData: state.goAdvStore.messageData,
          getuserbyidprofile:state.goAdvStore.getuserbyidprofile,
          placetovisitbydestinationids: state.goAdvStore.placetovisitbydestinationids,
          ispostPackageLoading:state.goAdvStore.ispostPackageLoading,
          isputPackageLoading:state.goAdvStore.isputPackageLoading
        }
      }
      export default connect(mapStateToProps, { getData, postData1,removedata,putData1,updatePropAccData,resetData,removeErrormsg,putDataWithFile,postDataWithFile,deleteRecord })(Package);
    //export default Package

