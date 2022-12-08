namespace Starfox {
  import ƒui = FudgeUserInterface;

  export class GameState extends ƒ.Mutable {

    // überschreibt, was später nicht rausgegeben werden soll
    protected reduceMutator(_mutator: ƒ.Mutator): void {/* */}  
    
    public height: number = 1;
    public velocity: number = 2;
    private controller: ƒui.Controller;

    constructor() {
      super();
      this.controller = new ƒui.Controller(this, document.querySelector("#vui"));
      console.log(this.controller);
    }

  }
}