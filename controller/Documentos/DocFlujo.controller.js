sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/flujoDocumentoServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery, flujoDocumentoServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocFlujo", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            if (oEvent.getParameter("name") == "appDocFlujo") {
                this.getView().byId("SplitAppId").setMode("HideMode");
                this.getView().setModel(new JSONModel({}));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_DialogDocFlujo").open();
                this.getView().getModel().setProperty("/NumeroDocumento", window.numeroDocumento);
            }
            var tipoCabecera = [];
            tipoCabecera.push({
                codigo: 1,
                descripcion: 'Flujo'
            });
            tipoCabecera.push({
                codigo: 2,
                descripcion: 'Status'
            });
            this.getView().getModel().setProperty("/tipoCabeceraModel", tipoCabecera);
            this.getView().getModel().refresh();
        },
        
        //Continuar en Dialog Flujo
        onContinuarDlg_DialogDocFlujo: function (oEvent) {
            if (this.getView().byId("txt_numDoc_flujo").getValue() !== "") {
                var pNumPedido = this.getView().byId("txt_numDoc_flujo").getValue();
                var UserId = window.dataIni.user.User;
                var PwdId = window.dataIni.user.Password;
                var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722";
                var GrpVend = window.dataIni.person.GrpVend;
                var Descripcion = window.dataIni.person.Descripcion;
                var CodigoVendedor = window.dataIni.person.PerNr;
                var OrgVentas = window.dataIni.person.OrgVentas;
                var CanalDist = window.dataIni.person.CanalDist;
                var OfVentas = window.dataIni.person.OfVentas;
                var result = flujoDocumentoServices.flujoDocumento(pNumPedido,
                        UserId,
                        PwdId,
                        Id,
                        GrpVend,
                        Descripcion,
                        CodigoVendedor,
                        OrgVentas,
                        CanalDist,
                        OfVentas
                        );
                if (result.c === "s") {
                    if (result.data.success) {
                        this.getView().getModel().setProperty("/retornoFlujo", result.data);
                        console.log(this.getView().getModel().getProperty("/retornoFlujo"));
                        var flujo = this.getView().getModel().getProperty("/retornoFlujo/flujo");
                        this.getView().getModel().setProperty("/flujo0", flujo[0]);
                        this.getView().getModel().setProperty("/flujo1", flujo[1]);
                        console.log(this.getView().getModel().getProperty("/flujo0/TipoDocumento"));
                        this.getView().byId("dlg_DialogDocFlujo").close();
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
            } else {
                MessageToast.show("Falta Ingresar Nro. de Documento");
            }
        },
        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onListaMasterFlujo: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            if (obj.codigo === 1) {
                this.byId("SplitAppId").to(this.createId("pag_flujo_detail1"))
            }
            if (obj.codigo === 2) {
                this.byId("SplitAppId").to(this.createId("pag_status_detail1"))
            }
        }
    });
});
