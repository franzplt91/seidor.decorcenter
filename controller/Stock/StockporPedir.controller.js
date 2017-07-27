sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/stockServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, stockServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Stock.StockporPedir", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent)
        {
            var date = new Date();
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = date.getDate().toString();
            var fechaActual = yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
            if (oEvent.getParameter("name") == "appStockporPedir")
            {
                this.getView().setModel(new JSONModel({}));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().setProperty("/codMaterial", window.codMaterial);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_stockPorPedir").open();
                this.getView().byId("date_fechaInicio_stockPorPedir").setValue(fechaActual);
                this.getView().byId("date_fechaFin_stockPorPedir").setValue(fechaActual);
            };
        },
        onAfterRendering: function ()
        {
        },
        //Boton Home
        goHome: function ()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        //Cerrar Dialog Doc Nuevo Inicio
        onContinuarStockPorPedir: function (oEvent)
        {
            var CodJer = this.getView().byId("com_codJerarqui_stockPorPedir").getSelectedKey();
            if (CodJer == " ")
            {
                CodJer = "";
            }
            var CodMat = this.getView().byId("txt_codMaterial_stockPorPedir").getValue();
            var FecIni = this.getView().byId("date_fechaInicio_stockPorPedir").getValue();
            var FecFin = this.getView().byId("date_fechaFin_stockPorPedir").getValue();
            var OfVentas = window.dataIni.person.OfVentas;
            var result = stockServices.stockporPedir(CodJer, CodMat, FecIni, FecFin, OfVentas);
            if (result.c === "s")
            {
                if (result.data.success)
                {
                    this.getView().getModel().setProperty("/retornoStockPorPedir", result.data);
                    this.getView().byId("dlg_stockPorPedir").close();
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
            console.log(result.data);
        },
        onCancelarStockPorPedir:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
    });
});
