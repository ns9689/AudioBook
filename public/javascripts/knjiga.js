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

document.addEventListener('DOMContentLoaded', function () {
    const deleteSentenceButtons = document.querySelectorAll('.delete-sentence-btn');
    const deleteVersionButtons = document.querySelectorAll('.delete-version-btn');
    const updateVersionButtons = document.querySelectorAll('.update-version-btn');
    const playSentenceButtons = document.querySelectorAll('.play-sentence-btn');
    playSentenceButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const url = "https://tts.true-bar.si/v1/speak";
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuaW5hIiwidXJvbGUiOiJub3JtYWwiLCJleHAiOjE3MTM3MzkwNzd9.7ZpwoHoXKE4V5AQwg8iRqf_NbItuCT8OtMJhXMukiaA";

            const headers = {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };

            const data = {
                "userid": "nina",
                "voice": "ajda",
                "input_text": "To hočem v audio.",
                "normalize": false,
                "accentuate": true,
                "simple_accentuation": true,
                "use_cache": true,
                "pace": 1,
                "tokenize": true,
                "pause_for_spelling": 0.25
            };

            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            })
                .then(response => {
                    console.log("response: " + response);
                    return response.json();
                })
                .then(data => {
                    console.log("data: " + JSON.stringify(data));
//                    res.redirect("" + knjiga._id);
                })
                .catch(error => console.error('Error:', error));
        })
    });
    deleteSentenceButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const url = "https://tts.true-bar.si/v1/register_user";
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuaW5hIiwidXJvbGUiOiJub3JtYWwiLCJleHAiOjE3MTM3MzkwNzd9.7ZpwoHoXKE4V5AQwg8iRqf_NbItuCT8OtMJhXMukiaA";

            const headers = {
                "accept": "application/json",
                "Content-Type": "application/json"
            };

            const data = {
                "user_fullname": "ninas",
                "user_email": "ns9689@student.uni-lj.si",
                "username": "ninas",
                "password": "ninas",
                "password_repeat": "ninas"
            };
            fetch(url, {
                method: "POST",
                headers: headers,
                body: data,
            })
                .then(response => {
                    console.log("response: " + JSON.stringify(response));
                    return response.json();
                })
                .then(data => {
                    console.log("data: " + JSON.stringify(data));
                    //res.redirect("" + knjiga._id);
                })
                .catch(error => console.error('Error:', error));

            //DELETE
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
    updateVersionButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const verzijaId = this.getAttribute('data-verzijaId');
            const stavekId = this.getAttribute('data-stavekId');
            const knjigaId = this.getAttribute('data-knjigaId');
            const izbranaVerzija = this.getAttribute('data-izbranaVerzija');
            const postData = {
                izbranaVerzija: izbranaVerzija,
            };
            let jsonStr = "";
            try {
                jsonStr = JSON.stringify(postData);
            } catch (error) {
                console.error("Error while stringifying JSON:", error);
            }
            console.log(jsonStr);
            fetch("/knjige/" + knjigaId + "/sentences/" + stavekId + "/versions/" + verzijaId, {
                method: 'POST',
                body: jsonStr,
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                if (!res.ok) {
                    throw new Error(`Server error: ${res.status} - ${response.statusText}`);
                }
                window.location.href = "/knjige/" + knjigaId;
                /*const targetTd = document.getElementById("661c5b9b6108ad4cdfea3676");
                if (targetTd) {
                    targetTd.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }*/
                //window.location.href = "/knjige/" + knjigaId;
            }).catch(error => {
                console.error('Error updating sentence:', error.message);
            });
        });
    });
});
