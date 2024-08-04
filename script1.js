// Import Firebase and Firestore
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2swpMLvuA4omwCLVewjdvJm6cwR5Wj3c",
  authDomain: "queueq-a9cbe.firebaseapp.com",
  projectId: "queueq-a9cbe",
  storageBucket: "queueq-a9cbe.appspot.com",
  messagingSenderId: "509065047368",
  appId: "1:509065047368:web:4890ee0a01cd61e1de177d",
  measurementId: "G-QBY4SFYXRH"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', async () => {
  const eventsContainer = document.getElementById('events-container');
  const noEventsMessage = document.createElement('p');
      noEventsMessage.className = 'no-events-message';
      noEventsMessage.textContent = 'You have not hosted any events.';


  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userEmail = user.email;

      try {
        // Query events where userEmail matches the logged-in user's email
        const eventsCollection = collection(db, "events");
        const eventsQuery = query(eventsCollection, where("userEmail", "==", userEmail));
        const eventsSnapshot = await getDocs(eventsQuery);
        const events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Clear previous content
        eventsContainer.innerHTML = '';

        // Display each event
        events.forEach(event => {
          const eventCard = document.createElement('div');
          eventCard.className = 'event-card';

          eventCard.innerHTML = `
            <img src="${event.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO3tkIJnmJZcWmgLLR-z973QVHQ8zbwDGnw&s'}" alt="${"Not available"}">
            <div class="event-details">
              <h3>${event.eventName}</h3>
              <span><i>${event.organisation}</i></span>
              <span class="event-type">${event.eventType}</span>
              <div class="event-meta">
                ${event.eventLocation ? `<p><i class="fa fa-map-marker"></i>&nbsp;${event.eventLocation}</p>` : ''}
                ${event.numberOfActivities ? `<p><i class="fas fa-layer-group"></i>&nbsp;Activities : ${event.numberOfActivities}</p>` : ''}
              </div>
              <div class="event-tags">
                ${event.tags ? event.tags.map(tag => `<span>${tag}</span>`).join(' ') : ''}
              </div>
            </div>
          `;

          eventsContainer.appendChild(eventCard);
        });
      } catch (error) {
        console.error("Error fetching events: ", error);
        eventsContainer.innerHTML = '<p>Error loading events. Please try again later.</p>';
      }
    } else {
      eventsContainer.innerHTML = '<p>Please log in to see your events.</p>';
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const userInfoDiv = document.getElementById('user-info');

    onAuthStateChanged(auth, user => {
      if (user) {
        userInfoDiv.textContent = `Logged in as : ${user.email}`;
      } else {
        userInfoDiv.textContent = 'Not logged in';
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownToggle = document.getElementById('dropdown-toggle');

dropdownToggle.addEventListener('click', () => {
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', (event) => {
  if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.style.display = 'none';
  }
});
});