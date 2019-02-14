import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksCat from './Componentes/BooksCat'
import SearchBooks from './Componentes/SearckBooks'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {

    state = {
        books: [],
    }

    componentDidMount() {
        this.carregaBooks()
    }

    carregaBooks() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    changeBook = (book, newCat) => {
        // se não existe shelf (vem da API 'search'), crio o attr
        if (!book.shelf) {
            book.shelf = newCat
        }

        // Atualizo no banco
        BooksAPI.update(book, newCat)

        // Atualizo o state de books
        if (this.state.books.some(b => b.id === book.id)) { // Se existe em books, altero o shelf
            this.setState((currentState) => ({
                books: currentState.books.map(b => b.id === book.id ? { ...b, shelf: newCat } : b)
            }))
        }
         else { // Se não existe em books (vem do search), adiciono elemento a books
            this.setState(currentState => ({
                books: currentState.books.concat(book)
            }));
        }
    }

    filterBooksByShelf = (shelf) => {
        return this.state.books.filter(b => b.shelf === shelf)
    }

    render() {
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <Route exact path='/' component={() => (
                                <div>
                                    <BooksCat titleCat='Currently Reading' booksShelf={this.filterBooksByShelf('currentlyReading')} changeCat={this.changeBook} />
                                    <BooksCat titleCat='Want to Read' booksShelf={this.filterBooksByShelf('wantToRead')} changeCat={this.changeBook} />
                                    <BooksCat titleCat='Read' booksShelf={this.filterBooksByShelf('read')} changeCat={this.changeBook} />
                                </div>
                            )} />

                            <Route path='/search' render={() => (
                                <SearchBooks changeCat={this.changeBook} />
                            )} />
                            
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default BooksApp