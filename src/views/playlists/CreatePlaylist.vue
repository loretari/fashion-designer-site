<template>
<div>
    <form @submit.prevent="handleSubmit">
        <h4>Create New List</h4>
        <input type="text" required placeholder="List title" v-model="title">
        <textarea required placeholder="List description..." v-model="description"></textarea>
        <!--   upload list image         -->
        <label>Upload cover image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div
        >
        <button v-if="!isPending">Create</button>
        <button v-else="isPending" disabled>Saving...</button>
    </form>
</div>



</template>

<script>
    import { ref } from 'vue'
    import useStorage from '../../composables/useStorage'
    import useCollection from '../../composables/useCollection'
    import getUser from '../../composables/getUser'
    import { timestamp } from "../../firebase/config";
    import { useRouter } from 'vue-router'


    export default {
        name: "CreatePlaylist",
        setup() {
            const { url, filePath, uploadImage } = useStorage()
            const { addDoc, error } = useCollection('playlists')
            const { user } = getUser()
            const router = useRouter()

            const title = ref('')
            const description = ref('')
            const file = ref(null)
            const fileError = ref(null)
            const isPending = ref(false)




            const handleSubmit = async () => {
                if (file.value) {
                    isPending.value = true
                    // console.log(title.value, description.value, file.value, fileError.value)
                await uploadImage(file.value)
                    // console.log('image uploaded, url: ', url.value)
                    const res = await addDoc({
                        title: title.value,
                        description: description.value,
                        userId: user.value.uid,
                        userName: user.value.displayName,
                        coverUrl: url.value,
                        filePath: filePath.value,
                        songs: [],
                        createdAt: timestamp()
                    })
                    isPending.value = false
                    if (!error.value) {
                        // console.log('playlist added')
                        router.push({ name: 'PlaylistDetails', params: {id: res.id }})
                    }
                }

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
           description,
            handleSubmit,
            handleChange,
             fileError,
             isPending
         }

        }

    }
</script>

<style>

    input[type="file"] {
        border: 0;
        padding: 0;
    }
    label {
      font-size: 12px;
        display: block;
        margin-top: 30px;
    }
    button {
        margin-top: 20px;
    }
</style>