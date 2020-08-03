import React from 'react';
import CandidateCard from "./CandidateCard";
import {Item} from 'semantic-ui-react';

const CandidateList = props => {
    const candidates = props.candidates.map(candidate => {
        return <CandidateCard key={candidate.id} candidate={candidate}/>
    });
    return <Item.Group>{candidates}</Item.Group>;
}

export default CandidateList;