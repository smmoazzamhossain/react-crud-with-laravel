import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Create extends Component
{
	constructor()
	{
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			errors    : [],
			full_name : '',
			mobile_no : '',
			email 	  : ''
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleInsertUser = this.handleInsertUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	//--- Insert new user in users state array by props method ---//
	handleInsertUser(e)
	{
		e.preventDefault()
		const data = {
			full_name : this.state.full_name,
			mobile_no : this.state.mobile_no,
			email     : this.state.email
		}
		axios.post('/api/users', data)
			.then(repsonse => {
				this.setState(this.baseState);
				delete repsonse.data.created_at;
				delete repsonse.data.updated_at;
				this.props.updateState(repsonse.data, 0);

				document.getElementById("closeAddModal").click();
				toastr.success('New user added successfully!', {position : 'top-right', heading: 'Done'});
			})
			.catch(error => {
				this.setState({
					errors : error.response.data.errors
				})
			})
	}
    //--- Check that any validation errors occure for input field ---//
	hasErrorFor(fieldName)
	{
		return !!this.state.errors[fieldName];
	}
	//--- Render error for specific validation fail input field ---//
	renderErrorFor(fieldName)
	{
    	if (this.hasErrorFor(fieldName)) {
	        return (
	        	<em className="error invalid-feedback"> {this.state.errors[fieldName][0]} </em>
	        )
      	}
    }

    render() {
      return(
			<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">New user</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleInsertUser}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="full_name" className="col-form-label">Full name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
			            		 id="full_name" name="full_name" placeholder="Full name" onChange={this.handleInputFieldChange} value={this.state.full_name}/>
			            		{this.renderErrorFor('full_name')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="mobile_no" className="col-form-label">Mobile No:</label>
			            		<input type="number" className={`form-control form-control-sm ${this.hasErrorFor('mobile_no') ? 'is-invalid' : ''}`}
			            		 id="mobile_no" name="mobile_no" placeholder="Mobile no" onChange={this.handleInputFieldChange} value={this.state.mobile_no}/>
			            		{this.renderErrorFor('mobile_no')}
			          		</div>
			          		<div className="form-group">
			            		<label htmlFor="email" className="col-form-label">Email:</label>
			            		<input type="email" className={`form-control form-control-sm ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
			            		 id="email" name="email" placeholder="Email" onChange={this.handleInputFieldChange} value={this.state.email}/>
			            		{this.renderErrorFor('email')}
			          		</div>
			      		</div>
			      		<div className="modal-footer">
			        		<button type="button" id="closeAddModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save User</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Create