namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  export class Avatar extends ƒAid.NodeSprite{

    // should not loop, but will only have one frame so it doesnt show a difference visually if one frame loops
    marioStandAnimation: ƒAid.SpriteSheetAnimation;
    // should not loop, but will only have one frame so it doesnt show a difference visually if one frame loopmarioStandAnimation: ƒAid.SpriteSheetAnimation;
    // should loop, so currently fine
    marioWalkAnimation: ƒAid.SpriteSheetAnimation;
    // should loop, so currently fine
    marioRunAnimation: ƒAid.SpriteSheetAnimation;
    // TODO: Should match Jumpduration and not loop. Jump is a difficult event
    marioJumpAnimation: ƒAid.SpriteSheetAnimation;
    // TODO: shouldnt loop later.
    marioDieAnimation: ƒAid.SpriteSheetAnimation;


    public constructor() {
      //Super constructor muss gefüllt werden. Mit dem NodeNamen.
      super("Avatar");

      this.addComponent(new ƒ.ComponentTransform());
      this.setAnimation(this.marioWalkAnimation);
      this.framerate = 20;
      this.initAnimations();
    }

    private async initAnimations(): Promise<void> {
      // load spritesheet from folder and add a "coat" to it.
      let marioSpriteSheet: ƒ.TextureImage = new ƒ.TextureImage();
      await marioSpriteSheet.load("Spritesheets/Mario/Mario_final-Sheet.png");
      let coat: ƒ.CoatTextured = new ƒ.CoatTextured(undefined, marioSpriteSheet);

      
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
  }
  }
}