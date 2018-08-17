var React = require('react');
var LayoutContainer = require('./loggedInLayout.jsx')

class GameDashboard extends React.Component {
	render () {
		return (
			<LayoutContainer>
				<div>
					<div>Wins: {this.props.wins}</div>
					<div>Losses: {this.props.losses}</div>
					<a href={this.props.gameUrl}><div className='btn btn-primary'>Let's play!</div></a>
				</div>
			</LayoutContainer>
		);
	}
}

module.exports = GameDashboard;