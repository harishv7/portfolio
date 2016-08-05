var gradients = [{
	first: '#56ab2f',
	second: '#a8e063'
}, {
	first: '#E0EAFC',
	second: '#CFDEF3'
}, {
	first: '#C9FFBF',
	second: '#FFAFBD'
}, {
	first: '#00d2ff',
	second: '#3a7bd5'
}, {
	first: '#2BC0E4',
	second: '#EAECC6'
}, {
	first: '#F09819',
	second: '#EDDE5D'
}, {
	first: '#EDE574',
	second: '#E1F5C4'
}, {
	first: '#B3FFAB',
	second: '#12FFF7'
}, {
	first: '#0072ff',
	second: '#00c6ff'
}, {
	first: '#4CB8C4',
	second: '#3CD3AD'
}];

var App = React.createClass({
	getInitialState() {
	    return {
	        names: [],
	        description: [],
	        portfolioRows: []  
	    };
	},
	componentWillMount() {
		var populatedNames = [];
		var populatedDescriptions = [];
		this.serverRequest = $.get("https://api.github.com/users/harishv7/repos", function (result) {
			for (var i = 0; i < result.length; i++) { 
				// console.log(result[i].name);
				populatedNames.push(result[i].name);
				// console.log(result[i].description);
				populatedDescriptions.push(result[i].description);
			}
			// console.log(populatedNames);
			// console.log(populatedDescriptions);
			this.setState({
				names: populatedNames,
				description: populatedDescriptions
			});
		}.bind(this));
	},
	componentWillUnmount() {
	    this.serverRequest.abort();  
	},
	render: function() {
		// create all the rows we need and populate into an array
		var namesOfRepos = this.state.names;
		var descOfRepos = this.state.description;
		var portfolioRowsArr = [];
		var porfolioItemsForOneRow = [];
		for(var i = 0; i < namesOfRepos.length; i++) {
			porfolioItemsForOneRow.push({
				name: namesOfRepos[i],
				desc: descOfRepos[i],
				key: i
			});

			if(porfolioItemsForOneRow.length === 3) {
				portfolioRowsArr.push(<PortfolioRow items={porfolioItemsForOneRow} />);
				portfolioRowsArr.push(<hr />);
				porfolioItemsForOneRow = [];
			}
		}

		return (
			<div>
				{portfolioRowsArr}
			</div>
		);
	}
});

var PortfolioRow = React.createClass({
	render: function() {
		return (
			<div className="row"> 
				<PortfolioItem title={this.props.items[0].name} desc={this.props.items[0].desc} />
				<PortfolioItem title={this.props.items[1].name} desc={this.props.items[1].desc} />
				<PortfolioItem title={this.props.items[2].name} desc={this.props.items[2].desc} />
        	</div>
		);
	}
});

var PortfolioItem = React.createClass({
	render: function() {
		// choose a random gradient
		var randomNum = Math.floor(Math.random() * (gradients.length));
		var gradient = gradients[randomNum];
		// craft the css
		var gradientStatement = "linear-gradient(to bottom right," + gradient.first + "," + gradient.second +")";
		// console.log(gradientStatement);
		var gradientStyle = {backgroundImage: gradientStatement};
		// var gradientStyle = "background-image: linear-gradient(to bottom right,#56ab2f,#a8e063);";
		return (
			<div className="col-md-4">
				<img src="images/github.png" className="img-responsive repoLogo image-center" style={gradientStyle}/> 
                <h2 className="text-center title">{this.props.title}</h2> 
                <p className="description">{this.props.desc}</p>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById("app"));