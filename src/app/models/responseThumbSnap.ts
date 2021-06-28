export interface ResponseThumbSnap{
    data?: DataThumbSnap,
    error?: ErrorThumbSnap,
    success: boolean,
    status: number
}

interface DataThumbSnap{
  id: string,
  url: string,
  media: string,
  thumb: string,
  width: number,
  height: number
}

interface ErrorThumbSnap{
    message: string
}