module.exports = function (db) {
    // var bots 
    return {
        uploadDrawing: uploadDrawing,
        getOwnProjects: getOwnProjects,
        getSharedProjects: getSharedProjects,
        getObjects: getObjects,
        createProjects: createProjects,
        shareProject: shareProject
    };
}