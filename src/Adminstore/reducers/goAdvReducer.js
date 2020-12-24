import * as actions from '../actions/actionTypes';

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';

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
    getbooking:[],
    getbookingbyid:[],
    putbooking:[],
    postboking:[],
    getuser:[],
    activityids:[],
    accessoryids:[]
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
            return{
                ...state,
                isItebypidLoading: true
            }
        }
        case `${actions.GET_ITENARY_BYPACKAGEID}_FULFILLED` : {
            return{
                ...state,
                isItebypidLoading: false,
                itenary: action.payload.data
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
                countries: action.payload.data,
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
        case `${actions.GET_CITY_BYID}_PENDING` : {
            return{
                ...state,
                isCitybyidLoading: true
            }
        }
        case `${actions.GET_CITY_BYID}_FULFILLED` : {
            return{
                ...state,
                isCitybyidLoading: false,
                citybyid: action.payload.data,
                cityData: action.payload.data,
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
          let updateCityData = {cityId: 0}, msgData = {};
          if(action.payload.statusText === "error") {
            msgData.message = "Error while adding the City";
            msgData.isSuccess = false;
          } else {
            msgData.message = "City added successfully.";
            msgData.isSuccess = true;
          }
            return{
                ...state,
                ispostCityLoading: false,
                postcity: action.payload.data,
                message: true,
                messageData: msgData,
                cityData: {cityId: 0}
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
            msgData.message = "Error while updating the City";
            msgData.isSuccess = false;
          } else {
            msgData.message = "City updated successfully.";
            msgData.isSuccess = true;
          }
            return{
                ...state,
                isputCityLoading: false,
                putcity: action.payload.data,
                cityData: updateCityData,
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
            return{
                ...state,
                isgetPlacetovisitbyidLoading: false,
                getplacetovisitbyid:action.payload.data
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
            let  msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while Adding the placetovisit";
              msgData.isSuccess = false;
            } else {
              msgData.message = "placetovisit added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                ispostPlacetovisitLoading: false,
                postplacetovisit:action.payload.data,
                message: true,
                messageData: msgData,
                getplacetovisitbyid:{}
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
            let updateCityData = {countryId: 0}, msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the placetovisit";
              msgData.isSuccess = false;
            } else {
              msgData.message = "placetovisit updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputPlacetovisitLoading: false,
                putplacetovisit:action.payload.data,
                message: true,
                messageData: msgData,
                getplacetovisitbyid:{}

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
              msgData.message = "State while updating the Eventlevel";
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
       
            return{
                ...state,
                isgetStaybyidLoading: false,
                getstaybyid: action.payload.data,
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while updating the travelinfo";
              msgData.isSuccess = false;
            } else {
              msgData.message = "travelinfo updated successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isputTravelinfoLoading: false,
                puttravelinfo: action.payload.data,
                message: true,
                messageData: msgData,
                gettravelinfobyid:{}
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
            let msgData = {};
            if(action.payload.statusText === "error") {
              msgData.message = "Error while adding the travelinfo";
              msgData.isSuccess = false;
            } else {
              msgData.message = "travelinfo added successfully.";
              msgData.isSuccess = true;
            }
            return{
                ...state,
                isposttTravelinfoLoading: false,
                posttravelinfo: action.payload.data,
                message: true,
                messageData: msgData,
                gettravelinfobyid:{}
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
            return{
                ...state,
                isgetTravelinfobyidLoading: false,
                gettravelinfobyid: action.payload.data
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
            return{
                ...state,
				        [propName]: updatedAccessoryData
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
        
        default: return state;
    }

}

export default goAdvReducer;
