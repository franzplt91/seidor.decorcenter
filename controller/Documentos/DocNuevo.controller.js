sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/crearDocumentoServices",
    "pe/com/seidor/sap/decor/ventas/services/guardarDocumento"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery, crearDocumentoServices, guardarDocumento) {
    "use strict";

    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocNuevo", {

        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);


            },

            onRouteMatched: function(oEvent) {


                if (oEvent.getParameter("name") == "appDocNuevo") {
                    this.getView().byId("SplitAppId").setMode("HideMode");
                    this.getView().setModel(new JSONModel({}));
                    this.getView().getModel().setProperty("/dataIni",window.dataIni);
                    this.getView().getModel().refresh(true);
                    this.getView().byId("dlg_DialogDocNuevo").open();


                    this.getView().byId("txt_nombre_solicitante").setValue("");
                    this.getView().byId("btnCopiarDatosInterlocutores").setText("Copiar Datos");
                    this.getView().byId("btnBuscarInterlocutor").setText("Buscar Solicitante");
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(true);
                    this.getView().byId("btnBuscarInterlocutor").setVisible(true);

                    
                }


                var tipoCabecera = [];
                tipoCabecera.push({
                    codigo:1,
                    descripcion:'Datos de Clientes'
                });

                tipoCabecera.push({
                    codigo:2,
                    descripcion:'Interlocutores'
                });

                tipoCabecera.push({
                    codigo:3,
                    descripcion:'Observaciones'
                });

                this.getView().getModel().setProperty("/tipoCabeceraModel",tipoCabecera);
                this.getView().getModel().refresh();



        },

        CambioTabFilter:function(){

             if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterSolicitante"){
                this.getView().byId("btnCopiarDatosInterlocutores").setIcon("sap-icon://action");
                    this.getView().byId("btnCopiarDatosInterlocutores").setText("Copiar Datos");
                    this.getView().byId("btnBuscarInterlocutor").setText("Buscar Solicitante");
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(true);
                    this.getView().byId("btnBuscarInterlocutor").setVisible(true);
               }

               if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterDestinoMercancia"){
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Dest. Mcia.");
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                    this.getView().byId("btnBuscarInterlocutor").setVisible(true);
               }

               if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterDestinoFactura"){
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Dest. Factura");
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                     this.getView().byId("btnBuscarInterlocutor").setVisible(true);
               }

               if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterResponsablePago"){
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Resp. Pago");
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                     this.getView().byId("btnBuscarInterlocutor").setVisible(true);
               }

               if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterAgenciaTransporte"){
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Ag. Transporte");
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                     this.getView().byId("btnBuscarInterlocutor").setVisible(true);
               }

               if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterEncargadoComercial"){
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                    this.getView().byId("btnBuscarInterlocutor").setVisible(false);
                     this.getView().byId("btnBuscarInterlocutor").setVisible(false);
               }

               if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterProfesional"){
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(true);
                     this.getView().byId("btnBuscarInterlocutor").setVisible(true);

                    this.getView().byId("btnCopiarDatosInterlocutores").setIcon("sap-icon://search");
                     this.getView().byId("btnCopiarDatosInterlocutores").setText("Buscar Prof. 1");
                     this.getView().byId("btnBuscarInterlocutor").setText("Buscar Prof. 2");
               }

               if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterDatosAdicionales"){
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                     this.getView().byId("btnBuscarInterlocutor").setVisible(false);
               }




        },

        onCopiarDatosInterlocutores:function(){

            var dni_ruc = this.getView().byId("txt_dni_ruc_solicitante").getValue();
            var nombre = this.getView().byId("txt_nombre_solicitante").getValue();
            var direccion = this.getView().byId("txt_direccion_solicitante").getValue();
            var distrito = this.getView().byId("com_distrito_solicitante").getValue();
            var telefono = this.getView().byId("txt_telefono_solicitante").getValue();


            this.getView().byId("txt_nombre_destinoMercancia").setValue(nombre);
            this.getView().byId("txt_direccion_destinoMercancia").setValue(direccion);
            this.getView().byId("com_distrito_destinoMercancia").setValue(distrito);
            this.getView().byId("txt_telefono_destinoMercancia").setValue(telefono);

            this.getView().byId("txt_nombre_destinoFactura").setValue(nombre);
            this.getView().byId("txt_direccion_destinoFactura").setValue(direccion);
            this.getView().byId("com_distrito_destinoFactura").setValue(distrito);
            this.getView().byId("txt_telefono_destinoFactura").setValue(telefono);

            this.getView().byId("txt_dni_ruc_responsablePago").setValue(dni_ruc);
            this.getView().byId("txt_nombre_responsablePago").setValue(nombre);
            this.getView().byId("txt_direccion_responsablePago").setValue(direccion);
            this.getView().byId("com_distrito_responsablePago").setValue(distrito);
            this.getView().byId("txt_telefono_responsablePago").setValue(telefono);

            this.getView().byId("txt_dni_datosAdicionales").setValue(dni_ruc);
            this.getView().byId("txt_nombre_datosAdicionales").setValue(nombre);
            this.getView().byId("dlg_MensajeAvisoCopiarDatos").open();

        },

        onBuscarInterlocutores:function(){

            if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterSolicitante"){

                if(this.getView().byId("txt_dni_ruc_solicitante").getValue()!=="" || this.getView().byId("txt_nombre_solicitante").getValue()!==""){
                    if(this.getView().byId("txt_dni_ruc_solicitante").getValue()!==""){

                        var codigo = this.getView().byId("txt_codigo_solicitante").getValue();
                        var dni_ruc = this.getView().byId("txt_dni_ruc_solicitante").getValue();
                        var codcliente = this.getView().byId("txt_codigo_solicitante").getValue();
                        var descripcion = this.getView().byId("txt_nombre_solicitante").getValue();
                        var direccion = this.getView().byId("txt_direccion_solicitante").getValue();
                        var distrito = this.getView().byId("com_distrito_solicitante").getValue();
                        var telefono = this.getView().byId("txt_telefono_solicitante").getValue();
                        var mail = this.getView().byId("txt_correo_solicitante").getValue();
                        var esRuc = "";
                        var canal = window.dataIni.person.CanalDist;
                       
                       var canal = "10";

                            var result = clienteServices.buscarSolicitante(codigo,dni_ruc,dni_ruc,codcliente,descripcion,
                                                direccion,distrito,telefono,mail,esRuc,canal);

                            if (result.c === "s") {

                                if (result.data.success) {

                                    this.getView().getModel().setProperty("/BusquedaSolicitante", result.data);


                                    //Lista Respuestas de Lista Preguntas
                                    //Tipo de cliente
                                     this.getView().getModel().setProperty("/listaR0",result.data.listCliPregResp[0]);
                                     var ab = this.getView().getModel().getProperty("/listaR0");
                                     
                                     //Tipo de construcción
                                     this.getView().getModel().setProperty("/listaR1",result.data.listCliPregResp[1]);

                                     //Tipo de proyecto - Residencial
                                     this.getView().getModel().setProperty("/listaR2",result.data.listCliPregResp[2]);

                                     //Tipo de proyecto - Institucional
                                     this.getView().getModel().setProperty("/listaR3",result.data.listCliPregResp[3]);

                                     //Presupuesto para el proyecto
                                     this.getView().getModel().setProperty("/listaR4",result.data.listCliPregResp[4]);

                                     //Ambiente 1
                                     this.getView().getModel().setProperty("/listaR5",result.data.listCliPregResp[5]);

                                     //Estilo 1
                                     this.getView().getModel().setProperty("/listaR6",result.data.listCliPregResp[6]);

                                     //Ambiente 2
                                     this.getView().getModel().setProperty("/listaR7",result.data.listCliPregResp[7]);

                                     //Estilo 2
                                     this.getView().getModel().setProperty("/listaR8",result.data.listCliPregResp[8]);

                                     //Ambiente 3
                                     this.getView().getModel().setProperty("/listaR9",result.data.listCliPregResp[9]);

                                     //Estilo 3
                                     this.getView().getModel().setProperty("/listaR10",result.data.listCliPregResp[10]);

                                     //

                                    this.getView().getModel().refresh();
                                    MessageToast.show("Solicitante Encontrado");


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

                            console.log(result.data);
                        }
                        

                ///////////////////////////////////////////////////////////////

                if(this.getView().byId("txt_nombre_solicitante").getValue()!=="" && this.getView().byId("txt_dni_ruc_solicitante").getValue()==""){

                           /* var BusNombres = "BusNombres";
                            var NombresBuscado = this.getView().byId("txt_nombre_solicitante").getValue();

                            var result = clienteServices.buscarSolicitanteNombre(BusNombres,NombresBuscado);

                                                if (result.c === "s") {

                                                            if (result.data.success) {

                                                                this.getView().getModel().setProperty("/BusquedaSolicitanteNombre", result.data);
                                                                
                                                                this.getView().getModel().refresh();

                                                                var ejem = this.getView().getModel().getProperty("/BusquedaSolicitanteNombre");
                                                                console.log(ejem);


                                                            } else {
                                                                    MessageToast.show("No se Encontró Solicitante");
                                                                sap.m.MessageToast.show(result.data.errors.reason, {
                                                                    duration: 3000
                                                                });

                                                            }


                                            } else {
                                                sap.m.MessageToast.show(result.m, {
                                                    duration: 3000
                                                });
                                            }    
                                        */

                }
           

           }
       }


           
        },

        onDlg_MensajeAvisoCopiarDatos:function(){
            this.getView().byId("dlg_MensajeAvisoCopiarDatos").close();
        },

        onOkDlg_DialogDocNuevo:function(oEvent){

             

            //Lista Respuestas de Lista Preguntas
            //Tipo de cliente
             this.getView().getModel().setProperty("/listaRespuestas",dataIni.lstPreguntas[0].listaResp);

             //Tipo de construcción
             this.getView().getModel().setProperty("/listaRespuestas1",dataIni.lstPreguntas[1].listaResp);

             //Tipo de proyecto - Residencial
             this.getView().getModel().setProperty("/listaRespuestas2",dataIni.lstPreguntas[2].listaResp);

             //Tipo de proyecto - Institucional
             this.getView().getModel().setProperty("/listaRespuestas3",dataIni.lstPreguntas[3].listaResp);

             //Presupuesto para el proyecto
             this.getView().getModel().setProperty("/listaRespuestas4",dataIni.lstPreguntas[4].listaResp);

             //Ambiente 1
             this.getView().getModel().setProperty("/listaRespuestas5",dataIni.lstPreguntas[5].listaResp);

             //Estilo 1
             this.getView().getModel().setProperty("/listaRespuestas6",dataIni.lstPreguntas[6].listaResp);

             //Ambiente 2
             this.getView().getModel().setProperty("/listaRespuestas7",dataIni.lstPreguntas[7].listaResp);

             //Estilo 2
             this.getView().getModel().setProperty("/listaRespuestas8",dataIni.lstPreguntas[8].listaResp);

             //Ambiente 3
             this.getView().getModel().setProperty("/listaRespuestas9",dataIni.lstPreguntas[9].listaResp);

             //Estilo 3
             this.getView().getModel().setProperty("/listaRespuestas10",dataIni.lstPreguntas[10].listaResp);

             //

            var obj = this.getView().byId("ListaDocNuevo").getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/documentoSeleccionado", obj);
            this.getView().getModel().refresh();

                var tipoDoc = this.getView().getModel().getProperty("/documentoSeleccionado");
            var tipoDocumento = tipoDoc.Codigo;

            var pNumPedido = this.getView().byId("txt_refDocNuevo").getValue();

            var result = crearDocumentoServices.crearDoc(tipoDocumento,pNumPedido);
             

            if (result.c === "s") {

                    if (result.data.success) {

                        this.getView().getModel().setProperty("/RetornoCrearDocumento", result.data);
                        this.getView().getModel().refresh();
                        this.getView().byId("dlg_DialogDocNuevo").close();
                    MessageToast.show(obj.Descripcion);

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





            /*/ARRAY OBJETO
            var listaDetalle = [];

            var objDet = {};
            objDet.Posicion = "10";
            objDet.CodMaterial = "11000039";
            objDet.UMedidaRendimiendo = "CA";

            listaDetalle.push(objDet);

            var parametros = {};
            parametros.objDetalle = listaDetalle;

            console.log(JSON.stringify(parametros));
            /*/


            
            

            

        },

        onBtnGuardarDocumento: function(){

            //llenado incorrecto

            var codigoCliente = "";
            var nombreCliente = "";
            var CodOficina = "";
            var CondPago = "";
            var Moneda = "";
            var TipoCambio = "";
            var dsctoAdicionalZD12 = "";
            var pesoTotal = ""; 
            var FechaFacturacion = "";
            var GrupoCond = "";
            var Motivo = "";
            var BloqueoFactura = "";
            var BloqueoEntrega = "";
            var OrdenCompra = "";
            var FechaPedido = "";
            var FechaValidez = "";
            var FechaEntrega = "";
            var CondExp = "";
            var FechaReparto = "";
            var nomProyecto = "";
            var codProyecto = "";
            var codVersion = "";
            var TipoVisita = "";
            var cbxReembolsable = "";
            var GrupoForecast = "";
            var TipoForecast = "";
            var Certificado = "";
            var FechaVisita = "";
            var listaMatJson = []; //Se crea de acuerdo a cuantos materiales se agregan en detalles Productos
                    var obj1listaMatJson = {};
                            obj1listaMatJson.id = 1;
                            obj1listaMatJson.CodMaterial = "" ;
                            obj1listaMatJson.CodUMedida = "" ;
                            obj1listaMatJson.Descripcion = "" ;
                            obj1listaMatJson.Jerarquia = "" ;
                            obj1listaMatJson.ValorRendimiento = "" ;
                            obj1listaMatJson.TipoMaterial = "" ;
                            obj1listaMatJson.EsFlete = "" ;
                            obj1listaMatJson.EsEstiba = "" ;
                            obj1listaMatJson.EspecialServ = "" ;
                            obj1listaMatJson.Tipo = "" ;
                            obj1listaMatJson.CodMaterialCorto = "" ;
                            obj1listaMatJson.TieneServ = "" ;
                            obj1listaMatJson.Rendimiento = "" ;
                            obj1listaMatJson.DescMovil = "" ;
                            obj1listaMatJson.Descontinuado = "" ;
                            obj1listaMatJson.UMedidaRendimiendo = "" ;
                            obj1listaMatJson.DescMaterial = "" ;
                            obj1listaMatJson.PrecioUnit = "" ;
                            obj1listaMatJson.Peso = "" ;
                            obj1listaMatJson.Stock = "" ;
                            obj1listaMatJson.Mstae = "" ;
                            obj1listaMatJson.Vdscto = "" ;
                            obj1listaMatJson.StatusDespacho = "" ;
                            obj1listaMatJson.StockPos = "" ;
                            obj1listaMatJson.Posicion = "" ;
                            obj1listaMatJson.Cantidad = "" ;
                            obj1listaMatJson.CodCentro = "" ;
                            obj1listaMatJson.CodAlmacen = "" ;
                            obj1listaMatJson.CodLote = "" ;
                            obj1listaMatJson.PrecioSinIGV = "" ;
                            obj1listaMatJson.DsctoMontTotal = "" ;
                            obj1listaMatJson.MotivoRechazo = "" ;
                            obj1listaMatJson.TipoPosAnt = "" ;
                            obj1listaMatJson.CodGrupoMat = "" ;
                            obj1listaMatJson.Opcion = "" ;
                            obj1listaMatJson.Reembolsable = "" ;
                            obj1listaMatJson.Zservicio = "" ;
                            obj1listaMatJson.ContentID = "" ;
                            obj1listaMatJson.DescMaterialTicketera = "" ;
                            obj1listaMatJson.PrioridadEntrega = "" ;
                            obj1listaMatJson.FechaCantConf = "" ;
                            obj1listaMatJson.FechaCantConfStr = "" ;
                            obj1listaMatJson.PosSup = "" ;
                            obj1listaMatJson.PosSupCorto = "" ;
                            obj1listaMatJson.TipoPosicion = "" ;
                            obj1listaMatJson.CambAlmacen = "" ;
                            obj1listaMatJson.CantComp = "" ;
                            obj1listaMatJson.PrecioTotal = "" ;
                            obj1listaMatJson.PrecioUnitario = "" ;
                            obj1listaMatJson.Total = "" ;
                            obj1listaMatJson.IgvUnitario = "" ;
                            obj1listaMatJson.IgvTotal = "" ;
                            obj1listaMatJson.TotalDctos = "" ;
                            obj1listaMatJson.SubTotal = "" ;
                            obj1listaMatJson.CantConfirmada = "" ;
                            obj1listaMatJson.PesoNeto = "" ;
                            obj1listaMatJson.PrecioConIGV = "" ;
                            obj1listaMatJson.TotalImpresion = "" ;
                            obj1listaMatJson.DescCentro = "" ;
                            obj1listaMatJson.DescAlmacen = "" ;
                            obj1listaMatJson.FechaEntregaString = "" ;
                            obj1listaMatJson.Reparto = "" ;
                            obj1listaMatJson.TotPercep = "" ;
                            obj1listaMatJson.DesGrupoMat = "" ;
                            obj1listaMatJson.DivisionRendimiento = "" ;
                            obj1listaMatJson.mod = "" ;
                            obj1listaMatJson.PosicionCorto = "" ;
                            obj1listaMatJson.SubTotalLista = "" ;
                            obj1listaMatJson.fullName = "" ;

                        listaMatJson.push(obj1listaMatJson);



            

            var listaDsctoJson = [];


                        var obj1listaDsctoJson = {};
                            obj1listaDsctoJson.matPosicion = "" ;
                            obj1listaDsctoJson.id = 1;
                            obj1listaDsctoJson.Posicion = "" ;
                            obj1listaDsctoJson.Condicion = "" ;
                            obj1listaDsctoJson.Importe = "" ;
                            obj1listaDsctoJson.ImporteAnterior = "" ;
                            obj1listaDsctoJson.Moneda = "" ;
                            obj1listaDsctoJson.Valor = "" ;
                            obj1listaDsctoJson.Denominacion = "" ;
                            obj1listaDsctoJson.esPorcentaje = "" ;
                            obj1listaDsctoJson.LimiteInferior = "" ;
                            obj1listaDsctoJson.Recalcular = "" ;

                        var obj2listaDsctoJson = {};
                            obj2listaDsctoJson.matPosicion = "" ;
                            obj2listaDsctoJson.id = 2;
                            obj2listaDsctoJson.Posicion = "" ;
                            obj2listaDsctoJson.Condicion = "" ;
                            obj2listaDsctoJson.Importe = "" ;
                            obj2listaDsctoJson.ImporteAnterior = "" ;
                            obj2listaDsctoJson.Moneda = "" ;
                            obj2listaDsctoJson.Valor = "" ;
                            obj2listaDsctoJson.Denominacion = "" ;
                            obj2listaDsctoJson.esPorcentaje = "" ;
                            obj2listaDsctoJson.LimiteInferior = "" ;
                            obj2listaDsctoJson.Recalcular = "" ;

                        var obj3listaDsctoJson = {};
                            obj3listaDsctoJson.matPosicion = "" ;
                            obj3listaDsctoJson.id = 3;
                            obj3listaDsctoJson.Posicion = "" ;
                            obj3listaDsctoJson.Condicion = "" ;
                            obj3listaDsctoJson.Importe = "" ;
                            obj3listaDsctoJson.ImporteAnterior = "" ;
                            obj3listaDsctoJson.Moneda = "" ;
                            obj3listaDsctoJson.Valor = "" ;
                            obj3listaDsctoJson.Denominacion = "" ;
                            obj3listaDsctoJson.esPorcentaje = "" ;
                            obj3listaDsctoJson.LimiteInferior = "" ;
                            obj3listaDsctoJson.Recalcular = "" ;

                        var obj4listaDsctoJson = {};
                            obj4listaDsctoJson.matPosicion = "" ;
                            obj4listaDsctoJson.id = 4;
                            obj4listaDsctoJson.Posicion = "" ;
                            obj4listaDsctoJson.Condicion = "" ;
                            obj4listaDsctoJson.Importe = "" ;
                            obj4listaDsctoJson.ImporteAnterior = "" ;
                            obj4listaDsctoJson.Moneda = "" ;
                            obj4listaDsctoJson.Valor = "" ;
                            obj4listaDsctoJson.Denominacion = "" ;
                            obj4listaDsctoJson.esPorcentaje = "" ;
                            obj4listaDsctoJson.LimiteInferior = "" ;
                            obj4listaDsctoJson.Recalcular = "" ;


                        var obj5listaDsctoJson = {};
                            obj5listaDsctoJson.matPosicion = "" ;
                            obj5listaDsctoJson.id = 5;
                            obj5listaDsctoJson.Posicion = "" ;
                            obj5listaDsctoJson.Condicion = "" ;
                            obj5listaDsctoJson.Importe = "" ;
                            obj5listaDsctoJson.ImporteAnterior = "" ;
                            obj5listaDsctoJson.Moneda = "" ;
                            obj5listaDsctoJson.Valor = "" ;
                            obj5listaDsctoJson.Denominacion = "" ;
                            obj5listaDsctoJson.esPorcentaje = "" ;
                            obj5listaDsctoJson.LimiteInferior = "" ;
                            obj5listaDsctoJson.Recalcular = "" ;

                        var obj6listaDsctoJson = {};
                            obj6listaDsctoJson.matPosicion = "" ;
                            obj6listaDsctoJson.id = 6;
                            obj6listaDsctoJson.Posicion = "" ;
                            obj6listaDsctoJson.Condicion = "" ;
                            obj6listaDsctoJson.Importe = "" ;
                            obj6listaDsctoJson.ImporteAnterior = "" ;
                            obj6listaDsctoJson.Moneda = "" ;
                            obj6listaDsctoJson.Valor = "" ;
                            obj6listaDsctoJson.Denominacion = "" ;
                            obj6listaDsctoJson.esPorcentaje = "" ;
                            obj6listaDsctoJson.LimiteInferior = "" ;
                            obj6listaDsctoJson.Recalcular = "" ;

                        var obj7listaDsctoJson = {};
                            obj7listaDsctoJson.matPosicion = "" ;
                            obj7listaDsctoJson.id = 7;
                            obj7listaDsctoJson.Posicion = "" ;
                            obj7listaDsctoJson.Condicion = "" ;
                            obj7listaDsctoJson.Importe = "" ;
                            obj7listaDsctoJson.ImporteAnterior = "" ;
                            obj7listaDsctoJson.Moneda = "" ;
                            obj7listaDsctoJson.Valor = "" ;
                            obj7listaDsctoJson.Denominacion = "" ;
                            obj7listaDsctoJson.esPorcentaje = "" ;
                            obj7listaDsctoJson.LimiteInferior = "" ;
                            obj7listaDsctoJson.Recalcular = "" ;

                        var obj8listaDsctoJson = {};
                            obj8listaDsctoJson.matPosicion = "" ;
                            obj8listaDsctoJson.id = 8;
                            obj8listaDsctoJson.Posicion = "" ;
                            obj8listaDsctoJson.Condicion = "" ;
                            obj8listaDsctoJson.Importe = "" ;
                            obj8listaDsctoJson.ImporteAnterior = "" ;
                            obj8listaDsctoJson.Moneda = "" ;
                            obj8listaDsctoJson.Valor = "" ;
                            obj8listaDsctoJson.Denominacion = "" ;
                            obj8listaDsctoJson.esPorcentaje = "" ;
                            obj8listaDsctoJson.LimiteInferior = "" ;
                            obj8listaDsctoJson.Recalcular = "" ;


                        var obj9listaDsctoJson = {};
                            obj9listaDsctoJson.matPosicion = "" ;
                            obj9listaDsctoJson.id = 9;
                            obj9listaDsctoJson.Posicion = "" ;
                            obj9listaDsctoJson.Condicion = "" ;
                            obj9listaDsctoJson.Importe = "" ;
                            obj9listaDsctoJson.ImporteAnterior = "" ;
                            obj9listaDsctoJson.Moneda = "" ;
                            obj9listaDsctoJson.Valor = "" ;
                            obj9listaDsctoJson.Denominacion = "" ;
                            obj9listaDsctoJson.esPorcentaje = "" ;
                            obj9listaDsctoJson.LimiteInferior = "" ;
                            obj9listaDsctoJson.Recalcular = "" ;


                        var obj10listaDsctoJson = {};
                            obj10listaDsctoJson.matPosicion = "" ;
                            obj10listaDsctoJson.id = 10;
                            obj10listaDsctoJson.Posicion = "" ;
                            obj10listaDsctoJson.Condicion = "" ;
                            obj10listaDsctoJson.Importe = "" ;
                            obj10listaDsctoJson.ImporteAnterior = "" ;
                            obj10listaDsctoJson.Moneda = "" ;
                            obj10listaDsctoJson.Valor = "" ;
                            obj10listaDsctoJson.Denominacion = "" ;
                            obj10listaDsctoJson.esPorcentaje = "" ;
                            obj10listaDsctoJson.LimiteInferior = "" ;
                            obj10listaDsctoJson.Recalcular = "" ;


                        var obj11listaDsctoJson = {};
                            obj11listaDsctoJson.matPosicion = "" ;
                            obj11listaDsctoJson.id = 11;
                            obj11listaDsctoJson.Posicion = "" ;
                            obj11listaDsctoJson.Condicion = "" ;
                            obj11listaDsctoJson.Importe = "" ;
                            obj11listaDsctoJson.ImporteAnterior = "" ;
                            obj11listaDsctoJson.Moneda = "" ;
                            obj11listaDsctoJson.Valor = "" ;
                            obj11listaDsctoJson.Denominacion = "" ;
                            obj11listaDsctoJson.esPorcentaje = "" ;
                            obj11listaDsctoJson.LimiteInferior = "" ;
                            obj11listaDsctoJson.Recalcular = "" ;


                        var obj12listaDsctoJson = {};
                            obj12listaDsctoJson.matPosicion = "" ;
                            obj12listaDsctoJson.id = 12;
                            obj12listaDsctoJson.Posicion = "" ;
                            obj12listaDsctoJson.Condicion = "" ;
                            obj12listaDsctoJson.Importe = "" ;
                            obj12listaDsctoJson.ImporteAnterior = "" ;
                            obj12listaDsctoJson.Moneda = "" ;
                            obj12listaDsctoJson.Valor = "" ;
                            obj12listaDsctoJson.Denominacion = "" ;
                            obj12listaDsctoJson.esPorcentaje = "" ;
                            obj12listaDsctoJson.LimiteInferior = "" ;
                            obj12listaDsctoJson.Recalcular = "" ;

                        var obj13listaDsctoJson = {};
                            obj13listaDsctoJson.matPosicion = "" ;
                            obj13listaDsctoJson.id = 13;
                            obj13listaDsctoJson.Posicion = "" ;
                            obj13listaDsctoJson.Condicion = "" ;
                            obj13listaDsctoJson.Importe = "" ;
                            obj13listaDsctoJson.ImporteAnterior = "" ;
                            obj13listaDsctoJson.Moneda = "" ;
                            obj13listaDsctoJson.Valor = "" ;
                            obj13listaDsctoJson.Denominacion = "" ;
                            obj13listaDsctoJson.esPorcentaje = "" ;
                            obj13listaDsctoJson.LimiteInferior = "" ;
                            obj13listaDsctoJson.Recalcular = "" ;

                        var obj14listaDsctoJson = {};
                            obj14listaDsctoJson.matPosicion = "" ;
                            obj14listaDsctoJson.id = 14;
                            obj14listaDsctoJson.Posicion = "" ;
                            obj14listaDsctoJson.Condicion = "" ;
                            obj14listaDsctoJson.Importe = "" ;
                            obj14listaDsctoJson.ImporteAnterior = "" ;
                            obj14listaDsctoJson.Moneda = "" ;
                            obj14listaDsctoJson.Valor = "" ;
                            obj14listaDsctoJson.Denominacion = "" ;
                            obj14listaDsctoJson.esPorcentaje = "" ;
                            obj14listaDsctoJson.LimiteInferior = "" ;
                            obj14listaDsctoJson.Recalcular = "" ;


                        var obj15listaDsctoJson = {};
                            obj15listaDsctoJson.matPosicion = "" ;
                            obj15listaDsctoJson.id = 15;
                            obj15listaDsctoJson.Posicion = "" ;
                            obj15listaDsctoJson.Condicion = "" ;
                            obj15listaDsctoJson.Importe = "" ;
                            obj15listaDsctoJson.ImporteAnterior = "" ;
                            obj15listaDsctoJson.Moneda = "" ;
                            obj15listaDsctoJson.Valor = "" ;
                            obj15listaDsctoJson.Denominacion = "" ;
                            obj15listaDsctoJson.esPorcentaje = "" ;
                            obj15listaDsctoJson.LimiteInferior = "" ;
                            obj15listaDsctoJson.Recalcular = "" ;


                        var obj16listaDsctoJson = {};
                            obj16listaDsctoJson.matPosicion = "" ;
                            obj16listaDsctoJson.id = 16;
                            obj16listaDsctoJson.Posicion = "" ;
                            obj16listaDsctoJson.Condicion = "" ;
                            obj16listaDsctoJson.Importe = "" ;
                            obj16listaDsctoJson.ImporteAnterior = "" ;
                            obj16listaDsctoJson.Moneda = "" ;
                            obj16listaDsctoJson.Valor = "" ;
                            obj16listaDsctoJson.Denominacion = "" ;
                            obj16listaDsctoJson.esPorcentaje = "" ;
                            obj16listaDsctoJson.LimiteInferior = "" ;
                            obj16listaDsctoJson.Recalcular = "" ;


                        var obj17listaDsctoJson = {};
                            obj17listaDsctoJson.matPosicion = "" ;
                            obj17listaDsctoJson.id = 17;
                            obj17listaDsctoJson.Posicion = "" ;
                            obj17listaDsctoJson.Condicion = "" ;
                            obj17listaDsctoJson.Importe = "" ;
                            obj17listaDsctoJson.ImporteAnterior = "" ;
                            obj17listaDsctoJson.Moneda = "" ;
                            obj17listaDsctoJson.Valor = "" ;
                            obj17listaDsctoJson.Denominacion = "" ;
                            obj17listaDsctoJson.esPorcentaje = "" ;
                            obj17listaDsctoJson.LimiteInferior = "" ;
                            obj17listaDsctoJson.Recalcular = "" ;



                        var obj18listaDsctoJson = {};
                            obj18listaDsctoJson.matPosicion = "" ;
                            obj18listaDsctoJson.id = 18;
                            obj18listaDsctoJson.Posicion = "" ;
                            obj18listaDsctoJson.Condicion = "" ;
                            obj18listaDsctoJson.Importe = "" ;
                            obj18listaDsctoJson.ImporteAnterior = "" ;
                            obj18listaDsctoJson.Moneda = "" ;
                            obj18listaDsctoJson.Valor = "" ;
                            obj18listaDsctoJson.Denominacion = "" ;
                            obj18listaDsctoJson.esPorcentaje = "" ;
                            obj18listaDsctoJson.LimiteInferior = "" ;
                            obj18listaDsctoJson.Recalcular = "" ;

                        var obj19listaDsctoJson = {};
                            obj19listaDsctoJson.matPosicion = "" ;
                            obj19listaDsctoJson.id = 19;
                            obj19listaDsctoJson.Posicion = "" ;
                            obj19listaDsctoJson.Condicion = "" ;
                            obj19listaDsctoJson.Importe = "" ;
                            obj19listaDsctoJson.ImporteAnterior = "" ;
                            obj19listaDsctoJson.Moneda = "" ;
                            obj19listaDsctoJson.Valor = "" ;
                            obj19listaDsctoJson.Denominacion = "" ;
                            obj19listaDsctoJson.esPorcentaje = "" ;
                            obj19listaDsctoJson.LimiteInferior = "" ;
                            obj19listaDsctoJson.Recalcular = "" ;

                        var obj20listaDsctoJson = {};
                            obj20listaDsctoJson.matPosicion = "" ;
                            obj20listaDsctoJson.id = 20;
                            obj20listaDsctoJson.Posicion = "" ;
                            obj20listaDsctoJson.Condicion = "" ;
                            obj20listaDsctoJson.Importe = "" ;
                            obj20listaDsctoJson.ImporteAnterior = "" ;
                            obj20listaDsctoJson.Moneda = "" ;
                            obj20listaDsctoJson.Valor = "" ;
                            obj20listaDsctoJson.Denominacion = "" ;
                            obj20listaDsctoJson.esPorcentaje = "" ;
                            obj20listaDsctoJson.LimiteInferior = "" ;
                            obj20listaDsctoJson.Recalcular = "" ;

                        var obj21listaDsctoJson = {};
                            obj21listaDsctoJson.matPosicion = "" ;
                            obj21listaDsctoJson.id = 21;
                            obj21listaDsctoJson.Posicion = "" ;
                            obj21listaDsctoJson.Condicion = "" ;
                            obj21listaDsctoJson.Importe = "" ;
                            obj21listaDsctoJson.ImporteAnterior = "" ;
                            obj21listaDsctoJson.Moneda = "" ;
                            obj21listaDsctoJson.Valor = "" ;
                            obj21listaDsctoJson.Denominacion = "" ;
                            obj21listaDsctoJson.esPorcentaje = "" ;
                            obj21listaDsctoJson.LimiteInferior = "" ;
                            obj21listaDsctoJson.Recalcular = "" ;

                        var obj22listaDsctoJson = {};
                            obj22listaDsctoJson.matPosicion = "" ;
                            obj22listaDsctoJson.id = 22;
                            obj22listaDsctoJson.Posicion = "" ;
                            obj22listaDsctoJson.Condicion = "" ;
                            obj22listaDsctoJson.Importe = "" ;
                            obj22listaDsctoJson.ImporteAnterior = "" ;
                            obj22listaDsctoJson.Moneda = "" ;
                            obj22listaDsctoJson.Valor = "" ;
                            obj22listaDsctoJson.Denominacion = "" ;
                            obj22listaDsctoJson.esPorcentaje = "" ;
                            obj22listaDsctoJson.LimiteInferior = "" ;
                            obj22listaDsctoJson.Recalcular = "" ;


                        var obj23listaDsctoJson = {};
                            obj23listaDsctoJson.matPosicion = "" ;
                            obj23listaDsctoJson.id = 23;
                            obj23listaDsctoJson.Posicion = "" ;
                            obj23listaDsctoJson.Condicion = "" ;
                            obj23listaDsctoJson.Importe = "" ;
                            obj23listaDsctoJson.ImporteAnterior = "" ;
                            obj23listaDsctoJson.Moneda = "" ;
                            obj23listaDsctoJson.Valor = "" ;
                            obj23listaDsctoJson.Denominacion = "" ;
                            obj23listaDsctoJson.esPorcentaje = "" ;
                            obj23listaDsctoJson.LimiteInferior = "" ;
                            obj23listaDsctoJson.Recalcular = "" ;

                        var obj24listaDsctoJson = {};
                            obj24listaDsctoJson.matPosicion = "" ;
                            obj24listaDsctoJson.id = 24;
                            obj24listaDsctoJson.Posicion = "" ;
                            obj24listaDsctoJson.Condicion = "" ;
                            obj24listaDsctoJson.Importe = "" ;
                            obj24listaDsctoJson.ImporteAnterior = "" ;
                            obj24listaDsctoJson.Moneda = "" ;
                            obj24listaDsctoJson.Valor = "" ;
                            obj24listaDsctoJson.Denominacion = "" ;
                            obj24listaDsctoJson.esPorcentaje = "" ;
                            obj24listaDsctoJson.LimiteInferior = "" ;
                            obj24listaDsctoJson.Recalcular = "" ;

                        var obj25listaDsctoJson = {};
                            obj25listaDsctoJson.matPosicion = "" ;
                            obj25listaDsctoJson.id = 25;
                            obj25listaDsctoJson.Posicion = "" ;
                            obj25listaDsctoJson.Condicion = "" ;
                            obj25listaDsctoJson.Importe = "" ;
                            obj25listaDsctoJson.ImporteAnterior = "" ;
                            obj25listaDsctoJson.Moneda = "" ;
                            obj25listaDsctoJson.Valor = "" ;
                            obj25listaDsctoJson.Denominacion = "" ;
                            obj25listaDsctoJson.esPorcentaje = "" ;
                            obj25listaDsctoJson.LimiteInferior = "" ;
                            obj25listaDsctoJson.Recalcular = "" ;

                        var obj26listaDsctoJson = {};
                            obj26listaDsctoJson.matPosicion = "" ;
                            obj26listaDsctoJson.id = 26;
                           obj26listaDsctoJson.Posicion = "" ;
                            obj26listaDsctoJson.Condicion = "" ;
                            obj26listaDsctoJson.Importe = "" ;
                            obj26listaDsctoJson.ImporteAnterior = "" ;
                            obj26listaDsctoJson.Moneda = "" ;
                            obj26listaDsctoJson.Valor = "" ;
                            obj26listaDsctoJson.Denominacion = "" ;
                            obj26listaDsctoJson.esPorcentaje = "" ;
                            obj26listaDsctoJson.LimiteInferior = "" ;
                            obj26listaDsctoJson.Recalcular = "" ;


                        var obj27listaDsctoJson = {};
                            obj27listaDsctoJson.matPosicion = "" ;
                            obj27listaDsctoJson.id = 27;
                           obj27listaDsctoJson.Posicion = "" ;
                            obj27listaDsctoJson.Condicion = "" ;
                            obj27listaDsctoJson.Importe = "" ;
                            obj27listaDsctoJson.ImporteAnterior = "" ;
                            obj27listaDsctoJson.Moneda = "" ;
                            obj27listaDsctoJson.Valor = "" ;
                            obj27listaDsctoJson.Denominacion = "" ;
                            obj27listaDsctoJson.esPorcentaje = "" ;
                            obj27listaDsctoJson.LimiteInferior = "" ;
                            obj27listaDsctoJson.Recalcular = "" ;


                        var obj28listaDsctoJson = {};
                            obj28listaDsctoJson.matPosicion = "" ;
                            obj28listaDsctoJson.id = 28;
                           obj28listaDsctoJson.Posicion = "" ;
                            obj28listaDsctoJson.Condicion = "" ;
                            obj28listaDsctoJson.Importe = "" ;
                            obj28listaDsctoJson.ImporteAnterior = "" ;
                            obj28listaDsctoJson.Moneda = "" ;
                            obj28listaDsctoJson.Valor = "" ;
                            obj28listaDsctoJson.Denominacion = "" ;
                            obj28listaDsctoJson.esPorcentaje = "" ;
                            obj28listaDsctoJson.LimiteInferior = "" ;
                            obj28listaDsctoJson.Recalcular = "" ;

                        var obj29listaDsctoJson = {};
                            obj29listaDsctoJson.matPosicion = "" ;
                            obj29listaDsctoJson.id = 29;
                           obj29listaDsctoJson.Posicion = "" ;
                            obj29listaDsctoJson.Condicion = "" ;
                            obj29listaDsctoJson.Importe = "" ;
                            obj29listaDsctoJson.ImporteAnterior = "" ;
                            obj29listaDsctoJson.Moneda = "" ;
                            obj29listaDsctoJson.Valor = "" ;
                            obj29listaDsctoJson.Denominacion = "" ;
                            obj29listaDsctoJson.esPorcentaje = "" ;
                            obj29listaDsctoJson.LimiteInferior = "" ;
                            obj29listaDsctoJson.Recalcular = "" ;


                        var obj30listaDsctoJson = {};
                            obj30listaDsctoJson.matPosicion = "" ;
                            obj30listaDsctoJson.id = 30;
                           obj30listaDsctoJson.Posicion = "" ;
                            obj30listaDsctoJson.Condicion = "" ;
                            obj30listaDsctoJson.Importe = "" ;
                            obj30listaDsctoJson.ImporteAnterior = "" ;
                            obj30listaDsctoJson.Moneda = "" ;
                            obj30listaDsctoJson.Valor = "" ;
                            obj30listaDsctoJson.Denominacion = "" ;
                            obj30listaDsctoJson.esPorcentaje = "" ;
                            obj30listaDsctoJson.LimiteInferior = "" ;
                            obj30listaDsctoJson.Recalcular = "" ;


                        var obj31listaDsctoJson = {};
                            obj31listaDsctoJson.matPosicion = "" ;
                            obj31listaDsctoJson.id = 31;
                           obj31listaDsctoJson.Posicion = "" ;
                            obj31listaDsctoJson.Condicion = "" ;
                            obj31listaDsctoJson.Importe = "" ;
                            obj31listaDsctoJson.ImporteAnterior = "" ;
                            obj31listaDsctoJson.Moneda = "" ;
                            obj31listaDsctoJson.Valor = "" ;
                            obj31listaDsctoJson.Denominacion = "" ;
                            obj31listaDsctoJson.esPorcentaje = "" ;
                            obj31listaDsctoJson.LimiteInferior = "" ;
                            obj31listaDsctoJson.Recalcular = "" ;

                        var obj32listaDsctoJson = {};
                            obj32listaDsctoJson.matPosicion = "" ;
                            obj32listaDsctoJson.id = 32;
                           obj32listaDsctoJson.Posicion = "" ;
                            obj32listaDsctoJson.Condicion = "" ;
                            obj32listaDsctoJson.Importe = "" ;
                            obj32listaDsctoJson.ImporteAnterior = "" ;
                            obj32listaDsctoJson.Moneda = "" ;
                            obj32listaDsctoJson.Valor = "" ;
                            obj32listaDsctoJson.Denominacion = "" ;
                            obj32listaDsctoJson.esPorcentaje = "" ;
                            obj32listaDsctoJson.LimiteInferior = "" ;
                            obj32listaDsctoJson.Recalcular = "" ;


                        var obj33listaDsctoJson = {};
                            obj33listaDsctoJson.matPosicion = "" ;
                            obj33listaDsctoJson.id = 33;
                           obj33listaDsctoJson.Posicion = "" ;
                            obj33listaDsctoJson.Condicion = "" ;
                            obj33listaDsctoJson.Importe = "" ;
                            obj33listaDsctoJson.ImporteAnterior = "" ;
                            obj33listaDsctoJson.Moneda = "" ;
                            obj33listaDsctoJson.Valor = "" ;
                            obj33listaDsctoJson.Denominacion = "" ;
                            obj33listaDsctoJson.esPorcentaje = "" ;
                            obj33listaDsctoJson.LimiteInferior = "" ;
                            obj33listaDsctoJson.Recalcular = "" ;


                        var obj34listaDsctoJson = {};
                            obj34listaDsctoJson.matPosicion = "" ;
                            obj34listaDsctoJson.id = 34;
                           obj34listaDsctoJson.Posicion = "" ;
                            obj34listaDsctoJson.Condicion = "" ;
                            obj34listaDsctoJson.Importe = "" ;
                            obj34listaDsctoJson.ImporteAnterior = "" ;
                            obj34listaDsctoJson.Moneda = "" ;
                            obj34listaDsctoJson.Valor = "" ;
                            obj34listaDsctoJson.Denominacion = "" ;
                            obj34listaDsctoJson.esPorcentaje = "" ;
                            obj34listaDsctoJson.LimiteInferior = "" ;
                            obj34listaDsctoJson.Recalcular = "" ;


                        var obj35listaDsctoJson = {};
                            obj35listaDsctoJson.matPosicion = "" ;
                            obj35listaDsctoJson.id = 35;
                           obj35listaDsctoJson.Posicion = "" ;
                            obj35listaDsctoJson.Condicion = "" ;
                            obj35listaDsctoJson.Importe = "" ;
                            obj35listaDsctoJson.ImporteAnterior = "" ;
                            obj35listaDsctoJson.Moneda = "" ;
                            obj35listaDsctoJson.Valor = "" ;
                            obj35listaDsctoJson.Denominacion = "" ;
                            obj35listaDsctoJson.esPorcentaje = "" ;
                            obj35listaDsctoJson.LimiteInferior = "" ;
                            obj35listaDsctoJson.Recalcular = "" ;


                        var obj36listaDsctoJson = {};
                            obj36listaDsctoJson.matPosicion = "" ;
                            obj36listaDsctoJson.id = 36;
                           obj36listaDsctoJson.Posicion = "" ;
                            obj36listaDsctoJson.Condicion = "" ;
                            obj36listaDsctoJson.Importe = "" ;
                            obj36listaDsctoJson.ImporteAnterior = "" ;
                            obj36listaDsctoJson.Moneda = "" ;
                            obj36listaDsctoJson.Valor = "" ;
                            obj36listaDsctoJson.Denominacion = "" ;
                            obj36listaDsctoJson.esPorcentaje = "" ;
                            obj36listaDsctoJson.LimiteInferior = "" ;
                            obj36listaDsctoJson.Recalcular = "" ;


                        var obj37listaDsctoJson = {};
                            obj37listaDsctoJson.matPosicion = "" ;
                            obj37listaDsctoJson.id = 37;
                           obj37listaDsctoJson.Posicion = "" ;
                            obj37listaDsctoJson.Condicion = "" ;
                            obj37listaDsctoJson.Importe = "" ;
                            obj37listaDsctoJson.ImporteAnterior = "" ;
                            obj37listaDsctoJson.Moneda = "" ;
                            obj37listaDsctoJson.Valor = "" ;
                            obj37listaDsctoJson.Denominacion = "" ;
                            obj37listaDsctoJson.esPorcentaje = "" ;
                            obj37listaDsctoJson.LimiteInferior = "" ;
                            obj37listaDsctoJson.Recalcular = "" ;


                        var obj38listaDsctoJson = {};
                            obj38listaDsctoJson.matPosicion = "" ;
                            obj38listaDsctoJson.id = 38;
                           obj38listaDsctoJson.Posicion = "" ;
                            obj38listaDsctoJson.Condicion = "" ;
                            obj38listaDsctoJson.Importe = "" ;
                            obj38listaDsctoJson.ImporteAnterior = "" ;
                            obj38listaDsctoJson.Moneda = "" ;
                            obj38listaDsctoJson.Valor = "" ;
                            obj38listaDsctoJson.Denominacion = "" ;
                            obj38listaDsctoJson.esPorcentaje = "" ;
                            obj38listaDsctoJson.LimiteInferior = "" ;
                            obj38listaDsctoJson.Recalcular = "" ;

                        var obj39listaDsctoJson = {};
                            obj39listaDsctoJson.matPosicion = "" ;
                            obj39listaDsctoJson.id = 39;
                           obj39listaDsctoJson.Posicion = "" ;
                            obj39listaDsctoJson.Condicion = "" ;
                            obj39listaDsctoJson.Importe = "" ;
                            obj39listaDsctoJson.ImporteAnterior = "" ;
                            obj39listaDsctoJson.Moneda = "" ;
                            obj39listaDsctoJson.Valor = "" ;
                            obj39listaDsctoJson.Denominacion = "" ;
                            obj39listaDsctoJson.esPorcentaje = "" ;
                            obj39listaDsctoJson.LimiteInferior = "" ;
                            obj39listaDsctoJson.Recalcular = "" ;

                        var obj40listaDsctoJson = {};
                            obj40listaDsctoJson.matPosicion = "" ;
                            obj40listaDsctoJson.id = 40;
                           obj40listaDsctoJson.Posicion = "" ;
                            obj40listaDsctoJson.Condicion = "" ;
                            obj40listaDsctoJson.Importe = "" ;
                            obj40listaDsctoJson.ImporteAnterior = "" ;
                            obj40listaDsctoJson.Moneda = "" ;
                            obj40listaDsctoJson.Valor = "" ;
                            obj40listaDsctoJson.Denominacion = "" ;
                            obj40listaDsctoJson.esPorcentaje = "" ;
                            obj40listaDsctoJson.LimiteInferior = "" ;
                            obj40listaDsctoJson.Recalcular = "" ;


                        var obj41listaDsctoJson = {};
                            obj41listaDsctoJson.matPosicion = "" ;
                            obj41listaDsctoJson.id = 41;
                           obj41listaDsctoJson.Posicion = "" ;
                            obj41listaDsctoJson.Condicion = "" ;
                            obj41listaDsctoJson.Importe = "" ;
                            obj41listaDsctoJson.ImporteAnterior = "" ;
                            obj41listaDsctoJson.Moneda = "" ;
                            obj41listaDsctoJson.Valor = "" ;
                            obj41listaDsctoJson.Denominacion = "" ;
                            obj41listaDsctoJson.esPorcentaje = "" ;
                            obj41listaDsctoJson.LimiteInferior = "" ;
                            obj41listaDsctoJson.Recalcular = "" ;


                        var obj42listaDsctoJson = {};
                            obj42listaDsctoJson.matPosicion = "" ;
                            obj42listaDsctoJson.id = 42;
                           obj42listaDsctoJson.Posicion = "" ;
                            obj42listaDsctoJson.Condicion = "" ;
                            obj42listaDsctoJson.Importe = "" ;
                            obj42listaDsctoJson.ImporteAnterior = "" ;
                            obj42listaDsctoJson.Moneda = "" ;
                            obj42listaDsctoJson.Valor = "" ;
                            obj42listaDsctoJson.Denominacion = "" ;
                            obj42listaDsctoJson.esPorcentaje = "" ;
                            obj42listaDsctoJson.LimiteInferior = "" ;
                            obj42listaDsctoJson.Recalcular = "" ;


                        var obj43listaDsctoJson = {};
                            obj43listaDsctoJson.matPosicion = "" ;
                            obj43listaDsctoJson.id = 43;
                           obj43listaDsctoJson.Posicion = "" ;
                            obj43listaDsctoJson.Condicion = "" ;
                            obj43listaDsctoJson.Importe = "" ;
                            obj43listaDsctoJson.ImporteAnterior = "" ;
                            obj43listaDsctoJson.Moneda = "" ;
                            obj43listaDsctoJson.Valor = "" ;
                            obj43listaDsctoJson.Denominacion = "" ;
                            obj43listaDsctoJson.esPorcentaje = "" ;
                            obj43listaDsctoJson.LimiteInferior = "" ;
                            obj43listaDsctoJson.Recalcular = "" ;


                        var obj44listaDsctoJson = {};
                            obj44listaDsctoJson.matPosicion = "" ;
                            obj44listaDsctoJson.id = 44;
                           obj44listaDsctoJson.Posicion = "" ;
                            obj44listaDsctoJson.Condicion = "" ;
                            obj44listaDsctoJson.Importe = "" ;
                            obj44listaDsctoJson.ImporteAnterior = "" ;
                            obj44listaDsctoJson.Moneda = "" ;
                            obj44listaDsctoJson.Valor = "" ;
                            obj44listaDsctoJson.Denominacion = "" ;
                            obj44listaDsctoJson.esPorcentaje = "" ;
                            obj44listaDsctoJson.LimiteInferior = "" ;
                            obj44listaDsctoJson.Recalcular = "" ;


                        var obj45listaDsctoJson = {};
                            obj45listaDsctoJson.matPosicion = "" ;
                            obj45listaDsctoJson.id = 45;
                           obj45listaDsctoJson.Posicion = "" ;
                            obj45listaDsctoJson.Condicion = "" ;
                            obj45listaDsctoJson.Importe = "" ;
                            obj45listaDsctoJson.ImporteAnterior = "" ;
                            obj45listaDsctoJson.Moneda = "" ;
                            obj45listaDsctoJson.Valor = "" ;
                            obj45listaDsctoJson.Denominacion = "" ;
                            obj45listaDsctoJson.esPorcentaje = "" ;
                            obj45listaDsctoJson.LimiteInferior = "" ;
                            obj45listaDsctoJson.Recalcular = "" ;


                        var obj46listaDsctoJson = {};
                            obj46listaDsctoJson.matPosicion = "" ;
                            obj46listaDsctoJson.id = 46;
                           obj46listaDsctoJson.Posicion = "" ;
                            obj46listaDsctoJson.Condicion = "" ;
                            obj46listaDsctoJson.Importe = "" ;
                            obj46listaDsctoJson.ImporteAnterior = "" ;
                            obj46listaDsctoJson.Moneda = "" ;
                            obj46listaDsctoJson.Valor = "" ;
                            obj46listaDsctoJson.Denominacion = "" ;
                            obj46listaDsctoJson.esPorcentaje = "" ;
                            obj46listaDsctoJson.LimiteInferior = "" ;
                            obj46listaDsctoJson.Recalcular = "" ;

                        var obj47listaDsctoJson = {};
                            obj47listaDsctoJson.matPosicion = "" ;
                            obj47listaDsctoJson.id = 47;
                           obj47listaDsctoJson.Posicion = "" ;
                            obj47listaDsctoJson.Condicion = "" ;
                            obj47listaDsctoJson.Importe = "" ;
                            obj47listaDsctoJson.ImporteAnterior = "" ;
                            obj47listaDsctoJson.Moneda = "" ;
                            obj47listaDsctoJson.Valor = "" ;
                            obj47listaDsctoJson.Denominacion = "" ;
                            obj47listaDsctoJson.esPorcentaje = "" ;
                            obj47listaDsctoJson.LimiteInferior = "" ;
                            obj47listaDsctoJson.Recalcular = "" ;


                        var obj48listaDsctoJson = {};
                            obj48listaDsctoJson.matPosicion = "" ;
                            obj48listaDsctoJson.id = 48;
                           obj48listaDsctoJson.Posicion = "" ;
                            obj48listaDsctoJson.Condicion = "" ;
                            obj48listaDsctoJson.Importe = "" ;
                            obj48listaDsctoJson.ImporteAnterior = "" ;
                            obj48listaDsctoJson.Moneda = "" ;
                            obj48listaDsctoJson.Valor = "" ;
                            obj48listaDsctoJson.Denominacion = "" ;
                            obj48listaDsctoJson.esPorcentaje = "" ;
                            obj48listaDsctoJson.LimiteInferior = "" ;
                            obj48listaDsctoJson.Recalcular = "" ;


                        var obj49listaDsctoJson = {};
                            obj49listaDsctoJson.matPosicion = "" ;
                            obj49listaDsctoJson.id = 49;
                           obj49listaDsctoJson.Posicion = "" ;
                            obj49listaDsctoJson.Condicion = "" ;
                            obj49listaDsctoJson.Importe = "" ;
                            obj49listaDsctoJson.ImporteAnterior = "" ;
                            obj49listaDsctoJson.Moneda = "" ;
                            obj49listaDsctoJson.Valor = "" ;
                            obj49listaDsctoJson.Denominacion = "" ;
                            obj49listaDsctoJson.esPorcentaje = "" ;
                            obj49listaDsctoJson.LimiteInferior = "" ;
                            obj49listaDsctoJson.Recalcular = "" ;

                        var obj50listaDsctoJson = {};
                            obj50listaDsctoJson.matPosicion = "" ;
                            obj50listaDsctoJson.id = 50;
                           obj50listaDsctoJson.Posicion = "" ;
                            obj50listaDsctoJson.Condicion = "" ;
                            obj50listaDsctoJson.Importe = "" ;
                            obj50listaDsctoJson.ImporteAnterior = "" ;
                            obj50listaDsctoJson.Moneda = "" ;
                            obj50listaDsctoJson.Valor = "" ;
                            obj50listaDsctoJson.Denominacion = "" ;
                            obj50listaDsctoJson.esPorcentaje = "" ;
                            obj50listaDsctoJson.LimiteInferior = "" ;
                            obj50listaDsctoJson.Recalcular = "" ;

                        var obj51listaDsctoJson = {};
                            obj51listaDsctoJson.matPosicion = "" ;
                            obj51listaDsctoJson.id = 51;
                           obj51listaDsctoJson.Posicion = "" ;
                            obj51listaDsctoJson.Condicion = "" ;
                            obj51listaDsctoJson.Importe = "" ;
                            obj51listaDsctoJson.ImporteAnterior = "" ;
                            obj51listaDsctoJson.Moneda = "" ;
                            obj51listaDsctoJson.Valor = "" ;
                            obj51listaDsctoJson.Denominacion = "" ;
                            obj51listaDsctoJson.esPorcentaje = "" ;
                            obj51listaDsctoJson.LimiteInferior = "" ;
                            obj51listaDsctoJson.Recalcular = "" ;

                        var obj52listaDsctoJson = {};
                            obj52listaDsctoJson.matPosicion = "" ;
                            obj52listaDsctoJson.id = 52;
                           obj52listaDsctoJson.Posicion = "" ;
                            obj52listaDsctoJson.Condicion = "" ;
                            obj52listaDsctoJson.Importe = "" ;
                            obj52listaDsctoJson.ImporteAnterior = "" ;
                            obj52listaDsctoJson.Moneda = "" ;
                            obj52listaDsctoJson.Valor = "" ;
                            obj52listaDsctoJson.Denominacion = "" ;
                            obj52listaDsctoJson.esPorcentaje = "" ;
                            obj52listaDsctoJson.LimiteInferior = "" ;
                            obj52listaDsctoJson.Recalcular = "" ;


                        var obj53listaDsctoJson ={};
                            obj53listaDsctoJson.matPosicion = "" ;
                            obj53listaDsctoJson.id = 53;
                           obj53listaDsctoJson.Posicion = "" ;
                            obj53listaDsctoJson.Condicion = "" ;
                            obj53listaDsctoJson.Importe = "" ;
                            obj53listaDsctoJson.ImporteAnterior = "" ;
                            obj53listaDsctoJson.Moneda = "" ;
                            obj53listaDsctoJson.Valor = "" ;
                            obj53listaDsctoJson.Denominacion = "" ;
                            obj53listaDsctoJson.esPorcentaje = "" ;
                            obj53listaDsctoJson.LimiteInferior = "" ;
                            obj53listaDsctoJson.Recalcular = "" ;


                        var obj54listaDsctoJson = {};
                            obj54listaDsctoJson.matPosicion = "" ;
                            obj54listaDsctoJson.id = 54;
                           obj54listaDsctoJson.Posicion = "" ;
                            obj54listaDsctoJson.Condicion = "" ;
                            obj54listaDsctoJson.Importe = "" ;
                            obj54listaDsctoJson.ImporteAnterior = "" ;
                            obj54listaDsctoJson.Moneda = "" ;
                            obj54listaDsctoJson.Valor = "" ;
                            obj54listaDsctoJson.Denominacion = "" ;
                            obj54listaDsctoJson.esPorcentaje = "" ;
                            obj54listaDsctoJson.LimiteInferior = "" ;
                            obj54listaDsctoJson.Recalcular = "" ;


                        var obj55listaDsctoJson = {};
                            obj55listaDsctoJson.matPosicion = "" ;
                            obj55listaDsctoJson.id = 55;
                           obj55listaDsctoJson.Posicion = "" ;
                            obj55listaDsctoJson.Condicion = "" ;
                            obj55listaDsctoJson.Importe = "" ;
                            obj55listaDsctoJson.ImporteAnterior = "" ;
                            obj55listaDsctoJson.Moneda = "" ;
                            obj55listaDsctoJson.Valor = "" ;
                            obj55listaDsctoJson.Denominacion = "" ;
                            obj55listaDsctoJson.esPorcentaje = "" ;
                            obj55listaDsctoJson.LimiteInferior = "" ;
                            obj55listaDsctoJson.Recalcular = "" ;


                        var obj56listaDsctoJson = {};
                            obj56listaDsctoJson.matPosicion = "" ;
                            obj56listaDsctoJson.id = 56;
                           obj56listaDsctoJson.Posicion = "" ;
                            obj56listaDsctoJson.Condicion = "" ;
                            obj56listaDsctoJson.Importe = "" ;
                            obj56listaDsctoJson.ImporteAnterior = "" ;
                            obj56listaDsctoJson.Moneda = "" ;
                            obj56listaDsctoJson.Valor = "" ;
                            obj56listaDsctoJson.Denominacion = "" ;
                            obj56listaDsctoJson.esPorcentaje = "" ;
                            obj56listaDsctoJson.LimiteInferior = "" ;
                            obj56listaDsctoJson.Recalcular = "" ;


                        var obj57listaDsctoJson = {};
                            obj57listaDsctoJson.matPosicion = "" ;
                            obj57listaDsctoJson.id = 57;
                           obj57listaDsctoJson.Posicion = "" ;
                            obj57listaDsctoJson.Condicion = "" ;
                            obj57listaDsctoJson.Importe = "" ;
                            obj57listaDsctoJson.ImporteAnterior = "" ;
                            obj57listaDsctoJson.Moneda = "" ;
                            obj57listaDsctoJson.Valor = "" ;
                            obj57listaDsctoJson.Denominacion = "" ;
                            obj57listaDsctoJson.esPorcentaje = "" ;
                            obj57listaDsctoJson.LimiteInferior = "" ;
                            obj57listaDsctoJson.Recalcular = "" ;


                        var obj58listaDsctoJson = {};
                            obj58listaDsctoJson.matPosicion = "" ;
                            obj58listaDsctoJson.id = 58;
                           obj58listaDsctoJson.Posicion = "" ;
                            obj58listaDsctoJson.Condicion = "" ;
                            obj58listaDsctoJson.Importe = "" ;
                            obj58listaDsctoJson.ImporteAnterior = "" ;
                            obj58listaDsctoJson.Moneda = "" ;
                            obj58listaDsctoJson.Valor = "" ;
                            obj58listaDsctoJson.Denominacion = "" ;
                            obj58listaDsctoJson.esPorcentaje = "" ;
                            obj58listaDsctoJson.LimiteInferior = "" ;
                            obj58listaDsctoJson.Recalcular = "" ;


                        var obj59listaDsctoJson = {};
                            obj59listaDsctoJson.matPosicion = "" ;
                            obj59listaDsctoJson.id = 59;
                           obj59listaDsctoJson.Posicion = "" ;
                            obj59listaDsctoJson.Condicion = "" ;
                            obj59listaDsctoJson.Importe = "" ;
                            obj59listaDsctoJson.ImporteAnterior = "" ;
                            obj59listaDsctoJson.Moneda = "" ;
                            obj59listaDsctoJson.Valor = "" ;
                            obj59listaDsctoJson.Denominacion = "" ;
                            obj59listaDsctoJson.esPorcentaje = "" ;
                            obj59listaDsctoJson.LimiteInferior = "" ;
                            obj59listaDsctoJson.Recalcular = "" ;


                        var obj60listaDsctoJson = {};
                            obj60listaDsctoJson.matPosicion = "" ;
                            obj60listaDsctoJson.id = 60;
                           obj60listaDsctoJson.Posicion = "" ;
                            obj60listaDsctoJson.Condicion = "" ;
                            obj60listaDsctoJson.Importe = "" ;
                            obj60listaDsctoJson.ImporteAnterior = "" ;
                            obj60listaDsctoJson.Moneda = "" ;
                            obj60listaDsctoJson.Valor = "" ;
                            obj60listaDsctoJson.Denominacion = "" ;
                            obj60listaDsctoJson.esPorcentaje = "" ;
                            obj60listaDsctoJson.LimiteInferior = "" ;
                            obj60listaDsctoJson.Recalcular = "" ;


                        var obj61listaDsctoJson = {};
                            obj61listaDsctoJson.matPosicion = "" ;
                            obj61listaDsctoJson.id = 61;
                           obj61listaDsctoJson.Posicion = "" ;
                            obj61listaDsctoJson.Condicion = "" ;
                            obj61listaDsctoJson.Importe = "" ;
                            obj61listaDsctoJson.ImporteAnterior = "" ;
                            obj61listaDsctoJson.Moneda = "" ;
                            obj61listaDsctoJson.Valor = "" ;
                            obj61listaDsctoJson.Denominacion = "" ;
                            obj61listaDsctoJson.esPorcentaje = "" ;
                            obj61listaDsctoJson.LimiteInferior = "" ;
                            obj61listaDsctoJson.Recalcular = "" ;


                        var obj62listaDsctoJson = {};
                            obj62listaDsctoJson.matPosicion = "" ;
                            obj62listaDsctoJson.id = 62;
                           obj62listaDsctoJson.Posicion = "" ;
                            obj62listaDsctoJson.Condicion = "" ;
                            obj62listaDsctoJson.Importe = "" ;
                            obj62listaDsctoJson.ImporteAnterior = "" ;
                            obj62listaDsctoJson.Moneda = "" ;
                            obj62listaDsctoJson.Valor = "" ;
                            obj62listaDsctoJson.Denominacion = "" ;
                            obj62listaDsctoJson.esPorcentaje = "" ;
                            obj62listaDsctoJson.LimiteInferior = "" ;
                            obj62listaDsctoJson.Recalcular = "" ;


                        var obj63listaDsctoJson = {};
                            obj63listaDsctoJson.matPosicion = "" ;
                            obj63listaDsctoJson.id = 63;
                           obj63listaDsctoJson.Posicion = "" ;
                            obj63listaDsctoJson.Condicion = "" ;
                            obj63listaDsctoJson.Importe = "" ;
                            obj63listaDsctoJson.ImporteAnterior = "" ;
                            obj63listaDsctoJson.Moneda = "" ;
                            obj63listaDsctoJson.Valor = "" ;
                            obj63listaDsctoJson.Denominacion = "" ;
                            obj63listaDsctoJson.esPorcentaje = "" ;
                            obj63listaDsctoJson.LimiteInferior = "" ;
                            obj63listaDsctoJson.Recalcular = "" ;


                        var obj64listaDsctoJson = {};
                            obj64listaDsctoJson.matPosicion = "" ;
                            obj64listaDsctoJson.id = 64;
                           obj64listaDsctoJson.Posicion = "" ;
                            obj64listaDsctoJson.Condicion = "" ;
                            obj64listaDsctoJson.Importe = "" ;
                            obj64listaDsctoJson.ImporteAnterior = "" ;
                            obj64listaDsctoJson.Moneda = "" ;
                            obj64listaDsctoJson.Valor = "" ;
                            obj64listaDsctoJson.Denominacion = "" ;
                            obj64listaDsctoJson.esPorcentaje = "" ;
                            obj64listaDsctoJson.LimiteInferior = "" ;
                            obj64listaDsctoJson.Recalcular = "" ;


                        var obj65listaDsctoJson = {};
                            obj65listaDsctoJson.matPosicion = "" ;
                            obj65listaDsctoJson.id = 65;
                           obj65listaDsctoJson.Posicion = "" ;
                            obj65listaDsctoJson.Condicion = "" ;
                            obj65listaDsctoJson.Importe = "" ;
                            obj65listaDsctoJson.ImporteAnterior = "" ;
                            obj65listaDsctoJson.Moneda = "" ;
                            obj65listaDsctoJson.Valor = "" ;
                            obj65listaDsctoJson.Denominacion = "" ;
                            obj65listaDsctoJson.esPorcentaje = "" ;
                            obj65listaDsctoJson.LimiteInferior = "" ;
                            obj65listaDsctoJson.Recalcular = "" ;


                        var obj66listaDsctoJson = {};
                            obj66listaDsctoJson.matPosicion = "" ;
                            obj66listaDsctoJson.id = 66;
                           obj66listaDsctoJson.Posicion = "" ;
                            obj66listaDsctoJson.Condicion = "" ;
                            obj66listaDsctoJson.Importe = "" ;
                            obj66listaDsctoJson.ImporteAnterior = "" ;
                            obj66listaDsctoJson.Moneda = "" ;
                            obj66listaDsctoJson.Valor = "" ;
                            obj66listaDsctoJson.Denominacion = "" ;
                            obj66listaDsctoJson.esPorcentaje = "" ;
                            obj66listaDsctoJson.LimiteInferior = "" ;
                            obj66listaDsctoJson.Recalcular = "" ;


                        var obj67listaDsctoJson = {};
                            obj67listaDsctoJson.matPosicion = "" ;
                            obj67listaDsctoJson.id = 67;
                           obj67listaDsctoJson.Posicion = "" ;
                            obj67listaDsctoJson.Condicion = "" ;
                            obj67listaDsctoJson.Importe = "" ;
                            obj67listaDsctoJson.ImporteAnterior = "" ;
                            obj67listaDsctoJson.Moneda = "" ;
                            obj67listaDsctoJson.Valor = "" ;
                            obj67listaDsctoJson.Denominacion = "" ;
                            obj67listaDsctoJson.esPorcentaje = "" ;
                            obj67listaDsctoJson.LimiteInferior = "" ;
                            obj67listaDsctoJson.Recalcular = "" ;


                        var obj68listaDsctoJson = {};
                            obj68listaDsctoJson.matPosicion = "" ;
                            obj68listaDsctoJson.id = 68;
                           obj68listaDsctoJson.Posicion = "" ;
                            obj68listaDsctoJson.Condicion = "" ;
                            obj68listaDsctoJson.Importe = "" ;
                            obj68listaDsctoJson.ImporteAnterior = "" ;
                            obj68listaDsctoJson.Moneda = "" ;
                            obj68listaDsctoJson.Valor = "" ;
                            obj68listaDsctoJson.Denominacion = "" ;
                            obj68listaDsctoJson.esPorcentaje = "" ;
                            obj68listaDsctoJson.LimiteInferior = "" ;
                            obj68listaDsctoJson.Recalcular = "" ;


                        var obj69listaDsctoJson = {};
                            obj69listaDsctoJson.matPosicion = "" ;
                            obj69listaDsctoJson.id = 69;
                           obj69listaDsctoJson.Posicion = "" ;
                            obj69listaDsctoJson.Condicion = "" ;
                            obj69listaDsctoJson.Importe = "" ;
                            obj69listaDsctoJson.ImporteAnterior = "" ;
                            obj69listaDsctoJson.Moneda = "" ;
                            obj69listaDsctoJson.Valor = "" ;
                            obj69listaDsctoJson.Denominacion = "" ;
                            obj69listaDsctoJson.esPorcentaje = "" ;
                            obj69listaDsctoJson.LimiteInferior = "" ;
                            obj69listaDsctoJson.Recalcular = "" ;


                        var obj70listaDsctoJson = {};
                            obj70listaDsctoJson.matPosicion = "" ;
                            obj70listaDsctoJson.id = 70;
                           obj70listaDsctoJson.Posicion = "" ;
                            obj70listaDsctoJson.Condicion = "" ;
                            obj70listaDsctoJson.Importe = "" ;
                            obj70listaDsctoJson.ImporteAnterior = "" ;
                            obj70listaDsctoJson.Moneda = "" ;
                            obj70listaDsctoJson.Valor = "" ;
                            obj70listaDsctoJson.Denominacion = "" ;
                            obj70listaDsctoJson.esPorcentaje = "" ;
                            obj70listaDsctoJson.LimiteInferior = "" ;
                            obj70listaDsctoJson.Recalcular = "" ;


                        var obj71listaDsctoJson = {};
                            obj71listaDsctoJson.matPosicion = "" ;
                            obj71listaDsctoJson.id = 71;
                           obj71listaDsctoJson.Posicion = "" ;
                            obj71listaDsctoJson.Condicion = "" ;
                            obj71listaDsctoJson.Importe = "" ;
                            obj71listaDsctoJson.ImporteAnterior = "" ;
                            obj71listaDsctoJson.Moneda = "" ;
                            obj71listaDsctoJson.Valor = "" ;
                            obj71listaDsctoJson.Denominacion = "" ;
                            obj71listaDsctoJson.esPorcentaje = "" ;
                            obj71listaDsctoJson.LimiteInferior = "" ;
                            obj71listaDsctoJson.Recalcular = "" ;


                        var obj72listaDsctoJson = {};
                            obj72listaDsctoJson.matPosicion = "" ;
                            obj72listaDsctoJson.id = 72;
                           obj72listaDsctoJson.Posicion = "" ;
                            obj72listaDsctoJson.Condicion = "" ;
                            obj72listaDsctoJson.Importe = "" ;
                            obj72listaDsctoJson.ImporteAnterior = "" ;
                            obj72listaDsctoJson.Moneda = "" ;
                            obj72listaDsctoJson.Valor = "" ;
                            obj72listaDsctoJson.Denominacion = "" ;
                            obj72listaDsctoJson.esPorcentaje = "" ;
                            obj72listaDsctoJson.LimiteInferior = "" ;
                            obj72listaDsctoJson.Recalcular = "" ;


                    listaDsctoJson.push(obj1listaDsctoJson);
                    listaDsctoJson.push(obj2listaDsctoJson);
                    listaDsctoJson.push(obj3listaDsctoJson);
                    listaDsctoJson.push(obj4listaDsctoJson);
                    listaDsctoJson.push(obj5listaDsctoJson);
                    listaDsctoJson.push(obj6listaDsctoJson);
                    listaDsctoJson.push(obj7listaDsctoJson);
                    listaDsctoJson.push(obj8listaDsctoJson);
                    listaDsctoJson.push(obj9listaDsctoJson);
                    listaDsctoJson.push(obj10listaDsctoJson);
                    listaDsctoJson.push(obj11listaDsctoJson);
                    listaDsctoJson.push(obj12listaDsctoJson);
                    listaDsctoJson.push(obj13listaDsctoJson);
                    listaDsctoJson.push(obj14listaDsctoJson);
                    listaDsctoJson.push(obj15listaDsctoJson);
                    listaDsctoJson.push(obj16listaDsctoJson);
                    listaDsctoJson.push(obj17listaDsctoJson);
                    listaDsctoJson.push(obj18listaDsctoJson);
                    listaDsctoJson.push(obj19listaDsctoJson);
                    listaDsctoJson.push(obj20listaDsctoJson);
                    listaDsctoJson.push(obj21listaDsctoJson);
                    listaDsctoJson.push(obj22listaDsctoJson);
                    listaDsctoJson.push(obj23listaDsctoJson);
                    listaDsctoJson.push(obj24listaDsctoJson);
                    listaDsctoJson.push(obj25listaDsctoJson);
                    listaDsctoJson.push(obj26listaDsctoJson);
                    listaDsctoJson.push(obj27listaDsctoJson);
                    listaDsctoJson.push(obj28listaDsctoJson);
                    listaDsctoJson.push(obj29listaDsctoJson);
                    listaDsctoJson.push(obj30listaDsctoJson);
                    listaDsctoJson.push(obj31listaDsctoJson);
                    listaDsctoJson.push(obj32listaDsctoJson);
                    listaDsctoJson.push(obj33listaDsctoJson);
                    listaDsctoJson.push(obj34listaDsctoJson);
                    listaDsctoJson.push(obj35listaDsctoJson);
                    listaDsctoJson.push(obj36listaDsctoJson);
                    listaDsctoJson.push(obj37listaDsctoJson);
                    listaDsctoJson.push(obj38listaDsctoJson);
                    listaDsctoJson.push(obj39listaDsctoJson);
                    listaDsctoJson.push(obj40listaDsctoJson);
                    listaDsctoJson.push(obj41listaDsctoJson);
                    listaDsctoJson.push(obj42listaDsctoJson);
                    listaDsctoJson.push(obj43listaDsctoJson);
                    listaDsctoJson.push(obj44listaDsctoJson);
                    listaDsctoJson.push(obj45listaDsctoJson);
                    listaDsctoJson.push(obj46listaDsctoJson);
                    listaDsctoJson.push(obj47listaDsctoJson);
                    listaDsctoJson.push(obj48listaDsctoJson);
                    listaDsctoJson.push(obj49listaDsctoJson);
                    listaDsctoJson.push(obj50listaDsctoJson);
                    listaDsctoJson.push(obj51listaDsctoJson);
                    listaDsctoJson.push(obj52listaDsctoJson);
                    listaDsctoJson.push(obj53listaDsctoJson);
                    listaDsctoJson.push(obj54listaDsctoJson);
                    listaDsctoJson.push(obj55listaDsctoJson);
                    listaDsctoJson.push(obj56listaDsctoJson);
                    listaDsctoJson.push(obj57listaDsctoJson);
                    listaDsctoJson.push(obj58listaDsctoJson);
                    listaDsctoJson.push(obj59listaDsctoJson);
                    listaDsctoJson.push(obj60listaDsctoJson);
                    listaDsctoJson.push(obj61listaDsctoJson);
                    listaDsctoJson.push(obj62listaDsctoJson);
                    listaDsctoJson.push(obj63listaDsctoJson);
                    listaDsctoJson.push(obj64listaDsctoJson);
                    listaDsctoJson.push(obj65listaDsctoJson);
                    listaDsctoJson.push(obj66listaDsctoJson);
                    listaDsctoJson.push(obj67listaDsctoJson);
                    listaDsctoJson.push(obj68listaDsctoJson);
                    listaDsctoJson.push(obj69listaDsctoJson);
                    listaDsctoJson.push(obj70listaDsctoJson);
                    listaDsctoJson.push(obj71listaDsctoJson);
                    listaDsctoJson.push(obj72listaDsctoJson);




            var listaRepJson = [];
                obj1listaRepJson = {};
                        
                            obj1listaRepJson.matPosicion = "" ; //10,
                            obj1listaRepJson.id = "" ; //1,
                            obj1listaRepJson.TipoReparto = "" ; //"",
                            obj1listaRepJson.Pos = "" ; //"0001",
                            obj1listaRepJson.PosCorto = "" ; //"1",
                            obj1listaRepJson.FechaEntrega = "" ; //"2014-02-01T05:00:00.000Z",
                            obj1listaRepJson.CantPed = "" ; //2,
                            obj1listaRepJson.CantConf = "" ; //2,
                            obj1listaRepJson.CodUMedida = "" ; //""},


                    listaRepJson.push(obj1listaRepJson);




            var listaIntJson = [];
                        var obj1listaIntJson ={};

                            obj1listaIntJson.id = 1;
                            obj1listaIntJson.PedidoId = "" ;
                            obj1listaIntJson.Funcion = "" ;
                            obj1listaIntJson.Codigo = "" ;
                            obj1listaIntJson.Ruc = "" ;
                            obj1listaIntJson.Descripcion = "" ;
                            obj1listaIntJson.Titulo = "" ;
                            obj1listaIntJson.Direccion = "" ;
                            obj1listaIntJson.DireccionCompleta = "" ;
                            obj1listaIntJson.Ciudad = "" ;
                            obj1listaIntJson.Pais = "" ;
                            obj1listaIntJson.CodigoPostal = "" ;
                            obj1listaIntJson.Distrito = "" ;
                            obj1listaIntJson.Telefono = "" ;
                            obj1listaIntJson.TelefonoMovil = "" ;
                            obj1listaIntJson.Mail = "" ;
                            obj1listaIntJson.PersonaFisica = "" ;
                            obj1listaIntJson.Eventual = "" ;
                            obj1listaIntJson.ApPat = "" ;
                            obj1listaIntJson.ApMat = "" ;
                            obj1listaIntJson.TranspZone = "" ;
                            obj1listaIntJson.CodPersona = "" ;
                            obj1listaIntJson.Nombre = "" ;
                            obj1listaIntJson.Apellido = "" ;
                            obj1listaIntJson.Iniciales = "" ;
                            obj1listaIntJson.ApeSoltero = "" ;
                            obj1listaIntJson.DescripcionP = "" ;
                            obj1listaIntJson.Dni = "" ;
                            obj1listaIntJson.TelefonoP = "" ;

                        var obj2listaIntJson = {};

                            obj2listaIntJson.id = 2;
                            obj2listaIntJson.PedidoId = "" ;
                            obj2listaIntJson.Funcion = "" ;
                            obj2listaIntJson.Codigo = "" ;
                            obj2listaIntJson.Ruc = "" ;
                            obj2listaIntJson.Descripcion = "" ;
                            obj2listaIntJson.Titulo = "" ;
                            obj2listaIntJson.Direccion = "" ;
                            obj2listaIntJson.DireccionCompleta = "" ;
                            obj2listaIntJson.Ciudad = "" ;
                            obj2listaIntJson.Pais = "" ;
                            obj2listaIntJson.CodigoPostal = "" ;
                            obj2listaIntJson.Distrito = "" ;
                            obj2listaIntJson.Telefono = "" ;
                            obj2listaIntJson.TelefonoMovil = "" ;
                            obj2listaIntJson.Mail = "" ;
                            obj2listaIntJson.PersonaFisica = "" ;
                            obj2listaIntJson.Eventual = "" ;
                            obj2listaIntJson.ApPat = "" ;
                            obj2listaIntJson.ApMat = "" ;
                            obj2listaIntJson.TranspZone = "" ;
                            obj2listaIntJson.CodPersona = "" ;
                            obj2listaIntJson.Nombre = "" ;
                            obj2listaIntJson.Apellido = "" ;
                            obj2listaIntJson.Iniciales = "" ;
                            obj2listaIntJson.ApeSoltero = "" ;
                            obj2listaIntJson.DescripcionP = "" ;
                            obj2listaIntJson.Dni = "" ;
                            obj2listaIntJson.TelefonoP = "" ;

                        var obj3listaIntJson = {};
                            obj3listaIntJson.id = 3;
                            obj3listaIntJson.PedidoId = "" ;
                            obj3listaIntJson.Funcion = "" ;
                            obj3listaIntJson.Codigo = "" ;
                            obj3listaIntJson.Ruc = "" ;
                            obj3listaIntJson.Descripcion = "" ;
                            obj3listaIntJson.Titulo = "" ;
                            obj3listaIntJson.Direccion = "" ;
                            obj3listaIntJson.DireccionCompleta = "" ;
                            obj3listaIntJson.Ciudad = "" ;
                            obj3listaIntJson.Pais = "" ;
                            obj3listaIntJson.CodigoPostal = "" ;
                            obj3listaIntJson.Distrito = "" ;
                            obj3listaIntJson.Telefono = "" ;
                            obj3listaIntJson.TelefonoMovil = "" ;
                            obj3listaIntJson.Mail = "" ;
                            obj3listaIntJson.PersonaFisica = "" ;
                            obj3listaIntJson.Eventual = "" ;
                            obj3listaIntJson.ApPat = "" ;
                            obj3listaIntJson.ApMat = "" ;
                            obj3listaIntJson.TranspZone = "" ;
                            obj3listaIntJson.CodPersona = "" ;
                            obj3listaIntJson.Nombre = "" ;
                            obj3listaIntJson.Apellido = "" ;
                            obj3listaIntJson.Iniciales = "" ;
                            obj3listaIntJson.ApeSoltero = "" ;
                            obj3listaIntJson.DescripcionP = "" ;
                            obj3listaIntJson.Dni = "" ;
                            obj3listaIntJson.TelefonoP = "" ;

                        var obj4listaIntJson = {};

                            obj4listaIntJson.id = 4;
                            obj4listaIntJson.PedidoId = "" ;
                            obj4listaIntJson.Funcion = "" ;
                            obj4listaIntJson.Codigo = "" ;
                            obj4listaIntJson.Ruc = "" ;
                            obj4listaIntJson.Descripcion = "" ;
                            obj4listaIntJson.Titulo = "" ;
                            obj4listaIntJson.Direccion = "" ;
                            obj4listaIntJson.DireccionCompleta = "" ;
                            obj4listaIntJson.Ciudad = "" ;
                            obj4listaIntJson.Pais = "" ;
                            obj4listaIntJson.CodigoPostal = "" ;
                            obj4listaIntJson.Distrito = "" ;
                            obj4listaIntJson.Telefono = "" ;
                            obj4listaIntJson.TelefonoMovil = "" ;
                            obj4listaIntJson.Mail = "" ;
                            obj4listaIntJson.PersonaFisica = "" ;
                            obj4listaIntJson.Eventual = "" ;
                            obj4listaIntJson.ApPat = "" ;
                            obj4listaIntJson.ApMat = "" ;
                            obj4listaIntJson.TranspZone = "" ;
                            obj4listaIntJson.CodPersona = "" ;
                            obj4listaIntJson.Nombre = "" ;
                            obj4listaIntJson.Apellido = "" ;
                            obj4listaIntJson.Iniciales = "" ;
                            obj4listaIntJson.ApeSoltero = "" ;
                            obj4listaIntJson.DescripcionP = "" ;
                            obj4listaIntJson.Dni = "" ;
                            obj4listaIntJson.TelefonoP = "" ;


                        var obj5listaIntJson = {};

                            obj5listaIntJson.id = 5;
                            obj5listaIntJson.PedidoId = "" ;
                            obj5listaIntJson.Funcion = "" ;
                            obj5listaIntJson.Codigo = "" ;
                            obj5listaIntJson.Ruc = "" ;
                            obj5listaIntJson.Descripcion = "" ;
                            obj5listaIntJson.Titulo = "" ;
                            obj5listaIntJson.Direccion = "" ;
                            obj5listaIntJson.DireccionCompleta = "" ;
                            obj5listaIntJson.Ciudad = "" ;
                            obj5listaIntJson.Pais = "" ;
                            obj5listaIntJson.CodigoPostal = "" ;
                            obj5listaIntJson.Distrito = "" ;
                            obj5listaIntJson.Telefono = "" ;
                            obj5listaIntJson.TelefonoMovil = "" ;
                            obj5listaIntJson.Mail = "" ;
                            obj5listaIntJson.PersonaFisica = "" ;
                            obj5listaIntJson.Eventual = "" ;
                            obj5listaIntJson.ApPat = "" ;
                            obj5listaIntJson.ApMat = "" ;
                            obj5listaIntJson.TranspZone = "" ;
                            obj5listaIntJson.CodPersona = "" ;
                            obj5listaIntJson.Nombre = "" ;
                            obj5listaIntJson.Apellido = "" ;
                            obj5listaIntJson.Iniciales = "" ;
                            obj5listaIntJson.ApeSoltero = "" ;
                            obj5listaIntJson.DescripcionP = "" ;
                            obj5listaIntJson.Dni = "" ;
                            obj5listaIntJson.TelefonoP = "" ;


                        var obj6listaIntJson = {};

                            obj6listaIntJson.id = 6;
                            obj6listaIntJson.PedidoId = "" ;
                            obj6listaIntJson.Funcion = "" ;
                            obj6listaIntJson.Codigo = "" ;
                            obj6listaIntJson.Ruc = "" ;
                            obj6listaIntJson.Descripcion = "" ;
                            obj6listaIntJson.Titulo = "" ;
                            obj6listaIntJson.Direccion = "" ;
                            obj6listaIntJson.DireccionCompleta = "" ;
                            obj6listaIntJson.Ciudad = "" ;
                            obj6listaIntJson.Pais = "" ;
                            obj6listaIntJson.CodigoPostal = "" ;
                            obj6listaIntJson.Distrito = "" ;
                            obj6listaIntJson.Telefono = "" ;
                            obj6listaIntJson.TelefonoMovil = "" ;
                            obj6listaIntJson.Mail = "" ;
                            obj6listaIntJson.PersonaFisica = "" ;
                            obj6listaIntJson.Eventual = "" ;
                            obj6listaIntJson.ApPat = "" ;
                            obj6listaIntJson.ApMat = "" ;
                            obj6listaIntJson.TranspZone = "" ;
                            obj6listaIntJson.CodPersona = "" ;
                            obj6listaIntJson.Nombre = "" ;
                            obj6listaIntJson.Apellido = "" ;
                            obj6listaIntJson.Iniciales = "" ;
                            obj6listaIntJson.ApeSoltero = "" ;
                            obj6listaIntJson.DescripcionP = "" ;
                            obj6listaIntJson.Dni = "" ;
                            obj6listaIntJson.TelefonoP = "" ;


                        var obj7listaIntJson = {};

                            obj7listaIntJson.id = 7;
                            obj7listaIntJson.PedidoId = "" ;
                            obj7listaIntJson.Funcion = "" ;
                            obj7listaIntJson.Codigo = "" ;
                            obj7listaIntJson.Ruc = "" ;
                            obj7listaIntJson.Descripcion = "" ;
                            obj7listaIntJson.Titulo = "" ;
                            obj7listaIntJson.Direccion = "" ;
                            obj7listaIntJson.DireccionCompleta = "" ;
                            obj7listaIntJson.Ciudad = "" ;
                            obj7listaIntJson.Pais = "" ;
                            obj7listaIntJson.CodigoPostal = "" ;
                            obj7listaIntJson.Distrito = "" ;
                            obj7listaIntJson.Telefono = "" ;
                            obj7listaIntJson.TelefonoMovil = "" ;
                            obj7listaIntJson.Mail = "" ;
                            obj7listaIntJson.PersonaFisica = "" ;
                            obj7listaIntJson.Eventual = "" ;
                            obj7listaIntJson.ApPat = "" ;
                            obj7listaIntJson.ApMat = "" ;
                            obj7listaIntJson.TranspZone = "" ;
                            obj7listaIntJson.CodPersona = "" ;
                            obj7listaIntJson.Nombre = "" ;
                            obj7listaIntJson.Apellido = "" ;
                            obj7listaIntJson.Iniciales = "" ;
                            obj7listaIntJson.ApeSoltero = "" ;
                            obj7listaIntJson.DescripcionP = "" ;
                            obj7listaIntJson.Dni = "" ;
                            obj7listaIntJson.TelefonoP = "" ;


                        var obj8listaIntJson = {};

                            obj8listaIntJson.id = 8;
                            obj8listaIntJson.PedidoId = "" ;
                            obj8listaIntJson.Funcion = "" ;
                            obj8listaIntJson.Codigo = "" ;
                            obj8listaIntJson.Ruc = "" ;
                            obj8listaIntJson.Descripcion = "" ;
                            obj8listaIntJson.Titulo = "" ;
                            obj8listaIntJson.Direccion = "" ;
                            obj8listaIntJson.DireccionCompleta = "" ;
                            obj8listaIntJson.Ciudad = "" ;
                            obj8listaIntJson.Pais = "" ;
                            obj8listaIntJson.CodigoPostal = "" ;
                            obj8listaIntJson.Distrito = "" ;
                            obj8listaIntJson.Telefono = "" ;
                            obj8listaIntJson.TelefonoMovil = "" ;
                            obj8listaIntJson.Mail = "" ;
                            obj8listaIntJson.PersonaFisica = "" ;
                            obj8listaIntJson.Eventual = "" ;
                            obj8listaIntJson.ApPat = "" ;
                            obj8listaIntJson.ApMat = "" ;
                            obj8listaIntJson.TranspZone = "" ;
                            obj8listaIntJson.CodPersona = "" ;
                            obj8listaIntJson.Nombre = "" ;
                            obj8listaIntJson.Apellido = "" ;
                            obj8listaIntJson.Iniciales = "" ;
                            obj8listaIntJson.ApeSoltero = "" ;
                            obj8listaIntJson.DescripcionP = "" ;
                            obj8listaIntJson.Dni = "" ;
                            obj8listaIntJson.TelefonoP = "" ;


                        var obj9listaIntJson = {};
                            obj9listaIntJson.id = 9;
                            obj9listaIntJson.PedidoId = "" ;
                            obj9listaIntJson.Funcion = "" ;
                            obj9listaIntJson.Codigo = "" ;
                            obj9listaIntJson.Ruc = "" ;
                            obj9listaIntJson.Descripcion = "" ;
                            obj9listaIntJson.Titulo = "" ;
                            obj9listaIntJson.Direccion = "" ;
                            obj9listaIntJson.DireccionCompleta = "" ;
                            obj9listaIntJson.Ciudad = "" ;
                            obj9listaIntJson.Pais = "" ;
                            obj9listaIntJson.CodigoPostal = "" ;
                            obj9listaIntJson.Distrito = "" ;
                            obj9listaIntJson.Telefono = "" ;
                            obj9listaIntJson.TelefonoMovil = "" ;
                            obj9listaIntJson.Mail = "" ;
                            obj9listaIntJson.PersonaFisica = "" ;
                            obj9listaIntJson.Eventual = "" ;
                            obj9listaIntJson.ApPat = "" ;
                            obj9listaIntJson.ApMat = "" ;
                            obj9listaIntJson.TranspZone = "" ;
                            obj9listaIntJson.CodPersona = "" ;
                            obj9listaIntJson.Nombre = "" ;
                            obj9listaIntJson.Apellido = "" ;
                            obj9listaIntJson.Iniciales = "" ;
                            obj9listaIntJson.ApeSoltero = "" ;
                            obj9listaIntJson.DescripcionP = "" ;
                            obj9listaIntJson.Dni = "" ;
                            obj9listaIntJson.TelefonoP = "" ;


                        var obj10listaIntJson = {};
                            obj10listaIntJson.id = 10;
                            obj10listaIntJson.PedidoId = "" ;
                            obj10listaIntJson.Funcion = "" ;
                            obj10listaIntJson.Codigo = "" ;
                            obj10listaIntJson.Ruc = "" ;
                            obj10listaIntJson.Descripcion = "" ;
                            obj10listaIntJson.Titulo = "" ;
                            obj10listaIntJson.Direccion = "" ;
                            obj10listaIntJson.DireccionCompleta = "" ;
                            obj10listaIntJson.Ciudad = "" ;
                            obj10listaIntJson.Pais = "" ;
                            obj10listaIntJson.CodigoPostal = "" ;
                            obj10listaIntJson.Distrito = "" ;
                            obj10listaIntJson.Telefono = "" ;
                            obj10listaIntJson.TelefonoMovil = "" ;
                            obj10listaIntJson.Mail = "" ;
                            obj10listaIntJson.PersonaFisica = "" ;
                            obj10listaIntJson.Eventual = "" ;
                            obj10listaIntJson.ApPat = "" ;
                            obj10listaIntJson.ApMat = "" ;
                            obj10listaIntJson.TranspZone = "" ;
                            obj10listaIntJson.CodPersona = "" ;
                            obj10listaIntJson.Nombre = "" ;
                            obj10listaIntJson.Apellido = "" ;
                            obj10listaIntJson.Iniciales = "" ;
                            obj10listaIntJson.ApeSoltero = "" ;
                            obj10listaIntJson.DescripcionP = "" ;
                            obj10listaIntJson.Dni = "" ;
                            obj10listaIntJson.TelefonoP = "" ;

                        var obj11listaIntJson = {};
                            obj11listaIntJson.id = 11;
                            obj11listaIntJson.PedidoId = "" ;
                            obj11listaIntJson.Funcion = "" ;
                            obj11listaIntJson.Codigo = "" ;
                            obj11listaIntJson.Ruc = "" ;
                            obj11listaIntJson.Descripcion = "" ;
                            obj11listaIntJson.Titulo = "" ;
                            obj11listaIntJson.Direccion = "" ;
                            obj11listaIntJson.DireccionCompleta = "" ;
                            obj11listaIntJson.Ciudad = "" ;
                            obj11listaIntJson.Pais = "" ;
                            obj11listaIntJson.CodigoPostal = "" ;
                            obj11listaIntJson.Distrito = "" ;
                            obj11listaIntJson.Telefono = "" ;
                            obj11listaIntJson.TelefonoMovil = "" ;
                            obj11listaIntJson.Mail = "" ;
                            obj11listaIntJson.PersonaFisica = "" ;
                            obj11listaIntJson.Eventual = "" ;
                            obj11listaIntJson.ApPat = "" ;
                            obj11listaIntJson.ApMat = "" ;
                            obj11listaIntJson.TranspZone = "" ;
                            obj11listaIntJson.CodPersona = "" ;
                            obj11listaIntJson.Nombre = "" ;
                            obj11listaIntJson.Apellido = "" ;
                            obj11listaIntJson.Iniciales = "" ;
                            obj11listaIntJson.ApeSoltero = "" ;
                            obj11listaIntJson.DescripcionP = "" ;
                            obj11listaIntJson.Dni = "" ;
                            obj11listaIntJson.TelefonoP = "" ;



                listaIntJson.push(obj1listaIntJson);
                listaIntJson.push(obj2listaIntJson);
                listaIntJson.push(obj3listaIntJson);
                listaIntJson.push(obj4listaIntJson);
                listaIntJson.push(obj5listaIntJson);
                listaIntJson.push(obj6listaIntJson);
                listaIntJson.push(obj7listaIntJson);
                listaIntJson.push(obj8listaIntJson);
                listaIntJson.push(obj9listaIntJson);
                listaIntJson.push(obj10listaIntJson);
                listaIntJson.push(obj11listaIntJson);






            var listaPedJson = "";

                var listaPedJson = [];
                        obj1listaPedJson = {};

                        obj1listaPedJson.id = "" ; //1497985445784,
                        obj1listaPedJson.CodTipoDoc = "" ; //"ZO01",
                        obj1listaPedJson.CodTipoDocAnt = "" ; //"",
                        obj1listaPedJson.Referencia = "" ; //"",
                        obj1listaPedJson.OrgVentas = "" ; //"1000",
                        obj1listaPedJson.CanalDist = "" ; //"10",
                        obj1listaPedJson.CodOficina = "" ; //"1010",
                        obj1listaPedJson.CondPago = "" ; //"E000",
                        obj1listaPedJson.Moneda = "" ; //"PEN",
                        obj1listaPedJson.CondExp = "" ; //"03",
                        obj1listaPedJson.FechaEntrega = "" ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.FechaReparto = "" ; //"2014-02-01T05:00:00.000Z",
                        obj1listaPedJson.TipoCambio = "" ; //3.282,
                        obj1listaPedJson.FechaFacturacion = "" ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.CodigoBanco = "" ; //"",
                        obj1listaPedJson.Motivo = "" ; //"002",
                        obj1listaPedJson.BloqueoEntrega = "" ; //"01",
                        obj1listaPedJson.BloqueoFactura = "" ; //"01",
                        obj1listaPedJson.OrdenCompra = "" ; //"7",
                        obj1listaPedJson.FechaPedido = "" ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.FechaValidez = "" ; //"2017-06-27T19:04:05.831Z",
                        obj1listaPedJson.Estado = "" ; //"",
                        obj1listaPedJson.nomProyecto = "" ; //"nombreProyecto",
                        obj1listaPedJson.TipoVisita = "" ; //"03",
                        obj1listaPedJson.cbxReembolsable = "" ; //false,
                        obj1listaPedJson.dsctoAdicionalZD12 = "" ; //0,
                        obj1listaPedJson.dsctoAdicionalZD12tmp = "" ; //0,
                        obj1listaPedJson.FechaPrecio = "" ; //null,
                        obj1listaPedJson.Mail = "" ; //"soli@hotmail.com",
                        obj1listaPedJson.BonoCampania = "" ; //"",
                        obj1listaPedJson.RegaloCampania = "" ; //"",
                        obj1listaPedJson.Reenbolsable = "" ; //false,
                        obj1listaPedJson.PedidoVenta1 = "" ; //"",
                        obj1listaPedJson.PedidoVenta2 = "" ; //"",
                        obj1listaPedJson.PedidoVenta3 = "" ; //"",
                        obj1listaPedJson.PedidoVenta4 = "" ; //"",
                        obj1listaPedJson.PedidoVisita1 = "" ; //"",
                        obj1listaPedJson.PedidoVisita2 = "" ; //"",
                        obj1listaPedJson.PedidoVisita3 = "" ; //"",
                        obj1listaPedJson.PedidoVisita4 = "" ; //"",
                        obj1listaPedJson.SubtotalImp = "" ; //0,
                        obj1listaPedJson.TieneEntrega = "" ; //false,
                        obj1listaPedJson.DocOriginal = "" ; //"",
                        obj1listaPedJson.Znpiso = "" ; //"",
                        obj1listaPedJson.Ztransporte = "" ; //"",
                        obj1listaPedJson.Zasensor = "" ; //false,
                        obj1listaPedJson.Zncservicio = "" ; //false,
                        obj1listaPedJson.TieneKitCombo = "" ; //false,
                        obj1listaPedJson.NumPedido = "" ; //"",
                        obj1listaPedJson.NumPedidoCorto = "" ; //"",
                        obj1listaPedJson.FechaPedidoString = "" ; //"",
                        obj1listaPedJson.FechaValidezString = "" ; //"",
                        obj1listaPedJson.FechaEntregaString = "" ; //"",
                        obj1listaPedJson.CodCliente = "" ; //"0000101317",
                        obj1listaPedJson.CodClienteCorto = "" ; //"",
                        obj1listaPedJson.CodGrupoVend = "" ; //"",
                        obj1listaPedJson.Sector = "" ; //"",
                        obj1listaPedJson.SubTotal = "" ; //155.67,
                        obj1listaPedJson.Igv = "" ; //28.02,
                        obj1listaPedJson.Total = "" ; //183.69,
                        obj1listaPedJson.TotalImp = "" ; //28.02,
                        obj1listaPedJson.PesoTotal = "" ; //0,
                        obj1listaPedJson.GrupoCond = "" ; //"01",
                        obj1listaPedJson.Tratado = "" ; //false,
                        obj1listaPedJson.ClasePedidoCliente = "" ; //"",
                        obj1listaPedJson.ClaseDocumento = "" ; //"",
                        obj1listaPedJson.CodVendedor1 = "" ; //"00001802",
                        obj1listaPedJson.NomVendedor1 = "" ; //"Julio Edgardo Pingo",
                        obj1listaPedJson.TotalConIgv = "" ; //0,
                        obj1listaPedJson.textoAtencion = "" ; //"observacionAtencion",
                        obj1listaPedJson.textoObsAdministrativas = "" ; //"observacionObservacionesAdministrativas",
                        obj1listaPedJson.textoRefFactura = "" ; //"observacionReferenciaFactura",
                        obj1listaPedJson.textoRefDireccion = "" ; //"observacionReferenciaDireccion",
                        obj1listaPedJson.correo = "" ; //"",
                        obj1listaPedJson.codigoSolicitante = "" ; //"",
                        obj1listaPedJson.codigoDestFact = "" ; //"",
                        obj1listaPedJson.codigoResPago = "" ; //"",
                        obj1listaPedJson.nombreSolicitante = "" ; //"",
                        obj1listaPedJson.direccionSolicitante = "" ; //"",
                        obj1listaPedJson.codigoPostalSolicitante = "" ; //"",
                        obj1listaPedJson.telefonoSolicitante = "" ; //"",
                        obj1listaPedJson.nifSolicitante = "" ; //"",
                        obj1listaPedJson.codigoDestMerc = "" ; //"",
                        obj1listaPedJson.nombreDestMerc = "" ; //"",
                        obj1listaPedJson.direccionDestMerc = "" ; //"",
                        obj1listaPedJson.codigoPostalDestMerc = "" ; //"",
                        obj1listaPedJson.telefonoDestMerc = "" ; //"",
                        obj1listaPedJson.telefonoMovilDestMerc = "" ; //"",
                        obj1listaPedJson.nombreDestFact = "" ; //"",
                        obj1listaPedJson.direccionDestFact = "" ; //"",
                        obj1listaPedJson.codigoPostalDestFact = "" ; //"",
                        obj1listaPedJson.telefonoDestFact = "" ; //"",
                        obj1listaPedJson.nombreResPago = "" ; //"",
                        obj1listaPedJson.direccionResPago = "" ; //"",
                        obj1listaPedJson.codigoPostalResPago = "" ; //"",
                        obj1listaPedJson.telefonoResPago = "" ; //"",
                        obj1listaPedJson.nifResPago = "" ; //"",
                        obj1listaPedJson.codigoCliente = "" ; //"0000101317",
                        obj1listaPedJson.nombreCliente = "" ; //"nombreSoli",
                        obj1listaPedJson.direccionCliente = "" ; //"direSoli",
                        obj1listaPedJson.apePatSolicitante = "" ; //"",
                        obj1listaPedJson.apeMatSolicitante = "" ; //"",
                        obj1listaPedJson.textoContacto = "" ; //"",
                        obj1listaPedJson.textoDatosAdicionalesCliente = "" ; //"",
                        obj1listaPedJson.textoTelefonos = "" ; //"",
                        obj1listaPedJson.textoDescripcionVisita = "" ; //"",
                        obj1listaPedJson.textoResultadoVisita = "" ; //"",
                        obj1listaPedJson.textoDescripcionServInstalacion = "" ; //"",


                        ////////////////////////////////////
                        var datosCliente = {}; //Un objeto puede estar dentro de otro ? Preguntar a Franz

                                /*
                                datosCliente.1 = "" ; //"1",
                                datosCliente.10 = "" ; //"1",
                                datosCliente.15 = "" ; //"1",
                                datosCliente.20 = "" ; //"",
                                datosCliente.25 = "" ; //"1",
                                datosCliente.35 = "" ; //"30",

                                */
                                datosCliente.CODIG = "" ; //"87654321",
                                datosCliente.APPAT = "" ; //"apellidoPSoli",
                                datosCliente.APMAT = "" ; //"apellidoMSoli",
                                datosCliente.NOMBRE = "" ; //"nombreSoli",
                                datosCliente.FECNAC = "" ; //"2013-06-20T11:00:00.000Z",
                                datosCliente.GRAINS = "" ; //"10",
                                datosCliente.SEXO = "" ; //"1",
                                datosCliente.CIUDAD = "" ; //"140101",
                                datosCliente.EDAD = "" ; //"4",
                                datosCliente.RANGOED = "" ; //"1",
                                datosCliente.NIVELSE = "" ; //"A",
                                datosCliente.DIREC = "" ; //"direSoli"},

                        //obj1listaPedJson.datosCliente;
                            ///////////////////////////////


                        obj1listaPedJson.listaPre = "" ; //"",
                        obj1listaPedJson.TotalDcto = "" ; //0,
                        obj1listaPedJson.codProyecto = "" ; //"codigoProyecto",
                        obj1listaPedJson.codVersion = "" ; //"1025",
                        obj1listaPedJson.GrupoForecast = "" ; //"01",
                        obj1listaPedJson.TipoForecast = "" ; //" ",
                        obj1listaPedJson.NoImpFac = "" ; //"",
                        obj1listaPedJson.Certificado = "" ; //"nroCertificado",
                        obj1listaPedJson.FechaVisita = "" ; //"2017-08-01T05:00:00.000Z"}




                        listaPedJson.push(obj1listaPedJson);






            var listadatosCliente = {}; // se envia de frente

     /*
                                datosCliente.1 = "" ; //"1",
                                datosCliente.10 = "" ; //"1",
                                datosCliente.15 = "" ; //"1",
                                datosCliente.20 = "" ; //"",
                                datosCliente.25 = "" ; //"1",
                                datosCliente.35 = "" ; //"30",

                                */
                                datosCliente.CODIG = "" ; //"87654321",
                                datosCliente.APPAT = "" ; //"apellidoPSoli",
                                datosCliente.APMAT = "" ; //"apellidoMSoli",
                                datosCliente.NOMBRE = "" ; //"nombreSoli",
                                datosCliente.FECNAC = "" ; //"2013-06-20T11:00:00.000Z",
                                datosCliente.GRAINS = "" ; //"10",
                                datosCliente.SEXO = "" ; //"1",
                                datosCliente.CIUDAD = "" ; //"140101",
                                datosCliente.EDAD = "" ; //"4",
                                datosCliente.RANGOED = "" ; //"1",
                                datosCliente.NIVELSE = "" ; //"A",
                                datosCliente.DIREC = "" ; //"direSoli"},





            var CodigoVendedor = ""; //00001802
            var numPedido = "";
            var op = "crear";


            //////////////////////////////////////////////////////////

                    var result = guardarDocumento.guardar(codigoCliente,
                                                            nombreCliente,
                                                            CodOficina,
                                                            CondPago,
                                                            Moneda,
                                                            TipoCambio,
                                                            dsctoAdicionalZD12,
                                                            pesoTotal,
                                                            FechaFacturacion,
                                                            GrupoCond,
                                                            Motivo,
                                                            BloqueoFactura,
                                                            BloqueoEntrega,
                                                            OrdenCompra,
                                                            FechaPedido,
                                                            FechaValidez,
                                                            FechaEntrega,
                                                            CondExp,
                                                            FechaReparto,
                                                            nomProyecto,
                                                            codProyecto,
                                                            codVersion,
                                                            TipoVisita,
                                                            cbxReembolsable,
                                                            GrupoForecast,
                                                            TipoForecast,
                                                            Certificado,
                                                            FechaVisita,
                                                            listaMatJson,
                                                            listaDsctoJson,
                                                            listaRepJson,
                                                            listaIntJson,
                                                            listaPedJson,
                                                            listadatosCliente,
                                                            CodigoVendedor,
                                                            numPedido,
                                                            op);

                            if (result.c === "s") {

                                if (result.data.success) {

                                    this.getView().getModel().setProperty("/RetornoGuardarDocumento", result.data);
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
        },


        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },

        //Boton Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").open()
        },
        onDocNuevoCloseBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").close()
        },

        //Navegacion Master
        onDocNuevoPressMasterBack: function () {
        },

        //Buscar Producto
        onDocNuevodlg_buscar: function () {

            this.getView().byId("dlg_DocNuevobuscar").open();
        },
        onDocNuevoClosedlg_buscar: function () {
            this.getView().byId("dlg_DocNuevobuscar").close();
        },

        //Abrir Dialog para Agregar Producto
        onDocNuevodlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").open();
        },

        onDocNuevoClosedlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").close();
        },

        //Boton Añadir Producto desde el Dialog
        onDocNuevoMasterProductosAdd: function () {

            this.getView().byId("dlg_DocNuevoaddProducto").close();

        },

        //Boton Buscar Producto desde el Dialog
        onDocNuevoMasterProductosBuscar: function () {



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
        onDocNuevoAddinBuscar: function () {
            MessageToast.show("Producto Añadido");
        },

        /*
         onDocNuevoSemanticButtonPress: function(evt) {
         MessageToast.show(evt.getSource().getText() + " Pressed");
         
         },
         */

        //Boton Master Datos
        onDocNuevoMasterDatos: function (oEvent) {
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoDatos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));


        },

        //Boton Master Producto
        onDocNuevoMasterProductos: function (oEvent) {
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));

        },

        //Lista de Master Datos
        onListaMasterDatos:function(evt){
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();

            if(obj.codigo===1){
                    this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"))
                }

                if(obj.codigo===2){
                    this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail2"))
                }

                if(obj.codigo===3){
                    this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail3"))
                }


        },

        //Lista de Master Productos
        onDocNuevoListMasterProductos: function (oEvent) {
        },

        //Abrir Dialog Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").open()
        },

        //Cerrar Dialog Seleccionar Cliente
        onDocNuevoCloseSeleccionarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close()
        },

        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaCliente: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/clienteSeleccionado", obj);
            this.getView().getModel().refresh();



            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductosBuscarCliente"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_cliente_buscado"));
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
            this.getView().byId("dlg_DocNuevobuscarCliente").close();

            console.log(obj.codigo);
        },

        //Al presionar en la Lista de los Clientes Buscados
        onDocNuevoListBuscarCliente: function () {
        },

        //Al Presionar Boton Buscar Cliente desde el Dialog
        onDocNuevoBuscarClienteAccion: function () {
            var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
            var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();

            if (ruc || nombre) {

                var result = clienteServices.buscarCliente(ruc, nombre);

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

        goStockDisponible: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockDisponible");
        },
        goStockporLlegar: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockporLlegar");
        },
        goStockporPedir: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockporPedir");
        },

        //Seleccionar Categoria
        /*onSeleccionarCategoria: function(){
         var categoria = this.getView().byId("comboCategoria").getSelectedKey();
         var linea[] = window.dataIni.lstLinea;
         var listaL[];
         
         for (var i = 0; i < (linea[].lenght); i++) {
         
         
         
         if(linea[]{Codigo} == categoria ){
         listaL[].push(linea[]{Descripcion});
         
         }
         
         
         }
         this.getView().getModel().setProperty("/ListaLinea",listaL[]);
         
         },*/



        //Stock Buscar


        onDocNuevoCloseSeleccionarMaterial: function () {
            this.getView().byId("dlg_BuscarMateriales").close();
        },

        onDocNuevoBuscarMateriales: function (oEvent) {
            //this.showBusyIndicator(4000, 0);

            //Busy Dialog
            /*if (!this._dialog) {
             this._dialog = sap.ui.xmlfragment("pe.com.seidor.sap.decor.ventas.view.BusyDialog", this);
             this.getView().addDependent(this._dialog);
             }
             
             // open dialog
             jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._dialog);
             this._dialog.open();
             
             // simulate end of operation
             _timeout = jQuery.sap.delayedCall(20000, this, function () {
             this._dialog.close();
             });*/

            //

            var codigo = this.getView().byId("txt_codigo_material_busqueda").getValue();
            var codigoAntiguo = this.getView().byId("txt_codigoAntiguo_material_busqueda").getValue();
            var descripcionMaterial = this.getView().byId("txt_descripcionMaterial_material_busqueda").getValue();
            var categoria = this.getView().byId("comboCategoria").getSelectedKey();
            var linea = this.getView().byId("comboLinea").getSelectedKey();
            var marca = this.getView().byId("comboMarca").getSelectedKey();

            var orgVentas = window.dataIni.person.OrgVentas;
            var canalDist = window.dataIni.person.CanalDist;
            var ofVentas = window.dataIni.person.OfVentas;

            this.getView().byId("loadingControl").open(); // INDICADOR
            var result = materialServices.buscarmaterial(codigo, codigoAntiguo, descripcionMaterial, categoria, linea, marca, orgVentas, canalDist, ofVentas);
             
            if (result.c === "s") {
                 this.getView().byId("dlg_DocNuevobuscar").close();
                if (result.data.success) {

                    this.getView().getModel().setProperty("/BusquedaMateriales", result.data.materiales);
                    this.getView().getModel().setProperty("/RetornolstCentros", result.data.lstCentros);
                    this.getView().byId("dlg_BuscarMateriales").open();
                    this.getView().getModel().refresh();
                    this.getView().byId("loadingControl").close();
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
        },

        onDocNuevoAnadirMaterial: function () {
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").open();
        },

        //Seleccionar Categoria
        onSeleccionarCategoria: function () {
            var categoria = this.getView().byId("comboCategoria").getSelectedKey();
            var linea = window.dataIni.lstLinea;
            var itemLleno = [];

            console.log(categoria);

            for (var i = 0; i < linea.length; i++) {
                var item = linea[i];
                var itemcod = item.Codigo;


                if (itemcod.substring(0, 2) == categoria) {

                    itemLleno.push(item);


                }
            }
            ;
            this.getView().getModel().setProperty("/listaLinea", itemLleno);
            this.getView().getModel().refresh();
            console.log(itemLleno.Codigo);

        },

        onSeleccionarLinea: function () {
            var linea = this.getView().byId("comboLinea").getSelectedKey();
            var marca = window.dataIni.lstMarca;
            var itemLleno = [];

            for (var i = 0; i < marca.length; i++) {
                var item = marca[i];
                var itemcod = item.Codigo;


                if (itemcod.substring(0, 5) == linea) {

                    itemLleno.push(item);
                    console.log(item);

                }







            }
            ;
            this.getView().getModel().setProperty("/listaMarca", itemLleno);
            this.getView().getModel().refresh();
        },

        onDocNuevoClosedlg_addProductoonDialog: function () {
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();

        },





//Busy Indicador------------

        hideBusyIndicator: function () {
            sap.ui.core.BusyIndicator.hide();
        },

        showBusyIndicator: function (iDuration, iDelay) {
            sap.ui.core.BusyIndicator.show(iDelay);

            if (iDuration && iDuration > 0) {
                if (this._sTimeoutId) {
                    jQuery.sap.clearDelayedCall(this._sTimeoutId);
                    this._sTimeoutId = null;
                }

                this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
                    this.hideBusyIndicator();
                });
            }
        },

// this.showBusyIndicator(4000, 0);
//--------------------------

        onSiMensajeAviso1: function () {
            
            var objSeleccionado = this.getView().getModel().getProperty("/materialSelec");
            var listaDisplay = this.getView().getModel().getProperty("/listaMatAnadido");
            
            if(listaDisplay){
                listaDisplay.push(objSeleccionado);
            }else{
                
                listaDisplay = [];
                listaDisplay.push(objSeleccionado);
                
            }
            
            this.getView().getModel().setProperty("/listaMatAnadido",listaDisplay);
            this.getView().getModel().refresh();
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();


        },

        onNoMensajeAviso1: function () {

            var objSeleccionado = this.getView().getModel().getProperty("/materialSelec");
            var listaDisplay = this.getView().getModel().getProperty("/listaMatAnadido");
            
            if(listaDisplay){
                listaDisplay.push(objSeleccionado);
            }else{
                
                listaDisplay = [];
                listaDisplay.push(objSeleccionado);
                
            }
            
            this.getView().getModel().setProperty("/listaMatAnadido",listaDisplay);
            this.getView().getModel().refresh();
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevobuscar").close();
            this.getView().byId("dlg_BuscarMateriales").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();


        },

        

        SeleccionarMaterial: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();

            //var item=[];
            //var item = { CodMaterial: "{/materialSelec/CodMaterial}" , DescMaterial: "{/materialSelec/DescMaterial}" };


            
            this.getView().getModel().setProperty("/materialSelec", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
        },



        onSeleccionarCaracteristicas: function (oEvent) {
            var caracteristicas = this.getView().byId("comboCategoria").getSelectedKey();
            var dlg = "dlg_categoria_";
            var dlgtotal = dlg.concat(caracteristicas);



            if (caracteristicas !== " ") {

                if (caracteristicas == "08" | caracteristicas == "10" | caracteristicas == "12" | caracteristicas == "13" | caracteristicas == "16" | caracteristicas == "99") {
                    MessageToast.show("No se encontraron Características");
                } else {
                    this.getView().byId(dlgtotal).open();
                }

            } else {

                console.log(caracteristicas);
                MessageToast.show("Seleccione una Categoría", {
                    horizontally: 'center',
                    vertically: 'center'
                });


            }







        },

        onVolverCate01: function () {
            this.getView().byId("dlg_categoria_01").close();
        },
        onVolverCate02: function () {
            this.getView().byId("dlg_categoria_02").close();
        },
        onVolverCate03: function () {
            this.getView().byId("dlg_categoria_03").close();
        },
        onVolverCate04: function () {
            this.getView().byId("dlg_categoria_04").close();
        },
        onVolverCate05: function () {
            this.getView().byId("dlg_categoria_05").close();
        },
        onVolverCate06: function () {
            this.getView().byId("dlg_categoria_06").close();
        },
        onVolverCate07: function () {
            this.getView().byId("dlg_categoria_07").close();
        },
        onVolverCate09: function () {
            this.getView().byId("dlg_categoria_09").close();
        },
        onVolverCate11: function () {
            this.getView().byId("dlg_categoria_11").close();
        },
        onVolverCate14: function () {
            this.getView().byId("dlg_categoria_14").close();
        },
        onVolverCate15: function () {
            this.getView().byId("dlg_categoria_15").close();
        },

        show4000_0: function () {
            this.showBusyIndicator(4000, 0);
        },



        //onAnadirMaterial

        onDocNuevoMasterProductosAddonDialog: function (evt) {
            var Materiales = this.getView().getModel().getProperty("/materialSelec/CodMaterial");

            console.log(Materiales);


                var objetoDetalle = [];
                var objDet = {};
                        objDet.Posicion = this.getView().getModel().getProperty("/materialSelec/Posicion"); 
                        objDet.CodMaterial = this.getView().getModel().getProperty("/materialSelec/CodMaterial"); 
                        objDet.UMedidaRendimiendo = this.getView().getModel().getProperty("/materialSelec/UMedidaRendimiendo");
                        objDet.ValorRendimiento = this.getView().getModel().getProperty("/materialSelec/ValorRendimiento");
                        objDet.Tipo = this.getView().getModel().getProperty("/materialSelec/Tipo");
                        objDet.Descontinuado = this.getView().getModel().getProperty("/materialSelec/Descontinuado");
                        objDet.CodMaterialCorto = this.getView().getModel().getProperty("/materialSelec/CodMaterialCorto");
                        objDet.CodLote = "" ;
                        objDet.CodAlmacen = "" ;
                        objDet.CodCentro = "" ;
                        objDet.DescMaterial = this.getView().getModel().getProperty("/materialSelec/DescMaterial");
                        objDet.CodUMedida = this.getView().getModel().getProperty("/materialSelec/CodUMedida");
                        objDet.Rendimiento = this.getView().getModel().getProperty("/materialSelec/Rendimiento");
                        objDet.PrioridadEntrega = "" ;
                        objDet.PrecioUnit = this.getView().getModel().getProperty("/materialSelec/PrecioUnit");
                        objDet.Peso = this.getView().getModel().getProperty("/materialSelec/Peso");
                        objDet.PosSup = "" ;
                        objDet.Stock = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objDet.DescMovil = this.getView().getModel().getProperty("/materialSelec/DescMovil");
                        objDet.EsFlete = this.getView().getModel().getProperty("/materialSelec/EsFlete");
                        objDet.EsEstiba = this.getView().getModel().getProperty("/materialSelec/EsEstiba");
                        objDet.EspecialServ = this.getView().getModel().getProperty("/materialSelec/EspecialServ");
                        objDet.TieneServ = this.getView().getModel().getProperty("/materialSelec/TieneServ");
                        objDet.TipoMaterial = this.getView().getModel().getProperty("/materialSelec/TipoMaterial");
                        objDet.Jerarquia = this.getView().getModel().getProperty("/materialSelec/Jerarquia");
                        objDet.Cantidad = this.getView().byid("txt_cantidad_material").getValue();
                        objDet.FechaCantConf = "" ;
                        objDet.DescCentro = "" ;
                        objDet.DescAlmacen = "" ;
                        objDet.CodGrupoMat = "" ;
                        objDet.DesGrupoMat = "" ;
                        objDet.Opcion = this.getView().byId("com_opcion_material").getSelectedKey();
                        objDet.id = "" ;
                        objDet.Descripcion = this.getView().getModel().getProperty("/materialSelec/Descripcion");
                        objDet.Mstae = this.getView().getModel().getProperty("/materialSelec/MSTAE");
                        objDet.Vdscto = "" ;
                        objDet.StatusDespacho = this.getView().getModel().getProperty("/materialSelec/StatusDespacho");
                        objDet.StockPos = this.getView().getModel().getProperty("/materialSelec/StockPos");
                        objDet.PrecioSinIGV = "" ;
                        objDet.DsctoMontTotal = "" ;
                        objDet.MotivoRechazo = "" ;
                        objDet.TipoPosAnt = "" ;
                        objDet.Reembolsable = "" ;
                        objDet.Zservicio = "" ;
                        objDet.ContentID = "" ;
                        objDet.DescMaterialTicketera = "" ;
                        objDet.FechaCantConfStr = "" ;
                        objDet.PosSupCorto = "" ;
                        objDet.TipoPosicion = "" ;
                        objDet.CambAlmacen = "" ;
                        objDet.CantComp = "" ;
                        objDet.PrecioTotal = "" ;
                        objDet.PrecioUnitario = this.getView().getModel().getProperty("/materialSelec/PrecioUnitario");
                        objDet.Total = "" ;
                        objDet.IgvUnitario = "" ;
                        objDet.IgvTotal = "" ;
                        objDet.TotalDctos = "" ;
                        objDet.SubTotal = "" ;
                        objDet.CantConfirmada = "" ;
                        objDet.PesoNeto = "" ;
                        objDet.PrecioConIGV = "" ;
                        objDet.TotalImpresion = "" ;
                        objDet.FechaEntregaString = "" ;
                        objDet.Reparto = "" ;
                        objDet.TotPercep = "" ;
                        objDet.link = "" ;
                        objDet.DivisionRendimiento = "" ;
                        objDet.mod = "" ;
                        objDet.PosicionCorto = "" ;
                        objDet.SubTotalLista = "" ;
                        objDet.fullName = "" ;


                    objetoDetalle.push(objDet);
            
                var objetoMaterial = [];
                var objMat = {};

                        objMat.Stock = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.CodMaterial = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.DescMaterial = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.Descripcion = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.CodUMedida = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.PrecioUnit = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.Jerarquia = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.Peso = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.UMedidaRendimiendo = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.ValorRendimiento = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.Rendimiento = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.TipoMaterial = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.EsFlete = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.EsEstiba = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.EspecialServ = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.Tipo = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.CodMaterialCorto = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.TieneServ = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.Descontinuado = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.DescMovil = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.sStock = "";
                        objMat.Posicion = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.PrecioUnitario = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.Catalogo = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.StatusDespacho = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.StockPos = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.link = "";
                        objMat.MSTAE = this.getView().getModel().getProperty("/materialSelec/Stock");
                        objMat.CodAntiguo = "" ;//del Dialog
                        objMat.id = 22;

                    objetoMaterial.push(objMat);

                var objetoPedido = {}; // enviar defrente como parámetro


                objetoPedido.id = 1497985445784;
                objetoPedido.CodTipoDoc = this.getView().getModel().getProperty("/documentoSeleccionado/Codigo");
                objetoPedido.CodTipoDocAnt = "";
                objetoPedido.Referencia = this.getView().byId("txt_refDocNuevo").getValue();
                objetoPedido.OrgVentas = window.dataIni.person.OrgVentas;
                objetoPedido.CanalDist = window.dataIni.person.CanalDist;
                objetoPedido.CodOficina = window.dataIni.person.OfVentas;
                objetoPedido.CondPago = this.getView().byId("com_condPago_pago").getSelectedKey();
                objetoPedido.Moneda = this.getView().byId("com_moneda_pago").getSelectedKey();
                objetoPedido.CondExp = "03";
                objetoPedido.FechaEntrega = this.getView().byId("date_fechaEntReferencial_datosDocumento").getValue();
                objetoPedido.FechaReparto = this.getView().byId("date_fechaDespachoReparto_datosDocumento").getValue();
                objetoPedido.TipoCambio = this.getView().byId("txt_tipoCambio_pago").getSelectedKey();
                objetoPedido.FechaFacturacion = this.getView().byId("date_fechaFacturacion_datosFacturacion").getValue();
                objetoPedido.CodigoBanco = this.getView().byId("com_nombreBanco_datosFacturacion").getSelectedKey(); //Piden codigo, cambiar luego
                objetoPedido.Motivo = this.getView().byId("com_motivoNcNd_datosFacturacion").getSelectedKey();
                objetoPedido.BloqueoEntrega = this.getView().byId("com_bloqueoEntrega_datosFacturacion").getSelectedKey();
                objetoPedido.BloqueoFactura = this.getView().byId("com_bloqueoFactura_datosFacturacion").getSelectedKey();
                objetoPedido.OrdenCompra = this.getView().byId("txt_nroOrdenCompra_datosDocumento").getValue();
                objetoPedido.FechaPedido = this.getView().byId("date_fechaPedido_datosDocumento").getValue();
                objetoPedido.FechaValidez = this.getView().byId("date_fechaValidez_datosDocumento").getValue();
                objetoPedido.Estado = "";
                objetoPedido.nomProyecto = this.getView().byId("txt_nombreProyecto_proyectoVisita").getValue();
                objetoPedido.TipoVisita = this.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey();
                objetoPedido.cbxReembolsable = this.getView().byId("check_visitaNoReembolsable_proyectoVisita").getSelected();
                objetoPedido.dsctoAdicionalZD12 = 0;
                objetoPedido.dsctoAdicionalZD12tmp = 0;
                objetoPedido.FechaPrecio = "" ;
                objetoPedido.Mail = "" ;
                objetoPedido.BonoCampania = "" ;
                objetoPedido.RegaloCampania = "" ;
                objetoPedido.Reenbolsable = "" ;
                objetoPedido.PedidoVenta1 = "" ;
                objetoPedido.PedidoVenta2 = "" ;
                objetoPedido.PedidoVenta3 = "" ;
                objetoPedido.PedidoVenta4 = "" ;
                objetoPedido.PedidoVisita1 = "" ;
                objetoPedido.PedidoVisita2 = "" ;
                objetoPedido.PedidoVisita3 = "" ;
                objetoPedido.PedidoVisita4 = "" ;
                objetoPedido.SubtotalImp = "" ;
                objetoPedido.TieneEntrega = "" ;
                objetoPedido.DocOriginal = "" ;
                objetoPedido.Znpiso = "" ;
                objetoPedido.Ztransporte = "" ;
                objetoPedido.Zasensor = "" ;
                objetoPedido.Zncservicio = "" ;
                objetoPedido.TieneKitCombo = "" ;
                objetoPedido.NumPedido = "" ;
                objetoPedido.NumPedidoCorto = "" ;
                objetoPedido.FechaPedidoString = "" ;
                objetoPedido.FechaValidezString = "" ;
                objetoPedido.FechaEntregaString = "" ;
                objetoPedido.CodCliente = "" ;
                objetoPedido.CodClienteCorto = "" ;
                objetoPedido.CodGrupoVend = "" ;
                objetoPedido.Sector = "" ;
                objetoPedido.SubTotal = "" ;
                objetoPedido.Igv = "" ;
                objetoPedido.Total = "" ;
                objetoPedido.TotalImp = "" ;
                objetoPedido.PesoTotal = "" ;
                objetoPedido.GrupoCond = "" ;
                objetoPedido.Tratado = "" ;
                objetoPedido.ClasePedidoCliente = "" ;
                objetoPedido.ClaseDocumento = "" ;
                objetoPedido.CodVendedor1 = "" ;
                objetoPedido.NomVendedor1 = "" ;
                objetoPedido.TotalConIgv = "" ;
                objetoPedido.textoAtencion = "" ;
                objetoPedido.textoObsAdministrativas = "" ;
                objetoPedido.textoRefFactura = "" ;
                objetoPedido.textoRefDireccion = "" ;
                objetoPedido.correo = "" ;
                objetoPedido.codigoSolicitante = "" ;
                objetoPedido.codigoDestFact = "" ;
                objetoPedido.codigoResPago = "" ;
                objetoPedido.nombreSolicitante = "" ;
                objetoPedido.direccionSolicitante = "" ;
                objetoPedido.codigoPostalSolicitante = "" ;
                objetoPedido.telefonoSolicitante = "" ;
                objetoPedido.nifSolicitante = "" ;
                objetoPedido.codigoDestMerc = "" ;
                objetoPedido.nombreDestMerc = "" ;
                objetoPedido.direccionDestMerc = "" ;
                objetoPedido.codigoPostalDestMerc = "" ;
                objetoPedido.telefonoDestMerc = "" ;
                objetoPedido.telefonoMovilDestMerc = "" ;
                objetoPedido.nombreDestFact = "" ;
                objetoPedido.direccionDestFact = "" ;
                objetoPedido.codigoPostalDestFact = "" ;
                objetoPedido.telefonoDestFact = "" ;
                objetoPedido.nombreResPago = "" ;
                objetoPedido.direccionResPago = "" ;
                objetoPedido.codigoPostalResPago = "" ;
                objetoPedido.telefonoResPago = "" ;
                objetoPedido.nifResPago = "" ;
                objetoPedido.codigoCliente = "" ;
                objetoPedido.nombreCliente = "" ;
                objetoPedido.direccionCliente = "" ;
                objetoPedido.apePatSolicitante = "" ;
                objetoPedido.apeMatSolicitante = "" ;
                objetoPedido.textoContacto = "" ;
                objetoPedido.textoDatosAdicionalesCliente = "" ;
                objetoPedido.textoTelefonos = "" ;
                objetoPedido.textoDescripcionVisita = "" ;
                objetoPedido.textoResultadoVisita = "" ;
                objetoPedido.textoDescripcionServInstalacion = "" ;
                objetoPedido.datosCliente = "" ;
                objetoPedido.listaPre = "" ;
                objetoPedido.TotalDcto = "" ;
                objetoPedido.codProyecto = "" ;
                objetoPedido.codVersion = "" ;
                objetoPedido.GrupoForecast = "" ;
                objetoPedido.TipoForecast = "" ;
                objetoPedido.NoImpFac = "" ;
                objetoPedido.Certificado = "" ;
                objetoPedido.FechaVisita = "" ;


                var anadirMat = 1;



            var result = materialServices.anadirMaterial(objetoDetalle,objetoMaterial,objetoPedido,anadirMat);

            /*
            var objetoDetalle = 
            var objetoMaterial = 
            var objetoPedido = 
            var categoria = 
            var anadirMat = 

            this.getView().byId("loadingControl").open(); // INDICADOR
            var result = materialServices.anadirMaterial(objetoDetalle,objetoMaterial,objetoPedido,anadirMat);
             
            if (result.c === "s") {
                 this.getView().byId("dlg_DocNuevobuscar").close();
                if (result.data.success) {

                    this.getView().getModel().setProperty("/BusquedaMateriales", result.data.materiales);
                    this.getView().getModel().setProperty("/RetornolstCentros", result.data.lstCentros);
                    this.getView().byId("dlg_BuscarMateriales").open();
                    this.getView().getModel().refresh();
                    this.getView().byId("loadingControl").close();
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

                objetoDetalle,objetoMaterial,objetoPedido,anadirMat
            */
            
            this.getView().byId("dlg_MensajeAviso1").open();

            
        },


        

        onBtnRefresh:function(){





            //material.aspx

                var dsctoLotes = 2;
                var listaInterJson = [];
                        var obj1listaInterJson ={};

                            obj1listaInterJson.id = 1;
                            obj1listaInterJson.PedidoId = "" ;
                            obj1listaInterJson.Funcion = "" ;
                            obj1listaInterJson.Codigo = "" ;
                            obj1listaInterJson.Ruc = "" ;
                            obj1listaInterJson.Descripcion = "" ;
                            obj1listaInterJson.Titulo = "" ;
                            obj1listaInterJson.Direccion = "" ;
                            obj1listaInterJson.DireccionCompleta = "" ;
                            obj1listaInterJson.Ciudad = "" ;
                            obj1listaInterJson.Pais = "" ;
                            obj1listaInterJson.CodigoPostal = "" ;
                            obj1listaInterJson.Distrito = "" ;
                            obj1listaInterJson.Telefono = "" ;
                            obj1listaInterJson.TelefonoMovil = "" ;
                            obj1listaInterJson.Mail = "" ;
                            obj1listaInterJson.PersonaFisica = "" ;
                            obj1listaInterJson.Eventual = "" ;
                            obj1listaInterJson.ApPat = "" ;
                            obj1listaInterJson.ApMat = "" ;
                            obj1listaInterJson.TranspZone = "" ;
                            obj1listaInterJson.CodPersona = "" ;
                            obj1listaInterJson.Nombre = "" ;
                            obj1listaInterJson.Apellido = "" ;
                            obj1listaInterJson.Iniciales = "" ;
                            obj1listaInterJson.ApeSoltero = "" ;
                            obj1listaInterJson.DescripcionP = "" ;
                            obj1listaInterJson.Dni = "" ;
                            obj1listaInterJson.TelefonoP = "" ;

                        var obj2listaInterJson = {};

                            obj2listaInterJson.id = 2;
                            obj2listaInterJson.PedidoId = "" ;
                            obj2listaInterJson.Funcion = "" ;
                            obj2listaInterJson.Codigo = "" ;
                            obj2listaInterJson.Ruc = "" ;
                            obj2listaInterJson.Descripcion = "" ;
                            obj2listaInterJson.Titulo = "" ;
                            obj2listaInterJson.Direccion = "" ;
                            obj2listaInterJson.DireccionCompleta = "" ;
                            obj2listaInterJson.Ciudad = "" ;
                            obj2listaInterJson.Pais = "" ;
                            obj2listaInterJson.CodigoPostal = "" ;
                            obj2listaInterJson.Distrito = "" ;
                            obj2listaInterJson.Telefono = "" ;
                            obj2listaInterJson.TelefonoMovil = "" ;
                            obj2listaInterJson.Mail = "" ;
                            obj2listaInterJson.PersonaFisica = "" ;
                            obj2listaInterJson.Eventual = "" ;
                            obj2listaInterJson.ApPat = "" ;
                            obj2listaInterJson.ApMat = "" ;
                            obj2listaInterJson.TranspZone = "" ;
                            obj2listaInterJson.CodPersona = "" ;
                            obj2listaInterJson.Nombre = "" ;
                            obj2listaInterJson.Apellido = "" ;
                            obj2listaInterJson.Iniciales = "" ;
                            obj2listaInterJson.ApeSoltero = "" ;
                            obj2listaInterJson.DescripcionP = "" ;
                            obj2listaInterJson.Dni = "" ;
                            obj2listaInterJson.TelefonoP = "" ;

                        var obj3listaInterJson = {};
                            obj3listaInterJson.id = 3;
                            obj3listaInterJson.PedidoId = "" ;
                            obj3listaInterJson.Funcion = "" ;
                            obj3listaInterJson.Codigo = "" ;
                            obj3listaInterJson.Ruc = "" ;
                            obj3listaInterJson.Descripcion = "" ;
                            obj3listaInterJson.Titulo = "" ;
                            obj3listaInterJson.Direccion = "" ;
                            obj3listaInterJson.DireccionCompleta = "" ;
                            obj3listaInterJson.Ciudad = "" ;
                            obj3listaInterJson.Pais = "" ;
                            obj3listaInterJson.CodigoPostal = "" ;
                            obj3listaInterJson.Distrito = "" ;
                            obj3listaInterJson.Telefono = "" ;
                            obj3listaInterJson.TelefonoMovil = "" ;
                            obj3listaInterJson.Mail = "" ;
                            obj3listaInterJson.PersonaFisica = "" ;
                            obj3listaInterJson.Eventual = "" ;
                            obj3listaInterJson.ApPat = "" ;
                            obj3listaInterJson.ApMat = "" ;
                            obj3listaInterJson.TranspZone = "" ;
                            obj3listaInterJson.CodPersona = "" ;
                            obj3listaInterJson.Nombre = "" ;
                            obj3listaInterJson.Apellido = "" ;
                            obj3listaInterJson.Iniciales = "" ;
                            obj3listaInterJson.ApeSoltero = "" ;
                            obj3listaInterJson.DescripcionP = "" ;
                            obj3listaInterJson.Dni = "" ;
                            obj3listaInterJson.TelefonoP = "" ;

                        var obj4listaInterJson = {};

                            obj4listaInterJson.id = 4;
                            obj4listaInterJson.PedidoId = "" ;
                            obj4listaInterJson.Funcion = "" ;
                            obj4listaInterJson.Codigo = "" ;
                            obj4listaInterJson.Ruc = "" ;
                            obj4listaInterJson.Descripcion = "" ;
                            obj4listaInterJson.Titulo = "" ;
                            obj4listaInterJson.Direccion = "" ;
                            obj4listaInterJson.DireccionCompleta = "" ;
                            obj4listaInterJson.Ciudad = "" ;
                            obj4listaInterJson.Pais = "" ;
                            obj4listaInterJson.CodigoPostal = "" ;
                            obj4listaInterJson.Distrito = "" ;
                            obj4listaInterJson.Telefono = "" ;
                            obj4listaInterJson.TelefonoMovil = "" ;
                            obj4listaInterJson.Mail = "" ;
                            obj4listaInterJson.PersonaFisica = "" ;
                            obj4listaInterJson.Eventual = "" ;
                            obj4listaInterJson.ApPat = "" ;
                            obj4listaInterJson.ApMat = "" ;
                            obj4listaInterJson.TranspZone = "" ;
                            obj4listaInterJson.CodPersona = "" ;
                            obj4listaInterJson.Nombre = "" ;
                            obj4listaInterJson.Apellido = "" ;
                            obj4listaInterJson.Iniciales = "" ;
                            obj4listaInterJson.ApeSoltero = "" ;
                            obj4listaInterJson.DescripcionP = "" ;
                            obj4listaInterJson.Dni = "" ;
                            obj4listaInterJson.TelefonoP = "" ;


                        var obj5listaInterJson = {};

                            obj5listaInterJson.id = 5;
                            obj5listaInterJson.PedidoId = "" ;
                            obj5listaInterJson.Funcion = "" ;
                            obj5listaInterJson.Codigo = "" ;
                            obj5listaInterJson.Ruc = "" ;
                            obj5listaInterJson.Descripcion = "" ;
                            obj5listaInterJson.Titulo = "" ;
                            obj5listaInterJson.Direccion = "" ;
                            obj5listaInterJson.DireccionCompleta = "" ;
                            obj5listaInterJson.Ciudad = "" ;
                            obj5listaInterJson.Pais = "" ;
                            obj5listaInterJson.CodigoPostal = "" ;
                            obj5listaInterJson.Distrito = "" ;
                            obj5listaInterJson.Telefono = "" ;
                            obj5listaInterJson.TelefonoMovil = "" ;
                            obj5listaInterJson.Mail = "" ;
                            obj5listaInterJson.PersonaFisica = "" ;
                            obj5listaInterJson.Eventual = "" ;
                            obj5listaInterJson.ApPat = "" ;
                            obj5listaInterJson.ApMat = "" ;
                            obj5listaInterJson.TranspZone = "" ;
                            obj5listaInterJson.CodPersona = "" ;
                            obj5listaInterJson.Nombre = "" ;
                            obj5listaInterJson.Apellido = "" ;
                            obj5listaInterJson.Iniciales = "" ;
                            obj5listaInterJson.ApeSoltero = "" ;
                            obj5listaInterJson.DescripcionP = "" ;
                            obj5listaInterJson.Dni = "" ;
                            obj5listaInterJson.TelefonoP = "" ;


                        var obj6listaInterJson = {};

                            obj6listaInterJson.id = 6;
                            obj6listaInterJson.PedidoId = "" ;
                            obj6listaInterJson.Funcion = "" ;
                            obj6listaInterJson.Codigo = "" ;
                            obj6listaInterJson.Ruc = "" ;
                            obj6listaInterJson.Descripcion = "" ;
                            obj6listaInterJson.Titulo = "" ;
                            obj6listaInterJson.Direccion = "" ;
                            obj6listaInterJson.DireccionCompleta = "" ;
                            obj6listaInterJson.Ciudad = "" ;
                            obj6listaInterJson.Pais = "" ;
                            obj6listaInterJson.CodigoPostal = "" ;
                            obj6listaInterJson.Distrito = "" ;
                            obj6listaInterJson.Telefono = "" ;
                            obj6listaInterJson.TelefonoMovil = "" ;
                            obj6listaInterJson.Mail = "" ;
                            obj6listaInterJson.PersonaFisica = "" ;
                            obj6listaInterJson.Eventual = "" ;
                            obj6listaInterJson.ApPat = "" ;
                            obj6listaInterJson.ApMat = "" ;
                            obj6listaInterJson.TranspZone = "" ;
                            obj6listaInterJson.CodPersona = "" ;
                            obj6listaInterJson.Nombre = "" ;
                            obj6listaInterJson.Apellido = "" ;
                            obj6listaInterJson.Iniciales = "" ;
                            obj6listaInterJson.ApeSoltero = "" ;
                            obj6listaInterJson.DescripcionP = "" ;
                            obj6listaInterJson.Dni = "" ;
                            obj6listaInterJson.TelefonoP = "" ;


                        var obj7listaInterJson = {};

                            obj7listaInterJson.id = 7;
                            obj7listaInterJson.PedidoId = "" ;
                            obj7listaInterJson.Funcion = "" ;
                            obj7listaInterJson.Codigo = "" ;
                            obj7listaInterJson.Ruc = "" ;
                            obj7listaInterJson.Descripcion = "" ;
                            obj7listaInterJson.Titulo = "" ;
                            obj7listaInterJson.Direccion = "" ;
                            obj7listaInterJson.DireccionCompleta = "" ;
                            obj7listaInterJson.Ciudad = "" ;
                            obj7listaInterJson.Pais = "" ;
                            obj7listaInterJson.CodigoPostal = "" ;
                            obj7listaInterJson.Distrito = "" ;
                            obj7listaInterJson.Telefono = "" ;
                            obj7listaInterJson.TelefonoMovil = "" ;
                            obj7listaInterJson.Mail = "" ;
                            obj7listaInterJson.PersonaFisica = "" ;
                            obj7listaInterJson.Eventual = "" ;
                            obj7listaInterJson.ApPat = "" ;
                            obj7listaInterJson.ApMat = "" ;
                            obj7listaInterJson.TranspZone = "" ;
                            obj7listaInterJson.CodPersona = "" ;
                            obj7listaInterJson.Nombre = "" ;
                            obj7listaInterJson.Apellido = "" ;
                            obj7listaInterJson.Iniciales = "" ;
                            obj7listaInterJson.ApeSoltero = "" ;
                            obj7listaInterJson.DescripcionP = "" ;
                            obj7listaInterJson.Dni = "" ;
                            obj7listaInterJson.TelefonoP = "" ;


                        var obj8listaInterJson = {};

                            obj8listaInterJson.id = 8;
                            obj8listaInterJson.PedidoId = "" ;
                            obj8listaInterJson.Funcion = "" ;
                            obj8listaInterJson.Codigo = "" ;
                            obj8listaInterJson.Ruc = "" ;
                            obj8listaInterJson.Descripcion = "" ;
                            obj8listaInterJson.Titulo = "" ;
                            obj8listaInterJson.Direccion = "" ;
                            obj8listaInterJson.DireccionCompleta = "" ;
                            obj8listaInterJson.Ciudad = "" ;
                            obj8listaInterJson.Pais = "" ;
                            obj8listaInterJson.CodigoPostal = "" ;
                            obj8listaInterJson.Distrito = "" ;
                            obj8listaInterJson.Telefono = "" ;
                            obj8listaInterJson.TelefonoMovil = "" ;
                            obj8listaInterJson.Mail = "" ;
                            obj8listaInterJson.PersonaFisica = "" ;
                            obj8listaInterJson.Eventual = "" ;
                            obj8listaInterJson.ApPat = "" ;
                            obj8listaInterJson.ApMat = "" ;
                            obj8listaInterJson.TranspZone = "" ;
                            obj8listaInterJson.CodPersona = "" ;
                            obj8listaInterJson.Nombre = "" ;
                            obj8listaInterJson.Apellido = "" ;
                            obj8listaInterJson.Iniciales = "" ;
                            obj8listaInterJson.ApeSoltero = "" ;
                            obj8listaInterJson.DescripcionP = "" ;
                            obj8listaInterJson.Dni = "" ;
                            obj8listaInterJson.TelefonoP = "" ;


                        var obj9listaInterJson = {};
                            obj9listaInterJson.id = 9;
                            obj9listaInterJson.PedidoId = "" ;
                            obj9listaInterJson.Funcion = "" ;
                            obj9listaInterJson.Codigo = "" ;
                            obj9listaInterJson.Ruc = "" ;
                            obj9listaInterJson.Descripcion = "" ;
                            obj9listaInterJson.Titulo = "" ;
                            obj9listaInterJson.Direccion = "" ;
                            obj9listaInterJson.DireccionCompleta = "" ;
                            obj9listaInterJson.Ciudad = "" ;
                            obj9listaInterJson.Pais = "" ;
                            obj9listaInterJson.CodigoPostal = "" ;
                            obj9listaInterJson.Distrito = "" ;
                            obj9listaInterJson.Telefono = "" ;
                            obj9listaInterJson.TelefonoMovil = "" ;
                            obj9listaInterJson.Mail = "" ;
                            obj9listaInterJson.PersonaFisica = "" ;
                            obj9listaInterJson.Eventual = "" ;
                            obj9listaInterJson.ApPat = "" ;
                            obj9listaInterJson.ApMat = "" ;
                            obj9listaInterJson.TranspZone = "" ;
                            obj9listaInterJson.CodPersona = "" ;
                            obj9listaInterJson.Nombre = "" ;
                            obj9listaInterJson.Apellido = "" ;
                            obj9listaInterJson.Iniciales = "" ;
                            obj9listaInterJson.ApeSoltero = "" ;
                            obj9listaInterJson.DescripcionP = "" ;
                            obj9listaInterJson.Dni = "" ;
                            obj9listaInterJson.TelefonoP = "" ;


                        var obj10listaInterJson = {};
                            obj10listaInterJson.id = 10;
                            obj10listaInterJson.PedidoId = "" ;
                            obj10listaInterJson.Funcion = "" ;
                            obj10listaInterJson.Codigo = "" ;
                            obj10listaInterJson.Ruc = "" ;
                            obj10listaInterJson.Descripcion = "" ;
                            obj10listaInterJson.Titulo = "" ;
                            obj10listaInterJson.Direccion = "" ;
                            obj10listaInterJson.DireccionCompleta = "" ;
                            obj10listaInterJson.Ciudad = "" ;
                            obj10listaInterJson.Pais = "" ;
                            obj10listaInterJson.CodigoPostal = "" ;
                            obj10listaInterJson.Distrito = "" ;
                            obj10listaInterJson.Telefono = "" ;
                            obj10listaInterJson.TelefonoMovil = "" ;
                            obj10listaInterJson.Mail = "" ;
                            obj10listaInterJson.PersonaFisica = "" ;
                            obj10listaInterJson.Eventual = "" ;
                            obj10listaInterJson.ApPat = "" ;
                            obj10listaInterJson.ApMat = "" ;
                            obj10listaInterJson.TranspZone = "" ;
                            obj10listaInterJson.CodPersona = "" ;
                            obj10listaInterJson.Nombre = "" ;
                            obj10listaInterJson.Apellido = "" ;
                            obj10listaInterJson.Iniciales = "" ;
                            obj10listaInterJson.ApeSoltero = "" ;
                            obj10listaInterJson.DescripcionP = "" ;
                            obj10listaInterJson.Dni = "" ;
                            obj10listaInterJson.TelefonoP = "" ;

                        var obj11listaInterJson = {};
                            obj11listaInterJson.id = 11;
                            obj11listaInterJson.PedidoId = "" ;
                            obj11listaInterJson.Funcion = "" ;
                            obj11listaInterJson.Codigo = "" ;
                            obj11listaInterJson.Ruc = "" ;
                            obj11listaInterJson.Descripcion = "" ;
                            obj11listaInterJson.Titulo = "" ;
                            obj11listaInterJson.Direccion = "" ;
                            obj11listaInterJson.DireccionCompleta = "" ;
                            obj11listaInterJson.Ciudad = "" ;
                            obj11listaInterJson.Pais = "" ;
                            obj11listaInterJson.CodigoPostal = "" ;
                            obj11listaInterJson.Distrito = "" ;
                            obj11listaInterJson.Telefono = "" ;
                            obj11listaInterJson.TelefonoMovil = "" ;
                            obj11listaInterJson.Mail = "" ;
                            obj11listaInterJson.PersonaFisica = "" ;
                            obj11listaInterJson.Eventual = "" ;
                            obj11listaInterJson.ApPat = "" ;
                            obj11listaInterJson.ApMat = "" ;
                            obj11listaInterJson.TranspZone = "" ;
                            obj11listaInterJson.CodPersona = "" ;
                            obj11listaInterJson.Nombre = "" ;
                            obj11listaInterJson.Apellido = "" ;
                            obj11listaInterJson.Iniciales = "" ;
                            obj11listaInterJson.ApeSoltero = "" ;
                            obj11listaInterJson.DescripcionP = "" ;
                            obj11listaInterJson.Dni = "" ;
                            obj11listaInterJson.TelefonoP = "" ;



                listaInterJson.push(obj1listaInterJson);
                listaInterJson.push(obj2listaInterJson);
                listaInterJson.push(obj3listaInterJson);
                listaInterJson.push(obj4listaInterJson);
                listaInterJson.push(obj5listaInterJson);
                listaInterJson.push(obj6listaInterJson);
                listaInterJson.push(obj7listaInterJson);
                listaInterJson.push(obj8listaInterJson);
                listaInterJson.push(obj9listaInterJson);
                listaInterJson.push(obj10listaInterJson);
                listaInterJson.push(obj11listaInterJson);

                var listaDsctoJson = [];


                        var obj1listaDsctoJson = {};
                            obj1listaDsctoJson.matPosicion = "" ;
                            obj1listaDsctoJson.id = 1;
                            obj1listaDsctoJson.Posicion = "" ;
                            obj1listaDsctoJson.Condicion = "" ;
                            obj1listaDsctoJson.Importe = "" ;
                            obj1listaDsctoJson.ImporteAnterior = "" ;
                            obj1listaDsctoJson.Moneda = "" ;
                            obj1listaDsctoJson.Valor = "" ;
                            obj1listaDsctoJson.Denominacion = "" ;
                            obj1listaDsctoJson.esPorcentaje = "" ;
                            obj1listaDsctoJson.LimiteInferior = "" ;
                            obj1listaDsctoJson.Recalcular = "" ;

                        var obj2listaDsctoJson = {};
                            obj2listaDsctoJson.matPosicion = "" ;
                            obj2listaDsctoJson.id = 2;
                            obj2listaDsctoJson.Posicion = "" ;
                            obj2listaDsctoJson.Condicion = "" ;
                            obj2listaDsctoJson.Importe = "" ;
                            obj2listaDsctoJson.ImporteAnterior = "" ;
                            obj2listaDsctoJson.Moneda = "" ;
                            obj2listaDsctoJson.Valor = "" ;
                            obj2listaDsctoJson.Denominacion = "" ;
                            obj2listaDsctoJson.esPorcentaje = "" ;
                            obj2listaDsctoJson.LimiteInferior = "" ;
                            obj2listaDsctoJson.Recalcular = "" ;

                        var obj3listaDsctoJson = {};
                            obj3listaDsctoJson.matPosicion = "" ;
                            obj3listaDsctoJson.id = 3;
                            obj3listaDsctoJson.Posicion = "" ;
                            obj3listaDsctoJson.Condicion = "" ;
                            obj3listaDsctoJson.Importe = "" ;
                            obj3listaDsctoJson.ImporteAnterior = "" ;
                            obj3listaDsctoJson.Moneda = "" ;
                            obj3listaDsctoJson.Valor = "" ;
                            obj3listaDsctoJson.Denominacion = "" ;
                            obj3listaDsctoJson.esPorcentaje = "" ;
                            obj3listaDsctoJson.LimiteInferior = "" ;
                            obj3listaDsctoJson.Recalcular = "" ;

                        var obj4listaDsctoJson = {};
                            obj4listaDsctoJson.matPosicion = "" ;
                            obj4listaDsctoJson.id = 4;
                            obj4listaDsctoJson.Posicion = "" ;
                            obj4listaDsctoJson.Condicion = "" ;
                            obj4listaDsctoJson.Importe = "" ;
                            obj4listaDsctoJson.ImporteAnterior = "" ;
                            obj4listaDsctoJson.Moneda = "" ;
                            obj4listaDsctoJson.Valor = "" ;
                            obj4listaDsctoJson.Denominacion = "" ;
                            obj4listaDsctoJson.esPorcentaje = "" ;
                            obj4listaDsctoJson.LimiteInferior = "" ;
                            obj4listaDsctoJson.Recalcular = "" ;


                        var obj5listaDsctoJson = {};
                            obj5listaDsctoJson.matPosicion = "" ;
                            obj5listaDsctoJson.id = 5;
                            obj5listaDsctoJson.Posicion = "" ;
                            obj5listaDsctoJson.Condicion = "" ;
                            obj5listaDsctoJson.Importe = "" ;
                            obj5listaDsctoJson.ImporteAnterior = "" ;
                            obj5listaDsctoJson.Moneda = "" ;
                            obj5listaDsctoJson.Valor = "" ;
                            obj5listaDsctoJson.Denominacion = "" ;
                            obj5listaDsctoJson.esPorcentaje = "" ;
                            obj5listaDsctoJson.LimiteInferior = "" ;
                            obj5listaDsctoJson.Recalcular = "" ;

                        var obj6listaDsctoJson = {};
                            obj6listaDsctoJson.matPosicion = "" ;
                            obj6listaDsctoJson.id = 6;
                            obj6listaDsctoJson.Posicion = "" ;
                            obj6listaDsctoJson.Condicion = "" ;
                            obj6listaDsctoJson.Importe = "" ;
                            obj6listaDsctoJson.ImporteAnterior = "" ;
                            obj6listaDsctoJson.Moneda = "" ;
                            obj6listaDsctoJson.Valor = "" ;
                            obj6listaDsctoJson.Denominacion = "" ;
                            obj6listaDsctoJson.esPorcentaje = "" ;
                            obj6listaDsctoJson.LimiteInferior = "" ;
                            obj6listaDsctoJson.Recalcular = "" ;

                        var obj7listaDsctoJson = {};
                            obj7listaDsctoJson.matPosicion = "" ;
                            obj7listaDsctoJson.id = 7;
                            obj7listaDsctoJson.Posicion = "" ;
                            obj7listaDsctoJson.Condicion = "" ;
                            obj7listaDsctoJson.Importe = "" ;
                            obj7listaDsctoJson.ImporteAnterior = "" ;
                            obj7listaDsctoJson.Moneda = "" ;
                            obj7listaDsctoJson.Valor = "" ;
                            obj7listaDsctoJson.Denominacion = "" ;
                            obj7listaDsctoJson.esPorcentaje = "" ;
                            obj7listaDsctoJson.LimiteInferior = "" ;
                            obj7listaDsctoJson.Recalcular = "" ;

                        var obj8listaDsctoJson = {};
                            obj8listaDsctoJson.matPosicion = "" ;
                            obj8listaDsctoJson.id = 8;
                            obj8listaDsctoJson.Posicion = "" ;
                            obj8listaDsctoJson.Condicion = "" ;
                            obj8listaDsctoJson.Importe = "" ;
                            obj8listaDsctoJson.ImporteAnterior = "" ;
                            obj8listaDsctoJson.Moneda = "" ;
                            obj8listaDsctoJson.Valor = "" ;
                            obj8listaDsctoJson.Denominacion = "" ;
                            obj8listaDsctoJson.esPorcentaje = "" ;
                            obj8listaDsctoJson.LimiteInferior = "" ;
                            obj8listaDsctoJson.Recalcular = "" ;


                        var obj9listaDsctoJson = {};
                            obj9listaDsctoJson.matPosicion = "" ;
                            obj9listaDsctoJson.id = 9;
                            obj9listaDsctoJson.Posicion = "" ;
                            obj9listaDsctoJson.Condicion = "" ;
                            obj9listaDsctoJson.Importe = "" ;
                            obj9listaDsctoJson.ImporteAnterior = "" ;
                            obj9listaDsctoJson.Moneda = "" ;
                            obj9listaDsctoJson.Valor = "" ;
                            obj9listaDsctoJson.Denominacion = "" ;
                            obj9listaDsctoJson.esPorcentaje = "" ;
                            obj9listaDsctoJson.LimiteInferior = "" ;
                            obj9listaDsctoJson.Recalcular = "" ;


                        var obj10listaDsctoJson = {};
                            obj10listaDsctoJson.matPosicion = "" ;
                            obj10listaDsctoJson.id = 10;
                            obj10listaDsctoJson.Posicion = "" ;
                            obj10listaDsctoJson.Condicion = "" ;
                            obj10listaDsctoJson.Importe = "" ;
                            obj10listaDsctoJson.ImporteAnterior = "" ;
                            obj10listaDsctoJson.Moneda = "" ;
                            obj10listaDsctoJson.Valor = "" ;
                            obj10listaDsctoJson.Denominacion = "" ;
                            obj10listaDsctoJson.esPorcentaje = "" ;
                            obj10listaDsctoJson.LimiteInferior = "" ;
                            obj10listaDsctoJson.Recalcular = "" ;


                        var obj11listaDsctoJson = {};
                            obj11listaDsctoJson.matPosicion = "" ;
                            obj11listaDsctoJson.id = 11;
                            obj11listaDsctoJson.Posicion = "" ;
                            obj11listaDsctoJson.Condicion = "" ;
                            obj11listaDsctoJson.Importe = "" ;
                            obj11listaDsctoJson.ImporteAnterior = "" ;
                            obj11listaDsctoJson.Moneda = "" ;
                            obj11listaDsctoJson.Valor = "" ;
                            obj11listaDsctoJson.Denominacion = "" ;
                            obj11listaDsctoJson.esPorcentaje = "" ;
                            obj11listaDsctoJson.LimiteInferior = "" ;
                            obj11listaDsctoJson.Recalcular = "" ;


                        var obj12listaDsctoJson = {};
                            obj12listaDsctoJson.matPosicion = "" ;
                            obj12listaDsctoJson.id = 12;
                            obj12listaDsctoJson.Posicion = "" ;
                            obj12listaDsctoJson.Condicion = "" ;
                            obj12listaDsctoJson.Importe = "" ;
                            obj12listaDsctoJson.ImporteAnterior = "" ;
                            obj12listaDsctoJson.Moneda = "" ;
                            obj12listaDsctoJson.Valor = "" ;
                            obj12listaDsctoJson.Denominacion = "" ;
                            obj12listaDsctoJson.esPorcentaje = "" ;
                            obj12listaDsctoJson.LimiteInferior = "" ;
                            obj12listaDsctoJson.Recalcular = "" ;

                        var obj13listaDsctoJson = {};
                            obj13listaDsctoJson.matPosicion = "" ;
                            obj13listaDsctoJson.id = 13;
                            obj13listaDsctoJson.Posicion = "" ;
                            obj13listaDsctoJson.Condicion = "" ;
                            obj13listaDsctoJson.Importe = "" ;
                            obj13listaDsctoJson.ImporteAnterior = "" ;
                            obj13listaDsctoJson.Moneda = "" ;
                            obj13listaDsctoJson.Valor = "" ;
                            obj13listaDsctoJson.Denominacion = "" ;
                            obj13listaDsctoJson.esPorcentaje = "" ;
                            obj13listaDsctoJson.LimiteInferior = "" ;
                            obj13listaDsctoJson.Recalcular = "" ;

                        var obj14listaDsctoJson = {};
                            obj14listaDsctoJson.matPosicion = "" ;
                            obj14listaDsctoJson.id = 14;
                            obj14listaDsctoJson.Posicion = "" ;
                            obj14listaDsctoJson.Condicion = "" ;
                            obj14listaDsctoJson.Importe = "" ;
                            obj14listaDsctoJson.ImporteAnterior = "" ;
                            obj14listaDsctoJson.Moneda = "" ;
                            obj14listaDsctoJson.Valor = "" ;
                            obj14listaDsctoJson.Denominacion = "" ;
                            obj14listaDsctoJson.esPorcentaje = "" ;
                            obj14listaDsctoJson.LimiteInferior = "" ;
                            obj14listaDsctoJson.Recalcular = "" ;


                        var obj15listaDsctoJson = {};
                            obj15listaDsctoJson.matPosicion = "" ;
                            obj15listaDsctoJson.id = 15;
                            obj15listaDsctoJson.Posicion = "" ;
                            obj15listaDsctoJson.Condicion = "" ;
                            obj15listaDsctoJson.Importe = "" ;
                            obj15listaDsctoJson.ImporteAnterior = "" ;
                            obj15listaDsctoJson.Moneda = "" ;
                            obj15listaDsctoJson.Valor = "" ;
                            obj15listaDsctoJson.Denominacion = "" ;
                            obj15listaDsctoJson.esPorcentaje = "" ;
                            obj15listaDsctoJson.LimiteInferior = "" ;
                            obj15listaDsctoJson.Recalcular = "" ;


                        var obj16listaDsctoJson = {};
                            obj16listaDsctoJson.matPosicion = "" ;
                            obj16listaDsctoJson.id = 16;
                            obj16listaDsctoJson.Posicion = "" ;
                            obj16listaDsctoJson.Condicion = "" ;
                            obj16listaDsctoJson.Importe = "" ;
                            obj16listaDsctoJson.ImporteAnterior = "" ;
                            obj16listaDsctoJson.Moneda = "" ;
                            obj16listaDsctoJson.Valor = "" ;
                            obj16listaDsctoJson.Denominacion = "" ;
                            obj16listaDsctoJson.esPorcentaje = "" ;
                            obj16listaDsctoJson.LimiteInferior = "" ;
                            obj16listaDsctoJson.Recalcular = "" ;


                        var obj17listaDsctoJson = {};
                            obj17listaDsctoJson.matPosicion = "" ;
                            obj17listaDsctoJson.id = 17;
                            obj17listaDsctoJson.Posicion = "" ;
                            obj17listaDsctoJson.Condicion = "" ;
                            obj17listaDsctoJson.Importe = "" ;
                            obj17listaDsctoJson.ImporteAnterior = "" ;
                            obj17listaDsctoJson.Moneda = "" ;
                            obj17listaDsctoJson.Valor = "" ;
                            obj17listaDsctoJson.Denominacion = "" ;
                            obj17listaDsctoJson.esPorcentaje = "" ;
                            obj17listaDsctoJson.LimiteInferior = "" ;
                            obj17listaDsctoJson.Recalcular = "" ;



                        var obj18listaDsctoJson = {};
                            obj18listaDsctoJson.matPosicion = "" ;
                            obj18listaDsctoJson.id = 18;
                            obj18listaDsctoJson.Posicion = "" ;
                            obj18listaDsctoJson.Condicion = "" ;
                            obj18listaDsctoJson.Importe = "" ;
                            obj18listaDsctoJson.ImporteAnterior = "" ;
                            obj18listaDsctoJson.Moneda = "" ;
                            obj18listaDsctoJson.Valor = "" ;
                            obj18listaDsctoJson.Denominacion = "" ;
                            obj18listaDsctoJson.esPorcentaje = "" ;
                            obj18listaDsctoJson.LimiteInferior = "" ;
                            obj18listaDsctoJson.Recalcular = "" ;

                        var obj19listaDsctoJson = {};
                            obj19listaDsctoJson.matPosicion = "" ;
                            obj19listaDsctoJson.id = 19;
                            obj19listaDsctoJson.Posicion = "" ;
                            obj19listaDsctoJson.Condicion = "" ;
                            obj19listaDsctoJson.Importe = "" ;
                            obj19listaDsctoJson.ImporteAnterior = "" ;
                            obj19listaDsctoJson.Moneda = "" ;
                            obj19listaDsctoJson.Valor = "" ;
                            obj19listaDsctoJson.Denominacion = "" ;
                            obj19listaDsctoJson.esPorcentaje = "" ;
                            obj19listaDsctoJson.LimiteInferior = "" ;
                            obj19listaDsctoJson.Recalcular = "" ;

                        var obj20listaDsctoJson = {};
                            obj20listaDsctoJson.matPosicion = "" ;
                            obj20listaDsctoJson.id = 20;
                            obj20listaDsctoJson.Posicion = "" ;
                            obj20listaDsctoJson.Condicion = "" ;
                            obj20listaDsctoJson.Importe = "" ;
                            obj20listaDsctoJson.ImporteAnterior = "" ;
                            obj20listaDsctoJson.Moneda = "" ;
                            obj20listaDsctoJson.Valor = "" ;
                            obj20listaDsctoJson.Denominacion = "" ;
                            obj20listaDsctoJson.esPorcentaje = "" ;
                            obj20listaDsctoJson.LimiteInferior = "" ;
                            obj20listaDsctoJson.Recalcular = "" ;

                        var obj21listaDsctoJson = {};
                            obj21listaDsctoJson.matPosicion = "" ;
                            obj21listaDsctoJson.id = 21;
                            obj21listaDsctoJson.Posicion = "" ;
                            obj21listaDsctoJson.Condicion = "" ;
                            obj21listaDsctoJson.Importe = "" ;
                            obj21listaDsctoJson.ImporteAnterior = "" ;
                            obj21listaDsctoJson.Moneda = "" ;
                            obj21listaDsctoJson.Valor = "" ;
                            obj21listaDsctoJson.Denominacion = "" ;
                            obj21listaDsctoJson.esPorcentaje = "" ;
                            obj21listaDsctoJson.LimiteInferior = "" ;
                            obj21listaDsctoJson.Recalcular = "" ;

                        var obj22listaDsctoJson = {};
                            obj22listaDsctoJson.matPosicion = "" ;
                            obj22listaDsctoJson.id = 22;
                            obj22listaDsctoJson.Posicion = "" ;
                            obj22listaDsctoJson.Condicion = "" ;
                            obj22listaDsctoJson.Importe = "" ;
                            obj22listaDsctoJson.ImporteAnterior = "" ;
                            obj22listaDsctoJson.Moneda = "" ;
                            obj22listaDsctoJson.Valor = "" ;
                            obj22listaDsctoJson.Denominacion = "" ;
                            obj22listaDsctoJson.esPorcentaje = "" ;
                            obj22listaDsctoJson.LimiteInferior = "" ;
                            obj22listaDsctoJson.Recalcular = "" ;


                        var obj23listaDsctoJson = {};
                            obj23listaDsctoJson.matPosicion = "" ;
                            obj23listaDsctoJson.id = 23;
                            obj23listaDsctoJson.Posicion = "" ;
                            obj23listaDsctoJson.Condicion = "" ;
                            obj23listaDsctoJson.Importe = "" ;
                            obj23listaDsctoJson.ImporteAnterior = "" ;
                            obj23listaDsctoJson.Moneda = "" ;
                            obj23listaDsctoJson.Valor = "" ;
                            obj23listaDsctoJson.Denominacion = "" ;
                            obj23listaDsctoJson.esPorcentaje = "" ;
                            obj23listaDsctoJson.LimiteInferior = "" ;
                            obj23listaDsctoJson.Recalcular = "" ;

                        var obj24listaDsctoJson = {};
                            obj24listaDsctoJson.matPosicion = "" ;
                            obj24listaDsctoJson.id = 24;
                            obj24listaDsctoJson.Posicion = "" ;
                            obj24listaDsctoJson.Condicion = "" ;
                            obj24listaDsctoJson.Importe = "" ;
                            obj24listaDsctoJson.ImporteAnterior = "" ;
                            obj24listaDsctoJson.Moneda = "" ;
                            obj24listaDsctoJson.Valor = "" ;
                            obj24listaDsctoJson.Denominacion = "" ;
                            obj24listaDsctoJson.esPorcentaje = "" ;
                            obj24listaDsctoJson.LimiteInferior = "" ;
                            obj24listaDsctoJson.Recalcular = "" ;

                        var obj25listaDsctoJson = {};
                            obj25listaDsctoJson.matPosicion = "" ;
                            obj25listaDsctoJson.id = 25;
                            obj25listaDsctoJson.Posicion = "" ;
                            obj25listaDsctoJson.Condicion = "" ;
                            obj25listaDsctoJson.Importe = "" ;
                            obj25listaDsctoJson.ImporteAnterior = "" ;
                            obj25listaDsctoJson.Moneda = "" ;
                            obj25listaDsctoJson.Valor = "" ;
                            obj25listaDsctoJson.Denominacion = "" ;
                            obj25listaDsctoJson.esPorcentaje = "" ;
                            obj25listaDsctoJson.LimiteInferior = "" ;
                            obj25listaDsctoJson.Recalcular = "" ;

                        var obj26listaDsctoJson = {};
                            obj26listaDsctoJson.matPosicion = "" ;
                            obj26listaDsctoJson.id = 26;
                           obj26listaDsctoJson.Posicion = "" ;
                            obj26listaDsctoJson.Condicion = "" ;
                            obj26listaDsctoJson.Importe = "" ;
                            obj26listaDsctoJson.ImporteAnterior = "" ;
                            obj26listaDsctoJson.Moneda = "" ;
                            obj26listaDsctoJson.Valor = "" ;
                            obj26listaDsctoJson.Denominacion = "" ;
                            obj26listaDsctoJson.esPorcentaje = "" ;
                            obj26listaDsctoJson.LimiteInferior = "" ;
                            obj26listaDsctoJson.Recalcular = "" ;


                        var obj27listaDsctoJson = {};
                            obj27listaDsctoJson.matPosicion = "" ;
                            obj27listaDsctoJson.id = 27;
                           obj27listaDsctoJson.Posicion = "" ;
                            obj27listaDsctoJson.Condicion = "" ;
                            obj27listaDsctoJson.Importe = "" ;
                            obj27listaDsctoJson.ImporteAnterior = "" ;
                            obj27listaDsctoJson.Moneda = "" ;
                            obj27listaDsctoJson.Valor = "" ;
                            obj27listaDsctoJson.Denominacion = "" ;
                            obj27listaDsctoJson.esPorcentaje = "" ;
                            obj27listaDsctoJson.LimiteInferior = "" ;
                            obj27listaDsctoJson.Recalcular = "" ;


                        var obj28listaDsctoJson = {};
                            obj28listaDsctoJson.matPosicion = "" ;
                            obj28listaDsctoJson.id = 28;
                           obj28listaDsctoJson.Posicion = "" ;
                            obj28listaDsctoJson.Condicion = "" ;
                            obj28listaDsctoJson.Importe = "" ;
                            obj28listaDsctoJson.ImporteAnterior = "" ;
                            obj28listaDsctoJson.Moneda = "" ;
                            obj28listaDsctoJson.Valor = "" ;
                            obj28listaDsctoJson.Denominacion = "" ;
                            obj28listaDsctoJson.esPorcentaje = "" ;
                            obj28listaDsctoJson.LimiteInferior = "" ;
                            obj28listaDsctoJson.Recalcular = "" ;

                        var obj29listaDsctoJson = {};
                            obj29listaDsctoJson.matPosicion = "" ;
                            obj29listaDsctoJson.id = 29;
                           obj29listaDsctoJson.Posicion = "" ;
                            obj29listaDsctoJson.Condicion = "" ;
                            obj29listaDsctoJson.Importe = "" ;
                            obj29listaDsctoJson.ImporteAnterior = "" ;
                            obj29listaDsctoJson.Moneda = "" ;
                            obj29listaDsctoJson.Valor = "" ;
                            obj29listaDsctoJson.Denominacion = "" ;
                            obj29listaDsctoJson.esPorcentaje = "" ;
                            obj29listaDsctoJson.LimiteInferior = "" ;
                            obj29listaDsctoJson.Recalcular = "" ;


                        var obj30listaDsctoJson = {};
                            obj30listaDsctoJson.matPosicion = "" ;
                            obj30listaDsctoJson.id = 30;
                           obj30listaDsctoJson.Posicion = "" ;
                            obj30listaDsctoJson.Condicion = "" ;
                            obj30listaDsctoJson.Importe = "" ;
                            obj30listaDsctoJson.ImporteAnterior = "" ;
                            obj30listaDsctoJson.Moneda = "" ;
                            obj30listaDsctoJson.Valor = "" ;
                            obj30listaDsctoJson.Denominacion = "" ;
                            obj30listaDsctoJson.esPorcentaje = "" ;
                            obj30listaDsctoJson.LimiteInferior = "" ;
                            obj30listaDsctoJson.Recalcular = "" ;


                        var obj31listaDsctoJson = {};
                            obj31listaDsctoJson.matPosicion = "" ;
                            obj31listaDsctoJson.id = 31;
                           obj31listaDsctoJson.Posicion = "" ;
                            obj31listaDsctoJson.Condicion = "" ;
                            obj31listaDsctoJson.Importe = "" ;
                            obj31listaDsctoJson.ImporteAnterior = "" ;
                            obj31listaDsctoJson.Moneda = "" ;
                            obj31listaDsctoJson.Valor = "" ;
                            obj31listaDsctoJson.Denominacion = "" ;
                            obj31listaDsctoJson.esPorcentaje = "" ;
                            obj31listaDsctoJson.LimiteInferior = "" ;
                            obj31listaDsctoJson.Recalcular = "" ;

                        var obj32listaDsctoJson = {};
                            obj32listaDsctoJson.matPosicion = "" ;
                            obj32listaDsctoJson.id = 32;
                           obj32listaDsctoJson.Posicion = "" ;
                            obj32listaDsctoJson.Condicion = "" ;
                            obj32listaDsctoJson.Importe = "" ;
                            obj32listaDsctoJson.ImporteAnterior = "" ;
                            obj32listaDsctoJson.Moneda = "" ;
                            obj32listaDsctoJson.Valor = "" ;
                            obj32listaDsctoJson.Denominacion = "" ;
                            obj32listaDsctoJson.esPorcentaje = "" ;
                            obj32listaDsctoJson.LimiteInferior = "" ;
                            obj32listaDsctoJson.Recalcular = "" ;


                        var obj33listaDsctoJson = {};
                            obj33listaDsctoJson.matPosicion = "" ;
                            obj33listaDsctoJson.id = 33;
                           obj33listaDsctoJson.Posicion = "" ;
                            obj33listaDsctoJson.Condicion = "" ;
                            obj33listaDsctoJson.Importe = "" ;
                            obj33listaDsctoJson.ImporteAnterior = "" ;
                            obj33listaDsctoJson.Moneda = "" ;
                            obj33listaDsctoJson.Valor = "" ;
                            obj33listaDsctoJson.Denominacion = "" ;
                            obj33listaDsctoJson.esPorcentaje = "" ;
                            obj33listaDsctoJson.LimiteInferior = "" ;
                            obj33listaDsctoJson.Recalcular = "" ;


                        var obj34listaDsctoJson = {};
                            obj34listaDsctoJson.matPosicion = "" ;
                            obj34listaDsctoJson.id = 34;
                           obj34listaDsctoJson.Posicion = "" ;
                            obj34listaDsctoJson.Condicion = "" ;
                            obj34listaDsctoJson.Importe = "" ;
                            obj34listaDsctoJson.ImporteAnterior = "" ;
                            obj34listaDsctoJson.Moneda = "" ;
                            obj34listaDsctoJson.Valor = "" ;
                            obj34listaDsctoJson.Denominacion = "" ;
                            obj34listaDsctoJson.esPorcentaje = "" ;
                            obj34listaDsctoJson.LimiteInferior = "" ;
                            obj34listaDsctoJson.Recalcular = "" ;


                        var obj35listaDsctoJson = {};
                            obj35listaDsctoJson.matPosicion = "" ;
                            obj35listaDsctoJson.id = 35;
                           obj35listaDsctoJson.Posicion = "" ;
                            obj35listaDsctoJson.Condicion = "" ;
                            obj35listaDsctoJson.Importe = "" ;
                            obj35listaDsctoJson.ImporteAnterior = "" ;
                            obj35listaDsctoJson.Moneda = "" ;
                            obj35listaDsctoJson.Valor = "" ;
                            obj35listaDsctoJson.Denominacion = "" ;
                            obj35listaDsctoJson.esPorcentaje = "" ;
                            obj35listaDsctoJson.LimiteInferior = "" ;
                            obj35listaDsctoJson.Recalcular = "" ;


                        var obj36listaDsctoJson = {};
                            obj36listaDsctoJson.matPosicion = "" ;
                            obj36listaDsctoJson.id = 36;
                           obj36listaDsctoJson.Posicion = "" ;
                            obj36listaDsctoJson.Condicion = "" ;
                            obj36listaDsctoJson.Importe = "" ;
                            obj36listaDsctoJson.ImporteAnterior = "" ;
                            obj36listaDsctoJson.Moneda = "" ;
                            obj36listaDsctoJson.Valor = "" ;
                            obj36listaDsctoJson.Denominacion = "" ;
                            obj36listaDsctoJson.esPorcentaje = "" ;
                            obj36listaDsctoJson.LimiteInferior = "" ;
                            obj36listaDsctoJson.Recalcular = "" ;


                        var obj37listaDsctoJson = {};
                            obj37listaDsctoJson.matPosicion = "" ;
                            obj37listaDsctoJson.id = 37;
                           obj37listaDsctoJson.Posicion = "" ;
                            obj37listaDsctoJson.Condicion = "" ;
                            obj37listaDsctoJson.Importe = "" ;
                            obj37listaDsctoJson.ImporteAnterior = "" ;
                            obj37listaDsctoJson.Moneda = "" ;
                            obj37listaDsctoJson.Valor = "" ;
                            obj37listaDsctoJson.Denominacion = "" ;
                            obj37listaDsctoJson.esPorcentaje = "" ;
                            obj37listaDsctoJson.LimiteInferior = "" ;
                            obj37listaDsctoJson.Recalcular = "" ;


                        var obj38listaDsctoJson = {};
                            obj38listaDsctoJson.matPosicion = "" ;
                            obj38listaDsctoJson.id = 38;
                           obj38listaDsctoJson.Posicion = "" ;
                            obj38listaDsctoJson.Condicion = "" ;
                            obj38listaDsctoJson.Importe = "" ;
                            obj38listaDsctoJson.ImporteAnterior = "" ;
                            obj38listaDsctoJson.Moneda = "" ;
                            obj38listaDsctoJson.Valor = "" ;
                            obj38listaDsctoJson.Denominacion = "" ;
                            obj38listaDsctoJson.esPorcentaje = "" ;
                            obj38listaDsctoJson.LimiteInferior = "" ;
                            obj38listaDsctoJson.Recalcular = "" ;

                        var obj39listaDsctoJson = {};
                            obj39listaDsctoJson.matPosicion = "" ;
                            obj39listaDsctoJson.id = 39;
                           obj39listaDsctoJson.Posicion = "" ;
                            obj39listaDsctoJson.Condicion = "" ;
                            obj39listaDsctoJson.Importe = "" ;
                            obj39listaDsctoJson.ImporteAnterior = "" ;
                            obj39listaDsctoJson.Moneda = "" ;
                            obj39listaDsctoJson.Valor = "" ;
                            obj39listaDsctoJson.Denominacion = "" ;
                            obj39listaDsctoJson.esPorcentaje = "" ;
                            obj39listaDsctoJson.LimiteInferior = "" ;
                            obj39listaDsctoJson.Recalcular = "" ;

                        var obj40listaDsctoJson = {};
                            obj40listaDsctoJson.matPosicion = "" ;
                            obj40listaDsctoJson.id = 40;
                           obj40listaDsctoJson.Posicion = "" ;
                            obj40listaDsctoJson.Condicion = "" ;
                            obj40listaDsctoJson.Importe = "" ;
                            obj40listaDsctoJson.ImporteAnterior = "" ;
                            obj40listaDsctoJson.Moneda = "" ;
                            obj40listaDsctoJson.Valor = "" ;
                            obj40listaDsctoJson.Denominacion = "" ;
                            obj40listaDsctoJson.esPorcentaje = "" ;
                            obj40listaDsctoJson.LimiteInferior = "" ;
                            obj40listaDsctoJson.Recalcular = "" ;


                        var obj41listaDsctoJson = {};
                            obj41listaDsctoJson.matPosicion = "" ;
                            obj41listaDsctoJson.id = 41;
                           obj41listaDsctoJson.Posicion = "" ;
                            obj41listaDsctoJson.Condicion = "" ;
                            obj41listaDsctoJson.Importe = "" ;
                            obj41listaDsctoJson.ImporteAnterior = "" ;
                            obj41listaDsctoJson.Moneda = "" ;
                            obj41listaDsctoJson.Valor = "" ;
                            obj41listaDsctoJson.Denominacion = "" ;
                            obj41listaDsctoJson.esPorcentaje = "" ;
                            obj41listaDsctoJson.LimiteInferior = "" ;
                            obj41listaDsctoJson.Recalcular = "" ;


                        var obj42listaDsctoJson = {};
                            obj42listaDsctoJson.matPosicion = "" ;
                            obj42listaDsctoJson.id = 42;
                           obj42listaDsctoJson.Posicion = "" ;
                            obj42listaDsctoJson.Condicion = "" ;
                            obj42listaDsctoJson.Importe = "" ;
                            obj42listaDsctoJson.ImporteAnterior = "" ;
                            obj42listaDsctoJson.Moneda = "" ;
                            obj42listaDsctoJson.Valor = "" ;
                            obj42listaDsctoJson.Denominacion = "" ;
                            obj42listaDsctoJson.esPorcentaje = "" ;
                            obj42listaDsctoJson.LimiteInferior = "" ;
                            obj42listaDsctoJson.Recalcular = "" ;


                        var obj43listaDsctoJson = {};
                            obj43listaDsctoJson.matPosicion = "" ;
                            obj43listaDsctoJson.id = 43;
                           obj43listaDsctoJson.Posicion = "" ;
                            obj43listaDsctoJson.Condicion = "" ;
                            obj43listaDsctoJson.Importe = "" ;
                            obj43listaDsctoJson.ImporteAnterior = "" ;
                            obj43listaDsctoJson.Moneda = "" ;
                            obj43listaDsctoJson.Valor = "" ;
                            obj43listaDsctoJson.Denominacion = "" ;
                            obj43listaDsctoJson.esPorcentaje = "" ;
                            obj43listaDsctoJson.LimiteInferior = "" ;
                            obj43listaDsctoJson.Recalcular = "" ;


                        var obj44listaDsctoJson = {};
                            obj44listaDsctoJson.matPosicion = "" ;
                            obj44listaDsctoJson.id = 44;
                           obj44listaDsctoJson.Posicion = "" ;
                            obj44listaDsctoJson.Condicion = "" ;
                            obj44listaDsctoJson.Importe = "" ;
                            obj44listaDsctoJson.ImporteAnterior = "" ;
                            obj44listaDsctoJson.Moneda = "" ;
                            obj44listaDsctoJson.Valor = "" ;
                            obj44listaDsctoJson.Denominacion = "" ;
                            obj44listaDsctoJson.esPorcentaje = "" ;
                            obj44listaDsctoJson.LimiteInferior = "" ;
                            obj44listaDsctoJson.Recalcular = "" ;


                        var obj45listaDsctoJson = {};
                            obj45listaDsctoJson.matPosicion = "" ;
                            obj45listaDsctoJson.id = 45;
                           obj45listaDsctoJson.Posicion = "" ;
                            obj45listaDsctoJson.Condicion = "" ;
                            obj45listaDsctoJson.Importe = "" ;
                            obj45listaDsctoJson.ImporteAnterior = "" ;
                            obj45listaDsctoJson.Moneda = "" ;
                            obj45listaDsctoJson.Valor = "" ;
                            obj45listaDsctoJson.Denominacion = "" ;
                            obj45listaDsctoJson.esPorcentaje = "" ;
                            obj45listaDsctoJson.LimiteInferior = "" ;
                            obj45listaDsctoJson.Recalcular = "" ;


                        var obj46listaDsctoJson = {};
                            obj46listaDsctoJson.matPosicion = "" ;
                            obj46listaDsctoJson.id = 46;
                           obj46listaDsctoJson.Posicion = "" ;
                            obj46listaDsctoJson.Condicion = "" ;
                            obj46listaDsctoJson.Importe = "" ;
                            obj46listaDsctoJson.ImporteAnterior = "" ;
                            obj46listaDsctoJson.Moneda = "" ;
                            obj46listaDsctoJson.Valor = "" ;
                            obj46listaDsctoJson.Denominacion = "" ;
                            obj46listaDsctoJson.esPorcentaje = "" ;
                            obj46listaDsctoJson.LimiteInferior = "" ;
                            obj46listaDsctoJson.Recalcular = "" ;

                        var obj47listaDsctoJson = {};
                            obj47listaDsctoJson.matPosicion = "" ;
                            obj47listaDsctoJson.id = 47;
                           obj47listaDsctoJson.Posicion = "" ;
                            obj47listaDsctoJson.Condicion = "" ;
                            obj47listaDsctoJson.Importe = "" ;
                            obj47listaDsctoJson.ImporteAnterior = "" ;
                            obj47listaDsctoJson.Moneda = "" ;
                            obj47listaDsctoJson.Valor = "" ;
                            obj47listaDsctoJson.Denominacion = "" ;
                            obj47listaDsctoJson.esPorcentaje = "" ;
                            obj47listaDsctoJson.LimiteInferior = "" ;
                            obj47listaDsctoJson.Recalcular = "" ;


                        var obj48listaDsctoJson = {};
                            obj48listaDsctoJson.matPosicion = "" ;
                            obj48listaDsctoJson.id = 48;
                           obj48listaDsctoJson.Posicion = "" ;
                            obj48listaDsctoJson.Condicion = "" ;
                            obj48listaDsctoJson.Importe = "" ;
                            obj48listaDsctoJson.ImporteAnterior = "" ;
                            obj48listaDsctoJson.Moneda = "" ;
                            obj48listaDsctoJson.Valor = "" ;
                            obj48listaDsctoJson.Denominacion = "" ;
                            obj48listaDsctoJson.esPorcentaje = "" ;
                            obj48listaDsctoJson.LimiteInferior = "" ;
                            obj48listaDsctoJson.Recalcular = "" ;


                        var obj49listaDsctoJson = {};
                            obj49listaDsctoJson.matPosicion = "" ;
                            obj49listaDsctoJson.id = 49;
                           obj49listaDsctoJson.Posicion = "" ;
                            obj49listaDsctoJson.Condicion = "" ;
                            obj49listaDsctoJson.Importe = "" ;
                            obj49listaDsctoJson.ImporteAnterior = "" ;
                            obj49listaDsctoJson.Moneda = "" ;
                            obj49listaDsctoJson.Valor = "" ;
                            obj49listaDsctoJson.Denominacion = "" ;
                            obj49listaDsctoJson.esPorcentaje = "" ;
                            obj49listaDsctoJson.LimiteInferior = "" ;
                            obj49listaDsctoJson.Recalcular = "" ;

                        var obj50listaDsctoJson = {};
                            obj50listaDsctoJson.matPosicion = "" ;
                            obj50listaDsctoJson.id = 50;
                           obj50listaDsctoJson.Posicion = "" ;
                            obj50listaDsctoJson.Condicion = "" ;
                            obj50listaDsctoJson.Importe = "" ;
                            obj50listaDsctoJson.ImporteAnterior = "" ;
                            obj50listaDsctoJson.Moneda = "" ;
                            obj50listaDsctoJson.Valor = "" ;
                            obj50listaDsctoJson.Denominacion = "" ;
                            obj50listaDsctoJson.esPorcentaje = "" ;
                            obj50listaDsctoJson.LimiteInferior = "" ;
                            obj50listaDsctoJson.Recalcular = "" ;

                        var obj51listaDsctoJson = {};
                            obj51listaDsctoJson.matPosicion = "" ;
                            obj51listaDsctoJson.id = 51;
                           obj51listaDsctoJson.Posicion = "" ;
                            obj51listaDsctoJson.Condicion = "" ;
                            obj51listaDsctoJson.Importe = "" ;
                            obj51listaDsctoJson.ImporteAnterior = "" ;
                            obj51listaDsctoJson.Moneda = "" ;
                            obj51listaDsctoJson.Valor = "" ;
                            obj51listaDsctoJson.Denominacion = "" ;
                            obj51listaDsctoJson.esPorcentaje = "" ;
                            obj51listaDsctoJson.LimiteInferior = "" ;
                            obj51listaDsctoJson.Recalcular = "" ;

                        var obj52listaDsctoJson = {};
                            obj52listaDsctoJson.matPosicion = "" ;
                            obj52listaDsctoJson.id = 52;
                           obj52listaDsctoJson.Posicion = "" ;
                            obj52listaDsctoJson.Condicion = "" ;
                            obj52listaDsctoJson.Importe = "" ;
                            obj52listaDsctoJson.ImporteAnterior = "" ;
                            obj52listaDsctoJson.Moneda = "" ;
                            obj52listaDsctoJson.Valor = "" ;
                            obj52listaDsctoJson.Denominacion = "" ;
                            obj52listaDsctoJson.esPorcentaje = "" ;
                            obj52listaDsctoJson.LimiteInferior = "" ;
                            obj52listaDsctoJson.Recalcular = "" ;


                        var obj53listaDsctoJson ={};
                            obj53listaDsctoJson.matPosicion = "" ;
                            obj53listaDsctoJson.id = 53;
                           obj53listaDsctoJson.Posicion = "" ;
                            obj53listaDsctoJson.Condicion = "" ;
                            obj53listaDsctoJson.Importe = "" ;
                            obj53listaDsctoJson.ImporteAnterior = "" ;
                            obj53listaDsctoJson.Moneda = "" ;
                            obj53listaDsctoJson.Valor = "" ;
                            obj53listaDsctoJson.Denominacion = "" ;
                            obj53listaDsctoJson.esPorcentaje = "" ;
                            obj53listaDsctoJson.LimiteInferior = "" ;
                            obj53listaDsctoJson.Recalcular = "" ;


                        var obj54listaDsctoJson = {};
                            obj54listaDsctoJson.matPosicion = "" ;
                            obj54listaDsctoJson.id = 54;
                           obj54listaDsctoJson.Posicion = "" ;
                            obj54listaDsctoJson.Condicion = "" ;
                            obj54listaDsctoJson.Importe = "" ;
                            obj54listaDsctoJson.ImporteAnterior = "" ;
                            obj54listaDsctoJson.Moneda = "" ;
                            obj54listaDsctoJson.Valor = "" ;
                            obj54listaDsctoJson.Denominacion = "" ;
                            obj54listaDsctoJson.esPorcentaje = "" ;
                            obj54listaDsctoJson.LimiteInferior = "" ;
                            obj54listaDsctoJson.Recalcular = "" ;


                        var obj55listaDsctoJson = {};
                            obj55listaDsctoJson.matPosicion = "" ;
                            obj55listaDsctoJson.id = 55;
                           obj55listaDsctoJson.Posicion = "" ;
                            obj55listaDsctoJson.Condicion = "" ;
                            obj55listaDsctoJson.Importe = "" ;
                            obj55listaDsctoJson.ImporteAnterior = "" ;
                            obj55listaDsctoJson.Moneda = "" ;
                            obj55listaDsctoJson.Valor = "" ;
                            obj55listaDsctoJson.Denominacion = "" ;
                            obj55listaDsctoJson.esPorcentaje = "" ;
                            obj55listaDsctoJson.LimiteInferior = "" ;
                            obj55listaDsctoJson.Recalcular = "" ;


                        var obj56listaDsctoJson = {};
                            obj56listaDsctoJson.matPosicion = "" ;
                            obj56listaDsctoJson.id = 56;
                           obj56listaDsctoJson.Posicion = "" ;
                            obj56listaDsctoJson.Condicion = "" ;
                            obj56listaDsctoJson.Importe = "" ;
                            obj56listaDsctoJson.ImporteAnterior = "" ;
                            obj56listaDsctoJson.Moneda = "" ;
                            obj56listaDsctoJson.Valor = "" ;
                            obj56listaDsctoJson.Denominacion = "" ;
                            obj56listaDsctoJson.esPorcentaje = "" ;
                            obj56listaDsctoJson.LimiteInferior = "" ;
                            obj56listaDsctoJson.Recalcular = "" ;


                        var obj57listaDsctoJson = {};
                            obj57listaDsctoJson.matPosicion = "" ;
                            obj57listaDsctoJson.id = 57;
                           obj57listaDsctoJson.Posicion = "" ;
                            obj57listaDsctoJson.Condicion = "" ;
                            obj57listaDsctoJson.Importe = "" ;
                            obj57listaDsctoJson.ImporteAnterior = "" ;
                            obj57listaDsctoJson.Moneda = "" ;
                            obj57listaDsctoJson.Valor = "" ;
                            obj57listaDsctoJson.Denominacion = "" ;
                            obj57listaDsctoJson.esPorcentaje = "" ;
                            obj57listaDsctoJson.LimiteInferior = "" ;
                            obj57listaDsctoJson.Recalcular = "" ;


                        var obj58listaDsctoJson = {};
                            obj58listaDsctoJson.matPosicion = "" ;
                            obj58listaDsctoJson.id = 58;
                           obj58listaDsctoJson.Posicion = "" ;
                            obj58listaDsctoJson.Condicion = "" ;
                            obj58listaDsctoJson.Importe = "" ;
                            obj58listaDsctoJson.ImporteAnterior = "" ;
                            obj58listaDsctoJson.Moneda = "" ;
                            obj58listaDsctoJson.Valor = "" ;
                            obj58listaDsctoJson.Denominacion = "" ;
                            obj58listaDsctoJson.esPorcentaje = "" ;
                            obj58listaDsctoJson.LimiteInferior = "" ;
                            obj58listaDsctoJson.Recalcular = "" ;


                        var obj59listaDsctoJson = {};
                            obj59listaDsctoJson.matPosicion = "" ;
                            obj59listaDsctoJson.id = 59;
                           obj59listaDsctoJson.Posicion = "" ;
                            obj59listaDsctoJson.Condicion = "" ;
                            obj59listaDsctoJson.Importe = "" ;
                            obj59listaDsctoJson.ImporteAnterior = "" ;
                            obj59listaDsctoJson.Moneda = "" ;
                            obj59listaDsctoJson.Valor = "" ;
                            obj59listaDsctoJson.Denominacion = "" ;
                            obj59listaDsctoJson.esPorcentaje = "" ;
                            obj59listaDsctoJson.LimiteInferior = "" ;
                            obj59listaDsctoJson.Recalcular = "" ;


                        var obj60listaDsctoJson = {};
                            obj60listaDsctoJson.matPosicion = "" ;
                            obj60listaDsctoJson.id = 60;
                           obj60listaDsctoJson.Posicion = "" ;
                            obj60listaDsctoJson.Condicion = "" ;
                            obj60listaDsctoJson.Importe = "" ;
                            obj60listaDsctoJson.ImporteAnterior = "" ;
                            obj60listaDsctoJson.Moneda = "" ;
                            obj60listaDsctoJson.Valor = "" ;
                            obj60listaDsctoJson.Denominacion = "" ;
                            obj60listaDsctoJson.esPorcentaje = "" ;
                            obj60listaDsctoJson.LimiteInferior = "" ;
                            obj60listaDsctoJson.Recalcular = "" ;


                        var obj61listaDsctoJson = {};
                            obj61listaDsctoJson.matPosicion = "" ;
                            obj61listaDsctoJson.id = 61;
                           obj61listaDsctoJson.Posicion = "" ;
                            obj61listaDsctoJson.Condicion = "" ;
                            obj61listaDsctoJson.Importe = "" ;
                            obj61listaDsctoJson.ImporteAnterior = "" ;
                            obj61listaDsctoJson.Moneda = "" ;
                            obj61listaDsctoJson.Valor = "" ;
                            obj61listaDsctoJson.Denominacion = "" ;
                            obj61listaDsctoJson.esPorcentaje = "" ;
                            obj61listaDsctoJson.LimiteInferior = "" ;
                            obj61listaDsctoJson.Recalcular = "" ;


                        var obj62listaDsctoJson = {};
                            obj62listaDsctoJson.matPosicion = "" ;
                            obj62listaDsctoJson.id = 62;
                           obj62listaDsctoJson.Posicion = "" ;
                            obj62listaDsctoJson.Condicion = "" ;
                            obj62listaDsctoJson.Importe = "" ;
                            obj62listaDsctoJson.ImporteAnterior = "" ;
                            obj62listaDsctoJson.Moneda = "" ;
                            obj62listaDsctoJson.Valor = "" ;
                            obj62listaDsctoJson.Denominacion = "" ;
                            obj62listaDsctoJson.esPorcentaje = "" ;
                            obj62listaDsctoJson.LimiteInferior = "" ;
                            obj62listaDsctoJson.Recalcular = "" ;


                        var obj63listaDsctoJson = {};
                            obj63listaDsctoJson.matPosicion = "" ;
                            obj63listaDsctoJson.id = 63;
                           obj63listaDsctoJson.Posicion = "" ;
                            obj63listaDsctoJson.Condicion = "" ;
                            obj63listaDsctoJson.Importe = "" ;
                            obj63listaDsctoJson.ImporteAnterior = "" ;
                            obj63listaDsctoJson.Moneda = "" ;
                            obj63listaDsctoJson.Valor = "" ;
                            obj63listaDsctoJson.Denominacion = "" ;
                            obj63listaDsctoJson.esPorcentaje = "" ;
                            obj63listaDsctoJson.LimiteInferior = "" ;
                            obj63listaDsctoJson.Recalcular = "" ;


                        var obj64listaDsctoJson = {};
                            obj64listaDsctoJson.matPosicion = "" ;
                            obj64listaDsctoJson.id = 64;
                           obj64listaDsctoJson.Posicion = "" ;
                            obj64listaDsctoJson.Condicion = "" ;
                            obj64listaDsctoJson.Importe = "" ;
                            obj64listaDsctoJson.ImporteAnterior = "" ;
                            obj64listaDsctoJson.Moneda = "" ;
                            obj64listaDsctoJson.Valor = "" ;
                            obj64listaDsctoJson.Denominacion = "" ;
                            obj64listaDsctoJson.esPorcentaje = "" ;
                            obj64listaDsctoJson.LimiteInferior = "" ;
                            obj64listaDsctoJson.Recalcular = "" ;


                        var obj65listaDsctoJson = {};
                            obj65listaDsctoJson.matPosicion = "" ;
                            obj65listaDsctoJson.id = 65;
                           obj65listaDsctoJson.Posicion = "" ;
                            obj65listaDsctoJson.Condicion = "" ;
                            obj65listaDsctoJson.Importe = "" ;
                            obj65listaDsctoJson.ImporteAnterior = "" ;
                            obj65listaDsctoJson.Moneda = "" ;
                            obj65listaDsctoJson.Valor = "" ;
                            obj65listaDsctoJson.Denominacion = "" ;
                            obj65listaDsctoJson.esPorcentaje = "" ;
                            obj65listaDsctoJson.LimiteInferior = "" ;
                            obj65listaDsctoJson.Recalcular = "" ;


                        var obj66listaDsctoJson = {};
                            obj66listaDsctoJson.matPosicion = "" ;
                            obj66listaDsctoJson.id = 66;
                           obj66listaDsctoJson.Posicion = "" ;
                            obj66listaDsctoJson.Condicion = "" ;
                            obj66listaDsctoJson.Importe = "" ;
                            obj66listaDsctoJson.ImporteAnterior = "" ;
                            obj66listaDsctoJson.Moneda = "" ;
                            obj66listaDsctoJson.Valor = "" ;
                            obj66listaDsctoJson.Denominacion = "" ;
                            obj66listaDsctoJson.esPorcentaje = "" ;
                            obj66listaDsctoJson.LimiteInferior = "" ;
                            obj66listaDsctoJson.Recalcular = "" ;


                        var obj67listaDsctoJson = {};
                            obj67listaDsctoJson.matPosicion = "" ;
                            obj67listaDsctoJson.id = 67;
                           obj67listaDsctoJson.Posicion = "" ;
                            obj67listaDsctoJson.Condicion = "" ;
                            obj67listaDsctoJson.Importe = "" ;
                            obj67listaDsctoJson.ImporteAnterior = "" ;
                            obj67listaDsctoJson.Moneda = "" ;
                            obj67listaDsctoJson.Valor = "" ;
                            obj67listaDsctoJson.Denominacion = "" ;
                            obj67listaDsctoJson.esPorcentaje = "" ;
                            obj67listaDsctoJson.LimiteInferior = "" ;
                            obj67listaDsctoJson.Recalcular = "" ;


                        var obj68listaDsctoJson = {};
                            obj68listaDsctoJson.matPosicion = "" ;
                            obj68listaDsctoJson.id = 68;
                           obj68listaDsctoJson.Posicion = "" ;
                            obj68listaDsctoJson.Condicion = "" ;
                            obj68listaDsctoJson.Importe = "" ;
                            obj68listaDsctoJson.ImporteAnterior = "" ;
                            obj68listaDsctoJson.Moneda = "" ;
                            obj68listaDsctoJson.Valor = "" ;
                            obj68listaDsctoJson.Denominacion = "" ;
                            obj68listaDsctoJson.esPorcentaje = "" ;
                            obj68listaDsctoJson.LimiteInferior = "" ;
                            obj68listaDsctoJson.Recalcular = "" ;


                        var obj69listaDsctoJson = {};
                            obj69listaDsctoJson.matPosicion = "" ;
                            obj69listaDsctoJson.id = 69;
                           obj69listaDsctoJson.Posicion = "" ;
                            obj69listaDsctoJson.Condicion = "" ;
                            obj69listaDsctoJson.Importe = "" ;
                            obj69listaDsctoJson.ImporteAnterior = "" ;
                            obj69listaDsctoJson.Moneda = "" ;
                            obj69listaDsctoJson.Valor = "" ;
                            obj69listaDsctoJson.Denominacion = "" ;
                            obj69listaDsctoJson.esPorcentaje = "" ;
                            obj69listaDsctoJson.LimiteInferior = "" ;
                            obj69listaDsctoJson.Recalcular = "" ;


                        var obj70listaDsctoJson = {};
                            obj70listaDsctoJson.matPosicion = "" ;
                            obj70listaDsctoJson.id = 70;
                           obj70listaDsctoJson.Posicion = "" ;
                            obj70listaDsctoJson.Condicion = "" ;
                            obj70listaDsctoJson.Importe = "" ;
                            obj70listaDsctoJson.ImporteAnterior = "" ;
                            obj70listaDsctoJson.Moneda = "" ;
                            obj70listaDsctoJson.Valor = "" ;
                            obj70listaDsctoJson.Denominacion = "" ;
                            obj70listaDsctoJson.esPorcentaje = "" ;
                            obj70listaDsctoJson.LimiteInferior = "" ;
                            obj70listaDsctoJson.Recalcular = "" ;


                        var obj71listaDsctoJson = {};
                            obj71listaDsctoJson.matPosicion = "" ;
                            obj71listaDsctoJson.id = 71;
                           obj71listaDsctoJson.Posicion = "" ;
                            obj71listaDsctoJson.Condicion = "" ;
                            obj71listaDsctoJson.Importe = "" ;
                            obj71listaDsctoJson.ImporteAnterior = "" ;
                            obj71listaDsctoJson.Moneda = "" ;
                            obj71listaDsctoJson.Valor = "" ;
                            obj71listaDsctoJson.Denominacion = "" ;
                            obj71listaDsctoJson.esPorcentaje = "" ;
                            obj71listaDsctoJson.LimiteInferior = "" ;
                            obj71listaDsctoJson.Recalcular = "" ;


                        var obj72listaDsctoJson = {};
                            obj72listaDsctoJson.matPosicion = "" ;
                            obj72listaDsctoJson.id = 72;
                           obj72listaDsctoJson.Posicion = "" ;
                            obj72listaDsctoJson.Condicion = "" ;
                            obj72listaDsctoJson.Importe = "" ;
                            obj72listaDsctoJson.ImporteAnterior = "" ;
                            obj72listaDsctoJson.Moneda = "" ;
                            obj72listaDsctoJson.Valor = "" ;
                            obj72listaDsctoJson.Denominacion = "" ;
                            obj72listaDsctoJson.esPorcentaje = "" ;
                            obj72listaDsctoJson.LimiteInferior = "" ;
                            obj72listaDsctoJson.Recalcular = "" ;


                    listaDsctoJson.push(obj1listaDsctoJson);
                    listaDsctoJson.push(obj2listaDsctoJson);
                    listaDsctoJson.push(obj3listaDsctoJson);
                    listaDsctoJson.push(obj4listaDsctoJson);
                    listaDsctoJson.push(obj5listaDsctoJson);
                    listaDsctoJson.push(obj6listaDsctoJson);
                    listaDsctoJson.push(obj7listaDsctoJson);
                    listaDsctoJson.push(obj8listaDsctoJson);
                    listaDsctoJson.push(obj9listaDsctoJson);
                    listaDsctoJson.push(obj10listaDsctoJson);
                    listaDsctoJson.push(obj11listaDsctoJson);
                    listaDsctoJson.push(obj12listaDsctoJson);
                    listaDsctoJson.push(obj13listaDsctoJson);
                    listaDsctoJson.push(obj14listaDsctoJson);
                    listaDsctoJson.push(obj15listaDsctoJson);
                    listaDsctoJson.push(obj16listaDsctoJson);
                    listaDsctoJson.push(obj17listaDsctoJson);
                    listaDsctoJson.push(obj18listaDsctoJson);
                    listaDsctoJson.push(obj19listaDsctoJson);
                    listaDsctoJson.push(obj20listaDsctoJson);
                    listaDsctoJson.push(obj21listaDsctoJson);
                    listaDsctoJson.push(obj22listaDsctoJson);
                    listaDsctoJson.push(obj23listaDsctoJson);
                    listaDsctoJson.push(obj24listaDsctoJson);
                    listaDsctoJson.push(obj25listaDsctoJson);
                    listaDsctoJson.push(obj26listaDsctoJson);
                    listaDsctoJson.push(obj27listaDsctoJson);
                    listaDsctoJson.push(obj28listaDsctoJson);
                    listaDsctoJson.push(obj29listaDsctoJson);
                    listaDsctoJson.push(obj30listaDsctoJson);
                    listaDsctoJson.push(obj31listaDsctoJson);
                    listaDsctoJson.push(obj32listaDsctoJson);
                    listaDsctoJson.push(obj33listaDsctoJson);
                    listaDsctoJson.push(obj34listaDsctoJson);
                    listaDsctoJson.push(obj35listaDsctoJson);
                    listaDsctoJson.push(obj36listaDsctoJson);
                    listaDsctoJson.push(obj37listaDsctoJson);
                    listaDsctoJson.push(obj38listaDsctoJson);
                    listaDsctoJson.push(obj39listaDsctoJson);
                    listaDsctoJson.push(obj40listaDsctoJson);
                    listaDsctoJson.push(obj41listaDsctoJson);
                    listaDsctoJson.push(obj42listaDsctoJson);
                    listaDsctoJson.push(obj43listaDsctoJson);
                    listaDsctoJson.push(obj44listaDsctoJson);
                    listaDsctoJson.push(obj45listaDsctoJson);
                    listaDsctoJson.push(obj46listaDsctoJson);
                    listaDsctoJson.push(obj47listaDsctoJson);
                    listaDsctoJson.push(obj48listaDsctoJson);
                    listaDsctoJson.push(obj49listaDsctoJson);
                    listaDsctoJson.push(obj50listaDsctoJson);
                    listaDsctoJson.push(obj51listaDsctoJson);
                    listaDsctoJson.push(obj52listaDsctoJson);
                    listaDsctoJson.push(obj53listaDsctoJson);
                    listaDsctoJson.push(obj54listaDsctoJson);
                    listaDsctoJson.push(obj55listaDsctoJson);
                    listaDsctoJson.push(obj56listaDsctoJson);
                    listaDsctoJson.push(obj57listaDsctoJson);
                    listaDsctoJson.push(obj58listaDsctoJson);
                    listaDsctoJson.push(obj59listaDsctoJson);
                    listaDsctoJson.push(obj60listaDsctoJson);
                    listaDsctoJson.push(obj61listaDsctoJson);
                    listaDsctoJson.push(obj62listaDsctoJson);
                    listaDsctoJson.push(obj63listaDsctoJson);
                    listaDsctoJson.push(obj64listaDsctoJson);
                    listaDsctoJson.push(obj65listaDsctoJson);
                    listaDsctoJson.push(obj66listaDsctoJson);
                    listaDsctoJson.push(obj67listaDsctoJson);
                    listaDsctoJson.push(obj68listaDsctoJson);
                    listaDsctoJson.push(obj69listaDsctoJson);
                    listaDsctoJson.push(obj70listaDsctoJson);
                    listaDsctoJson.push(obj71listaDsctoJson);
                    listaDsctoJson.push(obj72listaDsctoJson);
                    




                var listaRepartosJson = [];

                        var obj1listaRepartosJson = {};
                            obj1listaRepartosJson.matPosicion = "" ;
                            obj1listaRepartosJson.id = 1;
                            obj1listaRepartosJson.TipoReparto = "" ;
                            obj1listaRepartosJson.Pos = "" ;
                            obj1listaRepartosJson.PosCorto = "" ;
                            obj1listaRepartosJson.FechaEntrega = "" ;
                            obj1listaRepartosJson.CantPed = "" ;
                            obj1listaRepartosJson.CantConf = "" ;
                            obj1listaRepartosJson.CodUMedida = "" ;

                        var obj2listaRepartosJson = {};
                            obj2listaRepartosJson.matPosicion = "" ;
                            obj2listaRepartosJson.id = 2;
                            obj2listaRepartosJson.TipoReparto = "" ;
                            obj2listaRepartosJson.Pos = "" ;
                            obj2listaRepartosJson.PosCorto = "" ;
                            obj2listaRepartosJson.FechaEntrega = "" ;
                            obj2listaRepartosJson.CantPed = "" ;
                            obj2listaRepartosJson.CantConf = "" ;
                            obj2listaRepartosJson.CodUMedida = "" ;

                        var obj3listaRepartosJson = {};
                            obj3listaRepartosJson.matPosicion = "" ;
                            obj3listaRepartosJson.id = 3;
                            obj3listaRepartosJson.TipoReparto = "" ;
                            obj3listaRepartosJson.Pos = "" ;
                            obj3listaRepartosJson.PosCorto = "" ;
                            obj3listaRepartosJson.FechaEntrega = "" ;
                            obj3listaRepartosJson.CantPed = "" ;
                            obj3listaRepartosJson.CantConf = "" ;
                            obj3listaRepartosJson.CodUMedida = "" ;

                        var obj4listaRepartosJson = {};
                            obj4listaRepartosJson.matPosicion = "" ;
                            obj4listaRepartosJson.id = 4;
                            obj4listaRepartosJson.TipoReparto = "" ;
                            obj4listaRepartosJson.Pos = "" ;
                            obj4listaRepartosJson.PosCorto = "" ;
                            obj4listaRepartosJson.FechaEntrega = "" ;
                            obj4listaRepartosJson.CantPed = "" ;
                            obj4listaRepartosJson.CantConf = "" ;
                            obj4listaRepartosJson.CodUMedida = "" ;

                    listaRepartosJson.push(obj1listaRepartosJson);  
                    listaRepartosJson.push(obj2listaRepartosJson);
                    listaRepartosJson.push(obj3listaRepartosJson);  
                    listaRepartosJson.push(obj4listaRepartosJson);     

                var listaMatJson = []; //Se crea de acuerdo a cuantos materiales se agregan en detalles Productos
                    var obj1listaMatJson = {};
                            obj1listaMatJson.id = 1;
                            obj1listaMatJson.CodMaterial = "" ;
                            obj1listaMatJson.CodUMedida = "" ;
                            obj1listaMatJson.Descripcion = "" ;
                            obj1listaMatJson.Jerarquia = "" ;
                            obj1listaMatJson.ValorRendimiento = "" ;
                            obj1listaMatJson.TipoMaterial = "" ;
                            obj1listaMatJson.EsFlete = "" ;
                            obj1listaMatJson.EsEstiba = "" ;
                            obj1listaMatJson.EspecialServ = "" ;
                            obj1listaMatJson.Tipo = "" ;
                            obj1listaMatJson.CodMaterialCorto = "" ;
                            obj1listaMatJson.TieneServ = "" ;
                            obj1listaMatJson.Rendimiento = "" ;
                            obj1listaMatJson.DescMovil = "" ;
                            obj1listaMatJson.Descontinuado = "" ;
                            obj1listaMatJson.UMedidaRendimiendo = "" ;
                            obj1listaMatJson.DescMaterial = "" ;
                            obj1listaMatJson.PrecioUnit = "" ;
                            obj1listaMatJson.Peso = "" ;
                            obj1listaMatJson.Stock = "" ;
                            obj1listaMatJson.Mstae = "" ;
                            obj1listaMatJson.Vdscto = "" ;
                            obj1listaMatJson.StatusDespacho = "" ;
                            obj1listaMatJson.StockPos = "" ;
                            obj1listaMatJson.Posicion = "" ;
                            obj1listaMatJson.Cantidad = "" ;
                            obj1listaMatJson.CodCentro = "" ;
                            obj1listaMatJson.CodAlmacen = "" ;
                            obj1listaMatJson.CodLote = "" ;
                            obj1listaMatJson.PrecioSinIGV = "" ;
                            obj1listaMatJson.DsctoMontTotal = "" ;
                            obj1listaMatJson.MotivoRechazo = "" ;
                            obj1listaMatJson.TipoPosAnt = "" ;
                            obj1listaMatJson.CodGrupoMat = "" ;
                            obj1listaMatJson.Opcion = "" ;
                            obj1listaMatJson.Reembolsable = "" ;
                            obj1listaMatJson.Zservicio = "" ;
                            obj1listaMatJson.ContentID = "" ;
                            obj1listaMatJson.DescMaterialTicketera = "" ;
                            obj1listaMatJson.PrioridadEntrega = "" ;
                            obj1listaMatJson.FechaCantConf = "" ;
                            obj1listaMatJson.FechaCantConfStr = "" ;
                            obj1listaMatJson.PosSup = "" ;
                            obj1listaMatJson.PosSupCorto = "" ;
                            obj1listaMatJson.TipoPosicion = "" ;
                            obj1listaMatJson.CambAlmacen = "" ;
                            obj1listaMatJson.CantComp = "" ;
                            obj1listaMatJson.PrecioTotal = "" ;
                            obj1listaMatJson.PrecioUnitario = "" ;
                            obj1listaMatJson.Total = "" ;
                            obj1listaMatJson.IgvUnitario = "" ;
                            obj1listaMatJson.IgvTotal = "" ;
                            obj1listaMatJson.TotalDctos = "" ;
                            obj1listaMatJson.SubTotal = "" ;
                            obj1listaMatJson.CantConfirmada = "" ;
                            obj1listaMatJson.PesoNeto = "" ;
                            obj1listaMatJson.PrecioConIGV = "" ;
                            obj1listaMatJson.TotalImpresion = "" ;
                            obj1listaMatJson.DescCentro = "" ;
                            obj1listaMatJson.DescAlmacen = "" ;
                            obj1listaMatJson.FechaEntregaString = "" ;
                            obj1listaMatJson.Reparto = "" ;
                            obj1listaMatJson.TotPercep = "" ;
                            obj1listaMatJson.DesGrupoMat = "" ;
                            obj1listaMatJson.DivisionRendimiento = "" ;
                            obj1listaMatJson.mod = "" ;
                            obj1listaMatJson.PosicionCorto = "" ;
                            obj1listaMatJson.SubTotalLista = "" ;
                            obj1listaMatJson.fullName = "" ;

                        listaMatJson.push(obj1listaMatJson);

                var listaPedJson = [];
                        obj1listaPedJson = {};

                        obj1listaPedJson.id = "" ; //1497985445784,
                        obj1listaPedJson.CodTipoDoc = "" ; //"ZO01",
                        obj1listaPedJson.CodTipoDocAnt = "" ; //"",
                        obj1listaPedJson.Referencia = "" ; //"",
                        obj1listaPedJson.OrgVentas = "" ; //"1000",
                        obj1listaPedJson.CanalDist = "" ; //"10",
                        obj1listaPedJson.CodOficina = "" ; //"1010",
                        obj1listaPedJson.CondPago = "" ; //"E000",
                        obj1listaPedJson.Moneda = "" ; //"PEN",
                        obj1listaPedJson.CondExp = "" ; //"03",
                        obj1listaPedJson.FechaEntrega = "" ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.FechaReparto = "" ; //"2014-02-01T05:00:00.000Z",
                        obj1listaPedJson.TipoCambio = "" ; //3.282,
                        obj1listaPedJson.FechaFacturacion = "" ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.CodigoBanco = "" ; //"",
                        obj1listaPedJson.Motivo = "" ; //"002",
                        obj1listaPedJson.BloqueoEntrega = "" ; //"01",
                        obj1listaPedJson.BloqueoFactura = "" ; //"01",
                        obj1listaPedJson.OrdenCompra = "" ; //"7",
                        obj1listaPedJson.FechaPedido = "" ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.FechaValidez = "" ; //"2017-06-27T19:04:05.831Z",
                        obj1listaPedJson.Estado = "" ; //"",
                        obj1listaPedJson.nomProyecto = "" ; //"nombreProyecto",
                        obj1listaPedJson.TipoVisita = "" ; //"03",
                        obj1listaPedJson.cbxReembolsable = "" ; //false,
                        obj1listaPedJson.dsctoAdicionalZD12 = "" ; //0,
                        obj1listaPedJson.dsctoAdicionalZD12tmp = "" ; //0,
                        obj1listaPedJson.FechaPrecio = "" ; //null,
                        obj1listaPedJson.Mail = "" ; //"soli@hotmail.com",
                        obj1listaPedJson.BonoCampania = "" ; //"",
                        obj1listaPedJson.RegaloCampania = "" ; //"",
                        obj1listaPedJson.Reenbolsable = "" ; //false,
                        obj1listaPedJson.PedidoVenta1 = "" ; //"",
                        obj1listaPedJson.PedidoVenta2 = "" ; //"",
                        obj1listaPedJson.PedidoVenta3 = "" ; //"",
                        obj1listaPedJson.PedidoVenta4 = "" ; //"",
                        obj1listaPedJson.PedidoVisita1 = "" ; //"",
                        obj1listaPedJson.PedidoVisita2 = "" ; //"",
                        obj1listaPedJson.PedidoVisita3 = "" ; //"",
                        obj1listaPedJson.PedidoVisita4 = "" ; //"",
                        obj1listaPedJson.SubtotalImp = "" ; //0,
                        obj1listaPedJson.TieneEntrega = "" ; //false,
                        obj1listaPedJson.DocOriginal = "" ; //"",
                        obj1listaPedJson.Znpiso = "" ; //"",
                        obj1listaPedJson.Ztransporte = "" ; //"",
                        obj1listaPedJson.Zasensor = "" ; //false,
                        obj1listaPedJson.Zncservicio = "" ; //false,
                        obj1listaPedJson.TieneKitCombo = "" ; //false,
                        obj1listaPedJson.NumPedido = "" ; //"",
                        obj1listaPedJson.NumPedidoCorto = "" ; //"",
                        obj1listaPedJson.FechaPedidoString = "" ; //"",
                        obj1listaPedJson.FechaValidezString = "" ; //"",
                        obj1listaPedJson.FechaEntregaString = "" ; //"",
                        obj1listaPedJson.CodCliente = "" ; //"0000101317",
                        obj1listaPedJson.CodClienteCorto = "" ; //"",
                        obj1listaPedJson.CodGrupoVend = "" ; //"",
                        obj1listaPedJson.Sector = "" ; //"",
                        obj1listaPedJson.SubTotal = "" ; //155.67,
                        obj1listaPedJson.Igv = "" ; //28.02,
                        obj1listaPedJson.Total = "" ; //183.69,
                        obj1listaPedJson.TotalImp = "" ; //28.02,
                        obj1listaPedJson.PesoTotal = "" ; //0,
                        obj1listaPedJson.GrupoCond = "" ; //"01",
                        obj1listaPedJson.Tratado = "" ; //false,
                        obj1listaPedJson.ClasePedidoCliente = "" ; //"",
                        obj1listaPedJson.ClaseDocumento = "" ; //"",
                        obj1listaPedJson.CodVendedor1 = "" ; //"00001802",
                        obj1listaPedJson.NomVendedor1 = "" ; //"Julio Edgardo Pingo",
                        obj1listaPedJson.TotalConIgv = "" ; //0,
                        obj1listaPedJson.textoAtencion = "" ; //"observacionAtencion",
                        obj1listaPedJson.textoObsAdministrativas = "" ; //"observacionObservacionesAdministrativas",
                        obj1listaPedJson.textoRefFactura = "" ; //"observacionReferenciaFactura",
                        obj1listaPedJson.textoRefDireccion = "" ; //"observacionReferenciaDireccion",
                        obj1listaPedJson.correo = "" ; //"",
                        obj1listaPedJson.codigoSolicitante = "" ; //"",
                        obj1listaPedJson.codigoDestFact = "" ; //"",
                        obj1listaPedJson.codigoResPago = "" ; //"",
                        obj1listaPedJson.nombreSolicitante = "" ; //"",
                        obj1listaPedJson.direccionSolicitante = "" ; //"",
                        obj1listaPedJson.codigoPostalSolicitante = "" ; //"",
                        obj1listaPedJson.telefonoSolicitante = "" ; //"",
                        obj1listaPedJson.nifSolicitante = "" ; //"",
                        obj1listaPedJson.codigoDestMerc = "" ; //"",
                        obj1listaPedJson.nombreDestMerc = "" ; //"",
                        obj1listaPedJson.direccionDestMerc = "" ; //"",
                        obj1listaPedJson.codigoPostalDestMerc = "" ; //"",
                        obj1listaPedJson.telefonoDestMerc = "" ; //"",
                        obj1listaPedJson.telefonoMovilDestMerc = "" ; //"",
                        obj1listaPedJson.nombreDestFact = "" ; //"",
                        obj1listaPedJson.direccionDestFact = "" ; //"",
                        obj1listaPedJson.codigoPostalDestFact = "" ; //"",
                        obj1listaPedJson.telefonoDestFact = "" ; //"",
                        obj1listaPedJson.nombreResPago = "" ; //"",
                        obj1listaPedJson.direccionResPago = "" ; //"",
                        obj1listaPedJson.codigoPostalResPago = "" ; //"",
                        obj1listaPedJson.telefonoResPago = "" ; //"",
                        obj1listaPedJson.nifResPago = "" ; //"",
                        obj1listaPedJson.codigoCliente = "" ; //"0000101317",
                        obj1listaPedJson.nombreCliente = "" ; //"nombreSoli",
                        obj1listaPedJson.direccionCliente = "" ; //"direSoli",
                        obj1listaPedJson.apePatSolicitante = "" ; //"",
                        obj1listaPedJson.apeMatSolicitante = "" ; //"",
                        obj1listaPedJson.textoContacto = "" ; //"",
                        obj1listaPedJson.textoDatosAdicionalesCliente = "" ; //"",
                        obj1listaPedJson.textoTelefonos = "" ; //"",
                        obj1listaPedJson.textoDescripcionVisita = "" ; //"",
                        obj1listaPedJson.textoResultadoVisita = "" ; //"",
                        obj1listaPedJson.textoDescripcionServInstalacion = "" ; //"",


                        ////////////////////////////////////
                        var datosCliente = {}; //Un objeto puede estar dentro de otro ? Preguntar a Franz

                                /*
                                datosCliente.1 = "" ; //"1",
                                datosCliente.10 = "" ; //"1",
                                datosCliente.15 = "" ; //"1",
                                datosCliente.20 = "" ; //"",
                                datosCliente.25 = "" ; //"1",
                                datosCliente.35 = "" ; //"30",

                                */
                                datosCliente.CODIG = "" ; //"87654321",
                                datosCliente.APPAT = "" ; //"apellidoPSoli",
                                datosCliente.APMAT = "" ; //"apellidoMSoli",
                                datosCliente.NOMBRE = "" ; //"nombreSoli",
                                datosCliente.FECNAC = "" ; //"2013-06-20T11:00:00.000Z",
                                datosCliente.GRAINS = "" ; //"10",
                                datosCliente.SEXO = "" ; //"1",
                                datosCliente.CIUDAD = "" ; //"140101",
                                datosCliente.EDAD = "" ; //"4",
                                datosCliente.RANGOED = "" ; //"1",
                                datosCliente.NIVELSE = "" ; //"A",
                                datosCliente.DIREC = "" ; //"direSoli"},

                        //obj1listaPedJson.datosCliente;
                            ///////////////////////////////


                        obj1listaPedJson.listaPre = "" ; //"",
                        obj1listaPedJson.TotalDcto = "" ; //0,
                        obj1listaPedJson.codProyecto = "" ; //"codigoProyecto",
                        obj1listaPedJson.codVersion = "" ; //"1025",
                        obj1listaPedJson.GrupoForecast = "" ; //"01",
                        obj1listaPedJson.TipoForecast = "" ; //" ",
                        obj1listaPedJson.NoImpFac = "" ; //"",
                        obj1listaPedJson.Certificado = "" ; //"nroCertificado",
                        obj1listaPedJson.FechaVisita = "" ; //"2017-08-01T05:00:00.000Z"}




                        listaPedJson.push(obj1listaPedJson);

           
        },
        



            
    });

});
