$(document).ready(function () {
    $("#mapa").on("load", function () {
        let svgDocument = this.contentDocument;
        let svgElement = $(svgDocument).find("svg");
        let mapContainer = $("#mapContainer");

        let pathsData = [
            { 
                numberGUID: "path1", 
                d: "M 157.37,114.31 c 1.64,7.59, 3.27,15.1, 4.9,22.65-7.57,1.68-15,3.37-22.45,4.99-6.5,1.42-12.97,3.1-19.54,4.08-6.96,1.03-5.76,1.05-10.61,5.51-5.79,5.34-11.61,10.66-17.64,16.2-1.66-2.92-2.73-6.06-4.11-9.04-1.37-2.95-2.86-5.85-4.27-8.78-1.45-3.02-2.88-6.05-4.27-9.09-1.35-2.94-2.64-5.9-4.07-9.11,27.46-5.83,54.69-11.6,82.05-17.41", 
                fill: "rgba(255, 255, 0, 0)",
            },
            { 
                numberGUID: "path2", 
                d: "M 163.23,136.88 c -.87-4.15-1.59-7.79-2.39-11.4-.82-3.71-1.72-7.41-2.55-11.12-.25-1.1.15-1.66,1.27-1.9,7.26-1.58,14.51-3.17,21.78-4.72,4.01-.85,8.04-1.64,12.06-2.43.38-.07.78,0,1.5,0,1.66,7.76,3.33,15.54,5.07,23.62-12.33,2.98-24.53,5.18-36.74,7.97 Z", 
                fill: "rgba(255, 255, 0, 0)",
            },
            { 
                numberGUID: "path4", 
                d: "M 201,128.81 c -1.63-7.57-3.25-15.06-4.89-22.67,11.71-2.49,23.16-4.92,34.85-7.41,1.63,7.51,3.25,14.98,4.94,22.76-11.63,2.44-23.15,4.85-34.9,7.32", 
                fill: "rgba(255, 255, 0, 0)",
            },
            { 
                numberGUID: "path5", 
                d: "M 236.84,121.27 c -1.62-7.54-3.2-14.86-4.81-22.35.19-.15.45-.55.78-.61,5.73-1.2,11.46-2.37,17.4-3.58,1.6,7.54,3.2,15.04,4.81,22.64-6.01,1.29-11.92,2.56-18.17,3.9", 
                fill: "rgba(255, 255, 0, 0)",
            },
        ];

        function createPath(data) {
            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            $(path).attr({
                d: data.d, 
                idPath: data.numberGUID, 
                fill: data.fill 
            }).on("mouseenter", function () {
                $(this).attr("fill", "rgba(255, 255, 0, 0.5)");
            }).on("mouseleave", function () {
                $(this).attr("fill", "rgba(255, 255, 0, 0)");
            }).on("click", function () {
                console.log("Kliknięto path:", data.numberGUID);
                showInfo(data.numberGUID);
            });
            return path;
        }

        function showInfo(selectedPath) {
            $.ajax({
                url: 'code.php',
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log("Odebrane dane z code.php:", data);
                    if (!Array.isArray(data) || data.length === 0) {
                        console.error("Błąd: Otrzymano pustą lub niepoprawną odpowiedź.");
                        alert("Błąd: Niepoprawna odpowiedź z serwera.");
                        return;
                    }
                    displayTable(data, selectedPath);
                },
                error: function (xhr, status, error) {
                    console.error("Błąd AJAX (code.php):", status, error);
                    alert("Wystąpił błąd podczas ładowania danych.");
                }
            });
        }

        function displayTable(data, selectedPath) {
            let infoDiv = $("#info");
            if (infoDiv.length === 0) {
                infoDiv = $("<div id='info' class='card position-absolute top-0 start-0 m-3 shadow' style='max-height: 400px; overflow-y: auto;'></div>").appendTo(mapContainer);
            }

            let table = "<table id='tabelaInformacji' class='table table-bordered table-hover'><thead><tr>";
            for (let column in data[0]) {
                table += "<th>" + column + "</th>";
            }
            table += "</tr></thead><tbody>";

            data.forEach(function (row) {
                table += `<tr data-id="${row.ID}">`;
                for (let column in row) {
                    table += `<td>${row[column]}</td>`;
                }
                table += "</tr>";
            });

            table += "</tbody></table>";

            infoDiv.html(` 
                <div class='card-header d-flex justify-content-between'>
                    <span>Informacje</span>
                    <button type='button' class='btn-close' aria-label='Close'></button>
                </div>
                <div class='card-body'>
                    ${table}
                </div>
            `).fadeIn();

            $(".btn-close").on("click", function () {
                infoDiv.fadeOut();
            });

            $("#tabelaInformacji tbody tr").on("click", function () {
                let id = $(this).data("id");
                console.log("Kliknięto rekord:", id);
                updateGuid(id, selectedPath);
                $("#tabelaInformacji tbody tr").removeClass("table-primary");
                $(this).addClass("table-primary");
            });
        }

        function updateGuid(id, guid) {
            $.ajax({
                url: 'przypisz.php',
                method: 'POST',
                data: { path: guid, rekord: id },
                dataType: 'json',
                success: function (response) {
                    console.log("Odpowiedź z przypisz.php:", response);
                    if (response.success) {
                        alert("Zaktualizowano GUID dla ID: " + id);
                    } else {
                        alert("Błąd aktualizacji: " + response.error);
                        console.error("Błąd z serwera:", response.error);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Błąd AJAX (przypisz.php):", status, error);
                    alert("Błąd podczas aktualizacji GUID.");
                }
            });
        }

        pathsData.forEach(data => {
            let path = createPath(data);
            svgElement.append(path);
        });
    });
});
