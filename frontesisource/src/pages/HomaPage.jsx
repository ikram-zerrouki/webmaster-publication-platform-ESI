import React from 'react';
import { Link } from 'react-router-dom';

import "./HomaPage.css";
import heroImage from '../images/Home1.png';
import aboutImage from '../images/Home2.png';
import { FiEdit } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiGroupLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import Navvbartwo from './Navvbartwo';
import AdminManager from './AdminManager';
const HomePage = () => {
    return (
        <div className="homepage" id="accueil">

            <Navvbartwo />
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1><span>ESiSource:</span> Partager vos publications</h1>
                        <p>Publication facile des articles / médias sur les plateformes
                            de l’École Nationale Supérieure d’Informatique (ESI).</p>
                        <Link to="/AjoutArticle" className="hero-button">
                            Poster <span>→</span>
                        </Link>
                    </div>
                    <div className="hero-image">
                        <img src={heroImage} alt="Illustration de partage de publications" />
                    </div>
                </div>
            </section>

            <section className="options-sectionx">
                <div className="options-containerx">

                    <div className="option">
                        <HiOutlineDocumentText className="option-icon" />
                        <span>Feedback et planification</span>
                    </div>
                    <Link to="/dashboard">
                        <div className="option">

                            <MdDashboard className="option-icon" />
                            <span>Tableau de bord</span>

                        </div>
                    </Link>
                    <Link to="/AdminManager">

                        <div className="option">

                            <RiGroupLine className="option-icon" />
                            <span>Gestion utilisateurs</span>

                        </div>
                    </Link>
                </div>
            </section>

            <section className="about-section" id="about">
                <div className="about-container">
                    <div className="about-image">
                        <img src={aboutImage} alt="Illustration À propos" />
                    </div>
                    <div className="about-content">
                        <h2>À propos</h2>
                        <p>
                            Bienvenue chez <strong>ESiSource</strong>, votre plateforme dédiée à la simplification du processus de publication et au partage de connaissances au sein de la communauté ESI.
                        </p>
                        <p>
                            Notre mission est de faciliter l’accès aux ressources, d’encourager la collaboration entre étudiants et chercheurs, et de promouvoir l’innovation grâce à un espace convivial et accessible.
                        </p>
                        <p>
                            Rejoignez-nous pour découvrir des contenus enrichissants, participer à des projets passionnants, et contribuer à un réseau dynamique d’échanges et d’apprentissage.
                        </p>
                    </div>
                </div>
            </section>


            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <span className="logo-circle"></span>
                        <span className="logo-text">
                            <strong>ESI</strong>Source<span className="dot">.com</span>
                        </span>
                    </div>
                    <div className="footer-contact" id="contact">
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

export default HomePage;
