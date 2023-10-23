$(document).ready(function() {
    $("#tableDnD").tableDnD({
        onDragClass: "myDragClass",
        onDrop: function(table, row) {
            console.log(table);
            var rows = table.tBodies[0].rows;
            console.log(rows);
            console.log(row);
            var debugStr = "Row dropped was "+row.id+". New order: ";
            for (var i=0; i<rows.length; i++) {
                debugStr += rows[i].id+" ";
                row.name = i+1;
                debugStr += "new name: " + row.name + ", ";
            }
            $("#debugArea").html(debugStr);
        },
        onDragStart: function(table, row) {
            console.log(row);
            console.log(document.querySelector('#tableDnD tbody').childNodes[0]);
            for (let i = 0; i < 3; i++) {
                i= i.toString();
                console.log(document.getElementById(i));
            }

            console.log(row.attributes[0].value);
            $("#debugArea").html("Started dragging row "+row.attributes[0].value);

            var table = document.getElementById("tableDnD");

        }
    });
});


function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue, tr1;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableDnD");
    tr = table.getElementsByClassName("search");
    tr1 = table.getElementsByClassName("accordion-toggle");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr1[i].getElementsByTagName("td")[0];
        //window.alert(td);
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


const tableBody = document.querySelector('#tableDnD tbody');
const rows = [
    { id: 1, row: 0, class: 'table-success search', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', },
    { id: 2, row: 1, class: 'table-secondary search', text:'lallalal' },
    { id: 3, row: 2, class: 'search', text:'Na morju je lepo' },
    // Add more rows here
];

const itemsPerPage = 5; // Number of items to display per page

function generateRow(rowData) {
    const row = document.createElement('tr');
    row.dataset.id = rowData.id;
    row.className = rowData.class;

    const rowHTML = `
                    <th scope="row">${rowData.id}</th>
                    <td>
                        <table class="table">
                            <tbody>
                                <tr data-toggle="collapse" class="accordion-toggle" data-target="#${rowData.id}" aria-expanded="false">
                                    <td>${rowData.text}</td>
                                    <td width="15%"><button class="btn"><i class="bi bi-play-circle"></i></button></td> <!--ce je ze izbrano-->
                                    <td width="15%"><button class="btn"><i class="bi bi-pencil-square"></i></button></td>
                                    <td width="15%"><button class="btn edit"><i class="bi bi-trash"></i></button></td>
                                </tr>

                                <tr>
                                    <td colspan="12" class="hiddenRow">
                                        <div class="accordion-body collapse in" id="${rowData.id}" aria-expanded="true" style="">
                                            <table class="table">
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <audio controls>
                                                            <source src="horse.ogg" type="audio/ogg">
                                                            <source src="horse.mp3" type="audio/mpeg">
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                    </td>
                                                    <td>
                                                        <button class="btn edit"><i class="bi bi-pen"></i></button>
                                                        <button class="btn edit"><i class="bi bi-file-play"></i></button>
                                                        <button class="btn edit"><i class="bi-bookmark-star"></i></button>
                                                        <button class="btn edit"><i class="bi-bookmark-x"></i></button>
                                                        <button class="btn edit"><i class="bi bi-trash"></i></button>
                                                    </td>
                                                    <td>
                                                        <!--<i class="fa-light fa-circle-0">0</i>-->
                                                        <button class="btn btn1 btn-circle btn-sm">1.</button>
                                                        <button class="btn btn2 btn-circle btn-sm">2.</button>
                                                        <button class="btn btn3 btn-circle btn-sm">3.</button>
                                                        <button class="btn btn4 btn-circle btn-sm">4.</button>
                                                        <button class="btn btn5 btn-circle btn-sm">5.</button>
                                                        <button class="btn btn6 btn-circle btn-sm">6.</button>
                                                        <button class="btn btn7 btn-circle btn-sm">7.</button>
                                                        <button class="btn btn8 btn-circle btn-sm">8.</button>
                                                        <button class="btn btn9 btn-circle btn-sm">9.</button>
                                                    </td>
                                                </tr>
                                                

                                                </tbody>
                                            </table>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
    `;

    row.innerHTML = rowHTML;
    return row;
}

function renderTable(pageNumber = 1) {
    tableBody.innerHTML = '';
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleRows = rows.slice(startIndex, endIndex);

    visibleRows.forEach(rowData => {
        const row = generateRow(rowData);
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(tableBody);
    renderTable();
    console.log(tableBody);
});




