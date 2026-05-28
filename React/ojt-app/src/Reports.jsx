import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const years = ["2023", "2024", "2025", "2026"];

  // --- CONTROLLER COMMUNICATION (The "C" in MVC) ---
  useEffect(() => {
    if (selectedYear) {
      setIsLoading(true);
      // Fetching from your PHP Controller
      // This URL now points directly to the PROJECT (OJT) folder
// Change from PROJECT%20(OJT) to PROJECT-OJT
fetch(`http://localhost/PROJECT-OJT/get_reports.php?year=${selectedYear}`)
        .then(res => res.json())
        .then(data => {
          setReports(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error fetching reports:", err);
          setIsLoading(false);
        });
    } else {
      setReports([]);
    }
  }, [selectedYear]);

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

        {/* --- VIEW CONTROLS --- */}
        <div className="report-controls-wrapper">
          <div className="report-controls">
            <label htmlFor="year-select">Fiscal Year</label>
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

        {/* --- DYNAMIC DISPLAY LOGIC --- */}
        {isLoading ? (
          <div className="empty-state">
            <i className="fa-solid fa-spinner fa-spin"></i>
            <p>Fetching documents from the City Accountant's Office database...</p>
          </div>
        ) : selectedYear ? (
          <div className="reports-display fade-in">
            <div className="display-header">
              <h3><i className="fa-solid fa-calendar-check"></i> Documents for {selectedYear}</h3>
            </div>
            
            <div className="months-grid">
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <div 
                    key={index} 
                    className="month-card" 
                    onClick={() => window.open(`http://localhost/PROJECT-OJT/uploads/${report.file_path}`, '_blank')}
                  >
                    <div className="file-icon">
                      <i className="fa-solid fa-file-pdf"></i>
                    </div>
                    <div className="month-info">
                      <span className="month-name">{report.month_name}</span>
                      <span className="file-type"> PDF Document</span>
                    </div>
                    <div className="download-hint">
                      <i className="fa-solid fa-download"></i>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                  <p>No reports have been uploaded for the year {selectedYear} yet.</p>
                </div>
              )}
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