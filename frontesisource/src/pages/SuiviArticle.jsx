import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navvbar from './NavbarUser';

import axios from 'axios';

import NavvbarAjoutArticle from './NavvbarAjoutArticle';
import Navvbartwo from './Navvbartwo';
// Publication class definition
class Publication {
  constructor(id, titre, contenu, auteur_id, statut, date_creation, date_validation, validateur_id) {
    this.id = id;
    this.titre = titre;
    this.contenu = contenu;
    this.auteur_id = auteur_id;
    this.statut = statut;
    this.date_creation = date_creation;
    this.date_validation = date_validation;
    this.validateur_id = validateur_id;
  }
}





const SuiviArticle = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const role = localStorage.getItem('user_role');

  const API_BASE_URL = 'http://127.0.0.1:8000/api/publications/';

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des articles :', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setSelectedArticleId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}${selectedArticleId}/`);
      setShowDeleteModal(false);
      fetchArticles(); // refresh list
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article :', error);
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('fr-FR');

  const getStatusLabel = (statut) => {
    const map = {
      brouillon: 'Brouillon',
      en_attente: 'En cours',
      valide: 'Acceptée',
      refuse: 'Refusé',
      public: 'Public'
    };
    return map[statut] || statut;
  };

  return (
    <div style={{ backgroundColor: '#E4F1FF', minHeight: '100vh' }}>
      <div>
        {role === 'admin' ? <Navvbartwo /> : <NavvbarAjoutArticle />}
        {/* le reste de la page */}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#002366', marginBottom: '1rem' }}>
              Confirmer la suppression
            </h3>
            <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
            <div style={{ marginTop: '1.5rem' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  marginRight: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#002366',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#002366', marginBottom: '30px' }}><br />Suivez vos articles</h2>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflowX: 'auto'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #dee2e6'
              }}>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Etat</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Delete</th>
              </tr>
            </thead>

            <tbody>
              {articles.map((pub) => (
                <tr
                  key={pub.id}
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #dee2e6',
                    ':hover': { backgroundColor: '#f8f9fa' }
                  }}
                  onClick={() => navigate(`/article/${pub.id}`)}
                >
                  <td style={{ padding: '16px' }}>{pub.id}</td>
                  <td style={{ padding: '16px' }}>{pub.type}</td>
                  <td style={{ padding: '16px' }}>{formatDate(pub.date_planifiee)}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: pub.statut === 'valide' ? '#e6ffe6' : '#fff3e6',
                      color: pub.statut === 'valide' ? '#006600' : '#cc6600'
                    }}>
                      {getStatusLabel(pub.statut)}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConfirmation(pub.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#002366',
                        cursor: 'pointer',
                        fontWeight: '600',
                        ':hover': { textDecoration: 'underline' }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export { SuiviArticle };