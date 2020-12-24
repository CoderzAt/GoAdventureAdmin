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
                return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
            })
      });
   }
}

export const getData =(actiontype,url)=>
{
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error"};
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error"};
            })
      });
   }
}
export const putDataWithFile =(actiontype,url,obj)=> {
   const svcconfig = {
      headers: { Pragma: 'no-cache', 'Content-Type': 'multipart/form-data' }
   }
   return dispatch => {
      dispatch({
         type:actiontype,
           payload:axios.post(`${services.BASE_URL}${url}`,obj, svcconfig)
          .then(response=>{
             console.log("putdata",response)
             return response;
          })
          .catch(error=>
            {
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error"};
            })
      });
   }
}
export const deleteRecord=(actiontype,url)=>
{
   debugger
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type:actiontype,
           payload:axios.delete(`${services.BASE_URL}${url}`)
           .then(response=>{
            return response
         })
         .catch(
            error=>
            {
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error"};
            })
         });
   }
}

export const getDestination = () => {
   const svcconfig = {
      headers: { Pragma: 'no-cache' }
   }
   return dispatch => {
      dispatch({
         type: actions.GET_DESTINATION,
           payload: axios.get(`${services.GET_DESTINATION}`,svcconfig)
            .then(response => {
              console.log("destination",response)
               return response;
            })
            .catch(error => {
               return { data: { errors: [error.toString()], isSuccess: false } };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
            })
      });
   }
}
export const getCities = () => {
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
            })
      });
   }
}
export const getCitybyid = (id1) => {
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
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
               return { data: { errors: [error.toString()], isSuccess: false }, statusText: "error" };
            })
      });
   }
}

export const updatePropData = (param, value, propName) => {
   debugger
    return dispatch => {
       dispatch({
          type: actions.UPDATE_PROP,
          payload: {param: param, value: value, propName: propName}
       });
    }
 }
 export const updatePropAccData = (param, value, propName) => {
   debugger
    return dispatch => {
       dispatch({
          type: actions.UPDATE_PROP_ACC,
          payload: {param: param, value: value, propName: propName}
       });
    }
 }

 export const resetData = (actiontype,propName) => {
   return dispatch => {
      dispatch({
         type: actiontype,
         payload: {value:{},propName:propName}
      });
   }
}

export const removeErrormsg = () => {
   return dispatch => {
      dispatch({
         type: actions.REMOVE_ERROR_MSG,
         payload: {value:{}}
      });
   }
}

export const editorState = (editorState) => {
   return dispatch => {
      dispatch({
         type: actions.EDITOR_STATE,
         payload:{value:editorState}
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
