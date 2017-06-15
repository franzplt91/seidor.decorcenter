sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global'
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery) {
    "use strict";


	return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocFlujo", {

		onInit: function () {
			var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);

            this.getView().setModel(new JSONModel({}));
            this.getView().getModel().setProperty("/dataIni", window.dataIni);
            this.getView().getModel().refresh(true);
                
            },

            onRouteMatched: function(oEvent) {
                if (oEvent.getParameter("name") == "appDocFlujo") {
                    this.getView().byId("dlg_DialogDocFlujo").open();
                };
                 

                var tipoCabecera = [];
                tipoCabecera.push({
                    codigo:1,
                    descripcion:'Flujo'
                });

                tipoCabecera.push({
                    codigo:2,
                    descripcion:'Status'
                });

                this.getView().getModel().setProperty("/tipoCabeceraModel",tipoCabecera);
                this.getView().getModel().refresh();
                
		},

		//Continuar en Dialog Flujo
		onContinuarDlg_DialogDocFlujo: function(oEvent) {
			this.getView().byId("dlg_DialogDocFlujo").close()
		},

        
		
		
		//Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },

        onListaMasterFlujo:function(evt){
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();

            if(obj.codigo===1){
                    this.byId("SplitAppId").to(this.createId("pag_flujo_detail1"))
                }

                if(obj.codigo===2){
                    this.byId("SplitAppId").to(this.createId("pag_status_detail1"))
                }
        }

      });

});
