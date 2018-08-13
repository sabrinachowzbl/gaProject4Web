var React = require('react');
var LayoutContainer = require('./layout.jsx');

class signupForm extends React.Component {
    render() {
        return (
            <LayoutContainer>
                <form method='POST' action='/signup' style={{height: '300px', width: '250px', margin: '0 auto'}}>
                    <h1>Sign up</h1>
                    <div id='msg' style={{color: 'red'}}>{this.props.message}</div>
                    <strong>Username: </strong><br /><input type='text' name='username' placeholder='username'></input><br /><br />
                    <strong>Email: </strong><br /><input type='text' name='email' placeholder='email'></input><br /><br />
                    <strong>Password: </strong><br /><input type='password' name='password' placeholder='password'></input><br /><br />
                    <strong>Confirm Password: </strong><br /><input type='password' name='password2' placeholder='confirm password'></input><br /><br />
                    <input type='submit' value='submit' className='btn btn-primary' style={{position: 'relative', top: '20px', width: '150px'}}></input>
                </form>
            </LayoutContainer>
        );
    }
}

module.exports = signupForm;
