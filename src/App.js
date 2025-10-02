import {MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { MoonIcon} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ShareIcon } from '@heroicons/react/24/outline';
import { SunIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect, useRef, useMemo } from 'react';
// import { Search } from 'lucide-react';
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [word, setWord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const audioRef = useRef(null);

  const randomWords = useMemo(() => [
  "serendipity", "eloquent", "resilient", "ephemeral", "ubiquitous",
  "pragmatic", "nostalgia", "ambiguous", "benevolent", "catalyst",
  "diligent", "empathy", "flourish", "gratitude", "harmony",
  "integrity", "jubilant", "kindle", "luminous", "mindful",
  "nuance", "optimism", "persevere", "quintessential", "radiant",
  "serene", "tenacious", "unveil", "vivacious", "wisdom",
  "zenith", "abundant", "brevity", "clarity", "diverse",
  "earnest", "fervent", "genuine", "humble", "inspire",
  "jovial", "keen", "lively", "marvel", "noble",
  "opulent", "passion", "quest", "robust", "sublime",
  "thrive", "unique", "valor", "wonder", "yearn",
  "zeal", "aesthetic", "balance", "courage", "dedicate",
  "enhance", "freedom", "grateful", "hope", "illustrate",
  "journey", "knowledge", "liberty", "momentum", "navigate",
  "opportunity", "principle", "quality", "respect", "strength",
  "transform", "unity", "venture", "wealth", "aspire",
  "believe", "create", "dream", "evolve", "focus",
  "growth", "honor", "imagine", "justice", "learn",
  "meditate", "nurture", "overcome", "prosper", "reflect",
  "sustain", "trust", "understand", "visualize", "achieve", 
  "mellifluous", "ethereal", "ineffable", "ebullient", "effervescent",
  "languor", "reverie", "sonorous", "halcyon", "incandescent",
  "vestigial", "perspicacious", "sagacious", "surreptitious", "obsequious",
  "pernicious", "nefarious", "insidious", "invidious", "duplicitous",
  "bombastic", "grandiloquent", "magnanimous", "munificent", "beneficent",
  "recalcitrant", "obstinate", "intransigent", "truculent", "bellicose",
  "laconic", "taciturn", "reticent", "diffident", "circumspect",
  "ostensible", "spurious", "specious", "nebulous", "abstruse",
  "esoteric", "arcane", "recondite", "hermetic", "inscrutable",
  "pulchritudinous", "resplendent", "iridescent", "opalescent", "luminescent",
  "somnolent", "torpid", "lethargic", "languid", "indolent",
  "vicissitude", "vagary", "caprice", "whimsy", "serendipitous",
  "juxtaposition", "dichotomy", "paradigm", "zeitgeist", "gestalt",
  "aplomb", "sangfroid", "equanimity", "fortitude", "alacrity",
  "temerity", "audacity", "effrontery", "hubris", "braggadocio",
  "quixotic", "mercurial", "capricious", "fickle", "volatile",
  "phlegmatic", "stoic", "imperturbable", "unflappable", "placid",
  "truculent", "pugnacious", "contentious", "fractious", "querulous",
  "ebullient", "exuberant", "effusive", "gregarious", "convivial",
  "lachrymose", "lugubrious", "morose", "melancholic", "dolorous",
  "sanguine", "buoyant", "vivacious", "animated", "sprightly"
  ], []);

  useEffect(() => {
    // Get word of the day
    
    // Fetch and cache word of the day so it only changes once per day
    const fetchWordOfTheDay = async () => {
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const cached = localStorage.getItem('wordOfTheDay');
      if (cached) {
      const { date, word } = JSON.parse(cached);
      if (date === today) {
        setWordOfTheDay(word);
        return;
      }
      }
      try {
      const randomIndex = Math.floor(Math.random() * randomWords.length);
      const randomWord = randomWords[randomIndex];
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
      if (!response.ok) throw new Error('Failed to fetch word of the day');
      const data = await response.json();
      setWordOfTheDay(data[0]);
      localStorage.setItem('wordOfTheDay', JSON.stringify({ date: today, word: data[0] }));
      } catch (err) {
      console.error('Error fetching word of the day:', err);
      }
    };

    fetchWordOfTheDay();
    
    
    // Load recent searches and favorites from localStorage
    const savedSearches = localStorage.getItem('recentSearches');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedSearches) setRecentSearches(JSON.parse(savedSearches));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    
    // Check preferred color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, [randomWords]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    document.body.className = darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800';
  }, [darkMode]);

  const fetchWord = async (term) => {
    if (!term.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
      
      if (!response.ok) {
        throw new Error('Word not found');
      }
      
      const data = await response.json();
      setWord(data[0]);
      
      // Add to recent searches
      if (!recentSearches.includes(term)) {
        setRecentSearches(prev => [term, ...prev].slice(0, 5));
      }
    } catch (err) {
      setError('Word not found. Please try another search.');
      setWord(null);
    } finally {
      setIsLoading(false);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWord(searchTerm);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Show suggestions if input has value
    if (value.length > 1) {
      // Filter suggestions from recent searches and random words
      const filtered = [...recentSearches, ...randomWords]
        .filter(word => word.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    fetchWord(suggestion);
  };

  const toggleFavorite = (word) => {
    if (favorites.includes(word)) {
      setFavorites(prev => prev.filter(w => w !== word));
    } else {
      setFavorites(prev => [...prev, word]);
    }
  };

  const playAudio = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  const shareWord = () => {
    if (word) {
      if (navigator.share) {
        navigator.share({
          title: `Dictionary definition of "${word.word}"`,
          text: `Check out the definition of "${word.word}"`,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(`${word.word}: ${word.meanings[0]?.definitions[0]?.definition}`);
        alert('Definition copied to clipboard!');
      }
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} transition-colors duration-300`}>
      <audio ref={audioRef} className="hidden" />
      
      <header className="pt-6 pb-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div></div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              darkMode
                ? 'bg-fuchsia-300 hover:bg-fuchsia-500 text-gray-900'
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 ml-2" />
            ) : (
              <MoonIcon className="w-6 h-6 ml-2" />
            )}
          </button>
        </div>
        
        <div className="text-center mt-8 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            <span className={`${darkMode ? 'text-lavender-300' : 'text-lavender-600'}`}>Lexicon🌸</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Discover the depth and beauty of language</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Search Section */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className={`flex items-center w-full md:w-4/5 mx-auto rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md focus-within:ring-2 focus-within:ring-fuchsia-500 transition-all`}>
                <MagnifyingGlassIcon className="w-8 h-8 text-gray-400 ml-4"/>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search"
                  className={`w-full py-4 px-6 outline-none ${darkMode ? 'bg-gray-800' : 'bg-white'} text-lg`}
                  autoComplete="off"
                />
                <button 
                  type="submit" 
                  className={`px-6 py-6 mx-auto ${darkMode ? 'bg-gray-800 hover:bg-fuchsia-500 active:bg-fuchsia-500' : 'bg-fuchsia-300 hover:bg-fuchsia-500 active:bg-fuchsia-500'} text-white font-medium transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
                >
                  Search
                </button>
              </div>
              
              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className={`absolute z-10 mt-1 w-full md:w-4/5 mx-auto left-0 right-0 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        onClick={() => selectSuggestion(suggestion)}
                        className={`px-4 py-3 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} cursor-pointer transition-colors`}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recent searches:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(term);
                        fetchWord(term);
                      }}
                      className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Word of the Day */}
                {!word && !isLoading && !error && wordOfTheDay && (
                <div className={`mb-10 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold mb-4">Word of the Day</h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  </div>
                  <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold">{wordOfTheDay.word}</h3>
                  <div className="flex space-x-2">
                    {wordOfTheDay.phonetics.some(p => p.audio) && (
                    <button 
                      onClick={() => playAudio(wordOfTheDay.phonetics.find(p => p.audio)?.audio || '')}
                      className={`p-2 rounded-full ${darkMode ? 'bg-fuchsia-500 hover:bg-fuchsia-700' : 'bg-fuchsia-500 hover:bg-fuchsia-700'} transition-colors cursor-pointer`}
                      aria-label="Play pronunciation"
                    >
                      <SpeakerWaveIcon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
                    </button>
                    )}
                  </div>
                  </div>
                  {wordOfTheDay.phonetic && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{wordOfTheDay.phonetic}</p>
                  )}
                  {wordOfTheDay.meanings.length > 0 && (
                  <div className="mb-4">
                    <p className="italic text-gray-500 dark:text-gray-400 mb-2">{wordOfTheDay.meanings[0].partOfSpeech}</p>
                    <p className="mb-3">{wordOfTheDay.meanings[0].definitions[0].definition}</p>
                    {wordOfTheDay.meanings[0].definitions[0].example && (
                    <p className="text-gray-600 dark:text-gray-400 border-l-4 border-lavender-300 pl-3 italic">
                      "{wordOfTheDay.meanings[0].definitions[0].example}"
                    </p>
                    )}
                  </div>
                  )}
              <button 
                onClick={() => {
                  setSearchTerm(wordOfTheDay.word);
                  fetchWord(wordOfTheDay.word);
                }}
                className={`mt-2 px-4 py-2 ${darkMode ? 'bg-fuchsia-300 hover:bg-fuchsia-500' : 'bg-fuchsia-300 hover:bg-fuchsia-500'} text-white rounded-lg transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
              >
                See full details
              </button>
            </div>
          )}
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400"></div>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center`}>
              <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
              <p className="text-lg mb-4">{error}</p>
              <p className="text-gray-500 dark:text-gray-400">
                <div>It seems like there is an error. You can try...</div>
                <ul  className='flex flex-col justify-center items-center gap-2 mt-4'>
                  <li>🌸Refreshing the page</li>
                  <li>🌸Checking your spelling</li>
                  <li>🌸Searching for a different word</li>
                  <li>🌸Making sure your device is connected to the Internet</li>
                </ul>
              </p>
              {/* Try checking your spelling, search for a different word, or make sure your device is connected to the Internet. */}
            </div>
          )}
          
          {/* Word Result */}
          {word && (
            <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all hover:shadow-lg`}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold">{word.word}</h2>
                <div className="flex space-x-2">
                  {word.phonetics.some(p => p.audio) && (
                    <button 
                      onClick={() => playAudio(word.phonetics.find(p => p.audio)?.audio || '')}
                      className={`p-2 rounded-full ${darkMode ? 'bg-fuchsia-500 hover:bg-fuchsia-700' : 'bg-fuchsia-500 hover:bg-fuchsia-700'} transition-colors cursor-pointer`}
                      aria-label="Play pronunciation"
                    >
                      <SpeakerWaveIcon className="w-6 h-6 text-gray-800 dark:text-gray-100 " />
                    </button>
                  )}
                  <button 
                    onClick={() => toggleFavorite(word.word)}
                    className={`p-2 rounded-full ${darkMode ? 'bg-fuchsia-500 hover:bg-fuchsia-700' : 'bg-fuchsia-500 hover:bg-fuchsia-700'} transition-colors cursor-pointer`}
                    aria-label={favorites.includes(word.word) ? "Remove from favorites" : "Add to favorites"}
                  >
                  <HeartIcon className={`w-6 h-6 ${favorites.includes(word.word) ? 'text-red-500' : 'text-gray-800 dark:text-gray-100'}`} />
                  </button>
                  <button 
                    onClick={shareWord}
                    className={`p-2 rounded-full ${darkMode ? 'bg-fuchsia-500 hover:bg-fuchsia-700' : 'bg-fuchsia-500 hover:bg-fuchsia-700'} transition-colors cursor-pointer`}
                    aria-label="Share word"
                  >
                    <ShareIcon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
                  </button>
                </div>
              </div>
              
              {word.phonetic && (
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{word.phonetic}</p>
              )}
              
              {word.meanings.map((meaning, index) => (
                <div key={index} className={`mb-8 ${index > 0 ? 'pt-6 border-t border-gray-200 dark:border-gray-700' : ''}`}>
                  <p className="text-lg italic text-gray-500 dark:text-gray-400 mb-4">{meaning.partOfSpeech}</p>
                  
                  <div className="space-y-4">
                    {meaning.definitions.map((def, defIndex) => (
                      <div key={defIndex} className="mb-4">
                        <div className="flex">
                          <span className="text-lavender-500 mr-2">{defIndex + 1}.</span>
                          <p>{def.definition}</p>
                        </div>
                        
                        {def.example && (
                          <p className="mt-2 text-gray-600 dark:text-gray-400 border-l-4 border-lavender-300 pl-3 italic">
                            "{def.example}"
                          </p>
                        )}
                        
                        {def.synonyms && def.synonyms.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Synonyms:</p>
                            <div className="flex flex-wrap gap-2">
                              {def.synonyms.slice(0, 5).map((synonym, synIndex) => (
                                <button
                                  key={synIndex}
                                  onClick={() => {
                                    setSearchTerm(synonym);
                                    fetchWord(synonym);
                                  }}
                                  className={`px-3 py-1 text-sm rounded-full ${darkMode ? 'bg-lavender-900 hover:bg-lavender-800' : 'bg-lavender-100 hover:bg-lavender-200'} ${darkMode ? 'text-lavender-200' : 'text-lavender-800'} transition-colors cursor-pointer !rounded-button whitespace-nowrap`}
                                >
                                  {synonym}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Favorites Section */}
          {favorites.length > 0 && !word && !isLoading && !error && (
            <div className={`mt-10 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>
              <div className="flex flex-wrap gap-2">
                {favorites.map((favWord, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchTerm(favWord);
                      fetchWord(favWord);
                    }}
                    className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors cursor-pointer flex items-center !rounded-button whitespace-nowrap`}
                  >
                    {favWord}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className={`py-6 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 WordWise Dictionary. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Powered by Free Dictionary API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
