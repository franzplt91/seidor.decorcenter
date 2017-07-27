sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
    'jquery.sap.global',
    'sap/m/GroupHeaderListItem',
    "pe/com/seidor/sap/decor/ventas/services/stockServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, documentosServices, jQuery, GroupHeaderListItem, stockServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocNuevo", {
        getGroupHeader: function (oGroup){
            return new GroupHeaderListItem( {
                title: oGroup.key,
                upperCase: false
            } );
        },            
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
                //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
                var date = new Date();
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
                var mm1 = (date.getMonth() + 4).toString(); // getMonth() is zero-based
                var dd  = date.getDate().toString();
                var fechaActual = yyyy +"-"+ (mm[1] ? mm : "0" + mm[0]) +"-"+ (dd[1] ? dd : "0" + dd[0]); // padding 
                var fechaPosterior = yyyy +"-"+ (mm1[1] ? mm1 : "0" + mm1[0]) +"-"+ (dd[1] ? dd : "0" + dd[0]); // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
                ////////Inicio Stock Por Llegar y Por Pedir//////////////////////////////////////////////////////////////
                this.getView().byId("date_fec_inicio_stockPorLlegar").setValue(fechaActual); 
                this.getView().byId("date_fec_fin_stockPorLlegar").setValue(fechaPosterior); 
                this.getView().byId("date_fechaInicio_stockPorPedir").setValue(fechaActual); 
                this.getView().byId("date_fechaFin_stockPorPedir").setValue(fechaPosterior);
                /////////Fin Stock Por Llegar y Por Pedir////////////////////////////////////////////////////////////////
            var oData = {
                "pedido": {
                    "enabled": true,
                    "enabledBtnGuardar": true,
                    "enabledBtnCopiar": true,
                    "enabledBtnBuscar": true,
                    "id":"",
                    "CodTipoDoc":"",
                    "CodTipoDocAnt":"",                    
                    "OrgVentas": "",
                    "CanalDist": "",
                    "CodOficina": "",
                    "CodGrupoVend" : "",
                    "CondPago": "",
                    "Moneda": "",
                    "TipoCambio": "",
                    "PesoTotal": null,
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
                    "FechaVisita": "",
                    "Igv":"",
                    "Percepcion":"",
                    "Sector":"",
                    "Sociedad":"",
                    "SubTotal":"",
                    "SubtotalImp":"",
                    "Total":"",
                    "TotalConIgv":"",
                    "TotalDcto":"",
                    "TotalImp":""                    
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
                            "PersonaFisica": false,
                            "Eventual": false,                            
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
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
                    "V4": {
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "V4",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },                    
                    "Z2": {
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "Z2",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "Z3": {
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "Z3",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },  
                    "Z5": {
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
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "Z5",
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
                    "Codigo": "",
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
                    "PersonaFisica": false,
                    "Eventual": false,                      
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
                        "PosicionCorto": "",                        
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
                        "CodLote": "",
                        "DescCentro": "",
                        "DescAlmacen": "",
                        "Zservicio": false,
                        "Peso": null,
                        "PesoNeto": null,
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
                        "DescMovil": "",
                        "Descripcion": "",
                        "EsEstiba": false,
                        "EsFlete": false,
                        "EspecialServ": false,
                        "jerarquia": "",
                        "MSTAE": "",
                        "PrecioUnit": null,
                        "Stock": null,
                        "StockTotal": null,
                        "TieneServ": false,
                        "Tipo": "",
                        "TipoMaterial": "",  
                        "PrecioTotal": null,
                        "PrecioUnitario": null,
                        "IgvUnitario": null,
                        "IgvTotal": null,
                        "TotalDctos": null,
                        "SubTotal": null,
                        "TotPercep": "",
                        "SubTotalLista": null,
                        "ConversionUMedida":"",
                        "DivisionRendimiento":null,
                        "DsctoMontTotal":null,
                        "Peso":null,
                        "PrecioConIGV":null,
                        "PrecioSinIGV":null,
                        "Total":null,
                        "TotalImpresion":null,  
                        "TipoPosAnt": "",                      
                        "Repartos": [{
                                "CantConf": null,
                                "CantPed": null,
                                "CodUMedida": null,
                                "FechaEntrega": "",
                                "Pos": "",
                                "PosCorto": "",
                                "TipoReparto": "",
                                "matPosicion":""
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
                            }],
                        "stockDetallado" : [{
                                "CodAlmacen":"",
                                "CodCentro":"",
                                "CodLote":"",
                                "CodMaterial":"",
                                "DescAlmacen":"",
                                "DescCentro":"",
                                "DescDisp":"",
                                "DescMaterial":"",
                                "FechaStock":"",
                                "StockDisponible":null,
                                "StockLibre":null,
                                "ValorCaracteristica":""
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

                //////Redireccion Documento Nuevo - Stock Disponible////
                    if(window.IsDocNuevo == true){
                        //////////////Número referencia (Doc Buscar) //////
                    this.getView().getModel().setProperty("/NumeroDocumentoReferencia", window.numeroDocumento);
                    ///////////////////////////////////////////////////
                    
                            if(window.crearPedido == true){
                                var firstItem = this.getView().byId("ListaDocNuevo").getItems()[1]; //ponerlo en la posicion ZO01
                            this.getView().byId("ListaDocNuevo").setSelectedItem(firstItem,true);
                            }else{
                                var firstItem = this.getView().byId("ListaDocNuevo").getItems()[19]; //ponerlo en la posicion ZO01
                            this.getView().byId("ListaDocNuevo").setSelectedItem(firstItem,true);
                            }
                            this.getView().byId("dlg_DialogDocNuevo").open();
                    }else{
                        this.getView().byId("dlg_DocNuevobuscar").open();
                    }
                    ////////////////////////////////////////////////////////
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
            var result = documentosServices.crearDocumento(tipoDocumento.Codigo, numPedido);
            if (result.c === "s") {
                if (result.data.success) {
                    this.initDataDefault(result.data, tipoDocumento.Codigo);
                    this.getView().byId("dlg_DialogDocNuevo").close();
                    MessageToast.show(tipoDocumento.Descripcion);
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
            } else {
                sap.m.MessageToast.show(result.m, {duration: 3000});
            }
        },
        initDataDefault: function (data, codigo) {            
            this.getView().getModel().setProperty("/pedido/CodTipoDoc", codigo);
            this.getView().getModel().setProperty("/pedido/TipoCambio", data.tipoCambio);
            this.getView().getModel().setProperty("/pedido/FechaFacturacion", data.FechaFact);
            this.getView().getModel().setProperty("/pedido/FechaValidez", data.FechaValidez);
            this.getView().getModel().setProperty("/pedido/Fecha", data.FechaFact);
            this.getView().getModel().setProperty("/pedido/FechaEntrega", data.FechaFact);
            this.getView().getModel().setProperty("/pedido/OrgVentas", dataIni.person.OrgVentas);
            this.getView().getModel().setProperty("/pedido/CodOficina", dataIni.person.OfVentas);
            this.getView().getModel().setProperty("/pedido/CanalDist", dataIni.person.CanalDist);
            this.getView().getModel().setProperty("/pedido/CodGrupoVend", window.dataIni.person.GrpVend);
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
                if (interlocutor.Descripcion != "") {
                    tipoBusqueda = "Nom";
                }                
                if (interlocutor.Ruc != "") {
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
                tipoInterlocutor = "Z3";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                profesional = this.getView().getModel().getProperty("/profesionales");
            }
            //invocar popup de busqueda
            if (jQuery.isEmptyObject(interlocutor) && tipoInterlocutor != "") {
                this.getView().getModel().setProperty("/busquedaCliente/tipoInterlocutor", tipoInterlocutor);
                this.getView().byId("dlg_DocNuevobuscarCliente").open();
            } else if (!jQuery.isEmptyObject(interlocutor) && (interlocutor.Descripcion != "" || interlocutor.Ruc != "")) {
                if (tipoBusqueda === "Doc") {
                    this.obtenerDatosInterlocutorDni(interlocutor, tipoInterlocutor, copiarDatos);
                }
                if (tipoBusqueda === "Nom") {
                    this.obtenerDatosInterlocutorNombre(interlocutor, tipoInterlocutor);
                }
            } else if (!jQuery.isEmptyObject(profesional) && (profesional.NomProfesional2 != "" || profesional.CodProfesional2 != "")) {
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
                if (vendedor.NomProfesional != "") {
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
            if (busqueda.dniRuc != "" || busqueda.razonSocial != "") {
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
                var difeTipoInterlocutor = (tipoInterlocutor === "Z3") ? "AG" : tipoInterlocutor;//debido q el array Z3 no trae error
                if (result.c == "s") {
                    var interlocutores = result.data.Interlocutores;
                    var cliente = null;
                    for (var indice in interlocutores) {
                        if (interlocutores[indice].Funcion == difeTipoInterlocutor) {
                            cliente = interlocutores[indice].Cliente;
                            //if (interlocutores[indice].Funcion != "AG") {//Todo: paro hacer
                                self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Codigo", cliente.Codigo);
                            //}
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/CodigoPostal", cliente.CodigoPostal);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Ciudad", cliente.Ciudad);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Descripcion", cliente.Descripcion);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/DireccionCompleta", cliente.DireccionCompleta);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Direccion", cliente.DireccionCompleta);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Mail", cliente.Mail);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Ruc", cliente.Ruc);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/PersonaFisica", cliente.PersonaFisica);
                            self.getView().getModel().setProperty("/interlocutores/" + tipoInterlocutor + "/Cliente/Eventual", cliente.Eventual);
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
                    var rpta = (result.data != null) ? result.data.errors.reason : "Error de sistema";
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
                var result = clienteServices.buscarSolicitante(busquedaDTO);
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
            this.getView().getModel().setProperty("/cliente/Codigo",(cliente.Codigo != null) ? cliente.Codigo : "");
            this.getView().getModel().setProperty("/cliente/NOMBRE",(cliente.NOMBRE != null) ? cliente.NOMBRE : "");
            this.getView().getModel().setProperty("/cliente/APPAT", (cliente.APPAT != null) ? cliente.APPAT : "");
            this.getView().getModel().setProperty("/cliente/APMAT", (cliente.APMAT != null) ? cliente.APMAT : "");
            this.getView().getModel().setProperty("/cliente/CODIG", (cliente.CODIG != null) ? cliente.CODIG : "");
            this.getView().getModel().setProperty("/cliente/Ciudad", (cliente.Ciudad != null) ? cliente.Ciudad : "");
            this.getView().getModel().setProperty("/cliente/CodigoPostal", (cliente.CodigoPostal != null) ? cliente.CodigoPostal : "");
            this.getView().getModel().setProperty("/cliente/DIREC", (cliente.DIREC != null) ? cliente.DIREC : "");
            this.getView().getModel().setProperty("/cliente/EDAD", (cliente.EDAD != null) ? cliente.EDAD : "");
            this.getView().getModel().setProperty("/cliente/FECNAC", moment(cliente.FECNAC).format('DD/MM/YYYY'));
            this.getView().getModel().setProperty("/cliente/GRAINS", (cliente.GRAINS != null) ? cliente.GRAINS : "");
            this.getView().getModel().setProperty("/cliente/Mail", (cliente.Mail != null) ? cliente.Mail : "");
            this.getView().getModel().setProperty("/cliente/Pais", (cliente.Pais != null) ? cliente.Pais : "");
            this.getView().getModel().setProperty("/cliente/Ruc", (cliente.Ruc != null) ? cliente.Ruc : "");
            this.getView().getModel().setProperty("/cliente/PersonaFisica", cliente.PersonaFisica);
            this.getView().getModel().setProperty("/cliente/Eventual", cliente.Eventual);
            this.getView().getModel().setProperty("/cliente/SEXO", (cliente.SEXO != null) ? cliente.SEXO : "");
            this.getView().getModel().setProperty("/cliente/Telefono", (cliente.Telefono != null) ? cliente.Telefono : "");
            this.getView().getModel().setProperty("/cliente/TelefonoMovil", (cliente.TelefonoMovil != null) ? cliente.TelefonoMovil : "");
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
                    interlocutores[indice].Cliente.PersonaFisica = cliente.PersonaFisica;
                    interlocutores[indice].Cliente.Eventual = cliente.Eventual;
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
    var cantidad1 = this.getView().byId("txt_cantidad_anadir_material").getValue() ;
    var cantidad = parseInt(cantidad1);//
    if(codigoMaterial !="" && opcionMaterial !="" && codigoAmbiente !="" ) {
        var tamanoList = this.obtenerTamaniolLista();
        var nuevoMaterial = this.crearNuevoMaterial(codigoMaterial, opcionMaterial, codigoAmbiente, cantidad, tamanoList);
        var self = this;

        self.getView().byId("loadingControl").open();
        setTimeout(function(){
            var result = materialServices.anadirMaterialMaster(nuevoMaterial);
            if (result.c === "s") {
                if (result.data.success) {
                    var materialSer = result.data.lstTotal;
                    var stockSer = result.data.lstStock;

                    if(materialSer != null) {
                        var materialesStock = self.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                        var materiales = self.getView().getModel().getProperty("/listaMaterial");
                        if(materiales == null) {materiales = new Array();}
                        for(var indice in materialesStock) {
                            materiales.push(materialesStock[indice]);
                        }                        
                        self.getView().getModel().setProperty("/listaMaterial/", materiales);                        
                    }

                    self.getView().getModel().refresh();
                    self.getView().byId("dlg_DocNuevoaddProducto").close();
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
        onAgregarCentroAlmacenLote: function (evt) {//Modificado (Roy) 27-07-17 Agregue DescCentro
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().byId("lb_datos").setProperty("text", obj.CodCentro +"/"+ obj.DescCentro +"/"+ obj.CodAlmacen  +"/"+ obj.CodLote);  
            this.getView().byId("dlg_MensajeAvisoAddCenAlmLot").open();            
        }, 
        onSiMensajeAvisoAddCenAlmLot: function () {//Modificado (Roy) 27-07-17 Falta arreglar el slash
            var material = this.getView().getModel().getProperty("/material");
            var datos = this.getView().byId("lb_datos").getProperty("text");
            if(datos != "") {
               var data =  datos.split("/");
               material.CodCentro = data[0];
               material.DescCentro = data[1];//Modificado (Roy) 27-07-17
               material.CodAlmacen = data[2];
               material.CodLote = data[3];
               this.getView().getModel().refresh();
            }        
            this.getView().byId("dlg_MensajeAvisoAddCenAlmLot").close(); 
        },  
        onOpenRepartoDetail: function (oEvent) {
            var material = this.getView().getModel().getProperty("/material");   
            var repartos = material.Repartos;
            var cantidad = material.Cantidad;
            var cantidadReparto = 0;
            for(var indice in repartos) {
                cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
            }

            if(cantidadReparto < cantidad) {                
                var reparto = new Object();
                reparto.FechaEntrega ="";
                reparto.CantPed ="";  
                reparto.path ="";                           
                this.getView().getModel().setProperty("/repartoDetail", reparto); 
                this.getView().byId("dlg_DialogDocReparto").open(); 
            } else {
                sap.m.MessageToast.show("No se puede agregar un nuevo reparto.", { duration: 3000 });                
            }    
        },  
        onEditarReparto: function(evt) {
            var contexts = this.getView().byId("idReparto").getSelectedContexts();
             if(contexts == ""){
                 sap.m.MessageToast.show("Please Select a row to Delete");
             } else {
                var path = this.getView().byId("idReparto").getSelectedItem().getBindingContext().getPath();
                var indice = path.substring((path.lastIndexOf("/") + 1),path.length);
                var indiceEdit = (indice != "") ? parseInt(indice) : -1;                
                var reparto = this.getView().byId("idReparto").getSelectedItem().getBindingContext().getObject();
                reparto.path = indiceEdit;
                this.getView().getModel().setProperty("/repartoDetail", reparto); 
                this.getView().getModel().refresh();  
                this.getView().byId("dlg_DialogDocReparto").open(); 
             }
        },         
        onAgregarReparto: function() {   
            var repartoDet = this.getView().getModel().getProperty("/repartoDetail");  
            var repartoDetCant = (repartoDet.CantPed != "") ? parseInt(repartoDet.CantPed) : 0;

            if(repartoDetCant > 0 ) {
                    var material = this.getView().getModel().getProperty("/material");   
                    var repartos = material.Repartos;
                    var cantidad = material.Cantidad;
                    var cantidadReparto = 0;
                    for(var indice in repartos) {
                        if(repartoDet.path !== "" && repartoDet.path != indice) {
                            cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
                        }
                    }  
                    
                    if(repartoDetCant <= (cantidad - cantidadReparto)) {                        
                        if(repartoDet.path === "") {
                            //agregar
                            var repartoNuevo = new Object();
                            repartoNuevo.CantConf = repartoDetCant;                        
                            repartoNuevo.FechaEntrega = repartoDet.FechaEntrega;
                            repartoNuevo.CantPed = repartoDetCant;
                            repartos.push(repartoNuevo);                            
                        } else {
                            //editar
                            var indice = repartoDet.path;
                            repartos[indice].CantConf = repartoDetCant;  
                            repartos[indice].FechaEntrega = repartoDet.FechaEntrega;  
                            repartos[indice].CantPed = repartoDetCant;  
                        }
                        this.getView().getModel().setProperty("/material/Repartos", repartos);
                        this.getView().getModel().refresh();     
                        this.getView().byId("dlg_DialogDocReparto").close();                   
                    } else {                        
                        sap.m.MessageToast.show("No se puede agregar un nuevo reparto.", { duration: 3000 });  
                    }            
            } else {
                sap.m.MessageToast.show("Debe ingresar una cantida mayor a 0.", { duration: 3000 });    
            }    
        },          
        onBorrarReparto: function(evt) {
            var contexts = this.getView().byId("idReparto").getSelectedContexts();
             if(contexts == ""){
                 sap.m.MessageToast.show("Please Select a row to Delete");
             } else {
                var path = this.getView().byId("idReparto").getSelectedItem().getBindingContext().getPath();
                var indice = path.substring((path.lastIndexOf("/") + 1),path.length);
                var indiceDelete = (indice != "") ? parseInt(indice) : -1;
                var listaRepartos = this.getView().getModel().getProperty("/material/Repartos");

                listaRepartos.splice(indiceDelete, 1);
                this.getView().getModel().setProperty("/material/Repartos", listaRepartos);
                this.getView().getModel().refresh(); 
             }
        },  
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
        onCloseRepartoDetail: function (oEvent) {
            this.getView().byId("dlg_DialogDocReparto").close();
        },
        onNoMensajeAvisoAddCenAlmLot: function () {
            this.getView().byId("dlg_MensajeAvisoAddCenAlmLot").close();
        },
        onBtnRecalcular:function(){
            var materiales = this.getView().getModel().getProperty("/listaMaterial/");
            if(materiales.length > 0) {
                var dsctoLotes = 2;
                var listaDscto = JSON.stringify(this.crearDescuentos());
                var listaInter = JSON.stringify(this.crearInterlocutores());
                var listaRepartos = JSON.stringify(this.crearRepartos());
                var listaMateriales = JSON.stringify(this.crearMateriales());   //crearMateriales1          
                var listaPedido = JSON.stringify([this.crearPedido()]);

                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                    var result = materialServices.recalcular(dsctoLotes, listaInter, listaDscto, listaRepartos, 
                                                                listaMateriales, listaPedido);
                    if (result.c === "s") {
                        if (result.data.success) {
                            var pedidoSer = result.data.objPedido;
                            var pedido = self.agregarDatosPedido(pedidoSer);                            
                            var materiales = self.agregarDetalleMateriales(pedidoSer.Detalle);
                            
                            self.getView().getModel().setProperty("/pedido", pedido);
                            self.getView().getModel().setProperty("/listaMaterial", materiales);
                            self.getView().getModel().refresh(); 
                       } else {
                            sap.m.MessageToast.show(result.data.errors.reason, { duration: 3000 });
                        }
                    } else {
                        sap.m.MessageToast.show(result.m, { duration: 3000 });
                    } 
                self.getView().byId("loadingControl").close();
                },1000);
            } else {
                MessageToast.show("Debe añadir al menos un Material.");
            }
        },


        /** utilitarios **/
        crearNuevoMaterial: function (codigoMaterial, opcionMaterial, codigoAmbiente, cantidad,tamanoList) {
        var pedido = this.crearPedido();
        var codigoAuart = pedido.CodTipoDoc;

        var nuevoMaterial = new Object();
        nuevoMaterial.codigo = codigoMaterial,
        nuevoMaterial.cantidad = cantidad;
        nuevoMaterial.CodAmbiente = codigoAmbiente;
        nuevoMaterial.Opcion =opcionMaterial;
        nuevoMaterial.añadirForm = 1;
        nuevoMaterial.posNuevo = tamanoList;
        nuevoMaterial.objPedido = JSON.stringify(pedido);
        nuevoMaterial.cantidadtmp = cantidad;
        nuevoMaterial.ambiente = codigoAmbiente;
        nuevoMaterial.desamb = this.getView().byId("com_ambiente_anadir_material").getSelectedItem().getText();
        nuevoMaterial.opcamb = opcionMaterial;
        nuevoMaterial.auart = codigoAuart;
        
        return nuevoMaterial;        
        },

        agregarMaterialNuevo: function (materialSer,stockSer,cantidad) {//Modificado Roy            
            //var stockMayor = stockSer[stockSer.length-1];  
            var listaMateriales = new Array();

            for(var indice in materialSer) {            
                //agregr material
                var material = materialSer[indice].Material;
                material.Posicion = materialSer[indice].Posicion;
                material.CodMaterial = materialSer[indice].CodMaterial;
                material.PosicionCorto = materialSer[indice].PosicionCorto;
                material.Ambiente = materialSer[indice].Opcion;
                material.Zservicio = materialSer[indice].Zservicio ;
                material.Cantidad = cantidad;   
                material.PrioridadEntrega = materialSer[indice].PrioridadEntrega;   
                material.MotivoRechazo = materialSer[indice].MotivoRechazo;   
                material.PesoNeto = materialSer[indice].PesoNeto;
                material.Opcion = materialSer[indice].CodGrupoMat;
                material.PrecioUnitario = materialSer[indice].PrecioUnitario;
                material.Reparto = materialSer[indice].Reparto;
                material.CambAlmacen = materialSer[indice].CambAlmacen;
                material.CantComp = materialSer[indice].CantComp;
                material.CantConfirmada = materialSer[indice].CantConfirmada;
                material.CodGrupoMat = materialSer[indice].CodGrupoMat;
                material.ContentID = materialSer[indice].ContentID;
                material.DesGrupoMat = materialSer[indice].DesGrupoMat;
                material.DescMaterialTicketera = materialSer[indice].DescMaterialTicketera;
                material.DivisionRendimiento = materialSer[indice].DivisionRendimiento;
                material.DsctoMontTotal = materialSer[indice].DsctoMontTotal;
                material.FechaCantConf = materialSer[indice].FechaCantConf;
                material.FechaCantConfStr = materialSer[indice].FechaCantConfStr;
                material.FechaEntregaString = materialSer[indice].FechaEntregaString;
                material.PosSup = materialSer[indice].PosSup;
                material.PosSupCorto = materialSer[indice].PosSupCorto;
                material.PosicionCorto = materialSer[indice].PosicionCorto;
                material.PrecioConIGV = materialSer[indice].PrecioConIGV;
                material.PrecioSinIGV = materialSer[indice].PrecioSinIGV;
                material.Reembolsable = materialSer[indice].Reembolsable;
                material.TipoPosAnt = materialSer[indice].TipoPosAnt;
                material.TipoPosicion = materialSer[indice].TipoPosicion;
                material.TotalImpresion = materialSer[indice].TotalImpresion;                

                //agregar reparto
                var repartos = new Array();
                for (var indiceRep in materialSer[indice].Repartos) {
                    var reparto = materialSer[indice].Repartos[indiceRep];
                    reparto.CodUMedida = materialSer[indice].CodUMedida;   
                    reparto.FechaEntrega = moment(materialSer[indice].Repartos[indiceRep].FechaEntrega).format('DD/MM/YYYY');             
                    reparto.CantPed = parseInt(cantidad);
                    reparto.CantConf = parseInt(cantidad);   
                    repartos.push(reparto);              
                }
                material.Repartos = repartos;   

                //agregar lista de stock
                var stocks = new Array();
                var stockTotal = 0;
                var stockMayor = (stockSer.length > 0) ? stockSer[0].StockDisponible:0;
                for (var indiceSt in stockSer) {
                    if(materialSer[indice].CodMaterial == stockSer[indiceSt].CodMaterial && stockSer[indiceSt].StockDisponible >= 1) {
                        var stock = stockSer[indiceSt];
                        stockTotal = stockTotal + stockSer[indiceSt].StockDisponible;
                        stocks.push(stock);
                        if(stockMayor <= stockSer[indiceSt].StockDisponible) {
                            material.CodCentro = stockSer[indiceSt].CodCentro;
                            material.CodAlmacen = stockSer[indiceSt].CodAlmacen;
                            material.CodLote = stockSer[indiceSt].CodLote;
                            material.DescCentro = stockSer[indiceSt].DescCentro;
                            material.DescAlmacen = stockSer[indiceSt].DescAlmacen;
                        }
                    }
                }
                material.StockTotal = stockTotal;
                material.stockDetallado = stocks; 
                listaMateriales.push(material); 
            }   
            return listaMateriales;
        },
        obtenerTamaniolLista: function() {
            var listaMateriales = this.getView().getModel().getProperty("listaMaterial");
            var tamanoList = (listaMateriales === null) ? 10 : (listaMateriales.length + 1 ) * 10;
            return tamanoList;
        },
        convertirFechaSistema: function(fechaString) {
            var fechaFormat = "";
            if(!jQuery.isEmptyObject(fechaString)) {
                fechaFormat = moment.utc(fechaString,"DD/MM/YYYY").format(); 
            }
            return fechaFormat;
        },
        crearPedido: function() {
            var pedidoMod = this.getView().getModel().getProperty("/pedido");
            var clienteMod = this.getView().getModel().getProperty("/cliente");
            var preguntasMod = this.getView().getModel().getProperty("/preguntas");
            var observacionesMod = this.getView().getModel().getProperty("/observaciones");
            var interlocutoresMod = this.getView().getModel().getProperty("/interlocutores");

            var cliente = new Object();
            cliente.id = 1;
            cliente["1"]=preguntasMod["1"].CODR;
            cliente["10"]=preguntasMod["10"].CODR;
            cliente["15"]=preguntasMod["15"].CODR;
            cliente["20"]=preguntasMod["20"].CODR;
            cliente["25"]=preguntasMod["25"].CODR;
            cliente["35"]=preguntasMod["35"].CODR;
            cliente.CODIG=clienteMod.Ruc;
            cliente.APPAT=clienteMod.APPAT;
            cliente.APMAT=clienteMod.APMAT;
            cliente.NOMBRE=clienteMod.NOMBRE;
            cliente.FECNAC=this.convertirFechaSistema(clienteMod.FECNAC); 
            cliente.GRAINS=clienteMod.GRAINS;
            cliente.SEXO=clienteMod.SEXO;
            cliente.CIUDAD=clienteMod.Ciudad; //clienteMod.CodigoPostal
            cliente.EDAD=(clienteMod.EDAD != "") ? parseInt(clienteMod.EDAD) : 0;
            cliente.RANGOED=clienteMod.RANGOED;
            cliente.NIVELSE=clienteMod.NIVELSE;
            cliente.DIREC=clienteMod.DIREC;

            var pedido = new Object();
            pedido.id= 1498248940715;//pedidoMod.id;
            pedido.CodTipoDoc= pedidoMod.CodTipoDoc;
            pedido.CodTipoDocAnt=pedidoMod.CodTipoDocAnt;
            pedido.Referencia="";
            pedido.OrgVentas=pedidoMod.OrgVentas;
            pedido.CanalDist= pedidoMod.CanalDist;
            pedido.CodOficina= pedidoMod.CodOficina;
            pedido.CondPago= pedidoMod.CondPago;
            pedido.Moneda= pedidoMod.Moneda;
            pedido.CondExp= pedidoMod.CondExp;
            pedido.FechaEntrega= this.convertirFechaSistema(pedidoMod.FechaEntrega);
            pedido.FechaReparto= null;
            pedido.TipoCambio= pedidoMod.TipoCambio;
            pedido.FechaFacturacion= this.convertirFechaSistema(pedidoMod.FechaFacturacion);
            pedido.CodigoBanco= pedidoMod.NombreBanco; 
            pedido.Motivo= pedidoMod.Motivo;
            pedido.BloqueoEntrega= pedidoMod.BloqueoEntrega;
            pedido.BloqueoFactura= pedidoMod.BloqueoFactura;
            pedido.OrdenCompra= pedidoMod.OrdenCompra; 
            pedido.FechaPedido= this.convertirFechaSistema(pedidoMod.Fecha);
            pedido.FechaValidez= this.convertirFechaSistema(pedidoMod.FechaValidez);
            pedido.Estado= "";
            pedido.nomProyecto= pedidoMod.nomProyecto;
            pedido.TipoVisita= pedidoMod.TipoVisita;
            pedido.cbxReembolsable= pedidoMod.Reenbolsable; 
            pedido.dsctoAdicionalZD12= 0;
            pedido.dsctoAdicionalZD12tmp= 0;
            pedido.FechaPrecio= null;
            pedido.Mail= "";
            pedido.BonoCampania= "";
            pedido.RegaloCampania= "";
            pedido.Reenbolsable= pedidoMod.Reenbolsable;
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
            pedido.FechaPedidoString= pedidoMod.Fecha;
            pedido.FechaValidezString=pedidoMod.FechaValidez;
            pedido.FechaEntregaString=pedidoMod.FechaEntrega;
            pedido.CodCliente= clienteMod.Codigo; 
            pedido.CodClienteCorto= "";
            pedido.CodGrupoVend= pedidoMod.CodGrupoVend;
            pedido.Sector= "";
            pedido.SubTotal= 0;
            pedido.Igv= 0;
            pedido.Total= 0;
            pedido.TotalImp= 0;
            pedido.PesoTotal= (pedidoMod.PesoTotal!= null) ? pedidoMod.PesoTotal : 0;
            pedido.GrupoCond= "";
            pedido.Tratado= false;
            pedido.ClasePedidoCliente= "";
            pedido.ClaseDocumento= "";
            pedido.CodVendedor1= interlocutoresMod.VE.Persona.CodPersona;
            pedido.NomVendedor1= interlocutoresMod.VE.Persona.Descripcion;
            pedido.TotalConIgv= 0;
            pedido.textoAtencion= observacionesMod.ZP01.Descripcion;
            pedido.textoObsAdministrativas= observacionesMod.ZP06.Descripcion;
            pedido.textoRefFactura= observacionesMod.ZP07.Descripcion;
            pedido.textoRefDireccion= observacionesMod.ZP05.Descripcion; 
            pedido.correo= "";
            pedido.codigoSolicitante= interlocutoresMod.AG.Cliente.Codigo  ;
            pedido.codigoDestFact= interlocutoresMod.RE.Cliente.Codigo  ;
            pedido.codigoResPago= interlocutoresMod.RG.Cliente.Codigo ;
            pedido.nombreSolicitante= interlocutoresMod.AG.Cliente.Descripcion  ;
            pedido.direccionSolicitante= interlocutoresMod.AG.Cliente.DireccionCompleta  ;
            pedido.codigoPostalSolicitante=interlocutoresMod.AG.Cliente.CodigoPostal  ;
            pedido.telefonoSolicitante= interlocutoresMod.AG.Cliente.Telefono ;
            pedido.nifSolicitante= interlocutoresMod.AG.Cliente.Ruc ;
            pedido.codigoDestMerc= interlocutoresMod.WE.Cliente.Codigo;
            pedido.nombreDestMerc= interlocutoresMod.WE.Cliente.Descripcion;
            pedido.direccionDestMerc= interlocutoresMod.WE.Cliente.DireccionCompleta;
            pedido.codigoPostalDestMerc=interlocutoresMod.WE.Cliente.CodigoPostal;
            pedido.telefonoDestMerc= interlocutoresMod.WE.Cliente.Telefono;
            pedido.telefonoMovilDestMerc= interlocutoresMod.WE.Cliente.TelefonoMovil;
            pedido.nombreDestFact= interlocutoresMod.RE.Cliente.Descripcion;
            pedido.direccionDestFact= interlocutoresMod.RE.Cliente.DireccionCompleta;
            pedido.codigoPostalDestFact= interlocutoresMod.RE.Cliente.CodigoPostal;
            pedido.telefonoDestFact= interlocutoresMod.RE.Cliente.Telefono;
            pedido.nombreResPago= interlocutoresMod.RG.Cliente.Descripcion;
            pedido.direccionResPago= interlocutoresMod.RG.Cliente.DireccionCompleta;
            pedido.codigoPostalResPago= interlocutoresMod.RG.Cliente.CodigoPostal;
            pedido.telefonoResPago= interlocutoresMod.RG.Cliente.Telefono;
            pedido.nifResPago= clienteMod.Ruc;
            pedido.codigoCliente= clienteMod.Codigo;
            pedido.nombreCliente= clienteMod.NOMBRE + " " + clienteMod.APPAT + " " +  clienteMod.APMAT;
            pedido.direccionCliente= clienteMod.DIREC;
            pedido.apePatSolicitante= clienteMod.APPAT;                    
            pedido.apeMatSolicitante= clienteMod.APMAT;
            pedido.textoContacto= "";
            pedido.textoDatosAdicionalesCliente= "";
            pedido.textoTelefonos= "";
            pedido.textoDescripcionVisita= "";
            pedido.textoResultadoVisita= "";
            pedido.textoDescripcionServInstalacion= "";
            pedido.datosCliente= cliente;
            pedido.listaPre= "";
            pedido.TotalDcto= 0;
            pedido.codProyecto= pedidoMod.codProyecto;
            pedido.codVersion= pedidoMod.codVersion;
            pedido.GrupoForecast= pedidoMod.GrupoForecast;
            pedido.TipoForecast= pedidoMod.TipoForecast;
            pedido.NoImpFac= "";
            pedido.Certificado= pedidoMod.Certificado; 
            pedido.FechaVisita= this.convertirFechaSistema(pedidoMod.FechaVisita);
            return pedido;
        },     
        crearDescuentos: function() {
            var id = 0;
            var listaDescuentos = new Array();
            var materiales = this.getView().getModel().getProperty("/listaMaterial");

            for(var indiceM in materiales) {                
                var listaPrincipal = materiales[indiceM].DescuentoPrincipal;
                var listaOtros = materiales[indiceM].DescuentoOtros;

                if(listaPrincipal != undefined && listaOtros != undefined) {
                    var posicion = materiales[indiceM].PosicionCorto;
                    var descuentos = listaPrincipal.concat(listaOtros);

                    for(var indice in descuentos) {
                        id = id +1;
                        var descuento = descuentos[indice];
                        descuento.id= id;
                        descuento.matPosicion = posicion;      //descuento.Posicion
                        listaDescuentos.push(descuento);
                    }
                }
            }            
            return listaDescuentos;

        },
        crearInterlocutores: function() {
            var listaInterlocutores = new Array();
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var listInter =["AG","RE","WE","RG","VE","Z3","V2","V3","V4","Z2","Z5"];
            var cont = 0;
            for(var indice in listInter) {
                var interlocutor = new Object();  
                cont = cont + 1;              
                interlocutor.id = cont ;
                interlocutor.PedidoId = 0 ;
                interlocutor.Funcion = interlocutores[listInter[indice]].Funcion ;
                interlocutor.Codigo = interlocutores[listInter[indice]].Cliente.Codigo ;
                interlocutor.Ruc = interlocutores[listInter[indice]].Cliente.Ruc ;
                interlocutor.Descripcion = interlocutores[listInter[indice]].Cliente.Descripcion ;
                interlocutor.Titulo = "" ;
                interlocutor.Direccion = interlocutores[listInter[indice]].Cliente.Direccion ;
                interlocutor.DireccionCompleta = interlocutores[listInter[indice]].Cliente.Direccion + " " + interlocutores[listInter[indice]].Cliente.CodigoPostal + " " +  interlocutores[listInter[indice]].Cliente.Ciudad ;
                interlocutor.Ciudad = interlocutores[listInter[indice]].Cliente.Ciudad //this.getView().byId("com_distrito_solicitante").getSelectedItem().getText();
                interlocutor.Pais = interlocutores[listInter[indice]].Cliente.Pais ;
                interlocutor.CodigoPostal = interlocutores[listInter[indice]].Cliente.CodigoPostal ;
                interlocutor.Distrito = interlocutores[listInter[indice]].Cliente.Ciudad;
                interlocutor.Telefono = interlocutores[listInter[indice]].Cliente.Telefono ;
                interlocutor.TelefonoMovil = interlocutores[listInter[indice]].Cliente.TelefonoMovil ;
                interlocutor.Mail = interlocutores[listInter[indice]].Cliente.Mail ;
                interlocutor.PersonaFisica = interlocutores[listInter[indice]].Cliente.PersonaFisica ;
                interlocutor.Eventual = interlocutores[listInter[indice]].Cliente.Eventual;
                interlocutor.ApPat = "";
                interlocutor.ApMat = "" ;
                interlocutor.TranspZone = "" ;
                interlocutor.CodPersona = interlocutores[listInter[indice]].Persona.CodPersona ;
                interlocutor.Nombre = "" ;
                interlocutor.Apellido = "" ;
                interlocutor.Iniciales = "" ;
                interlocutor.ApeSoltero = "" ;
                interlocutor.DescripcionP = "" ;
                interlocutor.Dni = interlocutores[listInter[indice]].Cliente.Ruc ;
                interlocutor.TelefonoP = "" ;              
                listaInterlocutores.push(interlocutor);
            }
            return listaInterlocutores;
        },        
        crearRepartos: function() {
            var listaRepartos = new Array();
            var materiales = this.getView().getModel().getProperty("/listaMaterial"); //erick
            var zid = 0;
            for(var indice in materiales) {
                var zpos = 0;
                for(var cont in materiales[indice].Repartos) {
                    var rep = materiales[indice].Repartos[cont];
                    zid = zid + 1;
                    zpos = zpos + 1;
                    var reparto = new Object();
                    reparto.id = zid;
                    reparto.CantConf = rep.CantConf ;
                    reparto.CantPed = rep.CantPed ;
                    reparto.CodUMedida = rep.CodUMedida ;
                    reparto.Pos = rep.Pos ; //
                    reparto.matPosicion = materiales[indice].PosicionCorto ;
                    reparto.FechaEntrega = this.convertirFechaSistema(rep.FechaEntrega);
                    reparto.PosCorto = rep.PosCorto; //
                    reparto.TipoReparto =  rep.TipoReparto; //
                    listaRepartos.push(reparto);  
                }     
            }
            return listaRepartos;    
        },
        crearMateriales: function() {
            var listaMateriales = new Array();
            var materiales = this.getView().getModel().getProperty("/listaMaterial");
            console.log("listaMaterial//////////////////////////////////////");
            console.log(materiales);
            for(var indice in materiales) {
                var material = new Object();
                var crearId = indice ;
                material.id= parseInt(crearId)+1 ;
                material.CodMaterial= materiales[indice].CodMaterial ;
                material.CodUMedida= materiales[indice].CodUMedida ;
                material.Descripcion= (materiales[indice].Descripcion != null ) ? materiales[indice].Descripcion : ""; //Material
                material.Jerarquia= "" ;// materiales.Material.Jerarquia //Cuando lo enviaba salia vacio, aun cuando agregabas material retornaba lleno
                material.ValorRendimiento=  (materiales[indice].ValorRendimiento != null)? materiales[indice].ValorRendimiento :0 ;
                material.TipoMaterial= materiales[indice].TipoMaterial ;
                material.EsFlete= materiales[indice].EsFlete ; //Material
                material.EsEstiba= materiales[indice].EsEstiba ; //Material
                material.EspecialServ= materiales[indice].EspecialServ ; //Material
                material.Tipo= materiales[indice].Tipo ; //Material
                material.CodMaterialCorto= materiales[indice].CodMaterialCorto ;
                material.TieneServ= materiales[indice].TieneServ ; //Material
                material.Rendimiento= materiales[indice].Rendimiento ;
                material.DescMovil= materiales[indice].PosicionCorto+" - "+materiales[indice].DescMovil ;//
                material.Descontinuado= materiales[indice].Descontinuado ;
                material.UMedidaRendimiendo= materiales[indice].UMedidaRendimiendo ;
                material.DescMaterial= materiales[indice].DescMaterial ;
                material.PrecioUnit= 0;// materiales[indice].PrecioUnit ; //Material
                material.Peso= materiales[indice].Peso ; //Material
                material.Stock= 0;//materiales[indice].Stock ; //Material
                material.Mstae= materiales[indice].MSTAE ; //Material
                material.Vdscto= "" ;
                material.StatusDespacho= (materiales[indice].StatusDespacho != null) ? materiales[indice].StatusDespacho : "";
                material.StockPos= (materiales[indice].StockPos!= null) ? materiales[indice].StockPos : "";
                material.Posicion= materiales[indice].Posicion ;
                material.Cantidad= materiales[indice].Cantidad ;
                material.CodCentro= materiales[indice].CodCentro ; // materiales[indice].CodCentro
                material.CodAlmacen= materiales[indice].CodAlmacen ;// materiales[indice].CodAlmacen
                material.CodLote= materiales[indice].CodLote ;// materiales[indice].CodLote
                material.PrecioSinIGV= materiales[indice].PrecioSinIGV ;
                material.DsctoMontTotal= materiales[indice].DsctoMontTotal ;
                material.MotivoRechazo= materiales[indice].MotivoRechazo ;
                material.TipoPosAnt= (materiales[indice].TipoPosAnt != null) ? materiales[indice].TipoPosAnt :"";
                material.CodGrupoMat= materiales[indice].CodGrupoMat ;
                material.Opcion= materiales[indice].Opcion ;
                material.Reembolsable= (materiales[indice].Reembolsable!= null) ? materiales[indice].Reembolsable: "" ;
                material.Zservicio= materiales[indice].Zservicio ;
                material.ContentID= materiales[indice].ContentID ;
                material.DescMaterialTicketera= materiales[indice].DescMaterialTicketera ;
                material.PrioridadEntrega= materiales[indice].PrioridadEntrega ;
                material.FechaCantConf= materiales[indice].FechaCantConf;
                material.FechaCantConfStr= materiales[indice].FechaCantConfStr ; //CAMBIAR PORQUE APARECE POSICION
                material.PosSup= materiales[indice].PosSup ;
                material.PosSupCorto= materiales[indice].PosSupCorto ;
                material.TipoPosicion= (materiales[indice].TipoPosicion!= null)?materiales[indice].TipoPosicion :"";// materiales[indice].TipoPosicion
                material.CambAlmacen= materiales[indice].CambAlmacen ;
                material.CantComp= materiales[indice].CantComp ;
                material.PrecioTotal= (materiales[indice].PrecioTotal != null)? materiales[indice].PrecioTotal:0 ; // materiales[indice].PrecioTotal
                material.PrecioUnitario= materiales[indice].PrecioUnitario // materiales[indice].PrecioUnitario
                material.Total= 0;//materiales[indice].PrecioUnit ;// materiales[indice].Total
                material.IgvUnitario=  (materiales[indice].IgvUnitario != null)?materiales[indice].IgvUnitario :0  ;// materiales[indice].IgvUnitario
                material.IgvTotal=  (materiales[indice].IgvTotal != null)? materiales[indice].IgvTotal:0 ;// materiales[indice].IgvTotal
                material.TotalDctos=  (materiales[indice].TotalDctos != null)? materiales[indice].TotalDctos:0  ;// materiales[indice].TotalDctos
                material.SubTotal= (materiales[indice].SubTotal != null)? materiales[indice].SubTotal:0  ;// materiales[indice].SubTotal
                material.CantConfirmada= materiales[indice].CantConfirmada ;// materiales[indice].CantConfirmada
                material.PesoNeto= materiales[indice].PesoNeto ;
                material.PrecioConIGV= materiales[indice].PrecioConIGV ;
                material.TotalImpresion= materiales[indice].TotalImpresion ;
                material.DescCentro= materiales[indice].DescCentro ;
                material.DescAlmacen= materiales[indice].DescAlmacen ;
                material.FechaEntregaString= materiales[indice].FechaEntregaString ;
                material.Reparto= materiales[indice].Reparto ;
                material.TotPercep=  (materiales[indice].TotPercep != null)? materiales[indice].TotPercep:0 ;// materiales[indice].TotPercep
                material.link= materiales[indice].link ;
                material.DesGrupoMat= materiales[indice].DesGrupoMat ;
                material.DivisionRendimiento= materiales[indice].DivisionRendimiento ;
                material.mod= "" ;
                material.PosicionCorto= materiales[indice].PosicionCorto ;
                material.SubTotalLista=  (materiales[indice].SubTotalLista != null)? materiales[indice].SubTotalLista:0 ;
                material.fullName= materiales[indice].CodCentro+" "+materiales[indice].DescCentro+" / "+materiales[indice].CodAlmacen+" / "+materiales[indice].CodLote ;
                listaMateriales.push(material);
            }
            return listaMateriales;

        },        
        agregarDatosPedido: function(pedido) {
            var pedidoMod = this.getView().getModel().getProperty("/pedido");
            pedidoMod.Igv = pedidoMod.Igv;
            pedidoMod.Percepcion = pedido.Percepcion;
            pedidoMod.PesoTotal = pedido.PesoTotal;
            pedidoMod.Sector = pedido.Sector;
            pedidoMod.Sociedad = pedido.Sociedad;
            pedidoMod.SubTotal = pedido.SubTotal;
            pedidoMod.SubtotalImp = pedido.SubtotalImp;
            pedidoMod.Total = pedido.Total;
            pedidoMod.TotalConIgv = pedido.TotalConIgv;
            pedidoMod.TotalDcto = pedido.TotalDcto;
            pedidoMod.TotalImp = pedido.TotalImp;
            return pedidoMod;
        },
        agregarDetalleMateriales: function(materiales) {
            var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                            {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
            var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                                        {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}, {"codigoSer": "DsctoAdicionalZD13"}, {"codigoSer": "Precio"}];                            
            var materialesMod = this.getView().getModel().getProperty("/listaMaterial");

            for(var indiceSer in materiales) {
                var materialSer = materiales[indiceSer];
                for(var indiceMod in materialesMod) {
                    var materialMod = materialesMod[indiceMod];
                    if(materialSer.CodMaterialCorto == materialMod.CodMaterialCorto) {
                        materialMod.ConversionUMedida= materialSer.ConversionUMedida ; 
                        materialMod.Descontinuado= materialSer.Descontinuado ; 
                        materialMod.DivisionRendimiento= materialSer.DivisionRendimiento ;
                        materialMod.DsctoMontTotal= materialSer.DsctoMontTotal ; 
                        materialMod.IgvTotal= materialSer.IgvTotal ; 
                        materialMod.IgvUnitario= materialSer.IgvUnitario ; 
                        materialMod.Peso= materialSer.Peso ; 
                        materialMod.PesoNeto= materialSer.PesoNeto ; 
                        materialMod.PrecioConIGV= materialSer.PrecioConIGV ; 
                        materialMod.PrecioSinIGV= materialSer.PrecioSinIGV ; 
                        materialMod.PrecioTotal= materialSer.PrecioTotal ; 
                        materialMod.PrecioUnitario= materialSer.PrecioUnitario ; 
                        materialMod.SubTotal= materialSer.SubTotal ; 
                        materialMod.TotPercep= materialSer.TotPercep ; 
                        materialMod.Total= materialSer.Total ; 
                        materialMod.TotalDctos= materialSer.TotalDctos ; 
                        materialMod.TotalImpresion= materialSer.TotalImpresion ; 
                        
                        var descPrincipal = this.obtonerDescuento(materialSer, listaPrincipal);                        
                        var descOtros = this.obtonerDescuento(materialSer, listaOtros);                        
                        materialMod.DescuentoPrincipal = descPrincipal;
                        materialMod.DescuentoOtros = descOtros;
                        break;
                    }

                }
            }
            return materialesMod;
        },
        obtonerDescuento: function (material, descuentos) {
            var listaDescuento = [];
            for (var indice in descuentos) {
                listaDescuento.push(material[descuentos[indice].codigoSer]);
            }
            return listaDescuento;
        },    
        handleLiveChange: function(oEvent) {
            var reparto  = oEvent.getSource().getBindingContext().getObject();            

            var cantidadIngresar = oEvent.getParameter("value");
            var material = this.getView().getModel().getProperty("/material");
            
            var cantRepartoTotal = 0;
            var cantidadPedida = (material.Cantidad != "") ? parseInt(material.Cantidad) : 0;

            for(var indice in material.Repartos)  {    
                cantRepartoTotal = cantRepartoTotal + parseInt(material.Repartos[indice].CantPed);
            }    
            if( cantidadIngresar == 0) {
                sap.m.MessageToast.show("La cantidad ingresada debe ser menor que 1.", { duration: 3000 });
            } else if(cantidadIngresar <= (cantidadPedida - cantRepartoTotal)) {
                reparto.CantConf = cantidadIngresar;
            } else {
                sap.m.MessageToast.show("La cantidad ingresada debe ser menor.", { duration: 3000 });
            }        
        }, 
        onCalcularDescuentoPrincipal: function(oEvent) {
            var descuento  = oEvent.getSource().getBindingContext().getObject();  
            var material = this.getView().getModel().getProperty("/material");
            var importe = (descuento.Importe != "") ? parseInt(descuento.Importe): 0;
        
            //if(importe >= descuento.LimiteInferior) {
            if(importe >= 20) {                
                sap.m.MessageToast.show("La cantidad ingresada debe ser menor al maximo.", { duration: 3000 });
            } else {
                descuento.Valor = (parseFloat(material.SubTotal) * (importe/ 100)).toFixed(2);
                var listaDescuento = material.DescuentoPrincipal;            
                for(var indice in listaDescuento) {
                    if(descuento.Condicion != listaDescuento[indice].Condicion) {
                        listaDescuento[indice].Valor = 0;
                        listaDescuento[indice].Importe = 0;
                    } else {
                        listaDescuento[indice].Valor = descuento.Valor;
                    }
                }
                var listaDescuentoOt = material.DescuentoOtros;
                for(var indice in listaDescuentoOt) {
                    listaDescuentoOt[indice].Valor = 0;
                    listaDescuentoOt[indice].Importe = 0;
                }
                this.getView().getModel().setProperty("/material/DescuentoPrincipal", listaDescuento);
                this.getView().getModel().refresh(); 
            }
        },         
        onCalcularDescuentoOtros: function(oEvent) {
            var descuento  = oEvent.getSource().getBindingContext().getObject();  
            var material = this.getView().getModel().getProperty("/material");
            var importe = (descuento.Importe != "") ? parseInt(descuento.Importe): 0;
        
            //if(importe >= descuento.LimiteInferior) {
            if(importe >= 20) {                
                sap.m.MessageToast.show("La cantidad ingresada debe ser menor al maximo.", { duration: 3000 });
            } else {
                descuento.Valor = (parseFloat(material.SubTotal) * (importe/ 100)).toFixed(2);
                var listaDescuento = material.DescuentoOtros;
                for(var indice in listaDescuento) {
                    if(descuento.Condicion != listaDescuento[indice].Condicion) {
                        listaDescuento[indice].Valor = 0;
                        listaDescuento[indice].Importe = 0;
                    } else {
                        listaDescuento[indice].Valor = descuento.Valor;
                    }
                }
                var listaDescuentoPr = material.DescuentoPrincipal;
                for(var indice in listaDescuentoPr) {
                    listaDescuentoPr[indice].Valor = 0;
                    listaDescuentoPr[indice].Importe = 0;
                }                
                this.getView().getModel().setProperty("/material/DescuentoOtros", listaDescuento);
                this.getView().getModel().refresh(); 
            }
        },         

        
        ///////Incio Roy////////////////////////////////////////////////////////////////
        crearNuevoDocumento: function () {
        var pedido = this.getView().getModel().getProperty("/pedido") ;
        var nuevoDocumento = new Object();
            nuevoDocumento.codigoCliente = "Cliente Eventual La Molina" ; // codigoCliente:0000101317
            nuevoDocumento.nombreCliente= this.getView().getModel().getProperty("/dataIni/person/E_NAME1") ;
            nuevoDocumento.OrgVentas= pedido.OrgVentas ;//"1000" ;
            nuevoDocumento.CanalDist= pedido.CanalDist ;// "10" ;
            nuevoDocumento.CodOficina= pedido.CodOficina ;// "1010" ;
            nuevoDocumento.CondPago= pedido.CondPago ;// "E000" ;
            nuevoDocumento.Moneda= pedido.Moneda ;// "PEN" ;
            nuevoDocumento.TipoCambio= pedido.TipoCambio ;// "3.282" ;
            nuevoDocumento.dsctoAdicionalZD12= "" ;// "" ;
            nuevoDocumento.pesoTotal= pedido.PesoTotal ;// "0.300 KG" ;
            nuevoDocumento.FechaFacturacion= this.convertirFechaSistema(pedido.FechaFacturacion) ;// "2017-07-21T19:10:42.933Z" ;
            nuevoDocumento.GrupoCond= pedido.NombreBanco ;// "02" ; // GrupoCond pertenece al codigo nombre banco
            nuevoDocumento.Motivo= pedido.Motivo ;// "003" ;
            nuevoDocumento.BloqueoFactura= pedido.BloqueoFactura ;// "04" ;
            nuevoDocumento.BloqueoEntrega= pedido.BloqueoEntrega ;// "05" ;
            nuevoDocumento.OrdenCompra= pedido.OrdenCompra ;// "nroOrden" ;
            nuevoDocumento.FechaPedido= this.convertirFechaSistema(pedido.Fecha) ;// "2017-07-21T19:10:42.933Z" ;
            nuevoDocumento.FechaValidez= this.convertirFechaSistema(pedido.FechaValidez) ;// "2017-07-28T19:10:42.958Z" ;
            nuevoDocumento.FechaEntrega= this.convertirFechaSistema(pedido.FechaEntrega) ;// "2017-07-21T19:10:42.933Z" ;
            nuevoDocumento.CondExp= pedido.CondExp ;// "03" ;
            nuevoDocumento.FechaReparto= "" ;// "" ;
            nuevoDocumento.nomProyecto= pedido.nomProyecto ;// "nomProyecto" ;
            nuevoDocumento.codProyecto= pedido.codProyecto ;// "1025" ;
            nuevoDocumento.codVersion= pedido.codVersion ;// "123" ;
            nuevoDocumento.TipoVisita= pedido.TipoVisita ;// "02" ;
            nuevoDocumento.cbxReembolsable= pedido.Reenbolsable ;// "" ;
            nuevoDocumento.GrupoForecast= pedido.GrupoForecast ;// "01" ;
            nuevoDocumento.TipoForecast= pedido.TipoForecast ;// "" ;
            nuevoDocumento.Certificado= pedido.Certificado ;// "" ;
            nuevoDocumento.FechaVisita= pedido.FechaVisita ;// "" ;
            
            nuevoDocumento.numPedido= "" ; //SE ENVIA VACIO AL CREAR PEDIDO RETORNA con numero
            nuevoDocumento.op= "crear" ;
        return nuevoDocumento;        
        },



        

        /////////Roy////////////////////////////////////////////////
        crearCliente:function(){
            var preguntasMod = this.getView().getModel().getProperty("/preguntas");
            var clienteMod = this.getView().getModel().getProperty("/cliente");
            var cliente = new Object();
            cliente.id = 1;
            cliente["1"]=preguntasMod["1"].CODR;
            cliente["10"]=preguntasMod["10"].CODR;
            cliente["15"]=preguntasMod["15"].CODR;
            cliente["20"]=preguntasMod["20"].CODR;
            cliente["25"]=preguntasMod["25"].CODR;
            cliente["35"]=preguntasMod["35"].CODR;
            cliente.CODIG=clienteMod.Ruc;
            cliente.APPAT=clienteMod.APPAT;
            cliente.APMAT=clienteMod.APMAT;
            cliente.NOMBRE=clienteMod.NOMBRE;
            cliente.FECNAC=this.convertirFechaSistema(clienteMod.FECNAC); 
            cliente.GRAINS=clienteMod.GRAINS;
            cliente.SEXO=clienteMod.SEXO;
            cliente.CIUDAD=clienteMod.Ciudad; //clienteMod.CodigoPostal
            cliente.EDAD=(clienteMod.EDAD != "") ? parseInt(clienteMod.EDAD) : 0;
            cliente.RANGOED=clienteMod.RANGOED;
            cliente.NIVELSE=clienteMod.NIVELSE;
            cliente.DIREC=clienteMod.DIREC;

            return cliente;
        },
        /////////////////////////////////////////////////////////////
       
        onBtnGuardarDocumento: function () {
            var nuevoDocumento = this.crearNuevoDocumento() ; //Sin Hard Code 
            var listaMatJson = JSON.stringify(this.crearMateriales()); //Sin Hard Code 
            var listaDsctoJson = JSON.stringify(this.crearDescuentos()); //Sin Hard Code 
            var listaRepJson = JSON.stringify(this.crearRepartos()); //Sin Hard Code 
            var listaIntJson = JSON.stringify(this.crearInterlocutores()) ; //Sin Hard Code 
            var listaPedJson = JSON.stringify([this.crearPedido()]);  //Sin Hard Code 
            var listadatosCliente = JSON.stringify(this.crearCliente()); //Sin Hard Code 


            var result = documentosServices.guardarDocumento(nuevoDocumento,listaMatJson,listaDsctoJson,listaRepJson,listaIntJson,listaPedJson,listadatosCliente);
            if (result.c === "s") {
                if (result.data.success) {
                    console.log("Resultado//////////////////////////////////");
                    console.log(result.data);
                    this.getView().byId("txt_aviso_general").setText(result.data.errors.reason);
                    this.getView().byId("dlg_MensajeAvisoGeneral").open();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
            } else {
                sap.m.MessageToast.show(result.m, {duration: 3000});
            }

            console.log("Guardar Documento/////////////////");
            console.log(nuevoDocumento);
            console.log("listaMatJson/////////////////");
            console.log(listaMatJson);
            console.log("listaDsctoJson/////////////////");
            console.log(listaDsctoJson);
            console.log("listaRepJson/////////////////");
            console.log(listaRepJson);
            console.log("listaPedJson/////////////////");
            console.log(listaPedJson);
            console.log("listadatosCliente/////////////////");
            console.log(listadatosCliente);



        },

        //////Buscar Materiales//////////////////////////////////////////////
        datosBuscarMateriales:function(){
            var buscarMaterial = new Object();
            buscarMaterial.codigo = this.getView().byId("txt_codigo_material_busqueda").getValue();
            buscarMaterial.codigoAntiguo = this.getView().byId("txt_codigoAntiguo_material_busqueda").getValue();
            buscarMaterial.descripcionMaterial = this.getView().byId("txt_descripcionMaterial_material_busqueda").getValue();
            buscarMaterial.categoria = this.getView().byId("comboCategoria").getSelectedKey();
            buscarMaterial.linea = this.getView().byId("comboLinea").getSelectedKey();
            buscarMaterial.marca = this.getView().byId("comboMarca").getSelectedKey();
            buscarMaterial.orgVentas = window.dataIni.person.OrgVentas;
            buscarMaterial.canalDist = window.dataIni.person.CanalDist;
            buscarMaterial.ofVentas = window.dataIni.person.OfVentas;
            return buscarMaterial;
        },
        onDocNuevoBuscarMateriales: function (oEvent) {
            var datosMateriales = this.datosBuscarMateriales() ;
            this.getView().byId("loadingControl").open(); // INDICADOR
            var result = documentosServices.buscarmaterial(datosMateriales);
            if (result.c === "s") {
                this.getView().byId("dlg_DocNuevobuscar").close();
                if (result.data.success) {
                    this.getView().getModel().setProperty("/listaBuscarMateriales",result.data.materiales);
                    this.getView().byId("dlg_listaBuscarMateriales").open();
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
        onDocNuevoCloseSeleccionarMaterial: function () {
            this.getView().byId("dlg_listaBuscarMateriales").close();
        },
        onDocNuevoAnadirMaterial: function (evt) {
            var itemSeleccionado = this.getView().byId("lista_BuscarMaterial").getSelectedItem();
            if(itemSeleccionado){
                this.getView().byId("dlg_DocNuevoaddProductoonDialog").open();                           
        }else{
            MessageToast.show("No ha seleccionado un Material");             
        }
        },

        onDocNuevoMasterProductosAddonDialog: function () {
            var documentoCreado = this.getView().getModel().getProperty("/pedido/CodTipoDoc");

            if(!documentoCreado){
                this.getView().byId("dlg_MensajeAvisoCrearCotizacion").open();
            }else{
                var codMaterial = this.getView().byId("lista_BuscarMaterial").getSelectedItem().getBindingContext().getObject(); 

                var codigoMaterial = codMaterial.CodMaterial ;
                var opcionMaterial =  this.getView().byId("com_ambiente_dlgBuscarMaterial").getSelectedKey();
                var codigoAmbiente = this.getView().byId("com_opcion_dlgBuscarMaterial").getSelectedKey();
                var cantidad1 = this.getView().byId("txt_cantidad_dlgBuscarMaterial").getValue() ;
                var cantidad = parseInt(cantidad1);//
                if(codigoMaterial !="" && opcionMaterial !="" && codigoAmbiente !="" ) {
                    var tamanoList = this.obtenerTamaniolLista();
                    var nuevoMaterial = this.crearNuevoMaterial(codigoMaterial, opcionMaterial, codigoAmbiente, cantidad, tamanoList);
                    var self = this;

                    self.getView().byId("loadingControl").open();
                    setTimeout(function(){
                        var result = materialServices.anadirMaterialMaster(nuevoMaterial);
                        if (result.c === "s") {
                            if (result.data.success) {
                                var materialSer = result.data.lstTotal;
                                var stockSer = result.data.lstStock;

                                if(materialSer != null) {
                                    var materialesStock = self.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                                    var materiales = self.getView().getModel().getProperty("/listaMaterial");
                                    if(materiales == null) {materiales = new Array();}
                                    for(var indice in materialesStock) {
                                        materiales.push(materialesStock[indice]);
                                    }                        
                                    self.getView().getModel().setProperty("/listaMaterial/", materiales);                        
                                }

                                self.getView().getModel().refresh();
                                self.getView().byId("lb_mensajeAviso1").setText("Material Añadido. Desea seguir añadiendo materiales?");//Menssaje Aviso
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
        }
},

onDocNuevoClosedlg_addProductoonDialog: function () {
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },

        onSiMensajeAviso1: function () {
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },
        onNoMensajeAviso1: function () {
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevobuscar").close();
            this.getView().byId("dlg_listaBuscarMateriales").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },  

        onEliminarMaterial:function(){

            var currentItem = this.getView().byId("listaMasterMateriales").getSelectedItem();
            var currentIndex = this.getView().byId("listaMasterMateriales").indexOfItem(currentItem);
            var array = this.getView().getModel().getProperty("/listaMaterial");
            _.remove(array, function(item,indexRemove) {

              return currentIndex == indexRemove;
            });
            
            this.getView().getModel().setProperty("/listaMaterial",array);
            this.getView().getModel().refresh();

            console.log(array);
        },
        //////End Buscar Materiales/////////////////////////////////////////

        /////////Inicio Stock Por Pedir////////////////////////////////////////////////////////////////////////////////
        goStockporPedir: function (oEvent) {
            var item = this.getView().byId("listaMasterMateriales").getSelectedItem();
            if(item){
                this.getView().byId("txt_codMaterial_stockPorPedir").setValue(item.getBindingContext().getObject().CodMaterialCorto);
                this.getView().getModel().refresh();
                this.getView().byId("dlg_stockPorPedir").open();
        }else{MessageToast.show("No ha seleccionado un Material");

        }
        },
        onContinuarStockPorPedir: function(oEvent) {
                var CodJer = this.getView().byId("com_codJerarqui_stockPorPedir").getSelectedKey();
                if(CodJer==" "){
                    CodJer="";
                }
                var CodMat = this.getView().byId("txt_codMaterial_stockPorPedir").getValue();
                var FecIni = this.getView().byId("date_fechaInicio_stockPorPedir").getValue();
                var FecFin = this.getView().byId("date_fechaFin_stockPorPedir").getValue();
                var OfVentas = window.dataIni.person.OfVentas;
                var result = stockServices.stockporPedir(CodJer,CodMat,FecIni,FecFin,OfVentas);  
                if (result.c === "s") {
                                if (result.data.success) {
                                    this.getView().getModel().setProperty("/retornoStockPorLlegar", null);
                                   this.getView().getModel().setProperty("/retornoStockPorPedir", result.data);
                                   this.getView().byId("dlg_stockPorPedir").close();
                                   this.getView().byId("tabDetalleProducto").setSelectedKey("filterStockPorPedir");
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
                            console.log(result.data);
        },
        /////////Fin Stock Por Pedir////////////////////////////////////////////////////////////////////////////////
        /////////Inicio Stock Por Llegar////////////////////////////////////////////////////////////////////////////////
        goStockporLlegar: function () {
            var item = this.getView().byId("listaMasterMateriales").getSelectedItem();
            
            if(item){
                this.getView().byId("txt_cod_material_stockPorLlegar").setValue(item.getBindingContext().getObject().CodMaterialCorto);
                this.getView().getModel().refresh();
                this.getView().byId("dlg_stockPorLlegar").open();
        }else{MessageToast.show("No ha seleccionado un Material");

        }
        },
        onContinuarStockPorLlegar:function(){
                var matnr = this.getView().byId("txt_cod_material_stockPorLlegar").getValue();
                var lfdat_inicio = this.getView().byId("date_fec_inicio_stockPorLlegar").getValue();
                var lfdat_fin = this.getView().byId("date_fec_fin_stockPorLlegar").getValue();
                var OfVentas = window.dataIni.person.OfVentas;
                var result = stockServices.stockporLlegar(matnr,lfdat_inicio,lfdat_fin,OfVentas);  
                if (result.c === "s") {
                                if (result.data.success) {
                                    this.getView().getModel().setProperty("/retornoStockPorPedir", null);
                                   this.getView().getModel().setProperty("/retornoStockPorLlegar", result.data);
                                   this.getView().byId("dlg_stockPorLlegar").close();
                                   this.getView().byId("tabDetalleProducto").setSelectedKey("filterStockPorLlegar");
                                   
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
                            console.log(result.data);
        
        },
        //Boton Home para Stock Por Llegar
        onCancelarStockPorLlegar: function () {
            this.getView().byId("dlg_stockPorLlegar").close();            
        },
        onCancelarStockPorPedir:function(){
            this.getView().byId("dlg_stockPorPedir").close();
        },        
        /////////Fin Stock Por Llegar///////////////////////////////////////////////////////////////////////////////////
        
        mostrarCatalogo:function(){
            var material = this.getView().byId("listaMasterMateriales").getSelectedItem().getBindingContext().getObject();
            
            var catalogo = new Object();
            catalogo.Posicion = material.Posicion ;
            catalogo.CodMaterialCorto = material.CodMaterialCorto ;
            catalogo.DescMaterial = material.DescMaterial ;
            catalogo.Cantidad = material.Cantidad ;  //chequear cantidad en material 11000997 debe ser 1.44, pero sale 1
            catalogo.CodUMedida = material.CodUMedida ;
            catalogo.Rendimiento = material.Rendimiento ;
            catalogo.fullName = material.CodCentro+" "+material.DescCentro+" / "+material.CodAlmacen+" / "+material.CodLote ;
            catalogo["ext-comp-1153"] = true ;
            catalogo.Peso = material.Peso ;
            catalogo.PesoNeto = material.PesoNeto ;
            catalogo.PrecioUnitario = material.PrecioUnitario ;
            catalogo.TotalDctos = "" ;//no estan en las propiedades del material
            catalogo.SubTotal = "" ;//
            catalogo["ext-comp-1159"] = "2017-07-26T05:00:00.000Z" ;
            catalogo.CodGrupoMat = material.CodGrupoMat ;
            catalogo.Opcion = material.Opcion ;
            catalogo.MotivoRechazo = "" ;//
            catalogo.PrioridadEntrega = material.PrioridadEntrega ;
            catalogo.codigoMaterial = material.CodMaterialCorto ;
            
            return catalogo;
        },
        ////////Inicio Seleccionar Material desde el Master//////////////////////////
        onMasterProductoSeleccionarMaterial: function (oEvent) {
            var material = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/material", material);
            this.getView().getModel().refresh();
            
            ////////// Catalogo  /////////////////////////////////////////////////////
            var materialSeleccionado = this.mostrarCatalogo();
            var result = materialServices.catalogo(materialSeleccionado);

                            if (result.c === "s") {
                                if (result.data.success) {
                                    var archivos = [];
                                    archivos = result.data.archivos;
                                    if (archivos.length == 0){
                                        MessageToast.show("El material Seleccionado no está disponible en el catálogo");
                                    }else{ 
                                        var oCarousel = this.getView().byId("carouselCatalogo");
                                        oCarousel.destroyPages();
                             
                                        for (var i = 0; i < archivos.length; i++) {
                                            var imgId = "img" + (i + 1);
                                            var imgSrc = "http://ventas.decor-center.com/ipad_proyecto/"+archivos[i].url;
                                            var imgAlt = "Example picture " + archivos[i].url;
                                            var img = new sap.m.Image(imgId, {
                                                src: imgSrc,
                                                alt: "{/material/DescMaterial}",
                                                width: "300px",
                                                densityAware: false,
                                                decorative: false
                                            });
                             
                                            oCarousel.addPage(img);
                                        }
                                    }
                                    this.getView().getModel().refresh();
                                    console.log(archivos.length);
                                    console.log(result);
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
            /////////////////////////////////////////////////////////////////////////
        },  
        ////////Inicio Seleccionar Material desde el Master//////////////////////////

        ////////Inicio Stock Disponible/////////////////////////////////////////////
        onNOCrearCotizacion:function(){
            this.getView().byId("dlg_MensajeAvisoCrearCotizacion").close();
        },
        onCrearCotizacion: function (oEvent) {
            var tipoDocumento ={
                                Codigo: "ZO01",
                                }; 
            var numPedido = this.getView().byId("txt_refDocNuevo").getValue();
            var result = documentosServices.crearDocumento(tipoDocumento.Codigo, numPedido);
            if (result.c === "s") {
                if (result.data.success) {
                    this.initDataDefault(result.data, tipoDocumento.Codigo);
                    this.getView().byId("dlg_MensajeAvisoCrearCotizacion").close();
                    this.onDocNuevoMasterProductosAddonDialog();
                        this.getView().byId("dlg_MensajeAviso1").open();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
            } else {
                sap.m.MessageToast.show(result.m, {duration: 3000});
            }
        },
        ///////End Stock Disponible////////////////////////////////////////////////
            

        ///////End Roy/////////////////////////////////////////////////////////////////






















        
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

            if(window.IsDocNuevo == true){
                this.getView().byId("dlg_DocNuevobuscar").close();
            }else{
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
            }
            
            
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

        
        onSeleccionarCaracteristicas: function (oEvent) {
            var caracteristicas = this.getView().byId("comboCategoria").getSelectedKey();
            var dlg = "dlg_categoria_";
            var dlgtotal = dlg.concat(caracteristicas);
            if (caracteristicas != " ") {
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
       
      
    });
});
