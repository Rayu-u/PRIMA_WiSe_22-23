namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;

  // Add eventlistener for the loading of the window
  //window.addEventListener("load", onLoad);  
  //window.addEventListener("interactiveViewportStarted", onViewportStart)

  // Define marioSpriteNode from FUDGE
  let marioSpriteNode: ƒAid.NodeSprite;

  let mario: ƒ.Node;

  let horizontalPlayerMovement: number = 0;

  // load Handler

  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);
  let controlProportional: ƒ.Control = new ƒ.Control("Proportional", 1, ƒ.CONTROL_TYPE.PROPORTIONAL);

  async function start(_event: CustomEvent): Promise<void> {
    // _event.detail IST der viewport. deshalb können wir das so zuweisen
    viewport = _event.detail;

    let graph: ƒ.Node = viewport.getBranch();
    mario = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];

    console.log("branch" + graph.name);
    console.log("mario" + mario.name);
    
    marioSpriteNode = await createMarioSprite();
    mario.addChild(marioSpriteNode);
    mario.getComponent(ƒ.ComponentMaterial).activate(false);

    document.addEventListener("keyup", onKey);
    document.addEventListener("keydown", onKey);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    // edit framerate here
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 12);
  }

  let keyFirstPressed: boolean = true;

  function onKey(_event: KeyboardEvent): void {
    if (_event.code != ƒ.KEYBOARD_CODE.A && _event.code != ƒ.KEYBOARD_CODE.D) return;
    
    if (_event.type == "keyup") {
      horizontalPlayerMovement = 0;
      changeAnimation("mario", "stand", marioSpriteNode);
      keyFirstPressed = true;
      return;
    } 
    if(_event.code == ƒ.KEYBOARD_CODE.A){
      if (keyFirstPressed == true) {
        changeAnimation("mario", "run", marioSpriteNode);
        keyFirstPressed = false;
      }
      horizontalPlayerMovement = -0.5;
      turnAround(marioSpriteNode, 0);
      console.log("left");
    }

    if(_event.code == ƒ.KEYBOARD_CODE.D){
      if (keyFirstPressed == true) {
        changeAnimation("mario", "run", marioSpriteNode);
        keyFirstPressed = false;
      }

      horizontalPlayerMovement = 0.5;
      turnAround(marioSpriteNode, 1);
      console.log("right");
    }
  }
  
  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
    mario.getParent().mtxLocal.translateX(horizontalPlayerMovement);
  }

  async function createMarioSprite(): Promise<ƒAid.NodeSprite> {
    // load spritesheet from folder and add a "coat" to it.
    let marioSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, marioSpriteSheet);
    
    // add running animation
    let marioAnimation: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation("Mario_Run", coat);
    marioAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56, 40, 56), 12, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));

    marioSpriteNode = new ƒAid.NodeSprite("Mario_Sprite");

    // adds a transform component to the sprite
    marioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    marioSpriteNode.setAnimation(marioAnimation);
    // play animation forwards
    marioSpriteNode.setFrameDirection(1);

    // wohl unnötig?
    marioSpriteNode.mtxLocal.translateY(-1);

    //set framerate here
    marioSpriteNode.framerate = 12;

    return marioSpriteNode;
  }

  let currentPlayerOrientation: number = 1;
  // 0 is left, 1 is right
  function turnAround(nodeToTurn: ƒ.Node, orientation: number): void {
    if (orientation == currentPlayerOrientation) return;

    let transformComponent: ƒ.ComponentTransform = nodeToTurn.getComponent(ƒ.ComponentTransform);
    transformComponent.mtxLocal.rotateY(-180);
    currentPlayerOrientation = orientation;
  }

  function changeAnimation(nameOfAnimatable: string, animationName: string, nodeToAnimate: ƒ.Node): void {
    switch (nameOfAnimatable) {
      case "mario":
        switch (animationName) {
          case "stand":
            console.log("stand!!");
            return;
          case "run":
            console.log("run!!");
            return;
          case "jump":
            console.log("jump!!");
            return;
          case "die":
            console.log("dead :(");
            return;
        }
    }
  }
}