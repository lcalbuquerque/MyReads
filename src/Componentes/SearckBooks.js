import React from 'react'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import BooksCat from '../Componentes/BooksCat'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component {

    static propTypes = {
        changeCat: PropTypes.func.isRequired
    };

    state = {
        booksSearch: [],
        searchBook: ''
    }

    findBooks = (e) => {
        this.setState({
            searchBook: e.target.value
        })
        if (!e.target.value) {
            this.setState({ booksSearch: [] })
        }
        else {
            BooksAPI.search(`${e.target.value}`)
                .then(booksSearch => this.trataRetornoAPI(booksSearch))
        }
    }

    trataRetornoAPI = booksSearch => {
        if (!booksSearch.error) { // Tratamento de erro caso busca seja "inválida"
            for (let item of booksSearch) {
                let theBook = this.props.books.find(b => b.id === item.id)
                item.shelf = theBook ? theBook.shelf : 'none'
            }
            this.setState(() => ({ booksSearch }))
        }
        else {
            this.setState({ booksSearch: [] })
        }
    }

    // Atualização na página principal da nova categoria.
    changeBookSearch = (book, newCat) => {
        this.props.changeCat(book, newCat)
    }

    render() {

        return (
            <div className="search-books" >
                <div className="search-books-bar">
                    <Link to='/' className='close-search'> Close </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.searchBook} onChange={this.findBooks} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksCat titleCat='None' booksShelf={this.state.booksSearch} changeCat={this.changeBookSearch} />
                </div>
            </div >
        )
    }
}

export default SearchBooks