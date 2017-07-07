sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"pe/com/seidor/sap/decor/ventas/services/clienteServices",
	"pe/com/seidor/sap/decor/ventas/services/materialServices"
], function (Controller, MessageToast, UIComponent,JSONModel,clienteServices,materialServices) {
	"use strict";

	return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Stock.StockDisponible", {

		onInit: function() {
			
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.attachRoutePatternMatched(this.onRouteMatched, this);

			

			

		},
		onRouteMatched: function(oEvent) {

            if (oEvent.getParameter("name") == "appStockDisponible") {
            	this.getView().setModel(new JSONModel({}));
			this.getView().getModel().setProperty("/dataIni",window.dataIni);
            this.getView().getModel().refresh(true);
					this.getView().byId("dlg_buscar").open();
                };
		},
		

		//Cerrar Dialog Doc Nuevo Inicio
		onCloseDialog: function(oEvent) {
			this.getView().byId("dlg_DocNuevo").close()
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

			this.getView().getModel().setProperty("/clienteSeleccionado1",obj);
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
						this.getView().getModel().setProperty("/BusquedaClientes1",result.data.lstClientes);
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

		onDocNuevoCloseSeleccionarMaterial:function(){
			this.getView().byId("dlg_DocNuevobuscarMaterial_resultado").close();
		},

		onDocNuevoBuscarMateriales:function(){
			var codigo = this.getView().byId("txt_codigo_material_busqueda").getValue();
			var codigoAntiguo = this.getView().byId("txt_codigoAntiguo_material_busqueda").getValue();
			var descripcionMaterial = this.getView().byId("txt_descripcionMaterial_material_busqueda").getValue();
			var categoria = this.getView().byId("comboCategoria").getSelectedKey();
			var linea = this.getView().byId("comboLinea").getSelectedKey();
			var marca = this.getView().byId("comboMarca").getSelectedKey();

			var orgVentas = window.dataIni.person.OrgVentas;
			var canalDist = window.dataIni.person.CanalDist;
			var ofVentas = window.dataIni.person.OfVentas;
			

						var result = materialServices.buscarmaterial(codigo,codigoAntiguo,descripcionMaterial,categoria,linea,marca,orgVentas,canalDist,ofVentas);

						if(result.c === "s"){

									if(result.data.success){
										this.getView().byId("dlg_DocNuevobuscarMaterial_resultado").open();
										this.getView().getModel().setProperty("/BusquedaMateriales",result.data.materiales);
										this.getView().getModel().refresh();

										console.log(result);
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
		
		



























		//Seleccionar Categoria
		onSeleccionarCategoria: function(){
			 var categoria = this.getView().byId("comboCategoria").getSelectedKey();
			var linea = window.dataIni.lstLinea;
			var itemLleno=[];

			for (var i = 0; i < linea.length; i++) {
				var item = linea[i];
				var itemcod=item.Codigo;


				if(itemcod.substring(0,2) == categoria){
					
					itemLleno.push(item);
					
					
				}
			};
			this.getView().getModel().setProperty("/listaLinea",itemLleno);			
			this.getView().getModel().refresh();
			console.log(itemLleno.Codigo);
			
		},



		onSeleccionarLinea:function(){
			var linea = this.getView().byId("comboLinea").getSelectedKey();
			var marca = window.dataIni.lstMarca;
			var itemLleno=[];

			for (var i = 0; i < marca.length; i++) {
				var item = marca[i];
				var itemcod=item.Codigo;


				if(itemcod.substring(0,5) == linea){
					
					itemLleno.push(item);
					console.log(item);
					
				}

				
				
			  		

			  		

			};
			this.getView().getModel().setProperty("/listaMarca",itemLleno);
			this.getView().getModel().refresh();
		},
		





















		onMasterProductosBuscar:function(){
			

		},


		onMasterProductosAdd:function(){

			this.getSplitContObj().toMaster(this.createId("MasterProductosAgregar"));

			this.getSplitContObj().to(this.createId("pag_producto_agregado1"));


			this.getView().byId("dlg_addProducto").close();
			
		},

            
	});

});
