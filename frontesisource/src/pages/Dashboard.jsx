import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navvbar from './NavbarUser';
import Navvbartwo from './Navvbartwo';



const DashboardPage = () => {
  const totalPublications = 645;
  const publications = 235;
  const medias = 335;
  const users = 75;
  const refused = 335;
  const pending = 335;
  const total = 440; // circumference
  const darkBlue = total * 0.5;  // 50%
  const blue = total * 0.3;      // 30%
  const white = total - darkBlue - blue; // 20%



  return (
    <div>
      <Navvbartwo />

      <div style={{ backgroundColor: '#E4F1FF', minHeight: '100vh' }}>

        <div style={{ paddingTop: '80px', textAlign: 'center', fontWeight: '700', fontSize: '24px', color: '#002366' }}>
          Bienvenue sur Votre DASHBOARD
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px', gap: '60px', flexWrap: 'wrap' }}>
          {/* Left Block */}
          <div style={{ backgroundColor: '#B0D4FD', borderRadius: '20px', padding: '30px', display: 'flex', gap: '30px', alignItems: 'center' }}>
            {/* Circle */}
            <svg width="200" height="200" viewBox="0 0 200 200">
              {/* Background full white ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="white"
                strokeWidth="20"
                fill="none"
              />

              {/* Dark Blue (50%) */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#002366"
                strokeWidth="20"
                fill="none"
                strokeDasharray="220 220"
                strokeDashoffset="0"
                strokeLinecap="butt"
                transform="rotate(-90 100 100)"
              />

              {/* Blue (30%) */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#0979D0"
                strokeWidth="20"
                fill="none"
                strokeDasharray={`${blue} ${total - blue}`}
                strokeDashoffset="-220"
                strokeLinecap="butt"
                transform="rotate(-90 100 100)"
              />

              {/* Center Text */}
              <text x="100" y="105" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#000">{totalPublications}</text>
              <text x="100" y="130" textAnchor="middle" fontSize="14" fill="#002366">Total de publications</text>
            </svg>



            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
              <div style={cardStyle}><div style={numberStyle}>{publications}</div><div>Publications</div></div>
              <div style={cardStyle}><div style={numberStyle}>{medias}</div><div>Medias</div></div>
              <div style={cardStyle}><div style={numberStyle}>{users}</div><div>Utilisateurs</div></div>
            </div>
          </div>

          {/* Right Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
            <div style={sideCardStyle}><div style={numberStyle}>{refused}</div><div>Publications refusées</div></div>
            <div style={sideCardStyle}><div style={numberStyle}>{pending}</div><div>Publications en attente</div></div>
          </div>
        </div>
      </div>

    </div>
  );
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '10px 14px',
  width: '100px',
  fontWeight: '600',
  fontSize: '13px',
  color: '#002366',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const sideCardStyle = {
  backgroundColor: '#B0D4FD',
  borderRadius: '15px',
  padding: '20px',
  width: '180px',
  textAlign: 'center',
  fontWeight: '600',
  color: '#002366',
  fontSize: '14px',
};

const numberStyle = {
  fontSize: '22px',
  fontWeight: 'bold',
};

export default DashboardPage;

