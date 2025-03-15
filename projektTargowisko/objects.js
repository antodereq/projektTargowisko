document.addEventListener("DOMContentLoaded", function () {
    let mapaObject = document.getElementById("mapa");

    mapaObject.addEventListener("load", function () {
        let svgDocument = mapaObject.contentDocument;
        let svgElement = svgDocument.querySelector("svg");

        let pathsData = [
            { 
                id: "path1", 
                d: "M 157.37,114.31 c 1.64,7.59, 3.27,15.1, 4.9,22.65-7.57,1.68-15,3.37-22.45,4.99-6.5,1.42-12.97,3.1-19.54,4.08-6.96,1.03-5.76,1.05-10.61,5.51-5.79,5.34-11.61,10.66-17.64,16.2-1.66-2.92-2.73-6.06-4.11-9.04-1.37-2.95-2.86-5.85-4.27-8.78-1.45-3.02-2.88-6.05-4.27-9.09-1.35-2.94-2.64-5.9-4.07-9.11,27.46-5.83,54.69-11.6,82.05-17.41", 
                fill: "rgba(255, 255, 0, 0)" 
            },
            { 
                id: "path2", 
                d: "M 163.23,136.88 c -.87-4.15-1.59-7.79-2.39-11.4-.82-3.71-1.72-7.41-2.55-11.12-.25-1.1.15-1.66,1.27-1.9,7.26-1.58,14.51-3.17,21.78-4.72,4.01-.85,8.04-1.64,12.06-2.43.38-.07.78,0,1.5,0,1.66,7.76,3.33,15.54,5.07,23.62-12.33,2.98-24.53,5.18-36.74,7.97 Z", 
                fill: "rgba(255, 255, 0, 0)"   
            },
            { 
                id: "path4", 
                d: "M 201,128.81 c -1.63-7.57-3.25-15.06-4.89-22.67,11.71-2.49,23.16-4.92,34.85-7.41,1.63,7.51,3.25,14.98,4.94,22.76-11.63,2.44-23.15,4.85-34.9,7.32", 
                fill: "rgba(255, 255, 0, 0)" 
            },
            { 
                id: "path5", 
                d: "M 236.84,121.27 c -1.62-7.54-3.2-14.86-4.81-22.35.19-.15.45-.55.78-.61,5.73-1.2,11.46-2.37,17.4-3.58,1.6,7.54,3.2,15.04,4.81,22.64-6.01,1.29-11.92,2.56-18.17,3.9", 
                fill: "rgba(255, 255, 0, 0)" 
            },
            
        ];

        // Funkcja do tworzenia path
        function createPath(id, d, fill) {
            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            path.setAttribute("id", id);
            path.setAttribute("fill", fill);

            path.addEventListener('mouseenter', () => {
                path.setAttribute('fill', 'rgba(255, 255, 0, 0.5)'); // Zmieniamy kolor na żółty z półprzezroczystością
            });
            path.addEventListener('mouseleave', () => {
                path.setAttribute('fill', 'rgba(255, 255, 0, 0)'); // Powracamy do przezroczystości
            });

            path.addEventListener('click', () => {
                alert(`Kliknięto ${id}`);
            });

            return path;
        }

        // Dodajemy path do SVG za pomocą pętli
        pathsData.forEach(pathData => {
            let path = createPath(pathData.id, pathData.d, pathData.fill);
            svgElement.appendChild(path);
        });
    });
});
