import React, { useEffect ,useState } from 'react';

import axios from 'axios';
import Navvbar from './NavbarUser';
import ArticleModal from './ArticleModal';
import StatusModal from './StatusModal';
import Navvbartwo from './Navvbartwo';
import NavvbarEditeurHome from './NavvbarHomeEditeur';


// Sample publications data matching the Publication class structure


const ArticlesList = () => {

  const [publications, setPublications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/publications/')
      .then(response => {
        setPublications(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des publications :', error);
      });
  }, []);

    // Function to handle deleting an article
    const handleDelete = (id) => {
        setPublications(publications.filter(article => article.id !== id));
    };

    // Function to handle deleting an article
  

  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState(publications);

  const openArticleModal = (article) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  const openStatusModal = (article) => {
    setSelectedArticle(article);
    setShowStatusModal(true);
  };

  const closeStatusModal = () => {
    setShowStatusModal(false);
    setSelectedArticle(null);
  };

  const handleUpdateStatus = (newStatus) => {
    // Update the article's status in the state
    setArticles(prevArticles => 
      prevArticles.map(article => 
        article.id === selectedArticle.id 
          ? { 
              ...article, 
              statut: newStatus,
              date_validation: newStatus === 'valide' || newStatus === 'refuse' 
                ? new Date().toISOString().split('T')[0] 
                : article.date_validation,
              validateur_id: newStatus === 'valide' || newStatus === 'refuse' 
                ? 1 // Assuming the validator ID is 1 (you should replace with actual validator ID)
                : article.validateur_id
            } 
          : article
      )
    );
    closeStatusModal();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getStatusLabel = (statut) => {
    const statusMap = {
      'brouillon': 'Brouillon',
      'en_attente': 'En cours',
      'valide': 'Acceptée',
      'refuse': 'Refusé',
      'public': 'Public'
    };
    return statusMap[statut] || statut;
  };

  
  return (
    <div style={{ backgroundColor: '#E4F1FF', minHeight: '100vh' }}>
      <NavvbarEditeurHome />

      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#002366', marginBottom: '30px' }}>Voici la liste des articles :</h1>

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
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Date création</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Date validation</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Etat</th>
                <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Mettre à jour</th>
              </tr>
            </thead>

            <tbody>
              {publications.map((pub) => (
                <tr 
                  key={pub.id}
                  style={{ 
                    borderBottom: '1px solid #dee2e6'
                  }}
                >
                  <td style={{ padding: '16px' }}>{pub.id}</td>
                  <td style={{ padding: '16px', cursor: 'pointer' }} onClick={() => openArticleModal(pub)}>
                    {pub.type}
                  </td>
                  <td style={{ padding: '16px' }}>{formatDate(pub.date_planifiee)}</td>
                  <td style={{ padding: '16px' }}>{formatDate(pub.date_validation)}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: pub.statut === 'valide' ? '#e6ffe6' : 
                                       pub.statut === 'refuse' ? '#ffe6e6' :
                                       pub.statut === 'public' ? '#e6f7ff' : '#fff3e6',
                      color: pub.statut === 'valide' ? '#006600' : 
                            pub.statut === 'refuse' ? '#cc0000' :
                            pub.statut === 'public' ? '#0066cc' : '#cc6600'
                    }}>
                      {getStatusLabel(pub.statut)}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openStatusModal(pub);
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
                      Mettre à jour
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for viewing/editing the full article */}
      {showArticleModal && selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={closeArticleModal}
        />
      )}

      {/* Modal for updating the article's status */}
      {showStatusModal && selectedArticle && (
        <StatusModal
          article={selectedArticle}
          onClose={closeStatusModal}
          onUpdate={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default ArticlesList;