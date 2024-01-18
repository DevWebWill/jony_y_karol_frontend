<script>
import { ref } from 'vue'
import axios from 'axios'
import InsertModalComponent from '../components/InsertModalComponent.vue'
export default {
    setup() {
        const guests = ref(null);
        const showModal = ref(false);
        const baseUrl = ref(import.meta.env.VITE_APP_URL_API);
        function getAllGuests() {
            axios({
                url: baseUrl.value + '/guest/get-guests',
                method: 'GET',
                responseType: 'json'
            }).then((response) => {
                if (response.data && response.data.guests) {
                    guests.value = response.data.guests;
                }
                console.log(response.data.guests);
            });
        }
        function closeModal() {
            showModal.value = false
        }
        getAllGuests();
        return {
            baseUrl,
            guests,
            showModal,
            closeModal
        };
    },
    components: { InsertModalComponent }
}
</script>
<template>
    <main class="h-full">
        <div class="p-4">
            <div class="flex justify-end">
                <button @click="() => { showModal = true }" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Nuevo</button>
            </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-2">
                <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400"
                >
                    <tr>
                        <th scope="col" class="px-1 py-3">No.</th>
                        <th scope="col" class="px-4 py-3">Familia</th>
                        <th scope="col" class="px-4 py-3">Name</th>
                        <th scope="col" class="px-4 py-3">Asistencia</th>
                        <th scope="col" class="px-4 py-3">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(guest, index) in guests" :key="index"
                        class="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50"
                    >
                        <td class="py-3 px-1 text-gray-600">{{ index+1 }}</td>
                        <td class="px-4 py-4">{{ guest.slug }}</td>
                        <td class="px-4 py-4">{{ guest.name }}</td>
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input
                                    :checked="guest.attendance"
                                    id="checkbox-table-1"
                                    type="checkbox"
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    disabled
                                />
                                <label for="checkbox-table-1" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <td class="px-4 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </a>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>

        <InsertModalComponent :showModal="showModal" v-on:close-modal="closeModal"/>
    </main>
</template>
