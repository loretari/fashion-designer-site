<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
<ListView :playlists="documents"/>
<!--      <div v-for="doc in documents" :key="doc.id">{{ doc.title }}</div>-->
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import ListView from '../components/ListView'

export default {
  name: 'Home',
  components: { ListView },
  setup () {
    const { documents, error } = getCollection('playlists')

    return {
      documents,
      error
    }
  }

}
</script>
