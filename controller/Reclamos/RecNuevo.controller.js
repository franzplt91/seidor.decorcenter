sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/reclamoServices"
], function (Controller, MessageToast, UIComponent, JSONModel, reclamoServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Reclamos.RecNuevo", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            var oData = {
                numReclamo: "",
                crearReclamo: {
                    "pNumPedido": "",
                    "accion": "ver",
                    "modo": "reclamo"
                },
                ////////Documento Ventas///////////////
                docVentas: {
                },
                ////////Fin Documento Ventas//////////////
                /////////Crear Reclamo/////////////////////
                retornoPedido: [],
                ////////Fin Crear Reclamo/////////////////
                ///////Inicio Visualizar Reclamo///////////
                objReclamo: {
                    "Contactos": {
                        "AEDAT": "", //"0001-01-01T00:00:00",
                        "AENAM": "", //"",
                        "AEZET": "", //"",
                        "Canal": "", //null,
                        "CodpPContac": "", //null,
                        "DIRECTION": "", //"",
                        "DirPContac": "", //null,
                        "ERDAT": "", //"2017-07-07T00:00:00",
                        "ERNAM": "", //"Julio Edgard",
                        "ERZET": "", //"10:16:01",
                        "GBSTK": "", //"A",
                        "JustificResul": "", //null,
                        "KTAAR": "", //"R001",
                        "KTABG": "", //"2017-07-07T00:00:00",
                        "KTABT": "", //"10:03:17",
                        "KTAEB": "", //"001",
                        "KTAEN": "", //"2017-07-07T00:00:00",
                        "KTAER": "", //"005",
                        "KTAET": "", //"10:03:17",
                        "KTAFK": "", //"R001",
                        "KTAGR": "", //"002",
                        "KTARA": "", //null,
                        "KTAST": "", //"0",
                        "KTEXT": "", //"Factura/boleta",
                        "KTEXT_MC": "", //"238187/0011000898",
                        "KTEXT_MC_LANGU": "", //"E",
                        "KUNNR": "", //"0000101317",
                        "Motivo": "", //null,
                        "NIFCont": "", //null,
                        "NomPContac": "", //null,
                        "NomResPago": "", //null,
                        "OfiVenta": "", //null,
                        "OrgVenta": "", //null,
                        "PARVW": "", //"AG",
                        "PersonaContacto": "", //null,
                        "Resultado": "", //null,
                        "SPART": "", //"08",
                        "SPART1": "", //"08",
                        "Sector2": "", //null,
                        "TRVOG ": "", //"9",
                        "TelfCont": "", //null,
                        "VBELN": "", //"0100004420",
                        "VBTYP": "", //"1",
                        "VGBEL": "", //"0000238187",
                        "VKBUR": "", //"1060",
                        "VKGRP": "", //"",
                        "VKORG": "", //"1000",
                        "VTWEG": "", //"20",
                        "comentario": "", //null,
                        "empresa": "", //null,
                        "fechaF": "", //null,
                        "fechaI": "", //null,
                        "horaReclamoF": "", //null,
                        "horaReclamoI": "", //null,
                        "material2": "", //null,
                        "numeroPedido": "", //null
                    },
                    "DocComercial": {
                        "GBSTK": "", //"A",
                        "UVALL": "", //"C",
                        "VBELN": "", //"0100004420",
                        "VBOBJ": "", //"K",
                        "VBTYP": "", //"1"
                    },
                    "Interlocutor": {
                        "AG": {
                            "PARVW": "AG"
                        },
                        "ZM": {
                            "PARVW": "ZM"
                        },
                        "VE": {
                            "PARVW": "VE"
                        }
                    },
                    "Texto": {
                        "0001": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "0004": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "Z006": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "Z007": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "Z008": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "Z009": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "Z010": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "Z011": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "Z012": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                    },
                    "Z_Reclamo": {//iNTERLOCUTOR AP
                        "PARVW": "AP",
                        "CANTRECLA1": "",
                        "CANTRECLA2": "",
                        "CMM1": "",
                        "CMM2": "",
                        "CMM3": "",
                        "CMM4": "", //"",
                        "CPOSTAL": "", //"LIMA 04",
                        "DIRECCION": "", //"direccion",
                        "DIRVKBUR": "", //"Av. La Molina 473 Ate - Lima",
                        "Descripcion": "", //null,
                        "FCHA1": "", //"2017-07-07T00:00:00",
                        "FCHA2": "", //"2017-07-07T00:00:00",
                        "FCHA3": "", //"2017-07-07T00:00:00",
                        "FCHA4": "", //"2017-07-07T00:00:00",
                        "MATNR": "", //"000000000011000004",
                        "MATNR2": "", //"000000000011000898",
                        "MATUM1": "", //"UN",
                        "MATUM2": "", //"M2",
                        "MONTORECLA1": "", //"357.00",
                        "MONTORECLA2": "", //"",
                        "NIF": "", //"",
                        "NMATNR": "", //null,
                        "NMATNR2": "", //null,
                        "PARVW": "", //null,
                        "PCONTACTO": "", //"nombre",
                        "RECLA": "", //"Reclamo Referencia",
                        "STAT1": "", //"",
                        "STAT2": "", //"",
                        "STAT3": "", //"",
                        "STAT4": "", //"",
                        "Status": "", //null,
                        "TELEFONO": "", //"telefono",
                        "USER1": "", //"",
                        "USER2": "", //"",
                        "USER3": "", //"",
                        "USER4": "", //"",
                        "UsuarioStatus": "", //null,
                        "VBELN": "", //"0100004420",
                        "VKBUR": "", //"1060",
                        "fechaSts": "", //null,
                        "material11": "", //null,
                        "material12": "", //null,
                        "material21": "", //null,
                        "material22": "", //null,
                        "numeroPedido": "", //null,
                        "pNumeroReclamo": "", //null,
                        "reclamoRef": "", //null
                    },
                    "Z_ReclamoVisita": [],
                }, //Fin objReclamo
                reclamo: [{
                        "enabled": true,
                        "visible": true,
                        "Canal": "", //"20",
                        "CodDestMerc": "", //"{36}",
                        "CodECom": "", //"{40}",
                        "CodResPago": "", //"00001802",
                        "CodpDestMerc": "", //"{39}",
                        "CodpEmpresa": "", //"LIMA 03",
                        "CodpPContac": "", //"LIMA 04",
                        "Descripcion": "", //"{56}",
                        "DirDestMerc": "", //"{38}",
                        "DirEmpresa": "", //"PRUEBA",
                        "DirPContac": "", //"direccion",
                        "EmpresaDet": "", //"0000101317",
                        "JustificResul": "", //"001",
                        "Motivo": "", //"002",
                        "NIFCont": "", //"",
                        "NomCliente": "", //"",
                        "NomDestMerc": "", //"{37}",
                        "NomECom": "", //"{41}",
                        "NomEmpresa": "", //"",
                        "NomPContac": "", //"nombre",
                        "NomResPago": "", //"Pingo Moreno Julio Edgardo",
                        "OfiVenta": "", //"1060",
                        "OrgVenta": "", //"1000",
                        "PersonaContacto": "", //"nombre",
                        "Resultado": "", //"005",
                        "Sector": "", //"08",
                        "Status": "", //"0",
                        "TelfCont": "", //"telefono",
                        "TelfEmpre": "", //"",
                        "TextoDatosFacturacion": "", //"",
                        "TextoDiagnostico": "", //"",
                        "TextoMotivosOtros": "", //"",
                        "TextoNotaDireccion": "", //"",
                        "TextoPedidoReferencia": "", //"",
                        "TextoPersonaContacto": "", //"",
                        "TextoSeguimiento": "", //"",
                        "TextoSolucion": "", //"",
                        "TextoTratemInicial": "", //"",
                        "UsuarioStatus": "", //"{55}",
                        "codigoEmpResp": "", //"00001802",
                        "comentario": "", //"Factura/boleta",
                        "empresa": "", //"0000101317",
                        "fechaF": "", //"07/07/2017",
                        "fechaI": "", //"07/07/2017",
                        "fechaSts": "", //"{57}",
                        "horaReclamoF": "", //"10:03:17",
                        "horaReclamoI": "", //"10:03:17",
                        "lstJusti": [{
                                "Codigo": "", //"",
                                "Descripcion": "", //"",
                                "TranspZone": "", //null,
                                "conReferencia": "", //false
                            },
                            {
                                "Codigo": "", //"005",
                                "Descripcion": "", //"005::Fuerte competencia",
                                "TranspZone": "", //null,
                                "conReferencia": "", //false
                            }
                        ],
                        "mail": "", //"correo@hotmail.com",
                        "material1": "", //"",
                        "material2": "", //"",
                        "nombreEmpResp": "", //"Pingo Moreno Julio Edgardo",
                        "numeroPedido": "", //"0000238187",
                        "pNumeroReclamo": "", //"0100004420",
                        "reclamoRef": "", //"Reclamo Referencia",
                        "_nif": "", //"45454545"
                    }],
                ///Fin Visualizar Reclamo
            };
            if (oEvent.getParameter("name") == "appRecNuevo") {
                this.getView().byId("SplitAppId").setMode("HideMode");
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_rec_nuevo_inicio").open();
            }
            ;
            var tipoCabecera = [];
            tipoCabecera.push({
                codigo: 1,
                descripcion: 'Reclamo Nuevo'
            });
            tipoCabecera.push({
                codigo: 2,
                descripcion: 'Interlocutores'
            });
            tipoCabecera.push({
                codigo: 3,
                descripcion: 'Datos Reclamo'
            });
            tipoCabecera.push({
                codigo: 4,
                descripcion: 'Cambiar Status'
            });
            this.getView().getModel().setProperty("/tipoCabeceraModel", tipoCabecera);
            this.getView().getModel().setProperty("/nombre", "Nuevo Reclamo");
            this.getView().getModel().refresh();
        },
        onContinuarDlg_rec_nuevo_inicio: function ()
        {
            var crearReclamo = this.getView().getModel().getProperty("/crearReclamo");
            var result1 = reclamoServices.documentoVentas(crearReclamo);
            if (result1.c === "s")
            {
                if (result1.data.success)
                {
                    var pNumPedido = this.getView().getModel().getProperty("/crearReclamo/pNumPedido");
                    this.getView().getModel().setProperty("/docVentas", result1.data);
                    this.getView().getModel().refresh();
                    var docVentas = this.getView().getModel().getProperty("/docVentas");
                    ///////////Set Modelo ///////////////////////////////////////////////////////////
                    /*Persona de Contacto*/
                    this.getView().getModel().setProperty("/objReclamo/Contactos/VGBEL", pNumPedido);
                    this.getView().getModel().setProperty("/objReclamo/Contactos/KUNNR", docVentas.objCliente.Codigo);
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/NOMBRE", docVentas.objCliente.Descripcion);
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/ZM/PERNR", docVentas.CodVendedor1);
                    /*Código de Asesor*/
                    this.getView().getModel().setProperty("/reclamo/Motivo", "V05");
                    this.getView().getModel().setProperty("/reclamo/Status", "0");
                    this.getView().getModel().setProperty("/reclamo/Resultado", "004");
                    this.getView().getModel().setProperty("/reclamo/JustificResul", "001");
                    /*Enc. Comercial*/
                    this.getView().getModel().setProperty("/objReclamo/Contactos/VKORG", "1000");
                    this.getView().getModel().setProperty("/objReclamo/Contactos/VTWEG", "10");
                    this.getView().getModel().setProperty("/objReclamo/Contactos/SPART", "00");
                    this.getView().getModel().setProperty("/objReclamo/Contactos/VKBUR", "1010");
                    /*Interlocutor AG*/
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/KUNNR", docVentas.objCliente.Codigo);
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/NOMBRE", docVentas.objCliente.Descripcion);
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/Direccion", docVentas.objPedido.Interlocutores[0].Cliente.Direccion);
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/CodPostal", docVentas.objPedido.Interlocutores[0].Cliente.CodigoPostal);
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/Telefono", docVentas.objPedido.Interlocutores[0].Cliente.Telefono);
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/NIF", docVentas.objPedido.Interlocutores[0].Cliente.Ruc); /*NIF Preguntar*/
                    this.getView().getModel().setProperty("/reclamo/mail", docVentas.objPedido.Interlocutores[0].Cliente.Mail);
                    /*Interlocutor AP*/
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/ZM/NOMBRE", docVentas.NomVendedor1);
                    /*Interlocutor VE*/
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/VE/KUNNR", docVentas.objPedido.Interlocutores[3].Persona.CodPersona);
                    this.getView().getModel().setProperty("/objReclamo/Interlocutor/VE/NOMBRE", docVentas.objPedido.Interlocutores[3].Persona.Descripcion);
                    /*Status*/
                    this.getView().getModel().setProperty("/reclamo/Status", "0");
                    this.getView().getModel().setProperty("/reclamo/fechaI", docVentas.FechaValidez);
                    ////////////Fin Set Modelo/////////////////////////////////////////////////////////////////////
                    console.log("//DocVentas/////////////////////////////");
                    console.log(this.getView().getModel().getProperty("/docVentas"));
                    var result = reclamoServices.crearReclamo(crearReclamo);
                    if (result.c === "s")
                    {
                        if (result.data.success)
                        {
                            //////////////////////////////////////////////////////////////////
                            //////////////////////////////////////////////////////////////////
                            //docVentas objPedido Detalle CodMaterialCorto DescMaterial
                            this.getView().getModel().setProperty("/retornoPedido", result.data.reclamo);
                            this.getView().getModel().refresh();
                            this.getView().byId("dlg_rec_nuevo_inicio").close();
                            /////////////////////////////////////////////////////////////////
                            /////////////////////////////////////////////////////////////////
                        } else
                        {
                            sap.m.MessageToast.show(result.data.errors.reason, {
                                duration: 3000
                            });
                        }
                    } else
                    {
                        sap.m.MessageToast.show(result.m, {
                            duration: 3000
                        });
                    }
                } else
                {
                    sap.m.MessageToast.show(result1.data.errors.reason, {
                        duration: 3000
                    });
                }
            } else
            {
                sap.m.MessageToast.show(result1.m, {
                    duration: 3000
                });
            }
        },
        /////////////////////////////////////////////////////////////////////
        onGuardarReclamo: function () {
            //////////////////////////////////////////////////////////////////////////////////////////////////
            var indice_resultado = this.getView().byId("cbo_Resultado").getSelectedItem();
            var pIndiceResultado = indice_resultado.mProperties.key
            if (this.getView().getModel().getProperty("/reclamo/material1"))
            {
                var material1Model = this.getView().getModel().getProperty("/reclamo/material1");
            } else
            {
                var material1Model = "";
            }
            if (this.getView().getModel().getProperty("/reclamo/material2"))
            {
                var material2Model = this.getView().getModel().getProperty("/reclamo/material2");
            } else
            {
                var material2Model = "";
            }
            if (this.getView().getModel().getProperty("/reclamo/comentario"))
            {
                var comentarioModel = this.getView().getModel().getProperty("/reclamo/comentario");
            } else
            {
                var comentarioModel = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA1"))
            {
                var cantRecla1Model = this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA1");
            } else
            {
                var cantRecla1Model = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA2"))
            {
                var cantRecla2Model = this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA2");
            } else
            {
                var cantRecla2Model = "";
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            var guardarReclamo =
                    {
                        "material11": material1Model,
                        "material12": material2Model,
                        "material21": "",
                        "material22": "",
                        "cantRecla1": cantRecla1Model,
                        "cantRecla2": cantRecla2Model,
                        "reclamoRef": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/reclamoRef"),
                        "numeroPedido": this.getView().getModel().getProperty("/objReclamo/Contactos/VGBEL"),
                        "EmpresaDet": this.getView().getModel().getProperty("/objReclamo/Contactos/KUNNR"), //"0000101317" ,
                        "NomCliente": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE"), //"Cliente Eventual La Molina" ,
                        "codigoEmpResp": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR"), //"00001802" ,
                        "Motivo": this.getView().getModel().getProperty("/reclamo/Motivo"), //"A01" ,
                        "Status": this.getView().getModel().getProperty("/reclamo/Status"), //"0" ,
                        "Resultado": this.getView().getModel().getProperty("/reclamo/Resultado"), //"004" ,
                        "JustificResul": this.getView().getModel().getProperty("/reclamo/JustificResul"), //"001" ,
                        "OrgVenta": this.getView().getModel().getProperty("/objReclamo/Contactos/VKORG"), //"1000" ,
                        "Canal": this.getView().getModel().getProperty("/objReclamo/Contactos/VTWEG"), //"10" ,
                        "Sector": this.getView().getModel().getProperty("/objReclamo/Contactos/SPART"), //"00" ,
                        "OfiVenta": this.getView().getModel().getProperty("/objReclamo/Contactos/VKBUR"), //"1010" ,
                        "comentario": comentarioModel, //"" ,
                        "pNumeroReclamo": this.getView().getModel().getProperty("/numReclamo"), //"0100004422" ,
                        //enviar listaReclamo como array
                        "pIndiceResultado": pIndiceResultado.substr(2),
                    };
            var modelo = "";
            if (this.getView().getModel().getProperty("/objReclamo/Texto/0001/Descripcion"))
            {
                var modelo0001 = this.getView().getModel().getProperty("/objReclamo/Texto/0001/Descripcion");
            } else
            {
                var modelo0001 = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Texto/0004/Descripcion"))
            {
                var modelo0004 = this.getView().getModel().getProperty("/objReclamo/Texto/0004/Descripcion");
            } else
            {
                var modelo0004 = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Texto/Z006/Descripcion"))
            {
                var modeloZ006 = this.getView().getModel().getProperty("/objReclamo/Texto/Z006/Descripcion");
            } else
            {
                var modeloZ006 = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Texto/Z007/Descripcion"))
            {
                var modeloZ007 = this.getView().getModel().getProperty("/objReclamo/Texto/Z007/Descripcion");
            } else
            {
                var modeloZ007 = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Texto/Z008/Descripcion"))
            {
                var modeloZ008 = this.getView().getModel().getProperty("/objReclamo/Texto/Z008/Descripcion");
            } else
            {
                var modeloZ008 = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Texto/Z009/Descripcion"))
            {
                var modeloZ009 = this.getView().getModel().getProperty("/objReclamo/Texto/Z009/Descripcion");
            } else
            {
                var modeloZ009 = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Texto/Z010/Descripcion"))
            {
                var modeloZ010 = this.getView().getModel().getProperty("/objReclamo/Texto/Z010/Descripcion");
            } else
            {
                var modeloZ010 = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Texto/Z011/Descripcion"))
            {
                var modeloZ011 = this.getView().getModel().getProperty("/objReclamo/Texto/Z011/Descripcion");
            } else
            {
                var modeloZ011 = "";
            }
            if (this.getView().getModel().getProperty("/objReclamo/Texto/Z012/Descripcion"))
            {
                var modeloZ012 = this.getView().getModel().getProperty("/objReclamo/Texto/Z012/Descripcion");
            } else
            {
                var modeloZ012 = "";
            }
            /////////////////////////////////////////////////////////////////////////////////////////
            if (this.getView().getModel().getProperty("/reclamo/reclamoRef"))
            {
                var reclamoRefModel = this.getView().getModel().getProperty("/reclamo/reclamoRef");
            } else
            {
                var reclamoRefModel = "";
            }
            /////////////////////////////////////////////////////////////////////////////////////////
            var listaReclamo = [
                {
                    "pNumeroReclamo": this.getView().getModel().getProperty("/numReclamo"), //"0100004422",
                    "fechaI": this.getView().getModel().getProperty("/retornoPedido/0/fechaI"), //"2017-07-07T05:00:00.000Z",
                    "fechaF": this.getView().getModel().getProperty("/retornoPedido/0/fechaF"), //"2017-07-07T05:00:00.000Z",
                    "horaReclamoI": this.getView().getModel().getProperty("/retornoPedido/0/horaReclamoI"), //"16:59:29",
                    "horaReclamoF": this.getView().getModel().getProperty("/retornoPedido/0/horaReclamoF"), //"16:59:29",
                    "empresa": this.getView().getModel().getProperty("/objReclamo/Contactos/KUNNR"), //"0000101317",
                    "numeroPedido": this.getView().getModel().getProperty("/objReclamo/Contactos/VGBEL"), //"0000238187",
                    "comentario": this.getView().getModel().getProperty("/reclamo/comentario"), //"",
                    "material1": material1Model, //"11000004",
                    "material2": material2Model, //"11000898",
                    "material11": material1Model, //"11000004",
                    "material12": material2Model, //"11000898",
                    "material21": "", //"",
                    "material22": "", //"",
                    "cantRecla1": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA1"), //"1.000",
                    "cantRecla2": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CANTRECLA2"), //"2.000",
                    "montoRecla1": "357.00", //"357.00",
                    "montoRecla2": "",
                    "reclamoRef": reclamoRefModel, //"",
                    "TextoTratemInicial": modelo0001, //"gggg",
                    "TextoNotaDireccion": modelo0004, //"gggg",
                    "TextoSeguimiento": modeloZ006, //"ggg",
                    "TextoDiagnostico": modeloZ007, //"ggg",
                    "TextoSolucion": modeloZ008, //"ggg",
                    "TextoPersonaContacto": modeloZ009, //"ggg",
                    "TextoDatosFacturacion": modeloZ010, //"",
                    "TextoPedidoReferencia": modeloZ011, //"",
                    "TextoMotivosOtros": modeloZ012, //"_",
                    "mail": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Mail"), //"",
                    "_nif": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NIF"), //"45454545",
                    "PersonaContacto": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO"), //"Cliente Eventual La Molina",
                    "NomPContac": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO"), //"Cliente Eventual La Molina",
                    "DirPContac": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/DIRECCION"), //"PRUEBA",
                    "NIFCont": "", //"",
                    "TelfCont": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/TELEFONO"), //"123",
                    "CodpPContac": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL"), //"LIMA 03",
                    "NomCliente": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE"), //"Cliente Eventual La Molina",
                    "EmpresaDet": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/KUNNR"), //"0000101317",
                    "NomEmpresa": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE"), //"Cliente Eventual La Molina",
                    "DirEmpresa": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Direccion"), //"PRUEBA",
                    "TelfEmpre": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Telefono"), //"",
                    "CodpEmpresa": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Ciudad"), //"LIMA 03",
                    "CodDestMerc": "", //"{36}",
                    "NomDestMerc": "", //"",
                    "DirDestMerc": "", //"{38}",
                    "CodpDestMerc": "", //"{39}",
                    "CodECom": "", //"{40}",
                    "NomECom": "", //"{41}",
                    "codigoEmpResp": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR"), //"00001802",
                    "nombreEmpResp": this.getView().byId("cbo_asesor").getSelectedItem().getText(), //"Pingo Moreno Julio Edgardo",
                    "CodResPago": this.getView().getModel().getProperty("/reclamo/codigoEmpResp"), //"00001802",
                    "NomResPago": this.getView().byId("cbo_asesor").getSelectedItem().getText(), //"Pingo Moreno Julio Edgardo",
                    "OrgVenta": this.getView().getModel().getProperty("/objReclamo/Contactos/VKORG"), //"1000",
                    "Canal": this.getView().getModel().getProperty("/objReclamo/Contactos/VTWEG"), //"10",
                    "OfiVenta": this.getView().getModel().getProperty("/objReclamo/Contactos/VKBUR"), //"1010",
                    "Motivo": this.getView().getModel().getProperty("/reclamo/Motivo"), //"A01",
                    "Resultado": this.getView().getModel().getProperty("/reclamo/Resultado"), //"004",
                    "JustificResul": this.getView().getModel().getProperty("/reclamo/JustificResul"), //"001",
                    "Sector": this.getView().getModel().getProperty("/objReclamo/Contactos/SPART"), //"00",
                    "Status": this.getView().getModel().getProperty("/reclamo/Status"), //"0",
                    "UsuarioStatus": this.getView().getModel().getProperty("/reclamo/UsuarioStatus"), //"{55}",
                    "Descripcion": this.getView().getModel().getProperty("/reclamo/Descripcion"), //"{56}",
                    "fechaSts": this.getView().getModel().getProperty("/reclamo/fechaI"), //"2017-07-07T05:00:00.000Z"
                }];
            var listaIntJson = [
                {
                    "id": 1,
                    "PedidoId": 0,
                    "Funcion": "AG",
                    "Codigo": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/KUNNR"), //"0000101317",
                    "Ruc": "", //"",
                    "Descripcion": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE"), //"Cliente Eventual La Molina",
                    "Titulo": "", //"",
                    /**/    "Direccion": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Direccion"), //"PRUEBA",
                    "DireccionCompleta": "", //"",
                    /**/    "Ciudad": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Ciudad"), //"LIMA 03",
                    "Pais": "", //"",
                    "CodigoPostal": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/CodPostal"),
                    "Distrito": "", //"",
                    /**/    "Telefono": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Telefono"), //"",
                    /**/    "Mail": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Mail"), //"",
                    "PersonaFisica": false,
                    "Eventual": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/EsVentual"),
                    "CodPersona": "", //"",
                    "Nombre": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE"), //"Cliente Eventual La Molina",
                    /**/    "ADRNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/ADRNR"), //"9001046443",
                    "DescripcionP": "", //"",
                    /**/    "POSNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/POSNR"), //"000000",
                    /**/    "PARVW": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/PARVW"),
                    /**/    "NOMBRE": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE"), //"Cliente Eventual La Molina",
                    "Name1": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE"), //"Cliente Eventual La Molina",
                    /**/    "Calle": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Calle"), //"PRUEBA",
                    /**/    "KUNNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/KUNNR"), //"0000101317",
                    "CPOSTAL": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Ciudad"), //"LIMA 03",
                    "CodPostal": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Ciudad"), //"LIMA 03",
                    "DIRECCION": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/Direccion"), //"PRUEBA",
                    "PCONTACTO": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/NOMBRE"), //"Cliente Eventual La Molina"},
                },
                {
                    "id": 2,
                    "PedidoId": 0,
                    "Funcion": "ZM",
                    "Codigo": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR"),
                    "Ruc": "",
                    "Descripcion": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/NOMBRE"), //"Pingo Moreno Julio Edgardo",
                    "Titulo": "",
                    /**/    "Direccion": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Direccion"), //"",
                    "DireccionCompleta": "",
                    "Ciudad": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Ciudad"), //"",
                    "Pais": "",
                    "CodigoPostal": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/CodPostal"), //"",
                    "Distrito": "",
                    /**/    "Telefono": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Telefono"), //"",
                    /**/    "Mail": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Mail"), //"",
                    "PersonaFisica": false,
                    "Eventual": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/EsVentual"),
                    "CodPersona": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR"), //"00001802",
                    "Nombre": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/NOMBRE"), //"Pingo Moreno Julio Edgardo",
                    /**/    "ADRNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/ADRNR"), //"",
                    "DescripcionP": "",
                    /**/    "POSNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/POSNR"), //"000000",
                    /**/    "PARVW": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PARVW"), //"ZM",
                    /**/    "NOMBRE": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/NOMBRE"), //"Pingo Moreno Julio Edgardo",
                    /**/    "Name1": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/Name1"), //"Pingo Moreno Julio Edgardo",
                    /**/    "PERNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR"), //"00001802",
                    "PCONTACTO": this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/NOMBRE"), //"Pingo Moreno Julio Edgardo"},
                },
                {
                    "id": 3,
                    "PedidoId": 0,
                    "Funcion": "AP",
                    "Codigo": this.getView().getModel().getProperty("/objReclamo/Contactos/KUNNR"), //"0000101317",
                    "Ruc": "",
                    "Descripcion": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO"), //"Cliente Eventual La Molina",
                    "Titulo": "",
                    "Direccion": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/Direccion"), //"PRUEBA", //error array
                    "DireccionCompleta": "",
                    "Ciudad": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL"), //"LIMA 03",
                    "Pais": "PE",
                    "CodigoPostal": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL"), //"LIMA 03",
                    "Distrito": "",
                    "Telefono": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/TELEFONO"), //"123",
                    "Mail": "",
                    "PersonaFisica": false,
                    "Eventual": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/EsVentual"),
                    "CodPersona": "",
                    "Nombre": "",
                    "ADRNR": "",
                    "DescripcionP": "",
                    "POSNR": this.getView().getModel().getProperty("/objReclamo/Interlocutor/AG/KUNNR"), //"000000",
                    "PARVW": "AP",
                    "NOMBRE": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO"), //"Cliente Eventual La Molina",
                    "Name1": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO"), //"Cliente Eventual La Molina",
                    "Calle": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/DIRECCION"), //"PRUEBA", //error array
                    "KUNNR": this.getView().getModel().getProperty("/objReclamo/Contactos/KUNNR"), //"0000101317",
                    "CPOSTAL": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL"), //"LIMA 03",
                    "CodPostal": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/CPOSTAL"), //"LIMA 03",
                    "DIRECCION": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/DIRECCION"), //"PRUEBA", //error array
                    "TELEFONO": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/TELEFONO"), //"123",
                    "PCONTACTO": this.getView().getModel().getProperty("/objReclamo/Z_Reclamo/PCONTACTO"), //"Cliente Eventual La Molina"
                }];
            var listaIntJsonLleno = JSON.stringify(listaIntJson);
            var listaReclamoLleno = JSON.stringify(listaReclamo);
            var result = reclamoServices.guardarReclamo(guardarReclamo, listaReclamoLleno, listaIntJsonLleno);
            if (result.c === "s")
            {
                if (result.data.success)
                {
                    /////////////////////////////////////////////////////
                    this.getView().byId("dlg_MensajeAvisoGeneralReclamo").open();
                    this.getView().byId("txt_aviso_general_reclamo").setText("Se creó el reclamo con el número: " + result.data.nroRec);
                    //////////////////////////////////////////////////////
                } else
                {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                }
            } else
            {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
            }
        },
        onOkDlg_MensajeAvisoGeneralReclamo: function ()
        {
            this.getView().byId("dlg_MensajeAvisoGeneralReclamo").close();
        },
        //////////////////////////////////////////////////////////////     
        goHome: function ()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onOpenDlgBuscarRecNuevo: function ()
        {
            //this.getView().byId("dlg_buscar_rec_nuevo").open();
            var material_primero = this.getView().byId("cbo_Motivo").getSelectedItem();
            this.getView().getModel().setProperty("/Motivo", material_primero);
            var material1 = this.getView().getModel().getProperty("/Motivo/mProperties/key");
            console.log(material_primero);
        },
        onCloseDlgBuscarRecNuevo: function ()
        {
            this.getView().byId("dlg_buscar_rec_nuevo").close();
        },
        onBuscarRecNuvoInterlocutores: function ()
        {
            this.byId("SplitAppId").toMaster(this.createId("MasterRecNuevo"));
            this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_interlocutores"));
            this.getView().byId("dlg_buscar_rec_nuevo").close();
        },
        onListMasterDatos: function (oEvent)
        {
            var obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            if (obj.codigo === 1)
            {
                this.byId("SplitAppId").to(this.createId("pag_rec_nuevo_reclamo"));
            }
            if (obj.codigo === 2)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_interlocutores"));
            }
            if (obj.codigo === 3)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_datos_reclamo"));
            }
            if (obj.codigo === 4)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_cambiar_status"));
            }
        },
        onCerraDialog: function ()
        {
            this.getView().byId("dlg_mostrar_reclamo").close();
        },
        //Abrir Dialog Buscar Cliente
        onDocNuevoBuscarCliente: function ()
        {
            this.getView().byId("dlg_buscar_rec_nuevo").open()
        },
        onDocReclamoBuscarClienteAccion: function (oEvent)
        {
            var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
            var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();
            if (ruc || nombre)
            {
                var result = reclamoServices.buscarCliente(ruc, nombre);
                if (result.c === "s")
                {
                    if (result.data.success)
                    {
                        this.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
                        this.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
                        this.getView().getModel().refresh();
                    } else
                    {
                        sap.m.MessageToast.show(result.data.errors.reason, {
                            duration: 3000
                        });
                    }
                } else
                {
                    sap.m.MessageToast.show(result.m, {
                        duration: 3000
                    });
                }
            } else
            {
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
            if (result.c === "s")
            {
                if (result.data.success)
                {
                    this.getView().getModel().refresh();
                    for (var i = 0; i < result.data.Interlocutores.length; i++)
                    {
                        if (result.data.Interlocutores[i].Funcion = "AG")
                        {
                            this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/KUNNR", result.data.Interlocutores[0].Cliente.Codigo);
                            this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/NOMBRE", result.data.Interlocutores[0].Cliente.Descripcion);
                            this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/Direccion", result.data.Interlocutores[0].Cliente.Direccion);
                            this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/Ciudad", result.data.Interlocutores[0].Cliente.CodigoPostal);
                            this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/Telefono", result.data.Interlocutores[0].Cliente.Telefono);
                            this.getView().getModel().setProperty("/objReclamo/Interlocutor/AG/NIF", result.data.Interlocutores[0].Cliente.Ruc);
                            this.getView().getModel().setProperty("/reclamo/mail", result.data.Interlocutores[0].Cliente.Mail);
                            this.getView().getModel().refresh();
                        }
                    }
                    this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
                } else
                {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                }
            } else
            {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
            }
        },
        onCopiarCliente: function ()
        {
            var nombre = this.getView().byId("txt_nombre").getValue();
            var direccion = this.getView().byId("txt_direccion").getValue();
            var ubicacion = this.getView().byId("cbo_ubicacion").getSelectedKey();
            var telefono = this.getView().byId("txt_telefono").getValue();
            this.getView().getModel().setProperty("/objReclamo/Z_Reclamo/PCONTACTO", nombre);
            this.getView().getModel().setProperty("/objReclamo/Z_Reclamo/DIRECCION", direccion);
            this.getView().getModel().setProperty("/objReclamo/Z_Reclamo/CPOSTAL", ubicacion);
            this.getView().getModel().setProperty("/objReclamo/Z_Reclamo/TELEFONO", telefono);
        },
        onCerrarListado: function ()
        {
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
        }
    });
});