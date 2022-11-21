namespace Script {
  export enum MarioState {
    IDLE,
    WALK,
    RUN,
    JUMP,
    DIE
  }

  export class MarioStateMachine {
    animations: MarioAnimations;
    mario: Avatar;
    marioMtxLocal: ƒ.Matrix4x4;

    readonly xSpeed: number = 1.5;
    readonly xRunSpeed: number = 3;
    
    currentState: MarioState;
    currentOrientation: String = "right";

    constructor(marioInstance: Avatar, animations: MarioAnimations, initState: String) {
      this.mario = marioInstance;
      this.animations = animations;
      
      this.marioMtxLocal = this.mario.getComponent(ƒ.ComponentTransform).mtxLocal;
      this.changeState(initState);
      
    }

    update(inputState: InputState, deltaTime: number): void {
      if (inputState.isLeftKeyPressed && inputState.isRightKeyPressed) {return};
      if (inputState.isLeftKeyPressed) { this.setOrientation("left")};
      if (inputState.isRightKeyPressed) { this.setOrientation("right")};
      switch (this.currentState) {
        case MarioState.IDLE:
          if (inputState.isLeftKeyPressed || inputState.isRightKeyPressed) {
            if (inputState.isShiftKeyPressed) {
              this.changeState("run");
              break;
            };
            this.changeState("walk");
          }
          break;
        case MarioState.WALK:
          this.marioMtxLocal.translateX(this.xSpeed * deltaTime, true);
          if (inputState.isShiftKeyPressed) {
            this.changeState("run");
          }
          if (!(inputState.isLeftKeyPressed || inputState.isRightKeyPressed)) {
            this.changeState("idle");
          }
          break;
        case MarioState.RUN:
          this.marioMtxLocal.translateX(this.xRunSpeed * deltaTime, true);
          if (!(inputState.isLeftKeyPressed || inputState.isRightKeyPressed)) {
            this.changeState("idle");
          }
          if (!inputState.isShiftKeyPressed) {
            this.changeState("walk");
          }
          break;
        case MarioState.JUMP:
          break;
        case MarioState.DIE:
          break;
      }
    }

    changeState(nextState: String): void {
      switch (nextState) {
        case "idle":
          this.mario.setAnimation(this.animations.idle);
          this.currentState = MarioState.IDLE;          
          break;
        case "walk":
          this.mario.setAnimation(this.animations.walk);
          this.currentState = MarioState.WALK;
          break;
        case "run":
          this.mario.setAnimation(this.animations.run);
          this.currentState = MarioState.RUN;
          break;
        case "jump":
          this.mario.setAnimation(this.animations.jump);
          this.currentState = MarioState.JUMP;

          break;
        case "die":
          this.mario.setAnimation(this.animations.die);
          this.currentState = MarioState.DIE;
          break;
      }
    }
    
    setOrientation(orientation: string) {
      if (this.currentOrientation == orientation) {return};

      let orientationFactor: number;

      switch (orientation) {
        case "right":
          orientationFactor = 0;
          break;
        case "left":
          orientationFactor = 1;
          break;
      }

      this.marioMtxLocal.rotation = ƒ.Vector3.Y(orientationFactor * 180);
      
      this.currentOrientation = orientation;
    }


  }
  
}
