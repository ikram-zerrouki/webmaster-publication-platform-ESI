import React, { useState } from 'react';

const ArticleModal = ({ article, onClose }) => {
  const [decision, setDecision] = useState('accepter');
  const [comments, setComments] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      decision,
      comments,
      publicationDate,
    });
    onClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          width: '500px', // Reduced from 600px
          maxHeight: '80vh', // Limit height
          overflowY: 'auto', // Add scroll if content is too long
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            paddingBottom: '10px',
            zIndex: 1,
          }}
        >
          <h2 style={{ color: '#002366', margin: 0, fontSize: '1.25rem' }}>Article {article.id}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#002366',
              cursor: 'pointer',
              fontSize: '1.5rem',
              lineHeight: '1',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
          <div>
            <label style={{ fontWeight: 600, display: 'block', fontSize: '0.875rem' }}>Auteur ID:</label>
            <p style={{ margin: '5px 0' }}>{article.auteur_id}</p>
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', fontSize: '0.875rem' }}>Date création:</label>
            <p style={{ margin: '5px 0' }}>{formatDate(article.date_creation)}</p>
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', fontSize: '0.875rem' }}>Date validation:</label>
            <p style={{ margin: '5px 0' }}>{formatDate(article.date_validation)}</p>
          </div>
          <div>
            <label style={{ fontWeight: 600, display: 'block', fontSize: '0.875rem' }}>Validateur ID:</label>
            <p style={{ margin: '5px 0' }}>{article.validateur_id || 'N/A'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="content" style={{ fontWeight: 600, display: 'block', marginBottom: '5px', fontSize: '0.875rem' }}>
              Contenu
            </label>
            <textarea
              id="content"
              value={article.contenu}
              readOnly
              style={{
                width: '100%',
                height: '80px', // Reduced from 100px
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: '5px', fontSize: '0.875rem' }}>
              Decision
            </label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <input
                  type="radio"
                  name="decision"
                  value="accepter"
                  checked={decision === 'accepter'}
                  onChange={() => setDecision('accepter')}
                  style={{ marginRight: '5px' }}
                />
                Accepter
              </label>
              <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <input
                  type="radio"
                  name="decision"
                  value="refuser"
                  checked={decision === 'refuser'}
                  onChange={() => setDecision('refuser')}
                  style={{ marginRight: '5px' }}
                />
                Refuser
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="comments" style={{ fontWeight: 600, display: 'block', marginBottom: '5px', fontSize: '0.875rem' }}>
              Commentaires
            </label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Ajouter des commentaires..."
              style={{
                width: '100%',
                height: '80px', // Reduced from 100px
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                resize: 'vertical',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="publicationDate" style={{ fontWeight: 600, display: 'block', marginBottom: '5px', fontSize: '0.875rem' }}>
              Date publication
            </label>
            <input
              type="date"
              id="publicationDate"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#002366',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              width: '100%',
            }}
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;