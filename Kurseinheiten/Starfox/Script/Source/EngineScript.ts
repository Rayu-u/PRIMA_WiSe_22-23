namespace Starfox {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Starfox,);  // Register the namespace to FUDGE for serialization

  export class EngineScript extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(EngineScript);
    // Properties may be mutated by users in the editor via the automatically created user interface
    // public message: string = "CustomComponentScript added to ";

    viewport: ƒ.Viewport;

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
          // if deserialized the node is now fully reconstructed and access to all its components and children is possible
          break;
      }
    }
    
    public update = (_event: Event): void => {
      let rigidbody: ƒ.ComponentRigidbody = this.node.getComponent(ƒ.ComponentRigidbody);
      rigidbody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.crash)
      // rigidbody.applyTorque(ƒ.Vector3.Y(1));
      rigidbody.applyForce(new ƒ.Vector3(0.2, -0.5, 0))
    }
    // protected reduceMutator(_mutator: ƒ.Mutator): void {
    //   // delete properties that should not be mutated
    //   // undefined properties and private fields (#) will not be included by default
    // }
    
    crash(): void {
      console.log("crash");

    }

    distance: number;

    calcDistanceToTerrain(): void {
      let tInfo: ƒ.TerrainInfo = (<ƒ.MeshTerrain>cmpTerrain.mesh).getTerrainInfo(
        shipParent.getChildren()[0].mtxLocal.translation,
        cmpTerrain.mtxWorld
        )
      this.distance = tInfo.distance
    }
    //task: Joints angucken, explosions 
  }
}