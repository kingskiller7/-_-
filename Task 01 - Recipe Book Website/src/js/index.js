// Add Toggle

document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        const fillColor = document.body.classList.contains('dark-theme') ? '#ffffff' : '#000000';
        updateColors(fillColor);
    });

    updateColors();

    function updateColors(fillColor) {
        const svgElements = document.querySelectorAll('.theme-assist-svg'); // Add this class to all SVG elements in HTML
        svgElements.forEach(function (svg) {
            svg.style.fill = fillColor;
        });
    }
});

// Add Search

function toggleSearch() {
    var searchContainer = document.getElementById("search-container");
    searchContainer.classList.toggle("hidden");
}

function closeSearch() {
    var searchContainer = document.getElementById("search-container");
    searchContainer.classList.add("hidden");
}

function handleSearch() {
    var searchInput = document.getElementById("search-input");
    var searchTerm = searchInput.value.toLowerCase(); // Convert to lowercase for case-insensitive search

    // Implement your search logic here, e.g., filter a list of items
    // For demonstration purposes, let's assume you have an array of items
    var items = ["Item 1", "Item 2", "Item 3"]; // Replace with your actual data

    var filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));

    // Display or manipulate the filtered items as needed
    console.log(filteredItems);
}