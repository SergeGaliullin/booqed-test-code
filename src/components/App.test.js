import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {shallow} from "enzyme";
import App from './App';
import {Container, Loader} from "semantic-ui-react";
import CandidateList from "./CandidateList";


describe('App', () => {
    let appWrapper;

    beforeAll(() => {
        appWrapper = shallow(<App/>);
    });

    it('renders a container', () => {
        const container = appWrapper.find(Container);

        expect(container).toHaveLength(1);
    });

    it('has state', () => {
        const appState = appWrapper.state();

        expect(appState).not.toBeNull();
    });

    it('shows loader when loading', () => {
        const appState = appWrapper.state();
        appState.loading = true;
        const loader = appWrapper.find(Loader);

        expect(loader).not.toBeNull();
    });

    it('shows candidates when not loading', () => {
        const appState = appWrapper.state();
        appState.loading = false;
        const candidates = appWrapper.find(CandidateList);

        expect(candidates).not.toBeNull();
    });
});