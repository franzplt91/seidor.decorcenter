sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/crearDocumentoServices",
    "pe/com/seidor/sap/decor/ventas/services/guardarDocumento"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery, crearDocumentoServices, guardarDocumento) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocNuevo", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            var oData = {
                "pedido": {
                    "enabled": true,
                    "enabledBtnGuardar": true,
                    "enabledBtnCopiar": true,
                    "enabledBtnBuscar": true,
                    "OrgVentas": "",
                    "CanalDist": "",
                    "CodOficina": "",
                    "CondPago": "",
                    "Moneda": "",
                    "TipoCambio": "",
                    "PesoTotal": "",
                    "FechaFacturacion": "",
                    "NombreBanco": "",
                    "BloqueoEntrega": "",
                    "BloqueoFactura": "",
                    "Motivo": "",
                    "OrdenCompra": "",
                    "CondExp": "",
                    "Fecha": "",
                    "FechaValidez": "",
                    "FechaEntrega": "",
                    "nomProyecto": "",
                    "codProyecto": "",
                    "codVersion": "",
                    "TipoVisita": "",
                    "Reenbolsable": false,
                    "GrupoForecast": "",
                    "TipoForecast": "",
                    "Certificado": "",
                    "FechaVisita": ""
                },
                "observaciones": {
                    "ZP01": {
                        "CodTexto": "ZP01",
                        "Descripcion": ""
                    },
                    "ZP05": {
                        "CodTexto": "ZP05",
                        "Descripcion": ""
                    },
                    "ZP06": {
                        "CodTexto": "ZP06",
                        "Descripcion": ""
                    },
                    "ZP07": {
                        "CodTexto": "ZP07",
                        "Descripcion": ""
                    }
                },
                "interlocutores": {
                    "AG": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "AG",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "RE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "RE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "RG": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "RG",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "VE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "VE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "V2": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "V2",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "V3": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "V3",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "WE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "WE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "AT": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "NOMBRE": "",
                            "Pais": "",
                            "Ruc": "",
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "AT",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    }
                },
                "profesionales": {
                    "CodProfesional": "",
                    "NomProfesional": "",
                    "CodProfesional2": "",
                    "NomProfesional2": ""
                },
                "cliente": {
                    "APMAT": "",
                    "APPAT": "",
                    "CODIG": "",
                    "Ciudad": "",
                    "CodigoPostal": "",
                    "DIREC": "",
                    "EDAD": "",
                    "RANGOED": "",
                    "FECNAC": "",
                    "GRAINS": "",
                    "NIVELSE" : "",
                    "Mail": "",
                    "NOMBRE": "",
                    "Pais": "",
                    "Ruc": null,
                    "SEXO": "",
                    "Telefono": "",
                    "TelefonoMovil": null
                },
                "preguntas": {
                    "1": {
                        "CODP": "1",
                        "CODR": ""
                    },
                    "10": {
                        "CODP": "10",
                        "CODR": ""
                    },
                    "15": {
                        "CODP": "15",
                        "CODR": ""
                    },
                    "20": {
                        "CODP": "20",
                        "CODR": ""
                    },
                    "25": {
                        "CODP": "25",
                        "CODR": ""
                    },
                    "35": {
                        "CODP": "35",
                        "CODR": ""
                    }
                },
                "listaMaterial": [{
                        "Posicion": "",
                        "CodMaterial": "",
                        "CodMaterialCorto": "",
                        "DescMaterial": "",
                        "Cantidad": null,
                        "CantConfirmada": null,
                        "CodUMedida": "",
                        "Rendimiento": "",
                        "UMedidaRendimiendo": "",
                        "ValorRendimiento": null,
                        "CodAlmacen": "",
                        "CodCentro": "",
                        "Zservicio": false,
                        "Peso": null,
                        "PesoNeto": 11,
                        "PrecioUnitario": null,
                        "DesGrupoMat": "",
                        "SubTotal": null,
                        "Reparto": "",
                        "Ambiente": "",
                        "Opcion": "",
                        "MotivoRechazo": "",
                        "PrioridadEntrega": "",
                        "Descontinuado": "",
                        "StockPos": "",
                        "JerarquiaPrincipalDesc": "",
                        "link": null,
                        "Repartos": [{
                                "CantConf": null,
                                "CantPed": null,
                                "FechaEntrega": "",
                                "PosCorto": "",
                                "TipoReparto": ""
                            }],
                        "DescuentoPrincipal": [{
                                "Condicion": "",
                                "Denominacion": "",
                                "Importe": null,
                                "ImporteAnterior": null,
                                "LimiteInferior": null,
                                "Moneda": null,
                                "Posicion": "",
                                "Recalcular": "",
                                "Valor": null,
                                "esPorcentaje": true,
                                "matPosicion": ""
                            }],
                        "DescuentoOtros": [{
                                "Condicion": "",
                                "Denominacion": "",
                                "Importe": null,
                                "ImporteAnterior": null,
                                "LimiteInferior": null,
                                "Moneda": null,
                                "Posicion": "",
                                "Recalcular": "",
                                "Valor": null,
                                "esPorcentaje": true,
                                "matPosicion": ""
                            }]
                    }],
                "busquedaCliente": {
                    "dniRuc": "",
                    "razonSocial": "",
                    "tipoInterlocutor": "",
                    "copiarDatos": false
                }
            };
            if (oEvent.getParameter("name") === "appDocNuevo") {
                this.getView().byId("SplitAppId").setMode("HideMode");
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_DialogDocNuevo").open();
                this.initView();
            }
            var tipoCabecera = [];
            tipoCabecera.push({
                codigo: 1,
                descripcion: 'Datos de Clientes'
            });
            tipoCabecera.push({
                codigo: 2,
                descripcion: 'Interlocutores'
            });
            tipoCabecera.push({
                codigo: 3,
                descripcion: 'Observaciones'
            });
            this.getView().getModel().setProperty("/tipoCabeceraModel", tipoCabecera);
            this.getView().getModel().refresh();
        },
        initView: function () {
            this.getView().getModel().setProperty("/listaMaterial", null);
            this.getView().byId("txt_nombre_solicitante").setValue("");
            this.getView().byId("btnCopiarDatosInterlocutores").setText("Copiar Datos");
            this.getView().byId("btnBuscarInterlocutor").setText("Buscar Solicitante");
            this.getView().byId("buttonMasterDatos").setSelectedKey("datos");
            this.getView().byId("buttonMasterProductos").setSelectedKey("productos");
            //Lista Respuestas de Lista Preguntas
            //Tipo de cliente
            this.getView().getModel().setProperty("/listaRespuestas", dataIni.lstPreguntas[0].listaResp);
            //Tipo de construcción
            this.getView().getModel().setProperty("/listaRespuestas1", dataIni.lstPreguntas[1].listaResp);
            //Tipo de proyecto - Residencial
            this.getView().getModel().setProperty("/listaRespuestas2", dataIni.lstPreguntas[2].listaResp);
            //Tipo de proyecto - Institucional
            this.getView().getModel().setProperty("/listaRespuestas3", dataIni.lstPreguntas[3].listaResp);
            //Presupuesto para el proyecto
            this.getView().getModel().setProperty("/listaRespuestas4", dataIni.lstPreguntas[4].listaResp);
            //Ambiente 1
            this.getView().getModel().setProperty("/listaRespuestas5", dataIni.lstPreguntas[5].listaResp);
            //Estilo 1
            this.getView().getModel().setProperty("/listaRespuestas6", dataIni.lstPreguntas[6].listaResp);
            //Ambiente 2
            this.getView().getModel().setProperty("/listaRespuestas7", dataIni.lstPreguntas[7].listaResp);
            //Estilo 2
            this.getView().getModel().setProperty("/listaRespuestas8", dataIni.lstPreguntas[8].listaResp);
            //Ambiente 3
            this.getView().getModel().setProperty("/listaRespuestas9", dataIni.lstPreguntas[9].listaResp);
            //Estilo 3
            this.getView().getModel().setProperty("/listaRespuestas10", dataIni.lstPreguntas[10].listaResp);
        },
        onOkDlg_DialogDocNuevo: function (oEvent) {
            var tipoDocumento = this.getView().byId("ListaDocNuevo").getSelectedItem().getBindingContext().getObject();
            var numPedido = this.getView().byId("txt_refDocNuevo").getValue();
            var result = crearDocumentoServices.crearDoc(tipoDocumento.Codigo, numPedido);
            if (result.c === "s") {
                if (result.data.success) {
                    this.initDataDefault(result.data);
                    this.getView().byId("dlg_DialogDocNuevo").close();
                    MessageToast.show(tipoDocumento.Descripcion);
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
            } else {
                sap.m.MessageToast.show(result.m, {duration: 3000});
            }
        },
        initDataDefault: function (data) {
            this.getView().getModel().setProperty("/pedido/TipoCambio", data.tipoCambio);
            this.getView().getModel().setProperty("/pedido/FechaFacturacion", data.FechaFact);
            this.getView().getModel().setProperty("/pedido/FechaValidez", data.FechaValidez);
            this.getView().getModel().setProperty("/pedido/Fecha", data.FechaFact);
            this.getView().getModel().setProperty("/pedido/FechaEntrega", data.FechaFact);
            this.getView().getModel().setProperty("/pedido/OrgVentas", dataIni.person.OrgVentas);
            this.getView().getModel().setProperty("/pedido/CodOficina", dataIni.person.OfVentas);
            this.getView().getModel().setProperty("/pedido/CanalDist", dataIni.person.CanalDist);
            this.getView().getModel().setProperty("/pedido/CondPago", "E000");
            this.getView().getModel().setProperty("/pedido/Moneda", "PEN");
            this.getView().getModel().setProperty("/pedido/CondExp", "03");
            this.getView().getModel().setProperty("/pedido/GrupoForecast", "01");
            this.getView().getModel().setProperty("/interlocutores/AG/Cliente/Codigo", dataIni.person.ClienteEvent);
            this.getView().getModel().setProperty("/interlocutores/RE/Cliente/Codigo", dataIni.person.ClienteEvent);
            this.getView().getModel().setProperty("/interlocutores/RG/Cliente/Codigo", dataIni.person.ClienteEvent);
            this.getView().getModel().setProperty("/interlocutores/WE/Cliente/Codigo", dataIni.person.ClienteEvent);
            this.getView().getModel().setProperty("/interlocutores/VE/Persona/CodPersona", dataIni.person.PerNr);
            this.getView().getModel().setProperty("/lstGrupoFor", data.lstGrupoFor);
            this.getView().getModel().setProperty("/lstTipoFor", data.lstTipoFor);
            //this.getView().getModel().refresh();
        },
        CambioTabFilter: function () {
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterSolicitante") {
                this.getView().byId("btnCopiarDatosInterlocutores").setIcon("sap-icon://action");
                this.getView().byId("btnCopiarDatosInterlocutores").setText("Copiar Datos");
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(true);
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Solicitante");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDestinoMercancia") {
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Dest. Mcia.");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDestinoFactura") {
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Dest. Factura");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterResponsablePago") {
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Resp. Pago");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterAgenciaTransporte") {
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Ag. Transporte");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterEncargadoComercial") {
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("btnBuscarInterlocutor").setVisible(false);
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                this.getView().byId("btnCopiarDatosInterlocutores").setIcon("sap-icon://search");
                this.getView().byId("btnCopiarDatosInterlocutores").setText("Buscar Prof. 1");
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(true);
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Prof. 2");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDatosAdicionales") {
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("btnBuscarInterlocutor").setVisible(false);
            }
        },
        /*         
         * Metodos de la vista de interlocutores
         */
        /** primer boton de busqueda en la vista de interlocutores **/
        onBuscarInterlocutores: function () {
            var interlocutor = {};
            var profesional = {};
            var tipoInterlocutor = "";
            var tipoBusqueda = "";
            var copiarDatos = false;
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterSolicitante") {
                interlocutor = this.getView().getModel().getProperty("/interlocutores/AG/Cliente");
                tipoInterlocutor = "AG";
                copiarDatos = true;
                if (interlocutor.Descripcion !== "") {
                    tipoBusqueda = "Nom";
                }                
                if (interlocutor.Ruc !== "") {
                    tipoBusqueda = "Doc";
                }             
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDestinoMercancia") {
                tipoInterlocutor = "WE";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDestinoFactura") {
                tipoInterlocutor = "RE";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterResponsablePago") {
                tipoInterlocutor = "RG";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterAgenciaTransporte") {
                tipoInterlocutor = "AT";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                profesional = this.getView().getModel().getProperty("/profesionales");
            }
            //invocar popup de busqueda
            if (jQuery.isEmptyObject(interlocutor) && tipoInterlocutor !== "") {
                this.getView().getModel().setProperty("/busquedaCliente/tipoInterlocutor", tipoInterlocutor);
                this.getView().byId("dlg_DocNuevobuscarCliente").open();
            } else if (!jQuery.isEmptyObject(interlocutor) && (interlocutor.Descripcion !== "" || interlocutor.Ruc !== "")) {
                if (tipoBusqueda === "Doc") {
                    this.obtenerDatosInterlocutorDni(interlocutor, tipoInterlocutor, copiarDatos);
                }
                if (tipoBusqueda === "Nom") {
                    this.obtenerDatosInterlocutorNombre(interlocutor, tipoInterlocutor);
                }
            } else if (!jQuery.isEmptyObject(profesional) && (profesional.NomProfesional2 !== "" || profesional.CodProfesional2 !== "")) {
                this.obtenerDatosProfecionalNombre(profesional.NomProfesional2, 2);
            } else {
                MessageToast.show("Ingresar datos solicitados");
            }
        },
        /** segundo boton de busqueda en la vista de interlocutores **/
        onCopiarDatosInterlocutores: function () {
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterSolicitante") {
                this.registrarDatosInterlocutores();
                this.getView().byId("dlg_MensajeAvisoCopiarDatos").open();
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                var vendedor = this.getView().getModel().getProperty("/profesionales");
                if (vendedor.NomProfesional !== "") {
                    this.obtenerDatosProfecionalNombre(vendedor.NomProfesional, 1);
                } else {
                    MessageToast.show("Ingresar datos solicitados");
                }
            }
        },        
        /** boton principal de la buscar Cliente **/
        onDocNuevoBuscarCliente: function () {
            this.getView().getModel().setProperty("/busquedaCliente/tipoInterlocutor", "AG");
            this.getView().getModel().setProperty("/busquedaCliente/copiarDatos", true);
            this.getView().byId("dlg_DocNuevobuscarCliente").open();
        },        
        //funcion de  presionar boton buscar cliente desde el popup (Dialog)
        onDocNuevoBuscarClienteAccion: function () {
            var busqueda = this.getView().getModel().getProperty("/busquedaCliente");
            if (busqueda.dniRuc !== "" || busqueda.razonSocial !== "") {
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var result = clienteServices.buscarCliente(busqueda.dniRuc, busqueda.razonSocial);
                    if (result.c === "s") {
                        if (result.data.success) {
                            self.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
                            self.agregarOpcionBusquedaClientes(result.data.lstClientes, busqueda.tipoInterlocutor, busqueda.copiarDatos);
                            self.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
                            self.getView().getModel().refresh();
                        } else {
                            sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                        }
                    } else {
                        sap.m.MessageToast.show(result.m, {duration: 3000});
                    }
                    self.getView().byId("loadingControl").close();
                }, 1000);
            } else {
                sap.m.MessageToast.show('Ingrese RUC ó Razón social', {duration: 1000});
                return;
            }
        },
        /** metodos de selecionar datos del popup **/
        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaCliente: function (evt) {
            var cliente = evt.getSource().getSelectedItem().getBindingContext().getObject();
            var replica = (cliente.tipoInterlocutor === "AG") ? true : false;
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
            this.obtenerDatosInterlocutorCodigo(cliente.codigo, cliente.tipoInterlocutor, replica, cliente.copiarDatos);
        },
        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaClienteLista: function (evt) {
            var cliente = evt.getSource().getSelectedItem().getBindingContext().getObject();
            var replica = (cliente.tipoInterlocutor === "AG") ? true : false;
            this.getView().byId("dlg_DocNuevobuscarClienteLista_resultado").close();
            this.obtenerDatosInterlocutorCodigo(cliente.CodPersona, cliente.tipoInterlocutor, replica, false);
        },        
        seleccionaProfesional: function (evt) {
            var profesional = evt.getSource().getSelectedItem().getBindingContext().getObject();
            if (profesional.ubicacion === 1) {
                this.getView().getModel().setProperty("/profesionales/CodProfesional", profesional.CodPersona);
                this.getView().getModel().setProperty("/profesionales/NomProfesional", profesional.Descripcion);
            }
            if (profesional.ubicacion === 2) {
                this.getView().getModel().setProperty("/profesionales/CodProfesional2", profesional.CodPersona);
                this.getView().getModel().setProperty("/profesionales/NomProfesional2", profesional.Descripcion);
            }
            this.getView().getModel().refresh();
            this.getView().byId("dlg_DocNuevobuscarProfesional_resultado").close();
        },                
        /** metodos de funcionalidad **/
        obtenerDatosInterlocutorCodigo: function (codigoCliente, tipoInterlocutor, replica, copiarDatos) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var result = clienteServices.buscarClienteCodigo(codigoCliente);
                var difeTipoInterlocutor = (tipoInterlocutor === "AT") ? "EW" : tipoInterlocutor;
                if (result.c === "s") {
                    var interlocutores = result.data.Interlocutores;
                    var cliente = null;
                    for (var indice in interlocutores) {
                        if (interlocutores[indice].Funcion === difeTipoInterlocutor) {
                            cliente = interlocutores[indice].Cliente;
                            if (interlocutores[indice].Funcion !== "AG") {
                                self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Codigo", cliente.Codigo);
                            }
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/CodigoPostal", cliente.CodigoPostal);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Ciudad", cliente.Ciudad);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Descripcion", cliente.Descripcion);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/DireccionCompleta", cliente.DireccionCompleta);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Direccion", cliente.DireccionCompleta);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Mail", cliente.Mail);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Ruc", cliente.Ruc);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Telefono", cliente.Telefono);
                            break;
                        }
                    }
                    if (replica) {
                        self.registrarDatosCliente(cliente);
                        self.registrarDatosPreguntas(result.data.listCliPregResp);
                        self.getView().getModel().refresh();
                    }
                    if (copiarDatos) {
                        self.registrarDatosInterlocutores();
                        self.getView().byId("txt_nombreCliente").setProperty("title", cliente.Descripcion);
                        self.getView().byId("txt_codigoCliente").setProperty("text", cliente.Codigo);
                        self.getView().getModel().setProperty("/busquedaCliente/copiarDatos", false);
                    }
                    self.getView().getModel().refresh();
                    self.getView().byId("dlg_DocNuevobuscarCliente").close();
                    MessageToast.show("Solicitante Encontrado");
                } else {
                    var rpta = (result.data !== null) ? result.data.errors.reason : "Error de sistema";
                    sap.m.MessageToast.show(rpta, {duration: 3000});
                }
                self.getView().byId("loadingControl").close();
            }, 1000);
        },
        obtenerDatosInterlocutorDni: function (solicitante, tipoInterlocutor, replica) {
            var self = this;
            var busquedaDTO = new Object();
            //datosBusqueda.codigo = solicitante.Codigo;
            //datosBusqueda.codcliente = solicitante.Codigo;                    
            busquedaDTO.descripcion = solicitante.Descripcion;
            busquedaDTO.direccion = solicitante.Direccion;
            busquedaDTO.distrito = solicitante.CodigoPostal;
            busquedaDTO.telefono = solicitante.Telefono;
            busquedaDTO.mail = solicitante.Mail;
            busquedaDTO.esRuc = this.verificarEsRuc(solicitante.Ruc);
            busquedaDTO.ruc = solicitante.Ruc;
            busquedaDTO.dni = solicitante.Ruc;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var result = clienteServices.buscarSolicitanteDoc(busquedaDTO);
                var cliente = result.data.objCliente;
                if (result.c === "s" && !jQuery.isEmptyObject(cliente)) {
                    self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/CodigoPostal", cliente.CodigoPostal);
                    self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Ciudad", cliente.Ciudad);
                    self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Descripcion", cliente.NOMBRE + " " + cliente.APPAT + " " + cliente.APMAT);
                    self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/DireccionCompleta", cliente.DireccionCompleta);
                    self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Direccion", cliente.DireccionCompleta);
                    self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Mail", cliente.Mail);
                    self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Ruc", cliente.CODIG);
                    self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Telefono", cliente.Telefono);
                    if (replica) {
                        self.registrarDatosCliente(cliente);
                        self.registrarDatosPreguntas(result.data.listCliPregResp);
                        self.getView().getModel().refresh();
                    }
                    self.getView().getModel().refresh();
                    MessageToast.show("Solicitante Encontrado");
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
                self.getView().byId("loadingControl").close();
            }, 1000);
        },
        obtenerDatosInterlocutorNombre: function (solicitante, tipoInterlocutor) {
            var self = this;
            var nombreBuscado = solicitante.Descripcion;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var result = clienteServices.buscarSolicitanteNombre("BusNombres", nombreBuscado);
                if (result.c === "s") {
                    self.getView().byId("dlg_DocNuevobuscarClienteLista_resultado").open();
                    self.agregarOpcionTipoInterlocutor(result.data.eventuales, tipoInterlocutor);
                    self.getView().getModel().setProperty("/BusquedaClientes", result.data.eventuales);
                    self.getView().getModel().refresh();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
                self.getView().byId("loadingControl").close();
            }, 1000);
        },
        obtenerDatosProfecionalNombre: function (nombre, ubicacion) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var result = clienteServices.buscarProfesionalNombre(null, nombre, "Profesional");
                if (result.c === "s") {
                    self.getView().byId("dlg_DocNuevobuscarProfesional_resultado").open();
                    self.agregarOpcionPosicion(result.data.profesionales, ubicacion);
                    self.getView().getModel().setProperty("/BusquedaProfesionales", result.data.profesionales);
                    self.getView().getModel().refresh();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
                self.getView().byId("loadingControl").close();
            }, 1000);
        },        
        registrarDatosCliente: function (cliente) {
            this.getView().getModel().setProperty("/cliente/NOMBRE",(cliente.NOMBRE !== null) ? cliente.NOMBRE : "");
            this.getView().getModel().setProperty("/cliente/APPAT", (cliente.APPAT !== null) ? cliente.APPAT : "");
            this.getView().getModel().setProperty("/cliente/APMAT", (cliente.APMAT !== null) ? cliente.APMAT : "");
            this.getView().getModel().setProperty("/cliente/CODIG", (cliente.CODIG !== null) ? cliente.CODIG : "");
            this.getView().getModel().setProperty("/cliente/Ciudad", (cliente.Ciudad !== null) ? cliente.Ciudad : "");
            this.getView().getModel().setProperty("/cliente/CodigoPostal", (cliente.CodigoPostal !== null) ? cliente.CodigoPostal : "");
            this.getView().getModel().setProperty("/cliente/DIREC", (cliente.DIREC !== null) ? cliente.DIREC : "");
            this.getView().getModel().setProperty("/cliente/EDAD", (cliente.EDAD !== null) ? cliente.EDAD : "");
            this.getView().getModel().setProperty("/cliente/FECNAC", moment(cliente.FECNAC).format('DD/MM/YYYY'));
            this.getView().getModel().setProperty("/cliente/GRAINS", (cliente.GRAINS !== null) ? cliente.GRAINS : "");
            this.getView().getModel().setProperty("/cliente/Mail", (cliente.Mail !== null) ? cliente.Mail : "");
            this.getView().getModel().setProperty("/cliente/Pais", (cliente.Pais !== null) ? cliente.Pais : "");
            this.getView().getModel().setProperty("/cliente/Ruc", (cliente.Ruc !== null) ? cliente.Ruc : "");
            this.getView().getModel().setProperty("/cliente/SEXO", (cliente.SEXO !== null) ? cliente.SEXO : "");
            this.getView().getModel().setProperty("/cliente/Telefono", (cliente.Telefono !== null) ? cliente.Telefono : "");
            this.getView().getModel().setProperty("/cliente/TelefonoMovil", (cliente.TelefonoMovil !== null) ? cliente.TelefonoMovil : "");
        },
        registrarDatosPreguntas: function (listaPreguntas) {
            for (var indice in listaPreguntas) {
                if (listaPreguntas[indice].CODP === "1" || listaPreguntas[indice].CODP === "10" || listaPreguntas[indice].CODP === "15" ||
                        listaPreguntas[indice].CODP === "20" || listaPreguntas[indice].CODP === "25" || listaPreguntas[indice].CODP === "35")
                    this.getView().getModel().setProperty("/preguntas/" + listaPreguntas[indice].CODP + "/CODR", listaPreguntas[indice].CODR);
            }
        },
        registrarDatosInterlocutores: function () {
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var cliente = this.getView().getModel().getProperty("/interlocutores/AG/Cliente");
            for (var indice in interlocutores) {
                if (interlocutores[indice].Funcion === "RE" || interlocutores[indice].Funcion === "RG" || interlocutores[indice].Funcion === "WE") {
                    interlocutores[indice].Cliente.CodigoPostal = cliente.CodigoPostal;
                    interlocutores[indice].Cliente.Ciudad = cliente.Ciudad;
                    interlocutores[indice].Cliente.Descripcion = cliente.Descripcion;
                    interlocutores[indice].Cliente.DireccionCompleta = cliente.DireccionCompleta;
                    interlocutores[indice].Cliente.Direccion = cliente.Direccion;
                    interlocutores[indice].Cliente.Mail = cliente.Mail;
                    interlocutores[indice].Cliente.Ruc = cliente.Ruc;
                    interlocutores[indice].Cliente.Telefono = cliente.Telefono;
                }
            }
            this.getView().getModel().setProperty("/interlocutores", interlocutores);
            this.getView().getModel().refresh();
        },       
        /** botones de cerrar popup **/
        //Cerrar Dialog Seleccionar Cliente
        onDocNuevoCloseBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").close();
        },        
        //Cerrar Dialog Seleccionar Cliente Resultado 
        onDocNuevoCloseSeleccionarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
        },        
        //Cerrar Dialog Seleccionar Clientes Resultado
        onDocNuevoCloseSeleccionarClienteLista: function () {
            this.getView().byId("dlg_DocNuevobuscarClienteLista_resultado").close();
        },              
        onDocNuevoCloseSeleccionarProfesional: function () {
            this.getView().byId("dlg_DocNuevobuscarProfesional_resultado").close();
        },
        onDlg_MensajeAvisoCopiarDatos: function () {
            this.getView().byId("dlg_MensajeAvisoCopiarDatos").close();
        },          
        /** utilitarios **/
        verificarEsRuc: function (ruc) {
            var rpta = (ruc.length === 11) ? "X" : "";
            return rpta;
        },        
        agregarOpcionBusquedaClientes: function (clientes, tipoInterlocutor, copiarDatos) {
            for (var indice in clientes) {
                clientes[indice].tipoInterlocutor = tipoInterlocutor;
                clientes[indice].copiarDatos = copiarDatos;
            }
        },  
        agregarOpcionTipoInterlocutor: function (clientes, tipoInterlocutor) {
            for (var indice in clientes) {
                clientes[indice].tipoInterlocutor = tipoInterlocutor;
            }
        },        
        agregarOpcionPosicion: function (profesionales, ubicacion) {
            for (var indice in profesionales) {
                profesionales[indice].ubicacion = ubicacion;
            }
        },
        /*         
         * Metodos de la vista de materiales
         */
        //Abrir Dialog para Agregar Producto
        onDocNuevodlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").open();
        },


        

        /** metodos de selecionar datos del popup **/
 onDocNuevoMasterProductosAdd: function () {
    var codigoMaterial = this.getView().byId("txt_codigo_anadir_material").getValue() ;
    var opcionMaterial = this.getView().byId("com_ambiente_anadir_material").getSelectedKey() ;
    var codigoAmbiente = this.getView().byId("com_opcion_anadir_material").getSelectedKey();
    var cantidad = this.getView().byId("txt_cantidad_anadir_material").getValue() ;
    
    if(codigoMaterial !=="" && opcionMaterial !=="" && codigoAmbiente !=="" ) {
        var nuevoMaterial = this.crearNuevoMaterial(codigoMaterial, opcionMaterial, codigoAmbiente, cantidad);
        var self = this;

        self.getView().byId("loadingControl").open();
        setTimeout(function(){
            var result = materialServices.anadirMaterialMasterDoc(nuevoMaterial);
            if (result.c === "s") {
                if (result.data.success) {
                    var materialSer = result.data.lstTotal[0];
                    var stockSer = result.data.lstStock;

                    if(material != null) {
                        var material = self.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                        var materiales = self.getView().getModel().getProperty("/listaMaterial");
                        materiales.push(material);
                        self.getView().getModel().setProperty("/listaMaterial/", materiales);                        
                    }

                    self.getView().getModel().refresh();
                    self.getView().byId("dlg_DocNuevoaddProducto").close();
                    self.getView().byId("lb_mensajeAviso1").setText("Material Añadido. Desea seguir añadiendo materiales?");
                    self.getView().byId("dlg_MensajeAviso1").open();
                    self.getView().byId("loadingControl").close(); 
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, { duration: 3000 });
                }
            } else {
                sap.m.MessageToast.show(result.m, { duration: 3000 });
            } 
            self.getView().byId("loadingControl").close();
        },1000);
    } else {
        MessageToast.show("No ha ingresado Ambiente y/o Opcion de Ambiente"); 
    }
},



        
        /** metodos de funcionalidad **/
        //Boton Añadir Producto del Master
       

        /** botones de cerrar popup **/
        onDocNuevoClosedlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").close();
        },
        onSiMensajeAviso1: function () {
            /*
            var objSeleccionado = this.getView().getModel().getProperty("/materialSelec");
            var listaDisplay = this.getView().getModel().getProperty("/listaMatAnadido");
            if (listaDisplay) {
                listaDisplay.push(objSeleccionado);
            } else {
                listaDisplay = [];
                listaDisplay.push(objSeleccionado);
            }
            this.getView().getModel().setProperty("/listaMatAnadido", listaDisplay);
            this.getView().getModel().refresh();
            */
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },
        onNoMensajeAviso1: function () {
            /*
            var objSeleccionado = this.getView().getModel().getProperty("/materialSelec");
            var listaDisplay = this.getView().getModel().getProperty("/listaMatAnadido");
            if (listaDisplay) {
                listaDisplay.push(objSeleccionado);
            } else {
                listaDisplay = [];
                listaDisplay.push(objSeleccionado);
            }
            this.getView().getModel().setProperty("/listaMatAnadido", listaDisplay);
            this.getView().getModel().refresh();
            */
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevobuscar").close();
            this.getView().byId("dlg_BuscarMateriales").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },        

        /** utilitarios **/
        crearNuevoMaterial: function (codigoMaterial, opcionMaterial, codigoAmbiente, cantidad) {
        var documento = this.getView().getModel().getProperty("/pedido");
        var solicitante = this.getView().getModel().getProperty("/cliente");
        var interlocutores = this.getView().getModel().getProperty("/interlocutores");
        var observaciones = this.getView().getModel().getProperty("/observaciones");
        
        //captar posicion del item dentro de la lista
        var listaMateriales = this.getView().getModel().getProperty("listaMaterial");
        var tamanoList = (listaMateriales === null) ? 10 : (listaMateriales.length + 1 ) * 10;
        var tipoDocumento = this.getView().byId("ListaDocNuevo").getSelectedItem().getBindingContext().getObject();

        //material 
        var nuevoMaterial = new Object();
        var pedido = new Object();
        var cliente = new Object();

        //cliente 
        cliente["1"]="1";
        cliente["10"]="1";
        cliente["15"]="1";
        cliente["20"]="";
        cliente["25"]="1";
        cliente["35"]="30";
        cliente.CODIG= "363351";//solicitante.CODIG ; //"87654321";
        cliente.APPAT= solicitante.APPAT ;
        cliente.APMAT=solicitante.APMAT ; 
        cliente.NOMBRE= solicitante.NOMBRE ;
        cliente.FECNAC= "2017-07-14T22:29:33.276Z";//solicitante.FECNAC ;
        cliente.GRAINS=solicitante.GRAINS ; //"10";
        cliente.SEXO=solicitante.SEXO ; 
        cliente.CIUDAD=solicitante.Ciudad ; //"140101";
        cliente.EDAD=0;//solicitante.EDAD ;
        cliente.RANGOED=solicitante.RANGOED ; 
        cliente.NIVELSE=solicitante.NIVELSE ; //"A";
        cliente.DIREC=solicitante.DIREC ; 

        //pedido
        pedido.id= 1498248940715;
        pedido.CodTipoDoc= tipoDocumento.Codigo;//this.getView().getModel().getProperty("/documentoSeleccionado/Codigo");
        pedido.CodTipoDocAnt="";
        pedido.Referencia="";
        pedido.OrgVentas=documento.OrgVentas;
        pedido.CanalDist= documento.CanalDist;
        pedido.CodOficina= documento.CodOficina;
        pedido.CondPago= documento.CondPago;
        pedido.Moneda= documento.Moneda;
        pedido.CondExp= documento.CondExp;
        pedido.FechaEntrega= "2017-07-14T22:29:33.276Z";documento.FechaEntrega;
        pedido.FechaReparto= "2017-07-14T22:29:33.276Z";documento.FechaReparto;
        pedido.TipoCambio= documento.TipoCambio;
        pedido.FechaFacturacion= "2017-07-14T22:29:33.276Z";documento.FechaFacturacion;
        pedido.CodigoBanco= documento.NombreBanco; 
        pedido.Motivo= documento.Motivo; 
        pedido.BloqueoEntrega= documento.BloqueoEntrega;
        pedido.BloqueoFactura= documento.BloqueoFactura;
        pedido.OrdenCompra= documento.OrdenCompra;
        pedido.FechaPedido= "2017-07-14T22:29:33.276Z";documento.FechaPedido;
        pedido.FechaValidez= "2017-07-14T22:29:33.276Z";documento.FechaValidez;
        pedido.Estado= "";
        pedido.nomProyecto= documento.nomProyecto;
        pedido.TipoVisita= documento.TipoVisita;
        pedido.cbxReembolsable=documento.Reenbolsable;
        pedido.dsctoAdicionalZD12= 0;
        pedido.dsctoAdicionalZD12tmp= 0;
        pedido.FechaPrecio= null;
        pedido.Mail= "";
        pedido.BonoCampania= "";
        pedido.RegaloCampania= "";
        pedido.Reenbolsable= documento.Reenbolsable;
        pedido.PedidoVenta1= "";
        pedido.PedidoVenta2= "";
        pedido.PedidoVenta3= "";
        pedido.PedidoVenta4= "";
        pedido.PedidoVisita1= "";
        pedido.PedidoVisita2= "";
        pedido.PedidoVisita3= "";
        pedido.PedidoVisita4= "";
        pedido.SubtotalImp= 0;
        pedido.TieneEntrega= false;
        pedido.DocOriginal= "";
        pedido.Znpiso= "";
        pedido.Ztransporte= "";
        pedido.Zasensor= false;
        pedido.Zncservicio= false;
        pedido.TieneKitCombo= false;
        pedido.NumPedido= "";
        pedido.NumPedidoCorto= "";
        pedido.FechaPedidoString= "";
        pedido.FechaValidezString= "";
        pedido.FechaEntregaString= "";
        pedido.CodCliente= solicitante.CODIG;
        pedido.CodClienteCorto= "";
        pedido.CodGrupoVend= "";
        pedido.Sector= "";
        pedido.SubTotal= 0;
        pedido.Igv= 0;
        pedido.Total= 0;
        pedido.TotalImp= 0;
        pedido.PesoTotal= 0;
        pedido.GrupoCond= "";
        pedido.Tratado= false;
        pedido.ClasePedidoCliente= "";
        pedido.ClaseDocumento= "";
        pedido.CodVendedor1= interlocutores.VE.Persona.CodPersona;
        pedido.NomVendedor1= interlocutores.VE.Persona.Descripcion;
        pedido.TotalConIgv= 0;
        pedido.textoAtencion= observaciones.ZP01.Descripcion;
        pedido.textoObsAdministrativas= observaciones.ZP05.Descripcion;
        pedido.textoRefFactura= observaciones.ZP06.Descripcion;
        pedido.textoRefDireccion= observaciones.ZP07.Descripcion;
        pedido.correo= "";
        pedido.codigoSolicitante= "";
        pedido.codigoDestFact= "";
        pedido.codigoResPago= "";
        pedido.nombreSolicitante= "";
        pedido.direccionSolicitante= "";
        pedido.codigoPostalSolicitante= "";
        pedido.telefonoSolicitante= "";
        pedido.nifSolicitante= "363351";
        pedido.codigoDestMerc= "";
        pedido.nombreDestMerc= "";
        pedido.direccionDestMerc= "";
        pedido.codigoPostalDestMerc= "";
        pedido.telefonoDestMerc= "";
        pedido.telefonoMovilDestMerc= "";
        pedido.nombreDestFact= "";
        pedido.direccionDestFact= "";
        pedido.codigoPostalDestFact= "";
        pedido.telefonoDestFact= "";
        pedido.nombreResPago= "";
        pedido.direccionResPago= "";
        pedido.codigoPostalResPago= "";
        pedido.telefonoResPago= "";
        pedido.nifResPago= "363351";
        pedido.codigoCliente= "3000000003";//solicitante.CODIG;
        pedido.nombreCliente= "JULIO CONTRERAS";//solicitante.NOMBRE + solicitante.APPAT + solicitante.APMAT ;
        pedido.direccionCliente= "CALLE HURON 209 RINCONADA DE L";//solicitante.DIREC;
        pedido.apePatSolicitante= "" ;                                            
        pedido.apeMatSolicitante= "";
        pedido.textoContacto= "";
        pedido.textoDatosAdicionalesCliente= "";
        pedido.textoTelefonos= "";
        pedido.textoDescripcionVisita= "";
        pedido.textoResultadoVisita= "";
        pedido.textoDescripcionServInstalacion= "";
        pedido.datosCliente = cliente;
        pedido.listaPre= "";
        pedido.TotalDcto= 0;
        pedido.codProyecto= documento.codProyecto;
        pedido.codVersion= documento.codVersion;
        pedido.GrupoForecast= documento.GrupoForecast;
        pedido.TipoForecast= documento.TipoForecast;
        pedido.NoImpFac= "";
        pedido.Certificado= documento.Certificado;
        pedido.FechaVisita= documento.FechaVisita;


        //pedido
        nuevoMaterial.codigo = codigoMaterial,
        nuevoMaterial.cantidad = cantidad;
        nuevoMaterial.CodAmbiente = codigoAmbiente;
        nuevoMaterial.Opcion =opcionMaterial;
        //nuevoMaterial.UserId =;
        //nuevoMaterial.PwdId =;
        //nuevoMaterial.Id =;
        //nuevoMaterial.GrpVend =;
        //nuevoMaterial.Descripcion =;
        //nuevoMaterial.CodigoVendedor =;
        //nuevoMaterial.OrgVentas =;
        //nuevoMaterial.CanalDist =;
        //nuevoMaterial.OfVentas =;
        nuevoMaterial.añadirForm = 1;
        nuevoMaterial.posNuevo = tamanoList;
        nuevoMaterial.objPedido = JSON.stringify(pedido);
        nuevoMaterial.cantidadtmp = cantidad;
        nuevoMaterial.ambiente = codigoAmbiente;
        nuevoMaterial.desamb = this.getView().byId("com_ambiente_anadir_material").getSelectedItem().getText();
        nuevoMaterial.opcamb = opcionMaterial;
        nuevoMaterial.auart = tipoDocumento.Codigo;//this.getView().getModel().getProperty("/documentoSeleccionado/Codigo") ;   
        return nuevoMaterial;
        },

        agregarMaterialNuevo: function (materialSer,stockSer,cantidad) {
            var tamanoList = (this.getView().byId("list_listaMasterMateriales").getItems().length + 1)*10;
            var pedido  = this.getView().getModel().getProperty("/pedido") ;
            var stockMayor = stockSer[stockSer.length-1];

            var material = materialSer;
            material.CodCentro = stockMayor.CodCentro;
            material.CodCentro = stockMayor.CodCentro;
            material.CodLote = stockMayor.CodLote;
            material.DescCentro = stockMayor.DescCentro;
            material.DescAlmacen = stockMayor.DescAlmacen;
            material.fullName = stockMayor.fullName;

            var reparto = new Object();
            reparto.matPosicion = materialSer.PosicionCorto ;
            reparto.id = tamanoList/10;
            reparto.TipoReparto = "" ;
            reparto.Pos = materialSer.Pos ;
            reparto.PosCorto = materialSer.PosCorto ;
            reparto.FechaEntrega = pedido.FechaEntrega ;
            reparto.CantPed = cantidad ;
            reparto.CantConf = cantidad;
            reparto.CodUMedida = "" ;
            material.Reparto = reparto;
            
            return reparto;
        },



        /***      */
        
        
        onBtnGuardarDocumento: function () {
            var pedido = this.getView().getModel().getProperty("/pedido");
            var observaciones = this.getView().getModel().getProperty("/observaciones");
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var profesionales = this.getView().getModel().getProperty("/profesionales");
            var cliente = this.getView().getModel().getProperty("/cliente");
            var preguntas = this.getView().getModel().getProperty("/preguntas");
        },
























        
        
        
        
        
        
        onBtnGuardarDocumento1: function () {
            var pedido = this.getView().getModel().setProperty("/pedido");
            //llenado incorrecto
            var codigoCliente = "0000101317";
            var nombreCliente = "Erick De La Cruz De La Cruz";
            var OrgVentas = "1000";
            var CanalDist = "10";
            var CodOficina = "1010";
            var CondPago = "E000";
            var Moneda = "PEN";
            var TipoCambio = "3.282";
            var dsctoAdicionalZD12 = "";
            var pesoTotal = "0.300 KG";
            var FechaFacturacion = "2017-06-22T18:23:18.420Z";
            var GrupoCond = "";
            var Motivo = "";
            var BloqueoFactura = "";
            var BloqueoEntrega = "";
            var OrdenCompra = "";
            var FechaPedido = "2017-06-22T18:23:18.420Z";
            var FechaValidez = "2017-06-29T18:23:18.439Z";
            var FechaEntrega = "2017-06-22T18:23:18.420Z";
            var CondExp = "03";
            var FechaReparto = "";
            var nomProyecto = "";
            var codProyecto = "";
            var codVersion = "";
            var TipoVisita = "";
            var cbxReembolsable = "";
            var GrupoForecast = "01";
            var TipoForecast = "";
            var Certificado = "";
            var FechaVisita = "";
            var listaMatJson = []; //Se crea de acuerdo a cuantos materiales se agregan en detalles Productos
            var obj1listaMatJson = {};
            obj1listaMatJson.id = 1;
            obj1listaMatJson.CodMaterial = "000000000011000004";
            obj1listaMatJson.CodUMedida = "UN";
            obj1listaMatJson.Descripcion = "";
            obj1listaMatJson.Jerarquia = "";
            obj1listaMatJson.ValorRendimiento = 0;
            obj1listaMatJson.TipoMaterial = "NA3";
            obj1listaMatJson.EsFlete = false;
            obj1listaMatJson.EsEstiba = false;
            obj1listaMatJson.EspecialServ = false;
            obj1listaMatJson.Tipo = "Z001";
            obj1listaMatJson.CodMaterialCorto = "11000004";
            obj1listaMatJson.TieneServ = false;
            obj1listaMatJson.Rendimiento = "-";
            obj1listaMatJson.DescMovil = "10 - 11000004 VAINSA NVA ASIA D TEL BIDET TUB/MET 1.2MT C/SOP VAINSA NVA ASIA D TELBIDET TUB/MET 1.2 - 1 - 247.87";
            obj1listaMatJson.Descontinuado = "";
            obj1listaMatJson.UMedidaRendimiendo = "";
            obj1listaMatJson.DescMaterial = "VAINSA NVA ASIA D TEL BIDET TUB/MET 1.2MT C/SOP VAINSA NVA ASIA D TELBIDET TUB/MET 1.2";
            obj1listaMatJson.PrecioUnit = 0;
            obj1listaMatJson.Peso = 0.3;
            obj1listaMatJson.Stock = 0;
            obj1listaMatJson.Mstae = "";
            obj1listaMatJson.Vdscto = "0";
            obj1listaMatJson.StatusDespacho = "";
            obj1listaMatJson.StockPos = "";
            obj1listaMatJson.Posicion = "000010";
            obj1listaMatJson.Cantidad = 1;
            obj1listaMatJson.CodCentro = "1080";
            obj1listaMatJson.CodAlmacen = "0001";
            obj1listaMatJson.CodLote = "1000LD";
            obj1listaMatJson.PrecioSinIGV = 0;
            obj1listaMatJson.DsctoMontTotal = 0;
            obj1listaMatJson.MotivoRechazo = "";
            obj1listaMatJson.TipoPosAnt = "";
            obj1listaMatJson.CodGrupoMat = "07";
            obj1listaMatJson.Opcion = "02";
            obj1listaMatJson.Reembolsable = "";
            obj1listaMatJson.Zservicio = true;
            obj1listaMatJson.ContentID = "1011000004";
            obj1listaMatJson.DescMaterialTicketera = "VAINSA NVA ASIA D TEL BIDET TUB/MET";
            obj1listaMatJson.PrioridadEntrega = "03";
            obj1listaMatJson.FechaCantConf = "2017-06-22T05:00:00.000Z";
            obj1listaMatJson.FechaCantConfStr = "22/06/2017";
            obj1listaMatJson.PosSup = "000000";
            obj1listaMatJson.PosSupCorto = "";
            obj1listaMatJson.TipoPosicion = "Z006";
            obj1listaMatJson.CambAlmacen = false;
            obj1listaMatJson.CantComp = 0;
            obj1listaMatJson.PrecioTotal = 210.06;
            obj1listaMatJson.PrecioUnitario = 210.06;
            obj1listaMatJson.Total = 247.87;
            obj1listaMatJson.IgvUnitario = 18;
            obj1listaMatJson.IgvTotal = 37.81;
            obj1listaMatJson.TotalDctos = 0;
            obj1listaMatJson.SubTotal = 210.06;
            obj1listaMatJson.CantConfirmada = 0;
            obj1listaMatJson.PesoNeto = 0.3;
            obj1listaMatJson.PrecioConIGV = 0;
            obj1listaMatJson.TotalImpresion = 0;
            obj1listaMatJson.DescCentro = "Tienda Arequipa";
            obj1listaMatJson.DescAlmacen = "0001 (Tienda)";
            obj1listaMatJson.FechaEntregaString = "22/06/2017";
            obj1listaMatJson.Reparto = "03 22/06/17";
            obj1listaMatJson.TotPercep = 4.96;
            obj1listaMatJson.link = "http://140.20.0.7/Catalogo/sistema/productos.php?sku=11000004";
            obj1listaMatJson.DesGrupoMat = "Baño Principal";
            obj1listaMatJson.DivisionRendimiento = 0;
            obj1listaMatJson.mod = "";
            obj1listaMatJson.PosicionCorto = "10";
            obj1listaMatJson.SubTotalLista = 210.06;
            obj1listaMatJson.fullName = "1080 Tienda Arequipa / 0001 / 1000LD";
            listaMatJson.push(obj1listaMatJson);
            var listaMatJsonLleno = JSON.stringify(listaMatJson);
            var listaDsctoJson = [];
            var obj1listaDsctoJson = {};
            obj1listaDsctoJson.matPosicion = 10;
            obj1listaDsctoJson.id = 1;
            obj1listaDsctoJson.Posicion = "";
            obj1listaDsctoJson.Condicion = "ZD00";
            obj1listaDsctoJson.Importe = 0;
            obj1listaDsctoJson.ImporteAnterior = 0;
            obj1listaDsctoJson.Moneda = "";
            obj1listaDsctoJson.Valor = 0;
            obj1listaDsctoJson.Denominacion = "Dcto. DECOR %";
            obj1listaDsctoJson.esPorcentaje = true;
            obj1listaDsctoJson.LimiteInferior = 55;
            obj1listaDsctoJson.Recalcular = "";
            var obj2listaDsctoJson = {};
            obj2listaDsctoJson.matPosicion = 10;
            obj2listaDsctoJson.id = 2;
            obj2listaDsctoJson.Posicion = "";
            obj2listaDsctoJson.Condicion = "ZD01";
            obj2listaDsctoJson.Importe = 0;
            obj2listaDsctoJson.ImporteAnterior = 0;
            obj2listaDsctoJson.Moneda = "";
            obj2listaDsctoJson.Valor = 0;
            obj2listaDsctoJson.Denominacion = "";
            obj2listaDsctoJson.esPorcentaje = false;
            obj2listaDsctoJson.LimiteInferior = 0;
            obj2listaDsctoJson.Recalcular = "";
            var obj3listaDsctoJson = {};
            obj3listaDsctoJson.matPosicion = 10;
            obj3listaDsctoJson.id = 3;
            obj3listaDsctoJson.Posicion = "";
            obj3listaDsctoJson.Condicion = "ZD02";
            obj3listaDsctoJson.Importe = 0;
            obj3listaDsctoJson.ImporteAnterior = 0;
            obj3listaDsctoJson.Moneda = "";
            obj3listaDsctoJson.Valor = 0;
            obj3listaDsctoJson.Denominacion = "Dscto Adic Cond Pago";
            obj3listaDsctoJson.esPorcentaje = true;
            obj3listaDsctoJson.LimiteInferior = 0;
            obj3listaDsctoJson.Recalcular = "";
            var obj4listaDsctoJson = {};
            obj4listaDsctoJson.matPosicion = 10;
            obj4listaDsctoJson.id = 4;
            obj4listaDsctoJson.Posicion = "";
            obj4listaDsctoJson.Condicion = "ZD03";
            obj4listaDsctoJson.Importe = 0;
            obj4listaDsctoJson.ImporteAnterior = 0;
            obj4listaDsctoJson.Moneda = "";
            obj4listaDsctoJson.Valor = 0;
            obj4listaDsctoJson.Denominacion = "Dcto. Estadistico";
            obj4listaDsctoJson.esPorcentaje = true;
            obj4listaDsctoJson.LimiteInferior = 0;
            obj4listaDsctoJson.Recalcular = "";
            var obj5listaDsctoJson = {};
            obj5listaDsctoJson.matPosicion = 10;
            obj5listaDsctoJson.id = 5;
            obj5listaDsctoJson.Posicion = "";
            obj5listaDsctoJson.Condicion = "ZD04";
            obj5listaDsctoJson.Importe = 0;
            obj5listaDsctoJson.ImporteAnterior = 0;
            obj5listaDsctoJson.Moneda = "";
            obj5listaDsctoJson.Valor = 0;
            obj5listaDsctoJson.Denominacion = "Dcto. Gerencia %";
            obj5listaDsctoJson.esPorcentaje = true;
            obj5listaDsctoJson.LimiteInferior = 0;
            obj5listaDsctoJson.Recalcular = "";
            var obj6listaDsctoJson = {};
            obj6listaDsctoJson.matPosicion = 10;
            obj6listaDsctoJson.id = 6;
            obj6listaDsctoJson.Posicion = "";
            obj6listaDsctoJson.Condicion = "ZD05";
            obj6listaDsctoJson.Importe = 0;
            obj6listaDsctoJson.ImporteAnterior = 0;
            obj6listaDsctoJson.Moneda = "";
            obj6listaDsctoJson.Valor = 0;
            obj6listaDsctoJson.Denominacion = "Dcto. Gerenc Importe";
            obj6listaDsctoJson.esPorcentaje = true;
            obj6listaDsctoJson.LimiteInferior = 0;
            obj6listaDsctoJson.Recalcular = "";
            var obj7listaDsctoJson = {};
            obj7listaDsctoJson.matPosicion = 10;
            obj7listaDsctoJson.id = 7;
            obj7listaDsctoJson.Posicion = "";
            obj7listaDsctoJson.Condicion = "ZD06";
            obj7listaDsctoJson.Importe = 0;
            obj7listaDsctoJson.ImporteAnterior = 0;
            obj7listaDsctoJson.Moneda = "";
            obj7listaDsctoJson.Valor = 0;
            obj7listaDsctoJson.Denominacion = "";
            obj7listaDsctoJson.esPorcentaje = false;
            obj7listaDsctoJson.LimiteInferior = 0;
            obj7listaDsctoJson.Recalcular = "";
            var obj8listaDsctoJson = {};
            obj8listaDsctoJson.matPosicion = 10;
            obj8listaDsctoJson.id = 8;
            obj8listaDsctoJson.Posicion = "";
            obj8listaDsctoJson.Condicion = "ZD07";
            obj8listaDsctoJson.Importe = 0;
            obj8listaDsctoJson.ImporteAnterior = 0;
            obj8listaDsctoJson.Moneda = "";
            obj8listaDsctoJson.Valor = 0;
            obj8listaDsctoJson.Denominacion = "";
            obj8listaDsctoJson.esPorcentaje = false;
            obj8listaDsctoJson.LimiteInferior = 0;
            obj8listaDsctoJson.Recalcular = "";
            var obj9listaDsctoJson = {};
            obj9listaDsctoJson.matPosicion = 10;
            obj9listaDsctoJson.id = 9;
            obj9listaDsctoJson.Posicion = "";
            obj9listaDsctoJson.Condicion = "ZD08";
            obj9listaDsctoJson.Importe = 0;
            obj9listaDsctoJson.ImporteAnterior = 0;
            obj9listaDsctoJson.Moneda = "";
            obj9listaDsctoJson.Valor = 0;
            obj9listaDsctoJson.Denominacion = "";
            obj9listaDsctoJson.esPorcentaje = false;
            obj9listaDsctoJson.LimiteInferior = 0;
            obj9listaDsctoJson.Recalcular = "";
            var obj10listaDsctoJson = {};
            obj10listaDsctoJson.matPosicion = 10;
            obj10listaDsctoJson.id = 10;
            obj10listaDsctoJson.Posicion = "";
            obj10listaDsctoJson.Condicion = "ZD09";
            obj10listaDsctoJson.Importe = 0;
            obj10listaDsctoJson.ImporteAnterior = 0;
            obj10listaDsctoJson.Moneda = "";
            obj10listaDsctoJson.Valor = 0;
            obj10listaDsctoJson.Denominacion = "Dcto. DECOR % AdmTda";
            obj10listaDsctoJson.esPorcentaje = true;
            obj10listaDsctoJson.LimiteInferior = 8;
            obj10listaDsctoJson.Recalcular = "";
            var obj11listaDsctoJson = {};
            obj11listaDsctoJson.matPosicion = 10;
            obj11listaDsctoJson.id = 11;
            obj11listaDsctoJson.Posicion = "";
            obj11listaDsctoJson.Condicion = "ZD11";
            obj11listaDsctoJson.Importe = 0;
            obj11listaDsctoJson.ImporteAnterior = 0;
            obj11listaDsctoJson.Moneda = "";
            obj11listaDsctoJson.Valor = 0;
            obj11listaDsctoJson.Denominacion = "Dcto. Jefe Prod. %";
            obj11listaDsctoJson.esPorcentaje = true;
            obj11listaDsctoJson.LimiteInferior = 25;
            obj11listaDsctoJson.Recalcular = "";
            var obj12listaDsctoJson = {};
            obj12listaDsctoJson.matPosicion = 10;
            obj12listaDsctoJson.id = 12;
            obj12listaDsctoJson.Posicion = "";
            obj12listaDsctoJson.Condicion = "ZD12";
            obj12listaDsctoJson.Importe = 0;
            obj12listaDsctoJson.ImporteAnterior = 0;
            obj12listaDsctoJson.Moneda = "";
            obj12listaDsctoJson.Valor = 0;
            obj12listaDsctoJson.Denominacion = "Dcto. Adicional";
            obj12listaDsctoJson.esPorcentaje = true;
            obj12listaDsctoJson.LimiteInferior = 0;
            obj12listaDsctoJson.Recalcular = "";
            var obj13listaDsctoJson = {};
            obj13listaDsctoJson.matPosicion = 10;
            obj13listaDsctoJson.id = 13;
            obj13listaDsctoJson.Posicion = "";
            obj13listaDsctoJson.Condicion = "ZP01";
            obj13listaDsctoJson.Importe = 0;
            obj13listaDsctoJson.ImporteAnterior = 0;
            obj13listaDsctoJson.Moneda = "";
            obj13listaDsctoJson.Valor = 0;
            obj13listaDsctoJson.Denominacion = " Diferencia ";
            obj13listaDsctoJson.esPorcentaje = false;
            obj13listaDsctoJson.LimiteInferior = 0;
            obj13listaDsctoJson.Recalcular = "";
            var obj14listaDsctoJson = {};
            obj14listaDsctoJson.matPosicion = 10;
            obj14listaDsctoJson.id = 14;
            obj14listaDsctoJson.Posicion = "";
            obj14listaDsctoJson.Condicion = "ZP08";
            obj14listaDsctoJson.Importe = 0;
            obj14listaDsctoJson.ImporteAnterior = 0;
            obj14listaDsctoJson.Moneda = "";
            obj14listaDsctoJson.Valor = 0;
            obj14listaDsctoJson.Denominacion = " Pr.Srv.Transp.Manual ";
            obj14listaDsctoJson.esPorcentaje = false;
            obj14listaDsctoJson.LimiteInferior = 0;
            obj14listaDsctoJson.Recalcular = "";
            var obj15listaDsctoJson = {};
            obj15listaDsctoJson.matPosicion = 10;
            obj15listaDsctoJson.id = 15;
            obj15listaDsctoJson.Posicion = "";
            obj15listaDsctoJson.Condicion = "ZD13";
            obj15listaDsctoJson.Importe = 0;
            obj15listaDsctoJson.ImporteAnterior = 0;
            obj15listaDsctoJson.Moneda = "";
            obj15listaDsctoJson.Valor = 0;
            obj15listaDsctoJson.Denominacion = "Dcto. Esp. Tienda %";
            obj15listaDsctoJson.esPorcentaje = true;
            obj15listaDsctoJson.LimiteInferior = 0;
            obj15listaDsctoJson.Recalcular = "";
            var obj16listaDsctoJson = {};
            obj16listaDsctoJson.matPosicion = 10;
            obj16listaDsctoJson.id = 16;
            obj16listaDsctoJson.Posicion = "";
            obj16listaDsctoJson.Condicion = "ZDCT";
            obj16listaDsctoJson.Importe = 0;
            obj16listaDsctoJson.ImporteAnterior = 0;
            obj16listaDsctoJson.Moneda = "";
            obj16listaDsctoJson.Valor = 0;
            obj16listaDsctoJson.Denominacion = "Dcto. Certificados %";
            obj16listaDsctoJson.esPorcentaje = true;
            obj16listaDsctoJson.LimiteInferior = 0;
            obj16listaDsctoJson.Recalcular = "";
            var obj17listaDsctoJson = {};
            obj17listaDsctoJson.matPosicion = 10;
            obj17listaDsctoJson.id = 17;
            obj17listaDsctoJson.Posicion = "";
            obj17listaDsctoJson.Condicion = "ZP00";
            obj17listaDsctoJson.Importe = 0;
            obj17listaDsctoJson.ImporteAnterior = 0;
            obj17listaDsctoJson.Moneda = "";
            obj17listaDsctoJson.Valor = 210.06;
            obj17listaDsctoJson.Denominacion = "";
            obj17listaDsctoJson.esPorcentaje = false;
            obj17listaDsctoJson.LimiteInferior = 0;
            obj17listaDsctoJson.Recalcular = "";
            var obj18listaDsctoJson = {};
            obj18listaDsctoJson.matPosicion = 10;
            obj18listaDsctoJson.id = 18;
            obj18listaDsctoJson.Posicion = "";
            obj18listaDsctoJson.Condicion = "ZP02";
            obj18listaDsctoJson.Importe = 0;
            obj18listaDsctoJson.ImporteAnterior = 0;
            obj18listaDsctoJson.Moneda = "";
            obj18listaDsctoJson.Valor = 0;
            obj18listaDsctoJson.Denominacion = "";
            obj18listaDsctoJson.esPorcentaje = false;
            obj18listaDsctoJson.LimiteInferior = 0;
            obj18listaDsctoJson.Recalcular = "";
            /////////////////////////////////////////////
            /*
             var obj19listaDsctoJson = {};
             obj19listaDsctoJson.matPosicion = 10 ;
             obj19listaDsctoJson.id = 19;
             obj19listaDsctoJson.Posicion = "" ;
             obj19listaDsctoJson.Condicion = "" ;
             obj19listaDsctoJson.Importe = 0 ;
             obj19listaDsctoJson.ImporteAnterior = 0 ;
             obj19listaDsctoJson.Moneda = "" ;
             obj19listaDsctoJson.Valor = 0 ;
             obj19listaDsctoJson.Denominacion = "" ;
             obj19listaDsctoJson.esPorcentaje = "" ;
             obj19listaDsctoJson.LimiteInferior = "" ;
             obj19listaDsctoJson.Recalcular = "" ;
             
             var obj20listaDsctoJson = {};
             obj20listaDsctoJson.matPosicion = 10 ;
             obj20listaDsctoJson.id = 20;
             obj20listaDsctoJson.Posicion = "" ;
             obj20listaDsctoJson.Condicion = "" ;
             obj20listaDsctoJson.Importe = 0 ;
             obj20listaDsctoJson.ImporteAnterior = 0 ;
             obj20listaDsctoJson.Moneda = "" ;
             obj20listaDsctoJson.Valor = 0 ;
             obj20listaDsctoJson.Denominacion = "" ;
             obj20listaDsctoJson.esPorcentaje = "" ;
             obj20listaDsctoJson.LimiteInferior = "" ;
             obj20listaDsctoJson.Recalcular = "" ;
             
             var obj21listaDsctoJson = {};
             obj21listaDsctoJson.matPosicion = 10 ;
             obj21listaDsctoJson.id = 21;
             obj21listaDsctoJson.Posicion = "" ;
             obj21listaDsctoJson.Condicion = "" ;
             obj21listaDsctoJson.Importe = 0 ;
             obj21listaDsctoJson.ImporteAnterior = 0 ;
             obj21listaDsctoJson.Moneda = "" ;
             obj21listaDsctoJson.Valor = 0 ;
             obj21listaDsctoJson.Denominacion = "" ;
             obj21listaDsctoJson.esPorcentaje = "" ;
             obj21listaDsctoJson.LimiteInferior = "" ;
             obj21listaDsctoJson.Recalcular = "" ;
             
             var obj22listaDsctoJson = {};
             obj22listaDsctoJson.matPosicion = 10 ;
             obj22listaDsctoJson.id = 22;
             obj22listaDsctoJson.Posicion = "" ;
             obj22listaDsctoJson.Condicion = "" ;
             obj22listaDsctoJson.Importe = 0 ;
             obj22listaDsctoJson.ImporteAnterior = 0 ;
             obj22listaDsctoJson.Moneda = "" ;
             obj22listaDsctoJson.Valor = 0 ;
             obj22listaDsctoJson.Denominacion = "" ;
             obj22listaDsctoJson.esPorcentaje = "" ;
             obj22listaDsctoJson.LimiteInferior = "" ;
             obj22listaDsctoJson.Recalcular = "" ;
             
             
             var obj23listaDsctoJson = {};
             obj23listaDsctoJson.matPosicion = 10 ;
             obj23listaDsctoJson.id = 23;
             obj23listaDsctoJson.Posicion = "" ;
             obj23listaDsctoJson.Condicion = "" ;
             obj23listaDsctoJson.Importe = 0 ;
             obj23listaDsctoJson.ImporteAnterior = 0 ;
             obj23listaDsctoJson.Moneda = "" ;
             obj23listaDsctoJson.Valor = 0 ;
             obj23listaDsctoJson.Denominacion = "" ;
             obj23listaDsctoJson.esPorcentaje = "" ;
             obj23listaDsctoJson.LimiteInferior = "" ;
             obj23listaDsctoJson.Recalcular = "" ;
             
             var obj24listaDsctoJson = {};
             obj24listaDsctoJson.matPosicion = 10 ;
             obj24listaDsctoJson.id = 24;
             obj24listaDsctoJson.Posicion = "" ;
             obj24listaDsctoJson.Condicion = "" ;
             obj24listaDsctoJson.Importe = 0 ;
             obj24listaDsctoJson.ImporteAnterior = 0 ;
             obj24listaDsctoJson.Moneda = "" ;
             obj24listaDsctoJson.Valor = 0 ;
             obj24listaDsctoJson.Denominacion = "" ;
             obj24listaDsctoJson.esPorcentaje = "" ;
             obj24listaDsctoJson.LimiteInferior = "" ;
             obj24listaDsctoJson.Recalcular = "" ;
             
             var obj25listaDsctoJson = {};
             obj25listaDsctoJson.matPosicion = 10 ;
             obj25listaDsctoJson.id = 25;
             obj25listaDsctoJson.Posicion = "" ;
             obj25listaDsctoJson.Condicion = "" ;
             obj25listaDsctoJson.Importe = 0 ;
             obj25listaDsctoJson.ImporteAnterior = 0 ;
             obj25listaDsctoJson.Moneda = "" ;
             obj25listaDsctoJson.Valor = 0 ;
             obj25listaDsctoJson.Denominacion = "" ;
             obj25listaDsctoJson.esPorcentaje = "" ;
             obj25listaDsctoJson.LimiteInferior = "" ;
             obj25listaDsctoJson.Recalcular = "" ;
             
             var obj26listaDsctoJson = {};
             obj26listaDsctoJson.matPosicion = 10 ;
             obj26listaDsctoJson.id = 26;
             obj26listaDsctoJson.Posicion = "" ;
             obj26listaDsctoJson.Condicion = "" ;
             obj26listaDsctoJson.Importe = 0 ;
             obj26listaDsctoJson.ImporteAnterior = 0 ;
             obj26listaDsctoJson.Moneda = "" ;
             obj26listaDsctoJson.Valor = 0 ;
             obj26listaDsctoJson.Denominacion = "" ;
             obj26listaDsctoJson.esPorcentaje = "" ;
             obj26listaDsctoJson.LimiteInferior = "" ;
             obj26listaDsctoJson.Recalcular = "" ;
             
             
             var obj27listaDsctoJson = {};
             obj27listaDsctoJson.matPosicion = 10 ;
             obj27listaDsctoJson.id = 27;
             obj27listaDsctoJson.Posicion = "" ;
             obj27listaDsctoJson.Condicion = "" ;
             obj27listaDsctoJson.Importe = 0 ;
             obj27listaDsctoJson.ImporteAnterior = 0 ;
             obj27listaDsctoJson.Moneda = "" ;
             obj27listaDsctoJson.Valor = 0 ;
             obj27listaDsctoJson.Denominacion = "" ;
             obj27listaDsctoJson.esPorcentaje = "" ;
             obj27listaDsctoJson.LimiteInferior = "" ;
             obj27listaDsctoJson.Recalcular = "" ;
             
             
             var obj28listaDsctoJson = {};
             obj28listaDsctoJson.matPosicion = 10 ;
             obj28listaDsctoJson.id = 28;
             obj28listaDsctoJson.Posicion = "" ;
             obj28listaDsctoJson.Condicion = "" ;
             obj28listaDsctoJson.Importe = 0 ;
             obj28listaDsctoJson.ImporteAnterior = 0 ;
             obj28listaDsctoJson.Moneda = "" ;
             obj28listaDsctoJson.Valor = 0 ;
             obj28listaDsctoJson.Denominacion = "" ;
             obj28listaDsctoJson.esPorcentaje = "" ;
             obj28listaDsctoJson.LimiteInferior = "" ;
             obj28listaDsctoJson.Recalcular = "" ;
             
             var obj29listaDsctoJson = {};
             obj29listaDsctoJson.matPosicion = 10 ;
             obj29listaDsctoJson.id = 29;
             obj29listaDsctoJson.Posicion = "" ;
             obj29listaDsctoJson.Condicion = "" ;
             obj29listaDsctoJson.Importe = 0 ;
             obj29listaDsctoJson.ImporteAnterior = 0 ;
             obj29listaDsctoJson.Moneda = "" ;
             obj29listaDsctoJson.Valor = 0 ;
             obj29listaDsctoJson.Denominacion = "" ;
             obj29listaDsctoJson.esPorcentaje = "" ;
             obj29listaDsctoJson.LimiteInferior = "" ;
             obj29listaDsctoJson.Recalcular = "" ;
             
             
             var obj30listaDsctoJson = {};
             obj30listaDsctoJson.matPosicion = 10 ;
             obj30listaDsctoJson.id = 30;
             obj30listaDsctoJson.Posicion = "" ;
             obj30listaDsctoJson.Condicion = "" ;
             obj30listaDsctoJson.Importe = 0 ;
             obj30listaDsctoJson.ImporteAnterior = 0 ;
             obj30listaDsctoJson.Moneda = "" ;
             obj30listaDsctoJson.Valor = 0 ;
             obj30listaDsctoJson.Denominacion = "" ;
             obj30listaDsctoJson.esPorcentaje = "" ;
             obj30listaDsctoJson.LimiteInferior = "" ;
             obj30listaDsctoJson.Recalcular = "" ;
             
             
             var obj31listaDsctoJson = {};
             obj31listaDsctoJson.matPosicion = 10 ;
             obj31listaDsctoJson.id = 31;
             obj31listaDsctoJson.Posicion = "" ;
             obj31listaDsctoJson.Condicion = "" ;
             obj31listaDsctoJson.Importe = 0 ;
             obj31listaDsctoJson.ImporteAnterior = 0 ;
             obj31listaDsctoJson.Moneda = "" ;
             obj31listaDsctoJson.Valor = 0 ;
             obj31listaDsctoJson.Denominacion = "" ;
             obj31listaDsctoJson.esPorcentaje = "" ;
             obj31listaDsctoJson.LimiteInferior = "" ;
             obj31listaDsctoJson.Recalcular = "" ;
             
             var obj32listaDsctoJson = {};
             obj32listaDsctoJson.matPosicion = 10 ;
             obj32listaDsctoJson.id = 32;
             obj32listaDsctoJson.Posicion = "" ;
             obj32listaDsctoJson.Condicion = "" ;
             obj32listaDsctoJson.Importe = 0 ;
             obj32listaDsctoJson.ImporteAnterior = 0 ;
             obj32listaDsctoJson.Moneda = "" ;
             obj32listaDsctoJson.Valor = 0 ;
             obj32listaDsctoJson.Denominacion = "" ;
             obj32listaDsctoJson.esPorcentaje = "" ;
             obj32listaDsctoJson.LimiteInferior = "" ;
             obj32listaDsctoJson.Recalcular = "" ;
             
             
             var obj33listaDsctoJson = {};
             obj33listaDsctoJson.matPosicion = 10 ;
             obj33listaDsctoJson.id = 33;
             obj33listaDsctoJson.Posicion = "" ;
             obj33listaDsctoJson.Condicion = "" ;
             obj33listaDsctoJson.Importe = 0 ;
             obj33listaDsctoJson.ImporteAnterior = 0 ;
             obj33listaDsctoJson.Moneda = "" ;
             obj33listaDsctoJson.Valor = 0 ;
             obj33listaDsctoJson.Denominacion = "" ;
             obj33listaDsctoJson.esPorcentaje = "" ;
             obj33listaDsctoJson.LimiteInferior = "" ;
             obj33listaDsctoJson.Recalcular = "" ;
             
             
             var obj34listaDsctoJson = {};
             obj34listaDsctoJson.matPosicion = 10 ;
             obj34listaDsctoJson.id = 34;
             obj34listaDsctoJson.Posicion = "" ;
             obj34listaDsctoJson.Condicion = "" ;
             obj34listaDsctoJson.Importe = 0 ;
             obj34listaDsctoJson.ImporteAnterior = 0 ;
             obj34listaDsctoJson.Moneda = "" ;
             obj34listaDsctoJson.Valor = 0 ;
             obj34listaDsctoJson.Denominacion = "" ;
             obj34listaDsctoJson.esPorcentaje = "" ;
             obj34listaDsctoJson.LimiteInferior = "" ;
             obj34listaDsctoJson.Recalcular = "" ;
             
             
             var obj35listaDsctoJson = {};
             obj35listaDsctoJson.matPosicion = 10 ;
             obj35listaDsctoJson.id = 35;
             obj35listaDsctoJson.Posicion = "" ;
             obj35listaDsctoJson.Condicion = "" ;
             obj35listaDsctoJson.Importe = 0 ;
             obj35listaDsctoJson.ImporteAnterior = 0 ;
             obj35listaDsctoJson.Moneda = "" ;
             obj35listaDsctoJson.Valor = 0 ;
             obj35listaDsctoJson.Denominacion = "" ;
             obj35listaDsctoJson.esPorcentaje = "" ;
             obj35listaDsctoJson.LimiteInferior = "" ;
             obj35listaDsctoJson.Recalcular = "" ;
             
             
             var obj36listaDsctoJson = {};
             obj36listaDsctoJson.matPosicion = 10 ;
             obj36listaDsctoJson.id = 36;
             obj36listaDsctoJson.Posicion = "" ;
             obj36listaDsctoJson.Condicion = "" ;
             obj36listaDsctoJson.Importe = 0 ;
             obj36listaDsctoJson.ImporteAnterior = 0 ;
             obj36listaDsctoJson.Moneda = "" ;
             obj36listaDsctoJson.Valor = 0 ;
             obj36listaDsctoJson.Denominacion = "" ;
             obj36listaDsctoJson.esPorcentaje = "" ;
             obj36listaDsctoJson.LimiteInferior = "" ;
             obj36listaDsctoJson.Recalcular = "" ;
             
             
             var obj37listaDsctoJson = {};
             obj37listaDsctoJson.matPosicion = 10 ;
             obj37listaDsctoJson.id = 37;
             obj37listaDsctoJson.Posicion = "" ;
             obj37listaDsctoJson.Condicion = "" ;
             obj37listaDsctoJson.Importe = 0 ;
             obj37listaDsctoJson.ImporteAnterior = 0 ;
             obj37listaDsctoJson.Moneda = "" ;
             obj37listaDsctoJson.Valor = 0 ;
             obj37listaDsctoJson.Denominacion = "" ;
             obj37listaDsctoJson.esPorcentaje = "" ;
             obj37listaDsctoJson.LimiteInferior = "" ;
             obj37listaDsctoJson.Recalcular = "" ;
             
             
             var obj38listaDsctoJson = {};
             obj38listaDsctoJson.matPosicion = 10 ;
             obj38listaDsctoJson.id = 38;
             obj38listaDsctoJson.Posicion = "" ;
             obj38listaDsctoJson.Condicion = "" ;
             obj38listaDsctoJson.Importe = 0 ;
             obj38listaDsctoJson.ImporteAnterior = 0 ;
             obj38listaDsctoJson.Moneda = "" ;
             obj38listaDsctoJson.Valor = 0 ;
             obj38listaDsctoJson.Denominacion = "" ;
             obj38listaDsctoJson.esPorcentaje = "" ;
             obj38listaDsctoJson.LimiteInferior = "" ;
             obj38listaDsctoJson.Recalcular = "" ;
             
             var obj39listaDsctoJson = {};
             obj39listaDsctoJson.matPosicion = 10 ;
             obj39listaDsctoJson.id = 39;
             obj39listaDsctoJson.Posicion = "" ;
             obj39listaDsctoJson.Condicion = "" ;
             obj39listaDsctoJson.Importe = 0 ;
             obj39listaDsctoJson.ImporteAnterior = 0 ;
             obj39listaDsctoJson.Moneda = "" ;
             obj39listaDsctoJson.Valor = 0 ;
             obj39listaDsctoJson.Denominacion = "" ;
             obj39listaDsctoJson.esPorcentaje = "" ;
             obj39listaDsctoJson.LimiteInferior = "" ;
             obj39listaDsctoJson.Recalcular = "" ;
             
             var obj40listaDsctoJson = {};
             obj40listaDsctoJson.matPosicion = 10 ;
             obj40listaDsctoJson.id = 40;
             obj40listaDsctoJson.Posicion = "" ;
             obj40listaDsctoJson.Condicion = "" ;
             obj40listaDsctoJson.Importe = 0 ;
             obj40listaDsctoJson.ImporteAnterior = 0 ;
             obj40listaDsctoJson.Moneda = "" ;
             obj40listaDsctoJson.Valor = 0 ;
             obj40listaDsctoJson.Denominacion = "" ;
             obj40listaDsctoJson.esPorcentaje = "" ;
             obj40listaDsctoJson.LimiteInferior = "" ;
             obj40listaDsctoJson.Recalcular = "" ;
             
             
             var obj41listaDsctoJson = {};
             obj41listaDsctoJson.matPosicion = 10 ;
             obj41listaDsctoJson.id = 41;
             obj41listaDsctoJson.Posicion = "" ;
             obj41listaDsctoJson.Condicion = "" ;
             obj41listaDsctoJson.Importe = 0 ;
             obj41listaDsctoJson.ImporteAnterior = 0 ;
             obj41listaDsctoJson.Moneda = "" ;
             obj41listaDsctoJson.Valor = 0 ;
             obj41listaDsctoJson.Denominacion = "" ;
             obj41listaDsctoJson.esPorcentaje = "" ;
             obj41listaDsctoJson.LimiteInferior = "" ;
             obj41listaDsctoJson.Recalcular = "" ;
             
             
             var obj42listaDsctoJson = {};
             obj42listaDsctoJson.matPosicion = 10 ;
             obj42listaDsctoJson.id = 42;
             obj42listaDsctoJson.Posicion = "" ;
             obj42listaDsctoJson.Condicion = "" ;
             obj42listaDsctoJson.Importe = 0 ;
             obj42listaDsctoJson.ImporteAnterior = 0 ;
             obj42listaDsctoJson.Moneda = "" ;
             obj42listaDsctoJson.Valor = 0 ;
             obj42listaDsctoJson.Denominacion = "" ;
             obj42listaDsctoJson.esPorcentaje = "" ;
             obj42listaDsctoJson.LimiteInferior = "" ;
             obj42listaDsctoJson.Recalcular = "" ;
             
             
             var obj43listaDsctoJson = {};
             obj43listaDsctoJson.matPosicion = 10 ;
             obj43listaDsctoJson.id = 43;
             obj43listaDsctoJson.Posicion = "" ;
             obj43listaDsctoJson.Condicion = "" ;
             obj43listaDsctoJson.Importe = 0 ;
             obj43listaDsctoJson.ImporteAnterior = 0 ;
             obj43listaDsctoJson.Moneda = "" ;
             obj43listaDsctoJson.Valor = 0 ;
             obj43listaDsctoJson.Denominacion = "" ;
             obj43listaDsctoJson.esPorcentaje = "" ;
             obj43listaDsctoJson.LimiteInferior = "" ;
             obj43listaDsctoJson.Recalcular = "" ;
             
             
             var obj44listaDsctoJson = {};
             obj44listaDsctoJson.matPosicion = 10 ;
             obj44listaDsctoJson.id = 44;
             obj44listaDsctoJson.Posicion = "" ;
             obj44listaDsctoJson.Condicion = "" ;
             obj44listaDsctoJson.Importe = 0 ;
             obj44listaDsctoJson.ImporteAnterior = 0 ;
             obj44listaDsctoJson.Moneda = "" ;
             obj44listaDsctoJson.Valor = 0 ;
             obj44listaDsctoJson.Denominacion = "" ;
             obj44listaDsctoJson.esPorcentaje = "" ;
             obj44listaDsctoJson.LimiteInferior = "" ;
             obj44listaDsctoJson.Recalcular = "" ;
             
             
             var obj45listaDsctoJson = {};
             obj45listaDsctoJson.matPosicion = 10 ;
             obj45listaDsctoJson.id = 45;
             obj45listaDsctoJson.Posicion = "" ;
             obj45listaDsctoJson.Condicion = "" ;
             obj45listaDsctoJson.Importe = 0 ;
             obj45listaDsctoJson.ImporteAnterior = 0 ;
             obj45listaDsctoJson.Moneda = "" ;
             obj45listaDsctoJson.Valor = 0 ;
             obj45listaDsctoJson.Denominacion = "" ;
             obj45listaDsctoJson.esPorcentaje = "" ;
             obj45listaDsctoJson.LimiteInferior = "" ;
             obj45listaDsctoJson.Recalcular = "" ;
             
             
             var obj46listaDsctoJson = {};
             obj46listaDsctoJson.matPosicion = 10 ;
             obj46listaDsctoJson.id = 46;
             obj46listaDsctoJson.Posicion = "" ;
             obj46listaDsctoJson.Condicion = "" ;
             obj46listaDsctoJson.Importe = 0 ;
             obj46listaDsctoJson.ImporteAnterior = 0 ;
             obj46listaDsctoJson.Moneda = "" ;
             obj46listaDsctoJson.Valor = 0 ;
             obj46listaDsctoJson.Denominacion = "" ;
             obj46listaDsctoJson.esPorcentaje = "" ;
             obj46listaDsctoJson.LimiteInferior = "" ;
             obj46listaDsctoJson.Recalcular = "" ;
             
             var obj47listaDsctoJson = {};
             obj47listaDsctoJson.matPosicion = 10 ;
             obj47listaDsctoJson.id = 47;
             obj47listaDsctoJson.Posicion = "" ;
             obj47listaDsctoJson.Condicion = "" ;
             obj47listaDsctoJson.Importe = 0 ;
             obj47listaDsctoJson.ImporteAnterior = 0 ;
             obj47listaDsctoJson.Moneda = "" ;
             obj47listaDsctoJson.Valor = 0 ;
             obj47listaDsctoJson.Denominacion = "" ;
             obj47listaDsctoJson.esPorcentaje = "" ;
             obj47listaDsctoJson.LimiteInferior = "" ;
             obj47listaDsctoJson.Recalcular = "" ;
             
             
             var obj48listaDsctoJson = {};
             obj48listaDsctoJson.matPosicion = 10 ;
             obj48listaDsctoJson.id = 48;
             obj48listaDsctoJson.Posicion = "" ;
             obj48listaDsctoJson.Condicion = "" ;
             obj48listaDsctoJson.Importe = 0 ;
             obj48listaDsctoJson.ImporteAnterior = 0 ;
             obj48listaDsctoJson.Moneda = "" ;
             obj48listaDsctoJson.Valor = 0 ;
             obj48listaDsctoJson.Denominacion = "" ;
             obj48listaDsctoJson.esPorcentaje = "" ;
             obj48listaDsctoJson.LimiteInferior = "" ;
             obj48listaDsctoJson.Recalcular = "" ;
             
             
             var obj49listaDsctoJson = {};
             obj49listaDsctoJson.matPosicion = 10 ;
             obj49listaDsctoJson.id = 49;
             obj49listaDsctoJson.Posicion = "" ;
             obj49listaDsctoJson.Condicion = "" ;
             obj49listaDsctoJson.Importe = 0 ;
             obj49listaDsctoJson.ImporteAnterior = 0 ;
             obj49listaDsctoJson.Moneda = "" ;
             obj49listaDsctoJson.Valor = 0 ;
             obj49listaDsctoJson.Denominacion = "" ;
             obj49listaDsctoJson.esPorcentaje = "" ;
             obj49listaDsctoJson.LimiteInferior = "" ;
             obj49listaDsctoJson.Recalcular = "" ;
             
             var obj50listaDsctoJson = {};
             obj50listaDsctoJson.matPosicion = 10 ;
             obj50listaDsctoJson.id = 50;
             obj50listaDsctoJson.Posicion = "" ;
             obj50listaDsctoJson.Condicion = "" ;
             obj50listaDsctoJson.Importe = 0 ;
             obj50listaDsctoJson.ImporteAnterior = 0 ;
             obj50listaDsctoJson.Moneda = "" ;
             obj50listaDsctoJson.Valor = 0 ;
             obj50listaDsctoJson.Denominacion = "" ;
             obj50listaDsctoJson.esPorcentaje = "" ;
             obj50listaDsctoJson.LimiteInferior = "" ;
             obj50listaDsctoJson.Recalcular = "" ;
             
             var obj51listaDsctoJson = {};
             obj51listaDsctoJson.matPosicion = 10 ;
             obj51listaDsctoJson.id = 51;
             obj51listaDsctoJson.Posicion = "" ;
             obj51listaDsctoJson.Condicion = "" ;
             obj51listaDsctoJson.Importe = 0 ;
             obj51listaDsctoJson.ImporteAnterior = 0 ;
             obj51listaDsctoJson.Moneda = "" ;
             obj51listaDsctoJson.Valor = 0 ;
             obj51listaDsctoJson.Denominacion = "" ;
             obj51listaDsctoJson.esPorcentaje = "" ;
             obj51listaDsctoJson.LimiteInferior = "" ;
             obj51listaDsctoJson.Recalcular = "" ;
             
             var obj52listaDsctoJson = {};
             obj52listaDsctoJson.matPosicion = 10 ;
             obj52listaDsctoJson.id = 52;
             obj52listaDsctoJson.Posicion = "" ;
             obj52listaDsctoJson.Condicion = "" ;
             obj52listaDsctoJson.Importe = 0 ;
             obj52listaDsctoJson.ImporteAnterior = 0 ;
             obj52listaDsctoJson.Moneda = "" ;
             obj52listaDsctoJson.Valor = 0 ;
             obj52listaDsctoJson.Denominacion = "" ;
             obj52listaDsctoJson.esPorcentaje = "" ;
             obj52listaDsctoJson.LimiteInferior = "" ;
             obj52listaDsctoJson.Recalcular = "" ;
             
             
             var obj53listaDsctoJson ={};
             obj53listaDsctoJson.matPosicion = 10 ;
             obj53listaDsctoJson.id = 53;
             obj53listaDsctoJson.Posicion = "" ;
             obj53listaDsctoJson.Condicion = "" ;
             obj53listaDsctoJson.Importe = 0 ;
             obj53listaDsctoJson.ImporteAnterior = 0 ;
             obj53listaDsctoJson.Moneda = "" ;
             obj53listaDsctoJson.Valor = 0 ;
             obj53listaDsctoJson.Denominacion = "" ;
             obj53listaDsctoJson.esPorcentaje = "" ;
             obj53listaDsctoJson.LimiteInferior = "" ;
             obj53listaDsctoJson.Recalcular = "" ;
             
             
             var obj54listaDsctoJson = {};
             obj54listaDsctoJson.matPosicion = 10 ;
             obj54listaDsctoJson.id = 54;
             obj54listaDsctoJson.Posicion = "" ;
             obj54listaDsctoJson.Condicion = "" ;
             obj54listaDsctoJson.Importe = 0 ;
             obj54listaDsctoJson.ImporteAnterior = 0 ;
             obj54listaDsctoJson.Moneda = "" ;
             obj54listaDsctoJson.Valor = 0 ;
             obj54listaDsctoJson.Denominacion = "" ;
             obj54listaDsctoJson.esPorcentaje = "" ;
             obj54listaDsctoJson.LimiteInferior = "" ;
             obj54listaDsctoJson.Recalcular = "" ;
             
             
             var obj55listaDsctoJson = {};
             obj55listaDsctoJson.matPosicion = 10 ;
             obj55listaDsctoJson.id = 55;
             obj55listaDsctoJson.Posicion = "" ;
             obj55listaDsctoJson.Condicion = "" ;
             obj55listaDsctoJson.Importe = 0 ;
             obj55listaDsctoJson.ImporteAnterior = 0 ;
             obj55listaDsctoJson.Moneda = "" ;
             obj55listaDsctoJson.Valor = 0 ;
             obj55listaDsctoJson.Denominacion = "" ;
             obj55listaDsctoJson.esPorcentaje = "" ;
             obj55listaDsctoJson.LimiteInferior = "" ;
             obj55listaDsctoJson.Recalcular = "" ;
             
             
             var obj56listaDsctoJson = {};
             obj56listaDsctoJson.matPosicion = 10 ;
             obj56listaDsctoJson.id = 56;
             obj56listaDsctoJson.Posicion = "" ;
             obj56listaDsctoJson.Condicion = "" ;
             obj56listaDsctoJson.Importe = 0 ;
             obj56listaDsctoJson.ImporteAnterior = 0 ;
             obj56listaDsctoJson.Moneda = "" ;
             obj56listaDsctoJson.Valor = 0 ;
             obj56listaDsctoJson.Denominacion = "" ;
             obj56listaDsctoJson.esPorcentaje = "" ;
             obj56listaDsctoJson.LimiteInferior = "" ;
             obj56listaDsctoJson.Recalcular = "" ;
             
             
             var obj57listaDsctoJson = {};
             obj57listaDsctoJson.matPosicion = 10 ;
             obj57listaDsctoJson.id = 57;
             obj57listaDsctoJson.Posicion = "" ;
             obj57listaDsctoJson.Condicion = "" ;
             obj57listaDsctoJson.Importe = 0 ;
             obj57listaDsctoJson.ImporteAnterior = 0 ;
             obj57listaDsctoJson.Moneda = "" ;
             obj57listaDsctoJson.Valor = 0 ;
             obj57listaDsctoJson.Denominacion = "" ;
             obj57listaDsctoJson.esPorcentaje = "" ;
             obj57listaDsctoJson.LimiteInferior = "" ;
             obj57listaDsctoJson.Recalcular = "" ;
             
             
             var obj58listaDsctoJson = {};
             obj58listaDsctoJson.matPosicion = 10 ;
             obj58listaDsctoJson.id = 58;
             obj58listaDsctoJson.Posicion = "" ;
             obj58listaDsctoJson.Condicion = "" ;
             obj58listaDsctoJson.Importe = 0 ;
             obj58listaDsctoJson.ImporteAnterior = 0 ;
             obj58listaDsctoJson.Moneda = "" ;
             obj58listaDsctoJson.Valor = 0 ;
             obj58listaDsctoJson.Denominacion = "" ;
             obj58listaDsctoJson.esPorcentaje = "" ;
             obj58listaDsctoJson.LimiteInferior = "" ;
             obj58listaDsctoJson.Recalcular = "" ;
             
             
             var obj59listaDsctoJson = {};
             obj59listaDsctoJson.matPosicion = 10 ;
             obj59listaDsctoJson.id = 59;
             obj59listaDsctoJson.Posicion = "" ;
             obj59listaDsctoJson.Condicion = "" ;
             obj59listaDsctoJson.Importe = 0 ;
             obj59listaDsctoJson.ImporteAnterior = 0 ;
             obj59listaDsctoJson.Moneda = "" ;
             obj59listaDsctoJson.Valor = 0 ;
             obj59listaDsctoJson.Denominacion = "" ;
             obj59listaDsctoJson.esPorcentaje = "" ;
             obj59listaDsctoJson.LimiteInferior = "" ;
             obj59listaDsctoJson.Recalcular = "" ;
             
             
             var obj60listaDsctoJson = {};
             obj60listaDsctoJson.matPosicion = 10 ;
             obj60listaDsctoJson.id = 60;
             obj60listaDsctoJson.Posicion = "" ;
             obj60listaDsctoJson.Condicion = "" ;
             obj60listaDsctoJson.Importe = 0 ;
             obj60listaDsctoJson.ImporteAnterior = 0 ;
             obj60listaDsctoJson.Moneda = "" ;
             obj60listaDsctoJson.Valor = 0 ;
             obj60listaDsctoJson.Denominacion = "" ;
             obj60listaDsctoJson.esPorcentaje = "" ;
             obj60listaDsctoJson.LimiteInferior = "" ;
             obj60listaDsctoJson.Recalcular = "" ;
             
             
             var obj61listaDsctoJson = {};
             obj61listaDsctoJson.matPosicion = 10 ;
             obj61listaDsctoJson.id = 61;
             obj61listaDsctoJson.Posicion = "" ;
             obj61listaDsctoJson.Condicion = "" ;
             obj61listaDsctoJson.Importe = 0 ;
             obj61listaDsctoJson.ImporteAnterior = 0 ;
             obj61listaDsctoJson.Moneda = "" ;
             obj61listaDsctoJson.Valor = 0 ;
             obj61listaDsctoJson.Denominacion = "" ;
             obj61listaDsctoJson.esPorcentaje = "" ;
             obj61listaDsctoJson.LimiteInferior = "" ;
             obj61listaDsctoJson.Recalcular = "" ;
             
             
             var obj62listaDsctoJson = {};
             obj62listaDsctoJson.matPosicion = 10 ;
             obj62listaDsctoJson.id = 62;
             obj62listaDsctoJson.Posicion = "" ;
             obj62listaDsctoJson.Condicion = "" ;
             obj62listaDsctoJson.Importe = 0 ;
             obj62listaDsctoJson.ImporteAnterior = 0 ;
             obj62listaDsctoJson.Moneda = "" ;
             obj62listaDsctoJson.Valor = 0 ;
             obj62listaDsctoJson.Denominacion = "" ;
             obj62listaDsctoJson.esPorcentaje = "" ;
             obj62listaDsctoJson.LimiteInferior = "" ;
             obj62listaDsctoJson.Recalcular = "" ;
             
             
             var obj63listaDsctoJson = {};
             obj63listaDsctoJson.matPosicion = 10 ;
             obj63listaDsctoJson.id = 63;
             obj63listaDsctoJson.Posicion = "" ;
             obj63listaDsctoJson.Condicion = "" ;
             obj63listaDsctoJson.Importe = 0 ;
             obj63listaDsctoJson.ImporteAnterior = 0 ;
             obj63listaDsctoJson.Moneda = "" ;
             obj63listaDsctoJson.Valor = 0 ;
             obj63listaDsctoJson.Denominacion = "" ;
             obj63listaDsctoJson.esPorcentaje = "" ;
             obj63listaDsctoJson.LimiteInferior = "" ;
             obj63listaDsctoJson.Recalcular = "" ;
             
             
             var obj64listaDsctoJson = {};
             obj64listaDsctoJson.matPosicion = 10 ;
             obj64listaDsctoJson.id = 64;
             obj64listaDsctoJson.Posicion = "" ;
             obj64listaDsctoJson.Condicion = "" ;
             obj64listaDsctoJson.Importe = 0 ;
             obj64listaDsctoJson.ImporteAnterior = 0 ;
             obj64listaDsctoJson.Moneda = "" ;
             obj64listaDsctoJson.Valor = 0 ;
             obj64listaDsctoJson.Denominacion = "" ;
             obj64listaDsctoJson.esPorcentaje = "" ;
             obj64listaDsctoJson.LimiteInferior = "" ;
             obj64listaDsctoJson.Recalcular = "" ;
             
             
             var obj65listaDsctoJson = {};
             obj65listaDsctoJson.matPosicion = 10 ;
             obj65listaDsctoJson.id = 65;
             obj65listaDsctoJson.Posicion = "" ;
             obj65listaDsctoJson.Condicion = "" ;
             obj65listaDsctoJson.Importe = 0 ;
             obj65listaDsctoJson.ImporteAnterior = 0 ;
             obj65listaDsctoJson.Moneda = "" ;
             obj65listaDsctoJson.Valor = 0 ;
             obj65listaDsctoJson.Denominacion = "" ;
             obj65listaDsctoJson.esPorcentaje = "" ;
             obj65listaDsctoJson.LimiteInferior = "" ;
             obj65listaDsctoJson.Recalcular = "" ;
             
             
             var obj66listaDsctoJson = {};
             obj66listaDsctoJson.matPosicion = 10 ;
             obj66listaDsctoJson.id = 66;
             obj66listaDsctoJson.Posicion = "" ;
             obj66listaDsctoJson.Condicion = "" ;
             obj66listaDsctoJson.Importe = 0 ;
             obj66listaDsctoJson.ImporteAnterior = 0 ;
             obj66listaDsctoJson.Moneda = "" ;
             obj66listaDsctoJson.Valor = 0 ;
             obj66listaDsctoJson.Denominacion = "" ;
             obj66listaDsctoJson.esPorcentaje = "" ;
             obj66listaDsctoJson.LimiteInferior = "" ;
             obj66listaDsctoJson.Recalcular = "" ;
             
             
             var obj67listaDsctoJson = {};
             obj67listaDsctoJson.matPosicion = 10 ;
             obj67listaDsctoJson.id = 67;
             obj67listaDsctoJson.Posicion = "" ;
             obj67listaDsctoJson.Condicion = "" ;
             obj67listaDsctoJson.Importe = 0 ;
             obj67listaDsctoJson.ImporteAnterior = 0 ;
             obj67listaDsctoJson.Moneda = "" ;
             obj67listaDsctoJson.Valor = 0 ;
             obj67listaDsctoJson.Denominacion = "" ;
             obj67listaDsctoJson.esPorcentaje = "" ;
             obj67listaDsctoJson.LimiteInferior = "" ;
             obj67listaDsctoJson.Recalcular = "" ;
             
             
             var obj68listaDsctoJson = {};
             obj68listaDsctoJson.matPosicion = 10 ;
             obj68listaDsctoJson.id = 68;
             obj68listaDsctoJson.Posicion = "" ;
             obj68listaDsctoJson.Condicion = "" ;
             obj68listaDsctoJson.Importe = 0 ;
             obj68listaDsctoJson.ImporteAnterior = 0 ;
             obj68listaDsctoJson.Moneda = "" ;
             obj68listaDsctoJson.Valor = 0 ;
             obj68listaDsctoJson.Denominacion = "" ;
             obj68listaDsctoJson.esPorcentaje = "" ;
             obj68listaDsctoJson.LimiteInferior = "" ;
             obj68listaDsctoJson.Recalcular = "" ;
             
             
             var obj69listaDsctoJson = {};
             obj69listaDsctoJson.matPosicion = 10 ;
             obj69listaDsctoJson.id = 69;
             obj69listaDsctoJson.Posicion = "" ;
             obj69listaDsctoJson.Condicion = "" ;
             obj69listaDsctoJson.Importe = 0 ;
             obj69listaDsctoJson.ImporteAnterior = 0 ;
             obj69listaDsctoJson.Moneda = "" ;
             obj69listaDsctoJson.Valor = 0 ;
             obj69listaDsctoJson.Denominacion = "" ;
             obj69listaDsctoJson.esPorcentaje = "" ;
             obj69listaDsctoJson.LimiteInferior = "" ;
             obj69listaDsctoJson.Recalcular = "" ;
             
             
             var obj70listaDsctoJson = {};
             obj70listaDsctoJson.matPosicion = 10 ;
             obj70listaDsctoJson.id = 70;
             obj70listaDsctoJson.Posicion = "" ;
             obj70listaDsctoJson.Condicion = "" ;
             obj70listaDsctoJson.Importe = 0 ;
             obj70listaDsctoJson.ImporteAnterior = 0 ;
             obj70listaDsctoJson.Moneda = "" ;
             obj70listaDsctoJson.Valor = 0 ;
             obj70listaDsctoJson.Denominacion = "" ;
             obj70listaDsctoJson.esPorcentaje = "" ;
             obj70listaDsctoJson.LimiteInferior = "" ;
             obj70listaDsctoJson.Recalcular = "" ;
             
             
             var obj71listaDsctoJson = {};
             obj71listaDsctoJson.matPosicion = 10 ;
             obj71listaDsctoJson.id = 71;
             obj71listaDsctoJson.Posicion = "" ;
             obj71listaDsctoJson.Condicion = "" ;
             obj71listaDsctoJson.Importe = 0 ;
             obj71listaDsctoJson.ImporteAnterior = 0 ;
             obj71listaDsctoJson.Moneda = "" ;
             obj71listaDsctoJson.Valor = 0 ;
             obj71listaDsctoJson.Denominacion = "" ;
             obj71listaDsctoJson.esPorcentaje = "" ;
             obj71listaDsctoJson.LimiteInferior = "" ;
             obj71listaDsctoJson.Recalcular = "" ;
             
             
             var obj72listaDsctoJson = {};
             obj72listaDsctoJson.matPosicion = 10 ;
             obj72listaDsctoJson.id = 72;
             obj72listaDsctoJson.Posicion = "" ;
             obj72listaDsctoJson.Condicion = "" ;
             obj72listaDsctoJson.Importe = 0 ;
             obj72listaDsctoJson.ImporteAnterior = 0 ;
             obj72listaDsctoJson.Moneda = "" ;
             obj72listaDsctoJson.Valor = 0 ;
             obj72listaDsctoJson.Denominacion = "" ;
             obj72listaDsctoJson.esPorcentaje = "" ;
             obj72listaDsctoJson.LimiteInferior = "" ;
             obj72listaDsctoJson.Recalcular = "" ;
             
             */
            listaDsctoJson.push(obj1listaDsctoJson);
            listaDsctoJson.push(obj2listaDsctoJson);
            listaDsctoJson.push(obj3listaDsctoJson);
            listaDsctoJson.push(obj4listaDsctoJson);
            listaDsctoJson.push(obj5listaDsctoJson);
            listaDsctoJson.push(obj6listaDsctoJson);
            listaDsctoJson.push(obj7listaDsctoJson);
            listaDsctoJson.push(obj8listaDsctoJson);
            listaDsctoJson.push(obj9listaDsctoJson);
            listaDsctoJson.push(obj10listaDsctoJson);
            listaDsctoJson.push(obj11listaDsctoJson);
            listaDsctoJson.push(obj12listaDsctoJson);
            listaDsctoJson.push(obj13listaDsctoJson);
            listaDsctoJson.push(obj14listaDsctoJson);
            listaDsctoJson.push(obj15listaDsctoJson);
            listaDsctoJson.push(obj16listaDsctoJson);
            listaDsctoJson.push(obj17listaDsctoJson);
            listaDsctoJson.push(obj18listaDsctoJson);
            /*
             listaDsctoJson.push(obj19listaDsctoJson);
             listaDsctoJson.push(obj20listaDsctoJson);
             listaDsctoJson.push(obj21listaDsctoJson);
             listaDsctoJson.push(obj22listaDsctoJson);
             listaDsctoJson.push(obj23listaDsctoJson);
             listaDsctoJson.push(obj24listaDsctoJson);
             listaDsctoJson.push(obj25listaDsctoJson);
             listaDsctoJson.push(obj26listaDsctoJson);
             listaDsctoJson.push(obj27listaDsctoJson);
             listaDsctoJson.push(obj28listaDsctoJson);
             listaDsctoJson.push(obj29listaDsctoJson);
             listaDsctoJson.push(obj30listaDsctoJson);
             listaDsctoJson.push(obj31listaDsctoJson);
             listaDsctoJson.push(obj32listaDsctoJson);
             listaDsctoJson.push(obj33listaDsctoJson);
             listaDsctoJson.push(obj34listaDsctoJson);
             listaDsctoJson.push(obj35listaDsctoJson);
             listaDsctoJson.push(obj36listaDsctoJson);
             listaDsctoJson.push(obj37listaDsctoJson);
             listaDsctoJson.push(obj38listaDsctoJson);
             listaDsctoJson.push(obj39listaDsctoJson);
             listaDsctoJson.push(obj40listaDsctoJson);
             listaDsctoJson.push(obj41listaDsctoJson);
             listaDsctoJson.push(obj42listaDsctoJson);
             listaDsctoJson.push(obj43listaDsctoJson);
             listaDsctoJson.push(obj44listaDsctoJson);
             listaDsctoJson.push(obj45listaDsctoJson);
             listaDsctoJson.push(obj46listaDsctoJson);
             listaDsctoJson.push(obj47listaDsctoJson);
             listaDsctoJson.push(obj48listaDsctoJson);
             listaDsctoJson.push(obj49listaDsctoJson);
             listaDsctoJson.push(obj50listaDsctoJson);
             listaDsctoJson.push(obj51listaDsctoJson);
             listaDsctoJson.push(obj52listaDsctoJson);
             listaDsctoJson.push(obj53listaDsctoJson);
             listaDsctoJson.push(obj54listaDsctoJson);
             listaDsctoJson.push(obj55listaDsctoJson);
             listaDsctoJson.push(obj56listaDsctoJson);
             listaDsctoJson.push(obj57listaDsctoJson);
             listaDsctoJson.push(obj58listaDsctoJson);
             listaDsctoJson.push(obj59listaDsctoJson);
             listaDsctoJson.push(obj60listaDsctoJson);
             listaDsctoJson.push(obj61listaDsctoJson);
             listaDsctoJson.push(obj62listaDsctoJson);
             listaDsctoJson.push(obj63listaDsctoJson);
             listaDsctoJson.push(obj64listaDsctoJson);
             listaDsctoJson.push(obj65listaDsctoJson);
             listaDsctoJson.push(obj66listaDsctoJson);
             listaDsctoJson.push(obj67listaDsctoJson);
             listaDsctoJson.push(obj68listaDsctoJson);
             listaDsctoJson.push(obj69listaDsctoJson);
             listaDsctoJson.push(obj70listaDsctoJson);
             listaDsctoJson.push(obj71listaDsctoJson);
             listaDsctoJson.push(obj72listaDsctoJson);
             
             */
            var listaDsctoJsonLleno = JSON.stringify(listaDsctoJson);
            var listaRepJson = [];
            var obj1listaRepJson = {};
            obj1listaRepJson.matPosicion = 10; //10,
            obj1listaRepJson.id = 1; //1,
            obj1listaRepJson.TipoReparto = ""; //"",
            obj1listaRepJson.Pos = "0001"; //"0001",
            obj1listaRepJson.PosCorto = "1"; //"1",
            obj1listaRepJson.FechaEntrega = "2017-06-22T10:00:00.000Z"; //"2014-02-01T05:00:00.000Z",
            obj1listaRepJson.CantPed = 1; //2,
            obj1listaRepJson.CantConf = 1; //2,
            obj1listaRepJson.CodUMedida = ""; //""},
            listaRepJson.push(obj1listaRepJson);
            var listaRepJsonLleno = JSON.stringify(listaRepJson);
            var listaIntJson = [];
            var obj1listaIntJson = {};
            obj1listaIntJson.id = 1;
            obj1listaIntJson.PedidoId = 0;
            obj1listaIntJson.Funcion = "AG";
            obj1listaIntJson.Codigo = "0000101317";
            obj1listaIntJson.Ruc = "41233469";
            obj1listaIntJson.Descripcion = "Erick De La Cruz De La Cruz";
            obj1listaIntJson.Titulo = "";
            obj1listaIntJson.Direccion = "LOS CEDROS";
            obj1listaIntJson.DireccionCompleta = "";
            obj1listaIntJson.Ciudad = "CERCADO DE LIMA - LIMA";
            obj1listaIntJson.Pais = "";
            obj1listaIntJson.CodigoPostal = "LIMA 01";
            obj1listaIntJson.Distrito = "CERCADO DE LIMA - LIMA";
            obj1listaIntJson.Telefono = "9879212992633555";
            obj1listaIntJson.TelefonoMovil = "";
            obj1listaIntJson.Mail = "erick@hot.com";
            obj1listaIntJson.PersonaFisica = false;
            obj1listaIntJson.Eventual = false;
            obj1listaIntJson.ApPat = "";
            obj1listaIntJson.ApMat = "";
            obj1listaIntJson.TranspZone = "";
            obj1listaIntJson.CodPersona = "";
            obj1listaIntJson.Nombre = "";
            obj1listaIntJson.Apellido = "";
            obj1listaIntJson.Iniciales = "";
            obj1listaIntJson.ApeSoltero = "";
            obj1listaIntJson.DescripcionP = "";
            obj1listaIntJson.Dni = "";
            obj1listaIntJson.TelefonoP = "";
            var obj2listaIntJson = {};
            obj2listaIntJson.id = 2;
            obj2listaIntJson.PedidoId = 0;
            obj2listaIntJson.Funcion = "RE";
            obj2listaIntJson.Codigo = "0000101317";
            obj2listaIntJson.Ruc = "";
            obj2listaIntJson.Descripcion = "Erick De La Cruz De La Cruz";
            obj2listaIntJson.Titulo = "";
            obj2listaIntJson.Direccion = "LOS CEDROS";
            obj2listaIntJson.DireccionCompleta = "";
            obj2listaIntJson.Ciudad = "CERCADO DE LIMA - LIMA";
            obj2listaIntJson.Pais = "";
            obj2listaIntJson.CodigoPostal = "LIMA 01";
            obj2listaIntJson.Distrito = "CERCADO DE LIMA - LIMA";
            obj2listaIntJson.Telefono = "9879212992633555";
            obj2listaIntJson.TelefonoMovil = "";
            obj2listaIntJson.Mail = "";
            obj2listaIntJson.PersonaFisica = false;
            obj2listaIntJson.Eventual = false;
            obj2listaIntJson.ApPat = "";
            obj2listaIntJson.ApMat = "";
            obj2listaIntJson.TranspZone = "";
            obj2listaIntJson.CodPersona = "";
            obj2listaIntJson.Nombre = "";
            obj2listaIntJson.Apellido = "";
            obj2listaIntJson.Iniciales = "";
            obj2listaIntJson.ApeSoltero = "";
            obj2listaIntJson.DescripcionP = "";
            obj2listaIntJson.Dni = "";
            obj2listaIntJson.TelefonoP = "";
            var obj3listaIntJson = {};
            obj3listaIntJson.id = 3;
            obj3listaIntJson.PedidoId = 0;
            obj3listaIntJson.Funcion = "WE";
            obj3listaIntJson.Codigo = "0000101317";
            obj3listaIntJson.Ruc = "";
            obj3listaIntJson.Descripcion = "Erick De La Cruz De La Cruz";
            obj3listaIntJson.Titulo = "";
            obj3listaIntJson.Direccion = "LOS CEDROS";
            obj3listaIntJson.DireccionCompleta = "";
            obj3listaIntJson.Ciudad = "CERCADO DE LIMA - LIMA";
            obj3listaIntJson.Pais = "";
            obj3listaIntJson.CodigoPostal = "LIMA 01";
            obj3listaIntJson.Distrito = "CERCADO DE LIMA - LIMA";
            obj3listaIntJson.Telefono = "9879212992633555";
            obj3listaIntJson.TelefonoMovil = "";
            obj3listaIntJson.Mail = "";
            obj3listaIntJson.PersonaFisica = false;
            obj3listaIntJson.Eventual = false;
            obj3listaIntJson.ApPat = "";
            obj3listaIntJson.ApMat = "";
            obj3listaIntJson.TranspZone = "";
            obj3listaIntJson.CodPersona = "";
            obj3listaIntJson.Nombre = "";
            obj3listaIntJson.Apellido = "";
            obj3listaIntJson.Iniciales = "";
            obj3listaIntJson.ApeSoltero = "";
            obj3listaIntJson.DescripcionP = "";
            obj3listaIntJson.Dni = "";
            obj3listaIntJson.TelefonoP = "";
            var obj4listaIntJson = {};
            obj4listaIntJson.id = 4;
            obj4listaIntJson.PedidoId = 0;
            obj4listaIntJson.Funcion = "RG";
            obj4listaIntJson.Codigo = "0000101317";
            obj4listaIntJson.Ruc = "41233469";
            obj4listaIntJson.Descripcion = "Erick De La Cruz De La Cruz";
            obj4listaIntJson.Titulo = "";
            obj4listaIntJson.Direccion = "LOS CEDROS";
            obj4listaIntJson.DireccionCompleta = "";
            obj4listaIntJson.Ciudad = "CERCADO DE LIMA - LIMA";
            obj4listaIntJson.Pais = "";
            obj4listaIntJson.CodigoPostal = "LIMA 01";
            obj4listaIntJson.Distrito = "CERCADO DE LIMA - LIMA";
            obj4listaIntJson.Telefono = "9879212992633555";
            obj4listaIntJson.TelefonoMovil = "";
            obj4listaIntJson.Mail = "";
            obj4listaIntJson.PersonaFisica = false;
            obj4listaIntJson.Eventual = false;
            obj4listaIntJson.ApPat = "";
            obj4listaIntJson.ApMat = "";
            obj4listaIntJson.TranspZone = "";
            obj4listaIntJson.CodPersona = "";
            obj4listaIntJson.Nombre = "";
            obj4listaIntJson.Apellido = "";
            obj4listaIntJson.Iniciales = "";
            obj4listaIntJson.ApeSoltero = "";
            obj4listaIntJson.DescripcionP = "";
            obj4listaIntJson.Dni = "";
            obj4listaIntJson.TelefonoP = "";
            var obj5listaIntJson = {};
            obj5listaIntJson.id = 5;
            obj5listaIntJson.PedidoId = 0;
            obj5listaIntJson.Funcion = "VE";
            obj5listaIntJson.Codigo = "";
            obj5listaIntJson.Ruc = "";
            obj5listaIntJson.Descripcion = "";
            obj5listaIntJson.Titulo = "";
            obj5listaIntJson.Direccion = "";
            obj5listaIntJson.DireccionCompleta = "";
            obj5listaIntJson.Ciudad = "";
            obj5listaIntJson.Pais = "";
            obj5listaIntJson.CodigoPostal = "";
            obj5listaIntJson.Distrito = "";
            obj5listaIntJson.Telefono = "";
            obj5listaIntJson.TelefonoMovil = "";
            obj5listaIntJson.Mail = "";
            obj5listaIntJson.PersonaFisica = false;
            obj5listaIntJson.Eventual = false;
            obj5listaIntJson.ApPat = "";
            obj5listaIntJson.ApMat = "";
            obj5listaIntJson.TranspZone = "";
            obj5listaIntJson.CodPersona = "00001802";
            obj5listaIntJson.Nombre = "";
            obj5listaIntJson.Apellido = "";
            obj5listaIntJson.Iniciales = "";
            obj5listaIntJson.ApeSoltero = "";
            obj5listaIntJson.DescripcionP = "Julio Edgardo Pingo";
            obj5listaIntJson.Dni = "";
            obj5listaIntJson.TelefonoP = "";
            var obj6listaIntJson = {};
            obj6listaIntJson.id = 6;
            obj6listaIntJson.PedidoId = 0;
            obj6listaIntJson.Funcion = "Z3";
            obj6listaIntJson.Codigo = "";
            obj6listaIntJson.Ruc = "";
            obj6listaIntJson.Descripcion = "";
            obj6listaIntJson.Titulo = "";
            obj6listaIntJson.Direccion = "";
            obj6listaIntJson.DireccionCompleta = "";
            obj6listaIntJson.Ciudad = "";
            obj6listaIntJson.Pais = "";
            obj6listaIntJson.CodigoPostal = "";
            obj6listaIntJson.Distrito = "";
            obj6listaIntJson.Telefono = "";
            obj6listaIntJson.TelefonoMovil = "";
            obj6listaIntJson.Mail = "";
            obj6listaIntJson.PersonaFisica = false;
            obj6listaIntJson.Eventual = false;
            obj6listaIntJson.ApPat = "";
            obj6listaIntJson.ApMat = "";
            obj6listaIntJson.TranspZone = "";
            obj6listaIntJson.CodPersona = "";
            obj6listaIntJson.Nombre = "";
            obj6listaIntJson.Apellido = "";
            obj6listaIntJson.Iniciales = "";
            obj6listaIntJson.ApeSoltero = "";
            obj6listaIntJson.DescripcionP = "";
            obj6listaIntJson.Dni = "";
            obj6listaIntJson.TelefonoP = "";
            var obj7listaIntJson = {};
            obj7listaIntJson.id = 7;
            obj7listaIntJson.PedidoId = 0;
            obj7listaIntJson.Funcion = "V2";
            obj7listaIntJson.Codigo = "";
            obj7listaIntJson.Ruc = "";
            obj7listaIntJson.Descripcion = "";
            obj7listaIntJson.Titulo = "";
            obj7listaIntJson.Direccion = "";
            obj7listaIntJson.DireccionCompleta = "";
            obj7listaIntJson.Ciudad = "";
            obj7listaIntJson.Pais = "";
            obj7listaIntJson.CodigoPostal = "";
            obj7listaIntJson.Distrito = "";
            obj7listaIntJson.Telefono = "";
            obj7listaIntJson.TelefonoMovil = "";
            obj7listaIntJson.Mail = "";
            obj7listaIntJson.PersonaFisica = false;
            obj7listaIntJson.Eventual = false;
            obj7listaIntJson.ApPat = "";
            obj7listaIntJson.ApMat = "";
            obj7listaIntJson.TranspZone = "";
            obj7listaIntJson.CodPersona = "";
            obj7listaIntJson.Nombre = "";
            obj7listaIntJson.Apellido = "";
            obj7listaIntJson.Iniciales = "";
            obj7listaIntJson.ApeSoltero = "";
            obj7listaIntJson.DescripcionP = "";
            obj7listaIntJson.Dni = "";
            obj7listaIntJson.TelefonoP = "";
            var obj8listaIntJson = {};
            obj8listaIntJson.id = 8;
            obj8listaIntJson.PedidoId = 0;
            obj8listaIntJson.Funcion = "V3";
            obj8listaIntJson.Codigo = "";
            obj8listaIntJson.Ruc = "";
            obj8listaIntJson.Descripcion = "";
            obj8listaIntJson.Titulo = "";
            obj8listaIntJson.Direccion = "";
            obj8listaIntJson.DireccionCompleta = "";
            obj8listaIntJson.Ciudad = "";
            obj8listaIntJson.Pais = "";
            obj8listaIntJson.CodigoPostal = "";
            obj8listaIntJson.Distrito = "";
            obj8listaIntJson.Telefono = "";
            obj8listaIntJson.TelefonoMovil = "";
            obj8listaIntJson.Mail = "";
            obj8listaIntJson.PersonaFisica = false;
            obj8listaIntJson.Eventual = false;
            obj8listaIntJson.ApPat = "";
            obj8listaIntJson.ApMat = "";
            obj8listaIntJson.TranspZone = "";
            obj8listaIntJson.CodPersona = "";
            obj8listaIntJson.Nombre = "";
            obj8listaIntJson.Apellido = "";
            obj8listaIntJson.Iniciales = "";
            obj8listaIntJson.ApeSoltero = "";
            obj8listaIntJson.DescripcionP = "";
            obj8listaIntJson.Dni = "";
            obj8listaIntJson.TelefonoP = "";
            var obj9listaIntJson = {};
            obj9listaIntJson.id = 9;
            obj9listaIntJson.PedidoId = 0;
            obj9listaIntJson.Funcion = "V4";
            obj9listaIntJson.Codigo = "";
            obj9listaIntJson.Ruc = "";
            obj9listaIntJson.Descripcion = "";
            obj9listaIntJson.Titulo = "";
            obj9listaIntJson.Direccion = "";
            obj9listaIntJson.DireccionCompleta = "";
            obj9listaIntJson.Ciudad = "";
            obj9listaIntJson.Pais = "";
            obj9listaIntJson.CodigoPostal = "";
            obj9listaIntJson.Distrito = "";
            obj9listaIntJson.Telefono = "";
            obj9listaIntJson.TelefonoMovil = "";
            obj9listaIntJson.Mail = "";
            obj9listaIntJson.PersonaFisica = false;
            obj9listaIntJson.Eventual = false;
            obj9listaIntJson.ApPat = "";
            obj9listaIntJson.ApMat = "";
            obj9listaIntJson.TranspZone = "";
            obj9listaIntJson.CodPersona = "";
            obj9listaIntJson.Nombre = "";
            obj9listaIntJson.Apellido = "";
            obj9listaIntJson.Iniciales = "";
            obj9listaIntJson.ApeSoltero = "";
            obj9listaIntJson.DescripcionP = "";
            obj9listaIntJson.Dni = "";
            obj9listaIntJson.TelefonoP = "";
            var obj10listaIntJson = {};
            obj10listaIntJson.id = 10;
            obj10listaIntJson.PedidoId = 0;
            obj10listaIntJson.Funcion = "Z2";
            obj10listaIntJson.Codigo = "";
            obj10listaIntJson.Ruc = "";
            obj10listaIntJson.Descripcion = "";
            obj10listaIntJson.Titulo = "";
            obj10listaIntJson.Direccion = "";
            obj10listaIntJson.DireccionCompleta = "";
            obj10listaIntJson.Ciudad = "";
            obj10listaIntJson.Pais = "";
            obj10listaIntJson.CodigoPostal = "";
            obj10listaIntJson.Distrito = "";
            obj10listaIntJson.Telefono = "";
            obj10listaIntJson.TelefonoMovil = "";
            obj10listaIntJson.Mail = "";
            obj10listaIntJson.PersonaFisica = false;
            obj10listaIntJson.Eventual = false;
            obj10listaIntJson.ApPat = "";
            obj10listaIntJson.ApMat = "";
            obj10listaIntJson.TranspZone = "";
            obj10listaIntJson.CodPersona = "";
            obj10listaIntJson.Nombre = "";
            obj10listaIntJson.Apellido = "";
            obj10listaIntJson.Iniciales = "";
            obj10listaIntJson.ApeSoltero = "";
            obj10listaIntJson.DescripcionP = "";
            obj10listaIntJson.Dni = "";
            obj10listaIntJson.TelefonoP = "";
            var obj11listaIntJson = {};
            obj11listaIntJson.id = 11;
            obj11listaIntJson.PedidoId = 0;
            obj11listaIntJson.Funcion = "Z5";
            obj11listaIntJson.Codigo = "";
            obj11listaIntJson.Ruc = "";
            obj11listaIntJson.Descripcion = "";
            obj11listaIntJson.Titulo = "";
            obj11listaIntJson.Direccion = "";
            obj11listaIntJson.DireccionCompleta = "";
            obj11listaIntJson.Ciudad = "";
            obj11listaIntJson.Pais = "";
            obj11listaIntJson.CodigoPostal = "";
            obj11listaIntJson.Distrito = "";
            obj11listaIntJson.Telefono = "";
            obj11listaIntJson.TelefonoMovil = "";
            obj11listaIntJson.Mail = "";
            obj11listaIntJson.PersonaFisica = false;
            obj11listaIntJson.Eventual = false;
            obj11listaIntJson.ApPat = "";
            obj11listaIntJson.ApMat = "";
            obj11listaIntJson.TranspZone = "";
            obj11listaIntJson.CodPersona = "";
            obj11listaIntJson.Nombre = "";
            obj11listaIntJson.Apellido = "";
            obj11listaIntJson.Iniciales = "";
            obj11listaIntJson.ApeSoltero = "";
            obj11listaIntJson.DescripcionP = "";
            obj11listaIntJson.Dni = "";
            obj11listaIntJson.TelefonoP = "";
            listaIntJson.push(obj1listaIntJson);
            listaIntJson.push(obj2listaIntJson);
            listaIntJson.push(obj3listaIntJson);
            listaIntJson.push(obj4listaIntJson);
            listaIntJson.push(obj5listaIntJson);
            listaIntJson.push(obj6listaIntJson);
            listaIntJson.push(obj7listaIntJson);
            listaIntJson.push(obj8listaIntJson);
            listaIntJson.push(obj9listaIntJson);
            listaIntJson.push(obj10listaIntJson);
            listaIntJson.push(obj11listaIntJson);
            var listaIntJsonLleno = JSON.stringify(listaIntJson);
            var listaPedJson = [];
            var obj1listaPedJson = {};
            obj1listaPedJson.id = 1498155798420; //1497985445784,
            obj1listaPedJson.CodTipoDoc = "ZO01"; //"ZO01",
            obj1listaPedJson.CodTipoDocAnt = ""; //"",
            obj1listaPedJson.Referencia = ""; //"",
            obj1listaPedJson.OrgVentas = "1000"; //"1000",
            obj1listaPedJson.CanalDist = "10"; //"10",
            obj1listaPedJson.CodOficina = "1010"; //"1010",
            obj1listaPedJson.CondPago = "E000"; //"E000",
            obj1listaPedJson.Moneda = "PEN"; //"PEN",
            obj1listaPedJson.CondExp = "03"; //"03",
            obj1listaPedJson.FechaEntrega = "2017-06-22T18:23:18.420Z"; //"2017-06-20T19:04:05.784Z",
            obj1listaPedJson.FechaReparto = null; //"2014-02-01T05:00:00.000Z",
            obj1listaPedJson.TipoCambio = 3.282; //3.282,
            obj1listaPedJson.FechaFacturacion = "2017-06-22T18:23:18.420Z"; //"2017-06-20T19:04:05.784Z",
            obj1listaPedJson.CodigoBanco = ""; //"",
            obj1listaPedJson.Motivo = ""; //"002",
            obj1listaPedJson.BloqueoEntrega = ""; //"01",
            obj1listaPedJson.BloqueoFactura = ""; //"01",
            obj1listaPedJson.OrdenCompra = ""; //"7",
            obj1listaPedJson.FechaPedido = "2017-06-22T18:23:18.420Z"; //"2017-06-20T19:04:05.784Z",
            obj1listaPedJson.FechaValidez = "2017-06-29T18:23:18.439Z"; //"2017-06-27T19:04:05.831Z",
            obj1listaPedJson.Estado = ""; //"",
            obj1listaPedJson.nomProyecto = ""; //"nombreProyecto",
            obj1listaPedJson.TipoVisita = ""; //"03",
            obj1listaPedJson.cbxReembolsable = false; //false,
            obj1listaPedJson.dsctoAdicionalZD12 = 0; //0,
            obj1listaPedJson.dsctoAdicionalZD12tmp = 0; //0,
            obj1listaPedJson.FechaPrecio = null; //null,
            obj1listaPedJson.Mail = "erick@hot.com"; //"soli@hotmail.com",
            obj1listaPedJson.BonoCampania = ""; //"",
            obj1listaPedJson.RegaloCampania = ""; //"",
            obj1listaPedJson.Reenbolsable = false; //false,
            obj1listaPedJson.PedidoVenta1 = ""; //"",
            obj1listaPedJson.PedidoVenta2 = ""; //"",
            obj1listaPedJson.PedidoVenta3 = ""; //"",
            obj1listaPedJson.PedidoVenta4 = ""; //"",
            obj1listaPedJson.PedidoVisita1 = ""; //"",
            obj1listaPedJson.PedidoVisita2 = ""; //"",
            obj1listaPedJson.PedidoVisita3 = ""; //"",
            obj1listaPedJson.PedidoVisita4 = ""; //"",
            obj1listaPedJson.SubtotalImp = 0; //0,
            obj1listaPedJson.TieneEntrega = false; //false,
            obj1listaPedJson.DocOriginal = ""; //"",
            obj1listaPedJson.Znpiso = ""; //"",
            obj1listaPedJson.Ztransporte = ""; //"",
            obj1listaPedJson.Zasensor = false; //false,
            obj1listaPedJson.Zncservicio = false; //false,
            obj1listaPedJson.TieneKitCombo = false; //false,
            obj1listaPedJson.NumPedido = ""; //"",
            obj1listaPedJson.NumPedidoCorto = ""; //"",
            obj1listaPedJson.FechaPedidoString = ""; //"",
            obj1listaPedJson.FechaValidezString = ""; //"",
            obj1listaPedJson.FechaEntregaString = ""; //"",
            obj1listaPedJson.CodCliente = "0000101317"; //"0000101317",
            obj1listaPedJson.CodClienteCorto = ""; //"",
            obj1listaPedJson.CodGrupoVend = ""; //"",
            obj1listaPedJson.Sector = ""; //"",
            obj1listaPedJson.SubTotal = 210.06; //155.67,
            obj1listaPedJson.Igv = 37.81; //28.02,
            obj1listaPedJson.Total = 247.87; //183.69,
            obj1listaPedJson.TotalImp = 37.81; //28.02,
            obj1listaPedJson.PesoTotal = 0; //0,
            obj1listaPedJson.GrupoCond = ""; //"01",
            obj1listaPedJson.Tratado = false; //false,
            obj1listaPedJson.ClasePedidoCliente = ""; //"",
            obj1listaPedJson.ClaseDocumento = ""; //"",
            obj1listaPedJson.CodVendedor1 = "00001802"; //"00001802",
            obj1listaPedJson.NomVendedor1 = "Julio Edgardo Pingo"; //"Julio Edgardo Pingo",
            obj1listaPedJson.TotalConIgv = 0; //0,
            obj1listaPedJson.textoAtencion = ""; //"observacionAtencion",
            obj1listaPedJson.textoObsAdministrativas = ""; //"observacionObservacionesAdministrativas",
            obj1listaPedJson.textoRefFactura = ""; //"observacionReferenciaFactura",
            obj1listaPedJson.textoRefDireccion = ""; //"observacionReferenciaDireccion",
            obj1listaPedJson.correo = ""; //"",
            obj1listaPedJson.codigoSolicitante = ""; //"",
            obj1listaPedJson.codigoDestFact = ""; //"",
            obj1listaPedJson.codigoResPago = ""; //"",
            obj1listaPedJson.nombreSolicitante = ""; //"",
            obj1listaPedJson.direccionSolicitante = ""; //"",
            obj1listaPedJson.codigoPostalSolicitante = ""; //"",
            obj1listaPedJson.telefonoSolicitante = ""; //"",
            obj1listaPedJson.nifSolicitante = ""; //"",
            obj1listaPedJson.codigoDestMerc = ""; //"",
            obj1listaPedJson.nombreDestMerc = ""; //"",
            obj1listaPedJson.direccionDestMerc = ""; //"",
            obj1listaPedJson.codigoPostalDestMerc = ""; //"",
            obj1listaPedJson.telefonoDestMerc = ""; //"",
            obj1listaPedJson.telefonoMovilDestMerc = ""; //"",
            obj1listaPedJson.nombreDestFact = ""; //"",
            obj1listaPedJson.direccionDestFact = ""; //"",
            obj1listaPedJson.codigoPostalDestFact = ""; //"",
            obj1listaPedJson.telefonoDestFact = ""; //"",
            obj1listaPedJson.nombreResPago = ""; //"",
            obj1listaPedJson.direccionResPago = ""; //"",
            obj1listaPedJson.codigoPostalResPago = ""; //"",
            obj1listaPedJson.telefonoResPago = ""; //"",
            obj1listaPedJson.nifResPago = "363351"; //"",
            obj1listaPedJson.codigoCliente = "3000000003"; //"0000101317",
            obj1listaPedJson.nombreCliente = "Erick De La Cruz De La Cruz"; //"nombreSoli",
            obj1listaPedJson.direccionCliente = "LOS CEDROS"; //"direSoli",
            obj1listaPedJson.apePatSolicitante = ""; //"",
            obj1listaPedJson.apeMatSolicitante = ""; //"",
            obj1listaPedJson.textoContacto = ""; //"",
            obj1listaPedJson.textoDatosAdicionalesCliente = ""; //"",
            obj1listaPedJson.textoTelefonos = ""; //"",
            obj1listaPedJson.textoDescripcionVisita = ""; //"",
            obj1listaPedJson.textoResultadoVisita = ""; //"",
            obj1listaPedJson.textoDescripcionServInstalacion = ""; //"",
            ////////////////////////////////////
            obj1listaPedJson.datosCliente = {//Un objeto puede estar dentro de otro ? Preguntar a Franz
                1: "2", //"1",
                10: "1", //"1",
                15: "", //"1",
                20: "10", //"",
                25: "", //"1",
                35: "15", //"30",
                CODIG: "41233469", //"87654321",
                APPAT: "De La Cruz", //"apellidoPSoli",
                APMAT: "De La Cruz", //"apellidoMSoli",
                NOMBRE: "Erick", //"nombreSoli",
                FECNAC: "2015-03-04T05:00:00.000Z", //"2013-06-20T11:00:00.000Z",
                GRAINS: "10", //"10",
                SEXO: "1", //"1",
                CIUDAD: "140101", //"140101",
                EDAD: "2", //"4",
                RANGOED: "1", //"1",
                NIVELSE: "A", //"A",
                DIREC: "LOS CEDROS"  //"direSoli"},
            };
            //obj1listaPedJson.datosCliente;
            ///////////////////////////////
            obj1listaPedJson.listaPre = ""; //"",
            obj1listaPedJson.TotalDcto = 0; //0,
            obj1listaPedJson.codProyecto = ""; //"codigoProyecto",
            obj1listaPedJson.codVersion = ""; //"1025",
            obj1listaPedJson.GrupoForecast = ""; //"01",
            obj1listaPedJson.TipoForecast = " "; //" ",
            obj1listaPedJson.NoImpFac = ""; //"",
            obj1listaPedJson.Certificado = ""; //"nroCertificado",
            obj1listaPedJson.FechaVisita = null; //"2017-08-01T05:00:00.000Z"}
            listaPedJson.push(obj1listaPedJson);
            var listaPedJsonLleno = JSON.stringify(listaPedJson);
            var listadatosCliente = {}; // se envia de frente
            listadatosCliente = {
                1: "2", //"1",
                10: "1", //"1",
                15: "", //"1",
                20: "10", //"",
                25: "", //"1",
                35: "15", //"30",
                CODIG: "41233469", //"87654321",
                APPAT: "De La Cruz", //"apellidoPSoli",
                APMAT: "De La Cruz", //"apellidoMSoli",
                NOMBRE: "Erick", //"nombreSoli",
                FECNAC: "2015-03-04T05:00:00.000Z", //"2013-06-20T11:00:00.000Z",
                GRAINS: "10", //"10",
                SEXO: "1", //"1",
                CIUDAD: "140101", //"140101",
                EDAD: "2", //"4",
                RANGOED: "1", //"1",
                NIVELSE: "A", //"A",
                DIREC: "LOS CEDROS"  //"direSoli"},
            };
            var listadatosClienteLleno = JSON.stringify(listadatosCliente);
            var UserId = "JPINGO";
            var PwdId = "JPINGO1*";
            var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722";
            var GrpVend = "100";
            var Descripcion = "Julio Edgardo Pingo";
            var CodigoVendedor = "00001802"; //00001802
            var numPedido = "";
            var op = "crear";
            //////////////////////////////////////////////////////////
            var result = guardarDocumento.guardar(codigoCliente,
                    nombreCliente,
                    OrgVentas,
                    CanalDist,
                    CodOficina,
                    CondPago,
                    Moneda,
                    TipoCambio,
                    dsctoAdicionalZD12,
                    pesoTotal,
                    FechaFacturacion,
                    GrupoCond,
                    Motivo,
                    BloqueoFactura,
                    BloqueoEntrega,
                    OrdenCompra,
                    FechaPedido,
                    FechaValidez,
                    FechaEntrega,
                    CondExp,
                    FechaReparto,
                    nomProyecto,
                    codProyecto,
                    codVersion,
                    TipoVisita,
                    cbxReembolsable,
                    GrupoForecast,
                    TipoForecast,
                    Certificado,
                    FechaVisita,
                    listaMatJsonLleno,
                    listaDsctoJsonLleno,
                    listaRepJsonLleno,
                    listaIntJsonLleno,
                    listaPedJsonLleno,
                    listadatosClienteLleno,
                    UserId,
                    PwdId,
                    Id,
                    GrpVend,
                    Descripcion,
                    CodigoVendedor,
                    numPedido,
                    op);
            if (result.c === "s") {
                if (result.data.success) {
                    this.getView().getModel().setProperty("/RetornoGuardarDocumento", result.data);
                    this.getView().getModel().refresh();
                    var reason = this.getView().getModel().getProperty("/RetornoGuardarDocumento/errors/reason");
                    this.getView().byId("dlg_MensajeAvisoGeneral").open();
                    this.getView().byId("txt_aviso_general").setText(reason);
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                }
            } else {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
            }
            console.log(result);
        },
        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        //Boton Buscar Cliente
        onDocNuevoBuscarCliente1: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").open()
        },
        //Navegacion Master
        onDocNuevoPressMasterBack: function () {
        },
        //Buscar Producto
        onDocNuevodlg_buscar: function () {
            this.getView().byId("dlg_DocNuevobuscar").open();
        },
        onDocNuevoClosedlg_buscar: function () {
            this.getView().byId("dlg_DocNuevobuscar").close();
        },

        //Boton Añadir Producto del Master
        onDocNuevoMasterProductosAdd1: function () {
            var codigo = "11000004";
            var cantidad = 1;
            var CodAmbiente = "07";
            var Opcion = "03";
            var UserId = "JPINGO";
            var PwdId = "JPINGO1*";
            var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722";
            var GrpVend = "100";
            var Descripcion = "Julio Edgardo Pingo";
            var CodigoVendedor = "00001802";
            var OrgVentas = "1000";
            var CanalDist = "10";
            var OfVentas = "1010";
            var añadirForm = 1;
            var posNuevo = 10;
            var objPedido = {
                id: 1498248940715,
                CodTipoDoc: "ZO01",
                CodTipoDocAnt: "",
                Referencia: "",
                OrgVentas: "1000",
                CanalDist: "10",
                CodOficina: "1010",
                CondPago: "E000",
                Moneda: "PEN",
                CondExp: "03",
                FechaEntrega: "2017-06-23T20:15:40.715Z",
                FechaReparto: null,
                TipoCambio: 3.282,
                FechaFacturacion: "2017-06-23T20:15:40.715Z",
                CodigoBanco: "",
                Motivo: "",
                BloqueoEntrega: "",
                BloqueoFactura: "",
                OrdenCompra: "",
                FechaPedido: "2017-06-23T20:15:40.715Z",
                FechaValidez: "2017-06-30T20:15:40.756Z",
                Estado: "",
                nomProyecto: "",
                TipoVisita: "",
                cbxReembolsable: false,
                dsctoAdicionalZD12: 0,
                dsctoAdicionalZD12tmp: 0,
                FechaPrecio: null,
                Mail: "",
                BonoCampania: "",
                RegaloCampania: "",
                Reenbolsable: false,
                PedidoVenta1: "",
                PedidoVenta2: "",
                PedidoVenta3: "",
                PedidoVenta4: "",
                PedidoVisita1: "",
                PedidoVisita2: "",
                PedidoVisita3: "",
                PedidoVisita4: "",
                SubtotalImp: 0,
                TieneEntrega: false,
                DocOriginal: "",
                Znpiso: "",
                Ztransporte: "",
                Zasensor: false,
                Zncservicio: false,
                TieneKitCombo: false,
                NumPedido: "",
                NumPedidoCorto: "",
                FechaPedidoString: "",
                FechaValidezString: "",
                FechaEntregaString: "",
                CodCliente: "0000101317",
                CodClienteCorto: "",
                CodGrupoVend: "",
                Sector: "",
                SubTotal: 0,
                Igv: 0,
                Total: 0,
                TotalImp: 0,
                PesoTotal: 0,
                GrupoCond: "",
                Tratado: false,
                ClasePedidoCliente: "",
                ClaseDocumento: "",
                CodVendedor1: "00001802",
                NomVendedor1: "Julio Edgardo Pingo",
                TotalConIgv: 0,
                textoAtencion: "",
                textoObsAdministrativas: "",
                textoRefFactura: "",
                textoRefDireccion: "",
                correo: "",
                codigoSolicitante: "",
                codigoDestFact: "",
                codigoResPago: "",
                nombreSolicitante: "",
                direccionSolicitante: "",
                codigoPostalSolicitante: "",
                telefonoSolicitante: "",
                nifSolicitante: "",
                codigoDestMerc: "",
                nombreDestMerc: "",
                direccionDestMerc: "",
                codigoPostalDestMerc: "",
                telefonoDestMerc: "",
                telefonoMovilDestMerc: "",
                nombreDestFact: "",
                direccionDestFact: "",
                codigoPostalDestFact: "",
                telefonoDestFact: "",
                nombreResPago: "",
                direccionResPago: "",
                codigoPostalResPago: "",
                telefonoResPago: "",
                nifResPago: "",
                codigoCliente: "0000101317",
                nombreCliente: "Cliente Eventual La Molina",
                direccionCliente: "",
                apePatSolicitante: "",
                apeMatSolicitante: "",
                textoContacto: "",
                textoDatosAdicionalesCliente: "",
                textoTelefonos: "",
                textoDescripcionVisita: "",
                textoResultadoVisita: "",
                textoDescripcionServInstalacion: "",
                datosCliente: "",
                listaPre: "",
                TotalDcto: 0,
                codProyecto: "",
                codVersion: "",
                GrupoForecast: "01",
                TipoForecast: " ",
                NoImpFac: "",
                Certificado: "",
                FechaVisita: null
            };
            var cantidadtmp = 1;
            var ambiente = "07";
            var desamb = "Baño Principal";
            var opcamb = "03";
            var auart = "ZO01";
            var objPedidoLleno = JSON.stringify(objPedido);
            var result = materialServices.anadirMaterialMaster(codigo,
                    cantidad,
                    CodAmbiente,
                    Opcion,
                    UserId,
                    PwdId,
                    Id,
                    GrpVend,
                    Descripcion,
                    CodigoVendedor,
                    OrgVentas,
                    CanalDist,
                    OfVentas,
                    añadirForm,
                    posNuevo,
                    objPedidoLleno,
                    cantidadtmp,
                    ambiente,
                    desamb,
                    opcamb,
                    auart
                    );
            if (result.c === "s") {
                if (result.data.success) {
                    this.getView().getModel().setProperty("/RetornoAnadirMaterialMaster", result.data);
                    var objSeleccionado = []
                    objSeleccionado = this.getView().getModel().getProperty("/RetornoAnadirMaterialMaster/materiales");
                    this.getView().getModel().setProperty("/listaMatAnadido", objSeleccionado);
                    var display = this.getView().getModel().getProperty("/listaMatAnadido");
                    this.getView().getModel().setProperty("/listaMatAnadido", display);
                    this.getView().getModel().refresh();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                }
            } else {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
            }
            console.log(result);
            this.getView().byId("dlg_DocNuevoaddProducto").close();
        },
        //Boton Buscar Producto desde el Dialog
        onDocNuevoMasterProductosBuscar: function () {
            this.getView().byId("dlg_DocNuevobuscar").close();
        },
        //Editar Lista de Reparto
        /*
         onDocNuevodlg_editListaReparto: function() {
         this.getView().byId("dlg_DocNuevoeditListaReparto").open();
         },
         
         onDocNuevoClosedlg_editListaReparto: function() {
         this.getView().byId("dlg_DocNuevoeditListaReparto").close();
         }, 
         */
        //Boton Agregar producto desde el Master BuscarProducto
        onDocNuevoAddinBuscar: function () {
            MessageToast.show("Producto Añadido");
        },
        /*
         onDocNuevoSemanticButtonPress: function(evt) {
         MessageToast.show(evt.getSource().getText() + " Pressed");
         
         },
         */
        //Boton Master Datos
        onDocNuevoMasterDatos: function (oEvent) {
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoDatos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));
        },
        //Boton Master Producto
        onDocNuevoMasterProductos: function (oEvent) {
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
        },
        //Lista de Master Datos
        onListaMasterDatos: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            if (obj.codigo === 1) {
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"))
            }
            if (obj.codigo === 2) {
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail2"))
            }
            if (obj.codigo === 3) {
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail3"))
            }
        },
        //Lista de Master Productos
        onDocNuevoListMasterProductos: function (oEvent) {
        },
        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaCliente1: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/clienteSeleccionado", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductosBuscarCliente"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_cliente_buscado"));
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
            this.getView().byId("dlg_DocNuevobuscarCliente").close();
            console.log(obj.codigo);
        },
        //Al presionar en la Lista de los Clientes Buscados
        onDocNuevoListBuscarCliente: function () {
        },
        goStockDisponible: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockDisponible");
        },
        goStockporLlegar: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockporLlegar");
        },
        goStockporPedir: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockporPedir");
        },
        //Seleccionar Categoria
        /*onSeleccionarCategoria: function(){
         var categoria = this.getView().byId("comboCategoria").getSelectedKey();
         var linea[] = window.dataIni.lstLinea;
         var listaL[];
         
         for (var i = 0; i < (linea[].lenght); i++) {
         
         
         
         if(linea[]{Codigo} === categoria ){
         listaL[].push(linea[]{Descripcion});
         
         }
         
         
         }
         this.getView().getModel().setProperty("/ListaLinea",listaL[]);
         
         },*/
        //Stock Buscar
        onDocNuevoCloseSeleccionarMaterial: function () {
            this.getView().byId("dlg_BuscarMateriales").close();
        },
        onDocNuevoBuscarMateriales: function (oEvent) {
            //this.showBusyIndicator(4000, 0);
            //Busy Dialog
            /*if (!this._dialog) {
             this._dialog = sap.ui.xmlfragment("pe.com.seidor.sap.decor.ventas.view.BusyDialog", this);
             this.getView().addDependent(this._dialog);
             }
             
             // open dialog
             jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
             this._dialog.open();
             
             // simulate end of operation
             _timeout = jQuery.sap.delayedCall(20000, this, function () {
             this._dialog.close();
             });*/
            //
            var codigo = this.getView().byId("txt_codigo_material_busqueda").getValue();
            var codigoAntiguo = this.getView().byId("txt_codigoAntiguo_material_busqueda").getValue();
            var descripcionMaterial = this.getView().byId("txt_descripcionMaterial_material_busqueda").getValue();
            var categoria = this.getView().byId("comboCategoria").getSelectedKey();
            var linea = this.getView().byId("comboLinea").getSelectedKey();
            var marca = this.getView().byId("comboMarca").getSelectedKey();
            var orgVentas = window.dataIni.person.OrgVentas;
            var canalDist = window.dataIni.person.CanalDist;
            var ofVentas = window.dataIni.person.OfVentas;
            this.getView().byId("loadingControl").open(); // INDICADOR
            var result = materialServices.buscarmaterial(codigo, codigoAntiguo, descripcionMaterial, categoria, linea, marca, orgVentas, canalDist, ofVentas);
            if (result.c === "s") {
                this.getView().byId("dlg_DocNuevobuscar").close();
                if (result.data.success) {
                    this.getView().getModel().setProperty("/BusquedaMateriales", result.data.materiales);
                    this.getView().getModel().setProperty("/RetornolstCentros", result.data.lstCentros);
                    this.getView().byId("dlg_BuscarMateriales").open();
                    this.getView().getModel().refresh();
                    this.getView().byId("loadingControl").close();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                }
            } else {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
            }
        },
        onDocNuevoAnadirMaterial: function () {
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").open();
        },
        //Seleccionar Categoria
        onSeleccionarCategoria: function () {
            var categoria = this.getView().byId("comboCategoria").getSelectedKey();
            var linea = window.dataIni.lstLinea;
            var itemLleno = [];
            console.log(categoria);
            for (var i = 0; i < linea.length; i++) {
                var item = linea[i];
                var itemcod = item.Codigo;
                if (itemcod.substring(0, 2) === categoria) {
                    itemLleno.push(item);
                }
            }
            ;
            this.getView().getModel().setProperty("/listaLinea", itemLleno);
            this.getView().getModel().refresh();
            console.log(itemLleno.Codigo);
        },
        onSeleccionarLinea: function () {
            var linea = this.getView().byId("comboLinea").getSelectedKey();
            var marca = window.dataIni.lstMarca;
            var itemLleno = [];
            for (var i = 0; i < marca.length; i++) {
                var item = marca[i];
                var itemcod = item.Codigo;
                if (itemcod.substring(0, 5) === linea) {
                    itemLleno.push(item);
                    console.log(item);
                }
            }
            ;
            this.getView().getModel().setProperty("/listaMarca", itemLleno);
            this.getView().getModel().refresh();
        },
        onDocNuevoClosedlg_addProductoonDialog: function () {
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },
        //Dialog Aviso General
        //ID DIALOG  this.getView().byId("dlg_MensajeAvisoGeneral").open();
        //ID TEXT  this.getView().byId("txt_aviso_general").setText(abc);
        onOkDlg_MensajeAvisoGeneral: function () {
            this.getView().byId("dlg_MensajeAvisoGeneral").close();
        },
//Busy Indicador------------
        hideBusyIndicator: function () {
            sap.ui.core.BusyIndicator.hide();
        },
        showBusyIndicator: function (iDuration, iDelay) {
            sap.ui.core.BusyIndicator.show(iDelay);
            if (iDuration && iDuration > 0) {
                if (this._sTimeoutId) {
                    jQuery.sap.clearDelayedCall(this._sTimeoutId);
                    this._sTimeoutId = null;
                }
                this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
                    this.hideBusyIndicator();
                });
            }
        },
// this.showBusyIndicator(4000, 0);
//--------------------------

        SeleccionarMaterial: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            //var item=[];
            //var item = { CodMaterial: "{/materialSelec/CodMaterial}" , DescMaterial: "{/materialSelec/DescMaterial}" };
            this.getView().getModel().setProperty("/materialSelec", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
        },
        onSeleccionarCaracteristicas: function (oEvent) {
            var caracteristicas = this.getView().byId("comboCategoria").getSelectedKey();
            var dlg = "dlg_categoria_";
            var dlgtotal = dlg.concat(caracteristicas);
            if (caracteristicas !== " ") {
                if (caracteristicas === "08" | caracteristicas === "10" | caracteristicas === "12" | caracteristicas === "13" | caracteristicas === "16" | caracteristicas === "99") {
                    MessageToast.show("No se encontraron Características");
                } else {
                    this.getView().byId(dlgtotal).open();
                }
            } else {
                console.log(caracteristicas);
                MessageToast.show("Seleccione una Categoría", {
                    horizontally: 'center',
                    vertically: 'center'
                });
            }
        },
        onVolverCate01: function () {
            this.getView().byId("dlg_categoria_01").close();
        },
        onVolverCate02: function () {
            this.getView().byId("dlg_categoria_02").close();
        },
        onVolverCate03: function () {
            this.getView().byId("dlg_categoria_03").close();
        },
        onVolverCate04: function () {
            this.getView().byId("dlg_categoria_04").close();
        },
        onVolverCate05: function () {
            this.getView().byId("dlg_categoria_05").close();
        },
        onVolverCate06: function () {
            this.getView().byId("dlg_categoria_06").close();
        },
        onVolverCate07: function () {
            this.getView().byId("dlg_categoria_07").close();
        },
        onVolverCate09: function () {
            this.getView().byId("dlg_categoria_09").close();
        },
        onVolverCate11: function () {
            this.getView().byId("dlg_categoria_11").close();
        },
        onVolverCate14: function () {
            this.getView().byId("dlg_categoria_14").close();
        },
        onVolverCate15: function () {
            this.getView().byId("dlg_categoria_15").close();
        },
        show4000_0: function () {
            this.showBusyIndicator(4000, 0);
        },
        //onAnadirMaterial desde el buscador
        onDocNuevoMasterProductosAddonDialog: function (evt) {
            /*
             var Materiales = this.getView().getModel().getProperty("/materialSelec/CodMaterial");
             
             console.log(Materiales);
             
             
             var objetoDetalle = [];
             var objDet = {};
             objDet.Posicion = this.getView().getModel().getProperty("/materialSelec/Posicion"); 
             objDet.CodMaterial = this.getView().getModel().getProperty("/materialSelec/CodMaterial"); 
             objDet.UMedidaRendimiendo = this.getView().getModel().getProperty("/materialSelec/UMedidaRendimiendo");
             objDet.ValorRendimiento = this.getView().getModel().getProperty("/materialSelec/ValorRendimiento");
             objDet.Tipo = this.getView().getModel().getProperty("/materialSelec/Tipo");
             objDet.Descontinuado = this.getView().getModel().getProperty("/materialSelec/Descontinuado");
             objDet.CodMaterialCorto = this.getView().getModel().getProperty("/materialSelec/CodMaterialCorto");
             objDet.CodLote = "" ;
             objDet.CodAlmacen = "" ;
             objDet.CodCentro = "" ;
             objDet.DescMaterial = this.getView().getModel().getProperty("/materialSelec/DescMaterial");
             objDet.CodUMedida = this.getView().getModel().getProperty("/materialSelec/CodUMedida");
             objDet.Rendimiento = this.getView().getModel().getProperty("/materialSelec/Rendimiento");
             objDet.PrioridadEntrega = "" ;
             objDet.PrecioUnit = this.getView().getModel().getProperty("/materialSelec/PrecioUnit");
             objDet.Peso = this.getView().getModel().getProperty("/materialSelec/Peso");
             objDet.PosSup = "" ;
             objDet.Stock = this.getView().getModel().getProperty("/materialSelec/Stock");
             objDet.DescMovil = this.getView().getModel().getProperty("/materialSelec/DescMovil");
             objDet.EsFlete = this.getView().getModel().getProperty("/materialSelec/EsFlete");
             objDet.EsEstiba = this.getView().getModel().getProperty("/materialSelec/EsEstiba");
             objDet.EspecialServ = this.getView().getModel().getProperty("/materialSelec/EspecialServ");
             objDet.TieneServ = this.getView().getModel().getProperty("/materialSelec/TieneServ");
             objDet.TipoMaterial = this.getView().getModel().getProperty("/materialSelec/TipoMaterial");
             objDet.Jerarquia = this.getView().getModel().getProperty("/materialSelec/Jerarquia");
             objDet.Cantidad = this.getView().byId("txt_cantidad_material").getValue();
             objDet.FechaCantConf = "" ;
             objDet.DescCentro = "" ;
             objDet.DescAlmacen = "" ;
             objDet.CodGrupoMat = "" ;
             objDet.DesGrupoMat = "" ;
             objDet.Opcion = this.getView().byId("com_opcion_material").getSelectedKey();
             objDet.id = "" ;
             objDet.Descripcion = this.getView().getModel().getProperty("/materialSelec/Descripcion");
             objDet.Mstae = this.getView().getModel().getProperty("/materialSelec/MSTAE");
             objDet.Vdscto = "" ;
             objDet.StatusDespacho = this.getView().getModel().getProperty("/materialSelec/StatusDespacho");
             objDet.StockPos = this.getView().getModel().getProperty("/materialSelec/StockPos");
             objDet.PrecioSinIGV = "" ;
             objDet.DsctoMontTotal = "" ;
             objDet.MotivoRechazo = "" ;
             objDet.TipoPosAnt = "" ;
             objDet.Reembolsable = "" ;
             objDet.Zservicio = "" ;
             objDet.ContentID = "" ;
             objDet.DescMaterialTicketera = "" ;
             objDet.FechaCantConfStr = "" ;
             objDet.PosSupCorto = "" ;
             objDet.TipoPosicion = "" ;
             objDet.CambAlmacen = "" ;
             objDet.CantComp = "" ;
             objDet.PrecioTotal = "" ;
             objDet.PrecioUnitario = this.getView().getModel().getProperty("/materialSelec/PrecioUnitario");
             objDet.Total = "" ;
             objDet.IgvUnitario = "" ;
             objDet.IgvTotal = "" ;
             objDet.TotalDctos = "" ;
             objDet.SubTotal = "" ;
             objDet.CantConfirmada = "" ;
             objDet.PesoNeto = "" ;
             objDet.PrecioConIGV = "" ;
             objDet.TotalImpresion = "" ;
             objDet.FechaEntregaString = "" ;
             objDet.Reparto = "" ;
             objDet.TotPercep = "" ;
             objDet.link = "" ;
             objDet.DivisionRendimiento = "" ;
             objDet.mod = "" ;
             objDet.PosicionCorto = "" ;
             objDet.SubTotalLista = "" ;
             objDet.fullName = "" ;
             
             
             objetoDetalle.push(objDet);
             
             var objetoMaterial = [];
             var objMat = {};
             
             objMat.Stock = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.CodMaterial = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.DescMaterial = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.Descripcion = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.CodUMedida = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.PrecioUnit = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.Jerarquia = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.Peso = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.UMedidaRendimiendo = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.ValorRendimiento = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.Rendimiento = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.TipoMaterial = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.EsFlete = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.EsEstiba = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.EspecialServ = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.Tipo = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.CodMaterialCorto = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.TieneServ = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.Descontinuado = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.DescMovil = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.sStock = ""; //"";
             objMat.Posicion = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.PrecioUnitario = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.Catalogo = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.StatusDespacho = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.StockPos = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.link = ""; //"";
             objMat.MSTAE = ""; //this.getView().getModel().getProperty("/materialSelec/Stock");
             objMat.CodAntiguo = "" ;//del Dialog
             objMat.id = 22;
             
             objetoMaterial.push(objMat);
             
             var objetoPedido = {}; // enviar defrente como parámetro
             
             
             objetoPedido.id = 1497985445784;
             objetoPedido.CodTipoDoc = this.getView().getModel().getProperty("/documentoSeleccionado/Codigo");
             objetoPedido.CodTipoDocAnt = "";
             objetoPedido.Referencia = this.getView().byId("txt_refDocNuevo").getValue();
             objetoPedido.OrgVentas = window.dataIni.person.OrgVentas;
             objetoPedido.CanalDist = window.dataIni.person.CanalDist;
             objetoPedido.CodOficina = window.dataIni.person.OfVentas;
             objetoPedido.CondPago = this.getView().byId("com_condPago_pago").getSelectedKey();
             objetoPedido.Moneda = this.getView().byId("com_moneda_pago").getSelectedKey();
             objetoPedido.CondExp = "03";
             objetoPedido.FechaEntrega = this.getView().byId("date_fechaEntReferencial_datosDocumento").getValue();
             objetoPedido.FechaReparto = this.getView().byId("date_fechaDespachoReparto_datosDocumento").getValue();
             objetoPedido.TipoCambio = this.getView().byId("txt_tipoCambio_pago").getSelectedKey();
             objetoPedido.FechaFacturacion = this.getView().byId("date_fechaFacturacion_datosFacturacion").getValue();
             objetoPedido.CodigoBanco = this.getView().byId("com_nombreBanco_datosFacturacion").getSelectedKey(); //Piden codigo, cambiar luego
             objetoPedido.Motivo = this.getView().byId("com_motivoNcNd_datosFacturacion").getSelectedKey();
             objetoPedido.BloqueoEntrega = this.getView().byId("com_bloqueoEntrega_datosFacturacion").getSelectedKey();
             objetoPedido.BloqueoFactura = this.getView().byId("com_bloqueoFactura_datosFacturacion").getSelectedKey();
             objetoPedido.OrdenCompra = this.getView().byId("txt_nroOrdenCompra_datosDocumento").getValue();
             objetoPedido.FechaPedido = this.getView().byId("date_fechaPedido_datosDocumento").getValue();
             objetoPedido.FechaValidez = this.getView().byId("date_fechaValidez_datosDocumento").getValue();
             objetoPedido.Estado = "";
             objetoPedido.nomProyecto = this.getView().byId("txt_nombreProyecto_proyectoVisita").getValue();
             objetoPedido.TipoVisita = this.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey();
             objetoPedido.cbxReembolsable = this.getView().byId("check_visitaNoReembolsable_proyectoVisita").getSelected();
             objetoPedido.dsctoAdicionalZD12 = 0;
             objetoPedido.dsctoAdicionalZD12tmp = 0;
             objetoPedido.FechaPrecio = "" ;
             objetoPedido.Mail = "" ;
             objetoPedido.BonoCampania = "" ;
             objetoPedido.RegaloCampania = "" ;
             objetoPedido.Reenbolsable = "" ;
             objetoPedido.PedidoVenta1 = "" ;
             objetoPedido.PedidoVenta2 = "" ;
             objetoPedido.PedidoVenta3 = "" ;
             objetoPedido.PedidoVenta4 = "" ;
             objetoPedido.PedidoVisita1 = "" ;
             objetoPedido.PedidoVisita2 = "" ;
             objetoPedido.PedidoVisita3 = "" ;
             objetoPedido.PedidoVisita4 = "" ;
             objetoPedido.SubtotalImp = "" ;
             objetoPedido.TieneEntrega = "" ;
             objetoPedido.DocOriginal = "" ;
             objetoPedido.Znpiso = "" ;
             objetoPedido.Ztransporte = "" ;
             objetoPedido.Zasensor = "" ;
             objetoPedido.Zncservicio = "" ;
             objetoPedido.TieneKitCombo = "" ;
             objetoPedido.NumPedido = "" ;
             objetoPedido.NumPedidoCorto = "" ;
             objetoPedido.FechaPedidoString = "" ;
             objetoPedido.FechaValidezString = "" ;
             objetoPedido.FechaEntregaString = "" ;
             objetoPedido.CodCliente = "" ;
             objetoPedido.CodClienteCorto = "" ;
             objetoPedido.CodGrupoVend = "" ;
             objetoPedido.Sector = "" ;
             objetoPedido.SubTotal = "" ;
             objetoPedido.Igv = "" ;
             objetoPedido.Total = "" ;
             objetoPedido.TotalImp = "" ;
             objetoPedido.PesoTotal = "" ;
             objetoPedido.GrupoCond = "" ;
             objetoPedido.Tratado = "" ;
             objetoPedido.ClasePedidoCliente = "" ;
             objetoPedido.ClaseDocumento = "" ;
             objetoPedido.CodVendedor1 = "" ;
             objetoPedido.NomVendedor1 = "" ;
             objetoPedido.TotalConIgv = "" ;
             objetoPedido.textoAtencion = "" ;
             objetoPedido.textoObsAdministrativas = "" ;
             objetoPedido.textoRefFactura = "" ;
             objetoPedido.textoRefDireccion = "" ;
             objetoPedido.correo = "" ;
             objetoPedido.codigoSolicitante = "" ;
             objetoPedido.codigoDestFact = "" ;
             objetoPedido.codigoResPago = "" ;
             objetoPedido.nombreSolicitante = "" ;
             objetoPedido.direccionSolicitante = "" ;
             objetoPedido.codigoPostalSolicitante = "" ;
             objetoPedido.telefonoSolicitante = "" ;
             objetoPedido.nifSolicitante = "" ;
             objetoPedido.codigoDestMerc = "" ;
             objetoPedido.nombreDestMerc = "" ;
             objetoPedido.direccionDestMerc = "" ;
             objetoPedido.codigoPostalDestMerc = "" ;
             objetoPedido.telefonoDestMerc = "" ;
             objetoPedido.telefonoMovilDestMerc = "" ;
             objetoPedido.nombreDestFact = "" ;
             objetoPedido.direccionDestFact = "" ;
             objetoPedido.codigoPostalDestFact = "" ;
             objetoPedido.telefonoDestFact = "" ;
             objetoPedido.nombreResPago = "" ;
             objetoPedido.direccionResPago = "" ;
             objetoPedido.codigoPostalResPago = "" ;
             objetoPedido.telefonoResPago = "" ;
             objetoPedido.nifResPago = "" ;
             objetoPedido.codigoCliente = "" ;
             objetoPedido.nombreCliente = "" ;
             objetoPedido.direccionCliente = "" ;
             objetoPedido.apePatSolicitante = "" ;
             objetoPedido.apeMatSolicitante = "" ;
             objetoPedido.textoContacto = "" ;
             objetoPedido.textoDatosAdicionalesCliente = "" ;
             objetoPedido.textoTelefonos = "" ;
             objetoPedido.textoDescripcionVisita = "" ;
             objetoPedido.textoResultadoVisita = "" ;
             objetoPedido.textoDescripcionServInstalacion = "" ;
             objetoPedido.datosCliente = "" ;
             objetoPedido.listaPre = "" ;
             objetoPedido.TotalDcto = "" ;
             objetoPedido.codProyecto = "" ;
             objetoPedido.codVersion = "" ;
             objetoPedido.GrupoForecast = "" ;
             objetoPedido.TipoForecast = "" ;
             objetoPedido.NoImpFac = "" ;
             objetoPedido.Certificado = "" ;
             objetoPedido.FechaVisita = "" ;
             
             
             var anadirMat = 1;
             
             
             
             var result = materialServices.anadirMaterialBuscar(objetoDetalle,objetoMaterial,objetoPedido,anadirMat); 
             
             
             
             
             
             */
            /*
             var objetoDetalle = 
             var objetoMaterial = 
             var objetoPedido = 
             var categoria = 
             var anadirMat = 
             
             this.getView().byId("loadingControl").open(); // INDICADOR
             var result = materialServices.anadirMaterial(objetoDetalle,objetoMaterial,objetoPedido,anadirMat);
             
             if (result.c ==== "s") {
             this.getView().byId("dlg_DocNuevobuscar").close();
             if (result.data.success) {
             
             this.getView().getModel().setProperty("/BusquedaMateriales", result.data.materiales);
             this.getView().getModel().setProperty("/RetornolstCentros", result.data.lstCentros);
             this.getView().byId("dlg_BuscarMateriales").open();
             this.getView().getModel().refresh();
             this.getView().byId("loadingControl").close();
             } else {
             
             sap.m.MessageToast.show(result.data.errors.reason, {
             duration: 3000
             });
             
             }
             
             
             } else {
             sap.m.MessageToast.show(result.m, {
             duration: 3000
             });
             }
             
             objetoDetalle,objetoMaterial,objetoPedido,anadirMat
             
             */
            this.getView().byId("dlg_MensajeAviso1").open();
        },
        onBtnRefresh: function () {
            //material.aspx
            var UserId = "JPINGO";
            var PwdId = "JPINGO1*";
            var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722";
            var GrpVend = "100";
            var Descripcion = "Julio Edgardo Pingo";
            var CodigoVendedor = "00001802";
            var OrgVentas = "1000";
            var CanalDist = "10";
            var OfVentas = "1010";
            var dsctoLotes = 2;
            var listaInterJson = [];
            var obj1listaInterJson = {};
            obj1listaInterJson.id = 1;
            obj1listaInterJson.PedidoId = 0;
            obj1listaInterJson.Funcion = "AG";
            obj1listaInterJson.Codigo = "0000101317";
            obj1listaInterJson.Ruc = "41233469";
            obj1listaInterJson.Descripcion = "Erick De La Cruz De La Cruz";
            obj1listaInterJson.Titulo = "";
            obj1listaInterJson.Direccion = "LOS CEDROS";
            obj1listaInterJson.DireccionCompleta = "";
            obj1listaInterJson.Ciudad = "CERCADO DE LIMA - LIMA";
            obj1listaInterJson.Pais = "";
            obj1listaInterJson.CodigoPostal = "LIMA 01";
            obj1listaInterJson.Distrito = "CERCADO DE LIMA - LIMA";
            obj1listaInterJson.Telefono = "9879212992633555";
            obj1listaInterJson.TelefonoMovil = "";
            obj1listaInterJson.Mail = "erick@hot.com";
            obj1listaInterJson.PersonaFisica = false;
            obj1listaInterJson.Eventual = false;
            obj1listaInterJson.ApPat = "";
            obj1listaInterJson.ApMat = "";
            obj1listaInterJson.TranspZone = "";
            obj1listaInterJson.CodPersona = "";
            obj1listaInterJson.Nombre = "";
            obj1listaInterJson.Apellido = "";
            obj1listaInterJson.Iniciales = "";
            obj1listaInterJson.ApeSoltero = "";
            obj1listaInterJson.DescripcionP = "";
            obj1listaInterJson.Dni = "";
            obj1listaInterJson.TelefonoP = "";
            var obj2listaInterJson = {};
            obj2listaInterJson.id = 2;
            obj2listaInterJson.PedidoId = 0;
            obj2listaInterJson.Funcion = "RE";
            obj2listaInterJson.Codigo = "0000101317";
            obj2listaInterJson.Ruc = "";
            obj2listaInterJson.Descripcion = "Erick De La Cruz De La Cruz";
            obj2listaInterJson.Titulo = "";
            obj2listaInterJson.Direccion = "LOS CEDROS";
            obj2listaInterJson.DireccionCompleta = "";
            obj2listaInterJson.Ciudad = "CERCADO DE LIMA - LIMA";
            obj2listaInterJson.Pais = "";
            obj2listaInterJson.CodigoPostal = "LIMA 01";
            obj2listaInterJson.Distrito = "CERCADO DE LIMA - LIMA";
            obj2listaInterJson.Telefono = "9879212992633555";
            obj2listaInterJson.TelefonoMovil = "";
            obj2listaInterJson.Mail = "";
            obj2listaInterJson.PersonaFisica = false;
            obj2listaInterJson.Eventual = false;
            obj2listaInterJson.ApPat = "";
            obj2listaInterJson.ApMat = "";
            obj2listaInterJson.TranspZone = "";
            obj2listaInterJson.CodPersona = "";
            obj2listaInterJson.Nombre = "";
            obj2listaInterJson.Apellido = "";
            obj2listaInterJson.Iniciales = "";
            obj2listaInterJson.ApeSoltero = "";
            obj2listaInterJson.DescripcionP = "";
            obj2listaInterJson.Dni = "";
            obj2listaInterJson.TelefonoP = "";
            var obj3listaInterJson = {};
            obj3listaInterJson.id = 3;
            obj3listaInterJson.PedidoId = 0;
            obj3listaInterJson.Funcion = "WE";
            obj3listaInterJson.Codigo = "0000101317";
            obj3listaInterJson.Ruc = "";
            obj3listaInterJson.Descripcion = "Erick De La Cruz De La Cruz";
            obj3listaInterJson.Titulo = "";
            obj3listaInterJson.Direccion = "LOS CEDROS";
            obj3listaInterJson.DireccionCompleta = "";
            obj3listaInterJson.Ciudad = "CERCADO DE LIMA - LIMA";
            obj3listaInterJson.Pais = "";
            obj3listaInterJson.CodigoPostal = "LIMA 01";
            obj3listaInterJson.Distrito = "CERCADO DE LIMA - LIMA";
            obj3listaInterJson.Telefono = "9879212992633555";
            obj3listaInterJson.TelefonoMovil = "";
            obj3listaInterJson.Mail = "";
            obj3listaInterJson.PersonaFisica = false;
            obj3listaInterJson.Eventual = false;
            obj3listaInterJson.ApPat = "";
            obj3listaInterJson.ApMat = "";
            obj3listaInterJson.TranspZone = "";
            obj3listaInterJson.CodPersona = "";
            obj3listaInterJson.Nombre = "";
            obj3listaInterJson.Apellido = "";
            obj3listaInterJson.Iniciales = "";
            obj3listaInterJson.ApeSoltero = "";
            obj3listaInterJson.DescripcionP = "";
            obj3listaInterJson.Dni = "";
            obj3listaInterJson.TelefonoP = "";
            var obj4listaInterJson = {};
            obj4listaInterJson.id = 4;
            obj4listaInterJson.PedidoId = 0;
            obj4listaInterJson.Funcion = "RG";
            obj4listaInterJson.Codigo = "0000101317";
            obj4listaInterJson.Ruc = "41233469";
            obj4listaInterJson.Descripcion = "Erick De La Cruz De La Cruz";
            obj4listaInterJson.Titulo = "";
            obj4listaInterJson.Direccion = "LOS CEDROS";
            obj4listaInterJson.DireccionCompleta = "";
            obj4listaInterJson.Ciudad = "CERCADO DE LIMA - LIMA";
            obj4listaInterJson.Pais = "";
            obj4listaInterJson.CodigoPostal = "LIMA 01";
            obj4listaInterJson.Distrito = "CERCADO DE LIMA - LIMA";
            obj4listaInterJson.Telefono = "9879212992633555";
            obj4listaInterJson.TelefonoMovil = "";
            obj4listaInterJson.Mail = "";
            obj4listaInterJson.PersonaFisica = false;
            obj4listaInterJson.Eventual = false;
            obj4listaInterJson.ApPat = "";
            obj4listaInterJson.ApMat = "";
            obj4listaInterJson.TranspZone = "";
            obj4listaInterJson.CodPersona = "";
            obj4listaInterJson.Nombre = "";
            obj4listaInterJson.Apellido = "";
            obj4listaInterJson.Iniciales = "";
            obj4listaInterJson.ApeSoltero = "";
            obj4listaInterJson.DescripcionP = "";
            obj4listaInterJson.Dni = "";
            obj4listaInterJson.TelefonoP = "";
            var obj5listaInterJson = {};
            obj5listaInterJson.id = 5;
            obj5listaInterJson.PedidoId = 0;
            obj5listaInterJson.Funcion = "VE";
            obj5listaInterJson.Codigo = "";
            obj5listaInterJson.Ruc = "";
            obj5listaInterJson.Descripcion = "";
            obj5listaInterJson.Titulo = "";
            obj5listaInterJson.Direccion = "";
            obj5listaInterJson.DireccionCompleta = "";
            obj5listaInterJson.Ciudad = "";
            obj5listaInterJson.Pais = "";
            obj5listaInterJson.CodigoPostal = "";
            obj5listaInterJson.Distrito = "";
            obj5listaInterJson.Telefono = "";
            obj5listaInterJson.TelefonoMovil = "";
            obj5listaInterJson.Mail = "";
            obj5listaInterJson.PersonaFisica = false;
            obj5listaInterJson.Eventual = false;
            obj5listaInterJson.ApPat = "";
            obj5listaInterJson.ApMat = "";
            obj5listaInterJson.TranspZone = "";
            obj5listaInterJson.CodPersona = "00001802";
            obj5listaInterJson.Nombre = "";
            obj5listaInterJson.Apellido = "";
            obj5listaInterJson.Iniciales = "";
            obj5listaInterJson.ApeSoltero = "";
            obj5listaInterJson.DescripcionP = "Julio Edgardo Pingo";
            obj5listaInterJson.Dni = "";
            obj5listaInterJson.TelefonoP = "";
            var obj6listaInterJson = {};
            obj6listaInterJson.id = 6;
            obj6listaInterJson.PedidoId = 0;
            obj6listaInterJson.Funcion = "Z3";
            obj6listaInterJson.Codigo = "";
            obj6listaInterJson.Ruc = "";
            obj6listaInterJson.Descripcion = "";
            obj6listaInterJson.Titulo = "";
            obj6listaInterJson.Direccion = "";
            obj6listaInterJson.DireccionCompleta = "";
            obj6listaInterJson.Ciudad = "";
            obj6listaInterJson.Pais = "";
            obj6listaInterJson.CodigoPostal = "";
            obj6listaInterJson.Distrito = "";
            obj6listaInterJson.Telefono = "";
            obj6listaInterJson.TelefonoMovil = "";
            obj6listaInterJson.Mail = "";
            obj6listaInterJson.PersonaFisica = false;
            obj6listaInterJson.Eventual = false;
            obj6listaInterJson.ApPat = "";
            obj6listaInterJson.ApMat = "";
            obj6listaInterJson.TranspZone = "";
            obj6listaInterJson.CodPersona = "";
            obj6listaInterJson.Nombre = "";
            obj6listaInterJson.Apellido = "";
            obj6listaInterJson.Iniciales = "";
            obj6listaInterJson.ApeSoltero = "";
            obj6listaInterJson.DescripcionP = "";
            obj6listaInterJson.Dni = "";
            obj6listaInterJson.TelefonoP = "";
            var obj7listaInterJson = {};
            obj7listaInterJson.id = 7;
            obj7listaInterJson.PedidoId = 0;
            obj7listaInterJson.Funcion = "V2";
            obj7listaInterJson.Codigo = "";
            obj7listaInterJson.Ruc = "";
            obj7listaInterJson.Descripcion = "";
            obj7listaInterJson.Titulo = "";
            obj7listaInterJson.Direccion = "";
            obj7listaInterJson.DireccionCompleta = "";
            obj7listaInterJson.Ciudad = "";
            obj7listaInterJson.Pais = "";
            obj7listaInterJson.CodigoPostal = "";
            obj7listaInterJson.Distrito = "";
            obj7listaInterJson.Telefono = "";
            obj7listaInterJson.TelefonoMovil = "";
            obj7listaInterJson.Mail = "";
            obj7listaInterJson.PersonaFisica = false;
            obj7listaInterJson.Eventual = false;
            obj7listaInterJson.ApPat = "";
            obj7listaInterJson.ApMat = "";
            obj7listaInterJson.TranspZone = "";
            obj7listaInterJson.CodPersona = "";
            obj7listaInterJson.Nombre = "";
            obj7listaInterJson.Apellido = "";
            obj7listaInterJson.Iniciales = "";
            obj7listaInterJson.ApeSoltero = "";
            obj7listaInterJson.DescripcionP = "";
            obj7listaInterJson.Dni = "";
            obj7listaInterJson.TelefonoP = "";
            var obj8listaInterJson = {};
            obj8listaInterJson.id = 8;
            obj8listaInterJson.PedidoId = 0;
            obj8listaInterJson.Funcion = "V3";
            obj8listaInterJson.Codigo = "";
            obj8listaInterJson.Ruc = "";
            obj8listaInterJson.Descripcion = "";
            obj8listaInterJson.Titulo = "";
            obj8listaInterJson.Direccion = "";
            obj8listaInterJson.DireccionCompleta = "";
            obj8listaInterJson.Ciudad = "";
            obj8listaInterJson.Pais = "";
            obj8listaInterJson.CodigoPostal = "";
            obj8listaInterJson.Distrito = "";
            obj8listaInterJson.Telefono = "";
            obj8listaInterJson.TelefonoMovil = "";
            obj8listaInterJson.Mail = "";
            obj8listaInterJson.PersonaFisica = false;
            obj8listaInterJson.Eventual = false;
            obj8listaInterJson.ApPat = "";
            obj8listaInterJson.ApMat = "";
            obj8listaInterJson.TranspZone = "";
            obj8listaInterJson.CodPersona = "";
            obj8listaInterJson.Nombre = "";
            obj8listaInterJson.Apellido = "";
            obj8listaInterJson.Iniciales = "";
            obj8listaInterJson.ApeSoltero = "";
            obj8listaInterJson.DescripcionP = "";
            obj8listaInterJson.Dni = "";
            obj8listaInterJson.TelefonoP = "";
            var obj9listaInterJson = {};
            obj9listaInterJson.id = 9;
            obj9listaInterJson.PedidoId = 0;
            obj9listaInterJson.Funcion = "V4";
            obj9listaInterJson.Codigo = "";
            obj9listaInterJson.Ruc = "";
            obj9listaInterJson.Descripcion = "";
            obj9listaInterJson.Titulo = "";
            obj9listaInterJson.Direccion = "";
            obj9listaInterJson.DireccionCompleta = "";
            obj9listaInterJson.Ciudad = "";
            obj9listaInterJson.Pais = "";
            obj9listaInterJson.CodigoPostal = "";
            obj9listaInterJson.Distrito = "";
            obj9listaInterJson.Telefono = "";
            obj9listaInterJson.TelefonoMovil = "";
            obj9listaInterJson.Mail = "";
            obj9listaInterJson.PersonaFisica = false;
            obj9listaInterJson.Eventual = false;
            obj9listaInterJson.ApPat = "";
            obj9listaInterJson.ApMat = "";
            obj9listaInterJson.TranspZone = "";
            obj9listaInterJson.CodPersona = "";
            obj9listaInterJson.Nombre = "";
            obj9listaInterJson.Apellido = "";
            obj9listaInterJson.Iniciales = "";
            obj9listaInterJson.ApeSoltero = "";
            obj9listaInterJson.DescripcionP = "";
            obj9listaInterJson.Dni = "";
            obj9listaInterJson.TelefonoP = "";
            var obj10listaInterJson = {};
            obj10listaInterJson.id = 10;
            obj10listaInterJson.PedidoId = 0;
            obj10listaInterJson.Funcion = "Z2";
            obj10listaInterJson.Codigo = "";
            obj10listaInterJson.Ruc = "";
            obj10listaInterJson.Descripcion = "";
            obj10listaInterJson.Titulo = "";
            obj10listaInterJson.Direccion = "";
            obj10listaInterJson.DireccionCompleta = "";
            obj10listaInterJson.Ciudad = "";
            obj10listaInterJson.Pais = "";
            obj10listaInterJson.CodigoPostal = "";
            obj10listaInterJson.Distrito = "";
            obj10listaInterJson.Telefono = "";
            obj10listaInterJson.TelefonoMovil = "";
            obj10listaInterJson.Mail = "";
            obj10listaInterJson.PersonaFisica = false;
            obj10listaInterJson.Eventual = false;
            obj10listaInterJson.ApPat = "";
            obj10listaInterJson.ApMat = "";
            obj10listaInterJson.TranspZone = "";
            obj10listaInterJson.CodPersona = "";
            obj10listaInterJson.Nombre = "";
            obj10listaInterJson.Apellido = "";
            obj10listaInterJson.Iniciales = "";
            obj10listaInterJson.ApeSoltero = "";
            obj10listaInterJson.DescripcionP = "";
            obj10listaInterJson.Dni = "";
            obj10listaInterJson.TelefonoP = "";
            var obj11listaInterJson = {};
            obj11listaInterJson.id = 11;
            obj11listaInterJson.PedidoId = 0;
            obj11listaInterJson.Funcion = "Z5";
            obj11listaInterJson.Codigo = "";
            obj11listaInterJson.Ruc = "";
            obj11listaInterJson.Descripcion = "";
            obj11listaInterJson.Titulo = "";
            obj11listaInterJson.Direccion = "";
            obj11listaInterJson.DireccionCompleta = "";
            obj11listaInterJson.Ciudad = "";
            obj11listaInterJson.Pais = "";
            obj11listaInterJson.CodigoPostal = "";
            obj11listaInterJson.Distrito = "";
            obj11listaInterJson.Telefono = "";
            obj11listaInterJson.TelefonoMovil = "";
            obj11listaInterJson.Mail = "";
            obj11listaInterJson.PersonaFisica = false;
            obj11listaInterJson.Eventual = false;
            obj11listaInterJson.ApPat = "";
            obj11listaInterJson.ApMat = "";
            obj11listaInterJson.TranspZone = "";
            obj11listaInterJson.CodPersona = "";
            obj11listaInterJson.Nombre = "";
            obj11listaInterJson.Apellido = "";
            obj11listaInterJson.Iniciales = "";
            obj11listaInterJson.ApeSoltero = "";
            obj11listaInterJson.DescripcionP = "";
            obj11listaInterJson.Dni = "";
            obj11listaInterJson.TelefonoP = "";
            listaInterJson.push(obj1listaInterJson);
            listaInterJson.push(obj2listaInterJson);
            listaInterJson.push(obj3listaInterJson);
            listaInterJson.push(obj4listaInterJson);
            listaInterJson.push(obj5listaInterJson);
            listaInterJson.push(obj6listaInterJson);
            listaInterJson.push(obj7listaInterJson);
            listaInterJson.push(obj8listaInterJson);
            listaInterJson.push(obj9listaInterJson);
            listaInterJson.push(obj10listaInterJson);
            listaInterJson.push(obj11listaInterJson);
            var listaInterJsonLleno = JSON.stringify(listaInterJson);
            var listaDsctoJson = [];
            var obj1listaDsctoJson = {};
            obj1listaDsctoJson.matPosicion = 10;
            obj1listaDsctoJson.id = 1;
            obj1listaDsctoJson.Posicion = "";
            obj1listaDsctoJson.Condicion = "ZD00";
            obj1listaDsctoJson.Importe = 0;
            obj1listaDsctoJson.ImporteAnterior = 0;
            obj1listaDsctoJson.Moneda = "";
            obj1listaDsctoJson.Valor = 0;
            obj1listaDsctoJson.Denominacion = "Dcto. DECOR %";
            obj1listaDsctoJson.esPorcentaje = true;
            obj1listaDsctoJson.LimiteInferior = 55;
            obj1listaDsctoJson.Recalcular = "";
            var obj2listaDsctoJson = {};
            obj2listaDsctoJson.matPosicion = 10;
            obj2listaDsctoJson.id = 2;
            obj2listaDsctoJson.Posicion = "";
            obj2listaDsctoJson.Condicion = "ZD01";
            obj2listaDsctoJson.Importe = 0;
            obj2listaDsctoJson.ImporteAnterior = 0;
            obj2listaDsctoJson.Moneda = "";
            obj2listaDsctoJson.Valor = 0;
            obj2listaDsctoJson.Denominacion = "";
            obj2listaDsctoJson.esPorcentaje = false;
            obj2listaDsctoJson.LimiteInferior = 0;
            obj2listaDsctoJson.Recalcular = "";
            var obj3listaDsctoJson = {};
            obj3listaDsctoJson.matPosicion = 10;
            obj3listaDsctoJson.id = 3;
            obj3listaDsctoJson.Posicion = "";
            obj3listaDsctoJson.Condicion = "ZD02";
            obj3listaDsctoJson.Importe = 0;
            obj3listaDsctoJson.ImporteAnterior = 0;
            obj3listaDsctoJson.Moneda = "";
            obj3listaDsctoJson.Valor = 0;
            obj3listaDsctoJson.Denominacion = "Dscto Adic Cond Pago";
            obj3listaDsctoJson.esPorcentaje = true;
            obj3listaDsctoJson.LimiteInferior = 0;
            obj3listaDsctoJson.Recalcular = "";
            var obj4listaDsctoJson = {};
            obj4listaDsctoJson.matPosicion = 10;
            obj4listaDsctoJson.id = 4;
            obj4listaDsctoJson.Posicion = "";
            obj4listaDsctoJson.Condicion = "ZD03";
            obj4listaDsctoJson.Importe = 0;
            obj4listaDsctoJson.ImporteAnterior = 0;
            obj4listaDsctoJson.Moneda = "";
            obj4listaDsctoJson.Valor = 0;
            obj4listaDsctoJson.Denominacion = "Dcto. Estadistico";
            obj4listaDsctoJson.esPorcentaje = true;
            obj4listaDsctoJson.LimiteInferior = 0;
            obj4listaDsctoJson.Recalcular = "";
            var obj5listaDsctoJson = {};
            obj5listaDsctoJson.matPosicion = 10;
            obj5listaDsctoJson.id = 5;
            obj5listaDsctoJson.Posicion = "";
            obj5listaDsctoJson.Condicion = "ZD04";
            obj5listaDsctoJson.Importe = 0;
            obj5listaDsctoJson.ImporteAnterior = 0;
            obj5listaDsctoJson.Moneda = "";
            obj5listaDsctoJson.Valor = 0;
            obj5listaDsctoJson.Denominacion = "Dcto. Gerencia %";
            obj5listaDsctoJson.esPorcentaje = true;
            obj5listaDsctoJson.LimiteInferior = 0;
            obj5listaDsctoJson.Recalcular = "";
            var obj6listaDsctoJson = {};
            obj6listaDsctoJson.matPosicion = 10;
            obj6listaDsctoJson.id = 6;
            obj6listaDsctoJson.Posicion = "";
            obj6listaDsctoJson.Condicion = "ZD05";
            obj6listaDsctoJson.Importe = 0;
            obj6listaDsctoJson.ImporteAnterior = 0;
            obj6listaDsctoJson.Moneda = "";
            obj6listaDsctoJson.Valor = 0;
            obj6listaDsctoJson.Denominacion = "Dcto. Gerenc Importe";
            obj6listaDsctoJson.esPorcentaje = true;
            obj6listaDsctoJson.LimiteInferior = 0;
            obj6listaDsctoJson.Recalcular = "";
            var obj7listaDsctoJson = {};
            obj7listaDsctoJson.matPosicion = 10;
            obj7listaDsctoJson.id = 7;
            obj7listaDsctoJson.Posicion = "";
            obj7listaDsctoJson.Condicion = "ZD06";
            obj7listaDsctoJson.Importe = 0;
            obj7listaDsctoJson.ImporteAnterior = 0;
            obj7listaDsctoJson.Moneda = "";
            obj7listaDsctoJson.Valor = 0;
            obj7listaDsctoJson.Denominacion = "";
            obj7listaDsctoJson.esPorcentaje = false;
            obj7listaDsctoJson.LimiteInferior = 0;
            obj7listaDsctoJson.Recalcular = "";
            var obj8listaDsctoJson = {};
            obj8listaDsctoJson.matPosicion = 10;
            obj8listaDsctoJson.id = 8;
            obj8listaDsctoJson.Posicion = "";
            obj8listaDsctoJson.Condicion = "ZD07";
            obj8listaDsctoJson.Importe = 0;
            obj8listaDsctoJson.ImporteAnterior = 0;
            obj8listaDsctoJson.Moneda = "";
            obj8listaDsctoJson.Valor = 0;
            obj8listaDsctoJson.Denominacion = "";
            obj8listaDsctoJson.esPorcentaje = false;
            obj8listaDsctoJson.LimiteInferior = 0;
            obj8listaDsctoJson.Recalcular = "";
            var obj9listaDsctoJson = {};
            obj9listaDsctoJson.matPosicion = 10;
            obj9listaDsctoJson.id = 9;
            obj9listaDsctoJson.Posicion = "";
            obj9listaDsctoJson.Condicion = "ZD08";
            obj9listaDsctoJson.Importe = 0;
            obj9listaDsctoJson.ImporteAnterior = 0;
            obj9listaDsctoJson.Moneda = "";
            obj9listaDsctoJson.Valor = 0;
            obj9listaDsctoJson.Denominacion = "";
            obj9listaDsctoJson.esPorcentaje = false;
            obj9listaDsctoJson.LimiteInferior = 0;
            obj9listaDsctoJson.Recalcular = "";
            var obj10listaDsctoJson = {};
            obj10listaDsctoJson.matPosicion = 10;
            obj10listaDsctoJson.id = 10;
            obj10listaDsctoJson.Posicion = "";
            obj10listaDsctoJson.Condicion = "ZD09";
            obj10listaDsctoJson.Importe = 0;
            obj10listaDsctoJson.ImporteAnterior = 0;
            obj10listaDsctoJson.Moneda = "";
            obj10listaDsctoJson.Valor = 0;
            obj10listaDsctoJson.Denominacion = "Dcto. DECOR % AdmTda";
            obj10listaDsctoJson.esPorcentaje = true;
            obj10listaDsctoJson.LimiteInferior = 8;
            obj10listaDsctoJson.Recalcular = "";
            var obj11listaDsctoJson = {};
            obj11listaDsctoJson.matPosicion = 10;
            obj11listaDsctoJson.id = 11;
            obj11listaDsctoJson.Posicion = "";
            obj11listaDsctoJson.Condicion = "ZD11";
            obj11listaDsctoJson.Importe = 0;
            obj11listaDsctoJson.ImporteAnterior = 0;
            obj11listaDsctoJson.Moneda = "";
            obj11listaDsctoJson.Valor = 0;
            obj11listaDsctoJson.Denominacion = "Dcto. Jefe Prod. %";
            obj11listaDsctoJson.esPorcentaje = true;
            obj11listaDsctoJson.LimiteInferior = 25;
            obj11listaDsctoJson.Recalcular = "";
            var obj12listaDsctoJson = {};
            obj12listaDsctoJson.matPosicion = 10;
            obj12listaDsctoJson.id = 12;
            obj12listaDsctoJson.Posicion = "";
            obj12listaDsctoJson.Condicion = "ZD12";
            obj12listaDsctoJson.Importe = 0;
            obj12listaDsctoJson.ImporteAnterior = 0;
            obj12listaDsctoJson.Moneda = "";
            obj12listaDsctoJson.Valor = 0;
            obj12listaDsctoJson.Denominacion = "Dcto. Adicional";
            obj12listaDsctoJson.esPorcentaje = true;
            obj12listaDsctoJson.LimiteInferior = 0;
            obj12listaDsctoJson.Recalcular = "";
            var obj13listaDsctoJson = {};
            obj13listaDsctoJson.matPosicion = 10;
            obj13listaDsctoJson.id = 13;
            obj13listaDsctoJson.Posicion = "";
            obj13listaDsctoJson.Condicion = "ZP01";
            obj13listaDsctoJson.Importe = 0;
            obj13listaDsctoJson.ImporteAnterior = 0;
            obj13listaDsctoJson.Moneda = "";
            obj13listaDsctoJson.Valor = 0;
            obj13listaDsctoJson.Denominacion = " Diferencia ";
            obj13listaDsctoJson.esPorcentaje = false;
            obj13listaDsctoJson.LimiteInferior = 0;
            obj13listaDsctoJson.Recalcular = "";
            var obj14listaDsctoJson = {};
            obj14listaDsctoJson.matPosicion = 10;
            obj14listaDsctoJson.id = 14;
            obj14listaDsctoJson.Posicion = "";
            obj14listaDsctoJson.Condicion = "ZP08";
            obj14listaDsctoJson.Importe = 0;
            obj14listaDsctoJson.ImporteAnterior = 0;
            obj14listaDsctoJson.Moneda = "";
            obj14listaDsctoJson.Valor = 0;
            obj14listaDsctoJson.Denominacion = " Pr.Srv.Transp.Manual ";
            obj14listaDsctoJson.esPorcentaje = false;
            obj14listaDsctoJson.LimiteInferior = 0;
            obj14listaDsctoJson.Recalcular = "";
            var obj15listaDsctoJson = {};
            obj15listaDsctoJson.matPosicion = 10;
            obj15listaDsctoJson.id = 15;
            obj15listaDsctoJson.Posicion = "";
            obj15listaDsctoJson.Condicion = "ZD13";
            obj15listaDsctoJson.Importe = 0;
            obj15listaDsctoJson.ImporteAnterior = 0;
            obj15listaDsctoJson.Moneda = "";
            obj15listaDsctoJson.Valor = 0;
            obj15listaDsctoJson.Denominacion = "Dcto. Esp. Tienda %";
            obj15listaDsctoJson.esPorcentaje = true;
            obj15listaDsctoJson.LimiteInferior = 0;
            obj15listaDsctoJson.Recalcular = "";
            var obj16listaDsctoJson = {};
            obj16listaDsctoJson.matPosicion = 10;
            obj16listaDsctoJson.id = 16;
            obj16listaDsctoJson.Posicion = "";
            obj16listaDsctoJson.Condicion = "ZDCT";
            obj16listaDsctoJson.Importe = 0;
            obj16listaDsctoJson.ImporteAnterior = 0;
            obj16listaDsctoJson.Moneda = "";
            obj16listaDsctoJson.Valor = 0;
            obj16listaDsctoJson.Denominacion = "Dcto. Certificados %";
            obj16listaDsctoJson.esPorcentaje = true;
            obj16listaDsctoJson.LimiteInferior = 0;
            obj16listaDsctoJson.Recalcular = "";
            var obj17listaDsctoJson = {};
            obj17listaDsctoJson.matPosicion = 10;
            obj17listaDsctoJson.id = 17;
            obj17listaDsctoJson.Posicion = "";
            obj17listaDsctoJson.Condicion = "ZP00";
            obj17listaDsctoJson.Importe = 0;
            obj17listaDsctoJson.ImporteAnterior = 0;
            obj17listaDsctoJson.Moneda = "";
            obj17listaDsctoJson.Valor = 210.06;
            obj17listaDsctoJson.Denominacion = "";
            obj17listaDsctoJson.esPorcentaje = false;
            obj17listaDsctoJson.LimiteInferior = 0;
            obj17listaDsctoJson.Recalcular = "";
            var obj18listaDsctoJson = {};
            obj18listaDsctoJson.matPosicion = 10;
            obj18listaDsctoJson.id = 18;
            obj18listaDsctoJson.Posicion = "";
            obj18listaDsctoJson.Condicion = "ZP02";
            obj18listaDsctoJson.Importe = 0;
            obj18listaDsctoJson.ImporteAnterior = 0;
            obj18listaDsctoJson.Moneda = "";
            obj18listaDsctoJson.Valor = 0;
            obj18listaDsctoJson.Denominacion = "";
            obj18listaDsctoJson.esPorcentaje = false;
            obj18listaDsctoJson.LimiteInferior = 0;
            obj18listaDsctoJson.Recalcular = "";
            /*
             
             var obj19listaDsctoJson = {};
             obj19listaDsctoJson.matPosicion = "" ;
             obj19listaDsctoJson.id = 19;
             obj19listaDsctoJson.Posicion = "" ;
             obj19listaDsctoJson.Condicion = "" ;
             obj19listaDsctoJson.Importe = "" ;
             obj19listaDsctoJson.ImporteAnterior = "" ;
             obj19listaDsctoJson.Moneda = "" ;
             obj19listaDsctoJson.Valor = "" ;
             obj19listaDsctoJson.Denominacion = "" ;
             obj19listaDsctoJson.esPorcentaje = "" ;
             obj19listaDsctoJson.LimiteInferior = "" ;
             obj19listaDsctoJson.Recalcular = "" ;
             
             var obj20listaDsctoJson = {};
             obj20listaDsctoJson.matPosicion = "" ;
             obj20listaDsctoJson.id = 20;
             obj20listaDsctoJson.Posicion = "" ;
             obj20listaDsctoJson.Condicion = "" ;
             obj20listaDsctoJson.Importe = "" ;
             obj20listaDsctoJson.ImporteAnterior = "" ;
             obj20listaDsctoJson.Moneda = "" ;
             obj20listaDsctoJson.Valor = "" ;
             obj20listaDsctoJson.Denominacion = "" ;
             obj20listaDsctoJson.esPorcentaje = "" ;
             obj20listaDsctoJson.LimiteInferior = "" ;
             obj20listaDsctoJson.Recalcular = "" ;
             
             var obj21listaDsctoJson = {};
             obj21listaDsctoJson.matPosicion = "" ;
             obj21listaDsctoJson.id = 21;
             obj21listaDsctoJson.Posicion = "" ;
             obj21listaDsctoJson.Condicion = "" ;
             obj21listaDsctoJson.Importe = "" ;
             obj21listaDsctoJson.ImporteAnterior = "" ;
             obj21listaDsctoJson.Moneda = "" ;
             obj21listaDsctoJson.Valor = "" ;
             obj21listaDsctoJson.Denominacion = "" ;
             obj21listaDsctoJson.esPorcentaje = "" ;
             obj21listaDsctoJson.LimiteInferior = "" ;
             obj21listaDsctoJson.Recalcular = "" ;
             
             var obj22listaDsctoJson = {};
             obj22listaDsctoJson.matPosicion = "" ;
             obj22listaDsctoJson.id = 22;
             obj22listaDsctoJson.Posicion = "" ;
             obj22listaDsctoJson.Condicion = "" ;
             obj22listaDsctoJson.Importe = "" ;
             obj22listaDsctoJson.ImporteAnterior = "" ;
             obj22listaDsctoJson.Moneda = "" ;
             obj22listaDsctoJson.Valor = "" ;
             obj22listaDsctoJson.Denominacion = "" ;
             obj22listaDsctoJson.esPorcentaje = "" ;
             obj22listaDsctoJson.LimiteInferior = "" ;
             obj22listaDsctoJson.Recalcular = "" ;
             
             
             var obj23listaDsctoJson = {};
             obj23listaDsctoJson.matPosicion = "" ;
             obj23listaDsctoJson.id = 23;
             obj23listaDsctoJson.Posicion = "" ;
             obj23listaDsctoJson.Condicion = "" ;
             obj23listaDsctoJson.Importe = "" ;
             obj23listaDsctoJson.ImporteAnterior = "" ;
             obj23listaDsctoJson.Moneda = "" ;
             obj23listaDsctoJson.Valor = "" ;
             obj23listaDsctoJson.Denominacion = "" ;
             obj23listaDsctoJson.esPorcentaje = "" ;
             obj23listaDsctoJson.LimiteInferior = "" ;
             obj23listaDsctoJson.Recalcular = "" ;
             
             var obj24listaDsctoJson = {};
             obj24listaDsctoJson.matPosicion = "" ;
             obj24listaDsctoJson.id = 24;
             obj24listaDsctoJson.Posicion = "" ;
             obj24listaDsctoJson.Condicion = "" ;
             obj24listaDsctoJson.Importe = "" ;
             obj24listaDsctoJson.ImporteAnterior = "" ;
             obj24listaDsctoJson.Moneda = "" ;
             obj24listaDsctoJson.Valor = "" ;
             obj24listaDsctoJson.Denominacion = "" ;
             obj24listaDsctoJson.esPorcentaje = "" ;
             obj24listaDsctoJson.LimiteInferior = "" ;
             obj24listaDsctoJson.Recalcular = "" ;
             
             var obj25listaDsctoJson = {};
             obj25listaDsctoJson.matPosicion = "" ;
             obj25listaDsctoJson.id = 25;
             obj25listaDsctoJson.Posicion = "" ;
             obj25listaDsctoJson.Condicion = "" ;
             obj25listaDsctoJson.Importe = "" ;
             obj25listaDsctoJson.ImporteAnterior = "" ;
             obj25listaDsctoJson.Moneda = "" ;
             obj25listaDsctoJson.Valor = "" ;
             obj25listaDsctoJson.Denominacion = "" ;
             obj25listaDsctoJson.esPorcentaje = "" ;
             obj25listaDsctoJson.LimiteInferior = "" ;
             obj25listaDsctoJson.Recalcular = "" ;
             
             var obj26listaDsctoJson = {};
             obj26listaDsctoJson.matPosicion = "" ;
             obj26listaDsctoJson.id = 26;
             obj26listaDsctoJson.Posicion = "" ;
             obj26listaDsctoJson.Condicion = "" ;
             obj26listaDsctoJson.Importe = "" ;
             obj26listaDsctoJson.ImporteAnterior = "" ;
             obj26listaDsctoJson.Moneda = "" ;
             obj26listaDsctoJson.Valor = "" ;
             obj26listaDsctoJson.Denominacion = "" ;
             obj26listaDsctoJson.esPorcentaje = "" ;
             obj26listaDsctoJson.LimiteInferior = "" ;
             obj26listaDsctoJson.Recalcular = "" ;
             
             
             var obj27listaDsctoJson = {};
             obj27listaDsctoJson.matPosicion = "" ;
             obj27listaDsctoJson.id = 27;
             obj27listaDsctoJson.Posicion = "" ;
             obj27listaDsctoJson.Condicion = "" ;
             obj27listaDsctoJson.Importe = "" ;
             obj27listaDsctoJson.ImporteAnterior = "" ;
             obj27listaDsctoJson.Moneda = "" ;
             obj27listaDsctoJson.Valor = "" ;
             obj27listaDsctoJson.Denominacion = "" ;
             obj27listaDsctoJson.esPorcentaje = "" ;
             obj27listaDsctoJson.LimiteInferior = "" ;
             obj27listaDsctoJson.Recalcular = "" ;
             
             
             var obj28listaDsctoJson = {};
             obj28listaDsctoJson.matPosicion = "" ;
             obj28listaDsctoJson.id = 28;
             obj28listaDsctoJson.Posicion = "" ;
             obj28listaDsctoJson.Condicion = "" ;
             obj28listaDsctoJson.Importe = "" ;
             obj28listaDsctoJson.ImporteAnterior = "" ;
             obj28listaDsctoJson.Moneda = "" ;
             obj28listaDsctoJson.Valor = "" ;
             obj28listaDsctoJson.Denominacion = "" ;
             obj28listaDsctoJson.esPorcentaje = "" ;
             obj28listaDsctoJson.LimiteInferior = "" ;
             obj28listaDsctoJson.Recalcular = "" ;
             
             var obj29listaDsctoJson = {};
             obj29listaDsctoJson.matPosicion = "" ;
             obj29listaDsctoJson.id = 29;
             obj29listaDsctoJson.Posicion = "" ;
             obj29listaDsctoJson.Condicion = "" ;
             obj29listaDsctoJson.Importe = "" ;
             obj29listaDsctoJson.ImporteAnterior = "" ;
             obj29listaDsctoJson.Moneda = "" ;
             obj29listaDsctoJson.Valor = "" ;
             obj29listaDsctoJson.Denominacion = "" ;
             obj29listaDsctoJson.esPorcentaje = "" ;
             obj29listaDsctoJson.LimiteInferior = "" ;
             obj29listaDsctoJson.Recalcular = "" ;
             
             
             var obj30listaDsctoJson = {};
             obj30listaDsctoJson.matPosicion = "" ;
             obj30listaDsctoJson.id = 30;
             obj30listaDsctoJson.Posicion = "" ;
             obj30listaDsctoJson.Condicion = "" ;
             obj30listaDsctoJson.Importe = "" ;
             obj30listaDsctoJson.ImporteAnterior = "" ;
             obj30listaDsctoJson.Moneda = "" ;
             obj30listaDsctoJson.Valor = "" ;
             obj30listaDsctoJson.Denominacion = "" ;
             obj30listaDsctoJson.esPorcentaje = "" ;
             obj30listaDsctoJson.LimiteInferior = "" ;
             obj30listaDsctoJson.Recalcular = "" ;
             
             
             var obj31listaDsctoJson = {};
             obj31listaDsctoJson.matPosicion = "" ;
             obj31listaDsctoJson.id = 31;
             obj31listaDsctoJson.Posicion = "" ;
             obj31listaDsctoJson.Condicion = "" ;
             obj31listaDsctoJson.Importe = "" ;
             obj31listaDsctoJson.ImporteAnterior = "" ;
             obj31listaDsctoJson.Moneda = "" ;
             obj31listaDsctoJson.Valor = "" ;
             obj31listaDsctoJson.Denominacion = "" ;
             obj31listaDsctoJson.esPorcentaje = "" ;
             obj31listaDsctoJson.LimiteInferior = "" ;
             obj31listaDsctoJson.Recalcular = "" ;
             
             var obj32listaDsctoJson = {};
             obj32listaDsctoJson.matPosicion = "" ;
             obj32listaDsctoJson.id = 32;
             obj32listaDsctoJson.Posicion = "" ;
             obj32listaDsctoJson.Condicion = "" ;
             obj32listaDsctoJson.Importe = "" ;
             obj32listaDsctoJson.ImporteAnterior = "" ;
             obj32listaDsctoJson.Moneda = "" ;
             obj32listaDsctoJson.Valor = "" ;
             obj32listaDsctoJson.Denominacion = "" ;
             obj32listaDsctoJson.esPorcentaje = "" ;
             obj32listaDsctoJson.LimiteInferior = "" ;
             obj32listaDsctoJson.Recalcular = "" ;
             
             
             var obj33listaDsctoJson = {};
             obj33listaDsctoJson.matPosicion = "" ;
             obj33listaDsctoJson.id = 33;
             obj33listaDsctoJson.Posicion = "" ;
             obj33listaDsctoJson.Condicion = "" ;
             obj33listaDsctoJson.Importe = "" ;
             obj33listaDsctoJson.ImporteAnterior = "" ;
             obj33listaDsctoJson.Moneda = "" ;
             obj33listaDsctoJson.Valor = "" ;
             obj33listaDsctoJson.Denominacion = "" ;
             obj33listaDsctoJson.esPorcentaje = "" ;
             obj33listaDsctoJson.LimiteInferior = "" ;
             obj33listaDsctoJson.Recalcular = "" ;
             
             
             var obj34listaDsctoJson = {};
             obj34listaDsctoJson.matPosicion = "" ;
             obj34listaDsctoJson.id = 34;
             obj34listaDsctoJson.Posicion = "" ;
             obj34listaDsctoJson.Condicion = "" ;
             obj34listaDsctoJson.Importe = "" ;
             obj34listaDsctoJson.ImporteAnterior = "" ;
             obj34listaDsctoJson.Moneda = "" ;
             obj34listaDsctoJson.Valor = "" ;
             obj34listaDsctoJson.Denominacion = "" ;
             obj34listaDsctoJson.esPorcentaje = "" ;
             obj34listaDsctoJson.LimiteInferior = "" ;
             obj34listaDsctoJson.Recalcular = "" ;
             
             
             var obj35listaDsctoJson = {};
             obj35listaDsctoJson.matPosicion = "" ;
             obj35listaDsctoJson.id = 35;
             obj35listaDsctoJson.Posicion = "" ;
             obj35listaDsctoJson.Condicion = "" ;
             obj35listaDsctoJson.Importe = "" ;
             obj35listaDsctoJson.ImporteAnterior = "" ;
             obj35listaDsctoJson.Moneda = "" ;
             obj35listaDsctoJson.Valor = "" ;
             obj35listaDsctoJson.Denominacion = "" ;
             obj35listaDsctoJson.esPorcentaje = "" ;
             obj35listaDsctoJson.LimiteInferior = "" ;
             obj35listaDsctoJson.Recalcular = "" ;
             
             
             var obj36listaDsctoJson = {};
             obj36listaDsctoJson.matPosicion = "" ;
             obj36listaDsctoJson.id = 36;
             obj36listaDsctoJson.Posicion = "" ;
             obj36listaDsctoJson.Condicion = "" ;
             obj36listaDsctoJson.Importe = "" ;
             obj36listaDsctoJson.ImporteAnterior = "" ;
             obj36listaDsctoJson.Moneda = "" ;
             obj36listaDsctoJson.Valor = "" ;
             obj36listaDsctoJson.Denominacion = "" ;
             obj36listaDsctoJson.esPorcentaje = "" ;
             obj36listaDsctoJson.LimiteInferior = "" ;
             obj36listaDsctoJson.Recalcular = "" ;
             
             
             var obj37listaDsctoJson = {};
             obj37listaDsctoJson.matPosicion = "" ;
             obj37listaDsctoJson.id = 37;
             obj37listaDsctoJson.Posicion = "" ;
             obj37listaDsctoJson.Condicion = "" ;
             obj37listaDsctoJson.Importe = "" ;
             obj37listaDsctoJson.ImporteAnterior = "" ;
             obj37listaDsctoJson.Moneda = "" ;
             obj37listaDsctoJson.Valor = "" ;
             obj37listaDsctoJson.Denominacion = "" ;
             obj37listaDsctoJson.esPorcentaje = "" ;
             obj37listaDsctoJson.LimiteInferior = "" ;
             obj37listaDsctoJson.Recalcular = "" ;
             
             
             var obj38listaDsctoJson = {};
             obj38listaDsctoJson.matPosicion = "" ;
             obj38listaDsctoJson.id = 38;
             obj38listaDsctoJson.Posicion = "" ;
             obj38listaDsctoJson.Condicion = "" ;
             obj38listaDsctoJson.Importe = "" ;
             obj38listaDsctoJson.ImporteAnterior = "" ;
             obj38listaDsctoJson.Moneda = "" ;
             obj38listaDsctoJson.Valor = "" ;
             obj38listaDsctoJson.Denominacion = "" ;
             obj38listaDsctoJson.esPorcentaje = "" ;
             obj38listaDsctoJson.LimiteInferior = "" ;
             obj38listaDsctoJson.Recalcular = "" ;
             
             var obj39listaDsctoJson = {};
             obj39listaDsctoJson.matPosicion = "" ;
             obj39listaDsctoJson.id = 39;
             obj39listaDsctoJson.Posicion = "" ;
             obj39listaDsctoJson.Condicion = "" ;
             obj39listaDsctoJson.Importe = "" ;
             obj39listaDsctoJson.ImporteAnterior = "" ;
             obj39listaDsctoJson.Moneda = "" ;
             obj39listaDsctoJson.Valor = "" ;
             obj39listaDsctoJson.Denominacion = "" ;
             obj39listaDsctoJson.esPorcentaje = "" ;
             obj39listaDsctoJson.LimiteInferior = "" ;
             obj39listaDsctoJson.Recalcular = "" ;
             
             var obj40listaDsctoJson = {};
             obj40listaDsctoJson.matPosicion = "" ;
             obj40listaDsctoJson.id = 40;
             obj40listaDsctoJson.Posicion = "" ;
             obj40listaDsctoJson.Condicion = "" ;
             obj40listaDsctoJson.Importe = "" ;
             obj40listaDsctoJson.ImporteAnterior = "" ;
             obj40listaDsctoJson.Moneda = "" ;
             obj40listaDsctoJson.Valor = "" ;
             obj40listaDsctoJson.Denominacion = "" ;
             obj40listaDsctoJson.esPorcentaje = "" ;
             obj40listaDsctoJson.LimiteInferior = "" ;
             obj40listaDsctoJson.Recalcular = "" ;
             
             
             var obj41listaDsctoJson = {};
             obj41listaDsctoJson.matPosicion = "" ;
             obj41listaDsctoJson.id = 41;
             obj41listaDsctoJson.Posicion = "" ;
             obj41listaDsctoJson.Condicion = "" ;
             obj41listaDsctoJson.Importe = "" ;
             obj41listaDsctoJson.ImporteAnterior = "" ;
             obj41listaDsctoJson.Moneda = "" ;
             obj41listaDsctoJson.Valor = "" ;
             obj41listaDsctoJson.Denominacion = "" ;
             obj41listaDsctoJson.esPorcentaje = "" ;
             obj41listaDsctoJson.LimiteInferior = "" ;
             obj41listaDsctoJson.Recalcular = "" ;
             
             
             var obj42listaDsctoJson = {};
             obj42listaDsctoJson.matPosicion = "" ;
             obj42listaDsctoJson.id = 42;
             obj42listaDsctoJson.Posicion = "" ;
             obj42listaDsctoJson.Condicion = "" ;
             obj42listaDsctoJson.Importe = "" ;
             obj42listaDsctoJson.ImporteAnterior = "" ;
             obj42listaDsctoJson.Moneda = "" ;
             obj42listaDsctoJson.Valor = "" ;
             obj42listaDsctoJson.Denominacion = "" ;
             obj42listaDsctoJson.esPorcentaje = "" ;
             obj42listaDsctoJson.LimiteInferior = "" ;
             obj42listaDsctoJson.Recalcular = "" ;
             
             
             var obj43listaDsctoJson = {};
             obj43listaDsctoJson.matPosicion = "" ;
             obj43listaDsctoJson.id = 43;
             obj43listaDsctoJson.Posicion = "" ;
             obj43listaDsctoJson.Condicion = "" ;
             obj43listaDsctoJson.Importe = "" ;
             obj43listaDsctoJson.ImporteAnterior = "" ;
             obj43listaDsctoJson.Moneda = "" ;
             obj43listaDsctoJson.Valor = "" ;
             obj43listaDsctoJson.Denominacion = "" ;
             obj43listaDsctoJson.esPorcentaje = "" ;
             obj43listaDsctoJson.LimiteInferior = "" ;
             obj43listaDsctoJson.Recalcular = "" ;
             
             
             var obj44listaDsctoJson = {};
             obj44listaDsctoJson.matPosicion = "" ;
             obj44listaDsctoJson.id = 44;
             obj44listaDsctoJson.Posicion = "" ;
             obj44listaDsctoJson.Condicion = "" ;
             obj44listaDsctoJson.Importe = "" ;
             obj44listaDsctoJson.ImporteAnterior = "" ;
             obj44listaDsctoJson.Moneda = "" ;
             obj44listaDsctoJson.Valor = "" ;
             obj44listaDsctoJson.Denominacion = "" ;
             obj44listaDsctoJson.esPorcentaje = "" ;
             obj44listaDsctoJson.LimiteInferior = "" ;
             obj44listaDsctoJson.Recalcular = "" ;
             
             
             var obj45listaDsctoJson = {};
             obj45listaDsctoJson.matPosicion = "" ;
             obj45listaDsctoJson.id = 45;
             obj45listaDsctoJson.Posicion = "" ;
             obj45listaDsctoJson.Condicion = "" ;
             obj45listaDsctoJson.Importe = "" ;
             obj45listaDsctoJson.ImporteAnterior = "" ;
             obj45listaDsctoJson.Moneda = "" ;
             obj45listaDsctoJson.Valor = "" ;
             obj45listaDsctoJson.Denominacion = "" ;
             obj45listaDsctoJson.esPorcentaje = "" ;
             obj45listaDsctoJson.LimiteInferior = "" ;
             obj45listaDsctoJson.Recalcular = "" ;
             
             
             var obj46listaDsctoJson = {};
             obj46listaDsctoJson.matPosicion = "" ;
             obj46listaDsctoJson.id = 46;
             obj46listaDsctoJson.Posicion = "" ;
             obj46listaDsctoJson.Condicion = "" ;
             obj46listaDsctoJson.Importe = "" ;
             obj46listaDsctoJson.ImporteAnterior = "" ;
             obj46listaDsctoJson.Moneda = "" ;
             obj46listaDsctoJson.Valor = "" ;
             obj46listaDsctoJson.Denominacion = "" ;
             obj46listaDsctoJson.esPorcentaje = "" ;
             obj46listaDsctoJson.LimiteInferior = "" ;
             obj46listaDsctoJson.Recalcular = "" ;
             
             var obj47listaDsctoJson = {};
             obj47listaDsctoJson.matPosicion = "" ;
             obj47listaDsctoJson.id = 47;
             obj47listaDsctoJson.Posicion = "" ;
             obj47listaDsctoJson.Condicion = "" ;
             obj47listaDsctoJson.Importe = "" ;
             obj47listaDsctoJson.ImporteAnterior = "" ;
             obj47listaDsctoJson.Moneda = "" ;
             obj47listaDsctoJson.Valor = "" ;
             obj47listaDsctoJson.Denominacion = "" ;
             obj47listaDsctoJson.esPorcentaje = "" ;
             obj47listaDsctoJson.LimiteInferior = "" ;
             obj47listaDsctoJson.Recalcular = "" ;
             
             
             var obj48listaDsctoJson = {};
             obj48listaDsctoJson.matPosicion = "" ;
             obj48listaDsctoJson.id = 48;
             obj48listaDsctoJson.Posicion = "" ;
             obj48listaDsctoJson.Condicion = "" ;
             obj48listaDsctoJson.Importe = "" ;
             obj48listaDsctoJson.ImporteAnterior = "" ;
             obj48listaDsctoJson.Moneda = "" ;
             obj48listaDsctoJson.Valor = "" ;
             obj48listaDsctoJson.Denominacion = "" ;
             obj48listaDsctoJson.esPorcentaje = "" ;
             obj48listaDsctoJson.LimiteInferior = "" ;
             obj48listaDsctoJson.Recalcular = "" ;
             
             
             var obj49listaDsctoJson = {};
             obj49listaDsctoJson.matPosicion = "" ;
             obj49listaDsctoJson.id = 49;
             obj49listaDsctoJson.Posicion = "" ;
             obj49listaDsctoJson.Condicion = "" ;
             obj49listaDsctoJson.Importe = "" ;
             obj49listaDsctoJson.ImporteAnterior = "" ;
             obj49listaDsctoJson.Moneda = "" ;
             obj49listaDsctoJson.Valor = "" ;
             obj49listaDsctoJson.Denominacion = "" ;
             obj49listaDsctoJson.esPorcentaje = "" ;
             obj49listaDsctoJson.LimiteInferior = "" ;
             obj49listaDsctoJson.Recalcular = "" ;
             
             var obj50listaDsctoJson = {};
             obj50listaDsctoJson.matPosicion = "" ;
             obj50listaDsctoJson.id = 50;
             obj50listaDsctoJson.Posicion = "" ;
             obj50listaDsctoJson.Condicion = "" ;
             obj50listaDsctoJson.Importe = "" ;
             obj50listaDsctoJson.ImporteAnterior = "" ;
             obj50listaDsctoJson.Moneda = "" ;
             obj50listaDsctoJson.Valor = "" ;
             obj50listaDsctoJson.Denominacion = "" ;
             obj50listaDsctoJson.esPorcentaje = "" ;
             obj50listaDsctoJson.LimiteInferior = "" ;
             obj50listaDsctoJson.Recalcular = "" ;
             
             var obj51listaDsctoJson = {};
             obj51listaDsctoJson.matPosicion = "" ;
             obj51listaDsctoJson.id = 51;
             obj51listaDsctoJson.Posicion = "" ;
             obj51listaDsctoJson.Condicion = "" ;
             obj51listaDsctoJson.Importe = "" ;
             obj51listaDsctoJson.ImporteAnterior = "" ;
             obj51listaDsctoJson.Moneda = "" ;
             obj51listaDsctoJson.Valor = "" ;
             obj51listaDsctoJson.Denominacion = "" ;
             obj51listaDsctoJson.esPorcentaje = "" ;
             obj51listaDsctoJson.LimiteInferior = "" ;
             obj51listaDsctoJson.Recalcular = "" ;
             
             var obj52listaDsctoJson = {};
             obj52listaDsctoJson.matPosicion = "" ;
             obj52listaDsctoJson.id = 52;
             obj52listaDsctoJson.Posicion = "" ;
             obj52listaDsctoJson.Condicion = "" ;
             obj52listaDsctoJson.Importe = "" ;
             obj52listaDsctoJson.ImporteAnterior = "" ;
             obj52listaDsctoJson.Moneda = "" ;
             obj52listaDsctoJson.Valor = "" ;
             obj52listaDsctoJson.Denominacion = "" ;
             obj52listaDsctoJson.esPorcentaje = "" ;
             obj52listaDsctoJson.LimiteInferior = "" ;
             obj52listaDsctoJson.Recalcular = "" ;
             
             
             var obj53listaDsctoJson ={};
             obj53listaDsctoJson.matPosicion = "" ;
             obj53listaDsctoJson.id = 53;
             obj53listaDsctoJson.Posicion = "" ;
             obj53listaDsctoJson.Condicion = "" ;
             obj53listaDsctoJson.Importe = "" ;
             obj53listaDsctoJson.ImporteAnterior = "" ;
             obj53listaDsctoJson.Moneda = "" ;
             obj53listaDsctoJson.Valor = "" ;
             obj53listaDsctoJson.Denominacion = "" ;
             obj53listaDsctoJson.esPorcentaje = "" ;
             obj53listaDsctoJson.LimiteInferior = "" ;
             obj53listaDsctoJson.Recalcular = "" ;
             
             
             var obj54listaDsctoJson = {};
             obj54listaDsctoJson.matPosicion = "" ;
             obj54listaDsctoJson.id = 54;
             obj54listaDsctoJson.Posicion = "" ;
             obj54listaDsctoJson.Condicion = "" ;
             obj54listaDsctoJson.Importe = "" ;
             obj54listaDsctoJson.ImporteAnterior = "" ;
             obj54listaDsctoJson.Moneda = "" ;
             obj54listaDsctoJson.Valor = "" ;
             obj54listaDsctoJson.Denominacion = "" ;
             obj54listaDsctoJson.esPorcentaje = "" ;
             obj54listaDsctoJson.LimiteInferior = "" ;
             obj54listaDsctoJson.Recalcular = "" ;
             
             
             var obj55listaDsctoJson = {};
             obj55listaDsctoJson.matPosicion = "" ;
             obj55listaDsctoJson.id = 55;
             obj55listaDsctoJson.Posicion = "" ;
             obj55listaDsctoJson.Condicion = "" ;
             obj55listaDsctoJson.Importe = "" ;
             obj55listaDsctoJson.ImporteAnterior = "" ;
             obj55listaDsctoJson.Moneda = "" ;
             obj55listaDsctoJson.Valor = "" ;
             obj55listaDsctoJson.Denominacion = "" ;
             obj55listaDsctoJson.esPorcentaje = "" ;
             obj55listaDsctoJson.LimiteInferior = "" ;
             obj55listaDsctoJson.Recalcular = "" ;
             
             
             var obj56listaDsctoJson = {};
             obj56listaDsctoJson.matPosicion = "" ;
             obj56listaDsctoJson.id = 56;
             obj56listaDsctoJson.Posicion = "" ;
             obj56listaDsctoJson.Condicion = "" ;
             obj56listaDsctoJson.Importe = "" ;
             obj56listaDsctoJson.ImporteAnterior = "" ;
             obj56listaDsctoJson.Moneda = "" ;
             obj56listaDsctoJson.Valor = "" ;
             obj56listaDsctoJson.Denominacion = "" ;
             obj56listaDsctoJson.esPorcentaje = "" ;
             obj56listaDsctoJson.LimiteInferior = "" ;
             obj56listaDsctoJson.Recalcular = "" ;
             
             
             var obj57listaDsctoJson = {};
             obj57listaDsctoJson.matPosicion = "" ;
             obj57listaDsctoJson.id = 57;
             obj57listaDsctoJson.Posicion = "" ;
             obj57listaDsctoJson.Condicion = "" ;
             obj57listaDsctoJson.Importe = "" ;
             obj57listaDsctoJson.ImporteAnterior = "" ;
             obj57listaDsctoJson.Moneda = "" ;
             obj57listaDsctoJson.Valor = "" ;
             obj57listaDsctoJson.Denominacion = "" ;
             obj57listaDsctoJson.esPorcentaje = "" ;
             obj57listaDsctoJson.LimiteInferior = "" ;
             obj57listaDsctoJson.Recalcular = "" ;
             
             
             var obj58listaDsctoJson = {};
             obj58listaDsctoJson.matPosicion = "" ;
             obj58listaDsctoJson.id = 58;
             obj58listaDsctoJson.Posicion = "" ;
             obj58listaDsctoJson.Condicion = "" ;
             obj58listaDsctoJson.Importe = "" ;
             obj58listaDsctoJson.ImporteAnterior = "" ;
             obj58listaDsctoJson.Moneda = "" ;
             obj58listaDsctoJson.Valor = "" ;
             obj58listaDsctoJson.Denominacion = "" ;
             obj58listaDsctoJson.esPorcentaje = "" ;
             obj58listaDsctoJson.LimiteInferior = "" ;
             obj58listaDsctoJson.Recalcular = "" ;
             
             
             var obj59listaDsctoJson = {};
             obj59listaDsctoJson.matPosicion = "" ;
             obj59listaDsctoJson.id = 59;
             obj59listaDsctoJson.Posicion = "" ;
             obj59listaDsctoJson.Condicion = "" ;
             obj59listaDsctoJson.Importe = "" ;
             obj59listaDsctoJson.ImporteAnterior = "" ;
             obj59listaDsctoJson.Moneda = "" ;
             obj59listaDsctoJson.Valor = "" ;
             obj59listaDsctoJson.Denominacion = "" ;
             obj59listaDsctoJson.esPorcentaje = "" ;
             obj59listaDsctoJson.LimiteInferior = "" ;
             obj59listaDsctoJson.Recalcular = "" ;
             
             
             var obj60listaDsctoJson = {};
             obj60listaDsctoJson.matPosicion = "" ;
             obj60listaDsctoJson.id = 60;
             obj60listaDsctoJson.Posicion = "" ;
             obj60listaDsctoJson.Condicion = "" ;
             obj60listaDsctoJson.Importe = "" ;
             obj60listaDsctoJson.ImporteAnterior = "" ;
             obj60listaDsctoJson.Moneda = "" ;
             obj60listaDsctoJson.Valor = "" ;
             obj60listaDsctoJson.Denominacion = "" ;
             obj60listaDsctoJson.esPorcentaje = "" ;
             obj60listaDsctoJson.LimiteInferior = "" ;
             obj60listaDsctoJson.Recalcular = "" ;
             
             
             var obj61listaDsctoJson = {};
             obj61listaDsctoJson.matPosicion = "" ;
             obj61listaDsctoJson.id = 61;
             obj61listaDsctoJson.Posicion = "" ;
             obj61listaDsctoJson.Condicion = "" ;
             obj61listaDsctoJson.Importe = "" ;
             obj61listaDsctoJson.ImporteAnterior = "" ;
             obj61listaDsctoJson.Moneda = "" ;
             obj61listaDsctoJson.Valor = "" ;
             obj61listaDsctoJson.Denominacion = "" ;
             obj61listaDsctoJson.esPorcentaje = "" ;
             obj61listaDsctoJson.LimiteInferior = "" ;
             obj61listaDsctoJson.Recalcular = "" ;
             
             
             var obj62listaDsctoJson = {};
             obj62listaDsctoJson.matPosicion = "" ;
             obj62listaDsctoJson.id = 62;
             obj62listaDsctoJson.Posicion = "" ;
             obj62listaDsctoJson.Condicion = "" ;
             obj62listaDsctoJson.Importe = "" ;
             obj62listaDsctoJson.ImporteAnterior = "" ;
             obj62listaDsctoJson.Moneda = "" ;
             obj62listaDsctoJson.Valor = "" ;
             obj62listaDsctoJson.Denominacion = "" ;
             obj62listaDsctoJson.esPorcentaje = "" ;
             obj62listaDsctoJson.LimiteInferior = "" ;
             obj62listaDsctoJson.Recalcular = "" ;
             
             
             var obj63listaDsctoJson = {};
             obj63listaDsctoJson.matPosicion = "" ;
             obj63listaDsctoJson.id = 63;
             obj63listaDsctoJson.Posicion = "" ;
             obj63listaDsctoJson.Condicion = "" ;
             obj63listaDsctoJson.Importe = "" ;
             obj63listaDsctoJson.ImporteAnterior = "" ;
             obj63listaDsctoJson.Moneda = "" ;
             obj63listaDsctoJson.Valor = "" ;
             obj63listaDsctoJson.Denominacion = "" ;
             obj63listaDsctoJson.esPorcentaje = "" ;
             obj63listaDsctoJson.LimiteInferior = "" ;
             obj63listaDsctoJson.Recalcular = "" ;
             
             
             var obj64listaDsctoJson = {};
             obj64listaDsctoJson.matPosicion = "" ;
             obj64listaDsctoJson.id = 64;
             obj64listaDsctoJson.Posicion = "" ;
             obj64listaDsctoJson.Condicion = "" ;
             obj64listaDsctoJson.Importe = "" ;
             obj64listaDsctoJson.ImporteAnterior = "" ;
             obj64listaDsctoJson.Moneda = "" ;
             obj64listaDsctoJson.Valor = "" ;
             obj64listaDsctoJson.Denominacion = "" ;
             obj64listaDsctoJson.esPorcentaje = "" ;
             obj64listaDsctoJson.LimiteInferior = "" ;
             obj64listaDsctoJson.Recalcular = "" ;
             
             
             var obj65listaDsctoJson = {};
             obj65listaDsctoJson.matPosicion = "" ;
             obj65listaDsctoJson.id = 65;
             obj65listaDsctoJson.Posicion = "" ;
             obj65listaDsctoJson.Condicion = "" ;
             obj65listaDsctoJson.Importe = "" ;
             obj65listaDsctoJson.ImporteAnterior = "" ;
             obj65listaDsctoJson.Moneda = "" ;
             obj65listaDsctoJson.Valor = "" ;
             obj65listaDsctoJson.Denominacion = "" ;
             obj65listaDsctoJson.esPorcentaje = "" ;
             obj65listaDsctoJson.LimiteInferior = "" ;
             obj65listaDsctoJson.Recalcular = "" ;
             
             
             var obj66listaDsctoJson = {};
             obj66listaDsctoJson.matPosicion = "" ;
             obj66listaDsctoJson.id = 66;
             obj66listaDsctoJson.Posicion = "" ;
             obj66listaDsctoJson.Condicion = "" ;
             obj66listaDsctoJson.Importe = "" ;
             obj66listaDsctoJson.ImporteAnterior = "" ;
             obj66listaDsctoJson.Moneda = "" ;
             obj66listaDsctoJson.Valor = "" ;
             obj66listaDsctoJson.Denominacion = "" ;
             obj66listaDsctoJson.esPorcentaje = "" ;
             obj66listaDsctoJson.LimiteInferior = "" ;
             obj66listaDsctoJson.Recalcular = "" ;
             
             
             var obj67listaDsctoJson = {};
             obj67listaDsctoJson.matPosicion = "" ;
             obj67listaDsctoJson.id = 67;
             obj67listaDsctoJson.Posicion = "" ;
             obj67listaDsctoJson.Condicion = "" ;
             obj67listaDsctoJson.Importe = "" ;
             obj67listaDsctoJson.ImporteAnterior = "" ;
             obj67listaDsctoJson.Moneda = "" ;
             obj67listaDsctoJson.Valor = "" ;
             obj67listaDsctoJson.Denominacion = "" ;
             obj67listaDsctoJson.esPorcentaje = "" ;
             obj67listaDsctoJson.LimiteInferior = "" ;
             obj67listaDsctoJson.Recalcular = "" ;
             
             
             var obj68listaDsctoJson = {};
             obj68listaDsctoJson.matPosicion = "" ;
             obj68listaDsctoJson.id = 68;
             obj68listaDsctoJson.Posicion = "" ;
             obj68listaDsctoJson.Condicion = "" ;
             obj68listaDsctoJson.Importe = "" ;
             obj68listaDsctoJson.ImporteAnterior = "" ;
             obj68listaDsctoJson.Moneda = "" ;
             obj68listaDsctoJson.Valor = "" ;
             obj68listaDsctoJson.Denominacion = "" ;
             obj68listaDsctoJson.esPorcentaje = "" ;
             obj68listaDsctoJson.LimiteInferior = "" ;
             obj68listaDsctoJson.Recalcular = "" ;
             
             
             var obj69listaDsctoJson = {};
             obj69listaDsctoJson.matPosicion = "" ;
             obj69listaDsctoJson.id = 69;
             obj69listaDsctoJson.Posicion = "" ;
             obj69listaDsctoJson.Condicion = "" ;
             obj69listaDsctoJson.Importe = "" ;
             obj69listaDsctoJson.ImporteAnterior = "" ;
             obj69listaDsctoJson.Moneda = "" ;
             obj69listaDsctoJson.Valor = "" ;
             obj69listaDsctoJson.Denominacion = "" ;
             obj69listaDsctoJson.esPorcentaje = "" ;
             obj69listaDsctoJson.LimiteInferior = "" ;
             obj69listaDsctoJson.Recalcular = "" ;
             
             
             var obj70listaDsctoJson = {};
             obj70listaDsctoJson.matPosicion = "" ;
             obj70listaDsctoJson.id = 70;
             obj70listaDsctoJson.Posicion = "" ;
             obj70listaDsctoJson.Condicion = "" ;
             obj70listaDsctoJson.Importe = "" ;
             obj70listaDsctoJson.ImporteAnterior = "" ;
             obj70listaDsctoJson.Moneda = "" ;
             obj70listaDsctoJson.Valor = "" ;
             obj70listaDsctoJson.Denominacion = "" ;
             obj70listaDsctoJson.esPorcentaje = "" ;
             obj70listaDsctoJson.LimiteInferior = "" ;
             obj70listaDsctoJson.Recalcular = "" ;
             
             
             var obj71listaDsctoJson = {};
             obj71listaDsctoJson.matPosicion = "" ;
             obj71listaDsctoJson.id = 71;
             obj71listaDsctoJson.Posicion = "" ;
             obj71listaDsctoJson.Condicion = "" ;
             obj71listaDsctoJson.Importe = "" ;
             obj71listaDsctoJson.ImporteAnterior = "" ;
             obj71listaDsctoJson.Moneda = "" ;
             obj71listaDsctoJson.Valor = "" ;
             obj71listaDsctoJson.Denominacion = "" ;
             obj71listaDsctoJson.esPorcentaje = "" ;
             obj71listaDsctoJson.LimiteInferior = "" ;
             obj71listaDsctoJson.Recalcular = "" ;
             
             
             var obj72listaDsctoJson = {};
             obj72listaDsctoJson.matPosicion = "" ;
             obj72listaDsctoJson.id = 72;
             obj72listaDsctoJson.Posicion = "" ;
             obj72listaDsctoJson.Condicion = "" ;
             obj72listaDsctoJson.Importe = "" ;
             obj72listaDsctoJson.ImporteAnterior = "" ;
             obj72listaDsctoJson.Moneda = "" ;
             obj72listaDsctoJson.Valor = "" ;
             obj72listaDsctoJson.Denominacion = "" ;
             obj72listaDsctoJson.esPorcentaje = "" ;
             obj72listaDsctoJson.LimiteInferior = "" ;
             obj72listaDsctoJson.Recalcular = "" ;
             
             
             */
            listaDsctoJson.push(obj1listaDsctoJson);
            listaDsctoJson.push(obj2listaDsctoJson);
            listaDsctoJson.push(obj3listaDsctoJson);
            listaDsctoJson.push(obj4listaDsctoJson);
            listaDsctoJson.push(obj5listaDsctoJson);
            listaDsctoJson.push(obj6listaDsctoJson);
            listaDsctoJson.push(obj7listaDsctoJson);
            listaDsctoJson.push(obj8listaDsctoJson);
            listaDsctoJson.push(obj9listaDsctoJson);
            listaDsctoJson.push(obj10listaDsctoJson);
            listaDsctoJson.push(obj11listaDsctoJson);
            listaDsctoJson.push(obj12listaDsctoJson);
            listaDsctoJson.push(obj13listaDsctoJson);
            listaDsctoJson.push(obj14listaDsctoJson);
            listaDsctoJson.push(obj15listaDsctoJson);
            listaDsctoJson.push(obj16listaDsctoJson);
            listaDsctoJson.push(obj17listaDsctoJson);
            listaDsctoJson.push(obj18listaDsctoJson);
            var listaDsctoJsonLleno = JSON.stringify(listaDsctoJson);
            /*
             
             listaDsctoJson.push(obj19listaDsctoJson);
             listaDsctoJson.push(obj20listaDsctoJson);
             listaDsctoJson.push(obj21listaDsctoJson);
             listaDsctoJson.push(obj22listaDsctoJson);
             listaDsctoJson.push(obj23listaDsctoJson);
             listaDsctoJson.push(obj24listaDsctoJson);
             listaDsctoJson.push(obj25listaDsctoJson);
             listaDsctoJson.push(obj26listaDsctoJson);
             listaDsctoJson.push(obj27listaDsctoJson);
             listaDsctoJson.push(obj28listaDsctoJson);
             listaDsctoJson.push(obj29listaDsctoJson);
             listaDsctoJson.push(obj30listaDsctoJson);
             listaDsctoJson.push(obj31listaDsctoJson);
             listaDsctoJson.push(obj32listaDsctoJson);
             listaDsctoJson.push(obj33listaDsctoJson);
             listaDsctoJson.push(obj34listaDsctoJson);
             listaDsctoJson.push(obj35listaDsctoJson);
             listaDsctoJson.push(obj36listaDsctoJson);
             listaDsctoJson.push(obj37listaDsctoJson);
             listaDsctoJson.push(obj38listaDsctoJson);
             listaDsctoJson.push(obj39listaDsctoJson);
             listaDsctoJson.push(obj40listaDsctoJson);
             listaDsctoJson.push(obj41listaDsctoJson);
             listaDsctoJson.push(obj42listaDsctoJson);
             listaDsctoJson.push(obj43listaDsctoJson);
             listaDsctoJson.push(obj44listaDsctoJson);
             listaDsctoJson.push(obj45listaDsctoJson);
             listaDsctoJson.push(obj46listaDsctoJson);
             listaDsctoJson.push(obj47listaDsctoJson);
             listaDsctoJson.push(obj48listaDsctoJson);
             listaDsctoJson.push(obj49listaDsctoJson);
             listaDsctoJson.push(obj50listaDsctoJson);
             listaDsctoJson.push(obj51listaDsctoJson);
             listaDsctoJson.push(obj52listaDsctoJson);
             listaDsctoJson.push(obj53listaDsctoJson);
             listaDsctoJson.push(obj54listaDsctoJson);
             listaDsctoJson.push(obj55listaDsctoJson);
             listaDsctoJson.push(obj56listaDsctoJson);
             listaDsctoJson.push(obj57listaDsctoJson);
             listaDsctoJson.push(obj58listaDsctoJson);
             listaDsctoJson.push(obj59listaDsctoJson);
             listaDsctoJson.push(obj60listaDsctoJson);
             listaDsctoJson.push(obj61listaDsctoJson);
             listaDsctoJson.push(obj62listaDsctoJson);
             listaDsctoJson.push(obj63listaDsctoJson);
             listaDsctoJson.push(obj64listaDsctoJson);
             listaDsctoJson.push(obj65listaDsctoJson);
             listaDsctoJson.push(obj66listaDsctoJson);
             listaDsctoJson.push(obj67listaDsctoJson);
             listaDsctoJson.push(obj68listaDsctoJson);
             listaDsctoJson.push(obj69listaDsctoJson);
             listaDsctoJson.push(obj70listaDsctoJson);
             listaDsctoJson.push(obj71listaDsctoJson);
             listaDsctoJson.push(obj72listaDsctoJson);
             
             
             */
            var listaRepartosJson = [];
            var obj1listaRepartosJson = {};
            obj1listaRepartosJson.matPosicion = 10;
            obj1listaRepartosJson.id = 1;
            obj1listaRepartosJson.TipoReparto = "";
            obj1listaRepartosJson.Pos = "1";
            obj1listaRepartosJson.PosCorto = "";
            obj1listaRepartosJson.FechaEntrega = "2017-06-22T05:00:00.000Z";
            obj1listaRepartosJson.CantPed = 1;
            obj1listaRepartosJson.CantConf = 1;
            obj1listaRepartosJson.CodUMedida = "";
            /*
             var obj2listaRepartosJson = {};
             obj2listaRepartosJson.matPosicion = "" ;
             obj2listaRepartosJson.id = 2;
             obj2listaRepartosJson.TipoReparto = "" ;
             obj2listaRepartosJson.Pos = "" ;
             obj2listaRepartosJson.PosCorto = "" ;
             obj2listaRepartosJson.FechaEntrega = "" ;
             obj2listaRepartosJson.CantPed = "" ;
             obj2listaRepartosJson.CantConf = "" ;
             obj2listaRepartosJson.CodUMedida = "" ;
             
             var obj3listaRepartosJson = {};
             obj3listaRepartosJson.matPosicion = "" ;
             obj3listaRepartosJson.id = 3;
             obj3listaRepartosJson.TipoReparto = "" ;
             obj3listaRepartosJson.Pos = "" ;
             obj3listaRepartosJson.PosCorto = "" ;
             obj3listaRepartosJson.FechaEntrega = "" ;
             obj3listaRepartosJson.CantPed = "" ;
             obj3listaRepartosJson.CantConf = "" ;
             obj3listaRepartosJson.CodUMedida = "" ;
             
             var obj4listaRepartosJson = {};
             obj4listaRepartosJson.matPosicion = "" ;
             obj4listaRepartosJson.id = 4;
             obj4listaRepartosJson.TipoReparto = "" ;
             obj4listaRepartosJson.Pos = "" ;
             obj4listaRepartosJson.PosCorto = "" ;
             obj4listaRepartosJson.FechaEntrega = "" ;
             obj4listaRepartosJson.CantPed = "" ;
             obj4listaRepartosJson.CantConf = "" ;
             obj4listaRepartosJson.CodUMedida = "" ;
             
             */
            listaRepartosJson.push(obj1listaRepartosJson);
            /*
             listaRepartosJson.push(obj2listaRepartosJson);
             listaRepartosJson.push(obj3listaRepartosJson);  
             listaRepartosJson.push(obj4listaRepartosJson);  
             */
            var listaRepartosJsonLleno = JSON.stringify(listaRepartosJson);
            var listaMatJson = []; //Se crea de acuerdo a cuantos materiales se agregan en detalles Productos
            var obj1listaMatJson = {};
            obj1listaMatJson.id = 1;
            obj1listaMatJson.CodMaterial = "000000000011000004";
            obj1listaMatJson.CodUMedida = "UN";
            obj1listaMatJson.Descripcion = "";
            obj1listaMatJson.Jerarquia = "";
            obj1listaMatJson.ValorRendimiento = 0;
            obj1listaMatJson.TipoMaterial = "NA3";
            obj1listaMatJson.EsFlete = false;
            obj1listaMatJson.EsEstiba = false;
            obj1listaMatJson.EspecialServ = false;
            obj1listaMatJson.Tipo = "Z001";
            obj1listaMatJson.CodMaterialCorto = "11000004";
            obj1listaMatJson.TieneServ = false;
            obj1listaMatJson.Rendimiento = "-";
            obj1listaMatJson.DescMovil = "10 - 11000004 VAINSA NVA ASIA D TEL BIDET TUB/MET 1.2MT C/SOP VAINSA NVA ASIA D TELBIDET TUB/MET 1.2 - 1 - 247.87";
            obj1listaMatJson.Descontinuado = "";
            obj1listaMatJson.UMedidaRendimiendo = "";
            obj1listaMatJson.DescMaterial = "VAINSA NVA ASIA D TEL BIDET TUB/MET 1.2MT C/SOP VAINSA NVA ASIA D TELBIDET TUB/MET 1.2";
            obj1listaMatJson.PrecioUnit = 0;
            obj1listaMatJson.Peso = 0.3;
            obj1listaMatJson.Stock = 0;
            obj1listaMatJson.Mstae = "";
            obj1listaMatJson.Vdscto = "0";
            obj1listaMatJson.StatusDespacho = "";
            obj1listaMatJson.StockPos = "";
            obj1listaMatJson.Posicion = "000010";
            obj1listaMatJson.Cantidad = 1;
            obj1listaMatJson.CodCentro = "1080";
            obj1listaMatJson.CodAlmacen = "0001";
            obj1listaMatJson.CodLote = "1000LD";
            obj1listaMatJson.PrecioSinIGV = 0;
            obj1listaMatJson.DsctoMontTotal = 0;
            obj1listaMatJson.MotivoRechazo = "";
            obj1listaMatJson.TipoPosAnt = "";
            obj1listaMatJson.CodGrupoMat = "07";
            obj1listaMatJson.Opcion = "02";
            obj1listaMatJson.Reembolsable = "";
            obj1listaMatJson.Zservicio = true;
            obj1listaMatJson.ContentID = "1011000004";
            obj1listaMatJson.DescMaterialTicketera = "VAINSA NVA ASIA D TEL BIDET TUB/MET";
            obj1listaMatJson.PrioridadEntrega = "03";
            obj1listaMatJson.FechaCantConf = "2017-06-22T05:00:00.000Z";
            obj1listaMatJson.FechaCantConfStr = "22/06/2017";
            obj1listaMatJson.PosSup = "000000";
            obj1listaMatJson.PosSupCorto = "";
            obj1listaMatJson.TipoPosicion = "Z006";
            obj1listaMatJson.CambAlmacen = false;
            obj1listaMatJson.CantComp = 0;
            obj1listaMatJson.PrecioTotal = 210.06;
            obj1listaMatJson.PrecioUnitario = 210.06;
            obj1listaMatJson.Total = 247.87;
            obj1listaMatJson.IgvUnitario = 18;
            obj1listaMatJson.IgvTotal = 37.81;
            obj1listaMatJson.TotalDctos = 0;
            obj1listaMatJson.SubTotal = 210.06;
            obj1listaMatJson.CantConfirmada = 0;
            obj1listaMatJson.PesoNeto = 0.3;
            obj1listaMatJson.PrecioConIGV = 0;
            obj1listaMatJson.TotalImpresion = 0;
            obj1listaMatJson.DescCentro = "Tienda Arequipa";
            obj1listaMatJson.DescAlmacen = "0001 (Tienda)";
            obj1listaMatJson.FechaEntregaString = "22/06/2017";
            obj1listaMatJson.Reparto = "03 22/06/17";
            obj1listaMatJson.TotPercep = 4.96;
            obj1listaMatJson.link = "http://140.20.0.7/Catalogo/sistema/productos.php?sku=11000004";
            obj1listaMatJson.DesGrupoMat = "Baño Principal";
            obj1listaMatJson.DivisionRendimiento = 0;
            obj1listaMatJson.mod = "";
            obj1listaMatJson.PosicionCorto = "10";
            obj1listaMatJson.SubTotalLista = 210.06;
            obj1listaMatJson.fullName = "1080 Tienda Arequipa / 0001 / 1000LD";
            listaMatJson.push(obj1listaMatJson);
            var listaMatJsonLleno = JSON.stringify(listaMatJson);
            var listaPedJson = [];
            var obj1listaPedJson = {};
            obj1listaPedJson.id = 1498155798420; //1497985445784,
            obj1listaPedJson.CodTipoDoc = "ZO01"; //"ZO01",
            obj1listaPedJson.CodTipoDocAnt = ""; //"",
            obj1listaPedJson.Referencia = ""; //"",
            obj1listaPedJson.OrgVentas = "1000"; //"1000",
            obj1listaPedJson.CanalDist = "10"; //"10",
            obj1listaPedJson.CodOficina = "1010"; //"1010",
            obj1listaPedJson.CondPago = "E000"; //"E000",
            obj1listaPedJson.Moneda = "PEN"; //"PEN",
            obj1listaPedJson.CondExp = "03"; //"03",
            obj1listaPedJson.FechaEntrega = "2017-06-22T18:23:18.420Z"; //"2017-06-20T19:04:05.784Z",
            obj1listaPedJson.FechaReparto = null; //"2014-02-01T05:00:00.000Z",
            obj1listaPedJson.TipoCambio = 3.282; //3.282,
            obj1listaPedJson.FechaFacturacion = "2017-06-22T18:23:18.420Z"; //"2017-06-20T19:04:05.784Z",
            obj1listaPedJson.CodigoBanco = ""; //"",
            obj1listaPedJson.Motivo = ""; //"002",
            obj1listaPedJson.BloqueoEntrega = ""; //"01",
            obj1listaPedJson.BloqueoFactura = ""; //"01",
            obj1listaPedJson.OrdenCompra = ""; //"7",
            obj1listaPedJson.FechaPedido = "2017-06-22T18:23:18.420Z"; //"2017-06-20T19:04:05.784Z",
            obj1listaPedJson.FechaValidez = "2017-06-29T18:23:18.439Z"; //"2017-06-27T19:04:05.831Z",
            obj1listaPedJson.Estado = ""; //"",
            obj1listaPedJson.nomProyecto = ""; //"nombreProyecto",
            obj1listaPedJson.TipoVisita = ""; //"03",
            obj1listaPedJson.cbxReembolsable = ""; //false,
            obj1listaPedJson.dsctoAdicionalZD12 = 0; //0,
            obj1listaPedJson.dsctoAdicionalZD12tmp = 0; //0,
            obj1listaPedJson.FechaPrecio = null; //null,
            obj1listaPedJson.Mail = "erick@hot.com"; //"soli@hotmail.com",
            obj1listaPedJson.BonoCampania = ""; //"",
            obj1listaPedJson.RegaloCampania = ""; //"",
            obj1listaPedJson.Reenbolsable = false; //false,
            obj1listaPedJson.PedidoVenta1 = ""; //"",
            obj1listaPedJson.PedidoVenta2 = ""; //"",
            obj1listaPedJson.PedidoVenta3 = ""; //"",
            obj1listaPedJson.PedidoVenta4 = ""; //"",
            obj1listaPedJson.PedidoVisita1 = ""; //"",
            obj1listaPedJson.PedidoVisita2 = ""; //"",
            obj1listaPedJson.PedidoVisita3 = ""; //"",
            obj1listaPedJson.PedidoVisita4 = ""; //"",
            obj1listaPedJson.SubtotalImp = 0; //0,
            obj1listaPedJson.TieneEntrega = false; //false,
            obj1listaPedJson.DocOriginal = ""; //"",
            obj1listaPedJson.Znpiso = ""; //"",
            obj1listaPedJson.Ztransporte = ""; //"",
            obj1listaPedJson.Zasensor = false; //false,
            obj1listaPedJson.Zncservicio = false; //false,
            obj1listaPedJson.TieneKitCombo = false; //false,
            obj1listaPedJson.NumPedido = ""; //"",
            obj1listaPedJson.NumPedidoCorto = ""; //"",
            obj1listaPedJson.FechaPedidoString = ""; //"",
            obj1listaPedJson.FechaValidezString = ""; //"",
            obj1listaPedJson.FechaEntregaString = ""; //"",
            obj1listaPedJson.CodCliente = "0000101317"; //"0000101317",
            obj1listaPedJson.CodClienteCorto = ""; //"",
            obj1listaPedJson.CodGrupoVend = ""; //"",
            obj1listaPedJson.Sector = ""; //"",
            obj1listaPedJson.SubTotal = 0; //155.67,
            obj1listaPedJson.Igv = 0; //28.02,
            obj1listaPedJson.Total = 0; //183.69,
            obj1listaPedJson.TotalImp = 0; //28.02,
            obj1listaPedJson.PesoTotal = 0; //0,
            obj1listaPedJson.GrupoCond = ""; //"01",
            obj1listaPedJson.Tratado = false; //false,
            obj1listaPedJson.ClasePedidoCliente = ""; //"",
            obj1listaPedJson.ClaseDocumento = ""; //"",
            obj1listaPedJson.CodVendedor1 = "00001802"; //"00001802",
            obj1listaPedJson.NomVendedor1 = ""; //"Julio Edgardo Pingo",
            obj1listaPedJson.TotalConIgv = 0; //0,
            obj1listaPedJson.textoAtencion = ""; //"observacionAtencion",
            obj1listaPedJson.textoObsAdministrativas = ""; //"observacionObservacionesAdministrativas",
            obj1listaPedJson.textoRefFactura = ""; //"observacionReferenciaFactura",
            obj1listaPedJson.textoRefDireccion = ""; //"observacionReferenciaDireccion",
            obj1listaPedJson.correo = ""; //"",
            obj1listaPedJson.codigoSolicitante = ""; //"",
            obj1listaPedJson.codigoDestFact = ""; //"",
            obj1listaPedJson.codigoResPago = ""; //"",
            obj1listaPedJson.nombreSolicitante = ""; //"",
            obj1listaPedJson.direccionSolicitante = ""; //"",
            obj1listaPedJson.codigoPostalSolicitante = ""; //"",
            obj1listaPedJson.telefonoSolicitante = ""; //"",
            obj1listaPedJson.nifSolicitante = ""; //"",
            obj1listaPedJson.codigoDestMerc = ""; //"",
            obj1listaPedJson.nombreDestMerc = ""; //"",
            obj1listaPedJson.direccionDestMerc = ""; //"",
            obj1listaPedJson.codigoPostalDestMerc = ""; //"",
            obj1listaPedJson.telefonoDestMerc = ""; //"",
            obj1listaPedJson.telefonoMovilDestMerc = ""; //"",
            obj1listaPedJson.nombreDestFact = ""; //"",
            obj1listaPedJson.direccionDestFact = ""; //"",
            obj1listaPedJson.codigoPostalDestFact = ""; //"",
            obj1listaPedJson.telefonoDestFact = ""; //"",
            obj1listaPedJson.nombreResPago = ""; //"",
            obj1listaPedJson.direccionResPago = ""; //"",
            obj1listaPedJson.codigoPostalResPago = ""; //"",
            obj1listaPedJson.telefonoResPago = ""; //"",
            obj1listaPedJson.nifResPago = ""; //"",
            obj1listaPedJson.codigoCliente = "0000101317"; //"0000101317",
            obj1listaPedJson.nombreCliente = "Erick De La Cruz De La Cruz"; //"nombreSoli",
            obj1listaPedJson.direccionCliente = "LOS CEDROS"; //"direSoli",
            obj1listaPedJson.apePatSolicitante = ""; //"",
            obj1listaPedJson.apeMatSolicitante = ""; //"",
            obj1listaPedJson.textoContacto = ""; //"",
            obj1listaPedJson.textoDatosAdicionalesCliente = ""; //"",
            obj1listaPedJson.textoTelefonos = ""; //"",
            obj1listaPedJson.textoDescripcionVisita = ""; //"",
            obj1listaPedJson.textoResultadoVisita = ""; //"",
            obj1listaPedJson.textoDescripcionServInstalacion = ""; //"",
            ////////////////////////////////////
            obj1listaPedJson.datosCliente = {
                1: "2", //"1",
                10: "1", //"1",
                15: "", //"1",
                20: "10", //"",
                25: "", //"1",
                35: "15", //"30",
                CODIG: "41233469", //"87654321",
                APPAT: "De La Cruz", //"apellidoPSoli",
                APMAT: "De La Cruz", //"apellidoMSoli",
                NOMBRE: "Erick", //"nombreSoli",
                FECNAC: "2015-03-04T05:00:00.000Z", //"2013-06-20T11:00:00.000Z",
                GRAINS: "10", //"10",
                SEXO: "1", //"1",
                CIUDAD: "140101", //"140101",
                EDAD: "2", //"4",
                RANGOED: "1", //"1",
                NIVELSE: "A", //"A",
                DIREC: "LOS CEDROS"  //"direSoli"},
            };
            //obj1listaPedJson.datosCliente;
            ///////////////////////////////
            obj1listaPedJson.listaPre = ""; //"",
            obj1listaPedJson.TotalDcto = 0; //0,
            obj1listaPedJson.codProyecto = ""; //"codigoProyecto",
            obj1listaPedJson.codVersion = ""; //"1025",
            obj1listaPedJson.GrupoForecast = "01"; //"01",
            obj1listaPedJson.TipoForecast = ""; //" ",
            obj1listaPedJson.NoImpFac = ""; //"",
            obj1listaPedJson.Certificado = ""; //"nroCertificado",
            obj1listaPedJson.FechaVisita = null; //"2017-08-01T05:00:00.000Z"}
            listaPedJson.push(obj1listaPedJson);
            var listaPedJsonLleno = JSON.stringify(listaPedJson);
            var result = materialServices.recalcular(UserId,
                    PwdId,
                    Id,
                    GrpVend,
                    Descripcion,
                    CodigoVendedor,
                    OrgVentas,
                    CanalDist,
                    OfVentas,
                    dsctoLotes,
                    listaInterJsonLleno,
                    listaDsctoJsonLleno,
                    listaRepartosJsonLleno,
                    listaMatJsonLleno,
                    listaPedJsonLleno);
            if (result.c === "s") {
                if (result.data.success) {
                    this.getView().getModel().setProperty("/RetornoRecalcular", result.data);
                    this.getView().getModel().refresh();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                }
            } else {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
            }
            console.log(result);
        },
    });
});
