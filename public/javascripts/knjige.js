//
//make delete request
document.addEventListener('DOMContentLoaded', function () {
    var deleteButtons = document.querySelectorAll('.delete-btn');
    var deleteAllButtons = document.querySelectorAll('.deleteAll-btn');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var knjigaId = this.getAttribute('data-id');
            if (confirm('Ali zares želite izbrisati to knjigo?')) {
                fetch("/knjige/" + knjigaId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => {
                    if (!res.ok) {
                        throw new Error(`Server error: ${res.status} - ${response.statusText}`);
                    }
                    window.location.href ="/knjige";
                }).catch(error => {
                        // Handle errors during the DELETE request
                        console.error('Error deleting book:', error.message);
                    });
            }
        });
    });
    deleteAllButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (confirm('Ali zares želite izbrisati vse projekte?')) {
                fetch("/knjige/izbrisiKnjige", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => {
                    if (!res.ok) {
                        throw new Error(`Server error: ${res.status} - ${response.statusText}`);
                    }
                    window.location.href ="/knjige";
                }).catch(error => {
                        console.error('Error deleting book:', error.message);
                    });
            }
        });
    });
});
//
//tabela pagination
const itemsPerPage = 3; // Set the number of items per page
const itemTable = document.getElementById('table');
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;

// Calculate the total number of pages
const totalPages = Math.ceil(itemTable.tBodies[0].rows.length / itemsPerPage);

// Function to display the items for the given page
function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const rows = itemTable.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = (i >= startIndex && i < endIndex) ? 'table-row' : 'none';
    }

    currentPage = page;
    updatePaginationButtons();
}

// Function to generate the pagination links
function generatePagination() {
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.textContent = i;
        li.addEventListener('click', () => showPage(i));
        paginationContainer.appendChild(li);
    }
    updatePaginationButtons();
}

// Function to update pagination arrows based on current page
function updatePaginationButtons() {
    const prevButton = document.querySelector('.pagination-arrow:first-child');
    const nextButton = document.querySelector('.pagination-arrow:last-child');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    document.querySelectorAll('.pagination li').forEach(li => li.classList.remove('selected'));

    const listItemElements = document.querySelectorAll('.pagination li');

    for (let i = 0; i < listItemElements.length; i++) {
        if (currentPage.toString() === listItemElements[i].innerHTML.toString()) {
            listItemElements[i].classList.add('selected');
            break;
        }
    }
}

// Function to go to the previous page
function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// Function to go to the next page
function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

// Show the first page initially
showPage(1);

// Generate pagination links
generatePagination();

//
//iskalnik
function myFunction() {
    var input, filter, table, tr, td, i, txtValue, tr1;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByClassName("search");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
