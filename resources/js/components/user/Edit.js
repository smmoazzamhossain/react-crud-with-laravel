import React, {Component} from 'react'
import toastr from 'cogo-toast';

class Edit extends Component
{
	constructor()
	{
		super();
		//--- Declare method for this component ---//
		this.state = {
			errors    : [],
			id        : '',
			full_name : '',
			mobile_no : '',
			email 	  : ''
		}
		//--- Declare method for this component ---//
		this.baseState = this.state
		this.hasErrorFor = this.hasErrorFor.bind(this);
		this.renderErrorFor = this.renderErrorFor.bind(this);
		this.handleUpdateUser = this.handleUpdateUser.bind(this);
		this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
	}
	//--- Receive props while update modal open ---//
	UNSAFE_componentWillReceiveProps(user_data) 
	{
		this.setState({
			id        : user_data.user.id,
			full_name : user_data.user.full_name,
			mobile_no : user_data.user.mobile_no,
			email     : user_data.user.email
		})
	}
	//--- Update state variable value while input field change ---//
	handleInputFieldChange(e)
	{
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	//--- Update state users variable by props method ---//
	handleUpdateUser(e)
	{
		e.preventDefault()
		//--- Declare state variable for this component ---//
		const data = {
			id        : this.state.id,
			full_name : this.state.full_name,
			mobile_no : this.state.mobile_no,
			email     : this.state.email
		}
		axios.put(`/api/users/${this.state.id}`, data)
			.then(response => {
				this.props.updateState(data, 1);
				this.setState(this.baseState);
				document.getElementById("closeEditModal").click();
				toastr.info('User data updated successfully!', {position : 'top-right', heading: 'Done'});
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
			<div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  	<div className="modal-dialog" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Update user information</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			        <form onSubmit={this.handleUpdateUser}>
			      		<div className="modal-body">
			          		<div className="form-group">
			            		<label htmlFor="full_name" className="col-form-label">Full name:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
			            		 id="full_name" name="full_name" placeholder="User name" onChange={this.handleInputFieldChange} value={this.state.full_name}/>
			            		{this.renderErrorFor('full_name')}
			         	 	</div>
			          		<div className="form-group">
			            		<label htmlFor="mobile_no" className="col-form-label">Mobile No:</label>
			            		<input type="text" className={`form-control form-control-sm ${this.hasErrorFor('mobile_no') ? 'is-invalid' : ''}`}
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
			        		<button type="button" id="closeEditModal" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
			        		<button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
			      		</div>
			   		</form>
			    	</div>
			  	</div>
			</div>
        )
    }
}
export default Edit