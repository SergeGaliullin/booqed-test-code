import React from "react";
import {Icon} from "semantic-ui-react";

class CandidateKnowledgeStatus extends React.Component {
    render() {
        switch (this.props.currentStatus) {
            case true:
                return <Icon name='checkmark' color={"green"}/>
            case false:
                return <Icon name='close' color={"red"}/>
            default:
                return <Icon disabled name='checkmark'/>
        }
    }
}

export default CandidateKnowledgeStatus;