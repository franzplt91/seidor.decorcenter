sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"pe/com/seidor/sap/decor/ventas/services/reclamoServices"
], function (Controller, MessageToast, UIComponent, JSONModel, reclamoServices) {
	"use strict";

	return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Reclamos.RecBuscar", {

		onInit: function() {
			
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.attachRoutePatternMatched(this.onRouteMatched, this);			
//hgjhghj
		},
		onRouteMatched: function(oEvent) {

            if (oEvent.getParameter("name") == "appRecBuscar") {
	            	this.getView().byId("SplitAppId").setMode("HideMode");
	            	this.getView().setModel(new JSONModel({}));
					this.getView().getModel().setProperty("/dataIni",window.dataIni);
		            this.getView().getModel().refresh(true);
					this.getView().byId("dlg_rec_nuevo_inicio").open();
					this.getView().byId("txt_cantRecla1").setEnabled(false);
					this.getView().byId("txt_cantRecla2").setEnabled(false);
					this.getView().byId("txt_Numero_Pedido").setEnabled(false);
					this.getView().byId("txt_Codigo_Cliente").setEnabled(false);
					this.getView().byId("txt_cliente_eventual").setEnabled(false);
					this.getView().byId("txt_Asesor").setEnabled(false);
					this.getView().byId("txt_funcion").setEnabled(false);
					this.getView().byId("txt_codigo").setEnabled(false);
					this.getView().byId("txt_nombre").setEnabled(false);
					this.getView().byId("txt_direccion").setEnabled(false);
					this.getView().byId("txt_telefono").setEnabled(false);
					this.getView().byId("txt_nif").setEnabled(false);
					this.getView().byId("txt_correo").setEnabled(false);

					//this.getView().byId("txt_numeroPedido").setValue("fgfjhgh");
                };

                var tipoCabecera = [];
                tipoCabecera.push({
                    codigo:1,
                    descripcion:'Reclamo Nuevo'
                });

                tipoCabecera.push({
                    codigo:2,
                    descripcion:'Interlocutores'
                });

                tipoCabecera.push({
                    codigo:3,
                    descripcion:'Datos Reclamo'
                });

                tipoCabecera.push({
                    codigo:4,
                    descripcion:'Cambiar Status'
                });

                this.getView().getModel().setProperty("/tipoCabeceraModel",tipoCabecera);
                this.getView().getModel().setProperty("/nombre","Buscar Reclamo");
                this.getView().getModel().refresh();
		},

		goHome:function(){
		            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		                oRouter.navTo("appHome");
		},

		hideBusyIndicator : function() {
			sap.ui.core.BusyIndicator.hide();
		},
		showBusyIndicator : function (iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);
 
			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}
 
				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function() {
					this.hideBusyIndicator();
				});
			}
		},


		onOpendlg_Buscar_reclamos:function(){
			this.getView().byId("dlg_rec_nuevo_inicio").open();
			this.getView().byId("dlg_list_reclamos").close();	
		},


		onOpendlg_list_reclamos:function(){
			this.getView().byId("dlg_rec_nuevo_inicio").close();
			this.getView().byId("dlg_list_reclamos").open();
		},

		onBuscardlg_list_reclamos:function(){
			this.getView().byId("dlg_rec_nuevo_inicio").close();
			this.getView().byId("dlg_list_reclamos").open();
		},


		onClosedlg_list_reclamos:function(){
			this.getView().byId("dlg_list_reclamos").close();
		},

		onVerdlg_list_reclamos:function(){
			this.getView().byId("dlg_list_reclamos").close();
		},

		onCloseDlgRecNuevo: function(oEvent){
                this.getView().byId("dlg_rec_nuevo_inicio").close();
            },

		onOpenDlgBuscarRecNuevo:function(){
			this.getView().byId("dlg_buscar_rec_nuevo").open();
		},  


		onCloseDlgBuscarRecNuevo:function(){

			this.getView().byId("dlg_buscar_rec_nuevo").close();
		},    


		onBuscarRecNuvoInterlocutores:function(){
			this.byId("SplitAppId").toMaster(this.createId("MasterRecNuevoInter"));
			this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_interlocutores"));
			this.getView().byId("dlg_buscar_rec_nuevo").close();
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
		

		onOpenDialog : function () {
			this.getOwnerComponent().openHelloDialog();
		},


		ondlg_buscar: function(){
			this.getView().byId("dlg_buscar").open();
		},
		
		onClosedlg_buscar: function(){
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

		onListMasterDatos : function(oEvent) {
			var obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();

            if(obj.codigo===1){
                    this.byId("SplitAppId").to(this.createId("pag_rec_nuevo_reclamo"));
                }

                if(obj.codigo===2){
                    this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_interlocutores"));
                }

                if(obj.codigo===3){
                    this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_datos_reclamo"));
                }

                if(obj.codigo===4){
                    this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_cambiar_status"));
                }
		},

		onBuscardlg_list_reclamos:function(){
			//this.getView().byId("dlg_rec_nuevo_inicio").close();
			//this.getView().byId("dlg_list_reclamos").open();BusquedaReclamos
			var num_rec = this.getView().byId("txt_pNumeroReclamo").getValue();
			var fecha_ini = this.getView().byId("txt_pFechaCreacionI").getValue();
			var fecha_fin = this.getView().byId("txt_pFechaCreacionF").getValue();
			if (num_rec || fecha_ini || fecha_fin) {
				var result = reclamoServices.buscarReclamos(num_rec,"","","","",fecha_ini,fecha_fin,"","");
				if(result.c === "s"){

					if(result.data.success){

						this.getView().getModel().setProperty("/ListaReclamos",result.data.listaReclamos);
						this.getView().getModel().refresh();
						this.getView().byId("dlg_rec_nuevo_inicio").close();
						this.getView().byId("dlg_list_reclamos").open();
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
				sap.m.MessageToast.show('Ingrese los campos correspondientes', {
                duration: 1000
            });
				return;

			}
		},

		

		//Al Seleccionar un Cliente desde la Lista del Dialog
		SeleccionaReclamo: function(evt){
			var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();


			this.showBusyIndicator(4000, 0);

			this.getView().getModel().setProperty("/clienteSeleccionado",obj);
						this.getView().getModel().refresh();

						this.getView().byId("dlg_rec_nuevo_inicio").close();

						this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductosBuscarCliente"));
						this.byId("SplitAppId").to(this.createId("pagDocNuevo_cliente_buscado"));


			if (obj.VBELN) {
				var result = reclamoServices.verReclamos(obj.VBELN);

					if(result.c === "s"){

					if(result.data.success){

						this.getView().getModel().setProperty("/seleccionado",result.data);
						//this.getView().getModel().setProperty("/Reclamos",result.data.reclamo);

						var resultData = this.getView().getModel().getProperty("/seleccionado");
						var rec = [];
								rec = resultData.reclamo[0];
								this.getView().getModel().setProperty("/listReclamo",rec);
								this.getView().getModel().refresh();
								
								//Llamar campos
								var Numpedido =  this.getView().getModel().getProperty("/listReclamo/numeroPedido");
								var EmpresaDet = this.getView().getModel().getProperty("/listReclamo/EmpresaDet");
								var NOMBRE = this.getView().getModel().getProperty("/seleccionado/objReclamo/Interlocutor/0/NOMBRE");
								var Asesor = this.getView().getModel().getProperty("/listReclamo/NomResPago"); 

								//Llenar campos
								this.getView().byId("txt_Numero_Pedido").setValue(Numpedido);
								this.getView().byId("txt_Codigo_Cliente").setValue(EmpresaDet);
								this.getView().byId("txt_cliente_eventual").setValue(NOMBRE);
								this.getView().byId("txt_Asesor").setValue(Asesor);

								//Llamar campos interlocutores
								var Funcion_interlocutor = this.getView().getModel().getProperty("/seleccionado/objReclamo/Interlocutor/0/PARVW");
								var Codigo_interlocutor = this.getView().getModel().getProperty("/seleccionado/objReclamo/Interlocutor/0/KUNNR");
								var NOMBRE_interlocutor = this.getView().getModel().getProperty("/seleccionado/objReclamo/Interlocutor/0/NOMBRE");
								var direccion_iterlocutor = this.getView().getModel().getProperty("/seleccionado/objReclamo/Interlocutor/0/Direccion");
								var telefono_interlocutor = this.getView().getModel().getProperty("/seleccionado/objReclamo/Interlocutor/0/Telefono");	
								var nif = this.getView().getModel().getProperty("/seleccionado/objReclamo/Interlocutor/0/NIF");
								var correo_interlocutor = this.getView().getModel().getProperty("/seleccionado/reclamo/0/mail");

								var codigo_asesor = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/3/Persona/CodPersona");
							 	var Descripcion_asesor = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/3/Persona/Descripcion");
							 	var Funcion_Enmpresa_Comercial = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/3/Funcion");
								var fecha_realizacion = this.getView().getModel().getProperty("/Pedido/FechaValidez");
								
								//Llenar campos interlocutores
								this.getView().byId("txt_funcion").setValue(Funcion_interlocutor);
								this.getView().byId("txt_codigo").setValue(Codigo_interlocutor);
								this.getView().byId("txt_nombre").setValue(NOMBRE_interlocutor);
								this.getView().byId("txt_direccion").setValue(direccion_iterlocutor);
								this.getView().byId("txt_telefono").setValue(telefono_interlocutor);
								this.getView().byId("txt_nif").setValue(nif);
								this.getView().byId("txt_correo").setValue(correo_interlocutor);

							

							this.getView().byId("txt_codigo_asesor").setValue(codigo_asesor);
							this.getView().byId("txt_nombre_codigo_asesor").setValue(Descripcion_asesor);

							this.getView().byId("txt_funcion_comercial").setValue(Funcion_Enmpresa_Comercial);
							this.getView().byId("txt_codigo_empresa_comercial").setValue(codigo_asesor);
							this.getView().byId("txt_nombre_empresa_comercial").setValue(Descripcion_asesor);

							this.getView().byId("txt_fecha_realizacion").setValue(fecha_realizacion);
							

						this.getView().byId("dlg_list_reclamos").close();
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

			 //console.log(result);
			}else{
				sap.m.MessageToast.show('Ingrese los campos correspondientes', {
                duration: 1000
            });
				return;
			}
	

			console.log(result);
			
		}




            
	});

});
