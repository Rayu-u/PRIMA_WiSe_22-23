namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;

  // Add eventlistener for the loading of the window
  window.addEventListener("load", onLoad);
  // Define marioSpriteNode from FUDGE
  let marioSpriteNode: ƒAid.NodeSprite;

  // load Handler
  async function onLoad(_event: Event): Promise<void> {
    // make new Node with name root
    let root: ƒ.Node = new ƒ.Node("root");

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
    marioSpriteNode.framerate = 10;

    root.addChild(marioSpriteNode);

    // camera setup
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(5);
    cmpCamera.mtxPivot.rotateY(180);

    // setup viewport
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.camera.clrBackground = ƒ.Color.CSS("White");
    viewport.draw();

    // actually let the loop run
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, loop);
    // edit framerate here
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);

    // was ist change?
    document.forms[0].addEventListener("change", onChange);
  }

  function loop(_event: Event): void {

    // is this even useful anymore now?
    viewport.draw();
  }

  function onChange(_event: Event): void {
    // framerate is set here again? How do these connect?
    let value: number = parseInt((<HTMLInputElement>_event.target).value);
    marioSpriteNode.framerate = value;
    console.log("framerate set to: " + value);
  }

  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
  }


}