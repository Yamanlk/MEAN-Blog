import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-blog ',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  articles = [
    {
      "header": "This one",
      "content": "Note that just as a form group contains a group of controls, the profile form FormGroup is bound to the form element with the FormGroup directive ...",
      "isLoved": true,
      "categories": ["Node js", "Angular 8", "MongoDB", "Mongoose"],
      "id": "5d92671296a8d419901319a5"
    },
    {
      "header": "React huh",
      "content": "Note that just as a form group contains a group of controls, the profile form FormGroup is bound to the form element with the FormGroup directive ...",
      "isLoved": true,
      "categories": ["Node js", "React js", "Flux"],
      "id": "someID"
    },
    {
      "header": "Build Somthing weird",
      "content": "Note that just as a form group contains a group of controls, the profile form FormGroup is bound to the form element with the FormGroup directive ...",
      "isLoved": true,
      "categories": ["Bazel", "Yarn", "Python", "GO"],
      "id": "someID"
    },
    {
      "header": "Node JS only",
      "content": "Note that just as a form group contains a group of controls, the profile form FormGroup is bound to the form element with the FormGroup directive ...",
      "isLoved": false,
      "categories": ["Node js", "Pug", "SQL","Node js", "Pug", "SQL","Node js", "Pug", "SQL"],
      "id": "someID"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  onClickArticle(id) {
  }

}
