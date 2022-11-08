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
    import ƒAid = FudgeAid;
    class Avatar extends ƒAid.NodeSprite {
        marioStandAnimation: ƒAid.SpriteSheetAnimation;
        marioWalkAnimation: ƒAid.SpriteSheetAnimation;
        marioRunAnimation: ƒAid.SpriteSheetAnimation;
        marioJumpAnimation: ƒAid.SpriteSheetAnimation;
        marioDieAnimation: ƒAid.SpriteSheetAnimation;
        constructor();
        initAnimations(marioSpriteSheet: ƒ.TextureImage): void;
        private setInitAnimation;
    }
}
