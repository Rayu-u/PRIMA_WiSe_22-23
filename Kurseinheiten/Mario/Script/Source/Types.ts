namespace Script {
  // input type
  export interface InputState {
    isLeftKeyPressed: boolean;
    isRightKeyPressed: boolean;
    isShiftKeyPressed: boolean;
  }
  export interface MarioAnimations {
    idle: ƒAid.SpriteSheetAnimation;
    walk: ƒAid.SpriteSheetAnimation;
    run: ƒAid.SpriteSheetAnimation;
    jump: ƒAid.SpriteSheetAnimation;
    die: ƒAid.SpriteSheetAnimation;
  }
}