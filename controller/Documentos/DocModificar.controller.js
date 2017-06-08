sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"pe/com/seidor/sap/decor/ventas/services/clienteServices"

], function(Controller, MessageToast, UIComponent,JSONModel,clienteServices) {
	"use strict";

	return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocModificar", {

		onInit: function() {
			
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.attachRoutePatternMatched(this.onRouteMatched, this);

			this.getView().setModel(new JSONModel({}));
			this.getView().getModel().setProperty("/dataIni",window.dataIni);
            this.getView().getModel().refresh(true);

			

		},
		onRouteMatched: function(oEvent) {

            if (oEvent.getParameter("name") == "appDocModificar") {
					this.getView().byId("dlg_DocModificar").open();
                };
		},

		//Cerrar Dialog Doc Nuevo Inicio
		onCloseDialog: function(oEvent) {
			this.getView().byId("dlg_DocModificar").close()
		},
		
		
		onAfterRendering:function(){
			var self = this;
			console.log(self);
			/*setTimeout(function(){
				self.getView().byId("dlg_DocNuevo").open();
			},1000); */

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

		getSplitContObj: function() {
			var result = this.byId("SplitAppId");
			if (!result) {
				jQuery.sap.log.error("SplitApp object can't be found");
			}
			return result;
		},

		onShowHello: function() {

			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		},

		//Boton Home
		goHome:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
        },
		




        

		

		//Boton Buscar Cliente
		onDocNuevoBuscarCliente:function(){
			this.getView().byId("dlg_DocNuevobuscarCliente").open()
		},
		onDocNuevoCloseBuscarCliente : function () {
				this.getView().byId("dlg_DocNuevobuscarCliente").close()
		},


		
		//Navegacion Master
		onDocNuevoPressMasterBack: function() {
			this.getSplitContObj().backMaster();
		},


		//Buscar Producto
		onDocNuevodlg_buscar: function() {
			this.getView().byId("dlg_DocNuevobuscar").open();
		},
		onDocNuevoClosedlg_buscar: function() {
			this.getView().byId("dlg_DocNuevobuscar").close();
		},


		//Abrir Dialog para Agregar Producto
		onDocNuevodlg_addProducto: function() {
			this.getView().byId("dlg_DocNuevoaddProducto").open();
		},

		onDocNuevoClosedlg_addProducto: function() {
			this.getView().byId("dlg_DocNuevoaddProducto").close();
		},



		//Boton Añadir Producto desde el Dialog
		onDocNuevoMasterProductosAdd: function() {

			this.getSplitContObj().toMaster(this.createId("MasterDocNuevoProductosAgregar"));

			this.getSplitContObj().to(this.createId("pagDocNuevo_producto_agregado1"));

			this.getView().byId("dlg_DocNuevoaddProducto").close();

		},
		

		//Boton Buscar Producto desde el Dialog
		onDocNuevoMasterProductosBuscar: function() {
			this.getSplitContObj().toMaster(this.createId("MasterDocNuevoProductosBuscar"));

			this.getSplitContObj().to(this.createId("pagDocNuevo_productos_buscar1"));

			this.getView().byId("dlg_DocNuevobuscar").close();

		},


		//Editar Lista de Reparto
		/*
		onDocNuevodlg_editListaReparto: function() {
			this.getView().byId("dlg_DocNuevoeditListaReparto").open();
		},

		onDocNuevoClosedlg_editListaReparto: function() {
			this.getView().byId("dlg_DocNuevoeditListaReparto").close();
		},	
		*/


		//Boton Agregar producto desde el Master BuscarProducto
		onDocNuevoAddinBuscar: function() {
			MessageToast.show("Producto Añadido");
		},


		/*
		onDocNuevoSemanticButtonPress: function(evt) {
			MessageToast.show(evt.getSource().getText() + " Pressed");

		},
		*/

		//Boton Master Datos
		onDocNuevoMasterDatos: function(oEvent) {
			this.getSplitContObj().toMaster(this.createId("MasterDocNuevoDatos"));

			var objeto = oEvent.getSource().getBindingContext().getObject();
			console.log(objeto.codigo);

			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitContObj().toDetail(this.createId(sToPageId));

		},


		//Boton Master Producto
		onDocNuevoMasterProductos: function(oEvent) {
			this.getSplitContObj().toMaster(this.createId("MasterDocNuevoProductos"));

			var objeto = oEvent.getSource().getBindingContext().getObject();
			console.log(objeto.codigo);

		},


		//Lista de Master Datos
		onDocNuevoListMasterDatos: function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitContObj().toDetail(this.createId(sToPageId));
		},



		//Lista de Master Productos
		onDocNuevoListMasterProductos: function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitContObj().toDetail(this.createId(sToPageId));
		},

		//Abrir Dialog Buscar Cliente
		onDocNuevoBuscarCliente:function(){
			this.getView().byId("dlg_DocNuevobuscarCliente").open()
		},


		//Cerrar Dialog Seleccionar Cliente
		onDocNuevoCloseSeleccionarCliente : function () {
				this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close()
		},

		

		//Al Seleccionar un Cliente desde la Lista del Dialog
		SeleccionaCliente: function(evt){
			var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();



			var sToPageId = evt.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitContObj().toDetail(this.createId(sToPageId));

			this.getView().getModel().setProperty("/clienteSeleccionado",obj);
						this.getView().getModel().refresh();

						this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
						this.getView().byId("dlg_DocNuevobuscarCliente").close();

						this.getSplitContObj().toMaster(this.createId("MasterDocNuevoProductosBuscarCliente"));
				this.getSplitContObj().to(this.createId("pagDocNuevo_cliente_buscado"));

			console.log(obj.codigo);
		},


		//Al presionar en la Lista de los Clientes Buscados
		onDocNuevoListBuscarCliente : function(){
				var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitContObj().toDetail(this.createId(sToPageId));
		},



		//Al Presionar Boton Buscar Cliente desde el Dialog
		onDocNuevoBuscarClienteAccion: function(){
			var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
			var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();

			if(ruc || nombre){

				var result = clienteServices.buscarCliente(ruc,nombre);

				if(result.c === "s"){

					if(result.data.success){

						this.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
						this.getView().getModel().setProperty("/BusquedaClientes",result.data.lstClientes);
						this.getView().getModel().refresh();

					}else{

						sap.m.MessageToast.show(result.data.errors.reason, {
                duration: 3000
            });

					}


				}else{
					sap.m.MessageToast.show(result.m, {
                duration: 3000
            });
				}

			 console.log(result);
			}else{
				sap.m.MessageToast.show('Ingrese RUC ó Razón social', {
                duration: 1000
            });
				return;
			}

			
		},


		//Al presionar en Buscar Materiales desde el Dialog
		onDocNuevoBuscarMateriales:function(){
			var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
			var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();

			if(ruc || nombre){

				var result = clienteServices.buscarCliente(ruc,nombre);

				if(result.c === "s"){

					if(result.data.success){

						this.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
						this.getView().getModel().setProperty("/BusquedaMateriales",result.data.lstClientes);
						this.getView().getModel().refresh();

					}else{

						sap.m.MessageToast.show(result.data.errors.reason, {
                duration: 3000
            });

					}


				}else{
					sap.m.MessageToast.show(result.m, {
                duration: 3000
            });
				}

			 console.log(result);
			}else{
				sap.m.MessageToast.show('Ingrese RUC ó Razón social', {
                duration: 1000
            });
				return;
			}

			
		},


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
		




	});

});



