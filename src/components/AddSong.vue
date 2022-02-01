<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm = true">Add designers</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Designer</h4>
            <input type="text" placeholder="Title" required v-model="title">
            <input type="text" placeholder="Designer" required v-model="artist">
            <label>Upload cover image</label>
            <input type="file" @change="handleChange">
            <div class="error">{{ fileError }}</div
            >
            <button>Add</button>
        </form>
       </div>
</template>

<script>
    import useDocument from '../composables/useDocument'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import useStorage from '../composables/useStorage'

    export default {
        name: "AddSong",
        props: ['playlist'],
        setup(props) {
            const title = ref('')
            const artist = ref('')
            const file = ref(null)
            const fileError = ref(null)
            const showForm = ref('')
            const router = useRouter()
            const { url, filePath, uploadImage } = useStorage()
            const { updateDoc } = useDocument('playlists', props.playlist.id)


            const handleSubmit = async () => {
                await uploadImage(file.value)
                const newSong = {
                    title: title.value,
                    artist: artist.value,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    id: Math.floor(Math.random() * 1000000)
                }
                await updateDoc({
                    songs: [...props.playlist.songs, newSong]
                })
                title.value = ''
                artist.value = ''
                router.push({ name: 'PlaylistDetails', params: {id: newSong.id }})

            }

            // allowed file types
            const types = ['image/png', 'image/jpeg']

            const handleChange = (e) => {
                const selected = e.target.files[0]
                console.log(selected)

                if (selected && types.includes(selected.type)) {
                    file.value = selected
                    fileError.value = null
                } else {
                    file.value = null
                    fileError.value = 'Please select an images file (png or jpg)'
                }
            }

            return {
                title,
                artist,
                showForm,
                handleSubmit,
                fileError,
                handleChange,

            }
        }
    }
</script>

<style scoped>
   .add-song {
       text-align: center;
       margin-top: 40px;
   }
    form {
        max-width: 100%;
        text-align: left;
    }

</style>