import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

class CreateBook extends Component {

    formSubmit(e, client) {
        e.preventDefault()

        const form = event.target
        const formData = new window.FormData(form)
        const title = formData.get('title')
        const description = formData.get('description')
        const authorid = formData.get('authorid')

        const MUTATION_QUERY = gql`
            mutation createBooks($name: String!, $description: String!, $authorId: ID!){
                createBook(name:$name, description:$description, authorId:$authorId){
                    id
                    name
                    description
                }
            }
        `

        const QUERY = gql`
        {
            books{
                id
                name
                description
                author{
                    id
                    name
                    bio
                }
            }
        }
        `

        client.mutate({
            mutation: MUTATION_QUERY,
            variables: {
                name: title,
                description: description,
                authorId: authorid
            },
            refetchQueries: {
                query: QUERY
            }
        })
    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <Form onSubmit={(e) => this.formSubmit(e, client)}>
                        <Form.Field>
                            <Form.Input name="title" placeholder="Judul" type="text" />
                            <Form.TextArea name="description" />
                            <Form.Input name="authorid" placeholder="Author ID" type="text" />
                            <Button type="submit">Submit</Button>
                        </Form.Field>
                    </Form>
                )}
            </ApolloConsumer>
        )
    }
}

export default CreateBook