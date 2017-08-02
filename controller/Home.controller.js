sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "pe/com/seidor/sap/decor/ventas/util/utilString",
    "pe/com/seidor/sap/decor/ventas/services/quejaServices",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/imprimirServices",
    "sap/m/MessageToast",
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
], function (Controller, UIComponent, utilString, quejaServices, JSONModel, imprimirServices, MessageToast, documentosServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Home", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
            var date = new Date();
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = date.getDate().toString();
            var fechaActual = yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding 
            ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
            utilString.prepareDataIni();
            var oData = {
                modelInstala: {
                    "pedido1": "",
                    "pedido2": "",
                    "pedido3": "",
                    "pedido4": "",
                    "cotiza1": "",
                    "cotiza2": "",
                    "cotiza3": "",
                    "pedvisi": ""
                },
                datosQueja: {
                    "NumQueja": "",
                    "CodCli": "",
                    "NomCliente": "",
                    "Calles": "",
                    "Ubicacion": "",
                    "Telefono": "",
                    "OfiVenta": "",
                    "TextoQueja": "",
                    "ADRNR": "",
                    "pNumeroReclamo": "",
                    "pCodigoCliente": "",
                    "pFechaCreacionI": fechaActual,
                    "pFechaCreacionF": fechaActual
                },
                imprimirDoc: {
                    "pNumPedido": "",
                    "tipoImpresion": "0",
                    "accion": "ver"
                },
                imprimirRec: {
                    "pNumeroReclamo": ""
                },
                imprimirQue: {
                    "pNumeroQueja": "",
                    "accion": "verbusqueja"
                }
            };
            
            if (oEvent.getParameter("name") === "appHome") {
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
                if(window.imprimirDoc){
                //////////////Número referencia (Doc Buscar) //////
                this.getView().getModel().setProperty("/imprimirDoc/pNumPedido", window.numeroDocumento);
                ///////////////////////////////////////////////////
                this.goDocImprimir();
                }else{
                    this.onCloseDocImprimir();
                    window.imprimirDoc=false;
                }
            }
                
                
            
            
        },
        //Documentos----------------------
        goDocNuevo: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                // sap.ui.core.BusyIndicator.show();
                ///////////////////////////////////////////////
                window.IsDocNuevo = true;
                ///////////////////////////////////////////////
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocNuevo");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goDocModificar: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocModificar");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goDocVisualizar: function (oEvent) {
            window.IsDocVisualizar=true;
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocVisualizar");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goDocBuscar: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocBuscar");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goDocInstalacion: function (oEvent) {
            this.getView().byId("dlg_DialogDocInstalacion").open();
        },
        goDocFlujo: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocFlujo");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goDocImprimir: function () {
            this.getView().byId("dlg_doc_impresion").open();
        },
        onCloseDocImprimir: function () {
            this.getView().byId("dlg_doc_impresion").close();
        },
        //Stock------------------------------
        goStockDisponible: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                ///////////////////////////////////77777
                window.IsDocNuevo = false;
                ////////////////////////////////////////
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocNuevo");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goStockporLlegar: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appStockporLlegar");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goStockporPedir: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appStockporPedir");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        //Reclamos----------------------------
        goRecNuevo: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecNuevo");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goRecModificar: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecModificar");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goRecVisualizar: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecVisualizar");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goRecBuscar: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecBuscar");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        goRecImprimir: function () {
            this.getView().byId("dlg_rec_impresion").open();
        },
        onCloseRecImprimir: function () {
            this.getView().byId("dlg_rec_impresion").close();
        },
        //Quejas------------------------------
        goQueNuevo: function (oEvent) {
            this.getView().byId("dlg_QueNuevo").open();
        },
        onCloseDlg_QueNuevo: function () {
            this.getView().byId("dlg_QueNuevo").close();
        },
        goQueModificar: function (oEvent) {
            this.getView().byId("dlg_QueModificar").open();
        },
        onCloseDlg_QueModificar: function () {
            this.getView().byId("dlg_QueModificar").close();
        },
        goQueVisualizar: function (oEvent) {
            this.getView().byId("dlg_QueVisualizar").open();
        },
        onCloseDlg_QueVisualizar: function () {
            this.getView().byId("dlg_QueVisualizar").close();
            this.getView().byId("dlg_QueBuscar").close();
            this.getView().byId("dlg_QueBuscarLista").close();
        },
        goQueBuscar: function (oEvent) {
            this.getView().byId("dlg_QueBuscar").open();
        },
        onCloseDlg_QueBuscar: function () {
            this.getView().byId("dlg_QueBuscar").close();
        },
        onOpenDlg_QueBuscarLista: function () {
            this.getView().byId("dlg_QueBuscarLista").open();
        },
        onCloseDlg_QueBuscarLista: function () {
            this.getView().byId("dlg_QueBuscarLista").close();
        },
        goQueImprimir: function () {
            this.getView().byId("dlg_que_impresion").open();
        },
        onCloseQueImprimir: function () {
            this.getView().byId("dlg_que_impresion").close();
        },
        /////////Inicio Instalacion////////////////////////        
        onContinuarDlg_DialogDocInstalacion: function () {
            var pedido1 = this.getView().getModel().getProperty("/modelInstala/pedido1");
            var pedido2 = this.getView().getModel().getProperty("/modelInstala/pedido2");
            var pedido3 = this.getView().getModel().getProperty("/modelInstala/pedido3");
            var pedido4 = this.getView().getModel().getProperty("/modelInstala/pedido4");
            var cotiza1 = this.getView().getModel().getProperty("/modelInstala/cotiza1");
            var cotiza2 = this.getView().getModel().getProperty("/modelInstala/cotiza2");
            var cotiza3 = this.getView().getModel().getProperty("/modelInstala/cotiza3");
            var pedvisi = this.getView().getModel().getProperty("/modelInstala/pedvisi");
            var result = documentosServices.crearInstalacion(pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi);
            if (result.c === "s") {
                if (result.data.success) {
                    this.getView().getModel().setProperty("/resultIntala", result.data.result);
                    this.getView().getModel().refresh();
                    window.pedidoInstalacion = result.data.numPedido;
                    this.getView().getModel().refresh();
                    this.getView().byId("dlg_DialogDocInstalacion").close();
                    this.getView().byId("dlg_MensajeAvisoInstalacion").open();
                } else {
                    sap.m.MessageToast.show(result.data.result, {
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
        onOkMensajeInstalacion: function () {
            this.getView().byId("dlg_MensajeAvisoInstalacion").close();
            if (window.pedidoInstalacion) {
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocModificar");
                    self.getView().byId("loadingControl").close();
                }, 100);
            }
        },
        onCancelDlg_DialogDocInstalacion: function () {
            this.getView().byId("dlg_DialogDocInstalacion").close();
        },
        ////////Fin Instalacion////////////////////////////
        //Usuario-----------------------------
        goUsuInformacion: function (oEvent) {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appUsuInformacion");
                self.getView().byId("loadingControl").close();
            }, 100);
        },
        ///////////////Imprimir/////////////////////////////////////////////////////////
        //////////Imprimir Documento/////////////////////////////////////////
        onImprimirDoc: function ()
        {
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDoc");
            var result = imprimirServices.imprimirDocumento(imprimirDoc);
            var opcion1 = this.getView().byId("opcion1").getSelected();
            var opcion2 = this.getView().byId("opcion2").getSelected();
            //var opcion3 = this.getView().byId("opcion3").getSelected();
            var rutaImpresion = "http://ventas.decor-center.com/DecorQAs/";
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function ()
            {
                if (result.c === "s")
                {
                    if (result.data.success)
                    {
                        if (opcion1 == true)
                        {
                            var tipoDoc = result.data.objPedido.CodTipoDoc;
                            var fechap = result.data.objPedido.Fecha;
                        }
                        var NoImpFac = "";
                        if (opcion1 == true)
                        {
                            NoImpFac = result.data.objPedido.NoImpFac;
                        }
                        if (NoImpFac == "X")
                        {
                            self.getView().getModel().setProperty("/MensajeCorrecto", "No se puede imprimir por bloqueo de factura");
                            self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                            self.getView().getModel().refresh();
                            self.getView().byId("dlg_MensajeAvisoGeneral").open();
                        } else
                        {
                            if (opcion1 == true)
                            {
                                if (tipoDoc == "Z036")
                                {
                                    if (result.data.objPedido.CanalDist == "30")
                                    {
                                        if (result.data.objPedido.CodOficina == "1140")
                                        {
                                            window.open(rutaImpresion + "DocImprVisDE.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        } else
                                        {
                                            window.open(rutaImpresion + "DocImpVisitas.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        }
                                    } else if (result.data.objPedido.CanalDist == "20")
                                    {
                                        if (result.data.objPedido.CodOficina == "1130")
                                        {
                                            window.open(rutaImpresion + "DocImprVisUF.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        } else
                                        {
                                            window.open(rutaImpresion + "DocImprVisFA.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        }
                                    } else
                                    {
                                        if (result.data.objPedido.CodOficina == "1110" ||
                                                result.data.objPedido.CodOficina == "1040" ||
                                                result.data.objPedido.CodOficina == "1070")
                                        {
                                            window.open(rutaImpresion + "DocImprVisCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        } else
                                        {
                                            window.open(rutaImpresion + "DocImpVisitas.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        }
                                    }
                                } else
                                {
                                    if (result.data.objPedido.CanalDist == "30")
                                    {
                                        if (result.data.objPedido.CodOficina == "1140")
                                        {
                                            var fechaz = window.dataIni.lstValambi[0].Descripcion;
                                            if (fechaz <= fechap)
                                            {
                                                window.open(rutaImpresion + "DocImprGrpAmbDE.aspx?np=" + imprimirDoc.pNumPedido, "");
                                            } else
                                            {
                                                window.open(rutaImpresion + "DocImprDE.aspx?np=" + imprimirDoc.pNumPedido, "");
                                            }
                                        } else if (result.data.objPedido.CodOficina == "1110" ||
                                                result.data.objPedido.CodOficina == "1040")
                                        {
                                            window.open(rutaImpresion + "DocImprGrpAmbCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        } else
                                        {
                                            if (tipoDoc == "ZO01" || tipoDoc == "Z001")
                                            {
                                                var fechaz = window.dataIni.lstValambi[0].Descripcion;
                                                if (fechaz <= fechap)
                                                {
                                                    window.open(rutaImpresion + "DocImprGrpAmb.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                } else
                                                {
                                                    window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                }
                                            } else {
                                                window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                            }
                                        }
                                    } else if (result.data.objPedido.CanalDist == "20")
                                    {
                                        if (result.data.objPedido.CodOficina == "1130")
                                        {
                                            window.open(rutaImpresion + "DocImprUF.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        } else
                                        {
                                            window.open(rutaImpresion + "DocImprFA.aspx?np=" + imprimirDoc.pNumPedido, "");
                                        }
                                    } else
                                    {
                                        if (tipoDoc == "ZO01" || tipoDoc == "Z001")
                                        {
                                            var fechaz = window.dataIni.lstValambi[0].Descripcion;
                                            if (fechaz <= fechap)
                                            {
                                                if (result.data.objPedido.CodOficina == "1110" ||
                                                        result.data.objPedido.CodOficina == "1040" ||
                                                        result.data.objPedido.CodOficina == "1070")
                                                {
                                                    window.open(rutaImpresion + "DocImprGrpAmbCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                } else
                                                {
                                                    window.open(rutaImpresion + "DocImprGrpAmb.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                }
                                            } else
                                            {
                                                if (result.data.objPedido.CodOficina == "1110" ||
                                                        result.data.objPedido.CodOficina == "1040" ||
                                                        result.data.objPedido.CodOficina == "1070")
                                                {
                                                    window.open(rutaImpresion + "DocImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                } else {
                                                    window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                }
                                            }
                                        } else
                                        {
                                            if (result.data.objPedido.CodOficina == "1110" ||
                                                    result.data.objPedido.CodOficina == "1040" ||
                                                    result.data.objPedido.CodOficina == "1070")
                                            {
                                                window.open(rutaImpresion + "DocImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                            } else {
                                                window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                            }
                                        }
                                    }
                                }
                                self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el documento");
                                self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                                self.getView().getModel().refresh();
                                self.getView().byId("dlg_MensajeAvisoGeneral").open();
                            } else if (opcion2 == true)
                            {
                                var tipoDoc = result.data.objPedido.CodTipoDoc;
                                if (tipoDoc == "Z001" || tipoDoc == "Z034" || tipoDoc == "Z003" ||
                                        tipoDoc == "Z004" || tipoDoc == "Z010")
                                {
                                    if ((result.data.objPedido.CanalDist == "10" ||
                                            result.data.objPedido.CanalDist == "30") &&
                                            (result.data.objPedido.CodOficina == "1110" ||
                                                    result.data.objPedido.CodOficina == "1040" ||
                                                    result.data.objPedido.CodOficina == "1070"))
                                    {
                                        window.open(rutaImpresion + "DocPedEntImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                    } else {
                                        window.open(rutaImpresion + "DocPedEntImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                    }
                                    self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el documento");
                                    self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                                    self.getView().getModel().refresh();
                                    self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                } else
                                {
                                    self.getView().getModel().setProperty("/MensajeCorrecto", "La impresión seleccionada solo es válida para pedidos Z001,Z034,Z003,Z004 y Z010");
                                    self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                                    self.getView().getModel().refresh();
                                    self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                }
                            }
                        }
                    } else
                    {
                        sap.m.MessageToast.show(result.data.errors.reason, {
                            duration: 3000
                        });
                    }
                } else
                {
                    sap.m.MessageToast.show(result.m, {
                        duration: 3000
                    });
                }
                //console.log(result.data);
                self.getView().byId("loadingControl").close();
            }, 500);
        },
        ////////////////////////////////////////////////////////////////////
        //////////Imprimir Reclamo/////////////////////////////////////////
        onImprimirRec: function () {
            var imprimirRec = this.getView().getModel().getProperty("/imprimirRec");
            var result = imprimirServices.imprimirReclamo(imprimirRec);
            var rutaImpresion = "http://ventas.decor-center.com/DecorQAs/";
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                if (result.c === "s") {
                    if (result.data.success) {
                        if (result.data.objReclamo.Contactos.VTWEG == "30")
                        {
                            if (result.data.objReclamo.Contactos.VKBUR == "1140")
                            {
                                window.open(rutaImpresion + "ImprReclamoDE.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                            } else
                            {
                                window.open(rutaImpresion + "ImprReclamo.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                            }
                        } else if (result.data.objReclamo.Contactos.VTWEG == "20")
                        {
                            if (result.data.objReclamo.Contactos.VKBUR == "1130")
                            {
                                window.open(rutaImpresion + "ImprReclamoUF.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                            } else
                            {
                                window.open(rutaImpresion + "ImprReclamoFA.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                            }
                        } else
                        {
                            if (result.data.objReclamo.Contactos.VKBUR == "1110" ||
                                    result.data.objReclamo.Contactos.VKBUR == "1040" ||
                                    result.data.objReclamo.Contactos.VKBUR == "1070") //..
                            {
                                window.open(rutaImpresion + "ImprReclamoCasa.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                            } else
                            {
                                window.open(rutaImpresion + "ImprReclamo.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                            }
                        }
                        self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el reclamo");
                        self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                        self.getView().getModel().refresh();
                        self.getView().byId("dlg_MensajeAvisoGeneral").open();
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
        ////////////////////////////////////////////////////////////////////
        //////////Imprimir Queja/////////////////////////////////////////
        onImprimirQue: function () {
            var imprimirQue = this.getView().getModel().getProperty("/imprimirQue");
            var result = imprimirServices.imprimirQueja(imprimirQue);
            var rutaImpresion = "http://ventas.decor-center.com/DecorQAs/";
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                if (result.c === "s") {
                    if (result.data.success) {
                        if (result.data.objqueja.Contactos.VTWEG == "30")
                        {
                            if (result.data.objqueja.Contactos.VKBUR == "1140")
                            {
                                window.open(rutaImpresion + "imprQuejaDE.aspx?np=" + imprimirQue.pNumeroQueja, "");
                            } else
                            {
                                window.open(rutaImpresion + "imprQueja.aspx?np=" + imprimirQue.pNumeroQueja, "");
                            }
                        } else if (result.data.objqueja.Contactos.VTWEG == "20")
                        {
                            if (result.data.objqueja.Contactos.VKBUR == "1130")
                            {
                                window.open(rutaImpresion + "imprQuejaUF.aspx?np=" + imprimirQue.pNumeroQueja, "");
                            } else
                            {
                                window.open(rutaImpresion + "imprQuejaFA.aspx?np=" + imprimirQue.pNumeroQueja, "");
                            }
                        } else
                        {
                            if (result.data.objqueja.Contactos.VKBUR == "1110" ||
                                    result.data.objqueja.Contactos.VKBUR == "1040" ||
                                    result.data.objqueja.Contactos.VKBUR == "1070") //..
                            {
                                window.open(rutaImpresion + "imprQuejaCasa.aspx?np=" + imprimirQue.pNumeroQueja, "");
                            } else
                            {
                                window.open(rutaImpresion + "imprQueja.aspx?np=" + imprimirQue.pNumeroQueja, "");
                            }
                        }
                        self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir la queja");
                        self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                        self.getView().getModel().refresh();
                        self.getView().byId("dlg_MensajeAvisoGeneral").open();
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
        ////////////////////////////////////////////////////////////////////////////////
        /////////Buscar Cliente en Nueva Queja/////////////////////////
        onBuscarCliQueja: function () {
            var buscarCliQueja = this.getView().getModel().getProperty("/datosQueja");
            var result = quejaServices.buscarCliQueja(buscarCliQueja);
            var self = this;
            if (buscarCliQueja.CodCli !== "") {
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    if (result.c === "s") {
                        if (result.data.success) {
                            if (result.data.objCliente.Mail == "X")
                            {
                                MessageToast.show("No se encontró información");
                            } else {
                                var apellidoPat = result.data.objCliente.APPAT;
                                var apellidoMat = result.data.objCliente.APMAT;
                                var nombre = result.data.objCliente.NOMBRE;
                                var descripcion = result.data.objCliente.Descripcion;
                                //NOMBRES
                                if (result.data.objCliente.APPAT == null)
                                {
                                    apellidoPat = "";
                                } else
                                {
                                    apellidoPat = result.data.objCliente.APPAT;
                                }
                                if (result.data.objCliente.APMAT == null)
                                {
                                    apellidoMat = "";
                                } else
                                {
                                    apellidoMat = result.data.objCliente.APMAT;
                                }
                                if (result.data.objCliente.NOMBRE == null)
                                {
                                    nombre = "";
                                } else
                                {
                                    nombre = result.data.objCliente.NOMBRE;
                                }
                                if (result.data.objCliente.Descripcion == null)
                                {
                                    descripcion = "";
                                } else
                                {
                                    descripcion = result.data.objCliente.Descripcion;
                                }
                                buscarCliQueja.NomCliente = apellidoPat + " " + apellidoMat + " " + nombre + " " + descripcion;
                                //DIRECCION      
                                if (buscarCliQueja.CodCli.length == 10)
                                {
                                    buscarCliQueja.Calles = result.data.objCliente.Direccion;
                                }
                                if (buscarCliQueja.CodCli.length == 8)
                                {
                                    buscarCliQueja.Calles = result.data.objCliente.DIREC;
                                }
                                if (buscarCliQueja.CodCli.length == 11)
                                {
                                    buscarCliQueja.Calles = result.data.objCliente.DIREC;
                                    if (buscarCliQueja.Calles == null || buscarCliQueja.Calles == undefined || buscarCliQueja.Calles == "")
                                    {
                                        buscarCliQueja.Calles = result.data.objCliente.Direccion;
                                    }
                                }
                                //Ubicacion
                                if (result.data.objCliente.Ciudad == null || result.data.objCliente.Ciudad == "" || result.data.objCliente.Ciudad == " " || result.data.objCliente.Ciudad == undefined)
                                {
                                    if (buscarCliQueja.CodCli.length == 11)
                                    {
                                        buscarCliQueja.Ubicacion = result.data.objCliente.Distrito;
                                        if (result.data.objCliente.Distrito == null || result.data.objCliente.Distrito == "" || result.data.objCliente.Distrito == undefined)
                                        {
                                            buscarCliQueja.Ubicacion = result.data.objCliente.Ciudad;
                                        }
                                    } else {
                                        buscarCliQueja.Ubicacion = result.data.objCliente.Ciudad;
                                    }
                                } else {
                                    buscarCliQueja.Ubicacion = result.data.objCliente.Ciudad;
                                }
                                buscarCliQueja.Telefono = result.data.objCliente.Telefono;
                                //buscarCliQueja.OfiVenta = self.getView().getModel().getProperty("/RetornoBuscarCliQueja");
                                //buscarCliQueja.TextoQueja = self.getView().getModel().getProperty("/RetornoBuscarCliQueja");
                                self.getView().getModel().refresh();
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
                MessageToast.show("Ingresar DNI o RUC");
            }
        },
        onGuardarQueja: function () {
            var self = this;
            if (self.getView().byId("txt_ruc_nuevaQueja").getValue() == "")
            {
                MessageToast.show("Ingrese RUC o DNI");
            } else if (self.getView().byId("txt_descripcion_nuevaQueja").getValue() == "")
            {
                MessageToast.show("Ingrese Nombre o Descripción");
            } else if (self.getView().byId("txt_calle_nuevaQueja").getValue() == "")
            {
                MessageToast.show("Ingresar Calle");
            } else if (self.getView().byId("txt_ubicacion_nuevaQueja").getValue() == "")
            {
                MessageToast.show("Ingresar Ubicación o Distrito");
            } else if (self.getView().byId("txt_telefono_nuevaQueja").getValue() == "")
            {
                MessageToast.show("Ingresar Teléfono");
            } else if (self.getView().byId("com_ofVentas_nuevaQueja").getSelectedKey() == "")
            {
                MessageToast.show("Ingresar Oficina de Ventas");
            } else if (self.getView().byId("txtArea_motivo_nuevaQueja").getValue() == "")
            {
                MessageToast.show("Ingresar Motivo de Queja");
            } else
            {
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var nuevoQueja = self.getView().getModel().getProperty("/datosQueja");
                    var result = quejaServices.guardarQueja(nuevoQueja);
                    if (result.c === "s") {
                        if (result.data.success) {
                            var reclamo = result.data.mensaje;
                            var queja = reclamo.replace("El reclamo", "Queja").replace(/:/g, '');
                            self.getView().getModel().setProperty("/MensajeCorrecto", queja);
                            self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                            self.getView().getModel().refresh();
                            self.getView().byId("dlg_MensajeAvisoGeneral").open();
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
            }
        },
        onBuscarQueja: function () {
            var buscarQueja = this.getView().getModel().getProperty("/datosQueja");
            var result = quejaServices.buscarQueja(buscarQueja);
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                if (result.c === "s") {
                    if (result.data.success) {
                        buscarQueja.CodCli = result.data.objqueja.Contactos.KUNNR;
                        buscarQueja.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE;
                        buscarQueja.Calles = result.data.objqueja.Interlocutor[0].Calle;
                        buscarQueja.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad;
                        buscarQueja.Telefono = result.data.objqueja.Interlocutor[0].Telefono;
                        buscarQueja.OfiVenta = result.data.objqueja.Contactos.VKBUR;
                        var texto = result.data.objqueja.Texto;
                        buscarQueja.TextoQueja = texto[1].Descripcion;
                        ///////////////////////////////////////
                        buscarQueja.ADRNR = result.data.objqueja.Interlocutor[0].ADRNR;
                        ////////////////////////////////////////
                        self.getView().getModel().refresh();
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
        onOkDlg_MensajeAvisoGeneral: function () {
            this.getView().byId("dlg_MensajeAvisoGeneral").close();
            this.getView().byId("dlg_QueNuevo").close();
            this.getView().byId("dlg_QueModificar").close();
        },
        onModificarQueja: function () {
            var modificarQueja = this.getView().getModel().getProperty("/datosQueja");
            var result = quejaServices.modificarQueja(modificarQueja);
            var self = this;
            if (self.getView().byId("txtArea_motivo_nuevaQueja").getValue() != "")
            {
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    if (result.c === "s") {
                        if (result.data.success) {
                            var reclamo = result.data.mensaje;
                            var queja = reclamo.replace("Reclamo", "Queja").replace(/:/g, '');
                            self.getView().getModel().setProperty("/MensajeCorrecto", queja);
                            self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                            self.getView().getModel().refresh();
                            self.getView().byId("dlg_MensajeAvisoGeneral").open();
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
                MessageToast.show("Ingresar texto de la queja");
            }
        },
        onBuscarListaQueja: function () {
            this.getView().byId("dlg_QueBuscarLista").open();
            var buscarListaQueja = this.getView().getModel().getProperty("/datosQueja");
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var result = quejaServices.buscarListaQueja(buscarListaQueja);
                if (result.c === "s") {
                    if (result.data.success) {
                        self.getView().getModel().setProperty("/RetornoBuscarListaQueja", result.data);
                        self.getView().getModel().refresh();
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
        onListaBuscarQueja: function (evt) {
            var itemLista = evt.getSource().getSelectedItem().getBindingContext().getObject();
            console.log(itemLista);
            this.getView().getModel().setProperty("/QuejaSeleccionado", itemLista);
        },
        verQuejaSeleccionado: function () {
            var quejaSeleccionado = this.getView().getModel().getProperty("/QuejaSeleccionado");
            if (quejaSeleccionado) {
                var verQuejaSeleccionado = this.getView().getModel().getProperty("/datosQueja");
                verQuejaSeleccionado.NumQueja = quejaSeleccionado.VBELN;
                var result = quejaServices.verQuejaSeleccionado(verQuejaSeleccionado);
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    if (result.c === "s") {
                        if (result.data.success) {
                            var interlocutor = result.data.objqueja.Interlocutor;
                            verQuejaSeleccionado.CodCli = result.data.objqueja.Contactos.KUNNR;
                            verQuejaSeleccionado.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE;
                            verQuejaSeleccionado.Calles = result.data.objqueja.Interlocutor[0].Calle;
                            verQuejaSeleccionado.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad; //CodPostal
                            verQuejaSeleccionado.Telefono = result.data.objqueja.Interlocutor[0].Telefono;
                            verQuejaSeleccionado.OfiVenta = result.data.objqueja.Contactos.VKBUR;
                            for (var i = 0; i < result.data.objqueja.Texto.length; i++)
                            {
                                if (result.data.objqueja.Texto[i].CodTexto == 'Z013')
                                {
                                    verQuejaSeleccionado.TextoQueja = result.data.objqueja.Texto[i].Descripcion;
                                    break;
                                }
                            }
                            self.getView().getModel().refresh();
                            self.getView().byId("dlg_QueVisualizar").open();
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
                    self.getView().getModel().setProperty("/QuejaSeleccionado", null);
                    self.getView().byId("loadingControl").close();
                }, 500);
            } else {
                MessageToast.show("Seleccione una Queja");
            }
        },
        onVerBuscarQueja: function () {
            var verBuscarQueja = this.getView().getModel().getProperty("/datosQueja");
            var self = this;
            if (verBuscarQueja.NumQueja != "")
            {
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var result = quejaServices.verBuscarQueja(verBuscarQueja);
                    if (result.c === "s") {
                        if (result.data.success) {
                            verBuscarQueja.NumQueja = result.data.objqueja.Contactos.VBELN;
                            verBuscarQueja.CodCli = result.data.objqueja.Contactos.KUNNR;
                            verBuscarQueja.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE;
                            verBuscarQueja.Calles = result.data.objqueja.Interlocutor[0].Calle;
                            verBuscarQueja.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad;
                            verBuscarQueja.Telefono = result.data.objqueja.Interlocutor[0].Telefono;
                            verBuscarQueja.OfiVenta = result.data.objqueja.Contactos.VKBUR;
                            for (var i = 0; i < result.data.objqueja.Texto.length; i++)
                            {
                                if (result.data.objqueja.Texto[i].CodTexto == 'Z013')
                                {
                                    verBuscarQueja.TextoQueja = result.data.objqueja.Texto[i].Descripcion;
                                    break;
                                }
                            }
                            self.getView().getModel().refresh();
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
                MessageToast.show("Ingresar Número de Queja")
            }
        }
    });
});