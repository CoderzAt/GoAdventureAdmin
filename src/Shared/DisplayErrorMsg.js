import React, {Component} from 'react';
class Displayerrormsg extends Component {
    constructor(props) {
        super(props);
       this.state = {

       }
    }
 render() {
    /*  debugger
     console.log("props",this.props) */
	    return (
            <div>
            {this.props.message ?
            <div className={`message-wrapper ${this.props.messageData.isSuccess ? "success" : "error"}`}>{this.props.messageData.message.map(obj => (<li>{obj.message}</li>))}</div> :
            null}
            </div>
        )
        }
    }
export default Displayerrormsg