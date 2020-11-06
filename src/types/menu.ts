export type AnchorType = 'right' | 'left' | 'top' | 'bottom' | 'rightOverlay' | 'rightPersistent' | 'rightChatUserList'

export type ToggleDrawer = (
  event: React.KeyboardEvent | React.MouseEvent | null,
  anchor: AnchorType,
  open: boolean,
  location?: string
) => void
