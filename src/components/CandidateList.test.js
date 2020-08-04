import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {shallow} from "enzyme";
import CandidateList from './CandidateList';
import CandidateCard from './CandidateCard';

describe('CandidateList', () => {
    let candidateListWrapper;

    beforeAll(() => {
        const candidates = [{
            id: 1,
            candidate: 'boris'

        }];
        candidateListWrapper = shallow(<CandidateList candidates={candidates}/>);
    });

    it('renders an item', () => {
        const item = candidateListWrapper.find(CandidateCard);

        expect(item).toHaveLength(1);
    });

});