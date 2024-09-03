import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskInterface} from "./interfaces/task-interface";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'digi-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'TODOLIST';
  name: string = 'Toto';
  id: string = 'id-du-titre';
  isHidden: boolean = false;
  tasks: TaskInterface[] = [
    {
      id: '1',
      name: 'Faire les courses',
      done: false,
      comment:
        'Je dois acheter du pain, du lait et des oeufs pour le petit déjeuner.',
    },
    {
      id: '2',
      name: 'Repondre aux mails',
      done: false,
      comment: 'Je dois répondre à mes mails avant 10h30.',
    },
    {
      id: '3',
      name: 'Appeler le médecin',
      done: false,
      comment: 'Je dois prendre rendez-vous pour mon vaccin.',
    },
    {
      id: '4',
      name: 'Faire du sport',
      done: false,
    },
    {
      id: '5',
      name: 'Lire un livre',
      done: false,
    }
  ];
}
