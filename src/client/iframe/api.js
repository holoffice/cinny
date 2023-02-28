import { retrieveLocalStore, updateLocalStore } from "../action/auth"
import { createDM } from "../action/room"
import initMatrix from "../initMatrix"
import cons from "../state/cons"
import navigation from "../state/navigation"

function dispatch(type, data) {
  window.parent.postMessage({ type, data }, "*")
}

function dispatchLoad() {
  let session = null
  if (initMatrix.matrixClient && initMatrix.matrixClient.isLoggedIn()) {
    session = {
      deviceId: initMatrix.matrixClient.deviceId,
      userId: initMatrix.matrixClient.getUserId(),
      baseUrl: initMatrix.matrixClient.baseUrl,
      accessToken: initMatrix.matrixClient.getAccessToken()
    }
  }
  dispatch(cons.events.iframe.STATE_CHANGE, { state: cons.iframeStates.LOADED, session })
}

function dispatchLoading() {
  const session = retrieveLocalStore()
  dispatch(cons.events.iframe.STATE_CHANGE, { state: cons.iframeStates.LOADING, session })
}

class IFrameAPI {
  _loadingFinished = false

  init() {
    window.addEventListener('message', this._onMessage)
    initMatrix.once('init_loading_finished', () => {
      this._loadingFinished = true
      dispatchLoad()
    });
    dispatchLoading()
  }

  /**
   * 
   * @param {MessageEvent<any>} event 
   */
  _onMessage = async (event) => {
    if (!event.data || !event.data.type)
      return
    const { type, data } = event.data
    switch (type) {
      case cons.events.iframe.GET_STATE: {
        if (!this._loadingFinished) {
          dispatchLoading()
          break
        }
        dispatchLoad()
        break;
      }
      case cons.events.iframe.LOAD_SESSION: {
        const {
          baseUrl,
          userId,
          deviceId,
          accessToken,
        } = data;

        updateLocalStore(accessToken, deviceId, userId, baseUrl);
        window.location.reload()
        break;
      }
      case cons.events.iframe.SELECT_ROOM: {
        const roomId = data;
        if (!roomId || typeof roomId !== 'string') {
          dispatch(cons.events.iframe.ERROR, { message: "roomId must be a string" })
          return
        }
        navigation.navigate({ type: cons.actions.navigation.SELECT_ROOM, roomId });
        break;
      }
      case cons.events.iframe.CREATE_DM: {
        const userId = data;
        if (!userId || (typeof userId !== 'string' && !Array.isArray(userId))) {
          dispatch(cons.events.iframe.ERROR, { message: "userId must be a string or an array of string" })
          return
        }
        const { room_id } = await createDM(userId, true)
        navigation.navigate({ type: cons.actions.navigation.SELECT_ROOM, roomId: room_id })
        break;
      }
      default: {
        dispatch(cons.events.iframe.ERROR, { message: `Received unrecognized event '${type}'` })
        break;
      }
    }
  }
}

const api = new IFrameAPI()

export default api