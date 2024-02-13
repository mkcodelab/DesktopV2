import { Injectable } from '@angular/core';

export type User = {
  name: string,
  surname: string,
  gender: string,
  age: number,

}

type Gender = 'male' | 'female';


@Injectable({
  providedIn: 'root'
})
export class GenerateUserService {

  constructor() { }

  maleNames: string[] = ['john', 'paul', 'stefan', 'steven', 'leopold', 'greg', 'louis', 'thomas', 'martin'];

  femaleNames: string[] = ['sarah', 'silvia', 'joan', 'agnes', 'amanda', 'lidia', 'elizabeth', 'lisbeth', 'victoria']

  surnames: string[] = ['cox', 'pulley', 'stevenson', 'kerry', 'landon', 'farren', 'smooth', 'vicci', 'sanderson', 'holt', 'xander']

  generatePerson(_gender: Gender): User {

    let _name: string;
    let _surname: string = this.surnames[Math.floor(Math.random() * this.surnames.length)];
    let _age: number = Math.floor(Math.random() * 50);

    if (_gender === 'male') {
      _name = this.maleNames[Math.floor(Math.random() * this.maleNames.length)];
    } else {
      _name = this.femaleNames[Math.floor(Math.random() * this.femaleNames.length)];
    }
    return {name: _name, surname: _surname, gender: _gender, age: _age}
  }

  generatePersonArray(quantity: number = 1, gender?: Gender | undefined): User[]{
    
    let personArray: User[] = []
    for (let i = 0; i <= quantity; i++) {
      // if gender not present, randomize betweeen them
      let _gender: Gender = gender || Math.random() > 0.5 ? 'male' : 'female';
      personArray.push(this.generatePerson(_gender))
    }
    return personArray
  }
}
