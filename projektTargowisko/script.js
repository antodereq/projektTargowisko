document.addEventListener("DOMContentLoaded", function () {
    let mapaObject = document.getElementById("mapa");
    let mapContainer = document.querySelector(".map-container");
    let scale = 1.0, pointX = 0, pointY = 0, panning = false, start = { x: 0, y: 0 };

    // Tworzenie i dodanie elementu do wyĹwietlania skali
    let scaleDisplay = document.createElement("div");
    scaleDisplay.style.position = "absolute";
    scaleDisplay.style.top = "10px";
    scaleDisplay.style.left = "10px";
    scaleDisplay.style.background = "rgba(0, 0, 0, 0.7)";
    scaleDisplay.style.color = "white";
    scaleDisplay.style.padding = "5px 10px";
    scaleDisplay.style.borderRadius = "5px";
    scaleDisplay.style.fontSize = "14px";
    scaleDisplay.textContent = `Zoom: ${Math.round(scale * 100)}%`;
    mapContainer.appendChild(scaleDisplay);

    mapaObject.addEventListener("load", function () {
        let svgDocument = mapaObject.contentDocument;
        let svgElement = svgDocument.querySelector("svg");

        function setTransform() {
            svgElement.setAttribute("transform", `translate(${pointX}, ${pointY}) scale(${scale})`);
            scaleDisplay.textContent = `Zoom: ${Math.round(scale * 100)}%`;
        }

        function updateMapLimits() {
            let rect = mapContainer.getBoundingClientRect();
            let svgWidth = svgElement.getBBox().width * scale;
            let svgHeight = svgElement.getBBox().height * scale;

            let minX = Math.min(0, rect.width - svgWidth);
            let maxX = Math.max(0, svgWidth - rect.width);
            let minY = Math.min(0, rect.height - svgHeight);
            let maxY = Math.max(0, svgHeight - rect.height);

            pointX = Math.min(Math.max(pointX, minX), maxX);
            pointY = Math.min(Math.max(pointY, minY), maxY);
        }

        svgElement.addEventListener("mousedown", function (e) {
            e.preventDefault();
            let rect = mapContainer.getBoundingClientRect();
            start = { x: e.clientX - rect.left - pointX, y: e.clientY - rect.top - pointY };
            panning = true;
            svgElement.style.cursor = "grabbing";
        });

        svgElement.addEventListener("mousemove", function (e) {
            if (!panning) return;
            let rect = mapContainer.getBoundingClientRect();
            pointX = e.clientX - rect.left - start.x;
            pointY = e.clientY - rect.top - start.y;
            updateMapLimits();
            setTransform();
        });

        svgElement.addEventListener("mouseup", function () {
            panning = false;
            svgElement.style.cursor = "grab";
        });

        mapContainer.addEventListener("wheel", function (e) {
            e.preventDefault();
        }, { passive: false });

        svgElement.addEventListener("wheel", function (e) {
            e.preventDefault();
            let zoomChange = (e.deltaY > 0) ? -0.1 : 0.1;
            scale += zoomChange;

            if (scale < 1) scale = 1;
            if (scale > 5) scale = 5;

            updateMapLimits();
            setTransform();
        }, { passive: false });

        document.getElementById("zoomIn").addEventListener("click", function () {
            scale += 0.1;
            if (scale > 5) scale = 5;
            updateMapLimits();
            setTransform();
        });

        document.getElementById("zoomOut").addEventListener("click", function () {
            scale -= 0.1;
            if (scale < 1) scale = 1;
            updateMapLimits();
            setTransform();
        });

        document.getElementById("reset").addEventListener("click", function () {
            scale = 1.0;
            pointX = 0;
            pointY = 0;
            updateMapLimits();
            setTransform();
        });

        function moveMap(dx, dy) {
            pointX += dx;
            pointY += dy;
            updateMapLimits();
            setTransform();
        }

        document.getElementById("moveUp").addEventListener("click", function () {
            moveMap(0, -20);
        });

        document.getElementById("moveDown").addEventListener("click", function () {
            moveMap(0, 20);
        });

        document.getElementById("moveLeft").addEventListener("click", function () {
            moveMap(-20, 0);
        });

        document.getElementById("moveRight").addEventListener("click", function () {
            moveMap(20, 0);
        });
    });
});






// document.addEventListener("DOMContentLoaded", function () {
//     let mapaObject = document.getElementById("mapa");
//     let mapContainer = document.querySelector(".map-container");
//     let scale = 1.0, pointX = 0, pointY = 0, panning = false, start = { x: 0, y: 0 };

//     // Tworzenie i dodanie elementu do wyświetlania skali
//     let scaleDisplay = document.createElement("div");
//     scaleDisplay.style.position = "absolute";
//     scaleDisplay.style.top = "10px";
//     scaleDisplay.style.left = "10px";
//     scaleDisplay.style.background = "rgba(0, 0, 0, 0.7)";
//     scaleDisplay.style.color = "white";
//     scaleDisplay.style.padding = "5px 10px";
//     scaleDisplay.style.borderRadius = "5px";
//     scaleDisplay.style.fontSize = "14px";
//     scaleDisplay.textContent = `Zoom: ${Math.round(scale * 100)}%`;
//     mapContainer.appendChild(scaleDisplay);

//     mapaObject.addEventListener("load", function () {
//         let svgDocument = mapaObject.contentDocument;
//         let svgElement = svgDocument.querySelector("svg");

//         function setTransform() {
//             svgElement.setAttribute("transform", `translate(${pointX}, ${pointY}) scale(${scale})`);
//             scaleDisplay.textContent = `Zoom: ${Math.round(scale * 100)}%`;
//         }

//         function updateMapLimits() {
//             let rect = mapContainer.getBoundingClientRect();
//             let svgWidth = svgElement.getBBox().width * scale;
//             let svgHeight = svgElement.getBBox().height * scale;

//             let minX = Math.min(0, rect.width - svgWidth);
//             let maxX = Math.max(0, svgWidth - rect.width);
//             let minY = Math.min(0, rect.height - svgHeight);
//             let maxY = Math.max(0, svgHeight - rect.height);

//             pointX = Math.min(Math.max(pointX, minX), maxX);
//             pointY = Math.min(Math.max(pointY, minY), maxY);
//         }

//         svgElement.addEventListener("mousedown", function (e) {
//             e.preventDefault();
//             let rect = mapContainer.getBoundingClientRect();
//             start = { x: e.clientX - rect.left - pointX, y: e.clientY - rect.top - pointY };
//             panning = true;
//             svgElement.style.cursor = "grabbing";
//         });

//         svgElement.addEventListener("mousemove", function (e) {
//             if (!panning) return;
//             let rect = mapContainer.getBoundingClientRect();
//             pointX = e.clientX - rect.left - start.x;
//             pointY = e.clientY - rect.top - start.y;
//             updateMapLimits();
//             setTransform();
//         });

//         svgElement.addEventListener("mouseup", function () {
//             panning = false;
//             svgElement.style.cursor = "grab";
//         });

//         mapContainer.addEventListener("wheel", function (e) {
//             e.preventDefault();
//         }, { passive: false });

//         svgElement.addEventListener("wheel", function (e) {
//             e.preventDefault();
//             let zoomChange = (e.deltaY > 0) ? -0.1 : 0.1;
//             scale += zoomChange;

//             if (scale < 1) scale = 1;
//             if (scale > 5) scale = 5;

//             updateMapLimits();
//             setTransform();
//         }, { passive: false });

//         document.getElementById("zoomIn").addEventListener("click", function () {
//             scale += 0.1;
//             if (scale > 5) scale = 5;
//             updateMapLimits();
//             setTransform();
//         });

//         document.getElementById("zoomOut").addEventListener("click", function () {
//             scale -= 0.1;
//             if (scale < 1) scale = 1;
//             updateMapLimits();
//             setTransform();
//         });

//         document.getElementById("reset").addEventListener("click", function () {
//             scale = 1.0;
//             pointX = 0;
//             pointY = 0;
//             updateMapLimits();
//             setTransform();
//         });

//         function moveMap(dx, dy) {
//             pointX += dx;
//             pointY += dy;
//             updateMapLimits();
//             setTransform();
//         }

//         document.getElementById("moveUp").addEventListener("click", function () {
//             moveMap(0, -20);
//         });

//         document.getElementById("moveDown").addEventListener("click", function () {
//             moveMap(0, 20);
//         });

//         document.getElementById("moveLeft").addEventListener("click", function () {
//             moveMap(-20, 0);
//         });

//         document.getElementById("moveRight").addEventListener("click", function () {
//             moveMap(20, 0);
//         });
//     });
// });
