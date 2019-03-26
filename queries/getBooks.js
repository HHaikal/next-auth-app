import gql from 'graphql-tag'
import { Query } from 'react-apollo'


export default (id, client) => {
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
    )
}