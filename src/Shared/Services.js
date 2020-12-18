//post data function
export async function postData(obj,url,meth)
{
   debugger
    var message
    const response=await fetch(url, {
            method:meth,
            body: JSON.stringify(
                obj
            ),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
            })
           if(response.status === 200)
           {
            message="data is posted";
           }
           else
           {
             message="got an error while posting the data";
           }
  return message
} 
//load data function
export async function loadData(api)
{
    const response=await fetch(api)
    return (response.json())
}


export const BASE_URL="https://ga-api.azurewebsites.net/api/v1/";

//all the api's are placed here
//Accessories
export const accessorypostapi="https://ga-api.azurewebsites.net/api/v1/CreateAccessory";
export const getaccessories="https://ga-api.azurewebsites.net/api/v1/GetAllAccessories";
export const accessorybyid="https://ga-api.azurewebsites.net/api/v1/GetAccessoryById?id=";
export const accessoryupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateAccessories?id=";

export const GET_ALL_ACCESSORIES="GetAllAccessories";
export const POST_ACCESSORIES="CreateAccessory";
export const PUT_ACCESSORIES="UpdateAccessories?id=";
export const GET_ACCESSORIES_BYID="GetAccessoryById?id=";
//costCentre
export const costcentrepostapi="https://ga-api.azurewebsites.net/api/v1/createMdCostCenter";
export const getallcostcentreapi="https://ga-api.azurewebsites.net/api/v1/getAllMdCostCenter";
export const costcentreupdteapi="https://ga-api.azurewebsites.net/api/v1/updateMdCostCenter?id=";
export const getcostcentrebyid="https://ga-api.azurewebsites.net/api/v1/getMdCostCenterBy?id=";

export const GET_COSTCENTRE="getAllMdCostCenter";
export const GET_COSTCENTRE_BYID="getMdCostCenterBy?id=";
export const POST_COSTCENTRE="createMdCostCenter";
export const PUT_COSTCENTRE="updateMdCostCenter?id=";

//destination
export const destinationpostapi="https://ga-api.azurewebsites.net/api/v1/createDestination";
export const getdestinationbyid="https://ga-api.azurewebsites.net/api/v1/getDestinationByid?id=";
export const destinationupdateapi="https://ga-api.azurewebsites.net/api/v1/updateDestination?id=";

export const GET_ALL_DESTINATION=""
//placetype
export const placetypepostapi="https://ga-api.azurewebsites.net/api/v1/CreateMdPlaceType";
export const getplacetypebyid="https://ga-api.azurewebsites.net/api/v1/GetMdPlaceTypeById?id="
export const placetypeupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateMdPlaceType?id="
//country
export const countrypostapi="https://ga-api.azurewebsites.net/api/v1/createMdCountry";
export const deletecountry="https://ga-api.azurewebsites.net/api/v1/deleteMdCountry?id="
export const getcountrybyid="https://ga-api.azurewebsites.net/api/v1/GetMdCountryById?id="
export const countryupdateapi="https://ga-api.azurewebsites.net/api/v1/updateMdCountry?id="

export const GET_COUNTRIES="GetAllMdCountrys";
export const GET_COUNTRY_BYID="GetMdCountryById?id=";
export const POST_COUNTRY="createMdCountry";
export const PUT_COUNTRY="updateMdCountry?id=";
//state
export const statepostapi="https://ga-api.azurewebsites.net/api/v1/CreateMdState";
export const getcounties="https://ga-api.azurewebsites.net/api/v1/GetAllMdCountrys";
export const getstatebyid="https://ga-api.azurewebsites.net/api/v1/GetMdStateById?id=";
export const stateupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateMdState?id=";
export const getallstatebycountry="https://ga-api.azurewebsites.net/api/v1/GetStateByCountry?countryId="


export const GET_STATES="GetAllMdStates";
//city
export const citypostapi="https://ga-api.azurewebsites.net/api/v1/createMdCity";
export const getstates="https://ga-api.azurewebsites.net/api/v1/GetAllMdStates";
export const getcitybyid="https://ga-api.azurewebsites.net/api/v1/getMdCityById?id=";
export const cityupdateapi="https://ga-api.azurewebsites.net/api/v1/updateMdCity?id=";
export const getcitybystate="https://ga-api.azurewebsites.net/api/v1/GetCityByState?stateId=";


export const POST_CITY="createMdCity";
export const PUT_CITY="updateMdCity?id=";


export const GET_CITIES="getAllMdCitys";
export const GET_CITY_BYID="getMdCityById?id=";
export const GET_CITY_STATEID="GetCityByState?stateId=";
//placetovisit
export const placetovisitpostapi="https://ga-api.azurewebsites.net/api/v1/CreatePlaceToVisit";
export const getdestinations="https://ga-api.azurewebsites.net/api/v1getAllDestination";
export const getplacetypes="https://ga-api.azurewebsites.net/api/v1/GetAllMdPlaceTypes";
export const getcities="https://ga-api.azurewebsites.net/api/v1/getAllMdCitys"
export const getplacetovisit="https://ga-api.azurewebsites.net/api/v1/GetAllPlaceToVisits";
export const getplacetovisitbyid="https://ga-api.azurewebsites.net/api/v1/GetPlaceToVisitById?id=";
export const placetovisitupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdatePlaceToVisit?id=";
export const getplacetovisitbycity="https://ga-api.azurewebsites.net/api/v1/GetPlacetoVisitByCity?cityId=";
export const getplacetovisitbydestination="https://ga-api.azurewebsites.net/api/v1/GetPlacetoVisitByDestination?destinationId=";

//package
export const packagepostapi="https://ga-api.azurewebsites.net/api/v1/CreatePackage";
export const getpackages="https://ga-api.azurewebsites.net/api/v1/GetAllPackages";
export const getpackagebyid="https://ga-api.azurewebsites.net/api/v1/GetPackageById?id=";
export const packageupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdatePackage?id=";


export const GET_ALL_PACKAGES="GetAllPackages";
export const GET_PACKAGE_BYID="GetPackageById?id=";

//Traveltype
export const traveltypepostapi="https://ga-api.azurewebsites.net/api/v1/CreateMdTravelType";
export const traveltypegetapi="https://ga-api.azurewebsites.net/api/v1/GetAllMdTravelTypes";
export const traveltypebyid="https://ga-api.azurewebsites.net/api/v1/GetMdTravelTypeById?id=";
export const travelupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateMdTravelType?id=";

//travelinfo
export const travelinfopostapi="https://ga-api.azurewebsites.net/api/v1/CreateTravelInfo";
export const getalltravelinfo="https://ga-api.azurewebsites.net/api/v1/GetAllTravelInfo";
export const gettravelinfobyid="https://ga-api.azurewebsites.net/api/v1/GetTravelInfoById?id=";
export const travelinfoupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateTravelInfo?id=";

//stay
export const staypostapi="https://ga-api.azurewebsites.net/api/v1/CreateStay";
export const getstays="https://ga-api.azurewebsites.net/api/v1/GetAllStays";
export const getstaybyid="https://ga-api.azurewebsites.net/api/v1/GetStayById?id=";
export const stayupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateStay?id=";

//staytype
export const getstaytypes="https://ga-api.azurewebsites.net/api/v1/GetAllStayTypes";
export const staytypepostapi="https://ga-api.azurewebsites.net/api/v1/CreateStayType";
export const staytypeupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateStayType?id=";
export const staytypebyid="https://ga-api.azurewebsites.net/api/v1/GetStayTypeById?id=";

//Trip
export const trippostapi="https://ga-api.azurewebsites.net/api/v1/CreateTrip";
export const tripupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateTrip?id=";
export const gettrips="https://ga-api.azurewebsites.net/api/v1/GetAllTrips";
export const gettripbyid="https://ga-api.azurewebsites.net/api/v1/GetTripById?id="
export const gettripbypackage="https://ga-api.azurewebsites.net/api/v1/GetTripByPackage?packageID="

export const GET_TRIP_BYID="GetTripById?id=";
export const GET_TRIP_BYPACKAGEID="GetTripByPackage?packageID=";

//booking
export const getbookings="https://ga-api.azurewebsites.net/api/v1/getAllBookings";
export const bookingpostapi="https://ga-api.azurewebsites.net/api/v1/createBookings";
export const bookingupdateapi="https://ga-api.azurewebsites.net/api/v1/updateBookings?id=";
export const getbookingbyid="https://ga-api.azurewebsites.net/api/v1/getBookingsByid?id=";

//Itenary
export const itenarypostapi="https://ga-api.azurewebsites.net/api/v1/createItenary";
export const itenarygetapi="https://ga-api.azurewebsites.net/api/v1/getAllItenary";
export const getiternarybyid="https://ga-api.azurewebsites.net/api/v1/getItenaryByid?id=";
export const itenaryupdateapi="https://ga-api.azurewebsites.net/api/v1/updateItenary?id="
export const itenarybypackageid="https://ga-api.azurewebsites.net/api/v1/GetItenaryByPackageId?packageId="

export const GET_ITENARY_BYPACKAGEID="GetItenaryByPackageId?packageId=";
export const GET_ITENARY="getAllItenary";
export const POST_ITENARY="createItenary";
export const PUT_ITENARY="updateItenary?id=";
export const GET_ITENARY_BYID="getItenaryByid?id=";

//activity
export const postactivityapi="https://ga-api.azurewebsites.net/api/v1/createMdActivity";
export const getactivities="https://ga-api.azurewebsites.net/api/v1/getAllMdActivitys";
export const activitybyid="https://ga-api.azurewebsites.net/api/v1/getMdActivityById?id=";
export const activityupdateapi="https://ga-api.azurewebsites.net/api/v1/updateMdActivity?id=";

export const GET_ACTIVITIES="getAllMdActivitys";
export const POST_ACTIVITY="createMdActivity";
export const PUT_ACTIVITY="updateMdActivity?id=";
export const GET_ACTIVITY_BYID="getMdActivityById?id=";

//eventlevel
export const eventlevelpostapi="https://ga-api.azurewebsites.net/api/v1/createMdEventLevel";
export const geteventlevels="https://ga-api.azurewebsites.net/api/v1/GetAllMdEventLevels";
export const geteventlevelbyid="https://ga-api.azurewebsites.net/api/v1/GetMdEventLevelById?id=";
export const eventlevelupdateapi="https://ga-api.azurewebsites.net/api/v1/updateMdEventLevel?id=";


export const GET_EVENTLEVEL="GetAllMdEventLevels";
export const POST_EVENTLEVEL="createMdEventLevel";
export const PUT_EVENTLEVEL="updateMdEventLevel?id=";
export const GET_EVENTLEVEL_BYID="GetMdEventLevelById?id=";

//status
export const getstatusapi="https://ga-api.azurewebsites.net/api/v1/GetAllMdStatus";

export const GET_STATUS="GetAllMdStatus";

//eventtype
export const eventtypepostapi="https://ga-api.azurewebsites.net/api/v1/CreateMdEventType";
export const geteventtypes="https://ga-api.azurewebsites.net/api/v1/GetAllMdEventTypes";
export const geteventtypebyid="https://ga-api.azurewebsites.net/api/v1/GetMdEventTypeById?id=";
export const eventtypeupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateMdEventType?id=";

export const GET_EVENTTYPE="GetAllMdEventTypes";
export const GET_EVENTTYPE_BYID="GetMdEventTypeById?id=";
export const POST_EVENTTYPE="CreateMdEventType";
export const PUT_EVENTTYPE="UpdateMdEventType?id=";


//packageplace
export const getpackageplaces="https://ga-api.azurewebsites.net/api/v1/GetAllPackagePlaces";

//user
export const getallusers="https://ga-api.azurewebsites.net/api/v1/GetAllUsers";

//coupon
export const getallcoupons="https://ga-api.azurewebsites.net/api/v1/getAllCoupon";
export const getcouponbyid="https://ga-api.azurewebsites.net/api/v1/getCouponByid?id=";
export const couponpostapi="https://ga-api.azurewebsites.net/api/v1/createCoupon";
export const couponupdateapi="https://ga-api.azurewebsites.net/api/v1/updateCoupon?id=";

export const GET_ALL_COUPON="getAllCoupon";
export const GET_COUPON_BYID="getCouponByid?id=";
export const POST_COUPON="createCoupon";
export const PUT_COUPON="PUT_COUPON";

//calendar
export const GET_CALENDAR="GetCalenderList?month=12&year=2020";
