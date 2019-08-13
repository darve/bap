
import { Component } from 'preact';
import { connect } from 'unistore/preact';
import { actions } from '../actions';
import { Router, route, Link } from 'preact-router';

// Pages
import HomePage from '../pages/HomePage';

class App extends Component {

    componentDidMount() {
        this.scroll_to_top();
        this.props.actn_route_changed(window.location.pathname);
    }

    route_changed(e) {
        this.scroll_to_top();
        this.props.actn_route_changed(e.router.state.url);
    }

    scroll_to_top() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    render() {
        return (
            <div>
                <Header />
                <Router onChange={this.route_changed.bind(this)}>
                    <HomePage default />
                </Router>
                <Footer />
            </div>
        );
    }
}

export default connect(['current_url'], actions)(
    App
);
