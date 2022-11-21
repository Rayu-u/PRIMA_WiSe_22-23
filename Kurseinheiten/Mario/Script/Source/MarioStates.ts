namespace Script {
  export interface State{
    update(event: Event): void,
    input(event: KeyboardEvent): void
  }

  export class IdleState implements State {
    update(event: Event): void {
      console.log("damn");
      
    }

    input(event: KeyboardEvent): void {
      console.log("damn");

    }
  }
  export class WalkState implements State {

    update(event: Event): void {
      
    }

    input(event: KeyboardEvent): void {

    }
  }
  export class RunState implements State {

    update(event: Event): void {
      
    }

    input(event: KeyboardEvent): void {

    }
  }
  export class JumpState implements State {

    update(event: Event): void {
      
    }

    input(event: KeyboardEvent): void {

    }
  }
}