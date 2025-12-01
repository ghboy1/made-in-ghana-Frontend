import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { FaBook, FaUser, FaBookmark, FaBookReader, FaTimes, FaShare, FaDownload } from 'react-icons/fa';
import './Books.css';

// Set Modal app element for accessibility
Modal.setAppElement('#root');

// GenreTabs Component
const GenreTabs = ({ genres, activeGenre, setActiveGenre }) => (
  <div className="genre-tabs">
    <div className="ghana-flag-mini">
      <div className="stripe red"></div>
      <div className="stripe gold"></div>
      <div className="stripe green"></div>
    </div>
    {genres.map((genre) => (
      <button
        key={genre.id}
        className={activeGenre === genre.id ? 'active' : ''}
        onClick={() => setActiveGenre(genre.id)}
        aria-label={`Select ${genre.name} genre`}
      >
        {genre.icon && <span className="genre-icon">{genre.icon}</span>}
        {genre.name}
      </button>
    ))}
  </div>
);

// BookCard Component
const BookCard = ({ book, addToReadingList, openBookModal }) => {
  const isNew = new Date(book.publishDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="book-card">
      <div className="book-cover-container">
        <img src={book.image} alt={book.title} loading="lazy" />
        {isNew && <span className="book-badge new">New</span>}
        {book.featured && <span className="book-badge featured">Featured</span>}
      </div>
      <div className="book-info">
        <h4>{book.title}</h4>
        <p className="book-author">by {book.author}</p>
        <div className="book-meta">
          <span className="book-genre">{book.genre}</span>
          <span className="book-year">{new Date(book.publishDate).getFullYear()}</span>
        </div>
        <p className="book-description">{book.description.substring(0, 120)}...</p>
        <div className="book-actions">
          <button className="btn-primary" onClick={() => openBookModal(book)}>
            <FaBookReader /> Preview
          </button>
          <button className="btn-secondary" onClick={() => addToReadingList(book)}>
            <FaBookmark /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

// AuthorCard Component
const AuthorCard = ({ author, openAuthorModal }) => (
  <div className="author-card">
    <div className="author-image-container">
      <img src={author.image} alt={author.name} loading="lazy" />
    </div>
    <div className="author-flag-decor">
      <div className="stripe red"></div>
      <div className="stripe gold"></div>
      <div className="stripe green"></div>
    </div>
    <div className="author-info">
      <h3>{author.name}</h3>
      <p className="author-region">{author.region}</p>
      <p className="author-bio">{author.bio.substring(0, 150)}...</p>
      <button className="author-btn" onClick={() => openAuthorModal(author)}>
        <FaUser /> Read More
      </button>
    </div>
  </div>
);

// ReadingList Component
const ReadingList = ({ readingList, removeFromReadingList, openBookModal }) => (
  <div className="reading-list-container">
    {readingList.length === 0 ? (
      <div className="empty-reading-list">
        <FaBookmark className="empty-icon" />
        <p>Your reading list is empty. Add books you want to read later!</p>
      </div>
    ) : (
      <div className="reading-carousel">
        {readingList.map((book) => (
          <div key={book.id} className="reading-card">
            <button 
              className="remove-reading-btn"
              onClick={() => removeFromReadingList(book.id)}
              aria-label="Remove from reading list"
            >
              <FaTimes />
            </button>
            <img src={book.image} alt={book.title} loading="lazy" onClick={() => openBookModal(book)} />
            <h4>{book.title}</h4>
            <p className="reading-author">{book.author}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Books = () => {
  // Define genres with icons
  const genres = [
    { id: 'all', name: 'All Books', icon: '📚' },
    { id: 'fiction', name: 'Fiction', icon: '📖' },
    { id: 'non-fiction', name: 'Non-Fiction', icon: '🧠' },
    { id: 'poetry', name: 'Poetry', icon: '🎭' },
    { id: 'childrens', name: "Children's", icon: '🧸' },
    { id: 'history', name: 'History', icon: '🏛️' }
  ];
  
  const [activeGenre, setActiveGenre] = useState('all');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [featuredBook, setFeaturedBook] = useState(null);
  const bookPreviewRef = useRef(null);

  // Comprehensive book list
  const allBooks = [
    { 
      id: 1, 
      title: 'The Hundred Wells of Salaga', 
      author: 'Ayesha Harruna Attah',
      genre: 'fiction',
      image: '/images/books/hundred-wells.jpg',
      description: 'Based on true events, a story of courage, forgiveness, love, and freedom in pre-colonial Ghana, told through the eyes of two women.',
      publishDate: '2020-02-15',
      featured: true,
      preview: 'Chapter 1: The air was thick with the smell of ripe mangoes, and Aminah could hardly concentrate on her task...',
      pages: 240
    },
    { 
      id: 2, 
      title: 'Ghana Must Go', 
      author: 'Taiye Selasi',
      genre: 'fiction',
      image: '/images/books/ghana-must-go.jpg',
      description: 'A renowned surgeon and failed husband, Kweku Sai dies suddenly at dawn outside his home in suburban Accra. The news of his death sends a ripple around the world, bringing together the family he abandoned years before.',
      publishDate: '2018-07-10',
      featured: false,
      preview: 'Chapter 1: Kweku dies barefoot on a Sunday before sunrise, his slippers by the doorway to the bedroom...',
      pages: 336
    },
    { 
      id: 3, 
      title: 'Homegoing', 
      author: 'Yaa Gyasi',
      genre: 'fiction',
      image: '/images/books/homegoing.jpg',
      description: 'A novel of breathtaking sweep and emotional power that traces three hundred years in Ghana and along the way also becomes a truly great American novel.',
      publishDate: '2017-05-05',
      featured: true,
      preview: 'Chapter 1: The night Effia Otcher was born into the musky heat of Fanteland, a fire raged through the woods just outside her father\'s compound...',
      pages: 320
    },
    { 
      id: 4, 
      title: 'The Scent of Burnt Flowers', 
      author: 'Blitz Bazawule',
      genre: 'fiction',
      image: '/images/books/scent-burnt-flowers.jpg',
      description: 'Fleeing persecution in 1960s America, a Black couple seeks asylum in Ghana, but old secrets threaten their fresh start.',
      publishDate: '2023-06-28',
      featured: false,
      preview: 'Chapter 1: They arrived in Accra under the cover of night, the air thick with humidity and anticipation...',
      pages: 256
    },
    { 
      id: 5, 
      title: 'Ghana: An African Portrait Revisited', 
      author: 'Peter E. Randall',
      genre: 'non-fiction',
      image: '/images/books/ghana-portrait.jpg',
      description: 'A photographic journey through contemporary Ghana, showing both traditional and modern aspects of the country.',
      publishDate: '2019-03-12',
      featured: false,
      preview: 'Introduction: When I first visited Ghana in 1997, I was immediately struck by the warmth of its people...',
      pages: 180
    },
    { 
      id: 6, 
      title: 'No Sweetness Here', 
      author: 'Ama Ata Aidoo',
      genre: 'fiction',
      image: '/images/books/no-sweetness.jpg',
      description: 'A collection of short stories that deal with the clash between Western and African traditions.',
      publishDate: '2021-09-15',
      featured: false,
      preview: 'Story 1: The rain had been falling steadily for days, turning the red earth roads into rivers of mud...',
      pages: 160
    },
    { 
      id: 7, 
      title: 'The Sun by Night', 
      author: 'Benjamin Kwakye',
      genre: 'fiction',
      image: '/images/books/sun-by-night.jpg',
      description: 'A novel exploring the political and social transformations of modern Ghana through the eyes of a young woman.',
      publishDate: '2022-01-20',
      featured: false,
      preview: 'Chapter 1: Akua Mansa stood at the edge of the crowd, watching as the politicians made their promises...',
      pages: 280
    },
    { 
      id: 8, 
      title: 'Ghana - Culture Smart!', 
      author: 'Ian Utley',
      genre: 'non-fiction',
      image: '/images/books/ghana-culture-smart.jpg',
      description: 'A concise guide to customs and etiquette in Ghana, offering insights for visitors and those interested in Ghanaian culture.',
      publishDate: '2018-11-03',
      featured: false,
      preview: 'Chapter 1: Ghana is a land of rich traditions and warm hospitality. Understanding the cultural nuances will enhance your experience...',
      pages: 168
    },
    { 
      id: 9, 
      title: 'Akwantuo: A Journey', 
      author: 'Nii Ayikwei Parkes',
      genre: 'poetry',
      image: '/images/books/akwantuo.jpg',
      description: 'A collection of poems exploring themes of journey, identity, and belonging from a Ghanaian perspective.',
      publishDate: '2023-02-07',
      featured: false,
      preview: 'From "Homecoming": The dust on my feet tells stories / Of paths walked and memories gathered...',
      pages: 120
    },
    { 
      id: 10, 
      title: 'Adventures of Kojo and Ama', 
      author: 'Farida Bedwei',
      genre: 'childrens',
      image: '/images/books/kojo-ama.jpg',
      description: 'A delightful children\'s book following the adventures of two young Ghanaian children as they explore their heritage.',
      publishDate: '2022-07-10',
      featured: false,
      preview: 'Chapter 1: Kojo woke up early on Saturday morning. Today was the day he and his sister Ama would visit their grandmother in the village...',
      pages: 48
    },
    { 
      id: 11, 
      title: 'The History of Ghana', 
      author: 'Roger S. Gocking',
      genre: 'history',
      image: '/images/books/history-ghana.jpg',
      description: 'A comprehensive history of Ghana from pre-colonial times to the present day, examining political, economic, and social developments.',
      publishDate: '2021-08-15',
      featured: false,
      preview: 'Chapter 1: Long before Europeans arrived on the shores of what would later be called the Gold Coast, the region was home to sophisticated kingdoms...',
      pages: 384
    },
    { 
      id: 12, 
      title: 'Wife of the Gods', 
      author: 'Kwei Quartey',
      genre: 'fiction',
      image: '/images/books/wife-gods.jpg',
      description: 'A detective novel set in Ghana, following Inspector Darko Dawson as he investigates a murder in a rural village while confronting traditional beliefs.',
      publishDate: '2019-05-23',
      featured: false,
      preview: 'Chapter 1: The body lay in the forest, just inside the sacred grove. Even in death, she was beautiful...',
      pages: 304
    }
  ];

  // Distinguished Ghanaian authors
  const authors = [
    { 
      id: 1, 
      name: 'Ama Ata Aidoo', 
      image: '/images/authors/ama-ata-aidoo.jpg', 
      region: 'Central Region',
      bio: 'A celebrated Ghanaian author and playwright, Ama Ata Aidoo explores the roles and challenges of African women in contemporary society. Her works include novels, poetry, and plays that address themes of colonialism, gender, and cultural identity. She was Minister of Education in Ghana briefly in the early 1980s and received numerous literary awards for her contributions to African literature.',
      notableWorks: ['Our Sister Killjoy', 'Changes: A Love Story', 'No Sweetness Here'],
      awards: ['Commonwealth Writers Prize', 'Aidoo-Snyder Book Prize'],
      quotes: ["At the end of the day, it isn't where I came from. Maybe home is somewhere I'm going and never have been before."]
    },
    { 
      id: 2, 
      name: 'Yaa Gyasi', 
      image: '/images/authors/yaa-gyasi.jpg', 
      region: 'Ashanti Region',
      bio: 'Born in Ghana and raised in Alabama, Yaa Gyasi is known for her debut novel "Homegoing," which traces the descendants of two half-sisters across three hundred years, from Ghana to America. Her work explores the lasting impact of slavery and colonialism on both continents. Her second novel, "Transcendent Kingdom," further cements her reputation as one of the most important young voices in contemporary literature.',
      notableWorks: ['Homegoing', 'Transcendent Kingdom'],
      awards: ['National Book Critics Circle Award', 'PEN/Hemingway Award'],
      quotes: ["Evil begets evil. It grows. It transmutes, so that sometimes you cannot see that the evil in the world began as the evil in your own home."]
    },
    { 
      id: 3, 
      name: 'Ayi Kwei Armah', 
      image: '/images/authors/ayi-kwei-armah.jpg', 
      region: 'Western Region',
      bio: 'One of Ghana\'s most influential writers, Ayi Kwei Armah is best known for his novel "The Beautyful Ones Are Not Yet Born," a stark portrayal of post-independence Ghana dealing with themes of corruption and disillusionment. His works are characterized by their political consciousness and exploration of African identity in the face of Western influence.',
      notableWorks: ['The Beautyful Ones Are Not Yet Born', 'Fragments', 'Two Thousand Seasons'],
      awards: ['Langston Hughes Award'],
      quotes: ["The present is where we get lost - if we forget our past and have no vision of the future."]
    },
    { 
      id: 4, 
      name: 'Kofi Awoonor', 
      image: '/images/authors/kofi-awoonor.jpg', 
      region: 'Volta Region',
      bio: 'Poet, literary critic, and diplomat Kofi Awoonor was a major figure in African literature. His poetry draws heavily on the oral traditions of his Ewe heritage, blending traditional forms with contemporary themes. Tragically, he was killed in the 2013 Westgate shopping mall attack in Nairobi, Kenya, while attending a literary festival.',
      notableWorks: ['This Earth, My Brother', 'Night of My Blood', 'The House By the Sea'],
      awards: ['Ghana Poetry Award', 'National Award of Honor'],
      quotes: ["Until the lion has his own storyteller, the hunter will always have the best part of the story."]
    }
  ];

  // Filter books based on active genre
  const filteredBooks = activeGenre === 'all' 
    ? allBooks 
    : allBooks.filter(book => book.genre === activeGenre);

  // Set featured book on component mount
  useEffect(() => {
    const featured = allBooks.find(book => book.featured === true);
    if (featured) {
      setFeaturedBook(featured);
    }
  }, []);

  // Add book to reading list
  const addToReadingList = (book) => {
    setReadingList(prev => {
      if (prev.some(item => item.id === book.id)) {
        return prev;
      }
      // Show notification (could be implemented with a toast library)
      return [...prev, book];
    });
  };

  // Remove book from reading list
  const removeFromReadingList = (bookId) => {
    setReadingList(prev => prev.filter(book => book.id !== bookId));
  };

  // Open book modal
  const openBookModal = (book) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  // Open author modal
  const openAuthorModal = (author) => {
    setSelectedAuthor(author);
    setIsAuthorModalOpen(true);
  };

  return (
    <div className="books-page">
      {/* Header with Ghana flag */}
      <header className="books-header">
        <div className="header-content">
          <h1>Ghana Reads</h1>
          <p>Discover the rich literary heritage of Ghana</p>
        </div>
        <div className="ghana-flag">
          <div className="stripe red"></div>
          <div className="stripe gold">
            <div className="star">★</div>
          </div>
          <div className="stripe green"></div>
        </div>
      </header>

      {/* Featured Book Banner */}
      {featuredBook && (
        <section className="featured-book-banner">
          <div className="featured-content">
            <div className="featured-info">
              <div className="featured-badge">
                <span>Featured Book</span>
              </div>
              <h2>{featuredBook.title}</h2>
              <p className="featured-author">by {featuredBook.author}</p>
              <p className="featured-description">{featuredBook.description}</p>
              <div className="featured-actions">
                <button className="btn-primary" onClick={() => openBookModal(featuredBook)}>
                  <FaBookReader /> Read Preview
                </button>
                <button className="btn-secondary" onClick={() => addToReadingList(featuredBook)}>
                  <FaBookmark /> Add to Reading List
                </button>
              </div>
            </div>
            <div className="featured-image">
              <img src={featuredBook.image} alt={featuredBook.title} />
            </div>
          </div>
        </section>
      )}

      {/* Genre Sections with Tabs */}
      <section className="genre-sections">
        <div className="section-header">
          <h2>Explore Books</h2>
          <div className="ghana-flag-mini">
            <div className="stripe red"></div>
            <div className="stripe gold"></div>
            <div className="stripe green"></div>
          </div>
        </div>
        
        <GenreTabs genres={genres} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
        
        <div className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              addToReadingList={addToReadingList} 
              openBookModal={openBookModal}
            />
          ))}
        </div>
      </section>

      {/* Author Spotlights */}
      <section className="author-spotlights">
        <div className="section-header">
          <h2>Author Spotlights</h2>
          <div className="ghana-flag-mini">
            <div className="stripe red"></div>
            <div className="stripe gold"></div>
            <div className="stripe green"></div>
          </div>
        </div>
        
        <div className="spotlight-grid">
          {authors.map((author) => (
            <AuthorCard 
              key={author.id} 
              author={author} 
              openAuthorModal={openAuthorModal} 
            />
          ))}
        </div>
      </section>

      {/* Reading Lists */}
      <section className="reading-lists">
        <div className="section-header">
          <h2>Your Reading List</h2>
          <div className="ghana-flag-mini">
            <div className="stripe red"></div>
            <div className="stripe gold"></div>
            <div className="stripe green"></div>
          </div>
        </div>
        
        <ReadingList 
          readingList={readingList} 
          removeFromReadingList={removeFromReadingList}
          openBookModal={openBookModal}
        />
      </section>

      {/* Book Modal */}
      <Modal 
        isOpen={isBookModalOpen} 
        onRequestClose={() => setIsBookModalOpen(false)}
        className="book-modal"
        overlayClassName="modal-overlay"
        contentLabel="Book Preview"
      >
        {selectedBook && (
          <div className="modal-content">
            <button 
              className="close-modal-btn"
              onClick={() => setIsBookModalOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            
            <div className="book-modal-header">
              <img src={selectedBook.image} alt={selectedBook.title} className="modal-book-cover" />
              <div className="book-modal-info">
                <h2>{selectedBook.title}</h2>
                <p className="modal-book-author">by {selectedBook.author}</p>
                <div className="book-details">
                  <span className="book-genre-pill">{selectedBook.genre}</span>
                  <span className="book-meta-item">{selectedBook.pages} pages</span>
                  <span className="book-meta-item">Published: {new Date(selectedBook.publishDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <p className="modal-book-description">{selectedBook.description}</p>
                <div className="modal-actions">
                  <button className="btn-primary">
                    <FaBook /> Buy Now
                  </button>
                  <button className="btn-secondary" onClick={() => addToReadingList(selectedBook)}>
                    <FaBookmark /> Save to Reading List
                  </button>
                  <button className="btn-tertiary">
                    <FaShare /> Share
                  </button>
                </div>
              </div>
            </div>
            
            <div className="book-preview-section">
              <h3>Book Preview</h3>
              <div className="book-preview" ref={bookPreviewRef}>
                <p>{selectedBook.preview}</p>
                <div className="preview-fade"></div>
              </div>
              <button className="btn-outline">
                <FaDownload /> Download Sample
              </button>
            </div>
            
            <div className="modal-footer">
              <div className="ghana-flag-mini">
                <div className="stripe red"></div>
                <div className="stripe gold"></div>
                <div className="stripe green"></div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Author Modal */}
      <Modal 
        isOpen={isAuthorModalOpen} 
        onRequestClose={() => setIsAuthorModalOpen(false)}
        className="author-modal"
        overlayClassName="modal-overlay"
        contentLabel="Author Details"
      >
        {selectedAuthor && (
          <div className="modal-content">
            <button 
              className="close-modal-btn"
              onClick={() => setIsAuthorModalOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            
            <div className="author-modal-header">
              <div className="author-modal-image">
                <img src={selectedAuthor.image} alt={selectedAuthor.name} />
              </div>
              <div className="author-modal-info">
                <h2>{selectedAuthor.name}</h2>
                <p className="author-region-badge">{selectedAuthor.region}</p>
                <p className="author-full-bio">{selectedAuthor.bio}</p>
              </div>
            </div>
            
            <div className="author-details-section">
              {selectedAuthor.notableWorks && (
                <div className="author-works">
                  <h3>Notable Works</h3>
                  <ul>
                    {selectedAuthor.notableWorks.map((work, index) => (
                      <li key={index}>{work}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedAuthor.awards && (
                <div className="author-awards">
                  <h3>Awards & Recognition</h3>
                  <ul>
                    {selectedAuthor.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedAuthor.quotes && (
                <div className="author-quotes">
                  <h3>Notable Quotes</h3>
                  <blockquote>
                    {selectedAuthor.quotes.map((quote, index) => (
                      <p key={index}>"{quote}"</p>
                    ))}
                  </blockquote>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <div className="ghana-flag-mini">
                <div className="stripe red"></div>
                <div className="stripe gold"></div>
                <div className="stripe green"></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Footer Banner */}
      <div className="footer-flag-banner">
        <div className="stripe red"></div>
        <div className="stripe gold"></div>
        <div className="stripe green"></div>
      </div>
    </div>
  );
};

export default Books;