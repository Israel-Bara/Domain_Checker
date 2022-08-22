/*Fonction de création de l'objet XMLHttpRequest en fonction de la version des navigateurs*/
function getXMLHttpRequest() {
	var xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
   
	return xhr;  
}
//Creation de l'objet XMLHttpRequest
var xhr=getXMLHttpRequest();
/*Fonction appelé lorsque l'utilisateur clic sur le boutton scan pour envoyer le nom de domaine*/
function process(){
   if(xhr.readyState<4 && xhr.status!=200){
      document.getElementById("gif").innerHTML="<img src='image/patiente.gif'/>";
      document.getElementById("buttonHidden").style.visibility="hidden";
   }
   if(xhr.readyState==0 || xhr.readyState==4){
        /*Recuperation de la valeur du nom de domaine*/
        domainNAme=encodeURIComponent(document.getElementById("domainNAme").value);
        /*Preparation de la requete*/
        xhr.open("GET","DMARC.php?domainNAme="+domainNAme,true);
        /*Fonction permettant de recuperer les donnees du serveur */
        xhr.onreadystatechange=handleResponse;
        /*Envoie des donnees*/
        xhr.send(null);
}
else{
   /*Rappeler la fonction process tous les 1seconde*/
   setTimeout('process()',1000);
}
}
/*Definition de la fonction de recuperation de donnees du serveur*/
function handleResponse(){
   /*Si le serveur est pret a communiquer*/
   if(xhr.readyState==4 && xhr.status==200){
         document.getElementById("buttonHidden").style.visibility="visible";
         document.getElementById("gif").style.display="none";
         /*Recuperation des donnees du serveur avec responseText*/
         responseType=JSON;
         reponse=xhr.responseText;
         reponse=JSON.parse(reponse);
         /*Action a realiser lorsque l'utilisateur entre un nom de domaine vide*/
         if(reponse==="Veuillez entrer un nom de domaine"){
            document.getElementById("enterDomaine").innerHTML="Veuillez entrer un nom de domaine";
            document.getElementById("domainNAme").style.borderColor="red";
            document.getElementById("enterDomaine").style.color="red";
            document.getElementById("resultatDomaine").innerHTML="";
            document.getElementById("resulatDetail").innerHTML="";
            document.getElementById("resultatDomaine").style.color="black";
            document.getElementById("resulatDetail").style.color="black";
            document.getElementById("texteSPF").style.color="black";
            document.getElementById("texteDmarc").style.color="black";
            document.getElementById("texteHTTPS").style.color="black";
            document.getElementById("texteDKIM").style.color="black";
            document.getElementById("col11").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col12").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col21").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col22").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col31").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col32").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col41").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("col42").style.backgroundColor = "rgb(250, 250, 254)";
            document.getElementById("codeDMARC").value="";
            document.getElementById("codeSPF").value="";
            document.getElementById("codeDKIM").value="";
            document.getElementById("codeHTTPS").value="";
            document.getElementById("iconSVGDmarc").style.color="red";
            document.getElementById("iconSVGSpf").style.color="red";
            document.getElementById("iconSVGDkim").style.color="red";
            document.getElementById("iconSVGHttps").style.color="red";
            document.getElementById("texteDmarc").innerHTML="";
            document.getElementById("texteSPF").innerHTML="";
            document.getElementById("texteDKIM").innerHTML="";
            document.getElementById("texteHTTPS").innerHTML="";
            document.getElementById("recordHttps").innerHTML="";
            document.getElementById("recordSpf").innerHTML="";
            document.getElementById("recordDmarc").innerHTML="";
            document.getElementById("recordDKIM").innerHTML="";
         }
         else{
            /*Recuperation des enregistrement dmarc, spf,dkim et le dns dans des variable*/
            dmarc=reponse["Txt_dmarc"];
            spf=reponse["Txt_spf"];
            dns=reponse["Txt_dns"];
            ssl=reponse["Txt_ssl"];
            dkim=reponse["Txt_dkim"];
            /*Actions a realiser si le domaine entrer n'est pas un domaine valide*/
            if(dns.includes("MX preference")==false){
                document.getElementById("enterDomaine").innerHTML="Entrez un nom de domaine valide";
                document.getElementById("domainNAme").style.borderColor="red";
                document.getElementById("enterDomaine").style.color="red";
                document.getElementById("codeDMARC").value="Le nom de domaine entré est invalide";
                document.getElementById("codeSPF").value="Le nom de domaine entré est invalide";
                document.getElementById("codeHTTPS").value="Le nom de domaine entré est invalide";
                document.getElementById("codeSPF").style.color="red";
                document.getElementById("codeDMARC").style.color="red";
                document.getElementById("codeHTTPS").style.color="red";
                document.getElementById("iconSVGDmarc").style.color="red";
                document.getElementById("iconSVGDkim").style.color="red";
                document.getElementById("iconSVGHttps").style.color="red";
                document.getElementById("iconSVGSpf").style.color="red";
                document.getElementById("col12").style.backgroundColor = "red";
                document.getElementById("col22").style.backgroundColor = "red";
                document.getElementById("col32").style.backgroundColor = "red";
                document.getElementById("col42").style.backgroundColor = "red";
                document.getElementById("resultatDomaine").style.color="black";
                document.getElementById("resulatDetail").style.color="black";
                document.getElementById("resultatDomaine").innerHTML="";
                document.getElementById("resulatDetail").innerHTML="";
                document.getElementById("col11").style.backgroundColor = "rgb(250, 250, 254)";
                document.getElementById("col21").style.backgroundColor = "rgb(250, 250, 254)";
                document.getElementById("col31").style.backgroundColor = "rgb(250, 250, 254)";
                document.getElementById("col41").style.backgroundColor = "rgb(250, 250, 254)";
                document.getElementById("texteDmarc").innerHTML="";
                document.getElementById("texteDKIM").innerHTML="";
                document.getElementById("texteSPF").innerHTML="";
                document.getElementById("texteHTTPS").innerHTML="";
                document.getElementById("recordHttps").innerHTML="";
                document.getElementById("recordSpf").innerHTML="";
                document.getElementById("recordDKIM").innerHTML="";
                document.getElementById("recordDmarc").innerHTML="";
                document.getElementById("texteSPF").style.color="black";
                document.getElementById("texteDmarc").style.color="black";
                document.getElementById("texteHTTPS").style.color="black";
                document.getElementById("texteDKIM").style.color="black";
               }
             else{
               /*Si le nom de domaine est valide, algorithme pour recuperer la valeur des enregistrements
                 spf,dmarc,dkim, qui sont au milieu d'un longue chaine de caractere*/
                spf=spf.substring(spf.lastIndexOf('"v=spf'));
                dmarc=dmarc.substring(dmarc.lastIndexOf('"v=DMARC'));
                /*Action a realiser si le nom de domaine est valide et ne dispose pas d'enregistrement dmarc*/
                if(dmarc.includes('"v=DMARC')==false){
                    document.getElementById("codeDMARC").value="Votre domaine ne dispose pas d'enregistrement DMARC";
                    document.getElementById("codeDMARC").style.color="red";
                    document.getElementById("col12").style.backgroundColor = "red";
                    document.getElementById("col11").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGDmarc").style.color="red";
                    document.getElementById("texteDmarc").innerHTML="Nous n'avons trouvé aucun enregistrement DMARC associé à votre domaine.Vous devez générer un enregistrement DMARC pour protéger votre domaine contre les abus par les hameçonneurs et les spammeurs"
                    document.getElementById("enterDomaine").innerHTML="";
                    document.getElementById("domainNAme").style.borderColor="blue";
                    document.getElementById("enterDomaine").style.color="black";
                    document.getElementById("recordDmarc").innerHTML="";
                    document.getElementById("resultatDomaine").innerHTML=reponse["Txt_Resultat"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resulatDetail").innerHTML=reponse["Txt_Resultat_Detail"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                  }
                 else{
                  /*Action a realiser si le nom de domaine est valide et dispose d'un enregistrement dmarc, 
                   on recupere la valeur et on envoie sur la page html*/
                    document.getElementById("codeDMARC").value="txt= "+dmarc;
                    /*Decomposition et explication detaillee sur la valeur de l'enregistrement dmarc*/
                    dmarc=dmarc.split(";");
                    for(var i=0;i<dmarc.length;i++){
                     if(dmarc[i].includes("v=DMARC")){
                        document.getElementById("recordDmarc").innerHTML="<span>Version "+dmarc[i]+"</span>: La balise v est l'une des balises DMARC représentant la version du protocole DMARC et a toujours la valeur v=DMARC1.";
                     }
                     else if(dmarc[i].includes("p=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Politique "+dmarc[i]+ "</span>: La balise 'P' indique la règle que vous souhaitez que les opérateurs de messagerie appliquent lorsque votre message échoue à l'authentification DMARC.Tandis que la balise 'sp' est configurée pour définir un mode de politique pour vos sous-domaines.Vous pouvez choisir entre rejeter, mettre en quarantaine et aucun.";
                     }
                     else if(dmarc[i].includes("sp=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Politique Sous-domaine "+dmarc[i]+"</span>: La balise 'P' indique la règle que vous souhaitez que les opérateurs de messagerie appliquent lorsque votre message échoue à l'authentification DMARC.Tandis que la balise 'sp' est configurée pour définir un mode de politique pour vos sous-domaines.Vous pouvez choisir entre rejeter, mettre en quarantaine et aucun.";
                     }
                     else if(dmarc[i].includes("pct=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Pourcentage "+dmarc[i]+"</span>: Cette balise représente le pourcentage d'emails auxquels le mode de politique est applicable.";
                     }
                     else if(dmarc[i].includes("rua=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Rapports agrégés "+dmarc[i]+"</span>: La balise rua est l'une des balises DMARC facultatives qui spécifie l'adresse électronique ou le serveur Web à partir duquel les organisations déclarantes doivent envoyer leurs données d'identification.";
                     }
                     else if(dmarc[i].includes("ruf=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Rapport légal d'échec "+dmarc[i]+"</span>: Cette balise permet aux opérateurs de messagerie de savoir où vous souhaitez recevoir vos rapports d'investigation numérique (messages). Ces rapports sont plus détaillés et sont conçus pour être remis par les opérateurs de messagerie presque immédiatement après la détection d'un échec d'authentification DMARC. Toutefois, en raison de problèmes potentiels liées à la confidentialité et à la performance, la majorité des opérateurs de messagerie ne les envoient pas. ";
                     }
                     else if(dmarc[i].includes("fo=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Option de rapport d'échec "+dmarc[i]+"</span>: Cette balise correspond aux options de rapport d'échec que les propriétaires de domaine peuvent choisir. Si vous n'avez pas activé ruf pour votre domaine, vous pouvez ignorer ce point.";
                     }
                     else if(dmarc[i].includes("aspf=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Alignement Spf "+dmarc[i]+"</span>: Cette balise représente le mode d'alignement du SPF. La valeur peut être soit stricte (s) soit relaxée (r).";
                     }
                     else if(dmarc[i].includes("adkim=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Alignement Dkim "+dmarc[i]+"</span>: De même, la balise adkim représente le mode d'alignement DKIM, dont la valeur peut être soit stricte (s), soit relaxée (r).";
                     }
                     else if(dmarc[i].includes("rf=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Format Rapport "+dmarc[i]+"</span>: La balise DMARC rf spécifie les différents formats pour les rapports légaux.";
                     }
                     else if(dmarc[i].includes("ri=")){
                        document.getElementById("recordDmarc").innerHTML+="<br/><br/><span>Interval de temps "+dmarc[i]+"</span>: Cette balise ri indique l'intervalle de temps en secondes entre deux rapports agrégés consécutifs envoyés par l'organisme de rapport au propriétaire du domaine.";
                     }
                  }    
                    document.getElementById("col11").style.backgroundColor = "green";
                    document.getElementById("col12").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGDmarc").style.color="green";
                    document.getElementById("texteDmarc").innerHTML="Votre domaine a un enregistrement DMARC valide et votre politique DMARC empêchera les abus de votre domaine par les hameçonneurs et les spammeurs";
                    document.getElementById("texteDmarc").style.color="black";
                    document.getElementById("enterDomaine").innerHTML="";
                    document.getElementById("domainNAme").style.borderColor="blue";
                    document.getElementById("enterDomaine").style.color="black";
                    document.getElementById("resultatDomaine").innerHTML=reponse["Txt_Resultat"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resulatDetail").innerHTML=reponse["Txt_Resultat_Detail"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resultatDomaine").style.color="black";
                    document.getElementById("resulatDetail").style.color="black";
                  }
                   /*Action a realiser si le nom de domaine est valide et ne dispose pas d'enregistrement dmarc*/
                 if(spf.includes('"v=spf')==false ){
                   document.getElementById("codeSPF").value="Votre domaine ne dispose pas d'enregistrement SPF";
                    document.getElementById("codeSPF").style.color="red";
                    document.getElementById("col22").style.backgroundColor = "red";
                    document.getElementById("col21").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGSpf").style.color="red";
                    document.getElementById("texteSPF").innerHTML="Nous n'avons trouvé aucun enregistrement SPF associé à votre domaine. Vous devez générer un enregistrement SPF pour protéger votre domaine contre les attaques de phishing par e-mail."
                    document.getElementById("enterDomaine").innerHTML="";
                    document.getElementById("domainNAme").style.borderColor="blue";
                    document.getElementById("enterDomaine").style.color="black";
                    document.getElementById("recordSpf").innerHTML="";
                    document.getElementById("resultatDomaine").innerHTML=reponse["Txt_Resultat"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resulatDetail").innerHTML=reponse["Txt_Resultat_Detail"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                 }
                 else{
                   /*Action a realiser si le nom de domaine est valide et dispose d'un enregistrement spf, 
                     on recupere la valeur et on envoie sur la page html*/
                    document.querySelector("#codeSPF").value="txt= "+spf;
                  /*Decomposition et explication detaillee sur la valeur de l'enregistrement spf*/
                    spf=spf.split(" ");
                    for(var i=0; i<spf.length;i++){
                       if(spf[i].includes('"v=spf')){
                        var def=" La balise v est obligatoire et représente la version du protocole.";
                        document.querySelector("#recordSpf").innerHTML="<span>"+spf[i]+":</span> "+def;
                     }
                       else if(spf[i].includes("mx")){
                        var def=" Inclut tous les serveurs de Mails associés au domaine.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span>" +def;
                      }
                       else if(spf[i].includes("a")){
                        var def=" Autorise l’hôte détecté dans l’enregistrement A du domaine à envoyer les e-mails..";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("ip4")){
                        var def=" Spécifie une adresse IP IPv4 autorisée à envoyer du courrier pour le domaine.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("ip6")){
                        var def=" Spécifie une adresse IP IPv6 ou une plage CIDR IP autorisée à envoyer du courrier pour le domaine.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("include")){
                        var def=" Il est utilisé pour autoriser les e-mails que l’expéditeur peut envoyer au nom d’un domaine";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("exists")){
                        var def=" Cette balise effectue une recherche d'enregistrement A sur le domaine utilisé pour voir s'il en existe un. Si l'enregistrement A existe, cela passe.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("ptr")){
                        var def=" Le ou les noms d’hôte/serveur pour l’adresse IP du client sont recherchés en utilisant des requêtes PTR. Les noms d’hôte/serveur sont ensuite validés, et au moins un des enregistrements A pour un nom d’hôte/serveur PTR doit correspondre à l’adresse IP du client d’origine. Les noms d’hôte/serveur non valides sont rejetés.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }
                       else if(spf[i].includes("all")){
                        var def=" indique au serveur du destinataire que les adresses non répertoriées dans cet enregistrement SPF ne sont pas autorisées à envoyer des e-mails. Il existe 3 options courantes utilisées qui permettent à un expéditeur de dire à l'utilisateur de rejeter le courrier qui correspond à l'enregistrement ( -all ), de traiter le courrier comme suspect ( ~all ) et une recommandation neutre ( ?all ) qui laisse le choix à destinataire. Dans la plupart des cas, traiter le courrier comme suspect fonctionnera ( ~all ) car cela entraînera généralement le marquage des messages non correspondants comme spam.";
                        document.querySelector("#recordSpf").innerHTML+="<br/><br/><span>"+spf[i]+":</span> "+def;
                       }                      
                    }
                    document.getElementById("col21").style.backgroundColor = "green";
                    document.getElementById("col22").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGSpf").style.color="green";
                    document.getElementById("texteSPF").innerHTML="Votre domaine a un enregistrement SPF valide. Vous êtes protégé contre toute utilisation frauduleuse de votre domaine (phishing).";
                    document.getElementById("texteSPF").style.color="black";
                    document.getElementById("enterDomaine").innerHTML="";
                    document.getElementById("domainNAme").style.borderColor="blue";
                    document.getElementById("enterDomaine").style.color="black";
                    document.getElementById("resultatDomaine").innerHTML=reponse["Txt_Resultat"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resulatDetail").innerHTML=reponse["Txt_Resultat_Detail"]+"<span>"+reponse["Txt_domaine"]+"</span>";
                    document.getElementById("resultatDomaine").style.color="black";
                    document.getElementById("resulatDetail").style.color="black";
                  }
                  /*Récupération de l'enrégistrement DKIM si le domaine en dispose*/
                  if(dkim!=="Not Found"){
                    document.getElementById("codeDKIM").value=dkim;
                    document.getElementById("codeDKIM").style.color="black";
                    document.getElementById("codeDKIM").style.height="auto";
                    document.getElementById("texteDKIM").innerHTML="Votre domaine dispose d'un enrégistement DKIM. Vos messages sont sécurisés de bout-en-bout et sont authentiques.";
                    document.getElementById("texteDKIM").style.color="black";
                    document.getElementById("col31").style.backgroundColor="green";
                    document.getElementById("col32").style.backgroundColor="rgb(250, 250, 254)";
                    document.getElementById("iconSVGDkim").style.color="green";
                     /*Explication sur les différentes balise dans l'enregistrement dkim*/
                     /*regex pour avoir la version v*/
                     regex=/v=[\w]+/;
                     regex=dkim.match(regex);
                     document.getElementById("recordDKIM").innerHTML="<span>"+regex+" :</span>"+"Version du protocole";
                     /*regex pour avoir la l'algorithme k*/
                     regex=/k=[\w]+/;
                     regex=dkim.match(regex);
                     document.getElementById("recordDKIM").innerHTML+="<br/><br/><span>"+regex+" :</span>"+"Type de la clée.Sa valeur par defaut est rsa";
                     /*regex pour avoir la clée publique p*/
                     regex=/p=[\w]+/;
                     regex=dkim.match(regex)
                     document.getElementById("recordDKIM").innerHTML+="<br/><br/><span>"+regex+" :</span>"+"Clée publique";
                  }
                  /*Si le domaine ne dispose pas d'enregistrement dkim*/
                  else{
                    document.getElementById("codeDKIM").value="Enrégistrement DKIM non trouvé.";
                    document.getElementById("codeDKIM").style.color="red";
                    document.getElementById("codeDKIM").style.height="30px";
                    document.getElementById("texteDKIM").innerHTML="Nous n'avons pas trouvé d'enrégistrement DKIM pour votre domaine. Cela peut être dû au fait que nous n'avons pas trouvé le délecteur pour votre domaine";
                    document.getElementById("texteDKIM").style.color="black";
                    document.getElementById("col31").style.backgroundColor="rgb(250, 250, 254)";
                    document.getElementById("col32").style.backgroundColor="red";
                    document.getElementById("iconSVGDkim").style.color="red";

                  }
                  /*Récupération de la valeur SSL du protocole HTTPS*/
                  if(ssl!="Not found"){
                    indexssl=ssl.lastIndexOf('CERTIFICATE');
                    ssl=ssl.substr(0,indexssl+16);
                    document.getElementById("codeHTTPS").value=ssl;
                    document.getElementById("col41").style.backgroundColor="green";
                    document.getElementById("col42").style.backgroundColor = "rgb(250, 250, 254)";
                    document.getElementById("iconSVGHttps").style.color="green";
                    document.getElementById("texteHTTPS").innerHTML="Votre domaine utilise le protocole HTTPS. Les messages envoyés via votre domaine sont sécurisés de bout en bout."
                    document.getElementById("texteHTTPS").style.color="black";
                    document.getElementById("codeHTTPS").style.color="black";
                    document.getElementById("codeHTTPS").style.textAlign="left";
                    document.getElementById("codeHTTPS").style.height="auto";

                    /*Utilisation des expressions regulieres(regex) pour sectionnees les differentes 
                    informations faisant reference au certificat ssl pour plus de comprehension*/
                    regex=/O = [-a-zA-Z0-9_.' ]+/;
                    regex=ssl.match(regex);
                    if(regex){
                    for(var i=0;i<regex.length;i++){       
                       document.getElementById("recordHttps").innerHTML="<br/><span>Organization</span> "+regex[i];
                    }
                  }

                    regex=/CN = [-a-zA-Z0-9.' ]+/;
                    regex=ssl.match(regex);
                    if(regex){
                    for(var i=0;i<regex.length;i++){
                        document.getElementById("recordHttps").innerHTML+="<br/><br/><span>Commun Name</span> "+regex[i];
                    }
                  }

                    regex=/C = [-a-zA-Z0-9.' ]+/;
                    regex=ssl.match(regex);
                    if(regex){
                    for(var i=0;i<regex.length;i++){
                        document.getElementById("recordHttps").innerHTML+="<br/><br/><span>Country name</span> "+regex[i];
                   }
                 }

                    regex=/OU = [-a-zA-Z0-9_.' ]+/;
                    regex=ssl.match(regex);
                    if(regex){
                    for(var i=0;i<regex.length;i++){
                        document.getElementById("recordHttps").innerHTML+="<br/><br/><span>OrganizationalUnit</span> "+regex[i];
                   }
                }

                   regex=/L = [-a-zA-Z0-9_.' ]+/;
                   regex=ssl.match(regex);
                   if(regex){
                   for(var i=0;i<regex.length;i++){
                      document.getElementById("recordHttps").innerHTML+="<br/><br/><span>Locality</span> "+regex[i];
                   }
                 }

                   regex=/a:[-a-zA-Z0-9_ :]+/;
                    regex=ssl.match(regex);
                    if(regex){
                    for(var i=0;i<regex.length;i++){
                      document.getElementById("recordHttps").innerHTML+="<br/><br/><span>Algorithm</span> "+regex[i];
                   }
                  }
                
                  /*regex=/ST = [-a-zA-Z0-9_. ]+/;
                  regex=ssl.match(regex);
                  if(regex){
                  for(var i=0;i<regex.length;i++){
                    document.getElementById("recordHttps").innerHTML+="<br/><br/><span>Date</span> "+regex[i];
                  }
                } */                    
                 /* Sectionnement et affichage des dates debut et fin du certificat ssl*/
                 datePre=ssl.indexOf("NotBefore");
                 datePre=ssl.substr(datePre,32);
                 datePre=datePre.replace("NotBefore"," ");
                 document.getElementById("recordHttps").innerHTML+="<br/><br/><span>Date début</span>"+datePre+" GMT";
                 dateFin=ssl.indexOf("NotAfter");
                 dateFin=ssl.substr(dateFin,31);
                 dateFin=dateFin.replace("NotAfter"," ");
                 document.getElementById("recordHttps").innerHTML+="<br/><span>Date Fin</span>"+dateFin+" GMT";

                 /*fonction pour calculer la difference des dates. date1=dateFin et date2=datedebut*/
                 var diff={};
                 function dateDiff(date1,date2){
                   dateBeg=date1;
                   dateEnd= date2;
                   date=date2.diff(date1,'days');
                   diff.dateYear=Math.floor(date/360);
                   diff.dateDays=Math.floor(date%360);
                   diff.dateMonth=Math.floor(diff.dateDays/30);
                   diff.dateDays=Math.floor(diff.dateDays%30);
                 return diff;
                }
                /*Fonction remplissage Html des dates */
                function remplissageDate(typeDiff){
                 type=typeDiff;
                   if(diff.dateYear===0 && diff.dateMonth===0 && diff.dateDays===0){
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>: Votre certificat ssl est expiré";
                   }
                   else if(diff.dateYear===0 && diff.dateMonth===0){
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>"+" :"+ "<span> "+diff.dateDays+"</span> "+" Jours";
                   }
                   else if(diff.dateYear===0 && diff.dateMonth!==0 && diff.dateDays!==0){
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>"+" :"+"<span> "+diff.dateMonth+"</span> "+" Mois,"+"<span> "+diff.dateDays+"</span> "+"Jours";
                   }
                   else if(diff.dateYear===0 && diff.dateMonth==0 && diff.dateDays!==0){
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>"+" :"+"<span> "+diff.dateDays+"</span> "+" Jours";  
                   }
                   else if(diff.dateYear===0 && diff.dateMonth!==0 && diff.dateDays==0){
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>"+" :"+"<span> "+diff.dateMonth+"</span> "+" Mois";
                   }
                   else if(diff.dateYear!==0 && diff.dateMonth==0 && diff.dateDays==0){
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>"+" :"+"<span> "+diff.dateYear+"</span> "+" Année(s)";
                   }
                   else if(diff.dateYear!==0 && diff.dateMonth!==0 && diff.dateDays==0){
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>"+" :"+"<span> "+diff.dateYear+"</span> "+" Année(s), "+"<span> "+diff.dateMonth+"</span> "+" Mois";
                   }
                   else if(diff.dateYear!==0 && diff.dateMonth==0 && diff.dateDays!==0){
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>"+" :"+"<span> "+diff.dateYear+"</span> "+" Année(s), "+"<span> "+diff.dateDays+"</span> "+" Jours";
                   }
                   else{
                       document.getElementById("recordHttps").innerHTML+="<br/><span>"+type+ "</span>"+" :"+"<span> "+diff.dateYear+"</span> "+" Année(s),"+"<span> "+diff.dateMonth+"</span> "+" Mois,"+"<span> "+diff.dateDays+"</span> "+" Jours";
                   } 
               }
                /*Appel de la fonction differenceDate pour calculer la duree totale de la validite du certificat*/
                dateDiff(new moment(datePre),new moment(dateFin));
                remplissageDate("Durée certificat");
                /*Appel de la fonction pour differenceDate calculer le temps restant avant l'echeance de la validite du certificat*/
                dateDiff(moment(),new moment(dateFin));
                remplissageDate("Temps restant");      
           }  
            else{
                  /*Si le domaine n'a pas de certificat SSL*/
                  document.getElementById("codeHTTPS").innerHTML="";
                  document.getElementById("col42").style.backgroundColor="red";
                  document.getElementById("col41").style.backgroundColor = "rgb(250, 250, 254)";
                  document.getElementById("iconSVGHttps").style.color="red";
                  document.getElementById("texteHTTPS").innerHTML="Votre domaine n'utilise le protocole HTTPS. Veuillez trouver un certificat SSL pour votre domaine afin de mieux sécuriser les messages qui transitent à partir de votre domaine.";
                  document.getElementById("texteHTTPS").style.color="black";
                  document.getElementById("codeHTTPS").value="Aucun certificat SSL/TLS Trouvé";
                  document.getElementById("codeHTTPS").style.color="red";
                  document.getElementById("codeHTTPS").style.textAlign="center";
                  document.getElementById("codeHTTPS").style.fontSize="20px";
                  document.getElementById("codeHTTPS").style.paddingTop="";
                  document.getElementById("codeHTTPS").style.height="50px";
                  document.getElementById("recordHttps").innerHtml=" ";
               }   
               
             }     
         }
   }
}

