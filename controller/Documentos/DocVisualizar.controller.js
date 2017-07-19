sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
    "pe/com/seidor/sap/decor/ventas/model/formatter",
    'jquery.sap.global'
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, documentosServices, formatter, jQuery) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocVisualizar", {
        formatter: formatter,
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
            if (oEvent.getParameter("name") == "appDocVisualizar") {
                this.getView().byId("SplitAppId").setMode("HideMode");
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_DialogDocVisualizar").open();
            }
            ;
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
            this.setDataInit();
        },
        setDataInit: function () {
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
        //Continuar Dialog Visualizar
        onContinuarDlg_DialogDocVisualizar: function (oEvent) {
            var numDocumento = this.getView().byId("txt_numero_documento").getValue();
            var result = documentosServices.visualizarDocumento("ver", numDocumento);
            if (result.data.success) {
                var data = result.data;
                this.setDataProyecto(data.lstGrupoFor, data.lstTipoFor);
                this.obtenerPedido(data.objPedido);
                this.obtenerObservaciones(data.objPedido.Textos);
                this.obtenerInterlocutores(data);
                this.obtenerMateriales(data.objPedido);
                this.getView().getModel().setProperty("/pedido/enabled", false);
                this.getView().getModel().setProperty("/pedido/enabledBtnCopiar", false);
                this.getView().getModel().setProperty("/pedido/enabledBtnBuscar", false);
                this.getView().getModel().setProperty("/pedido/enabledBtnGuardar", false);
            } else {
                sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
            }
            this.getView().byId("dlg_DialogDocVisualizar").close();
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
        onMasterProductoSeleccionarMaterial: function (oEvent) {
            var material = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
            var descPrincipal = this.obtonerDescuento(material, listaPrincipal);
            var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}];
            var descOtros = this.obtonerDescuento(material, listaOtros);
            this.getView().getModel().setProperty("/material", material);
            this.getView().getModel().setProperty("/material/DescuentoPrincipal", descPrincipal);
            this.getView().getModel().setProperty("/material/DescuentoOtros", descOtros);
            this.getView().getModel().refresh();
        },
        obtonerDescuento: function (material, descuentos) {
            var listaDescuento = [];
            for (var indice in descuentos) {
                listaDescuento.push(material[descuentos[indice].codigoSer]);
            }
            return listaDescuento;
        },
        onOpenRepartoDetail: function (oEvent) {
            this.getView().byId("dlg_DialogDocReparto").open();
            var material = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            var fechaEntrega = moment(material.FechaEntrega).format('DD/MM/YYYY');
            this.getView().getModel().setProperty("/materialDetail", material);
            this.getView().getModel().setProperty("/materialDetail/FechaEntrega", fechaEntrega);
        },
        onCloseRepartoDetail: function (oEvent) {
            this.getView().byId("dlg_DialogDocReparto").close();
        },
        onShowHello: function () {
            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },
        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
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
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));
            }
            if (obj.codigo === 2) {
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail2"));
            }
            if (obj.codigo === 3) {
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail3"));
            }
        }
    });
});
