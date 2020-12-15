import React, {Component} from 'react';
import { Form } from 'react-bootstrap';

class TextInput extends Component {
    constructor(props) {
        super(props);
       this.state = {

       }
    }

    handleChange=(event)=>
    {
        if(this.props.onChange1)
        {
            this.props.onChange1(event)
        }
    }
    render() {
	    return (
         <div  class="col-md-6">
              <div class="form-group row">
        <label class="col-sm-3 col-form-label">{this.props.name}</label>
                   <div class="col-sm-9">
                        <input required type={this.props.type} defaultValue={this.props.defaultValue} value={this.props.value}  class="form-control" name={this.props.name} onChange={this.handleChange}/>
                  </div>
            </div>
        </div>
        )
        }
    }
export default TextInput