import { Injectable, OnDestroy } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Message } from 'src/app/Modules/Message/Message.Domain/Message.Models/Message';
import { environment } from 'src/environements/environement';



@Injectable({
    providedIn: 'root',
  })
export class SocketService implements OnDestroy{

    private stompClient:any;
    private messageSubject:  ReplaySubject<Message> = new ReplaySubject<Message>();
    constructor( 
        ) { 
          this.initConnexion();
        }

    initConnexion(){
      //const url = '//localhost:8090/server-messages';
      const socket = new SockJS(environment.socketURL);
        this.stompClient = Stomp.over(socket);
      }

      joinConversation(){
        this.stompClient.connect({}, ()=>{
          console.log('socket Connected');
          this.stompClient.subscribe(`/topic/clients-m`, (messages: any) => {
            const messageContent = JSON.parse(messages.body);
/*             const currentMessage = this.messageSubject.getValue();
            currentMessage.push(messageContent); */
    
            this.messageSubject.next(messageContent);
          })
        })
      }
  
      sendMessage(message:Message){
        this.stompClient.send(`/app/client-messages`, {}, JSON.stringify(message));
  
      }
      getMessageSubject(){
        return this.messageSubject.asObservable();
      }

      ngOnDestroy() {
        this.stompClient.unsubscribe();
        this.stompClient.disconnect();

      }
    }