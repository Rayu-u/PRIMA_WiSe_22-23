namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  export class Avatar extends ƒAid.NodeSprite{

    marioStandAnimation: ƒAid.SpriteSheetAnimation;
    marioWalkAnimation: ƒAid.SpriteSheetAnimation;
    marioRunAnimation: ƒAid.SpriteSheetAnimation;
    marioJumpAnimation: ƒAid.SpriteSheetAnimation;
    marioDieAnimation: ƒAid.SpriteSheetAnimation;

    marioSpeed: number = 5.0;
  
    //currently responsible for player movement
    xPlayerMovement: number = 0;
    xPlayerMovementCurrent: number;

    yPlayerAcceleration: number = 2;

    public constructor(spritesheet: ƒ.TextureImage) {
      super("Avatar");
      this.initMario(spritesheet);      
    }

    private initMario(spritesheet: ƒ.TextureImage): void {
      this.initAnimations(spritesheet);
      this.setAnimation(this.marioStandAnimation);
      this.addComponent(new ƒ.ComponentTransform(new ƒ.Matrix4x4()));
      this.setFrameDirection(1);
      
      this.mtxLocal.translateY(-1);
    }

    private initAnimations(spritesheet: ƒ.TextureImage): void {
      // add a "coat" to spritesheet
      let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, spritesheet);
      
      this.marioStandAnimation = new ƒAid.SpriteSheetAnimation("Mario_Stand", coat);
      this.marioStandAnimation.generateByGrid(ƒ.Rectangle.GET(0, 0, 40, 56), 1, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
      
      this.marioWalkAnimation = new ƒAid.SpriteSheetAnimation("Mario_Run", coat);
      this.marioWalkAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56, 40, 56), 12, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
      
      this.marioRunAnimation = new ƒAid.SpriteSheetAnimation("Mario_Run", coat);
      this.marioRunAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56, 40, 56), 6, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(80));
      
      this.marioJumpAnimation = new ƒAid.SpriteSheetAnimation("Mario_Jump", coat);
      this.marioJumpAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56*2, 40, 56), 10, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));
      
      this.marioDieAnimation = new ƒAid.SpriteSheetAnimation("Mario_Die", coat);
      this.marioDieAnimation.generateByGrid(ƒ.Rectangle.GET(0, 56*3, 40, 56), 5, 40, ƒ.ORIGIN2D.BOTTOMCENTER, ƒ.Vector2.X(40));

      this.framerate = 12;
    }

    public update(deltaTime: number, inputState: InputState): void {
      //determine amount to walk
      //is around 80
      //console.log(ƒ.Loop.timeFrameGame);
    
      this.xPlayerMovementCurrent = ƒ.Loop.timeFrameGame/1000 * this.marioSpeed;

      this.yPlayerAcceleration = ƒ.Loop.timeFrameGame/(1000*1000) + this.marioSpeed;
      // a*t + v
      this.getParent().getParent().mtxLocal.translateX(this.xPlayerMovement);
      
      //ySpeed: number = 0
      //Gravity = 0.05

      //Update deltati
    }
  }
}