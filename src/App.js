import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
/* import "../assets/vendors/mdi/css/materialdesignicons.min.css"
import   "../assets/vendors/css/vendor.bundle.base.css" */

/* import "./assets/vendors/mdi/css/materialdesignicons.min.css"
import "./assets/vendors/css/vendor.bundle.base.css"
import "./assets/css/style.css"
import "./assets/images/favicon.ico"
 */
/* import "./assets/vendors/js/vendor.bundle.base.js"
import "./assets/vendors/chart.js/Chart.min.js"
import "./assets/js/off-canvas.js"
import "./assets/js/hoverable-collapse.js"
import "./assets/js/misc.js"
import "./assets/js/dashboard.js"
import "./assets/js/todolist.js" */
import logo from './logo.svg';
import Package from './AdminPages/Package'
import Dsetinatiom from'./AdminPages/Destination'
import Destination from './AdminPages/Destination';
import PlaceType from './AdminPages/PlaceType'
import Country from './AdminPages/Country'
import State from './AdminPages/State'
import City from './AdminPages/City'
import PlacestoVisit from './AdminPages/PlacestoVisit';
import Coupon from './AdminPages/Coupon';
import Traveltype from './AdminPages/Traveltype';
import TravelInfo from './AdminPages/TravelInfo';
import Stay from './AdminPages/Stay';
import StayType from './AdminPages/StayType';
import Trip from './AdminPages/Trip';
import Booking from './AdminPages/Booking';
import Itenary from './AdminPages/Itenary';
import Activity from './AdminPages/Activity';
import Eventlevel from './AdminPages/Eventlevel';
import EventType from './AdminPages/EventType';
import Accessories from './AdminPages/Accesories';
import Costcentre from './AdminPages/Costcentre';
import AdminHeader from'./AdminPages/AdminHeader';
import TripCostCenter from './AdminPages/TripCostCenter';
//import './App.scss'
//import AppRoutes from './AppRoutes'

class App extends Component {
  state = {}
  /* componentDidMount() {
    this.onRouteChanged();
  } */
  render () {
    return(
      <div>
      <Router>
<AdminHeader/>
         <Switch>
            
            <Route exact path="/admin/package" component={Package}/>
            <Route exact path="/admin/destination" component={Destination}/>
            <Route exact path="/admin/placetype" component={PlaceType}/>
            <Route exact path="/" component={Country}/>
            <Route exact path="/admin/state" component={State}/>
            <Route exact path="/admin/state/:sid" component={State} />
            <Route exact path="/admin/city" component={City}/>
            <Route exact path="/admin/city/:cid" component={City}/>
            <Route exact path="/admin/placetovisit" component={PlacestoVisit}/>
            <Route exact path="/admin/placetovisit/:pid/:parent" component={PlacestoVisit}/>
            <Route exact path="/admin/coupon" component={Coupon}/>
            <Route exact path="/admin/traveltype" component={Traveltype}/>
            <Route exact path="/admin/travelinfo" component={TravelInfo}/>
            <Route exact path="/admin/stay" component={Stay}/>
            <Route exact path="/admin/staytype" component={StayType}/>
            <Route exact path="/admin/trip" component={Trip}/>
            <Route exact path="/admin/trip/:tid" component={Trip}/>
            <Route exact path="/admin/booking" component={Booking}/>
            <Route exact path="/admin/itenary" component={Itenary}/>
            <Route exact path="/admin/activity" component={Activity}/>
            <Route exact path="/admin/eventlevel" component={Eventlevel}/>
            <Route exact path="/admin/eventtype" component={EventType }/>
            <Route exact path="/admin/accessories" component={Accessories}/>
            <Route exact path="/admin/costcentre" component={Costcentre}/>
            <Route exact path="/admin/tripcostcenter" component={TripCostCenter}/>
            <Route exact path="/admin/tripcostcenter/:tid" component={TripCostCenter}/>
            </Switch>
 
        </Router>   
      </div>
    )
  }
}


/* componentDidUpdate(prevProps) {
  if (this.props.location !== prevProps.location) {
    this.onRouteChanged();
  }
}

onRouteChanged() {
  console.log("ROUTE CHANGED");
  window.scrollTo(0, 0);
  const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
  for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
    if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
      this.setState({
        isFullPageLayout: true
      })
      document.querySelector('.page-body-wrapper')//.classList.add('full-page-wrapper');
      break;
    } else {
      this.setState({
        isFullPageLayout: false
      })
     document.querySelector('.page-body-wrapper')//.classList.remove('full-page-wrapper');
    }
  }
}

}
 */

 export default App