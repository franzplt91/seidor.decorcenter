sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function (ODataModel, utilService) {
    "use strict";

    return {

        //INICIO EDELACRUZ: 
        //Valores Dialog "Buscar Documento"(dlg_DialogDocBuscarInicio.xml)
        //Combo campo: "tipo de busqueda"
        // Listar busqueda de documentos
        buscarDocumento: function (tipoBusq, datoBusq, nMat, claseD, fecIni, fecfin, asesor)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.buscarDocumento()";
            contexto.url = "buscarDocumento.aspx";
            contexto.parametros = {tipoBusqueda: tipoBusq,
                datoBusqueda: datoBusq,
                nMaterial: nMat,
                claseDoc: claseD,
                fecInicio1: fecIni,
                fecFin1: fecfin,
                asesor: asesor
            };
            var resultado = utilService.exec(contexto);
            return resultado;
        },
        //FIN EDELACRUZ

        visualizarDocumento: function (accion, numPedido)
        {
            var contexto = {};
            contexto.servicio = "documentosServices.visualizarDocumento()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {                
                accion: accion,
                pNumPedido: numPedido
            };         
            var resultado = utilService.exec(contexto);
            return resultado;
        },

        anadirMaterialMasterDoc: function(material){
            var materialPedido = material;
            var contexto = {};
            contexto.servicio = "materialServices.anadirMaterialMasterDoc()";
            contexto.url = "material.aspx";
            contexto.parametros = materialPedido;

            return utilService.exec(contexto);
        },


        //INICIO EDELACRUZ
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
        },
        //FIN EDELACRUZ

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


    };
});