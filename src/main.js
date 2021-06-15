const { app, BrowserWindow, ipcMain, Notification, ipcRenderer } = require("electron");
const path = require("path");
const mysql = require("mysql");

const conn = mysql.createConnection({
    // host: "cinema123.ddns.net",
    host: "localhost",
    user: "CinemaUVM",
    password: "cine123",
    database: "CinesUVM",
    port: "3306"
});

let login, menu, pelicula, empleados, funciones, loading, productos, menutienda,tr;

function createWindow() {
    coffy = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });
    coffy.loadFile(path.join(__dirname, "coffy.html"));
    // coffy.openDevTools();
    coffy.on("close", () => {
        coffy = null;
        app.quit();
    })
    registros = new BrowserWindow({
        width: 1080,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });
    tr = new BrowserWindow({
        width: 1200,
        height: 670,
        show: false,
        center: true,
        frame: false,
        opacity: 1,
        modal: true,
        parent: menu,
        alwaysOnTop:true,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
      });
      tr.loadFile(path.join(__dirname, "test.html"));
    tr.on("close", () => {
        tr = null;
        app.quit();
    })
    registros.loadFile(path.join(__dirname, "registros.html"));
    // registros.openDevTools();
    registros.on("close", () => {
        coffy = null;
        app.quit();
    })
    candy = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });
    candy.loadFile(path.join(__dirname, "candy.html"));
    // candy.openDevTools();
    candy.on("close", () => {
        candy = null;
        app.quit();
    })
    menutienda = new BrowserWindow({
        width: 1080,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });
    menutienda.loadFile(path.join(__dirname, "menutienda.html"));
    // menutienda.openDevTools();
    menutienda.on("close", () => {
        menutienda = null;
        app.quit();
    })

    funciones = new BrowserWindow({
        width: 1080,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });
    funciones.loadFile(path.join(__dirname, "funciones.html"));
    // funciones.openDevTools();
    funciones.on("close", () => {
        funciones = null;
        app.quit();
    })


    loading = new BrowserWindow({
        width: 350,
        height: 300,
        center: true,
        show: false,
        frame: false,
        alwaysOnTop: true,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        opacity: .8,
        skipTaskbar: true,
        skipTaskbar: true,
        vibrancy: "dark",
        backgroundColor: "#fff",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },

    });
    loading.removeMenu();
    loading.loadFile(path.join(__dirname, "load.html"));
    loading.on("close", () => {
        loading = null;
        app.quit();
    })

    login = new BrowserWindow({
        width: 1046,
        height: 548,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        visualEffectState: "dark",
        vibrancy: "dark",
        autoHideMenuBar: true,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: true, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });

    login.removeMenu();
    login.loadFile(path.join(__dirname, "index.html"));
    // login.openDevTools();
    login.on("close", () => {
        login = null;
        app.quit();
    })

    menu = new BrowserWindow({
        width: 1080,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });

    menu.removeMenu();
    menu.loadFile(path.join(__dirname, "menu.html"));
    // menu.openDevTools();
    menu.on("close", () => {
        menu = null;
        app.quit();
    })

    boletos = new BrowserWindow({
        width: 1080,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });

    boletos.removeMenu();
    boletos.loadFile(path.join(__dirname, "boletos.html"));
    // boletos.openDevTools();
    boletos.on("close", () => {
        boletos = null;
        app.quit();
    })
    asientos = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        parent: boletos,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });
    asientos.loadFile(path.join(__dirname, "asientos.html"));
    // asientos.openDevTools();
    asientos.on("close", () => {
        asientos = null;
        app.quit();
    })
    pelicula = new BrowserWindow({
        width: 1080,
        height: 720,
        show: false,
        center: true,
        frame: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });

    pelicula.removeMenu();
    pelicula.loadFile(path.join(__dirname, "pelicula.html"));
    //pelicula.openDevTools()
    pelicula.on("close", () => {
        pelicula = null;
        app.quit();
    })

    empleados = new BrowserWindow({
        width: 1080,
        height: 720,
        show: false,
        center: true,
        frame: false,
        alwaysOnTop: true,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });
    empleados.removeMenu();
    empleados.loadFile(path.join(__dirname, "empleados.html"));
    //empleados.openDevTools();
    empleados.on("close", () => {
        empleados = null;
        app.quit();
    })

    productos = new BrowserWindow({
        width: 1080,
        height: 720,
        show: false,
        center: true,
        frame: false,
        alwaysOnTop: true,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        resizable: false,
        icon: __dirname + "./img/icon.ico",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js"), // use a preload script
        },
    });
    productos.removeMenu();
    productos.loadFile(path.join(__dirname, "productos.html"));
    // productos.openDevTools();
    productos.on("close", () => {
        productos = null;
        app.quit();
    })
}

conn.connect(function(err) {
    if (err) {
        new Notification({
            title: "⚠️" + " Error de conexión " + "⚠️",
            body: `Problema de conexión con el servidor, contacte al area de sistemas.`,
        }).show();
    }else{
    new Notification({
        title: `🟢 Sin Errores, conexión establecida`,
    }).show();

    /* Selects */
    ipcMain.on("send-id_sala", (arg, id_sala) => {
        getAsientosOcupadillos(id_sala);
    });

    ipcMain.on("asientos", (arg, obj) => {
        getfuncion_boletos(obj);
    });
    

    function getAsientosOcupadillos(id_sala) {
        const id = id_sala;
        const stm = "Select u_asientos from ventasfunciones Where id_sala=?";
        conn.query(stm, [id], (error, resultss, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Spiderverse confirmado sin Andrew Garfield :(" + "⚠️",
                    body: error,
                }).show();
            }
            asientos.webContents.send("recu-asientos", resultss);
        });
    }

    function getfuncion_boletos(obj) {
        const { id } = obj;
        const stm = "Select * from Salas Where id_sala=?";
        conn.query(stm, [id], (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            asientos.webContents.send("no-asientos", results);
        });
    }

    ipcMain.handle("call-registros", (arg, item) => {
        callregistros();
    });

    function callregistros() {
        const stm = "Select * from Registros";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            registros.webContents.send("send-registro", results);
        });
    }
    ipcMain.handle("getfuncionpeli", (arg, obj) => {
        getfuncionpeli(obj);
    });

    function getfuncionpeli(obj) {
        const { n_pelicula } = obj;
        const stm = "Select * from Funcion Where n_pelicula=?";
        conn.query(stm, [n_pelicula], (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            boletos.webContents.send("funcion-opc", results);
        });
    }

    ipcMain.handle("opc-sala-fun", (event, obj) => {
        getsalasfun(obj);
    });

    function getsalasfun(obj) {
        const { tipo } = obj
        const stm = "Select * from Salas Where status=1 AND tipo=? AND id_suc=1";
        conn.query(stm, tipo, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            funciones.webContents.send("opcsala-fun", results);
        });
    }
    ipcMain.handle("get-func", () => {
        getfuncg();
    });

    function getfuncg() {
        const stm = "Select * from Funcion Where sta=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión" + "⚠️",
                    body: error,
                }).show();
            }
            funciones.webContents.send("funciones-print", results);
        });
    }

    ipcMain.handle("get-sucursalopc", () => {
        getsucursales();
    });

    function getsucursales() {
        const stm = "Select * from Sucursal Where status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            empleados.webContents.send("opcsucer", results);
        });
    }

    ipcMain.handle("get-sucursalopc-pro", () => {
        getsucursalespro();
    });

    function getsucursalespro() {
        const stm = "Select * from Sucursal Where status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            productos.webContents.send("opcsucer", results);
        });
    }

    ipcMain.handle("get-productos", () => {
        getproductos();
    })

    function getproductos() {
        const stm = "Select * from Productos Where status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            productos.webContents.send("send-productos", results);
        });
    }

    ipcMain.handle("get-peliculas", () => {
        getpeliculas();
    })

    function getpeliculas() {
        const stm = "Select * from Peliculas Where status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            pelicula.webContents.send("send-pelicula", results);
            boletos.webContents.send("opcpeli", results);
            funciones.webContents.send("opcpeli-fun", results);
        });
    }

    ipcMain.handle("get-empleado", () => {
        getempleado();
    });

    function getempleado() {
        const stm = "Select * from Empleados Where sta=1";
        conn.query(stm, (error, results, fields) => {

            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }

            empleados.webContents.send("send-empleado", results);
        });

    }


    /* Abrir y cerrar ventanas */
    ipcMain.on("window-asientos", (event, arg) =>  {
        loading.show();
        setTimeout(() => {
            asientos.show();
            loading.hide();
        }, 2000);
    });
    ipcMain.on("coffyc", (event, arg) => {
        coffy.hide();
        loading.show();
        setTimeout(() => {
            menutienda.show();
            loading.hide();
        }, 2000);
    });
    ipcMain.on("candyc", (event, arg) => {
        candy.hide();
        loading.show();
        setTimeout(() => {
            menutienda.show();
            loading.hide();
        }, 2000);
    });
    ipcMain.on("candy-window", (event, arg) => {
        menutienda.hide();
        loading.show();
        setTimeout(() => {
            candy.show();
            loading.hide();
        }, 2000);
    });
    ipcMain.on("window-menu-close", (event, arg) => {
        setTimeout(() => {
            menutienda.hide();
            menu.show();
        }, 200);
    });
    ipcMain.on("coffy-window", (event, arg) => {
        menutienda.hide();
        loading.show();
        setTimeout(() => {
            coffy.show();
            loading.hide();
        }, 2000);
    });
    ipcMain.on("window-funciones-close", (event, arg) => {
        setTimeout(() => {
            funciones.hide();
            menu.show();
        }, 200);
    });
    ipcMain.on("window-productos-close", (event, arg) => {
        setTimeout(() => {
            productos.hide();
            menu.show();
        }, 200);

    });
    ipcMain.on("window-boletos-close", (event, arg) => {
        setTimeout(() => {
            boletos.hide();
            menu.show();
        }, 200);

    });
    ipcMain.on("window-asientos-close", (event, arg) => {
        setTimeout(() => {
            asientos.hide();
            boletos.show();
        }, 200);

    });

    ipcMain.on("window-peliculas-close", (event, arg) => {
        setTimeout(() => {
            pelicula.hide();
            menu.show();
        }, 200);

    });
    ipcMain.on("window-empleados-close", (event, arg) => {
        setTimeout(() => {
            empleados.hide();
            menu.show();
        }, 200);
    });

    ipcMain.on("window-registros-close", (event, arg) => {
        setTimeout(() => {
            registros.hide();
            menu.show();
        }, 200);
    });

    ipcMain.on("window-funciones", (event, arg) => {
        setTimeout(() => {
            funciones.show();
            menu.hide();
        }, 200)
    });

    ipcMain.on("movie-window", (event, arg) => {
        setTimeout(() => {
            pelicula.show();
            menu.hide();
        }, 200)

    });

    ipcMain.on("window-empleados", (event, arg) => {
        setTimeout(() => {
            empleados.show();
            menu.hide();
        }, 200)
    });

    ipcMain.handle("bye-bye", (event, obj) => {
        insretarreg2(obj);
        menu.hide();
        loading.show();
        setTimeout(() => {
            login.show();
            loading.hide();
        }, 2000);
    });

    ipcMain.on("abrir_tienda", (event, arg) => {
        setTimeout(() => {
            menutienda.show();
            menu.hide();
        }, 200)  
    });
    ipcMain.on("abrir_registros", (event, arg) => {
        setTimeout(() => {
            registros.show();
            menu.hide();
        }, 200)
    });
    ipcMain.on("abrir_funciones", (event, arg) => {
        setTimeout(() => {
            funciones.show();
            menu.hide();
        }, 200)

    });
    ipcMain.on("tr", ()=>{   
        setTimeout(() => {
            tr.show();
        }, 200)
    })
    ipcMain.on("abrir_pelicula", (event, arg) => {
        setTimeout(() => {
            pelicula.show();
            menu.hide();
        }, 200)
    });

    ipcMain.on("abrir_productos", (event, arg) => {
        setTimeout(() => {
            productos.show();
            menu.hide();
        }, 200)
    });

    ipcMain.on("abrir_boletos", (event, arg) => {
        setTimeout(() => {
            boletos.show();
            menu.hide();
        }, 200)
    });
    /* Inserts */
    ipcMain.handle("insert-venta-boleto", (event, ventas) => {
        const { folio, id_suc, u_asientos, id_sala } = ventas;
        if (folio == "" || id_suc == "" || u_asientos == "" || id_sala== "") {
            new Notification({
                title: "⚠️" + "Campos vacios" + "⚠️",
                body: "Algun campos esta vacio",
            }).show();
        } else {
            let json = JSON.stringify(u_asientos);
            const stm = "insert into ventasfunciones (id_suc,folio,u_asientos,id_sala) values (?,?,?,?)";
            conn.query(stm, [id_suc, folio, json, id_sala], (error, results, fields) => {
                if (error) {
                    new Notification({
                        title: "⚠️" + " Error" + "⚠️",
                        body: `${error}`,
                    }).show();
                }                
                if (results) {
                    new Notification({
                        title: "🟢" + " Venta registrada ",
                        body: `Venta de boleto registrada`,
                    }).show();
                }
            });
        }
    })

    ipcMain.handle("insertar-venta", (event, obj) => {
        const { nombre, precio, folio } = obj;
        if (nombre == "" || precio == "" || folio == "") {
            new Notification({
                title: "⚠️" + "Campos vacios" + "⚠️",
                body: "Algun campos esta vacio",
            }).show();
        } else {
            const stm = "insert into VentasProductos (nombre,precio,folio) values (?,?,?)";
            conn.query(stm, [nombre, precio, folio], (error, results, fields) => {
                if (error) {
                    new Notification({
                        title: "⚠️" + " Error de conexión " + "⚠️",
                        body: error,
                    }).show();
                }
                if(results){
                    new Notification({
                        title: "🟢" + " Venta finalizada...",
                    }).show();
                }
            });
        }
    })
    ipcMain.handle("insert-obj-fun", (event, obj) => {
        const { id_tipof, id_sala, n_pelicula, fecha, hr_i } = obj;
        if (id_tipof == "" || id_sala == "" || n_pelicula == "" || fecha == "" || hr_i == "") {
            new Notification({
                title: "⚠️" + "Campos vacios" + "⚠️",
                body: "Algun campos esta vacio",
            }).show();
        } else {
            const stm = "insert into Funcion (id_tipof,id_sala,n_pelicula,fecha,hr_i) values (?,?,?,?,?)";
            conn.query(stm, [id_tipof, id_sala, n_pelicula, fecha, hr_i], (error, results, fields) => {
                if (error) {
                    new Notification({
                        title: "⚠️" + " Error de conexión " + "⚠️",
                        body: error,
                    }).show();
                }
                getfuncg();
                getfuncionpeli(obj.n_pelicula);
                if (results) {
                    new Notification({
                        title: "🟢" + " Funcion registrada ",
                        body: results,
                    }).show();
                }
            });
        }
    })
    ipcMain.handle("insert-peliculas", (evento, obj) => {
        const { nombre, sinopsis, duracion } = obj;
        if (nombre == "" || sinopsis == "" || duracion == "") {
            new Notification({
                title: "⚠️" + "Campos vacios" + "⚠️",
                body: "Algun campos esta vacio",
            }).show();
        } else {
            const stm = "insert into Peliculas (nombre,sinopsis,duracion) values (?,?,?)";
            conn.query(stm, [nombre, sinopsis, duracion], (error, results, fields) => {
                if (error) {
                    new Notification({
                        title: "⚠️" + " Error de conexión " + "⚠️",
                        body: error,
                    }).show();
                }
                if (results) {
                    new Notification({
                        title: "🟢" + " Pelicula registrada ",
                        body: results,
                    }).show();
                }
            });
        }
    })

    ipcMain.handle('insert-producto', (evento, obj) => {
        const { nombre, descripcion, id_suc, categorias, precio } = obj;
        if (nombre == "" || descripcion == "" || categorias == "" || id_suc == "" || precio == "") {
            new Notification({
                title: "⚠️" + "Campos vacios" + "⚠️",
                body: "Algun campos esta vacio",
            }).show();
        } else if(precio < 0){
            new Notification({
            title: "⚠️" + "El precio debe ser mayor a 0" + "⚠️",
            body: `Precio seleccionado ${precio}`,
        }).show();
            }else{
            const stm = "INSERT INTO Productos SET ?";
            conn.query(stm, obj, (error, results, fields) => {
                if (error) {
                    new Notification({
                        title: "⚠️" + " Error de conexión " + "⚠️",
                        body: error,
                    }).show();
                }
                if (results) {
                    selectcomida();
                    selectbebida();
                    selectcomidac();
                    selectkombo();
                    selectbebidac();
                    new Notification({
                        title: "🟢" + " Producto registrado ",
                        body: results,
                    }).show();
                }

            });
        }

    });
    ipcMain.handle("insert-empleado", (evento, obj) => {
        const { nombre, password, telefono, id_suc, nickname, rol } = obj;
        if (nombre == "" || password == "" || id_suc == "" || rol == "" || telefono == "" || nickname == "") {
            new Notification({
                title: "⚠️" + "Campos vacios" + "⚠️",
                body: "Algun campos esta vacio",
            }).show();
        } else {
            const stm = "INSERT INTO Empleados SET ?";
            conn.query(stm, obj, (error, results, fields) => {
                if (error) {
                    new Notification({
                        title: "⚠️" + " Error de conexión " + "⚠️",
                        body: error,
                    }).show();
                }
                if (results) {
                    new Notification({
                        title: "🟢" + " Empleado registrado ",
                        body: results,
                    }).show();
                }
            });
        }
    });

    ipcMain.handle("session-start", (event, obj) => {
        valusr(obj);
    });
    ipcMain.handle("insertar-admin", (evento, obj) => {
        insusr(obj);
    });
    ipcMain.handle("test-insert", (evento, obj) => {
        insretarreg(obj);
    });
    ipcMain.handle("opc_pelis", (evento, obj) => {
        opcionespelis(obj);
    })
    ipcMain.handle("get-comida", () => {
        selectcomida();
    })
    ipcMain.handle("get-comida-c", () => {
        selectcomidac();
    })
    ipcMain.handle("get-kombo", () => {
        selectkombo();
    })
    ipcMain.handle("get-bebida", () => {
        selectbebida();
    })
    ipcMain.handle("get-bebida-c", () => {
        selectbebidac();
    })



    /* Funciones */
    function selectkombo() {
        const stm = "SELECT * FROM Productos WHERE categorias='k' AND status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Problema al conectarce con la tienda " + "⚠️",
                    body: error,
                }).show();
            }
            candy.webContents.send("send-kombo", results);
        })
    }

    function selectbebida() {
        const stm = "SELECT * FROM Productos WHERE categorias='b' AND status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Problema al conectarce con la tienda " + "⚠️",
                    body: error,
                }).show();
            }
            candy.webContents.send("send-bebida", results);
        })
    }

    function selectbebidac() {
        const stm = "SELECT * FROM Productos WHERE categorias='c' AND status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Problema al conectarce con la tienda " + "⚠️",
                    body: error,
                }).show();
            }
            coffy.webContents.send("send-bebida-c", results);
        })
    }

    function selectcomida() {
        const stm = "SELECT * FROM Productos WHERE categorias='d' AND status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Problema al conectarce con la tienda " + "⚠️",
                    body: error,
                }).show();
            }
            candy.webContents.send("send-comida", results);
        })
    }

    function selectcomidac() {
        const stm = "SELECT * FROM Productos WHERE categorias='s' AND status=1";
        conn.query(stm, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Problema al conectarce con la tienda " + "⚠️",
                    body: error,
                }).show();
            }
            coffy.webContents.send("send-comida-c", results);
        })
    }

    function valusr(obj) {
        const { nombre, pass } = obj;
        const stm = "SELECT * FROM Empleados WHERE nickname=? AND password=? AND sta=1";
        conn.query(stm, [nombre, pass], (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            if (nombre == "willy" && pass == "rex") {
                login.hide();
                menu.show();
            }
            if (results.length > 0) {
                usr = results;
                insretarreg(obj)
                login.hide();
                loading.show();
                setTimeout(() => {
                    menu.show();
                    loading.hide();
                }, 5000);
                menu.webContents.send("data-user", results);
            } else {
                new Notification({
                    title: "⚠️" + " Error al intentar iniciar sesión " + "⚠️",
                    body: "Credenciales invalidas revisar porfavor",
                }).show();
            }
        });
    }

    function insretarreg(obj) {
        const { nombre } = obj;
        const stm = "insert into Registros (nickname_emp,sta) values (?, '1');";
        conn.query(stm, [nombre], (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            callregistros()
        });
    }

    function insretarreg2(obj) {
        const { nickname_emp } = obj;
        const stm = "insert into Registros (nickname_emp,sta) values (?, '0');";
        conn.query(stm, [nickname_emp], (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            callregistros()
        });
    }

    /*Updates*/
    ipcMain.handle("borrar_producto", (arg, obj) => {
        updateborrar_produc(obj);
    });

    function updateborrar_produc(obj) {
        const { id } = obj
        const stm = "UPDATE Productos SET status=0 WHERE id_productos=? ;";
        conn.query(stm, id, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            if (error) {
                new Notification({
                    title: `🟢 Sin errores`,
                    body: `Se elimino su registro`,
                }).show();
                getproductos();
            }
        });
    }

    ipcMain.handle("borrar_funcion", (arg, obj) => {
        updateborrar_func(obj);
    });

    function updateborrar_func(obj) {
        const { id } = obj
        const stm = "UPDATE Funcion SET sta=0 WHERE id_funcion=? ;";
        conn.query(stm, id, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            if (results) {
                new Notification({
                    title: `🟢 Sin errores`,
                    body: `Se elimino su registro`,
                }).show();
                getfuncg();
            }
        });
    }
    ipcMain.handle("borrar_peliculas", (arg, obj) => {
        updateborrar_opeli(obj);
    });


    function updateborrar_opeli(obj) {
        const { id } = obj
        const stm = "UPDATE Peliculas SET status=0 WHERE id_pelicula=? ;";
        conn.query(stm, id, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }if (results) {
                new Notification({
                    title: `🟢 Sin errores`,
                    body: `Se elimino su registro`,
                }).show();
                getpeliculas();
            }
        });
    }

    ipcMain.handle("borrar_empleado", (arg, obj) => {
        updateborrar(obj);
    });

    function updateborrar(obj) {
        const { id } = obj
        const stm = "UPDATE Empleados SET sta=0 WHERE id_empleado=? ;";
        conn.query(stm, id, (error, results, fields) => {
            if (error) {
                new Notification({
                    title: "⚠️" + " Error de conexión " + "⚠️",
                    body: error,
                }).show();
            }
            if (results) {
                new Notification({
                    title: `🟢 Sin errores`,
                    body: `Se elimino su registro`,
                }).show();
                getempleado()
            }
        });
    }
}
});
/* app */
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.on("ready", createWindow)

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") app.quit();
    app.dock.hide();
});



app.on("activate", function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});