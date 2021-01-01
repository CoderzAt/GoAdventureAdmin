import React, {Component} from 'react';
import { Link} from "react-router-dom";
/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */

const sidebarItems=[/* {name:"Dashboard",icon:"mdi mdi-home menu-icon"} */,
{name:"User",icon:"mdi mdi-wan menu-icon",route:"/admin/user"},
{name:"Country",icon:"mdi mdi-wan menu-icon",route:"/"},
/* {name:"State",icon:"mdi mdi-map menu-icon"},*/
/*{name:"City",icon:"mdi mdi-home-map-marker menu-icon",route:"/admin/city"},*/
{name:"Place Type",icon:"mdi mdi-sitemap menu-icon",route:"/admin/placetype"},
{name:"Activity Type",icon:"mdi mdi-package-variant menu-icon",route:"/admin/activity"},
{name:"Destination",icon:"mdi mdi-airplane-landing menu-icon",route:"/admin/destination"},
/* {name:"Place To Visit",icon:"mdi mdi-map-marker menu-icon"}, */
{name:"Package",icon:"mdi mdi-package-variant menu-icon",route:"/admin/package"},
{name:"Booking",icon:"mdi mdi-package-variant menu-icon",route:"/admin/booking"},
/*{name:"Trip",icon:"mdi mdi-package-variant menu-icon",route:"/admin/trip"},*/
{name:"Accessories",icon:"mdi mdi-package-variant menu-icon",route:"/admin/accessories"},

/*{name:"Itenary",icon:"mdi mdi-package-variant menu-icon",route:"/admin/itenary"},*/
{name:"Stay",icon:"mdi mdi-package-variant menu-icon",route:"/admin/stay"},
{name:"Stay Types",icon:"mdi mdi-package-variant menu-icon",route:"/admin/staytype"},
{name:"Travel Info",icon:"mdi mdi-package-variant menu-icon",route:"/admin/travelinfo"},
{name:"Travel Types",icon:"mdi mdi-package-variant menu-icon",route:"/admin/traveltype"},
{name:"Eventype",icon:"mdi mdi-package-variant menu-icon",route:"/admin/eventtype"},
{name:"Event Levels",icon:"mdi mdi-package-variant menu-icon",route:"/admin/eventlevel"},
{name:"Cost Center",icon:"mdi mdi-package-variant menu-icon",route:"/admin/costcentre"},
{name:"Coupons",icon:"mdi mdi-package-variant menu-icon",route:"/admin/coupon"}
]
class Sidebar extends Component {
    constructor(props) {
        super(props);
       this.state = {
          }
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
    render() {
	    return (
         <div>
              <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item nav-profile">
                        <a href="#" class="nav-link">
                            <div class="nav-profile-image">
                                <img src="/assets/images/faces/face1.jpg" alt="profile"/>
                                <span class="login-status online"></span>
                          </div>
                            <div class="nav-profile-text d-flex flex-column">
                                <span class="font-weight-bold mb-2">Rajendar Prathapagiri</span>
                                <span class="text-secondary text-small">Role</span>
                            </div>
                            <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                    </li>
                     {sidebarItems.map(obj=>
                     <li class="nav-item">
                        <this.sidebarItems item={obj.name} icon={obj.icon} route={obj.route}/>
                     </li>
                        )}
               </ul>
            </nav>
         </div>
        )
        }
    }


export default Sidebar
