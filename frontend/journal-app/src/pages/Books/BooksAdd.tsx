import React, { useState } from 'react';
import AppBar from '../../components/AppBar';

interface Book {
  title?: string;
  author_name?: string[];
  cover_i?: number;
}

interface props {
  mode: boolean;
  setMode: () => void;
}

const BookSearch = ({ mode, setMode }: props) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);


  


  const searchBooks = async () => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchInput)}`);
      const data = await response.json();
      setSearchResults(data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='flex flex-col space-y-20'>
      < AppBar mode={mode} setMode={setMode}/>
      <div>
      <h1>Book Search</h1>
      <label htmlFor="searchInput">Search for books:</label>
      <input
        type="text"
        id="searchInput"
        placeholder="Enter book title"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>

      <div>
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          searchResults.map((book, index) => (
            <div key={index} className="book">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`${book.title} cover`}
              />
              <div>
                <h3>{book.title || 'Title not available'}</h3>
                <p>Author: {book.author_name ? book.author_name.join(', ') : 'Author not available'}</p>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
};

export default BookSearch;
