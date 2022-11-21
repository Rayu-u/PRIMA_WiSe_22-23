declare namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class Avatar extends ƒAid.NodeSprite {
        marioSpeed: number;
        xPlayerMovement: number;
        xPlayerMovementCurrent: number;
        yPlayerAcceleration: number;
        marioStateMachine: MarioStateMachine;
        animations: MarioAnimations;
        constructor(spritesheet: ƒ.TextureImage);
        private initMario;
        private initAnimations;
        update(deltaTime: number, inputState: InputState): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
}
declare namespace Script {
    enum MarioState {
        IDLE = 0,
        WALK = 1,
        RUN = 2,
        JUMP = 3,
        DIE = 4
    }
    class MarioStateMachine {
        animations: MarioAnimations;
        mario: Avatar;
        marioMtxLocal: ƒ.Matrix4x4;
        readonly xSpeed: number;
        readonly xRunSpeed: number;
        currentState: MarioState;
        currentOrientation: String;
        constructor(marioInstance: Avatar, animations: MarioAnimations, initState: String);
        update(inputState: InputState, deltaTime: number): void;
        changeState(nextState: String): void;
        setOrientation(orientation: string): void;
    }
}
declare namespace Script {
    interface InputState {
        isLeftKeyPressed: boolean;
        isRightKeyPressed: boolean;
        isShiftKeyPressed: boolean;
    }
    interface MarioAnimations {
        idle: ƒAid.SpriteSheetAnimation;
        walk: ƒAid.SpriteSheetAnimation;
        run: ƒAid.SpriteSheetAnimation;
        jump: ƒAid.SpriteSheetAnimation;
        die: ƒAid.SpriteSheetAnimation;
    }
}
