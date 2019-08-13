
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { actions } from '../actions';
import { route, Link } from 'preact-router';

class HomePage extends Component {

    render() {
        return (
            <div className="page page-home">
            </div>
        );
    }
}

export default connect([], actions)(
    HomePage
);
