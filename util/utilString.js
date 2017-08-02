sap.ui.define([
], function() {
    "use strict";
    return {
        replace2Point: function(cadena,cadReplace) {
            return cadena.replace("::", cadReplace).replace(/:/g, '');
        },
        listAddItemSelec: function(data,etiqueta){
            if(!etiqueta){
                etiqueta = "Seleccione";
            }
            for(var i = 0; i < data.length; i++){
                if(!data[i].Codigo.replace(/ /g, '')){
                    data[i].Descripcion = etiqueta;
                }
            }
            return data;
        },
        prepareDataIni: function(){
            var data = window.dataIni;
            /*****  CANALES ****/
            /* 
            var listaCanales = data.lstCanales;
            for(var i = 0; i < listaCanales.length; i++){
                listaCanales[i].Descripcion = this.replace2Point(listaCanales[i].Descripcion,' - ');
            }
            data.lstCanales = listaCanales;
            */
            /*****  MOTIVO RECLAMOS ****/
            /*
            var listaMotReclamo = data.lstMotivoRecl;
            for(var i = 0; i < listaMotReclamo.length; i++){
                listaMotReclamo[i].Descripcion = this.replace2Point(listaMotReclamo[i].Descripcion,' - ');
            }
            data.lstMotivoRecl = listaMotReclamo;
            
            */
            /*****  OFICINAS DE VENTAS ****/
            data.lstOfVtas = this.listAddItemSelec(data.lstOfVtas);                        
            /*****  LISTA DE MONEDAS ****/
            data.lstMoneda = this.listAddItemSelec(data.lstMoneda);
            /*****  LISTA DE BANCOS ****/
            data.lstGrpCond = this.listAddItemSelec(data.lstGrpCond);
            /*****  MOTIVOS NOTA DE DEBITO / CREDITO ****/
            data.lstMotPed = this.listAddItemSelec(data.lstMotPed);            
            /*****  BLOQUEOS DE FACTURA ****/
            data.lstBloFac = this.listAddItemSelec(data.lstBloFac);            
            /*****  BLOQUEOS DE ENTREGA ****/
            data.lstBloEnt = this.listAddItemSelec(data.lstBloEnt);
            /*****  TIPOS DE DESPACHO ****/
            data.lstCondExp = this.listAddItemSelec(data.lstCondExp);
            /*****  TIPOS DE VISITA ****/
            data.lstTipoVisita = this.listAddItemSelec(data.lstTipoVisita);
            
            /*****  TIPOS DE AMBIENTES ****/
            data.lstPreguntas[5].listaResp = this.listAddItemSelec(data.lstPreguntas[5].listaResp);
            /*****  MOTIVOS DE RECHAZO PRODUCTOS ****/
            data.lstMotivosRechazo = this.listAddItemSelec(data.lstMotivosRechazo);
                       
            window.dataIni = data;            
        },
        isNumeric: function(inputValue) {
            var format = /^[0-9]+$/;
            var rpta = (inputValue.match(format)) ? true : false;
            return rpta;
        },
        padLeft: function(nr, n, str) {
            return Array(n - String(nr).length + 1).join(str || '0') + nr;
        }        
    };
});