<template>
  <v-container class="text-center">
    <h2>유저 조회</h2>
    <v-text-field
      clearable
      placeholder="유저 검색"
      variant="underlined"
      v-model="searchWord"
      @keyup.enter="onSearch"
    >
      <template v-slot:append-inner>
        <v-icon @click="onSearch">mdi-magnify</v-icon>
      </template>
    </v-text-field>
    <v-table>
      <thead>
        <tr>
          <th class="text-center">유저</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, idx) in members" :key="idx" height="100">
          <td class="text-left name" @click="goProfile(member.id)">
            <v-avatar class="elevation-3">
              <v-img v-if="member.imageUrl" :src="member.imageUrl"></v-img>
              <v-img v-if="!member.imageUrl" :src="img"></v-img>
            </v-avatar>
            {{ member.id + ' : ' + member.email }}
          </td>
          <td>
            <v-icon
              @click="userDelete(member)"
              icon="mdi-delete"
              color="red"
              style="cursor: pointer"
              v-if="member.id != nowAdmin.id"
            />
          </td>
        </tr>
      </tbody>
      <v-col cols="3"> </v-col>
    </v-table>
  </v-container>
</template>
<script setup>
import functions from '@/api/admin.js'
import { computed, onMounted, ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import img from '../../assets/img/default_image.png'
import { useRouter } from 'vue-router'
const { cookies } = useCookies()
const router = useRouter()
// originMembers null값 주고(얘는 원래 전체 목록)
const originMembers = ref(null)
// 얘는 보여줄 목록
const members = ref(null)
// admin 토큰값 받기위해 쿠키에서 멤버정보 가져오고
const nowAdmin = ref(cookies.get('member'))
const accessToken = computed(() => {
  return cookies.get('accessToken')
})

// 멤버들 불러오는 함수짜고
async function loadAlluser() {
  try {
    originMembers.value = await functions.getLoadAlluser(accessToken.value)
    if (originMembers.value) {
      members.value = originMembers.value.data.memberList
      originMembers.value = originMembers.value.data.memberList
    }
  } catch (err) {
    console.log(err)
  }
}

// 마운트 되자마자 불러오게 함
onMounted(() => {
  loadAlluser()
})

// 유저삭제
async function userDelete(e) {
  console.log(e)
  if (confirm('정말로 삭제하시겠습니까?')) {
    try {
      const message = await functions.deleteUser(e.id, accessToken.value)
      console.log(message)
      if (message.data.message === 'success') {
        alert('삭제되었습니다.')
        // 삭제하고 목록 다시 불러주기
        loadAlluser()
      }
    } catch (err) {
      console.log(err)
    }
  }
}

// 유저 검색
const searchWord = ref(null)
function onSearch() {
  console.log(searchWord.value)
  if (!searchWord.value) {
    members.value = originMembers.value
    return
  }
  // 이메일이 null값일때 include걸면 에러나서 먼저 존재 여부부터 체크하기
  members.value = originMembers.value.filter(
    (user) => user.id == searchWord.value || (user.email && user.email.includes(searchWord.value))
  )
}

function goProfile(memberId) {
  router.push({ name: 'member', params: { id: memberId } })
}
</script>
<style scoped>
.name {
  cursor: pointer;
}
</style>
