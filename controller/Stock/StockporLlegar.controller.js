sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/stockServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, stockServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Stock.StockporLlegar", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            var date = new Date();
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = date.getDate().toString();
            var fechaActual = yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
            if (oEvent.getParameter("name") == "appStockporLlegar") {
                this.getView().setModel(new JSONModel({}));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().setProperty("/codMaterial", window.codMaterial);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_stockPorLlegar").open();
                this.getView().byId("date_fec_inicio_stockPorLlegar").setValue(fechaActual);
                this.getView().byId("date_fec_fin_stockPorLlegar").setValue(fechaActual);
            }
            ;
        },
        //Cerrar Dialog Doc Nuevo Inicio
        onCloseDialog: function (oEvent) {
            this.getView().byId("dlg_stockPorLlegar").close()
        },
        onAfterRendering: function () {
        },
        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onContinuarStockPorLlegar: function () {
            var matnr = this.getView().byId("txt_cod_material_stockPorLlegar").getValue();
            var lfdat_inicio = this.getView().byId("date_fec_inicio_stockPorLlegar").getValue();
            var lfdat_fin = this.getView().byId("date_fec_fin_stockPorLlegar").getValue();
            var OfVentas = window.dataIni.person.OfVentas;
            var result = stockServices.stockporLlegar(matnr, lfdat_inicio, lfdat_fin, OfVentas);
            if (result.c === "s") {
                if (result.data.success) {
                    this.getView().getModel().setProperty("/retornoStockPorLlegar", result.data);
                    this.getView().byId("dlg_stockPorLlegar").close();
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
        onCancelarStockPorLlegar:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        //Boton Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").open()
        },
        onDocNuevoCloseBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").close()
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
        onDocNuevoAddinBuscar: function () {
            MessageToast.show("Producto Añadido");
        },
    });
});
