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

//accessarytypes
export const ACCESSARY_TYPE="GetAllAccessoryTypes";




export const GET_ALL_ACCESSORIES="GetAllAccessories";
export const POST_ACCESSORIES="CreateAccessory";
export const PUT_ACCESSORIES="UpdateAccessories?id=";
export const GET_ACCESSORIES_BYID="GetAccessoryById?id=";
export const DELETE_ACCESSORIES="DeleteAccessory?id=";
export const GET_ACCESSORY_BYTYPE="GetAccessoryByType?accessoryType=";
//costCentre
export const costcentrepostapi="https://ga-api.azurewebsites.net/api/v1/createMdCostCenter";
export const getallcostcentreapi="https://ga-api.azurewebsites.net/api/v1/getAllMdCostCenter";
export const costcentreupdteapi="https://ga-api.azurewebsites.net/api/v1/updateMdCostCenter?id=";
export const getcostcentrebyid="https://ga-api.azurewebsites.net/api/v1/getMdCostCenterBy?id=";

export const GET_COSTCENTRE="getAllMdCostCenter";
export const GET_COSTCENTRE_BYID="getMdCostCenterBy?id=";
export const POST_COSTCENTRE="createMdCostCenter";
export const PUT_COSTCENTRE="updateMdCostCenter?id=";
export const DELETE_COSTCENTRE="deleteMdCostCenter?id=";
//destination
export const destinationpostapi="https://ga-api.azurewebsites.net/api/v1/createDestination";
export const getdestinationbyid="https://ga-api.azurewebsites.net/api/v1/getDestinationByid?id=";
export const destinationupdateapi="https://ga-api.azurewebsites.net/api/v1/updateDestination?id=";

export const GET_DESTINATION="getAllDestination";
export const GET_DESTINATION_BYID="getDestinationByid?id=";
export const POST_DESTINATION="createDestination";
export const PUT_DESTINATION="updateDestination?id=";
export const DELETE_DESTINATION="deleteDestination?id=";
//placetype
export const placetypepostapi="https://ga-api.azurewebsites.net/api/v1/CreateMdPlaceType";
export const getplacetypebyid="https://ga-api.azurewebsites.net/api/v1/GetMdPlaceTypeById?id="
export const placetypeupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateMdPlaceType?id="

export const GET_PLACETYPE="GetAllMdPlaceTypes";
export const POST_PLACETYPE="CreateMdPlaceType";
export const GET_PLACETYPE_BYID="GetMdPlaceTypeById?id=";
export const PUT_PLACETYPE="UpdateMdPlaceType?id=";
export const DELETE_PLACETYPE="DeleteMdPlaceType?id=";

//country
export const countrypostapi="https://ga-api.azurewebsites.net/api/v1/createMdCountry";
export const deletecountry="https://ga-api.azurewebsites.net/api/v1/deleteMdCountry?id="
export const getcountrybyid="https://ga-api.azurewebsites.net/api/v1/GetMdCountryById?id="
export const countryupdateapi="https://ga-api.azurewebsites.net/api/v1/updateMdCountry?id="

export const GET_COUNTRIES="GetAllMdCountrys";
export const GET_COUNTRY_BYID="GetMdCountryById?id=";
export const POST_COUNTRY="createMdCountry";
export const PUT_COUNTRY="updateMdCountry?id=";
export const DELETE_COUNTRY="deleteMdCountry?id=";
//state
export const statepostapi="https://ga-api.azurewebsites.net/api/v1/CreateMdState";
export const getcounties="https://ga-api.azurewebsites.net/api/v1/GetAllMdCountrys";
export const getstatebyid="https://ga-api.azurewebsites.net/api/v1/GetMdStateById?id=";
export const stateupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateMdState?id=";
export const getallstatebycountry="https://ga-api.azurewebsites.net/api/v1/GetStateByCountry?countryId="


export const GET_STATES="GetAllMdStates";
export const POST_STATE="CreateMdState";
export const PUT_STATE="UpdateMdState?id=";
export const GET_STATE_BYID="GetMdStateById?id=";
export const GET_STATE_BYCOUNTRYID="GetStateByCountry?countryId=";
export const DELETE_STATE="DeleteMdState?id=";
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
export const DELETE_CITY="deleteMdCity?id=";
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


export const GET_PLACETOVISIT="GetAllPlaceToVisits";
export const POST_PLACETOVISIT="CreatePlaceToVisit";
export const PUT_PLACETOVISIT="UpdatePlaceToVisit?id=";
export const GET_PLACETOVISIT_BYID="GetPlaceToVisitById?id=";
export const DELETE_PLACETOVISIT="DeletePlaceToVisit?id=";
export const PLACETOVISIT_BYDESTINATION="GetPlacetoVisitByDestination?destinationId=";

//package
export const packagepostapi="https://ga-api.azurewebsites.net/api/v1/CreatePackage";
export const getpackages="https://ga-api.azurewebsites.net/api/v1/GetAllPackages";
export const getpackagebyid="https://ga-api.azurewebsites.net/api/v1/GetPackageById?id=";
export const packageupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdatePackage?id=";


export const GET_ALL_PACKAGES="GetAllPackages";
export const GET_PACKAGE_BYID="GetPackageById?id=";
export const POST_PACKAGE="CreatePackage";
export const PUT_PACKAGE="UpdatePackage?id=";
export const DELETE_PACKAGE="DeletePackage?id=";
//Traveltype
export const traveltypepostapi="https://ga-api.azurewebsites.net/api/v1/CreateMdTravelType";
export const traveltypegetapi="https://ga-api.azurewebsites.net/api/v1/GetAllMdTravelTypes";
export const traveltypebyid="https://ga-api.azurewebsites.net/api/v1/GetMdTravelTypeById?id=";
export const travelupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateMdTravelType?id=";

export const GET_TRAVELTYPE="GetAllMdTravelTypes";
export const GET_TRAVELTYPE_BYID="GetMdTravelTypeById?id=";
export const POST_TRAVELTYPE="CreateMdTravelType";
export const PUT_TRAVELTYPE="UpdateMdTravelType?id=";
export const DELETE_TRAVELTYPE="DeleteMdTravelType?id=";
//travelinfo
export const travelinfopostapi="https://ga-api.azurewebsites.net/api/v1/CreateTravelInfo";
export const getalltravelinfo="https://ga-api.azurewebsites.net/api/v1/GetAllTravelInfo";
export const gettravelinfobyid="https://ga-api.azurewebsites.net/api/v1/GetTravelInfoById?id=";
export const travelinfoupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateTravelInfo?id=";

export const GET_TRAVELINFO="GetAllTravelInfo";
export const GET_TRAVELINFO_BYID="GetTravelInfoById?id=";
export const POST_TRAVELINFO="CreateTravelInfo";
export const PUT_TRAVELONFO="UpdateTravelInfo?id=";
export const DELETE_TRAVELINFO="DeleteTravelInfo?id=";
//stay
export const staypostapi="https://ga-api.azurewebsites.net/api/v1/CreateStay";
export const getstays="https://ga-api.azurewebsites.net/api/v1/GetAllStays";
export const getstaybyid="https://ga-api.azurewebsites.net/api/v1/GetStayById?id=";
export const stayupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateStay?id=";

export const GET_STAY="GetAllStays";
export const POST_STAY="CreateStay";
export const GET_STAY_BYID="GetStayById?id=";
export const PUT_STAY="UpdateStay?id=";
export const DELETE_STAY="DeleteStay?id=";
//staytype
export const getstaytypes="https://ga-api.azurewebsites.net/api/v1/GetAllStayTypes";
export const staytypepostapi="https://ga-api.azurewebsites.net/api/v1/CreateStayType";
export const staytypeupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateStayType?id=";
export const staytypebyid="https://ga-api.azurewebsites.net/api/v1/GetStayTypeById?id=";

export const GET_STAYTYPE="GetAllStayTypes";
export const GET_STAYTYPE_BYID="GetStayTypeById?id=";
export const POST_STAYTYPE="CreateStayType";
export const PUT_STAYTYPE="UpdateStayType?id="
export const DELETE_STAYTYPE="DeleteStayType?id=";
//Trip
export const trippostapi="https://ga-api.azurewebsites.net/api/v1/CreateTrip";
export const tripupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateTrip?id=";
export const gettrips="https://ga-api.azurewebsites.net/api/v1/GetAllTrips";
export const gettripbyid="https://ga-api.azurewebsites.net/api/v1/GetTripById?id="
export const gettripbypackage="https://ga-api.azurewebsites.net/api/v1/GetTripByPackage?packageID="
export const GET_STAYTYPE_BYTRIPID="GetStayTypeByTrip?tripId=";
export const GET_TRAVELTYPE_BYTRIPID="GetTravelTypeByTrip?tripId=";

export const GET_TRIP_BYID="GetTripById?id=";
export const GET_TRIP_BYPACKAGEID="GetTripByPackage?packageID=";
export const GET_TRIP="GetAllTrips";
export const POST_TRIP="CreateTrip";
export const PUT_TRIP="UpdateTrip?id=";
export const DELETE_TRIP="DeleteTrip?id=";
//booking
export const getbookings="https://ga-api.azurewebsites.net/api/v1/getAllBookings";
export const bookingpostapi="https://ga-api.azurewebsites.net/api/v1/createBookings";
export const bookingupdateapi="https://ga-api.azurewebsites.net/api/v1/updateBookings?id=";
export const getbookingbyid="https://ga-api.azurewebsites.net/api/v1/getBookingsByid?id=";
export const GET_BOOKING_BYTRIPID="GetBookingsByTripId?tripId=";


export const GET_BOOKING="getAllBookings";
export const GET_BOOKING_BYID="getBookingsByid?id=";
export const POST_BOOKING="createBookings";
export const PUT_BOOKING="updateBookings?id=";
export const DELETE_BOOKING="deleteBookings?id=";

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
export const DELETE_ITENARY="deleteItenary?id=";
//activity
export const postactivityapi="https://ga-api.azurewebsites.net/api/v1/createMdActivity";
export const getactivities="https://ga-api.azurewebsites.net/api/v1/getAllMdActivitys";
export const activitybyid="https://ga-api.azurewebsites.net/api/v1/getMdActivityById?id=";
export const activityupdateapi="https://ga-api.azurewebsites.net/api/v1/updateMdActivity?id=";

export const GET_ACTIVITIES="getAllMdActivitys";
export const POST_ACTIVITY="createMdActivity";
export const PUT_ACTIVITY="updateMdActivity?id=";
export const GET_ACTIVITY_BYID="getMdActivityById?id=";
export const DELETE_ACTIVITY="deleteMdActivity?id=";
//eventlevel
export const eventlevelpostapi="https://ga-api.azurewebsites.net/api/v1/createMdEventLevel";
export const geteventlevels="https://ga-api.azurewebsites.net/api/v1/GetAllMdEventLevels";
export const geteventlevelbyid="https://ga-api.azurewebsites.net/api/v1/GetMdEventLevelById?id=";
export const eventlevelupdateapi="https://ga-api.azurewebsites.net/api/v1/updateMdEventLevel?id=";


export const GET_EVENTLEVEL="GetAllMdEventLevels";
export const POST_EVENTLEVEL="createMdEventLevel";
export const PUT_EVENTLEVEL="updateMdEventLevel?id=";
export const GET_EVENTLEVEL_BYID="GetMdEventLevelById?id=";
export const DELETE_EVENTLEVEL="DeleteMdEventLevel?id=";

//pickupanddroplocations
export const GET_PICKUPANDDROP="GetAllPickAndDropLocations";
export const POST_PICKUPANDDROP="CreatePickAndDropLocation";
export const PUT_PICKUPANDDROP="UpdatePickAndDropLocation?id=";
export const GET_PICKUPANDDROPBYID="GetPickAndDropLocationsById?id=";
export const DELETE_PICKUPANDDROP="DeletePickAndDropLocation?id=";




//status
export const getstatusapi="https://ga-api.azurewebsites.net/api/v1/GetAllMdStatus";

export const GET_STATUS="GetAllMdStatus";
export const GET_STATUS_BYTYPE="GetMdStatusByType?type=";

//eventtype
export const eventtypepostapi="https://ga-api.azurewebsites.net/api/v1/CreateMdEventType";
export const geteventtypes="https://ga-api.azurewebsites.net/api/v1/GetAllMdEventTypes";
export const geteventtypebyid="https://ga-api.azurewebsites.net/api/v1/GetMdEventTypeById?id=";
export const eventtypeupdateapi="https://ga-api.azurewebsites.net/api/v1/UpdateMdEventType?id=";

export const GET_EVENTTYPE="GetAllMdEventTypes";
export const GET_EVENTTYPE_BYID="GetMdEventTypeById?id=";
export const POST_EVENTTYPE="CreateMdEventType";
export const PUT_EVENTTYPE="UpdateMdEventType?id=";
export const DELETE_EVENTTYPE="DeleteMdEventType?id=";

//packageplace
export const getpackageplaces="https://ga-api.azurewebsites.net/api/v1/GetAllPackagePlaces";

//user
export const getallusers="https://ga-api.azurewebsites.net/api/v1/GetAllUsers";

export const GET_USER="GetAllUsers";
export const POST_USER="CreateUser";
export const PUT_USER="UpdateUser?id=";
export const GET_USER_BYID="GetUserById?id=";
export const DELETE_USER="DeleteUser?id=";

//coupon
export const getallcoupons="https://ga-api.azurewebsites.net/api/v1/getAllCoupon";
export const getcouponbyid="https://ga-api.azurewebsites.net/api/v1/getCouponByid?id=";
export const couponpostapi="https://ga-api.azurewebsites.net/api/v1/createCoupon";
export const couponupdateapi="https://ga-api.azurewebsites.net/api/v1/updateCoupon?id=";

export const GET_ALL_COUPON="getAllCoupon";
export const GET_COUPON_BYID="getCouponByid?id=";
export const POST_COUPON="createCoupon";
export const PUT_COUPON="updateCoupon?id=";
export const DELETE_COUPON="deleteCoupon?id=";
//calendar
export const GET_CALENDAR="GetCalenderList?month=12&year=2020";


//placeactivities
export const GET_PLACEACTIVITIES="GetAllPlaceActivities";
export const GET_PLACEACTIVITIES_BYID="GetPlaceActivitiesById?id=";
export const POST_PLACEACTIVITIES="CreatePlaceActivities";
export const PUT_PLACEACTIVITIES="UpdatePlaceActivities?id=";
export const DELETE_PLACEACTITIES="DeletePlaceActivities?id=";

//userbyusertype

export const GET_TRECKLEADERS="GetUsersByUserTypeId?userTypeId=4";
export const GET_USERTYPES="GetAllMdUserTypes";

//payements
export const POST_PAYMENT="CreatePayments";
export const GET_PAYMENTS="GetAllPayments";
export const GET_PAYMENT_BYID="GetPaymentsById?id=";
export const PUT_PAYMENT="UpdatePayments?id=";
export const DELETE_PAYMENT="DeletePayments?id=";
export const PAYMENTS_BYBOOKING="GetPaymentsByBookig?bookingId=";


export const  GET_TRIP_COSTCENTER="GetAllTripCostcenters";
export const  GET_TRIP_COSTCENTERBYID="GetTripCostcenterById?id=";
export const  GET_TRIP_COSTCENTER_BYTRIPID="GetTripCostCenterByTrip?tripid=";
export const  POST_TRIP_COSTCENTER="CreateTripCostcenter";
export const  PUT_TRIP_COSTCENTER="UpdateTripCostcenter?id=";
export const  DELETE_TRIP_COSTCENTER="DeleteTripCostcenter?id=";

export const GET_ACCESSORIES_BOOKING= 'GetAllAccessoryBookings';
export const PUT_ACCESSORIES_BOOKING='UpdateAccessoryBooking?id=';
export const POST_ACCESSORIES_BOOKING='CreateAccessoryBooking';
export const GET_ACCESSORIES_BOOKING_BYID='GetAccessoryBookingById?id=';
export const GET_ACCESSORIES_BOOKING_BYBOOKINGID='GetAccessoryBookingBybookingId?id=';
export const DELETE_ACCESSORIES_BOOKING="DeleteAccessoryBookingDeleteAccessoryBooking?id=";
export const GET_ACCESSORIES_BOOKING_BYACCESSORYID="GetAccessoryBookingByaccessoryId?id=";

//token
export const GET_TOKEN="SocialLogins";