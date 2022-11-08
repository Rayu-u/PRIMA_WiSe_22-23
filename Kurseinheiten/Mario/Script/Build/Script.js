"use strict";
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
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    //current prblem: the shift adding makes the question of how general inputs are handled
    //in my code problematic. Keydown being standing still is not specific enough anymore 
    // since mario shouldnt stand if shift is being stopped. that should just switch
    // to standard running. Wonder how to do that well.
    // Define marioSpriteNode from FUDGE
    let avatarInstance;
    let mario;
    let marioSpeed = 5.0;
    let xPlayerMovement = 0;
    let xPlayerMovementCurrent;
    let yPlayerAcceleration = 2;
    //27.10.2022
    //let cmpAudio: ƒ.ComponentAudio;
    //let audioTest: ƒ.Audio;
    // should not loop, but will only have one frame so it doesnt show a difference visually if one frame loops
    let marioStandAnimation;
    // should loop, so currently fine
    let marioWalkAnimation;
    // should loop, so currently fine
    let marioRunAnimation;
    // TODO: Should match Jumpduration and not loop. Jump is a difficult event
    let marioJumpAnimation;
    // TODO: shouldnt loop later.
    let marioDieAnimation;
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        // _event.detail IST der viewport. deshalb können wir das so zuweisen
        viewport = _event.detail;
        //audioTest = new ƒ.Audio("Kurseinheiten\Mario\Sound\SeResourceStd2nd_000006E2_Yahoo.wav");
        //cmpAudio = new ƒ.ComponentAudio(audioTest, false, false);
        //cmpAudio.connect(true);
        //cmpAudio.volume = 30;
        let graph = viewport.getBranch();
        mario = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];
        console.log("branch" + graph.name);
        console.log("mario" + mario.name);
        await initMario();
        //cmpAudio.play(true);
        //document.addEventListener("keyup", onKey);
        //document.addEventListener("keydown", onKey);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        // edit framerate here
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 12);
    }
    async function initMario() {
        // load spritesheet from folder and add a "coat" to it.
        let marioSpriteSheet = new ƒ.TextureImage();
        await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");
        let avatarInstance = new Script.Avatar();
        //initialize animations seen above
        avatarInstance.initAnimations(marioSpriteSheet);
        mario.addChild(avatarInstance);
        mario.getComponent(ƒ.ComponentMaterial).activate(false);
        console.log("mario is initted!! nice");
    }
    let mainKeyFirstPressed = true;
    let effectKeyFirstPressed = true;
    let currentAnimationName;
    let animationNameBeforeSprint;
    function onKey(_event) {
        if (_event.code != ƒ.KEYBOARD_CODE.A && _event.code != ƒ.KEYBOARD_CODE.D && _event.code != ƒ.KEYBOARD_CODE.SHIFT_LEFT)
            return;
        // new strategy: Send all keyinputs elsewhere coded differently
        // PlayerControl
        if (_event.type == "keyup" && (_event.code == ƒ.KEYBOARD_CODE.D || _event.code == ƒ.KEYBOARD_CODE.A)) {
            console.log("key up");
            xPlayerMovement = 0;
            changeAnimation("mario", "stand", avatarInstance);
            mainKeyFirstPressed = true;
            return;
        }
        if (_event.code == ƒ.KEYBOARD_CODE.A) {
            if (mainKeyFirstPressed == true) {
                changeAnimation("mario", "walk", avatarInstance);
                xPlayerMovement = -xPlayerMovementCurrent;
                turnAround(avatarInstance, 0);
                console.log("left");
                mainKeyFirstPressed = false;
            }
        }
        if (_event.code == ƒ.KEYBOARD_CODE.D) {
            if (mainKeyFirstPressed == true) {
                changeAnimation("mario", "walk", avatarInstance);
                xPlayerMovement = xPlayerMovementCurrent;
                turnAround(avatarInstance, 1);
                console.log("right");
                mainKeyFirstPressed = false;
            }
        }
        let speedMultiplier = 2;
        if (_event.code == ƒ.KEYBOARD_CODE.SHIFT_LEFT) {
            if (effectKeyFirstPressed == true) {
                multiplyCurrentSpeedBy(speedMultiplier);
                animationNameBeforeSprint = currentAnimationName;
                changeAnimation("mario", "run", avatarInstance);
                effectKeyFirstPressed = false;
            }
            if (_event.type == "keyup") {
                multiplyCurrentSpeedBy(1 / speedMultiplier);
                changeAnimation("mario", animationNameBeforeSprint, avatarInstance);
                effectKeyFirstPressed = true;
            }
            return;
        }
        function multiplyCurrentSpeedBy(multiplier) {
            xPlayerMovement *= multiplier;
        }
    }
    //ySpeed: number = 0
    //Gravity = 0.05
    //Update deltati
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        //determine amount to walk
        //is around 80
        //console.log(ƒ.Loop.timeFrameGame);
        xPlayerMovementCurrent = ƒ.Loop.timeFrameGame / 1000 * marioSpeed;
        yPlayerAcceleration = ƒ.Loop.timeFrameGame / (1000 * 1000) + marioSpeed;
        // a*t + v
        viewport.draw();
        ƒ.AudioManager.default.update();
        mario.getParent().mtxLocal.translateX(xPlayerMovement);
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
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    class Avatar extends ƒAid.NodeSprite {
        // should not loop, but will only have one frame so it doesnt show a difference visually if one frame loops
        marioStandAnimation;
        // should not loop, but will only have one frame so it doesnt show a difference visually if one frame loopmarioStandAnimation: ƒAid.SpriteSheetAnimation;
        // should loop, so currently fine
        marioWalkAnimation;
        // should loop, so currently fine
        marioRunAnimation;
        // TODO: Should match Jumpduration and not loop. Jump is a difficult event
        marioJumpAnimation;
        // TODO: shouldnt loop later.
        marioDieAnimation;
        constructor() {
            //Super constructor muss gefüllt werden. Mit dem NodeNamen.
            super("Avatar");
            this.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
            this.framerate = 12;
            this.setFrameDirection(1);
            this.mtxLocal.translateY(-1);
        }
        initAnimations(marioSpriteSheet) {
            let coat = new ƒ.CoatTextured(undefined, marioSpriteSheet);
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
            this.setInitAnimation();
        }
        setInitAnimation() {
            this.setAnimation(this.marioStandAnimation);
        }
    }
    Script.Avatar = Avatar;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map