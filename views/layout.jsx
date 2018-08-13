var React = require('react');

class layoutContainer extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossOrigin="anonymous"></link>
                    <link rel="stylesheet" type="text/css" href="/style.css"/>
                </head>
                <body>
                    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                        <a className="navbar-brand" href="#">HappyDead</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{position: 'relative', left: '80%'}}>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Log In</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/signup">Sign Up</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className='container' style={{position: 'relative', top: '80px'}}>
                        {this.props.children}
                    </div>
                    {/* <script crossOrigin src="script.js"></script> */}
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossOrigin="anonymous"></script>
                </body>
            </html>
        );
    }
}

module.exports = layoutContainer;