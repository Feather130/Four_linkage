import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Select = props => {
	if (props.zoom.length === 0) {
		return null
	}
	return (
		<select value={props.value} onChange={props.onChange}>
		<option value='choose'>请选择</option>
		{props.zoom.map((obj,index)=>
			<option key={index} value={obj.adcode}>{obj.name}</option>
		)}
	</select>
	)
}

let getCity = adcode => axios.get('http://restapi.amap.com/v3/config/district', {
	params: {
		subdistrict: 1,
		showbiz: false,
		extensions: 'base',
		s: 'rsv3',
		output: 'json',
		keywords: adcode,
		platform: 'JS',
		logversion: '2.0',
		sdkversion: '1.4.3',
		appname: 'http://lbs.amap.com/api/javascript-api/example/district-search/city-drop-down-list',
		csid: '9DEA5E3F-D87F-4567-BBEE-6B926B690E62',
		key: 'a25af5e0fc9ba9404924728550c15fd0'
	}
}).then((res) => res)

class Sele extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value1: 'choose',
			value2: 'choose',
			value3: 'choose',
			value4: 'choose',
			province: [],
			city: [],
			district: [],
			street: []
		}
	}

	componentDidMount() {
		getCity(100000).then(res => {
			const province = res.data.districts[0].districts.map(obj => obj)
			this.setState({
				province
			})
		})
	}

	handleChange(zoom, event) {
		if (event.target.value !== 'choose') {
			switch (zoom) {
				case 'province':
					this.setState({
						value1: event.target.value
					})
					getCity(event.target.value).then(res => {
						const city = res.data.districts[0].districts.map(obj => obj)
						this.setState({
							value2: 'choose',
							value3: 'choose',
							value4: 'choose',
							district: [],
							street: [],
							city
						})
					})
					break;
				case 'city':
					this.setState({
						value2: event.target.value
					})
					getCity(event.target.value).then(res => {
						const district = res.data.districts[0].districts.map(obj => obj)
						this.setState({
							value3: 'choose',
							value4: 'choose',
							street: [],
							district
						})
					})
					break;
				case 'district':
					this.setState({
						value3: event.target.value
					})
					getCity(event.target.value).then(res => {
						const street = res.data.districts[0].districts.map((obj, index) => {
							obj.adcode = index;
							return obj
						})
						this.setState({
							value4: 'choose',
							street
						})
					})
					break;
				case 'street':
					this.setState({
						value4: event.target.value
					})
					break;
				default:
					break;
			}
		} else {
			switch (zoom) {
				case 'province':
					this.setState({
						value1: event.target.value,
						value2: 'choose',
						value3: 'choose',
						value4: 'choose',
						city: [],
						district: [],
						street: []
					})
					break;
				case 'city':
					this.setState({
						value2: event.target.value,
						value3: 'choose',
						value4: 'choose',
						district: [],
						street: []
					})
					break;
				case 'district':
					this.setState({
						value3: event.target.value,
						value4: 'choose',
						street: []
					})
					break;
				case 'street':
					this.setState({
						value4: event.target.value
					})
					break;
				default:
					break;
			}
		}
	}

	render() {
		return (
			<div>
				<Select value={this.state.value1} onChange={this.handleChange.bind(this,'province')} zoom={this.state.province} />
				<Select value={this.state.value2} onChange={this.handleChange.bind(this,'city')} zoom={this.state.city} />
				<Select value={this.state.value3} onChange={this.handleChange.bind(this,'district')} zoom={this.state.district} />
				<Select value={this.state.value4} onChange={this.handleChange.bind(this,'street')} zoom={this.state.street} />
			</div>
		)
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<Sele />
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);