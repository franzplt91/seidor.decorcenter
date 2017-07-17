sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"pe/com/seidor/sap/decor/ventas/services/reclamoServices"
], function (Controller, MessageToast, UIComponent,JSONModel, reclamoServices) {
	"use strict";

	return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Reclamos.RecNuevo", {

		onInit: function() {
			
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.attachRoutePatternMatched(this.onRouteMatched, this);

			

			

		},
		onRouteMatched: function(oEvent) {
			var oData = {

                "reclamo" :
                {

                    "materiales":[
                        {
                            "CodMaterialCorto" : "",
                            "DescMaterial" : ""
                        }
                    ],
                    "material1" : "",
                    "material2" : "",
                    "cantidad_material1" : "",
                    "cantidad_material2" : "",
                    "reclamo_referencia" : "",
                    "numero_pedido" : "",
                    "codigo_cliente" : "",
                    "nombre_cliente" : "",
                    "asesor" : "",
                    "motivo" : "",
                    "status" : "",
                    "resultado" : "",
                    "justificacion_resultado" : "",
                    "lista_organizacion_ventas" : [
                        {
                            "Codigo": "",
                            "Descripcion": ""
                        }
                    ],
                    "organizacion_venta" : "",
                    "lista_canal_distrito" : [
                        {
                            "Codigo": "",
                            "Descripcion": ""
                        }
                    ],
                    "canal" : "",
                    "sector" : "",
                    "oficina_ventas" : "",
                    "comentario" : "",
                    "datos_reclamo" : [
                        {
                            "TextoTratemInicial":"",
                            "TextoNotaDireccion":"",
                            "TextoSeguimiento":"",
                            "TextoDiagnostico":"",
                            "TextoSolucion":"",
                            "TextoPersonaContacto":"",
                            "TextoDatosFacturacion":"",
                            "TextoPedidoReferencia":"",
                            "TextoMotivosOtros":"",
                        }
                    ]
                },
                "Interlocutores" : {
                    "AG" : {
                        "Cliente": {
                            "Ciudad":"ATE VITARTE - LIMA",
                            "Codigo":"0000101317",
                            "CodigoPostal":"LIMA 03",
                            "Descripcion":"Cliente Eventual La Molina",
                            "Direccion":"PRUEBA",
                            "DireccionCompleta":"PRUEBA LIMA 03 ATE VITARTE - LIMA",
                            "Eventual":false,
                            "FECNAC":"0001-01-01T00:00:00",
                            "Mail":"",
                            "Pais":"PE",
                            "PersonaFisica":true,
                            "Ruc":"45454545",
                            "Telefono":"",
                            "Titulo":"Señor"
                        },
                        "Funcion": "AG",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "AP" : {
                        "Cliente": {
                            "Ciudad":"ATE VITARTE - LIMA",
                            "Codigo":"0000101317",
                            "CodigoPostal":"LIMA 03",
                            "Descripcion":"Cliente Eventual La Molina",
                            "Direccion":"PRUEBA",
                            "DireccionCompleta":"PRUEBA LIMA 03 ATE VITARTE - LIMA",
                            "Eventual":false,
                            "FECNAC":"0001-01-01T00:00:00",
                            "Mail":"",
                            "Pais":"PE",
                            "PersonaFisica":true,
                            "Ruc":"45454545",
                            "Telefono":"",
                            "Titulo":"Señor"
                        },
                        "Funcion": "AP",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "ZM" : {
                        "Cliente": {
                            "Ciudad":"ATE VITARTE - LIMA",
                            "Codigo":"0000101317",
                            "CodigoPostal":"LIMA 03",
                            "Descripcion":"Cliente Eventual La Molina",
                            "Direccion":"PRUEBA",
                            "DireccionCompleta":"PRUEBA LIMA 03 ATE VITARTE - LIMA",
                            "Eventual":false,
                            "FECNAC":"0001-01-01T00:00:00",
                            "Mail":"",
                            "Pais":"PE",
                            "PersonaFisica":true,
                            "Ruc":"45454545",
                            "Telefono":"",
                            "Titulo":"Señor"
                        },
                        "Funcion": "ZM",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "VE" : {
                        "Cliente": {
                            "Ciudad":"ATE VITARTE - LIMA",
                            "Codigo":"0000101317",
                            "CodigoPostal":"LIMA 03",
                            "Descripcion":"Cliente Eventual La Molina",
                            "Direccion":"PRUEBA",
                            "DireccionCompleta":"PRUEBA LIMA 03 ATE VITARTE - LIMA",
                            "Eventual":false,
                            "FECNAC":"0001-01-01T00:00:00",
                            "Mail":"",
                            "Pais":"PE",
                            "PersonaFisica":true,
                            "Ruc":"45454545",
                            "Telefono":"",
                            "Titulo":"Señor"
                        },
                        "Funcion": "VE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    }
                }

                };

            if (oEvent.getParameter("name") == "appRecNuevo") {
            	this.getView().byId("SplitAppId").setMode("HideMode");
            	this.getView().setModel(new JSONModel(oData));
				this.getView().getModel().setProperty("/dataIni",window.dataIni);
	            this.getView().getModel().refresh(true);
	            this.getView().byId("txt_Numero_Pedido").setEnabled(false);
				this.getView().byId("txt_Codigo_Cliente").setEnabled(false);
				this.getView().byId("txt_cliente_eventual").setEnabled(false);
				//this.getView().byId("txt_Asesor").setEnabled(false);
				this.getView().byId("txt_funcion").setEnabled(false);
				this.getView().byId("txt_codigo").setEnabled(false);
				this.getView().byId("txt_nombre").setEnabled(false);
				this.getView().byId("txt_direccion").setEnabled(false);
				this.getView().byId("txt_telefono").setEnabled(false);
				this.getView().byId("txt_nif").setEnabled(false);
				this.getView().byId("dlg_filtros").open();
				//this.getView().byId("btn_guardar_reclamo").setText("Guardar");
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
                this.getView().getModel().setProperty("/nombre","Nuevo Reclamo");
                this.getView().getModel().refresh();
		},

		goHome:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
        },

		

		onCrearDlgRecNuevo: function(oEvent){

            var num_pe = this.getView().byId("txt_pNumPedido").getValue();
                if(num_pe)
                {
                    var result = reclamoServices.documentoVentas(num_pe,"ver","reclamo");
                    var resul = reclamoServices.crearReclamo(num_pe,"ver","reclamo");
                    if(result.c === "s" && resul.c === "s")
                    {
                        if(result.data.success && resul.data.success)
                        {

                            var interlocutores = result.data.objPedido.Interlocutores;
                            this.onMostrarInterlocutores(interlocutores);
                            var datos_reclamo = result.data.objPedido;
                            this.getView().getModel().setProperty("/reclamo/materiales",result.data.objPedido.Detalle);
                            this.getView().getModel().setProperty("/reclamo/numero_pedido",result.data.objPedido.NumPedido);
                            this.getView().getModel().setProperty("/reclamo/codigo_cliente",result.data.codigoCliente);
                            this.getView().getModel().setProperty("/reclamo/nombre_cliente",result.data.objCliente.Descripcion);
                            this.getView().getModel().setProperty("/reclamo/asesor",result.data.NomVendedor1);
                            this.getView().getModel().setProperty("/reclamo/motivo",dataIni.lstMotivoRecl.Codigo);
                            this.getView().getModel().setProperty("/reclamo/status",result.data.pCondicionesPago);
                            this.getView().getModel().setProperty("/reclamo/lista_organizacion_ventas",result.data.lstOrgVtas);
                            this.getView().getModel().setProperty("/reclamo/lista_canal_distrito",result.data.lstCanalDist);
                            this.getView().getModel().setProperty();
                            this.getView().getModel().refresh();
                            
                            this.getView().getModel().setProperty("/reclamo/materiales",result.data.objPedido.Detalle);
                            this.getView().getModel().setProperty("/reclamo/numero_pedido",result.data.objPedido.NumPedido);
                            this.getView().getModel().setProperty("/reclamo/codigo_cliente",result.data.codigoCliente);
                            this.getView().getModel().setProperty("/reclamo/nombre_cliente",result.data.objCliente.Descripcion);
                            this.getView().getModel().setProperty("/reclamo/asesor",result.data.NomVendedor1);
                            this.getView().getModel().setProperty("/reclamo/motivo",dataIni.lstMotivoRecl.Codigo);
                            this.getView().getModel().setProperty("/reclamo/status",result.data.pCondicionesPago);
                            this.getView().getModel().setProperty("/reclamo/lista_organizacion_ventas",result.data.lstOrgVtas);
                            
                            this.getView().getModel().setProperty("/array_interlocutor",result.data.objPedido.Interlocutores);
                            var interlocutor_AG = this.getView().getModel().getProperty("/array_interlocutor/0");

                            this.getView().getModel().setProperty("/reclamo/interlocutores/0/Funcion",interlocutor_AG.Funcion);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/0/Codigo",interlocutor_AG.Cliente.Codigo);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/0/Nombre",interlocutor_AG.Cliente.Descripcion);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/0/Direccion",interlocutor_AG.Cliente.Direccion);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/0/Ubicacion",interlocutor_AG.Cliente.CodigoPostal);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/0/Telefono",interlocutor_AG.Cliente.Telefono);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/0/Nif",interlocutor_AG.Cliente.Ruc);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/0/Correo",interlocutor_AG.Cliente.Mail);

                            var interlocutor_AP = this.getView().getModel().getProperty("/array_interlocutor/4");

                            this.getView().getModel().setProperty("/reclamo/interlocutores/1/Funcion", "AP");
                            this.getView().getModel().setProperty("/reclamo/interlocutores/1/Nombre",interlocutor_AP.Cliente.Descripcion);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/1/Direccion",interlocutor_AP.Cliente.Direccion);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/1/Ubicacion",interlocutor_AP.Cliente.CodigoPostal);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/1/Telefono",interlocutor_AP.Cliente.Telefono);

                            this.getView().getModel().setProperty("/reclamo/interlocutores/2/Funcion");
                            this.getView().getModel().setProperty("/reclamo/interlocutores/2/Nombre");
                            this.getView().getModel().setProperty("/reclamo/interlocutores/2/Direccion");

                            var interlocutor_VE = this.getView().getModel().getProperty("/array_interlocutor/3")

                            this.getView().getModel().setProperty("/reclamo/interlocutores/3/Funcion",interlocutor_VE.Funcion);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/3/Codigo",interlocutor_VE.Persona.CodPersona);
                            this.getView().getModel().setProperty("/reclamo/interlocutores/3/Nombre",interlocutor_VE.Persona.Descripcion);

                            this.getView().byId("dlg_filtros").close();
                        }
                        else
                        {
                            sap.m.MessageToast.show(result.data.errors.reason, {
                                duration: 3000
                            });
                        }
                    }
                    else
                    {
                        sap.m.MessageToast.show(result.m, {
                            duration: 3000
                                    });
                    }
                            console.log(result);    
                }
                else
                {
                    sap.m.MessageToast.show('Número de reclamo incorrecto', {
                        duration: 1000
                    });
                    
                    return;

                }
        },

		onOpenDlgBuscarRecNuevo:function(){
			
				//this.getView().byId("dlg_buscar_rec_nuevo").open();
				var material_primero = this.getView().byId("cbo_Motivo").getSelectedItem();
				this.getView().getModel().setProperty("/Motivo",material_primero);
				var material1 = this.getView().getModel().getProperty("/Motivo/mProperties/key");
				console.log(material_primero);
		},  


		onCloseDlgBuscarRecNuevo:function(){

			this.getView().byId("dlg_buscar_rec_nuevo").close();
		},    


		onBuscarRecNuvoInterlocutores:function(){
			this.byId("SplitAppId").toMaster(this.createId("MasterRecNuevo"));
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

		ondlg_addProducto:function(){
			this.getView().byId("dlg_addProducto").open();
		},

		onClosedlg_addProducto:function(){
			this.getView().byId("dlg_addProducto").close();
		},

		onMasterProductosAdd:function(){

			this.byId("SplitAppId").toMaster(this.createId("MasterProductosAgregar"));
            this.byId("SplitAppId").to(this.createId("pag_producto_agregado1"));


			this.getView().byId("dlg_addProducto").close();
			
		},
		

		onClosedlg_buscar: function(){
			this.getView().byId("dlg_buscar").close();
		},

		onMasterProductosBuscar:function(){

			this.byId("SplitAppId").toMaster(this.createId("MasterProductosBuscar"));

			this.byId("SplitAppId").to(this.createId("pag_productos_buscar1"));


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
                this.byId("SplitAppId").toMaster(this.createId("MasterDatos"));

                var objeto = oEvent.getSource().getBindingContext().getObject();
                console.log(objeto.codigo);

                
        },

        onMasterProductos: function(oEvent){
                this.byId("SplitAppId").toMaster(this.createId("MasterProductos"));

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

		onGuardarReclamo : function(){



				var reclamo = this.getView().getModel().getProperty("/reclamo");
                var listaReclamo = [];
            
                
				var result = reclamoServices.guardarReclamo(reclamo,reclamo1,reclamo2);
		

				if (result.c === "s") 
				{
					if(result.data.success)
					{
						this.getView().getModel().setProperty("/Reclamo",result.data.nroRec);
						this.getView().byId("dlg_mostrar_reclamo").open();
                    	this.getView().getModel().refresh();

					}
					else
					{
						 sap.m.MessageToast.show(result.data.errors.reason, {
	                        duration: 3000
	                    });
					}
				}
				else
				{
					sap.m.MessageToast.show(result.m, {
                    duration: 3000
                	});		
				}

		},

        onCerraDialog : function(){
        	this.getView().byId("dlg_mostrar_reclamo").close();
        },
        onMostrarInterlocutores : function(interlocutores){
            for (var indice in interlocutores) {
                this.getView().getModel().setProperty("/Interlocutores/" + interlocutores[indice].Funcion, interlocutores[indice]); 
            }

        },
        onDatosReclamo : function(datos_reclamo){
            for (var indice in datos_reclamo) {
                this.getView().getModel().setProperty("/Interlocutores/" + datos_reclamo[indice].CodMaterialCorto);
            }
        }    
	});

});
