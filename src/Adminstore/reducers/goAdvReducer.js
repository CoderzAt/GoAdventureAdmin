import * as actions from '../actions/actionTypes';

const initalState ={
    isPkgLoading: false,
    packages:[],
    accessories:[],
    calendar:[],
    itenary:[],
    packagebyid:[],
    gettripbypackageid:[],
    gettripbyid:[],
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
    putitenary:[],
    postitenary:[],
    getplcetovisit:[],
    postplacetovisit:[],
    putplacetovisit:[],
    getplacetovisitbyid:[],
    getdestination:[],
    placetype:[],
    postplacetype:[],
    getplacetypebyid:[],
    putplacetype:[],
    getstatebycountry:[],
    poststate:[],
    putstate:[],
    getstay:[],
    putstay:[],
    poststay:[],
    getstaybyid:[]
    message: false,
    messageData: {}
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
                gettripbypackageid: action.payload.data
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
            return{
                ...state,
                isTrbidLoading: false,
                gettripbyid: action.payload.data
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
        case `${actions.RESET_CITY}` : {
            let updatedCityData = {cityId: 0};
            updatedCityData[action.payload.param] = action.payload.value;
            return{
                ...state,
				        cityData: updatedCityData
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
            return{
                ...state,
                ispostCoutryLoading: false,
                countries: action.payload.data
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
            return{
                ...state,
                isputCountryLoading: false,
                putcountry: action.payload.data
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
            return{
                ...state,
                ispostCouponLoading: false,
                postcoupon: action.payload.data
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
            return{
                ...state,
                isputCouponLoading: false,
                putcoupon: action.payload.data
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
            return{
                ...state,
                ispostAccessoryLoading: false,
                postaccesory: action.payload.data
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
            return{
                ...state,
                isputAccessoryLoading: false,
                putaccessory: action.payload.data
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
                ispostAactivityLoading: true
            }
        }
        case `${actions.POST_ACTIVITY}_FULFILLED` : {
            return{
                ...state,
                ispostAactivityLoading: false,
                postactivity: action.payload.data
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
            return{
                ...state,
                isputAactivityLoading: false,
                putactivity: action.payload.data
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
            return{
                ...state,
                ispostCoscentreLoading: false,
                postcostcentre: action.payload.data
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
            return{
                ...state,
                isputCoscentreLoading: false,
                putcostcentre: action.payload.data
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
            return{
                ...state,
                ispostEventlevelLoading: false,
                posteventlevel: action.payload.data
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
            return{
                ...state,
                isputEventlevelLoading: false,
                puteventlevel: action.payload.data
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
            return{
                ...state,
                ispostEventtypeLoading: false,
                posteventtype: action.payload.data
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
            return{
                ...state,
                isputEventtypeLoading: false,
                puteventtype: action.payload.data
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
                getitenarybyid: action.payload.data
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
            return{
                ...state,
                ispostItenaryLoading: false,
                postitenary:action.payload.data
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
            return{
                ...state,
                isputItenaryLoading: false,
                putitenary:action.payload.data
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
                getitenary:action.payload.data
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
            return{
                ...state,
                ispostPlacetovisitLoading: false,
                postplacetovisit:action.payload.data
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
            return{
                ...state,
                isputPlacetovisitLoading: false,
                putplacetovisit:action.payload.data
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
        case `${actions.POST_PLACETYPE}_PENDING` : {
            return{
                ...state,
                ispostPlacetypeLoading: true
            }
        }
        case `${actions.POST_PLACETYPE}_FULFILLED` : {
            return{
                ...state,
                ispostPlacetypeLoading: false,
                postplacetype:action.payload.data
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
        case `${actions.POST_PLACETYPE}_FULFILLED` : {
            return{
                ...state,
                isputPlacetypeLoading: false,
                putplacetype:action.payload.data
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
                putplacetype:action.payload.data
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
            return{
                ...state,
                ispostStateLoading: false,
                poststate: action.payload.data
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
            return{
                ...state,
                isputStateLoading: false,
                putstate: action.payload.data
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
            return{
                ...state,
                isputStayLoading: false,
                putstay: action.payload.data
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
            return{
                ...state,
                ispostStayLoading: false,
                poststay: action.payload.data
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
            return{
                ...state,
                isgetStaybyidLoading: false,
                getstaybyid: action.payload.data
            }
        }
        case `${actions.GET_STAY_BYID}_REJECTED` : {
            return{
                ...state,
                isgetStaybyidLoading: false,
            }
        }

        case `${actions.UPDATE_PROP}` : {
			      console.log(action.payload);
            let propName = action.payload.propName, updatedCityData = state[propName];
            updatedCityData[action.payload.param] = action.payload.value;
            return{
                ...state,
				        [propName]: updatedCityData
            }
        }
        default: return state;
    }

}

export default goAdvReducer;
