import React, {Component} from 'react';
import { Redirect } from 'react-router'

/* import './assets/vendors/mdi/css/materialdesignicons.min.css'
import './assets/vendors/css/vendor.bundle.base.css'
import './assets/css/style.css' */

class AdminHeader extends Component {
    constructor(props) {
        super(props);
       this.state = {
          }
    }
  async  logout(e)
    {
        e.preventDefault()
       await  localStorage.removeItem("GoAdventureLoginToken")
        
       window.location.reload(); // actually we need to go login page but history.push is not working
       

    }
    render() {
	    return (
         <div>
               <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a class="navbar-brand brand-logo" href="index.html"><img src="/assets/images/goadventure-log.png" alt="logo" /></a>
                <a class="navbar-brand brand-logo-mini" href="index.html"><img src="/assets/images/favicon.ico" alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-stretch">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="mdi mdi-menu"></span>
                </button>
                {/*  <div class="search-field d-none d-md-block">
                    <form class="d-flex align-items-center h-100" action="#">
                        <div class="input-group">
                            <div class="input-group-prepend bg-transparent">
                                <i class="input-group-text border-0 mdi mdi-magnify"></i>
                            </div>
                            <input type="text" class="form-control bg-transparent border-0" placeholder="Search projects"/>
                        </div>
                    </form>
                </div>  */}
                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item d-none d-lg-block full-screen-link">
                        <a class="nav-link">
                            <i class="mdi mdi-fullscreen" id="fullscreen-button"></i>
                        </a>
                    </li>
                    <li class="nav-item nav-logout d-none d-lg-block">
                        <a class="nav-link" href="#">
                            <i class="mdi mdi-power" onClick={(e)=>this.logout(e)} data-toggle="tooltip" title="Logout"></i>
                        </a>
                    </li>
                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span class="mdi mdi-menu"></span>
                </button>
            </div>
        </nav>
        </div>
        )
        }
    }
export default AdminHeader