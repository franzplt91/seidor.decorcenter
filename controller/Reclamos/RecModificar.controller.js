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

			var oData =		{

					numReclamo: "" ,

					///////Inicio Visualizar Reclamo///////////
                    objReclamo: {

                            "Contactos": {
                                "AEDAT": "" , //"0001-01-01T00:00:00",
                                "AENAM": "" , //"",
                                "AEZET": "" , //"",
                                "Canal": "" , //null,
                                "CodpPContac": "" , //null,
                                "DIRECTION": "" , //"",
                                "DirPContac": "" , //null,
                                "ERDAT": "" , //"2017-07-07T00:00:00",
                                "ERNAM": "" , //"Julio Edgard",
                                "ERZET": "" , //"10:16:01",
                                "GBSTK": "" , //"A",
                                "JustificResul": "" , //null,
                                "KTAAR": "" , //"R001",
                                "KTABG": "" , //"2017-07-07T00:00:00",
                                "KTABT": "" , //"10:03:17",
                                "KTAEB": "" , //"001",
                                "KTAEN": "" , //"2017-07-07T00:00:00",
                                "KTAER": "" , //"005",
                                "KTAET": "" , //"10:03:17",
                                "KTAFK": "" , //"R001",
                                "KTAGR": "" , //"002",
                                "KTARA": "" , //null,
                                "KTAST": "" , //"0",
                                "KTEXT": "" , //"Factura/boleta",
                                "KTEXT_MC": "" , //"238187/0011000898",
                                "KTEXT_MC_LANGU": "" , //"E",
                                "KUNNR": "" , //"0000101317",
                                "Motivo": "" , //null,
                                "NIFCont": "" , //null,
                                "NomPContac": "" , //null,
                                "NomResPago": "" , //null,
                                "OfiVenta": "" , //null,
                                "OrgVenta": "" , //null,
                                "PARVW": "" , //"AG",
                                "PersonaContacto": "" , //null,
                                "Resultado": "" , //null,
                                "SPART": "" , //"08",
                                "SPART1": "" , //"08",
                                "Sector2": "" , //null,
                                "TRVOG ": "" , //"9",
                                "TelfCont": "" , //null,
                                "VBELN": "" , //"0100004420",
                                "VBTYP": "" , //"1",
                                "VGBEL": "" , //"0000238187",
                                "VKBUR": "" , //"1060",
                                "VKGRP": "" , //"",
                                "VKORG": "" , //"1000",
                                "VTWEG": "" , //"20",
                                "comentario": "" , //null,
                                "empresa": "" , //null,
                                "fechaF": "" , //null,
                                "fechaI": "" , //null,
                                "horaReclamoF": "" , //null,
                                "horaReclamoI": "" , //null,
                                "material2": "" , //null,
                                "numeroPedido": "" , //null
                            },
                            "DocComercial": {
                                "GBSTK": "" ,//"A",
                                "UVALL": "" ,//"C",
                                "VBELN": "" ,//"0100004420",
                                "VBOBJ": "" ,//"K",
                                "VBTYP": "" ,//"1"
                            },

                            "Interlocutor": {
                                    "AG":{
                                        "PARVW":"AG"
                                    },
                                    "ZM":{
                                        "PARVW":"ZM"
                                    },
                                    "VE":{
                                        "PARVW":"VE"
                                    }
                                    } ,

                            "Texto": {
                                    "0001":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                                    "0004":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                                    "Z006":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                                    "Z007":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                                    "Z008":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                                    "Z009":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                                    "Z010":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                                    "Z011":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                                    "Z012":{
                                        "CodTexto":"",
                                        "Descripcion":""
                                    },
                            } ,
                            

                            "Z_Reclamo": { //iNTERLOCUTOR AP
                                "PARVW":"AP",
                                "CANTRECLA1": "",
                                "CANTRECLA2": "",
                                "CMM1": "",
                                "CMM2": "",
                                "CMM3": "",
                                "CMM4": "" ,//"",
                                "CPOSTAL": "" ,//"LIMA 04",
                                "DIRECCION": "" ,//"direccion",
                                "DIRVKBUR": "" ,//"Av. La Molina 473 Ate - Lima",
                                "Descripcion": "" ,//null,
                                "FCHA1": "" ,//"2017-07-07T00:00:00",
                                "FCHA2": "" ,//"2017-07-07T00:00:00",
                                "FCHA3": "" ,//"2017-07-07T00:00:00",
                                "FCHA4": "" ,//"2017-07-07T00:00:00",
                                "MATNR": "" ,//"000000000011000004",
                                "MATNR2": "" ,//"000000000011000898",
                                "MATUM1": "" ,//"UN",
                                "MATUM2": "" ,//"M2",
                                "MONTORECLA1": "" ,//"357.00",
                                "MONTORECLA2": "" ,//"",
                                "NIF": "" ,//"",
                                "NMATNR": "" ,//null,
                                "NMATNR2": "" ,//null,
                                "PARVW": "" ,//null,
                                "PCONTACTO": "" ,//"nombre",
                                "RECLA": "" ,//"Reclamo Referencia",
                                "STAT1": "" ,//"",
                                "STAT2": "" ,//"",
                                "STAT3": "" ,//"",
                                "STAT4": "" ,//"",
                                "Status": "" ,//null,
                                "TELEFONO": "" ,//"telefono",
                                "USER1": "" ,//"",
                                "USER2": "" ,//"",
                                "USER3": "" ,//"",
                                "USER4": "" ,//"",
                                "UsuarioStatus": "" ,//null,
                                "VBELN": "" ,//"0100004420",
                                "VKBUR": "" ,//"1060",
                                "fechaSts": "" ,//null,
                                "material11": "" ,//null,
                                "material12": "" ,//null,
                                "material21": "" ,//null,
                                "material22": "" ,//null,
                                "numeroPedido": "" ,//null,
                                "pNumeroReclamo": "" ,//null,
                                "reclamoRef": "" ,//null
                            },
                            "Z_ReclamoVisita": [] ,
                        }, //Fin objReclamo


                    reclamo: [{
                            "Canal": "" ,//"20",
                            "CodDestMerc": "" ,//"{36}",
                            "CodECom": "" ,//"{40}",
                            "CodResPago": "" ,//"00001802",
                            "CodpDestMerc": "" ,//"{39}",
                            "CodpEmpresa": "" ,//"LIMA 03",
                            "CodpPContac": "" ,//"LIMA 04",
                            "Descripcion": "" ,//"{56}",
                            "DirDestMerc": "" ,//"{38}",
                            "DirEmpresa": "" ,//"PRUEBA",
                            "DirPContac": "" ,//"direccion",
                            "EmpresaDet": "" ,//"0000101317",
                            "JustificResul": "" ,//"001",
                            "Motivo": "" ,//"002",
                            "NIFCont": "" ,//"",
                            "NomCliente": "" ,//"",
                            "NomDestMerc": "" ,//"{37}",
                            "NomECom": "" ,//"{41}",
                            "NomEmpresa": "" ,//"",
                            "NomPContac": "" ,//"nombre",
                            "NomResPago": "" ,//"Pingo Moreno Julio Edgardo",
                            "OfiVenta": "" ,//"1060",
                            "OrgVenta": "" ,//"1000",
                            "PersonaContacto": "" ,//"nombre",
                            "Resultado": "" ,//"005",
                            "Sector": "" ,//"08",
                            "Status": "" ,//"0",
                            "TelfCont": "" ,//"telefono",
                            "TelfEmpre": "" ,//"",
                            "TextoDatosFacturacion": "" ,//"",
                            "TextoDiagnostico": "" ,//"",
                            "TextoMotivosOtros": "" ,//"",
                            "TextoNotaDireccion": "" ,//"",
                            "TextoPedidoReferencia": "" ,//"",
                            "TextoPersonaContacto": "" ,//"",
                            "TextoSeguimiento": "" ,//"",
                            "TextoSolucion": "" ,//"",
                            "TextoTratemInicial": "" ,//"",
                            "UsuarioStatus": "" ,//"{55}",
                            "codigoEmpResp": "" ,//"00001802",
                            "comentario": "" ,//"Factura/boleta",
                            "empresa": "" ,//"0000101317",
                            "fechaF": "" ,//"07/07/2017",
                            "fechaI": "" ,//"07/07/2017",
                            "fechaSts": "" ,//"{57}",
                            "horaReclamoF": "" ,//"10:03:17",
                            "horaReclamoI": "" ,//"10:03:17",

                            "lstJusti": [{
                                    "Codigo": "" ,//"",
                                    "Descripcion": "" ,//"",
                                    "TranspZone": "" ,//null,
                                    "conReferencia": "" ,//false
                                },
                                {
                                    "Codigo": "" ,//"005",
                                    "Descripcion": "" ,//"005::Fuerte competencia",
                                    "TranspZone": "" ,//null,
                                    "conReferencia": "" ,//false
                                }
                            ],

                            "mail": "" ,//"correo@hotmail.com",
                            "material1": "" ,//"",
                            "material2": "" ,//"",
                            "nombreEmpResp": "" ,//"Pingo Moreno Julio Edgardo",
                            "numeroPedido": "" ,//"0000238187",
                            "pNumeroReclamo": "" ,//"0100004420",
                            "reclamoRef": "" ,//"Reclamo Referencia",
                            "_nif": "" ,//"45454545"
                        }],

                        ///Fin Visualizar Reclamo

					 
					 	
 			};

 			if (oEvent.getParameter("name") == "appRecModificar") {

					this.getView().setModel(new JSONModel(oData));
					this.getView().getModel().setProperty("/dataIni",window.dataIni);
		            this.getView().getModel().refresh(true);
					this.getView().byId("dlg_rec_modificar_inicio").open();
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
            this.getView().getModel().refresh();    


            
		},

		onContinuarDlg_rec_modificar_inicio:function(){

			var numReclamo = this.getView().getModel().getProperty("/numReclamo") ;
			var result = reclamoServices.verReclamos(numReclamo);
					if(result.c === "s"){

						if(result.data.success){

							this.getView().getModel().setProperty("/reclamo", result.data.reclamo[0] ) ;
							this.getView().getModel().setProperty("/objReclamo", result.data.objReclamo ) ;
							this.getView().getModel().refresh();


							for( var i=0;i<result.data.objReclamo.Interlocutor.length;i++){
								if(result.data.objReclamo.Interlocutor[i].PARVW){
									this.getView().getModel().setProperty("/objReclamo/Interlocutor/"+result.data.objReclamo.Interlocutor[i].PARVW, result.data.objReclamo.Interlocutor[i]) ;
									this.getView().getModel().refresh();

									var ag = this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG");
								}
							}

							for( var i=0;i<result.data.objReclamo.Texto.length;i++){
								if(result.data.objReclamo.Texto[i].CodTexto){
									this.getView().getModel().setProperty("/objReclamo/Texto/"+result.data.objReclamo.Texto[i].CodTexto, result.data.objReclamo.Texto[i]) ;
									this.getView().getModel().refresh();

									var ag = this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG");
								}
							}
							console.log(this.getView().getModel().getProperty("/objReclamo/Interlocutor"));
							this.getView().byId("dlg_rec_modificar_inicio").close();

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


		},

        /////////////////////////////////////////////////////////////////

		onGuardarReclamo:function(){


			var guardarReclamo = {

							"material11": this.getView().getModel().getProperty("/reclamo/material1") ,
							"material12": this.getView().getModel().getProperty("/reclamo/material2") ,
							"material21": "" ,
							"material22": "" ,
							"cantRecla1": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA1") ,
							"cantRecla2": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA2") ,
							"reclamoRef": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/reclamoRef") ,
							"numeroPedido": this.getView().getModel().getProperty("/objReclamo/Contactos/VGBEL") ,
							"EmpresaDet": this.getView().getModel().getProperty("/objReclamo/Contactos/KUNNR") , //"0000101317" ,
							"NomCliente": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE") ,//"Cliente Eventual La Molina" ,
							"codigoEmpResp": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR") , //"00001802" ,
							"Motivo": this.getView().getModel().getProperty("/reclamo/Motivo") , //"A01" ,
							"Status": this.getView().getModel().getProperty("/reclamo/Status") , //"0" ,
							"Resultado": this.getView().getModel().getProperty("/reclamo/Resultado") , //"004" ,
							"JustificResul": this.getView().getModel().getProperty("/reclamo/JustificResul") , //"001" ,
							"OrgVenta": this.getView().getModel().getProperty("/objReclamo/Contactos/VKORG") , //"1000" ,
							"Canal": this.getView().getModel().getProperty("/objReclamo/Contactos/VTWEG") , //"10" ,
							"Sector": this.getView().getModel().getProperty("/objReclamo/Contactos/SPART") , //"00" ,
							"OfiVenta": this.getView().getModel().getProperty("/objReclamo/Contactos/VKBUR") , //"1010" ,
							"comentario": this.getView().getModel().getProperty("/reclamo/comentario") , //"" ,
							"pNumeroReclamo": this.getView().getModel().getProperty("/numReclamo") , //"0100004422" ,
							//enviar listaReclamo como array
							


							"pIndiceResultado": "5" ,


			};

			var modelo = "";
			if(this.getView().getModel().getProperty("/objReclamo/Texto/0001/Descripcion")){
				var modelo0001 = this.getView().getModel().getProperty("/objReclamo/Texto/0001/Descripcion");
			}else{
				var modelo0001 = "";
			}
			if(this.getView().getModel().getProperty("/objReclamo/Texto/0004/Descripcion")){
				var modelo0004 = this.getView().getModel().getProperty("/objReclamo/Texto/0004/Descripcion");
			}else{
				var modelo0004 = "";
			}
			if(this.getView().getModel().getProperty("/objReclamo/Texto/Z006/Descripcion")){
				var modeloZ006 = this.getView().getModel().getProperty("/objReclamo/Texto/Z006/Descripcion");
			}else{
				var modeloZ006 = "";
			}
			if(this.getView().getModel().getProperty("/objReclamo/Texto/Z007/Descripcion")){
				var modeloZ007 = this.getView().getModel().getProperty("/objReclamo/Texto/Z007/Descripcion");
			}else{
				var modeloZ007 = "";
			}
			if(this.getView().getModel().getProperty("/objReclamo/Texto/Z008/Descripcion")){
				var modeloZ008 = this.getView().getModel().getProperty("/objReclamo/Texto/Z008/Descripcion");
			}else{
				var modeloZ008 = "";
			}
			if(this.getView().getModel().getProperty("/objReclamo/Texto/Z009/Descripcion")){
				var modeloZ009 = this.getView().getModel().getProperty("/objReclamo/Texto/Z009/Descripcion");
			}else{
				var modeloZ009 = "";
			}
			if(this.getView().getModel().getProperty("/objReclamo/Texto/Z010/Descripcion")){
				var modeloZ010 = this.getView().getModel().getProperty("/objReclamo/Texto/Z010/Descripcion");
			}else{
				var modeloZ010 = "";
			}
			if(this.getView().getModel().getProperty("/objReclamo/Texto/Z011/Descripcion")){
				var modeloZ011 = this.getView().getModel().getProperty("/objReclamo/Texto/Z011/Descripcion");
			}else{
				var modeloZ011 = "";
			}
			if(this.getView().getModel().getProperty("/objReclamo/Texto/Z012/Descripcion")){
				var modeloZ012 = this.getView().getModel().getProperty("/objReclamo/Texto/Z012/Descripcion");
			}else{
				var modeloZ012 = "";
			}
			///////////////////////////////////////////////////////////////////////////////////////////////////////

			var listaReclamo=[{
											"pNumeroReclamo": this.getView().getModel().getProperty("/numReclamo") , //"0100004422",
											"fechaI": "2017-07-07T05:00:00.000Z" , //"2017-07-07T05:00:00.000Z",
											"fechaF": "2017-07-07T05:00:00.000Z" , //"2017-07-07T05:00:00.000Z",
											"horaReclamoI": "16:59:29" , //"16:59:29",
											"horaReclamoF": "16:59:29" , //"16:59:29",
											"empresa": this.getView().getModel().getProperty("/objReclamo/Contactos/KUNNR") , //"0000101317",
											"numeroPedido": this.getView().getModel().getProperty("/objReclamo/Contactos/VGBEL") , //"0000238187",
											"comentario": this.getView().getModel().getProperty("/reclamo/comentario") , //"",
											"material1": this.getView().getModel().getProperty("/reclamo/material1") , //"11000004",
											"material2": this.getView().getModel().getProperty("/reclamo/material2") , //"11000898",
											"material11": this.getView().getModel().getProperty("/reclamo/material1") , //"11000004",
											"material12": this.getView().getModel().getProperty("/reclamo/material2") , //"11000898",
											"material21": "" , //"",
											"material22": "" , //"",
											"cantRecla1": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA1") , //"1.000",
											"cantRecla2": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA2") , //"2.000",
											"montoRecla1": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/MONTORECLA1") , //"357.00",
										    "montoRecla2": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/MONTORECLA2") ,
										    "reclamoRef": this.getView().getModel().getProperty("/reclamo/reclamoRef") , //"",
										    "TextoTratemInicial": modelo0001 , //"gggg",
											"TextoNotaDireccion": modelo0004 , //"gggg",
											"TextoSeguimiento": modeloZ006 , //"ggg",
											"TextoDiagnostico": modeloZ007 , //"ggg",
											"TextoSolucion": modeloZ008 , //"ggg",
											"TextoPersonaContacto": modeloZ009 , //"ggg",
											"TextoDatosFacturacion": modeloZ010 , //"",
											"TextoPedidoReferencia": modeloZ011 , //"",
											"TextoMotivosOtros": modeloZ012 , //"_",
											"mail": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Mail") , //"",
											"_nif": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NIF") , //"45454545",
											"PersonaContacto": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO") , //"Cliente Eventual La Molina",
											"NomPContac": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO") , //"Cliente Eventual La Molina",
											"DirPContac": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/DIRECCION") , //"PRUEBA",
											"NIFCont": "" , //"",
											"TelfCont": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/TELEFONO") , //"123",
											"CodpPContac": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL") , //"LIMA 03",
											"NomCliente": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE") , //"Cliente Eventual La Molina",
											"EmpresaDet": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/KUNNR") , //"0000101317",
											"NomEmpresa": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE") , //"Cliente Eventual La Molina",
											"DirEmpresa": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Direccion") , //"PRUEBA",
											"TelfEmpre": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Telefono") , //"",
											"CodpEmpresa": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Ciudad") , //"LIMA 03",
											"CodDestMerc": this.getView().getModel().getProperty("/reclamo/CodDestMerc") , //"{36}",
											"NomDestMerc": this.getView().getModel().getProperty("/reclamo/NomDestMerc") , //"",
											"DirDestMerc": this.getView().getModel().getProperty("/reclamo/DirDestMerc") , //"{38}",
											"CodpDestMerc": this.getView().getModel().getProperty("/reclamo/CodpDestMerc") , //"{39}",
											"CodECom": this.getView().getModel().getProperty("/reclamo/CodECom") , //"{40}",
											"NomECom": this.getView().getModel().getProperty("/reclamo/NomECom") , //"{41}",
											"codigoEmpResp": this.getView().getModel().getProperty("/reclamo/codigoEmpResp") , //"00001802",
											"nombreEmpResp": this.getView().byId("cbo_asesor").getSelectedItem().getText() , //"Pingo Moreno Julio Edgardo",
											"CodResPago": this.getView().getModel().getProperty("/reclamo/codigoEmpResp") , //"00001802",
											"NomResPago": this.getView().byId("cbo_asesor").getSelectedItem().getText() , //"Pingo Moreno Julio Edgardo",
											"OrgVenta": this.getView().getModel().getProperty("/objReclamo/Contactos/VKORG") , //"1000",
											"Canal": this.getView().getModel().getProperty("/objReclamo/Contactos/VTWEG") , //"10",
											"OfiVenta": this.getView().getModel().getProperty("/objReclamo/Contactos/VKBUR") , //"1010",
											"Motivo": this.getView().getModel().getProperty("/reclamo/Motivo") , //"A01",
											"Resultado": this.getView().getModel().getProperty("/reclamo/Resultado") , //"004",
											"JustificResul": this.getView().getModel().getProperty("/reclamo/JustificResul") , //"001",
											"Sector": this.getView().getModel().getProperty("/objReclamo/Contactos/SPART") , //"00",
											"Status": this.getView().getModel().getProperty("/reclamo/Status") , //"0",
											"UsuarioStatus": this.getView().getModel().getProperty("/reclamo/UsuarioStatus") , //"{55}",
											"Descripcion": this.getView().getModel().getProperty("/reclamo/Descripcion") , //"{56}",
											"fechaSts": this.getView().getModel().getProperty("/reclamo/fechaI") , //"2017-07-07T05:00:00.000Z"


									}];

      		var listaIntJson=[

      										{"id":1,
											"PedidoId":0,
											"Funcion":"AG",
											"Codigo": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/KUNNR") , //"0000101317",
											"Ruc": "" , //"",
											"Descripcion": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE") , //"Cliente Eventual La Molina",
											"Titulo": "" , //"",
									/**/	"Direccion": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Direccion") , //"PRUEBA",
											"DireccionCompleta": "" , //"",
									/**/	"Ciudad": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Ciudad") , //"LIMA 03",
											"Pais": "" , //"",
							/*CodPostal*/	"CodigoPostal": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/CodPostal"),
											"Distrito": "" , //"",
									/**/	"Telefono": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Telefono") , //"",
									/**/	"Mail": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Mail") , //"",
											"PersonaFisica":false,
							/*EsVentual*/	"Eventual": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/EsVentual"),
											"CodPersona": "" , //"",
											"Nombre": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE") , //"Cliente Eventual La Molina",
									/**/	"ADRNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/ADRNR") , //"9001046443",
											"DescripcionP": "" , //"",
									/**/	"POSNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/POSNR") , //"000000",
									/**/	"PARVW": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/PARVW"),
									/**/	"NOMBRE": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE") , //"Cliente Eventual La Molina",
											"Name1": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE") , //"Cliente Eventual La Molina",
									/**/	"Calle": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Calle") , //"PRUEBA",
									/**/	"KUNNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/KUNNR") , //"0000101317",
											"CPOSTAL": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Ciudad") , //"LIMA 03",
											"CodPostal": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Ciudad") , //"LIMA 03",
											"DIRECCION": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Direccion") , //"PRUEBA",
											"PCONTACTO": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE") , //"Cliente Eventual La Molina"},
										},
											{"id":2,
											"PedidoId":0,
											"Funcion":"ZM",
											"Codigo": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR") ,
											"Ruc": "",
											"Descripcion": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/NOMBRE") , //"Pingo Moreno Julio Edgardo",
											"Titulo": "",
									/**/	"Direccion": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Direccion") , //"",
											"DireccionCompleta": "",
											"Ciudad": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Ciudad") , //"",
											"Pais": "",
							/*CodPostal*/	"CodigoPostal": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/CodPostal") , //"",
											"Distrito": "",
									/**/	"Telefono": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Telefono") , //"",
									/**/	"Mail": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Mail") , //"",
											"PersonaFisica":false,
							/*EsVentual*/	"Eventual": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/EsVentual") ,
											"CodPersona": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR") , //"00001802",
											"Nombre": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/NOMBRE") , //"Pingo Moreno Julio Edgardo",
									/**/	"ADRNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/ADRNR") , //"",
											"DescripcionP": "",
									/**/	"POSNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/POSNR") , //"000000",
									/**/	"PARVW": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PARVW") , //"ZM",
									/**/	"NOMBRE": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/NOMBRE") , //"Pingo Moreno Julio Edgardo",
									/**/	"Name1": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Name1") , //"Pingo Moreno Julio Edgardo",
									/**/	"PERNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR") , //"00001802",
											"PCONTACTO": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/NOMBRE") , //"Pingo Moreno Julio Edgardo"},
										},
											{"id":3,
											"PedidoId":0,
											"Funcion":"AP",
											"Codigo": this.getView().getModel().getProperty("/objReclamo/Contactos/KUNNR") , //"0000101317",
											"Ruc": "",
											"Descripcion": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO") , //"Cliente Eventual La Molina",
											"Titulo": "",
											"Direccion": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/Direccion") , //"PRUEBA", //error array
											"DireccionCompleta": "",
											"Ciudad": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL") , //"LIMA 03",
											"Pais": "PE",
											"CodigoPostal": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL") , //"LIMA 03",
											"Distrito": "",
											"Telefono": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/TELEFONO") , //"123",
											"Mail": "",
											"PersonaFisica":false,
											"Eventual": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/EsVentual"),
											"CodPersona": "",
											"Nombre": "",
											"ADRNR": "",
											"DescripcionP": "",
											"POSNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/KUNNR") , //"000000",
											"PARVW": "AP",
											"NOMBRE": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO") , //"Cliente Eventual La Molina",
											"Name1": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO") , //"Cliente Eventual La Molina",
											"Calle": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/DIRECCION") , //"PRUEBA", //error array
											"KUNNR": this.getView().getModel().getProperty("/objReclamo/Contactos/KUNNR") , //"0000101317",
											"CPOSTAL": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL") , //"LIMA 03",
											"CodPostal": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL") , //"LIMA 03",
											"DIRECCION": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/DIRECCION") , //"PRUEBA", //error array
											"TELEFONO": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/TELEFONO") , //"123",
											"PCONTACTO": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO") , //"Cliente Eventual La Molina"
										}


      ];


			var listaIntJsonLleno = JSON.stringify(listaIntJson);
			var listaReclamoLleno = JSON.stringify(listaReclamo);

					 	console.log(guardarReclamo) ;

					 	var result = reclamoServices.guardarReclamo(guardarReclamo, listaReclamoLleno, listaIntJsonLleno);
                                    if(result.c === "s"){

                                        if(result.data.success){

                                            //////////////////////////////////////////////////
                                            this.getView().byId("dlg_MensajeAvisoGeneralReclamo").open();
                                            this.getView().byId("txt_aviso_general_reclamo").setText("Se modificó el reclamo con el número: "+result.data.nroRec);
                                            //////////////////////////////////////////////////////


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

		},

        onOkDlg_MensajeAvisoGeneralReclamo:function(){
            this.getView().byId("dlg_MensajeAvisoGeneralReclamo").close();
        },


        ///////////////////////////////////////////////////////////////////////77
		goHome:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
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
        //Abrir Dialog Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.getView().byId("dlg_buscar_rec_nuevo").open()
        },
        onDocReclamoBuscarClienteAccion: function (oEvent) {
            var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
            var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();

            if (ruc || nombre) {

                var result = reclamoServices.buscarCliente(ruc, nombre);

                if (result.c === "s") {

                    if (result.data.success) {

                        this.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
                        this.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
                        this.getView().getModel().refresh();

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

                console.log(result);
            } else {
                sap.m.MessageToast.show('Ingrese RUC ó Razón social', {
                    duration: 1000
                });
                return;
            }
            

        },
        SeleccionaCliente: function (evt) {
            this.getView().byId("dlg_buscar_rec_nuevo").close()
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/clienteSeleccionado", obj);
            var result = reclamoServices.reemplazarCiente(obj.codigo);
             if(result.c === "s"){

                        if(result.data.success){
                            this.getView().getModel().refresh();
                            for( var i=0;i<result.data.Interlocutores.length;i++){
                                if(result.data.Interlocutores[i].Funcion="AG"){
                                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/KUNNR",result.data.Interlocutores[0].Cliente.Codigo) ;
                                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/NOMBRE",result.data.Interlocutores[0].Cliente.Descripcion);
                                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/Direccion",result.data.Interlocutores[0].Cliente.Direccion);
                                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/Ciudad",result.data.Interlocutores[0].Cliente.CodigoPostal);
                                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/Telefono",result.data.Interlocutores[0].Cliente.Telefono);
                                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/NIF",result.data.Interlocutores[0].Cliente.Ruc);
                                    this.getView().getModel().setProperty("/reclamo/mail",result.data.Interlocutores[0].Cliente.Mail);
                                    this.getView().getModel().refresh();
                                }
                            }
                            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();

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
        onCopiarCliente: function () {
            var codigo = this.getView().byId("txt_codigo").getValue();
            var result = reclamoServices.reemplazarCiente(codigo);
            if(result){
                this.getView().getModel().setProperty("/objReclamo/Z_Reclamo/PCONTACTO",result.data.Interlocutores[0].Cliente.Descripcion);
                this.getView().getModel().setProperty("/objReclamo/Z_Reclamo/DIRECCION",result.data.Interlocutores[0].Cliente.Direccion);
                this.getView().getModel().setProperty("/objReclamo/Z_Reclamo/CPOSTAL",result.data.Interlocutores[0].Cliente.CodigoPostal);
                this.getView().getModel().setProperty("/objReclamo/Z_Reclamo/TELEFONO",result.data.Interlocutores[0].Cliente.Telefono);
            }
        }   
	});

});
