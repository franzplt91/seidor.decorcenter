sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/stockServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, documentosServices, jQuery,stockServices) {
    "use strict";

    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocModificar", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },

        onRouteMatched: function (oEvent) {
            var oData = {

                CodTipoDoc:{},

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
                    "TipoCambio": 3.282,
                    "PesoTotal": 90,
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
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
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
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
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
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
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
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
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
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
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
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
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
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
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
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "NOMBRE": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
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
                    "APMAT": "soto",
                    "APPAT": "malca",
                    "CODIG": "10200517976",
                    "Ciudad": "Lima",
                    "CodigoPostal": "LIMA 09",
                    "DIREC": "las mucas",
                    "EDAD": "0",
                    "RANGOED": "",
                    "FECNAC": "2017-07-05T00:00:00",
                    "GRAINS": "10",
                    "Mail": "jose@gmail.com",
                    "NOMBRE": "jose",
                    "Pais": "PE",
                    "Ruc": null,
                    "SEXO": "1",
                    "Telefono": "11223",
                    "TelefonoMovil": null
                },
                "preguntas": {
                    "1": {
                        "CODP": "1",
                        "CODR": "1"
                    },
                    "10": {
                        "CODP": "1",
                        "CODR": "1"
                    },
                    "15": {
                        "CODP": "15",
                        "CODR": "1"
                    },
                    "20": {
                        "CODP": "1",
                        "CODR": "1"
                    },
                    "25": {
                        "CODP": "1",
                        "CODR": "1"
                    },
                    "35": {
                        "CODP": "1",
                        "CODR": "1"
                    }
                },
                "listaMaterial": [{
                        "Posicion": "000010",
                        "CodMaterial": "000000000011011862",
                        "CodMaterialCorto": "11011862",
                        "DescMaterial": "PLACAS ELECT SOLE COCINA VITROCERAMICA-PE75AVE2",
                        "Cantidad": 1,
                        "CantConfirmada": 1,
                        "CodUMedida": "UN",
                        "Rendimiento": "1.000 M2",
                        "UMedidaRendimiendo": "M2",
                        "ValorRendimiento": 1,
                        "CodAlmacen": "0001",
                        "CodCentro": "9110",
                        "Zservicio": false,
                        "Peso": 11,
                        "PesoNeto": 11,
                        "PrecioUnitario": 1567.71,
                        "DesGrupoMat": "",
                        "SubTotal": 1567.71,
                        "Reparto": "03 04/07/17",
                        "Ambiente": "",
                        "Opcion": "02",
                        "MotivoRechazo": "",
                        "PrioridadEntrega": "03",
                        "Descontinuado": "",
                        "StockPos": "",
                        "JerarquiaPrincipalDesc": "COCINAS NACIONAL",
                        "link": null,
                        "Repartos": [{
                                "CantConf": 1,
                                "CantPed": 1,
                                "FechaEntrega": "2017-07-04T00:00:00",
                                "PosCorto": "1",
                                "TipoReparto": "BN"
                            }],
                        "DescuentoPrincipal": [{
                                "Condicion": "ZDCT",
                                "Denominacion": "Dcto. Certificados %",
                                "Importe": 0,
                                "ImporteAnterior": 0,
                                "LimiteInferior": 0,
                                "Moneda": null,
                                "Posicion": "",
                                "Recalcular": "",
                                "Valor": 0,
                                "esPorcentaje": true,
                                "matPosicion": ""
                            }],
                        "DescuentoOtros": [{
                                "Condicion": "ZDCT",
                                "Denominacion": "Dcto. Certificados %",
                                "Importe": 0,
                                "ImporteAnterior": 0,
                                "LimiteInferior": 0,
                                "Moneda": null,
                                "Posicion": "",
                                "Recalcular": "",
                                "Valor": 0,
                                "esPorcentaje": true,
                                "matPosicion": ""
                            }]
                    }]
            };

            if (oEvent.getParameter("name") == "appDocModificar") {
                this.getView().byId("SplitAppId").setMode("HideMode");
                    this.getView().setModel(new JSONModel(oData));
            this.getView().getModel().setProperty("/dataIni",window.dataIni);
            if(window.pedidoInstalacion){
                this.getView().byId("txt_numeroDocumento_DocModificar").setValue(window.pedidoInstalacion);
            }
            this.getView().getModel().refresh(true);

                this.getView().byId("dlg_DialogDocModificar").open();
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
        ////////Inicio Visualizar///////////////////////////////////////////////////////////////////////
        onContinuarDlg_DialogDocModificar: function () {
            var numDocumento = this.getView().byId("txt_numeroDocumento_DocModificar").getValue();
            var result = documentosServices.visualizarDocumento("ver", numDocumento);
            if (result.data.success) {
                var data = result.data;
                this.setDataProyecto(data.lstGrupoFor, data.lstTipoFor);
                this.obtenerPedido(data.objPedido);
                this.obtenerObservaciones(data.objPedido.Textos);
                this.obtenerInterlocutores(data);
                this.obtenerMateriales(data.objPedido);
                //////TipoDoc//////////////////////////
                this.getView().getModel().setProperty("/CodTipoDoc",data.objPedido.CodTipoDoc);
                ///////////////////////////////////////
                this.getView().getModel().setProperty("/pedido/enabled", false);
                this.getView().getModel().setProperty("/pedido/enabledBtnCopiar", false);
                this.getView().getModel().setProperty("/pedido/enabledBtnBuscar", false);
                this.getView().getModel().setProperty("/pedido/enabledBtnGuardar", false);
                this.getView().byId("dlg_DialogDocModificar").close();
            } else {
                sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
            }
            
        },
        setDataProyecto: function (lstGrupoFor, lstTipoFor) {
            this.getView().getModel().setProperty("/lstGrupoFor", lstGrupoFor);
            this.getView().getModel().setProperty("/lstTipoFor", lstTipoFor);
            this.getView().getModel().refresh();
        },
        obtenerPedido: function (pedido) {
            var fechFactura = moment(pedido.FechaFacturacion).format('DD/MM/YYYY');
            var fechPedido = moment(pedido.Fecha).format('DD/MM/YYYY');
            var fechValidez = moment(pedido.FechaValidez).format('DD/MM/YYYY');
            var fechEntrega = moment(pedido.FechaEntrega).format('DD/MM/YYYY');
            var fechVisita = moment(pedido.FechaVisita).format('DD/MM/YYYY');
            this.getView().getModel().setProperty("/pedido", pedido);
            this.getView().getModel().setProperty("/pedido/FechaFacturacion", fechFactura);
            this.getView().getModel().setProperty("/pedido/Fecha", fechPedido);
            this.getView().getModel().setProperty("/pedido/FechaValidez", fechValidez);
            this.getView().getModel().setProperty("/pedido/FechaEntrega", fechEntrega);
            this.getView().getModel().setProperty("/pedido/FechaVisita", fechVisita);
        },
        obtenerPedido: function (pedido) {
            var fechFactura = moment(pedido.FechaFacturacion).format('DD/MM/YYYY');
            var fechPedido = moment(pedido.Fecha).format('DD/MM/YYYY');
            var fechValidez = moment(pedido.FechaValidez).format('DD/MM/YYYY');
            var fechEntrega = moment(pedido.FechaEntrega).format('DD/MM/YYYY');
            var fechVisita = moment(pedido.FechaVisita).format('DD/MM/YYYY');
            this.getView().getModel().setProperty("/pedido", pedido);
            this.getView().getModel().setProperty("/pedido/FechaFacturacion", fechFactura);
            this.getView().getModel().setProperty("/pedido/Fecha", fechPedido);
            this.getView().getModel().setProperty("/pedido/FechaValidez", fechValidez);
            this.getView().getModel().setProperty("/pedido/FechaEntrega", fechEntrega);
            this.getView().getModel().setProperty("/pedido/FechaVisita", fechVisita);
        },
        obtenerObservaciones: function (observaciones) {
            for (var indice in observaciones) {
                this.getView().getModel().setProperty("/observaciones/" + observaciones[indice].CodTexto, observaciones[indice]);
            }
        },
        obtenerInterlocutores: function (data) {
            var clienteSer = data.datoReniec[0];
            var fechNacimiento = moment(clienteSer.FECNAC).format('DD/MM/YYYY');
            this.getView().getModel().setProperty("/cliente", clienteSer);
            this.getView().getModel().setProperty("/cliente/FECNAC", fechNacimiento);
            var interlocutores = data.objPedido.Interlocutores;
            for (var indice in interlocutores) {
                this.getView().getModel().setProperty("/interlocutores/" + interlocutores[indice].Funcion, interlocutores[indice]);
            }
            this.getView().getModel().setProperty("/profesionales/CodProfesional", data.CodProfesional);
            this.getView().getModel().setProperty("/profesionales/NomProfesional", data.NomProfesional);
            this.getView().getModel().setProperty("/profesionales/CodProfesional2", data.CodProfesional2);
            this.getView().getModel().setProperty("/profesionales/NomProfesional2", data.NomProfesional2);
            var clienDatosAdic = data.listCliPregResp;
            for (var indice in clienDatosAdic) {
                this.getView().getModel().setProperty("/preguntas/" + clienDatosAdic[indice].CODP, clienDatosAdic[indice]);
            }
        },
        obtenerMateriales: function (pedido) {
            this.getView().getModel().setProperty("/listaMaterial", pedido.Detalle);
        },
        ///////////Fin Visualizar////////////////////////////////////////////////////////////////////////////////////////////////

        ///////////Inicio Modificar Producto//////////////////////////////////////////////////////////////////////////////////////////////
        /** metodos de selecionar datos del popup **/
 onDocNuevoMasterProductosAdd: function () {
    var codigoMaterial = this.getView().byId("txt_codigo_anadir_material").getValue() ;
    var opcionMaterial = this.getView().byId("com_ambiente_anadir_material").getSelectedKey() ;
    var codigoAmbiente = this.getView().byId("com_opcion_anadir_material").getSelectedKey();
    var cantidad = this.getView().byId("txt_cantidad_anadir_material").getValue() ;
    
    if(codigoMaterial !=="" && opcionMaterial !=="" && codigoAmbiente !=="" ) {
        var tamanoList = this.obtenerTamaniolLista();
        var nuevoMaterial = this.crearNuevoMaterial(codigoMaterial, opcionMaterial, codigoAmbiente, cantidad, tamanoList);
        var self = this;

        self.getView().byId("loadingControl").open();
        setTimeout(function(){
            var result = documentosServices.anadirMaterialMaster(nuevoMaterial);
            if (result.c === "s") {
                if (result.data.success) {
                    var materialSer = result.data.lstTotal[0];
                    var stockSer = result.data.lstStock;

                    if(materialSer != null) {
                        var material = self.agregarMaterialNuevo(materialSer,stockSer,cantidad,tamanoList);
                        var materiales = self.getView().getModel().getProperty("/listaMaterial");
                        if(materiales == null) {materiales = new Array();}
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
        onMasterProductoSeleccionarMaterial: function (oEvent) {
            var material = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
           /* var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
            var descPrincipal = this.obtonerDescuento(material, listaPrincipal);
            var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}];
            var descOtros = this.obtonerDescuento(material, listaOtros);*/
            this.getView().getModel().setProperty("/material", material);
            //this.getView().getModel().setProperty("/material/DescuentoPrincipal", descPrincipal);
            //this.getView().getModel().setProperty("/material/DescuentoOtros", descOtros);
            this.getView().getModel().refresh();
        },  
/** utilitarios **/
        crearNuevoMaterial: function (codigoMaterial, opcionMaterial, codigoAmbiente, cantidad,tamanoList) {
        var documento = this.getView().getModel().getProperty("/pedido");
        var solicitante = this.getView().getModel().getProperty("/cliente");
        var interlocutores = this.getView().getModel().getProperty("/interlocutores");
        var observaciones = this.getView().getModel().getProperty("/observaciones");
        var tipoDocumento = "Z001";

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

        agregarMaterialNuevo: function (materialSer,stockSer,cantidad,tamanoList) {
            var pedido  = this.getView().getModel().getProperty("/pedido") ;
            var stockMayor = stockSer[stockSer.length-1];            

            //agregr material
            var material = materialSer.Material;
            material.Posicion = materialSer.Posicion;
            material.Ambiente = materialSer.Opcion;
            material.Zservicio = materialSer.Zservicio ;
            material.Cantidad = cantidad;   
            material.PrioridadEntrega = materialSer.PrioridadEntrega;   
            material.MotivoRechazo = materialSer.MotivoRechazo;   
            material.PesoNeto = materialSer.PesoNeto;
            material.Opcion = materialSer.CodGrupoMat;
            material.CodCentro = stockMayor.CodCentro;
            material.CodAlmacen = stockMayor.CodAlmacen;
            material.CodLote = stockMayor.CodLote;
            material.DescCentro = stockMayor.DescCentro;
            material.PrecioUnitario = (materialSer.PrecioUnitario > 0) ? materialSer.PrecioUnitario : "";
            material.DescAlmacen = stockMayor.DescAlmacen;
            material.Reparto = materialSer.FechaEntregaString;
            material.fullName = stockMayor.CodCentro+" "+stockMayor.DescCentro+" / "+stockMayor.CodAlmacen+" / "+stockMayor.CodLote;
            //agregar reparto
            var repartos = new Array();
            for (var indice in materialSer.Repartos) {
                var reparto = materialSer.Repartos[indice];
                reparto.CodUMedida = materialSer.CodUMedida;                
                reparto.CantPed = cantidad;
                reparto.CantConf = cantidad;   
                repartos.push(reparto);              
            }
            material.Repartos = repartos;
            //agregar lista de stock
            var stocks = new Array();
            for (var indice in stockSer) {
                var stock = stockSer[indice];
                stocks.push(stock);
            }
            material.stockDetallado = stocks;            
            return material;
        },
        obtenerTamaniolLista: function() {
            var listaMateriales = this.getView().getModel().getProperty("listaMaterial");
            var tamanoList = (listaMateriales === null) ? 10 : (listaMateriales.length + 1 ) * 10;
            return tamanoList;
        },
        /////Fin Boton Añadir Producto del Master////////////////////////////////////////////////////////////////////////////
        //////Inicio Eliminar Material///////////////////////////////////////////////////////////////////////////////////////
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
        //////Fin Eliminar Material///////////////////////////////////////////////////////////////////////////////////////
        //////////Fin Modificar Producto//////////////////////////////////////////////////////////////////////////////////

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
        goHome: function () {
            this.getView().byId("dlg_stockPorLlegar").close();
            this.getView().byId("dlg_stockPorPedir").close();
        },
        /////////Fin Stock Por Llegar///////////////////////////////////////////////////////////////////////////////////
        

        //Boton Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").open()
        },
        onDocNuevoCloseBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").close()
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

        //Abrir Dialog para Agregar Producto
        onDocNuevodlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").open();
        },

        onDocNuevoClosedlg_addProducto: function () {
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

        //Abrir Dialog Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").open()
        },

        //Cerrar Dialog Seleccionar Cliente
        onDocNuevoCloseSeleccionarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close()
        },

        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaCliente: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/clienteSeleccionado", obj);
            this.getView().getModel().refresh();



            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductosBuscarCliente"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_cliente_buscado"));

            console.log(obj.codigo);
        },

        //Al presionar en la Lista de los Clientes Buscados
        onDocNuevoListBuscarCliente: function () {
        },

        //Al Presionar Boton Buscar Cliente desde el Dialog
        onDocNuevoBuscarClienteAccion: function () {
            var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
            var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();

            if (ruc || nombre) {

                var result = clienteServices.buscarCliente(ruc, nombre);

                if (result.c === "s") {

                    if (result.data.success) {

                        this.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
                        this.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
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
            } else {
                sap.m.MessageToast.show('Ingrese RUC ó Razón social', {
                    duration: 1000
                });
                return;
            }


        },

        

        //Seleccionar Categoria
        /*onSeleccionarCategoria: function(){
         var categoria = this.getView().byId("comboCategoria").getSelectedKey();
         var linea[] = window.dataIni.lstLinea;
         var listaL[];
         
         for (var i = 0; i < (linea[].lenght); i++) {
         
         
         
         if(linea[]{Codigo} == categoria ){
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

            
            var result = materialServices.buscarmaterial(codigo, codigoAntiguo, descripcionMaterial, categoria, linea, marca, orgVentas, canalDist, ofVentas);

            if (result.c === "s") {
                this.getView().byId("dlg_DocNuevobuscar").close();
                if (result.data.success) {

                    this.getView().getModel().setProperty("/BusquedaMateriales", result.data.materiales);
                    this.getView().getModel().setProperty("/RetornolstCentros", result.data.lstCentros);
                    this.getView().byId("dlg_BuscarMateriales").open();
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


                if (itemcod.substring(0, 2) == categoria) {

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


                if (itemcod.substring(0, 5) == linea) {

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


        onSiMensajeAviso1: function () {

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
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();


        },

        onNoMensajeAviso1: function () {

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
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevobuscar").close();
            this.getView().byId("dlg_BuscarMateriales").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();


        },

        onDocNuevoMasterProductosAddonDialog: function (evt) {

            this.getView().byId("dlg_MensajeAviso1").open();
        },

        SeleccionarMaterial: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();

            //var item=[];
            //var item = { CodMaterial: "{/materialSelec/CodMaterial}" , DescMaterial: "{/materialSelec/DescMaterial}" };



            this.getView().getModel().setProperty("/materialSelec", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
        },

        onMasterProductoSeleccionarMaterial: function (oEvent) {
            var obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/materialSeleccionado", obj);
            this.getView().getModel().refresh();
        },

        onSeleccionarCaracteristicas: function (oEvent) {
            var caracteristicas = this.getView().byId("comboCategoria").getSelectedKey();
            var dlg = "dlg_categoria_";
            var dlgtotal = dlg.concat(caracteristicas);



            if (caracteristicas !== " ") {

                if (caracteristicas == "08" | caracteristicas == "10" | caracteristicas == "12" | caracteristicas == "13" | caracteristicas == "16" | caracteristicas == "99") {
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
        }





    });

});
