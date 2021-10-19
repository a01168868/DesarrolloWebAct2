function muestraFocos(){
    $("#tituloTabla").show(500);
    $("#tituloTabla").html("Iluminación");
    $("#tablaSeguridad").hide(200);
    $("#tablaIluminacion").show(500);
}

function muestraCamaras(){
    $("#tituloTabla").show(500);
    $("#tituloTabla").html("Cámaras de Seguridad");
    $("#tablaIluminacion").hide(200);
    $("#tablaSeguridad").show(500);
}

function validaCorreo(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function enviaForm(){
    var contra1=$("#password").val();
    var contra2=$("#password2").val();
    var correo=$("#correo").val();
    var nombre=$("#nombre").val();

    if(nombre){
        if(validaCorreo(correo)){
            if(contra1.length>=6){
                if(contra1==contra2){
                    $("#botonCrea").hide();
                    $("#formUsuario").submit();
                }else{
                    alert("Verifique que sus contraseñas coincidan.");
                }
            }else{
                alert("Se requieren al menos 6 caracteres en su contraseña.");
            }
        }else{
            alert("Por favor ingrese un correo válido.");
        }
    }else{
        alert("Por favor ingrese su nombre completo.")
    }
}

function muestraContrasena(){
    $("#contraOculta").toggle();
    $("#contraVisible").toggle();
}

