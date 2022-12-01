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
        constructor();
        hndEvent: (_event: Event) => void;
        update: (_event: Event) => void;
        crash(): void;
        distance: number;
        calcDistanceToTerrain(): void;
    }
}
declare namespace Starfox {
    import ƒ = FudgeCore;
    let shipParent: ƒ.Node;
    let cmpTerrain: ƒ.ComponentMesh;
}
