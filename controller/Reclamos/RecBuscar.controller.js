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

		},
		onRouteMatched: function(oEvent) {
			
			var oData =		{
					 	"reclamo": {

					 		"Contactos": {
					 			"AEDAT": "0001-01-01T00:00:00",
					 			"AENAM": "",
					 			"AEZET": "",
					 			"Canal": null,
					 			"CodpPContac": null,
					 			"DIRECTION": "",
					 			"DirPContac": null,
					 			"ERDAT": "2017-07-07T00:00:00",
					 			"ERNAM": "Julio Edgard",
					 			"ERZET": "10:16:01",
					 			"GBSTK": "A",
					 			"JustificResul": null,
					 			"KTAAR": "R001",
					 			"KTABG": "2017-07-07T00:00:00",
					 			"KTABT": "10:03:17",
					 			"KTAEB": "001",
					 			"KTAEN": "2017-07-07T00:00:00",
					 			"KTAER": "005",
					 			"KTAET": "10:03:17",
					 			"KTAFK": "R001",
					 			"KTAGR": "002",
					 			"KTARA": null,
					 			"KTAST": "0",
					 			"KTEXT": "Factura/boleta",
					 			"KTEXT_MC": "238187/0011000898",
					 			"KTEXT_MC_LANGU": "E",
					 			"KUNNR": "0000101317",
					 			"Motivo": null,
					 			"NIFCont": null,
					 			"NomPContac": null,
					 			"NomResPago": null,
					 			"OfiVenta": null,
					 			"OrgVenta": null,
					 			"PARVW": "AG",
					 			"PersonaContacto": null,
					 			"Resultado": null,
					 			"SPART": "08",
					 			"SPART1": "08",
					 			"Sector2": null,
					 			"TRVOG ": "9",
					 			"TelfCont": null,
					 			"VBELN": "0100004420",
					 			"VBTYP": "1",
					 			"VGBEL": "0000238187",
					 			"VKBUR": "1060",
					 			"VKGRP": "",
					 			"VKORG": "1000",
					 			"VTWEG": "20",
					 			"comentario": null,
					 			"empresa": null,
					 			"fechaF": null,
					 			"fechaI": null,
					 			"horaReclamoF": null,
					 			"horaReclamoI": null,
					 			"material2": null,
					 			"numeroPedido": null
					 		},
					 		"DocComercial": {
					 			"GBSTK": "A",
					 			"UVALL": "C",
					 			"VBELN": "0100004420",
					 			"VBOBJ": "K",
					 			"VBTYP": "1"
					 		},
					 		"Interlocutor": [{
					 				"ADRNR": "9001046409",
					 				"Calle": "PRUEBA",
					 				"Cargo": null,
					 				"Ciudad": "LIMA 03",
					 				"CodPostal": "LIMA 03",
					 				"Direccion": "PRUEBA",
					 				"EsVentual": true,
					 				"Fehgr": null,
					 				"KUNNR": "0000101317",
					 				"Land1": null,
					 				"Mail": "",
					 				"NIF": "",
					 				"NOMBRE": "Cliente Eventual La Molina",
					 				"Name1": null,
					 				"Nrart": null,
					 				"PARNR": null,
					 				"2PARVW": "AG",
					 				"PERNR": null,
					 				"POSNR": "000000",
					 				"Telefono": "",
					 				"Telfx": null,
					 				"VBELN": null
					 			},
					 			{
					 				"ADRNR": "",
					 				"Calle": "",
					 				"Cargo": null,
					 				"Ciudad": "",
					 				"CodPostal": "",
					 				"Direccion": "",
					 				"EsVentual": false,
					 				"Fehgr": null,
					 				"KUNNR": null,
					 				"Land1": null,
					 				"Mail": "",
					 				"NIF": null,
					 				"NOMBRE": "Pingo Moreno Julio Edgardo",
					 				"Name1": null,
					 				"Nrart": null,
					 				"PARNR": null,
					 				"PARVW": "ZM",
					 				"PERNR": "00001802",
					 				"POSNR": "000000",
					 				"Telefono": "",
					 				"Telfx": null,
					 				"VBELN": null
					 			}
					 		],
					 		"listaReclamo": [{
					 				"CodTexto": "0001",
					 				"Descripcion": "",
					 				"Langu": "S",
					 				"TextoDatosFacturacion": null,
					 				"TextoDiagnostico": null,
					 				"TextoMotivosOtros": null,
					 				"TextoNotaDireccion": null,
					 				"TextoPedidoReferencia": null,
					 				"TextoPersonaContacto": null,
					 				"TextoSeguimiento": null,
					 				"TextoSolucion": null,
					 				"TextoTratemInicial": null,
					 				"textoAtencion": null,
					 				"textoContacto": null,
					 				"textoDatosAdicionalesCliente": null,
					 				"textoDescripcionServInstalacion": null,
					 				"textoDescripcionVisita": null,
					 				"textoObsAdministrativas": null,
					 				"textoRefDireccion": null,
					 				"textoRefFactura": null,
					 				"textoResultadoVisita": null,
					 				"textoTelefonos": null
					 			},
					 			{
					 				"CodTexto": "0004",
					 				"Descripcion": "",
					 				"Langu": "S",
					 				"TextoDatosFacturacion": null,
					 				"TextoDiagnostico": null,
					 				"TextoMotivosOtros": null,
					 				"TextoNotaDireccion": null,
					 				"TextoPedidoReferencia": null,
					 				"TextoPersonaContacto": null,
					 				"TextoSeguimiento": null,
					 				"TextoSolucion": null,
					 				"TextoTratemInicial": null,
					 				"textoAtencion": null,
					 				"textoContacto": null,
					 				"textoDatosAdicionalesCliente": null,
					 				"textoDescripcionServInstalacion": null,
					 				"textoDescripcionVisita": null,
					 				"textoObsAdministrativas": null,
					 				"textoRefDireccion": null,
					 				"textoRefFactura": null,
					 				"textoResultadoVisita": null,
					 				"textoTelefonos": null
					 			},
					 			{
					 				"CodTexto": "Z006",
					 				"Descripcion": "",
					 				"Langu": "S",
					 				"TextoDatosFacturacion": null,
					 				"TextoDiagnostico": null,
					 				"TextoMotivosOtros": null,
					 				"TextoNotaDireccion": null,
					 				"TextoPedidoReferencia": null,
					 				"TextoPersonaContacto": null,
					 				"TextoSeguimiento": null,
					 				"TextoSolucion": null,
					 				"TextoTratemInicial": null,
					 				"textoAtencion": null,
					 				"textoContacto": null,
					 				"textoDatosAdicionalesCliente": null,
					 				"textoDescripcionServInstalacion": null,
					 				"textoDescripcionVisita": null,
					 				"textoObsAdministrativas": null,
					 				"textoRefDireccion": null,
					 				"textoRefFactura": null,
					 				"textoResultadoVisita2": null,
					 				"textoTelefonos": null
					 			},
					 			{
					 				"CodTexto": "Z007",
					 				"Descripcion": "",
					 				"Langu": "S",
					 				"TextoDatosFacturacion": null,
					 				"TextoDiagnostico": null,
					 				"TextoMotivosOtros": null,
					 				"TextoNotaDireccion": null,
					 				"TextoPedidoReferencia": null,
					 				"TextoPersonaContacto": null,
					 				"TextoSeguimiento": null,
					 				"TextoSolucion": null,
					 				"TextoTratemInicial": null,
					 				"textoAtencion": null,
					 				"textoContacto": null,
					 				"textoDatosAdicionalesCliente": null,
					 				"textoDescripcionServInstalacion": null,
					 				"textoDescripcionVisita": null,
					 				"textoObsAdministrativas": null,
					 				"textoRefDireccion": null,
					 				"textoRefFactura": null,
					 				"textoResultadoVisita": null,
					 				"textoTelefonos": null
					 			},
					 			{
					 				"CodTexto": "Z008",
					 				"Descripcion": "",
					 				"Langu": "S",
					 				"TextoDatosFacturacion": null,
					 				"TextoDiagnostico": null,
					 				"TextoMotivosOtros": null,
					 				"TextoNotaDireccion": null,
					 				"TextoPedidoReferencia": null,
					 				"TextoPersonaContacto": null,
					 				"TextoSeguimiento": null,
					 				"TextoSolucion": null,
					 				"TextoTratemInicial": null,
					 				"textoAtencion": null,
					 				"textoContacto": null,
					 				"textoDatosAdicionalesCliente": null,
					 				"textoDescripcionServInstalacion": null,
					 				"textoDescripcionVisita": null,
					 				"textoObsAdministrativas": null,
					 				"textoRefDireccion": null,
					 				"textoRefFactura": null,
					 				"textoResultadoVisita": null,
					 				"textoTelefonos2": null
					 			},
					 			{
					 				"CodTexto": "Z009",
					 				"Descripcion": "",
					 				"Langu": "S",
					 				"TextoDatosFacturacion": null,
					 				"TextoDiagnostico": null,
					 				"TextoMotivosOtros": null,
					 				"TextoNotaDireccion": null,
					 				"TextoPedidoReferencia": null,
					 				"TextoPersonaContacto": null,
					 				"TextoSeguimiento": null,
					 				"TextoSolucion": null,
					 				"TextoTratemInicial": null,
					 				"textoAtencion": null,
					 				"textoContacto": null,
					 				"textoDatosAdicionalesCliente": null,
					 				"textoDescripcionServInstalacion": null,
					 				"textoDescripcionVisita": null,
					 				"textoObsAdministrativas": null,
					 				"textoRefDireccion": null,
					 				"textoRefFactura": null,
					 				"textoResultadoVisita": null,
					 				"textoTelefonos": null
					 			},
					 			{
					 				"CodTexto": "Z012",
					 				"Descripcion": "",
					 				"Langu": "S",
					 				"TextoDatosFacturacion": null,
					 				"TextoDiagnostico": null,
					 				"TextoMotivosOtros": null,
					 				"TextoNotaDireccion": null,
					 				"TextoPedidoReferencia": null,
					 				"TextoPersonaContacto": null,
					 				"TextoSeguimiento": null,
					 				"TextoSolucion": null,
					 				"TextoTratemInicial": null,
					 				"textoAtencion": null,
					 				"textoContacto": null,
					 				"textoDatosAdicionalesCliente": null,
					 				"textoDescripcionServInstalacion": null,
					 				"textoDescripcionVisita": null,
					 				"textoObsAdministrativas": null,
					 				"textoRefDireccion": null,
					 				"textoRefFactura": null,
					 				"textoResultadoVisita": null,
					 				"textoTelefonos": null
					 			}
					 		],
					 		"Z_Reclamo": {
					 			"CANTRECLA1": "",
					 			"CANTRECLA2": "",
					 			"CMM1": "",
					 			"CMM2": "",
					 			"CMM3": "",
					 			"CMM4": "",
					 			"CPOSTAL": "LIMA 04",
					 			"DIRECCION": "direccion",
					 			"DIRVKBUR": "Av. La Molina 473 Ate - Lima",
					 			"Descripcion": null,
					 			"FCHA1": "2017-07-07T00:00:00",
					 			"FCHA2": "2017-07-07T00:00:00",
					 			"FCHA3": "2017-07-07T00:00:00",
					 			"FCHA4": "2017-07-07T00:00:00",
					 			"MATNR": "000000000011000004",
					 			"MATNR2": "000000000011000898",
					 			"MATUM1": "UN",
					 			"MATUM2": "M2",
					 			"MONTORECLA1": "357.00",
					 			"MONTORECLA2": "",
					 			"NIF": "",
					 			"NMATNR": null,
					 			"NMATNR2": null,
					 			"PARVW": null,
					 			"PCONTACTO": "nombre",
					 			"RECLA": "Reclamo Referencia",
					 			"STAT1": "",
					 			"STAT2": "",
					 			"STAT3": "",
					 			"STAT4": "",
					 			"Status": null,
					 			"TELEFONO": "telefono",
					 			"USER1": "",
					 			"USER2": "",
					 			"USER3": "",
					 			"USER4": "",
					 			"UsuarioStatus": null,
					 			"VBELN": "0100004420",
					 			"VKBUR": "1060",
					 			"fechaSts": null,
					 			"material11": null,
					 			"material12": null,
					 			"material21": null,
					 			"material22": null,
					 			"numeroPedido": null,
					 			"pNumeroReclamo": null,
					 			"reclamoRef": null
					 		},
					 		"Z_ReclamoVisita": []
					 	},
					 	"reclamo1": [{
					 		"Canal": "20",
					 		"CodDestMerc": "{36}",
					 		"CodECom": "{40}",
					 		"CodResPago": "00001802",
					 		"CodpDestMerc": "{39}",
					 		"CodpEmpresa": "LIMA 03",
					 		"CodpPContac": "LIMA 04",
					 		"Descripcion": "{56}",
					 		"DirDestMerc": "{38}",
					 		"DirEmpresa": "PRUEBA",
					 		"DirPContac": "direccion",
					 		"EmpresaDet": "0000101317",
					 		"JustificResul": "001",
					 		"Motivo": "002",
					 		"NIFCont": "",
					 		"NomCliente": "",
					 		"NomDestMerc": "{37}",
					 		"NomECom": "{41}",
					 		"NomEmpresa": "",
					 		"NomPContac": "nombre",
					 		"NomResPago": "Pingo Moreno Julio Edgardo",
					 		"OfiVenta": "1060",
					 		"OrgVenta": "1000",
					 		"PersonaContacto": "nombre",
					 		"Resultado": "005",
					 		"Sector": "08",
					 		"Status": "0",
					 		"TelfCont": "telefono",
					 		"TelfEmpre": "",
					 		"TextoDatosFacturacion": "",
					 		"TextoDiagnostico": "",
					 		"TextoMotivosOtros": "",
					 		"TextoNotaDireccion": "",
					 		"TextoPedidoReferencia": "",
					 		"TextoPersonaContacto": "",
					 		"TextoSeguimiento": "",
					 		"TextoSolucion": "",
					 		"TextoTratemInicial": "",
					 		"UsuarioStatus": "{55}",
					 		"codigoEmpResp": "00001802",
					 		"comentario": "Factura/boleta",
					 		"empresa": "0000101317",
					 		"fechaF": "07/07/2017",
					 		"fechaI": "07/07/2017",
					 		"fechaSts": "{57}",
					 		"horaReclamoF": "10:03:17",
					 		"horaReclamoI": "10:03:17",
					 		"lstJusti": [{
					 				"Codigo": "",
					 				"Descripcion": "",
					 				"TranspZone": null,
					 				"conReferencia": false
					 			},
					 			{
					 				"Codigo": "005",
					 				"Descripcion": "005::Fuerte competencia",
					 				"TranspZone": null,
					 				"conReferencia": false
					 			}
					 		],
					 		"mail": "correo@hotmail.com",
					 		"material1": "11000004",
					 		"material2": "11000898",
					 		"nombreEmpResp": "Pingo Moreno Julio Edgardo",
					 		"numeroPedido": "0000238187",
					 		"pNumeroReclamo": "0100004420",
					 		"reclamoRef": "Reclamo Referencia",
					 		"_nif": "45454545"
					 	}]
 			};

            if (oEvent.getParameter("name") == "appRecBuscar") {
	            	this.getView().byId("SplitAppId").setMode("HideMode");
	            	this.getView().setModel(new JSONModel(oData));
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

						var objetoReclamo = result.data.objReclamo;
						var listaTexto = result.data.objReclamo.Texto;
						var CANTRECLA1 = result.data.objReclamo.Z_Reclamo.CANTRECLA1;
						var CANTRECLA2 = result.data.objReclamo.Z_Reclamo.CANTRECLA2;
						var datos = result.data.reclamo[0];
						this.obtenerDatos(datos,CANTRECLA1,CANTRECLA2,objetoReclamo);
						this.obtenerTextos(listaTexto);
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
			
		},
		obtenerTextos: function (textos) {
			var listaReclamo = this.getView().getModel().getProperty("/reclamo/listaReclamo");
            for (var indice in textos) { 
             	if(textos[indice].CodTexto == "0001")  {
             		listaReclamo[0].TextoTratemInicial = textos[indice].Descripcion;
             	} 
             	if(textos[indice].CodTexto == "0004")  {
             		listaReclamo[0].TextoNotaDireccion = textos[indice].Descripcion;
             	}
             	if (textos[indice].CodTexto == "Z006") {
             		listaReclamo[0].TextoSeguimiento = textos[indice].Descripcion;
             	}
             	if (textos[indice].CodTexto == "Z007") {
             		listaReclamo[0].TextoDiagnostico = textos[indice].Descripcion;
             	}
             	if (textos[indice].CodTexto == "Z008") {
             		listaReclamo[0].TextoSolucion = textos[indice].Descripcion;
             	}
             	if (textos[indice].CodTexto == "Z009") {
             		listaReclamo[0].TextoPersonaContacto = textos[indice].Descripcion;
             	}
             	if (textos[indice].CodTexto == "Z010") {
             		listaReclamo[0].TextoDatosFacturacion = textos[indice].Descripcion;
             	}
             	if (textos[indice].CodTexto == "Z011") {
             		listaReclamo[0].TextoPedidoReferencia = textos[indice].Descripcion;
             	}
             	if (textos[indice].CodTexto == "Z012") {
             		listaReclamo[0].TextoMotivosOtros = textos[indice].Descripcion;
             	}              	                
            }            
            this.getView().getModel().setProperty("/reclamo/listReclamo",listaReclamo);
            this.getView().getModel().refresh(true);
        },        
        obtenerDatos: function (datos,cantidad1,cantidad2,obj){
        	 this.getView().getModel().setProperty("/reclamo/material21",datos.material1);
        	 this.getView().getModel().setProperty("/reclamo/material22",datos.material2);
        	 this.getView().getModel().setProperty("/reclamo/cantRecla1",cantidad1);
        	 this.getView().getModel().setProperty("/reclamo/cantRecla2",cantidad2);
        	 this.getView().getModel().setProperty("/reclamo/reclamoRef",datos.reclamoRef);
        	 this.getView().getModel().setProperty("/ObjReclamo",obj);
        	 var reclamo = this.getView().getModel().getProperty("/reclamo/Contactos");
        	 this.getView().getModel().setProperty("/reclamo/EmpresaDet",reclamo.KUNNR);
        	 this.getView().getModel().setProperty("/reclamo/NomCliente",obj.Interlocutor[0].NOMBRE);
        	 this.getView().getModel().setProperty("/reclamo/codigoEmpResp",datos.nombreEmpResp);
        	 this.getView().getModel().setProperty("/reclamo/Motivo",reclamo.KTAGR);
        	 this.getView().getModel().setProperty("/reclamo/Status",reclamo.VTWEG);
        	 this.getView().getModel().setProperty("/reclamo/Resultado",reclamo.KTAER);
        	 this.getView().getModel().setProperty("/reclamo/JustificResul",reclamo.KTAEB);
        	 var reclamo1 = this.getView().getModel().getProperty("/reclamo1/0");
        	 this.getView().getModel().setProperty("/reclamo/OrgVenta",reclamo1.OrgVenta);
        	 this.getView().getModel().setProperty("/reclamo/Canal",reclamo1.Canal);
        	 this.getView().getModel().setProperty("/reclamo/Sector",reclamo1.Sector);
        	 this.getView().getModel().setProperty("/reclamo/OfiVenta",reclamo1.OfiVenta);
        	 this.getView().getModel().setProperty("/reclamo/comentario",reclamo1.comentario);
//Resultado
//JustificResul
        	// this.getView().getModel().setProperty("/reclamo/",datos);
        }    
	});

});
