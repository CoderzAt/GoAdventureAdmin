import * as actions from '../actions/actionTypes';

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';

const HandlingError=(payload,paramName,actiontype,updatedata)=>
{ 
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
    } else {
        msgData.message = [{ message: `${paramName} ${actiontype}successfully `}];
        msgData.isSuccess = true;
        //updatedata.push(payload)
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
    placetovisitfunctionaldata:[]
}
const goAdvReducer = (state =initalState, action) => {
    console.log(action.type);
    switch(action.type) {
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Package";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Package updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputPackageLoading: false,
                putpackage: action.payload.data,
                message: true,
                messageData: msgData,
                packagebyid:{}
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Package";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Package added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostPackageLoading: false,
                posttpackage: action.payload.data,
                message: true,
                messageData: msgData,
                packagebyid:{}
            }
        }
        case `${actions.POST_PACKAGE}_REJECTED` : {
            return{
                ...state,
                ispostPackageLoading: false,
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
            return{
                ...state,
                isPkgbidLoading: false,
                packagebyid: action.payload.data
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
            debugger
            let staytypeids=(action.payload.data.stayTypeIds).split(",");
            var staytypenames1=[]

            staytypeids.map(obj=>
                state.getstaytype.map((item)=>{
                    if(parseInt(obj) == item.stayTypeId)
                    {
                      staytypenames1.push({stayTypeName:item.stayTypeName,stayTypeId:item.stayTypeId}); //reusability
                    }
                }))

                let traveltypeids=(action.payload.data.travelTypeIds).split(",")
                var traveltypenames=[]
                traveltypeids.map(obj=>
                    state.gettraveltype.map((item)=>{
                        if(parseInt(obj) == item.travelTypeId)
                        {
                          traveltypenames.push({travelTypeName:item.travelTypeName,travelTypeId:item.travelTypeId}); //reusability
                        }
                    }))

            return{
                ...state,
                isTrbidLoading: false,
                gettripbyid: action.payload.data,
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
                        activityids:{}
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Country";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Country added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostCoutryLoading: false,
                postcountry: action.payload.data,
                message: true,
                messageData: msgData,
                getcountrybyid:{}
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Country";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Country updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputCountryLoading: false,
                putcountry: action.payload.data,
                message: true,
                messageData: msgData,
                getcountrybyid:{}
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
           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Country";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Country deleted successfully.";
                msgData.isSuccess = true;
              }
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
            return{
                ...state,
                isCouponLoading: false,
                couponbyid: action.payload.data
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Coupon";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Coupon added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostCouponLoading: false,
                postcoupon: action.payload.data,
                message: true,
                messageData: msgData,
                couponbyid:{}
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Coupon";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Coupon updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputCouponLoading: false,
                putcoupon: action.payload.data,
                message: true,
                messageData: msgData,
                couponbyid:{}
            }
        }
        case `${actions.PUT_COUPON}_REJECTED` : {
            return{
                ...state,
                ispuCouponLoading: false,
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
            let updateAccessoryData = {accessoriesId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Acessory";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Accessory added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostAccessoryLoading: false,
                postaccesory: action.payload.data,
                message: true,
                messageData: msgData,
                getaccessorybyid: {}

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
            let updateAccessaryData = {accessoriesId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Aceessory";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Accessory updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputAccessoryLoading: false,
                putaccessory: action.payload.data,
                getaccessorybyid:{accessoriesId:0},  //here everything is setting with null thats why data removing
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
            let updateCityData = {activityId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Activity";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Activity added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostAactivityLoading: false,
                postactivity: action.payload.data,
                getactivitybyid:{activityId: 0},
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

            let updateCityData = {activityId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the activity";
              msgData.isSuccess = false;
            } else {
              msgData.message = "activity updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputAactivityLoading: false,
                putactivity: action.payload.data,
                message:true,
                messageData:msgData,
                getactivitybyid:{activityId: 0}
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
            let updateCityData = {}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while posting the costcentre";
              msgData.isSuccess = false;
            } else {
              msgData.message = "costcentre posted successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostCoscentreLoading: false,
                postcostcentre: action.payload.data,
                message: true,
                messageData: msgData,
                getcostcentrebyid: {}
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
            let updateCityData = {}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the costcentre";
              msgData.isSuccess = false;
            } else {
              msgData.message = "costcentre upadated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputCoscentreLoading: false,
                putcostcentre: action.payload.data,
                message: true,
                messageData: msgData,
                getcostcentrebyid: {}
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Eventlevel";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Eventlevel added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostEventlevelLoading: false,
                posteventlevel: action.payload.data,
                message: true,
                messageData: msgData,
                geteventlevelbyid:{}
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Eventlevel";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Eventlevel updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputEventlevelLoading: false,
                puteventlevel: action.payload.data,
                message: true,
                messageData: msgData,
                geteventlevelbyid:{}
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while Adding the Eventtype";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Eventtype added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostEventtypeLoading: false,
                posteventtype: action.payload.data,
                message: true,
                messageData: msgData,
                geteventtypebyid:{}
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
                isputEventtypeLoading: true
            }
        }
        case `${actions.PUT_EVENTTYPE}_FULFILLED` : {
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Eventtype";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Eventtype updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputEventtypeLoading: false,
                puteventtype: action.payload.data,
                message: true,
                messageData: msgData,
                geteventtypebyid:{}
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the itenary";
              msgData.isSuccess = false;
            } else {
              msgData.message = "itenary added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostItenaryLoading: false,
                postitenary:action.payload.data,
                message: true,
                messageData: msgData,
                getitenarybyid:{}
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Itenary";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Itenary updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputItenaryLoading: false,
                putitenary:action.payload.data,
                message: true,
                messageData: msgData,
                getitenarybyid:{}

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
                getplacetovisitbyid:placetovisitdata/* action.payload.data */
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
                ispostPlacetovisitbyidLoading: true
            }
        }
        case `${actions.POST_PLACETOVISIT}_FULFILLED` : {
            let msgData=HandlingError(action.payload,"placetovisit","added")
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
                isputPlacetovisitbyidLoading: true
            }
        }
        case `${actions.PUT_PLACETOVISIT}_FULFILLED` : {
            debugger
            let msgData=HandlingError(action.payload,"placetovisit","updated")
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Destination";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Destination added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostDestinationLoading: false,
                postdestination:action.payload.data,
                message: true,
                messageData: msgData,
                getdestinationbyid:{}

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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while added the Destination";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Destination updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputDestinationLoading: false,
                putdestination:action.payload.data,
                message: true,
                messageData: msgData,
                getdestinationbyid:{}

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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Placetype";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Placetype added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostPlacetypeLoading: false,
                postplacetype:action.payload.data,
                message: true,
                messageData: msgData,
                getplacetypebyid:{}

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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Placetype";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Placetype Updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputPlacetypeLoading: false,
                putplacetype:action.payload.data,
                message: true,
                messageData: msgData,
                getplacetypebyid:{}
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the State";
              msgData.isSuccess = false;
            } else {
              msgData.message = "State added successfully.";
              msgData.isSuccess = true;
            }

            return{
                ...state,
                ispostStateLoading: false,
                poststate: action.payload.data,
                message: true,
                messageData: msgData,
                getstatebyid:{}
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating State";
              msgData.isSuccess = false;
            } else {
              msgData.message = "State updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputStateLoading: false,
                putstate: action.payload.data,
                message: true,
                messageData: msgData,
                getstatebyid:{}
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Stay";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Stay updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputStayLoading: false,
                putstay: action.payload.data,
                message: true,
                messageData: msgData,
                getstaybyid:{},
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Stay";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Stay added successfully.";
              msgData.isSuccess = true;
            }

            return{
                ...state,
                ispostStayLoading: false,
                poststay: action.payload.data,
                message: true,
                messageData: msgData,
                getstaybyid:{},
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the staytype";
              msgData.isSuccess = false;
            } else {
              msgData.message = "staytype added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostStaytypeLoading: false,
                poststaytype: action.payload.data,
                message: true,
                messageData: msgData,
                getstaytypebyid:{}
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
                ispostTravelinfoLoading: false,
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the staytype";
              msgData.isSuccess = false;
            } else {
              msgData.message = "staytype updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputStaytypeLoading: false,
                putstaytype: action.payload.data,
                message: true,
                messageData: msgData,
                getstaytypebyid:{}
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the traveltype";
              msgData.isSuccess = false;
            } else {
              msgData.message = "traveltype updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputTraveltypeLoading: false,
                puttraveltype: action.payload.data,
                message: true,
                messageData: msgData,
                gettraveltypebyid:{}
             }
        }
        case `${actions.POST_TRAVELTYPE}_PENDING` : {
            return{
                ...state,
                isposttTraveltypeLoading: true
            }
        }
        case `${actions.POST_TRAVELTYPE}_FULFILLED` : {
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the traveltype";
              msgData.isSuccess = false;
            } else {
              msgData.message = "traveltype added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostTraveltypeLoading: false,
                puttraveltype: action.payload.data,
                message: true,
                messageData: msgData,
                gettraveltypebyid:{}
             }
        }
        case `${actions.POST_TRAVELTYPE}_REJECTED` : {
            return{
                ...state,
                isposttTraveltypeLoading: false,
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the trip";
              msgData.isSuccess = false;
            } else {
              msgData.message = "trip added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostTripLoading: false,
                postrip: action.payload.data,
                message: true,
                messageData: msgData,
                gettripbyid:{},
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the trip";
              msgData.isSuccess = false;
            } else {
              msgData.message = "trip updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostTripLoading: false,
                putrip: action.payload.data,
                message: true,
                messageData: msgData,
                gettripbyid:{},
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
                getbooking: action.payload.data
            }
        }
        case `${actions.GET_BOOKING}_REJECTED` : {
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
            let accessoryids=(action.payload.data.accessories).split(",");
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
                    }))
            return{
                ...state,
                isgetBookingbyidLoading: false,
                getbookingbyid: action.payload.data,
                accessoryids:accessorynames1,
                activityids:activitynames1
            }
        }
        case `${actions.GET_BOOKING_BYID}_REJECTED` : {
            return{
                ...state,
                isgetBookingbyidLoading: false,

            }
        }
        case `${actions.PUT_BOOKING}_PENDING` : {
            return{
                ...state,
                isputBookingLoading: true
            }
        }
        case `${actions.PUT_BOOKING}_FULFILLED` : {
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Booking";
              msgData.isSuccess = false;
            } else {
              msgData.message = "booking updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputBookingLoading: false,
                putbooking: action.payload.data,
                message: true,
                messageData: msgData,
                getbookingbyid:{},
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Booking";
              msgData.isSuccess = false;
            } else {
              msgData.message = "booking updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostBookingLoading: false,
                postbooking: action.payload.data,
                message: true,
                messageData: msgData,
                getbookingbyid:{},
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
            return{
                ...state,
                isgetUserLoading: false,
                getuserbyid: action.payload.data
            }
        }
        case `${actions.GET_USER_BYID}_REJECTED` : {
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the user";
              msgData.isSuccess = false;
            } else {
              msgData.message = "user updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputUserLoading: false,
                putuser: action.payload.data,
                message: true,
                messageData: msgData,
                getuserbyid:{}
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the user";
              msgData.isSuccess = false;
            } else {
              msgData.message = "user added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostUserLoading: false,
                postuser: action.payload.data,
                message: true,
                messageData: msgData,
                getuserbyid:{}
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
            return{
                ...state,
                isdeleteUserLoading: false,
                deleteuser: action.payload.data
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Package";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Package deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Accessory";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Accessory deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Trip";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Trip deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Itenary";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Itenary deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Activity";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Activity deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the CostCenter";
                msgData.isSuccess = false;
              } else {
                msgData.message = "CostCenter deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the City";
                msgData.isSuccess = false;
              } else {
                msgData.message = "City deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Coupon";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Coupon deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the EventLevel";
                msgData.isSuccess = false;
              } else {
                msgData.message = "EventLevel deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Status";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Status deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the EventType";
                msgData.isSuccess = false;
              } else {
                msgData.message = "EventType deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the PlaceToVisit";
                msgData.isSuccess = false;
              } else {
                msgData.message = "PlaceToVisit deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Booking";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Booking deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the PlaceType";
                msgData.isSuccess = false;
              } else {
                msgData.message = "PlaceType deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the State";
                msgData.isSuccess = false;
              } else {
                msgData.message = "State deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Stay";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Stay deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the StayType";
                msgData.isSuccess = false;
              } else {
                msgData.message = "StayType deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Travel Info";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Travel Info deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Travel Type";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Travel Type deleted successfully.";
                msgData.isSuccess = true;
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the Destination";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Destination deleted successfully.";
                msgData.isSuccess = true;
              }
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the placeactivities";
              msgData.isSuccess = false;
            } else {
              msgData.message = "placeactivities updated successfully.";
              return{
                ...state,

                isputPlaceactivitiesLoading: false,
                putplaceactivities:action.payload.data,
                message: true,
                messageData: msgData,
                getplaceactivitiesbyid:{}

            }
        }
    }
       case `${actions.GET_TRIP_COSTCENTER}_PENDING` : {
            return{
                ...state,
                isTripcostcenterLoading: true
            }
        }
        case `${actions.GET_TRIP_COSTCENTER}_FULFILLED` : {
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Tripcostcentre";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Tripcostcentre updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputTripcostcenterLoading: true,
                puttripcostcenter:action.payload.data,
                gettripcostcenterbyid:{},
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the placeactivities";
              msgData.isSuccess = false;
            } else {
              msgData.message = "placeactivities added successfully.";
            }
            return{
                ...state,
                ispostPlaceactivitiesLoading: true,
                postplaceactivities: action.payload.data,
                message: true,
                messageData: msgData,
                getplaceactivitiesbyid:{}
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Tripcostcentre";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Tripcostcentre added successfully.";

              msgData.isSuccess = true;
            }
            return{
                ...state,
                isposttripcostcentreLoading: false,
                posttripcostcenter:action.payload.data,
                message: true,
                messageData: msgData,
                gettripcostcenterbyid:{}

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
           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while deleting the Placeactivities";
                msgData.isSuccess = false;
              } else {
                msgData.message = "Placeactivity deleted successfully.";
              }
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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the tripcostcetre";
                msgData.isSuccess = false;
              } else {
                msgData.message = "tripcostcentre deleted successfully.";
                msgData.isSuccess = true;
              }
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
            return{
                ...state,
                isTripCostcenterbidLoading: false,
                gettripcostcenterbyid: action.payload.data
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Accessory Booking";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Accessory Booking updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputAccessoryBookingLoading: true,
                putaccessorybooking:action.payload.data,
                accessorybookingbyid:{},
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
            return{
                ...state,
                ispostAccessoryBookingLoading: true
            }
        }
        case `${actions.POST_ACCESSORIES_BOOKING}_FULFILLED` : {
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Accessory Booking";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Accessory Booking added successfully.";

              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostAccessoryBookingLoading: false,
                postaccessorybooking:action.payload.data,
                message: true,
                messageData: msgData,
                accessorybookingbyid:{}

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

           let msgData = {};
            if(action.payload.statusText === "error") {
                msgData.message = "Error while delting the tripcostcetre";
                msgData.isSuccess = false;
              } else {
                msgData.message = "tripcostcentre deleted successfully.";
                msgData.isSuccess = true;
              }
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
        case `${actions.GET_PAYMENT_BYID}_PENDING` : {
            return{
                ...state,
                isgetpayementbyidLoading: true
            }
        }
        case `${actions.GET_PAYMENT_BYID}_FULFILLED` : {
            return{
                ...state,
                isgetpayementbyidLoading: false,
                getpayementbyid: action.payload.data
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
            return{
                ...state,
                isdeletepaymentLoading: false,
                deletepayment: action.payload.data
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the Payement Booking";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Payement Booking updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputpayementLoading: true,
                putpayement:action.payload.data,
                getpayementbyid:{},
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the Payement Booking";
              msgData.isSuccess = false;
            } else {
              msgData.message = "Payement Booking added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostpayementLoading: true,
                postpayement:action.payload.data,
                getpayementbyid:{},
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
        default: return state;
    }

}

export default goAdvReducer;
