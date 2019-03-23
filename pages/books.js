import { Button } from 'semantic-ui-react'
import { ApolloConsumer, Query, Subscription } from 'react-apollo'
import gql from 'graphql-tag'
import cookies from 'cookie'
import react from 'react'

const Hello = 'Hello'

const subscription = gql`
    subscription onBookAdded{
        bookAdded{
            id
            name
            description
        }
    }  
`

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

class Books extends React.Component {
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
        return (
            <div>
                <div>
                    <Subscription subscription={subscription}>
                        {({ data, loading }) => {
                            if (loading) {
                                return (
                                    <div>Loading</div>
                                )
                            }
                            return (
                                <div>{data.bookAdded.name}</div>
                            )
                        }}
                    </Subscription>
                </div>
                <div>
                    <Query query={query}>
                        {({ loading, error, data: { books } }) => {
                            if (loading) {
                                return (
                                    <div>Loading ...</div>
                                )
                            }

                            if (error) {
                                return (
                                    <div>Error</div>
                                )
                            }
                            return (
                                <ul>
                                    {books.map(book => {
                                        return (
                                            <li key={book.id}>{book.name}
                                                <ul>
                                                    <li>Author: {book.author.name}</li>
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )
                        }}
                    </Query>
                </div>
                <div>
                    <ApolloConsumer>
                        {client => (
                            <div>
                                <ul>
                                    {this.state.books.map(book => {
                                        const { token } = cookies.parse(document.cookie)
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
                </div>
            </div >

        )
    }
}

export default Books