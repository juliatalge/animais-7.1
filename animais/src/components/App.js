import React, { useState, useEffect } from 'react'
import Busca from 'components/Busca'
import env from 'react-dotenv'
import { createClient } from 'pexels'
import PexelsLogo from 'components/PexelsLogo'
import pexelsClient from '../utils/pexelsClient'
import ListaImagens from 'components/ListaImagens'
import { MultiSelect } from 'primereact/multiselect';
import axios from 'axios';

const App = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([
    { label: 'Pexels', value: 'pexels' },
    { label: 'Unsplash', value: 'unsplash' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 3) {
        fetchPhotos();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=10`,
        {
          headers: {
            Authorization: 'YOUR_UNSPLASH_ACCESS_KEY',
          },
        }
      );

      setPhotos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Busca de Figuras</h1>
      <MultiSelect
        value={selectedOptions}
        options={options}
        onChange={(e) => setSelectedOptions(e.value)}
        optionLabel="label"
        placeholder="Selecione as opções"
        filter
      />
      {selectedOptions.includes('unsplash') && (
        <div>
          <img
            src="https://unsplash.com/favicon.ico"
            alt="Unsplash Logo"
            width="16"
            height="16"
            style={{ marginLeft: '5px', verticalAlign: 'middle' }}
          />
          Créditos: Unsplash
        </div>
      )}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.urls.small}
            alt={photo.alt_description}
            style={{ width: '200px', height: '150px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

  