import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { shallow } from "enzyme";
import CandidateCard from './CandidateCard';
import { Item } from "semantic-ui-react";

describe('CandidateCard', () => {
    let cardWrapper;

    beforeAll(() => {
        const candidate = {
            avatar_url: 'avatar_url',
            login: "boris",
            html_url: "html_url"
        }
        cardWrapper = shallow(<CandidateCard candidate={candidate}/>);
    });

    it('shows one candidate', () => {
        const container = cardWrapper.find(Item);

        expect(container).toHaveLength(1);
    });

    it('changes button color when analyzing', () => {
        const appState = cardWrapper.state();
        appState.analysisOnGoing = true;

        expect(appState.buttonColor).toEqual('orange');
    });
});