import React, {Component} from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Link} from "react-router-dom";

class TableWithSelection extends Component {
    constructor(props) {
        super(props);
       this.state = {}
    }
    editReacord(row)
    {
        if(this.props.editonClick)
        {
            this.props.onChange1(row)
        }
    }
    render()
    {
        return(
            <div>
               {/* <div class="row">
                   <div class="col-12 grid-margin stretch-card">
                       <div class="card">
                           <div class="card-body">
                               <h4 class="card-title">List</h4>
                               <div class="col-md-6">
                                                <div class="form-group row">
        <label class="col-sm-3 col-form-label">{this.props.selectTile}</label>
                                                    <div class="col-sm-9">
                                                    <select class="form-control travellerMode"  onChange={(e)=>this.statebycountryoperation(e)}>
                                                       {this.props.selectdata.map(obj=>
                                                      <option value={obj.countryId}>{obj.countryName}</option>
                                                        )}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                               
                   <div className="table-responsive">
                     
        <ReactTable columns={[
                                    {
                                        Header: "StateId",
                                        accessor: "stateId"
                                        
                                    },
                                  {
                                    Header: "StateName",
                                    accessor: "stateName"
                                    
                                  },
                                  {
                                    Header: "StateCode",
                                    accessor: "stateCode"
                                    
                                  },
                                  {
                                    Header: "CountryDescription",
                                    accessor: "stateDesc"
                                    
                                  },
                                  {
                                      id:'id', // Required because our accessor is not a string
                                      Header: 'Actions',
                                      accessor: d => d.this.props.actionId,
                                      maxWidth:300,
                                      Cell: row => (
                                        <div className="template-demo">
                                            <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" onClick={(e) => {  this.editReacord(row.value)}} >
                                                              <i class="mdi mdi-pencil-outline"></i>
                                            </button>
                                            <button type="button" class="btn btn-gradient-danger btn-rounded btn-icon" onClick={(e) => {  this.deleteRecord(row.value)}} value={row.value} >
                                                              <i class="mdi mdi-delete-outline"></i>
                                            </button>
                                            <button type="button" class="btn btn-gradient-primary btn-rounded btn-icon" value={row.value} >
                                          <Link style={{ color:'#A9A9A9'}}  to={`/admin/city/${row.value}`}> <i class="mdi mdi-eye-outline"></i></Link>
                                          </button>
                                        </div>)
  
                                    }
                                  
                                ]}
                                data={this.state.states}
                                showPagination={true}
                                defaultPageSize={5}
                                
                         />
                         </div>
        </div>
        </div>
        </div>
        </div> */}
            </div>
        )
    }
}

export default TableWithSelection