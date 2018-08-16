var React = require('react');
var LayoutContainer = require('./loggedInLayout.jsx');

class Game extends React.Component {
	render() {
		return (
			<LayoutContainer>
				<div className='whole'>
					{/* <div className='gameName row'>
						<div className='col-md-12'>
						<h1>
							<span style={{color: 'black'}}>Box</span><span style={{color: 'red'}}>Heads</span> v2.0
						</h1>
						</div>
					</div> */}
					<div className='row'>
						<div className='right col-md-3'>
							{/* name */}
							<div className='name'></div>
							{/* controls */}
							<div className="controls"></div>
							{/* botsLeft */}
							<div className="botsLeft"></div>
							{/* weapons */}
							<div className='weapons'></div>
						</div>
						<div className='col-md-9'>
							<div className='gameBox row'>
								<div className='containerBox'>
									<div className="text"><h1></h1></div>
									<div className='insertName'>
										<input type="text" placeholder="name" id="name" /><br />
										<select id="select">
											<option>Level 1</option>
											<option>Level 2</option>
										</select>
										<div id="welcome"></div>
										<div className="button">Let's Start!</div>
									</div>
								</div>
								<div className="level row">
									<div className='col-md-12'>
									{/* health */}
									<div className='hp'></div>
									{/* level */}
									<h1 id='level'></h1>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<script src="/js/fire.js"></script>
				<script src="/js/move.js"></script>
				<script src="/js/weapons.js"></script>
				{/* <script src="js/bot.js"></script>  */}
				<script src="/js/check.js"></script>
				<script src="/js/socket.js"></script>
				<script src="/js/renderSocket.js"></script>
				<script src="/js/setup.js"></script>
			</LayoutContainer>
		);
	}
}

module.exports = Game;