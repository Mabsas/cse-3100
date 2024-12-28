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
    // Fetch cat images from API and add to cats list
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

  // Filter cats based on breed and search term
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
          }}
        >
          Search
        </button>
      </div>

      {/* Cats List */}
      <div className="mt-2 row g-4 cats-container" id="cats-container">
        {filteredCats.map((cat, i) => (
          <div
            key={i}
            className="col-md-4"
            style={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="cat-card"
              style={{
                width: "300px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="img-fluid mb-2"
                style={{
                  borderRadius: "8px",
                  height: "200px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="cat-info">
                <h3
                  className="h5 mb-1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  {cat.name}
                </h3>
                <p
                  className="mb-0"
                  style={{ fontSize: "14px", color: "#555" }}
                >
                  Age: {cat.age}
                </p>
                <p
                  className="mb-0"
                  style={{ fontSize: "14px", color: "#555" }}
                >
                  Breed: {cat.breed}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
