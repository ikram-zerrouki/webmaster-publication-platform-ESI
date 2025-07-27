import React, { useState } from 'react';

const StatusModal = ({ article, onClose, onUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState(article.statut);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(selectedStatus);
  };

  const getStatusDisplay = (statusValue) => {
    const statusMap = {
      'brouillon': 'Brouillon',
      'en_attente': 'En cours',
      'valide': 'Acceptée',
      'refuse': 'Refusé',
      'public': 'Public'
    };
    return statusMap[statusValue] || statusValue;
  };

  return (
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
        width: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#002366', marginBottom: '1rem' }}>Changer le statut</h2>
        <p style={{ marginBottom: '1rem' }}>Article: {article.titre}</p>
        <p style={{ marginBottom: '1rem' }}>Statut actuel: {getStatusDisplay(article.statut)}</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="status-select" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Nouveau statut :
            </label>
            <select
              id="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="brouillon">Brouillon</option>
              <option value="en_attente">En cours</option>
              <option value="valide">Acceptée</option>
              <option value="refuse">Refusé</option>
              <option value="public">Public</option>
            </select>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                marginRight: '10px',
                padding: '8px 16px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#002366',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusModal;