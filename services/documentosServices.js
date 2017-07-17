sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function (ODataModel, utilService) {
    "use strict";

    return {

        /////Documento Nuevo/////////////////////////////

        // Crear Cotizacion
        crearDoc: function(crearDoc) {

            var contexto = {};
            contexto.servicio = "documentosServices.crearDoc()";
            contexto.url = "crearDocumento.aspx";
            contexto.parametros = { tipoDocumento: crearDoc.tipoDocumento, pNumPedido: crearDoc.referencia};

            return utilService.exec(contexto);
            
        },



        ///////Fin Documento Nuevo//////////////////////////////////////////

        //INICIO EDELACRUZ: 
        //Valores Dialog "Buscar Documento"(dlg_DialogDocBuscarInicio.xml)
        //Combo campo: "tipo de busqueda"
        // Listar busqueda de documentos
        buscarDocumento: function (buscarDoc){
            var contexto = {};
            contexto.servicio = "documentosServices.buscarDocumento()";
            contexto.url = "buscarDocumento.aspx";
            contexto.parametros = {tipoBusqueda: buscarDoc.tipoBusqueda ,
                                    datoBusqueda: buscarDoc.datoBusqueda ,
                                    nMaterial: buscarDoc.nMaterial ,
                                    fechaInicio: buscarDoc.fechaInicio ,
                                    fechaFin: buscarDoc.fechaFin ,
                                    claseDoc: buscarDoc.claseDoc ,
                                    codAsesor: buscarDoc.codAsesor ,
                                    fecInicio1: buscarDoc.fecInicio1 ,
                                    fecFin1: buscarDoc.fecFin1 ,
                                    

            };
            var resultado = utilService.exec(contexto);
            return resultado;
        },
        //FIN EDELACRUZ
        

        conversionPedido:function(convPedido){
            var contexto = {};
            contexto.servicio = "documentosServices.conversionPedido()";
            contexto.url = "flujoDocumento.aspx";
            contexto.parametros = {pNumPedido: convPedido.NumeroPedido ,
                                    tipoDocumento: "Z001" 
                                    };

                                    
            var resultado = utilService.exec(contexto);
            return resultado;
        },
        
        
        crearInstalacion: function (venta1, venta2, venta3, venta4, visita1, visita2, visita3,visita4)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.crearInstalacion()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {venta1: venta1,
                                   venta2: venta2,
                                   venta3: venta3,
                                   venta4: venta4,
                                   visita1: visita1,
                                   visita2: visita2,
                                   visita3: visita3,
                                   visita4: visita4,
                                   instalacion: "instalacion"
            };
            var resultado = utilService.exec(contexto);
            return resultado;
        }
    };
});