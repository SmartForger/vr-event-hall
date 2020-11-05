export const isOptionActive = (meetingManagerDeviceId: string | null, currentDeviceId: string): boolean => {
  if (currentDeviceId === 'none' && meetingManagerDeviceId === null) {
    return true
  }
  return currentDeviceId === meetingManagerDeviceId
}
