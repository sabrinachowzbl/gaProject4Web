module.exports = function (db) {
	const postGameStats = function(userId, winLoss, callback) {
		let queryText = 'INSERT INTO winloss (users_id, win_loss) VALUES ($1, $2);';
		let values = [userId, winLoss];

		db.query(queryText, values, (err, result) => {
			if (err) {
				console.log('db error: ' + err.message);
			} else {
				console.log(result);
				callback(result);
			}
		})
	}

	const getGameStats = function (userId, callback) {
		let queryText = 'SELECT * FROM winloss WHERE users_id = $1;';
		let values = [userId];

		db.query(queryText, values, (err, result) => {
			if (err) {
				console.log('db error: ' + err.message);
			} else {
				console.log(result);
				callback(result.rows);
			}
		})
	}
	
    return {
		postGameStats: postGameStats,
		getGameStats: getGameStats
    };
}