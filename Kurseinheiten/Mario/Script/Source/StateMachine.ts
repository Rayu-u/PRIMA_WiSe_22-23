namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  enum JOB {
    IDLE, ESCAPE, DIE, RESPAWN
  }

  export class StateMachine extends ƒAid.ComponentStateMachine<JOB> {
  }
}