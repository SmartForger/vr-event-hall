import axios from 'axios'

const baseUrl = 'https://x8voeal0q1.execute-api.us-east-1.amazonaws.com/dev/meetings'

export const createChimeMeeting = async (body?: any) => {
  return await axios.post(baseUrl, body || {})
}

export const joinChimeMeeting = async (meetingId: string, body?: any) => {
  return await axios.put(`${baseUrl}/${meetingId}`, body || {})
}

export const endChimeMeeting = async (meetingId: string) => {
  return await axios.delete(`${baseUrl}/${meetingId}`)
}
