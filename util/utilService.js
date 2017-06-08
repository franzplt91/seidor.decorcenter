sap.ui.define([

], function(ODataModel, UtilModel) {
    "use strict";

    return {

        // Listar surtidos
        exec: function(contexto) {

            if(!contexto.url){
               return { c : "ex" , m : "URL no definida", data :  null };
            }

            var servicio = contexto.servicio;
            var url = window.RootServices + contexto.url;
            var parametros = contexto.parametros ? contexto.parametros : null ;

            console.warn("<--------------     " + servicio + "    -------------->");
            console.log("\n");
            console.info("REQUEST");
            console.log("\n");
            console.log("URL: ");
            console.log(url);
            console.log("\n");
            console.info("PARAMETROS: ");
            console.log(parametros);
            console.log("\n");
            console.info("RESPONSE");
            console.log("\n");

            var dataOut = null;
            var codigo = "s";
            var descripcion = "";

            $.ajax({
                url: url, 
                method: "POST",
                async: false, 
                data: parametros,
                success: function(result){

                    console.info("SUCCESS RESULT");
                    console.log(result);
                    console.log("\n");

                    dataOut = result;

                },
                error: function(xhr,status,error){

                    console.error("ERROR RESULT");
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                    console.log("\n");

                    codigo = "ex";
                    descripcion = status + " : " + error;

                }
            });

            var respuesta = { c : codigo , m : descripcion, data : dataOut };

            console.info("RESULT FINAL");
            console.log(respuesta);

            return respuesta;

        }
    };
});