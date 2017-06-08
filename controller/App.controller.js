sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/app",
    'sap/m/Button',
    'sap/m/Dialog',
    'sap/m/Text',
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function(Controller, JSONModel, app, Button, Dialog, Text,MessageBox,MessageToast) {
    "use strict";

    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.App", {

        onInit: function() {

            
        },

        goHome:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appHome");
        }

    });
});