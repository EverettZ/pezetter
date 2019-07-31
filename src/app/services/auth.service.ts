import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../utils/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { auth } from 'firebase';
import { IResume } from '../utils/models/resume-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userRef: AngularFirestoreDocument<User>;
  resumeRef: AngularFirestoreDocument<any>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {

  }

  getUser() {
    if (!this.user$) {

      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {

          if (user) {

            return this.afs.doc<User>(`users/${user.uid}`).valueChanges().pipe(
              map(u => {
                return {
                  ...u,
                  resume: u.resume.path
                }
              })
            );

          }

          return of(null);
        }),
        tap((user) => {
          if(!user) {
            this.router.navigate(['admin', 'login']);
          }
        })
      );

    }

    return this.user$;
  }

  async signIn(signInData) {
    // const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithEmailAndPassword(signInData.email, signInData.pw);
    // return this.updateUserData(credential.user);
  }

  updateUserData(user) {

    if (!this.userRef) {

      this.userRef = this.afs.doc(`users/${user.uid}`);

    }

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      gitUserName: user.gitUserName,
      resumeGist: user.resumeGist
    };

    return this.userRef.set(data, { merge: true });
  }

  async signOut() {

    await this.afAuth.auth.signOut();

  }

  async updateResume(id: string) {
    const data = {
      "name": "Everett Zettersten",
      "dob": new Date('Tue Jul 18 1995 00:00:00 GMT-0400 (EDT)'),
      "email": "everett@zettersten.com",
      "avatar": "https://avatars0.githubusercontent.com/u/2085059?s=400&u=5b7e833fa5f41f5cc9266043dfbda472eb026491&v=4",
      "phone": "(703) 475-3433",
      "position": "Software Engineer",
      "description": "A results-driven, user experience-focused, articulate and analytical Software Engineer with a passion for emerging tech in the web development space. Desires to innovate with exciting technical solutions and to continue to learn the full stack of web development in an Agile way. Brings advanced knowledge of Object-Oriented JavaScript, modern JS libraries, CSS, HTML 5, AngularJS, and Angular 6.",
      "items": [
        {
          "name": "education",
          "length": "3",
          "items": [
            {
              "title": "George Mason University",
              "subTitle": "Studied Computer Science",
              "start": new Date("Wed Jan 01 2014 00:00:00 GMT-0500 (Eastern Standard Time)"),
              "end": new Date("Fri Jan 01 2016 00:00:00 GMT-0500 (Eastern Standard Time)"),
              "data": [
                {
                  "type": "location",
                  "value": "Fairfax, VA"
                },
                {
                  "type": "text",
                  "value": "Dean's list covering 9 credit hours - Summer 2015"
                },
                {
                  "type": "text",
                  "value": "Heavy focus on Object Oriented Programming, data structures in Java, and basic C programming. In addition, there was an emphasis on recursion, algorithm design, data structures, and Linux operating systems."
                },
                {
                  "type": "text",
                  "value": "Implemented a mock disk storage structure using a circularly linked list. Test cases were down with large formatted files. The disk structure was indexed to increase search efficiency."
                },
                {
                  "type": "text",
                  "value": "Built a teacher student database in java using doubly linked lists. Teachers had students, some in multiple classes of theirs. Each teacher had a linked list of students. The students would have references to their classes. Classrooms could be built by searching the list of students."
                },
                {
                  "type": "text",
                  "value": "Created a Binary Search Tree to implement Sets with their normal operators: union, intersection, complement, and difference."
                },
                {
                  "type": "text",
                  "value": "Wrote research papers on various technical topics (electric cars, automation) along with public presentations on those topics to large lectures."
                }
              ]
            },
            {
              "title": "University of Kentucky",
              "subTitle": "",
              "start": new Date("Tue Jan 01 2013 00:00:00 GMT-0500 (Eastern Standard Time)"),
              "end": new Date("Wed Jan 01 2014 00:00:00 GMT-0500 (Eastern Standard Time)"),
              "data": [
                {
                  "type": "location",
                  "value": "Lexington, KY"
                },
                {
                  "type": "text",
                  "value": "Dean's list covering 28 credit hours - Fall 2013 - Spring 2014"
                },
                {
                  "type": "text",
                  "value": "Courses served as an introduction into Computer Science."
                },
                {
                  "type": "text",
                  "value": "Introductory python course. Simply algorithms, data structures, and unit testing."
                },
                {
                  "type": "text",
                  "value": "C++ course. Introduced to Object Oriented Programming, linked lists, stacks, queues, and trees."
                },
                {
                  "type": "text",
                  "value": "Language constructs that support algorithm design, such as recursive vs. iterative methods."
                },
                {
                  "type": "text",
                  "value": "Memory usage with pointers and dynamic storage."
                },
                {
                  "type": "text",
                  "value": "Created a simple repetition-based compression and decompression algorithm with Python utilizing selection sort to order the sorted list and match each value with the number of repetitions and position of the word/character."
                },
                {
                  "type": "text",
                  "value": "Designed, implemented, and tested a minesweeper game built with C++. Built a probability-based AI algorithm to solve the randomly generated boards."
                }
              ]
            }
          ]
        },
        {
          "name": "experience",
          "length": "4",
          "items": [
            {
              "title": "Software Engineer",
              "subTitle": "Web, Mobile, and API",
              "start": new Date("Wed Jun 01 2016 00:00:00 GMT-0400 (Eastern Daylight Time)"),
              "end": null,
              "data": [
                {
                  "type": "location",
                  "value": "Electronic Transaction Systems"
                },
                {
                  "type": "text",
                  "value": "EMoney iOS, Android, and PWA — EMoney & wallet.emoney.com"
                },
                {
                  "type": "text",
                  "value": "Developed and aided in the design of a new mobile wallet application built with Ionic 3 and Angular 5."
                },
                {
                  "type": "text",
                  "value": "Defined typed success and error response models for all API requests. Added http interceptors to handle authentication tokens throughout the application."
                },
                {
                  "type": "text",
                  "value": "Built from the ground up over 70 custom angular components, directives, pipes, providers, and guards."
                },
                {
                  "type": "text",
                  "value": "Used complex dynamic forms to accept and validate user inputs."
                },
                {
                  "type": "text",
                  "value": "Integrated Webpack to handle the build process and bundling with an addition of service workers, cache-busting, and CDN’s to deliver a performant PWA version of the application."
                },
                {
                  "type": "text",
                  "value": "Implemented a caching service to handle known constant data from potentially large HTTP requests with Angular’s HttpClient."
                },
                {
                  "type": "text",
                  "value": "Leveraged an agile project management style to gather requirements and used weekly sprints throughout the design process to work towards and agreed upon user experience."
                },
                {
                  "type": "text",
                  "value": "Led the development process and set up testing environments through Google Play Console and iTunes Connect TestFlight to increase test coverage and bug tracking."
                },
                {
                  "type": "text",
                  "value": "Interface with testers to receive feedback through Jira tickets that are the prioritized and filtered into weekly sprints."
                },
                {
                  "type": "text",
                  "value": "Successfully scaled with over 7,000 installs since its release mid-2017."
                },
                {
                  "type": "text",
                  "value": "Interfaced directly with customers and executives to provide and receive input on requirements, technical specifications, and cost analysis."
                },
                {
                  "type": "text",
                  "value": "Developed a media library to securely and conveniently store company files online."
                },
                {
                  "type": "text",
                  "value": "Used Angular 2 and a back-end .NET Core REST API."
                },
                {
                  "type": "text",
                  "value": "Implemented Azure table and blob storage as the database layer."
                },
                {
                  "type": "text",
                  "value": "Built a WYSIWYG email creator from scratch in AngularJS and implemented it an enterprise web application called app.emoney.com"
                },
                {
                  "type": "text",
                  "value": "Dynamically created templates based on user inputs like font size, text position, text styling, links, buttons, colors, and more."
                },
                {
                  "type": "text",
                  "value": "Implemented with HTML 5 drag and drop."
                }
              ]
            },
            {
              "title": "Technical Support",
              "subTitle": "Family Room Specialist",
              "start": new Date("Mon Aug 01 2015 00:00:00 GMT-0400 (Eastern Daylight Time)"),
              "end": new Date("Wed Jun 01 2016 00:00:00 GMT-0400 (Eastern Daylight Time)"),
              "data": [
                {
                  "type": "location",
                  "value": "Apple Inc, Reston"
                },
                {
                  "type": "text",
                  "value": "Provided insight and friendly technical support in a fast-paced environment."
                },
                {
                  "type": "text",
                  "value": "Acquired time management skills, troubleshooting expertise, and critical communication techniques with customers and co-workers."
                }
              ]
            },
            {
              "title": "Crew Member",
              "subTitle": "Inventory Management",
              "start": new Date("Thu Sep 01 2012 00:00:00 GMT-0400 (Eastern Daylight Time)"),
              "end": new Date("Mon Aug 01 2015 00:00:00 GMT-0400 (Eastern Daylight Time)"),
              "data": [
                {
                  "type": "location",
                  "value": "Trader Joes, Reston"
                },
                {
                  "type": "text",
                  "value": "Applied leadership skills by promoting collaboration between team members in a physically demanding environment."
                },
                {
                  "type": "text",
                  "value": "Facilitated employee schedules and daily work plans by communicating with co-workers about their needs and the team needs."
                },
                {
                  "type": "text",
                  "value": "Managed inventory and dispersed truck load deliveries to the team. Trained and provided feedback on performance and potential of new employees."
                }
              ]
            },
            {
              "title": "Intern",
              "subTitle": "HTML & Content management",
              "start": new Date("Fri Jun 01 2012 00:00:00 GMT-0400 (Eastern Daylight Time)"),
              "end": new Date("Thu Aug 30 2012 00:00:00 GMT-0400 (Eastern Daylight Time)"),
              "data": [
                {
                  "type": "text",
                  "value": "Perfect Sense Digital, LLC"
                },
                {
                  "type": "text",
                  "value": "Collaborated with Junior and Senior level developers on projects including the Coca-Cola Sustainability Project and Travora.com."
                },
                {
                  "type": "text",
                  "value": "Exercised clear communication within a team and met aggressive project deadlines. Introduced to web-development with JavaScript, HTML, and CSS."
                }
              ]
            }
          ]
        },
        {
          "name": "personal",
          "length": "1",
          "items": [
            {
              "title": "Charity",
              "subTitle": "Church",
              "start": null,
              "end": null,
              "data": [
                {
                  "type": "link",
                  "value": "https://www.restonbible.org/volunteer"
                },
                {
                  "type": "text",
                  "value": "Charity is important to me and my primary avenue is with my Church to provide food to families and money to service trips abroad."
                }
              ]
            },
            {
              "title": "Basketball",
              "subTitle": "Coaching & Playing",
              "start": null,
              "end": null,
              "data": [
                {
                  "type": "link",
                  "value": "http://leag1.com/?org=herndonoptimistbasketball.com"
                },
                {
                  "type": "text",
                  "value": "Basketball has been my favorite sport as long as I can remember. I’ve used it as a way to gain leadership skills by coaching youth teams in Herndon with the help of senior coaching staff connections I have made in the past."
                }
              ]
            },
            {
              "title": "Stack Overflow",
              "subTitle": "Answering web development questions",
              "start": null,
              "end": null,
              "data": [
                {
                  "type": "link",
                  "value": "https://stackoverflow.com/users/3072366/pezetter"
                },
                {
                  "type": "text",
                  "value": "Top 5 percent in the world in points accrued with an Angular tag"
                },
                {
                  "type": "text",
                  "value": "I enjoy solving problems and answering questions posted on Stack Overflow, with most of my focus on Angular."
                }
              ]
            }
          ]
        },
        {
          "name": "portfolio",
          "length": "0",
          "items": [
            {
              "title": "EMoney",
              "subTitle": "iOS, Android, and PWA",
              "start": new Date("Tue Jan 01 2013 00:00:00 GMT-0500 (Eastern Standard Time)"),
              "end": new Date("Wed Jan 01 2014 00:00:00 GMT-0500 (Eastern Standard Time)"),
              "data": [
                {
                  "type": "text",
                  "value": "Mobile wallet application used to send or request funds, pay invoices, pay for transit, and more."
                },
                {
                  "type": "text",
                  "value": "Developed using Ionic 3."
                }
              ]
            },
            {
              "title": "app.emoney.com",
              "subTitle": "Enterprise web application",
              "start": null,
              "end": null,
              "data": [
                {
                  "type": "text",
                  "value": "Created an email WYSIWYG creator module."
                },
                {
                  "type": "text",
                  "value": "Created an text marketing creation module."
                },
                {
                  "type": "text",
                  "value": "Developed using AngularJS."
                },
                {
                  "type": "text",
                  "value": "Used to send emails or texts to a businesses customers."
                }
              ]
            },
            {
              "title": "angular-cc-expiration-date",
              "subTitle": "Angular 2+ credit card expiration date formatter",
              "start": null,
              "end": null,
              "data": [
                {
                  "type": "text",
                  "value": "Created a directive to format credit card expiration dates on input"
                },
                {
                  "type": "text",
                  "value": "Created a pipe to format credit card expiration dates"
                }
              ]
            }
          ]
        },
        {
          "name": "skills",
          "length": "17",
          "items": [
            {
              "title": "Languages",
              "subTitle": "",
              "start": null,
              "end": null,
              "data": [
                {
                  "type": "text",
                  "value": "JavaScript"
                },
                {
                  "type": "text",
                  "value": "C#"
                },
                {
                  "type": "text",
                  "value": "Java"
                },
                {
                  "type": "text",
                  "value": "C++"
                },
                {
                  "type": "text",
                  "value": "C"
                },
                {
                  "type": "text",
                  "value": "Python"
                }
              ]
            },
            {
              "title": "Technical",
              "subTitle": "",
              "start": null,
              "end": null,
              "data": [
                {
                  "type": "text",
                  "value": "Angular2+: TypeScript, RxJS, Observable operators, Angular CLI, Module Sharing, Lazy loading, Feature modules, Dependency injection, Angular animations, Services/Injectables, Template driven and dynamic forms, HttpClient, Karma Testing, OAuth"
                },
                {
                  "type": "text",
                  "value": "Agile Methodology: Specification gathering, Designing, Source control (CLI and GUI), Weekly deliveries and stand ups, Testing and issue tracking with Jira"
                },
                {
                  "type": "text",
                  "value": "AngularJS: CoffeeScript, View-independent business logic, Factories, Functional programming"
                },
                {
                  "type": "text",
                  "value": "Continuous Integration and deployment: Firebase hosting, GitHub, bitbucket build pipelines, Travis CI"
                },
                {
                  "type": "text",
                  "value": "App bundling: Webpack, Gulp"
                },
                {
                  "type": "text",
                  "value": "CSS: SASS/SCSS, Animations, Keyframes, Media queries, Variables, Application themes, Bootstrap, Material Design"
                }
              ]
            }
          ]
        },
        {
          "name": "social",
          "length": "3",
          "items": [
            {
              "title": "StackOverflow",
              "subTitle": "everett",
              "start": null,
              "end": null,
              "data": [
                {
                  "type": "link",
                  "value": "https://stackoverflow.com/users/3072366/everett"
                }
              ]
            },
            {
              "title": "Facebook",
              "start": null,
              "end": null,
              "subTitle": "pezetter",
              "data": [
                {
                  "type": "link",
                  "value": "https://www.facebook.com/pezetter"
                }
              ]
            },
            {
              "title": "LinkedIn",
              "start": null,
              "end": null,
              "subTitle": "Everett Zettersten",
              "data": [
                {
                  "type": "link",
                  "value": "https://www.linkedin.com/in/everett-zettersten-473b9a55/"
                }
              ]
            },
            {
              "title": "GitHub",
              "start": null,
              "end": null,
              "subTitle": "EverettZ",
              "data": [
                {
                  "type": "link",
                  "value": "https://github.com/EverettZ"
                }
              ]
            }
          ]
        }
      ]
    }


    if (!this.resumeRef) {

      this.resumeRef = this.afs.doc(`users/${id}/resume/J972tP12BEBRaGJpfRvX`);

    }

    return await this.resumeRef.set(data);


  }

}
