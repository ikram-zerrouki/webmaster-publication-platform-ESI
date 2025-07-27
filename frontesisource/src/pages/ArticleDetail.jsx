import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navvbar from './NavbarUser';
import { SuiviArticle } from './SuiviArticle';


const StatusIndicator = ({ label, active, isLast, isRefused, isAccepted }) => {
  const circleColor = 
    isAccepted ? '#4CAF50' : 
    isRefused ? '#ff4444' :
    active ? '#002366' : '#CCCCCC';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: `3px solid ${circleColor}`,
        backgroundColor: 'transparent',
        position: 'relative',
        margin: '0 60px'
      }}>
        {!isLast && <div style={{
          position: 'absolute',
          width: '120px',
          height: '3px',
          backgroundColor: circleColor,
          left: '40px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}></div>}
      </div>
      <span style={{ 
        marginTop: '8px', 
        color: circleColor,
        fontWeight: 500,
        fontSize: '0.9rem'
      }}>
        {label}
      </span>
    </div>
  );
};



const ArticleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/publications/${id}/`)
      .then(res => setArticle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!article) return <div>Chargement...</div>;

  if (!article) {
    return <div style={{ 
      backgroundColor: '#E4F1FF', 
      minHeight: '100vh',
      paddingTop: '80px',
      textAlign: 'center'
    }}>
      <Navvbar />
      <div>Article non trouvé</div>
    </div>;
  }

  const getStatusState = () => {
    switch(article.statut) {
      case 'valide':
        return { 
          steps: [true, true, true], 
          labels: ['Déposée', 'En cours', 'Accepté'] 
        };
      case 'refuse':
        return { 
          steps: [true, true, true], 
          labels: ['Déposée', 'En cours', 'Refusé'] 
        };
      case 'en_attente':
        return { 
          steps: [true, true, false], 
          labels: ['Déposée', 'En cours', 'Accepté/Refusé'] 
        };
      case 'brouillon':
        return { 
          steps: [true, false, false], 
          labels: ['Déposée', 'Brouillon', 'Accepté/Refusé'] 
        };
      default:
        return { steps: [false, false, false], labels: [] };
    }
  };

  const { steps, labels } = getStatusState();
  const checklist = article.checklist || [];

  return (
    <div style={{ backgroundColor: '#E4F1FF', minHeight: '100vh' }}>
      <Navvbar />

      <div style={{ 
        padding: '40px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        paddingTop: '80px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '40px',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            height: '3px',
            backgroundColor: '#E4F1FF',
            width: '80%',
            top: '20px',
            zIndex: 0
          }}></div>
          
          {labels.map((label, index) => (
            <StatusIndicator
              key={index}
              label={label}
              active={steps[index]}
              isLast={index === labels.length - 1}
              isRefused={article.statut === 'refuse' && index === 2}
              isAccepted={article.statut === 'valide' && index === 2}
            />
          ))}
        </div>

        {/* Article Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '32px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            color: '#002366', 
            marginBottom: '24px',
            fontSize: '1.8rem',
            fontWeight: '600'
          }}>
            {article.titre}
          </h1>
          
          <p style={{ 
            color: '#333', 
            lineHeight: '1.6', 
            marginBottom: '32px',
            whiteSpace: 'pre-line',
            fontSize: '1.1rem'
          }}>
            {article.contenu}
          </p>

          {checklist.length > 0 && (
            <>
              <h2 style={{ 
                color: '#002366', 
                marginBottom: '16px',
                fontSize: '1.4rem',
                fontWeight: '500'
              }}>
                Au programme :
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {checklist.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: `2px solid ${item.completed ? '#002366' : '#ccc'}`,
                      borderRadius: '4px',
                      marginRight: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {item.completed && '✓'}
                    </div>
                    <span style={{ 
                      color: item.completed ? '#002366' : '#666',
                      fontSize: '1rem'
                    }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{ 
            marginTop: '32px', 
            paddingTop: '24px', 
            borderTop: '1px solid #eee',
            textAlign: 'right'
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#002366',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: '#001a4d'
                }
              }}
            >
              Retour à la liste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;