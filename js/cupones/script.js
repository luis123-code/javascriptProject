const informacion = document.querySelector('.form')
const btn_enviado = document.querySelector('.button')
const mensaje = document.querySelector('.mensaje')
const mostrarDatos = document.querySelector('.informacionCupones')

/*datos*/
const cupon = document.querySelector('.txtCupon')
const costo = document.querySelector('.txtCosto')
const elegir = document.querySelector('.txtelegir')
const valor = document.querySelector('.txtValor')
const reseteo = document.querySelector('.reseteo')

/*animacion*/
const spike = document.querySelector('.spiknet')
spike.style.display = "none"

let data = {
    cuponData: "",
    costoData: "",
    parte: "",
    valor: "",
}


eventos()

function eventos() {
    document.addEventListener('DOMContentLoaded', reinicio)
    informacion.addEventListener('input', validandoDato)
    btn_enviado.addEventListener('click', enviandoInformacion)
    reseteo.addEventListener('click', () => {
        eliminando(resultadoInformacion)
        reinicio()
    })
}


function validandoDato() {
    if ((cupon.value.length > 0 || costo.value.length > 0) && elegir.value !== "") {
        if (elegir.value === "Por partes") {
            valor.style.display = "block"
            if (cupon.value.length > 0 && costo.value.length > 0 || valor.value.length > 0) {
                btn_enviado.disabled = false
                mensaje.remove()
            } else {
                btn_enviado.disabled = true
                noValido()
            }
        } else {
            valor.style.display = "none"
            btn_enviado.disabled = false
            mensaje.remove()
        }
    } else {
        btn_enviado.disabled = true
        noValido()

    }
}

function enviandoInformacion(e) {
    e.preventDefault()
    data["cuponData"] = cupon.value
    data["costoData"] = costo.value
    data["parte"] = elegir.value
    data["valor"] = valor.value
    spike.style.display = ""
    setTimeout(() => {
        const datoValido = document.querySelector('.enviandoInformacion')
        eliminando(datoValido)
        spike.style.display = "none"
        const envioMensaje = document.createElement('p')
        envioMensaje.classList.add('mensajeValido')
        envioMensaje.textContent = "se envio la informacion al servidor 😎🌎"
        const Valido = document.querySelectorAll('mensajeValido')
        if (Valido.length === 0) {
            datoValido.append(envioMensaje)
        }
        setTimeout(() => {
            validandoCupones(data)
            envioMensaje.remove()
            reinicio()
            informacion.reset()
        }, 3000)
    }, 5000)

}

function noValido() {
    const P = document.createElement('p')
    P.classList.add('noValido')
    P.textContent = "ingresar los datos :>"
    const mensajeNoValido = document.querySelectorAll('.noValido')
    if (mensajeNoValido.length === 0) {
        mensaje.appendChild(P)
    }
}

function reinicio() {
    btn_enviado.disabled = true
    valor.style.display = "none"
    eliminando(mostrarDatos)
    informacionCupones.forEach(index => {
        const { cupon, costo} = index
        let datos = document.createElement('div')
        datos.className = "datos"
        datos.innerHTML = `<p>cupon: ${cupon}</p> <p>costo: ${costo}</p>`
        mostrarDatos.appendChild(datos)
    });
}

