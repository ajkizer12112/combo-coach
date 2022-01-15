# Combo Coach Boxing

## About

Combo Coach Boxing is a boxing timer designed to keep the workout engaging by generating combos and randomly-timed follow up sequences.  It can be used when training on either the heavy bag, double-end bag, or shadow-boxing to improve your boxing skills or to have an excellent guided workout.

### Purpose

The motivation behind this project was to help the creator gain an understanding of how to use react hooks to manage state and encapsulate logic and have a cleaner app structure, as well as to solve a small, real-world problem.

#### The problem it solves

Having trained in the sweet science of boxing for 4 years, I've grown to love the training aspect of the sport.  I especially loved coming into the gym, having my coach hold mitts, and allow my body to do the work without thinking of what specific sequences I should try.  Having a coach run me through proven patterns, committing them to muscle memory, and having those automatic actions be triggerred by the sight of the mitts allowed me to push myself physically much more than if I were to have to stand there and think about everything myself.

I wanted to build something that would allow users to practice boxing fundamentals in a fun and interesting way that would simulate this learning experience.

#### How it works

- User selects options affecting the workout time, rest time, and other variables
- User starts the workout, which will run according to the options set previously
- Timer will display a combination sequence, noted in common boxing shorthand, and will continuously perform the combination
- Every 3 seconds, there is a 15% chance that a follow-up opportunity will occur and will be displayed on the screen, indicating that the combination PLUS the follow up sequence should be performed.


### Planned features and updates

- Ability to change the probability that a follow-up opportunity will occur
- Additional boxing combinations to choose from (Intermediate, Counter Puncher, Mike Tyson, Evander Holyfield, Jack Dempsey)
- Styling '(subtle animations on combo display for better UX, increase visual appeal)


### How to run

Run ```npm install``` in terminal to install dependencies, followed by ```npm start``` to open.  The default app location is set to ```localhost:3000```