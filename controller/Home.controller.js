sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "pe/com/seidor/sap/decor/ventas/util/utilString",
    "pe/com/seidor/sap/decor/ventas/services/QuejaServices",
    "sap/ui/model/json/JSONModel"
], function (Controller,  UIComponent, utilString, QuejaServices, JSONModel) {

        "use strict";

        return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Home", {
            onInit: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.attachRoutePatternMatched(this.onRouteMatched, this);

            },

            onRouteMatched: function (oEvent) {

              utilString.prepareDataIni();

                var oData = {
                        modelQueja : {
                            "CodCli": "",
                            "NomCliente": "",
                            "Calles": "",
                            "Ubicacion": "",
                            "Telefono": "",
                            "OfiVenta": "",
                            "TextoQueja": ""
                        }
                 };
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni",window.dataIni);
                this.getView().getModel().refresh(true);   
            },

            //Documentos----------------------
            goDocNuevo: function (oEvent){
               // sap.ui.core.BusyIndicator.show();
               ///////////////////////////////////////////////
               window.IsDocNuevo = true;
               ///////////////////////////////////////////////
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
                ///////////////////////////////////77777
                window.IsDocNuevo = false;
                ////////////////////////////////////////
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appDocNuevo");
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            ///////Erick De la Cruz
            
            onGrabarQueja:function(){
                
                var CodCli = this.getView().getModel().getProperty("/modelQueja/CodCli");
                var NomCliente = this.getView().getModel().getProperty("/modelQueja/NomCliente");
                var Calles = this.getView().getModel().getProperty("/modelQueja/Calles");
                var Ubicacion = this.getView().getModel().getProperty("/modelQueja/Ubicacion");
                var Telefono = this.getView().getModel().getProperty("/modelQueja/Telefono");
                var OfiVenta = this.getView().getModel().getProperty("/modelQueja/OfiVenta");
                var Texto = this.getView().getModel().getProperty("/modelQueja/TextoQueja");

                var result = QuejaServices.grabarQueja(CodCli, NomCliente, Calles, Ubicacion, Telefono, OfiVenta, Texto);

                if (result.data.success)
                {
                    this.getView().getModel().setProperty("/resultQueja", result.data.result);
                    this.getView().getModel().refresh();
                } else
                {
                    //sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                    this.getView().getModel().setProperty("/resultQueja", result.data.result);
                    this.getView().getModel().refresh();
                }
            },

        });
    });