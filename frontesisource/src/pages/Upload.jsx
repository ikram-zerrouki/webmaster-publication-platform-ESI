import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 👈 ajouter axios pour faire les requêtes HTTP
import "./Upload.css";
import img1 from '../images/Group 15.png';
import img2 from '../images/iconamoon_cloud-add-thin.png';
import NavvbarAjoutArticle from './NavvbarAjoutArticle';

function Upload() {
    const [isConnected, setIsConnected] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();

    const userProfile = {
        name: 'John Doe',
        image: 'https://via.placeholder.com/40',
    };

    const handleLogout = () => {
        setIsConnected(false);
    };

    const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            file: file,
            name: file.name,
            status: 'uploading',
            preview: URL.createObjectURL(file),
        }));

        setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);

        // Envoyer les fichiers vers le backend Django
        uploadFilesToServer(newFiles);
    };

    const uploadFilesToServer = async (files) => {
        const formData = new FormData();
        files.forEach((fileObj) => {
            formData.append('media_files', fileObj.file);
        });

        // Tu peux ajouter ici d'autres champs de la Publication si nécessaire
        formData.append('contenu', '');
        formData.append('type', 'siteWeb'); // ou 'pageFacebook'
        formData.append('statut', 'brouillon');

        try {
            const response = await axios.post('http://localhost:8000/api/publications/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            

            // Mise à jour des statuts à "uploaded" après succès
            const updatedFiles = files.map(file => ({
                ...file,
                status: 'uploaded',
            }));
            setUploadedFiles(prevFiles =>
                prevFiles.map(file => {
                    const updatedFile = updatedFiles.find(f => f.name === file.name);
                    return updatedFile || file;
                })
            );
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error);

            // Mise à jour des statuts à "failed" en cas d'erreur
            const updatedFiles = files.map(file => ({
                ...file,
                status: 'failed',
            }));
            setUploadedFiles(prevFiles =>
                prevFiles.map(file => {
                    const updatedFile = updatedFiles.find(f => f.name === file.name);
                    return updatedFile || file;
                })
            );
        }
    };

    const handleDelete = (fileName) => {
        setUploadedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

    const handleShownext = () => {
        window.alert("Article importé avec succès !");
    
    // Redirige vers la page d'accueil
    navigate('/home');
        // navigation vers la prochaine page
    };

    return (
        <div className="upload-page">
            <NavvbarAjoutArticle />

            <div className="upload-title">
                {/*<img src={img1} alt="Illustration" className="upload-icon" />*/}
                <h2 className="upload-title">Importez votre article</h2>
            </div>

            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={img2} alt="Upload Icon" className="dropzone-icon" />
                <p>Choisissez un fichier</p>
            </div>

            <div className="upload-progress">
                {uploadedFiles.map((file, index) => (
                    <div key={index} className={`upload-item ${file.status}`}>
                        <p>{file.name}</p>
                        {file.status === 'uploading' && <progress value="50" max="100" />}
                        {file.status === 'uploaded' && <span className="status uploaded">Importé</span>}
                        {file.status === 'failed' && <span className="status failed">Échoué</span>}
                        <button onClick={() => handleDelete(file.name)} className="delete-btn">Supprimer</button>
                    </div>
                ))}
            </div>

            <button onClick={handleShownext} className="show-next-btn">Next</button>
        </div>
    );
}

export default Upload;
