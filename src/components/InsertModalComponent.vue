<template>
    <div>
        <Transition>
            <div v-if="showModal" tabindex="-1"  role="dialog" aria-modal="true" class="bg-black/[0.4] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full md:inset-0 h-full justify-center items-center flex">
                <div class="relative  w-full max-w-md h-72">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow modal-fade-up h-full">
                        <form @submit.prevent="submit" action="" class="flex flex-col justify-between items-stretch h-full">
                            <div class="flex justify-between items-center px-6 rounded-t border-b dark:border-gray-600 h-16 py-2">
                                <h3 class="text-xl font-semibold text-gray-900">
                                    <span>
                                        Nuevo invitado
                                    </span>
                                </h3>
                                <button v-on:click="closeModal()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                                </button>
                            </div>

                        
                            <!-- Modal body -->
                            <div class="grid grid-cols-1 p-6 gap-4 bg-slate-100 h-[90%] overflow-y-auto w-full">
                                <div class="w-full">
                                    <div class="relative h-10 w-full">
                                        <input v-model="form.name" type="text" placeholder="Nombre" class="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
                                        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5  hidden h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                    </div>
                                </div>
                                <div class="w-full">
                                    <div class="relative h-10 w-full">
                                        <input v-model="form.slug" type="text" placeholder="Slug" class="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
                                        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5  hidden h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                                    </div>
                                </div>
                            </div>

                            <!-- Modal footer -->
                            <div class="flex items-center justify-end px-6 py-3 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 bg-white">
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Aceptar
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'InsertModalComponent',
        components: {

        },
        props: {
            showModal: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                baseUrl: import.meta.env.VITE_APP_URL_API,
                form: {
                    name: '',
                    slug: ''
                }
            }
        },
        methods: {
            cleanForm() {
                this.form.name = ''
                this.form.slug = ''
                this.closeModal()
            },
            closeModalOnEscape(event) {
                if (event.key === 'Escape') {
                    this.closeModal();
                }
            },
            closeModal() {
                this.$emit('close-modal');
            },
            submit() {
                axios({
                    url: this.baseUrl + '/guest/create-guest',
                    method: 'POST',
                    data: this.form,
                    responseType: 'json'
                }).then((response) => {
                    if(response.data) {
                        console.log(response.data)
                        this.$emit('refresh-table')
                        this.$emit('close-modal')
                    }
                    this.closeModal();
                    //this.$emit('refreshTable');
                })
                this.cleanForm()
            }
        },
        mounted() {
            window.addEventListener('keydown', this.closeModalOnEscape);
        },
        beforeUnmount() {
            window.removeEventListener('keydown', this.closeModalOnEscape);
        },
        created() {
            
        },
        computed: {
            
        },
        watch: {
            showModal(value) {
                if(!value) {
                    this.cleanForm();
                }
            }
        }
    }
</script>

<style scoped>
    .v-enter-active,
    .v-leave-active {
    transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
    opacity: 0;
    }
</style>