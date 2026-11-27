 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, collection, setDoc, getDocs, query, where, doc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsRgHFNnC50A6NymJX9Lv3OGky8Gmht8g",
  authDomain: "anchal-spices-pro.firebaseapp.com",
  projectId: "anchal-spices-pro",
  storageBucket: "anchal-spices-pro.firebasestorage.app",
  messagingSenderId: "350258523425",
  appId: "1:350258523425:web:4bbd3dc7f8869a9820e260",
  measurementId: "G-MY6EFE027N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
window.firebaseServices = {
  // 1. Google Login
  loginWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      alert("Login nahi ho paya: " + error.message);
      return null;
    }
  },

  // 2. Logout
  logoutUser: async () => {
    await signOut(auth);
  },

  // 3. AS123456 वाली Order ID के साथ Firestore में ऑर्डर सेव करना
  saveOrderToDB: async (orderData) => {
    try {
      await setDoc(doc(db, "orders", orderData.id), {
        ...orderData,
        userId: auth.currentUser ? auth.currentUser.uid : "guest",
        userEmail: auth.currentUser ? auth.currentUser.email : "",
        createdAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error("Database Error:", error);
      return false;
    }
  },

  // 4. Firestore से लाइव ऑर्डर ट्रैक करना
  trackOrderById: async (orderId) => {
    try {
      const docRef = doc(db, "orders", orderId.trim().toUpperCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error("Track Error:", error);
      return null;
    }
  },

  // 5. लॉगिन किए हुए कस्टमर के पुराने ऑर्डर लाना
  getMyOrders: async () => {
    if (!auth.currentUser) return [];
    const q = query(collection(db, "orders"), where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => d.data());
  }
};

onAuthStateChanged(auth, (user) => {
  window.currentUser = user;
  if (typeof window.updateAuthUI === "function") {
    window.updateAuthUI(user);
  }
});

console.log("Anchal Spices Firebase Ready!");