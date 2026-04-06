const houseTypes = ["Studio", "1 Bedroom", "2 Bedroom", "Self-Contain", "Duplex", "Shared Apartment"];
const locations = ["Molyko", "Mile 16", "Sandpit", "Check Point", "Soppo", "Great Soppo", "Bonduma", "Wotutu"];

const locationCoordinates = {
  Molyko: { lat: 4.1605, lng: 9.2412 },
  "Mile 16": { lat: 4.1390, lng: 9.2730 },
  Sandpit: { lat: 4.1598, lng: 9.2570 },
  "Check Point": { lat: 4.1521, lng: 9.2436 },
  Soppo: { lat: 4.1752, lng: 9.2620 },
  "Great Soppo": { lat: 4.1793, lng: 9.2685 },
  Bonduma: { lat: 4.1652, lng: 9.2510 },
  Wotutu: { lat: 4.1311, lng: 9.2902 },
};

const landlords = [
  { name: "Mr. Bobe", profilePic: "ai.jpg", rating: 4.5, totalReviews: 12 },
  { name: "Madam Sarah", profilePic: "ai.jpg", rating: 4.8, totalReviews: 20 },
  { name: "Musa Mike", profilePic: "ai.jpg", rating: 4.3, totalReviews: 8 },
  { name: "Madam Lucy", profilePic: "ai.jpg", rating: 4.9, totalReviews: 15 },
  { name: "Mr. Fon", profilePic: "ai.jpg", rating: 4.2, totalReviews: 10 },
  { name: "Mr Tabi", profilePic: "ai.jpg", rating: 4.7, totalReviews: 18 },
];

const imagePaths = [
  "/81.jpg",
  "/82.jpg",
  "/83.jpg",
  "/84.jpg",
  "/86.jpg",
  "/87.jpg",
  "/88.jpg",
];

const inspectionChecklist = {
  structuralSafety: [
    "No wall cracks or water stains",
    "Secure doors and windows",
    "Sturdy stairs and railings",
  ],
  plumbing: [
    "Good water pressure and drainage",
    "Working flush & shower",
    "Hot water tested",
  ],
  electricity: [
    "Sockets and lights working",
    "Safe fuse box",
    "Functional appliances",
  ],
  security: [
    "Locks & deadbolts present",
    "Safe neighborhood",
    "Secure windows",
  ],
  ventilation: [
    "Proper airflow & open windows",
    "No musty smell",
    "Fans/AC working",
  ],
  pests: ["No signs of insects or rodents"],
  lease: [
    "Landlord handles repairs",
    "Clear utility responsibilities",
    "Inventory of furnishings",
  ],
  external: [
    "Quiet environment",
    "Accessible transport & shops",
    "Safe street/compound",
  ],
};

const description = `This house is located in a calm and secured neighborhood of Buea. It's ideal for students, workers or visitors who want a clean and accessible place to stay without stress.`;

const longDescription = `This property offers a peaceful environment ideal for relaxation and productivity. The compound is safe, well-fenced, and the neighbors are friendly. 
It’s 5 minutes walk from local transport and has easy access to shops, schools, and health centers. The structure is well maintained, the plumbing and power supply are reliable.`;

const houses = Array.from({ length: 50 }, (_, index) => {
  const landlord = landlords[Math.floor(Math.random() * landlords.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const shuffledImages = imagePaths.sort(() => 0.5 - Math.random());
  const mainImage = shuffledImages[0];
  const gallery = shuffledImages.slice(0, 4);

  return {
    id: index + 1,
    type: houseTypes[Math.floor(Math.random() * houseTypes.length)],
    location,
    coordinates: locationCoordinates[location],
    price: Math.floor(Math.random() * 150_000 + 50_000),
    postedBy: landlord,
    image: mainImage,
    gallery,
    description,
    longDescription,
    amenities: inspectionChecklist,
  };
});

export default houses;
