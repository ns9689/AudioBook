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

async function predvajajZvok(button, text, govorec, tempo, naglasi, naglasevanje, sintetiziranje, normaliziraj) {
    const url = "https://tts.true-bar.si/v1/speak";
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + tokenGlobal,
        "X-Content-Type-Options": "nosniff",
    };
    const data = {
        input_text: text,
        userid: "nina",
        voice: govorec,
        pace: tempo,
        accentuate: naglasi,
        simple_accentuation: naglasevanje,
        use_cache: sintetiziranje,
        normalize: normaliziraj
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
    const updateSettingsButtons = document.querySelectorAll('.update-settings-btn');
    const playSentenceButtons = document.querySelectorAll('.play-sentence-btn');
    const newVersionButtons = document.querySelectorAll('.newVersionButton');
    const generateBookButtons = document.querySelectorAll('.generateBookButton');

    generateBookButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const url = "https://tts.true-bar.si/v1/generate_audio";
            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + tokenGlobal,
                "X-Content-Type-Options": "nosniff",
            };
            const data = {
                "projectMetadata": {
                    "project_name": "string",
                    "project_description": "string",
                    "project_default_pause_period": 0,
                    "project_default_pause_comma": 0,
                    "project_default_pace": 0,
                    "project_default_voice": "ajda"
                },
                "segments": [
                    {
                        "rowId": 0,
                        "rowStatus": "string",
                        "rowText": "string",
                        "pauseAfterPeriod": 0,
                        "pauseAfterComma": 0,
                        "pace": 0,
                        "voice": "ajda"
                    }
                ]
            };
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(response => {
                    let token = "";
                    if (!response.ok) {
                        alert("Token ni veljaven! Ponovno naložite spletno stran");
                        throw new Error("HTTP error, status = " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    const sessionid = data.sessionid;
                    console.log('Success:', sessionid);
                })
                .catch(error => {
                    console.error("Error:", error);
            });
        })
    });
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
            let govorec = this.getAttribute('data-govorec');
            if (govorec == null || govorec == "") {
                console.log(govorec);
                govorec = "ajda";
            } else {
                switch (parseInt(govorec)) {
                    case 1:
                        govorec = "ajda";
                        break;
                    case 2:
                        govorec = "jure";
                        break;
                    case 3:
                        govorec = "ziga";
                        break;
                }
            }

            let tempo = this.getAttribute('data-tempo');
            tempo = (tempo) ? tempo : "1";
            let normaliziraj = this.getAttribute('data-normaliziraj');
            if (normaliziraj == "") normaliziraj = true;
            let naglasi = this.getAttribute('data-naglasi');
            if (naglasi == "") naglasi = true;
            let naglasevanje = this.getAttribute('data-enostavnoNaglasevanje');
            if (naglasevanje == "") naglasevanje = true;
            let sintetiziranje = this.getAttribute('data-sintetiziranoBesedilo');
            if (sintetiziranje == "") sintetiziranje = true;
            console.log(govorec, tempo, normaliziraj, naglasi, naglasevanje, sintetiziranje);
            predvajajZvok(button, text, govorec, tempo, normaliziraj, naglasi, naglasevanje, sintetiziranje)
                .then(response => {
                    //console.log(response);
                    if (!response.ok) {
                        throw new Error("HTTP error, status = " + response.status);
                    }
                })
                .catch(error => console.log(error));
        })
    });
    updateSettingsButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const knjigaId = this.getAttribute('data-knjigaId');
            console.log(knjigaId + " knjiga");
            let govorec = document.getElementById('floatingSelectGrid').value;
            if (govorec != null) {
                //console.log(govorec);
                switch (parseInt(govorec)) {
                    case 1:
                        govorec = "ajda";
                        break;
                    case 2:
                        govorec = "jure";
                        break;
                    case 3:
                        govorec = "ziga";
                        break;
                }
            }
            else govorec = "ajda";
            let tempo = document.getElementById('paceValue').value;
            tempo = (tempo) ? tempo : "1";
            let normaliziraj = document.getElementById('cb-normalize').checked;
            if (normaliziraj == null) normaliziraj = true;
            let naglasi = document.getElementById('cb-accentuate').checked;
            if (naglasi == null) naglasi = true;
            let naglasevanje = document.getElementById('simple-accentuation').checked;
            if (naglasevanje == null) naglasevanje = true;
            let sintetiziranje = document.getElementById('caching').checked;
            if (sintetiziranje == null) sintetiziranje = true;
            //console.log(govorec, tempo, normaliziraj, naglasi, naglasevanje, sintetiziranje);
            const postData = {
                govorec: govorec,
                tempo: tempo,
                normaliziraj: normaliziraj,
                naglasi: naglasi,
                enostavnoNaglasevanje: naglasevanje,
                sintetiziranoBesedilo: sintetiziranje
            };
            let jsonStr = "";
            try {
                jsonStr = JSON.stringify(postData);
            } catch (error) {
                console.error("Error while stringifying JSON:", error);
            }
            console.log(jsonStr);
            fetch("/knjige/" + knjigaId + "/settings/", {
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
            }).catch(error => {
                console.error('Error updating settings:', error.message);
            });
        });
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
