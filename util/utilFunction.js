sap.ui.define([
], function() {
    "use strict";
    return {
        containsCode: function(codDocument) {
            //var docPedidoXPiezas = ['Z009','Z010'];//DELETE EDC 04.06.2015
            var docPedidoXPiezas = ['Z009'];//INSERT EDC 04.06.2015
            for(var index in docPedidoXPiezas) {
                if(docPedidoXPiezas[index] == codDocument) {
                    return true;
                }
            }
        },
        getListGrupoFor: function(canalDist, listGroup) {
            var listNewGroup = new Array();
            var newGroup = new Object();
            for(var index in listGroup) {
                var oldGroup = listGroup[index];
                if(oldGroup == undefined) {break;}
                else if( oldGroup.codigo == "") {
                    newGroup.codigo = oldGroup.Codigo;
                    newGroup.descripcion = oldGroup.Descripcion;
                    newGroup.canal = oldGroup.TranspZone;
                    listNewGroup.push(newGroup);
                } else {
                    if(canalDist == oldGroup.TranspZone) {
                        newGroup.codigo = oldGroup.Codigo;
                        newGroup.descripcion = oldGroup.Descripcion;
                        newGroup.canal = oldGroup.TranspZone;
                        listNewGroup.push(newGroup);                        
                    }
                }
            }

        }
    };
});