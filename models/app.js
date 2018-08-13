module.exports = function (db) {
    let uploadDrawing = function (json, id, callback) {
        console.log('json', json)
        let queryText= 'UPDATE projects SET details = $1 WHERE id = $2';
        const values = [json, id];

        db.query(queryText, values, callback);
    }

    let getOwnProjects = function (user_id, callback) { //will have to  take collaborators into consideration later
        let queryText = 'SELECT * FROM projects WHERE creator_id = $1';
        const values = [user_id];

        db.query(queryText, values, callback);
    }
    
    let getSharedProjects = function (user_id, callback) {
        let queryText = 'SELECT * FROM projects INNER JOIN users_projects ON projects.id = users_projects.projects_id WHERE users_projects.users_id = $1';
        const values = [user_id];

        db.query(queryText, values, callback);
    }

    let getObjects = function (project_id, callback) {
        let queryText = 'SELECT * FROM projects WHERE id = $1';
        const values = [project_id];

        db.query(queryText, values, callback);
    }

    let createProjects = function (user_id, projectName, callback) {
        let queryText = 'INSERT INTO projects (creator_id, name, details) VALUES ($1, $2, $3)';
        const values = [user_id, projectName, {'drawings': []}];

        db.query(queryText, values, callback);
    }

    let shareProject = function (user_id, project_id, callback) {
        console.log('shareProject model');
        console.log('userId: ' + user_id);
        console.log('project_id: ' + project_id);
        let queryText = 'INSERT INTO users_projects (users_id, projects_id) VALUES ($1, $2)';
        const values = [user_id, project_id];

        db.query(queryText, values, callback);
    }

    return {
        uploadDrawing: uploadDrawing,
        getOwnProjects: getOwnProjects,
        getSharedProjects: getSharedProjects,
        getObjects: getObjects,
        createProjects: createProjects,
        shareProject: shareProject
    };
}