declare namespace Script {
    import ƒ = FudgeCore;
    class CustomComponentScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
declare namespace Starfox {
    import ƒ = FudgeCore;
    class EngineScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        viewport: ƒ.Viewport;
        rigidbody: ƒ.ComponentRigidbody;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
        onSensorHit: () => void;
        crash: () => void;
    }
}
declare namespace Starfox {
    class GameState extends ƒ.Mutable {
        protected reduceMutator(_mutator: ƒ.Mutator): void;
        height: number;
        velocity: number;
        private controller;
        constructor();
    }
}
declare namespace Starfox {
    import ƒ = FudgeCore;
    let shipParent: ƒ.Node;
    let cmpTerrain: ƒ.ComponentMesh;
    let gameState: GameState;
}
declare namespace Starfox {
    import ƒ = FudgeCore;
    class SensorScript extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
        distance: number;
        calcDistanceToTerrain(): number;
    }
}
