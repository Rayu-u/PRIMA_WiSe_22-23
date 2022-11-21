namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  enum MarioStates {
    IDLE, WALK, RUN
  }

  export class StateMachineMario extends ƒAid.ComponentStateMachine<MarioStates> {
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(StateMachineMario);
    private static instructions: ƒAid.StateMachineInstructions<MarioStates> = StateMachineMario.get();
    
    constructor() {
      super();
      this.instructions = StateMachineMario.instructions;
      
      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
      return;
      
      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }
    
    public static get(): ƒAid.StateMachineInstructions<MarioStates> {
      let setup: ƒAid.StateMachineInstructions<MarioStates> = new ƒAid.StateMachineInstructions();
      //should both be overridden in subclass? What does it exactly do?
      setup.transitDefault = StateMachineMario.transitDefault;
      setup.actDefault = StateMachineMario.actDefault;
      //setup.transitDefault = StateMachine.transitDefault;
      //setup.actDefault = StateMachine.actDefault;
      setup.setAction(MarioStates.IDLE, <ƒ.General>this.actIdle);
      setup.setAction(MarioStates.WALK, <ƒ.General>this.actWalk);
      setup.setAction(MarioStates.RUN, <ƒ.General>this.actRun);
      //setup.setAction(MarioStates.RESPAWN, <ƒ.General>this.actRespawn);
      //setup.setTransition(MarioStates.ESCAPE, JOB.DIE, <ƒ.General>this.transitDie);
      return setup;
    }
    
    private static async actIdle(_machine: StateMachineMario): Promise<void>{
      //change animation
      console.log(("idle!"));
    }

    private static async actWalk(_machine: StateMachineMario): Promise<void>{
      //change animation
      console.log(("walk!"));
    }

    private static async actRun(_machine: StateMachineMario): Promise<void>{
      //change animation
      console.log(("run!"));
    }

  
    private static async transitDefault(_machine: StateMachineMario) {
      console.log("Transit to", _machine.stateNext);
    }

    private static async actDefault(_machine: StateMachineMario) {
      console.log(MarioStates[_machine.stateCurrent]);
      
    }

    private hndEvent = (_event: Event): void => {
      switch(_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          //ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;

        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          //ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
          break;

        case ƒ.EVENT.NODE_DESERIALIZED:
          //like _ready() in godot?
          document.addEventListener("keydown", this.hndKeyInput);
          document.addEventListener("keyup", this.hndKeyInput);
          //set initial state
          this.transit(MarioStates.IDLE);
          
          //dont quite get what act does, but seems very elemental. one can decide when to "act" i guess. 
          this.act();
          this.transit(MarioStates.WALK);
          break;
      }
    }

    private hndKeyInput(_event: KeyboardEvent): void {
      if (_event.code != ƒ.KEYBOARD_CODE.A && _event.code != ƒ.KEYBOARD_CODE.D && _event.code != ƒ.KEYBOARD_CODE.SHIFT_LEFT && _event.code != ƒ.KEYBOARD_CODE.SHIFT_RIGHT && _event.code != ƒ.KEYBOARD_CODE.ARROW_LEFT && _event.code != ƒ.KEYBOARD_CODE.ARROW_RIGHT) return;
      //reset all var's
      let shiftPressed: boolean = false;
      let leftPressed: boolean = false;
      let rightPressed: boolean = false;
      // scan for the events: A or D pressed, Shift pressed, A or D && Shift pressed
      // A or D stop pressed, Shift stop pressed, Stop A or D && Shift
      if (_event.type == "keydown") {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT, ƒ.KEYBOARD_CODE.SHIFT_RIGHT])) {
          //doesnt work because we're in the document right now. 
          console.log(this.stateCurrent);
          
          if (this.stateCurrent == MarioStates.WALK){
            this.transit(MarioStates.RUN);
          }
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
          leftPressed = true;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
          rightPressed = true;
        }
      }
    }

/*     private update = (_event: Event): void => {
      this.act();
      console.log("update!");
    }
 */
  }
}