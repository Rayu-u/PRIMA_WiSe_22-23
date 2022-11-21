declare namespace Script {
    import ƒ = FudgeCore;
    import ƒAid = FudgeAid;
    class Avatar extends ƒAid.NodeSprite {
        marioStandAnimation: ƒAid.SpriteSheetAnimation;
        marioWalkAnimation: ƒAid.SpriteSheetAnimation;
        marioRunAnimation: ƒAid.SpriteSheetAnimation;
        marioJumpAnimation: ƒAid.SpriteSheetAnimation;
        marioDieAnimation: ƒAid.SpriteSheetAnimation;
        marioSpeed: number;
        xPlayerMovement: number;
        xPlayerMovementCurrent: number;
        yPlayerAcceleration: number;
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
    enum Direction {
        LEFT = 0,
        RIGHT = 1
    }
}
declare namespace Script {
    interface InputState {
        isLeftKeyPressed: boolean;
        isRightKeyPressed: boolean;
        isShiftKeyPressed: boolean;
    }
}
declare namespace Script {
}
declare namespace Script {
    import ƒ = FudgeCore;
    class MarioScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        private onInput;
        private update;
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Script {
    interface State {
        update(event: Event): void;
        input(event: KeyboardEvent): void;
    }
    class IdleState implements State {
        update(event: Event): void;
        input(event: KeyboardEvent): void;
    }
    class WalkState implements State {
        update(event: Event): void;
        input(event: KeyboardEvent): void;
    }
    class RunState implements State {
        update(event: Event): void;
        input(event: KeyboardEvent): void;
    }
    class JumpState implements State {
        update(event: Event): void;
        input(event: KeyboardEvent): void;
    }
}
declare namespace Script {
    import ƒAid = FudgeAid;
    enum JOB {
        IDLE = 0,
        ESCAPE = 1,
        DIE = 2,
        RESPAWN = 3
    }
    export class StateMachine extends ƒAid.ComponentStateMachine<JOB> {
    }
    export {};
}
declare namespace Script {
    import ƒAid = FudgeAid;
    enum MarioStates {
        IDLE = 0,
        WALK = 1,
        RUN = 2
    }
    export class StateMachineMario extends ƒAid.ComponentStateMachine<MarioStates> {
        static readonly iSubclass: number;
        private static instructions;
        constructor();
        static get(): ƒAid.StateMachineInstructions<MarioStates>;
        private static actIdle;
        private static actWalk;
        private static actRun;
        private static transitDefault;
        private static actDefault;
        private hndEvent;
        private hndKeyInput;
    }
    export {};
}
