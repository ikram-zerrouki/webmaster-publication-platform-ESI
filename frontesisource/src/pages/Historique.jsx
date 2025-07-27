import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavvbarAjoutArticle from './NavvbarAjoutArticle';
import './Historique.css';

const Historique = () => {
    // State for the list of articles
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
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('fr-FR');

    return (

        <div className="historique-page">
            <NavvbarAjoutArticle />
            <h2 style={{ color: '#002366', marginBottom: '30px' }}>Articles</h2>
            <table className="article-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>État</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {publications.map(article => (
                        <tr key={article.id}>
                            <td>{article.id}</td>
                            <td>{article.type}</td>
                            <td>{formatDate(article.date_planifiee)}</td>
                            <td>{article.statut}</td>
                            <td>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => handleDelete(article.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Historique;