// details.js
document.addEventListener('DOMContentLoaded', function() {
    // Assuming there's a filmId from the URL to fetch details for the current film
    const params = new URLSearchParams(window.location.search);
    const filmId = params.get('id');
    fetchFilmDetails(filmId);

    // Search functionality
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const searchQuery = document.getElementById('searchInput').value.trim();
        if (searchQuery) {
            // Redirect to the cinema page with the search query
            window.location.href = `cinema.html?search=${encodeURIComponent(searchQuery)}`;
        }
    });
});

function fetchFilmDetails(filmId) {
    if (!filmId) return;
    fetch(`https://api.tvmaze.com/shows/${filmId}`)
        .then(response => response.json())
        .then(show => {
            const filmDetailsContainer = document.getElementById('filmDetailsContainer');
            const genres = show.genres.map(genre => `<span class="badge badge-secondary">${genre}</span>`).join(' ');
            filmDetailsContainer.innerHTML = `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${show.image ? show.image.original : 'placeholder.jpg'}" class="img-fluid rounded-start" alt="${show.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${show.name}</h5>
                                <p class="card-text">${show.summary}</p>
                                <p class="card-text"><small class="text-muted">${genres}</small></p>
                                ${show.officialSite ? `<a href="${show.officialSite}" class="btn btn-primary" target="_blank">Official Site</a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching film details:', error);
        });
        fetchShows();
}
