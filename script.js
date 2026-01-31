


  let listePresences = JSON.parse(localStorage.getItem("listePresences")) || [];


const formPresence = document.getElementById("formPresence");
    const corpsTableau = document.getElementById("corpsTableau") ;
  const recherche = document.getElementById("recherche");
  
const zoneStatistiques =   document.getElementById("zoneStatistiques")  ;

const cne = document.getElementById("cne") ;

  const nom  =   document.getElementById("nom");
  const datePresence = document.getElementById("datePresence");
  const statut   = document.getElementById("statut")  ;

const erreurCne = document.getElementById("erreurCne");
const erreurNom = document.getElementById("erreurNom");
const erreurDate = document.getElementById("erreurDate");

const btnToutEffacer = document.getElementById("btnToutEffacer");

    function sauvegarder() {
  localStorage.setItem("listePresences", JSON.stringify(listePresences))   ; 
                     }

function viderErreurs() {
  erreurCne.textContent = "";
  erreurNom.textContent = "";
  erreurDate.textContent = "";
}

function validerSaisie() {
  viderErreurs();
  let ok = true;

        if (cne.value.trim().length < 3) {
      erreurCne.textContent = "CNE obligatoire (min 3 caractères).";
    ok = false;
  }
if (nom.value.trim().length < 2) {
        erreurNom.textContent = "Nom obligatoire (min 2 caractères).";
      ok = false;
  }
  if (!datePresence.value) {
     erreurDate.textContent = "Date obligatoire.";
         ok = false;
  }
         return ok;
}

function genererId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}
function calculerStats(liste) {
  const total = liste.length;
  const presents = liste.filter(p => p.statut === "present").length;
  const absents = total - presents;
  const taux = total === 0 ? 0 : Math.round((presents / total) * 100);

  zoneStatistiques.innerHTML = `
    <strong>Statistiques</strong><br/>
    Total: ${total} | Présents: ${presents} | Absents: ${absents}<br/>
    Taux de présence: ${taux}%
  `;
}

function appliquerRecherche() {
  const q = recherche.value.trim().toLowerCase();
  if (!q) return listePresences;

  return listePresences.filter(p =>
    p.cne.toLowerCase().includes(q) ||
    p.nom.toLowerCase().includes(q)
  );
}
function afficher(liste) {
  corpsTableau.innerHTML = "";

    if (liste.length === 0) {
      corpsTableau.innerHTML = `<tr><td colspan="5">Aucune présence enregistrée.</td></tr>`;
     calculerStats([]);
    return;
  }

  liste.forEach(item => {
    const texteStatut = item.statut === "present" ? "Présent" : "Absent";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.cne}</td>
      <td>${item.nom}</td>
      <td>${item.date}</td>
      <td>${texteStatut}</td>
      <td><button class="btnSupprimer" data-id="${item.id}">Supprimer</button></td>
    `;
    corpsTableau.appendChild(tr);
  });

  calculerStats(liste);
}
  formPresence.addEventListener("submit", function (e) {
     e.preventDefault();
         if (!validerSaisie()) return;

       const enregistrement = {
id: genererId(),
    
cne: cne.value.trim(),
nom: nom.value.trim(),
  date: datePresence.value,

  statut: statut.value };

     listePresences.push(enregistrement);
    sauvegarder();

  formPresence.reset();
  afficher(appliquerRecherche());
});


corpsTableau.addEventListener("click", function (e) {
      if (e.target.classList.contains("btnSupprimer")) {
          const id = e.target.getAttribute("data-id");
           listePresences = listePresences.filter(p => p.id !== id);
sauvegarder();
  afficher(appliquerRecherche());
     }
      });

     recherche.addEventListener("input", function () {
    afficher(appliquerRecherche());
});

   
     btnToutEffacer.addEventListener("click", function () {
listePresences = [];
sauvegarder();  afficher([]);
});

afficher(listePresences);












     let cahier = JSON.parse(localStorage.getItem("cahierTexte")) || [];
    const    formCahier =    document.getElementById("formCahier")   ;
 const   corpsCahier    =    document.getElementById("corpsCahier") ;
   const    rechercheCahier = document.getElementById("rechercheCahier");
 const   statsCahier = document.getElementById("statsCahier");

 const dateSeance      = document.getElementById("dateSeance");
const moduleSeance   = document.getElementById("moduleSeance")    ;
const    contenuSeance = document.getElementById("contenuSeance");

   const erreurDateSeance = document.getElementById("erreurDateSeance") ;
  const   erreurModuleSeance = document.getElementById("erreurModuleSeance")  ;
  const  erreurContenuSeance = document.getElementById("erreurContenuSeance") ;

const btnEffacerCahier   =   document.getElementById("btnEffacerCahier");

         function sauvegarderCahier(){
      localStorage.setItem("cahierTexte", JSON.stringify(cahier));}


   function viderErreursCahier(){
     erreurDateSeance.textContent = "";
    erreurModuleSeance.textContent = "";
    erreurContenuSeance.textContent = "";    }


     function validerCahier(){
     viderErreursCahier();
         let ok = true;

        if(!dateSeance.value){
       erreurDateSeance.textContent = "Date obligatoire.";
       ok = false;
     }

       if(moduleSeance.value.trim().length < 2){
        erreurModuleSeance.textContent = "Module obligatoire (min 2 caractères).   ";
       ok    = false;      }

     if(contenuSeance.value.trim().length  < 5){
       erreurContenuSeance.textContent =   "Contenu obligatoire (min 5 caractères).";
    ok = false;
  }

       return ok;
}

       function genererIdCahier(){
  return    Date.now().toString() + Math.floor(Math.random() * 1000);
}

function  calculerStatsCahier(liste){
  const total = liste.length;
        statsCahier.innerHTML = `
       <strong>Statistiques</strong><br/>
     Séances: ${total}
  `;     }


function filtrerCahier(){
       const q = rechercheCahier.value.trim().toLowerCase();
          if(!q) return cahier;

        return cahier.filter(s =>
         s.module.toLowerCase().includes(q) ||
         s.contenu.toLowerCase().includes(q)
  );}

function afficherCahier(liste){
  corpsCahier.innerHTML = "";

      if(liste.length === 0){
        corpsCahier.innerHTML = `<tr><td colspan="4">Aucune séance enregistrée.</td></tr>`;
      calculerStatsCahier([]);
return;
  }

    liste.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
  <td>${s.date}</td>
  
  <td>${s.module}</td>
  <td>${s.contenu}</td>
  
  <td><button class="btnSupprimerCahier" data-id="${s.id}">Supprimer</button></td>
    `;
    corpsCahier.appendChild(tr);
  });

  calculerStatsCahier(liste);
}






if (formCahier) {
  formCahier.addEventListener("submit", function(e) {
    e.preventDefault();
    if (!validerCahier()) return; 
    const seance = {
      id: genererIdCahier(),
      date: dateSeance.value,
      module: moduleSeance.value.trim(),
      contenu: contenuSeance.value.trim() 
    };

    cahier.push(seance); 
    sauvegarderCahier();

    formCahier.reset();
    afficherCahier(filtrerCahier());
  })
}



corpsCahier.addEventListener("click", function(e){
  if(e.target.classList.contains("btnSupprimerCahier")){
    const id = e.target.getAttribute("data-id");
      cahier = cahier.filter(s => s.id !== id);
     sauvegarderCahier();   afficherCahier(filtrerCahier());
  }   });



rechercheCahier.addEventListener("input", function(){
      afficherCahier(filtrerCahier());
});
 
btnEffacerCahier.addEventListener("click", function(){
  cahier = [];
   sauvegarderCahier();
  afficherCahier([]);
});

   afficherCahier(cahier);
