import React, { Component } from 'react'
import "./Customer.css";
import { GET_ALL_CUSTOMER} from '../../HTTPServer/httpCustomer.js';

export default class Customer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accountList: [],
		}
	}

	componentDidMount() {
		GET_ALL_CUSTOMER('Get')
			.then(response => {
				this.setState({ accountList: response.data });
			});
	}
    render() {
		return (
			<div>
				<div className="admin__heading">
					<h1 className="customers__title">CUSTOMER</h1>
				</div>
				<div className="admin__body">
					<table className="customers-table">
						<thead>
							<tr className="customers-table__title">
								<th className="customers-table__title--th">Id</th>
								<th className="customers-table__title--th">Email</th>
								<th className="customers-table__title--th">Password</th>
								<th className="customers-table__title--th">Full Name</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.accountList.map((account) => (
									<tr className="customers-table__data" key={account.id}>
										<td className="customers-table__data--td text--center">{account.id}</td>
										<td className="customers-table__data--td">{account.email}</td>
										<td className="customers-table__data--td">{account.password}</td>
										<td className="customers-table__data--td">{account.fullName}</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}