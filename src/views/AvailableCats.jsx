import { useEffect, useState } from "react";

const availableCats = [
  { name: "Whiskers", age: "2", breed: "Sphynx" },
  { name: "Mittens", age: "2", breed: "Persian" },
  { name: "Shadow", age: "1", breed: "Bengal" },
  { name: "Pumpkin", age: "3", breed: "Siamese" },
  { name: "Luna", age: "4", breed: "Birman" },
  { name: "Simba", age: "2", breed: "Abyssinian" },
];

const breeds = [
  "All",
  "Sphynx",
  "Persian",
  "Bengal",
  "Siamese",
  "Birman",
  "Abyssinian",
];

export default function AvailableCats() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("All");

  useEffect(() => {
    const fetchCatImages = async () => {
      try {
        const responses = await Promise.all(
          availableCats.map(() =>
            fetch("https://api.thecatapi.com/v1/images/search").then((res) =>
              res.json()
            )
          )
        );
        const catsWithImages = availableCats.map((cat, index) => ({
          ...cat,
          image: responses[index][0].url,
        }));

        setCats(catsWithImages);
        setFilteredCats(catsWithImages); // Initialize with all cats
      } catch (error) {
        console.error("Error fetching cat images:", error);
      }
    };

    fetchCatImages();
  }, []);

  const handleFilter = () => {
    let filtered = cats;

    if (selectedBreed !== "All") {
      filtered = filtered.filter((cat) => cat.breed === selectedBreed);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCats(filtered);
  };

  return (
    <section className="text-center mt-4" style={{ padding: "20px" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        Available Cats
      </h2>
      <p style={{ fontSize: "16px", color: "#555" }}>
        Meet our adorable cats looking for their forever home!
      </p>

      {/* Filters */}
      <div
        className="filters mb-4"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            flexShrink: 0,
          }}
        />
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "150px",
            flexShrink: 0,
          }}
        >
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Search
        </button>
      </div>

      {/* Cats List */}
      <div
        className="row g-4"
        id="cats-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredCats.map((cat, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h3 style={{ fontWeight: "bold", color: "#333" }}>{cat.name}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>Age: {cat.age}</p>
            <p style={{ fontSize: "14px", color: "#555" }}>Breed: {cat.breed}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
