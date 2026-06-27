// src/pages/Directory.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFacultyPage } from '../services/facultyService';
import Navbar from '../components/Navbar';
import { Search, ChevronUp, User } from 'lucide-react';

const Directory = () => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllFaculty = async () => {
      try {
        // Fetch up to 2000 faculty to list all of them
        const data = await getFacultyPage(1, 2000, '');
        setFaculties(data.faculty || []);
      } catch (err) {
        console.error('Error fetching directory data:', err);
        setError('Failed to load faculty directory. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllFaculty();
  }, []);

  // Live filter (crawlers see all links initially, while users can filter)
  const filteredFaculties = faculties.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by first letter
  const grouped = filteredFaculties.reduce((acc, f) => {
    const firstLetter = f.name.trim().charAt(0).toUpperCase();
    const letter = /^[A-Z]$/.test(firstLetter) ? firstLetter : '#';
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(f);
    return acc;
  }, {});

  // Sort groups alphabetically (with '#' at the end or beginning)
  const sortedLetters = Object.keys(grouped).sort((a, b) => {
    if (a === '#') return 1;
    if (b === '#') return -1;
    return a.localeCompare(b);
  });

  const lettersRange = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const scrollToSection = (id) => {
    const element = document.getElementById(`letter-${id}`);
    if (element) {
      const offset = 90; // account for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20">
      <title>VIT-AP Faculty Directory - Browse All Professors | Faculty Ranker</title>
      <meta name="description" content="Browse and search all VIT-AP faculty members alphabetically. Find profiles, teaching ratings, correction reviews, and attendance ratings of VIT AP professors." />
      <link rel="canonical" href="https://vitap-faculty-ranker.vercel.app/directory" />

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Faculty Directory
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Alphabetical index of all registered and verified faculty members at VIT-AP. Use this to easily navigate to any professor's profile.
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="relative flex items-center bg-gray-900 border border-gray-800 rounded-full overflow-hidden focus-within:border-purple-500 transition-colors duration-200">
            <Search className="w-5 h-5 text-gray-500 ml-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search directory by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-gray-500 px-3 py-3 w-full outline-none text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-gray-500 hover:text-white mr-4 text-sm font-semibold transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Alphabetical index jump list */}
        <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-4 sm:p-6 mb-10 shadow-xl">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-4">
            Jump to Section
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {lettersRange.map((letter) => {
              const hasGroup = grouped[letter] && grouped[letter].length > 0;
              return (
                <button
                  key={letter}
                  onClick={() => hasGroup && scrollToSection(letter)}
                  disabled={!hasGroup}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                    hasGroup
                      ? 'bg-gray-800 text-purple-400 hover:bg-purple-600 hover:text-white shadow-md hover:-translate-y-0.5 cursor-pointer'
                      : 'bg-gray-950 text-gray-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
            {grouped['#'] && grouped['#'].length > 0 && (
              <button
                onClick={() => scrollToSection('numeric')}
                className="px-3 h-8 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm bg-gray-800 text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-200"
              >
                #
              </button>
            )}
          </div>
        </div>

        {/* Content list */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-400">Loading directory listings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border border-red-900/30 p-8">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        ) : sortedLetters.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800 p-8">
            <p className="text-gray-400">No faculty members found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-12">
            {sortedLetters.map((letter) => (
              <section
                key={letter}
                id={`letter-${letter === '#' ? 'numeric' : letter}`}
                className="bg-gray-900/40 border border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-md"
              >
                <div className="flex items-center space-x-4 border-b border-gray-800 pb-4 mb-6">
                  <span className="text-3xl font-extrabold text-purple-500 bg-purple-500/10 w-12 h-12 rounded-xl flex items-center justify-center border border-purple-500/20">
                    {letter}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">
                    {grouped[letter].length} {grouped[letter].length === 1 ? 'Professor' : 'Professors'}
                  </span>
                </div>

                {/* Faculty Names Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                  {grouped[letter].map((faculty) => (
                    <div key={faculty._id} className="flex items-center space-x-2 group">
                      <User className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
                      <Link
                        to={`/faculty/${faculty._id}`}
                        className="text-gray-300 hover:text-purple-400 transition-colors duration-150 text-base py-1 font-medium truncate"
                      >
                        {faculty.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Scroll back to top button */}
        {!loading && sortedLetters.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-sm text-gray-400 hover:text-white rounded-full transition-all duration-200 shadow-md cursor-pointer"
            >
              <ChevronUp className="w-4 h-4 text-purple-400" />
              <span>Back to Top</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Directory;
