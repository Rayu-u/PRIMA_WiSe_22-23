namespace Script{
import ƒ = FudgeCore;
import ƒAid = FudgeAid;
ƒ.Project.registerScriptNamespace(Script);

console.log("DirectionStateMachine running!");


new ƒAid.StateMachineInstructions()
export enum Direction {
  LEFT,
  RIGHT
}

class DirectionStateMachine{
  currentDirection: Direction;
  //stateNode

  constructor() {}

  setState(state: Direction): void {
    this.currentDirection = state;
  }

  facingLeft(): void {
    //Mario faces left
  }

  facingRight(): void {
    //Mario faces right
  }

}

let currentPlayerOrientation: number = 1;
// 0 is left, 1 is right
function turnAround(nodeToTurn: ƒ.Node, orientation: number): void {
  if (orientation == currentPlayerOrientation) return;

  let transformComponent: ƒ.ComponentTransform = nodeToTurn.getComponent(ƒ.ComponentTransform);
  transformComponent.mtxLocal.rotateY(-180);
  currentPlayerOrientation = orientation;
}
}