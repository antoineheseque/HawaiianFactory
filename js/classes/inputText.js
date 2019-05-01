class InputText{
  constructor(phaser){
    this.phaser = phaser;
    this.callback = null;
    this.create();
  }

  getText(placeholderText, submitText, callback){
    this.callback = callback;
    this.open(placeholderText, submitText);
  }

  open(placeholderText, submitText){
    // Show enter text
    this.element.setVisible(true);

    var inputMessage = this.element.getChildByName('message');
    var validMessage = this.element.getChildByName('button');

    this.element.addListener('click');
    console.log(inputMessage);
    console.log(validMessage);
    inputMessage.placeholder = placeholderText;
    validMessage.value = submitText;
  }

  close(){
    this.element.setVisible(false);
  }

  create(){
    this.element = this.phaser.add.dom(0, 0).createFromCache('textInput');
    this.element.width = this.phaser.width;
    this.element.height = this.phaser.heigh;

    var inputMessage = this.element.getChildByName('message');
    inputMessage.value = "Unknown";

    var input = this;
    this.element.on('click', function (event) {
        if (event.target.name === 'button')
        {
            var inputMessage = this.getChildByName('message');

            //  Have they entered anything?
            if (inputMessage.value !== '')
            {
                //  Turn off the click events
                this.removeListener('click');

                //  Populate the text with whatever they typed in as the username!
                console.log(inputMessage.value);

                if(input.callback != null){
                  input.callback(inputMessage.value);
                  input.callback == null;
                }

                inputMessage.value = '';
                input.close();
            }
        }
    });
    this.close();
  }
}
