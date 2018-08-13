var React = require('react');
var LayoutContainer = require('./layout.jsx')
//layout must be caps! to differentiate from html

class hello extends React.Component {
    render() {
        return (
            <LayoutContainer>
                <div>hello</div>
            </LayoutContainer>
        );
    }
}

module.exports = hello;