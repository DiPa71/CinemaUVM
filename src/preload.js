const { contextBridge, ipcRenderer, Notification } = require("electron");
const { WebContents } = require("electron/main");
let folio = makeid(10)
let precio_final = 0;
let precio_boleto= 100;
contextBridge.exposeInMainWorld(
    "electron", {
        /*Funciones invocar del main*/
        callregistro: () => ipcRenderer.invoke("call-registros"),
        insertar_peli: (obj) => ipcRenderer.invoke("insert-peliculas", obj),
        insertar_funcion: (obj) => ipcRenderer.invoke("insert-funcion", obj),
        getitem: () => ipcRenderer.invoke("get"),
        instempleado: (obj) => ipcRenderer.invoke("insert-empleado", obj),
        instprod: (obj) => ipcRenderer.invoke("insert-producto", obj),
        getproductos__comida: () => ipcRenderer.invoke("get-comida"),
        getproductos__comida_c: () => ipcRenderer.invoke("get-comida-c"),
        getproductos__bebida: () => ipcRenderer.invoke("get-bebida"),
        getproductos__bebida_c: () => ipcRenderer.invoke("get-bebida-c"),
        getproductos__kombo: () => ipcRenderer.invoke("get-kombo"),
        getsuc: () => ipcRenderer.invoke("get-sucursalopc"),
        getsucpro: () => ipcRenderer.invoke("get-sucursalopc-pro"),
        queryempleados: () => ipcRenderer.invoke("get-empleado"),
        querypeliculas: () => ipcRenderer.invoke("get-peliculas"),
        queryproductos: () => ipcRenderer.invoke("get-productos"),
        invokemsg: (obj) => ipcRenderer.invoke("session-start", obj),
        getfunciones: (obj) => ipcRenderer.invoke("getfuncionpeli", obj),
        insertobjfunciones: (obj) => ipcRenderer.invoke('insert-obj-fun', obj),
        getsalas: (obj) => ipcRenderer.invoke("opc-sala-fun", obj),
        getpeliculasfun: () => ipcRenderer.invoke("opc-peliculas-fun"),
        getfuncionesg: () => ipcRenderer.invoke("get-func"),


        /*Funciones innerHTML*/
        funcion_opc: (results) => ipcRenderer.on("funcion-opc", (event, results) => {
            opcfun.innerHTML = ``
            let sala;
            let opcs = document.createElement("option")
            opcs.setAttribute('selected', true);
            opcs.textContent = "-- Funcion --";
            opcs.setAttribute('disabled', '');
            opcfun.appendChild(opcs);
            results.forEach(elements => {
                tipo = elements.id_tipof
                switch (tipo) {
                    case 1:
                        tipo = "Normal";
                        break;
                    case 2:
                        tipo = "Infantil";
                        break;
                    case 3:
                        tipo = "3D";
                        break;
                    default:
                        tipo = "error";
                        break;
                }
                let opc = document.createElement("option");
                opc.value = elements.id_sala;
                opc.textContent = `TIPO: ${tipo} --  HORA: ${elements.hr_i} --  DIA: ${elements.fecha}`
                opcfun.appendChild(opc);
                opcfun.onchange = setbtnval;
            });
            async function setbtnval(e) {
                if (e.srcElement.id == "opcfun") {
                    btn.value = e.srcElement.value;
                    btn.onclick = asientos;
                }

            }
            async function asientos(e, obj) {
                if (e.srcElement.id == "btn") {
                    obj = {
                        id: e.srcElement.value
                    }
                    ipcRenderer.send('asientos', obj);
                }

            }
        }),
        opcpelicfun: (results) => ipcRenderer.on("opcpeli-fun", (event, results) => {
            peliculasopc.innerHTML = ``
            let opcs = document.createElement("option")
            opcs.setAttribute('selected', true);
            opcs.textContent = "-- Pelicula --";
            opcs.setAttribute('disabled', '');
            peliculasopc.appendChild(opcs);
            results.forEach(elements => {
                let opcps = document.createElement("option");
                opcps.value = elements.nombre;
                opcps.textContent = elements.nombre;
                peliculasopc.appendChild(opcps);
            });
        }),

        opcpelic: (results) => ipcRenderer.on("opcpeli", (event, results) => {
            opcpeli.innerHTML = ``
            let opcs = document.createElement("option")
            opcs.setAttribute('selected', true);
            opcs.textContent = "-- Pelicula --";
            opcs.setAttribute('disabled', '');
            opcpeli.appendChild(opcs);
            results.forEach(elements => {
                let opcps = document.createElement("option");
                opcps.value = elements.nombre;
                opcps.textContent = elements.nombre;
                opcpeli.appendChild(opcps);
            });
        }),
        opcsalasfun: (results) => ipcRenderer.on("opcsala-fun", (event, results) => {
            opcsalas.innerHTML = ``
            let opcs = document.createElement("option")
            opcs.setAttribute('selected', true);
            opcs.textContent = "-- Funcion --";
            opcs.setAttribute('disabled', '');
            opcsalas.appendChild(opcs);
            results.forEach(elements => {
                let opcps = document.createElement("option");
                opcps.value = elements.id_sala;
                opcps.id = "opcsalaid";
                opcps.textContent = elements.nombre;
                opcsalas.appendChild(opcps);
            });
        }),
        datauser: (results) => ipcRenderer.on("data-user", (event, results) => {
            results.forEach(elements => {
                card.innerHTML = `<p>Bienvenido ${elements.nombre}</p>`;
                card.onclick = () => {
                    ipcRenderer.send("tr")
                };
                if (elements.rol == "e") {
                    menu.innerHTML = `
                    <img src="img/icon.png" class="icon2">      
                    <button type="button" id="boletos" class="menubtn"><i class="c fas fa-ticket-alt"></i>Boletos</button><br>
                    <button type="button" id="pelicula" class="menubtn none"><i class="c fas fa-video" none></i>Peliculas</button><br>
                    <button type="button" id="empleados" class="menubtn none" ><i class="c fas fa-user-friends none"></i>Empleados</button><br>
                    <button type="button" id="tienda" class="menubtn" ><i class="c fas fa-store"></i>Tienda</button><br>
                    <button type="button" id="productos" class="menubtn none"><i class="fas fa-hotdog"></i>Productos</button><br>
                    <button type="button" id="funciones" class="menubtn none"><i class="c fas fa-film none"></i>Funciones</button><br>
                    <button type="button" id="registros" class="menubtn none"><i class="c fas fa-film none"></i>Funciones</button><br>
                    <button type="button" id="bye" class="menubtn"><i class="c fas fa-sign-out-alt"></i>Salir</button><br>`
                }
                if (elements.rol == "s") {
                    menu.innerHTML = `
                    <img src="img/icon.png" class="icon2">      
                    <button type="button" id="boletos" class="menubtn"><i class="c fas fa-ticket-alt"></i>Boletos</button><br>
                    <button type="button" id="pelicula" class="menubtn"><i class="c fas fa-video"></i>Peliculas</button><br>
                    <button type="button" id="empleados" class="menubtn" ><i class="c fas fa-user-friends"></i>Empleados</button><br>
                    <button type="button" id="productos" class="menubtn" ><i class="c far fa-list-alt"></i>Productos</button><br>
                    <button type="button" id="funciones" class="menubtn"><i class="c fas fa-film"></i>Funciones</button><br>
                    <button type="button" id="tienda" class="menubtn" ><i class="c fas fa-store"></i>Tienda</button><br>
                    <button type="button" id="registros" class="menubtn"><i class="c fas fa-table"></i>Registros</button><br>
                    <button type="button" id="bye" class="menubtn"><i class="c fas fa-sign-out-alt"></i>Salir</button><br>`
                }
                document.getElementById('boletos').addEventListener('click', function() {
                    ipcRenderer.send("abrir_boletos")
                })
                document.getElementById('pelicula').addEventListener('click', function() {
                    ipcRenderer.send("movie-window")
                })
                document.getElementById('empleados').addEventListener('click', function() {
                    ipcRenderer.send("window-empleados")
                })
                document.getElementById('productos').addEventListener('click', function() {
                    ipcRenderer.send("abrir_productos")
                })
                document.getElementById('funciones').addEventListener('click', function() {
                    ipcRenderer.send("abrir_funciones")
                })
                document.getElementById('tienda').addEventListener('click', function() {
                    ipcRenderer.send("abrir_tienda")
                })
                document.getElementById('registros').addEventListener('click', function() {
                    ipcRenderer.send("abrir_registros")
                })
                document.getElementById('bye').addEventListener('click', function() {
                    obj = {
                        nickname_emp: elements.nickname
                    }
                    ipcRenderer.invoke("bye-bye", obj)
                })

            });
        }),
        /*Imprimir tablas*/
        printfunc: (results) => ipcRenderer.on("funciones-print", (event, results) => {
            listfunc.innerHTML = " "
            results.forEach(elements => {
                tipo = elements.id_tipof
                switch (tipo) {
                    case 1:
                        tipo = "Normal";
                        break;
                    case 2:
                        tipo = "Infantil";
                        break;
                    case 3:
                        tipo = "3D";
                        break;
                    default:
                        tipo = "error";
                        break;
                }
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let btn = document.createElement("button");


                td1.textContent = elements.n_pelicula;
                td2.textContent = elements.hr_i;
                td3.textContent = tipo;

                btn.id = "btnbf";
                btn.classList.add("fas", "cli", "fa-trash-alt");
                btn.type = "button";
                btn.textContent = "";
                btn.value = elements.id_funcion;
                btn.onclick = udatestatuscero;

                td4.appendChild(btn);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                listfunc.appendChild(tr);
            })
            async function udatestatuscero(e) {
                if (e.srcElement.id == "btnbf") {
                    const obj = {
                        id: e.srcElement.value
                    }
                    await ipcRenderer.invoke('borrar_funcion', obj);
                }

            }

        }),
        imprimirpeli: (results) => ipcRenderer.on("send-pelicula", (event, results) => {
            mylist.innerHTML = " ";
            results.forEach(elements => {
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let btn = document.createElement("button");


                td1.textContent = elements.nombre;
                td2.textContent = elements.duracion + " min";

                btn.id = "btnb";
                btn.classList.add("fas", "cli", "fa-trash-alt");
                btn.type = "button";
                btn.textContent = "";
                btn.value = elements.id_pelicula;
                btn.onclick = udatestatuscero;

                td3.appendChild(btn);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                mylist.appendChild(tr);
            })
            async function udatestatuscero(e) {
                if (e.srcElement.id == "btnb") {
                    const obj = {
                        id: e.srcElement.value
                    }
                    await ipcRenderer.invoke('borrar_peliculas', obj);
                }

            }

        }),

        imprimirproduc: (results) => ipcRenderer.on("send-productos", (event, results) => {
            listpro.innerHTML = " "
            results.forEach(elements => {
                let categoria = elements.categorias;
                switch (categoria) {
                    case 'd':
                        categoria = "Dulceria";
                        break;
                    case 'c':
                        categoria = "Cafeteria";
                        break;
                    case 'b':
                        categoria = "Bebidas";
                        break;
                    case 'k':
                        categoria = "Combos";
                        break;
                    case 's':
                        categoria = "Snaks";
                        break;

                }
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let btn = document.createElement("button");


                td1.textContent = elements.nombre;
                td2.textContent = "$" + elements.precio;
                td3.textContent = categoria;

                btn.id = "btnbp";
                btn.classList.add("fas", "cli", "fa-trash-alt");
                btn.type = "button";
                btn.textContent = "";
                btn.value = elements.id_productos;
                btn.onclick = udatestatuscero;

                td4.appendChild(btn);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                listpro.appendChild(tr);
            })
            async function udatestatuscero(e) {
                if (e.srcElement.id == "btnbp") {
                    const obj = {
                        id: e.srcElement.value
                    }
                    await ipcRenderer.invoke('borrar_producto', obj);
                }

            }

        }),


        imprimirregistros: (results) => ipcRenderer.on("send-registro", (event, results) => {
            registros.innerHTML = " "
            results.forEach(elements => {
                sta = elements.sta;
                switch (sta) {
                    case 1:
                        sta = "Abrio sesion";
                        break;
                    case 0:
                        sta = "Cerro sesion";
                        break;
                    default:
                        sta = "Error"
                    break;
                }
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
            
                td2.textContent = elements.nickname_emp;
                td3.textContent = elements.fecha;
                td4.textContent = sta;
                td1.textContent = ''

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                registros.appendChild(tr);
            });
        }),
        imprimirempleados: (results) => ipcRenderer.on("send-empleado", (event, results) => {
            mylist.innerHTML = " "
            results.forEach(elements => {
                sucursal = elements.id_suc;
                switch (sucursal) {
                    case 1:
                        sucursal = "Roma";
                        break;
                    case 2:
                        sucursal = "Buenavista";
                        break;
                    case 3:
                        sucursal = "Queretaro";
                        break;
                    case 4:
                        sucursal = "Toluca";
                        break;
                    case 5:
                        sucursal = "Naucalpan";
                        break;
                    default:
                        sucursal = "Error"
                        break;
                }
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
                let td6 = document.createElement("td");
                let btn = document.createElement("button");


                td1.textContent = elements.nombre;
                td2.textContent = elements.telefono;
                td3.textContent = sucursal;
                td4.textContent = elements.nickname;
                td5.textContent = elements.password;


                btn.id = "btnbe";
                btn.classList.add("fas", "cli", "fa-trash-alt");
                btn.type = "button";
                btn.textContent = "";
                btn.value = elements.id_empleado;
                btn.onclick = udatestatuscero;

                td6.appendChild(btn);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                mylist.appendChild(tr);
            });

            async function udatestatuscero(e) {

                if (e.srcElement.id == "btnbe") {

                    const obj = {
                        id: e.srcElement.value
                    }
                    await ipcRenderer.invoke('borrar_empleado', obj);
                }

            }
        }),
        opcsuc: (results) => ipcRenderer.on("opcsucer", (event, results) => {
            results.forEach(elements => {
                let opcp = document.createElement("option");
                opcp.value = elements.id_suc;
                opcp.textContent = elements.nombre;
                opcsuc.appendChild(opcp);
            });
        }),
        totalc: () =>{
            total.textContent = precio_final;
            let btncancelar = document.getElementById("btnbackc")
            btncancelar.onclick = () =>{
                precio_final = 0;
                total.value = precio_final;
                while (tiket.firstChild) {
                    tiket.removeChild(tiket.firstChild);
                }
            }
               
            let btnlimpiar =document.getElementById("btnbackl")
            btnlimpiar.onclick = () =>{
                precio_final = 0;
                total.value = precio_final;
                while (tiket.firstChild) {
                    tiket.removeChild(tiket.firstChild);
                }
            }
            
        },
        totald: () =>{
            total.textContent = precio_final;
            let btncancelar = document.getElementById("btnback2")
            btncancelar.onclick = () =>{
                precio_final = 0;
                total.value = precio_final;
                while (tiket.firstChild) {
                    tiket.removeChild(tiket.firstChild);
                }
            }
               
            let btnlimpiar =document.getElementById("btnbackl2")
            btnlimpiar.onclick = () =>{
                precio_final = 0;
                total.value = precio_final;
                while (tiket.firstChild) {
                    tiket.removeChild(tiket.firstChild);
                }
            }
            
        },
        bebida: () => ipcRenderer.on("send-bebida", (event, results) => {
            productos_contenedor_b.innerHTML = " ";
            results.forEach(elements => {
                let article = document.createElement("article");
                let div = document.createElement("div");
                let h5 = document.createElement("h5");
                let img = document.createElement("img");
                let p = document.createElement("p");
                let button = document.createElement("button");
                h5.textContent = elements.nombre;
                article.classList.add("productos-contenedor--card");
                div.classList.add("panes-body");
                img.src = "https://image.freepik.com/vector-gratis/reajuste-salarial_53876-25487.jpg";
                img.classList.add("planes-card--img");
                p.classList.add("planes-card--saving");
                p.textContent = `$ ${elements.precio}`;
                button.classList.add("planes-card--action");
                button.textContent = "Agregar";
                button.onclick = function venta() {
                    precio_final += elements.precio;
                    total.value = precio_final;
                    obj = {
                        nombre: elements.nombre,
                        precio: elements.precio,
                        folio: folio,
                    }
                    
                    let cventa = document.getElementById("cventa");
                    let ccventa = document.getElementById("ccventa");
                    cventa.onclick = function re() {
                        let modal = document.getElementById("myModal");
                        folio = makeid(10)
                        ipcRenderer.invoke("insertar-venta", obj)
                        precio_final = 0;
                        total.value = precio_final;
                        modal.style.display = "none";
                        while (tiket.firstChild) {
                            tiket.removeChild(tiket.firstChild);
                        }
                    }
                    let h6 = document.createElement("h6");
                    let span = document.createElement("span");
                    let buttonr = document.createElement("button");

                    h6.textContent = obj.nombre
                    span.textContent = obj.precio
                    buttonr.classList.add("fas", "cli", "fa-trash-alt");
                    buttonr.textContent = "Borrar"

                    tiket.appendChild(h6)
                    tiket.appendChild(span);
                    tiket.appendChild(h6);
                    tiket.appendChild(span);
                }

                div.appendChild(h5);
                div.appendChild(img);
                div.appendChild(p);
                div.appendChild(button);
                article.appendChild(div);
                productos_contenedor_b.appendChild(article);
            })

        }),
        bebidac: () => ipcRenderer.on("send-bebida-c", (event, results) => {
            productos_contenedor_b_c.innerHTML = " ";
            results.forEach(elements => {
                let article = document.createElement("article");
                let div = document.createElement("div");
                let h5 = document.createElement("h5");
                let img = document.createElement("img");
                let p = document.createElement("p");
                let button = document.createElement("button");

                h5.textContent = elements.nombre;
                article.classList.add("productos-contenedor--card");
                div.classList.add("panes-body");
                img.src = "https://media.istockphoto.com/vectors/vector-frappe-vector-id809860500?k=6&m=809860500&s=612x612&w=0&h=6Nx7q2W3UciVQf3WMBN6zQuFwdE80pwACwdXV6xAjaI=";
                img.classList.add("planes-card--img");
                p.classList.add("planes-card--saving");
                p.textContent = `$ ${elements.precio}`;
                button.classList.add("planes-card--action");
                button.textContent = "Agregar";
                button.onclick = function venta() {
                    precio_final += elements.precio;
                    total.value = precio_final;
                    obj = {
                        nombre: elements.nombre,
                        precio: elements.precio,
                        folio: folio,
                    }
                    let ccventa = document.getElementById("ccventa");
                    ccventa.onclick = function re() {
                        let modal = document.getElementById("myModal");
                        folio = makeid(10)
                        ipcRenderer.invoke("insertar-venta", obj)
                        precio_final = 0;
                        total.value = precio_final;
                        modal.style.display = "none";
                        while (tiket.firstChild) {
                            tiket.removeChild(tiket.firstChild);
                        }
                    }
                    let h6 = document.createElement("h6");
                    let span = document.createElement("span");
                    let buttonr = document.createElement("button");

                    h6.textContent = obj.nombre
                    span.textContent = obj.precio
                    buttonr.classList.add("fas", "cli", "fa-trash-alt");
                    buttonr.textContent = "Borrar"

                    tiket.appendChild(h6);
                    tiket.appendChild(span);
                    buttonr.onclick = function borr() {
                        tiket.removeChild(h6);
                        tiket.removeChild(span);
                    }


                    
                }

                div.appendChild(h5);
                div.appendChild(img);
                div.appendChild(p);
                div.appendChild(button);
                article.appendChild(div);
                productos_contenedor_b_c.appendChild(article);
            })

        }),
        kombo: () => ipcRenderer.on("send-kombo", (event, results) => {
            productos_contenedor_k.innerHTML = " ";
            results.forEach(elements => {
                let article = document.createElement("article");
                let div = document.createElement("div");
                let h5 = document.createElement("h5");
                let img = document.createElement("img");
                let p = document.createElement("p");
                let button = document.createElement("button");

                h5.textContent = elements.nombre;
                article.classList.add("productos-contenedor--card");
                div.classList.add("panes-body");
                img.src = "https://static8.depositphotos.com/1077687/1062/v/950/depositphotos_10622859-stock-illustration-cine-fast-food-combo.jpg";
                img.classList.add("planes-card--img");
                p.classList.add("planes-card--saving");
                p.textContent = `$ ${elements.precio}`;
                button.classList.add("planes-card--action");
                button.textContent = "Agregar";
                button.onclick = function venta() {
                    precio_final += elements.precio;
                    total.value = precio_final;
                    obj = {
                        nombre: elements.nombre,
                        precio: elements.precio,
                        id_suc: elements.id_suc,
                        folio: folio,
                    }
                    let cventa = document.getElementById("cventa");
                    cventa.onclick = function re() {
                        let modal = document.getElementById("myModal");
                        folio = makeid(10)
                        ipcRenderer.invoke("insertar-venta", obj)
                        precio_final = 0;
                        total.value = precio_final;
                        modal.style.display = "none";
                        while (tiket.firstChild) {
                            tiket.removeChild(tiket.firstChild);
                        }
                    }
                    let h6 = document.createElement("h6");
                    let span = document.createElement("span");
                    let buttonr = document.createElement("button");

                    h6.textContent = obj.nombre
                    span.textContent = obj.precio
                    buttonr.classList.add("fas", "cli", "fa-trash-alt");
                    buttonr.textContent = "Borrar"

                    tiket.appendChild(h6);
                    tiket.appendChild(span);
                    buttonr.onclick = function borr() {
                        tiket.removeChild(h6);
                        tiket.removeChild(span);
                    }
                }

                div.appendChild(h5);
                div.appendChild(img);
                div.appendChild(p);
                div.appendChild(button);
                article.appendChild(div);
                productos_contenedor_k.appendChild(article);
            })

        }),
        comidad: () => ipcRenderer.on("send-comida", (event, results) => {
            productos_contenedor_c.innerHTML = " ";
            let obj = {}
            results.forEach(elements => {
                let article = document.createElement("article");
                let div = document.createElement("div");
                let h5 = document.createElement("h5");
                let img = document.createElement("img");
                let p = document.createElement("p");
                let button = document.createElement("button");

                h5.textContent = elements.nombre;
                article.classList.add("productos-contenedor--card");
                div.classList.add("panes-body");
                img.src = "http://img.lanrentuku.com/img/allimg/1406/14041293388635.jpg";
                img.classList.add("planes-card--img");
                p.classList.add("planes-card--saving");
                p.textContent = `$ ${elements.precio}`;
                button.classList.add("planes-card--action");
                button.textContent = "Agregar";

                button.onclick = function venta() {
                    precio_final += elements.precio;
                    total.value = precio_final;
                    obj = {
                        nombre: elements.nombre,
                        precio: elements.precio,
                        folio: folio,
                    }
                    let cventa = document.getElementById("cventa");
                    cventa.onclick = function re() {
                        let modal = document.getElementById("myModal");
                        folio = makeid(10)
                        ipcRenderer.invoke("insertar-venta", obj)
                        precio_final = 0;
                        total.value = precio_final;
                        modal.style.display = "none";
                        while (tiket.firstChild) {
                            tiket.removeChild(tiket.firstChild);
                        }
                    }
                    let h6 = document.createElement("h6");
                    let span = document.createElement("span");
                    let buttonr = document.createElement("button");

                    h6.textContent = obj.nombre
                    span.textContent = obj.precio
                    buttonr.classList.add("fas", "cli", "fa-trash-alt");
                    buttonr.textContent = "Borrar"

                    tiket.appendChild(h6);
                    tiket.appendChild(span);
                    buttonr.onclick = function borr() {
                        tiket.removeChild(h6);
                        tiket.removeChild(span);
                    }
                }
                div.appendChild(h5);
                div.appendChild(img);
                div.appendChild(p);
                div.appendChild(button);
                article.appendChild(div);
                productos_contenedor_c.appendChild(article);

            })

        }),
        comidadc: () => ipcRenderer.on("send-comida-c", (event, results) => {
            productos_contenedor_c_c.innerHTML = " ";
            let obj = {}
            results.forEach(elements => {
                let article = document.createElement("article");
                let div = document.createElement("div");
                let h5 = document.createElement("h5");
                let img = document.createElement("img");
                let p = document.createElement("p");
                let button = document.createElement("button");


                h5.textContent = elements.nombre;
                article.classList.add("productos-contenedor--card");
                div.classList.add("panes-body");
                img.src = "http://img.lanrentuku.com/img/allimg/1406/14041293388635.jpg";
                img.classList.add("planes-card--img");
                p.classList.add("planes-card--saving");
                p.textContent = `$ ${elements.precio}`;
                button.classList.add("planes-card--action");
                button.textContent = "Agregar";

                button.onclick = function venta() {
                    precio_final += elements.precio;
                    total.value = precio_final;
                    obj = {
                        nombre: elements.nombre,
                        precio: elements.precio,
                        folio: folio,
                    }
                    let ccventa = document.getElementById("ccventa");
                    ccventa.onclick = function re() {
                        let modal = document.getElementById("myModal");
                        folio = makeid(10)
                        ipcRenderer.invoke("insertar-venta", obj)
                        precio_final = 0;
                        total.value = precio_final;
                        modal.style.display = "none";
                        while (tiket.firstChild) {
                            tiket.removeChild(tiket.firstChild);
                        }
                    }
                    let h6 = document.createElement("h6");
                    let span = document.createElement("span");
                    let buttonr = document.createElement("button");

                    h6.textContent = obj.nombre
                    span.textContent = obj.precio
                    buttonr.classList.add("fas", "cli", "fa-trash-alt");
                    buttonr.textContent = "Borrar"

                    tiket.appendChild(h6);
                    tiket.appendChild(span);
                    buttonr.onclick = function borr() {
                        tiket.removeChild(h6);
                        tiket.removeChild(span);
                    }
                }
                div.appendChild(h5);
                div.appendChild(img);
                div.appendChild(p);
                div.appendChild(button);
                article.appendChild(div);
                productos_contenedor_c_c.appendChild(article);

            })

        }),
        /* asientos */
        asientosprint: () => ipcRenderer.on("no-asientos", (event, results) => {
            let h3 = document.createElement("h3")
            let quey = results[0]
            let obj2 = {u_asientos: []}
            let h4 = document.createElement("h4")
            let sillas;
            let img;
            let label;
            let span;
            let temp2 = []
            let i = 1;
            let n;
            let n_sala;
            let asientos;
            let j;
            let docenadedonas;
            let sillasn = 0;
            let asientosu = 0;
            let asientosuarr = [];
            let asientos_tot = [];
            n_sala = document.getElementById("n_sala")
            asientos = document.getElementById("asientos")
            results.forEach(elements => {
                let id_sala = elements.id_sala;
                h3.textContent = elements.nombre
                sillas = elements.num_asientos;
                docenadedonas = elements.num_asientos;
                
                ipcRenderer.send("send-id_sala",id_sala)
                for (i = 1; i <= sillas ; i++) {
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "name";
                    checkbox.classList.add("check")
                    checkbox.value = "value";
                    if (i < 10) {
                        checkbox.id = `A-0${i}`;
                    } else {
                        checkbox.id = `A-${i}`;
                    }
                    checkbox.onchange = () =>{
                        if (checkbox.checked == true) {
                            obj2.u_asientos.push(checkbox.id)
                            let obj4 = {
                                folio: folio,
                                id_suc: elements.id_suc,
                                id_sala: elements.id_sala
                            }
                            sillasn++;
                            let venta = Object.assign(obj4,obj2)
                            let btnv = document.getElementById("btn-venta");
                            btnv.onclick = () =>{
                                results[0] = {}
                                for(j = sillas; j > 0; j--){
                                    asientos.remove();
                                }
                                asientos = document.createElement('div');
                                asientos.id = 'asientos';
                                let section = document.getElementById('section')
                                section.insertAdjacentElement('beforeend',asientos);
                                h4.textContent = '';
                                h3.textContent = '';
                                n_sala.appendChild(h3)
                                n_sala.appendChild(h4)
                                span = document.createElement('span')
                                img = document.createElement('img')
                                h4 = document.createElement("h4")
                                h3 = document.createElement("h3")
                                checkbox = document.createElement('input')
                                n_sala.appendChild(h3)
                        ipcRenderer.invoke("insert-venta-boleto", venta);
                        modal.style.display = "none";
                        let totalbol = document.getElementById('precio-boleto');
                        totalbol.value = 0;
                        ipcRenderer.send("window-asientos-close")
                            }
                        } else {
                            sillasn--;
                            obj2.u_asientos.pop()
                        }
                    }
                    let modal = document.getElementById("myModal");
                    let btn = document.getElementById("modald");
                    let span = document.getElementsByClassName("close")[0];
                    btn.onclick = () => {
                        if(obj2.u_asientos.length == 0){
                            alert('Seleccione un asiento.')
                        }else{
                            let totalb = precio_boleto * obj2.u_asientos.length;
                            let totalbol = document.getElementById('precio-boleto');
                            totalbol.value = totalb;
                            modal.style.display = "block";
                        }
                    }
                    span.onclick = () => {
                        modal.style.display = "none";
                    }

                    window.onclick = (event) =>{
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }

                    img = document.createElement('img')
                    img.src = "./img/chair.png";
                    img.classList.add("chair-img")
                    label = document.createElement('label')
                    label.classList.add("lable-chair", "silla")
                    if (i < 10) {
                        label.htmlFor = `A-0${i}`;
                    } else {
                        label.htmlFor = `A-${i}`;
                    }

                    span = document.createElement('span')
                    span.classList.add("span")
                    if (i < 10) {
                        span.textContent=`A-0${i}`
                    } else {
                        span.textContent=`A-${i}`
                    }
                    label.appendChild(span);
                    asientos.appendChild(checkbox);
                    label.appendChild(img);
                    asientos.appendChild(label);
                }
                n_sala.appendChild(h3)
            })
            ipcRenderer.on("recu-asientos", (event, resultss) => {
                let checktboxp;
                let contenedor;
                resultss.forEach(elementss => {
                    temp = JSON.parse(elementss.u_asientos)
                    asientos_tot = [...temp ,...asientos_tot]
                    h4.textContent = `Asientos disponibles: ${docenadedonas - asientos_tot.length}`;
                    n_sala.appendChild(h4)
                    for (y = 1; y <= sillas ; y++) {
                        if (y < 10) {
                            temp2=`A-0${y}`
                        } else {
                            temp2=`A-${y}`
                        }
                        if(asientos_tot.includes(temp2) == true){
                            document.querySelector('label[for="' +temp2+ '"]').classList.add("pf")
                            if (y < 10) {
                                checktboxp = document.getElementById(`A-0${y}`);
                                let temp3 = checktboxp.value;
                                contenedor = document.querySelectorAll('.silla');
                                checktboxp.setAttribute("disabled", "");
                            } else {
                                document.querySelector('label[for="' +temp2+ '"]').className = "pf";
                                checktboxp = document.getElementById(`A-${y}`);
                                let temp3 = checktboxp.value;
                                contenedor = document.querySelectorAll('.silla');
                                checktboxp.setAttribute("disabled", "");
                            }
                                
                        }
                    }
                })
            })
            document.getElementById('btn-cancelar-asientos').addEventListener('click', function() {
                results[0] = {}
                docenadedonas = 0;
                temp2 = []
                for(j = sillas; j > 0; j--){
                    let temp5
                    if (j < 10) {
                        temp5=`A-0${j}`
                    } else {
                        temp5=`A-${j}`
                    }
                    asientos.remove();
                }
                asientos = document.createElement('div');
                asientos.id = 'asientos';
                let section = document.getElementById('section')
                section.insertAdjacentElement('beforeend',asientos);
                h4.textContent = '';
                h3.textContent = '';
                n_sala.appendChild(h3)
                n_sala.appendChild(h4)
                span = document.createElement('span')
                img = document.createElement('img')
                h4 = document.createElement("h4")
                h3 = document.createElement("h3")
                checkbox = document.createElement('input')
                n_sala.appendChild(h3)
                n_sala.appendChild(h4)
            })
        }),
        cancelarempleados: () => ipcRenderer.send("window-empleados-close"),
        cancelaregistros: () => ipcRenderer.send("window-registros-close"),
        cancelarpelicula: () => ipcRenderer.send("window-peliculas-close"),
        cancelarboletos: () => ipcRenderer.send("window-boletos-close"),
        cancelarasientos: () => ipcRenderer.send("window-asientos-close"),
        cancelarproductos: () => ipcRenderer.send("window-productos-close"),
        cancelarfuncion: () => ipcRenderer.send("window-funciones-close"),
        cancelarmenu: () => ipcRenderer.send("window-menu-close"),
        candyo: () => ipcRenderer.send("candy-window"),
        coffyo: () => ipcRenderer.send("coffy-window"),
        candyc: () => ipcRenderer.send("candyc"),
        coffyc: () => ipcRenderer.send("coffyc"),
        window_asientos: () => ipcRenderer.send("window-asientos"),
    });

function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}