import axios from 'axios';
import * as actions from './actionTypes';
import * as services from '../../Shared/Services';

//Get all packages
export const getPackages = () => {
    const svcconfig = {
       headers: { Pragma: 'no-cache' }
    }
    return dispatch => {
       dispatch({
          type: actions.GET_ALL_PACKAGES,
            payload: axios.get(`${services.BASE_URL}${services.GET_ALL_PACKAGES}`, svcconfig)
             .then(response => {
               console.log("packages",response)
                return response;
               })
             .catch(error => {
                return { data: { errors: [error.toString()], isSuccess: false } };
             })
       });
    }
 }

 export const getAccessories = (actiontype,url) => {
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type:actiontype,
           payload: axios.get(`${services.BASE_URL}${url}`, svcconfig)
            .then(response => {
              console.log("accessories",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}

export const getData =(actiontype,url)=>
{
   debugger
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type:actiontype,
           payload: axios.get(`${services.BASE_URL}${url}`, svcconfig)
            .then(response => {
              console.log("accessories",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }

}

export const postData1 =(actiontype,url,obj)=>
{
    debugger
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type:actiontype,
           payload:axios.post(`${services.BASE_URL}${url}`,obj)
          .then(response=>{
             console.log("postdata",response)
             return response;
          })
          .catch(error=>
            {
               return { data: { errors: [error.toString()], isSuccess: false }};
            })
      });
   }
}
export const putData1 =(actiontype,url,obj)=>
{
    debugger
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type:actiontype,
           payload:axios.put(`${services.BASE_URL}${url}`,obj)
          .then(response=>{
             console.log("putdata",response)
             return response;
          })
          .catch(error=>
            {
               return { data: { errors: [error.toString()], isSuccess: false }};
            })
      });
   }
}


export const getCalendar = () => {
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_CALENDAR,
           payload: axios.get(`${services.BASE_URL}${services.GET_CALENDAR}`, svcconfig)
            .then(response => {
              console.log("calendar",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}
export const getItenary = (id1) => { 
   let id=id1;
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_ITENARY_BYPACKAGEID,
           payload: axios.get(`${services.BASE_URL}${services.GET_ITENARY_BYPACKAGEID}${id}`, svcconfig)
            .then(response => {
              console.log("itenary",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}
export const getPackagebyid = (id1) => { 
   let id=id1;
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_PACKAGE_BYID,
           payload: axios.get(`${services.BASE_URL}${services.GET_PACKAGE_BYID}${id}`, svcconfig)
            .then(response => {
              console.log("packagebyid",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}

export const getTripbypackageid = (id1) => { 
   let id=id1;
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_TRIP_BYPACKAGEID,
           payload: axios.get(`${services.BASE_URL}${services.GET_TRIP_BYPACKAGEID}${id}`, svcconfig)
            .then(response => {
              console.log("packagebyid",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}

export const getTripbyid = (id1) => { 
   let id=id1;
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_TRIP_BYID,
           payload: axios.get(`${services.BASE_URL}${services.GET_TRIP_BYID}${id}`, svcconfig)
            .then(response => {
              console.log("tripbyid",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}

export const getActivity = () => { 
   
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_AVCTIVITIES,
           payload: axios.get(`${services.BASE_URL}${services.GET_ACTIVITIES}`, svcconfig)
            .then(response => {
              console.log("activities",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}
export const getCities = () => { 
   debugger
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_CITIES,
           payload: axios.get(`${services.BASE_URL}${services.GET_CITIES}`, svcconfig)
            .then(response => {
              console.log("cities",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}
export const getCountries = () => { 
   
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_COUNTRIES,
           payload: axios.get(`${services.BASE_URL}${services.GET_COUNTRIES}`, svcconfig)
            .then(response => {
              console.log("countries",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}
export const getStates = () => { 
   
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_STATES,
           payload: axios.get(`${services.BASE_URL}${services.GET_STATES}`, svcconfig)
            .then(response => {
              console.log("states",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
}
export const getCitybyid=(id1)=>
{
   let id=id1
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_CITY_BYID,
           payload: axios.get(`${services.BASE_URL}${services.GET_CITY_BYID}${id}`, svcconfig)
            .then(response => {
              console.log("citybyid",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }  
}
export const getCitybystate=(id1)=>
{
debugger
   let id=id1
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_CITY_STATEID,
           payload: axios.get(`${services.BASE_URL}${services.GET_CITY_STATEID}${id}`, svcconfig)
            .then(response => {
              console.log("citybystate",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }  
}
























 /* export const getData=(actiontype,api)=>
 {
    debugger
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type:actiontype,
           payload: axios.get(api, svcconfig)
            .then(response => {
              console.log("accessories",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
            })
      });
   }
   
 } */
