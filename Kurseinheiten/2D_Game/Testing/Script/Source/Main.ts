namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  let thing: ƒ.Node;

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    let graph: ƒ.Node = viewport.getBranch();
    thing = graph.getChildrenByName("Thing")[0];
    
    let scriptComponent: TestComponent = thing.getComponent(TestComponent);
    scriptComponent.testFunction();
    let otherTestComponent: TestComponent = new TestComponent();
    otherTestComponent.testFunction();
    

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }
}