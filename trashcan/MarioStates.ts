namespace Script {
  export interface State{
    update(inputState: InputState): State
  }

  
  export class IdleState implements State {
    update(inputState: InputState): State {
      if (inputState.isLeftKeyPressed || inputState.isRightKeyPressed){
        return new WalkState();
      }
      return this;
    }
  }
  export class WalkState implements State {
    
    update(inputState: InputState): State {
      return this;
    }
  }
  export class RunState implements State {
    
    update(inputState: InputState): State {
      return this;
    }
  }
  export class JumpState implements State {
    
    update(inputState: InputState): State {
      return this;
    }
  }
  export class DeathState implements State {
    
    update(inputState: InputState): State {
      return this;
    }
  }
  export let idleState: IdleState = new IdleState();
  export let walkState: WalkState = new WalkState();
  export let runState: RunState = new RunState();
  export let jumpState: JumpState = new JumpState();
  export let deathState: JumpState = new DeathState();
}