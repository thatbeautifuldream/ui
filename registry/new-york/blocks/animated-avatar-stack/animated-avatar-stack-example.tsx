import {
  AnimatedAvatarStack,
  AVATAR_DATA,
} from "@/registry/new-york/blocks/animated-avatar-stack/components/animated-avatar-stack";

export function AnimatedAvatarStackExample() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm text-muted-foreground">Small</h3>
        <AnimatedAvatarStack
          avatarData={AVATAR_DATA}
          maxVisible={5}
          size="sm"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm text-muted-foreground">
          Medium (Default)
        </h3>
        <AnimatedAvatarStack
          avatarData={AVATAR_DATA}
          maxVisible={5}
          size="md"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm text-muted-foreground">Large</h3>
        <AnimatedAvatarStack
          avatarData={AVATAR_DATA}
          maxVisible={5}
          size="lg"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-medium text-sm text-muted-foreground">
          Custom Visible Count (3)
        </h3>
        <AnimatedAvatarStack
          avatarData={AVATAR_DATA}
          maxVisible={3}
          size="md"
        />
      </div>
    </div>
  );
}
