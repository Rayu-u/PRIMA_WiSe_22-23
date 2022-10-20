namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;

  // Define marioSpriteNode from FUDGE
  let marioSpriteNode: ƒAid.NodeSprite;
  let mario: ƒ.Node;
  let marioSpeed: number = 5.0;

  let xPlayerMovement: number = 0;
  let xPlayerMovementCurrent: number;

  // should not loop, but will only have one frame so it doesnt show a difference visually if one frame loops
  let marioStandAnimation: ƒAid.SpriteSheetAnimation;
  // should loop, so currently fine
  let marioRunAnimation: ƒAid.SpriteSheetAnimation;
  // TODO: Should match Jumpduration and not loop. Jump is a difficult event
  let marioJumpAnimation: ƒAid.SpriteSheetAnimation;
  // TODO: shouldnt loop later.
  let marioDieAnimation: ƒAid.SpriteSheetAnimation;
  
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  async function start(_event: CustomEvent): Promise<void> {
    // _event.detail IST der viewport. deshalb können wir das so zuweisen
    viewport = _event.detail;

    let graph: ƒ.Node = viewport.getBranch();
    mario = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];

    console.log("branch" + graph.name);
    console.log("mario" + mario.name);
    
    await initMario()

    document.addEventListener("keyup", onKey);
    document.addEventListener("keydown", onKey);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    // edit framerate here
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 12);
  }
  async function initMario(): Promise<void> {
    //initialize animations seen above
    await initAnimations()
    marioSpriteNode = new ƒAid.NodeSprite("Mario_Sprite");
    // adds a transform component to the sprite
    marioSpriteNode.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
    marioSpriteNode.setAnimation(marioStandAnimation);
    // play animation forwards
    marioSpriteNode.setFrameDirection(1);
    // wohl unnötig?
    marioSpriteNode.mtxLocal.translateY(-1);

    //set framerate here
    marioSpriteNode.framerate = 12;

    mario.addChild(marioSpriteNode);
    mario.getComponent(ƒ.ComponentMaterial).activate(false);
  }

  async function initAnimations(): Promise<void> {
    // load spritesheet from folder and add a "coat" to it.
    let marioSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");
    let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, marioSpriteSheet);

    marioStandAnimation = new ƒAid.SpriteSheetAnimation("Mario_Stand", coat);
    marioStandAnimation.generateByGrid(ƒ.Rectangle.GET(0, 0, 40, 56), 1, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
    
    marioRunAnimation = new ƒAid.SpriteSheetAnimation("Mario_Run", coat);
    marioRunAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56, 40, 56), 12, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
    
    marioJumpAnimation = new ƒAid.SpriteSheetAnimation("Mario_Jump", coat);
    marioJumpAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56*2, 40, 56), 10, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
    
    marioDieAnimation = new ƒAid.SpriteSheetAnimation("Mario_Die", coat);
    marioDieAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56*3, 40, 56), 5, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
  }

  let keyFirstPressed: boolean = true;

  function onKey(_event: KeyboardEvent): void {
    if (_event.code != ƒ.KEYBOARD_CODE.A && _event.code != ƒ.KEYBOARD_CODE.D) return;
    
    if (_event.type == "keyup") {
      xPlayerMovement = 0;
      changeAnimation("mario", "stand", marioSpriteNode);
      keyFirstPressed = true;
      return;
    } 
    if(_event.code == ƒ.KEYBOARD_CODE.A){
      if (keyFirstPressed == true) {
        changeAnimation("mario", "run", marioSpriteNode);
        xPlayerMovement = -xPlayerMovementCurrent;
        turnAround(marioSpriteNode, 0);
        console.log("left");
        keyFirstPressed = false;
      }
    }

    if(_event.code == ƒ.KEYBOARD_CODE.D){
      if (keyFirstPressed == true) {
        changeAnimation("mario", "run", marioSpriteNode);
        keyFirstPressed = false;
        horizontalPlayerMovement = 0.5;
        turnAround(marioSpriteNode, 1);
        console.log("right");
      }
    }

    
  }
  
  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used

    //determine amount to walk
    //is around 80
    //console.log(ƒ.Loop.timeFrameGame);
   
    xPlayerMovementCurrent = ƒ.Loop.timeFrameGame/1000 * marioSpeed;

    viewport.draw();
    ƒ.AudioManager.default.update();
    mario.getParent().mtxLocal.translateX(xPlayerMovement);
  }

  let currentPlayerOrientation: number = 1;
  // 0 is left, 1 is right
  function turnAround(nodeToTurn: ƒ.Node, orientation: number): void {
    if (orientation == currentPlayerOrientation) return;

    let transformComponent: ƒ.ComponentTransform = nodeToTurn.getComponent(ƒ.ComponentTransform);
    transformComponent.mtxLocal.rotateY(-180);
    currentPlayerOrientation = orientation;
  }

  function changeAnimation(nameOfAnimatable: string, animationName: string, nodeToAnimate: ƒAid.NodeSprite): void {
    switch (nameOfAnimatable) {
      case "mario":
        switch (animationName) {
          case "stand":
            console.log("stand!!");
            nodeToAnimate.setAnimation(marioStandAnimation);
            return;
          case "run":
            console.log("run!!");
            nodeToAnimate.setAnimation(marioRunAnimation);
            return;
          case "jump":
            console.log("jump!!");
            nodeToAnimate.setAnimation(marioJumpAnimation);
            //marioSpriteNode.showFrame
            return;
          case "die":
            console.log("dead :(");
            nodeToAnimate.setAnimation(marioDieAnimation);
            return;
        }
    }
  }
}