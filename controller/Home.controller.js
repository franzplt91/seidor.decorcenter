sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "pe/com/seidor/sap/decor/ventas/util/utilString",
    "pe/com/seidor/sap/decor/ventas/services/QuejaServices",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/imprimirServices",
    "sap/m/MessageToast"
], function (Controller,  UIComponent, utilString, QuejaServices, JSONModel,imprimirServices,MessageToast) {

        "use strict";

        return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Home", {
            onInit: function () {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.attachRoutePatternMatched(this.onRouteMatched, this);

            },

            onRouteMatched: function (oEvent) {

              utilString.prepareDataIni();

                var oData = {

                        datosQueja: {
                            "NumQueja": "" ,
                            "CodCli": "" ,
                            "NomCliente": "" ,
                            "Calles": "" ,
                            "Ubicacion": "" ,
                            "Telefono": "" ,
                            "OfiVenta": "" ,
                            "TextoQueja": "",
                            "ADRNR": "",
                            "pNumeroReclamo": "" ,
                            "pCodigoCliente": "" ,
                            "pFechaCreacionI": "" ,
                            "pFechaCreacionF": "" ,
                        },

                        imprimirDoc:{
                            "pNumPedido":"",
                            "tipoImpresion":"0",
                            "accion":"ver"
                        },

                        imprimirRec:{
                            "pNumeroReclamo":""
                        },

                        imprimirQue:{
                            "pNumeroQueja":"",
                            "accion": "verbusqueja"
                        }


                 };
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni",window.dataIni);
                this.getView().getModel().refresh(true);   
            },

            //Documentos----------------------
            goDocNuevo: function (oEvent){

                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){




               // sap.ui.core.BusyIndicator.show();
               ///////////////////////////////////////////////
               window.IsDocNuevo = true;
               ///////////////////////////////////////////////
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);                
                oRouter.navTo("appDocNuevo");

                self.getView().byId("loadingControl").close();
                },100);

            },
            goDocModificar: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocModificar");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goDocVisualizar: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocVisualizar");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goDocBuscar: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocBuscar");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goDocInstalacion: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocInstalacion");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goDocFlujo: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocFlujo");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goDocImprimir:function(){

                this.getView().byId("dlg_doc_impresion").open();
            },
            onCloseDocImprimir:function(){
                this.getView().byId("dlg_doc_impresion").close();
            },


            //Stock------------------------------

            goStockDisponible: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                ///////////////////////////////////77777
                window.IsDocNuevo = false;
                ////////////////////////////////////////
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocNuevo");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goStockporLlegar: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appStockporLlegar");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goStockporPedir: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appStockporPedir");
                self.getView().byId("loadingControl").close();
                },100);
            },


            //Reclamos----------------------------

            goRecNuevo: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecNuevo");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goRecModificar: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecModificar");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goRecVisualizar: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecVisualizar");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goRecBuscar: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecBuscar");
                self.getView().byId("loadingControl").close();
                },100);
            },
            goRecImprimir:function(){

                this.getView().byId("dlg_rec_impresion").open();
            },
            onCloseRecImprimir:function(){
                this.getView().byId("dlg_rec_impresion").close();
            },



            //Quejas------------------------------
            goQueNuevo: function(oEvent){
                this.getView().byId("dlg_QueNuevo").open();
            },
            onCloseDlg_QueNuevo:function(){
            this.getView().byId("dlg_QueNuevo").close();
            },



            goQueModificar: function(oEvent){
               this.getView().byId("dlg_QueModificar").open();
            },
            onCloseDlg_QueModificar:function(){
            this.getView().byId("dlg_QueModificar").close();
            },



            goQueVisualizar: function(oEvent){
                this.getView().byId("dlg_QueVisualizar").open();
            },
            onCloseDlg_QueVisualizar:function(){
            this.getView().byId("dlg_QueVisualizar").close();
            this.getView().byId("dlg_QueBuscar").close();
            this.getView().byId("dlg_QueBuscarLista").close();

            },



            goQueBuscar: function(oEvent){
                this.getView().byId("dlg_QueBuscar").open();
            },
            onCloseDlg_QueBuscar:function(){
            this.getView().byId("dlg_QueBuscar").close();
            },
            onOpenDlg_QueBuscarLista:function(){
                this.getView().byId("dlg_QueBuscarLista").open();
            },
            onCloseDlg_QueBuscarLista:function(){
                this.getView().byId("dlg_QueBuscarLista").close();
            },


            goQueImprimir:function(){
                this.getView().byId("dlg_que_impresion").open();
            },

            onCloseQueImprimir:function(){
                this.getView().byId("dlg_que_impresion").close();
            },


            //Usuario-----------------------------

            goUsuInformacion: function(oEvent){
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appUsuInformacion");
                self.getView().byId("loadingControl").close();
                },100);
            },
            
            
            
            
            ///////////////Imprimir/////////////////////////////////////////////////////////


            //////////Imprimir Documento/////////////////////////////////////////

            onImprimirDoc:function(){
                var imprimirDoc = this.getView().getModel().getProperty("/imprimirDoc"); 
                var result = imprimirServices.imprimirDocumento(imprimirDoc);

                var self = this;
                self.getView().byId("loadingControl").open();
                            setTimeout(function(){

                            if (result.c === "s") {

                                if (result.data.success) {

                                    self.getView().getModel().setProperty("/retornoImprimirDoc",result.data);
                                    self.getView().getModel().refresh();


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
                            },500);
            },

            ////////////////////////////////////////////////////////////////////

            //////////Imprimir Reclamo/////////////////////////////////////////

            onImprimirRec:function(){
                var imprimirRec = this.getView().getModel().getProperty("/imprimirRec"); 
                var result = imprimirServices.imprimirReclamo(imprimirRec);
                var self = this;
                self.getView().byId("loadingControl").open();
                            setTimeout(function(){

                            if (result.c === "s") {

                                if (result.data.success) {
                                    self.getView().getModel().setProperty("/retornoImprimirRec",result.data);
                                    self.getView().getModel().refresh();


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
                            },500);

            },

            ////////////////////////////////////////////////////////////////////

            //////////Imprimir Queja/////////////////////////////////////////

            onImprimirQue:function(){
                var imprimirQue = this.getView().getModel().getProperty("/imprimirQue"); 
                var result = imprimirServices.imprimirQueja(imprimirQue);
                var self = this;
                self.getView().byId("loadingControl").open();
                            setTimeout(function(){

                            if (result.c === "s") {

                                if (result.data.success) {
                                    self.getView().getModel().setProperty("/retornoImprimirRec",result.data);
                                    self.getView().getModel().refresh();


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
                            },500);

            },

            ////////////////////////////////////////////////////////////////////


            ////////////////////////////////////////////////////////////////////////////////
            
            
            
            
            /////////Buscar Cliente en Nueva Queja/////////////////////////
            onBuscarCliQueja:function(){

                var buscarCliQueja = this.getView().getModel().getProperty("/datosQueja");
                var result = QuejaServices.buscarCliQueja(buscarCliQueja);

                var self = this;


                            self.getView().byId("loadingControl").open();
                            setTimeout(function(){



                            if (result.c === "s") {

                                if (result.data.success) {

                                    var apellidoPat = result.data.objCliente.APPAT ;
                                    var apellidoMat = result.data.objCliente.APMAT ;
                                    var nombre = result.data.objCliente.NOMBRE ;

                                    buscarCliQueja.NomCliente = apellidoPat+" "+apellidoMat+" "+nombre ;
                                    buscarCliQueja.Calles = result.data.objCliente.DIREC ;
                                    buscarCliQueja.Ubicacion = result.data.objCliente.Ciudad ;
                                    buscarCliQueja.Telefono = result.data.objCliente.Telefono ;
                                    //buscarCliQueja.OfiVenta = self.getView().getModel().getProperty("/RetornoBuscarCliQueja");
                                    //buscarCliQueja.TextoQueja = self.getView().getModel().getProperty("/RetornoBuscarCliQueja");

                                    self.getView().getModel().refresh();

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
                            },500);

            },
            
            
            onGuardarQueja:function(){


                var self = this;


                        self.getView().byId("loadingControl").open();
                        setTimeout(function(){
                
                if(self.getView().byId("txt_ruc_nuevaQueja").getValue()==""){
                    MessageToast.show("Ingrese RUC o DNI");
                }else{

                    if(self.getView().byId("txt_descripcion_nuevaQueja").getValue()==""){
                    MessageToast.show("Ingrese Nombre o Descripción");
                    }else{

                        if(self.getView().byId("txt_calle_nuevaQueja").getValue()==""){
                    MessageToast.show("Ingresar Calle");
                    }else{

                            if(self.getView().byId("txt_ubicacion_nuevaQueja").getValue()==""){
                    MessageToast.show("Ingresar Ubicación o Distrito");
                    }else{

                            if(self.getView().byId("txt_telefono_nuevaQueja").getValue()==""){
                    MessageToast.show("Ingresar Teléfono");
                    }else{

                            if(self.getView().byId("com_ofVentas_nuevaQueja").getSelectedKey()==""){
                    MessageToast.show("Ingresar Oficina de Ventas");
                    }else{

                        if(self.getView().byId("txtArea_motivo_nuevaQueja").getValue()==""){
                    MessageToast.show("Ingresar Motivo de Queja");
                    }else{

                    var nuevoQueja = self.getView().getModel().getProperty("/datosQueja");
                var result = QuejaServices.guardarQueja(nuevoQueja);


                                                    if (result.c === "s") {

                                                        if (result.data.success) {
                                                            var reclamo = result.data.mensaje ;

                                                            var queja = reclamo.replace("El reclamo", "Queja").replace(/:/g, '');

                                                            self.getView().getModel().setProperty("/MensajeCorrecto",queja);

                                                            self.getView().byId("txt_aviso_general").bindProperty("text",{path:"/MensajeCorrecto"} );
                                                            self.getView().getModel().refresh(); 
                                                            self.getView().byId("dlg_MensajeAvisoGeneral").open();

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

                                                   


                    }

                    }
                    }
                    }
                    }

                    }


                }

                
                 self.getView().byId("loadingControl").close();
                        },500);

                
            },

            onBuscarQueja:function(){
                
                

                var buscarQueja = this.getView().getModel().getProperty("/datosQueja");
                var result = QuejaServices.buscarQueja(buscarQueja);

                var self = this;


                self.getView().byId("loadingControl").open();
                setTimeout(function(){





                            if (result.c === "s") {

                                if (result.data.success) {


                                    buscarQueja.CodCli = result.data.objqueja.Contactos.KUNNR ;
                                    buscarQueja.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE ;
                                    buscarQueja.Calles = result.data.objqueja.Interlocutor[0].Calle ;
                                    buscarQueja.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad ;
                                    buscarQueja.Telefono = result.data.objqueja.Interlocutor[0].Telefono ;
                                    buscarQueja.OfiVenta  = result.data.objqueja.Contactos.VKBUR ;

                                    var texto = result.data.objqueja.Texto ;  

                                    buscarQueja.TextoQueja  = texto[1].Descripcion ;



                                    ///////////////////////////////////////
                                    buscarQueja.ADRNR = result.data.objqueja.Interlocutor[0].ADRNR ;
                                    ////////////////////////////////////////
                                    self.getView().getModel().refresh();

                                            



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
                            },500);

            },

            onOkDlg_MensajeAvisoGeneral:function(){
                this.getView().byId("dlg_MensajeAvisoGeneral").close();
                this.getView().byId("dlg_QueNuevo").close();
                this.getView().byId("dlg_QueModificar").close();
            },

            onModificarQueja:function(){


                var modificarQueja = this.getView().getModel().getProperty("/datosQueja");
                var result = QuejaServices.modificarQueja(modificarQueja);

                var self = this;


                    self.getView().byId("loadingControl").open();
                    setTimeout(function(){





                            if (result.c === "s") {

                                if (result.data.success) {


                                    var reclamo = result.data.mensaje ;

                                    var queja = reclamo.replace("Reclamo", "Queja").replace(/:/g, '');

                                    self.getView().getModel().setProperty("/MensajeCorrecto",queja);

                                    self.getView().byId("txt_aviso_general").bindProperty("text",{path:"/MensajeCorrecto"} );
                                    self.getView().getModel().refresh(); 
                                    self.getView().byId("dlg_MensajeAvisoGeneral").open();


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
},500);

            },


            onBuscarListaQueja:function(){

                this.getView().byId("dlg_QueBuscarLista").open();

                var buscarListaQueja = this.getView().getModel().getProperty("/datosQueja");

                var self = this;


                self.getView().byId("loadingControl").open();
                setTimeout(function(){





                var result = QuejaServices.buscarListaQueja(buscarListaQueja);

                            if (result.c === "s") {

                                if (result.data.success) {

                                    self.getView().getModel().setProperty("/RetornoBuscarListaQueja",result.data);
                                    self.getView().getModel().refresh();
                                            


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
},500);


            },

            onListaBuscarQueja:function(evt){
                   var itemLista = evt.getSource().getSelectedItem().getBindingContext().getObject();

                   console.log(itemLista);

                   this.getView().getModel().setProperty("/QuejaSeleccionado", itemLista);


            },

            


            verQuejaSeleccionado:function(){


                var quejaSeleccionado = this.getView().getModel().getProperty("/QuejaSeleccionado");

            if(quejaSeleccionado){
                
                var verQuejaSeleccionado = this.getView().getModel().getProperty("/datosQueja");

                verQuejaSeleccionado.NumQueja = quejaSeleccionado.VBELN ;
                var result = QuejaServices.verQuejaSeleccionado(verQuejaSeleccionado);


                    var self = this;


                    self.getView().byId("loadingControl").open();
                    setTimeout(function(){






                            if (result.c === "s") {

                                if (result.data.success) {
                                            
                                    var interlocutor = result.data.objqueja.Interlocutor ;
                                    verQuejaSeleccionado.CodCli = result.data.objqueja.Contactos.KUNNR ;
                                    verQuejaSeleccionado.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE ;
                                    verQuejaSeleccionado.Calles = result.data.objqueja.Interlocutor[0].Calle ;
                                    verQuejaSeleccionado.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad ; //CodPostal
                                    verQuejaSeleccionado.Telefono = result.data.objqueja.Interlocutor[0].Telefono ;
                                    verQuejaSeleccionado.OfiVenta = result.data.objqueja.Contactos.VKBUR ;

                                    var tamanoListTexto = result.data.objqueja.Texto.length - 1 ;
                                    
                                    var Texto = result.data.objqueja.Texto ;
                                    verQuejaSeleccionado.TextoQueja = Texto[tamanoListTexto].Descripcion ;

                                    self.getView().getModel().refresh();
                                    self.getView().byId("dlg_QueVisualizar").open();


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

                            self.getView().getModel().setProperty("/QuejaSeleccionado",null);

                            self.getView().byId("loadingControl").close();
                            },500);

            }else{
                MessageToast.show("Seleccione una Queja");
            }

                
                


            },


            onVerBuscarQueja:function(){

                var verBuscarQueja = this.getView().getModel().getProperty("/datosQueja");

                var result = QuejaServices.verBuscarQueja(verBuscarQueja);

                var self = this;


                self.getView().byId("loadingControl").open();
                setTimeout(function(){




                            if (result.c === "s") {

                                if (result.data.success) {


                                    verBuscarQueja.NumQueja = result.data.objqueja.Contactos.VBELN ;
                                    verBuscarQueja.CodCli = result.data.objqueja.Contactos.KUNNR  ;
                                    verBuscarQueja.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE ;
                                    verBuscarQueja.Calles = result.data.objqueja.Interlocutor[0].Calle ;
                                    verBuscarQueja.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad ;
                                    verBuscarQueja.Telefono = result.data.objqueja.Interlocutor[0].Telefono ;
                                    verBuscarQueja.OfiVenta = result.data.objqueja.Contactos.VKBUR ;
                                    
                                    var tamanoListTexto = result.data.objqueja.Texto.length - 1 ;
                                    
                                    verBuscarQueja.TextoQueja = result.data.objqueja.Texto[tamanoListTexto].Descripcion ;
                                    console.log(verBuscarQueja.TextoQueja);             
                                    self.getView().getModel().refresh();          


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
                            },500);



            }



        });
    });