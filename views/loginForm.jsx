var React = require('react');
var LayoutContainer = require('./layout.jsx');

class loginForm extends React.Component {
    render() {
        let color;
        if(this.props.message == 'sign up successful!') {
            color = 'green';
        } else {
            color = 'red';
        }

        return(
            <LayoutContainer>
                <div>
                    <form method='POST' action='/loginCheck' style={{height: '300px', width: '250px', margin: '0 auto'}}>
                        <h1>Log In</h1>
                        <div id='msg' style={{color: color}}>{this.props.message}</div>
                        <strong>Email: </strong><br/><input id='email' type='text' name='email' placeholder='email'></input><br/><br/>
                        <strong>Password: </strong><br/><input id='password' type='password' name='password' placeholder='password'></input><br/><br/>
                        <input type='submit' value='submit' className='btn btn-primary' id='submitBtn' style={{position: 'relative', top: '20px', width: '150px'}}></input>
                    </form>
                    <script src='/login.js'></script>
                </div>
            </LayoutContainer>
        );
    }
}

module.exports = loginForm;