"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Avatar extends ƒAid.NodeSprite {
        marioStandAnimation;
        marioWalkAnimation;
        marioRunAnimation;
        marioJumpAnimation;
        marioDieAnimation;
        marioSpeed = 5.0;
        //currently responsible for player movement
        xPlayerMovement = 0;
        xPlayerMovementCurrent;
        yPlayerAcceleration = 2;
        constructor(spritesheet) {
            super("Avatar");
            this.initMario(spritesheet);
        }
        initMario(spritesheet) {
            this.initAnimations(spritesheet);
            this.setAnimation(this.marioStandAnimation);
            this.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
            this.setFrameDirection(1);
            this.mtxLocal.translateY(-1);
        }
        initAnimations(spritesheet) {
            // add a "coat" to spritesheet
            let coat = new ƒ.CoatTextured(undefined, spritesheet);
            this.marioStandAnimation = new ƒAid.SpriteSheetAnimation("Mario_Stand", coat);
            this.marioStandAnimation.generateByGrid(ƒ.Rectangle.GET(0, 0, 40, 56), 1, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
            this.marioWalkAnimation = new ƒAid.SpriteSheetAnimation("Mario_Run", coat);
            this.marioWalkAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56, 40, 56), 12, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
            this.marioRunAnimation = new ƒAid.SpriteSheetAnimation("Mario_Run", coat);
            this.marioRunAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56, 40, 56), 6, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(80));
            this.marioJumpAnimation = new ƒAid.SpriteSheetAnimation("Mario_Jump", coat);
            this.marioJumpAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56 * 2, 40, 56), 10, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
            this.marioDieAnimation = new ƒAid.SpriteSheetAnimation("Mario_Die", coat);
            this.marioDieAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56 * 3, 40, 56), 5, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
            this.framerate = 12;
        }
        update(deltaTime, inputState) {
            //determine amount to walk
            //is around 80
            //console.log(ƒ.Loop.timeFrameGame);
            this.xPlayerMovementCurrent = ƒ.Loop.timeFrameGame / 1000 * this.marioSpeed;
            this.yPlayerAcceleration = ƒ.Loop.timeFrameGame / (1000 * 1000) + this.marioSpeed;
            // a*t + v
            this.getParent().getParent().mtxLocal.translateX(this.xPlayerMovement);
            //ySpeed: number = 0
            //Gravity = 0.05
            //Update deltati
        }
    }
    Script.Avatar = Avatar;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    ƒ.Project.registerScriptNamespace(Script);
    console.log("DirectionStateMachine running!");
    new ƒAid.StateMachineInstructions();
    let Direction;
    (function (Direction) {
        Direction[Direction["LEFT"] = 0] = "LEFT";
        Direction[Direction["RIGHT"] = 1] = "RIGHT";
    })(Direction = Script.Direction || (Script.Direction = {}));
    class DirectionStateMachine {
        currentDirection;
        //stateNode
        constructor() { }
        setState(state) {
            this.currentDirection = state;
        }
        facingLeft() {
            //Mario faces left
        }
        facingRight() {
            //Mario faces right
        }
    }
    let currentPlayerOrientation = 1;
    // 0 is left, 1 is right
    function turnAround(nodeToTurn, orientation) {
        if (orientation == currentPlayerOrientation)
            return;
        let transformComponent = nodeToTurn.getComponent(ƒ.ComponentTransform);
        transformComponent.mtxLocal.rotateY(-180);
        currentPlayerOrientation = orientation;
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    let graph;
    //current prblem: the shift adding makes the question of how general inputs are handled
    //in my code problematic. Keydown being standing still is not specific enough anymore 
    // since mario shouldnt stand if shift is being stopped. that should just switch
    // to standard running. Wonder how to do that well.
    // Define marioSpriteNode from FUDGE
    //let marioSpriteNode: ƒAid.NodeSprite;
    let marioAvatar;
    //27.10.2022
    let cmpAudio;
    let audioTest;
    document.addEventListener("interactiveViewportStarted", start);
    //basically a _ready function for the viewport
    async function start(_event) {
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
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        // edit framerate here
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 12);
    }
    let mainKeyFirstPressed = true;
    let effectKeyFirstPressed = true;
    let currentAnimationName;
    let animationNameBeforeSprint;
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
    function update(_event) {
        let leftKeyCode = [ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT];
        let rightKeyCode = [ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT];
        let shiftKeyCode = [ƒ.KEYBOARD_CODE.SHIFT_LEFT, ƒ.KEYBOARD_CODE.SHIFT_RIGHT];
        let currentInputState = {
            isLeftKeyPressed: ƒ.Keyboard.isPressedOne(leftKeyCode),
            isRightKeyPressed: ƒ.Keyboard.isPressedOne(rightKeyCode),
            isShiftKeyPressed: ƒ.Keyboard.isPressedOne(shiftKeyCode)
        };
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
        let deltaTime = ƒ.Loop.timeFrameGame / 1000;
        marioAvatar.update(deltaTime, currentInputState);
    }
    let currentPlayerOrientation = 1;
    // 0 is left, 1 is right
    function turnAround(nodeToTurn, orientation) {
        if (orientation == currentPlayerOrientation)
            return;
        let transformComponent = nodeToTurn.getComponent(ƒ.ComponentTransform);
        transformComponent.mtxLocal.rotateY(-180);
        currentPlayerOrientation = orientation;
    }
    function changeAnimation(nameOfAnimatable, animationName, nodeToAnimate) {
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
        let marioSpriteSheet = new ƒ.TextureImage();
        await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");
        //make a new mario class
        marioAvatar = new Script.Avatar(marioSpriteSheet);
        //decide where to put it in the Tree.
        let marioParentNode = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];
        marioParentNode.addChild(marioAvatar);
        marioParentNode.getComponent(ƒ.ComponentMaterial).activate(false);
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    var _idleState;
    var _current_State;
    class MarioScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(MarioScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            _idleState = new Script.IdleState;
            _current_State;
            //listen to inputs
            document.addEventListener("keydown", this.onInput);
            document.addEventListener("keyup", this.onInput);
            ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, this.update);
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        //let the states decide how to handle the input.
        onInput(keyEvent) {
        }
        update(event) {
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    new Script.IdleState();
                    break;
            }
        };
    }
    Script.MarioScript = MarioScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    class IdleState {
        update(event) {
            console.log("damn");
        }
        input(event) {
            console.log("damn");
        }
    }
    Script.IdleState = IdleState;
    class WalkState {
        update(event) {
        }
        input(event) {
        }
    }
    Script.WalkState = WalkState;
    class RunState {
        update(event) {
        }
        input(event) {
        }
    }
    Script.RunState = RunState;
    class JumpState {
        update(event) {
        }
        input(event) {
        }
    }
    Script.JumpState = JumpState;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["ESCAPE"] = 1] = "ESCAPE";
        JOB[JOB["DIE"] = 2] = "DIE";
        JOB[JOB["RESPAWN"] = 3] = "RESPAWN";
    })(JOB || (JOB = {}));
    class StateMachine extends ƒAid.ComponentStateMachine {
    }
    Script.StateMachine = StateMachine;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    let MarioStates;
    (function (MarioStates) {
        MarioStates[MarioStates["IDLE"] = 0] = "IDLE";
        MarioStates[MarioStates["WALK"] = 1] = "WALK";
        MarioStates[MarioStates["RUN"] = 2] = "RUN";
    })(MarioStates || (MarioStates = {}));
    class StateMachineMario extends ƒAid.ComponentStateMachine {
        static iSubclass = ƒ.Component.registerSubclass(StateMachineMario);
        static instructions = StateMachineMario.get();
        constructor() {
            super();
            this.instructions = StateMachineMario.instructions;
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */, this.hndEvent);
        }
        static get() {
            let setup = new ƒAid.StateMachineInstructions();
            //should both be overridden in subclass? What does it exactly do?
            setup.transitDefault = StateMachineMario.transitDefault;
            setup.actDefault = StateMachineMario.actDefault;
            //setup.transitDefault = StateMachine.transitDefault;
            //setup.actDefault = StateMachine.actDefault;
            setup.setAction(MarioStates.IDLE, this.actIdle);
            setup.setAction(MarioStates.WALK, this.actWalk);
            setup.setAction(MarioStates.RUN, this.actRun);
            //setup.setAction(MarioStates.RESPAWN, <ƒ.General>this.actRespawn);
            //setup.setTransition(MarioStates.ESCAPE, JOB.DIE, <ƒ.General>this.transitDie);
            return setup;
        }
        static async actIdle(_machine) {
            //change animation
            console.log(("idle!"));
        }
        static async actWalk(_machine) {
            //change animation
            console.log(("walk!"));
        }
        static async actRun(_machine) {
            //change animation
            console.log(("run!"));
        }
        static async transitDefault(_machine) {
            console.log("Transit to", _machine.stateNext);
        }
        static async actDefault(_machine) {
            console.log(MarioStates[_machine.stateCurrent]);
        }
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* ƒ.EVENT.COMPONENT_ADD */:
                    //ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
                    break;
                case "componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* ƒ.EVENT.COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* ƒ.EVENT.COMPONENT_REMOVE */, this.hndEvent);
                    //ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.update);
                    break;
                case "nodeDeserialized" /* ƒ.EVENT.NODE_DESERIALIZED */:
                    //like _ready() in godot?
                    document.addEventListener("keydown", this.hndKeyInput);
                    document.addEventListener("keyup", this.hndKeyInput);
                    //set initial state
                    this.transit(MarioStates.IDLE);
                    //dont quite get what act does, but seems very elemental. one can decide when to "act" i guess. 
                    this.act();
                    this.transit(MarioStates.WALK);
                    break;
            }
        };
        hndKeyInput(_event) {
            if (_event.code != ƒ.KEYBOARD_CODE.A && _event.code != ƒ.KEYBOARD_CODE.D && _event.code != ƒ.KEYBOARD_CODE.SHIFT_LEFT && _event.code != ƒ.KEYBOARD_CODE.SHIFT_RIGHT && _event.code != ƒ.KEYBOARD_CODE.ARROW_LEFT && _event.code != ƒ.KEYBOARD_CODE.ARROW_RIGHT)
                return;
            //reset all var's
            let shiftPressed = false;
            let leftPressed = false;
            let rightPressed = false;
            // scan for the events: A or D pressed, Shift pressed, A or D && Shift pressed
            // A or D stop pressed, Shift stop pressed, Stop A or D && Shift
            if (_event.type == "keydown") {
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT, ƒ.KEYBOARD_CODE.SHIFT_RIGHT])) {
                    //doesnt work because we're in the document right now. 
                    console.log(this.stateCurrent);
                    if (this.stateCurrent == MarioStates.WALK) {
                        this.transit(MarioStates.RUN);
                    }
                }
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                    leftPressed = true;
                }
                if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                    rightPressed = true;
                }
            }
        }
    }
    Script.StateMachineMario = StateMachineMario;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map