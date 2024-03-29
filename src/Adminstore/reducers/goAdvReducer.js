import * as actions from '../actions/actionTypes';
import moment from 'moment'

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { Redirect } from 'react-router-dom';

const HandlingError=(payload,paramName,actiontype)=>
{
    debugger
    let msgData = {};
    if (payload.statusText === "error") {
        if (payload.error.response.status === 400) {
            msgData.message = payload.error.response.data;
            msgData.isSuccess = false;
        }
        else if (payload.error.response.status === 500) {
            msgData.message = [{ message: "internal server" }];
            msgData.isSuccess = false;
        }
        else if(payload.error.response.status === 401)
        {
            window.open("/admin/login-1","_self")
        }
    } else {
        msgData.message = [{ message: `${paramName} ${actiontype} successfully`}];
        msgData.isSuccess = true;
        //updatedata.push(payload)
    }

    return msgData;

}

const deleteMsgHandling=(payload,param)=>
{
    let msgData = {};
    if(payload.statusText === "error") {
    msgData.message = [{message:`Error while delting the ${param}`}];
    msgData.isSuccess = false;
    } else {
    msgData.message =  [{message:`${param} deleted successfully.`}];
    msgData.isSuccess = true;
    }

    return msgData;

}

const initalState ={
    isPkgLoading: false,
    packages:[],
    accessories:[],
    calendar:[],
    itenary:[],
    packagebyid:[],
    putpackage:[],
    postpackage:[],
    activities:[],
    cities:[],
    countries:[],
    postcountry:[],
    putcountry:[],
    states:[],
    citybyid:[],
    cityData: {},
    citybystate:[],
    getcountrybyid:[],
    coupons:[],
    couponbyid:[],
    postcoupon:[],
    putcoupon:[],
    postcity:[],
    putcity:[],
    postaccesory:[],
    putaccessory:[],
    getaccessorybyid:[],
    postactivity:[],
    putactivity:[],
    getactivitybyid:[],
    getallcostcentres:[],
    getcostcentrebyid:[],
    postcostcentre:[],
    putcostcentre:[],
    geteventlevel:[],
    geteventlevelbyid:[],
    posteventlevel:[],
    puteventlevel:[],
    getstatus:[],
    geteventtype:[],
    geteventtypebyid:[],
    posteventtype:[],
    puteventtype:[],
    getitenary:[],
    getitenarybyid:[],
    geteditorState:EditorState.createEmpty(),
    putitenary:[],
    postitenary:[],
    getplcetovisit:[],
    postplacetovisit:[],
    putplacetovisit:[],
    getplacetovisitbyid:[],
    getdestination:[],
    getdestinationbyid:[],
    putdestination:[],
    postdestination:[],
    placetype:[],
    postplacetype:[],
    getplacetypebyid:[],
    putplacetype:[],
    getstatebycountry:[],
    deletecountry:[],
    poststate:[],
    putstate:[],
    getstatebyid:[],
    getstay:[],
    putstay:[],
    poststay:[],
    getstaybyid:[],
    getstaytype:[],
    getstaytypebyid:[],
    putstaytype:[],
    poststaytype:[],
    gettravelinfo:[],
    gettravelinfobyid:[],
    puttravelinfo:[],
    posttravelinfo:[],
    gettraveltype:[],
    gettraveltypebyid:[],
    posttraveltype:[],
    puttraveltype:[],
    staytypeids:[],
    traveltypeids:[],
    message: false,
    messageData: {},
    gettripbypackageid:[],
    gettripbyid:[],
    gettrip:[],
    posttrip:[],
    puttrip:[],
    gettripcostcenterbytripid:[],
    gettripcostcenterbyid:[],
    gettripcostcenter:[],
    posttripcostcenter:[],
    puttripcostcenter:[],
    deletetripcostcenter:[],
    getbooking:[],
    getbookingbyid:[],
    putbooking:[],
    postboking:[],
    getuser:[],
    getuserbyid:[],
    postuser:[],
    putuser:[],
    activityids:[],
    accessoryids:[],
    deletepackage:[],
    deleteaccessory:[],
    deletetrip:[],
    deleteitenary:[],
    deleteactivity:[],
    deletecostcenter:[],
    deletecity:[],
    deletecoupon:[],
    deleteeventlevel:[],
    deletestate:[],
    deletestatus:[],
    deleteeventtype:[],
    deleteplacetovisit:[],
    deletebooking:[],
    deleteplacetype:[],
    deletestay:[],
    deletestaytype:[],
    deletetravelinfo:[],
    deletetraveltype:[],
    deletedestination:[],
    getplaceactivities:[],
    getplaceactivitiesbyid:[],
    postplaceactivities:[],
    putplaceactivities:[],
    deleteplaceactivities:[],
    gettreckleaders:[],
    accessorybookings:[],
    putaccessorybooking:[],
    accessorybookingbyid:[],
    postaccessorybooking:[],
    deleteaccessorybooking:[],
    getaccessorybookingbyaccessoryid:[],
    getaccessarytype:[],
    placetovisitbydestination:[],
    deleteuser:[],
    usertypes:[],
    getpayement:[],
    getpayementbyid:[],
    postpayement:[],
    putpayement:[],
    deletepayment:[],
    placetovisitfunctionaldata:[],
    getbookingtotatamount:"",
    logintoken:"",
    userid:0,
    loginmsgdata:[],
    getstatusbytype:[],
    getPickupanddrop:[],
    padbyid:[],
    getbookingoptions:[],
    getuserbyidprofile:[],
    placetovisitbydestinationids:[],
    getbookingbyidtri:[],
    ispostCountryLoading:false,
    isputCountryLoading:false,
    ispostPackageLoading:false,
    isputPackageLoading:false,
    ispostTripLoading:false,
    isputTripLoading:false,
    ispostItenaryLoading:false,
    isputItenaryLoading:false,
    ispostTripcostcenterLoading:false,
    isputTripcostcenterLoading:false,
    ispostAccessoryLoading:false,
    isputAccessoryLoading:false,
    ispostBookingLoading:false,
    isputBookingLoading:false,
    ispostCityLoading:false,
    isputCityLoading:false,
    ispostCouponLoading:false,
    isputCouponLoading:false,
    ispostDestinationLoading:false,
    isputDestinationLoading:false,
    ispostEventlevelLoading:false,
    isputEventlevelLoading:false,
    ispostEventtypeLoading:false,
    isputEventtypeLoading:false,
    ispostpayementLoading:false,
    isputpayementLoading:false,
    ispostPlaceactivitiesLoading:false,
    isputPlaceactivitiesLoading:false,
    ispostPlacetovisitLoading:false,
    isputPlacetovisitLoading:false,
    ispostStateLoading:false,
    isputStateLoading:false,
    ispostStayLoading:false,
    isputStayLoading:false,
    ispostStaytypeLoading:false,
    isputStaytypeLoading:false,
    isposttTravelinfoLoading:false,
    isputTravelinfoLoading:false,
    ispostTraveltypeLoading:false,
    isputTraveltypeLoading:false,
    ispostUserLoading:false,
    isputUserLoading:false
}
const goAdvReducer = (state =initalState, action) => {
    console.log(action.type);
    switch(action.type) {
        case `${actions.GET_AMOUNT_BYBOOKING}_PENDING` : {
            return{
                ...state,
                isBTMLoading: true
            }
        }
        case `${actions.GET_AMOUNT_BYBOOKING}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Total amount","fetched")
            debugger
            let totalamount=state.getbookingbyid
            if(msgData.isSuccess)
            {
             totalamount["totalAmount"]=action.payload.data.totalAmount;
             totalamount["depositAmount"]=action.payload.data.depositAmount;
            }
            return{
                ...state,
                isBTMLoading: false,
                //getbookingtotatamount: action.payload.data.totalAmount,
                getbookingbyid:totalamount,
                message: true,
                messageData: msgData,
            }
        }
        case `${actions.GET_AMOUNT_BYBOOKING}_REJECTED` : {
            return{
                ...state,
                isBTMLoading: false,
            }
        }
        case `${actions.GET_ALL_PACKAGES}_PENDING` : {
            return{
                ...state,
                isPkgLoading: true
            }
        }
        case `${actions.GET_ALL_PACKAGES}_FULFILLED` : {
            return{
                ...state,
                isPkgLoading: false,
                packages: action.payload.data
                
            }
        }
        case `${actions.GET_ALL_PACKAGES}_REJECTED` : {
            return{
                ...state,
                isPkgLoading: false,
            }
        }
        case `${actions.GET_BOOKING_BYID_TABLE}_PENDING` : {
            return{
                ...state,
                isbookingbyidtableLoading: true
            }
        }
        case `${actions.GET_BOOKING_BYID_TABLE}_FULFILLED` : {
            return{
                ...state,
                isbookingbyidtableLoading: false,
                getbooking:[action.payload.data]
            }
        }
        case `${actions.GET_BOOKING_BYID_TABLE}_REJECTED` : {
            return{
                ...state,
                isbookingbyidtableLoading: false,
            }
        }
        
        case `${actions.GET_PICKUPANDDROP}_PENDING` : {
            return{
                ...state,
                isPadLoading: true
            }
        }
        
        case `${actions.GET_PICKUPANDDROP}_FULFILLED` : {
            return{
                ...state,
                isPadLoading: false,
                getPickupanddrop:action.payload.data
            }
        }
        case `${actions.GET_PICKUPANDDROP}_REJECTED` : {
            return{
                ...state,
                isPadLoading: false,
            }
        }
        case `${actions.GET_BOOKING_BYID_TRIP}_PENDING` : {
            return{
                ...state,
                isBbidTtpLoading: true
            }
        }
        
        case `${actions.GET_BOOKING_BYID_TRIP}_FULFILLED` : {
            return{
                ...state,
                isBbidTtpLoading: false,
                getbookingbyidtrip:action.payload.data
            }
        }
        case `${actions.GET_BOOKING_BYID_TRIP}_REJECTED` : {
            return{
                ...state,
                isBbidTtpLoading: false,
            }
        }
        case `${actions.GET_PICKUPANDDROPBYID}_PENDING` : {
            return{
                ...state,
                isPadbyidLoading: true
            }
        }
        case `${actions.GET_PICKUPANDDROPBYID}_FULFILLED` : {
            return{
                ...state,
                isPadbyidLoading: false,
                padbyid: action.payload.data
            }
        }
        case `${actions.GET_PICKUPANDDROPBYID}_REJECTED` : {
            return{
                ...state,
                isPadbyidLoading: false,
            }
        }
        case `${actions.GET_STATUS_BYTYPE}_PENDING` : {
            return{
                ...state,
                isstatusbytypeLoading: true
            }
        }
        case `${actions.GET_STATUS_BYTYPE}_FULFILLED` : {
            return{
                ...state,
                isstatusbytypeLoading: false,
                getstatusbytype: action.payload.data
            }
        }
        case `${actions.GET_STATUS_BYTYPE}_REJECTED` : {
            return{
                ...state,
                isstatusbytype: false,
            }
        }
        case `${actions.ACCESSARY_TYPE}_PENDING` : {
            return{
                ...state,
                isPkgLoading: true
            }
        }
        case `${actions.ACCESSARY_TYPE}_FULFILLED` : {
            return{
                ...state,
                isPkgLoading: false,
                getaccessarytype: action.payload.data
            }
        }
        case `${actions.ACCESSARY_TYPE}_REJECTED` : {
            return{
                ...state,
                isPkgLoading: false,
            }
        }
        case `${actions.PUT_PACKAGE}_PENDING` : {
            return{
                ...state,
                isputPackageLoading: true
            }
        }
        case `${actions.PUT_PACKAGE}_FULFILLED` : {
            debugger
            let msgData=HandlingError(action.payload,"Package","updated")
            return{
                ...state,
                isputPackageLoading: false,
                putpackage: action.payload.data,
                message: true,
                messageData: msgData,
                packagebyid:action.payload.statusText === "error"?state.packagebyid:{}
            }
        }
        case `${actions.PUT_PACKAGE}_REJECTED` : {
            return{
                ...state,
                isputPackageLoading: false,
            }
        }
        case `${actions.POST_PACKAGE}_PENDING` : {
            return{
                ...state,
                ispostPackageLoading: true
            }
        }
        case `${actions.POST_PACKAGE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Package","added")
            return{
                ...state,
                ispostPackageLoading: false,
                posttpackage: action.payload.data,
                message: true,
                messageData: msgData,
                packagebyid:action.payload.statusText === "error"?state.packagebyid:{}

            }
        }
        case `${actions.POST_PACKAGE}_REJECTED` : {
            return{
                ...state,
                ispostPackageLoading: false,
            }
        }
        case `${actions.POST_PICKUPANDDROP}_PENDING` : {
            return{
                ...state,
                ispostPadLoading: true
            }
        }
        case `${actions.POST_PICKUPANDDROP}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Pickup and Drop","added")
            return{
                ...state,
                ispostPadLoading: false,
                postpickupanddrop: action.payload.data,
                message: true,
                messageData: msgData,
                padbyid:action.payload.statusText === "error"?state.padbyid:{}

            }
        }
        case `${actions.POST_PICKUPANDDROP}_REJECTED` : {
            return{
                ...state,
                ispostPadLoading: false,
            }
        }
        case `${actions.PUT_PICKUPANDDROP}_PENDING` : {
            return{
                ...state,
                isputPadLoading: true
            }
        }
        case `${actions.PUT_PICKUPANDDROP}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Pickup And Drop","updated")
            return{
                ...state,
                isputPadLoading: false,
                putpickupanddrop: action.payload.data,
                message: true,
                messageData: msgData,
                padbyid:action.payload.statusText === "error"?state.padbyid:{}

            }
        }
        case `${actions.PUT_PICKUPANDDROP}_REJECTED` : {
            return{
                ...state,
                isputPadLoading: false,
            }
        }
        case `${actions.GET_ALL_ACCESSORIES}_PENDING` : {
            return{
                ...state,
                isAccLoading: true
            }
        }
        case `${actions.GET_ALL_ACCESSORIES}_FULFILLED` : {
            return{
                ...state,
                isAccLoading: false,
                accessories: action.payload.data
            }
        }
        case `${actions.GET_ALL_ACCESSORIES}_REJECTED` : {
            return{
                ...state,
                isAccLoading: false,
            }
        }
        case `${actions.GET_ACCESSORY_BYTYPE}_PENDING` : {
            return{
                ...state,
                isAccLoading: true
            }
        }
        case `${actions.GET_ACCESSORY_BYTYPE}_FULFILLED` : {
            return{
                ...state,
                isAccLoading: false,
                accessories: action.payload.data
            }
        }
        case `${actions.GET_ACCESSORY_BYTYPE}_REJECTED` : {
            return{
                ...state,
                isAccLoading: false,
            }
        }
        case `${actions.GET_CALENDAR}_PENDING` : {
            return{
                ...state,
                isCalLoading: true
            }
        }
        case `${actions.GET_CALENDAR}_FULFILLED` : {
            return{
                ...state,
                isCalLoading: false,
                calendar: action.payload.data
            }
        }
        case `${actions.GET_CALENDAR}_REJECTED` : {
            return{
                ...state,
                isCalLoading: false,
            }
        }
        case `${actions.GET_ITENARY_BYPACKAGEID}_PENDING` : {
            debugger
            return{
                ...state,
                isItebypidLoading: true
            }
        }
        case `${actions.GET_ITENARY_BYPACKAGEID}_FULFILLED` : {
            debugger
            console.log("itenarybypackageid",action.payload.data)
            return{
                ...state,
                isItebypidLoading: false,
                getitenary: action.payload.data
            }
        }
        case `${actions.GET_ITENARY_BYPACKAGEID}_REJECTED` : {
            return{
                ...state,
                isItebypidLoading: false,
            }
        }
        case `${actions.GET_PACKAGE_BYID}_PENDING` : {

            return{
                ...state,
                isPkgbidLoading: true
            }
        }
        case `${actions.GET_PACKAGE_BYID}_FULFILLED` : {
            debugger
            var places1=[]
            var packagebyid1=action.payload.data;
            let packagename=action.payload.data.packageName
            var urlarray=packagename.split('/')
            var urltype=urlarray[0]
            var url =urlarray[1]
             packagebyid1.url=url;
             packagebyid1.urltype=urltype;
            if(action.payload.data.places)
            {
                let placetovisitids=(action.payload.data.places).split(",");
                placetovisitids.map(obj=>
                state.placetovisitbydestination.map((item)=>{
                    if(parseInt(obj) == item.stayTypeId) {
                      places1.push({placeName:item.placeName,placeId:item.placeId}); //reusability
                    }
                }))
            }


            return{
                ...state,
                isPkgbidLoading: false,
                packagebyid: packagebyid1,
                placetovisitbydestinationids:places1
            }
        }
        case `${actions.GET_PACKAGE_BYID}_REJECTED` : {
            return{
                ...state,
                isPkgbidLoading: false,
            }
        }
        case `${actions.GET_TRIP_BYPACKAGEID}_PENDING` : {
            return{
                ...state,
                isTrbpidLoading: true
            }
        }
        case `${actions.GET_TRIP_BYPACKAGEID}_FULFILLED` : {
            return{
                ...state,
                isTrbpidLoading: false,
                gettrip: action.payload.data
            }
        }
        case `${actions.GET_TRIP_BYPACKAGEID}_REJECTED` : {
            return{
                ...state,
                isTrbpidLoading: false,
            }
        }
        case `${actions.GET_TRIP_BYID}_PENDING` : {
            return{
                ...state,
                isTrbidLoading: true
            }
        }
        case `${actions.GET_TRIP_BYID}_FULFILLED` : {
              
            let staytypeids=(action.payload.data.stayTypeIds).split(",");
            var staytypenames1=[]

            staytypeids.map(obj=>
                state.getstaytype.map((item)=>{
                    if(parseInt(obj) == item.stayTypeId) {
                      staytypenames1.push({stayTypeName:item.stayTypeName,stayTypeId:item.stayTypeId}); //reusability
                    }
                }))

                let traveltypeids=(action.payload.data.travelTypeIds).split(",")
                var traveltypenames=[]
                traveltypeids.map(obj=>
                    state.gettraveltype.map((item)=>{
                        if(parseInt(obj) == item.travelTypeId) {
                          traveltypenames.push({travelTypeName:item.travelTypeName,travelTypeId:item.travelTypeId}); //reusability
                        }
                    }))
            let getTripDet = action.payload.data;
            if(getTripDet.startDate) {
              getTripDet.startDate = moment(getTripDet.startDate).format('YYYY-MM-DD');
            }
            if(getTripDet.endDate) {
              getTripDet.endDate = moment(getTripDet.endDate).format('YYYY-MM-DD');
            }
            if(getTripDet.couponExpiryDate) {
                getTripDet.couponExpiryDate = moment(getTripDet.couponExpiryDate).format('YYYY-MM-DD');
              }
              
            console.log(getTripDet);
            return{
                ...state,
                isTrbidLoading: false,
                gettripbyid: getTripDet,
                staytypeids:staytypenames1,
                traveltypeids:traveltypenames
            }
        }
        case `${actions.GET_TRIP_BYID}_REJECTED` : {
            return{
                ...state,
                isTrbidLoading: false,
            }
        }
        case `${actions.REPLICATE_TRIP_BYID}_PENDING` : {
            return{
                ...state,
                isTrbidLoading: true
            }
        }
        case `${actions.REPLICATE_TRIP_BYID}_FULFILLED` : {
            debugger
            let staytypeids=(action.payload.data.stayTypeIds).split(",");
            var staytypenames1=[]

            staytypeids.map(obj=>
                state.getstaytype.map((item)=>{
                    if(parseInt(obj) == item.stayTypeId) {
                      staytypenames1.push({stayTypeName:item.stayTypeName,stayTypeId:item.stayTypeId}); //reusability
                    }
                }))

                let traveltypeids=(action.payload.data.travelTypeIds).split(",")
                var traveltypenames=[]
                traveltypeids.map(obj=>
                    state.gettraveltype.map((item)=>{
                        if(parseInt(obj) == item.travelTypeId) {
                          traveltypenames.push({travelTypeName:item.travelTypeName,travelTypeId:item.travelTypeId}); //reusability
                        }
                    }))
            let getTripDet = action.payload.data;
            if(getTripDet.startDate) {
              getTripDet.startDate = moment(getTripDet.startDate).format('YYYY-MM-DD');
            }
            if(getTripDet.endDate) {
              getTripDet.endDate = moment(getTripDet.endDate).format('YYYY-MM-DD');
            }
            if(getTripDet.couponExpiryDate) {
                getTripDet.couponExpiryDate = moment(getTripDet.couponExpiryDate).format('YYYY-MM-DD');
              }
              getTripDet.tripId=undefined;
              getTripDet.statusId=undefined;
            console.log(getTripDet);
            return{
                ...state,
                isTrbidLoading: false,
                gettripbyid: getTripDet,
                staytypeids:staytypenames1,
                traveltypeids:traveltypenames
            }
        }
        case `${actions.REPLICATE_TRIP_BYID}_REJECTED` : {
            return{
                ...state,
                isTrbidLoading: false,
            }
        }
        case `${actions.GET_AVCTIVITIES}_PENDING` : {
            return{
                ...state,
                isActLoading: true
            }
        }
        case `${actions.GET_AVCTIVITIES}_FULFILLED` : {
            return{
                ...state,
                isActLoading: false,
                activities: action.payload.data
            }
        }
        case `${actions.GET_AVCTIVITIES}_REJECTED` : {
            return{
                ...state,
                isActLoading: false,
            }
        }
        case `${actions.GET_CITIES}_PENDING` : {
            return{
                ...state,
                isCityLoading: true
            }
        }
        case `${actions.GET_CITIES}_FULFILLED` : {
            return{
                ...state,
                isCityLoading: false,
                cities: action.payload.data
            }
        }
        case `${actions.GET_CITIES}_REJECTED` : {
            return{
                ...state,
                isCityLoading: false,
            }
        }
        case `${actions.GET_COUNTRIES}_PENDING` : {
            return{
                ...state,
                isCountryLoading: true
            }
        }
        case `${actions.RESET_DATA}` : {
            let updatedCityData = {cityId: 0};
            updatedCityData[action.payload.promName] = action.payload.value;
            return{
                ...state,
                        [action.payload.propName]: updatedCityData,
                        traveltypeids:{},
                        staytypeids:{},
                        accessoryids:{},
                        activityids:{},
                        messageData:{},
                        message:false

            }
        }
        case `${actions.GET_COUNTRIES}_FULFILLED` : {
            return{
                ...state,
                isCoutryLoading: false,
                countries: action.payload.data
            }
        }
        case `${actions.GET_COUNTRIES}_REJECTED` : {
            return{
                ...state,
                isCountryLoading: false,
            }
        }
        case `${actions.POST_COUNTRY}_PENDING` : {
            return{
                ...state,
                ispostCountryLoading: true
            }
        }
        case `${actions.POST_COUNTRY}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Country","added")
            return{
                ...state,
                ispostCountryLoading: false,
                postcountry: action.payload.data,
                message: true,
                messageData: msgData,
                getcountrybyid: action.payload.statusText === "error"?state. getcountrybyid:{}

            }
        }
        case `${actions.POST_COUNTRY}_REJECTED` : {
            return{
                ...state,
                ispostCountryLoading: false,
            }
        }
        case `${actions.PUT_COUNTRY}_PENDING` : {
            return{
                ...state,
                isputCountryLoading: true
            }
        }
        case `${actions.PUT_COUNTRY}_FULFILLED` : {

           let msgData=HandlingError(action.payload,"Country","updated")
            return{
                ...state,
                isputCountryLoading: false,
                putcountry: action.payload.data,
                message: true,
                messageData: msgData,
                getcountrybyid: action.payload.statusText === "error"?state.getcountrybyid:{}
            }
        }
        case `${actions.PUT_COUNTRY}_REJECTED` : {
            return{
                ...state,
                isputCountryLoading: false,
            }
        }
        case `${actions.DELETE_COUNTRY}_PENDING` : {
            return{
                ...state,
                isdeleteCountryLoading: true
            }
        }
        case `${actions.DELETE_COUNTRY}_FULFILLED` : {
            debugger
           let msgData =deleteMsgHandling(action.payload,"Country")

            return{
                ...state,
                isdeleteCountryLoading: false,
                deletecountry:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_COUNTRY}_REJECTED` : {
            return{
                ...state,
                isdeleteCountryLoading: false,
            }
        }
        case `${actions.DELETE_PICKUPANDDROP}_PENDING` : {
            return{
                ...state,
                isdeletePadLoading: true
            }
        }
        case `${actions.DELETE_PICKUPANDDROP}_FULFILLED` : {
            debugger
           let msgData =deleteMsgHandling(action.payload,"PickupandDrop")

            return{
                ...state,
                isdeletePadLoading: false,
                deletepickupanddrop:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_PICKUPANDDROP}_REJECTED` : {
            return{
                ...state,
                isdeletePadLoading: false,
            }
        }
        case `${actions.GET_CITY_BYID}_PENDING` : {
            return{
                ...state,
                isCitybyidLoading: true
            }
        }
        case `${actions.GET_CITY_BYID}_FULFILLED` : {
            let stateid=action.payload.data.stateId;
            let citydata=action.payload.data;

                let countryId
                state.states.map(obj=>{
                    if(obj.stateId === stateid)
                    {
                        countryId=obj.countryId
                    }
                })
             citydata["countryId"]=countryId

            return{
                ...state,
                isCitybyidLoading: false,
                citybyid: action.payload.data,
                cityData: citydata/* action.payload.data */,
                message: false
            }
        }
        case `${actions.GET_CITY_BYID}_REJECTED` : {
            return{
                ...state,
                isCitybyidLoading: false,
            }
        }
        case `${actions.GET_CITY_STATEID}_PENDING` : {
            return{
                ...state,
                isCitybystateLoading: true
            }
        }
        case `${actions.GET_CITY_STATEID}_FULFILLED` : {
            return{
                ...state,
                isCitybystateLoading: false,
                cities: action.payload.data
            }
        }
        case `${actions.GET_CITY_STATEID}_REJECTED` : {
            return{
                ...state,
                isCitybystateLoading: false,
            }
        }
        case `${actions.GET_COUNTRY_BYID}_PENDING` : {
            return{
                ...state,
                isCountrybyidLoading: true
            }
        }
        case `${actions.GET_COUNTRY_BYID}_FULFILLED` : {
            return{
                ...state,
                isCitybystateLoading: false,
                getcountrybyid: action.payload.data
            }
        }
        case `${actions.GET_COUNTRY_BYID}_REJECTED` : {
            return{
                ...state,
                isCountrybyidLoading: false,
            }
        }
        case `${actions.GET_ALL_COUPON}_PENDING` : {
            return{
                ...state,
                isCouponLoading: true
            }
        }
        case `${actions.GET_ALL_COUPON}_FULFILLED` : {
            return{
                ...state,
                isCitybystateLoading: false,
                coupons: action.payload.data
            }
        }
        case `${actions.GET_ALL_COUPON}_REJECTED` : {
            return{
                ...state,
                isCouponLoading: false,
            }
        }
        case `${actions.GET_COUPON_BYID}_PENDING` : {
            return{
                ...state,
                isCouponLoading: true
            }
        }
        case `${actions.GET_COUPON_BYID}_FULFILLED` : {
            var couponbyid1= action.payload.data
            if(action.payload.data.couponValue === null)
            {
                couponbyid1["parcentageorvalue"]="percentage"
                couponbyid1["hidepercentage"]=""
                couponbyid1["hidevalue"]="true"

            }
            else if(action.payload.data.couponPercentage === null)
            {
                couponbyid1["parcentageorvalue"]="value"
                couponbyid1["hidepercentage"]="true"
                couponbyid1["hidevalue"]=""
            }
            return{
                ...state,
                isCouponLoading: false,
                couponbyid:couponbyid1
            }
        }
        case `${actions.GET_COUPON_BYID}_REJECTED` : {
            return{
                ...state,
                isCouponLoading: false,
            }
        }
        case `${actions.POST_COUPON}_PENDING` : {
            return{
                ...state,
                ispostCouponLoading: true
            }
        }
        case `${actions.POST_COUPON}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Coupon","added")
            return{
                ...state,
                ispostCouponLoading: false,
                postcoupon: action.payload.data,
                message: true,
                messageData: msgData,
                couponbyid:action.payload.statusText === "error"?state.couponbyid:{}

            }
        }
        case `${actions.POST_COUPON}_REJECTED` : {
            return{
                ...state,
                ispostCouponLoading: false,
            }
        }
        case `${actions.PUT_COUPON}_PENDING` : {
            return{
                ...state,
                isputCouponLoading: true
            }
        }
        case `${actions.PUT_COUPON}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Coupon","updated")
            return{
                ...state,
                isputCouponLoading: false,
                putcoupon: action.payload.data,
                message: true,
                messageData: msgData,
                couponbyid:action.payload.statusText === "error"?state.couponbyid:{}
            }
        }
        case `${actions.PUT_COUPON}_REJECTED` : {
            return{
                ...state,
                isputCouponLoading: false,
            }
        }
        case `${actions.POST_CITY}_PENDING` : {
            return{
                ...state,
                ispostCityLoading: true
            }
        }
        case `${actions.POST_CITY}_FULFILLED` : {
            debugger

          let updateCityData = {cityId: 0}, msgData = {};
          if(action.payload.statusText === "error") {
            msgData.message=action.payload.error.response.data;
            msgData.isSuccess = false;
          } else {
            msgData.message = [{message:"City added successfully."}];
            msgData.isSuccess = true;
          }
            return{
                ...state,
                ispostCityLoading: false,
                postcity: action.payload.data,
                message: true,
                messageData: msgData,
                cityData:action.payload.statusText === "error"?state.cityData:{} /* if we get error then only we need to remove the data otherwise should not */
            }
        }
        case `${actions.POST_CITY}_REJECTED` : {
            return{
                ...state,
                ispostCityLoading: false,
            }
        }
        case `${actions.PUT_CITY}_PENDING` : {
            return{
                ...state,
                isputCityLoading: true
            }
        }
        case `${actions.PUT_CITY}_FULFILLED` : {
          let updateCityData = {cityId: 0}, msgData = {};
          if(action.payload.statusText === "error") {
            msgData.message=action.payload.error.response.data;
            msgData.isSuccess = false;
          } else {
            msgData.message = [{message:"City updated successfully."}];
            msgData.isSuccess = true;
          }
            return{
                ...state,
                isputCityLoading: false,
                putcity: action.payload.data,
                cityData: action.payload.statusText === "error"?state.cityData:updateCityData, /* if we get error then only we need to remove the data otherwise should not */
                message: true,
                messageData: msgData
            }
        }
        case `${actions.PUT_CITY}_REJECTED` : {
            return{
                ...state,
                isputCityLoading: false,
            }
        }
        case `${actions.POST_ACCESSORIES}_PENDING` : {

            return{
                ...state,
                ispostAccessoryLoading: true
            }
        }
        case `${actions.POST_ACCESSORIES}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Accessory","added")
            return{
                ...state,
                ispostAccessoryLoading: false,
                postaccesory: action.payload.data,
                message: true,
                messageData: msgData,
                getaccessorybyid:action.payload.statusText === "error"?state. getaccessorybyid:{}

            }
        }
        case `${actions.POST_ACCESSORIES}_REJECTED` : {
            return{
                ...state,
                ispostAccessoryLoading: false,
            }
        }
        case `${actions.PUT_ACCESSORIES}_PENDING` : {
            return{
                ...state,
                isputAccessoryLoading: true
            }
        }
        case `${actions.PUT_ACCESSORIES}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Accessory","updated")
            return{
                ...state,
                isputAccessoryLoading: false,
                putaccessory: action.payload.data,
                getaccessorybyid: action.payload.statusText === "error"?state.getaccessorybyid:{},  //here everything is setting with null thats why data removing
                message: true,
                messageData: msgData

            }
        }
        case `${actions.PUT_ACCESSORIES}_REJECTED` : {
            return{
                ...state,
                isputAccessoryLoading: false,
            }
        }
        case `${actions.GET_ACCESSORIES_BYID}_PENDING` : {
            return{
                ...state,
                isgetAccbyidLoading: true
            }
        }
        case `${actions.GET_ACCESSORIES_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetAccbyidLoading: false,
                getaccessorybyid: action.payload.data
            }
        }
        case `${actions.GET_ACCESSORIES_BYID}_REJECTED` : {
            return{
                ...state,
                isgetAccbyidLoading: false,
            }
        }
         case `${actions.GET_ACCESSORIEBOOKING_BYID_ACCESSARYTABLE}_PENDING` : {
            return{
                ...state,
                isgetAccbyidLoading: true
            }
        }
        case `${actions.GET_ACCESSORIEBOOKING_BYID_ACCESSARYTABLE}_FULFILLED` : {
            return{
                ...state,
                isgetAccbyidLoading: false,
                accessorybookings:[action.payload.data]
            }
        }
        case `${actions.GET_ACCESSORIEBOOKING_BYID_ACCESSARYTABLE}_REJECTED` : {
            return{
                ...state,
                isgetAccbyidLoading: false,
            }
        }
        case `${actions.POST_ACTIVITY}_PENDING` : {
             return{
                ...state,
                ispostAactivityLoading: true,
               }
        }
        case `${actions.POST_ACTIVITY}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Activity","added")
            return{
                ...state,
                ispostAactivityLoading: false,
                postactivity: action.payload.data,
                getactivitybyid:action.payload.statusText === "error"?state.getactivitybyid:{},
                message: true,
                messageData: msgData,

            }

        }
        case `${actions.POST_ACTIVITY}_REJECTED` : {
            return{
                ...state,
                ispostAactivityLoading: false,
            }
        }
        case `${actions.PUT_ACTIVITY}_PENDING` : {
            return{
                ...state,
                isputAactivityLoading: true
            }
        }
        case `${actions.PUT_ACTIVITY}_FULFILLED` : {

            let msgData=HandlingError(action.payload,"Activity","updated")
            return{
                ...state,
                isputAactivityLoading: false,
                putactivity: action.payload.data,
                message:true,
                messageData:msgData,
                getactivitybyid:action.payload.statusText === "error"?state.getactivitybyid:{}
            }
        }
        case `${actions.PUT_ACTIVITY}_REJECTED` : {
            return{
                ...state,
                isputAactivityLoading: false,
            }
        }
        case `${actions.GET_ACTIVITY_BYID}_PENDING` : {
            return{
                ...state,
                isgetActbyidLoading: true
            }
        }
        case `${actions.GET_ACTIVITY_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetActbyidLoading: false,
                getactivitybyid: action.payload.data
            }
        }
        case `${actions.GET_ACTIVITY_BYID}_REJECTED` : {
            return{
                ...state,
                isputgetActbyidLoading: false,
            }
        }
        case `${actions.GET_COSTCENTRE}_PENDING` : {
            return{
                ...state,
                isgetCostcentreLoading: true
            }
        }
        case `${actions.GET_COSTCENTRE}_FULFILLED` : {
            return{
                ...state,
                isgetCostcentreLoading: false,
                getallcostcentres: action.payload.data
            }
        }
        case `${actions.GET_COSTCENTRE}_REJECTED` : {
            return{
                ...state,
                isgetCostcentreLoading: false,
            }
        }
         case `${actions.POST_COSTCENTRE}_PENDING` : {
            return{
                ...state,
                ispostCoscentreLoading: true
            }
        }
        case `${actions.POST_COSTCENTRE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Costcentre","added")
            return{
                ...state,
                ispostCoscentreLoading: false,
                postcostcentre: action.payload.data,
                message: true,
                messageData: msgData,
                getcostcentrebyid: action.payload.statusText === "error"?state.getcostcentrebyid:{}
            }
        }
        case `${actions.POST_COSTCENTRE}_REJECTED` : {
            return{
                ...state,
                ispostCoscentreLoading: false,
            }
        }
        case `${actions.PUT_COSTCENTRE}_PENDING` : {
            return{
                ...state,
                isputCoscentreLoading: true
            }
        }
        case `${actions.PUT_COSTCENTRE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Cost center","updated")
            return{
                ...state,
                isputCoscentreLoading: false,
                putcostcentre: action.payload.data,
                message: true,
                messageData: msgData,
                getcostcentrebyid: action.payload.statusText === "error"?state.getcostcentrebyid:{}
            }
        }
        case `${actions.PUT_COSTCENTRE}_REJECTED` : {
            return{
                ...state,
                isputCoscentreLoading: false,
            }
        }
        case `${actions.GET_COSTCENTRE_BYID}_PENDING` : {
            return{
                ...state,
                isgetCostbyidLoading: true
            }
        }
        case `${actions.GET_COSTCENTRE_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetCostbyidLoading: false,
                getcostcentrebyid: action.payload.data
            }
        }
        case `${actions.GET_COSTCENTRE_BYID}_REJECTED` : {
            return{
                ...state,
                isgetCostbyidLoading: false,
            }
        }
        case `${actions.GET_EVENTLEVEL}_PENDING` : {
            return{
                ...state,
                isgetEventlevelLoading: true
            }
        }
        case `${actions.GET_EVENTLEVEL}_FULFILLED` : {
            return{
                ...state,
                isgetEventlevelLoading: false,
                geteventlevel: action.payload.data
            }
        }
        case `${actions.GET_EVENTLEVEL}_REJECTED` : {
            return{
                ...state,
                isgetEventlevelLoading: false,
            }
        }
        case `${actions.GET_EVENTLEVEL_BYID}_PENDING` : {
            return{
                ...state,
                isgetEventlevelbyidLoading: true
            }
        }
        case `${actions.GET_EVENTLEVEL_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetEventlevelbyidLoading: false,
                geteventlevelbyid: action.payload.data
            }
        }
        case `${actions.GET_EVENTLEVEL_BYID}_REJECTED` : {
            return{
                ...state,
                isgetEventlevelbyidLoading: false,
            }
        }
        case `${actions.POST_EVENTLEVEL}_PENDING` : {
            return{
                ...state,
                ispostEventlevelLoading: true
            }
        }
        case `${actions.POST_EVENTLEVEL}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Event level","added")
            return{
                ...state,
                ispostEventlevelLoading: false,
                posteventlevel: action.payload.data,
                message: true,
                messageData: msgData,
                geteventlevelbyid:action.payload.statusText === "error"?state.packagebyid:{}
            }
        }
        case `${actions.POST_EVENTLEVEL}_REJECTED` : {
            return{
                ...state,
                ispostEventlevelLoading: false,
            }
        }
        case `${actions.PUT_EVENTLEVEL}_PENDING` : {
            return{
                ...state,
                isputEventlevelLoading: true
            }
        }
        case `${actions.PUT_EVENTLEVEL}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Event level","updated")
            return{
                ...state,
                isputEventlevelLoading: false,
                puteventlevel: action.payload.data,
                message: true,
                messageData: msgData,
                geteventlevelbyid:action.payload.statusText === "error"?state.geteventlevelbyid:{}
            }
        }
        case `${actions.PUT_EVENTLEVEL}_REJECTED` : {
            return{
                ...state,
                isputEventlevelLoading: false,
            }
        }
        case `${actions.GET_STATUS}_PENDING` : {
            return{
                ...state,
                isgetStatusLoading: true
            }
        }
        case `${actions.GET_STATUS}_FULFILLED` : {
            return{
                ...state,
                isgetStatusLoading: false,
                getstatus: action.payload.data
            }
        }
        case `${actions.GET_STATUS}_REJECTED` : {
            return{
                ...state,
                isgetStatusLoading: false,
            }
        }
        case `${actions.GET_EVENTTYPE}_PENDING` : {
            return{
                ...state,
                isgetEvevnttypeLoading: true
            }
        }
        case `${actions.GET_EVENTTYPE}_FULFILLED` : {
            return{
                ...state,
                isEvevnttypeLoading: false,
                geteventtype: action.payload.data
            }
        }
        case `${actions.GET_EVENTTYPE}_REJECTED` : {
            return{
                ...state,
                isEvevnttypeLoading: false,
            }
        }
        case `${actions.GET_EVENTTYPE_BYID}_PENDING` : {
            return{
                ...state,
                isgetEvevnttypebyidLoading: true
            }
        }
        case `${actions.GET_EVENTTYPE_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetEvevnttypebyidLoading: false,
                geteventtypebyid: action.payload.data
            }
        }
        case `${actions.GET_EVENTTYPE_BYID}_REJECTED` : {
            return{
                ...state,
                isgetEvevnttypebyidLoading: false,
            }
        }
        case `${actions.POST_EVENTTYPE}_PENDING` : {
            return{
                ...state,
                ispostEventtypeLoading: true
            }
        }
        case `${actions.POST_EVENTTYPE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Event type","added")
            return{
                ...state,
                ispostEventtypeLoading: false,
                posteventtype: action.payload.data,
                message: true,
                messageData: msgData,
                geteventtypebyid:action.payload.statusText === "error"?state.geteventtypebyid:{}
            }
        }
        case `${actions.POST_EVENTTYPE}_REJECTED` : {
            return{
                ...state,
                ispostEventtypeLoading: false,
            }
        }
        case `${actions.PUT_EVENTTYPE}_PENDING` : {
            return{
                ...state,
                isputEventtypeLoading:true
            }
        }
        case `${actions.PUT_EVENTTYPE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Event type","updated")
            return{
                ...state,
                isputEventtypeLoading: false,
                puteventtype: action.payload.data,
                message: true,
                messageData: msgData,
                geteventtypebyid:action.payload.statusText === "error"?state.geteventtypebyid:{}
            }
        }
        case `${actions.PUT_EVENTTYPE}_REJECTED` : {
            return{
                ...state,
                isputEventtypeLoading: false,
            }
        }
        case `${actions.GET_ITENARY}_PENDING` : {
            return{
                ...state,
                isgetItenaryLoading: true
            }
        }
        case `${actions.GET_ITENARY}_FULFILLED` : {
            return{
                ...state,
                isgetItenaryLoading: false,
                getitenary: action.payload.data
            }
        }
        case `${actions.GET_ITENARY}_REJECTED` : {
            return{
                ...state,
                isgetItenaryLoading: false,
            }
        }
        case `${actions.GET_ITENARY_BYID}_PENDING` : {
            return{
                ...state,
                isgetItenarybyidLoading: true
            }
        }
        case `${actions.GET_ITENARY_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetItenarybyidLoading: false,
                getitenarybyid: action.payload.data,
                geteditorState:EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                      convertFromHTML(action.payload.data.iternaryDescription?action.payload.data.iternaryDescription:'<p></p>')
                    )
                  )
            }
        }
        case `${actions.GET_ITENARY_BYID}_REJECTED` : {
            return{
                ...state,
                isgetItenarybyidLoading: false,
            }
        }
        case `${actions.POST_ITENARY}_PENDING` : {
            return{
                ...state,
                ispostItenaryLoading: true
            }
        }
        case `${actions.POST_ITENARY}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Itenary","added")
            return{
                ...state,
                ispostItenaryLoading: false,
                postitenary:action.payload.data,
                message: true,
                messageData: msgData,
                getitenarybyid:action.payload.statusText === "error"?state.getitenarybyid:{}
      }
        }
        case `${actions.POST_ITENARY}_REJECTED` : {
            return{
                ...state,
                ispostItenaryLoading: false,
            }
        }
        case `${actions.PUT_ITENARY}_PENDING` : {
            return{
                ...state,
                isputItenaryLoading: true
            }
        }
        case `${actions.PUT_ITENARY}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Itenary","updated")
            return{
                ...state,
                isputItenaryLoading: false,
                putitenary:action.payload.data,
                message: true,
                messageData: msgData,
                getitenarybyid:action.payload.statusText === "error"?state.getitenarybyid:{}

            }
        }
        case `${actions.PUT_ITENARY}_REJECTED` : {
            return{
                ...state,
                isputItenaryLoading: false,
            }
        }
        case `${actions.GET_PLACETOVISIT}_PENDING` : {
            return{
                ...state,
                isgetPlacetovisitLoading: true
            }
        }
        case `${actions.GET_PLACETOVISIT}_FULFILLED` : {
            return{
                ...state,
                isgetPlacetovisitLoading: false,
                getplcetovisit:action.payload.data
            }
        }
        case `${actions.GET_PLACETOVISIT}_REJECTED` : {
            return{
                ...state,
                isgetPlacetovisitLoading: false,
            }
        }
        case `${actions.GET_PLACETOVISIT_BYID}_PENDING` : {
            return{
                ...state,
                isgetPlacetovisitbyidLoading: true
            }
        }
        case `${actions.GET_PLACETOVISIT_BYID}_FULFILLED` : {
            let cityid=action.payload.data.cityId;
            let stateId
            let placetovisitdata=action.payload.data;
            state.cities.map(obj=>
                {
                    if(obj.cityId === cityid)
                    {
                      stateId=obj.stateId;
                    }
                })

                let activityids=action.payload.data.activityIds && action.payload.data.activityIds.split(",")
                var activitynames=[]
                activityids && activityids.map(obj=>
                  state.activities.map((item)=>{
                      if(parseInt(obj) == item.activityId) {
                        activitynames.push({activityName:item.activityName,activityId:item.activityId}); //reusability
                      }
                  }))

                let countryId
                state.states.map(obj=>{
                    if(obj.stateId === stateId)
                    {
                        countryId=obj.countryId
                    }
                })

                placetovisitdata["stateId"]=stateId
                placetovisitdata["countryId"]=countryId
            return{
                ...state,
                isgetPlacetovisitbyidLoading: false,
                getplacetovisitbyid:placetovisitdata,/* action.payload.data */
                activityids:activitynames
            }
        }
        case `${actions.GET_PLACETOVISIT_BYID}_REJECTED` : {
            return{
                ...state,
                isgetPlacetovisitbyidLoading: false,
            }
        }
        case `${actions.POST_PLACETOVISIT}_PENDING` : {
            return{
                ...state,
                ispostPlacetovisitLoading: true
            }
        }
        case `${actions.POST_PLACETOVISIT}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Place to visit","added")
            return{
                ...state,
                ispostPlacetovisitLoading: false,
                postplacetovisit:action.payload.data,
                message: true,
                messageData: msgData,
                getplacetovisitbyid:action.payload.statusText === "error"?state.getplacetovisitbyid:{}
            }
        }
        case `${actions.POST_PLACETOVISIT}_REJECTED` : {
            return{
                ...state,
                ispostPlacetovisitLoading: false,
            }
        }
        case `${actions.PUT_PLACETOVISIT}_PENDING` : {
            return{
                ...state,
                isputPlacetovisitLoading: true
            }
        }
        case `${actions.PUT_PLACETOVISIT}_FULFILLED` : {
            debugger
            let msgData=HandlingError(action.payload,"Place to visit","updated")
            return{
                ...state,
                isputPlacetovisitLoading: false,
                putplacetovisit:action.payload.data,
                message: true,
                messageData: msgData,
                getplacetovisitbyid:action.payload.statusText === "error"?state.getplacetovisitbyid:{}

            }
        }
        case `${actions.PUT_PLACETOVISIT}_REJECTED` : {
            return{
                ...state,
                isputPlacetovisitLoading: false,
            }
        }
        case `${actions.GET_PLACETYPE}_PENDING` : {
            return{
                ...state,
                isgetPlacetypeLoading: true
            }
        }
        case `${actions.GET_PLACETYPE}_FULFILLED` : {
            return{
                ...state,
                isgetPlacetypeLoading: false,
                placetype:action.payload.data
            }
        }
        case `${actions.GET_PLACETYPE}_REJECTED` : {
            return{
                ...state,
                isgetPlacetypeLoading: false,
            }
        }
        case `${actions.GET_DESTINATION}_PENDING` : {
            return{
                ...state,
                isgetDestinationLoading: true
            }
        }
        case `${actions.GET_DESTINATION}_FULFILLED` : {
            return{
                ...state,
                isgetDestinationLoading: false,
                getdestination:action.payload.data
            }
        }
        case `${actions.GET_DESTINATION}_REJECTED` : {
            return{
                ...state,
                isgetDestinationLoading: false,
            }
        }
        case `${actions.GET_DESTINATION_BYID}_PENDING` : {
            return{
                ...state,
                isgetDestinationbyidLoading: true
            }
        }
        case `${actions.GET_DESTINATION_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetDestinationbyidLoading: false,
                getdestinationbyid:action.payload.data
            }
        }
        case `${actions.GET_DESTINATION_BYID}_REJECTED` : {
            return{
                ...state,
                isgetDestinationbyidLoading: false,
            }
        }
        case `${actions.POST_DESTINATION}_PENDING` : {
            return{
                ...state,
                ispostDestinationLoading: true
            }
        }
        case `${actions.POST_DESTINATION}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Destination","added")
            return{
                ...state,
                ispostDestinationLoading: false,
                postdestination:action.payload.data,
                message: true,
                messageData: msgData,
                getdestinationbyid:action.payload.statusText === "error"?state.getdestinationbyid:{}
            }
        }
        case `${actions.POST_DESTINATION}_REJECTED` : {
            return{
                ...state,
                ispostDestinationLoading: false,
            }
        }
        case `${actions.PUT_DESTINATION}_PENDING` : {
            return{
                ...state,
                isputDestinationLoading: true
            }
        }
        case `${actions.PUT_DESTINATION}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Destination","updated")
            return{
                ...state,
                isputDestinationLoading: false,
                putdestination:action.payload.data,
                message: true,
                messageData: msgData,
                getdestinationbyid:action.payload.statusText === "error"?state.getdestinationbyid:{}

            }
        }
        case `${actions.PUT_DESTINATION}_REJECTED` : {
            return{
                ...state,
                isputDestinationLoading: false,
            }
        }
        case `${actions.PUT_PLACETYPE}_PENDING` : {
            return{
                ...state,
                isputPlacetypeLoading: true
            }
        }
        case `${actions.POST_PLACETYPE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Placetype","added")
            return{
                ...state,
                ispostPlacetypeLoading: false,
                postplacetype:action.payload.data,
                message: true,
                messageData: msgData,
                getplacetypebyid:action.payload.statusText === "error"?state.getplacetypebyid:{}
           }
        }
        case `${actions.POST_PLACETYPE}_REJECTED` : {
            return{
                ...state,
                ispostPlacetypeLoading: false,
            }
        }
        case `${actions.PUT_PLACETYPE}_PENDING` : {
            return{
                ...state,
                isputPlacetypeLoading: true
            }
        }
        case `${actions.PUT_PLACETYPE}_FULFILLED` : {
            debugger
            let msgData=HandlingError(action.payload,"Place type","updated")
            return{
                ...state,
                isputPlacetypeLoading: false,
                putplacetype:action.payload.data,
                message: true,
                messageData: msgData,
                getplacetypebyid:action.payload.statusText === "error"?state.getplacetypebyid:{}

            }
        }
        case `${actions.POST_PLACETYPE}_REJECTED` : {
            return{
                ...state,
                isputPlacetypeLoading: false,
            }
        }
        case `${actions.GET_PLACETYPE_BYID}_PENDING` : {
            return{
                ...state,
                isgetPlacetypebyidLoading: true
            }
        }
        case `${actions.GET_PLACETYPE_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetPlacetypebyidLoading: false,
                getplacetypebyid:action.payload.data
            }
        }
        case `${actions.GET_PLACETYPE_BYID}_REJECTED` : {
            return{
                ...state,
                isgetPlacetypebyidLoading: false,
            }
        }
         case `${actions.GET_STATES}_PENDING` : {
            return{
                ...state,
                isStateLoading: true
            }
        }
        case `${actions.GET_STATES}_FULFILLED` : {
            return{
                ...state,
                isStateLoading: false,
                states: action.payload.data
            }
        }
        case `${actions.GET_STATES}_REJECTED` : {
            return{
                ...state,
                isStateLoading: false,
            }
        }
        case `${actions.GET_STATE_BYID}_PENDING` : {
            return{
                ...state,
                isStatebyidLoading: true
            }
        }
        case `${actions.GET_STATE_BYID}_FULFILLED` : {
            return{
                ...state,
                isStatebyidLoading: false,
                getstatebyid: action.payload.data
            }
        }
        case `${actions.GET_STATE_BYID}_REJECTED` : {
            return{
                ...state,
                isStatebyidLoading: false,
            }
        }
        case `${actions.GET_STATE_BYCOUNTRYID}_PENDING` : {
            return{
                ...state,
                isstatebyCountryidLoading: true
            }
        }
        case `${actions.GET_STATE_BYCOUNTRYID}_FULFILLED` : {
            return{
                ...state,
                isstatebyCountryidLoading: false,
                states: action.payload.data
            }
        }
        case `${actions.GET_STATE_BYCOUNTRYID}_REJECTED` : {
            return{
                ...state,
                isstatebyCountryidLoading: false,
            }
        }
        case `${actions.POST_STATE}_PENDING` : {
            return{
                ...state,
                ispostStateLoading: true
            }
        }
        case `${actions.POST_STATE}_FULFILLED` : {

            let msgData=HandlingError(action.payload,"State","added")

            return{
                ...state,
                ispostStateLoading: false,
                poststate: action.payload.data,
                message: true,
                messageData: msgData,
                getstatebyid:action.payload.statusText === "error"?state. getstatebyid:{}

            }
        }
        case `${actions.POST_STATE}_REJECTED` : {
            return{
                ...state,
                ispostStateLoading: false,
            }
        }
        case `${actions.PUT_STATE}_PENDING` : {

            return{
                ...state,
                isputStateLoading: true

            }
        }
        case `${actions.PUT_STATE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"State","Updated")
            return{
                ...state,
                isputStateLoading: false,
                putstate: action.payload.data,
                message: true,
                messageData: msgData,
                getstatebyid:action.payload.statusText === "error"?state.getstatebyid:{}

            }
        }
        case `${actions.PUT_STATE}_REJECTED` : {
            return{
                ...state,
                isputStateLoading: false,
            }
        }
        case `${actions.GET_STAY}_PENDING` : {
            return{
                ...state,
                isgetStayLoading: true
            }
        }
        case `${actions.GET_STAY}_FULFILLED` : {
            return{
                ...state,
                isgetStayLoading: false,
                getstay: action.payload.data
            }
        }
        case `${actions.GET_STAY}_REJECTED` : {
            return{
                ...state,
                isgetStayLoading: false,
            }
        }
        case `${actions.PUT_STAY}_PENDING` : {
            return{
                ...state,
                isputStayLoading: true
            }
        }
        case `${actions.PUT_STAY}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Stay","updated")
            return{
                ...state,
                isputStayLoading: false,
                putstay: action.payload.data,
                message: true,
                messageData: msgData,
                getstaybyid:action.payload.statusText === "error"?state.getstaybyid:{},
                staytypeids:{}

            }
        }
        case `${actions.PUT_STAY}_REJECTED` : {
            return{
                ...state,
                isputStayLoading: false,
            }
        }
        case `${actions.POST_STAY}_PENDING` : {
            return{
                ...state,
                ispostStayLoading: true
            }
        }
        case `${actions.POST_STAY}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Stay","added")
              return{
                ...state,
                ispostStayLoading: false,
                poststay: action.payload.data,
                message: true,
                messageData: msgData,
                getstaybyid:action.payload.statusText === "error"?state.getstaybyid:{},
                staytypeids:{}
            }
        }
        case `${actions.POST_STAY}_REJECTED` : {
            return{
                ...state,
                ispostStayLoading: false,
            }
        }
        case `${actions.GET_STAY_BYID}_PENDING` : {
            return{
                ...state,
                isgetStaybyidLoading: true
            }
        }
        case `${actions.GET_STAY_BYID}_FULFILLED` : {
            debugger
            let staytypeids1=action.payload.data.stayTypeIds;
            //let data= Array.prototype.map.call(staytypeids, function(item) { return item.stayTypeId; }).join(",");

            let staytypeids=(action.payload.data.stayTypeIds).split(",");
            var staytypenames1=[]

            staytypeids.map(obj=>
                state.getstaytype.map((item)=>{
                    if(parseInt(obj) == item.stayTypeId)
                    {
                      staytypenames1.push({stayTypeName:item.stayTypeName,stayTypeId:item.stayTypeId}); //reusability
                    }
                }))


                let cityid=action.payload.data.cityId;
            let stateId
            let stayinfodata=action.payload.data;
            state.cities.map(obj=>
                {
                    if(obj.cityId === cityid)
                    {
                      stateId=obj.stateId;
                    }
                })

                let countryId
                state.states.map(obj=>{
                    if(obj.stateId === stateId)
                    {
                        countryId=obj.countryId
                    }
                })

            stayinfodata["stateId"]=stateId
            stayinfodata["countryId"]=countryId


            return{
                ...state,
                isgetStaybyidLoading: false,
                getstaybyid:stayinfodata /* action.payload.data */,
                staytypeids:staytypenames1
            }
        }
        case `${actions.GET_STAY_BYID}_REJECTED` : {
            return{
                ...state,
                isgetStaybyidLoading: false,
            }
        }
        case `${actions.GET_STAYTYPE}_PENDING` : {
            return{
                ...state,
                isgetStaytypeLoading: true
            }
        }
        case `${actions.GET_STAYTYPE}_FULFILLED` : {
            return{
                ...state,
                isgetStaytypeLoading: false,
                getstaytype: action.payload.data
            }
        }
        case `${actions.GET_STAYTYPE}_REJECTED` : {
            return{
                ...state,
                isgetStaytypeLoading: false,
            }
        }
        case `${actions.GET_STAYTYPE_BYTRIPID}_PENDING` : {
            return{
                ...state,
                isgetStaytypeLoading: true
            }
        }
        case `${actions.GET_STAYTYPE_BYTRIPID}_FULFILLED` : {
            return{
                ...state,
                isgetStaytypeLoading: false,
                getstaytype: action.payload.data
            }
        }
        case `${actions.GET_STAYTYPE_BYTRIPID}_REJECTED` : {
            return{
                ...state,
                isgetStaytypeLoading: false,
            }
        }
        case `${actions.GET_STAYTYPE_BYID}_PENDING` : {
            return{
                ...state,
                isgetStaytypebyidLoading: true
            }
        }
        case `${actions.GET_STAYTYPE_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetStaytypebyidLoading: false,
                getstaytypebyid: action.payload.data
            }
        }
        case `${actions.GET_STAYTYPE_BYID}_REJECTED` : {
            return{
                ...state,
                isgetStaytypebyidLoading: false,
            }
        }
        case `${actions.POST_STAYTYPE}_PENDING` : {
            return{
                ...state,
                ispostStaytypeLoading: true
            }
        }
        case `${actions.POST_STAYTYPE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Stay type","added")
            return{
                ...state,
                ispostStaytypeLoading: false,
                poststaytype: action.payload.data,
                message: true,
                messageData: msgData,
                getstaytypebyid:action.payload.statusText === "error"?state.getstaytypebyid:{}
            }
        }
        case `${actions.POST_STAYTYPE}_REJECTED` : {
            return{
                ...state,
                ispostStaytypeLoading: false,
            }
        }

         case `${actions.PUT_TRAVELINFO}_PENDING` : {
            return{
                ...state,
                isputTravelinfoLoading: true
            }
        }
        case `${actions.PUT_TRAVELINFO}_FULFILLED` : {
            let msgData = {}, updatedTraveData= state.gettravelinfo, updatedObj = action.payload.obj;
            console.log("travel update: ", action.payload.obj);
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the travelinfo";
              msgData.isSuccess = false;
            } else {
              msgData.message = "travelinfo updated successfully.";
              msgData.isSuccess = true;
              if(updatedObj.travelInfoId) {
                updatedTraveData = state.gettravelinfo.map(obj =>
                    obj.travelInfoId === updatedObj.travelInfoId ?
                      { ...obj, agencyName: updatedObj.agencyName,
                        cityId: updatedObj.cityId,
                        locationDetails: updatedObj.locationDetails,
                        vehicleContactNumber: updatedObj.vehicleContactNumber,
                        vehicleName: updatedObj.vehicleName,
                        vehicleNumber: updatedObj.vehicleNumber,
                        vehicleOwner: updatedObj.vehicleOwner } : obj
                        );
              }
            }
            return{
                ...state,
                isputTravelinfoLoading: false,
                puttravelinfo: action.payload.data,
                message: true,
                messageData: msgData,
                gettravelinfobyid:{},
                gettravelinfo: updatedTraveData
             }
        }
        case `${actions.PUT_TRAVELINFO}_REJECTED` : {
            return{
                ...state,
                isputTravelinfoLoading: false,
            }
        }
        case `${actions.POST_TRAVELINFO}_PENDING` : {
            return{
                ...state,
                isposttTravelinfoLoading: true
            }
        }
        case `${actions.POST_TRAVELINFO}_FULFILLED` : {
            debugger
            let msgData = {}, updatedTraveData= state.gettravelinfo, addedObj = action.payload.data;
            console.log("travel update: ", action.payload.obj);
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the travelinfo";
              msgData.isSuccess = false;
            } else {
              msgData.message = "travelinfo added successfully.";
              msgData.isSuccess = true;
              updatedTraveData.push(addedObj);
            }
            return{
                ...state,
                isposttTravelinfoLoading: false,
                posttravelinfo: action.payload.data,
                message: true,
                messageData: msgData,
                gettravelinfobyid:{},
                gettravelinfo: updatedTraveData
             }
        }
        case `${actions.POST_TRAVELINFO}_REJECTED` : {
            return{
                ...state,
                isposttTravelinfoLoading: false,
            }
        }

        case `${actions.GET_TRAVELINFO}_PENDING` : {
            return{
                ...state,
                isgetTravelinfoLoading: true
            }
        }
        case `${actions.GET_TRAVELINFO}_FULFILLED` : {
            return{
                ...state,
                isgetTravelinfoLoading: false,
                gettravelinfo: action.payload.data
            }
        }
        case `${actions.GET_TRAVELINFO}_REJECTED` : {
            return{
                ...state,
                isgetTravelinfoLoading: false,
            }
        }
        case `${actions.GET_TRAVELINFO_BYID}_PENDING` : {
            return{
                ...state,
                isgetTravelinfobyidLoading: true
            }
        }
        case `${actions.GET_TRAVELINFO_BYID}_FULFILLED` : {
            let cityid=action.payload.data.cityId;
            let stateId
            let travelinfodata=action.payload.data;
            state.cities.map(obj=>
                {
                    if(obj.cityId === cityid)
                    {
                      stateId=obj.stateId;
                    }
                })

                let countryId
                state.states.map(obj=>{
                    if(obj.stateId === stateId)
                    {
                        countryId=obj.countryId
                    }
                })

            travelinfodata["stateId"]=stateId
            travelinfodata["countryId"]=countryId

            return{
                ...state,
                isgetTravelinfobyidLoading: false,
                gettravelinfobyid: travelinfodata
            }
        }
        case `${actions.GET_TRAVELINFO_BYID}_REJECTED` : {
            return{
                ...state,
                isgetTravelinfobyidLoading: false,
            }
        }
        case `${actions.PUT_STAYTYPE}_PENDING` : {
            return{
                ...state,
                isputStaytypeLoading: true
            }
        }
        case `${actions.PUT_STAYTYPE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Stay type","updated")
            return{
                ...state,
                isputStaytypeLoading: false,
                putstaytype: action.payload.data,
                message: true,
                messageData: msgData,
                getstaytypebyid:action.payload.statusText === "error"?state.getstaytypebyid:{}
             }
        }
        case `${actions.PUT_STAYTYPE}_REJECTED` : {
            return{
                ...state,
                isputStaytypeLoading: false,
            }
        }

        case `${actions.GET_TRAVELTYPE}_PENDING` : {
            return{
                ...state,
                isgetTraveltypeLoading: true
            }
        }
        case `${actions.GET_TRAVELTYPE}_FULFILLED` : {
            return{
                ...state,
                isgetTraveltypeLoading: false,
                gettraveltype: action.payload.data
            }
        }
        case `${actions.GET_TRAVELTYPE}_REJECTED` : {
            return{
                ...state,
                isgetTraveltypeLoading: false,
            }
        }
        case `${actions.GET_TRAVELTYPE_BYTRIPID}_PENDING` : {
            return{
                ...state,
                isgetTraveltypeLoading: true
            }
        }
        case `${actions.GET_TRAVELTYPE_BYTRIPID}_FULFILLED` : {
            return{
                ...state,
                isgetTraveltypeLoading: false,
                gettraveltype: action.payload.data
            }
        }
        case `${actions.GET_TRAVELTYPE_BYTRIPID}_REJECTED` : {
            return{
                ...state,
                isgetTraveltypeLoading: false,
            }
        }
        case `${actions.GET_TRAVELTYPE_BYID}_PENDING` : {
            return{
                ...state,
                isgetTraveltypebyidLoading: true
            }
        }
        case `${actions.GET_TRAVELTYPE_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetTraveltypebyidLoading: false,
                gettraveltypebyid: action.payload.data
            }
        }
        case `${actions.GET_TRAVELTYPE_BYID}_REJECTED` : {
            return{
                ...state,
                isgetTraveltypebyidLoading: false,
            }
        }
        case `${actions.PUT_TRAVELTYPE}_PENDING` : {
            return{
                ...state,
                isputTraveltypeLoading: true
            }
        }
        case `${actions.PUT_TRAVELTYPE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Travel type","updated")
            return{
                ...state,
                isputTraveltypeLoading: false,
                puttraveltype: action.payload.data,
                message: true,
                messageData: msgData,
                gettraveltypebyid:action.payload.statusText === "error"?state.gettraveltypebyid:{}
             }
        }
        case `${actions.POST_TRAVELTYPE}_PENDING` : {
            return{
                ...state,
                ispostTraveltypeLoading: true
            }
        }
        case `${actions.POST_TRAVELTYPE}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Travel type","added")
            return{
                ...state,
                ispostTraveltypeLoading: false,
                puttraveltype: action.payload.data,
                message: true,
                messageData: msgData,
                gettraveltypebyid:action.payload.statusText === "error"?state.gettraveltypebyid:{}
             }
        }
        case `${actions.POST_TRAVELTYPE}_REJECTED` : {
            return{
                ...state,
                ispostTraveltypeLoading: false,
            }
        }
        case `${actions.GET_TRIP}_PENDING` : {
            return{
                ...state,
                isgetTripLoading: true
            }
        }
        case `${actions.GET_TRIP}_FULFILLED` : {
            return{
                ...state,
                isgetTripLoading: false,
                gettrip: action.payload.data
            }
        }
        case `${actions.GET_TRIP}_REJECTED` : {
            return{
                ...state,
                isgetTripLoading: false,
            }
        }
        case `${actions.POST_TRIP}_PENDING` : {
            return{
                ...state,
                ispostTripLoading: true
            }
        }
        case `${actions.POST_TRIP}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Trip","added")

            return{
                ...state,
                ispostTripLoading: false,
                postrip: action.payload.data,
                message: true,
                messageData: msgData,
                gettripbyid:action.payload.statusText === "error"?state.gettripbyid:{},
                traveltypeids:{},
                staytypeids:{}
             }
        }
        case `${actions.POST_TRIP}_REJECTED` : {
            return{
                ...state,
                ispostTripLoading: false,
            }
        }
        case `${actions.PUT_TRIP}_PENDING` : {
            return{
                ...state,
                isputTripLoading: true
            }
        }
        case `${actions.PUT_TRIP}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Trip","updated")
            return{
                ...state,
                isputTripLoading: false,
                putrip: action.payload.data,
                message: true,
                messageData: msgData,
                gettripbyid:action.payload.statusText === "error"?state.gettripbyid:{},
                traveltypeids:{},
                staytypeids:{}
             }
        }
        case `${actions.PUT_TRIP}_REJECTED` : {
            return{
                ...state,
                isputTripLoading: false,
            }
        }

        case `${actions.GET_BOOKING}_PENDING` : {
            return{
                ...state,
                isgetBookingLoading: true
            }
        }
        case `${actions.GET_BOOKING}_FULFILLED` : {
            return{
                ...state,
                isgetBookingLoading: false,
                getbooking: action.payload.data,
                
            }
        }
        case `${actions.GET_BOOKING}_REJECTED` : {
            return{
                ...state,
                isgetBookingLoading: false,
            }
        }
        case `${actions.GET_BOOKING_OPTIONS}_PENDING` : {
            return{
                ...state,
                isgetBookingLoading: true
            }
        }
        case `${actions.GET_BOOKING_OPTIONS}_FULFILLED` : {
            return{
                ...state,
                isgetBookingLoading: false,
              
                getbookingoptions:action.payload.data
            }
        }
        case `${actions.GET_BOOKING_OPTIONS}_REJECTED` : {
            return{
                ...state,
                isgetBookingLoading: false,
            }
        }


        case `${actions.GET_BOOKING_BYID}_PENDING` : {
            return{
                ...state,
                isgetBookingbyidLoading: true
            }
        }
        case `${actions.GET_BOOKING_BYID}_FULFILLED` : {
            debugger
           /*  let accessoryids=(action.payload.data.accessories).split(",");
            var accessorynames1=[]

            accessoryids.map(obj=>
                state.accessories.map((item)=>{
                    if(parseInt(obj) == item.accessoryName)
                    {
                        accessorynames1.push({accessoryName:item.accessoryName,accessoriesId:item.accessoriesId}); //reusability
                    }
                }))

                let activityids=(action.payload.data.activityIds).split(",");
                var activitynames1=[]

                activityids.map(obj=>
                    state.activities.map((item)=>{
                        if(parseInt(obj) == item.activityName)
                        {
                            activitynames1.push({activityName:item.activityName,activityId:item.activityId}); //reusability
                        }
                    })) */
                    let getTripDet = action.payload.data;
                    if(getTripDet.bookingDate) {
                      getTripDet.bookingDate = moment(getTripDet.startDate).format('YYYY-MM-DD');
                    }
                    if(getTripDet.bookingDate) {
                        getTripDet.cancellationDate = moment(getTripDet.cancellationDate).format('YYYY-MM-DD');
                      }


            return{
                ...state,
                isgetBookingbyidLoading: false,
                getbookingbyid:getTripDet,
                /* accessoryids:accessorynames1,
                activityids:activitynames1 */
            }
        }
        case `${actions.GET_BOOKING_BYID}_REJECTED` : {
            return{
                ...state,
                isgetBookingbyidLoading: false,

            }
        }
        
        case `${actions.GET_BOOKING_BYTRIPID}_PENDING` : {
            return{
                ...state,
                isgetBookingbytripbyidLoading: true
            }
        }
        case `${actions.GET_BOOKING_BYTRIPID}_FULFILLED` : {
            debugger
           /*  let accessoryids=(action.payload.data.accessories).split(",");
            var accessorynames1=[]

            accessoryids.map(obj=>
                state.accessories.map((item)=>{
                    if(parseInt(obj) == item.accessoryName)
                    {
                        accessorynames1.push({accessoryName:item.accessoryName,accessoriesId:item.accessoriesId}); //reusability
                    }
                }))

                let activityids=(action.payload.data.activityIds).split(",");
                var activitynames1=[]

                activityids.map(obj=>
                    state.activities.map((item)=>{
                        if(parseInt(obj) == item.activityName)
                        {
                            activitynames1.push({activityName:item.activityName,activityId:item.activityId}); //reusability
                        }
                    })) */
            return{
                ...state,
                isgetBookingbytripidLoading: false,
                getbooking: action.payload.data,
                /* accessoryids:accessorynames1,
                activityids:activitynames1 */
            }
        }
        case `${actions.GET_BOOKING_BYTRIPID}_REJECTED` : {
            return{
                ...state,
                isgetBookingbytripidLoading: false,

            }
        }
        
        case `${actions.PUT_BOOKING}_PENDING` : {
            return{
                ...state,
                isputBookingLoading: true
            }
        }
        case `${actions.PUT_BOOKING}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Booking","updated")
            return{
                ...state,
                isputBookingLoading: false,
                putbooking: action.payload.data,
                message: true,
                messageData: msgData,
                getbookingbyid:action.payload.statusText === "error"?state.getbookingbyid:{},
                accessoryids:{},
                activityids:{}
             }
        }
        case `${actions.PUT_BOOKING}_REJECTED` : {
            return{
                ...state,
                isputBookingLoading: false,
            }
        }
        case `${actions.POST_BOOKING}_PENDING` : {
            return{
                ...state,
                ispostBookingLoading: true
            }
        }
        case `${actions.POST_BOOKING}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Booking","added")
            return{
                ...state,
                ispostBookingLoading: false,
                postbooking: action.payload.data,
                message: true,
                messageData: msgData,
                getbookingbyid:action.payload.statusText === "error"?state.getbookingbyid:{},
                accessoryids:{},
                activityids:{}
             }
        }
        case `${actions.POST_BOOKING}_REJECTED` : {
            return{
                ...state,
                ispostBookingLoading: false,
            }
        }

        case `${actions.GET_USER}_PENDING` : {
            return{
                ...state,
                isgetUserLoading: true
            }
        }
        case `${actions.GET_USER}_FULFILLED` : {
            return{
                ...state,
                isgetUserLoading: false,
                getuser: action.payload.data
            }
        }
        case `${actions.GET_USER}_REJECTED` : {
            return{
                ...state,
                isgetUserLoading: false,
            }
        }
        case `${actions.GET_USERTYPES}_PENDING` : {
            return{
                ...state,
                isgetUserLoading: true
            }
        }
        case `${actions.GET_USERTYPES}_FULFILLED` : {
            return{
                ...state,
                isgetUserLoading: false,
                usertypes: action.payload.data
            }
        }
        case `${actions.GET_USERTYPES}_REJECTED` : {
            return{
                ...state,
                isgetUserLoading: false,
            }
        }
        case `${actions.GET_USER_BYID}_PENDING` : {
            return{
                ...state,
                isgetUserLoading: true
            }
        }
        case `${actions.GET_USER_BYID}_FULFILLED` : {
            let getUserdate=action.payload.data;
            if(getUserdate.dateOfBirth) {
                getUserdate.dateOfBirth = moment( getUserdate.dateOfBirth).format('YYYY-MM-DD');
              }
         return{
                ...state,
                isgetUserLoading: false,
                getuserbyid:getUserdate,
            }
        }
        case `${actions.GET_USER_BYID}_REJECTED` : {
            return{
                ...state,
                isgetUserLoading: false,
            }
        }
        case `${actions.GET_USER_BYID_PROFILE}_PENDING` : {
            return{
                ...state,
                isgetUserLoading: true
            }
        }
        case `${actions.GET_USER_BYID_PROFILE}_FULFILLED` : {
            return{
                ...state,
                isgetUserLoading: false,
                getuserbyidprofile: action.payload.data,
            }
        }
        case `${actions.GET_USER_BYID_PROFILE}_REJECTED` : {
            return{
                ...state,
                isgetUserLoading: false,
            }
        }


        case `${actions.PUT_USER}_PENDING` : {
            return{
                ...state,
                isputUserLoading: true
            }
        }
        case `${actions.PUT_USER}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"User","updated")
            return{
                ...state,
                isputUserLoading: false,
                putuser: action.payload.data,
                message: true,
                messageData: msgData,
                getuserbyid:action.payload.statusText === "error"?state.getuserbyid:{}
             }
        }
        case `${actions.PUT_USER}_REJECTED` : {
            return{
                ...state,
                isputUserLoading: false,
            }
        }
        case `${actions.POST_USER}_PENDING` : {
            return{
                ...state,
                ispostUserLoading: true
            }
        }
        case `${actions.POST_USER}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"User","added")
            return{
                ...state,
                ispostUserLoading: false,
                postuser: action.payload.data,
                message: true,
                messageData: msgData,
                getuserbyid:action.payload.statusText === "error"?state.getuserbyid:{}
             }
        }
        case `${actions.POST_USER}_REJECTED` : {
            return{
                ...state,
                ispostUserLoading: false,
            }
        }
        case `${actions.DELETE_USER}_PENDING` : {
            return{
                ...state,
                isdeleteUserLoading: true
            }
        }
        case `${actions.DELETE_USER}_FULFILLED` : {
            let msgData =deleteMsgHandling(action.payload,"User")
            return{
                ...state,
                isdeleteUserLoading: false,
                deleteuser: action.payload.data,
                message: true,
                messageData: msgData

            }
        }
        case `${actions.DELETE_USER}_REJECTED` : {
            return{
                ...state,
                isdeleteUserLoading: false,
            }
        }
        case `${actions.UPDATE_PROP}` : {
            debugger
			      console.log(action.payload);
            let propName = action.payload.propName, updatedCityData = state[propName];
            updatedCityData[action.payload.param] = action.payload.value;
            return{
                ...state,
				        [propName]: updatedCityData
            }
        }
        case `${actions.UPDATE_PROP_ACC}` : {
            debugger

			      console.log(action.payload);
            let propName = action.payload.propName, updatedAccessoryData = state[propName];
            updatedAccessoryData[action.payload.param] = action.payload.value;

         /*    if(propName == "getstaybyid")
            {
                let staytypeids=(action.payload.value).split(",");
                var staytypenames1=[]

                staytypeids.map(obj=>
                    state.getstaytype.map((item)=>{
                        if(parseInt(obj) == item.stayTypeId)
                        {
                          staytypenames1.push({stayTypeName:item.stayTypeName,stayTypeId:item.stayTypeId}); //reusability
                        }
                    }))

            }
 */            return{
                ...state,
                        [propName]: updatedAccessoryData,

            }
        }
        case `${actions.REMOVE_ERROR_MSG}` : {
            debugger
            
            return{
                ...state,
                messageData:action.payload.value,
                message:false

            }
        }
        case `${actions.REMOVE_DATA}` : {
            debugger
            return{
                ...state,
                [action.payload.type]:action.payload.value,
              
            }
        }
        case `${actions.EDITOR_STATE}` : {
            debugger
            return{
                ...state,
                geteditorState:action.payload.value

            }
        }
        case `${actions.DELETE_PACKAGE}_PENDING` : {
            return{
                ...state,
                isdeletePackageLoading: true
            }
        }
        case `${actions.DELETE_PACKAGE}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Package")

            return{
                ...state,
                isdeletePackageLoading: false,
                deletepackage:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_PACKAGE}_REJECTED` : {
            return{
                ...state,
                isdeletePackageLoading: false,
            }
        }
case `${actions.DELETE_ACCESSORIES}_PENDING` : {
            return{
                ...state,
                isdeleteAccessoryLoading: true
            }
        }
        case `${actions.DELETE_ACCESSORIES}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Accessory")
            return{
                ...state,
                isdeleteAccessoryLoading: false,
                deleteaccessory:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_ACCESSORIES}_REJECTED` : {
            return{
                ...state,
                isdeleteAccessoryLoading: false,
            }
        }
		case `${actions.DELETE_TRIP}_PENDING` : {
            return{
                ...state,
                isdeleteTripLoading: true
            }
        }
        case `${actions.DELETE_TRIP}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Trip")

            return{
                ...state,
                isdeleteTripLoading: false,
                deletetrip:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_TRIP}_REJECTED` : {
            return{
                ...state,
                isdeleteTripLoading: false,
            }
        }
		case `${actions.DELETE_ITENARY}_PENDING` : {
            return{
                ...state,
                isdeleteItenaryLoading: true
            }
        }
        case `${actions.DELETE_ITENARY}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Itenary")

            return{
                ...state,
                isdeleteItenaryLoading: false,
                deleteitenary:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_ITENARY}_REJECTED` : {
            return{
                ...state,
                isdeleteItenaryLoading: false,
            }
        }
		case `${actions.DELETE_ACTIVITY}_PENDING` : {
            return{
                ...state,
                isdeleteActivityLoading: true
            }
        }
        case `${actions.DELETE_ACTIVITY}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Activity")

            return{
                ...state,
                isdeleteActivityLoading: false,
                deleteactivity:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_ACTIVITY}_REJECTED` : {
            return{
                ...state,
                isdeleteActivityLoading: false,
            }
        }
		case `${actions.DELETE_COSTCENTRE}_PENDING` : {
            return{
                ...state,
                isdeleteCostCenterLoading: true
            }
        }
        case `${actions.DELETE_COSTCENTRE}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Costcentre")

            return{
                ...state,
                isdeleteCostCenterLoading: false,
                deletecostcenter:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_COSTCENTRE}_REJECTED` : {
            return{
                ...state,
                isdeleteCostCenterLoading: false,
            }
        }

		case `${actions.DELETE_CITY}_PENDING` : {
            return{
                ...state,
                isdeleteCityLoading: true
            }
        }
        case `${actions.DELETE_CITY}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"City")

            return{
                ...state,
                isdeleteCityLoading: false,
                deletecity:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_CITY}_REJECTED` : {
            return{
                ...state,
                isdeleteCityLoading: false,
            }
        }
		case `${actions.DELETE_COUPON}_PENDING` : {
            return{
                ...state,
                isdeleteCouponLoading: true
            }
        }
        case `${actions.DELETE_COUPON}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Coupon")

            return{
                ...state,
                isdeleteCouponLoading: false,
                deletecoupon:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_COUPON}_REJECTED` : {
            return{
                ...state,
                isdeleteCouponLoading: false,
            }
        }
		case `${actions.DELETE_EVENTLEVEL}_PENDING` : {
            return{
                ...state,
                isdeleteEventLevelLoading: true
            }
        }
        case `${actions.DELETE_EVENTLEVEL}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Eventlevel")

            return{
                ...state,
                isdeleteEventLevelLoading: false,
                deleteeventlevel:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_EVENTLEVEL}_REJECTED` : {
            return{
                ...state,
                isdeleteEventLevelLoading: false,
            }
        }
		case `${actions.DELETE_STATUS}_PENDING` : {
            return{
                ...state,
                isdeleteStatusLoading: true
            }
        }
        case `${actions.DELETE_STATUS}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Status")

            return{
                ...state,
                isdeleteStatusLoading: false,
                deletestatus:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_STATUS}_REJECTED` : {
            return{
                ...state,
                isdeleteStatusLoading: false,
            }
        }
		case `${actions.DELETE_EVENTTYPE}_PENDING` : {
            return{
                ...state,
                isdeleteEventTypeLoading: true
            }
        }
        case `${actions.DELETE_EVENTTYPE}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Eventtype")

            return{
                ...state,
                isdeleteEventTypeLoading: false,
                deleteeventtype:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_EVENTTYPE}_REJECTED` : {
            return{
                ...state,
                isdeleteEventTypeLoading: false,
            }
        }
		case `${actions.DELETE_PLACETOVISIT}_PENDING` : {
            return{
                ...state,
                isdeletePlaceToVisitLoading: true
            }
        }
        case `${actions.DELETE_PLACETOVISIT}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Placetovisit")

            return{
                ...state,
                isdeletePlaceToVisitLoading: false,
                deleteplacetovisit:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_PLACETOVISIT}_REJECTED` : {
            return{
                ...state,
                isdeletePlaceToVisitLoading: false,
            }
        }
		case `${actions.DELETE_BOOKING}_PENDING` : {
            return{
                ...state,
                isdeleteBookingLoading: true
            }
        }
        case `${actions.DELETE_BOOKING}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"booking")

            return{
                ...state,
                isdeleteBookingLoading: false,
                deletebooking:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_BOOKING}_REJECTED` : {
            return{
                ...state,
                isdeleteBookingLoading: false,
            }
        }
		case `${actions.DELETE_PLACETYPE}_PENDING` : {
            return{
                ...state,
                isdeletePlaceTypeLoading: true
            }
        }
        case `${actions.DELETE_PLACETYPE}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"placetype")

            return{
                ...state,
                isdeletePlaceTypeLoading: false,
                deleteplacetype:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_PLACETYPE}_REJECTED` : {
            return{
                ...state,
                isdeletePlaceTypeLoading: false,
            }
        }
		case `${actions.DELETE_STATE}_PENDING` : {
            return{
                ...state,
                isdeleteStateLoading: true
            }
        }
        case `${actions.DELETE_STATE}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"State")

            return{
                ...state,
                isdeleteStateLoading: false,
                deletestate:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_STATE}_REJECTED` : {
            return{
                ...state,
                isdeleteStateLoading: false,
            }
        }
		case `${actions.DELETE_STAY}_PENDING` : {
            return{
                ...state,
                isdeleteStayLoading: true
            }
        }
        case `${actions.DELETE_STAY}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Stay")

            return{
                ...state,
                isdeleteStayLoading: false,
                deletestay:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_STAY}_REJECTED` : {
            return{
                ...state,
                isdeleteStayLoading: false,
            }
        }
		case `${actions.DELETE_STAYTYPE}_PENDING` : {
            return{
                ...state,
                isdeleteStayTypeLoading: true
            }
        }
        case `${actions.DELETE_STAYTYPE}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Staytype")

            return{
                ...state,
                isdeleteStayTypeLoading: false,
                deletestaytype:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_STAYTYPE}_REJECTED` : {
            return{
                ...state,
                isdeleteStayTypeLoading: false,
            }
        }
		case `${actions.DELETE_TRAVELINFO}_PENDING` : {
            return{
                ...state,
                isdeleteTravelInfoLoading: true
            }
        }
        case `${actions.DELETE_TRAVELINFO}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Travelinfo")

            return{
                ...state,
                isdeleteTravelInfoLoading: false,
                deletetravelinfo:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_TRAVELINFO}_REJECTED` : {
            return{
                ...state,
                isdeleteTravelInfoLoading: false,
            }
        }
		case `${actions.DELETE_TRAVELTYPE}_PENDING` : {
            return{
                ...state,
                isdeleteTravelTypeLoading: true
            }
        }
        case `${actions.DELETE_TRAVELTYPE}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Traveltype")

            return{
                ...state,
                isdeleteTravelTypeLoading: false,
                deletetraveltype:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_TRAVELTYPE}_REJECTED` : {
            return{
                ...state,
                isdeleteTravelTypeLoading: false,
            }
        }
		case `${actions.DELETE_DESTINATION}_PENDING` : {
            return{
                ...state,
                isdeleteDestinationLoading: true
            }
        }
        case `${actions.DELETE_DESTINATION}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Destination")

            return{
                ...state,
                isdeleteDestinationLoading: false,
                deletedestination:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_DESTINATION}_REJECTED` : {
            return{
                ...state,
                isdeleteDestinationLoading: false,
            }
        }
        case `${actions.GET_PLACEACTIVITIES}_PENDING` : {
            return{
                ...state,
                isgetplaceivitiesLoading: true
            }
        }
        case `${actions.GET_PLACEACTIVITIES}_FULFILLED` : {
            return{
                ...state,
                isgetplaceivitiesLoading: false,
                getplaceactivities: action.payload.data
            }
        }
        case `${actions.GET_PLACEACTIVITIES}_REJECTED` : {
            return{
                ...state,
                isgetplaceivitiesLoading: false,
            }
        }
        case `${actions.GET_PLACEACTIVITIES_BYID}_PENDING` : {
            return{
                ...state,
                isgetplaceivitiesbyidLoading: true
            }
        }
        case `${actions.GET_PLACEACTIVITIES_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetplaceivitiesbyidLoading: false,
                getplaceactivitiesbyid: action.payload.data
            }
        }
        case `${actions.GET_PLACEACTIVITIES_BYID}_REJECTED` : {
            return{
                ...state,
                isgetplaceivitiesbyidLoading: false,
            }
        }
        case `${actions.PUT_PLACEACTIVITIES}_PENDING` : {
            return{
                ...state,
                isputPlaceactivitiesLoading: true
            }
        }
        case `${actions.PUT_PLACEACTIVITIES}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Place activity","updated")
            return{
                ...state,

                isputPlaceactivitiesLoading: false,
                putplaceactivities:action.payload.data,
                message: true,
                messageData: msgData,
                getplaceactivitiesbyid:action.payload.statusText === "error"?state. getplaceactivitiesbyid:{}

          }
        }
       case `${actions.GET_TRIP_COSTCENTER}_PENDING` : {
            return{
                ...state,
                isTripcostcenterLoading: true
            }
        }
        case `${actions.GET_TRIP_COSTCENTER}_FULFILLED` : {
            debugger
            return{
                ...state,
                isTripcostcenterLoading: false,
                gettripcostcenter: action.payload.data
            }
        }
        case `${actions.GET_TRIP_COSTCENTER}_REJECTED` : {
            return{
                ...state,
                isTripcostcenterLoading: false,
            }
        }
        case `${actions.PUT_TRIP_COSTCENTER}_PENDING` : {
            return{
                ...state,
                isputTripcostcenterLoading: true
            }
        }
        case `${actions.PUT_TRIP_COSTCENTER}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Trip costcentre","updated ")
            return{
                ...state,
                isputTripcostcenterLoading:false,
                puttripcostcenter:action.payload.data,
                gettripcostcenterbyid:action.payload.statusText === "error"?state.gettripcostcenterbyid:{},
                message: true,
                messageData: msgData,
            }
        }

        case `${actions.PUT_PLACEACTIVITIES}_REJECTED` : {
            return{
                ...state,
                isputPlaceactivitiesLoading: false,
            }
        }
        case `${actions.POST_PLACEACTIVITIES}_PENDING` : {
            return{
                ...state,
                ispostPlaceactivitiesLoading: true
            }
        }
        case `${actions.POST_PLACEACTIVITIES}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Place activities","added")
             return{
                ...state,
                ispostPlaceactivitiesLoading:false,
                postplaceactivities: action.payload.data,
                message: true,
                messageData: msgData,
                getplaceactivitiesbyid:action.payload.statusText === "error"?state.getplaceactivitiesbyid:{}
            }
        }
        case `${actions.PUT_TRIP_COSTCENTER}_REJECTED` : {
            return{
                ...state,
                isputTripcostcenterLoading: false,
            }
        }
        case `${actions.POST_TRIP_COSTCENTER}_PENDING` : {
            return{
                ...state,
                ispostTripcostcenterLoading: true
            }
        }
        case `${actions.POST_TRIP_COSTCENTER}_FULFILLED` : {
          let msgData=HandlingError(action.payload,"Trip costcentre","added")
            return{
                ...state,
                ispostTripcostcenterLoading: false,
                posttripcostcenter:action.payload.data,
                message: true,
                messageData: msgData,
                gettripcostcenterbyid:action.payload.statusText === "error"?state.gettripcostcenterbyid:{}
             }
        }
        case `${actions.POST_PLACEACTIVITIES}_REJECTED` : {
            return{
                ...state,
                ispostPlaceactivitiesLoading: false,
            }
        }
        case `${actions.DELETE_PLACEACTITIES}_PENDING` : {
            return{
                ...state,
                isdeletePlaceactivitiesLoading: true
            }
        }
        case `${actions.DELETE_PLACEACTITIES}_FULFILLED` : {
            debugger
            let msgData =deleteMsgHandling(action.payload,"Placeactivities")

              return{
                ...state,
                isdeletePlaceactivitiesLoading: false,
                deleteplaceactivities: action.payload.data,
                message: true,
                messageData: msgData,

            }
        }
        case `${actions.POST_TRIP_COSTCENTER}_REJECTED` : {
            return{
                ...state,
                ispostTripcostcenterLoading: false,
            }
        }
        case `${actions.DELETE_TRIP_COSTCENTER}_PENDING` : {
            return{
                ...state,
                isdeleteTripcostcenterLoading: true
            }
        }
        case `${actions.DELETE_TRIP_COSTCENTER}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Tripcostcentre")

            return{
                ...state,
                isdeleteTripcostcenterLoading: false,
                deletetripcostcenter:action.payload.data,
                message: true,
                messageData: msgData
            }
        }

        case `${actions.DELETE_PLACEACTITIES}_REJECTED` : {
            return{
                ...state,
                isdeletePlaceactivitiesLoading: false,
            }
        }
        case `${actions.GET_TRECKLEADERS}_PENDING` : {
            return{
                ...state,
                isgetTreckleaderLoading: true
            }
        }
        case `${actions.GET_TRECKLEADERS}_FULFILLED` : {
            return{
                ...state,
                isgetTreckleaderLoading: false,
                gettreckleaders: action.payload.data
            }
        }
        case `${actions.GET_TRECKLEADERS}_REJECTED` : {
            return{
                ...state,
                isgetTreckleaderLoading: false,
            }
        }

        case `${actions.DELETE_TRIP_COSTCENTER}_REJECTED` : {
            return{
                ...state,
                isdeleteTripcostcenterLoading: false,
            }
        }

        case `${actions.GET_TRIP_COSTCENTERBYID}_PENDING` : {
            return{
                ...state,
                isTripCostcenterbidLoading: true
            }
        }
        case `${actions.GET_TRIP_COSTCENTERBYID}_FULFILLED` : {
          debugger
            var  gettripcostcenterbyid=action.payload.data;
            if(gettripcostcenterbyid.type === "Stay")
            {
            gettripcostcenterbyid["hidestaytype"]=""
            gettripcostcenterbyid["hidetraveltype"]="true"
            }
            else if(gettripcostcenterbyid.type === "Travel")
            {
                gettripcostcenterbyid["hidestaytype"]="true"
                gettripcostcenterbyid["hidetraveltype"]=""
            }
            let tripid=gettripcostcenterbyid.tripId;
            debugger
            state.gettrip.map(obj=>{
                if(obj.tripId === tripid)
                {
                    gettripcostcenterbyid["packageId"]=obj.packageId
                }
            })
            return{
                ...state,
                isTripCostcenterbidLoading: false,
                gettripcostcenterbyid:gettripcostcenterbyid
            }
        }
        case `${actions.GET_TRIP_COSTCENTERBYID}_REJECTED` : {
            return{
                ...state,
                isTripCostcenterbidLoading: false,
            }
        }
        case `${actions.GET_TRIP_COSTCENTER_BYTRIPID}_PENDING` : {
            return{
                ...state,
                isTripCostcenterbTidLoading: true
            }
        }
        case `${actions.GET_TRIP_COSTCENTER_BYTRIPID}_FULFILLED` : {
            return{
                ...state,
                isTripCostcenterbTidLoading: false,
                gettripcostcenter: action.payload.data
            }
        }
        case `${actions.GET_TRIP_COSTCENTER_BYTRIPID}_REJECTED` : {
            return{
                ...state,
                isTripCostcenterbTidLoading: false,

            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING}_PENDING` : {
            return{
                ...state,
                isAccessoryBookingLoading: true
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING}_FULFILLED` : {
            return{
                ...state,
                isAccessoryBookingLoading: false,
                accessorybookings: action.payload.data
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING}_REJECTED` : {
            return{
                ...state,
                isAccessoryBookingLoading: false,
            }
        }
        case `${actions.PUT_ACCESSORIES_BOOKING}_PENDING` : {
            return{
                ...state,
                isputAccessoryBookingLoading: true
            }
        }
        case `${actions.PUT_ACCESSORIES_BOOKING}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Accessory booking","updated")
            return{
                ...state,
                isputAccessoryBookingLoading: true,
                putaccessorybooking:action.payload.data,
                accessorybookingbyid:action.payload.statusText === "error"?state.accessorybookingbyid:{},
                message: true,
                messageData: msgData,
            }
        }
        case `${actions.PUT_ACCESSORIES_BOOKING}_REJECTED` : {
            return{
                ...state,
                isputAccessoryBookingLoading: false,
            }
        }
        case `${actions.POST_ACCESSORIES_BOOKING}_PENDING` : {
            debugger
            //let msgData=HandlingError(action.payload,"acessaryboking","added")
            return{
                ...state,
                ispostAccessoryBookingLoading: true
            }
        }
        case `${actions.POST_ACCESSORIES_BOOKING}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Accessory boking","added")
              return{
                ...state,
                ispostAccessoryBookingLoading: false,
                postaccessorybooking:action.payload.data,
                message: true,
                messageData: msgData,
                accessorybookingbyid:action.payload.statusText === "error"?state.accessorybookingbyid:{}
            }
        }
        case `${actions.POST_ACCESSORIES_BOOKING}_REJECTED` : {
            return{
                ...state,
                ispostAccessoryBookingLoading: false,
            }
        }
        case `${actions.DELETE_ACCESSORIES_BOOKING}_PENDING` : {
            return{
                ...state,
                isdeleteAccessorybookingLoading: true
            }
        }
        case `${actions.DELETE_ACCESSORIES_BOOKING}_FULFILLED` : {

            let msgData =deleteMsgHandling(action.payload,"Accessorybooking")

            return{
                ...state,
                isdeleteAccessorybookingLoading: false,
                deleteaccessorybooking:action.payload.data,
                message: true,
                messageData: msgData
            }
        }
        case `${actions.DELETE_ACCESSORIES_BOOKING}_REJECTED` : {
            return{
                ...state,
                isdeleteAccessorybookingLoading: false,
            }
        }

        case `${actions.GET_ACCESSORIES_BOOKING_BYID}_PENDING` : {
            return{
                ...state,
                isAccessoryBookingbidLoading: true
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING_BYID}_FULFILLED` : {
            debugger

            let data1=action.payload.data.accessoryId;
            let accessarytype
            state.accessories.map(obj=>{
                if(obj.accessoriesId === data1)
                {
                    accessarytype=obj.type;
                }
            })

            let accessarybookings=action.payload.data;
            accessarybookings["accessorytype"]=accessarytype;
            return{
                ...state,
                isAccessoryBookingbidLoading: false,
                accessorybookingbyid:accessarybookings
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING_BYID}_REJECTED` : {
            return{
                ...state,
                isAccessoryBookingbidLoading: false,
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING_BYBOOKINGID}_PENDING` : {
            return{
                ...state,
                isAccessoryBookingbBidLoading: true
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING_BYBOOKINGID}_FULFILLED` : {
            return{
                ...state,
                isAccessoryBookingbBidLoading: false,
                accessorybookings: action.payload.data
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING_BYBOOKINGID}_REJECTED` : {
            return{
                ...state,
                isAccessoryBookingbBidLoading: false,

            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING_BYACCESSORYID}_PENDING` : {
            return{
                ...state,
                isAccessoryBookingbAidLoading: true
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING_BYACCESSORYID}_FULFILLED` : {
            return{
                ...state,
                isAccessoryBookingbAidLoading: false,
                getaccessorybookingbyaccessoryid: action.payload.data
            }
        }
        case `${actions.GET_ACCESSORIES_BOOKING_BYACCESSORYID}_REJECTED` : {
            return{
                ...state,
                isAccessoryBookingbAidLoading: false,
            }
        }
        case `${actions.PLACETOVISIT_BYDESTINATION}_PENDING` : {
            return{
                ...state,
                isPvbydLoading: true
            }
        }
        case `${actions.PLACETOVISIT_BYDESTINATION}_FULFILLED` : {
            return{
                ...state,
                isPvbydLoading: false,
                placetovisitbydestination: action.payload.data
            }
        }
        case `${actions.PLACETOVISIT_BYDESTINATION}_REJECTED` : {
            return{
                ...state,
                isPvbydLoading: false,
            }
        }
        case `${actions.GET_PAYMENTS}_PENDING` : {
            return{
                ...state,
                isgetpayementsLoading: true
            }
        }
        case `${actions.GET_PAYMENTS}_FULFILLED` : {
            return{
                ...state,
                isgetpayementsLoading: false,
                getpayement: action.payload.data
            }
        }
        case `${actions.GET_PAYMENTS}_REJECTED` : {
            return{
                ...state,
                isgetpayementsLoading: false,
            }
        }

        case `${actions.PAYMENTS_BYBOOKING}_PENDING` : {
            return{
                ...state,
                isgetpayementsLoading: true
            }
        }
        case `${actions.PAYMENTS_BYBOOKING}_FULFILLED` : {
            debugger
            return{
                ...state,
                isgetpayementsLoading: false,
                getpayement: action.payload.data
            }
        }
        case `${actions.PAYMENTS_BYBOOKING}_REJECTED` : {
            return{
                ...state,
                isgetpayementsLoading: false,
            }
        }

        case `${actions.GET_PAYMENT_BYID}_PENDING` : {
            return{
                ...state,
                isgetpayementbyidLoading: true
            }
        }
        case `${actions.GET_PAYMENT_BYID}_FULFILLED` : {
            let paymentDate=action.payload.data
            if(action.payload.data.paymentConfirmedDate)
            {
                paymentDate.paymentConfirmedDate=moment(paymentDate.paymentConfirmedDate).format('YYYY-MM-DD');
            }
            if(action.payload.data.paymentDate)
            {
                paymentDate.paymentDate=moment(paymentDate.paymentDate).format('YYYY-MM-DD');
            }
            return{
                ...state,
                isgetpayementbyidLoading: false,
                getpayementbyid:paymentDate
            }
        }
        case `${actions.GET_PAYMENT_BYID}_REJECTED` : {
            return{
                ...state,
                isgetpayementbyidLoading: false,
            }
        }
        case `${actions.DELETE_PAYMENT}_PENDING` : {
            return{
                ...state,
                isdeletepaymentLoading: true
            }
        }
        case `${actions.DELETE_PAYMENT}_FULFILLED` : {
            let msgData =deleteMsgHandling(action.payload,"Country")

            return{
                ...state,
                isdeletepaymentLoading: false,
                deletepayment: action.payload.data,
                message: true,
                messageData: msgData

            }
        }
        case `${actions.DELETE_PAYMENT}_REJECTED` : {
            return{
                ...state,
                isdeletepaymentLoading: false,
            }
        }
        case `${actions.PUT_PAYMENT}_PENDING` : {
            return{
                ...state,
                isputpayementLoading: true
            }
        }
        case `${actions.PUT_PAYMENT}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Payement details","updated")
            return{
                ...state,
                isputpayementLoading:false,
                putpayement:action.payload.data,
                getpayementbyid:action.payload.statusText === "error"?state.getpayementbyid:{},
                message: true,
                messageData: msgData,
            }
        }
        case `${actions.PUT_PAYMENT}_REJECTED` : {
            return{
                ...state,
                isputpayementLoading: false,
            }
        }
        case `${actions.POST_PAYMENT}_PENDING` : {
            return{
                ...state,
                ispostpayementLoading: true
            }
        }
        case `${actions.POST_PAYMENT}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"Payement details","added")
            return{
                ...state,
                ispostpayementLoading:false,
                postpayement:action.payload.data,
                getpayementbyid:action.payload.statusText === "error"?state.getpayementbyid:{},
                message: true,
                messageData: msgData,
            }
        }
        case `${actions.POST_PAYMENT}_REJECTED` : {
            return{
                ...state,
                ispostpayementLoading: false,
            }
        }
        case `${actions.ADMIN_LOGIN}_PENDING` : {
            return{
                ...state,
                isgoogleLoginLoading: true
            }
        }
        case `${actions.ADMIN_LOGIN}_FULFILLED` : {
            debugger
            let loginmsgdata1={}
            let msg
            if (action.payload.statusText === "error") {
            if(action.payload.error.response.status === 400 || action.payload.error.response.status === 500)
            {
            loginmsgdata1.msg="login failed"
            loginmsgdata1.status=false
            }
            else if(action.payload.error.response.status === 401)
            {
                window.open("/admin/login-1","_self")
            }
            }
            else
            {
                localStorage.setItem("userid",action.payload.data.id)
                console.log("userid",localStorage.getItem("userid"))
                console.log("token",action.payload.data.token)
                localStorage.setItem("GoAdventureLoginToken","Bearer "+action.payload.data.token)
                loginmsgdata1.msg="login success"
                loginmsgdata1.status="success"
               
                //this.props.history.push("/");

            }
            return{
                ...state,
                isgoogleLoginLoading: false,
                loginmsgdata:loginmsgdata1
               /*  logintoken: action.payload.data.token,
                userid:action.payload.data.id, */
                
               
            }
        }
        case `${actions.ADMIN_LOGIN}_REJECTED` : {
            return{
                ...state,
                isgoogleLoginLoading: false,
                
            }
        }
        default: return state;
    }

}

export default goAdvReducer;
