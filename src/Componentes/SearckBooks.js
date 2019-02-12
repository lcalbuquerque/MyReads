import React from 'react'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import BooksCat from '../Componentes/BooksCat'

class SearchBooks extends React.Component {

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
                .then((booksSearch) => {
                    this.setState(() => ({
                        booksSearch,
                    }))
                })
        }
    }

    changeBookSearch = (book, newCat) => {
        // Atualizo na página principal a nova categoria. Bug: Limpando a página de search
        this.props.changeCat(book, newCat)
        this.setState((currentState) => ({
            booksSearch: currentState.booksSearch.filter(b => b !== book),
        }))
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