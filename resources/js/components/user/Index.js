import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'
import axios from 'axios'

class Index extends Component
{
	constructor()
	{
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			users     : [],
			editUser : {}
		}
		//--- Declare method for this component ---//
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}
	//--- Fetch all users info before the component render ---//
	componentDidMount()
	{
		axios.get('/api/users')
			.then(response => {
				this.setState({
					users : response.data
				})
			})
	}
	//--- Update state variable while any user insert or update ---//
	handleUpdateState(data, operation)
	{
		//--- 'operation==1' means update user ---//
		if(operation === 1) {
			this.setState(prevState => ({
				users : prevState.users.filter(user => {
					if(user.id === data.id)
						return Object.assign(user, data);
					else
						return user;
				})
			}))
			return;
		}
		//--- 'operation==0' means insert user ---//
		var new_users = this.state.users.concat(data);
		this.setState({
			users : new_users
		})
	}
	//--- Find editable user and update state variable ---//
	handleEditUser(userId)
	{
		axios.get(`/api/users/${userId}/edit`)
			.then(response => {
				this.setState({
					editUser : response.data
				})
			})
	}
	//--- Delete user and update state ---//
	handleDeleteUser(userId)
	{
		axios.delete(`/api/users/${userId}`)
			.then(response => {
				toastr.error('User has been deleted successfully!', {position : 'top-right', heading: 'Done'});
				
				this.setState(prevState => ({
					users : prevState.users.filter(user => {
						return user.id !== userId
					})
				}))
			})
	}

    render() {
      return(
          	<div className="card mt-4">
			    <div className="card-header">
			        <h4 className="card-title"> Users </h4>
			        <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal"> Add User </button>
			    </div>
			    <div className="card-body">
			        <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th> Full Name </th>
                                    <th> Mobile No </th>
                                    <th> Email </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.users.map((user, i) => (
                                <tr key={i}>
                                    <td> {user.id} </td>
                                    <td> {user.full_name} </td>
                                    <td> {user.mobile_no} </td>
                                    <td> {user.email} </td>
                                    <td>
                                        <button className="btn btn-secondary btn-sm mr-2" onClick={this.handleEditUser.bind(this, user.id)} data-toggle="modal" data-target="#editModal"> Edit </button>
                                        <button className="btn btn-danger btn-sm" onClick={this.handleDeleteUser.bind(this, user.id)}> Delete </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
			        </div>
			    </div>
			    <Create updateState = {this.handleUpdateState} />
			    <Edit updateState = {this.handleUpdateState} user = {this.state.editUser} />
			</div>
        )
    }
}
export default Index