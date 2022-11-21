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
    enum Direction {
        LEFT = 0,
        RIGHT = 1
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
    enum MarioState {
        IDLE = 0,
        WALK = 1,
        RUN = 2,
        JUMP = 3,
        DIE = 4
    }
    class MarioStateMachine {
        mario: Avatar;
        animations: MarioAnimations;
        currentState: MarioState;
        currentOrientation: String;
        constructor(marioInstance: Avatar, animations: MarioAnimations, initState: String);
        update(inputState: InputState): void;
        changeState(nextState: String): void;
        setOrientation(orientation: string): void;
    }
}
declare namespace Script {
    interface State {
        update(inputState: InputState): State;
    }
    class IdleState implements State {
        update(inputState: InputState): State;
    }
    class WalkState implements State {
        update(inputState: InputState): State;
    }
    class RunState implements State {
        update(inputState: InputState): State;
    }
    class JumpState implements State {
        update(inputState: InputState): State;
    }
    class DeathState implements State {
        update(inputState: InputState): State;
    }
    let idleState: IdleState;
    let walkState: WalkState;
    let runState: RunState;
    let jumpState: JumpState;
    let deathState: JumpState;
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
