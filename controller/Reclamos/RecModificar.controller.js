sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"pe/com/seidor/sap/decor/ventas/services/reclamoServices"
], function (Controller, MessageToast, UIComponent,JSONModel, reclamoServices) {
	"use strict";

	return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Reclamos.RecModificar", {

		onInit: function() {
			
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.attachRoutePatternMatched(this.onRouteMatched, this);			

		},
		onRouteMatched: function(oEvent) {

            if (oEvent.getParameter("name") == "appRecModificar") {
            		this.getView().byId("SplitAppId").setMode("HideMode");
            	    this.getView().setModel(new JSONModel({}));
					this.getView().getModel().setProperty("/dataIni",window.dataIni);
            		this.getView().getModel().refresh(true);
					this.getView().byId("dlg_rec_nuevo_inicio").open();
					this.getView().byId("btn_guardar_reclamo").setText("Modificar");
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
                this.getView().getModel().setProperty("/nombre","Modificar Reclamo");
                this.getView().getModel().refresh();
		},

		goHome:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
        },


		onCloseDlgRecNuevo: function(oEvent){
			var num_rec = this.getView().byId("txt_pNumeroReclamo").getValue();

			if (num_rec) {
				var result = reclamoServices.verReclamos(num_rec);
				if(result.c === "s"){

					if(result.data.success){

						this.getView().getModel().setProperty("/seleccionado",result.data);
						var resultData = this.getView().getModel().getProperty("/seleccionado");
						var rec = [];
						rec = resultData.reclamo[0];
						this.getView().getModel().setProperty("/listReclamo",rec);
						this.getView().getModel().refresh();
						this.getView().byId("dlg_rec_nuevo_inicio").close();

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

        onGuardarReclamo : function(){
			var material11 ="";
			var material12 = "";
			var material21 = "11000004";
			var material22 = "11000898";
			var cantRecla1 = 1;
			var cantRecla2 = 2;
			var reclamoRef = "elder ortiz reclamo referencia";
			var numeroPedido = "238187";
			var EmpresaDet = "0006679277";
			var NomCliente = "";
			var codigoEmpResp = "00001802";
			var Motivo = "A01";
			var Status = 0;
			var Resultado = "004";
			var JustificResul = "001";
			var OrgVenta = "1000";
			var Canal = "10";
			var Sector = "00";
			var OfiVenta = "1010";
			var comentario = "";
			var pNumeroReclamo = "0100004386";
			var listaReclamo = [];
				var ob1listaReclamo = {};

						ob1listaReclamo.pNumeroReclamo = "0100004386";
						ob1listaReclamo.fechaI = null;
						ob1listaReclamo.horaReclamoI = "14:49:02";
						ob1listaReclamo.horaReclamoF = "14:49:02";
						ob1listaReclamo.empresa = "0006679277";
						ob1listaReclamo.numeroPedido = "238187";
						ob1listaReclamo.comentario = "";
						ob1listaReclamo.material1 = "";
						ob1listaReclamo.material2 = "";
						ob1listaReclamo.material11 = "";
						ob1listaReclamo.material12 = "";
						ob1listaReclamo.material21 = "11000004";
						ob1listaReclamo.material22 = "11000898";
						ob1listaReclamo.cantRecla1 = "1";
						ob1listaReclamo.cantRecla2 = "2";
						ob1listaReclamo.montoRecla1 = "";
						ob1listaReclamo.montoRecla2 = "";
						ob1listaReclamo.reclamoRef = "reclamo referencia";
						ob1listaReclamo.TextoTratemInicial = "nota trtamiento inicialElder";
						ob1listaReclamo.TextoNotaDireccion = "nota direccion";
						ob1listaReclamo.TextoSeguimiento = "nota seguimiento";
						ob1listaReclamo.TextoDiagnostico = "nota diagnostico";
						ob1listaReclamo.TextoSolucion = "nota solucion";
						ob1listaReclamo.TextoPersonaContacto = "nota persona contacto";
						ob1listaReclamo.TextoDatosFacturacion = "nota datos facturacion";
						ob1listaReclamo.TextoPedidoReferencia = "notas pedidods referencia";
						ob1listaReclamo.TextoMotivosOtros = "nota informacion";
						ob1listaReclamo.mail = "";
						ob1listaReclamo._nif = "0006679277";
						ob1listaReclamo.PersonaContacto = "";
						ob1listaReclamo.NomPContac = "";
						ob1listaReclamo.DirPContac = "";
						ob1listaReclamo.NIFCont = "";
						ob1listaReclamo.TelfCont = "";
						ob1listaReclamo.CodpPContac = "";
						ob1listaReclamo.NomCliente = "";
						ob1listaReclamo.EmpresaDet= "0006679277";
						ob1listaReclamo.NomEmpresa = "";
						ob1listaReclamo.DirEmpresa = "CAL. GABRIELA MISTRAL Nº 250";
						ob1listaReclamo.TelfEmpre = "2734613";
						ob1listaReclamo.CodpEmpresa = "LIMA 34";
						ob1listaReclamo.CodDestMerc = "0006679277";
						ob1listaReclamo.NomDestMerc = "";
						ob1listaReclamo.DirDestMerc = "CAL. GABRIELA MISTRAL Nº 250";
						ob1listaReclamo.CodpDestMerc = "LIMA 34";
						ob1listaReclamo.CodECom = "";
						ob1listaReclamo.NomECom = "CAL. GABRIELA MISTRAL Nº 250";
						ob1listaReclamo.codigoEmpResp = "00001802";
						ob1listaReclamo.nombreEmpResp = "";
						ob1listaReclamo.CodResPago = "00001802";
						ob1listaReclamo.NomResPago = "Julio Edgardo Pingo";
						ob1listaReclamo.OrgVenta = "1000";
						ob1listaReclamo.Canal = "10";
						ob1listaReclamo.OfiVenta = "1010";
						ob1listaReclamo.Motivo = "A01";
						ob1listaReclamo.Resultado = "004";
						ob1listaReclamo.JustificResul = "001";
						ob1listaReclamo.Sector = "00";
						ob1listaReclamo.Status = "0";
						ob1listaReclamo.UsuarioStatus = "persona status";
						ob1listaReclamo.Descripcion = "Julio Edgardo Pingo";
						ob1listaReclamo.fechaSts = "2017-06-21T19:48:57.789Z";
				listaReclamo.push(ob1listaReclamo);
			var listaReclamoLleno = JSON.stringify(listaReclamo);	

			var pIndiceResultado = 4;
			var listaIntJson = [];
			var ob1listaInitJson = {};
						ob1listaInitJson.id = 1;
						ob1listaInitJson.PedidoId = 0; 
						ob1listaInitJson.Funcion = "AG";
						ob1listaInitJson.Codigo = "0006679277";
						ob1listaInitJson.Ruc = "06679277";
						ob1listaInitJson.Descripcion = "ALBERTO ALVARADO FIGUEROA";
						ob1listaInitJson.Titulo = "";
						ob1listaInitJson.Direccion = "CAL. GABRIELA MISTRAL Nº 250";
						ob1listaInitJson.DireccionCompleta = "CAL. GABRIELA MISTRAL Nº 250 LIMA 34 SURQUILLO - LIMA";
						ob1listaInitJson.Ciudad = "LIMA 34";
						ob1listaInitJson.Pais = "PE";
						ob1listaInitJson.CodigoPostal = "LIMA 34";
						ob1listaInitJson.Distrito = "SURQUILLO - LIMA";
						ob1listaInitJson.Telefono = "2734613";
						ob1listaInitJson.Mail ="ihkj@hotmail.com";
						ob1listaInitJson.PersonaFisica = true;
						ob1listaInitJson.Eventual = false;
						ob1listaInitJson.CodPersona = "";
						ob1listaInitJson.Nombre = "";
						ob1listaInitJson.ADRNR = "";
						ob1listaInitJson.DescripcionP = "";
						ob1listaInitJson.POSNR = "000000";
						ob1listaInitJson.PARVW = "AG";
						ob1listaInitJson.NOMBRE = "ALBERTO ALVARADO FIGUEROA";
						ob1listaInitJson.Name1 = "ALBERTO ALVARADO FIGUEROA";
						ob1listaInitJson.Calle = "CAL. GABRIELA MISTRAL Nº 250";
						ob1listaInitJson.KUNNR = "0006679277";
						ob1listaInitJson.NIF = "06679277";
						ob1listaInitJson.CPOSTAL = "LIMA 34";
						ob1listaInitJson.CodPostal = "LIMA 34";
						ob1listaInitJson.DIRECCION = "CAL. GABRIELA MISTRAL Nº 250";
						ob1listaInitJson.TELEFONO = "2734613";
						ob1listaInitJson.PCONTACTO = "ALBERTO ALVARADO FIGUEROA";
			var ob2listaInitJson	= {};		
						ob2listaInitJson.id = 3;
						ob2listaInitJson.PedidoId = 0;
						ob2listaInitJson.Funcion ="VE";
						ob2listaInitJson.Codigo = "";
						ob2listaInitJson.Ruc = "";
						ob2listaInitJson.Descripcion = "";
						ob2listaInitJson.Titulo = "";
						ob2listaInitJson.Direccion = "";
						ob2listaInitJson.DireccionCompleta = "";
						ob2listaInitJson.Ciudad = "";
						ob2listaInitJson.Pais = "";
						ob2listaInitJson.CodigoPostal = "";
						ob2listaInitJson.Distrito = "";
						ob2listaInitJson.Telefono = "";
						ob2listaInitJson.Mail = "";
						ob2listaInitJson.PersonaFisica = false;
						ob2listaInitJson.Eventual = false;
						ob2listaInitJson.CodPersona = "00001802";
						ob2listaInitJson.Nombre = "Julio Edgardo Pingo";
						ob2listaInitJson.ADRNR = "";
						ob2listaInitJson.DescripcionP = "";
						ob2listaInitJson.POSNR = "000000";
						ob2listaInitJson.PARVW = "VE";
						ob2listaInitJson.PERNR = "00001802";
			var ob3listaInitJson = {};			
						ob3listaInitJson.id = 4;
						ob3listaInitJson.PedidoId = 0;
						ob3listaInitJson.Funcion = "ZM";
						ob3listaInitJson.Codigo = "";
						ob3listaInitJson.Ruc = "";
						ob3listaInitJson.Descripcion = "";
						ob3listaInitJson.Titulo = "";
						ob3listaInitJson.Direccion = "";
						ob3listaInitJson.DireccionCompleta = "";
						ob3listaInitJson.Ciudad = "";
						ob3listaInitJson.Pais = "";
						ob3listaInitJson.CodigoPostal = "";
						ob3listaInitJson.Distrito = "";
						ob3listaInitJson.Telefono = "";
						ob3listaInitJson.Mail = ""; 
						ob3listaInitJson.PersonaFisica = false;
						ob3listaInitJson.Eventual = false;
						ob3listaInitJson.CodPersona = "00001802";
						ob3listaInitJson.Nombre = "Julio Edgardo Pingo";
						ob3listaInitJson.ADRNR = "";
						ob3listaInitJson.DescripcionP = "";
						ob3listaInitJson.POSNR = "000000";
						ob3listaInitJson.PARVW = "ZM";
						ob3listaInitJson.PERNR = "00001802";
			var ob4listaInitJson = {};			
						ob4listaInitJson.id = 5;
						ob4listaInitJson.PedidoId = 0; 
						ob4listaInitJson.Funcion = "AP";
						ob4listaInitJson.Codigo = "";
						ob4listaInitJson.Ruc = "";
						ob4listaInitJson.Descripcion = "nombre persona contactodavid";
						ob4listaInitJson.Titulo = "";
						ob4listaInitJson.Direccion = "direccionPersonaContactodavid";
						ob4listaInitJson.DireccionCompleta = "";
						ob4listaInitJson.Ciudad = "LIMA 02";
						ob4listaInitJson.Pais = "PE";
						ob4listaInitJson.CodigoPostal = "LIMA 02";
						ob4listaInitJson.Distrito = "";
						ob4listaInitJson.Telefono = "telcon";
						ob4listaInitJson.Mail = "";
						ob4listaInitJson.PersonaFisica = false;
						ob4listaInitJson.Eventual = false;
						ob4listaInitJson.CodPersona = "";
						ob4listaInitJson.Nombre = "";
						ob4listaInitJson.ADRNR = "";
						ob4listaInitJson.DescripcionP = "";
						ob4listaInitJson.POSNR = "";
						ob4listaInitJson.PARVW = "AP";
						ob4listaInitJson.NOMBRE = "nombre persona contacto";
						ob4listaInitJson.Name1 = "nombre persona contacto";
						ob4listaInitJson.Calle = "direccionPersonaContacto";
						ob4listaInitJson.CPOSTAL = "LIMA 02";
						ob4listaInitJson.CodPostal = "LIMA 02";
						ob4listaInitJson.DIRECCION = "direccionPersonaContacto";
						ob4listaInitJson.TELEFONO = "telcon";
						ob4listaInitJson.PCONTACTO = "nombre persona contacto";
			listaIntJson.push(ob1listaInitJson);
			listaIntJson.push(ob2listaInitJson);
			listaIntJson.push(ob3listaInitJson);
			listaIntJson.push(ob4listaInitJson);


			var listaIntJsonLleno = JSON.stringify(listaIntJson);
			

			var UserId = "JPINGO" ;
			var PwdId = "JPINGO1*" ;
			var Id = "5457ecaf-f37f-4448-acca-843c57771ae3" ;
			var GrpVend = "100" ;
			var Descripcion = "Julio Edgardo Pingo" ;
			var CodigoVendedor = "00001802" ;
			var OrgVentas = "1000" ;
			var CanalDist = "10" ;
			var OfVentas = "1010" ;


				var result = reclamoServices.EditarReclamo(material11,
							                                 material12,
							                                 material21,
							                                 material22,
							                                 cantRecla1,
							                                 cantRecla2, 
							                                 reclamoRef, 
							                                 numeroPedido,
							                                 EmpresaDet, 
							                                 NomCliente, 
							                                 codigoEmpResp, 
							                                 Motivo, 
							                                 Status, 
							                                 Resultado, 
							                                 JustificResul, 
							                                 OrgVenta,
							                                 Canal, 
							                                 Sector, 
							                                 OfiVenta, 
							                                 comentario,
							                                 pNumeroReclamo, 
							                                 listaReclamoLleno, 
							                                 pIndiceResultado, 
							                                 listaIntJsonLleno,
							                                 UserId,
															 PwdId,
															 Id,
															 GrpVend,
															 Descripcion,
															 CodigoVendedor,
															 OrgVentas,
															 CanalDist,
														     OfVentas);
				//console.log(v_listaReclamo, v_listaIntJson);
				

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



		onSemanticButtonPress: function (evt) {
			MessageToast.show(evt.getSource().getText() + " Pressed");


		},


		onMasterDatos: function(oEvent){
                this.byId("SplitAppId").toMaster(this.createId("MasterDatos"));

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
		}


            
	});

});
