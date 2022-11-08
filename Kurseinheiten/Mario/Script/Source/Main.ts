namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;

  //current prblem: the shift adding makes the question of how general inputs are handled
  //in my code problematic. Keydown being standing still is not specific enough anymore 
  // since mario shouldnt stand if shift is being stopped. that should just switch
  // to standard running. Wonder how to do that well.

  // Define marioSpriteNode from FUDGE
  let avatarInstance: ƒAid.NodeSprite;
  let mario: ƒ.Node;
  let marioSpeed: number = 5.0;

  let xPlayerMovement: number = 0;
  let xPlayerMovementCurrent: number;

  let yPlayerAcceleration: number = 2;

  //27.10.2022
  //let cmpAudio: ƒ.ComponentAudio;
  //let audioTest: ƒ.Audio;

  // should not loop, but will only have one frame so it doesnt show a difference visually if one frame loops
  let marioStandAnimation: ƒAid.SpriteSheetAnimation;
  // should loop, so currently fine
  let marioWalkAnimation: ƒAid.SpriteSheetAnimation;
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

    //audioTest = new ƒ.Audio("Kurseinheiten\Mario\Sound\SeResourceStd2nd_000006E2_Yahoo.wav");
    //cmpAudio = new ƒ.ComponentAudio(audioTest, false, false);
    //cmpAudio.connect(true);
    //cmpAudio.volume = 30;


    let graph: ƒ.Node = viewport.getBranch();
    mario = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];

    console.log("branch" + graph.name);
    console.log("mario" + mario.name);
    
    await initMario()
    
    //cmpAudio.play(true);

    //document.addEventListener("keyup", onKey);
    //document.addEventListener("keydown", onKey);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    // edit framerate here
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 12);
  }
  async function initMario(): Promise<void> {
    // load spritesheet from folder and add a "coat" to it.
    let marioSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
    await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");

    let avatarInstance: Avatar = new Avatar();
    //initialize animations seen above
    avatarInstance.initAnimations(marioSpriteSheet);

    mario.addChild(avatarInstance);
    mario.getComponent(ƒ.ComponentMaterial).activate(false);
    console.log("mario is initted!! nice");
  }

  let mainKeyFirstPressed: boolean = true;
  let effectKeyFirstPressed: boolean = true;

  let currentAnimationName: String;
  let animationNameBeforeSprint: String;

  function onKey(_event: KeyboardEvent): void {
    if (_event.code != ƒ.KEYBOARD_CODE.A && _event.code != ƒ.KEYBOARD_CODE.D && _event.code != ƒ.KEYBOARD_CODE.SHIFT_LEFT) return;

    // new strategy: Send all keyinputs elsewhere coded differently
    // PlayerControl
    
    if (_event.type == "keyup" && (_event.code == ƒ.KEYBOARD_CODE.D || _event.code == ƒ.KEYBOARD_CODE.A)) {
      console.log("key up");
      
      xPlayerMovement = 0;
      changeAnimation("mario", "stand", avatarInstance);
      mainKeyFirstPressed = true;
      return;
    } 

    if(_event.code == ƒ.KEYBOARD_CODE.A){
      if (mainKeyFirstPressed == true) {
        changeAnimation("mario", "walk", avatarInstance);
        xPlayerMovement = -xPlayerMovementCurrent;
        turnAround(avatarInstance, 0);
        console.log("left");
        mainKeyFirstPressed = false;
      }
    }

    if(_event.code == ƒ.KEYBOARD_CODE.D){
      if (mainKeyFirstPressed == true) {
        changeAnimation("mario", "walk", avatarInstance);
        xPlayerMovement = xPlayerMovementCurrent;
        turnAround(avatarInstance, 1);
        console.log("right");
        mainKeyFirstPressed = false;
      }
    }
    
    let speedMultiplier: number = 2;
    if(_event.code == ƒ.KEYBOARD_CODE.SHIFT_LEFT) {
      if (effectKeyFirstPressed == true) {
        multiplyCurrentSpeedBy(speedMultiplier);
        animationNameBeforeSprint = currentAnimationName;
        changeAnimation("mario", "run", avatarInstance);
        effectKeyFirstPressed = false;
      }

      if (_event.type == "keyup") {
        multiplyCurrentSpeedBy(1/speedMultiplier);
        changeAnimation("mario", animationNameBeforeSprint, avatarInstance);
        effectKeyFirstPressed = true;
      }
      return
    }

  function multiplyCurrentSpeedBy(multiplier: number) {
    xPlayerMovement *= multiplier;
  }

  }
  //ySpeed: number = 0
  //Gravity = 0.05

  //Update deltati
  
  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used

    //determine amount to walk
    //is around 80
    //console.log(ƒ.Loop.timeFrameGame);
   
    xPlayerMovementCurrent = ƒ.Loop.timeFrameGame/1000 * marioSpeed;

    yPlayerAcceleration = ƒ.Loop.timeFrameGame/(1000*1000) + marioSpeed;
    // a*t + v

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

  function changeAnimation(nameOfAnimatable: String, animationName: String, nodeToAnimate: ƒAid.NodeSprite): void {
    switch (nameOfAnimatable) {
      case "mario":
        switch (animationName) {
          case "stand":
            console.log("stand!!");
            nodeToAnimate.setAnimation(marioStandAnimation);
            currentAnimationName = "stand";
            return;
          case "walk":
            console.log("walk!!");
            nodeToAnimate.setAnimation(marioWalkAnimation);
            currentAnimationName = "walk";
            return;
          case "run":
            console.log("walk!!");
            nodeToAnimate.setAnimation(marioRunAnimation);
            currentAnimationName = "run";
            return;
          case "jump":
            console.log("jump!!");
            nodeToAnimate.setAnimation(marioJumpAnimation);
            currentAnimationName = "jump";
            return;
          case "die":
            console.log("dead :(");
            nodeToAnimate.setAnimation(marioDieAnimation);
            currentAnimationName = "die";
            return;
        }
    }
  }
}