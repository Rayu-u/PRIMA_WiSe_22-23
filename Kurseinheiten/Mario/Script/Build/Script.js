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
    var ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let viewport;
    // Define marioSpriteNode from FUDGE
    let marioSpriteNode;
    let mario;
    let marioSpeed = 5.0;
    let xPlayerMovement = 0;
    let xPlayerMovementCurrent;
    // should not loop, but will only have one frame so it doesnt show a difference visually if one frame loops
    let marioStandAnimation;
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
        let graph = viewport.getBranch();
        mario = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];
        console.log("branch" + graph.name);
        console.log("mario" + mario.name);
        await initMario();
        document.addEventListener("keyup", onKey);
        document.addEventListener("keydown", onKey);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        // edit framerate here
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 12);
    }
    async function initMario() {
        //initialize animations seen above
        await initAnimations();
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
    async function initAnimations() {
        // load spritesheet from folder and add a "coat" to it.
        let marioSpriteSheet = new ƒ.TextureImage();
        await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");
        let coat = new ƒ.CoatTextured(undefined, marioSpriteSheet);
        marioStandAnimation = new ƒAid.SpriteSheetAnimation("Mario_Stand", coat);
        marioStandAnimation.generateByGrid(ƒ.Rectangle.GET(0, 0, 40, 56), 1, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
        marioRunAnimation = new ƒAid.SpriteSheetAnimation("Mario_Run", coat);
        marioRunAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56, 40, 56), 12, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
        marioJumpAnimation = new ƒAid.SpriteSheetAnimation("Mario_Jump", coat);
        marioJumpAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56 * 2, 40, 56), 10, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
        marioDieAnimation = new ƒAid.SpriteSheetAnimation("Mario_Die", coat);
        marioDieAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56 * 3, 40, 56), 5, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
    }
    let keyFirstPressed = true;
    function onKey(_event) {
        if (_event.code != ƒ.KEYBOARD_CODE.A && _event.code != ƒ.KEYBOARD_CODE.D)
            return;
        if (_event.type == "keyup") {
            xPlayerMovement = 0;
            changeAnimation("mario", "stand", marioSpriteNode);
            keyFirstPressed = true;
            return;
        }
        if (_event.code == ƒ.KEYBOARD_CODE.A) {
            if (keyFirstPressed == true) {
                changeAnimation("mario", "run", marioSpriteNode);
                xPlayerMovement = -xPlayerMovementCurrent;
                turnAround(marioSpriteNode, 0);
                console.log("left");
                keyFirstPressed = false;
            }
        }
        if (_event.code == ƒ.KEYBOARD_CODE.D) {
            if (keyFirstPressed == true) {
                changeAnimation("mario", "run", marioSpriteNode);
                keyFirstPressed = false;
            }
            horizontalPlayerMovement = 0.5;
            turnAround(marioSpriteNode, 1);
            console.log("right");
        }
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        //determine amount to walk
        //is around 80
        //console.log(ƒ.Loop.timeFrameGame);
        xPlayerMovementCurrent = ƒ.Loop.timeFrameGame / 1000 * marioSpeed;
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
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map