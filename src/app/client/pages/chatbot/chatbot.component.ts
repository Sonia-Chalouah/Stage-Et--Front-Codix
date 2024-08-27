import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  isChatbotVisible: boolean = false; // Initialement caché

  @ViewChild('chatMessages', { static: false }) chatMessages: ElementRef | undefined;

  constructor(private clientService: ClientService) {}

  sendMessage() {
    if (this.userMessage.trim() === '') return;

    this.messages.push({ text: this.userMessage, isUser: true });
    const messageToSend = this.userMessage;
    this.userMessage = '';
    
    this.clientService.sendMessageToChatbot(messageToSend).subscribe(
      (response: any) => {
        this.messages.push({ text: response.response, isUser: false });
        this.scrollToBottom();
      },
      (error) => {
        console.error('Error sending message to chatbot:', error);
        this.messages.push({ text: 'Erreur lors de la communication avec le chatbot.', isUser: false });
        this.scrollToBottom();
      }
    );
  }

  scrollToBottom() {
    if (this.chatMessages) {
      setTimeout(() => {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      }, 100);
    }
  }

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible; // Inverse l'état de visibilité
  }
}
