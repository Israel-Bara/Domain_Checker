<?php 
header('Content-type:application/json;charset=utf-8');
/*On attribu a $domaine la valeur entré par l'utilisateur*/
     $domaine = (isset($_GET["domainNAme"])) ? $_GET["domainNAme"] : "";
     $resultat="Résultat pour ";
     $resultatDetail="Résultat détaillé pour ";
     /*Reponse a renvoyer si le nom de domaine entrer est le caractere vide*/
     if($domaine==""){
        $reponse="Veuillez entrer un nom de domaine";
        $reponseJson=json_encode($reponse);
        echo($reponseJson);
     }
     /*On verifie que le domaine existe et on recherche les enregistrement spf, dmarc et dkim*/
     else {
        $dns=shell_exec('nslookup -q=MX '.$domaine);
        $spf=shell_exec('nslookup -q=txt '.$domaine);
        $dmarc=shell_exec('nslookup -type=txt _dmarc.'.$domaine);
        $ssl=shell_exec('openssl s_client -connect www.'.$domaine.':443');
        $DKIM="";
        $selector=['google','default','iport'];
        for($i=0;$i<sizeof($selector);$i++){
        $dkim=shell_exec('dig '.$selector[$i].'._domainkey.'.$domaine.' txt +short');
        /*Si le domaine est valide et dkim est trouvé on récupère l'enregistrement*/
        if($dkim){
           $DKIM=$dkim;       
        }
       }
        if($DKIM!=""){
           $DKIM;
        }
        else{
             $DKIM="Not Found";
            }
        /*Si le nom de domaine est valide on renvoie la valeur de la'enregistrement spf*/
        if($spf && $dns){
            $SPF=$spf;
        }
        /*Si le nom de domaine est valide on renvoie la valeur de la'enregistrement dmarc*/
        if($dmarc && $dns){
            $DMARC=$dmarc;
        }
        if($dkim && $dns){
            $DKIM=$dkim;
        }
        /*Si le nom de domaine est valide et dispose d'un certificat ssl*/
        if($ssl && $dns){
            $SSL=$ssl;
        }
        /*Certificat ssl nom trouvé pour le domaine en question*/
        else{
            $SSL="Not found";
        }
        /*On met la reponse dans un array*/
         $reponse=array(
            "Txt_spf"=>$SPF,
            "Txt_dmarc"=>$DMARC,
            "Txt_dns"=>$dns,
            "Txt_dkim"=>$DKIM,
            "Txt_Resultat"=>$resultat,
            "Txt_Resultat_Detail"=>$resultatDetail,
            "Txt_domaine"=>$domaine,
            "Txt_ssl"=>$SSL
         );
         /*On encode l'array en format json*/
         $reponseJson=json_encode($reponse);
         /*On envoie la reponse du serveur*/
         echo ($reponseJson);
     }  
?>
