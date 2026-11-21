import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioData as defaultData } from '../data/portfolioData';
import { fetchPortfolioData, savePortfolioData, fetchPasscode, savePasscode as savePasscodeToFirebase } from '../firebase';

const PortfolioContext = createContext(null);

const AUTH_KEY = 'alfin_portfolio_admin_auth_v1';

// Default Master Passcode: 'alfin2026'
const DEFAULT_PASSCODE = 'alfin2026';

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  // Passcode state
  const [passcode, setPasscode] = useState(DEFAULT_PASSCODE);

  // Load data from Firebase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [firebaseData, firebasePasscode] = await Promise.all([
          fetchPortfolioData(),
          fetchPasscode()
        ]);

        if (firebaseData) {
          setData(firebaseData);
        }
        // If no data in Firebase yet, defaults stay (and will be pushed on first admin save)

        if (firebasePasscode) {
          setPasscode(firebasePasscode);
        }
      } catch (error) {
        console.error('Failed to load from Firebase, using defaults:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Save changes to Firebase
  const saveCustomData = useCallback(async (newData) => {
    setData(newData);
    setSaveStatus('saving');
    const success = await savePortfolioData(newData);
    setSaveStatus(success ? 'saved' : 'error');
    // Clear status after 2 seconds
    setTimeout(() => setSaveStatus(null), 2000);
  }, []);

  // Login handler
  const login = (inputPass) => {
    if (inputPass === passcode) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  // Logout handler
  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
  };

  // Update passcode (saves to Firebase)
  const updatePasscode = async (newPass) => {
    setPasscode(newPass);
    await savePasscodeToFirebase(newPass);
  };

  // Update personal information
  const updatePersonalInfo = (updatedFields) => {
    const updated = {
      ...data,
      personal: {
        ...data.personal,
        ...updatedFields
      }
    };
    saveCustomData(updated);
  };

  // Add new project
  const addProject = (project) => {
    const newProject = {
      id: project.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
      featured: false,
      ...project,
      highlights: project.highlights || [],
      technologies: project.technologies || []
    };
    const updated = {
      ...data,
      projects: [newProject, ...data.projects]
    };
    saveCustomData(updated);
  };

  // Update existing project
  const updateProject = (projectId, updatedFields) => {
    const updated = {
      ...data,
      projects: data.projects.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            ...updatedFields,
            highlights: updatedFields.highlights || p.highlights,
            technologies: updatedFields.technologies || p.technologies
          };
        }
        return p;
      })
    };
    saveCustomData(updated);
  };

  // Delete project
  const deleteProject = (projectId) => {
    const updated = {
      ...data,
      projects: data.projects.filter(p => p.id !== projectId)
    };
    saveCustomData(updated);
  };

  // Add new certification
  const addCertification = (cert) => {
    const newCert = {
      id: cert.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
      badge: cert.badge || 'Verified Credential',
      icon: 'Award',
      color: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      tags: cert.tags || [],
      credentialUrl: cert.credentialUrl || '',
      ...cert
    };
    const updated = {
      ...data,
      certifications: [newCert, ...data.certifications]
    };
    saveCustomData(updated);
  };

  // Update existing certification
  const updateCertification = (certId, updatedFields) => {
    const updated = {
      ...data,
      certifications: data.certifications.map(c => {
        if (c.id === certId) {
          return {
            ...c,
            ...updatedFields,
            tags: updatedFields.tags || c.tags,
            credentialUrl: updatedFields.credentialUrl !== undefined ? updatedFields.credentialUrl : c.credentialUrl
          };
        }
        return c;
      })
    };
    saveCustomData(updated);
  };

  // Delete certification
  const deleteCertification = (certId) => {
    const updated = {
      ...data,
      certifications: data.certifications.filter(c => c.id !== certId)
    };
    saveCustomData(updated);
  };

  // Add skill to a category
  const addSkill = (categoryId, skill) => {
    const updatedCategories = data.skills.categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: [...cat.skills, { ...skill, level: Number(skill.level) || 85 }]
        };
      }
      return cat;
    });

    const updated = {
      ...data,
      skills: {
        ...data.skills,
        categories: updatedCategories
      }
    };
    saveCustomData(updated);
  };

  // Delete skill from a category
  const deleteSkill = (categoryId, skillName) => {
    const updatedCategories = data.skills.categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          skills: cat.skills.filter(s => s.name !== skillName)
        };
      }
      return cat;
    });

    const updated = {
      ...data,
      skills: {
        ...data.skills,
        categories: updatedCategories
      }
    };
    saveCustomData(updated);
  };

  // Add new interest / hobby
  const addInterest = (interest) => {
    const newInterest = {
      category: interest.category || 'New Interest',
      icon: interest.icon || 'Sparkles',
      description: interest.description || '',
      vibe: interest.vibe || 'Creative Focus'
    };
    const updated = {
      ...data,
      interests: [...(data.interests || []), newInterest]
    };
    saveCustomData(updated);
  };

  // Update interest / hobby
  const updateInterest = (index, updatedFields) => {
    const updatedInterests = (data.interests || []).map((item, idx) => {
      if (idx === index) {
        return { ...item, ...updatedFields };
      }
      return item;
    });
    saveCustomData({
      ...data,
      interests: updatedInterests
    });
  };

  // Delete interest / hobby
  const deleteInterest = (index) => {
    const updatedInterests = (data.interests || []).filter((_, idx) => idx !== index);
    saveCustomData({
      ...data,
      interests: updatedInterests
    });
  };

  // Reset to original factory defaults (also pushes defaults to Firebase)
  const resetToDefaults = () => {
    saveCustomData(defaultData);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        loading,
        saveStatus,
        isAdminLoggedIn,
        login,
        logout,
        updatePasscode,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        addCertification,
        updateCertification,
        deleteCertification,
        addSkill,
        deleteSkill,
        addInterest,
        updateInterest,
        deleteInterest,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
