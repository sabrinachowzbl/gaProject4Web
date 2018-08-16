module.exports = (app, db, io) => {
    const users = require('./controllers/users.js')(db);
    const apps = require('./controllers/apps.js')(db, io);

    // app.get('/', users.get);
    
    //login
    app.get('/login', users.login);
    app.post('/loginCheck', users.loginCheck);
    
    //signup
    app.get('/signup', users.signup);
    app.post('/signup', users.createUser);

    // //dashboard
	// app.get('/dashboard', users.userDashboard);
	// app.get('/gameboard', users.userDashboard);
	app.get('/game/:id', apps.gameSocket);
    // app.get('/getOwnProjects', apps.getOwnProjects);
    // app.get('/getSharedProjects', apps.getSharedProjects);
    // app.post('/shareProject', apps.shareProject);
    // app.post('/createProjects', apps.createProjects);

    // //drawingBoard
    // app.get('/drawingBoard/:id', apps.drawingBoard);
    // app.put('/uploadDrawing', apps.uploadDrawing);
    // app.get('/getObjects', apps.getObjects)
}