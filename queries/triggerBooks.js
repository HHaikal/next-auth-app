import React, { Component } from 'react'
import { ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import { Button } from 'semantic-ui-react'

class Trigger extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            name: ''
        }

        this.fireBooks = this.fireBooks.bind(this)
    }

    fireBooks(books) {
        this.setState({
            books: books,
            name: 'haikal'
        })
    }

    render() {

        const query = gql`
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
        return (
            <ApolloConsumer>
                {client => (
                    <div>
                        <ul>
                            {this.state.books.map(book => {
                                return (
                                    <li key={book.id}>{book.name}
                                        <ul>
                                            <li>Author: {book.author.name}</li>
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                        <Button onClick={async () => {
                            const { data } = await client.query({
                                query: query
                            })
                            this.fireBooks(data.books)
                        }}>Fire !</Button>
                    </div>

                )}
            </ApolloConsumer>
        )
    }
}

export default Trigger