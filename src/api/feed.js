import { apiInstance } from './index'
import { useAccountStore } from '@/stores/accountStore.js'

const api = apiInstance()

// 피니아 스토어에서 유저 토큰을 가져오기
function getAccessToken() {
  const accountStore = useAccountStore()
  const accessToken = accountStore.accessToken
  return accessToken
}

// 피드 전체 목록 조회 API
async function fetchAllFeedList() {
  try {
    const accessToken = getAccessToken()
    const res = await api.get(`/feed/list`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 피드 상세 조회 API
async function fetchFeedDetail(feed_id) {
  try {
    const accessToken = getAccessToken()
    const res = await api.get(`/feed/${feed_id}`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 피드 좋아요 API
async function addFeedLike() {
  try {
    const accessToken = getAccessToken()
    const res = await api.put(`/feed/like`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 피드 검색 API
async function searchFeed() {
  try {
    const accessToken = getAccessToken()
    const res = await api.get(`/feed/search`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 피드 작성 API
async function postFeed() {
  try {
    const accessToken = getAccessToken()
    const res = await api.post(`/feed/writeboard`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 피드 수정 API
async function updateFeed() {
  try {
    const accessToken = getAccessToken()
    const res = await api.put(`/feed/modifyboard`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 피드 삭제 API
async function deleteFeed() {
  try {
    const accessToken = getAccessToken()
    const res = await api.delete(`/feed/deleteboard`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 댓글 작성 API
async function postComment() {
  try {
    const accessToken = getAccessToken()
    const res = await api.get(`/feed/list`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 댓글 삭제 API
async function deleteComment() {
  try {
    const accessToken = getAccessToken()
    const res = await api.get(`/feed/list`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 댓글 수정 API
async function updateComment() {
  try {
    const accessToken = getAccessToken()
    const res = await api.get(`/feed/list`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

// 전체 유저 피드 리스트 API
async function fetchFeedList() {
  try {
    const accessToken = getAccessToken()
    const res = await api.get(`/feed/list`, {
      usertoken: accessToken
    })
    return res
  } catch (err) {
    console.log(err)
  }
}

export {
  fetchAllFeedList,
  fetchFeedDetail,
  addFeedLike,
  searchFeed,
  postFeed,
  updateFeed,
  deleteFeed,
  postComment,
  deleteComment,
  updateComment
}
