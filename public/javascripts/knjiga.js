let tokenGlobal = "";

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

async function pridobiToken () {
    const url = "https://tts.true-bar.si/token";
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept": "application/json",
    };
    const data = "username=ninas&password=ninas";
    fetch(url, {
        method: "POST",
        headers: headers,
        body: data
    })
        .then(response => {
            let token = "";
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                //console.log("here" + res.status, res.data, res.data.access_token)
                token = res.data.access_token;
                //console.log("here: " + token);
                tokenGlobal = token;
                return token;
            });
        })
        .catch(error => console.error('Error:', error));
}

async function predvajajZvok(button, text) {
    const url = "https://tts.true-bar.si/v1/speak";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + tokenGlobal,
        "X-Content-Type-Options": "nosniff",
    };
    const data = {
        input_text: text,
        userid: "nina",
        voice: "ajda",
        pace: "1",
        accentuate: true,
        simple_accentuation: true,
        use_cache: true,
        normalize: true
    };

    fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                alert("Token ni veljaven! Ponovno naložite spletno stran");
                throw new Error("HTTP error, status = " + response.status);
            }
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.startsWith("audio/")) {
                return response.blob();
            } else {
                throw new Error("Unexpected content type: " + contentType);
            }
        })
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            const audioElement = document.getElementById("audioContainer");
            if (!audioElement) {
                console.error('audioContainer element not found');
                return;
            }
            const div = document.createElement("div");
            div.classList.add("audioElement");
            div.innerHTML = `
                <audio id="audioControlsPlay" controls="" >
                    <source src="${audioUrl}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>`;
            audioElement.appendChild(div);
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function resetAudioElement() {
    const audioElement = document.querySelector(".audioElement");
    if (audioElement) {
        audioElement.remove();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    tokenGlobal = pridobiToken();
    const deleteSentenceButtons = document.querySelectorAll('.delete-sentence-btn');
    const deleteVersionButtons = document.querySelectorAll('.delete-version-btn');
    const updateVersionButtons = document.querySelectorAll('.update-version-btn');
    const playSentenceButtons = document.querySelectorAll('.play-sentence-btn');
    const newVersionButtons = document.querySelectorAll('.newVersionButton');
    /*const getTokenButtons = document.querySelectorAll('.getTokenButton');
    getTokenButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            console.log("Button clicked");
            tokenGlobal = pridobiToken();
            console.log("Token retrieved:", tokenGlobal);
        })
    });*/
    newVersionButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            resetAudioElement()
        })
    });
    playSentenceButtons.forEach(function (button) {
        button.addEventListener("click", async function () {
            resetAudioElement();
            let text = button.getAttribute("data-text");
            if (text == null) {
                const verzijaId = this.getAttribute('data-verzijaId');
                text = document.getElementById("floatingInputNew" + verzijaId).value;
            }
            //console.log(text);
            predvajajZvok(button, text)
                .then(response => {
                    //console.log(response);
                    if (!response.ok) {
                        throw new Error("HTTP error, status = " + response.status);
                    }
                })
                .catch(error => console.log(error));
        })
    });
    deleteSentenceButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const url = "https://tts.true-bar.si/v1/register_user";
            const headers = {
                "Content-Type": "application/json"
            };
            const data = {
                user_fullname: "ninas",
                user_email: "ns9689@student.uni-lj.si",
                username: "ninas",
                password: "ninas",
                password_repeat: "ninas"
            };
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
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
                        throw new Error(`Server error: ${res.status} - ${res.statusText}`);
                    }
                    window.location.href ="/knjige/" + knjigaId;
                }).catch(error => {
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
                        throw new Error(`Server error: ${res.status} - ${res.statusText}`);
                    }
                    window.location.href = "/knjige/" + knjigaId;
                }).catch(error => {
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
                    throw new Error(`Server error: ${res.status} - ${res.statusText}`);
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
