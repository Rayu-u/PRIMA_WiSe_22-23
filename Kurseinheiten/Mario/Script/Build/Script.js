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
    // Add eventlistener for the loading of the window
    //window.addEventListener("load", onLoad);  
    //window.addEventListener("interactiveViewportStarted", onViewportStart)
    // Define marioSpriteNode from FUDGE
    let marioSpriteNode;
    let mario;
    // load Handler
    document.addEventListener("interactiveViewportStarted", start);
    async function start(_event) {
        viewport = _event.detail;
        let graph = viewport.getBranch();
        mario = graph.getChildrenByName("MarioTransform")[0].getChildrenByName("Mario")[0];
        console.log("branch" + graph.name);
        console.log("mario" + mario.name);
        marioSpriteNode = await createMarioSprite();
        mario.addChild(marioSpriteNode);
        mario.getComponent(ƒ.ComponentMaterial).activate(false);
        ƒ.Loop.addEventListener("loopFrame" /* ƒ.EVENT.LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        // edit framerate here
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
    async function createMarioSprite() {
        // load spritesheet from folder and add a "coat" to it.
        let marioSpriteSheet = new ƒ.TextureImage();
        await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");
        let coat = new ƒ.CoatTextured(undefined, marioSpriteSheet);
        // add running animation
        let marioAnimation = new ƒAid.SpriteSheetAnimation("Mario_Run", coat);
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
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map