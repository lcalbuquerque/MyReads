import React from 'react'
import '../App.css'
import PropTypes from 'prop-types'

class BooksCat extends React.Component {

    static propTypes = {
        titleCat: PropTypes.string.isRequired,
        booksShelf: PropTypes.array.isRequired,
        changeCat: PropTypes.func.isRequired
    };

    marcaShelf = (shelf) => {
        return typeof (shelf) === 'undefined' ? 'none' : shelf
    }

    defImagem = (imageLink) => {
        return imageLink ? `url("${imageLink.smallThumbnail}")` : ''
    }

    rendAuthors = (authors) => {
        return authors ? authors.map( (a, i) => <span key={i}> {a} <br /></span>) : ''
    }

    render() {

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.titleCat}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            this.props.booksShelf.length > 0 && (this.props.booksShelf.map((b, i) =>
                                <li key={i}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.defImagem(b.imageLinks)  }}></div>
                                            <div className="book-shelf-changer">
                                                <select onChange={(e) => this.props.changeCat(b, e.target.value)} defaultValue={ this.marcaShelf(b.shelf) }>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{b.title}</div>
                                        <div className="book-authors">{ this.rendAuthors(b.authors) } </div>
                                    </div>
                                </li>
                            )
                            )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BooksCat