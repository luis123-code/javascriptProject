const resultadoInformacion = document.querySelector('.resultadoInformacion')

function validandoCupones(e) {
    const cupon = e.cuponData
    const valor = parseInt(e.costoData)
    const parte = e.parte
    const valorcontado = parseInt(e.valor)
    if (parte === "Contado") {
        Contado(valor, cupon);
    } else if (parte === "Por partes") {
        porPartes(valorcontado, valor, cupon);
    }
}


function Contado(valor, cupon = "") {
    let resultado
    if (cupon !== "") {
        if (consultandoCupones(cupon) === undefined) {
            resultado = "cupon no valida"
            mostrarResulado(resultado);
        } else {
            const costoCupon = consultandoCupones(cupon)
            conCupon(costoCupon, valor)
        }

    } else if (cupon === "") {
        SinCupon(valor)
    }
}



function porPartes(enPartes, valor, cupon = "") {
    let resultado
    if (cupon !== "") {
        if (consultandoCupones(cupon) === undefined) {
            resultado = "cupon no valida"
            mostrarResulado(resultado);
        } else {
            const costoCupon = consultandoCupones(cupon)
            conCupon(costoCupon, valor, enPartes)
        }
    } else if (cupon === "") {
        SinCupon(valor, enPartes)
    }
}


function consultandoCupones(cupon) {
    const confirmacion = informacionCupones.find(index => index.cupon === cupon)
    if (confirmacion) {
        return confirmacion.costo
    }
}


function conCupon(costo, valor, enPartes = 0) {
    let resultado
    if (enPartes !== 0) {
        const descuento = (costo - valor)
        const partes = descuento / enPartes
        resultado = "usted con su cupon descuento de " + descuento + " en partes pagaria " + partes
        mostrarResulado(resultado);
    } else {
        const descuentoContado = (costo - valor)
        resultado = "usted con su cupon de descuento pagaria al contado  " + descuentoContado
        mostrarResulado(resultado);
    }
}

function SinCupon(valor, enPartes = 0) {
    let resultado
    if (enPartes !== 0) {
        const partes = valor / enPartes
        resultado = "usted pagaria en partes de " + partes
        mostrarResulado(resultado);
    } else {
        resultado = "usted pagaria " + valor + " sin descuento "
        mostrarResulado(resultado);
    }

}

function mostrarResulado(mensaje) {
    console.log(mensaje);
    eliminando(resultadoInformacion)
    const p = document.createElement('p')
    p.textContent = mensaje
    resultadoInformacion.appendChild(p)
}

function eliminando(contenedor) {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}