import React, { useState, useEffect } from 'react';
import Navvbartwo from './Navvbartwo';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import './AdminManager.css';
import axios from 'axios';


const AdminManager = () => {
    const [users, setUsers] = useState([]);
    
    
    /*// State for the list of users
    const [users, setUsers] = useState([
        { id: 1, username: 'Walaa', name: 'Walaa', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 2, username: 'NHADbell', name: 'NHAD', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 3, username: 'Walaa', name: 'Walaa', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 4, username: 'NHADbell', name: 'NHAD', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 5, username: 'Walaa', name: 'Walaa', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 6, username: 'Maria', name: 'Maria', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },
        { id: 7, username: 'Douae', name: 'Douae', surname: 'Beltreche', email: 'In_beltreche@esi.dz' },

    ]);*/


   
    const handleGetUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/users/all/');
            setUsers(response.data);
        } catch (error) {
            // Affichage détaillé de l'erreur dans la console
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un code de statut qui n'est pas 2xx
                console.error('Erreur réponse du serveur :', error.response);
                console.error('Détails de l\'erreur :', error.response.data);
                console.error('Code de statut :', error.response.status);
                console.error('En-têtes de la réponse :', error.response.headers);
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error('Aucune réponse reçue :', error.request);
            } else {
                // Une erreur s'est produite lors de la configuration de la requête
                console.error('Erreur lors de la configuration de la requête :', error.message);
            }
        }
    };
    

useEffect(() => {
    handleGetUsers(); // Appelle la fonction pour récupérer les utilisateurs
}, []);
    

    // State for controlling the modal visibility and mode (add or edit)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentUserId, setCurrentUserId] = useState(null); // Track the user being edited

    // State for the form fields in the modal
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        role: '',
        password: '',
    });

    // Function to handle deleting a user
    const handleDelete = async (id) => {
        try {
            // Appel à l’API Django pour supprimer l’utilisateur
            await axios.delete(`http://127.0.0.1:8000/users/delete/${id}/`);
            
            // Met à jour le state local en retirant l’utilisateur
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression :', error);
            alert('La suppression a échoué.');
        }
    };

    // Function to open the modal in "add" mode
    const openAddModal = () => {
        setModalMode('add');
        setFormData({
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            role: '',
            password: '',
        });
        setIsModalOpen(true);
    };

    // Function to open the modal in "edit" mode with pre-filled data
    const handleEdit = (id) => {
        const userToEdit = users.find(user => user.id === id);
        if (userToEdit) {
            setModalMode('edit');
            setCurrentUserId(id);
            setFormData({
                nom: userToEdit.nom,
                prenom: userToEdit.prenom,
                telephone: userToEdit.telephone,
                email: userToEdit.email,
                role: userToEdit.role ,
                password: '',
            });
            setIsModalOpen(true);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentUserId(null);
        setFormData({
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            role: '',
            password: '',
        });
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Function to handle form submission (add or edit user)
    const handleSubmit = async () => {
     
//prblm dans le role  !formData.role || 
        if (modalMode === 'add') {
            if (!formData.nom || !formData.prenom || !formData.telephone || !formData.email ||!formData.password) {
                alert('Please fill in all fields.');
                return;
            }
            // Add new user
            const newUser = {
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                telephone: formData.telephone,
                role:formData.role,
                password:formData.password,
            };
          //  setUsers([...users, newUser]);
            const response = await axios.post('http://127.0.0.1:8000/users/register/', formData);
            alert('Utilisateur ajouté/modifié avec succès.');
            setUsers([...users, response.data]); // ajoute la réponse du backend
        } else if (modalMode === 'edit' && currentUserId !== null) {
            // Edit existing user
            const response = await axios.put(`http://127.0.0.1:8000/users/update/${currentUserId}/`, formData);
            setUsers(users.map(user =>
                user.id === currentUserId ? response.data : user
            ));
        
          /*  setUsers(users.map(user =>
                user.id === currentUserId
                    ? {
                        ...user,
                        nom: formData.nom,
                        prenom: formData.prenom,
                        email: formData.email,
                        telephone: formData.telephone,
                        role:formData.role,
                        password:formData.password,
                    }
                    : user
            ));*/
        }

        closeModal();
    };

    return (
        <div className="admin-manager-pagee" >
            <div className="admin-manager-page">
                <Navvbartwo />
                <div className="header">
                    <h1>Bienvenue dans la gestion des utilisateurs</h1>
                    <p>Consulter et gérer les utilisateurs</p>
                    <button className="add-user-btn" onClick={openAddModal}>
                        Ajouter un utilisateur
                    </button>
                </div>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h2>{modalMode === 'add' ? 'Ajouter un utilisateur' : 'Modifier un utilisateur'}</h2>
                                <p>
                                    {modalMode === 'add'
                                        ? 'Remplissez les champs ci-dessous pour ajouter un nouvel utilisateur.'
                                        : 'Modifiez les champs ci-dessous pour mettre à jour l\'utilisateur.'}
                                </p>
                                <button className="close-btn" onClick={closeModal}>×</button>
                            </div>
                            <div className="modal-body">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleInputChange}
                                    placeholder="NHADbell"
                                />
                                <label>Prenom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleInputChange}
                                    placeholder="NHAD"
                                />
                                <label>Telephone</label>
                                <input
                                    type="text"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                    placeholder="0555555"
                                />
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="In_beltreche@esi.dz"

                                />
                               <label>Role</label>
                               
                                <select
                                   name="role"
                                   value={formData.role}
                                   onChange={handleInputChange}
                                   className="form-control"
                                >
                                    <option value="="></option>
                                    <option value="admin">admin</option>
                                    <option value="redacteur">redacteur</option>
                                    <option value="editeur">editeur</option>
                                </select>


                                <label>{modalMode === 'add' ? 'Set a password' : 'Reset password'}</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                />
                                {formData.password && (
                                    <span className="password-feedback">✓ Good password</span>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button className="save-btn" onClick={handleSubmit}>
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>&nbsp;Nom</th>
                            <th>&nbsp;&nbsp;Prenom</th>
                            <th>&nbsp;&nbsp;Telephone</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email</th>
                            <th>&nbsp;&nbsp;Role</th>
                            <th>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.telephone}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => handleEdit(user.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <span className="logo-circle"></span>
                        <span className="logo-text">
                            ESISource.com
                        </span>
                    </div>
                    <div className="footer-contact">
                        <h3>Contact Nous</h3>
                        <p>team@gmail.com</p>
                    </div>
                    <div className="footer-social">
                        <h3>Suis nous</h3>
                        <div className="social-icons">
                            <FaInstagram />
                            <FaFacebook />
                            <FaTwitter />
                            <FaLinkedin />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdminManager;