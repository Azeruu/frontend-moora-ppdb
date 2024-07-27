import React, { useState, useEffect } from 'react';
import "./ListPendaftar.css"
import Tabel from "./b";
import axios from '../../lib/axios';

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(0); // Default to the first tab
  const [jalur, setJalur] = useState([]);

  const getJalur = async () => {
    const response = await axios.get('/jalur');
    setJalur(response.data);
  };

  useEffect(() => {
    getJalur();
  }, []);

  const renderContent = (index) => {
    switch (index) {
      case 0:
        return <div>Konten Tab 1</div>;
      case 1:
        return <Tabel />;
      case 2:
        return <div>Konten Tab 3</div>;
      default:
        return <div>Konten Tab {index + 1}</div>; // Default content for additional tabs
    }
  };

  return (
    <div>
      <div className="tabs">
        {jalur.map((jalur, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? 'active' : ''}
          >
            {jalur.nama_jalur} {/* Assuming each jalur item has a name property */}
          </button>
        ))}
      </div>
      <div className="content">
        {renderContent(activeTab)}
      </div>
    </div>
  );
};

export default TabComponent;
