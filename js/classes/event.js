class Event{
  constructor(game){
    this.game = game;
  }

  update(day, month){
    // Jouer les événements incertains (fonction rand)
    if(this.game.chat.key == '') // Vérifier qu'aucun tuto est ouvert est en train d'être joué
      this.rand(day, month);

    // Jouer les événements certains
    this.prime1(day, month);
  }

  /////////////// TOUT LES EVENEMENTS INCERTAINS
  rand(day, month){
    if(1 == this.getRandomInt(1000)) // Une chance sur X+1 de réaliser l'event
      this.erruption();
  }

  erruption(){
    this.game.chat.open("volcan");
    this.game.level.cameras.main.shake(1000, 0.02); // Effet pour eruption volcanique
  }

  /////////////// TOUT LES EVENEMENTS CERTAINS

  prime1(day, month){
    if(day == 1 && month == 12){
      if(this.game.chat.key == '') // Si rien n'est ouvert (tuto ou event special) on affiche qqch
        this.game.chat.open("prime1");
      else
        console.log("L'événement prime1 commence");
      // Rajouter un else afficher un texte dans une future console à implementer
      // (pr que le joueur sache quandd meme qu'il y a eu qqch mais sans avoir eu la grosse notif du chat ?)

      this.prime1_played = true;
      this.game.productivity *= 1.2;
    }
    if(day == 1 && month == 2){
      if(this.prime1_played == true){ // Assure une sécurité si jamais le joueur démarre pendant la période de l'event,
                       // Sinon il se serait tapé une productivité divisée par 1.2 alors qu'il était à 1
        if(this.game.chat.key == '') // Si rien n'est ouvert (tuto ou event special) on affiche qqch
          this.game.chat.open("prime1_end");
        else
          console.log("L'événement prime1 est terminé");

        this.prime1_played = false;
        this.game.productivity /= 1.2;
      }
    }
  }
  /////////////////////////////

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
