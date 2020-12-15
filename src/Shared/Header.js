import React, {Component} from 'react';
import { Link} from "react-router-dom";
//import BookingWidget from './BookingWidget'
class Header extends Component {
    constructor(props) {
        super(props);
       this.state = {}
    }
    render() {
	    return (
		<div >
        <header id="header">
    <div class="container-fluid">

      <div id="logo" class="pull-left">
        {/* <!-- <h1><a href="#intro" class="scrollto">BizPage</a></h1> -->
        <!-- Uncomment below if you prefer to use an image logo --> */}
        <a href="#intro"><img src="img/goadventure-log.png" alt="" title="" class="wow zoomIn" /></a>
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">
        <li class="menu-active wow zoomIn" data-wow-delay="0.1s"><Link to="/">Home</Link></li>
         {/*  <!-- <li class="wow zoomIn" data-wow-delay="0.1s"><a href="">About Us</a></li> -->
          <!-- <li class="wow zoomIn" data-wow-delay="0.1s"><a href="">Events</a></li> --> */}
          <li class="menu-has-children wow zoomIn" data-wow-delay="0.1s"><a href="{{url('trip-filter')}}">Events</a>
            <ul>
              <li><a href="{{url('trip-details')}}">All Events</a></li>
             {/*  <!-- <li><a href="trip-filter.html">Go BackPacking</a></li>
              <li><a href="trip-filter.html">Go Himalayas</a></li> --> */}
              <li><a href="{{url('trip-details')}}">Go International</a></li>
            </ul>
          </li>
          <li class="wow zoomIn" data-wow-delay="0.1s"><Link to="/blogs">Blog</Link></li>
          <li class="wow zoomIn" data-wow-delay="0.1s"><Link to="/about">About</Link></li>
          <li class="wow zoomIn" data-wow-delay="0.1s"><a href="{{url('trip-filter')}}">Calendar</a></li>
          <li class="wow zoomIn" data-wow-delay="0.1s"><Link to="/videolog">Video Log</Link></li>
          <li class="wow zoomIn" data-wow-delay="0.1s"><Link to="/login-1"><i class="fa fa-user"></i> Login</Link></li>
        </ul>
      </nav>{/* <!-- #nav-menu-container --> */}
    </div>
  </header>{/* <!-- #header --> */}


         
        </div>
        )
        }
    }
    export default Header;