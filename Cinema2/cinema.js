document.addEventListener('DOMContentLoaded', () => {
    const showsPerPage = 15;
    let allShows = [];
    let currentPage = 1;

    document.getElementById('cinemaForm').addEventListener('keyup', () => {
        const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
        fetchShows(searchQuery);
    });

    document.getElementById('cinemaForm').addEventListener('submit', () => {
        const searchQuery = document.getElementById('searchInput').value.trim().toLowerCase();
        fetchShows(searchQuery);
    });

    document.querySelectorAll('.navbar-brand, .home').forEach(element => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('searchInput').value = '';
            fetchShows();
        });
    });

    async function fetchShows(searchQuery = '') {
        const url = 'https://api.tvmaze.com/shows';
        try {
            const response = await fetch(url);
            let data = await response.json();
            console.log("-----",data);
            if (searchQuery) {
                data = data.filter(show => show.name.toLowerCase().includes(searchQuery));
            }
            allShows = data;
            displayShows(1); // Always start from the first page
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayShows(page) {
        const startIndex = (page - 1) * showsPerPage;
        const endIndex = startIndex + showsPerPage;
        const showsToDisplay = allShows.slice(startIndex, endIndex);

        const container = document.getElementById('cardsContainer');
        container.innerHTML = '';
        showsToDisplay.forEach(show => {
            const cardHtml = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${show.image ? show.image.medium : 'https://placekitten.com/g/200/300'}" class="card-img-top" alt="${show.name}">
                        <div class="card-body">
                            <h5 class="card-title">${show.name}</h5>
                            <p class="card-text">Rating: ${show.rating.average || 'N/A'}</p>
                            <p class="card-text">Genres: ${show.genres.join(', ') || 'N/A'}</p>
                            <p class="card-text">Language: ${show.language || 'N/A'}</p>
                            <a href="details.html?id=${show.id}" class="btn btn-primary">Details</a>
                            ${show.officialSite ? `<a href="${show.officialSite}" target="_blank" class="btn btn-secondary">Go to Website</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += cardHtml;
        });

        setupPagination(allShows.length, page);
    }

    function setupPagination(totalShows, currentPage) {
        const totalPages = Math.ceil(totalShows / showsPerPage);
        const paginationContainer = document.getElementById('paginationContainer');
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
            paginationContainer.innerHTML += pageItem;
        }

        document.querySelectorAll('#paginationContainer .page-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                currentPage = parseInt(this.textContent);
                displayShows(currentPage);
            });
        });
    }

    fetchShows(); // Initial fetch of shows
});