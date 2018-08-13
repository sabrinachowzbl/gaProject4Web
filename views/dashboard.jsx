var React = require('react');
var LayoutContainer = require('./loggedInLayout.jsx')

class dashboard extends React.Component {
    render() {
        return (
            <LayoutContainer name={this.props.username} id={this.props.id}>
                <div id="createProjectBar">
                    <form method='post' action='/createProjects'>
                        <input type='text' name='projectName' placeholder='project name'></input>
                        <button type='submit' className='btn btn-primary'>Add a Project</button>
                    </form>
                </div>
                <div id='ownProjects'>
                    <h1>Created Projects</h1>
                </div>
                <div id='sharedProjects'>
                    <h1>Projects Shared with You</h1>
                </div>
                <script src="dashboard.js"></script>
            </LayoutContainer>
        );
    }
}

module.exports = dashboard;