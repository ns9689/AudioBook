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

//make delete request
document.addEventListener('DOMContentLoaded', function () {
    const deleteSentenceButtons = document.querySelectorAll('.delete-sentence-btn');
    const deleteVersionButtons = document.querySelectorAll('.delete-version-btn');
    deleteSentenceButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const stavekId = this.getAttribute('data-id');
            const knjigaId = this.getAttribute('data-knjigaId');
            if (confirm('Ali zares želite izbrisati ta stavek?')) {
                fetch("/knjige/" + knjigaId + "/sentences/" + stavekId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => {
                    if (!res.ok) {
                        console.log("tukaj");
                        throw new Error(`Server error: ${res.status} - ${response.statusText}`);
                    }
                    window.location.href ="/knjige/" + knjigaId;
                    //window.location.href ="/knjige/" + knjigaId;
                }).catch(error => {
                    console.log("tukaj2");
                    // Handle errors during the DELETE request
                    console.error('Error deleting sentence:', error.message);
                });
            }
        });
    });
    deleteVersionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const verzijaId = this.getAttribute('data-verzijaId');
            const stavekId = this.getAttribute('data-stavekId');
            const knjigaId = this.getAttribute('data-knjigaId');
            console.log(verzijaId);
            console.log(stavekId);
            console.log(knjigaId);
            if (confirm('Ali zares želite izbrisati to verzijo?')) {
                fetch("/knjige/" + knjigaId + "/sentences/" + stavekId + "/versions/" + verzijaId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => {
                    if (!res.ok) {
                        console.log("tukaj");
                        throw new Error(`Server error: ${res.status} - ${response.statusText}`);
                    }
                    window.location.href = "/knjige/" + knjigaId;
                }).catch(error => {
                    // Handle errors during the DELETE request
                    console.error('Error deleting sentence:', error.message);
                });
            }
        });
    });
});
