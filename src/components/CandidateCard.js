import React from "react";
import {Button, Item, Table} from 'semantic-ui-react';
import github from "../api/github";
import './CandidateCard.css';
import CandidateKnowledgeStatus from "./CandidateKnowledgeStatus";


const USES_REACT = "import React from 'react';";
const USES_REACT_NATIVE = 'react-native';
const USES_JAVASCRIPT = '() =>';
const USES_TESTS = 'shallow';


class CandidateCard extends React.Component {
    state = {
        knowsJavaScript: null,
        knowsReact: null,
        knowsReactNative: null,
        usesTests: null,
        networkError: false,
        buttonColor: 'orange'
    };

    async reactCheck() {
        try {
            const response = await github.get(`/search/code`, {
                params: {
                    q: `${USES_REACT}+user:${this.props.candidate.login}`
                },
            });
            if (response.data) {
                if (response.data.total_count > 1) {
                    this.setState({knowsReact: true, knowsJavaScript: true});
                } else {
                    this.setState({knowsReact: false})
                }
            }
        } catch (error) {
            this.setState({networkError: true});
        }
    }

    async reactNativeCheck() {
        try {
            const response = await github.get(`/search/code`, {
                params: {
                    q: `${USES_REACT_NATIVE}+user:${this.props.candidate.login}`
                },
            });
            if (response.data) {
                if (response.data.total_count > 1) {
                    this.setState({knowsReactNative: true, knowsJavaScript: true});
                } else {
                    this.setState({knowsReactNative: false})
                }
            }
        } catch (e) {
            this.setState({networkError: true});
        }
    }

    async javaScriptCheck() {
        if (!this.state.knowsJavaScript) {
            try {
                const response = await github.get(`/search/code`, {
                    params: {
                        q: `${USES_JAVASCRIPT}+user:${this.props.candidate.login}`
                    },
                });
                if (response.data) {
                    if (response.data.total_count > 1) {
                        this.setState({knowsJavaScript: true});
                    } else {
                        this.setState({knowsJavaScript: false})
                    }
                }
            } catch (e) {
                this.setState({networkError: true});
            }
        }
    }

    async testsUsageCheck() {
        if (this.state.knowsJavaScript) {
            try {
                const response = await github.get(`/search/code`, {
                    params: {
                        q: `${USES_TESTS}+user:${this.props.candidate.login}`
                    },
                });
                if (response.data) {
                    if (response.data.total_count > 1) {
                        this.setState({usesTests: true});
                    } else {
                        this.setState({usesTests: false})
                    }
                }
            } catch (e) {
                this.setState({networkError: true});
            }
        } else {
            if (!this.state.networkError) {
                this.setState({usesTests: false})
            }
        }
    }

    async buttonColorUpdate() {
        if (this.state.knowsJavaScript && this.state.knowsReact && this.state.knowsReactNative && this.state.usesTests) {
            this.setState({buttonColor: 'green'});
        } else if (!this.state.knowsJavaScript && !this.state.knowsReact && !this.state.knowsReactNative && !this.state.usesTests) {
            this.setState({buttonColor: 'red'});
        } else {
            this.setState({buttonColor: 'yellow'});
        }
    }

    onButtonClick = async _ => {
        await this.reactCheck();
        await this.reactNativeCheck();
        await this.javaScriptCheck();
        await this.testsUsageCheck();
        await this.buttonColorUpdate();
    }

    render() {
        const {avatar_url, login, html_url} = this.props.candidate;

        return (
            <Item>
                <Item.Image size='tiny' src={avatar_url}/>

                <Item.Content>
                    <Item.Header>
                        <a href={html_url} target="_blank" rel='noreferrer noopener'>{login}</a>
                        { this.state.networkError ? <span className="text-red">&nbsp;(Error: couldn't load data)</span> : null}
                    </Item.Header>
                    <Table celled structured>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>JavaScript</Table.Cell>
                                <Table.Cell>React</Table.Cell>
                                <Table.Cell>React Native</Table.Cell>
                                <Table.Cell>Uses Tests</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell><CandidateKnowledgeStatus
                                    currentStatus={this.state.knowsJavaScript}/></Table.Cell>
                                <Table.Cell><CandidateKnowledgeStatus
                                    currentStatus={this.state.knowsReact}/></Table.Cell>
                                <Table.Cell><CandidateKnowledgeStatus
                                    currentStatus={this.state.knowsReactNative}/></Table.Cell>
                                <Table.Cell><CandidateKnowledgeStatus
                                    currentStatus={this.state.usesTests}/></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Item.Content>
                <Button color={this.state.buttonColor} onClick={this.onButtonClick}>Analyze</Button>
            </Item>
        );
    }
}

export default CandidateCard;

