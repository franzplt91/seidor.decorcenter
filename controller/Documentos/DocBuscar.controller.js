sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/documentosServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery,documentosServices) {
    "use strict";

    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocBuscar", {

        onInit: function () {

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            

            var oData = {

                        datosBuscarDoc: {
                            "tipoBusqueda": "1" ,
                            "datoBusqueda": "" ,
                            "nMaterial": "" ,
                            "claseDoc": " " , 
                            "fechaInicio": "" , //2017-07-10T20:57:43.311Z
                            "fechaFin": "", //2017-07-10T20:57:43.311Z
                            "codAsesor": window.dataIni.person.PerNr , //00001802


                            "fecInicio1": "" , //2017-07-10
                            "fecFin1": "" ,//2017-07-10

                            "Detalle": [],

                            "NumeroPedido": ""
                        },


                 };


            if (oEvent.getParameter("name") == "appDocBuscar") {
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_DialogDocBuscar").open();
            }
            ;

            //INICIO EDELACRUZ: 
            //Valores Dialog "Buscar Documento"(dlg_DialogDocBuscarInicio.xml)
            //Combo campo: "tipo de busqueda"
            var listaTipoDoc = [];

            var objTipoDoc0 = {
                Codigo: "1",
                Descripcion: "Número de Pedido"
            };
            var objTipoDoc1 = {
                Codigo: "2",
                Descripcion: "Número de Factura"
            };
            var objTipoDoc2 = {
                Codigo: "3",
                Descripcion: "Nombre de Cliente"
            };
            var objTipoDoc3 = {
                Codigo: "4",
                Descripcion: "RUC / DNI"
            };
            var objTipoDoc4 = {
                Codigo: "5",
                Descripcion: "Código de Cliente"
            };
            var objTipoDoc5 = {
                Codigo: "6",
                Descripcion: "Nombre de material"
            };
            var objTipoDoc6 = {
                Codigo: "7",
                Descripcion: "Material"
            };

            listaTipoDoc.push(objTipoDoc0);
            listaTipoDoc.push(objTipoDoc1);
            listaTipoDoc.push(objTipoDoc2);
            listaTipoDoc.push(objTipoDoc3);
            listaTipoDoc.push(objTipoDoc4);
            listaTipoDoc.push(objTipoDoc5);
            listaTipoDoc.push(objTipoDoc6);
            //FIN EDELACRUZ 


            this.getView().getModel().setProperty("/dataIni", window.dataIni) ;
            this.getView().getModel().setProperty("/modelTipoBusq", listaTipoDoc);
            this.getView().getModel().refresh();
        },

        //Buscar en Dialgo Buscar
        onBuscarDlg_DialogDocBuscar: function (oEvent) {


            var buscarDoc = this.getView().getModel().getProperty("/datosBuscarDoc"); 
                var result = documentosServices.buscarDocumento(buscarDoc);
                var self = this;
                self.getView().byId("loadingControl").open();
                            setTimeout(function(){

                            if (result.c === "s") {

                                if (result.data.success) {
                                    self.getView().getModel().setProperty("/retornoBuscarDoc",result.data);
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




            this.getView().byId("dlg_DialogDocBuscar").close();
            this.getView().byId("dlg_DocBuscarLista").open();
        },


        onListaBuscarDoc:function(evt){
            var docSeleccionado = evt.getSource().getSelectedItem().getBindingContext().getObject();

            console.log(docSeleccionado);
            
            this.getView().getModel().setProperty("/datosBuscarDoc/Detalle", docSeleccionado.Detalle) ;
            this.getView().getModel().setProperty("/datosBuscarDoc/NumeroPedido", docSeleccionado.NumeroPedido) ;

            this.getView().byId("dlg_DocBuscarLista").close();
        },



        onListaDetalleDoc:function(evt){

            var docSeleccionado = evt.getSource().getSelectedItem().getBindingContext().getObject();
            window.numeroDocumeto = docSeleccionado.DocumentoVenta;
        },

        onBtnFlujo:function(){
            var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function(){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocFlujo");
                self.getView().byId("loadingControl").close();
                },100);
        },


        


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////



        

    });

});



