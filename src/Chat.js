import DataStreamHandler from "./DataStreamHandler";

class Chat{
    constructor(){
        this.el = $('#chat');
        document.addEventListener('receivedMessage', (e) => this.handleMessage(e));
        $('#sendMessage', this.el).on('click', this.sendMessage);
        $('input', this.el).on('keydown', (e) => this.handleKeyPress(e));
    }
    sendMessage(){
        let input = $('input', this.el);
        DataStreamHandler.sendMessage(input.val());
        $('.messages', this.el).append($('<div>').append($('<span>').text("you: " + input.val())));
        input.val('');
    }
    handleKeyPress(e){
        if(e.keyCode == 13){
            this.sendMessage();
        }
    }
    handleMessage(e){
        let message = e.detail.message;
        let type = e.detail.type;


        $('.messages', this.el).append($('<div>').append($('<span>', {class: type=='server'? 'server-message' : ''}).text(message)));
    }
}
export default Chat;