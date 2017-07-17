sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function(ODataModel, utilService) {
    "use strict";

    return {


        buscarReclamos: function(buscarReclamos) {

            var contexto = {};
            contexto.servicio = "reclamoServices.buscarReclamos()";
            contexto.url = "buscarReclamos.aspx";
            contexto.parametros = {   pNumeroReclamo: buscarReclamos.pNumeroReclamo ,
                                      pNumeroPedido: buscarReclamos.pNumeroPedido ,
                                      pCodigoCliente: buscarReclamos.pCodigoCliente ,
                                      pNombreCliente: buscarReclamos.pNombreCliente ,
                                      pMaterial: buscarReclamos.pMaterial ,
                                      pFechaCreacionI: buscarReclamos.pFechaCreacionI ,
                                      pFechaCreacionF: buscarReclamos.pFechaCreacionF ,
                                      pEstado: buscarReclamos.pEstado ,
                                      pUsuario: buscarReclamos.pUsuario ,
                                      
                                      accion: "R001" ,
                                      fecini: buscarReclamos.fecini ,
                                      fecfin: buscarReclamos.fecfin};

            return utilService.exec(contexto);

        },

        verReclamos: function(v_pNumeroReclamo) {

            var contexto = {};
            contexto.servicio = "reclamoServices.verReclamos()";
            contexto.url = "editarReclamo.aspx";
            contexto.parametros = { pNumeroReclamo : v_pNumeroReclamo };

            return utilService.exec(contexto);

        },



        //////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////




        documentoVentas: function(v_pNumPedido, v_accion, v_modo){
            var contexto = {};
            contexto.servicio = "reclamoServices.documentoVentas()";
            contexto.url = "documentoVentas.aspx";
            contexto.parametros = {pNumPedido : v_pNumPedido, accion : v_accion, modo : v_modo}

            return utilService.exec(contexto);
        },
        
        crearReclamo: function(v_pNumPedido, v_accion, v_modo){
            var contexto = {};
            contexto.servicio = "reclamoServices.crearReclamo()";
            contexto.url = "crearReclamo.aspx";
            contexto.parametros = {pNumPedido : v_pNumPedido, accion : v_accion, modo : v_modo}

            return utilService.exec(contexto);
        },

        guardarReclamo: function(reclamo,reclamo1,reclamo2){
            var contexto= {};
            contexto.servicio = "reclamoServices.guardarReclamo()";
            contexto.url = "guardarReclamo.aspx";
            contexto.parametros = {
                                   material11 : reclamo.material1, 
                                   material12 : reclamo.material2,
                                   cantRecla1 : reclamo.cantidad_material1, 
                                   cantRecla2 : reclamo.cantidad_material2, 
                                   reclamoRef : reclamo.reclamo_referencia, 
                                   numeroPedido : reclamo.numero_pedido,
                                   EmpresaDet : reclamo.codigo_cliente, 
                                   NomCliente : reclamo.nombre_cliente, 
                                   codigoEmpResp : reclamo.asesor, 
                                   Motivo : reclamo.motivo,
                                   Status : reclamo.status, 
                                   Resultado : reclamo.resultado, 
                                   JustificResul : reclamo.justificacion_resultado, 
                                   OrgVenta : reclamo.organizacion_venta,
                                   Canal : reclamo.canal, 
                                   Sector : reclamo.sector, 
                                   OfiVenta : reclamo.oficina_ventas, 
                                   comentario : reclamo.comentario, 
                                   listaReclamo : reclamo1,
                                   pIndiceResultado : 4, 
                                   listaIntJson : reclamo2
                                 }

            return utilService.exec(contexto);
        },
        EditarReclamo: function(reclamo1,reclamo2){
            var contexto= {};
            contexto.servicio = "reclamoServices.guardarReclamo()";
            contexto.url = "guardarReclamo.aspx";
            contexto.parametros = {
                                  material11:"11000004",
                                  material12:"11000898",
                                  material21:"",
                                  material22:"",
                                  cantRecla1:1,
                                  cantRecla2:2,
                                  reclamoRef:"",
                                  numeroPedido:"0000238187",
                                  EmpresaDet:"0000101317",
                                  NomCliente:"Cliente Eventual La Molina",
                                  codigoEmpResp:"00001802",
                                  Motivo:"A01",
                                  Status:0,
                                  Resultado:"004",
                                  JustificResul:"001",
                                  OrgVenta:"1000",
                                  Canal:10,
                                  Sector:"00",
                                  OfiVenta:"1010",
                                  comentario:"",
                                  pNumeroReclamo:"0100004422",
                                  listaReclamo : reclamo1,
                                  pIndiceResultado : 4, 
                                  listaIntJson : reclamo2}

            return utilService.exec(contexto);
        },

    };
});