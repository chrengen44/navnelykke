
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { PrivacySettings } from "@/utils/api/types";

interface PrivacySettingItemProps {
  title: string;
  description: string;
  settingKey: keyof Pick<PrivacySettings, "show_email" | "show_full_name" | "allow_public_favorites">;
  isChecked: boolean;
  isLoading: boolean;
  onToggle: (key: keyof PrivacySettings, value: boolean) => Promise<void>;
}

export function PrivacySettingItem({ 
  title, 
  description, 
  settingKey, 
  isChecked, 
  isLoading, 
  onToggle 
}: PrivacySettingItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">
          {description}
        </div>
      </div>
      <Switch
        checked={isChecked}
        onCheckedChange={(checked) => onToggle(settingKey, checked)}
        disabled={isLoading}
      />
    </div>
  );
}
