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
                    "reclamo" : {
                        "material11" : "",
						"material12" : "",
						"material21" : "",
						"material22" : "",
						"cantRecla1" : "",
						"cantRecla2" : "",
						"reclamoRef" : "",
						"numeroPedido" : "",
						"EmpresaDet" : "",
						"NomCliente" : "",
						"codigoEmpResp" : "",
						"Motivo" : "",
						"Status" : "",
						"Resultado" : "",
						"JustificResul" : "",
						"OrgVenta" : "",
						"Canal" : "",
						"Sector" : "",
						"OfiVenta" : "",
						"comentario" : "",

                        "listaReclamo" : [
                        					{
                        						"pNumeroReclamo":"",
                        						"fechaI":"",
                        						"fechaF":"",
                        						"horaReclamoI":"",
                        						"horaReclamoF":"",
                        						"empresa":"",
                        						"numeroPedido":"",
                        						"comentario":"",
                        						"material1":"",
                        						"material2":"",
                        						"material11":"",
                        						"material12":"",
                        						"material21":"",
                        						"material22":"",
                        						"cantRecla1":"",
                        						"cantRecla2":"",
                        						"montoRecla1":"",
                        						"montoRecla2":"",
                        						"reclamoRef":"",
                        						"TextoTratemInicial":"",
                        						"TextoNotaDireccion":"",
                        						"TextoSeguimiento":"",
                        						"TextoDiagnostico":"",
                        						"TextoSolucion":"",
                        						"TextoPersonaContacto":"",
                        						"TextoDatosFacturacion":"",
                        						"TextoPedidoReferencia":"",
                        						"TextoMotivosOtros":"",
                        						"mail":"",
                        						"_nif":"",
                        						"PersonaContacto":"",
                        						"NomPContac":"",
                        						"DirPContac":"",
                        						"NIFCont":"",
                        						"TelfCont":"",
                        						"CodpPContac":"",
                        						"NomCliente":"",
                        						"EmpresaDet":"",
                        						"NomEmpresa":"",
                        						"DirEmpresa":"",
                        						"TelfEmpre":"",
                        						"CodpEmpresa":"",
                        						"CodDestMerc":"",
                        						"NomDestMerc":"",
                        						"DirDestMerc":"",
                        						"CodpDestMerc":"",
                        						"CodECom":"",
                        						"NomECom":"",
                        						"codigoEmpResp":"",
                        						"nombreEmpResp":"",
                        						"CodResPago":"",
                        						"NomResPago":"",
                        						"OrgVenta":"",
                        						"Canal":"",
                        						"OfiVenta":"",
                        						"Motivo":"",
                        						"Resultado":"",
                        						"JustificResul":"",
                        						"Sector":"",
                        						"Status":"",
                        						"UsuarioStatus":"",
                        						"Descripcion":"",
                        						"fechaSts":""
                        					}],
                        
                        "pIndiceResultado" : 4,
                        
                        "listaIntJson" : [
                                            {
                                                "id":1,
                                                "PedidoId":0,
                                                "Funcion":"",
                                                "Codigo":"",
                                                "Ruc":"",
                                                "Descripcion":"",
                                                "Titulo":"",
                                                "Direccion":"",
                                                "DireccionCompleta":"",
                                                "Ciudad":"",
                                                "Pais":"PE",
                                                "CodigoPostal":"",
                                                "Distrito":"",
                                                "Telefono":"",
                                                "Mail":"",
                                                "PersonaFisica":true,
                                                "Eventual":false,
                                                "CodPersona":"",
                                                "Nombre":"",
                                                "ADRNR":"",
                                                "DescripcionP":"",
                                                "POSNR":"000000",
                                                "PARVW":"",
                                                "NOMBRE":"",
                                                "Name1":"",
                                                "Calle":"",
                                                "KUNNR":"",
                                                "NIF":"",
                                                "CPOSTAL":"",
                                                "CodPostal":"",
                                                "DIRECCION":"",
                                                "TELEFONO":"",
                                                "PCONTACTO":""
                                            },
                                            {
                                                "id":3,
                                                "PedidoId":0,
                                                "Funcion":"VE",
                                                "Codigo":"",
                                                "Ruc":"",
                                                "Descripcion":"",
                                                "Titulo":"",
                                                "Direccion":"",
                                                "DireccionCompleta":"",
                                                "Ciudad":"",
                                                "Pais":"",
                                                "CodigoPostal":"",
                                                "Distrito":"",
                                                "Telefono":"",
                                                "Mail":"",
                                                "PersonaFisica":false,
                                                "Eventual":false,
                                                "CodPersona":"00001802",
                                                "Nombre":"Julio Edgardo Pingo",
                                                "ADRNR":"",
                                                "DescripcionP":"",
                                                "POSNR":"000000",
                                                "PARVW":"VE",
                                                "PERNR":"00001802"
                                            },
                                            {
                                                "id":4,
                                                "PedidoId":0,
                                                "Funcion":"ZM",
                                                "Codigo":"",
                                                "Ruc":"",
                                                "Descripcion":"",
                                                "Titulo":"",
                                                "Direccion":"",
                                                "DireccionCompleta":"",
                                                "Ciudad":"",
                                                "Pais":"",
                                                "CodigoPostal":"",
                                                "Distrito":"",
                                                "Telefono":"",
                                                "Mail":"",
                                                "PersonaFisica":false,
                                                "Eventual":false,
                                                "CodPersona":"00001802",
                                                "Nombre":"Julio Edgardo Pingo",
                                                "ADRNR":"",
                                                "DescripcionP":"",
                                                "POSNR":"000000",
                                                "PARVW":"ZM",
                                                "PERNR":"00001802"
                                            },
                                            {
                                                "id":5,
                                                "PedidoId":0,
                                                "Funcion":"AP",
                                                "Codigo":"",
                                                "Ruc":"",
                                                "Descripcion":"",
                                                "Titulo":"",
                                                "Direccion":"",
                                                "DireccionCompleta":"",
                                                "Ciudad":"",
                                                "Pais":"PE",
                                                "CodigoPostal":"",
                                                "Distrito":"",
                                                "Telefono":"",
                                                "Mail":"",
                                                "PersonaFisica":false,
                                                "Eventual":false,
                                                "CodPersona":"",
                                                "Nombre":"",
                                                "ADRNR":"",
                                                "DescripcionP":"",
                                                "POSNR":"",
                                                "PARVW":"AP",
                                                "NOMBRE":"",
                                                "Name1":"",
                                                "Calle":"",
                                                "CPOSTAL":"",
                                                "CodPostal":"",
                                                "DIRECCION":"",
                                                "TELEFONO":"",
                                                "PCONTACTO":""
                                            }
                                        ]
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
				this.getView().byId("txt_Asesor").setEnabled(false);
				this.getView().byId("txt_funcion").setEnabled(false);
				this.getView().byId("txt_codigo").setEnabled(false);
				this.getView().byId("txt_nombre").setEnabled(false);
				this.getView().byId("txt_direccion").setEnabled(false);
				this.getView().byId("txt_telefono").setEnabled(false);
				this.getView().byId("txt_nif").setEnabled(false);
				//this.getView().byId("txt_correo").setEnabled(false);
				this.getView().byId("dlg_filtros").open();



					this.getView().byId("btn_guardar_reclamo").setText("Guardar");
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
							this.getView().getModel().setProperty("/Pedido",result.data);
		                	this.getView().getModel().setProperty("/Reclamos",result.data.objPedido.Detalle);
                            this.getView().getModel().setProperty("/Crear_reclamo",resul.data);
							this.getView().getModel().refresh();
							
							//Llamar campos
							var Numpedido =  this.getView().getModel().getProperty("/Pedido/objPedido/NumPedido");
                            var num_pedido = parseInt(Numpedido,10);
							var CodCliente =  this.getView().getModel().getProperty("/Pedido/objPedido/CodCliente");
							var Descripcion = this.getView().getModel().getProperty("/Pedido/objCliente/Descripcion");
							var Asesor = this.getView().getModel().getProperty("/Pedido/NomVendedor1");

							//Llenar campos
							this.getView().byId("txt_Numero_Pedido").setValue(num_pedido);
							this.getView().byId("txt_Codigo_Cliente").setValue(CodCliente);
							this.getView().byId("txt_cliente_eventual").setValue(Descripcion);
							this.getView().byId("txt_Asesor").setValue(Asesor);
							console.log(Asesor);
							//LLamar campos interlocutores
							var Funcion = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/0/Funcion");
							var Codigo = this.getView().getModel().getProperty("/Pedido/objCliente/Codigo");
							var Nombre = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/0/Cliente/Descripcion");
							var Direccion = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/0/Cliente/Direccion");
							var Telefono = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/0/Cliente/Telefono");
							var nif = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/0/Cliente/Ruc");
							
							var codigo_asesor = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/3/Persona/CodPersona");
						 	var Descripcion_asesor = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/3/Persona/Descripcion");

						 	var Funcion_Enmpresa_Comercial = this.getView().getModel().getProperty("/Pedido/objPedido/Interlocutores/3/Funcion");

							var fecha_realizacion = this.getView().getModel().getProperty("/Pedido/FechaValidez");

							//Llenar campos
							this.getView().byId("txt_funcion").setValue(Funcion); 

							this.getView().byId("txt_codigo").setValue(Codigo); 
							this.getView().byId("txt_nombre").setValue(Nombre);
							this.getView().byId("txt_direccion").setValue(Direccion);
							this.getView().byId("txt_telefono").setValue(Telefono);
							this.getView().byId("txt_nif").setValue(nif);

							this.getView().byId("txt_codigo_asesor").setValue(codigo_asesor);
							this.getView().byId("txt_nombre_codigo_asesor").setValue(Descripcion_asesor);

							this.getView().byId("txt_funcion_comercial").setValue(Funcion_Enmpresa_Comercial);
							this.getView().byId("txt_codigo_empresa_comercial").setValue(codigo_asesor);
							this.getView().byId("txt_nombre_empresa_comercial").setValue(Descripcion_asesor);

							this.getView().byId("txt_fecha_realizacion").setValue(fecha_realizacion);
							

							//Llenar campos Empresa comercial
							var oficina = this.getView().getModel().getProperty("/Pedido/oficina");
							//console.log(oficina);
							this.getView().byId("cbo_OfiVenta").setSelectedKey(oficina);

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
                reclamo.numeroPedido = this.getView().byId("txt_Numero_Pedido").getValue();
				var listaReclamo = this.getView().getModel().getProperty("/reclamo/listaReclamo");
                var crear_reclamo = this.getView().getModel().getProperty("/Crear_reclamo/reclamo");
                listaReclamo[0].fechaI = crear_reclamo[0].fechaI;
                listaReclamo[0].fechaF = crear_reclamo[0].fechaF;
                listaReclamo[0].horaReclamoI = crear_reclamo[0].horaReclamoI;
                listaReclamo[0].horaReclamoF = crear_reclamo[0].horaReclamoF;
                listaReclamo[0].fechaSts = crear_reclamo[0].fechaSts; 
				listaReclamo[0].material21 = reclamo.material21.substr(0,8);
				listaReclamo[0].material22 = reclamo.material22.substr(0,8);
				listaReclamo[0].cantRecla1 = reclamo.cantRecla1;
				listaReclamo[0].cantRecla2 = reclamo.cantRecla2;
				listaReclamo[0].reclamoRef = reclamo.reclamoRef;
				listaReclamo[0].numeroPedido = reclamo.numeroPedido;
				listaReclamo[0].empresa = reclamo.EmpresaDet
				listaReclamo[0].EmpresaDet = reclamo.EmpresaDet;
				listaReclamo[0].NomCliente = reclamo.NomCliente;
				listaReclamo[0].codigoEmpResp = reclamo.codigoEmpResp;
				listaReclamo[0].Motivo = reclamo.Motivo.substr(0,3);
				listaReclamo[0].Status = reclamo.Status.substr(0,1);
				listaReclamo[0].Resultado = reclamo.Resultado.substr(0,3);
				listaReclamo[0].JustificResul = reclamo.JustificResul.substr(0,3);
				listaReclamo[0].OrgVenta = reclamo.OrgVenta.substr(0,4);
				listaReclamo[0].Canal = reclamo.Canal.substr(0,2);
				listaReclamo[0].Sector = reclamo.Sector.substr(0,2);
				listaReclamo[0].OfiVenta = reclamo.OfiVenta.substr(0,4);
				listaReclamo[0].comentario = reclamo.comentario;
                listaReclamo[0].Status = this.getView().byId("cbo_Status").getSelectedKey();
				var reclamo1 = JSON.stringify(listaReclamo);
				var listaIntJson = this.getView().getModel().getProperty("/reclamo/listaIntJson");
                var codigo_postal = this.getView().byId("cbo_ubicacion").getSelectedKey();
                listaIntJson[0].DireccionCompleta = listaIntJson[0].Direccion + " " + codigo_postal + " " + listaIntJson[0].Distrito;
                listaIntJson[0].Ciudad = this.getView().byId("cbo_ubicacion").getSelectedKey();
                listaIntJson[0].CodigoPostal = this.getView().byId("cbo_ubicacion").getSelectedKey();
                listaIntJson[0].PARVW = this.getView().byId("txt_funcion").getValue();
                listaIntJson[0].NOMBRE = this.getView().byId("txt_nombre").getValue();
                listaIntJson[0].Name1 = this.getView().byId("txt_nombre").getValue();
                listaIntJson[0].KUNNR = this.getView().byId("txt_codigo").getValue();
                listaIntJson[0].NIF = this.getView().byId("txt_nif").getValue();
                listaIntJson[0].Calle = this.getView().byId("txt_direccion").getValue();
                listaIntJson[0].CPOSTAL = this.getView().byId("cbo_ubicacion").getSelectedKey();
                listaIntJson[0].CodPostal = this.getView().byId("cbo_ubicacion").getSelectedKey();
                listaIntJson[0].DIRECCION = this.getView().byId("txt_direccion").getValue();
                listaIntJson[0].TELEFONO = this.getView().byId("txt_telefono").getValue();
                listaIntJson[0].PCONTACTO = this.getView().byId("txt_nombre").getValue();
                var nombre_persona_contacto = listaIntJson[3].Descripcion;
                var ciudad_persona_contacto = this.getView().byId("cbo_ubicacion_persona_contacto").getSelectedKey();
                listaIntJson[3].Ciudad = ciudad_persona_contacto;
                listaIntJson[3].CodigoPostal = ciudad_persona_contacto;
                listaIntJson[3].NOMBRE = nombre_persona_contacto;
                listaIntJson[3].Name1 = nombre_persona_contacto;
                var direccion_persona_contacto = listaIntJson[3].Direccion;
                listaIntJson[3].Calle = direccion_persona_contacto;
                listaIntJson[3].CPOSTAL = ciudad_persona_contacto;
                listaIntJson[3].CodPostal = ciudad_persona_contacto;
                listaIntJson[3].DIRECCION = direccion_persona_contacto;
                listaIntJson[3].TELEFONO = listaIntJson[3].Telefono;
                listaIntJson[3].PCONTACTO = listaIntJson[3].Descripcion;
				var reclamo2 = JSON.stringify(listaIntJson);
				var result = reclamoServices.guardarReclamo(reclamo, reclamo1, reclamo2);
		

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
        }    
	});

});
