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

  // load Handler

  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  async function start(_event: CustomEvent): Promise<void> {
    viewport = _event.detail;

    let graph: ƒ.Node = viewport.getBranch();
    mario = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];

    console.log("branch" + graph.name);
    console.log("mario" + mario.name);
    
    marioSpriteNode = await createMarioSprite();
    mario.addChild(marioSpriteNode);
    mario.getComponent(ƒ.ComponentMaterial).activate(false);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    // edit framerate here
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
  }
  
  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    ƒ.AudioManager.default.update();
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
    marioSpriteNode.framerate = 10;

    return marioSpriteNode;
  }



}