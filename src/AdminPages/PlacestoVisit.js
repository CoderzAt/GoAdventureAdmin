import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { postData, placetovisitpostapi, loadData, getcities, getdestinations, getplacetypes, getplacetovisit, getplacetovisitbyid, placetovisitupdateapi, getplacetovisitbycity, getplacetovisitbydestination, GET_CITIES,GET_PLACETYPE, POST_PLACETOVISIT, GET_PLACETOVISIT_BYID } from '../Shared/Services'
import Sidebar from './Sidebar'

import { connect } from 'react-redux';
import {getDestination, getData, postData1, putData1 } from '../Adminstore/actions/goAdvActions';
import * as action from '../Adminstore/actions/actionTypes'

class PlacestoVisit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            //citynames:[],
            destinationnames: [],
           // placetypes: [],
            placename: null,
            placegenre: null,
            placedescription: null,
            price: null,
            destinationId: 1,
            placeTypeId: 1,
            cityId: 1,
            placetovisitTable: [],
            editData: [],
            hidecity: "",
            hidedestination: ""
        }
    }

    async componentDidMount() {
        debugger

        var url
        if (this.props.match.params.parent == "city") {
            if (this.props.match.params.pid != undefined) {
                let valuefromurl = parseInt(this.props.match.params.pid);
                url = getplacetovisitbycity + valuefromurl;
            }
            this.setState({
                hidecity: "",
                hidedestination: "true"
            })
        }
        else if (this.props.match.params.parent == "destination") {
            if (this.props.match.params.pid != undefined) {
                let valuefromurl = parseInt(this.props.match.params.pid);
                url = getplacetovisitbydestination + valuefromurl;
            }

            this.setState({
                hidecity: "true",
                hidedestination: ""
            })

        }
        else {
            url = getplacetovisit
            this.setState({
                hidecity: "true",
                hidedestination: "true"
            })
        }

        let palcetovisitdata = await loadData(url)
        this.setState({
            placetovisitTable: palcetovisitdata
        })
        this.props.getData(action.GET_CITIES, GET_CITIES)

       /*  let states = await loadData(getcities)
        this.setState({
            citynames: states
        }) */

        this.props.getDestination();
       
        /* let destinations = await loadData(getdestinations)
        this.setState({
            destinationnames: destinations
        }) */
        /* let placetypes = await loadData(getplacetypes)
        this.setState({
            placetypes: placetypes
        }) */

        this.props.getData(action.GET_PLACETYPE,GET_PLACETYPE)

    }

    placenameOperation(event) {
        this.setState({
            placename: event.target.value
        })
    }
    placedescriptionOperation(event) {
        this.setState({
            placedescription: event.target.value
        })

    }
    placegenreOperation(event) {
        this.setState({
            placegenre: event.target.value
        })
    }
    /* priceOperation(event)
    {
        this.setState({
            price:event.target.value
        })
    } */
    destinationOperation(event) {
        this.setState({
            destinationId: event.target.value
        })
    }
    placetypeOperation(event) {
        this.setState({
            placeTypeId: event.target.value
        })

    }
    cityOperation(event) {
        this.setState({
            cityId: event.target.value
        })
    }
    async placetovisitbycityOperation(event) {

        let url = getplacetovisitbycity + (event.target.value);
        let place = await loadData(url)
        this.setState({
            placetovisitTable: place
        })
    }
    async placetovisitbydestinationOperation(event) {

        let url = getplacetovisitbydestination + (event.target.value);
        let place = await loadData(url)
        this.setState({
            placetovisitTable: place
        })
    }

    async editReacord(id) {

        let url = getplacetovisitbyid + id;
        let editdata = await loadData(url)
        this.setState({
            editData: editdata
        })

        this.setState({
            placename: editdata.placeName,
            placegenre: editdata.placeGenre,
            placedescription: editdata.description,
            price: editdata.price
        })
    }

    async postEditedData() {
        debugger

        const obj = {
            placeId: this.state.editData.placeId,
            placeName: this.state.placename,
            placeGenre: this.state.placegenre,
            destinationId: 9,
            description: this.state.placedescription,
            price: parseInt(this.state.price),
            placeTypeId: 1,
            cityId: 6
        }

        let editurl = placetovisitupdateapi + this.state.editData.cityId;
        let editeddata = await postData(obj, editurl, 'Put')

        alert(editeddata)
        window.location.reload();//page refresh
    }

    async postDatatoApi() {
        const obj = {
            placeId: 0,
            placeName: this.state.placename,
            placeGenre: this.state.placegenre,
            destinationId: parseInt(this.state.destinationId),
            description: this.state.placedescription,
            placeTypeId: parseInt(this.state.placeTypeId),
            cityId: parseInt(this.state.cityId)

        }

        this.props.postData1(action.POST_PLACETOVISIT,POST_PLACETOVISIT,obj);
        /* let message = await postData(obj, placetovisitpostapi, 'Post');
        alert(message);
        window.location.reload(); *///page refresh
    }

    async handleSubmit(event) {
        debugger
        const form = event.currentTarget;
        console.log("checkform", form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            if (this.state.editData.placeId == undefined) {
                this.postDatatoApi()
            }
            else {
                this.postEditedData()
            }
        }
        this.setState({
            validated: true
        })
    }

    handleReset() {
        this.setState({
            editData: []
        })
    }


    render() {
        return (

            <div>

                <div class="container-fluid page-body-wrapper" style={{ paddingTop: 80 }}>
                    <Sidebar />

                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="page-header">
                                <h3 class="page-title">
                                    <span class="page-title-icon bg-gradient-primary text-white mr-2">
                                        <i class="mdi mdi-home-map-marker"></i>
                                    </span>Place To Visit
                        </h3>
                                <nav aria-label="breadcrumb">
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html"><i class="mdi mdi-home"></i> index</a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">
                                            Place To Visit
                                </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">Place To Visit</h4>
                                            <Form className="forms-sample" noValidate validated={this.state.validated} onSubmit={(e) => this.handleSubmit(e)} onReset={(e) => this.handleReset(e)}>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeName"
                                                                class="col-sm-3 col-form-label">Name</label>
                                                            <div class="col-sm-9">
                                                                <input type="text" defaultValue={this.state.editData.placeName} class="form-control" id="placeTypeName"
                                                                    onChange={(e) => this.placenameOperation(e)} placeholder="Name" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="genre" class="col-sm-3 col-form-label">Genre</label>
                                                            <div class="col-sm-9">
                                                                <input type="text" defaultValue={this.state.editData.placeGenre} class="form-control" id="genre"
                                                                    onChange={(e) => this.placegenreOperation(e)} placeholder="Genre" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Destination</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" onChange={(e) => this.destinationOperation(e)}>
                                                                    {this.props.getdestination.map(obj =>
                                                                        <option value={obj.destinationId}>{obj.destinationName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">Place Type</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" onchange={(e) => this.placetypeOperation(e)}>
                                                                    {this.props.placetype.map(obj =>
                                                                        <option value={obj.placeTypeId}>{obj.placeTypeName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label class="col-sm-3 col-form-label">City</label>
                                                            <div class="col-sm-9">
                                                                <select class="form-control travellerMode" onChange={(e) => this.cityOperation(e)}>
                                                                    {this.props.cities.map(obj =>
                                                                        <option value={obj.cityId}>{obj.cityName}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div class="col-md-6">
                                                <div class="form-group row">
                                                    <label for="Price" class="col-sm-3 col-form-label">Price</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" defaultValue={this.state.editData.price} class="form-control" id="genre"
                                                          onChange={(e)=>this.priceOperation(e)}  placeholder="Price"/>
                                                    </div>
                                                </div>
                                            </div> */}
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group row">
                                                            <label for="placeTypeDescription"
                                                                class="col-sm-3 col-form-label">Description</label>
                                                            <div class="col-sm-9">
                                                                <textarea class="form-control" defaultValue={this.state.editData.description} id="placeTypeDescription"
                                                                    onChange={(e) => this.placedescriptionOperation(e)} rows="4"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">

                                                    </div>
                                                </div>

                                                <div class="row" style={{ margin: "auto", textAlign: "center"/* marg:auto;text-align: center} */ }}>
                                                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                                                    <button type="reset" class="btn btn-light">Cancel</button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 grid-margin stretch-card">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4 class="card-title">List</h4>
                                            <div class="col-md-6" hidden={this.state.hidecity}>
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">City</label>
                                                    <div class="col-sm-9">
                                                        <select class="form-control travellerMode" onChange={(e) => this.placetovisitbycityOperation(e)}>
                                                            {this.props.cities.map(obj =>
                                                                <option value={obj.cityId}>{obj.cityName}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6" hidden={this.state.hidedestination}>
                                                <div class="form-group row">
                                                    <label class="col-sm-3 col-form-label">Destination</label>
                                                    <div class="col-sm-9">
                                                        <select class="form-control travellerMode" onChange={(e) => this.placetovisitbydestinationOperation(e)}>
                                                            {this.state.destinationnames.map(obj =>
                                                                <option value={obj.destinationId}>{obj.destinationName}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive">
                                                <ReactTable columns={[
                                                    {
                                                        Header: "PlaceId",
                                                        accessor: "placeId"

                                                    },
                                                    {
                                                        Header: "PlaceName",
                                                        accessor: "placeName"

                                                    },
                                                    {
                                                        Header: "PlaceGenre",
                                                        accessor: "placeGenre"

                                                    },
                                                    {
                                                        Header: "PlaceDescription",
                                                        accessor: "description"

                                                    },
                                                    {
                                                        id: 'id', // Required because our accessor is not a string
                                                        Header: 'Actions',
                                                        accessor: d => d.placeId,
                                                        maxWidth: 300,
                                                        Cell: row => (
                                                            <div className="template-demo">
                                                                <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => { this.editReacord(row.value) }} >
                                                                    <i class="mdi mdi-pencil-outline"></i>
                                                                </button>
                                                                <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => { this.deleteRecord(row.value) }} value={row.value} >
                                                                    <i class="mdi mdi-delete-outline"></i>
                                                                </button>
                                                            </div>)

                                                    }
                                                ]}
                                                    data={this.state.placetovisitTable}
                                                    showPagination={true}
                                                    defaultPageSize={5}

                                                />


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div>
		<div style={{paddingLeft:400,paddingTop:110,backgroundColor:"black"}} >
            <div class="card" style={{width:600 }}>
  <div class="card-body">
    <h3 class="card-title">New Place to Visit</h3>
    <Form className="forms-sample"  noValidate validated={this.state.validated} onSubmit={(e)=>this.handleSubmit(e)}>
                  <Form.Group >
                    <label htmlFor="placename">PlaceName</label>
                    <Form.Control   type="text" id="placename"  onChange={(e)=>this.placenameOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="placegenre">PlaceGenre</label>
                    <Form.Control   type="text" id="placegenre"  onChange={(e)=>this.placegenreOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group >
                    <label htmlFor="price">Price</label>
                    <Form.Control   type="number" id="price"  onChange={(e)=>this.priceOperation(e)}  required/>
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="placedescription">PlaceDescription</label>
                    <textarea required class="form-control" id="placedescription" rows="3" onChange={(e)=>this.placedescriptionOperation(e)}></textarea>
                  </Form.Group>
                  <Form.Group>
                  <label for="travellerMode">Destinantion</label>
                  <select class="form-control travellerMode">
                  {this.state.destinationnames.map(obj=>
                  <option value={obj.destinationId}>{obj.destinationName}</option>
                    )}
                    </select>
                  </Form.Group>
                  <Form.Group>
                  <label for="travellerMode">PlaceType</label>
                  <select class="form-control travellerMode">
                  {this.state.placetypes.map(obj=>
                  <option value={obj.placeTypeId}>{obj.placeTypeName}</option>
                    )}
                    </select>
                  </Form.Group>
                  <Form.Group>
                  <label for="travellerMode">City</label>
                  <select class="form-control travellerMode">
                  {this.state.citynames.map(obj=>
                  <option value={obj.cityId}>{obj.cityName}</option>
                    )}
                    </select>
                  </Form.Group>
                  <button type="submit" class="btn btn-primary" >submit</button>
    </Form>
  </div>
  
</div>
        </div>
        <h2>PlaceTovisit Table</h2>
        <div className="table-responsive" style={{ paddingTop: '20px' }}>
        <ReactTable columns={[
                                    {
                                        Header: "PlaceId",
                                        accessor: "placeId"
                                        
                                    },
                                  {
                                    Header: "PlaceName",
                                    accessor: "placeName"
                                    
                                  },
                                  {
                                    Header: "PlaceGenre",
                                    accessor: "placeGenre"
                                    
                                  },
                                  {
                                    Header: "PlaceDescription",
                                    accessor: "description"
                                    
                                  }
                                ]}
                                data={this.state.placetovisitTable}
                                showPagination={true}
                                defaultPageSize={10}
                                
                         />
                         </div>
        </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cities:state.goAdvStore.cities,
        placetype:state.goAdvStore.placetype,
        getdestination:state.goAdvStore.getdestination
    }
}
export default connect(mapStateToProps, { getData, postData1, putData1,getDestination })(PlacestoVisit);
    //export default PlacestoVisit

