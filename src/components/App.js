import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import github from "../api/github";
import SearchBar from "./SearchBar";
import CandidateList from "./CandidateList";
import {Container, Dimmer, Loader} from "semantic-ui-react";


const ITEMS_PER_PAGE = 30;

class App extends React.Component {
    state = {
        candidates: [],
        loading: false,
        pageNumber: 1,
        pageAmount: 0,
        searchTerm: ""
    };

    onSearchSubmit = async (term, page) => {
        this.setState({
            loading: true,
            searchTerm: term,
            pageNumber: page
        });

        try {
            const response = await github.get(`/search/users`, {
                params: {
                    q: term,
                    page: page
                },
            });
            if (response.data) {
                this.setState({
                    candidates: response.data.items,
                    loading: false,
                    pageAmount: Math.round(response.data.total_count / ITEMS_PER_PAGE),
                });
            }
        } catch (e) {

        }

    }


    render() {
        return (
            <Container>
                <SearchBar onSubmit={this.onSearchSubmit}/>
                {this.state.loading ?
                    <Dimmer active inverted>
                        <Loader inverted>Loading Profiles</Loader>
                    </Dimmer> :
                    <CandidateList candidates={this.state.candidates}/>
                }
            </Container>
        );
    }
}

export default App;
