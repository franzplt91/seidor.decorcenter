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