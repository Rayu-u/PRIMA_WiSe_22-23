namespace Starfox {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Starfox,);  // Register the namespace to FUDGE for serialization

  export class EngineScript extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(EngineScript);
    // Properties may be mutated by users in the editor via the automatically created user interface
    // public message: string = "CustomComponentScript added to ";
    
    viewport: ƒ.Viewport;
    
    rigidbody: ƒ.ComponentRigidbody;

    constructor() {
      super();

      // Don't start when running in editor
      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      // Listen to this component being added to or removed from a node
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          // ƒ.Debug.log(this.message, this.node);
          this.node.addEventListener(ƒ.EVENT.RENDER_PREPARE, this.update)
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          break;
        case ƒ.EVENT.NODE_DESERIALIZED:
          this.rigidbody = this.node.getComponent(ƒ.ComponentRigidbody);
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          this.rigidbody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.crash);
          this.node.addEventListener("SensorHit", this.onSensorHit);
          break;
      }
    }
    
    public update = (_event: Event): void => {
      if (!gameState) {
        return;
      }
      // rigidbody.applyTorque(ƒ.Vector3.Y(1));
      this.rigidbody.applyForce(new ƒ.Vector3(0.1, 0.1, 0));

      gameState.height = parseFloat(this.node.mtxWorld.translation.y.toFixed(3));
      console.log(gameState.height);
      gameState.velocity = parseFloat(this.rigidbody.getVelocity().magnitude.toFixed(3));
    }
    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
    
    onSensorHit = (): void => {
      console.log("sensor hit");
    }    
    crash = (): void => {
      console.log("crash");

    }
    //task: Joints angucken, explosions 
  }
}