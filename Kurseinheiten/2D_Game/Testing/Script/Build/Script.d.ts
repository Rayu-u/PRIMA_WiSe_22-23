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
    import ƒ = FudgeCore;
    class TestComponent extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        message: string;
        variable: number;
        constructor();
        testFunction(): void;
        hndEvent: (_event: Event) => void;
    }
}
