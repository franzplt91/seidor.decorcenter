sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/crearDocumentoServices",
    "pe/com/seidor/sap/decor/ventas/services/guardarDocumento",
    "sap/ui/model/odata/ODataModel"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery, crearDocumentoServices, guardarDocumento,ODataModel) {
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


                    //////Redireccion Documento Nuevo - Stock Disponible////
                    if(window.IsDocNuevo == true){
                        this.getView().byId("dlg_DialogDocNuevo").open();
                    }else{
                        this.getView().byId("dlg_DocNuevobuscar").open();
                    }
                    ////////////////////////////////////////////////////////
                    

                    var firstItem = this.getView().byId("ListaDocNuevo").getItems()[19]; //ponerlo en la posicion ZO01
                    this.getView().byId("ListaDocNuevo").setSelectedItem(firstItem,true);

                    this.getView().byId("txt_nombre_solicitante").setValue("");
                    this.getView().byId("btnCopiarDatosInterlocutores").setText("Copiar Datos");
                    this.getView().byId("btnBuscarInterlocutor").setText("Buscar Solicitante");
                    this.getView().byId("btnCopiarDatosInterlocutores").setVisible(true);
                    this.getView().byId("btnBuscarInterlocutor").setVisible(true);

                    this.getView().byId("com_tipo_cliente_datosAdicionales").setSelectedKey(" ");

                    this.getView().byId("buttonMasterDatos").setSelectedKey("datos");
                    this.getView().byId("buttonMasterProductos").setSelectedKey("productos");
                    
                    
                    
                    
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

        //Dialog Aviso General
        //ID DIALOG  this.getView().byId("dlg_MensajeAvisoGeneral").open();
        //ID TEXT  this.getView().byId("txt_aviso_general").setText(abc);
        onOkDlg_MensajeAvisoGeneral:function(){
            this.getView().byId("dlg_MensajeAvisoGeneral").close();
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


            if(this.getView().byId("tabInterlocutores").getSelectedKey()=="filterSolicitante"){

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

            this.getView().byId("dlg_MensajeAvisoCopiarDatos").open();

            }

            

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


                       var self = this;


                            self.getView().byId("loadingControl").open();
                            setTimeout(function(){



                            
                            var result = clienteServices.buscarSolicitante(codigo,dni_ruc,dni_ruc,codcliente,descripcion,
                                                direccion,distrito,telefono,mail,esRuc,canal);

                            if (result.c === "s") {

                                if (result.data.success) {

                                    self.getView().getModel().setProperty("/BusquedaSolicitante", result.data);


                                    //Lista Respuestas de Lista Preguntas
                                    //Tipo de cliente
                                     self.getView().getModel().setProperty("/listaR0",result.data.listCliPregResp[0]);
                                     
                                     
                                     //Tipo de construcción
                                     self.getView().getModel().setProperty("/listaR1",result.data.listCliPregResp[1]);

                                     //Tipo de proyecto - Residencial
                                     self.getView().getModel().setProperty("/listaR2",result.data.listCliPregResp[2]);

                                     //Tipo de proyecto - Institucional
                                     self.getView().getModel().setProperty("/listaR3",result.data.listCliPregResp[3]);

                                     //Presupuesto para el proyecto
                                     self.getView().getModel().setProperty("/listaR4",result.data.listCliPregResp[4]);

                                     //Ambiente 1
                                     self.getView().getModel().setProperty("/listaR5",result.data.listCliPregResp[5]);

                                     //Estilo 1
                                     self.getView().getModel().setProperty("/listaR6",result.data.listCliPregResp[6]);

                                     //Ambiente 2
                                     self.getView().getModel().setProperty("/listaR7",result.data.listCliPregResp[7]);

                                     //Estilo 2
                                     self.getView().getModel().setProperty("/listaR8",result.data.listCliPregResp[8]);

                                     //Ambiente 3
                                     self.getView().getModel().setProperty("/listaR9",result.data.listCliPregResp[9]);

                                     //Estilo 3
                                     self.getView().getModel().setProperty("/listaR10",result.data.listCliPregResp[10]);

                                     //

                                    self.getView().getModel().refresh();


                                    self.getView().byId("tituloDetailCliente_datosClientes").bindProperty("title",{ parts:[

                                                                                                            {path:"/BusquedaSolicitante/objCliente/NOMBRE"},
                                                                                                            {path:"/BusquedaSolicitante/objCliente/APPAT"},
                                                                                                            {path:"/BusquedaSolicitante/objCliente/APMAT"}

                                                                                                            ] });


                                    self.getView().byId("tituloDetailCliente_interlocutores").bindProperty("title",{ parts:[

                                                                                                            {path:"/BusquedaSolicitante/objCliente/NOMBRE"},
                                                                                                            {path:"/BusquedaSolicitante/objCliente/APPAT"},
                                                                                                            {path:"/BusquedaSolicitante/objCliente/APMAT"}

                                                                                                            ] });
                                    
                                    MessageToast.show("Solicitante Encontrado");


                                } else {

                                    sap.m.MessageToast.show(result.data.errors.reason, {
                                        duration: 3000
                                    });

                                }


                            }


                             else {
                                sap.m.MessageToast.show(result.m, {
                                    duration: 3000
                                });
                            }

                            console.log(result.data);



                            self.getView().byId("loadingControl").close();
                            },1000);


                        }

                        

                ///////////////////////////////////////////////////////////////

                if(this.getView().byId("txt_nombre_solicitante").getValue()!=="" && this.getView().byId("txt_dni_ruc_solicitante").getValue()==""){

                            var BusNombres = "BusNombres";
                            var NombresBuscado = this.getView().byId("txt_nombre_solicitante").getValue();


                            var self = this;


                            self.getView().byId("loadingControl").open();
                            setTimeout(function(){



                            

                            var result = clienteServices.buscarSolicitanteNombre(BusNombres,NombresBuscado);

                                                if (result.c === "s") {

                                                            if (result.data.success) {

                                                                self.getView().getModel().setProperty("/BusquedaSolicitanteNombre", result.data);
                                                                
                                                                self.getView().getModel().refresh();

                                                                var ejem = self.getView().getModel().getProperty("/BusquedaSolicitanteNombre");
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
                                        

                        self.getView().byId("loadingControl").close();
                            },1000);


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



             var self = this;


            self.getView().byId("loadingControl").open();
            setTimeout(function(){




            var result = crearDocumentoServices.crearDoc(tipoDocumento,pNumPedido);
             

            if (result.c === "s") {

                    if (result.data.success) {

                        self.getView().getModel().setProperty("/RetornoCrearDocumento", result.data);
                        self.getView().getModel().refresh();
                        self.getView().byId("dlg_DialogDocNuevo").close();
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



        self.getView().byId("loadingControl").close();
        },1000);



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

            


            var codigoCliente = this.getView().byId("txt_codigo_solicitante").getValue();
            var nombreCliente = this.getView().byId("txt_nombre_solicitante").getValue();

            var OrgVentas = this.getView().byId("com_orgVentas_areaVentas").getSelectedKey();
            var CanalDist = this.getView().byId("com_Canal_areaVentas").getSelectedKey();

            var CodOficina = this.getView().byId("com_oficina_areaVentas").getSelectedKey();
            var CondPago = this.getView().byId("com_condPago_pago").getSelectedKey();
            var Moneda = this.getView().byId("com_moneda_pago").getSelectedKey();
            var TipoCambio = this.getView().byId("txt_tipoCambio_pago").getValue();
            var dsctoAdicionalZD12 = "";
            var pesoTotal = "0.300 KG"; 
            var FechaFacturacion = this.getView().byId("date_fechaFacturacion_datosFacturacion").getValue();
            var GrupoCond = "";
            var Motivo = this.getView().byId("com_motivoNcNd_datosFacturacion").getSelectedKey();
            var BloqueoFactura = this.getView().byId("com_bloqueoFactura_datosFacturacion").getSelectedKey();
            var BloqueoEntrega = this.getView().byId("com_bloqueoEntrega_datosFacturacion").getSelectedKey();
            var OrdenCompra = "";
            var FechaPedido = this.getView().byId("date_fechaPedido_datosDocumento").getValue();
            var FechaValidez = this.getView().byId("date_fechaValidez_datosDocumento").getValue();
            var FechaEntrega = this.getView().byId("date_fechaEntReferencial_datosDocumento").getValue();
            var CondExp = "03";
            var FechaReparto = this.getView().byId("date_fechaDespachoReparto_datosDocumento").getValue();
            var nomProyecto = this.getView().byId("txt_nombreProyecto_proyectoVisita").getValue();
            var codProyecto = this.getView().byId("txt_codigoProyecto_proyectoVisita").getValue();
            var codVersion = this.getView().byId("txt_codigoVersion_proyectoVisita").getValue();
            var TipoVisita = this.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey();
            var cbxReembolsable = "";
            var GrupoForecast = this.getView().byId("com_grupoForecast_proyectoVisita").getSelectedKey() ;
            var TipoForecast = this.getView().byId("com_tipoForecast_proyectoVisita").getSelectedKey();
            var Certificado = this.getView().byId("txt_nroCertificado_proyectoVisita").getValue();
            var FechaVisita = this.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey();
           var listaMatJson = this.getView().getModel().getProperty("/listaMatLleno"); //Se crea de acuerdo a cuantos materiales se agregan en detalles Productos
                var listaMatJsonLleno = JSON.stringify(listaMatJson);
                    

            var listaDsctoJson = this.getView().getModel().getProperty("/dsctoRetornoRecalcular");
                var listaDsctoJsonLleno = JSON.stringify(listaDsctoJson);


            var listaRepJson = this.getView().getModel().getProperty("/listaRepartosLleno");
                var listaRepJsonLleno =   JSON.stringify(listaRepJson);


//////////////////Lista Interna Json//////////////////////////////////////
            var listaIntJson = [] ;


            var obj1listaIntJson ={};
                                //Funcion AG Solicitante
                            obj1listaIntJson.id = 1;
                            obj1listaIntJson.PedidoId = 0 ;
                            obj1listaIntJson.Funcion = this.getView().byId("txt_funcion_solicitante").getValue() ;
                            obj1listaIntJson.Codigo = this.getView().byId("txt_codigo_solicitante").getValue() ;
                            obj1listaIntJson.Ruc = this.getView().byId("txt_dni_ruc_solicitante").getValue() ;
                            obj1listaIntJson.Descripcion = this.getView().byId("txt_nombre_solicitante").getValue() ;
                            obj1listaIntJson.Titulo = "" ;
                            obj1listaIntJson.Direccion = this.getView().byId("txt_direccion_solicitante").getValue() ;
                            obj1listaIntJson.DireccionCompleta = "" ;
                            obj1listaIntJson.Ciudad = this.getView().byId("com_distrito_solicitante").getSelectedKey() ; //getSelectedItem().getText()
                            obj1listaIntJson.Pais = "" ;
                            obj1listaIntJson.CodigoPostal = this.getView().byId("com_distrito_solicitante").getSelectedKey() ;
                            obj1listaIntJson.Distrito = this.getView().byId("com_distrito_solicitante").getSelectedKey() ; //getSelectedItem().getText()
                            obj1listaIntJson.Telefono = this.getView().byId("txt_telefono_solicitante").getValue() ;
                            obj1listaIntJson.TelefonoMovil = "" ;
                            obj1listaIntJson.Mail = this.getView().byId("txt_correo_solicitante").getValue() ;
                            obj1listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR0/PersonaFisica") ;
                            obj1listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR0/Eventual") ;
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
                                //RE Destino Factura
                            obj2listaIntJson.id = 2;
                            obj2listaIntJson.PedidoId = 0 ;
                            obj2listaIntJson.Funcion = this.getView().byId("txt_funcion_destinoFactura").getValue() ;
                            obj2listaIntJson.Codigo = this.getView().byId("txt_codigo_destinoFactura").getValue() ;
                            obj2listaIntJson.Ruc = "" ;
                            obj2listaIntJson.Descripcion = this.getView().byId("txt_nombre_destinoFactura").getValue() ;
                            obj2listaIntJson.Titulo = "" ;
                            obj2listaIntJson.Direccion = this.getView().byId("txt_direccion_destinoFactura").getValue() ;
                            obj2listaIntJson.DireccionCompleta = "" ;
                            obj2listaIntJson.Ciudad = this.getView().byId("com_distrito_destinoFactura").getSelectedKey() ; //getSelectedItem().getText()
                            obj2listaIntJson.Pais = "" ;
                            obj2listaIntJson.CodigoPostal = this.getView().byId("com_distrito_destinoFactura").getSelectedKey() ;
                            obj2listaIntJson.Distrito = this.getView().byId("com_distrito_destinoFactura").getSelectedKey() ; //getSelectedItem().getText()
                            obj2listaIntJson.Telefono = this.getView().byId("txt_telefono_destinoFactura").getValue() ;
                            obj2listaIntJson.TelefonoMovil = "" ;
                            obj2listaIntJson.Mail = "" ;
                            obj2listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR1/PersonaFisica") ;
                            obj2listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR1/Eventual") ;
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
                                //WE Destino Mercancia
                            obj3listaIntJson.id = 3;
                            obj3listaIntJson.PedidoId = 0 ;
                            obj3listaIntJson.Funcion = this.getView().byId("txt_funcion_destinoMercancia").getValue() ;
                            obj3listaIntJson.Codigo = this.getView().byId("txt_codigo_destinoMercancia").getValue() ;
                            obj3listaIntJson.Ruc = "" ;
                            obj3listaIntJson.Descripcion = this.getView().byId("txt_nombre_destinoMercancia").getValue() ;
                            obj3listaIntJson.Titulo = "" ;
                            obj3listaIntJson.Direccion = this.getView().byId("txt_direccion_destinoMercancia").getValue() ;
                            obj3listaIntJson.DireccionCompleta = "" ;
                            obj3listaIntJson.Ciudad = this.getView().byId("com_distrito_destinoMercancia").getSelectedKey() ; //getSelectedItem().getText()
                            obj3listaIntJson.Pais = "" ;
                            obj3listaIntJson.CodigoPostal = this.getView().byId("com_distrito_destinoMercancia").getSelectedKey() ;
                            obj3listaIntJson.Distrito = this.getView().byId("com_distrito_destinoMercancia").getSelectedKey() ; //getSelectedItem().getText()
                            obj3listaIntJson.Telefono = this.getView().byId("txt_telefono_destinoMercancia").getValue() ;
                            obj3listaIntJson.TelefonoMovil = this.getView().byId("txt_celular_destinoMercancia").getValue() ;
                            obj3listaIntJson.Mail = "" ;
                            obj3listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR2/PersonaFisica") ;
                            obj3listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR2/Eventual") ;
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
                                    // RG Responsable de Pago
                            obj4listaIntJson.id = 4;
                            obj4listaIntJson.PedidoId = 0 ;
                            obj4listaIntJson.Funcion = this.getView().byId("txt_funcion_responsablePago").getValue() ;
                            obj4listaIntJson.Codigo = this.getView().byId("txt_codigo_responsablePago").getValue() ;
                            obj4listaIntJson.Ruc = this.getView().byId("txt_dni_ruc_responsablePago").getValue() ;
                            obj4listaIntJson.Descripcion = this.getView().byId("txt_nombre_responsablePago").getValue() ;
                            obj4listaIntJson.Titulo = "" ;
                            obj4listaIntJson.Direccion = this.getView().byId("txt_direccion_responsablePago").getValue() ;
                            obj4listaIntJson.DireccionCompleta = "" ;
                            obj4listaIntJson.Ciudad = this.getView().byId("com_distrito_responsablePago").getSelectedKey() ; //getSelectedItem().getText()
                            obj4listaIntJson.Pais = "" ;
                            obj4listaIntJson.CodigoPostal = this.getView().byId("com_distrito_responsablePago").getSelectedKey() ;
                            obj4listaIntJson.Distrito = this.getView().byId("com_distrito_responsablePago").getSelectedKey() ; //getSelectedItem().getText()
                            obj4listaIntJson.Telefono = this.getView().byId("txt_telefono_responsablePago").getValue() ;
                            obj4listaIntJson.TelefonoMovil = "" ;
                            obj4listaIntJson.Mail = "" ;
                            obj4listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR3/PersonaFisica") ;
                            obj4listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR3/Eventual") ;
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
                                //Encargado Comercial
                            obj5listaIntJson.id = 5;
                            obj5listaIntJson.PedidoId = 0 ;
                            obj5listaIntJson.Funcion = "VE" ;
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
                            obj5listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR4/PersonaFisica") ;
                            obj5listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR4/Eventual") ;
                            obj5listaIntJson.ApPat = "" ;
                            obj5listaIntJson.ApMat = "" ;
                            obj5listaIntJson.TranspZone = "" ;
                            obj5listaIntJson.CodPersona = this.getView().byId("com_vendedor1_encargadoComercial").getSelectedKey() ;
                            obj5listaIntJson.Nombre = "" ;
                            obj5listaIntJson.Apellido = "" ;
                            obj5listaIntJson.Iniciales = "" ;
                            obj5listaIntJson.ApeSoltero = "" ;
                            obj5listaIntJson.DescripcionP = this.getView().byId("com_vendedor1_encargadoComercial").getSelectedKey() ; //getSelectedItem().getText()
                            obj5listaIntJson.Dni = "" ;
                            obj5listaIntJson.TelefonoP = "" ;


                        var obj6listaIntJson = {};

                            obj6listaIntJson.id = 6;
                            obj6listaIntJson.PedidoId = 0 ;
                            obj6listaIntJson.Funcion = "Z3" ;
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
                            obj6listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR5/PersonaFisica") ;
                            obj6listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR5/Eventual") ;
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
                            obj7listaIntJson.PedidoId = 0 ;
                            obj7listaIntJson.Funcion = "V2" ;
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
                            obj7listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR6/PersonaFisica") ;
                            obj7listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR6/Eventual") ;
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
                            obj8listaIntJson.PedidoId = 0 ;
                            obj8listaIntJson.Funcion = "V3" ;
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
                            obj8listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR7/PersonaFisica") ;
                            obj8listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR7/Eventual") ;
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
                            obj9listaIntJson.PedidoId = 0 ;
                            obj9listaIntJson.Funcion = "V4" ;
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
                            obj9listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR8/PersonaFisica") ;
                            obj9listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR8/Eventual") ;
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
                            obj10listaIntJson.PedidoId = 0 ;
                            obj10listaIntJson.Funcion = "Z2" ;
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
                            obj10listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR9/PersonaFisica") ;
                            obj10listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR9/Eventual") ;
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
                            obj11listaIntJson.PedidoId = 0 ;
                            obj11listaIntJson.Funcion = "Z5" ;
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
                            obj11listaIntJson.PersonaFisica = this.getView().getModel().getProperty("/listaR10/PersonaFisica") ;
                            obj11listaIntJson.Eventual = this.getView().getModel().getProperty("/listaR10/Eventual") ;
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


                var listaIntJsonLleno =   JSON.stringify(listaIntJson);

////////////////////////////////////////////////////////////////////////////
    
            var listaPedJson = this.getView().getModel().getProperty("/listaPedJson");
                var listaPedJsonLleno =   JSON.stringify(listaPedJson);


            var listadatosCliente = {}; // se envia de frente

                            listadatosCliente = {
                                
                                1 : "2" , //"1",
                                10 : "1" , //"1",
                                15 : "" , //"1",
                                20 : "10" , //"",
                                25 : "" , //"1",
                                35 : "15" ,  //"30",
                                CODIG : this.getView().byId("txt_dni_datosAdicionales").getValue() , //"87654321",
                                APPAT : this.getView().byId("txt_apellido_paterno_datosAdicionales").getValue() , //"apellidoPSoli",
                                APMAT : this.getView().byId("txt_apellido_materno_datosAdicionales").getValue() , //"apellidoMSoli",
                                NOMBRE : this.getView().byId("txt_nombre_datosAdicionales").getValue() , //"nombreSoli",
                                FECNAC : this.getView().byId("dt_fecha_nacimiento_datosAdicionales").getValue() , //"2013-06-20T11:00:00.000Z",
                                GRAINS : this.getView().byId("com_grado_instruccion_datosAdicionales").getSelectedKey() , //"10",
                                SEXO : this.getView().byId("com_sexo_datosAdicionales").getSelectedKey() , //"1",
                                CIUDAD : "140101" , //"140101",
                                EDAD : this.getView().byId("txt_edad_datosAdicionales").getValue() , //"4",
                                RANGOED : this.getView().byId("com_rango_edad_datosAdicionales").getSelectedKey() , //"1",
                                NIVELSE : "A" , //"A",
                                DIREC : this.getView().byId("txt_direccion_solicitante").getValue()

                                    };
                                
                                
                                 var listadatosClienteLleno =   JSON.stringify(listadatosCliente);



            var UserId = window.dataIni.user.User ;
            var PwdId = window.dataIni.user.Password ;
            var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722" ;
            var GrpVend = window.dataIni.person.GrpVend ;
            var Descripcion =  window.dataIni.person.Descripcion ;




            var CodigoVendedor = window.dataIni.person.PerNr; //00001802
            var numPedido = "";
            var op = "crear";


            //////////////////////////////////////////////////////////


            var self = this;


self.getView().byId("loadingControl").open();
setTimeout(function(){



                    var result = guardarDocumento.guardar(codigoCliente,
                                                            nombreCliente,
                                                            OrgVentas,
                                                            CanalDist,
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
                                                            listaMatJsonLleno,
                                                            listaDsctoJsonLleno,
                                                            listaRepJsonLleno,
                                                            listaIntJsonLleno,
                                                            listaPedJsonLleno,
                                                            listadatosClienteLleno,
                                                            UserId,
                                                            PwdId,
                                                            Id,
                                                            GrpVend,
                                                            Descripcion,
                                                            CodigoVendedor,
                                                            numPedido,
                                                            op);

                            if (result.c === "s") {

                                if (result.data.success) {

                                    self.getView().getModel().setProperty("/RetornoGuardarDocumento", result.data);
                                    self.getView().getModel().refresh();

                                    var reason = self.getView().getModel().getProperty("/RetornoGuardarDocumento/errors/reason");
                                    self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                    self.getView().byId("txt_aviso_general").setText(reason);
                                    

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




                self.getView().byId("loadingControl").close();
                },1000);
        },


        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
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
            var documentoCreado = this.getView().getModel().getProperty("/documentoSeleccionado");
            if(documentoCreado){
                this.getView().byId("dlg_DocNuevobuscar").close();
            }else{
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
            }
            
            
        },

        //Abrir Dialog para Agregar Producto
        onDocNuevodlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").open();
        },

        onDocNuevoClosedlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").close();
        },

        //Boton Añadir Producto del Master
        onDocNuevoMasterProductosAdd: function () {

            if(this.getView().byId("txt_codigo_anadir_material").getValue() !==""){

                if(this.getView().byId("com_ambiente_anadir_material").getSelectedKey() !=="" && this.getView().byId("com_opcion_anadir_material").getSelectedKey() !==""){

            var codigo = this.getView().byId("txt_codigo_anadir_material").getValue() ;
            var cantidad = this.getView().byId("txt_cantidad_anadir_material").getValue() ;
            var CodAmbiente = this.getView().byId("com_ambiente_anadir_material").getSelectedKey() ;
            var Opcion = this.getView().byId("com_opcion_anadir_material").getSelectedKey() ;
            var UserId = window.dataIni.user.User ;
            var PwdId = window.dataIni.user.Password ;
            var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722" ;
            var GrpVend = window.dataIni.person.GrpVend ;
            var Descripcion = window.dataIni.person.Descripcion ;
            var CodigoVendedor = window.dataIni.person.PerNr ;
            var OrgVentas = this.getView().byId("com_orgVentas_areaVentas").getSelectedKey() ;
            var CanalDist = this.getView().byId("com_Canal_areaVentas").getSelectedKey() ;
            var OfVentas = this.getView().byId("com_oficina_areaVentas").getSelectedKey() ;
            var añadirForm = 1 ;
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            
            var tamanoList = (this.getView().byId("list_listaMasterMateriales").getItems().length + 1)*10; //captar posicion del item dentro de la lista
            

            console.log(tamanoList);
            
            ///////////////////////////////////////////////////////////////////////////////////////////////////
            var posNuevo = tamanoList ; // 10 GENERADO CON LENGTH

            var objPedido = {

                        id: 1498248940715,
                        CodTipoDoc: this.getView().getModel().getProperty("/documentoSeleccionado/Codigo"),
                        CodTipoDocAnt:"",
                        Referencia:"",
                        OrgVentas:this.getView().byId("com_orgVentas_areaVentas").getSelectedKey(),
                        CanalDist: this.getView().byId("com_Canal_areaVentas").getSelectedKey(),
                        CodOficina: this.getView().byId("com_oficina_areaVentas").getSelectedKey(),
                        CondPago: this.getView().byId("com_condPago_pago").getSelectedKey() ,
                        Moneda: this.getView().byId("com_moneda_pago").getSelectedKey(),
                        CondExp: "03",
                        FechaEntrega: this.getView().byId("date_fechaEntReferencial_datosDocumento").getDateValue(),
                        FechaReparto: null,
                        TipoCambio: this.getView().byId("txt_tipoCambio_pago").getValue(),
                        FechaFacturacion: this.getView().byId("date_fechaFacturacion_datosFacturacion").getDateValue(),
                        CodigoBanco: this.getView().byId("com_nombreBanco_datosFacturacion").getSelectedKey(), // ""
                        Motivo: this.getView().byId("com_motivoNcNd_datosFacturacion").getSelectedKey(), // ""
                        BloqueoEntrega: this.getView().byId("com_bloqueoEntrega_datosFacturacion").getSelectedKey(),//"",
                        BloqueoFactura: this.getView().byId("com_bloqueoFactura_datosFacturacion").getSelectedKey(),//"",
                        OrdenCompra: this.getView().byId("txt_nroOrdenCompra_datosDocumento").getValue(), //""
                        FechaPedido: this.getView().byId("date_fechaPedido_datosDocumento").getDateValue(),
                        FechaValidez: this.getView().byId("date_fechaValidez_datosDocumento").getDateValue(),
                        Estado: "",
                        nomProyecto: this.getView().byId("txt_nombreProyecto_proyectoVisita").getValue(),
                        TipoVisita: this.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey(),
                        cbxReembolsable: this.getView().byId("check_visitaNoReembolsable_proyectoVisita").getSelected(),
                        dsctoAdicionalZD12: 0,
                        dsctoAdicionalZD12tmp: 0,
                        FechaPrecio: null,
                        Mail: "",
                        BonoCampania: "",
                        RegaloCampania: "",
                        Reenbolsable: false,
                        PedidoVenta1: "",
                        PedidoVenta2: "",
                        PedidoVenta3: "",
                        PedidoVenta4: "",
                        PedidoVisita1: "",
                        PedidoVisita2: "",
                        PedidoVisita3: "",
                        PedidoVisita4: "",
                        SubtotalImp: 0,
                        TieneEntrega: false,
                        DocOriginal: "",
                        Znpiso: "",
                        Ztransporte: "",
                        Zasensor: false,
                        Zncservicio: false,
                        TieneKitCombo: false,
                        NumPedido: "",
                        NumPedidoCorto: "",
                        FechaPedidoString: "",
                        FechaValidezString: "",
                        FechaEntregaString: "",
                        CodCliente: this.getView().getModel().getProperty("/dataIni/person/ClienteEvent"),
                        CodClienteCorto: "",
                        CodGrupoVend: "",
                        Sector: "",
                        SubTotal: 0,
                        Igv: 0,
                        Total: 0,
                        TotalImp: 0,
                        PesoTotal: 0,
                        GrupoCond: "",
                        Tratado: false,
                        ClasePedidoCliente: "",
                        ClaseDocumento: "",
                        CodVendedor1: window.dataIni.person.PerNr,
                        NomVendedor1: window.dataIni.person.Descripcion,
                        TotalConIgv: 0,
                        textoAtencion: this.getView().byId("txtArea_contactoEntrega_Observaciones").getValue(),
                        textoObsAdministrativas: this.getView().byId("txtArea_observacionAdministrativa_Observaciones").getValue(),
                        textoRefFactura: this.getView().byId("txtArea_referenciaFactura_Observaciones").getValue(),
                        textoRefDireccion: this.getView().byId("txtArea_contactoLugar_Observaciones").getValue(),
                        correo: "",
                        codigoSolicitante: "",
                        codigoDestFact: "",
                        codigoResPago: "",
                        nombreSolicitante: "",
                        direccionSolicitante: "",
                        codigoPostalSolicitante: "",
                        telefonoSolicitante: "",
                        nifSolicitante: "",
                        codigoDestMerc: "",
                        nombreDestMerc: "",
                        direccionDestMerc: "",
                        codigoPostalDestMerc: "",
                        telefonoDestMerc: "",
                        telefonoMovilDestMerc: "",
                        nombreDestFact: "",
                        direccionDestFact: "",
                        codigoPostalDestFact: "",
                        telefonoDestFact: "",
                        nombreResPago: "",
                        direccionResPago: "",
                        codigoPostalResPago: "",
                        telefonoResPago: "",
                        nifResPago: "",
                        codigoCliente: this.getView().getModel().getProperty("/dataIni/person/ClienteEvent"),
                        nombreCliente: this.getView().getModel().getProperty("/dataIni/person/E_NAME1"),
                        direccionCliente: this.getView().byId("txt_direccion_solicitante").getValue(),
                        apePatSolicitante: "" ,                                            
                        apeMatSolicitante: "",
                        textoContacto: "",
                        textoDatosAdicionalesCliente: "",
                        textoTelefonos: "",
                        textoDescripcionVisita: "",
                        textoResultadoVisita: "",
                        textoDescripcionServInstalacion: "",
                        datosCliente: {
                                            1:"1",
                                            10:"1",
                                            15:"1",
                                            20:"",
                                            25:"1",
                                            35:"30",
                                            CODIG:"87654321",
                                            APPAT:this.getView().byId("txt_apellido_paterno_datosAdicionales").getValue(),
                                            APMAT:this.getView().byId("txt_apellido_materno_datosAdicionales").getValue(),
                                            NOMBRE:this.getView().byId("txt_nombre_datosAdicionales").getValue(),
                                            FECNAC:this.getView().byId("dt_fecha_nacimiento_datosAdicionales").getDateValue(),
                                            GRAINS:"10",
                                            SEXO:this.getView().byId("com_sexo_datosAdicionales").getSelectedKey(),
                                            CIUDAD:"140101",
                                            EDAD:this.getView().byId("txt_edad_datosAdicionales").getValue(),
                                            RANGOED:this.getView().byId("com_rango_edad_datosAdicionales").getSelectedKey(),
                                            NIVELSE:"A",
                                            DIREC:this.getView().byId("txt_direccion_solicitante").getValue()  },
                        listaPre: "",
                        TotalDcto: 0,
                        codProyecto: this.getView().byId("txt_codigoProyecto_proyectoVisita").getValue(),
                        codVersion: this.getView().byId("txt_codigoVersion_proyectoVisita").getValue(),
                        GrupoForecast: this.getView().byId("com_grupoForecast_proyectoVisita").getSelectedKey(),
                        TipoForecast: this.getView().byId("com_tipoForecast_proyectoVisita").getSelectedKey(),
                        NoImpFac: "",
                        Certificado: this.getView().byId("txt_nroCertificado_proyectoVisita").getValue(),
                        FechaVisita: this.getView().byId("date_fechaVisita_proyectoVisita").getDateValue(), //null

                        };

                var cantidadtmp = this.getView().byId("txt_cantidad_anadir_material").getValue() ;
                var ambiente = this.getView().byId("com_ambiente_anadir_material").getSelectedKey() ;
                var desamb = this.getView().byId("com_ambiente_anadir_material").getSelectedItem().getText() ;
                var opcamb = this.getView().byId("com_opcion_anadir_material").getSelectedKey() ;
                var auart = this.getView().getModel().getProperty("/documentoSeleccionado/Codigo") ;


                var objPedidoLleno = JSON.stringify(objPedido);


                var self = this;


self.getView().byId("loadingControl").open();
setTimeout(function(){




                        var result = materialServices.anadirMaterialMaster(codigo,
                                                                cantidad,
                                                                CodAmbiente,
                                                                Opcion,
                                                                UserId,
                                                                PwdId,
                                                                Id,
                                                                GrpVend,
                                                                Descripcion,
                                                                CodigoVendedor,
                                                                OrgVentas,
                                                                CanalDist,
                                                                OfVentas,
                                                                añadirForm,
                                                                posNuevo,
                                                                objPedidoLleno,
                                                                cantidadtmp,
                                                                ambiente,
                                                                desamb,
                                                                opcamb,
                                                                auart
                                                                );

                            if (result.c === "s") {

                                if (result.data.success) {

                                    self.getView().getModel().setProperty("/RetornoAnadirMaterialMaster", result.data);
                                    self.getView().getModel().refresh();
                                    
                                    ////////////////////Retorno Total de Materiales/////////////////////////
                                    var retorno = self.getView().getModel().getProperty("/RetornoAnadirMaterialMaster");
                                    var disp = self.getView().getModel().getProperty("/RetornoMaterial");

                                    self.getView().getModel().setProperty("/RetornoMaterial", disp);
                                    if(disp){
                                            disp.push(retorno);
                                        }else{
                                            
                                            disp = [];
                                            disp.push(retorno);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/RetornoMaterial", disp);
                                        self.getView().getModel().refresh();

                                    //////////////////////////Retorno Solo de Materiales/////////////////////////////////////////////////
                                    
                                   var objSeleccionado = self.getView().getModel().getProperty("/RetornoAnadirMaterialMaster/materiales");
                                   
                                    var listaDisplay = self.getView().getModel().getProperty("/listaMatAnadido");

                                    self.getView().getModel().setProperty("/listaMatAnadido", listaDisplay);
                                        
                                        if(listaDisplay){
                                            listaDisplay.push(objSeleccionado[0]);
                                        }else{
                                            
                                            listaDisplay = [];
                                            listaDisplay.push(objSeleccionado[0]);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/listaMatAnadido", listaDisplay);
                                        self.getView().getModel().refresh();

                                    self.getView().getModel().refresh();

                                    self.getView().byId("dlg_DocNuevoaddProducto").close();


                                    ////////////////Crear listaRepartosJson///////////////////////////////////////////////////////////////
                                    
                                    var lstTotal1 = self.getView().getModel().getProperty("/RetornoAnadirMaterialMaster/lstTotal");
                                    var lstTotal = lstTotal1[0];
                                    console.log(lstTotal.PosicionCorto);
                                    
                                    var obj1listaRepartosJson = {
                                        matPosicion : lstTotal.PosicionCorto ,
                                        id : tamanoList/10,
                                        TipoReparto : "" ,
                                        Pos : lstTotal.Repartos[0].Pos ,
                                        PosCorto : lstTotal.Repartos[0].PosCorto ,
                                        FechaEntrega : self.getView().byId("date_fechaEntReferencial_datosDocumento").getDateValue() ,
                                        CantPed : self.getView().byId("txt_cantidad_anadir_material").getValue() ,
                                        CantConf : self.getView().byId("txt_cantidad_anadir_material").getValue() ,
                                        CodUMedida : "" ,
                                    };
                                    
                                    //self.getView().getModel().setProperty("/listaRepartos",listaRepartosJson);
                                    self.getView().getModel().setProperty("/listaRepartos",obj1listaRepartosJson);
                                    self.getView().getModel().refresh();


                                    var objRepartos = self.getView().getModel().getProperty("/listaRepartos");
                                   
                                    var listaRepar = self.getView().getModel().getProperty("/listaRepartosLleno");

                                    self.getView().getModel().setProperty("/listaRepartosLleno", listaRepar);
                                        
                                        if(listaRepar){
                                            listaRepar.push(objRepartos);
                                        }else{
                                            
                                            listaRepar = [];
                                            listaRepar.push(objRepartos);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/listaRepartosLleno", listaRepar);
                                        self.getView().getModel().refresh();

                                        var ejemss = self.getView().getModel().getProperty("/listaRepartosLleno");

                                        console.log(ejemss);

                                    ////Coger Centro Almacen y Lote de Mayor Stock//////////////////////////////////////////////////////

                                    var listaTotalStock = self.getView().getModel().getProperty("/RetornoAnadirMaterialMaster/lstStock");
                                    var Mayor = listaTotalStock.length - 1;
                                    console.log(listaTotalStock[Mayor]);

                                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //////////////////Crear listaMatjson////////////////////////////////////////////////////////////////

                                        
                                        var obj1listaMatJson = {
                                                            id: tamanoList/10 ,
                                                            CodMaterial: lstTotal.CodMaterial ,
                                                            CodUMedida: lstTotal.CodUMedida ,
                                                            Descripcion: lstTotal.Material.Descripcion ,
                                                            Jerarquia: "" ,// lstTotal.Material.Jerarquia
                                                            ValorRendimiento: 0 ,
                                                            TipoMaterial: lstTotal.TipoMaterial ,
                                                            EsFlete: lstTotal.Material.EsFlete ,
                                                            EsEstiba: lstTotal.Material.EsEstiba ,
                                                            EspecialServ: lstTotal.Material.EspecialServ ,
                                                            Tipo: lstTotal.Material.Tipo ,
                                                            CodMaterialCorto: lstTotal.CodMaterialCorto ,
                                                            TieneServ: lstTotal.Material.TieneServ ,
                                                            Rendimiento: lstTotal.Rendimiento ,
                                                            DescMovil: lstTotal.DescMovil ,
                                                            Descontinuado: lstTotal.Descontinuado ,
                                                            UMedidaRendimiendo: lstTotal.UMedidaRendimiendo ,
                                                            DescMaterial: lstTotal.DescMaterial ,
                                                            PrecioUnit: lstTotal.Material.PrecioUnit ,
                                                            Peso: lstTotal.Material.Peso ,
                                                            Stock: lstTotal.Material.Stock ,
                                                            Mstae: lstTotal.Material.MSTAE ,
                                                            Vdscto: "0" ,
                                                            StatusDespacho: lstTotal.StatusDespacho ,
                                                            StockPos: lstTotal.StockPos ,
                                                            Posicion: lstTotal.Posicion ,
                                                            Cantidad: lstTotal.Cantidad ,
                                                            CodCentro: listaTotalStock[Mayor].CodCentro , // lstTotal.CodCentro
                                                            CodAlmacen: listaTotalStock[Mayor].CodAlmacen ,// lstTotal.CodAlmacen
                                                            CodLote: listaTotalStock[Mayor].CodLote ,// lstTotal.CodLote
                                                            PrecioSinIGV: lstTotal.PrecioSinIGV ,
                                                            DsctoMontTotal: lstTotal.DsctoMontTotal ,
                                                            MotivoRechazo: lstTotal.MotivoRechazo ,
                                                            TipoPosAnt: lstTotal.TipoPosAnt ,
                                                            CodGrupoMat: lstTotal.CodGrupoMat ,
                                                            Opcion: lstTotal.Opcion ,
                                                            Reembolsable: lstTotal.Reembolsable ,
                                                            Zservicio: lstTotal.Zservicio ,
                                                            ContentID: lstTotal.ContentID ,
                                                            DescMaterialTicketera: lstTotal.DescMaterialTicketera ,
                                                            PrioridadEntrega: lstTotal.PrioridadEntrega ,
                                                            FechaCantConf: lstTotal.FechaCantConf ,
                                                            FechaCantConfStr: lstTotal.FechaCantConfStr ,
                                                            PosSup: lstTotal.PosSup ,
                                                            PosSupCorto: lstTotal.PosSupCorto ,
                                                            TipoPosicion: lstTotal.TipoPosicion ,// lstTotal.TipoPosicion
                                                            CambAlmacen: lstTotal.CambAlmacen ,
                                                            CantComp: lstTotal.CantComp ,
                                                            PrecioTotal: 210.06 , // lstTotal.PrecioTotal
                                                            PrecioUnitario: 210.06 ,// lstTotal.PrecioUnitario
                                                            Total: lstTotal.Material.PrecioUnit ,// lstTotal.Total
                                                            IgvUnitario: 18 ,// lstTotal.IgvUnitario
                                                            IgvTotal: 37.81 ,// lstTotal.IgvTotal
                                                            TotalDctos: 0 ,// lstTotal.TotalDctos
                                                            SubTotal: 210.06 ,// lstTotal.SubTotal
                                                            CantConfirmada: lstTotal.CantConfirmada ,// lstTotal.CantConfirmada
                                                            PesoNeto: lstTotal.PesoNeto ,
                                                            PrecioConIGV: lstTotal.PrecioConIGV ,
                                                            TotalImpresion: lstTotal.TotalImpresion ,
                                                            DescCentro: listaTotalStock[Mayor].DescCentro ,
                                                            DescAlmacen: listaTotalStock[Mayor].DescAlmacen ,
                                                            FechaEntregaString: lstTotal.FechaEntregaString ,
                                                            Reparto: lstTotal.Reparto ,
                                                            TotPercep: 4.96 ,// lstTotal.TotPercep
                                                            link: lstTotal.link ,
                                                            DesGrupoMat: lstTotal.DesGrupoMat ,
                                                            DivisionRendimiento: lstTotal.DivisionRendimiento ,
                                                            mod: "" ,
                                                            PosicionCorto: lstTotal.PosicionCorto ,
                                                            SubTotalLista: 210.06 ,
                                                            fullName: listaTotalStock[Mayor].CodCentro+" "+listaTotalStock[Mayor].DescCentro+" / "+listaTotalStock[Mayor].CodAlmacen+" / "+listaTotalStock[Mayor].CodLote ,


                                                            };



                                    


                                    self.getView().getModel().setProperty("/listaMatJson",obj1listaMatJson);
                                    self.getView().getModel().refresh();


                                    var objMat = self.getView().getModel().getProperty("/listaMatJson");
                                   
                                    var listaMat = self.getView().getModel().getProperty("/listaMatLleno");

                                    self.getView().getModel().setProperty("/listaMatLleno", listaMat);
                                        
                                        if(listaMat){
                                            listaMat.push(objMat);
                                        }else{
                                            
                                            listaMat = [];
                                            listaMat.push(objMat);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/listaMatLleno", listaMat);
                                        self.getView().getModel().refresh();


                                    ////////////////////////////////////////////////////////////////////////////////////////////


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


                                self.getView().byId("loadingControl").close();
                                },1000);

            
            }else{
                MessageToast.show("No ha ingresado Ambiente y/o Opcion de Ambiente"); 
            }
        }else{
            MessageToast.show("No ha ingresado ningún Material");
        }
        },




        onMasterProductoSeleccionarMaterial:function(evt){

            console.log(this.getView().getModel().getProperty("/listaTotalMateriales"));
            if(this.getView().getModel().getProperty("/listaTotalMateriales")){
                this.getView().getModel().setProperty("/listaTotalMateriales",null);
                this.getView().getModel().refresh();
            }

            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/MaterialMasterSeleccionado",obj);
            this.getView().getModel().refresh();

            var sPath = this.getView().byId("list_listaMasterMateriales").getSelectedItem().getBindingContext().getPath(); //captar posicion del item dentro de la lista
            var posicionLista = parseInt(sPath.substring(sPath.lastIndexOf('/') + 1));
            

            if(this.getView().byId("list_listaMasterMateriales")){                       

                    
                    var listaMaterial = this.getView().getModel().getProperty("/RetornoMaterial"); //todos los arrays correspondiente al material seleccionado
                    

                    this.getView().getModel().setProperty("/MaterialTotal",listaMaterial[posicionLista]); //material con todo sus datos correspondientes

                    
                    
                    var lstMatAdic = this.getView().getModel().getProperty("/MaterialTotal/lstMatAdic");


                    var lstStock  = this.getView().getModel().getProperty("/MaterialTotal/lstStock"); //[0]
                    

                    var lstTotal = this.getView().getModel().getProperty("/MaterialTotal/lstTotal"); //[0]
                    
                    this.getView().getModel().setProperty("/listaTotalMateriales",lstTotal[0]);
                    var materiales = this.getView().getModel().getProperty("/MaterialTotal/materiales"); //[0]
                    

                    this.getView().getModel().refresh();
                    console.log(this.getView().getModel().getProperty("/listaTotalMateriales"));
                    console.log(materiales[0].CodMaterialCorto);


            
                    }

                    

            //this.getView().byId("ListaDocNuevo").getSelectedItem().getBindingContext().getObject();
            
           //var ejem2 = this.getView().byId("list_listaMasterMateriales").setSelectedItem(firstItem,true)



           
            ///////////////////////// cargando Centro / Almacen / Lote  ///////////////////////////////////////



             //var firstItem = this.getView().byId("list_listaMasterMateriales").getItems()[2]; 
              //this.getView().byId("list_listaMasterMateriales").setSelectedItem(firstItem,true);  //funciona para seleccionar un item en la posicion
             //console.log(firstItem);
            
            var Posicion = lstTotal[0].Posicion ;
            var CodMaterialCorto = materiales[0].CodMaterialCorto ;
            var DescMaterial = materiales[0].DescMaterial ;
            var Cantidad = lstTotal[0].Cantidad ;
            var CodUMedida = lstTotal[0].CodUMedida ;
            var Rendimiento = lstTotal[0].Rendimiento ;
            var fullName = "1080 Tienda Arequipa / 0001 / 1000LD" ;
            var ext1153 = true ;
            var Peso = lstTotal[0].Peso ;
            var PesoNeto = lstTotal[0].PesoNeto ;
            var PrecioUnitario = lstTotal[0].PrecioUnitario ; 
            var TotalDctos = lstTotal[0].TotalDctos ;
            var SubTotal =  lstTotal[0].SubTotal ;
            var ext1159 = "2017-06-27T05 = 00 = 00.000Z"
            var CodGrupoMat = lstTotal[0].CodGrupoMat ;
            var Opcion = lstTotal[0].Opcion ;
            var MotivoRechazo = lstTotal[0].MotivoRechazo ;  
            var PrioridadEntrega = lstTotal[0].PrioridadEntrega ;
            var UserId = window.dataIni.user.User ;
            var PwdId = window.dataIni.user.Password ;
            var Id = "d8e8468b-0ace-4c65-8606-2c904ab7c073" ;
            var GrpVend = window.dataIni.person.GrpVend ;
            var Descripcion = window.dataIni.person.Descripcion ;
            var CodigoVendedor = window.dataIni.person.PerNr ;
            var OrgVentas = this.getView().byId("com_orgVentas_areaVentas").getSelectedKey() ;
            var CanalDist = this.getView().byId("com_Canal_areaVentas").getSelectedKey() ;
            var OfVentas = this.getView().byId("com_oficina_areaVentas").getSelectedKey() ;
            var valorRe = "0" ;
            var codigoMaterial = materiales[0].CodMaterial ;
            var pPosicion = lstTotal[0].Posicion ; //Revisar es lo que creo
            var pCentro = "" ;
            var dsctoLotes = 1 ;
            var auart = this.getView().getModel().getProperty("/documentoSeleccionado/Codigo") ;
            var verStock = 0 ;

           


            var result = materialServices.stockDetallado(Posicion,
                                                        CodMaterialCorto,
                                                        DescMaterial,
                                                        Cantidad,
                                                        CodUMedida,
                                                        Rendimiento,
                                                        fullName,
                                                        ext1153,
                                                        Peso,
                                                        PesoNeto,
                                                        PrecioUnitario, 
                                                        TotalDctos,
                                                        SubTotal,
                                                        ext1159,
                                                        CodGrupoMat,
                                                        Opcion,
                                                        MotivoRechazo,  
                                                        PrioridadEntrega,
                                                        UserId,
                                                        PwdId,
                                                        Id,
                                                        GrpVend,
                                                        Descripcion,
                                                        CodigoVendedor,
                                                        OrgVentas,
                                                        CanalDist,
                                                        OfVentas,
                                                        valorRe,
                                                        codigoMaterial,
                                                        pPosicion,
                                                        pCentro,
                                                        dsctoLotes,
                                                        auart,
                                                        verStock);

                            if (result.c === "s") {

                                if (result.data.success) {

                                    this.getView().getModel().setProperty("/RetornoStockDetallado", result.data);
                                    this.getView().getModel().refresh();

                                    

                                    ////Coger Centro Almacen y Lote de Mayor Stock//////////////////////////////////////////

                                    var listaTotalStock = this.getView().getModel().getProperty("/RetornoStockDetallado/lstLoteTotal");
                                    var Mayor = listaTotalStock.length - 1;
                                    console.log(listaTotalStock[Mayor]);

                                    

                                    this.getView().getModel().setProperty("/CodCentroStockMayor",listaTotalStock[Mayor].CodCentro);
                                    this.getView().getModel().setProperty("/DescCentroStockMayor",listaTotalStock[Mayor].DescCentro);
                                    this.getView().getModel().setProperty("/CodAlmacenStockMayor",listaTotalStock[Mayor].CodAlmacen);
                                    this.getView().getModel().setProperty("/CodLoteStockMayor",listaTotalStock[Mayor].CodLote);
                                    this.getView().getModel().setProperty("/slashMayor", "/");

                                    this.getView().byId("txt_centro_almacen_lote").bindProperty("value",{ parts:[

                                                                                                            {path:"/CodCentroStockMayor"},
                                                                                                            {path:"/DescCentroStockMayor"},
                                                                                                            {path:"/slashMayor"},
                                                                                                            {path:"/CodAlmacenStockMayor"},
                                                                                                            {path:"/slashMayor"},
                                                                                                            {path:"/CodLoteStockMayor"}

                                                                                                            ] });

                                    //////////////////////////////////////////////////////////////////////////////////////

                                

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

            //////////////////////////////////////////////////////////////////////////


            ////////// Catalogo  /////////////////////////////////////////////////////
 
           

            var cataPosicion = lstTotal[0].Posicion ;
            var cataCodMaterialCorto = materiales[0].CodMaterialCorto ;
            var cataDescMaterial = materiales[0].DescMaterial ;
            var cataCantidad = lstTotal[0].Cantidad ; 
            var cataCodUMedida = lstTotal[0].CodUMedida ;
            var cataRendimiento = lstTotal[0].Rendimiento ;
            var catafullName = "1080 Tienda Arequipa / 0001 / 1000LD" ;
            var cataext1153 = true ;
            var cataPeso = lstTotal[0].Peso ;
            var cataPesoNeto = lstTotal[0].PesoNeto ;
            var cataPrecioUnitario = lstTotal[0].PrecioUnitario ;
            var cataTotalDctos = lstTotal[0].TotalDctos ;
            var cataSubTotal = lstTotal[0].SubTotal ;
            var cataext1159 = "2017-06-27T05:00:00.000Z" ;
            var cataCodGrupoMat = lstTotal[0].CodGrupoMat ;
            var cataOpcion = lstTotal[0].Opcion ;
            var cataMotivoRechazo = lstTotal[0].MotivoRechazo ;
            var cataPrioridadEntrega = lstTotal[0].PrioridadEntrega ;
            var cataUserId = window.dataIni.user.User ;
            var cataPwdId = window.dataIni.user.Password ; 
            var cataId = "2ce5e561-5c14-4361-8e8c-ffa72c33019b" ;
            var cataGrpVend = window.dataIni.person.GrpVend ;
            var cataDescripcion = window.dataIni.person.Descripcion ;
            var cataCodigoVendedor = window.dataIni.person.PerNr ;
            var cataOrgVentas = this.getView().byId("com_orgVentas_areaVentas").getSelectedKey() ;
            var cataCanalDist = this.getView().byId("com_Canal_areaVentas").getSelectedKey() ;
            var cataOfVentas = this.getView().byId("com_oficina_areaVentas").getSelectedKey() ;
            var catavalorRe = 0 ;
            var catapPosicion = lstTotal[0].PosSup ;
            var catapCentro = "" ;
            var catadsctoLotes = 1 ;
            var cataauart = this.getView().getModel().getProperty("/documentoSeleccionado/Codigo") ;
            var cataverStock = 0 ;
            var catacodigoMaterial = materiales[0].CodMaterial ;




            

            var result1 = materialServices.catalogo(cataPosicion,
                                                            cataCodMaterialCorto,
                                                            cataDescMaterial,
                                                            cataCantidad,
                                                            cataCodUMedida,
                                                            cataRendimiento,
                                                            catafullName,
                                                            cataext1153,
                                                            cataPeso,
                                                            cataPesoNeto,
                                                            cataPrecioUnitario,
                                                            cataTotalDctos,
                                                            cataSubTotal,
                                                            cataext1159,
                                                            cataCodGrupoMat,
                                                            cataOpcion,
                                                            cataMotivoRechazo, 
                                                            cataPrioridadEntrega,
                                                            cataUserId,
                                                            cataPwdId,
                                                            cataId,
                                                            cataGrpVend,
                                                            cataDescripcion,
                                                            cataCodigoVendedor,
                                                            cataOrgVentas,
                                                            cataCanalDist,
                                                            cataOfVentas,
                                                            catavalorRe,
                                                            catapPosicion,
                                                            catapCentro,
                                                            catadsctoLotes,
                                                            cataauart,
                                                            cataverStock,
                                                            catacodigoMaterial);

                            if (result1.c === "s") {

                                if (result1.data.success) {

                                    this.getView().getModel().setProperty("/RetornoCatalogo", result1.data);
                                    this.getView().getModel().refresh();


                                    var archivos = [];
                                    archivos = this.getView().getModel().getProperty("/RetornoCatalogo/archivos");

                                    if (archivos.length == 0){
                                        MessageToast.show("El material Seleccionado no está disponible en el catálogo");
                                    }
                                    this.getView().getModel().refresh();

                                    console.log(archivos.length);

                                    } else {

                                        sap.m.MessageToast.show(result1.data.errors.reason, {
                                            duration: 3000
                                        });

                                    }

                             } else {
                                    sap.m.MessageToast.show(result1.m, {
                                        duration: 3000
                                    });
                                }   
                                console.log(result1);

            /////////////////////////////////////////////////////////////////////////

            
            

        },

        onSeleccionarCentroAlmacenLote:function(evt){
              var lista = evt.getSource().getSelectedItem().getBindingContext().getObject();

              this.getView().getModel().setProperty("/CodCentro",lista.CodCentro);
              this.getView().getModel().setProperty("/DescCentro",lista.DescCentro);
              this.getView().getModel().setProperty("/CodAlmacen",lista.CodAlmacen);
              this.getView().getModel().setProperty("/CodLote",lista.CodLote);
              this.getView().getModel().setProperty("/slash", "/");

              this.getView().byId("txt_centro_almacen_lote").bindProperty("value",{ parts:[

                                                                                                            {path:"/CodCentro"},
                                                                                                            {path:"/DescCentro"},
                                                                                                            {path:"/slash"},
                                                                                                            {path:"/CodAlmacen"},
                                                                                                            {path:"/slash"},
                                                                                                            {path:"/CodLote"}

                                                                                                            ] });

                console.log(lista);

                var listaStock = this.getView().getModel().getProperty("/RetornoStockDetallado/lstLoteTotal");
                console.log(listaStock);
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

            this.getView().byId("buttonMasterDatos").setSelectedKey("datos");
            this.getView().byId("buttonMasterProductos").setSelectedKey("productos");

            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoDatos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));


        },

        //Boton Master Producto
        onDocNuevoMasterProductos: function (oEvent) {
            this.getView().byId("buttonMasterDatos").setSelectedKey("datos");
            this.getView().byId("buttonMasterProductos").setSelectedKey("productos");
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));

        },

        onMultiSelectPress: function(oEvent) {
            if (oEvent.getSource().getPressed()) {

                this.getView().byId("list_listaMasterMateriales").setMode("Delete");
                this.getView().byId("objectListProductos").setType("");
                sap.m.MessageToast.show("MultiSelect Activado");
            } else {
                
                this.getView().byId("list_listaMasterMateriales").setMode("SingleSelectMaster");
                this.getView().byId("objectListProductos").setType("Navigation");
                sap.m.MessageToast.show("MultiSelect Desactivado");
            };
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

                var self = this;


self.getView().byId("loadingControl").open();
setTimeout(function(){



                var result = clienteServices.buscarCliente(ruc, nombre);

                if (result.c === "s") {

                    if (result.data.success) {

                        self.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
                        self.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
                        self.getView().getModel().refresh();

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

                self.getView().byId("loadingControl").close();
},1000);

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
            var self = this;
            var codigo = self.getView().byId("txt_codigo_material_busqueda").getValue();
            var codigoAntiguo = self.getView().byId("txt_codigoAntiguo_material_busqueda").getValue();
            var descripcionMaterial = self.getView().byId("txt_descripcionMaterial_material_busqueda").getValue();
            var categoria = self.getView().byId("comboCategoria").getSelectedKey();
            var linea = self.getView().byId("comboLinea").getSelectedKey();
            var marca = self.getView().byId("comboMarca").getSelectedKey();

            var orgVentas = window.dataIni.person.OrgVentas;
            var canalDist = window.dataIni.person.CanalDist;
            var ofVentas = window.dataIni.person.OfVentas;

            self.getView().byId("loadingControl").open(); // INDICADOR
            
            setTimeout(function(){
                
            var result = materialServices.buscarmaterial(codigo, codigoAntiguo, descripcionMaterial, categoria, linea, marca, orgVentas, canalDist, ofVentas);
            self.getView().byId("loadingControl").close();
            if (result.c === "s") {
                 
                if (result.data.success) {

                    sap.ui.core.BusyIndicator.show();
                    self.getView().getModel().setProperty("/BusquedaMateriales", result.data);
                    self.getView().getModel().setProperty("/RetornolstCentros", result.data.lstCentros);
                    self.getView().getModel().refresh();

                    self.getView().byId("dlg_BuscarMateriales").open();
                    self.getView().byId("dlg_DocNuevobuscar").close();

                    sap.ui.core.BusyIndicator.hide();

                } else {
                    self.getView().byId("loadingControl").open(); // INDICADOR
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                    self.getView().byId("loadingControl").close();

                }


            }

             else {
                self.getView().byId("loadingControl").open(); // INDICADOR
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
                self.getView().byId("loadingControl").close();
            }


            },1000);

            
        },

        SeleccionarMaterial: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            
            this.getView().getModel().setProperty("/materialSelec", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
        },

        onDocNuevoAnadirMaterial: function (evt) {
            var listaDisplay = this.getView().getModel().getProperty("/materialSelec");
            if(listaDisplay){
                this.getView().byId("dlg_DocNuevoaddProductoonDialog").open();                           
        }else{
            MessageToast.show("No ha seleccionado un Material");             
        }


        },

        //////Crear Cotizacion desde Stock Disponible ////

        onCrearCotizacion:function(){
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

             var numeroDoc = {
                                Codigo: "ZO01"
                                };


            this.getView().getModel().setProperty("/documentoSeleccionado",numeroDoc);


            var self = this;


self.getView().byId("loadingControl").open();
setTimeout(function(){

            var result = crearDocumentoServices.crearDoc("ZO01","");
             

            if (result.c === "s") {

                    if (result.data.success) {

                        self.getView().getModel().setProperty("/RetornoCrearDocumento", result.data);
                        self.getView().getModel().refresh();


                        self.getView().byId("dlg_MensajeAvisoCrearCotizacion").close();
                        self.getView().byId("dlg_MensajeAviso1").open();

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
            ///////////////////////////////////////////////////////////////////////////////


            /////Añadir Material//////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////
            var listaMateriales = self.getView().byId("lista_BuscarMaterial").getSelectedItem().getBindingContext().getObject();



                if(self.getView().byId("com_ambiente_buscarMaterial").getSelectedKey() !=="" && self.getView().byId("com_opcion_buscarMaterial").getSelectedKey() !==""){

            self.getView().byId("loadingControl").open(); // INDICADOR
            var codigo = listaMateriales.CodMaterial ;
            var cantidad = self.getView().byId("txt_cantidad_buscarMaterial").getValue() ;
            var CodAmbiente = self.getView().byId("com_ambiente_buscarMaterial").getSelectedKey() ;
            var Opcion = self.getView().byId("com_opcion_buscarMaterial").getSelectedKey() ;
            var UserId = window.dataIni.user.User ;
            var PwdId = window.dataIni.user.Password ;
            var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722" ;
            var GrpVend = window.dataIni.person.GrpVend ;
            var Descripcion = window.dataIni.person.Descripcion ;
            var CodigoVendedor = window.dataIni.person.PerNr ;
            var OrgVentas = self.getView().byId("com_orgVentas_areaVentas").getSelectedKey() ;
            var CanalDist = self.getView().byId("com_Canal_areaVentas").getSelectedKey() ;
            var OfVentas = self.getView().byId("com_oficina_areaVentas").getSelectedKey() ;
            var añadirForm = 1 ;
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            
            var tamanoList = (self.getView().byId("list_listaMasterMateriales").getItems().length + 1)*10; //captar posicion del item dentro de la lista
            
            console.log(tamanoList);
            
            ///////////////////////////////////////////////////////////////////////////////////////////////////
            var posNuevo = tamanoList ; // 10 GENERADO CON LENGTH

            var objPedido = {

                        id: 1498248940715,
                        CodTipoDoc: self.getView().getModel().getProperty("/documentoSeleccionado/Codigo"),
                        CodTipoDocAnt:"",
                        Referencia:"",
                        OrgVentas:self.getView().byId("com_orgVentas_areaVentas").getSelectedKey(),
                        CanalDist: self.getView().byId("com_Canal_areaVentas").getSelectedKey(),
                        CodOficina: self.getView().byId("com_oficina_areaVentas").getSelectedKey(),
                        CondPago: self.getView().byId("com_condPago_pago").getSelectedKey() ,
                        Moneda: self.getView().byId("com_moneda_pago").getSelectedKey(),
                        CondExp: "03",
                        FechaEntrega: self.getView().byId("date_fechaEntReferencial_datosDocumento").getDateValue(),
                        FechaReparto: null,
                        TipoCambio: self.getView().byId("txt_tipoCambio_pago").getValue(),
                        FechaFacturacion: self.getView().byId("date_fechaFacturacion_datosFacturacion").getDateValue(),
                        CodigoBanco: self.getView().byId("com_nombreBanco_datosFacturacion").getSelectedKey(), // ""
                        Motivo: self.getView().byId("com_motivoNcNd_datosFacturacion").getSelectedKey(), // ""
                        BloqueoEntrega: self.getView().byId("com_bloqueoEntrega_datosFacturacion").getSelectedKey(),//"",
                        BloqueoFactura: self.getView().byId("com_bloqueoFactura_datosFacturacion").getSelectedKey(),//"",
                        OrdenCompra: self.getView().byId("txt_nroOrdenCompra_datosDocumento").getValue(), //""
                        FechaPedido: self.getView().byId("date_fechaPedido_datosDocumento").getDateValue(),
                        FechaValidez: self.getView().byId("date_fechaValidez_datosDocumento").getDateValue(),
                        Estado: "",
                        nomProyecto: self.getView().byId("txt_nombreProyecto_proyectoVisita").getValue(),
                        TipoVisita: self.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey(),
                        cbxReembolsable: self.getView().byId("check_visitaNoReembolsable_proyectoVisita").getSelected(),
                        dsctoAdicionalZD12: 0,
                        dsctoAdicionalZD12tmp: 0,
                        FechaPrecio: null,
                        Mail: "",
                        BonoCampania: "",
                        RegaloCampania: "",
                        Reenbolsable: false,
                        PedidoVenta1: "",
                        PedidoVenta2: "",
                        PedidoVenta3: "",
                        PedidoVenta4: "",
                        PedidoVisita1: "",
                        PedidoVisita2: "",
                        PedidoVisita3: "",
                        PedidoVisita4: "",
                        SubtotalImp: 0,
                        TieneEntrega: false,
                        DocOriginal: "",
                        Znpiso: "",
                        Ztransporte: "",
                        Zasensor: false,
                        Zncservicio: false,
                        TieneKitCombo: false,
                        NumPedido: "",
                        NumPedidoCorto: "",
                        FechaPedidoString: "",
                        FechaValidezString: "",
                        FechaEntregaString: "",
                        CodCliente: self.getView().getModel().getProperty("/dataIni/person/ClienteEvent"),
                        CodClienteCorto: "",
                        CodGrupoVend: "",
                        Sector: "",
                        SubTotal: 0,
                        Igv: 0,
                        Total: 0,
                        TotalImp: 0,
                        PesoTotal: 0,
                        GrupoCond: "",
                        Tratado: false,
                        ClasePedidoCliente: "",
                        ClaseDocumento: "",
                        CodVendedor1: window.dataIni.person.PerNr,
                        NomVendedor1: window.dataIni.person.Descripcion,
                        TotalConIgv: 0,
                        textoAtencion: self.getView().byId("txtArea_contactoEntrega_Observaciones").getValue(),
                        textoObsAdministrativas: self.getView().byId("txtArea_observacionAdministrativa_Observaciones").getValue(),
                        textoRefFactura: self.getView().byId("txtArea_referenciaFactura_Observaciones").getValue(),
                        textoRefDireccion: self.getView().byId("txtArea_contactoLugar_Observaciones").getValue(),
                        correo: "",
                        codigoSolicitante: "",
                        codigoDestFact: "",
                        codigoResPago: "",
                        nombreSolicitante: "",
                        direccionSolicitante: "",
                        codigoPostalSolicitante: "",
                        telefonoSolicitante: "",
                        nifSolicitante: "",
                        codigoDestMerc: "",
                        nombreDestMerc: "",
                        direccionDestMerc: "",
                        codigoPostalDestMerc: "",
                        telefonoDestMerc: "",
                        telefonoMovilDestMerc: "",
                        nombreDestFact: "",
                        direccionDestFact: "",
                        codigoPostalDestFact: "",
                        telefonoDestFact: "",
                        nombreResPago: "",
                        direccionResPago: "",
                        codigoPostalResPago: "",
                        telefonoResPago: "",
                        nifResPago: "",
                        codigoCliente: self.getView().getModel().getProperty("/dataIni/person/ClienteEvent"),
                        nombreCliente: self.getView().getModel().getProperty("/dataIni/person/E_NAME1"),
                        direccionCliente: self.getView().byId("txt_direccion_solicitante").getValue(),
                        apePatSolicitante: "" ,                                            
                        apeMatSolicitante: "",
                        textoContacto: "",
                        textoDatosAdicionalesCliente: "",
                        textoTelefonos: "",
                        textoDescripcionVisita: "",
                        textoResultadoVisita: "",
                        textoDescripcionServInstalacion: "",
                        datosCliente: {
                                            1:"1",
                                            10:"1",
                                            15:"1",
                                            20:"",
                                            25:"1",
                                            35:"30",
                                            CODIG:"87654321",
                                            APPAT:self.getView().byId("txt_apellido_paterno_datosAdicionales").getValue(),
                                            APMAT:self.getView().byId("txt_apellido_materno_datosAdicionales").getValue(),
                                            NOMBRE:self.getView().byId("txt_nombre_datosAdicionales").getValue(),
                                            FECNAC:self.getView().byId("dt_fecha_nacimiento_datosAdicionales").getDateValue(),
                                            GRAINS:"10",
                                            SEXO:self.getView().byId("com_sexo_datosAdicionales").getSelectedKey(),
                                            CIUDAD:"140101",
                                            EDAD:self.getView().byId("txt_edad_datosAdicionales").getValue(),
                                            RANGOED:self.getView().byId("com_rango_edad_datosAdicionales").getSelectedKey(),
                                            NIVELSE:"A",
                                            DIREC:self.getView().byId("txt_direccion_solicitante").getValue()  },
                        listaPre: "",
                        TotalDcto: 0,
                        codProyecto: self.getView().byId("txt_codigoProyecto_proyectoVisita").getValue(),
                        codVersion: self.getView().byId("txt_codigoVersion_proyectoVisita").getValue(),
                        GrupoForecast: self.getView().byId("com_grupoForecast_proyectoVisita").getSelectedKey(),
                        TipoForecast: self.getView().byId("com_tipoForecast_proyectoVisita").getSelectedKey(),
                        NoImpFac: "",
                        Certificado: self.getView().byId("txt_nroCertificado_proyectoVisita").getValue(),
                        FechaVisita: self.getView().byId("date_fechaVisita_proyectoVisita").getDateValue(), //null

                        };

                var cantidadtmp = self.getView().byId("txt_cantidad_buscarMaterial").getValue() ;
                var ambiente = self.getView().byId("com_ambiente_buscarMaterial").getSelectedKey() ;
                var desamb = self.getView().byId("com_ambiente_buscarMaterial").getSelectedItem().getText() ;
                var opcamb = self.getView().byId("com_opcion_buscarMaterial").getSelectedKey() ;
                var auart = self.getView().getModel().getProperty("/documentoSeleccionado/Codigo") ;


                var objPedidoLleno = JSON.stringify(objPedido);
                self.getView().byId("loadingControl").close();

                        self.getView().byId("loadingControl").open(); // INDICADOR
                        var result = materialServices.anadirMaterialMaster(codigo,
                                                                cantidad,
                                                                CodAmbiente,
                                                                Opcion,
                                                                UserId,
                                                                PwdId,
                                                                Id,
                                                                GrpVend,
                                                                Descripcion,
                                                                CodigoVendedor,
                                                                OrgVentas,
                                                                CanalDist,
                                                                OfVentas,
                                                                añadirForm,
                                                                posNuevo,
                                                                objPedidoLleno,
                                                                cantidadtmp,
                                                                ambiente,
                                                                desamb,
                                                                opcamb,
                                                                auart
                                                                );
                        self.getView().byId("loadingControl").close();
                            if (result.c === "s") {

                                if (result.data.success) {
                                    self.getView().byId("loadingControl").open(); // INDICADOR
                                    self.getView().getModel().setProperty("/RetornoAnadirMaterialBuscarMaster", result.data);

                                    //////////////////Redirigir Master Detail////////////////////////////////////////////////////////


                                    self.byId("SplitAppId").toMaster(self.createId("MasterDocNuevoProductos"));
                                    self.byId("SplitAppId").to(self.createId("pagDocNuevo_productos_lista1"));


                                    /////////////////////////////////////////////////////////////////////////

                                    ////////////////////Retorno Total de Materiales/////////////////////////
                                    var retorno = self.getView().getModel().getProperty("/RetornoAnadirMaterialBuscarMaster");
                                    var disp = self.getView().getModel().getProperty("/RetornoMaterial");

                                    self.getView().getModel().setProperty("/RetornoMaterial", disp);
                                    if(disp){
                                            disp.push(retorno);
                                        }else{
                                            
                                            disp = [];
                                            disp.push(retorno);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/RetornoMaterial", disp);
                                        self.getView().getModel().refresh();

                                    ///////////////////////Retorno Solo de Materiales////////////////////////////////////////////////////


                                    
                                    var objSeleccionado = self.getView().getModel().getProperty("/materialSelec");
                                    var listaDisplay = self.getView().getModel().getProperty("/listaMatAnadido");
                                    
                                    if(listaDisplay){
                                        listaDisplay.push(objSeleccionado);
                                    }else{
                                        
                                        listaDisplay = [];
                                        listaDisplay.push(objSeleccionado);
                                        
                                    }
                                    
                                    self.getView().getModel().setProperty("/listaMatAnadido",listaDisplay);
                                    self.getView().getModel().refresh();

                                    self.getView().getModel().refresh();


                                    self.getView().byId("dlg_DocNuevoaddProducto").close();
                                    self.getView().byId("lb_mensajeAviso1").setText("Se creó nueva Cotización. Material Añadido. Desea seguir añadiendo materiales?");
                                    self.getView().byId("dlg_MensajeAviso1").open();
                                    self.getView().byId("loadingControl").close(); 



                                    ////////////////Crear listaRepartosJson///////////////////////////////////////////////////////////////

                                    var lstTotal1 = self.getView().getModel().getProperty("/RetornoAnadirMaterialBuscarMaster/lstTotal");
                                    var lstTotal = lstTotal1[0];
                                    console.log(lstTotal.PosicionCorto);

                                    
                                    var obj1listaRepartosJson = {
                                        matPosicion : lstTotal.PosicionCorto ,
                                        id : tamanoList/10,
                                        TipoReparto : "" ,
                                        Pos : "1" ,
                                        PosCorto : "" ,
                                        FechaEntrega : "2017-06-22T05:00:00.000Z" ,
                                        CantPed : self.getView().byId("txt_cantidad_buscarMaterial").getValue() ,
                                        CantConf : self.getView().byId("txt_cantidad_buscarMaterial").getValue() ,
                                        CodUMedida : "" ,
                                    };

                                        
                                    //self.getView().getModel().setProperty("/listaRepartos",listaRepartosJson);
                                    self.getView().getModel().setProperty("/listaRepartos",obj1listaRepartosJson);
                                    self.getView().getModel().refresh();


                                    var objRepartos = self.getView().getModel().getProperty("/listaRepartos");
                                   
                                    var listaRepar = self.getView().getModel().getProperty("/listaRepartosLleno");

                                    self.getView().getModel().setProperty("/listaRepartosLleno", listaRepar);
                                        
                                        if(listaRepar){
                                            listaRepar.push(objRepartos);
                                        }else{
                                            
                                            listaRepar = [];
                                            listaRepar.push(objRepartos);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/listaRepartosLleno", listaRepar);
                                        self.getView().getModel().refresh();

                                        var ejemss = self.getView().getModel().getProperty("/listaRepartosLleno");

                                        console.log(ejemss);



                                    ////Coger Centro Almacen y Lote de Mayor Stock//////////////////////////////////////////////////////

                                    var listaTotalStock = self.getView().getModel().getProperty("/RetornoAnadirMaterialBuscarMaster/lstStock");
                                    var Mayor = listaTotalStock.length - 1;
                                    console.log(listaTotalStock[Mayor]);

                                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //////////////////Crear listaMatjson////////////////////////////////////////////////////////////////

                                        
                                        var obj1listaMatJson = {
                                                            id: tamanoList/10 ,
                                                            CodMaterial: lstTotal.CodMaterial ,
                                                            CodUMedida: lstTotal.CodUMedida ,
                                                            Descripcion: lstTotal.Material.Descripcion ,
                                                            Jerarquia: "" ,// lstTotal.Material.Jerarquia
                                                            ValorRendimiento: 0 ,
                                                            TipoMaterial: lstTotal.TipoMaterial ,
                                                            EsFlete: lstTotal.Material.EsFlete ,
                                                            EsEstiba: lstTotal.Material.EsEstiba ,
                                                            EspecialServ: lstTotal.Material.EspecialServ ,
                                                            Tipo: lstTotal.Material.Tipo ,
                                                            CodMaterialCorto: lstTotal.CodMaterialCorto ,
                                                            TieneServ: lstTotal.Material.TieneServ ,
                                                            Rendimiento: lstTotal.Rendimiento ,
                                                            DescMovil: lstTotal.DescMovil ,
                                                            Descontinuado: lstTotal.Descontinuado ,
                                                            UMedidaRendimiendo: lstTotal.UMedidaRendimiendo ,
                                                            DescMaterial: lstTotal.DescMaterial ,
                                                            PrecioUnit: lstTotal.Material.PrecioUnit ,
                                                            Peso: lstTotal.Material.Peso ,
                                                            Stock: lstTotal.Material.Stock ,
                                                            Mstae: lstTotal.Material.MSTAE ,
                                                            Vdscto: "0" ,
                                                            StatusDespacho: lstTotal.StatusDespacho ,
                                                            StockPos: lstTotal.StockPos ,
                                                            Posicion: lstTotal.Posicion ,
                                                            Cantidad: lstTotal.Cantidad ,
                                                            CodCentro: listaTotalStock[Mayor].CodCentro , // lstTotal.CodCentro
                                                            CodAlmacen: listaTotalStock[Mayor].CodAlmacen ,// lstTotal.CodAlmacen
                                                            CodLote: listaTotalStock[Mayor].CodLote ,// lstTotal.CodLote
                                                            PrecioSinIGV: lstTotal.PrecioSinIGV ,
                                                            DsctoMontTotal: lstTotal.DsctoMontTotal ,
                                                            MotivoRechazo: lstTotal.MotivoRechazo ,
                                                            TipoPosAnt: lstTotal.TipoPosAnt ,
                                                            CodGrupoMat: lstTotal.CodGrupoMat ,
                                                            Opcion: lstTotal.Opcion ,
                                                            Reembolsable: lstTotal.Reembolsable ,
                                                            Zservicio: lstTotal.Zservicio ,
                                                            ContentID: lstTotal.ContentID ,
                                                            DescMaterialTicketera: lstTotal.DescMaterialTicketera ,
                                                            PrioridadEntrega: lstTotal.PrioridadEntrega ,
                                                            FechaCantConf: lstTotal.FechaCantConf ,
                                                            FechaCantConfStr: lstTotal.FechaCantConfStr ,
                                                            PosSup: lstTotal.PosSup ,
                                                            PosSupCorto: lstTotal.PosSupCorto ,
                                                            TipoPosicion: lstTotal.TipoPosicion ,// lstTotal.TipoPosicion
                                                            CambAlmacen: lstTotal.CambAlmacen ,
                                                            CantComp: lstTotal.CantComp ,
                                                            PrecioTotal: 210.06 , // lstTotal.PrecioTotal
                                                            PrecioUnitario: 210.06 ,// lstTotal.PrecioUnitario
                                                            Total: lstTotal.Material.PrecioUnit ,// lstTotal.Total
                                                            IgvUnitario: 18 ,// lstTotal.IgvUnitario
                                                            IgvTotal: 37.81 ,// lstTotal.IgvTotal
                                                            TotalDctos: 0 ,// lstTotal.TotalDctos
                                                            SubTotal: 210.06 ,// lstTotal.SubTotal
                                                            CantConfirmada: lstTotal.CantConfirmada ,// lstTotal.CantConfirmada
                                                            PesoNeto: lstTotal.PesoNeto ,
                                                            PrecioConIGV: lstTotal.PrecioConIGV ,
                                                            TotalImpresion: lstTotal.TotalImpresion ,
                                                            DescCentro: listaTotalStock[Mayor].DescCentro ,
                                                            DescAlmacen: listaTotalStock[Mayor].DescAlmacen ,
                                                            FechaEntregaString: lstTotal.FechaEntregaString ,
                                                            Reparto: lstTotal.Reparto ,
                                                            TotPercep: 4.96 ,// lstTotal.TotPercep
                                                            link: lstTotal.link ,
                                                            DesGrupoMat: lstTotal.DesGrupoMat ,
                                                            DivisionRendimiento: lstTotal.DivisionRendimiento ,
                                                            mod: "" ,
                                                            PosicionCorto: lstTotal.PosicionCorto ,
                                                            SubTotalLista: 210.06 ,
                                                            fullName: listaTotalStock[Mayor].CodCentro+" "+listaTotalStock[Mayor].DescCentro+" / "+listaTotalStock[Mayor].CodAlmacen+" / "+listaTotalStock[Mayor].CodLote ,


                                                            };



                                    self.getView().getModel().setProperty("/listaMatJson",obj1listaMatJson);
                                    self.getView().getModel().refresh();


                                    var objMat = self.getView().getModel().getProperty("/listaMatJson");
                                   
                                    var listaMat = self.getView().getModel().getProperty("/listaMatLleno");

                                    self.getView().getModel().setProperty("/listaMatLleno", listaMat);
                                        
                                        if(listaMat){
                                            listaMat.push(objMat);
                                        }else{
                                            
                                            listaMat = [];
                                            listaMat.push(objMat);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/listaMatLleno", listaMat);
                                        self.getView().getModel().refresh();


                                    //////////////Eliminar contenido de modelo materialSelec//////////////////////////////////////////////////////////////////////////////
                                    self.getView().getModel().setProperty("/materialSelec",null);
                                    self.getView().getModel().refresh();
                                    
                                    ///////////////////////////////////////////////////////////////////////////////





                                    } else {
                                        self.getView().byId("loadingControl").open(); // INDICADOR
                                        sap.m.MessageToast.show(result.data.errors.reason, {
                                            duration: 3000
                                        });
                                        self.getView().byId("loadingControl").close();

                                    }

                             } else {
                                    self.getView().byId("loadingControl").open(); // INDICADOR
                                    sap.m.MessageToast.show(result.m, {
                                        duration: 3000
                                    });
                                    self.getView().byId("loadingControl").close();
                                }   
                                console.log(result);


            

            }else{
                MessageToast.show("No ha ingresado Ambiente y/o Opcion de Ambiente"); 
            }


        self.getView().byId("loadingControl").close();
        },1000);

        },

        onNOCrearCotizacion:function(){
            this.getView().byId("dlg_MensajeAvisoCrearCotizacion").close();
        },

        onDocNuevoMasterProductosAddonDialog: function (evt) {
            var documentoCreado = this.getView().getModel().getProperty("/documentoSeleccionado");

            if(!documentoCreado){
                this.getView().byId("dlg_MensajeAvisoCrearCotizacion").open();
            }else{


            /////Añadir Material//////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////
            var listaMateriales = this.getView().byId("lista_BuscarMaterial").getSelectedItem().getBindingContext().getObject();



                if(this.getView().byId("com_ambiente_buscarMaterial").getSelectedKey() !=="" && this.getView().byId("com_opcion_buscarMaterial").getSelectedKey() !==""){

            this.getView().byId("loadingControl").open(); // INDICADOR
            var codigo = listaMateriales.CodMaterial ;
            var cantidad = this.getView().byId("txt_cantidad_buscarMaterial").getValue() ;
            var CodAmbiente = this.getView().byId("com_ambiente_buscarMaterial").getSelectedKey() ;
            var Opcion = this.getView().byId("com_opcion_buscarMaterial").getSelectedKey() ;
            var UserId = window.dataIni.user.User ;
            var PwdId = window.dataIni.user.Password ;
            var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722" ;
            var GrpVend = window.dataIni.person.GrpVend ;
            var Descripcion = window.dataIni.person.Descripcion ;
            var CodigoVendedor = window.dataIni.person.PerNr ;
            var OrgVentas = this.getView().byId("com_orgVentas_areaVentas").getSelectedKey() ;
            var CanalDist = this.getView().byId("com_Canal_areaVentas").getSelectedKey() ;
            var OfVentas = this.getView().byId("com_oficina_areaVentas").getSelectedKey() ;
            var añadirForm = 1 ;
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            
            var tamanoList = (this.getView().byId("list_listaMasterMateriales").getItems().length + 1)*10; //captar posicion del item dentro de la lista
            
            console.log(tamanoList);
            
            ///////////////////////////////////////////////////////////////////////////////////////////////////
            var posNuevo = tamanoList ; // 10 GENERADO CON LENGTH

            var objPedido = {

                        id: 1498248940715,
                        CodTipoDoc: this.getView().getModel().getProperty("/documentoSeleccionado/Codigo"),
                        CodTipoDocAnt:"",
                        Referencia:"",
                        OrgVentas:this.getView().byId("com_orgVentas_areaVentas").getSelectedKey(),
                        CanalDist: this.getView().byId("com_Canal_areaVentas").getSelectedKey(),
                        CodOficina: this.getView().byId("com_oficina_areaVentas").getSelectedKey(),
                        CondPago: this.getView().byId("com_condPago_pago").getSelectedKey() ,
                        Moneda: this.getView().byId("com_moneda_pago").getSelectedKey(),
                        CondExp: "03",
                        FechaEntrega: this.getView().byId("date_fechaEntReferencial_datosDocumento").getDateValue(),
                        FechaReparto: null,
                        TipoCambio: this.getView().byId("txt_tipoCambio_pago").getValue(),
                        FechaFacturacion: this.getView().byId("date_fechaFacturacion_datosFacturacion").getDateValue(),
                        CodigoBanco: this.getView().byId("com_nombreBanco_datosFacturacion").getSelectedKey(), // ""
                        Motivo: this.getView().byId("com_motivoNcNd_datosFacturacion").getSelectedKey(), // ""
                        BloqueoEntrega: this.getView().byId("com_bloqueoEntrega_datosFacturacion").getSelectedKey(),//"",
                        BloqueoFactura: this.getView().byId("com_bloqueoFactura_datosFacturacion").getSelectedKey(),//"",
                        OrdenCompra: this.getView().byId("txt_nroOrdenCompra_datosDocumento").getValue(), //""
                        FechaPedido: this.getView().byId("date_fechaPedido_datosDocumento").getDateValue(),
                        FechaValidez: this.getView().byId("date_fechaValidez_datosDocumento").getDateValue(),
                        Estado: "",
                        nomProyecto: this.getView().byId("txt_nombreProyecto_proyectoVisita").getValue(),
                        TipoVisita: this.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey(),
                        cbxReembolsable: this.getView().byId("check_visitaNoReembolsable_proyectoVisita").getSelected(),
                        dsctoAdicionalZD12: 0,
                        dsctoAdicionalZD12tmp: 0,
                        FechaPrecio: null,
                        Mail: "",
                        BonoCampania: "",
                        RegaloCampania: "",
                        Reenbolsable: false,
                        PedidoVenta1: "",
                        PedidoVenta2: "",
                        PedidoVenta3: "",
                        PedidoVenta4: "",
                        PedidoVisita1: "",
                        PedidoVisita2: "",
                        PedidoVisita3: "",
                        PedidoVisita4: "",
                        SubtotalImp: 0,
                        TieneEntrega: false,
                        DocOriginal: "",
                        Znpiso: "",
                        Ztransporte: "",
                        Zasensor: false,
                        Zncservicio: false,
                        TieneKitCombo: false,
                        NumPedido: "",
                        NumPedidoCorto: "",
                        FechaPedidoString: "",
                        FechaValidezString: "",
                        FechaEntregaString: "",
                        CodCliente: this.getView().getModel().getProperty("/dataIni/person/ClienteEvent"),
                        CodClienteCorto: "",
                        CodGrupoVend: "",
                        Sector: "",
                        SubTotal: 0,
                        Igv: 0,
                        Total: 0,
                        TotalImp: 0,
                        PesoTotal: 0,
                        GrupoCond: "",
                        Tratado: false,
                        ClasePedidoCliente: "",
                        ClaseDocumento: "",
                        CodVendedor1: window.dataIni.person.PerNr,
                        NomVendedor1: window.dataIni.person.Descripcion,
                        TotalConIgv: 0,
                        textoAtencion: this.getView().byId("txtArea_contactoEntrega_Observaciones").getValue(),
                        textoObsAdministrativas: this.getView().byId("txtArea_observacionAdministrativa_Observaciones").getValue(),
                        textoRefFactura: this.getView().byId("txtArea_referenciaFactura_Observaciones").getValue(),
                        textoRefDireccion: this.getView().byId("txtArea_contactoLugar_Observaciones").getValue(),
                        correo: "",
                        codigoSolicitante: "",
                        codigoDestFact: "",
                        codigoResPago: "",
                        nombreSolicitante: "",
                        direccionSolicitante: "",
                        codigoPostalSolicitante: "",
                        telefonoSolicitante: "",
                        nifSolicitante: "",
                        codigoDestMerc: "",
                        nombreDestMerc: "",
                        direccionDestMerc: "",
                        codigoPostalDestMerc: "",
                        telefonoDestMerc: "",
                        telefonoMovilDestMerc: "",
                        nombreDestFact: "",
                        direccionDestFact: "",
                        codigoPostalDestFact: "",
                        telefonoDestFact: "",
                        nombreResPago: "",
                        direccionResPago: "",
                        codigoPostalResPago: "",
                        telefonoResPago: "",
                        nifResPago: "",
                        codigoCliente: this.getView().getModel().getProperty("/dataIni/person/ClienteEvent"),
                        nombreCliente: this.getView().getModel().getProperty("/dataIni/person/E_NAME1"),
                        direccionCliente: this.getView().byId("txt_direccion_solicitante").getValue(),
                        apePatSolicitante: "" ,                                            
                        apeMatSolicitante: "",
                        textoContacto: "",
                        textoDatosAdicionalesCliente: "",
                        textoTelefonos: "",
                        textoDescripcionVisita: "",
                        textoResultadoVisita: "",
                        textoDescripcionServInstalacion: "",
                        datosCliente: {
                                            1:"1",
                                            10:"1",
                                            15:"1",
                                            20:"",
                                            25:"1",
                                            35:"30",
                                            CODIG:"87654321",
                                            APPAT:this.getView().byId("txt_apellido_paterno_datosAdicionales").getValue(),
                                            APMAT:this.getView().byId("txt_apellido_materno_datosAdicionales").getValue(),
                                            NOMBRE:this.getView().byId("txt_nombre_datosAdicionales").getValue(),
                                            FECNAC:this.getView().byId("dt_fecha_nacimiento_datosAdicionales").getDateValue(),
                                            GRAINS:"10",
                                            SEXO:this.getView().byId("com_sexo_datosAdicionales").getSelectedKey(),
                                            CIUDAD:"140101",
                                            EDAD:this.getView().byId("txt_edad_datosAdicionales").getValue(),
                                            RANGOED:this.getView().byId("com_rango_edad_datosAdicionales").getSelectedKey(),
                                            NIVELSE:"A",
                                            DIREC:this.getView().byId("txt_direccion_solicitante").getValue()  },
                        listaPre: "",
                        TotalDcto: 0,
                        codProyecto: this.getView().byId("txt_codigoProyecto_proyectoVisita").getValue(),
                        codVersion: this.getView().byId("txt_codigoVersion_proyectoVisita").getValue(),
                        GrupoForecast: this.getView().byId("com_grupoForecast_proyectoVisita").getSelectedKey(),
                        TipoForecast: this.getView().byId("com_tipoForecast_proyectoVisita").getSelectedKey(),
                        NoImpFac: "",
                        Certificado: this.getView().byId("txt_nroCertificado_proyectoVisita").getValue(),
                        FechaVisita: this.getView().byId("date_fechaVisita_proyectoVisita").getDateValue(), //null

                        };

                var cantidadtmp = this.getView().byId("txt_cantidad_buscarMaterial").getValue() ;
                var ambiente = this.getView().byId("com_ambiente_buscarMaterial").getSelectedKey() ;
                var desamb = this.getView().byId("com_ambiente_buscarMaterial").getSelectedItem().getText() ;
                var opcamb = this.getView().byId("com_opcion_buscarMaterial").getSelectedKey() ;
                var auart = this.getView().getModel().getProperty("/documentoSeleccionado/Codigo") ;


                var objPedidoLleno = JSON.stringify(objPedido);
                this.getView().byId("loadingControl").close();

                var self = this;


self.getView().byId("loadingControl").open();
setTimeout(function(){




                        self.getView().byId("loadingControl").open(); // INDICADOR
                        var result = materialServices.anadirMaterialMaster(codigo,
                                                                cantidad,
                                                                CodAmbiente,
                                                                Opcion,
                                                                UserId,
                                                                PwdId,
                                                                Id,
                                                                GrpVend,
                                                                Descripcion,
                                                                CodigoVendedor,
                                                                OrgVentas,
                                                                CanalDist,
                                                                OfVentas,
                                                                añadirForm,
                                                                posNuevo,
                                                                objPedidoLleno,
                                                                cantidadtmp,
                                                                ambiente,
                                                                desamb,
                                                                opcamb,
                                                                auart
                                                                );
                        self.getView().byId("loadingControl").close();
                            if (result.c === "s") {

                                if (result.data.success) {
                                    self.getView().byId("loadingControl").open(); // INDICADOR
                                    self.getView().getModel().setProperty("/RetornoAnadirMaterialBuscarMaster", result.data);


                                    ////////////////////Retorno Total de Materiales/////////////////////////
                                    var retorno = self.getView().getModel().getProperty("/RetornoAnadirMaterialBuscarMaster");
                                    var disp = self.getView().getModel().getProperty("/RetornoMaterial");

                                    self.getView().getModel().setProperty("/RetornoMaterial", disp);
                                    if(disp){
                                            disp.push(retorno);
                                        }else{
                                            
                                            disp = [];
                                            disp.push(retorno);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/RetornoMaterial", disp);
                                        self.getView().getModel().refresh();

                                    ///////////////////////Retorno Solo de Materiales////////////////////////////////////////////////////


                                    
                                    var objSeleccionado = self.getView().getModel().getProperty("/materialSelec");
                                    var listaDisplay = self.getView().getModel().getProperty("/listaMatAnadido");
                                    
                                    if(listaDisplay){
                                        listaDisplay.push(objSeleccionado);
                                    }else{
                                        
                                        listaDisplay = [];
                                        listaDisplay.push(objSeleccionado);
                                        
                                    }
                                    
                                    self.getView().getModel().setProperty("/listaMatAnadido",listaDisplay);
                                    self.getView().getModel().refresh();

                                    self.getView().getModel().refresh();


                                    self.getView().byId("dlg_DocNuevoaddProducto").close();
                                    self.getView().byId("lb_mensajeAviso1").setText("Material Añadido. Desea seguir añadiendo materiales?");
                                    self.getView().byId("dlg_MensajeAviso1").open();
                                    self.getView().byId("loadingControl").close(); 



                                    ////////////////Crear listaRepartosJson///////////////////////////////////////////////////////////////

                                    var lstTotal1 = self.getView().getModel().getProperty("/RetornoAnadirMaterialBuscarMaster/lstTotal");
                                    var lstTotal = lstTotal1[0];
                                    console.log(lstTotal.PosicionCorto);

                                    
                                    var obj1listaRepartosJson = {
                                        matPosicion : lstTotal.PosicionCorto ,
                                        id : tamanoList/10,
                                        TipoReparto : "" ,
                                        Pos : "1" ,
                                        PosCorto : "" ,
                                        FechaEntrega : "2017-06-22T05:00:00.000Z" ,
                                        CantPed : self.getView().byId("txt_cantidad_buscarMaterial").getValue() ,
                                        CantConf : self.getView().byId("txt_cantidad_buscarMaterial").getValue() ,
                                        CodUMedida : "" ,
                                    };

                                        
                                    //self.getView().getModel().setProperty("/listaRepartos",listaRepartosJson);
                                    self.getView().getModel().setProperty("/listaRepartos",obj1listaRepartosJson);
                                    self.getView().getModel().refresh();


                                    var objRepartos = self.getView().getModel().getProperty("/listaRepartos");
                                   
                                    var listaRepar = self.getView().getModel().getProperty("/listaRepartosLleno");

                                    self.getView().getModel().setProperty("/listaRepartosLleno", listaRepar);
                                        
                                        if(listaRepar){
                                            listaRepar.push(objRepartos);
                                        }else{
                                            
                                            listaRepar = [];
                                            listaRepar.push(objRepartos);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/listaRepartosLleno", listaRepar);
                                        self.getView().getModel().refresh();

                                        var ejemss = self.getView().getModel().getProperty("/listaRepartosLleno");

                                        console.log(ejemss);



                                    ////Coger Centro Almacen y Lote de Mayor Stock//////////////////////////////////////////////////////

                                    var listaTotalStock = self.getView().getModel().getProperty("/RetornoAnadirMaterialBuscarMaster/lstStock");
                                    var Mayor = listaTotalStock.length - 1;
                                    console.log(listaTotalStock[Mayor]);

                                    ////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //////////////////Crear listaMatjson////////////////////////////////////////////////////////////////

                                        
                                        var obj1listaMatJson = {
                                                            id: tamanoList/10 ,
                                                            CodMaterial: lstTotal.CodMaterial ,
                                                            CodUMedida: lstTotal.CodUMedida ,
                                                            Descripcion: lstTotal.Material.Descripcion ,
                                                            Jerarquia: "" ,// lstTotal.Material.Jerarquia
                                                            ValorRendimiento: 0 ,
                                                            TipoMaterial: lstTotal.TipoMaterial ,
                                                            EsFlete: lstTotal.Material.EsFlete ,
                                                            EsEstiba: lstTotal.Material.EsEstiba ,
                                                            EspecialServ: lstTotal.Material.EspecialServ ,
                                                            Tipo: lstTotal.Material.Tipo ,
                                                            CodMaterialCorto: lstTotal.CodMaterialCorto ,
                                                            TieneServ: lstTotal.Material.TieneServ ,
                                                            Rendimiento: lstTotal.Rendimiento ,
                                                            DescMovil: lstTotal.DescMovil ,
                                                            Descontinuado: lstTotal.Descontinuado ,
                                                            UMedidaRendimiendo: lstTotal.UMedidaRendimiendo ,
                                                            DescMaterial: lstTotal.DescMaterial ,
                                                            PrecioUnit: lstTotal.Material.PrecioUnit ,
                                                            Peso: lstTotal.Material.Peso ,
                                                            Stock: lstTotal.Material.Stock ,
                                                            Mstae: lstTotal.Material.MSTAE ,
                                                            Vdscto: "0" ,
                                                            StatusDespacho: lstTotal.StatusDespacho ,
                                                            StockPos: lstTotal.StockPos ,
                                                            Posicion: lstTotal.Posicion ,
                                                            Cantidad: lstTotal.Cantidad ,
                                                            CodCentro: listaTotalStock[Mayor].CodCentro , // lstTotal.CodCentro
                                                            CodAlmacen: listaTotalStock[Mayor].CodAlmacen ,// lstTotal.CodAlmacen
                                                            CodLote: listaTotalStock[Mayor].CodLote ,// lstTotal.CodLote
                                                            PrecioSinIGV: lstTotal.PrecioSinIGV ,
                                                            DsctoMontTotal: lstTotal.DsctoMontTotal ,
                                                            MotivoRechazo: lstTotal.MotivoRechazo ,
                                                            TipoPosAnt: lstTotal.TipoPosAnt ,
                                                            CodGrupoMat: lstTotal.CodGrupoMat ,
                                                            Opcion: lstTotal.Opcion ,
                                                            Reembolsable: lstTotal.Reembolsable ,
                                                            Zservicio: lstTotal.Zservicio ,
                                                            ContentID: lstTotal.ContentID ,
                                                            DescMaterialTicketera: lstTotal.DescMaterialTicketera ,
                                                            PrioridadEntrega: lstTotal.PrioridadEntrega ,
                                                            FechaCantConf: lstTotal.FechaCantConf ,
                                                            FechaCantConfStr: lstTotal.FechaCantConfStr ,
                                                            PosSup: lstTotal.PosSup ,
                                                            PosSupCorto: lstTotal.PosSupCorto ,
                                                            TipoPosicion: lstTotal.TipoPosicion ,// lstTotal.TipoPosicion
                                                            CambAlmacen: lstTotal.CambAlmacen ,
                                                            CantComp: lstTotal.CantComp ,
                                                            PrecioTotal: 210.06 , // lstTotal.PrecioTotal
                                                            PrecioUnitario: 210.06 ,// lstTotal.PrecioUnitario
                                                            Total: lstTotal.Material.PrecioUnit ,// lstTotal.Total
                                                            IgvUnitario: 18 ,// lstTotal.IgvUnitario
                                                            IgvTotal: 37.81 ,// lstTotal.IgvTotal
                                                            TotalDctos: 0 ,// lstTotal.TotalDctos
                                                            SubTotal: 210.06 ,// lstTotal.SubTotal
                                                            CantConfirmada: lstTotal.CantConfirmada ,// lstTotal.CantConfirmada
                                                            PesoNeto: lstTotal.PesoNeto ,
                                                            PrecioConIGV: lstTotal.PrecioConIGV ,
                                                            TotalImpresion: lstTotal.TotalImpresion ,
                                                            DescCentro: listaTotalStock[Mayor].DescCentro ,
                                                            DescAlmacen: listaTotalStock[Mayor].DescAlmacen ,
                                                            FechaEntregaString: lstTotal.FechaEntregaString ,
                                                            Reparto: lstTotal.Reparto ,
                                                            TotPercep: 4.96 ,// lstTotal.TotPercep
                                                            link: lstTotal.link ,
                                                            DesGrupoMat: lstTotal.DesGrupoMat ,
                                                            DivisionRendimiento: lstTotal.DivisionRendimiento ,
                                                            mod: "" ,
                                                            PosicionCorto: lstTotal.PosicionCorto ,
                                                            SubTotalLista: 210.06 ,
                                                            fullName: listaTotalStock[Mayor].CodCentro+" "+listaTotalStock[Mayor].DescCentro+" / "+listaTotalStock[Mayor].CodAlmacen+" / "+listaTotalStock[Mayor].CodLote ,


                                                            };



                                    self.getView().getModel().setProperty("/listaMatJson",obj1listaMatJson);
                                    self.getView().getModel().refresh();


                                    var objMat = self.getView().getModel().getProperty("/listaMatJson");
                                   
                                    var listaMat = self.getView().getModel().getProperty("/listaMatLleno");

                                    self.getView().getModel().setProperty("/listaMatLleno", listaMat);
                                        
                                        if(listaMat){
                                            listaMat.push(objMat);
                                        }else{
                                            
                                            listaMat = [];
                                            listaMat.push(objMat);
                                            
                                        }
                                        
                                        self.getView().getModel().setProperty("/listaMatLleno", listaMat);
                                        self.getView().getModel().refresh();


                                    //////////////Eliminar contenido de modelo materialSelec//////////////////////////////////////////////////////////////////////////////
                                    self.getView().getModel().setProperty("/materialSelec",null);
                                    self.getView().getModel().refresh();
                                    
                                    ///////////////////////////////////////////////////////////////////////////////





                                    } else {
                                        self.getView().byId("loadingControl").open(); // INDICADOR
                                        sap.m.MessageToast.show(result.data.errors.reason, {
                                            duration: 3000
                                        });
                                        self.getView().byId("loadingControl").close();

                                    }

                             } else {
                                    self.getView().byId("loadingControl").open(); // INDICADOR
                                    sap.m.MessageToast.show(result.m, {
                                        duration: 3000
                                    });
                                    self.getView().byId("loadingControl").close();
                                }   
                                console.log(result);


                                self.getView().byId("loadingControl").close();
},1000);
            

            }else{
                MessageToast.show("No ha ingresado Ambiente y/o Opcion de Ambiente"); 
            }


            }
            //////////////////////////////////////////////////////////////////////////////////////
           
            
        },

        

        onSiMensajeAviso1: function () {
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },

        onNoMensajeAviso1: function () {
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevobuscar").close();
            this.getView().byId("dlg_BuscarMateriales").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
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



        //onAnadirMaterial desde el buscador

        


        

        onBtnRecalcular:function(){

            var cantidadMateriales = this.getView().byId("list_listaMasterMateriales").getItems().length;
            console.log(cantidadMateriales);

            if(cantidadMateriales>0){

            
            //material.aspx

                var UserId = window.dataIni.user.User;
                var PwdId = window.dataIni.user.Password;
                var Id = "e48be9f4-82b1-4cc4-9894-1c01e78c0722";
                var GrpVend = window.dataIni.person.GrpVend;
                var Descripcion = window.dataIni.person.Descripcion;
                var CodigoVendedor = window.dataIni.person.PerNr;
                var OrgVentas = this.getView().byId("com_orgVentas_areaVentas").getSelectedKey();
                var CanalDist = this.getView().byId("com_Canal_areaVentas").getSelectedKey();
                var OfVentas = this.getView().byId("com_oficina_areaVentas").getSelectedKey();

                                    
                var dsctoLotes = 2;
                var listaInterJson = [];
                        var obj1listaInterJson ={};
                                //Funcion AG Solicitante
                            obj1listaInterJson.id = 1;
                            obj1listaInterJson.PedidoId = 0 ;
                            obj1listaInterJson.Funcion = this.getView().byId("txt_funcion_solicitante").getValue() ;
                            obj1listaInterJson.Codigo = this.getView().byId("txt_codigo_solicitante").getValue() ;
                            obj1listaInterJson.Ruc = this.getView().byId("txt_dni_ruc_solicitante").getValue() ;
                            obj1listaInterJson.Descripcion = this.getView().byId("txt_nombre_solicitante").getValue() ;
                            obj1listaInterJson.Titulo = "" ;
                            obj1listaInterJson.Direccion = this.getView().byId("txt_direccion_solicitante").getValue() ;
                            obj1listaInterJson.DireccionCompleta = "" ;
                            obj1listaInterJson.Ciudad = this.getView().byId("com_distrito_solicitante").getSelectedKey() ; //getSelectedItem().getText()
                            obj1listaInterJson.Pais = "" ;
                            obj1listaInterJson.CodigoPostal = this.getView().byId("com_distrito_solicitante").getSelectedKey() ;
                            obj1listaInterJson.Distrito = this.getView().byId("com_distrito_solicitante").getSelectedKey() ; //getSelectedItem().getText()
                            obj1listaInterJson.Telefono = this.getView().byId("txt_telefono_solicitante").getValue() ;
                            obj1listaInterJson.TelefonoMovil = "" ;
                            obj1listaInterJson.Mail = this.getView().byId("txt_correo_solicitante").getValue() ;
                            obj1listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR0/PersonaFisica") ;
                            obj1listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR0/Eventual") ;
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
                                //RE Destino Factura
                            obj2listaInterJson.id = 2;
                            obj2listaInterJson.PedidoId = 0 ;
                            obj2listaInterJson.Funcion = this.getView().byId("txt_funcion_destinoFactura").getValue() ;
                            obj2listaInterJson.Codigo = this.getView().byId("txt_codigo_destinoFactura").getValue() ;
                            obj2listaInterJson.Ruc = "" ;
                            obj2listaInterJson.Descripcion = this.getView().byId("txt_nombre_destinoFactura").getValue() ;
                            obj2listaInterJson.Titulo = "" ;
                            obj2listaInterJson.Direccion = this.getView().byId("txt_direccion_destinoFactura").getValue() ;
                            obj2listaInterJson.DireccionCompleta = "" ;
                            obj2listaInterJson.Ciudad = this.getView().byId("com_distrito_destinoFactura").getSelectedKey() ; //getSelectedItem().getText()
                            obj2listaInterJson.Pais = "" ;
                            obj2listaInterJson.CodigoPostal = this.getView().byId("com_distrito_destinoFactura").getSelectedKey() ;
                            obj2listaInterJson.Distrito = this.getView().byId("com_distrito_destinoFactura").getSelectedKey() ; //getSelectedItem().getText()
                            obj2listaInterJson.Telefono = this.getView().byId("txt_telefono_destinoFactura").getValue() ;
                            obj2listaInterJson.TelefonoMovil = "" ;
                            obj2listaInterJson.Mail = "" ;
                            obj2listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR1/PersonaFisica") ;
                            obj2listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR1/Eventual") ;
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
                                //WE Destino Mercancia
                            obj3listaInterJson.id = 3;
                            obj3listaInterJson.PedidoId = 0 ;
                            obj3listaInterJson.Funcion = this.getView().byId("txt_funcion_destinoMercancia").getValue() ;
                            obj3listaInterJson.Codigo = this.getView().byId("txt_codigo_destinoMercancia").getValue() ;
                            obj3listaInterJson.Ruc = "" ;
                            obj3listaInterJson.Descripcion = this.getView().byId("txt_nombre_destinoMercancia").getValue() ;
                            obj3listaInterJson.Titulo = "" ;
                            obj3listaInterJson.Direccion = this.getView().byId("txt_direccion_destinoMercancia").getValue() ;
                            obj3listaInterJson.DireccionCompleta = "" ;
                            obj3listaInterJson.Ciudad = this.getView().byId("com_distrito_destinoMercancia").getSelectedKey() ; //getSelectedItem().getText()
                            obj3listaInterJson.Pais = "" ;
                            obj3listaInterJson.CodigoPostal = this.getView().byId("com_distrito_destinoMercancia").getSelectedKey() ;
                            obj3listaInterJson.Distrito = this.getView().byId("com_distrito_destinoMercancia").getSelectedKey() ; //getSelectedItem().getText()
                            obj3listaInterJson.Telefono = this.getView().byId("txt_telefono_destinoMercancia").getValue() ;
                            obj3listaInterJson.TelefonoMovil = this.getView().byId("txt_celular_destinoMercancia").getValue() ;
                            obj3listaInterJson.Mail = "" ;
                            obj3listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR2/PersonaFisica") ;
                            obj3listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR2/Eventual") ;
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
                                    // RG Responsable de Pago
                            obj4listaInterJson.id = 4;
                            obj4listaInterJson.PedidoId = 0 ;
                            obj4listaInterJson.Funcion = this.getView().byId("txt_funcion_responsablePago").getValue() ;
                            obj4listaInterJson.Codigo = this.getView().byId("txt_codigo_responsablePago").getValue() ;
                            obj4listaInterJson.Ruc = this.getView().byId("txt_dni_ruc_responsablePago").getValue() ;
                            obj4listaInterJson.Descripcion = this.getView().byId("txt_nombre_responsablePago").getValue() ;
                            obj4listaInterJson.Titulo = "" ;
                            obj4listaInterJson.Direccion = this.getView().byId("txt_direccion_responsablePago").getValue() ;
                            obj4listaInterJson.DireccionCompleta = "" ;
                            obj4listaInterJson.Ciudad = this.getView().byId("com_distrito_responsablePago").getSelectedKey() ; //getSelectedItem().getText()
                            obj4listaInterJson.Pais = "" ;
                            obj4listaInterJson.CodigoPostal = this.getView().byId("com_distrito_responsablePago").getSelectedKey() ;
                            obj4listaInterJson.Distrito = this.getView().byId("com_distrito_responsablePago").getSelectedKey() ; //getSelectedItem().getText()
                            obj4listaInterJson.Telefono = this.getView().byId("txt_telefono_responsablePago").getValue() ;
                            obj4listaInterJson.TelefonoMovil = "" ;
                            obj4listaInterJson.Mail = "" ;
                            obj4listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR3/PersonaFisica") ;
                            obj4listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR3/Eventual") ;
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
                                //Encargado Comercial
                            obj5listaInterJson.id = 5;
                            obj5listaInterJson.PedidoId = 0 ;
                            obj5listaInterJson.Funcion = "VE" ;
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
                            obj5listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR4/PersonaFisica") ;
                            obj5listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR4/Eventual") ;
                            obj5listaInterJson.ApPat = "" ;
                            obj5listaInterJson.ApMat = "" ;
                            obj5listaInterJson.TranspZone = "" ;
                            obj5listaInterJson.CodPersona = this.getView().byId("com_vendedor1_encargadoComercial").getSelectedKey() ;
                            obj5listaInterJson.Nombre = "" ;
                            obj5listaInterJson.Apellido = "" ;
                            obj5listaInterJson.Iniciales = "" ;
                            obj5listaInterJson.ApeSoltero = "" ;
                            obj5listaInterJson.DescripcionP = this.getView().byId("com_vendedor1_encargadoComercial").getSelectedKey() ; //getSelectedItem().getText()
                            obj5listaInterJson.Dni = "" ;
                            obj5listaInterJson.TelefonoP = "" ;


                        var obj6listaInterJson = {};

                            obj6listaInterJson.id = 6;
                            obj6listaInterJson.PedidoId = 0 ;
                            obj6listaInterJson.Funcion = "Z3" ;
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
                            obj6listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR5/PersonaFisica") ;
                            obj6listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR5/Eventual") ;
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
                            obj7listaInterJson.PedidoId = 0 ;
                            obj7listaInterJson.Funcion = "V2" ;
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
                            obj7listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR6/PersonaFisica") ;
                            obj7listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR6/Eventual") ;
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
                            obj8listaInterJson.PedidoId = 0 ;
                            obj8listaInterJson.Funcion = "V3" ;
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
                            obj8listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR7/PersonaFisica") ;
                            obj8listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR7/Eventual") ;
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
                            obj9listaInterJson.PedidoId = 0 ;
                            obj9listaInterJson.Funcion = "V4" ;
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
                            obj9listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR8/PersonaFisica") ;
                            obj9listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR8/Eventual") ;
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
                            obj10listaInterJson.PedidoId = 0 ;
                            obj10listaInterJson.Funcion = "Z2" ;
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
                            obj10listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR9/PersonaFisica") ;
                            obj10listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR9/Eventual") ;
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
                            obj11listaInterJson.PedidoId = 0 ;
                            obj11listaInterJson.Funcion = "Z5" ;
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
                            obj11listaInterJson.PersonaFisica = this.getView().getModel().getProperty("/listaR10/PersonaFisica") ;
                            obj11listaInterJson.Eventual = this.getView().getModel().getProperty("/listaR10/Eventual") ;
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




        var listaInterJsonLleno =   JSON.stringify(listaInterJson);
            this.getView().getModel().setProperty("/listaInterJsonDscto",listaInterJson);


        ////listaDsctoJsonLleno///////////

            if(this.getView().getModel().getProperty("/dsctoRetornoRecalcular")){
                var listaDsctoJson = this.getView().getModel().getProperty("/dsctoRetornoRecalcular") ;
                var listaDsctoJsonLleno = JSON.stringify(listaDsctoJson);

            }else{
                var listaDsctoJson = [];
                var listaDsctoJsonLleno = JSON.stringify(listaDsctoJson);
                
            }
               
        
        ///////////////////////////////////////////////////77


        var listaRepartosJson = this.getView().getModel().getProperty("/listaRepartosLleno");
                var listaRepartosJsonLleno = JSON.stringify(listaRepartosJson);



        var listaMatJson = this.getView().getModel().getProperty("/listaMatLleno"); //Se crea de acuerdo a cuantos materiales se agregan en detalles Productos
                var listaMatJsonLleno = JSON.stringify(listaMatJson);



                var listaPedJson = [];
                       var obj1listaPedJson = {};




                        obj1listaPedJson.id = 1498155798420 ; //1497985445784,
                        obj1listaPedJson.CodTipoDoc = this.getView().getModel().getProperty("/documentoSeleccionado/Codigo") ; //"ZO01",
                        obj1listaPedJson.CodTipoDocAnt = "" ; //"",
                        obj1listaPedJson.Referencia = this.getView().byId("txt_refDocNuevo").getValue() ; //"",
                        obj1listaPedJson.OrgVentas = this.getView().byId("com_orgVentas_areaVentas").getSelectedKey() ; //"1000",
                        obj1listaPedJson.CanalDist = this.getView().byId("com_Canal_areaVentas").getSelectedKey() ; //"10",
                        obj1listaPedJson.CodOficina = this.getView().byId("com_oficina_areaVentas").getSelectedKey() ; //"1010",
                        obj1listaPedJson.CondPago = this.getView().byId("com_condPago_pago").getSelectedKey() ; //"E000",
                        obj1listaPedJson.Moneda = this.getView().byId("com_moneda_pago").getSelectedKey() ; //"PEN",
                        obj1listaPedJson.CondExp = "03" ; //"03",
                        obj1listaPedJson.FechaEntrega = this.getView().byId("date_fechaEntReferencial_datosDocumento").getDateValue() ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.FechaReparto = null ; //"2014-02-01T05:00:00.000Z",
                        obj1listaPedJson.TipoCambio = this.getView().byId("txt_tipoCambio_pago").getValue() ; //3.282,
                        obj1listaPedJson.FechaFacturacion = this.getView().byId("date_fechaFacturacion_datosFacturacion").getDateValue() ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.CodigoBanco = this.getView().byId("com_nombreBanco_datosFacturacion").getSelectedKey() ; //"",
                        obj1listaPedJson.Motivo = this.getView().byId("com_motivoNcNd_datosFacturacion").getSelectedKey() ; //"002",
                        obj1listaPedJson.BloqueoEntrega = this.getView().byId("com_bloqueoEntrega_datosFacturacion").getSelectedKey() ; //"01",
                        obj1listaPedJson.BloqueoFactura = this.getView().byId("com_bloqueoFactura_datosFacturacion").getSelectedKey() ; //"01",
                        obj1listaPedJson.OrdenCompra = this.getView().byId("txt_nroOrdenCompra_datosDocumento").getValue() ; //"7",
                        obj1listaPedJson.FechaPedido = this.getView().byId("date_fechaPedido_datosDocumento").getDateValue() ; //"2017-06-20T19:04:05.784Z",
                        obj1listaPedJson.FechaValidez = this.getView().byId("date_fechaValidez_datosDocumento").getDateValue() ; //"2017-06-27T19:04:05.831Z",
                        obj1listaPedJson.Estado = "" ; //"",
                        obj1listaPedJson.nomProyecto = this.getView().byId("txt_nombreProyecto_proyectoVisita").getValue() ; //"nombreProyecto",
                        obj1listaPedJson.TipoVisita = this.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey() ; //"03",
                        obj1listaPedJson.cbxReembolsable = this.getView().byId("check_visitaNoReembolsable_proyectoVisita").getSelected() ; //false,
                        obj1listaPedJson.dsctoAdicionalZD12 = 0 ; //0,
                        obj1listaPedJson.dsctoAdicionalZD12tmp = 0 ; //0,
                        obj1listaPedJson.FechaPrecio = null ; //null,
                        obj1listaPedJson.Mail = this.getView().byId("txt_correo_solicitante").getValue() ; //"soli@hotmail.com",
                        obj1listaPedJson.BonoCampania = "" ; //"",
                        obj1listaPedJson.RegaloCampania = "" ; //"",
                        obj1listaPedJson.Reenbolsable = false ; //false,
                        obj1listaPedJson.PedidoVenta1 = "" ; //"",
                        obj1listaPedJson.PedidoVenta2 = "" ; //"",
                        obj1listaPedJson.PedidoVenta3 = "" ; //"",
                        obj1listaPedJson.PedidoVenta4 = "" ; //"",
                        obj1listaPedJson.PedidoVisita1 = "" ; //"",
                        obj1listaPedJson.PedidoVisita2 = "" ; //"",
                        obj1listaPedJson.PedidoVisita3 = "" ; //"",
                        obj1listaPedJson.PedidoVisita4 = "" ; //"",
                        obj1listaPedJson.SubtotalImp = 0 ; //0,
                        obj1listaPedJson.TieneEntrega = false ; //false,
                        obj1listaPedJson.DocOriginal = "" ; //"",
                        obj1listaPedJson.Znpiso = "" ; //"",
                        obj1listaPedJson.Ztransporte = "" ; //"",
                        obj1listaPedJson.Zasensor = false ; //false,
                        obj1listaPedJson.Zncservicio = false ; //false,
                        obj1listaPedJson.TieneKitCombo = false ; //false,
                        obj1listaPedJson.NumPedido = "" ; //"",
                        obj1listaPedJson.NumPedidoCorto = "" ; //"",
                        obj1listaPedJson.FechaPedidoString = "" ; //"",
                        obj1listaPedJson.FechaValidezString = "" ; //"",
                        obj1listaPedJson.FechaEntregaString = "" ; //"",
                        obj1listaPedJson.CodCliente = this.getView().getModel().getProperty("/dataIni/person/ClienteEvent") ; //"0000101317",
                        obj1listaPedJson.CodClienteCorto = "" ; //"",
                        obj1listaPedJson.CodGrupoVend = "" ; //"",
                        obj1listaPedJson.Sector = "" ; //"",
                        obj1listaPedJson.SubTotal = 0 ; //155.67,
                        obj1listaPedJson.Igv = 0 ; //28.02,
                        obj1listaPedJson.Total = 0 ; //183.69,
                        obj1listaPedJson.TotalImp = 0 ; //28.02,
                        obj1listaPedJson.PesoTotal = 0 ; //0,
                        obj1listaPedJson.GrupoCond = "" ; //"01",
                        obj1listaPedJson.Tratado = false ; //false,
                        obj1listaPedJson.ClasePedidoCliente = "" ; //"",
                        obj1listaPedJson.ClaseDocumento = "" ; //"",
                        obj1listaPedJson.CodVendedor1 = this.getView().byId("com_vendedor1_encargadoComercial").getSelectedKey() ; //"00001802",
                        obj1listaPedJson.NomVendedor1 = this.getView().byId("com_vendedor1_encargadoComercial").getSelectedItem().getText() ; //"Julio Edgardo Pingo",
                        obj1listaPedJson.TotalConIgv = 0 ; //0,
                        obj1listaPedJson.textoAtencion = this.getView().byId("txtArea_contactoEntrega_Observaciones").getValue() ; //"observacionAtencion",
                        obj1listaPedJson.textoObsAdministrativas = this.getView().byId("txtArea_observacionAdministrativa_Observaciones").getValue() ; //"observacionObservacionesAdministrativas",
                        obj1listaPedJson.textoRefFactura = this.getView().byId("txtArea_referenciaFactura_Observaciones").getValue() ; //"observacionReferenciaFactura",
                        obj1listaPedJson.textoRefDireccion = this.getView().byId("txtArea_contactoLugar_Observaciones").getValue() ; //"observacionReferenciaDireccion",
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
                        obj1listaPedJson.codigoCliente = this.getView().getModel().getProperty("/dataIni/person/ClienteEvent") ; //"0000101317",
                        obj1listaPedJson.nombreCliente = this.getView().getModel().getProperty("/dataIni/person/E_NAME1") ; //"nombreSoli",
                        obj1listaPedJson.direccionCliente = this.getView().byId("txt_direccion_solicitante").getValue() ; //"direSoli",
                        obj1listaPedJson.apePatSolicitante = "" ; //"",
                        obj1listaPedJson.apeMatSolicitante = "" ; //"",
                        obj1listaPedJson.textoContacto = "" ; //"",
                        obj1listaPedJson.textoDatosAdicionalesCliente = "" ; //"",
                        obj1listaPedJson.textoTelefonos = "" ; //"",
                        obj1listaPedJson.textoDescripcionVisita = "" ; //"",
                        obj1listaPedJson.textoResultadoVisita = "" ; //"",
                        obj1listaPedJson.textoDescripcionServInstalacion = "" ; //"",


                        ////////////////////////////////////
                        obj1listaPedJson.datosCliente = { 

                                1 : "2" , //"1",
                                10 : "1" , //"1",
                                15 : "" , //"1",
                                20 : "10" , //"",
                                25 : "" , //"1",
                                35 : "15" ,  //"30",
                                CODIG : this.getView().byId("txt_dni_datosAdicionales").getValue() , //"87654321",
                                APPAT : this.getView().byId("txt_apellido_paterno_datosAdicionales").getValue() , //"apellidoPSoli",
                                APMAT : this.getView().byId("txt_apellido_materno_datosAdicionales").getValue() , //"apellidoMSoli",
                                NOMBRE : this.getView().byId("txt_nombre_datosAdicionales").getValue() , //"nombreSoli",
                                FECNAC : this.getView().byId("dt_fecha_nacimiento_datosAdicionales").getValue() , //"2013-06-20T11:00:00.000Z",
                                GRAINS : this.getView().byId("com_grado_instruccion_datosAdicionales").getSelectedKey() , //"10",
                                SEXO : this.getView().byId("com_sexo_datosAdicionales").getSelectedKey() , //"1",
                                CIUDAD : this.getView().byId("txt_edad_datosAdicionales").getValue() , //"140101",
                                EDAD : this.getView().byId("txt_edad_datosAdicionales").getValue() , //"4",
                                RANGOED : this.getView().byId("com_rango_edad_datosAdicionales").getSelectedKey() , //"1",
                                NIVELSE : "A" , //"A",
                                DIREC : this.getView().byId("txt_direccion_solicitante").getValue()  //"direSoli"},

                                };

                        //obj1listaPedJson.datosCliente;
                            ///////////////////////////////


                        obj1listaPedJson.listaPre = "" ; //"",
                        obj1listaPedJson.TotalDcto = 0 ; //0,
                        obj1listaPedJson.codProyecto = this.getView().byId("txt_codigoProyecto_proyectoVisita").getValue() ; //"codigoProyecto",
                        obj1listaPedJson.codVersion = this.getView().byId("txt_codigoVersion_proyectoVisita").getValue() ; //"1025",
                        obj1listaPedJson.GrupoForecast = this.getView().byId("com_grupoForecast_proyectoVisita").getSelectedKey() ; //"01",
                        obj1listaPedJson.TipoForecast = this.getView().byId("com_tipoForecast_proyectoVisita").getSelectedKey() ; //" ",
                        obj1listaPedJson.NoImpFac = "" ; //"",
                        obj1listaPedJson.Certificado = this.getView().byId("txt_nroCertificado_proyectoVisita").getValue() ; //"nroCertificado",
                        obj1listaPedJson.FechaVisita = this.getView().byId("date_fechaVisita_proyectoVisita").getDateValue() ; //"2017-08-01T05:00:00.000Z"}


                        

                        listaPedJson.push(obj1listaPedJson);

                        this.getView().getModel().setProperty("/listaPedJson", listaPedJson);

                        var listaPedJsonLleno = JSON.stringify(listaPedJson);


                        var self = this;


self.getView().byId("loadingControl").open();
setTimeout(function(){

                        var result = materialServices.recalcular(UserId,
                                                                PwdId,
                                                                Id,
                                                                GrpVend,
                                                                Descripcion,
                                                                CodigoVendedor,
                                                                OrgVentas,
                                                                CanalDist,
                                                                OfVentas,
                                                                dsctoLotes,
                                                                listaInterJsonLleno,
                                                                listaDsctoJsonLleno,
                                                                listaRepartosJsonLleno,
                                                                listaMatJsonLleno,
                                                                listaPedJsonLleno);

                            if (result.c === "s") {

                                if (result.data.success) {

                                    self.getView().getModel().setProperty("/RetornoRecalcular", result.data);
                                    self.getView().getModel().refresh();


                                    //////////////////Crear listaDsctoJson/////////////////////////////////////////////////

                                    
                                        var Dscto = self.getView().getModel().getProperty("/RetornoRecalcular/objPedido/Detalle");

                                    
                                    var retornoMaterial = self.getView().getModel().getProperty("/RetornoMaterial");
                                    
                                    

                                    var j = 1;
                                    for (var i = 0; i < retornoMaterial.length; i++) {

                                            
                                            var ZD00 = {

                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoDecorPorc.Posicion ,
                                                Condicion: Dscto[i].DctoDecorPorc.Condicion ,
                                                Importe: Dscto[i].DctoDecorPorc.Importe ,
                                                ImporteAnterior: Dscto[i].DctoDecorPorc.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoDecorPorc.Moneda ,
                                                Valor: Dscto[i].DctoDecorPorc.Valor ,
                                                Denominacion: Dscto[i].DctoDecorPorc.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoDecorPorc.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoDecorPorc.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoDecorPorc.Recalcular ,
                                            };

                                            j = j + 1 ;

                                            var ZD01 = {

                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoDecorMonto.Posicion ,
                                                Condicion: Dscto[i].DctoDecorMonto.Condicion ,
                                                Importe: Dscto[i].DctoDecorMonto.Importe ,
                                                ImporteAnterior: Dscto[i].DctoDecorMonto.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoDecorMonto.Moneda ,
                                                Valor: Dscto[i].DctoDecorMonto.Valor ,
                                                Denominacion: Dscto[i].DctoDecorMonto.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoDecorMonto.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoDecorMonto.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoDecorMonto.Recalcular ,
                                            };

                                            j = j + 1 ;

                                            var ZD02 = {

                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoAdicionalPorc.Posicion ,
                                                Condicion: Dscto[i].DctoAdicionalPorc.Condicion ,
                                                Importe: Dscto[i].DctoAdicionalPorc.Importe ,
                                                ImporteAnterior: Dscto[i].DctoAdicionalPorc.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoAdicionalPorc.Moneda ,
                                                Valor: Dscto[i].DctoAdicionalPorc.Valor ,
                                                Denominacion: Dscto[i].DctoAdicionalPorc.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoAdicionalPorc.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoAdicionalPorc.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoAdicionalPorc.Recalcular ,
                                            };

                                            j = j + 1 ;

                                            var ZD03 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoEstadisticoPorc.Posicion ,
                                                Condicion: Dscto[i].DctoEstadisticoPorc.Condicion ,
                                                Importe: Dscto[i].DctoEstadisticoPorc.Importe ,
                                                ImporteAnterior: Dscto[i].DctoEstadisticoPorc.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoEstadisticoPorc.Moneda ,
                                                Valor: Dscto[i].DctoEstadisticoPorc.Valor ,
                                                Denominacion: Dscto[i].DctoEstadisticoPorc.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoEstadisticoPorc.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoEstadisticoPorc.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoEstadisticoPorc.Recalcular ,
                                            };

                                            j = j + 1 ;


                                            var ZD04 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoGerenciaPorc.Posicion ,
                                                Condicion: Dscto[i].DctoGerenciaPorc.Condicion ,
                                                Importe: Dscto[i].DctoGerenciaPorc.Importe ,
                                                ImporteAnterior: Dscto[i].DctoGerenciaPorc.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoGerenciaPorc.Moneda ,
                                                Valor: Dscto[i].DctoGerenciaPorc.Valor ,
                                                Denominacion: Dscto[i].DctoGerenciaPorc.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoGerenciaPorc.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoGerenciaPorc.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoGerenciaPorc.Recalcular ,
                                            };

                                            j = j + 1 ;

                                            var ZD05 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoGerenciaMonto.Posicion ,
                                                Condicion: Dscto[i].DctoGerenciaMonto.Condicion ,
                                                Importe: Dscto[i].DctoGerenciaMonto.Importe ,
                                                ImporteAnterior: Dscto[i].DctoGerenciaMonto.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoGerenciaMonto.Moneda ,
                                                Valor: Dscto[i].DctoGerenciaMonto.Valor ,
                                                Denominacion: Dscto[i].DctoGerenciaMonto.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoGerenciaMonto.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoGerenciaMonto.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoGerenciaMonto.Recalcular ,
                                            };

                                            j = j + 1 ;

                                            var ZD06 = {



                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoZD06.Posicion ,
                                                Condicion: Dscto[i].DctoZD06.Condicion ,
                                                Importe: Dscto[i].DctoZD06.Importe ,
                                                ImporteAnterior: Dscto[i].DctoZD06.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoZD06.Moneda ,
                                                Valor: Dscto[i].DctoZD06.Valor ,
                                                Denominacion: Dscto[i].DctoZD06.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoZD06.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoZD06.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoZD06.Recalcular ,
                                            };

                                            j = j + 1 ;

                                            var ZD07 = {

                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoZD07.Posicion ,
                                                Condicion: Dscto[i].DctoZD07.Condicion ,
                                                Importe: Dscto[i].DctoZD07.Importe ,
                                                ImporteAnterior: Dscto[i].DctoZD07.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoZD07.Moneda ,
                                                Valor: Dscto[i].DctoZD07.Valor ,
                                                Denominacion: Dscto[i].DctoZD07.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoZD07.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoZD07.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoZD07.Recalcular ,
                                            };

                                            j = j + 1 ;


                                            var ZD08 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoGenericoZD08.Posicion ,
                                                Condicion: Dscto[i].DctoGenericoZD08.Condicion ,
                                                Importe: Dscto[i].DctoGenericoZD08.Importe ,
                                                ImporteAnterior: Dscto[i].DctoGenericoZD08.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoGenericoZD08.Moneda ,
                                                Valor: Dscto[i].DctoGenericoZD08.Valor ,
                                                Denominacion: Dscto[i].DctoGenericoZD08.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoGenericoZD08.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoGenericoZD08.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoGenericoZD08.Recalcular ,
                                            };

                                            j = j + 1 ;


                                            var ZD09 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoGenerico.Posicion ,
                                                Condicion: Dscto[i].DctoGenerico.Condicion ,
                                                Importe: Dscto[i].DctoGenerico.Importe ,
                                                ImporteAnterior: Dscto[i].DctoGenerico.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoGenerico.Moneda ,
                                                Valor: Dscto[i].DctoGenerico.Valor ,
                                                Denominacion: Dscto[i].DctoGenerico.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoGenerico.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoGenerico.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoGenerico.Recalcular ,
                                            };

                                            j = j + 1 ;


                                            var ZD11 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoZD11.Posicion ,
                                                Condicion: Dscto[i].DctoZD11.Condicion ,
                                                Importe: Dscto[i].DctoZD11.Importe ,
                                                ImporteAnterior: Dscto[i].DctoZD11.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoZD11.Moneda ,
                                                Valor: Dscto[i].DctoZD11.Valor ,
                                                Denominacion: Dscto[i].DctoZD11.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoZD11.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoZD11.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoZD11.Recalcular ,
                                            };

                                            j = j + 1 ;


                                            var ZD12 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DsctoAdicionalZD12.Posicion ,
                                                Condicion: Dscto[i].DsctoAdicionalZD12.Condicion ,
                                                Importe: Dscto[i].DsctoAdicionalZD12.Importe ,
                                                ImporteAnterior: Dscto[i].DsctoAdicionalZD12.ImporteAnterior ,
                                                Moneda: Dscto[i].DsctoAdicionalZD12.Moneda ,
                                                Valor: Dscto[i].DsctoAdicionalZD12.Valor ,
                                                Denominacion: Dscto[i].DsctoAdicionalZD12.Denominacion ,
                                                esPorcentaje: Dscto[i].DsctoAdicionalZD12.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DsctoAdicionalZD12.LimiteInferior ,
                                                Recalcular: Dscto[i].DsctoAdicionalZD12.Recalcular ,
                                            };


                                            j = j + 1 ;




                                            var ZP01 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].Diferencia.Posicion ,
                                                Condicion: Dscto[i].Diferencia.Condicion ,
                                                Importe: Dscto[i].Diferencia.Importe ,
                                                ImporteAnterior: Dscto[i].Diferencia.ImporteAnterior ,
                                                Moneda: Dscto[i].Diferencia.Moneda ,
                                                Valor: Dscto[i].Diferencia.Valor ,
                                                Denominacion: Dscto[i].Diferencia.Denominacion ,
                                                esPorcentaje: Dscto[i].Diferencia.esPorcentaje ,
                                                LimiteInferior: Dscto[i].Diferencia.LimiteInferior ,
                                                Recalcular: Dscto[i].Diferencia.Recalcular ,
                                            };

                                            j = j + 1 ;

                                            var ZP08 = {


                                                matPosicion: Dscto[i].PPosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].PreZP08.Posicion ,
                                                Condicion: Dscto[i].PreZP08.Condicion ,
                                                Importe: Dscto[i].PreZP08.Importe ,
                                                ImporteAnterior: Dscto[i].PreZP08.ImporteAnterior ,
                                                Moneda: Dscto[i].PreZP08.Moneda ,
                                                Valor: Dscto[i].PreZP08.Valor ,
                                                Denominacion: Dscto[i].PreZP08.Denominacion ,
                                                esPorcentaje: Dscto[i].PreZP08.esPorcentaje ,
                                                LimiteInferior: Dscto[i].PreZP08.LimiteInferior ,
                                                Recalcular: Dscto[i].PreZP08.Recalcular ,
                                            };


                                            j = j + 1 ;

                                            var ZD13 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DsctoAdicionalZD13.Posicion ,
                                                Condicion: Dscto[i].DsctoAdicionalZD13.Condicion ,
                                                Importe: Dscto[i].DsctoAdicionalZD13.Importe ,
                                                ImporteAnterior: Dscto[i].DsctoAdicionalZD13.ImporteAnterior ,
                                                Moneda: Dscto[i].DsctoAdicionalZD13.Moneda ,
                                                Valor: Dscto[i].DsctoAdicionalZD13.Valor ,
                                                Denominacion: Dscto[i].DsctoAdicionalZD13.Denominacion ,
                                                esPorcentaje: Dscto[i].DsctoAdicionalZD13.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DsctoAdicionalZD13.LimiteInferior ,
                                                Recalcular: Dscto[i].DsctoAdicionalZD13.Recalcular ,
                                            };
                                                

                                            j = j + 1 ;
                                            var ZDCT = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].DctoCT.Posicion ,
                                                Condicion: Dscto[i].DctoCT.Condicion ,
                                                Importe: Dscto[i].DctoCT.Importe ,
                                                ImporteAnterior: Dscto[i].DctoCT.ImporteAnterior ,
                                                Moneda: Dscto[i].DctoCT.Moneda ,
                                                Valor: Dscto[i].DctoCT.Valor ,
                                                Denominacion: Dscto[i].DctoCT.Denominacion ,
                                                esPorcentaje: Dscto[i].DctoCT.esPorcentaje ,
                                                LimiteInferior: Dscto[i].DctoCT.LimiteInferior ,
                                                Recalcular: Dscto[i].DctoCT.Recalcular ,
                                            };

                                            j = j + 1 ;


                                            var ZP00 = {


                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].Precio.Posicion ,
                                                Condicion: Dscto[i].Precio.Condicion ,
                                                Importe: Dscto[i].Precio.Importe ,
                                                ImporteAnterior: Dscto[i].Precio.ImporteAnterior ,
                                                Moneda: Dscto[i].Precio.Moneda ,
                                                Valor: Dscto[i].Precio.Valor ,
                                                Denominacion: Dscto[i].Precio.Denominacion ,
                                                esPorcentaje: Dscto[i].Precio.esPorcentaje ,
                                                LimiteInferior: Dscto[i].Precio.LimiteInferior ,
                                                Recalcular: Dscto[i].Precio.Recalcular ,
                                            };

                                            j = j + 1 ;

                                            var ZP02 = {

                                                matPosicion: retornoMaterial[i].lstTotal[0].PosicionCorto ,
                                                id: j ,
                                                Posicion: Dscto[i].ZP02.Posicion ,
                                                Condicion: Dscto[i].ZP02.Condicion ,
                                                Importe: Dscto[i].ZP02.Importe ,
                                                ImporteAnterior: Dscto[i].ZP02.ImporteAnterior ,
                                                Moneda: Dscto[i].ZP02.Moneda ,
                                                Valor: Dscto[i].ZP02.Valor ,
                                                Denominacion: Dscto[i].ZP02.Denominacion ,
                                                esPorcentaje: Dscto[i].ZP02.esPorcentaje ,
                                                LimiteInferior: Dscto[i].ZP02.LimiteInferior ,
                                                Recalcular: Dscto[i].ZP02.Recalcular ,
                                            
                                                };         

                                            j = j + 1 ;



                                            

                                            var dsctoRetornoRecalcular =  self.getView().getModel().getProperty("/dsctoRetornoRecalcular");

                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD00);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD01);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD02);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD03);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD04);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD05);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD06);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD07);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD08);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD09);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD11);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD12);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZP01);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZP08);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD13);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZDCT);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZP00);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZP02);

                                            
                                                
                                                if(dsctoRetornoRecalcular){
                                                    dsctoRetornoRecalcular.push(ZD00);
                                                    dsctoRetornoRecalcular.push(ZD01);
                                                    dsctoRetornoRecalcular.push(ZD02);
                                                    dsctoRetornoRecalcular.push(ZD03);
                                                    dsctoRetornoRecalcular.push(ZD04);
                                                    dsctoRetornoRecalcular.push(ZD05);
                                                    dsctoRetornoRecalcular.push(ZD06);
                                                    dsctoRetornoRecalcular.push(ZD07);
                                                    dsctoRetornoRecalcular.push(ZD08);
                                                    dsctoRetornoRecalcular.push(ZD09);
                                                    dsctoRetornoRecalcular.push(ZD11);
                                                    dsctoRetornoRecalcular.push(ZD12);
                                                    dsctoRetornoRecalcular.push(ZP01);
                                                    dsctoRetornoRecalcular.push(ZP08);
                                                    dsctoRetornoRecalcular.push(ZD13);
                                                    dsctoRetornoRecalcular.push(ZDCT);
                                                    dsctoRetornoRecalcular.push(ZP00);
                                                    dsctoRetornoRecalcular.push(ZP02);


                                                }else{
                                                    
                                                    dsctoRetornoRecalcular = [];
                                                    dsctoRetornoRecalcular.push(ZD00);
                                                    dsctoRetornoRecalcular.push(ZD01);
                                                    dsctoRetornoRecalcular.push(ZD02);
                                                    dsctoRetornoRecalcular.push(ZD03);
                                                    dsctoRetornoRecalcular.push(ZD04);
                                                    dsctoRetornoRecalcular.push(ZD05);
                                                    dsctoRetornoRecalcular.push(ZD06);
                                                    dsctoRetornoRecalcular.push(ZD07);
                                                    dsctoRetornoRecalcular.push(ZD08);
                                                    dsctoRetornoRecalcular.push(ZD09);
                                                    dsctoRetornoRecalcular.push(ZD11);
                                                    dsctoRetornoRecalcular.push(ZD12);
                                                    dsctoRetornoRecalcular.push(ZP01);
                                                    dsctoRetornoRecalcular.push(ZP08);
                                                    dsctoRetornoRecalcular.push(ZD13);
                                                    dsctoRetornoRecalcular.push(ZDCT);
                                                    dsctoRetornoRecalcular.push(ZP00);
                                                    dsctoRetornoRecalcular.push(ZP02);
                                                    
                                                }

                                                self.getView().getModel().setProperty("/dsctoRetornoRecalcular", dsctoRetornoRecalcular);
                                                self.getView().getModel().refresh();
  
                                    }


                                     var dsctoRetornoRecalcularLleno = JSON.stringify(self.getView().getModel().getProperty("/dsctoRetornoRecalcular"));

                                     console.log(dsctoRetornoRecalcularLleno);


                                    ///////////////////////////////////////////////////////////////////////////////////////
                                   /*
                                    var Dscto = self.getView().getModel().getProperty("/RetornoRecalcular/objPedido/Detalle");

                                    
                                    var retornoMaterial = self.getView().getModel().getProperty("/RetornoMaterial");
                                    console.log(retornoMaterial.length);

                                    var j = 1;
                                    for (var i = 0; i < retornoMaterial.length; i++) {
                                            
                                            
                                            var ZD00 = Dscto[i].DctoDecorPorc  ;//ZD00
                                                ZD00.id = j ;
                                                j = j + 1 ;
                                                
                                            var ZD01 = Dscto[i].DctoDecorMonto ;//ZD01
                                                ZD01.id = j ;
                                                j = j + 1 ;

                                            var ZD02 = Dscto[i].DctoAdicionalPorc ; //ZD02
                                                ZD02.id = j ;
                                                j = j + 1 ;

                                            var ZD03 = Dscto[i].DctoEstadisticoPorc ;//ZD03
                                                ZD03.id = j ;
                                                j = j + 1 ;

                                            var ZD04 = Dscto[i].DctoGerenciaPorc ;//ZD04
                                                ZD04.id = j ;
                                                j = j + 1 ;

                                            var ZD05 = Dscto[i].DctoGerenciaMonto ;//ZD05
                                                ZD05.id = j ;
                                                j = j + 1 ;

                                            var ZD06 = Dscto[i].DctoZD06 ;//ZD06
                                                ZD06.id = j ;
                                                j = j + 1 ;

                                            var ZD07 = Dscto[i].DctoZD07 ;//ZD07
                                                ZD07.id = j ;
                                                j = j + 1 ;

                                            var ZD08 = Dscto[i].DctoGenericoZD08 ;//ZD08
                                                ZD08.id = j ;
                                                j = j + 1 ;

                                            var ZD09 = Dscto[i].DctoGenerico ;//ZD09
                                                ZD09.id = j ;
                                                j = j + 1 ;

                                            var ZD11 = Dscto[i].DctoZD11 ;//ZD11
                                                ZD11.id = j ;
                                                j = j + 1 ;

                                            var ZD12 = Dscto[i].DsctoAdicionalZD12 ;//ZD12
                                                ZD12.id = j ;
                                                j = j + 1 ;

                                            var ZP01 = Dscto[i].Diferencia ;//ZP01
                                                ZP01.id = j ;
                                                j = j + 1 ;

                                            var ZP08 = Dscto[i].PreZP08 ;//ZP08
                                                ZP08.id = j ;
                                                j = j + 1 ;

                                            var ZD13 = Dscto[i].DsctoAdicionalZD13 ;//ZD13
                                                ZD13.id = j ;
                                                j = j + 1 ;

                                            var ZDCT = Dscto[i].DctoCT ; //ZDCT
                                                ZDCT.id = j ;
                                                j = j + 1 ;

                                            var ZP00 = Dscto[i].Precio ;//ZP00
                                                ZP00.id = j ;
                                                j = j + 1 ;

                                            var ZP02 = Dscto[i].ZP02 ;//ZP02
                                                ZP02.id = j ;
                                                j = j + 1 ;

                                            var dsctoRetornoRecalcular =  self.getView().getModel().getProperty("/dsctoRetornoRecalcular");

                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD00);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD01);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD02);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD03);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD04);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD05);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD06);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD07);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD08);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD09);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD11);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD12);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZP01);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZP08);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZD13);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZDCT);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZP00);
                                            self.getView().getModel().setProperty("/dsctoRetornoRecalcular", ZP02);

                                            
                                                
                                                if(dsctoRetornoRecalcular){
                                                    dsctoRetornoRecalcular.push(ZD00);
                                                    dsctoRetornoRecalcular.push(ZD01);
                                                    dsctoRetornoRecalcular.push(ZD02);
                                                    dsctoRetornoRecalcular.push(ZD03);
                                                    dsctoRetornoRecalcular.push(ZD04);
                                                    dsctoRetornoRecalcular.push(ZD05);
                                                    dsctoRetornoRecalcular.push(ZD06);
                                                    dsctoRetornoRecalcular.push(ZD07);
                                                    dsctoRetornoRecalcular.push(ZD08);
                                                    dsctoRetornoRecalcular.push(ZD09);
                                                    dsctoRetornoRecalcular.push(ZD11);
                                                    dsctoRetornoRecalcular.push(ZD12);
                                                    dsctoRetornoRecalcular.push(ZP01);
                                                    dsctoRetornoRecalcular.push(ZP08);
                                                    dsctoRetornoRecalcular.push(ZD13);
                                                    dsctoRetornoRecalcular.push(ZDCT);
                                                    dsctoRetornoRecalcular.push(ZP00);
                                                    dsctoRetornoRecalcular.push(ZP02);


                                                }else{
                                                    
                                                    dsctoRetornoRecalcular = [];
                                                    dsctoRetornoRecalcular.push(ZD00);
                                                    dsctoRetornoRecalcular.push(ZD01);
                                                    dsctoRetornoRecalcular.push(ZD02);
                                                    dsctoRetornoRecalcular.push(ZD03);
                                                    dsctoRetornoRecalcular.push(ZD04);
                                                    dsctoRetornoRecalcular.push(ZD05);
                                                    dsctoRetornoRecalcular.push(ZD06);
                                                    dsctoRetornoRecalcular.push(ZD07);
                                                    dsctoRetornoRecalcular.push(ZD08);
                                                    dsctoRetornoRecalcular.push(ZD09);
                                                    dsctoRetornoRecalcular.push(ZD11);
                                                    dsctoRetornoRecalcular.push(ZD12);
                                                    dsctoRetornoRecalcular.push(ZP01);
                                                    dsctoRetornoRecalcular.push(ZP08);
                                                    dsctoRetornoRecalcular.push(ZD13);
                                                    dsctoRetornoRecalcular.push(ZDCT);
                                                    dsctoRetornoRecalcular.push(ZP00);
                                                    dsctoRetornoRecalcular.push(ZP02);
                                                    
                                                }

                                                self.getView().getModel().setProperty("/dsctoRetornoRecalcular", dsctoRetornoRecalcular);
                                                self.getView().getModel().refresh();
  
                                    }

                                        var dsctoRetornoRecalcularLleno = JSON.stringify(self.getView().getModel().getProperty("/dsctoRetornoRecalcular"));

                                     console.log(dsctoRetornoRecalcularLleno);
                                    *//////////////////////////////////////////////////////////////
                                    


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

                                self.getView().byId("loadingControl").close();
},1000);


           }else{
            MessageToast.show("Debe añadir al menos un Material");
           }
        },
        

        onEliminarMaterial:function(){

            var currentItem = this.getView().byId("list_listaMasterMateriales").getSelectedItem();
            var currentIndex = this.getView().byId("list_listaMasterMateriales").indexOfItem(currentItem);
            var array = this.getView().getModel().getProperty("/listaMatAnadido");
            _.remove(array, function(item,indexRemove) {

              return currentIndex == indexRemove;
            });
            
            this.getView().getModel().setProperty("/listaMatAnadido",array);
            this.getView().getModel().refresh();

            console.log(array);
        }



            
    });

});        