var PromediosController = function () {

    var table = document.querySelector('table')
    var json = []; 
    var headers = [];
    var tableArr = [];

    //Pintar grafica 
    var crearGrafica = function () {

        for (var i = 0; i < table.rows[0].cells.length; i++) {
            headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
        }
        for (var i = 1; i < table.rows.length; i++) {
            var tableRow = table.rows[i];
            var rowData = {};
            for (var j = 0; j < tableRow.cells.length; j++) {
                rowData[headers[j]] = tableRow.cells[j].innerHTML;
            }

            json.push(rowData);
        }


        var labels = json.map(function (e) {
            return e.nombres;
        });
       
        var values = json.map(function (e) {
            return e.calificacion;
        });
       
        var chart = Grafica(labels, values, "Calificaciones");
        mejorAlumno();
        peorAlumno();
        promedioGrupal();
        generarClaveUsuario();
       
    }

    //ALumno con mejor calificacion
    var mejorAlumno = function () {
        var maxVal;
        var nombre;
        var apellidoP;
        var apellidoM;

        for (var i = 1; i < table.rows.length; i++) {
            var calificacion = parseInt(table.rows[i].cells[6].innerHTML);
            if (i === 1) {
               
                maxVal = table.rows[i].cells[6].innerHTML;
                nombre = table.rows[i].cells[0].innerHTML;
                apellidoM = table.rows[i].cells[1].innerHTML;
                apellidoP = table.rows[i].cells[2].innerHTML;
            }
            else if (maxVal < calificacion) {
                maxVal = table.rows[i].cells[6].innerHTML;
                nombre = table.rows[i].cells[0].innerHTML;
                apellidoM = table.rows[i].cells[1].innerHTML;
                apellidoP = table.rows[i].cells[2].innerHTML;
            }
           
        }
        $("#mejorAlumno").html(nombre+ " "+apellidoP+ " "+ apellidoM);
    }

    //Alumno con calificación mas baja
    var peorAlumno = function () {
        var maxVal;
        var nombre;
        var apellidoP;
        var apellidoM;

        for (var i = 1; i < table.rows.length; i++) {
            var calificacion = parseInt(table.rows[i].cells[6].innerHTML);
            if (i === 1) {

                maxVal = table.rows[i].cells[6].innerHTML;
                nombre = table.rows[i].cells[0].innerHTML;
                apellidoM = table.rows[i].cells[1].innerHTML;
                apellidoP = table.rows[i].cells[2].innerHTML;
            }
            else if (maxVal > calificacion) {
                maxVal = table.rows[i].cells[6].innerHTML;
                nombre = table.rows[i].cells[0].innerHTML;
                apellidoM = table.rows[i].cells[1].innerHTML;
                apellidoP = table.rows[i].cells[2].innerHTML;
            }
        }
        $("#peorAlumno").html(nombre + " " + apellidoP + " " + apellidoM);
    }

    //Promedio total en el grupo
    var promedioGrupal = function () {
        var suma = 0;
        var total = 0;

        for (var i = 1; i < table.rows.length; i++) {
            var calificacion = parseFloat(table.rows[i].cells[6].innerHTML);
            total = table.rows.length;
            var suma = suma + calificacion;
        }
        var promedio = suma / total;
       
        $("#promedioGrupal").html(parseFloat(promedio).toFixed(2));
    }


    var generarClaveUsuario = function () {
        var Clave;
        var tbl = document.getElementById('tablaCalificaciones'), i;

        for (var i = 1; i < table.rows.length; i++) {

            for (i = 0; i < tbl.rows.length; i++) {
                
                if (i === 0) {
                    contenido = "Clave Usuario"
                }
                else if (i > 0) {
                    var NI = table.rows[i].cells[0].innerHTML;
                    var INI = NI.substring(0, 2);
                    var APEL = table.rows[i].cells[1].innerHTML;
                    var LAPEL = APEL.substring(APEL.length - 2);
                    var fecha = table.rows[i].cells[3].innerHTML;
                    var edad = getAge(fecha);
                    var letras = INI + LAPEL;
                    var rotado = alphabetPosition(letras, 3);
                    var contenido = rotado + edad;
                   
                }
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), (contenido), 'col');
            }

        }
    }

    function rotarClave(numero) {
        
        var tbl = document.getElementById('tablaCalificaciones'), i;

        for (var i = 1; i < table.rows.length; i++) {

            for (i = 0; i < tbl.rows.length; i++) {

                if (i === 0) {
                    contenido = "Clave rotada"
                }
                else if (i > 0) {
                    var Clave = table.rows[i].cells[7].querySelector('.col').textContent;
                    console.log(Clave);
                    var rotado = rotacionesClave(Clave, numero);
                    var contenido = rotado;

                }
                createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), (contenido), 'col');
            }

        }
    }
    function createCell(cell, text, style) {

        var div = document.createElement('div'),
            txt = document.createTextNode(text);

        div.appendChild(txt);
        div.setAttribute('class', style);
        div.setAttribute('className', style);
        cell.appendChild(div);
    }

    //Rotar letras a 3 posiciones
    function alphabetPosition(text, posicion) {
        rotarIzq = 27 - posicion;
        text.split("");
        var char = "";
        var arr = [];
        var alfabeto = "abcdefghijklmnñopqrstuvwxyz".split('');

        for (var i = 0; i < text.length; i++) {
            char = text.charAt(i).toLowerCase();

            if (alfabeto.indexOf(char) > -1) {
                var letra = alfabeto.indexOf(char) + rotarIzq;
                if (letra >= 27) {
                    letra = letra - 27;
                }
                arr.push(alfabeto[letra]);
                var arr2 = arr.join("");
            }
        }
        return arr2;
    }

    function rotacionesClave(text, posicion) {
        rotarIzq = 6 - posicion;

        var char = "";
        var arr = [];
        var alfabeto = text.split('');

        for (var i = 0; i < text.length; i++) {
            char = text.charAt(i).toLowerCase();

            if (alfabeto.indexOf(char) > -1) {
                var letra = alfabeto.indexOf(char) + rotarIzq;
                if (letra >= 6) {
                    letra = letra - 6;
                }
                arr.push(alfabeto[letra]);
                var arr2 = arr.join("");
            }
        }
        return arr2;
    }
    
    //Calcular la edad
    function getAge(fecha) {
        var birthDate = fecha;
        var currentTime = new Date();
        var birthdayYear = birthDate.substring(birthDate.length - 4);
        var birthdayMonth = birthDate.substring(3, 5);
        var birthdayDay = birthDate.substring(0,2);
        var hoy = currentTime.getDate();
        var month = currentTime.getMonth();

        var age = currentTime.getFullYear() - birthdayYear;

        var m = (month + 1) - birthdayMonth;
       if (m < 0 || (m === 0 && currentTime.getDate() < birthdayDay)) {
           age--;
          
       }
       return age;
    }

    //Diseño de grafica
    function Grafica(labels, values, chartTitle) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels, 
                datasets: [{
                    label: chartTitle, 
                    data: values,
                    backgroundColor: [ 
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [ 
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: false, 
            }
        });
        return myChart;
    }
  
  
    return {
        crearGrafica: crearGrafica,
        rotarClave: rotarClave
    };
}