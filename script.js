document.addEventListener('DOMContentLoaded', function() {
    const films = []; // Assume this array is filled with 240 film objects
    const cardsPerPage = 20; // Number of cards to display per page
    let currentPage = 1;

    // Example film object structure
    for (let i = 1; i <= 240; i++) {
        films.push({ title: `Film ${i}`, image: 'movie-placeholder.jpg', description: `Description for Film ${i}` });
    }

    function displayFilms(page) {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const filmsToDisplay = films.slice(startIndex, endIndex);

        const container = document.getElementById('cardsContainer');
        container.innerHTML = ''; // Clear the container

        let rowHtml = '<div class="row">'; // Start a new row
        filmsToDisplay.forEach((film, index) => {
            const cardHtml = `
                <div class="col-md-3 mb-4">
                    <div class="card" style="width: 100%;">
                        <img src="${film.image}" class="card-img-top" alt="${film.title}">
                        <div class="card-body">
                            <h5 class="card-title">${film.title}</h5>
                            <p class="card-text">${film.description}</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            `;

            rowHtml += cardHtml;

            // After every 4th card, end the current row and start a new one
            if ((index + 1) % 4 === 0 && index !== 0) {
                rowHtml += '</div><div class="row">'; // Close the current row and start a new one
            }
        });
        rowHtml += '</div>'; // Close the last row
        container.innerHTML = rowHtml;

        // Update pagination
        updatePagination(page, Math.ceil(films.length / cardsPerPage));
    }

    function updatePagination(currentPage, totalPages) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = ''; // Clear existing pagination buttons

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentPage) {
                pageItem.classList.add('active');
            }
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.href = '#';
            pageLink.innerText = i;
            pageLink.addEventListener('click', () => displayFilms(i));

            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }
    }

    displayFilms(currentPage); // Initial display
});
