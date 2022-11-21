namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  let viewport: ƒ.Viewport;
  let graph: ƒ.Node;

  //current prblem: the shift adding makes the question of how general inputs are handled
  //in my code problematic. Keydown being standing still is not specific enough anymore 
  // since mario shouldnt stand if shift is being stopped. that should just switch
  // to standard running. Wonder how to do that well.

  // Define marioSpriteNode from FUDGE
  //let marioSpriteNode: ƒAid.NodeSprite;

  let marioAvatar: Avatar;
  let currentInputState: InputState;

  //27.10.2022
  let cmpAudio: ƒ.ComponentAudio;
  let audioTest: ƒ.Audio;
  
  document.addEventListener("interactiveViewportStarted", <EventListener><unknown>start);

  //basically a _ready function for the viewport
  async function start(_event: CustomEvent): Promise<void> {
    // _event.detail IST der viewport. deshalb können wir das so zuweisen
    viewport = _event.detail;

    //audioTest = new ƒ.Audio("Kurseinheiten\Mario\Sound\SeResourceStd2nd_000006E2_Yahoo.wav");
    //cmpAudio = new ƒ.ComponentAudio(audioTest, false, false);
    //cmpAudio.connect(true);
    //cmpAudio.volume = 30;

    graph = viewport.getBranch();

    await prepareMario();

    //console.log("branch" + graph.name);
    //console.log("mario" + mario.name);
    
    //cmpAudio.play(true);

    //document.addEventListener("keyup", onKey);
    //document.addEventListener("keydown", onKey);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a

    // edit framerate here
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 12);
  }
  

  let mainKeyFirstPressed: boolean = true;
  let effectKeyFirstPressed: boolean = true;

  let currentAnimationName: String;
  let animationNameBeforeSprint: String;

/*   function onKey(_event: KeyboardEvent): void {
    if (_event.code != ƒ.KEYBOARD_CODE.A && _event.code != ƒ.KEYBOARD_CODE.D && _event.code != ƒ.KEYBOARD_CODE.SHIFT_LEFT) return;

    // new strategy: Send all keyinputs elsewhere coded differently
    // PlayerControl
    
    if (_event.type == "keyup" && (_event.code == ƒ.KEYBOARD_CODE.D || _event.code == ƒ.KEYBOARD_CODE.A)) {
      console.log("key up");
      
      xPlayerMovement = 0;
      //changeAnimation("mario", "stand", marioSpriteNode);
      mainKeyFirstPressed = true;
      return;
    } 

    if(_event.code == ƒ.KEYBOARD_CODE.A){
      if (mainKeyFirstPressed == true) {
        //changeAnimation("mario", "walk", marioSpriteNode);
        xPlayerMovement = -xPlayerMovementCurrent;
        //turnAround(marioSpriteNode, 0);
        console.log("left");
        mainKeyFirstPressed = false;
      }
    }

    if(_event.code == ƒ.KEYBOARD_CODE.D){
      if (mainKeyFirstPressed == true) {
        //changeAnimation("mario", "walk", marioSpriteNode);
        xPlayerMovement = xPlayerMovementCurrent;
        //turnAround(marioSpriteNode, 1);
        console.log("right");
        mainKeyFirstPressed = false;
      }
    }
    
    let speedMultiplier: number = 2;
    if(_event.code == ƒ.KEYBOARD_CODE.SHIFT_LEFT) {
      if (effectKeyFirstPressed == true) {
        multiplyCurrentSpeedBy(speedMultiplier);
        animationNameBeforeSprint = currentAnimationName;
        //changeAnimation("mario", "run", marioSpriteNode);
        effectKeyFirstPressed = false;
      }

      if (_event.type == "keyup") {
        multiplyCurrentSpeedBy(1/speedMultiplier);
        //changeAnimation("mario", animationNameBeforeSprint, marioSpriteNode);
        effectKeyFirstPressed = true;
      }
      return
    }

  function multiplyCurrentSpeedBy(multiplier: number) {
    xPlayerMovement *= multiplier;
  }

  } */
  
  function update(_event: Event): void {
    let leftKeyCode: ƒ.KEYBOARD_CODE[] = [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT]
    let rightKeyCode: ƒ.KEYBOARD_CODE[] = [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT]
    let shiftKeyCode: ƒ.KEYBOARD_CODE[] = [ƒ.KEYBOARD_CODE.SHIFT_LEFT, ƒ.KEYBOARD_CODE.SHIFT_RIGHT]

    //let oldInputState: InputState = currentInputState;
    currentInputState = {
      isLeftKeyPressed: ƒ.Keyboard.isPressedOne(leftKeyCode),
      isRightKeyPressed: ƒ.Keyboard.isPressedOne(rightKeyCode),
      isShiftKeyPressed: ƒ.Keyboard.isPressedOne(shiftKeyCode)
    }
    
    //if (oldInputState != currentInputState) {
      // Question Should the internal state update() even be called even if the state didnt change?
    //}
    // ƒ.Physics.simulate();  // if physics is included and used

    viewport.draw();
    ƒ.AudioManager.default.update();
    
    let deltaTime: number = ƒ.Loop.timeFrameGame/1000;
    marioAvatar.update(deltaTime, currentInputState);
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
            //nodeToAnimate.setAnimation(marioStandAnimation);
            currentAnimationName = "stand";
            return;
          case "walk":
            console.log("walk!!");
            //nodeToAnimate.setAnimation(marioWalkAnimation);
            currentAnimationName = "walk";
            return;
          case "run":
            console.log("walk!!");
            //nodeToAnimate.setAnimation(marioRunAnimation);
            currentAnimationName = "run";
            return;
          case "jump":
            console.log("jump!!");
            //nodeToAnimate.setAnimation(marioJumpAnimation);
            currentAnimationName = "jump";
            return;
          case "die":
            console.log("dead :(");
            //nodeToAnimate.setAnimation(marioDieAnimation);
            currentAnimationName = "die";
            return;
        }
    }
  }

  async function prepareMario() {
    //prepare the spritesheets for Mario
      let marioSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
      await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");
      //make a new mario class
      marioAvatar = new Avatar(marioSpriteSheet)
      
      //decide where to put it in the Tree.
      let marioParentNode: ƒ.Node = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];
      marioParentNode.addChild(marioAvatar)
      marioParentNode.getComponent(ƒ.ComponentMaterial).activate(false);
  }
}


