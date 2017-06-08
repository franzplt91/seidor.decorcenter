sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent"
], function (Controller, MessageToast, UIComponent) {
	"use strict";

	return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Usuario.UsuInformacion", {

		onInit: function () {
            },



		onAfterRendering: function() {

			var oSplitCont= this.getSplitContObj(),
				ref = oSplitCont.getDomRef() && oSplitCont.getDomRef().parentNode;
			// set all parent elements to 100% height, this should be done by app developer, but just in case
			if (ref && !ref._sapui5_heightFixed) {
				ref._sapui5_heightFixed = true;
				while (ref && ref !== document.documentElement) {
					var $ref = jQuery(ref);
					if ($ref.attr("data-sap-ui-root-content")) { // Shell as parent does this already
						break;
					}
					if (!ref.style.height) {
						ref.style.height = "100%";
					}
					ref = ref.parentNode;
				}
			}
		},
		onImprimir:function(){
			MessageToast.show("Imprimiendo...");
		},

		goHome:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
        },


		onCloseDialog: function(oEvent){
                this.getView().byId("dlg_filtros").close()
            },

		getSplitContObj : function() {
			var result = this.byId("SplitAppId");
			if (!result) {
				jQuery.sap.log.error("SplitApp object can't be found");
			}
			return result;
		},

		onShowHello : function () {

			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		},


		onPressMasterBack : function() {
			this.getSplitContObj().backMaster();
		},
		

		onOpenDialog : function () {
			this.getOwnerComponent().openHelloDialog();
		},


		ondlg_buscar: function(){
			this.getView().byId("dlg_buscar").open();
		},

		ondlg_addProducto:function(){
		},

		onClosedlg_addProducto:function(){
			this.getView().byId("dlg_addProducto").close();
		},

		onMasterProductosAdd:function(){

			this.getSplitContObj().toMaster(this.createId("MasterProductosAgregar"));

			this.getSplitContObj().to(this.createId("pag_producto_agregado1"));


			this.getView().byId("dlg_addProducto").close();
			
		},
		

		onClosedlg_buscar: function(){
			this.getView().byId("dlg_buscar").close();
		},

		onMasterProductosBuscar:function(){
			this.getSplitContObj().toMaster(this.createId("MasterProductosBuscar"));

			this.getSplitContObj().to(this.createId("pag_productos_buscar1"));


			this.getView().byId("dlg_buscar").close();

		},


		ondlg_editListaReparto:function(){
			this.getView().byId("dlg_editListaReparto").open();
		},

		onClosedlg_editListaReparto:function(){
			this.getView().byId("dlg_editListaReparto").close();
		},

		onAddinBuscar:function(){
			MessageToast.show("Producto Añadido");
		},

		onSemanticButtonPress: function (evt) {
			MessageToast.show(evt.getSource().getText() + " Pressed");


		},


		onMasterDatos: function(oEvent){
                this.getSplitContObj().toMaster(this.createId("MasterDatos"));

                var objeto = oEvent.getSource().getBindingContext().getObject();
                console.log(objeto.codigo);

                
        },
        onMasterProductos: function(oEvent){
                this.getSplitContObj().toMaster(this.createId("MasterProductos"));

                var objeto = oEvent.getSource().getBindingContext().getObject();
                console.log(objeto.codigo);

                
            },

		onListMasterDatos : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
 
			this.getSplitContObj().toDetail(this.createId(sToPageId));
		},

		onListMasterProductos : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
 
			this.getSplitContObj().toDetail(this.createId(sToPageId));
		}



            
	});

});
