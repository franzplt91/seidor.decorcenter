sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery) {
    "use strict";

    //var _timeout;
    //var itemLleno = [];
    
    
    var prueba;
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocNuevo", {

        onInit: function () {

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);

            this.getView().setModel(new JSONModel({}));
            this.getView().getModel().setProperty("/dataIni", window.dataIni);
            this.getView().getModel().refresh(true);



        },
        onRouteMatched: function (oEvent) {


            if (oEvent.getParameter("name") == "appDocNuevo") {
                this.getView().byId("dlg_DocNuevo").open();
            }
            ;
        },

        //Cerrar Dialog Doc Nuevo Inicio
        onCloseDialog: function (oEvent) {
            this.getView().byId("dlg_DocNuevo").close()
        },

        onAfterRendering: function () {

            var self = this;
            console.log(self);
            /*setTimeout(function(){
             self.getView().byId("dlg_DocNuevo").open();
             },1000); */

            var oSplitCont = this.getSplitContObj(),
                    ref = oSplitCont.getDomRef() && oSplitCont.getDomRef().parentNode;
            // set all parent elements to 100% height, this should be done by app developer, but just in case
            if (ref && !ref._sapui5_heightFixed) {
                ref._sapui5_heightFixed = true;
                while (ref && ref !== document.documentElement) {
                    var $ref = jQuery(ref);
                    if ($ref.attr("data-sap-ui-root-content")) { // Shell as parent does this already
                        break;
                    }
                    if (!ref.style.height) {
                        ref.style.height = "100%";
                    }
                    ref = ref.parentNode;
                }
            }
        },

        /*
         
         onOpenDialog: function (oEvent) {
         // instantiate dialog
         
         },
         
         onDialogClosed: function (oEvent) {
         jQuery.sap.clearDelayedCall(_timeout);
         
         if (oEvent.getParameter("cancelPressed")) {
         MessageToast.show("The operation has been cancelled");
         } else {
         MessageToast.show("The operation has been completed");
         }
         },
         
         
         
         */




        getSplitContObj: function () {
            var result = this.byId("SplitAppId");
            if (!result) {
                jQuery.sap.log.error("SplitApp object can't be found");
            }
            return result;
        },

        onShowHello: function () {

            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);

            // show message
            MessageToast.show(sMsg);
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
            this.getSplitContObj().backMaster();
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
            this.getSplitContObj().toMaster(this.createId("MasterDocNuevoDatos"));
            this.getSplitContObj().to(this.createId("pagDocNuevo_datos_detail1"))



        },

        //Boton Master Producto
        onDocNuevoMasterProductos: function (oEvent) {
            this.getSplitContObj().toMaster(this.createId("MasterDocNuevoProductos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"))

        },

        //Lista de Master Datos
        onDocNuevoListMasterDatos: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.getSplitContObj().toDetail(this.createId(sToPageId));
        },

        //Lista de Master Productos
        onDocNuevoListMasterProductos: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.getSplitContObj().toDetail(this.createId(sToPageId));
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




            var sToPageId = evt.getParameter("listItem").getCustomData()[0].getValue();
            this.getSplitContObj().toDetail(this.createId(sToPageId));

            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
            this.getView().byId("dlg_DocNuevobuscarCliente").close();

            this.getSplitContObj().toMaster(this.createId("MasterDocNuevoProductosBuscarCliente"));
            this.getSplitContObj().to(this.createId("pagDocNuevo_cliente_buscado"));

            console.log(obj.codigo);
        },

        //Al presionar en la Lista de los Clientes Buscados
        onDocNuevoListBuscarCliente: function () {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.getSplitContObj().toDetail(this.createId(sToPageId));
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
            
            if(prueba=" "){
                this.getView().byId("dlg_DocNuevoaddProductoonDialog").open();
            }
            else{
                MessageToast.show("No ha seleccionado material");
            }
            
        },

        onListaMateriales: function(evt){
            MessageToast.show("Pressed : " + evt.getSource().getTitle());
            prueba = evt.getSource().getTitle();
            console.log(evt.getSource().getTitle());
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
            this.getView().byId("dlg_DocNuevobuscar").close();
            this.getView().byId("dlg_BuscarMateriales").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();

            this.getView().byId("dlg_MensajeAviso1").close();
        },

        onDocNuevoMasterProductosAddonDialog: function (evt) {
            
            this.getView().byId("dlg_MensajeAviso1").open();
        },

        SeleccionarMaterial: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();

            //var item=[];
            //var item = { CodMaterial: "{/materialSelec/CodMaterial}" , DescMaterial: "{/materialSelec/DescMaterial}" };


            
            this.getView().getModel().setProperty("/materialSelec", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
        },

        onMasterProductoSeleccionarMaterial: function (oEvent) {
            var obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/materialSeleccionado", obj);
            this.getView().getModel().refresh();
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
        }

    });

});



