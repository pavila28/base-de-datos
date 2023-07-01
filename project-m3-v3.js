const sectionBtnNuevoAlumno = document.getElementById('sectionNuevoAlumno')
const sectionAgregarAlumno = document.getElementById('inputNuevoAlumno')
const sectionBtnMaterias = document.getElementById('sectionVerVentanaMaterias')
const sectionDatosAsignarMaterias = document.getElementById('asignacionDeMaterias')
const sectionBotonVerCreacionGrupos = document.getElementById('divBotonVerGrupos')
const sectionBotonTerminarCrearGrupo = document.getElementById('divBotonTerminarCrearGrupo')
const sectionListaDeAlumnos = document.getElementById('contenedorAlumnos')
const sectionAgregarGrupo = document.getElementById('sectionAgregarGrupos')
const sectionDatosDelGrupo = document.getElementById('nombreNuevoGrupo')
const sectionListaDeGrupos = document.getElementById('contenedorGrupos')

const labelInscripcionMaterias = document.getElementById('labelInscripcionMateria')
const labelInscripcionGrupo = document.getElementById('labelInscripcionGrupo')

let inputNombre = document.getElementById('nombreAlumno')
let inputApellidos = document.getElementById('apellidosAlumno')
let inputEdad = document.getElementById('edadAlumno')
let inputCalif = document.getElementById('asignarCalifMateria')
let inputNombreGrupo = document.getElementById('asignarNombreAlgrupo')

const botonNuevoAlumno = document.getElementById('btnNuevoAlumno')
const botonAgregarAlumnoNuevo = document.getElementById('agregarNuevoAlumnoLista')
const botonIrAsignarMaterias = document.getElementById('btnVerMaterias')
const botonVerGrupos = document.getElementById('btnVerGrupos')
const botonAsignarLaMateria = document.getElementById('btnAsignarMateria')
const botonAsignarCalif = document.getElementById('btnAsignarCalif')
const botonPromedioAlumno = document.getElementById('btnPromedioAlumno')
const botonAsignarAlumnoGrupo = document.getElementById('btnAsignarAlumnoGrupo')
const botonObtenerPromGrupo = document.getElementById('btnObtenerPromGrupo')
const botonBuscarAlumno = document.getElementById('btnBuscarAlumno')
const botonCrearGrupo = document.getElementById('btnTerminarCrearGrupo')
const botonSalvarGrupo = document.getElementById('salvarGrupo')

let dropDownAlumnos = document.getElementById('nombreCompletoAlumnos')
let alumnoSeleccionado = document.getElementById('alumnoActual')
let misMaterias = document.getElementById('misMaterias')
let dropDownMaterias = document.getElementById('todasLasmaterias')
let dropDownGrupos = document.getElementById('todosLosGrupos')

function Alumno (nombre, apellidos, edad){
    this.nombre = nombre
    this.apellidos = apellidos
    this.edad = edad
    this.materias = []
    this.calif = []
    this.promedio = []
}

function Grupo (nombreGrupo){
    this.nombreGrupo = nombreGrupo
    this.nombreA = []
    this.califA = []
    this.promG = []
}

let numAlumnos = 0
let numGrupos = 0

let listaDeAlumnos = []
let listaDeMaterias = [' Matematicas', 'Español', 'Química', 'Física', 'Historia']
let listaDeGrupos = []

function listaInicial(){
    sectionAgregarAlumno.style.display = 'none'
    sectionBtnMaterias.style.display = 'none'
    sectionAgregarGrupo.style.display = 'none'
    sectionDatosDelGrupo.style.display = 'none'
    sectionBotonVerCreacionGrupos.style.display = 'none'
    dropDownGrupos.style.display = 'none'
    botonAsignarAlumnoGrupo.style.display = 'none'
    botonObtenerPromGrupo.style.display = 'none'
    botonBuscarAlumno.style.displat = 'none'
    sectionDatosAsignarMaterias.style.display = 'none'
    labelInscripcionGrupo.style.display = 'none'

    botonNuevoAlumno.addEventListener('click', (e) => {
        agregarDatosNuevoAlumno()
    })

    for (let i = 0; i < listaDeMaterias.length; i++) {
        let seleccionM = listaDeMaterias[i]
        let opcionM = document.createElement("option")

        opcionM.textContent = seleccionM
        opcionM.value = seleccionM
        dropDownMaterias.appendChild(opcionM)
    }
}

function agregarDatosNuevoAlumno(){
    sectionAgregarAlumno.style.display = 'block'
    sectionBtnMaterias.style.display = 'block'

    botonAgregarAlumnoNuevo.addEventListener('click', (e) => {
        if(inputNombre.value == '' || inputApellidos.value == '' || inputEdad.value == ''){
            alert('Completa todos los campos')
        }else if(numAlumnos === 0 || numAlumnos > 0){
            let alumno1 = new Alumno (inputNombre.value, inputApellidos.value, inputEdad.value)

            listaDeAlumnos.push(alumno1)
            console.log(listaDeAlumnos)

            sectionListaDeAlumnos.innerHTML += `
            <div class="datosAlumnos">
            <p>Alumno: ${listaDeAlumnos[numAlumnos].nombre} ${listaDeAlumnos[numAlumnos].apellidos}</p>
            <p>Edad: ${listaDeAlumnos[numAlumnos].edad}</p>
            <p>Materias: ${listaDeAlumnos[numAlumnos].materias}</p>
            <p>Calificaciones: ${listaDeAlumnos[numAlumnos].calif}</p>
            </div>`

            inputNombre.value = ''
            inputApellidos.value = ''
            inputEdad.value = ''

            numAlumnos = numAlumnos + 1
        }
    })
}

botonIrAsignarMaterias.addEventListener('click', (e) => {
    asignarmaterias()
})

function asignarmaterias(){
    sectionAgregarAlumno.style.display = 'none'
    sectionBotonVerCreacionGrupos.style.display = 'block'
    botonIrAsignarMaterias.style.display = 'none'
    sectionDatosAsignarMaterias.style.display = 'block'
    botonBuscarAlumno.style.display = 'none'

    for (let i = 0; i < listaDeAlumnos.length; i++) {
        let seleccionN = listaDeAlumnos[i].nombre
        let seleccionAp = listaDeAlumnos[i].apellidos
        let opcion = document.createElement("option")

        opcion.textContent = `${seleccionN}`
        opcion.value = `${seleccionN}`
        dropDownAlumnos.appendChild(opcion)
    }

    botonAsignarLaMateria.addEventListener('click', (e) => {
        let materiaPorAsignar = dropDownMaterias.options[dropDownMaterias.selectedIndex].text
        let alumnoEnAsignacion = dropDownAlumnos.options[dropDownAlumnos.selectedIndex].text

        indexAlumno = listaDeAlumnos.findIndex(object => {
            return object.nombre === alumnoEnAsignacion
        })

        listaDeAlumnos[indexAlumno].materias.push(materiaPorAsignar)

        sectionListaDeAlumnos.innerHTML = ``

        listaDeAlumnos.forEach((listaDeAlumnos) => {
            sectionListaDeAlumnos.innerHTML += `
            <div class="datosAlumnos">
            <p>Alumno: ${listaDeAlumnos.nombre} ${listaDeAlumnos.apellidos}</p>
            <p>Edad: ${listaDeAlumnos.edad}</p>
            <p>Materias: ${listaDeAlumnos.materias.toString()}</p>
            <p>Calificaciones: ${listaDeAlumnos.calif}</p>
            <p>Promedio: ${listaDeAlumnos.promedio.toString()}</p>
            </div>`
        });
    })

    botonAsignarCalif.addEventListener('click', (e) => {
        let alumnoPorCalificar = dropDownAlumnos.options[dropDownAlumnos.selectedIndex].text

        indexAlumno = listaDeAlumnos.findIndex(object => {
            return object.nombre === alumnoPorCalificar
        })

        listaDeAlumnos[indexAlumno].calif.push(inputCalif.value)

        sectionListaDeAlumnos.innerHTML = ``

        listaDeAlumnos.forEach((listaDeAlumnos) => {
            sectionListaDeAlumnos.innerHTML += `
            <div class="datosAlumnos">
            <p>Alumno: ${listaDeAlumnos.nombre} ${listaDeAlumnos.apellidos}</p>
            <p>Edad: ${listaDeAlumnos.edad}</p>
            <p>Materias: ${listaDeAlumnos.materias.toString()}</p>
            <p>Calificaciones: ${listaDeAlumnos.calif}</p>
            <p>Promedio: ${listaDeAlumnos.promedio.toString()}</p>
            </div>`
        });

        inputCalif.value = ''
    })

    botonPromedioAlumno.addEventListener('click', (e) => {
        let alumnoPorPromediar = dropDownAlumnos.options[dropDownAlumnos.selectedIndex].text
        let calificacionesAlumno = listaDeAlumnos[indexAlumno].calif
        let promedioDeAlumno = 0

        indexAlumno = listaDeAlumnos.findIndex(object => {
            return object.nombre === alumnoPorPromediar
        })

        for (let i = 0; i < calificacionesAlumno.length; i++) {
            promedioDeAlumno += calificacionesAlumno[i] / calificacionesAlumno.length
        }

        listaDeAlumnos[indexAlumno].promedio.push(promedioDeAlumno)

        sectionListaDeAlumnos.innerHTML = ``

        listaDeAlumnos.forEach((listaDeAlumnos) => {
            sectionListaDeAlumnos.innerHTML += `
            <div class="datosAlumnos">
            <p>Alumno: ${listaDeAlumnos.nombre} ${listaDeAlumnos.apellidos}</p>
            <p>Edad: ${listaDeAlumnos.edad}</p>
            <p>Materias: ${listaDeAlumnos.materias.toString()}</p>
            <p>Calificaciones: ${listaDeAlumnos.calif}</p>
            <p>Promedio: ${listaDeAlumnos.promedio.toString()}</p>
            </div>`
        });
    })
}

botonVerGrupos.addEventListener('click', (e) => {
    crearUnGrupo()
})

function crearUnGrupo(){
    sectionAgregarGrupo.style.display = 'block'
    sectionDatosDelGrupo.style.display = 'block'
    botonAsignarLaMateria.style.display = 'none'
    botonAsignarCalif.style.display = 'none'
    botonPromedioAlumno.style.display = 'none'

    botonCrearGrupo.addEventListener('click', (e) => {
        sectionDatosDelGrupo.style.display = 'none'
        sectionBotonTerminarCrearGrupo.style.display = 'none'
        dropDownGrupos.style.display = 'block'
        botonAsignarAlumnoGrupo.style.display = 'block'
        botonObtenerPromGrupo.style.display = 'block'
        botonBuscarAlumno.style.display = 'block'
        labelInscripcionGrupo.style.display = 'block'
        labelInscripcionMaterias.style.display = 'none'
        dropDownMaterias.style.display = 'none'
        inputCalif.style.display = 'none'

        for (let i = 0; i < listaDeGrupos.length; i++) {
            let seleccionG = listaDeGrupos[i].nombreGrupo
            let opcionG = document.createElement("option")
    
            opcionG.textContent = `${seleccionG}`
            opcionG.value = `${seleccionG}`
            dropDownGrupos.appendChild(opcionG)
        }
    })

    botonSalvarGrupo.addEventListener('click', (e) => {
        if(inputNombreGrupo.value == ''){
            alert('Debes ponerle un nombre al grupo')
        }else if(numGrupos === 0 || numGrupos > 0){
            let grupo1 = new Grupo (inputNombreGrupo.value)
            
            listaDeGrupos.push(grupo1)
            console.log(listaDeGrupos)

            sectionListaDeGrupos.innerHTML += `
            <div class="datosDeEsteGrupo">
            <p>Nombre: ${inputNombreGrupo.value}</p>
            <p>Alumnos: </p>
            <p>Calificación grupal: </p>
            </div>`

            inputNombreGrupo.value = ''

            numGrupos = numGrupos + 1
        }
    })
    
    botonAsignarAlumnoGrupo.addEventListener('click', (e) => {
        let grupoParaAsignar = dropDownGrupos.options[dropDownGrupos.selectedIndex].text
        let alumnoAsignarGrupo = dropDownAlumnos.options[dropDownAlumnos.selectedIndex].text
        let califParaGrupo = listaDeAlumnos[indexAlumno].calif

        indexAlumno = listaDeAlumnos.findIndex(object => {
            return object.nombre === alumnoAsignarGrupo
        })

        indexGrupo = listaDeGrupos.findIndex(object => {
            return object.nombreGrupo === grupoParaAsignar
        })

        listaDeGrupos[indexGrupo].nombreA.push(alumnoAsignarGrupo)
        listaDeGrupos[indexGrupo].califA.push(califParaGrupo)

        sectionListaDeGrupos.innerHTML = ``

        listaDeGrupos.forEach((listaDeGrupos) => {
            sectionListaDeGrupos.innerHTML += `
            <div class="datosDeEsteGrupo">
            <p>Nombre: ${listaDeGrupos.nombreGrupo}</p>
            <p>Alumnos: ${listaDeGrupos.nombreA.toString()}</p>
            <p>Calificación grupal: </p>
            </div>`
        })
    })

    botonObtenerPromGrupo.addEventListener('click', (e) => {
        let grupoPromediar = dropDownGrupos.options[dropDownGrupos.selectedIndex].text
        let califPorPromediar = listaDeGrupos[indexGrupo].califA
        let promGrupo = 0

        indexGrupo = listaDeGrupos.findIndex(object => {
            return object.nombreGrupo === grupoPromediar
        })

        for (let i = 0; i < califPorPromediar.length; i++) {
            promGrupo += califPorPromediar[i] / califPorPromediar.length
        }

        listaDeGrupos[indexGrupo].promG.push(promGrupo)

        sectionListaDeGrupos.innerHTML = ``

        listaDeGrupos.forEach((listaDeGrupos) => {
            sectionListaDeGrupos.innerHTML += `
            <div class="datosDeEsteGrupo">
            <p>Nombre: ${listaDeGrupos.nombreGrupo}</p>
            <p>Alumnos: ${listaDeGrupos.nombreA.toString()}</p>
            <p>Calificación grupal: ${listaDeGrupos.promG.toString()}</p>
            </div>` 
        })
    })

    botonBuscarAlumno.addEventListener('click', (e) => {
        let alumnoPorBuscar = dropDownAlumnos.options[dropDownAlumnos.selectedIndex].text

        indexAlumno = listaDeAlumnos.findIndex(object => {
            return object.nombre === alumnoPorBuscar
        })

        console.log(listaDeAlumnos[indexAlumno])

        prompt(
        `Nombre: ${listaDeAlumnos[indexAlumno].nombre} ${listaDeAlumnos[indexAlumno].apellidos}
        Edad: ${listaDeAlumnos[indexAlumno].edad}
        Materias: ${listaDeAlumnos[indexAlumno].materias}
        Promedio: ${listaDeAlumnos[indexAlumno].promedio}`)
    })
}

window.addEventListener('load', listaInicial())