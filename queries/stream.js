import React, { Component } from 'react'

class BooksPage extends Component {
    componentDidMount() {
        this.props.subscribeToMore();
    }

    render() {
        const { data } = this.props
        return (
            <ul>
                {data.books.map(book => {
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
    }
}

export default BooksPage