// Import Firebase and Firestore
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

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

document.addEventListener('DOMContentLoaded', async () => {
  const eventsContainer = document.getElementById('events-container');

  try {
    // Fetch events from Firestore
    const eventsCollection = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsCollection);
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
});


/*document.addEventListener('DOMContentLoaded', () => {
    const events = [
      {
        id: 1,
        name: "WIEHack 5.0",
        organization: "IEEE BVCOE",
        type:"Competition",
        location: "Delhi",
        activities: 3,
        daysLeft: 30,
        tags: ["Coding Challenge", "Engineering Students", "fun", "hackathon"],
        image: "https://lh4.googleusercontent.com/proxy/NDwxP-X-P7JWVnHSfADfWMS7b4imgmS8QRi5ag7R3yPayLg7gr6cf5z7GnIMGIpKSXZfbeLssk7O2CtH3M0SsLGvKoTfWw"
      },
      {
        id: 1,
        name: "WIEHack 5.0",
        organization: "IEEE BVCOE",
        type:"Competition",
        location: "Delhi",
        activities: 3,
        daysLeft: 30,
        tags: ["Coding Challenge", "Engineering Students", "fun", "hackathon"],
        image: "https://lh4.googleusercontent.com/proxy/NDwxP-X-P7JWVnHSfADfWMS7b4imgmS8QRi5ag7R3yPayLg7gr6cf5z7GnIMGIpKSXZfbeLssk7O2CtH3M0SsLGvKoTfWw"
      },
      {
        id: 1,
        name: "WIEHack 5.0",
        organization: "IEEE BVCOE",
        type:"Competition",
        location: "Delhi",
        activities: 3,
        daysLeft: 30,
        tags: ["Coding Challenge", "Engineering Students", "fun", "hackathon"],
        image: "https://lh4.googleusercontent.com/proxy/NDwxP-X-P7JWVnHSfADfWMS7b4imgmS8QRi5ag7R3yPayLg7gr6cf5z7GnIMGIpKSXZfbeLssk7O2CtH3M0SsLGvKoTfWw"
      },
      
      
    ];
  
    const eventsContainer = document.getElementById('events-container');
  
    events.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.className = 'event-card';
  
      eventCard.innerHTML = `
        <img src="${event.image}" alt="${event.name}">
        <div class="event-details">
          <h3>${event.name}</h3>
           <span><i>${event.organization}</i></span>
         <span class="event-type">${event.type}</span>
          <div class="event-meta">
          ${event.location ? `<p><i class="fa fa-map-marker"></i>&nbsp;${event.location}</p>` : ''}
            <p><i class="fas fa-clock"></i>&nbsp;${event.daysLeft} days left</p>
            ${event.activities ? `<p><i class="fas fa-layer-group"></i>&nbsp;Activities : ${event.activities}</p>` : ''}

          </div>
          <div class="event-tags">
            ${event.tags.map(tag => `<span>${tag}</span>`).join(' ')}
          </div>
        </div>
      `;
  
      eventsContainer.appendChild(eventCard);
    });
  });*/
