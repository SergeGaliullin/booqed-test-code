import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {shallow} from "enzyme";
import SearchBar from './SearchBar';
import {Header} from "semantic-ui-react";

describe('SearchBar', () => {
    let searchBarWrapper;

    beforeAll(() => {
        searchBarWrapper = shallow(<SearchBar/>);
    });

    it('has a state', () => {
        const appState = searchBarWrapper.state();
        appState.term = 'search term';

        expect(appState.term).toEqual('search term');
    });

    it('has a header text for the form', () => {
        const header = searchBarWrapper.find(Header);

        expect(header).toHaveLength(1);
    });
});