import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBD3D2Cf6Dui-UbHFE3qeW-KLljkQxNnJE",
  authDomain: "alfin-portfolio-26653.firebaseapp.com",
  databaseURL: "https://alfin-portfolio-26653-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "alfin-portfolio-26653",
  storageBucket: "alfin-portfolio-26653.firebasestorage.app",
  messagingSenderId: "422953435167",
  appId: "1:422953435167:web:b4015bd5fe268f71d1552a"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the portfolio data in the database
const dataRef = ref(database, 'portfolioData');

// Fetch portfolio data from Firebase
export async function fetchPortfolioData() {
  try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null; // No data in Firebase yet, use defaults
  } catch (error) {
    console.error('Failed to fetch from Firebase:', error);
    return null;
  }
}

// Save portfolio data to Firebase
export async function savePortfolioData(data) {
  try {
    await set(dataRef, data);
    return true;
  } catch (error) {
    console.error('Failed to save to Firebase:', error);
    return false;
  }
}

// Save admin passcode to Firebase
export async function savePasscode(passcode) {
  try {
    await set(ref(database, 'adminPasscode'), passcode);
    return true;
  } catch (error) {
    console.error('Failed to save passcode:', error);
    return false;
  }
}

// Fetch admin passcode from Firebase
export async function fetchPasscode() {
  try {
    const snapshot = await get(ref(database, 'adminPasscode'));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch passcode:', error);
    return null;
  }
}

export { database };
