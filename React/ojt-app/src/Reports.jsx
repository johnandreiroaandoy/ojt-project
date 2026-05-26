import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  const years = ["2023", "2024", "2025", "2026"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="reports-page">
      <div className="container" style={{ marginTop: '20px' }}>
        <button className="cta-button secondary back-btn" onClick={() => navigate('/')}>
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </button>

        <div className="section-header">
          <h2>Annual Financial Reports</h2>
          <div className="accent-line"></div>
          <p className="section-subtitle">Transparency through accountability. Select a year to browse monthly statements.</p>
        </div>

        <div className="report-controls-wrapper">
          <div className="report-controls">
            <label htmlFor="year-select">Fiscal Year                </label>
            <select 
              id="year-select" 
              className="year-dropdown"
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">-- Choose a Year --</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedYear ? (
          <div className="reports-display fade-in">
            <div className="display-header">
              <h3><i className="fa-solid fa-calendar-check"></i> Documents for {selectedYear}</h3>
            </div>
            <div className="months-grid">
              {months.map(month => (
                <div key={month} className="month-card" onClick={() => alert(`Opening PDF for ${month} ${selectedYear}...`)}>
                  <div className="file-icon">
                    <i className="fa-solid fa-file-pdf"></i>
                  </div>
                  <div className="month-info">
                    <span className="month-name">{month}</span>
                    <span className="file-type"> PDF Document</span>
                  </div>
                  <div className="download-hint">
                    <i className="fa-solid fa-download"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fa-solid fa-box-open"></i>
            </div>
            <p>Please select a fiscal year to populate the document list.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;