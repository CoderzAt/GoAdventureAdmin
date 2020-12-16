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
    states:[],
    citybyid:[],
    citybystate:[],
    getcountrybyid:[],
    coupons:[],
    couponbyid:[],
    postcity:[],
    putcity:[],
    postaccesory:[],
    putaccessory:[],
    getaccessorybyid:[],
    postactivity:[],
    putactivity:[],
    getactivitybyid:[]
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
                citybyid: action.payload.data
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
        case `${actions.POST_CITY}_PENDING` : {
            return{
                ...state,
                ispostCityLoading: true
            }
        }
        case `${actions.POST_CITY}_FULFILLED` : {
            return{
                ...state,
                ispostCityLoading: false,
                postcity: action.payload.data
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
            return{
                ...state,
                isputCityLoading: false,
                putcity: action.payload.data
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
        default: return state;
    }
}

export default goAdvReducer;