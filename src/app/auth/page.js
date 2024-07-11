'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [role, setRole] = useState('editeur');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Vous pouvez ajouter ici la logique de connexion, par exemple une requête API.
    // Supposons que la connexion est réussie
    router.push(`/?role=${role}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 text-green-900">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Se connecter</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rôle</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="editeur">Éditeur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
