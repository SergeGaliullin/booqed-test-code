import React from "react";
import {Header} from "semantic-ui-react";
import './CandidateCard.css';

class SearchBar extends React.Component {
    state = {
        term: ''
    };

    onFormSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.term, 1);
    }

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <Header as='h1'><span className="search-text text-green">Le Github Candidate <span
                            className="text-orange">Analyzer</span></span></Header>
                        <input
                            value={this.state.term}
                            onChange={e => this.setState({term: e.target.value})}
                            type="text"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;