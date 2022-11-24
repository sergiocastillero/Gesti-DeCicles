let llistatCicles = [];

class Cicle{
    constructor(nom, categoria, numAlumnes, abreviatura) {
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.dataUltimaEdicio = "";
        this.numHores = 0;
        this.moduls = [];
    } 

    setNumEdicions() {
        this.numEdicions++;
        this.dataUltimaEdicio = new Date();
    }

    setNumHores() {
        let suma = 0;
        if (!this.moduls.length){
            this.numHores = 0;
        }else{
            this.moduls.forEach(function(element){
                suma += parseInt(element.hores);
            });
        }
        this.numHores = suma;
    }

    afegirModulCicle(modul) {
        this.moduls.push(modul);
    }

    toString() {
        return "Nom:" + this.nom + "\n" +
               "Abreviatura nom:" + this.abreviatura + "\n" +
               "Categoria:" + this.categoria + "\n" +
               "Nº Alumnes:" + this.numAlumnes + "\n" +
               "Nº Edicions:" + this.numEdicions + "\n";
    }


}

class Modul{
    constructor(nom, num, hores) {
        this.nom = nom;
        this.num = num;
        this.hores = hores;

    }

    toString() {
        return `MP${this.num}. ${this.nom} (${this.hores}h)`;
    }

}

function afegirCicle(){
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;

    if(document.getElementById("editCicle").value === "-1"){
        let cicle = new Cicle(nom, categoria, numAlumnes, abreviatura);
        console.log(cicle);

        //Afegim el cicle al llistat
        llistatCicles.push(cicle);
    }else{
        llistatCicles[document.getElementById("editCicle").value].nom = nom;
        llistatCicles[document.getElementById("editCicle").value].categoria = categoria;
        llistatCicles[document.getElementById("editCicle").value].numAlumnes = numAlumnes;
        llistatCicles[document.getElementById("editCicle").value].abreviatura = abreviatura;
    }
    
    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
    
    document.getElementById("editCicle").value=-1;
}

function afegirModul(){
    let cicle = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    let modul = {nom: modul_nom, num: modul_num, hores: modul_hores}
    console.log(modul);

    //Afegeix el modul
    llistatCicles[cicle].afegirModulCicle(modul);

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
}

//Funció per llistar els cicles
function printLlistat (llistat){
    let str="";
    llistat.forEach(function(element, index){
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>
                    <p id="cicle_hores" class="font-normal text-gray-700"></p>
                    <button type="button" onClick="removeCicle(${index})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button" onClick="editCicle(${index})" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button" onClick="calculHores(${index})" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
                </div>`;
    });

    document.getElementById("llistat").innerHTML=str;
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector(){
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function(element, index){
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(i){
    llistatCicles.splice(i, 1);
    printLlistat(llistatCicles);

}

//Funció per editar un cicle
function editCicle(i){
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    llistatCicles[i].setNumEdicions();

    document.getElementById("editCicle").value=i;

}

//Funció per calcular hores d'un cicle
function calculHores(i) {
    llistatCicles[i].setNumHores();

    document.getElementById("cicle_hores").innerHTML = "Num d'hores: " + llistatCicles[i].numHores;
}

//Funció per netejar els formularis
function netejarFormularis(){
    var inputs = document.getElementsByTagName("input");
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i=0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}