sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/m/MessageBox',
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "pe/com/seidor/sap/decor/ventas/app",
    "pe/com/seidor/sap/decor/ventas/services/centrosServices",
    "pe/com/seidor/sap/decor/ventas/services/surtidosServices",
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
    "pe/com/seidor/sap/decor/ventas/services/comprasServices",
    "pe/com/seidor/sap/decor/ventas/services/materialesServices",
    "sap/ui/model/Filter",
    "pe/com/seidor/sap/decor/ventas/util/utilString",
    "pe/com/seidor/sap/decor/ventas/services/accesoServices"
], function (Controller, JSONModel, MessageBox, UIComponent, MessageToast,
    app, centrosServices, surtidosServices, documentosServices,
    comprasServices, materialesServices, Filter, utilString,accesoServices) {

        "use strict";

        return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Home", {
            onInit: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.attachRoutePatternMatched(this.onRouteMatched, this);

            },

            onRouteMatched: function (oEvent) {

                utilString.prepareDataIni();
                //this.getView().byId("loadingControl").open();
                
                // console.log(accesoServices.login("JPINGO","JPINGO1*"));

                //this.getView().byId("loadingControl").close();
            },

            //Documentos----------------------
            goDocNuevo: function (oEvent){
               // sap.ui.core.BusyIndicator.show();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appDocNuevo");

            },
            goDocModificar: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appDocModificar");
            },
            goDocVisualizar: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appDocVisualizar");
            },
            goDocBuscar: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appDocBuscar");
            },
            goDocInstalacion: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appDocInstalacion");
            },
            goDocFlujo: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appDocFlujo");
            },
            goDocImprimir: function(oEvent){
                this.getView().byId("dlg_doc_impresion").open();  
            },
            onCloseDocImprimir:function(){
                this.getView().byId("dlg_doc_impresion").close();
            },


            //Stock------------------------------

            goStockDisponible: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appStockDisponible");
            },
            goStockporLlegar: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appStockporLlegar");
            },
            goStockporPedir: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appStockporPedir");
            },


            //Reclamos----------------------------

            goRecNuevo: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appRecNuevo");
            },
            goRecModificar: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appRecModificar");
            },
            goRecVisualizar: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appRecVisualizar");
            },
            goRecBuscar: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appRecBuscar");
            },
            goRecImprimir: function(oEvent){
                this.getView().byId("dlg_rec_impresion").open();
            },
            onCloseRecImprimir:function(){
                this.getView().byId("dlg_rec_impresion").close();
            },



            //Quejas------------------------------
            goQueNuevo: function(oEvent){
                this.getView().byId("dlg_QueNuevo").open();
            },
            onCloseDlg_QueNuevo:function(){
            this.getView().byId("dlg_QueNuevo").close();
            },



            goQueModificar: function(oEvent){
               this.getView().byId("dlg_QueModificar").open();
            },
            onCloseDlg_QueModificar:function(){
            this.getView().byId("dlg_QueModificar").close();
            },



            goQueVisualizar: function(oEvent){
                this.getView().byId("dlg_QueVisualizar").open();
            },
            onCloseDlg_QueVisualizar:function(){
            this.getView().byId("dlg_QueVisualizar").close();
            },



            goQueBuscar: function(oEvent){
                this.getView().byId("dlg_QueBuscar").open();
            },
            onCloseDlg_QueBuscar:function(){
            this.getView().byId("dlg_QueBuscar").close();
            },
            onOpenDlg_QueBuscarLista:function(){
                this.getView().byId("dlg_QueBuscarLista").open();
            },
            onCloseDlg_QueBuscarLista:function(){
                this.getView().byId("dlg_QueBuscarLista").close();
            },



            goQueImprimir: function(oEvent){
                this.getView().byId("dlg_que_impresion").open();
            },

            onCloseQueImprimir:function(){
                this.getView().byId("dlg_que_impresion").close();
            },


            //Usuario-----------------------------

            goUsuInformacion: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appUsuInformacion");
            },

        });
    });