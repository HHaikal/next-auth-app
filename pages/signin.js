import { Grid, Card, Form, Input, Button, Message } from "semantic-ui-react"
import React, { Component } from "react"
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            error: false
        }

        this.changeInput = this.changeInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(event, client) {
        event.preventDefault()

        const form = event.target
        const formData = new window.FormData(form)
        const email = formData.get('email')
        const password = formData.get('password')


        if (email === '' || password === '') {
            this.setState({
                error: true
            })
        }


        // console.log(email, password);

        // form.reset()

        this.setState({
            loading: true
        })

        client.mutate({ // TODO: use libs
            mutation: gql` 
                mutation signin($email: String!, $password: String!){
                    signin(email: $email, password: $password){
                        message
                        token
                    }
                }
            `,
            variables: { email, password },
            update: (proxy, { data: { signin } }) => {
                document.cookie = cookie.serialize('token', signin.token, {
                    maxAge: 30 * 24 * 60 * 60 // 30 days
                })

                client.cache.reset().then(() => {
                    redirect({}, '/')
                })
            }
        })
    }

    render() {
        return (
            <Grid centered>
                <Grid.Row style={{ paddingTop: "10em" }}>
                    <Card>
                        <Card.Content>
                            <Card.Header>Signin</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <ApolloConsumer>
                                {client => (
                                    <Form loading={this.state.loading} error={this.state.error} onSubmit={(event) => this.handleSubmit(event, client)}>
                                        <Form.Field>
                                            <Input type="text" placeholder="Email" name="email" />
                                            <Message
                                                error
                                                header='Action Forbidden'
                                                content='You can only sign up for an account once with a given e-mail address.'
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Input type="password" placeholder="Password" name="password" />
                                            <Message
                                                error
                                                header='Action Forbidden'
                                                content='You can only sign up for an account once with a given e-mail address.'
                                            />
                                        </Form.Field>
                                        <Button type="submit">Submit</Button>
                                    </Form>
                                )}
                            </ApolloConsumer>
                        </Card.Content>
                    </Card>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Signin