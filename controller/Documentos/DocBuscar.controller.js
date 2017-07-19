sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/documentosServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery, documentosServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocBuscar", {
        
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            window.numeroDocumento = null;
        },
        onRouteMatched: function (oEvent) {
            //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
                var date = new Date();
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
                var dd  = date.getDate().toString();
                var fechaActual = yyyy +"-"+ (mm[1] ? mm : "0" + mm[0]) +"-"+ (dd[1] ? dd : "0" + dd[0]); // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
            var oData = {
                datosBuscarDoc: {
                    "tipoBusqueda": "1",
                    "datoBusqueda": "",
                    "nMaterial": "",
                    "claseDoc": " ",
                    "fechaInicio": "", //2017-07-10T20:57:43.311Z
                    "fechaFin": "", //2017-07-10T20:57:43.311Z
                    "codAsesor": window.dataIni.person.PerNr, //00001802
                    "fecInicio1": fechaActual, //2017-07-10
                    "fecFin1": fechaActual, //2017-07-10
                    "Detalle": [],
                    "ClaseDocumento": "", //String si es Cotizacion
                    "NumeroPedido": "",
                    "knumv": "",
                    "flujo": [],
                    "numeroPedidos": {}
                },
            };
            if (oEvent.getParameter("name") == "appDocBuscar") {
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_DialogDocBuscar").open();
            }
            //INICIO EDELACRUZ: 
            //Valores Dialog "Buscar Documento"(dlg_DialogDocBuscarInicio.xml)
            //Combo campo: "tipo de busqueda"
            var listaTipoDoc = [];
            var objTipoDoc0 = {
                Codigo: "1",
                Descripcion: "Número de Pedido"
            };
            var objTipoDoc1 = {
                Codigo: "2",
                Descripcion: "Número de Factura"
            };
            var objTipoDoc2 = {
                Codigo: "3",
                Descripcion: "Nombre de Cliente"
            };
            var objTipoDoc3 = {
                Codigo: "4",
                Descripcion: "RUC / DNI"
            };
            var objTipoDoc4 = {
                Codigo: "5",
                Descripcion: "Código de Cliente"
            };
            var objTipoDoc5 = {
                Codigo: "6",
                Descripcion: "Nombre de material"
            };
            var objTipoDoc6 = {
                Codigo: "7",
                Descripcion: "Material"
            };
            listaTipoDoc.push(objTipoDoc0);
            listaTipoDoc.push(objTipoDoc1);
            listaTipoDoc.push(objTipoDoc2);
            listaTipoDoc.push(objTipoDoc3);
            listaTipoDoc.push(objTipoDoc4);
            listaTipoDoc.push(objTipoDoc5);
            listaTipoDoc.push(objTipoDoc6);
            //FIN EDELACRUZ 
            this.getView().getModel().setProperty("/dataIni", window.dataIni);
            this.getView().getModel().setProperty("/modelTipoBusq", listaTipoDoc);
            this.getView().getModel().refresh();
        },
        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        //Buscar en Dialgo Buscar
        onBuscarDlg_DialogDocBuscar: function (oEvent) {
            var buscarDoc = this.getView().getModel().getProperty("/datosBuscarDoc");
            var result = documentosServices.buscarDocumento(buscarDoc);
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                if (result.c === "s") {
                    if (result.data.success) {
                        self.getView().getModel().setProperty("/retornoBuscarDoc", result.data);
                        self.getView().getModel().refresh();
                        self.getView().byId("dlg_DialogDocBuscar").close();
                        self.getView().byId("dlg_DocBuscarLista").open();
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
                self.getView().byId("loadingControl").close();
            }, 500);
        },
        onCancenlDlg_DialogDocBuscar: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appDocHome");
        },
        onListaBuscarDoc: function (evt) {
            var docSeleccionado = evt.getSource().getSelectedItem().getBindingContext().getObject();
            console.log(docSeleccionado);
            this.getView().getModel().setProperty("/datosBuscarDoc/ClaseDocumento", docSeleccionado.ClaseDocumento);
            this.getView().getModel().setProperty("/datosBuscarDoc/knumv", docSeleccionado.knumv);
            this.getView().getModel().setProperty("/datosBuscarDoc/Detalle", docSeleccionado.Detalle);
            this.getView().getModel().setProperty("/datosBuscarDoc/NumeroPedido", docSeleccionado.NumeroPedido);
            this.getView().byId("dlg_DocBuscarLista").close();
        },
        onListaDetalleDoc: function (evt) {
            var docSeleccionado = evt.getSource().getSelectedItem().getBindingContext().getObject();
            window.numeroDocumento = docSeleccionado.DocumentoVenta;
            console.log(docSeleccionado);
        },
        onBtnFlujo: function () {
            if (window.numeroDocumento) {
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocFlujo");
                    self.getView().byId("loadingControl").close();
                }, 100);
            } else {
                MessageToast.show("Seleccione un Documento");
            }
        },
        onBtnImprimir: function () {
            if (window.numeroDocumento) {
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocHome");
                    self.getView().getModel().refresh();
                    self.getView().byId("loadingControl").close();
                }, 100);
            } else {
                MessageToast.show("Seleccione un Documento");
            }
        },
        onListaDocumento: function () {
            this.getView().byId("dlg_DocBuscarLista").open();
        },
        onVolver: function () {
            this.getView().byId("dlg_DialogDocBuscar").open();
            this.getView().byId("dlg_DocBuscarLista").close();
        },
        onConversionPedido: function () {
            var claseCotizacion = this.getView().getModel().getProperty("/datosBuscarDoc/ClaseDocumento");
            if (claseCotizacion == "COTIZACIÓN DECOR") {
                this.getView().byId("dlg_MensajeAvisoConversionPedido").open();
                var convPedido = this.getView().getModel().getProperty("/datosBuscarDoc");
                var result = documentosServices.conversionPedido(convPedido);
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    console.log("longitud de flujo");
                    console.log(result.data.flujo.length);
                    if (result.c === "s") {
                        if (result.data.success) {
                            for (var i = 0; i < result.data.flujo.length; i++) {
                                var numPedido = result.data.flujo[i].codTipoDoc;
                                if (numPedido == "C") {//condicion
                                    convPedido.numeroPedidos[i] = result.data.flujo[i].NumDocumento; //numero pedido
                                }
                            }
                            console.log("Numero de Pedidos");
                            console.log(convPedido.numeroPedidos);
                            var mensajeParte1 = "Cotizacíón tiene pedido(s) nro: ";
                            var mensajeParte2 = ". ¿Seguro que desea crear el pedido de venta?";
                            self.getView().getModel().setProperty("/mensajeParte1", mensajeParte1);
                            self.getView().getModel().setProperty("/numeroPedidos0", convPedido.numeroPedidos[0]);
                            self.getView().getModel().setProperty("/numeroPedidos1", convPedido.numeroPedidos[1]);
                            self.getView().getModel().setProperty("/numeroPedidos2", convPedido.numeroPedidos[2]);
                            self.getView().getModel().setProperty("/numeroPedidos3", convPedido.numeroPedidos[3]);
                            self.getView().getModel().setProperty("/numeroPedidos4", convPedido.numeroPedidos[4]);
                            self.getView().getModel().setProperty("/numeroPedidos5", convPedido.numeroPedidos[5]);
                            self.getView().getModel().setProperty("/numeroPedidos6", convPedido.numeroPedidos[6]);
                            self.getView().getModel().setProperty("/numeroPedidos7", convPedido.numeroPedidos[7]);
                            self.getView().getModel().setProperty("/mensajeParte2", mensajeParte2);
                            if (result.data.flujo.length == 1) {
                                mensajeParte1 = "No hay Pedido";
                                self.getView().getModel().setProperty("/mensajeParte1", mensajeParte1);
                                self.getView().byId("txt_dlg_MensajeAvisoConversionPedido").bindProperty("text", {parts: [
                                        {path: "/mensajeParte1"},
                                        {path: "/mensajeParte2"},
                                    ]});
                            } else {
                                self.getView().byId("txt_dlg_MensajeAvisoConversionPedido").bindProperty("text", {parts: [
                                        {path: "/mensajeParte1"},
                                        {path: "/numeroPedidos0"},
                                        {path: "/numeroPedidos1"},
                                        {path: "/numeroPedidos2"},
                                        {path: "/numeroPedidos3"},
                                        {path: "/numeroPedidos4"},
                                        {path: "/numeroPedidos5"},
                                        {path: "/numeroPedidos6"},
                                        {path: "/numeroPedidos7"},
                                        {path: "/mensajeParte2"},
                                    ]});
                            }
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
                    self.getView().byId("loadingControl").close();
                }, 500);
            } else {
                this.getView().byId("dlg_MensajeAvisoGeneral").open();
                this.getView().byId("txt_aviso_general").setText("Solo se puede crear si es una cotización");
            }
        },
        onOkDlg_MensajeAvisoGeneral: function () {
            this.getView().byId("dlg_MensajeAvisoGeneral").close();
        },
        onNodlg_MensajeAvisoConversionPedido: function () {
            this.getView().byId("dlg_MensajeAvisoConversionPedido").close();
        },
        onSidlg_MensajeAvisoConversionPedido: function () {
            window.IsDocNuevo = true;
            window.crearPedido = true;
            if (window.numeroDocumento) {
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocNuevo");
                    self.getView().byId("loadingControl").close();
                }, 100);
            } else {
                MessageToast.show("Seleccione un Documento");
            }
        },
    });
});
