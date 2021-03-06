import React, {Component} from 'react';
import { Link} from "react-router-dom";
/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */
import {GET_USER_BYID } from '../Shared/Services'

import { connect } from 'react-redux';
import { getAccessories, getData, postData1, putData1, updatePropAccData, resetData,deleteRecord,postDataWithFile,putDataWithFile } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'

const sidebarItems=[/* {name:"Dashboard",icon:"mdi mdi-home menu-icon"} */,
{name:"User",icon:"mdi mdi-wan menu-icon",route:"/admin/user"},
{name:"Country",icon:"mdi mdi-wan menu-icon",route:"/"},
{name:"State",icon:"mdi mdi-map menu-icon",route:"/admin/state"},
{name:"City",icon:"mdi mdi-home-map-marker menu-icon",route:"/admin/city"},
{name:"Place Type",icon:"mdi mdi-sitemap menu-icon",route:"/admin/placetype"},
{name:"Activity Type",icon:"mdi mdi-package-variant menu-icon",route:"/admin/activity"},
{name:"Destination",icon:"mdi mdi-airplane-landing menu-icon",route:"/admin/destination"},
{name:"Place To Visit",icon:"mdi mdi-map-marker menu-icon",route:"/admin/placetovisit"},
{name:"Package",icon:"mdi mdi-package-variant menu-icon",route:"/admin/package"},
{name:"Booking",icon:"mdi mdi-package-variant menu-icon",route:"/admin/booking"},
{name:"Trip",icon:"mdi mdi-package-variant menu-icon",route:"/admin/trip"},
{name:"Trip Costcenter",icon:"mdi mdi-package-variant menu-icon",route:"/admin/tripcostcenter"},
{name:"Accessories",icon:"mdi mdi-package-variant menu-icon",route:"/admin/accessories"},
{name:"Itenary",icon:"mdi mdi-package-variant menu-icon",route:"/admin/itenary"},
{name:"Stay",icon:"mdi mdi-package-variant menu-icon",route:"/admin/stay"},
{name:"Stay Types",icon:"mdi mdi-package-variant menu-icon",route:"/admin/staytype"},
{name:"Travel Info",icon:"mdi mdi-package-variant menu-icon",route:"/admin/travelinfo"},
{name:"Travel Types",icon:"mdi mdi-package-variant menu-icon",route:"/admin/traveltype"},
{name:"Eventype",icon:"mdi mdi-package-variant menu-icon",route:"/admin/eventtype"},
{name:"Event Levels",icon:"mdi mdi-package-variant menu-icon",route:"/admin/eventlevel"},
/* {name:"Cost Center",icon:"mdi mdi-package-variant menu-icon",route:"/admin/costcentre"}, */
{name:"Coupons",icon:"mdi mdi-package-variant menu-icon",route:"/admin/coupon"}
]
class Sidebar extends Component {
    constructor(props) {
        super(props);
       this.state = {
          }
    }
    componentDidMount()
    {
      debugger
      this.props.getData(action.GET_USER_BYID_PROFILE,GET_USER_BYID+localStorage.getItem("userid"))

    }

    sidebarItems(props)
    {
        return(
            <Link class="nav-link" to={props.route}>  {/* routing also url should be given as prop */}
            <span class="menu-title">{props.item}</span>
            <i class={props.icon}></i>
        </Link>
        )
    }
    getClass(routeVal) {
     
      if(routeVal === window.location.href.replace(window.location.origin, "")) {
      
        return "nav-item active";
      } else {
        return "nav-item";
      }
    }
    render() {
	    return (
         <div>
              <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item nav-profile">
                        <a href="#" class="nav-link">
                            <div class="nav-profile-image">
                                <img src="https://conservation-innovations.org/wp-content/uploads/2019/09/Dummy-Person.png" alt="profile"/>
                                <span class="login-status online"></span>
                          </div>
                            <div class="nav-profile-text d-flex flex-column">
                                <span class="font-weight-bold mb-2">{this.props.getuserbyid.firstName+" "+this.props.getuserbyid.lastName}</span>
                                <span class="text-secondary text-small">Role</span>
                            </div>
                            <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                    </li>
                     {sidebarItems.map(obj=>
                     <li key={obj.name} className={this.getClass(obj.route)}>
                        <this.sidebarItems item={obj.name} icon={obj.icon} route={obj.route}/>
                     </li>
                        )}
               </ul>
            </nav>
         </div>
        )
        }
    }

    const mapStateToProps = (state) => {
      return {
        getuserbyid:state.goAdvStore.getuserbyidprofile
        
      }
  }
  export default connect(mapStateToProps, { getData, postData1, putData1, updatePropAccData, resetData,deleteRecord,postDataWithFile,putDataWithFile })(Sidebar);
  
//export default Sidebar
