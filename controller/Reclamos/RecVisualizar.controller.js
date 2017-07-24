sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"pe/com/seidor/sap/decor/ventas/services/reclamoServices"
], function (Controller, MessageToast, UIComponent,JSONModel, reclamoServices) {
	"use strict";

	return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Reclamos.RecVisualizar", {

		onInit: function() {
			
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.attachRoutePatternMatched(this.onRouteMatched, this);		

		},
		//Pendientes:
			//--Asesor
			//--Factura / Boleta
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

            if (oEvent.getParameter("name") == "appRecVisualizar") {

					this.getView().setModel(new JSONModel(oData));
					this.getView().getModel().setProperty("/dataIni",window.dataIni);
		            this.getView().getModel().refresh(true);
					this.getView().byId("dlg_rec_nuevo_inicio").open();
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
            this.getView().getModel().setProperty("/nombre","Visualizar Reclamo");
            this.getView().getModel().refresh();    
		},
		onContinuarDlg_rec_nuevo_inicio:function()
        {
			var numReclamo = this.getView().getModel().getProperty("/numReclamo") ;
			var result = reclamoServices.verReclamos(numReclamo);
				if(result.c === "s")
                {
					if(result.data.success)
                    {
						this.getView().getModel().setProperty("/reclamo", result.data.reclamo[0] ) ;
						this.getView().getModel().setProperty("/objReclamo", result.data.objReclamo ) ;
						this.getView().getModel().refresh();
						for( var i=0;i<result.data.objReclamo.Interlocutor.length;i++)
                        {
							if(result.data.objReclamo.Interlocutor[i].PARVW)
                            {
								this.getView().getModel().setProperty("/objReclamo/Interlocutor/"+result.data.objReclamo.Interlocutor[i].PARVW, result.data.objReclamo.Interlocutor[i]) ;
								this.getView().getModel().refresh();
								var ag = this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG");
							}
						}
						for( var i=0;i<result.data.objReclamo.Texto.length;i++)
                        {
							if(result.data.objReclamo.Texto[i].CodTexto)
                            {
								this.getView().getModel().setProperty("/objReclamo/Texto/"+result.data.objReclamo.Texto[i].CodTexto, result.data.objReclamo.Texto[i]) ;
								this.getView().getModel().refresh();
								var ag = this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG");
							}
						}
						console.log(this.getView().getModel().getProperty("/objReclamo/Interlocutor"));
						this.getView().byId("dlg_rec_nuevo_inicio").close();
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
					if(result.m == "error : Not Found")
                    {
                        sap.m.MessageToast.show("Reclamo no encontrado", {
                           duration: 3000
                        });
                    }
                    else
                    {
                        sap.m.MessageToast.show("Ingrese número de reclamo correcto", {
                           duration: 3000
                        });   
                    }
				}
		},
		goHome:function()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
        },
		onCloseDlgRecNuevo: function(oEvent)
        {
                this.getView().byId("dlg_rec_nuevo_inicio").close()
        },
		onOpenDlgBuscarRecNuevo:function()
        {
			this.getView().byId("dlg_buscar_rec_nuevo").open();
		},  
		onCloseDlgBuscarRecNuevo:function()
        {
			this.getView().byId("dlg_buscar_rec_nuevo").close();
		},    
		onListMasterDatos : function(oEvent) 
        {
			var obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            if(obj.codigo===1)
            {
                this.byId("SplitAppId").to(this.createId("pag_rec_nuevo_reclamo"));
            }
            if(obj.codigo===2)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_interlocutores"));
            }
            if(obj.codigo===3)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_datos_reclamo"));
            }
            if(obj.codigo===4)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_cambiar_status"));
            }
		},
	});
});
