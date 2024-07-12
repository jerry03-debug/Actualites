'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const categories = [
  { id: null, name: 'Tous les articles' },
  { id: 1, name: 'Politique' },
  { id: 2, name: 'Économie' },
  { id: 3, name: 'Sport' },
  { id: 4, name: 'Technologie' },
  // Ajoutez d'autres catégories ici
];

const initialNews = [
  {
    id: 1,
    title: 'Titre de l\'actualité 1',
    description: 'Description de l\'actualité 1',
    publicationDate: '2024-07-09',
    category: 1,
  },
  {
    id: 2,
    title: 'Titre de l\'actualité 2',
    description: 'Description de l\'actualité 2',
    publicationDate: '2024-07-08',
    category: 2,
  },
  {
    id: 3,
    title: 'Titre de l\'actualité 3',
    description: 'Description de l\'actualité 3',
    publicationDate: '2024-07-07',
    category: 3,
  },
  {
    id: 4,
    title: 'Titre de l\'actualité 4',
    description: 'Description de l\'actualité 4',
    publicationDate: '2024-07-06',
    category: 4,
  },
  {
    id: 5,
    title: 'Titre de l\'actualité 5',
    description: 'Description de l\'actualité 5',
    publicationDate: '2024-07-05',
    category: 1,
  },
];

const pageSize = 3;

export default function Home() {
  const [news, setNews] = useState(initialNews);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const filteredNews = selectedCategory !== null
    ? news.filter(item => item.category === selectedCategory)
    : news;

  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredNews.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSaveArticle = (article) => {
    if (article.id) {
      setNews(news.map(n => n.id === article.id ? article : n));
    } else {
      article.id = news.length + 1;
      setNews([...news, article]);
    }
    setIsEditing(false);
    setIsAdding(false);
    setSelectedNews(null);
  };

  const handleDeleteArticle = (id) => {
    setNews(news.filter(n => n.id !== id));
    setSelectedNews(null);
  };

  return (
    <main className="min-h-screen flex flex-col bg-green-50 text-green-900">
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ActuDIC</h1>
        <nav>
          <ul className="flex items-center space-x-4">
            {categories.map(category => (
              <li key={category.id}>
                <button
                  className={`hover:text-green-300 ${selectedCategory === category.id ? 'font-bold' : ''}`}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                >
                  {category.name}
                </button>
              </li>
            ))}
           
            {role === 'admin' && (
              <li>
                <button
                  className="bg-white text-green-700 py-2 px-4 rounded hover:scale-95 transition-all"
                  onClick={() => router.push('/adminpage')}
                >
                  Gérer les utilisateurs
                </button>
              </li>
            )}
            <li>
              <button
                className="bg-white text-green-700 py-2 px-4 rounded hover:scale-95 transition-all"
                onClick={() => router.push('/auth')}
              >
                Se connecter
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <section className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paginatedNews.map(item => (
          <div
            key={item.id}
            className="max-w-sm w-full lg:max-w-full lg:flex flex-col bg-white rounded shadow-md overflow-hidden p-4 cursor-pointer"
            onClick={() => setSelectedNews(item)}
          >
            <h2 className="font-bold text-xl">{item.title}</h2>
            <p className="text-gray-700">{item.description}</p>
            <p className="text-gray-500 text-sm mt-2">{item.publicationDate}</p>
            {(role === 'editeur' || role === 'admin') && (
              <div className="flex space-x-2 mt-4">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNews(item);
                    setIsEditing(true);
                  }}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteArticle(item.id);
                  }}
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      <div className="flex w-1/2 mx-auto items-center justify-between p-4">
        <button
          className="border-b border-b-green-600 text-green-600 cursor-pointer py-2 px-4 rounded hover:shadow-2xl transition-all hover:-translate-y-1"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &#8592; Précédent
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          className="border-b border-b-green-600 text-green-600 cursor-pointer py-2 px-4 rounded hover:shadow-2xl transition-all hover:-translate-y-1"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Suivant &#8594;
        </button>
      </div>
      {(role === 'editeur' || role === 'admin') && (
                <button
                  className="text-white mx-auto w-fit bg-green-700 py-2 px-4 rounded hover:scale-95 transition-all"
                  onClick={() => setIsAdding(true)}
                >
                  +
                  Ajouter un article
                </button>
            )}

      {(isAdding || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setIsEditing(false);
                setIsAdding(false);
                setSelectedNews(null);
              }}
            >
              &times;
            </button>
            <h2 className="font-bold text-2xl">
              {isAdding ? 'Ajouter un article' : 'Modifier un article'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveArticle(selectedNews);
              }}
              className="mt-4"
            >
              <div className="mb-4">
                <label className="block text-gray-700">Titre</label>
                <input
                  type="text"
                  value={selectedNews?.title || ''}
                  onChange={(e) => setSelectedNews({ ...selectedNews, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={selectedNews?.description || ''}
                  onChange={(e) => setSelectedNews({ ...selectedNews, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date de publication</label>
                <input
                  type="date"
                  value={selectedNews?.publicationDate || ''}
                  onChange={(e) => setSelectedNews({ ...selectedNews, publicationDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Catégorie</label>
                <select
                  value={selectedNews?.category || ''}
                  onChange={(e) => setSelectedNews({ ...selectedNews, category: Number(e.target.value) })}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
              >
                Sauvegarder
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
